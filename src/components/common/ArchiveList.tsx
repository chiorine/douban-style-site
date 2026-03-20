type ArchiveItem = {
  year: number;
  month: number;
  count: number;
};

type ArchiveListProps = {
  archives: ArchiveItem[];
};

export default function ArchiveList({ archives }: ArchiveListProps) {
  return (
    <ul className="space-y-3 text-sm text-stone-600">
      {archives.map((item) => (
        <li key={`${item.year}-${item.month}`} className="flex items-center justify-between">
          <a href="#" className="transition hover:text-emerald-700">
            {item.year} 年 {String(item.month).padStart(2, "0")} 月
          </a>
          <span className="text-stone-400">{item.count}</span>
        </li>
      ))}
    </ul>
  );
}