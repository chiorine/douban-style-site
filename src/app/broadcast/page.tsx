import Link from "next/link";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SidebarCard from "@/components/layout/SidebarCard";
import BroadcastFilter from "@/components/broadcast/BroadcastFilter";
import TagList from "@/components/common/TagList";
import { prisma } from "@/lib/prisma";
import { getTagCountsFromItems } from "@/lib/tags";

type SearchParams = {
  tag?: string;
  month?: string;
};

export default async function BroadcastPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { tag, month } = await searchParams;

    const rows = await prisma.broadcast.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });

    // tags 在数据库中存储为 JSON 字符串，转换为组件期望的 string[]
  const broadcasts = rows.map((row) => ({
    ...row,
    id: String(row.id),
    tags: JSON.parse(row.tags) as string[],
  }));

  // URL 参数筛选：tag / month 同时存在时取交集
  const filteredBroadcasts = broadcasts.filter((item) => {
    if (tag && !item.tags.includes(tag)) return false;
    if (month && !item.publishedAt.startsWith(month)) return false;
    return true;
  });

  // 边栏标签统计：始终基于全部已发布广播
  const broadcastTagCounts = getTagCountsFromItems(broadcasts);

  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">
      
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,720px)_300px]">
          <section className="space-y-6">
            <section className="rounded-md border border-stone-200 bg-white px-6 py-6">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Broadcast</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-800">
                广播
              </h1>
              <p className="mt-4 text-[15px] leading-8 text-stone-600">
                这里放一些更短、更即时的记录。可能只是一个念头，一句感受，
                或者某个普通时刻里突然想记下来的东西。
              </p>
            </section>

            {/* 筛选状态条：有 tag 或 month 时才显示 */}
            {(tag || month) && (
              <div className="flex flex-wrap items-center gap-3 rounded-md border border-stone-200 bg-white px-5 py-3 text-sm text-stone-600">
                {tag && (
                  <span>
                    当前标签：
                    <span className="ml-1 font-medium text-stone-800">#{tag}</span>
                  </span>
                )}
                {month && (
                  <span>
                    当前月份：
                    <span className="ml-1 font-medium text-stone-800">{month}</span>
                  </span>
                )}
                <Link
                  href="/broadcast"
                  className="ml-auto text-xs text-stone-400 transition hover:text-emerald-700"
                >
                  清除筛选
                </Link>
              </div>
            )}

            {/* 列表或空状态 */}
            {filteredBroadcasts.length > 0 ? (
              <BroadcastFilter items={filteredBroadcasts} />
            ) : (
              <div className="rounded-md border border-stone-200 bg-white px-6 py-10 text-center">
                <p className="text-sm text-stone-500">没有找到符合条件的广播。</p>
                <p className="mt-2 text-sm text-stone-400">
                  你可以尝试更换标签，或者
                  <Link href="/broadcast" className="ml-1 text-emerald-700 hover:underline">
                    清除当前筛选
                  </Link>
                  。
                </p>
              </div>
            )}
          </section>

                    <aside className="space-y-6">
            <SidebarCard title="标签">
              <TagList
                tags={broadcastTagCounts}
                basePath="/broadcast"
                activeTag={tag}
              />
            </SidebarCard>

            <SidebarCard title="关于广播">
              <p className="text-sm leading-7 text-stone-600">
                和日记相比，广播更轻一些，也更碎一些。它不一定完整，
                但很适合留下当时最直接的想法。
              </p>
            </SidebarCard>

            <SidebarCard title="浏览方式">
              <ul className="space-y-3 text-sm leading-7 text-stone-600">
                <li>可以先按标签筛选，再浏览对应内容。</li>
                <li>点开任意一条广播可以进入详情页。</li>
                <li>详情页支持上一条 / 下一条切换。</li>
              </ul>
            </SidebarCard>
          </aside>
        </div>
      </div>

    </main>
  );
}