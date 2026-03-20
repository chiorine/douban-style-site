/**
 * admin-auth-edge.ts
 *
 * 只导出可以在 Edge Runtime 中安全使用的常量。
 * middleware 从这里导入 COOKIE_NAME，
 * 避免将 node:crypto 等 Node.js 专属模块拉入 Edge bundle。
 *
 * 核心鉴权逻辑（使用 node:crypto）请使用 admin-auth.ts。
 */

export const COOKIE_NAME = "admin_token";
