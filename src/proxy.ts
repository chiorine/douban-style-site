/**
 * proxy.ts  (Next.js 16+ 新约定，替代旧版 middleware.ts)
 *
 * 拦截所有 /admin/* 请求：
 *   - /admin/login   → 始终放行，注入 x-pathname header
 *   - /admin/logout  → 始终放行，注入 x-pathname header
 *   - 其余路径       → 读取 cookie，验签通过放行，否则重定向到 /admin/login
 *
 * 运行环境：Edge Runtime（不可使用 node:crypto，改用 Web Crypto API）
 */

import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/admin-auth-edge";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 登录页、退出接口：始终放行，注入 pathname 供 admin layout 判断
  if (pathname === "/admin/login" || pathname === "/admin/logout") {
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  // 读取并校验登录 cookie
  const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
  const isValid = await verifyTokenEdge(token);

  if (!isValid) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname); // 登录后可跳回原页面
    return NextResponse.redirect(loginUrl);
  }

  // 验证通过：注入 pathname 供 layout 使用
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

// ── Edge 兼容的 HMAC-SHA256 验签 ─────────────────────────────

const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 天

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

async function verifyTokenEdge(token: string): Promise<boolean> {
  if (!token) return false;

  const secret = process.env.ADMIN_COOKIE_SECRET;
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

  // 手动实现 timing-safe 比对（Edge 环境无 timingSafeEqual）
  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
