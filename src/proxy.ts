/**
 * proxy.ts
 *
 * 拦截所有 /admin/* 请求：
 *   - /admin/login   → 始终放行，注入 x-pathname header
 *   - /admin/logout  → 始终放行，注入 x-pathname header
 *   - 其余路径       → 读取 cookie，验签通过放行，否则重定向到 /admin/login
 *
 * 运行环境：Edge Runtime（使用 Web Crypto API）
 */

import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/admin-auth-edge";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/admin/logout") {
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
  const isValid = await verifyTokenEdge(token);

  if (!isValid) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

async function hmacSha256(secret: string, payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getEdgeSecret(): string | null {
  const secret =
    process.env.ADMIN_COOKIE_SECRET ??
    process.env.NEXT_PUBLIC_ADMIN_COOKIE_SECRET;

  return secret && secret.trim() ? secret : null;
}

async function verifyTokenEdge(token: string): Promise<boolean> {
  if (!token) return false;

  const secret = getEdgeSecret();
  if (!secret) return false;

  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return false;

  const ts = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);
  if (!ts || !sig) return false;

  const timestamp = Number(ts);
  if (Number.isNaN(timestamp)) return false;
  if (Date.now() - timestamp > TOKEN_MAX_AGE_MS) return false;

  const expected = await hmacSha256(secret, ts);

  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}