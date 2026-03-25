import type { Project } from "@/lib/projects";
import { formatProjectStatus } from "@/lib/projects";

type StatusBadgeProps = {
  status: Project["status"];
};

const colorMap: Record<Project["status"], string> = {
  ongoing: "border-emerald-200 bg-emerald-50 text-emerald-700",
  done: "border-stone-200 bg-stone-50 text-stone-500",
  paused: "border-amber-200 bg-amber-50 text-amber-700",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs ${colorMap[status]}`}
    >
      {formatProjectStatus(status)}
    </span>
  );
}
