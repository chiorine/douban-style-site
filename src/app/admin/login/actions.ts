"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, setAuthCookie } from "@/lib/admin-auth";

export async function loginAction(
  _prevState: { error: string },
  formData: FormData,
): Promise<{ error: string }> {
  const password = (formData.get("password") as string | null) ?? "";

  // 密码为空直接拒绝，不做昂贵的加密运算
  if (!password.trim()) {
    return { error: "请输入密码" };
  }

  const ok = checkPassword(password);

  if (!ok) {
    return { error: "密码错误，请重试" };
  }

  // 写入 httpOnly cookie
  const jar = await cookies();
  setAuthCookie(jar);

  // redirect 必须在 try/catch 外调用（Next.js 内部用 throw 实现跳转）
  redirect("/admin");
}
