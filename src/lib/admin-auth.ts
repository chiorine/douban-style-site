/**
 * admin-auth.ts
 *
 * 轻量 Admin 鉴权工具，不依赖任何第三方库。
 *
 * 方案：
 *   1. 用户输入密码 → 与环境变量 ADMIN_PASSWORD 明文比对
 *   2. 比对成功 → 生成 HMAC-SHA256 签名 token，写入 httpOnly cookie
 *   3. 后续请求 → middleware 读取 cookie，验签通过则放行
 *
 * Token 格式：`<timestamp>.<signature>`
 *   - timestamp：签发时间（ms），用于可选的过期校验
 *   - signature：HMAC-SHA256(timestamp, ADMIN_COOKIE_SECRET)
 *
 * 安全说明：
 *   - 明文密码不存入 cookie，只存签名 token
 *   - httpOnly：JS 无法读取，防 XSS 窃取
 *   - sameSite lax：防 CSRF（个人站 GET 操作无 CSRF 风险，POST 由 sameSite 保护）
 *   - secure：生产环境只在 HTTPS 下传输
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import type { ResponseCookies } from "next/dist/server/web/spec-extension/cookies";
import { COOKIE_NAME } from "./admin-auth-edge";

// 将 COOKIE_NAME 重导出，方便其他服务端文件从这里统一导入
export { COOKIE_NAME };

/** Token 有效期：7 天（毫秒） */
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

/** Cookie Max-Age：秒 */
export const COOKIE_MAX_AGE_SEC = 7 * 24 * 60 * 60;

// ── 内部：签名 / 验签 ─────────────────────────────────────────

function getSecret(): string {
  const secret = process.env.ADMIN_COOKIE_SECRET;
  if (!secret) {
    throw new Error(
      "[admin-auth] ADMIN_COOKIE_SECRET 未配置，请在 .env.local 中设置。",
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

// ── 生成 Token ────────────────────────────────────────────────

export function generateToken(): string {
  const ts = Date.now().toString();
  const sig = sign(ts);
  return `${ts}.${sig}`;
}

// ── 校验 Token ────────────────────────────────────────────────

export type VerifyResult =
  | { valid: true }
  | { valid: false; reason: "malformed" | "expired" | "invalid_signature" };

export function verifyToken(token: string): VerifyResult {
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return { valid: false, reason: "malformed" };

  const ts = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);

  if (!ts || !sig) return { valid: false, reason: "malformed" };

  // 过期校验
  const timestamp = Number(ts);
  if (Number.isNaN(timestamp)) return { valid: false, reason: "malformed" };
  if (Date.now() - timestamp > TOKEN_MAX_AGE_MS) {
    return { valid: false, reason: "expired" };
  }

  // 防时序攻击：timing-safe 比对
  const expected = sign(ts);
  try {
    const sigBuf = Buffer.from(sig, "hex");
    const expectedBuf = Buffer.from(expected, "hex");
    if (
      sigBuf.length !== expectedBuf.length ||
      !timingSafeEqual(sigBuf, expectedBuf)
    ) {
      return { valid: false, reason: "invalid_signature" };
    }
  } catch {
    return { valid: false, reason: "invalid_signature" };
  }

  return { valid: true };
}

// ── 校验密码 ──────────────────────────────────────────────────

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error(
      "[admin-auth] ADMIN_PASSWORD 未配置，请在 .env.local 中设置。",
    );
  }
  // timing-safe 字符串比对，防止枚举攻击
  try {
    const a = Buffer.from(input);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// ── Cookie 写入 helper（用于 Server Action / Route Handler）──

/**
 * 将登录 token 写入 cookie。
 * 参数 cookies 来自 `import { cookies } from "next/headers"`。
 */
export function setAuthCookie(cookies: ResponseCookies): void {
  cookies.set(COOKIE_NAME, generateToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE_SEC,
    path: "/",
  });
}

/**
 * 清除登录 cookie（退出登录）。
 */
export function clearAuthCookie(cookies: ResponseCookies): void {
  cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
