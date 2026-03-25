import Link from "next/link";
import LogsEditor from "../LogsEditor";
import { createProjectAction } from "../actions";

const inputCls =
  "w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200";

type SearchParams = { error?: string };

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="max-w-2xl space-y-6">

        {/* 面包屑 */}
        <nav className="text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <Link href="/admin/projects" className="hover:text-emerald-700">
              项目管理
            </Link>
            <span>/</span>
            <span className="text-stone-700">新建项目</span>
          </div>
        </nav>

        {/* 错误提示 */}
        {error && (
          <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {decodeURIComponent(error)}
          </div>
        )}

        {/* 表单 */}
        <div className="rounded-md border border-stone-200 bg-white px-6 py-6">
          <h1 className="text-xl font-semibold tracking-tight text-stone-800">
            新建项目
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            保存后写入 content/projects/&lt;slug&gt;.json，立即在前台生效。
          </p>

          <form action={createProjectAction} className="mt-6 space-y-5">

            {/* title */}
            <div className="space-y-1.5">
              <label htmlFor="title" className="block text-sm font-medium text-stone-700">
                项目名称 <span className="text-red-400">*</span>
              </label>
              <input id="title" name="title" type="text" required placeholder="我的项目" className={inputCls} />
            </div>

            {/* slug */}
            <div className="space-y-1.5">
              <label htmlFor="slug" className="block text-sm font-medium text-stone-700">
                Slug <span className="text-red-400">*</span>
              </label>
              <input
                id="slug" name="slug" type="text" required
                placeholder="my-project"
                className={inputCls}
              />
              <p className="text-xs text-stone-400">
                URL 标识符，只能含小写字母、数字、连字符，全站唯一。创建后不可修改。
              </p>
            </div>

            {/* description */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="block text-sm font-medium text-stone-700">
                一句话简介 <span className="text-red-400">*</span>
              </label>
              <textarea id="description" name="description" required rows={2} placeholder="用一句话描述这个项目……" className={inputCls} />
            </div>

            {/* content */}
            <div className="space-y-1.5">
              <label htmlFor="content" className="block text-sm font-medium text-stone-700">
                项目说明
              </label>
              <textarea id="content" name="content" rows={5} placeholder="更详细的介绍，可留空" className={inputCls} />
            </div>

            {/* status */}
            <div className="space-y-1.5">
              <label htmlFor="status" className="block text-sm font-medium text-stone-700">
                状态
              </label>
              <select id="status" name="status" defaultValue="ongoing" className={inputCls}>
                <option value="ongoing">进行中</option>
                <option value="done">已完成</option>
                <option value="paused">已搁置</option>
              </select>
            </div>

            {/* tags */}
            <div className="space-y-1.5">
              <label htmlFor="tags" className="block text-sm font-medium text-stone-700">
                标签
              </label>
              <input id="tags" name="tags" type="text" placeholder="独立网站,前端,工具" className={inputCls} />
              <p className="text-xs text-stone-400">多个标签用逗号分隔</p>
            </div>

            {/* tech */}
            <div className="space-y-1.5">
              <label htmlFor="tech" className="block text-sm font-medium text-stone-700">
                技术栈
              </label>
              <input id="tech" name="tech" type="text" placeholder="Next.js,TypeScript,Tailwind" className={inputCls} />
              <p className="text-xs text-stone-400">多个技术用逗号分隔</p>
            </div>

            {/* createdAt */}
            <div className="space-y-1.5">
              <label htmlFor="createdAt" className="block text-sm font-medium text-stone-700">
                创建时间 <span className="text-red-400">*</span>
              </label>
              <input id="createdAt" name="createdAt" type="text" required placeholder="2025-01" className={inputCls} />
              <p className="text-xs text-stone-400">建议格式 YYYY-MM 或 YYYY-MM-DD</p>
            </div>

            {/* updatedAt */}
            <div className="space-y-1.5">
              <label htmlFor="updatedAt" className="block text-sm font-medium text-stone-700">
                更新时间
              </label>
              <input id="updatedAt" name="updatedAt" type="text" placeholder="2025-06" className={inputCls} />
              <p className="text-xs text-stone-400">有开发记录时会自动取最新记录日期，此字段可留空</p>
            </div>

            {/* featured */}
            <div className="flex items-center gap-2">
              <input id="featured" name="featured" type="checkbox" className="h-4 w-4 rounded border-stone-300 text-emerald-600" />
              <label htmlFor="featured" className="text-sm text-stone-700">
                在首页"最近项目"中展示（featured）
              </label>
            </div>

            {/* github */}
            <div className="space-y-1.5">
              <label htmlFor="github" className="block text-sm font-medium text-stone-700">
                GitHub 链接
              </label>
              <input id="github" name="github" type="url" placeholder="https://github.com/..." className={inputCls} />
            </div>

            {/* demo */}
            <div className="space-y-1.5">
              <label htmlFor="demo" className="block text-sm font-medium text-stone-700">
                演示/访问链接
              </label>
              <input id="demo" name="demo" type="url" placeholder="https://..." className={inputCls} />
            </div>

            {/* logs */}
            <div className="space-y-2 border-t border-stone-100 pt-5">
              <label className="block text-sm font-medium text-stone-700">
                开发记录
              </label>
              <LogsEditor initialLogs={[]} />
            </div>

            {/* 操作 */}
            <div className="flex items-center gap-3 border-t border-stone-100 pt-5">
              <button
                type="submit"
                className="rounded-sm bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                创建项目
              </button>
              <Link href="/admin/projects" className="text-sm text-stone-500 hover:text-stone-700">
                取消
              </Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
