"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { siteName } from "@/data/site";

const initialState = { error: "" };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
      <div className="w-full max-w-sm space-y-6">

        {/* 标题区 */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-800">
            {siteName} · 后台
          </h1>
          <p className="mt-2 text-sm text-stone-500">请输入密码继续</p>
        </div>

        {/* 登录卡片 */}
        <div className="rounded-md border border-stone-200 bg-white px-6 py-7 shadow-sm">
          <form action={formAction} className="space-y-5">

            {/* 密码 */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-700"
              >
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                disabled={isPending}
                className="w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200 disabled:opacity-50"
              />
            </div>

            {/* 错误提示 */}
            {state.error && (
              <p className="rounded-sm border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                {state.error}
              </p>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-sm bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {isPending ? "验证中…" : "登录"}
            </button>

          </form>
        </div>

        {/* 返回前台链接 */}
        <p className="text-center text-xs text-stone-400">
          <a href="/" className="transition hover:text-emerald-700">
            ← 返回前台
          </a>
        </p>

      </div>
    </div>
  );
}
