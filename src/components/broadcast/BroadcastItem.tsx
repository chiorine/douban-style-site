import Link from "next/link";
import type { Broadcast } from "@/data/broadcasts";

type BroadcastItemProps = {
  item: Broadcast;
};

export default function BroadcastItem({ item }: BroadcastItemProps) {
  return (
    <article className="px-6 py-6">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
          {item.avatar.startsWith("/") ? (
            <img
              src={item.avatar}
              alt={item.nickname}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-stone-600">
              {item.avatar}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm text-stone-500">
            <span className="font-medium text-stone-700">{item.nickname}</span>
            <span className="ml-1">说：</span>
          </p>

          <div className="mt-3 whitespace-pre-line text-[15px] leading-8 text-stone-700">
            {item.content}
          </div>

          <div className="mt-4 flex flex-col gap-3 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
            <time dateTime={item.publishedAt}>{item.publishedAt}</time>

            <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/broadcast?tag=${tag}`}
                  className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs text-stone-500 transition hover:text-emerald-700"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}