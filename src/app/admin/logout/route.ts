/**
 * GET /admin/logout
 *
 * 清除登录 cookie，重定向到登录页。
 * 使用 Route Handler（GET）而非 Server Action，
 * 方便在顶栏直接用普通 <a href="/admin/logout"> 触发，
 * 无需 JS 就能完成退出。
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clearAuthCookie } from "@/lib/admin-auth";

export async function GET() {
  const jar = await cookies();
  clearAuthCookie(jar);
  redirect("/admin/login");
}
