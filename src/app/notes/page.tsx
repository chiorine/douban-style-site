import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SidebarCard from "@/components/layout/SidebarCard";
import NotesFilter from "@/components/notes/NotesFilter";
import TagList from "@/components/common/TagList";
import { prisma } from "@/lib/prisma";
import { getTagCountsFromItems } from "@/lib/tags";
import type { NoteForPage } from "@/types/note";

type SearchParams = { tag?: string };

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { tag } = await searchParams;

  // 只读取已发布的日记，按 createdAt 倒序
  const rows = await prisma.note.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });

  const allNotes: NoteForPage[] = rows.map((row) => ({
    ...row,
    summary: row.summary ?? "",
    tags: JSON.parse(row.tags) as string[],
    content: JSON.parse(row.content) as string[],
  }));

    // URL tag 参数预筛选；NotesFilter 内部还可以继续按月份 / 标签二次筛选
  const filteredNotes = tag
    ? allNotes.filter((n) => n.tags.includes(tag))
    : allNotes;

  // 注意：边栏标签统计始终基于全部已发布日记（不随筛选变化）
  const notesTagCounts = getTagCountsFromItems(allNotes);

  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">
      
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,720px)_300px]">
          <section className="space-y-6">
            <section className="rounded-md border border-stone-200 bg-white px-6 py-6">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Notes</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-800">
                日记
              </h1>
              <p className="mt-4 text-[15px] leading-8 text-stone-600">
                记录生活、阅读、网站和一些慢慢成形的想法。它们不急着总结，也不急着证明什么，
                只是安静地留在这里，方便以后回头翻看。
              </p>
            </section>

            {/* tag 筛选状态条 */}
            {tag && (
              <div className="flex flex-wrap items-center gap-3 rounded-md border border-stone-200 bg-white px-5 py-3 text-sm text-stone-600">
                <span>
                  当前标签：
                  <span className="ml-1 font-medium text-stone-800">#{tag}</span>
                </span>
                <Link
                  href="/notes"
                  className="ml-auto text-xs text-stone-400 transition hover:text-emerald-700"
                >
                  清除筛选
                </Link>
              </div>
            )}

            {tag && filteredNotes.length === 0 ? (
              <div className="rounded-md border border-stone-200 bg-white px-6 py-10 text-center">
                <p className="text-sm text-stone-500">
                  没有找到标签为 <span className="font-medium text-stone-700">#{tag}</span> 的日记。
                </p>
                <p className="mt-2 text-sm text-stone-400">
                  你可以尝试其他标签，或者{""}  
                  <Link href="/notes" className="ml-1 text-emerald-700 hover:underline">
                    清除当前筛选
                  </Link>
                  。
                </p>
              </div>
            ) : (
              <NotesFilter items={filteredNotes} />
            )}
          </section>

                    <aside className="space-y-6">
            <SidebarCard title="标签">
              <TagList
                tags={notesTagCounts}
                basePath="/notes"
                activeTag={tag}
              />
            </SidebarCard>

            <SidebarCard title="关于这个页面">
              <p className="text-sm leading-7 text-stone-600">
                这里收的是比广播稍长一点的文字。它们不一定完整，也不一定重要，
                但大多都和当时的生活状态有关：看过的、想到的、正在做的，
                或者只是某一天里不想太快忘掉的一点感觉。
              </p>
            </SidebarCard>

            <SidebarCard title="浏览方式">
              <ul className="space-y-3 text-sm leading-7 text-stone-600">
                <li>可以先按标签筛选，再按月份归档缩小范围。</li>
                <li>点进标题后可以查看全文。</li>
                <li>文章详情页底部支持上一篇 / 下一篇跳转。</li>
              </ul>
            </SidebarCard>
          </aside>
        </div>
      </div>

    </main>
  );
}