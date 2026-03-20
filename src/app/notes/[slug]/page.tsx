import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { NoteForPage } from "@/types/note";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SidebarCard from "@/components/layout/SidebarCard";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 只返回已发布的日记，draft 返回 404
  const row = await prisma.note.findUnique({ where: { slug } });
  if (!row || row.status !== "published") notFound();

  const note: NoteForPage = {
    ...row,
    summary: row.summary ?? "",
    tags: JSON.parse(row.tags) as string[],
    content: JSON.parse(row.content) as string[],
  };

  // 上一篇 / 下一篇：取全部已发布条目，按 date 排序
  const allPublished = await prisma.note.findMany({
    where: { status: "published" },
    orderBy: { date: "desc" },
    select: { slug: true, title: true },
  });
  const currentIndex = allPublished.findIndex((n) => n.slug === slug);
  const prevNote = currentIndex > 0 ? allPublished[currentIndex - 1] : null;
  const nextNote =
    currentIndex < allPublished.length - 1
      ? allPublished[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">

      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,720px)_300px]">
          <section className="space-y-6">
            <nav
              aria-label="面包屑"
              className="rounded-md border border-stone-200 bg-white px-6 py-4 text-sm text-stone-500"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/" className="hover:text-emerald-700">
                  首页
                </Link>
                <span>/</span>
                <Link href="/notes" className="hover:text-emerald-700">
                  日记
                </Link>
                <span>/</span>
                <span className="text-stone-700">{note.title}</span>
              </div>
            </nav>

            <article className="rounded-md border border-stone-200 bg-white px-6 py-8">
              <header className="border-b border-stone-200 pb-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
                  <time dateTime={note.date}>{note.date}</time>
                  <span>·</span>
                  <span>{note.readingTime}</span>
                </div>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-800">
                  {note.title}
                </h1>

                                <div className="mt-4 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/notes?tag=${tag}`}
                      className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs text-stone-500 transition hover:text-emerald-700"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </header>

              <div className="mt-6 space-y-5 text-[15px] leading-8 text-stone-700">
                {note.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>

            <nav className="grid gap-4 sm:grid-cols-2">
              <div>
                {prevNote ? (
                  <Link
                    href={`/notes/${prevNote.slug}`}
                    className="block rounded-md border border-stone-200 bg-white px-5 py-4 transition hover:border-emerald-300 hover:bg-emerald-50/40"
                  >
                    <p className="text-xs text-stone-500">上一篇</p>
                    <p className="mt-1 text-sm font-medium text-stone-800">
                      {prevNote.title}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-md border border-dashed border-stone-200 bg-stone-50 px-5 py-4 text-sm text-stone-400">
                    已经是第一篇
                  </div>
                )}
              </div>

              <div>
                {nextNote ? (
                  <Link
                    href={`/notes/${nextNote.slug}`}
                    className="block rounded-md border border-stone-200 bg-white px-5 py-4 text-right transition hover:border-emerald-300 hover:bg-emerald-50/40"
                  >
                    <p className="text-xs text-stone-500">下一篇</p>
                    <p className="mt-1 text-sm font-medium text-stone-800">
                      {nextNote.title}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-md border border-dashed border-stone-200 bg-stone-50 px-5 py-4 text-right text-sm text-stone-400">
                    已经是最后一篇
                  </div>
                )}
              </div>
            </nav>
          </section>

          <aside className="space-y-6">
            <SidebarCard title="当前文章">
              <div className="space-y-3 text-sm text-stone-600">
                <p>
                  <span className="text-stone-400">标题：</span>
                  <span className="text-stone-700">{note.title}</span>
                </p>
                <p>
                  <span className="text-stone-400">日期：</span>
                  <span className="text-stone-700">{note.date}</span>
                </p>
                <p>
                  <span className="text-stone-400">阅读时间：</span>
                  <span className="text-stone-700">{note.readingTime}</span>
                </p>
              </div>
            </SidebarCard>

                        <SidebarCard title="标签">
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/notes?tag=${tag}`}
                    className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-3 py-1 text-sm text-stone-600 transition hover:text-emerald-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </SidebarCard>

            <SidebarCard title="页面导航">
              <div className="space-y-3 text-sm text-stone-600">
                <p>
                  <Link href="/notes" className="hover:text-emerald-700">
                    ← 返回日记列表
                  </Link>
                </p>
                <p>
                  <Link href="/" className="hover:text-emerald-700">
                    ← 返回首页
                  </Link>
                </p>
              </div>
            </SidebarCard>
          </aside>
        </div>
      </div>

    </main>
  );
}