import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";
import LogsEditor from "../../LogsEditor";
import { updateProjectAction } from "../../actions";

const inputCls =
  "w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200";

type SearchParams = { error?: string };

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const { error } = await searchParams;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  // 将数组回填为逗号分隔字符串
  const tagsValue = project.tags.join(", ");
  const techValue = project.tech.join(", ");

  const updateFn = updateProjectAction.bind(null, slug);

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
            <span className="text-stone-700">编辑：{project.title}</span>
          </div>
        </nav>

        {/* 表单 */}
        <div className="rounded-md border border-stone-200 bg-white px-6 py-6">
          <h1 className="text-xl font-semibold tracking-tight text-stone-800">
            编辑项目
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            修改后保存，内容立即同步到前台。
          </p>

          {/* 错误提示 */}
          {error && (
            <div className="mt-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {decodeURIComponent(error)}
            </div>
          )}

          <form action={updateFn} className="mt-6 space-y-5">

            {/* slug（只读） */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-stone-700">
                Slug（只读）
              </label>
              <input
                type="text"
                defaultValue={project.slug}
                readOnly
                className="w-full rounded-sm border border-stone-100 bg-stone-100 px-3 py-2 text-sm text-stone-400 outline-none font-mono cursor-not-allowed"
              />
              <p className="text-xs text-stone-400">slug 不允许修改，以防旧链接失效。</p>
            </div>

            {/* title */}
            <div className="space-y-1.5">
              <label htmlFor="title" className="block text-sm font-medium text-stone-700">
                项目名称 <span className="text-red-400">*</span>
              </label>
              <input id="title" name="title" type="text" required defaultValue={project.title} className={inputCls} />
            </div>

            {/* description */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="block text-sm font-medium text-stone-700">
                一句话简介 <span className="text-red-400">*</span>
              </label>
              <textarea id="description" name="description" required rows={2} defaultValue={project.description} className={inputCls} />
            </div>

            {/* content */}
            <div className="space-y-1.5">
              <label htmlFor="content" className="block text-sm font-medium text-stone-700">
                项目说明
              </label>
              <textarea id="content" name="content" rows={6} defaultValue={project.content ?? ""} className={inputCls} />
            </div>

            {/* status */}
            <div className="space-y-1.5">
              <label htmlFor="status" className="block text-sm font-medium text-stone-700">
                状态
              </label>
              <select id="status" name="status" defaultValue={project.status} className={inputCls}>
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
              <input id="tags" name="tags" type="text" defaultValue={tagsValue} className={inputCls} />
              <p className="text-xs text-stone-400">多个标签用逗号分隔</p>
            </div>

            {/* tech */}
            <div className="space-y-1.5">
              <label htmlFor="tech" className="block text-sm font-medium text-stone-700">
                技术栈
              </label>
              <input id="tech" name="tech" type="text" defaultValue={techValue} className={inputCls} />
              <p className="text-xs text-stone-400">多个技术用逗号分隔</p>
            </div>

            {/* createdAt */}
            <div className="space-y-1.5">
              <label htmlFor="createdAt" className="block text-sm font-medium text-stone-700">
                创建时间 <span className="text-red-400">*</span>
              </label>
              <input id="createdAt" name="createdAt" type="text" required defaultValue={project.createdAt} className={inputCls} />
            </div>

            {/* updatedAt */}
            <div className="space-y-1.5">
              <label htmlFor="updatedAt" className="block text-sm font-medium text-stone-700">
                更新时间
              </label>
              <input id="updatedAt" name="updatedAt" type="text" defaultValue={project.updatedAt ?? ""} className={inputCls} />
              <p className="text-xs text-stone-400">有开发记录时会自动取最新记录日期</p>
            </div>

            {/* featured */}
            <div className="flex items-center gap-2">
              <input
                id="featured" name="featured" type="checkbox"
                defaultChecked={project.featured === true}
                className="h-4 w-4 rounded border-stone-300 text-emerald-600"
              />
              <label htmlFor="featured" className="text-sm text-stone-700">
                在首页"最近项目"中展示（featured）
              </label>
            </div>

            {/* github */}
            <div className="space-y-1.5">
              <label htmlFor="github" className="block text-sm font-medium text-stone-700">
                GitHub 链接
              </label>
              <input id="github" name="github" type="url" defaultValue={project.links?.github ?? ""} placeholder="https://github.com/..." className={inputCls} />
            </div>

            {/* demo */}
            <div className="space-y-1.5">
              <label htmlFor="demo" className="block text-sm font-medium text-stone-700">
                演示/访问链接
              </label>
              <input id="demo" name="demo" type="url" defaultValue={project.links?.demo ?? ""} placeholder="https://..." className={inputCls} />
            </div>

            {/* logs */}
            <div className="space-y-2 border-t border-stone-100 pt-5">
              <label className="block text-sm font-medium text-stone-700">
                开发记录
              </label>
              <LogsEditor initialLogs={project.logs ?? []} />
            </div>

            {/* 操作 */}
            <div className="flex items-center gap-3 border-t border-stone-100 pt-5">
              <button
                type="submit"
                className="rounded-sm bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                保存修改
              </button>
              <Link
                href={`/projects/${project.slug}`}
                target="_blank"
                className="text-sm text-stone-400 hover:text-emerald-700"
              >
                预览前台 →
              </Link>
              <Link href="/admin/projects" className="ml-auto text-sm text-stone-500 hover:text-stone-700">
                取消
              </Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
