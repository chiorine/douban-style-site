import Link from "next/link";
import { createNote } from "../actions";

// 通用输入框样式
const inputCls =
  "w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200";

export default function NewNotePage() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="max-w-xl space-y-6">

        {/* 面包屑 */}
        <nav className="text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <Link href="/admin/notes" className="hover:text-emerald-700">
              日记管理
            </Link>
            <span>/</span>
            <span className="text-stone-700">新建日记</span>
          </div>
        </nav>

        {/* 表单卡片 */}
        <div className="rounded-md border border-stone-200 bg-white px-6 py-6">
          <h1 className="text-xl font-semibold tracking-tight text-stone-800">新建日记</h1>
          <p className="mt-2 text-sm text-stone-500">
            保存后立即写入数据库。已发布状态会在前台日记列表中显示。
          </p>

          <form action={createNote} className="mt-6 space-y-5">

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
                placeholder="文章标题"
                className={inputCls}
              />
            </div>

            {/* slug */}
            <div className="space-y-1.5">
              <label htmlFor="slug" className="block text-sm font-medium text-stone-700">
                Slug <span className="text-red-400">*</span>
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                placeholder="my-note-slug"
                className={inputCls}
              />
              <p className="text-xs text-stone-400">
                URL 标识符，只能含字母、数字、连字符，全站唯一
              </p>
            </div>

            {/* summary */}
            <div className="space-y-1.5">
              <label htmlFor="summary" className="block text-sm font-medium text-stone-700">
                摘要
              </label>
              <textarea
                id="summary"
                name="summary"
                rows={3}
                placeholder="一句话简介，可留空"
                className={inputCls}
              />
            </div>

            {/* content */}
            <div className="space-y-1.5">
              <label htmlFor="content" className="block text-sm font-medium text-stone-700">
                正文 <span className="text-red-400">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={12}
                placeholder={"每行一段，空行会被忽略。\n\n第一段……\n\n第二段……"}
                className={inputCls}
              />
              <p className="text-xs text-stone-400">
                每行视为一个段落，前台以 &lt;p&gt; 标签逐段渲染
              </p>
            </div>

            {/* date */}
            <div className="space-y-1.5">
              <label htmlFor="date" className="block text-sm font-medium text-stone-700">
                日期 <span className="text-red-400">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="text"
                required
                placeholder="2025-06-01"
                className={inputCls}
              />
              <p className="text-xs text-stone-400">仅用于前台展示，建议格式 YYYY-MM-DD</p>
            </div>

            {/* readingTime */}
            <div className="space-y-1.5">
              <label htmlFor="readingTime" className="block text-sm font-medium text-stone-700">
                阅读时间
              </label>
              <input
                id="readingTime"
                name="readingTime"
                type="text"
                placeholder="5 分钟"
                className={inputCls}
              />
              <p className="text-xs text-stone-400">可留空，如填写建议格式：5 分钟</p>
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
                placeholder="生活,阅读,写作"
                className={inputCls}
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
                className={inputCls}
              >
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
              </select>
              <p className="text-xs text-stone-400">草稿状态不会在前台日记列表中显示</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 border-t border-stone-100 pt-5">
              <button
                type="submit"
                className="rounded-sm bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                保存日记
              </button>
              <Link
                href="/admin/notes"
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
