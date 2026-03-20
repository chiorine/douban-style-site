"use client";

import { useMemo, useState } from "react";
import type { Broadcast } from "@/data/broadcasts";
import BroadcastList from "./BroadcastList";

type BroadcastFilterProps = {
  items: Broadcast[];
};

export default function BroadcastFilter({ items }: BroadcastFilterProps) {
  const [activeTag, setActiveTag] = useState("全部");

  const allTags = useMemo(() => {
    const tags = new Set<string>();

    items.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag));
    });

    return ["全部", ...Array.from(tags)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeTag === "全部") return items;
    return items.filter((item) => item.tags.includes(activeTag));
  }, [activeTag, items]);

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

      <div className="text-sm text-stone-500">
        当前共显示 <span className="font-medium text-stone-700">{filteredItems.length}</span> 条广播
      </div>

      <BroadcastList items={filteredItems} />
    </section>
  );
}