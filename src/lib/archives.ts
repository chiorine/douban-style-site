/**
 * 归档工具函数
 * 基于已发布日记的 date 字段统计，与 /notes 页数据源完全一致。
 */

export type ArchiveEntry = {
  month: string; // 格式 YYYY-MM
  label: string; // 格式 YYYY 年 MM 月
  count: number;
};

/** 从 date 字段（YYYY-MM-DD）提取 YYYY-MM */
export function dateToMonth(date: string): string {
  return date.slice(0, 7);
}

/** 将 YYYY-MM 转换为展示标签 YYYY 年 MM 月 */
export function monthToLabel(month: string): string {
  const [year, mm] = month.split("-");
  return `${year} 年 ${mm} 月`;
}

/**
 * 从日记列表统计归档，倒序排列
 * items 只需包含 date 字段（YYYY-MM-DD）
 */
export function buildArchives(items: { date: string }[]): ArchiveEntry[] {
  const map = new Map<string, number>();

  for (const item of items) {
    const month = dateToMonth(item.date);
    map.set(month, (map.get(month) ?? 0) + 1);
  }

  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([month, count]) => ({
      month,
      label: monthToLabel(month),
      count,
    }));
}
