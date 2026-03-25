import Link from "next/link";
import { notFound } from "next/navigation";
import SidebarCard from "@/components/layout/SidebarCard";
import ProjectTimeline from "@/components/projects/ProjectTimeline";
import StatusBadge from "@/components/projects/StatusBadge";
import { getProjectBySlug, formatProjectStatus, resolveUpdatedAt } from "@/lib/projects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const updatedAt = resolveUpdatedAt(project);

  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,720px)_300px]">
          {/* 主内容区 */}
          <section className="space-y-6">
            {/* 面包屑 */}
            <nav
              aria-label="面包屑"
              className="rounded-md border border-stone-200 bg-white px-6 py-4 text-sm text-stone-500"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/" className="hover:text-emerald-700">
                  首页
                </Link>
                <span>/</span>
                <Link href="/projects" className="hover:text-emerald-700">
                  项目
                </Link>
                <span>/</span>
                <span className="text-stone-700">{project.title}</span>
              </div>
            </nav>

            {/* ── Header 区 ── */}
            <article className="rounded-md border border-stone-200 bg-white px-6 py-8">
              <header>
                {/* 标题 + 状态 */}
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight text-stone-800">
                    {project.title}
                  </h1>
                  <StatusBadge status={project.status} />
                </div>

                {/* 时间 */}
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-stone-400">
                  <span>创建于 {project.createdAt}</span>
                  {updatedAt && <span>最近更新 {updatedAt}</span>}
                </div>

                {/* 描述 */}
                <p className="mt-4 text-[15px] leading-8 text-stone-600">
                  {project.description}
                </p>
              </header>

              {/* ── 项目说明 ── */}
              {project.content && (
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-widest text-stone-400">
                    项目说明
                  </p>
                  <p className="text-[15px] leading-8 text-stone-700">
                    {project.content}
                  </p>
                </div>
              )}

              {/* ── 技术栈 ── */}
              {project.tech.length > 0 && (
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <p className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-400">
                    技术栈
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs text-stone-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── 标签 ── */}
              {project.tags.length > 0 && (
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <p className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-400">
                    标签
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs text-stone-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ── 外链区 ── */}
              {project.links &&
                (project.links.github || project.links.demo) && (
                  <div className="mt-6 border-t border-stone-200 pt-5">
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-400">
                      相关链接
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 transition hover:border-emerald-300 hover:text-emerald-700"
                        >
                          GitHub →
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 transition hover:border-emerald-300 hover:text-emerald-700"
                        >
                          在线访问 →
                        </a>
                      )}
                    </div>
                  </div>
                )}
            </article>

            {/* ── 开发时间线 ── */}
            <ProjectTimeline logs={project.logs} />

            {/* ── 返回导航 ── */}
            <div>
              <Link
                href="/projects"
                className="block rounded-md border border-stone-200 bg-white px-5 py-4 text-sm text-stone-600 transition hover:border-emerald-300 hover:bg-emerald-50/40"
              >
                ← 返回项目列表
              </Link>
            </div>
          </section>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            <SidebarCard title="项目信息">
              <div className="space-y-3 text-sm text-stone-600">
                <p>
                  <span className="text-stone-400">状态：</span>
                  <span className="text-stone-700">
                    {formatProjectStatus(project.status)}
                  </span>
                </p>
                <p>
                  <span className="text-stone-400">创建于：</span>
                  <span className="text-stone-700">{project.createdAt}</span>
                </p>
                {updatedAt && (
                  <p>
                    <span className="text-stone-400">最近更新：</span>
                    <span className="text-stone-700">{updatedAt}</span>
                  </p>
                )}
                {project.logs && (
                  <p>
                    <span className="text-stone-400">开发记录：</span>
                    <span className="text-stone-700">{project.logs.length} 条</span>
                  </p>
                )}
              </div>
            </SidebarCard>

            {project.tech.length > 0 && (
              <SidebarCard title="技术栈">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-3 py-1 text-sm text-stone-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SidebarCard>
            )}

            <SidebarCard title="页面导航">
              <div className="space-y-3 text-sm text-stone-600">
                <p>
                  <Link href="/projects" className="hover:text-emerald-700">
                    ← 返回项目列表
                  </Link>
                </p>
                <p>
                  <Link href="/" className="hover:text-emerald-700">
                    ← 返回首页
                  </Link>
                </p>
              </div>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </main>
  );
}
