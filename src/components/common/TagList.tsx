import Link from "next/link";
import type { TagCountItem } from "@/lib/tags";

export type TagItem = TagCountItem | { name: string; count?: number };

type TagListProps = {
  tags: TagItem[];
  basePath?: string;
  activeTag?: string;
};

export default function TagList({
  tags,
  basePath = "/notes",
  activeTag,
}: TagListProps) {
  if (tags.length === 0) {
    return <p className="text-sm text-stone-400">暂无标签</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((item) => {
        const isActive = activeTag === item.name;
        return (
          <Link
            key={item.name}
            href={`${basePath}?tag=${encodeURIComponent(item.name)}`}
            className={[
              "inline-flex items-center gap-1 rounded-sm border px-3 py-1 text-sm transition",
              isActive
                ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                : "border-stone-200 bg-stone-50 text-stone-600 hover:border-emerald-300 hover:text-emerald-700",
            ].join(" ")}
          >
            <span>{item.name}</span>
            {item.count !== undefined && (
              <span
                className={[
                  "text-xs",
                  isActive ? "text-emerald-500" : "text-stone-400",
                ].join(" ")}
              >
                {item.count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}