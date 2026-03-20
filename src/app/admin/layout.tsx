import Link from "next/link";
import { headers } from "next/headers";
import { siteName } from "@/data/site";

export const metadata = { title: "后台管理" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 登录页不渲染后台导航条，直接输出 children
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      {/* 后台顶栏 */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm font-medium text-stone-800 transition hover:text-emerald-700"
            >
              {siteName} · 后台
            </Link>
            <span className="text-stone-200">|</span>
            <Link
              href="/admin/broadcast"
              className="text-sm text-stone-500 transition hover:text-emerald-700"
            >
              广播管理
            </Link>
            <Link
              href="/admin/notes"
              className="text-sm text-stone-500 transition hover:text-emerald-700"
            >
              日记管理
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-stone-400 transition hover:text-emerald-700"
            >
              ← 返回前台
            </Link>
            <span className="text-stone-200">|</span>
            <a
              href="/admin/logout"
              className="text-xs text-stone-400 transition hover:text-red-500"
            >
              退出登录
            </a>
          </div>
        </div>
      </header>

      {/* 页面内容 */}
      <main>{children}</main>
    </div>
  );
}
