import Link from "next/link";
import { createBroadcast } from "../actions";

export default function NewBroadcastPage() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="max-w-xl space-y-6">

        {/* 面包屑 */}
        <nav className="text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <Link href="/admin/broadcast" className="hover:text-emerald-700">广播管理</Link>
            <span>/</span>
            <span className="text-stone-700">新建广播</span>
          </div>
        </nav>

        {/* 表单卡片 */}
        <div className="rounded-md border border-stone-200 bg-white px-6 py-6">
          <h1 className="text-xl font-semibold tracking-tight text-stone-800">新建广播</h1>
          <p className="mt-2 text-sm text-stone-500">
            保存后立即写入数据库。已发布状态会在前台广播列表中显示。
          </p>

          <form action={createBroadcast} className="mt-6 space-y-5">

            {/* nickname */}
            <div className="space-y-1.5">
              <label htmlFor="nickname" className="block text-sm font-medium text-stone-700">
                昵称 <span className="text-red-400">*</span>
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                defaultValue="Wewkee"
                className="w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200"
              />
            </div>

            {/* avatar */}
            <div className="space-y-1.5">
              <label htmlFor="avatar" className="block text-sm font-medium text-stone-700">
                头像路径 <span className="text-red-400">*</span>
              </label>
              <input
                id="avatar"
                name="avatar"
                type="text"
                required
                defaultValue="/images/avatar.png"
                className="w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200"
              />
              <p className="text-xs text-stone-400">图片路径如 /images/avatar.png，或单个汉字作为文字头像</p>
            </div>

            {/* content */}
            <div className="space-y-1.5">
              <label htmlFor="content" className="block text-sm font-medium text-stone-700">
                内容 <span className="text-red-400">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={6}
                placeholder="写点什么……"
                className="w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm leading-7 text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200"
              />
            </div>

            {/* publishedAt */}
            <div className="space-y-1.5">
              <label htmlFor="publishedAt" className="block text-sm font-medium text-stone-700">
                显示时间 <span className="text-red-400">*</span>
              </label>
              <input
                id="publishedAt"
                name="publishedAt"
                type="text"
                required
                placeholder="2025-06-01"
                className="w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200"
              />
              <p className="text-xs text-stone-400">仅用于前台展示，格式随意，如 2025-06-01</p>
            </div>

            {/* tags */}
            <div className="space-y-1.5">
              <label htmlFor="tags" className="block text-sm font-medium text-stone-700">
                标签
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="建站,记录,前端"
                className="w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200"
              />
              <p className="text-xs text-stone-400">多个标签用英文逗号或中文逗号分隔，可留空</p>
            </div>

            {/* status */}
            <div className="space-y-1.5">
              <label htmlFor="status" className="block text-sm font-medium text-stone-700">
                状态
              </label>
              <select
                id="status"
                name="status"
                defaultValue="published"
                className="w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200"
              >
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
              </select>
              <p className="text-xs text-stone-400">草稿状态不会在前台广播列表中显示</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 border-t border-stone-100 pt-5">
              <button
                type="submit"
                className="rounded-sm bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                保存广播
              </button>
              <Link
                href="/admin/broadcast"
                className="text-sm text-stone-500 hover:text-stone-700"
              >
                取消
              </Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}