"use client";

import { useMemo, useState } from "react";
import type { NoteForPage } from "@/types/note";
import NoteList from "./NoteList";

type NotesFilterProps = {
  items: NoteForPage[];
};

type ArchiveItem = {
  key: string;
  label: string;
  count: number;
};

function getArchiveKey(date: string) {
  return date.slice(0, 7); // 2025-03
}

function getArchiveLabel(key: string) {
  const [year, month] = key.split("-");
  return `${year} 年 ${month} 月`;
}

export default function NotesFilter({ items }: NotesFilterProps) {
  const [activeTag, setActiveTag] = useState("全部");
  const [activeArchive, setActiveArchive] = useState("全部");

  const allTags = useMemo(() => {
    const tags = new Set<string>();

    items.forEach((note) => {
      note.tags.forEach((tag) => tags.add(tag));
    });

    return ["全部", ...Array.from(tags)];
  }, [items]);

  const allArchives = useMemo<ArchiveItem[]>(() => {
    const map = new Map<string, number>();

    items.forEach((note) => {
      const key = getArchiveKey(note.date);
      map.set(key, (map.get(key) ?? 0) + 1);
    });

    return [
      { key: "全部", label: "全部时间", count: items.length },
      ...Array.from(map.entries())
        .sort((a, b) => (a[0] < b[0] ? 1 : -1))
        .map(([key, count]) => ({
          key,
          label: getArchiveLabel(key),
          count,
        })),
    ];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((note) => {
      const matchTag = activeTag === "全部" || note.tags.includes(activeTag);
      const matchArchive =
        activeArchive === "全部" || getArchiveKey(note.date) === activeArchive;

      return matchTag && matchArchive;
    });
  }, [activeTag, activeArchive, items]);

  return (
    <section className="space-y-5">
      <div className="rounded-md border border-stone-200 bg-white px-5 py-5">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-base font-semibold tracking-tight text-stone-800">标签筛选</h2>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isActive = tag === activeTag;

            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={[
                  "inline-flex items-center rounded-sm border px-3 py-1 text-sm transition",
                  isActive
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-stone-200 bg-stone-50 text-stone-600 hover:border-emerald-300 hover:text-emerald-700",
                ].join(" ")}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-md border border-stone-200 bg-white px-5 py-5">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-base font-semibold tracking-tight text-stone-800">归档</h2>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {allArchives.map((archive) => {
            const isActive = archive.key === activeArchive;

            return (
              <button
                key={archive.key}
                type="button"
                onClick={() => setActiveArchive(archive.key)}
                className={[
                  "inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-sm transition",
                  isActive
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-stone-200 bg-stone-50 text-stone-600 hover:border-emerald-300 hover:text-emerald-700",
                ].join(" ")}
              >
                <span>{archive.label}</span>
                <span className="text-xs text-stone-400">({archive.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-sm text-stone-500">
        当前共显示 <span className="font-medium text-stone-700">{filteredItems.length}</span> 篇文章
      </div>

      <NoteList items={filteredItems} />
    </section>
  );
}