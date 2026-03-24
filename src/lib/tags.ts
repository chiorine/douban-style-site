export type TagCountItem = {
  name: string;
  count: number;
};

/** 从任意含 tags?: string[] 的对象数组中统计标签数量，按 count 降序 */
export function getTagCountsFromItems(
  items: Array<{ tags?: string[] | unknown }>
): TagCountItem[] {
  const map = new Map<string, number>();

  for (const item of items) {
    const tags = Array.isArray(item.tags) ? (item.tags as string[]) : [];
    for (const raw of tags) {
      const name = typeof raw === "string" ? raw.trim() : "";
      if (!name) continue;
      map.set(name, (map.get(name) ?? 0) + 1);
    }
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** 合并多个 TagCountItem[]，汇总同名标签的 count */
export function mergeTagCounts(...lists: TagCountItem[][]): TagCountItem[] {
  const map = new Map<string, number>();
  for (const list of lists) {
    for (const { name, count } of list) {
      map.set(name, (map.get(name) ?? 0) + count);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** 按 tag 过滤含 tags 字段的数组 */
export function filterItemsByTag<T extends { tags?: string[] | unknown }>(
  items: T[],
  tag: string
): T[] {
  return items.filter((item) => {
    const tags = Array.isArray(item.tags) ? (item.tags as string[]) : [];
    return tags.includes(tag);
  });
}
