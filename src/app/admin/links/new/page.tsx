import Link from "next/link";
import { createExternalLink } from "../actions";

const inputCls =
  "w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200";

type SearchParams = { error?: string };

export default async function NewLinkPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="max-w-xl space-y-6">

        {/* 面包屑 */}
        <nav className="text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <Link href="/admin/links" className="hover:text-emerald-700">
              外部链接管理
            </Link>
            <span>/</span>
            <span className="text-stone-700">新建链接</span>
          </div>
        </nav>

        {/* 错误提示 */}
        {error && (
          <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {decodeURIComponent(error)}
          </div>
        )}

        {/* 表单卡片 */}
        <div className="rounded-md border border-stone-200 bg-white px-6 py-6">
          <h1 className="text-xl font-semibold tracking-tight text-stone-800">新建外部链接</h1>
          <p className="mt-2 text-sm text-stone-500">
            保存后将显示在首页右侧外部链接区域（已发布状态）。
          </p>

          <form action={createExternalLink} className="mt-6 space-y-5">

            {/* title */}
            <div className="space-y-1.5">
              <label htmlFor="title" className="block text-sm font-medium text-stone-700">
                标题 <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="GitHub"
                className={inputCls}
              />
            </div>

            {/* url */}
            <div className="space-y-1.5">
              <label htmlFor="url" className="block text-sm font-medium text-stone-700">
                URL <span className="text-red-400">*</span>
              </label>
              <input
                id="url"
                name="url"
                type="text"
                required
                placeholder="https://example.com"
                className={inputCls}
              />
              <p className="text-xs text-stone-400">
                必须是完整 URL，只允许 http:// 或 https://
              </p>
            </div>

            {/* description */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="block text-sm font-medium text-stone-700">
                描述
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                placeholder="一句话简介，可留空"
                className={inputCls}
              />
            </div>

            {/* sortOrder */}
            <div className="space-y-1.5">
              <label htmlFor="sortOrder" className="block text-sm font-medium text-stone-700">
                排序值
              </label>
              <input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue="0"
                className={inputCls}
              />
              <p className="text-xs text-stone-400">数字越小越靠前，默认为 0</p>
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
                className={inputCls}
              >
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
              </select>
              <p className="text-xs text-stone-400">草稿状态不会在首页显示</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 border-t border-stone-100 pt-5">
              <button
                type="submit"
                className="rounded-sm bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                保存链接
              </button>
              <Link
                href="/admin/links"
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
