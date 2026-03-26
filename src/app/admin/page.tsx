import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="max-w-xl space-y-6">

        <div className="rounded-md border border-stone-200 bg-white px-6 py-6">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-400">Admin</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-stone-800">后台管理</h1>
          <p className="mt-3 text-sm leading-7 text-stone-500">
            内容写入后自动同步到对应列表页。草稿状态不会在前台显示。
          </p>
        </div>

        <div className="rounded-md border border-stone-200 bg-white px-6 py-5">
          <h2 className="text-sm font-medium text-stone-700">内容模块</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link
                href="/admin/broadcast"
                className="flex items-center justify-between rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <span className="font-medium text-stone-700">广播管理</span>
                <span className="text-stone-400">查看 →</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/notes"
                className="flex items-center justify-between rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <span className="font-medium text-stone-700">日记管理</span>
                <span className="text-stone-400">查看 →</span>
              </Link>
            </li>
                        <li>
              <Link
                href="/admin/home-hero"
                className="flex items-center justify-between rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <span className="font-medium text-stone-700">首页模块编辑</span>
                <span className="text-stone-400">编辑 →</span>
              </Link>
            </li>
                        <li>
              <Link
                href="/admin/projects"
                className="flex items-center justify-between rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <span className="font-medium text-stone-700">项目管理</span>
                <span className="text-stone-400">查看 →</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/links"
                className="flex items-center justify-between rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                <span className="font-medium text-stone-700">外部链接管理</span>
                <span className="text-stone-400">查看 →</span>
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
