import Link from "next/link";
import type { Broadcast } from "@/data/broadcasts";

type BroadcastCardProps = {
  item: Broadcast;
};

export default function BroadcastCard({ item }: BroadcastCardProps) {
  return (
    <article className="px-6 py-5">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
          <img
            src="/images/avatar.png"
            alt={item.nickname}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm text-stone-500">
            <span className="font-medium text-stone-700">Wewkee</span>
            <span className="ml-1">说：</span>
          </p>

          <div className="mt-2 text-[15px] leading-7 text-stone-700">
            <Link href={`/broadcast/${item.id}`} className="hover:text-emerald-700">
              {item.content}
            </Link>
          </div>

          <div className="mt-3 flex flex-col gap-2 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
            <time dateTime={item.publishedAt}>{item.publishedAt}</time>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs text-stone-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}