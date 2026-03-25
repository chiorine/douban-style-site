import Link from "next/link";
import { getAllProjects, formatProjectStatus, resolveUpdatedAt } from "@/lib/projects";
import DeleteProjectButton from "./DeleteProjectButton";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="space-y-6">

        {/* 页头 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-stone-800">
              项目管理
            </h1>
            <p className="mt-1 text-sm text-stone-500">共 {projects.length} 个项目</p>
          </div>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            + 新建项目
          </Link>
        </div>

        {/* 列表 */}
        {projects.length === 0 ? (
          <div className="rounded-md border border-stone-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-stone-400">暂无项目，去新建一个吧。</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => {
              const updatedAt = resolveUpdatedAt(project);

              return (
                <div
                  key={project.slug}
                  className="rounded-md border border-stone-200 bg-white px-5 py-4"
                >
                  <div className="flex items-start gap-4">
                    {/* 内容区 */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-stone-800">
                          {project.title}
                        </span>

                        {/* 状态 badge */}
                        <span
                          className={[
                            "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs",
                            project.status === "ongoing"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : project.status === "done"
                                ? "border-stone-200 bg-stone-50 text-stone-500"
                                : "border-amber-200 bg-amber-50 text-amber-700",
                          ].join(" ")}
                        >
                          {formatProjectStatus(project.status)}
                        </span>

                        {/* featured 标识 */}
                        {project.featured && (
                          <span className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs text-stone-400">
                            精选
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-stone-400">
                        slug：<span className="font-mono">{project.slug}</span>
                        {updatedAt && (
                          <span className="ml-3">最近更新：{updatedAt}</span>
                        )}
                        {project.logs && project.logs.length > 0 && (
                          <span className="ml-3">
                            开发记录：{project.logs.length} 条
                          </span>
                        )}
                      </p>

                      <p className="mt-1.5 line-clamp-1 text-sm text-stone-500">
                        {project.description}
                      </p>
                    </div>

                    {/* 操作区 */}
                    <div className="flex shrink-0 items-center gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="text-xs text-stone-400 transition hover:text-emerald-700"
                      >
                        预览
                      </Link>
                      <Link
                        href={`/admin/projects/${project.slug}/edit`}
                        className="text-xs text-stone-500 transition hover:text-emerald-700"
                      >
                        编辑
                      </Link>
                      <DeleteProjectButton
                        slug={project.slug}
                        title={project.title}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
