import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SidebarCard from "@/components/layout/SidebarCard";

export default async function BroadcastDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

    const row = await prisma.broadcast.findUnique({ where: { id: numericId } });
  if (!row || row.status !== "published") notFound();

  // 转换为页面原有结构可直接使用的格式
  const item = { ...row, id: String(row.id), tags: JSON.parse(row.tags) as string[] };

  // 上一条：id 比当前小、取最近一条；下一条：id 比当前大、取最近一条
  const prevRow = await prisma.broadcast.findFirst({
    where: { id: { lt: numericId } },
    orderBy: { id: "desc" },
  });
  const nextRow = await prisma.broadcast.findFirst({
    where: { id: { gt: numericId } },
    orderBy: { id: "asc" },
  });
  const prevItem = prevRow ? { id: String(prevRow.id), content: prevRow.content } : null;
  const nextItem = nextRow ? { id: String(nextRow.id), content: nextRow.content } : null;

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
                <Link href="/broadcast" className="hover:text-emerald-700">
                  广播
                </Link>
                <span>/</span>
                <span className="text-stone-700">第 {item.id} 条</span>
              </div>
            </nav>

            <article className="rounded-md border border-stone-200 bg-white px-6 py-8">
              <div className="flex items-start gap-4">
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
                  {item.avatar.startsWith("/") ? (
                    <img
                      src={item.avatar}
                      alt={item.nickname}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-base font-medium text-stone-600">
                      {item.avatar}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm text-stone-500">
                    <span className="font-medium text-stone-700">{item.nickname}</span>
                    <span className="ml-1">说：</span>
                  </p>

                  <div className="mt-4 text-[16px] leading-8 text-stone-700">
                    {item.content}
                  </div>

                  <div className="mt-5 flex flex-col gap-3 text-sm text-stone-500">
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

            <nav className="grid gap-4 sm:grid-cols-2">
              <div>
                {prevItem ? (
                  <Link
                    href={`/broadcast/${prevItem.id}`}
                    className="block rounded-md border border-stone-200 bg-white px-5 py-4 transition hover:border-emerald-300 hover:bg-emerald-50/40"
                  >
                    <p className="text-xs text-stone-500">上一条</p>
                    <p className="mt-1 line-clamp-2 text-sm font-medium text-stone-800">
                      {prevItem.content}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-md border border-dashed border-stone-200 bg-stone-50 px-5 py-4 text-sm text-stone-400">
                    已经是第一条
                  </div>
                )}
              </div>

              <div>
                {nextItem ? (
                  <Link
                    href={`/broadcast/${nextItem.id}`}
                    className="block rounded-md border border-stone-200 bg-white px-5 py-4 text-right transition hover:border-emerald-300 hover:bg-emerald-50/40"
                  >
                    <p className="text-xs text-stone-500">下一条</p>
                    <p className="mt-1 line-clamp-2 text-sm font-medium text-stone-800">
                      {nextItem.content}
                    </p>
                  </Link>
                ) : (
                  <div className="rounded-md border border-dashed border-stone-200 bg-stone-50 px-5 py-4 text-right text-sm text-stone-400">
                    已经是最后一条
                  </div>
                )}
              </div>
            </nav>
          </section>

                    <aside className="space-y-6">
            <SidebarCard title="当前广播">
              <div className="space-y-3 text-sm text-stone-600">
                <p>
                  <span className="text-stone-400">编号：</span>
                  <span className="text-stone-700">{item.id}</span>
                </p>
                <p>
                  <span className="text-stone-400">作者：</span>
                  <span className="text-stone-700">{item.nickname}</span>
                </p>
                <p>
                  <span className="text-stone-400">时间：</span>
                  <span className="text-stone-700">{item.publishedAt}</span>
                </p>
              </div>
            </SidebarCard>
                        <SidebarCard title="标签">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/broadcast?tag=${tag}`}
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
                  <Link href="/broadcast" className="hover:text-emerald-700">
                    ← 返回广播列表
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