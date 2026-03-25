import Link from "next/link";
import type { Project } from "@/lib/projects";
import StatusBadge from "@/components/projects/StatusBadge";

/**
 * variant="compact"  → 首页"最近项目"用，只展示核心信息
 * variant="full"     → /projects 列表页用，展示更多字段
 */
type ProjectCardProps = {
  project: Project;
  variant?: "compact" | "full";
};

export default function ProjectCard({
  project,
  variant = "full",
}: ProjectCardProps) {
  if (variant === "compact") {
    return (
      <div className="space-y-2">
        {/* 标题 + 状态 */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-base font-medium text-stone-800 hover:text-emerald-700"
          >
            {project.title}
          </Link>
          <StatusBadge status={project.status} />
        </div>

        {/* 一句话简介 */}
        <p className="text-sm leading-7 text-stone-600">{project.description}</p>

        {/* tech 标签（最多 4 个） */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs text-stone-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // full variant
  return (
    <article className="space-y-3 px-6 py-5">
      {/* 标题 + 状态 */}
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-stone-800">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-emerald-700"
          >
            {project.title}
          </Link>
        </h2>
        <StatusBadge status={project.status} />
      </div>

      {/* 描述 */}
      <p className="text-[15px] leading-7 text-stone-600">{project.description}</p>

      {/* tech 标签 */}
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

      {/* tags + 时间 + 详情链接 */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
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

        <div className="flex items-center gap-4 text-xs text-stone-400">
          {project.updatedAt ? (
            <span>更新于 {project.updatedAt}</span>
          ) : (
            <span>创建于 {project.createdAt}</span>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="text-emerald-700 transition hover:text-emerald-800"
          >
            查看详情 →
          </Link>
        </div>
      </div>
    </article>
  );
}
