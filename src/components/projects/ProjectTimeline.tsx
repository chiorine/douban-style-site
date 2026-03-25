import type { ProjectLog } from "@/lib/projects";

type ProjectTimelineProps = {
  logs: ProjectLog[] | undefined;
};

export default function ProjectTimeline({ logs }: ProjectTimelineProps) {
  if (!logs || logs.length === 0) return null;

  return (
    <section className="rounded-md border border-stone-200 bg-white px-6 py-8">
      <h2 className="mb-6 text-base font-semibold tracking-tight text-stone-800">
        开发记录
      </h2>

      {/* 时间线主体 */}
      <ol className="space-y-6 border-l border-stone-200 pl-5">
        {logs.map((log, index) => (
          <li key={index} className="relative">
            {/* 左侧圆点 */}
            <span
              aria-hidden="true"
              className="absolute -left-[21px] top-[5px] h-2.5 w-2.5 rounded-full border border-stone-300 bg-stone-100"
            />

            {/* 日期 */}
            <time
              dateTime={log.date}
              className="block text-xs text-stone-400"
            >
              {log.date}
            </time>

            {/* 内容 */}
            <p className="mt-1.5 text-[15px] leading-7 text-stone-600">
              {log.content}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
