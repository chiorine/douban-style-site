import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBroadcast } from "./actions";

// 状态徽章
function StatusBadge({ status }: { status: string }) {
  const isDraft = status === "draft";
  return (
    <span
      className={[
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium",
        isDraft
          ? "border-amber-200 bg-amber-50 text-amber-600"
          : "border-emerald-200 bg-emerald-50 text-emerald-700",
      ].join(" ")}
    >
      {isDraft ? "草稿" : "已发布"}
    </span>
  );
}

export default async function AdminBroadcastPage() {
  const rows = await prisma.broadcast.findMany({
    orderBy: { createdAt: "desc" },
  });

  const broadcasts = rows.map((row) => ({
    ...row,
    tags: JSON.parse(row.tags) as string[],
  }));

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="space-y-6">

        {/* 页头 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-stone-800">广播管理</h1>
            <p className="mt-1 text-sm text-stone-500">共 {broadcasts.length} 条</p>
          </div>
          <Link
            href="/admin/broadcast/new"
            className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            + 新建广播
          </Link>
        </div>

        {/* 列表 */}
        {broadcasts.length === 0 ? (
          <div className="rounded-md border border-stone-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-stone-400">暂无广播，去新建一条吧。</p>
          </div>
        ) : (
          <div className="space-y-3">
            {broadcasts.map((b) => {
              const deleteFn = deleteBroadcast.bind(null, b.id);
              return (
                <div
                  key={b.id}
                  className={[
                    "rounded-md border bg-white px-5 py-4 transition",
                    b.status === "draft"
                      ? "border-amber-100 bg-amber-50/30"
                      : "border-stone-200",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-4">
                    {/* 头像 */}
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
                      {b.avatar.startsWith("/") ? (
                        <img
                          src={b.avatar}
                          alt={b.nickname}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-medium text-stone-600">
                          {b.avatar}
                        </div>
                      )}
                    </div>

                    {/* 正文区 */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-stone-700">{b.nickname}</span>
                        <StatusBadge status={b.status} />
                        <span className="text-xs text-stone-400">{b.publishedAt}</span>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-7 text-stone-600">
                        {b.content}
                      </p>

                      {b.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {b.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs text-stone-500"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 操作区 */}
                    <div className="flex shrink-0 items-center gap-3">
                      <Link
                        href={`/admin/broadcast/${b.id}/edit`}
                        className="text-xs text-stone-500 transition hover:text-emerald-700"
                      >
                        编辑
                      </Link>
                      <form action={deleteFn}>
                        <button
                          type="submit"
                          className="text-xs text-stone-400 transition hover:text-red-500"
                        >
                          删除
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
