import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteNote } from "./actions";

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

export default async function AdminNotesPage() {
  const rows = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });

  const notes = rows.map((row) => ({
    ...row,
    tags: JSON.parse(row.tags) as string[],
    summary: row.summary ?? "",
  }));

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="space-y-6">

        {/* 页头 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-stone-800">日记管理</h1>
            <p className="mt-1 text-sm text-stone-500">共 {notes.length} 篇</p>
          </div>
          <Link
            href="/admin/notes/new"
            className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            + 新建日记
          </Link>
        </div>

        {/* 列表 */}
        {notes.length === 0 ? (
          <div className="rounded-md border border-stone-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-stone-400">暂无日记，去新建一篇吧。</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => {
              const deleteFn = deleteNote.bind(null, note.id);
              return (
                <div
                  key={note.id}
                  className={[
                    "rounded-md border bg-white px-5 py-4 transition",
                    note.status === "draft"
                      ? "border-amber-100 bg-amber-50/30"
                      : "border-stone-200",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-4">
                    {/* 正文区 */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-stone-800">
                          {note.title}
                        </span>
                        <StatusBadge status={note.status} />
                        <span className="text-xs text-stone-400">{note.date}</span>
                        {note.readingTime && (
                          <span className="text-xs text-stone-400">· {note.readingTime}</span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-stone-400">
                        slug：<span className="font-mono">{note.slug}</span>
                      </p>

                      {note.summary && (
                        <p className="mt-2 line-clamp-2 text-sm leading-7 text-stone-600">
                          {note.summary}
                        </p>
                      )}

                      {note.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {note.tags.map((tag) => (
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
                        href={`/admin/notes/${note.id}/edit`}
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
