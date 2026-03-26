import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteExternalLink } from "./actions";

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

export default async function AdminLinksPage() {
  const rows = await prisma.externalLink.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="space-y-6">

        {/* 页头 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-stone-800">外部链接管理</h1>
            <p className="mt-1 text-sm text-stone-500">共 {rows.length} 条</p>
          </div>
          <Link
            href="/admin/links/new"
            className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            + 新建链接
          </Link>
        </div>

        {/* 列表 */}
        {rows.length === 0 ? (
          <div className="rounded-md border border-stone-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-stone-400">暂无外部链接，去新建一条吧。</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((link) => {
              const deleteFn = deleteExternalLink.bind(null, link.id);
              return (
                <div
                  key={link.id}
                  className={[
                    "rounded-md border bg-white px-5 py-4 transition",
                    link.status === "draft"
                      ? "border-amber-100 bg-amber-50/30"
                      : "border-stone-200",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-stone-800">
                          {link.title}
                        </span>
                        <StatusBadge status={link.status} />
                        <span className="text-xs text-stone-400">
                          排序：{link.sortOrder}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-stone-400 break-all">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="transition hover:text-emerald-700"
                        >
                          {link.url}
                        </a>
                      </p>

                      {link.description && (
                        <p className="mt-2 text-sm leading-7 text-stone-600">
                          {link.description}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <Link
                        href={`/admin/links/${link.id}/edit`}
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
