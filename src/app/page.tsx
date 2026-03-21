import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { archives } from "@/data/archive";
import { prisma } from "@/lib/prisma";
import {
  nickname,
  avatar,
  bio,
  location,
  website,
  links,
  tags,
} from "@/data/site";
import { getHomeHero } from "@/lib/home-hero";

export default async function HomePage() {
  // 从 JSON 文件读取首页 Hero 配置（出错时自动降级到默认值）
  const homeHero = getHomeHero();
    const rows = await prisma.broadcast.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  // 最近日记：数据库读取，只取已发布
  const noteRows = await prisma.note.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  const recentNotes = noteRows.map((row) => ({
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? "",
    date: row.date,
    readingTime: row.readingTime,
    tags: JSON.parse(row.tags) as string[],
  }));

    const recentBroadcasts = rows.map((item) => ({
    id: String(item.id),
    nickname: item.nickname,
    avatar: item.avatar,
    content: item.content,
    publishedAt: item.publishedAt,
    tags: JSON.parse(item.tags) as string[],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    status: item.status,
  }));

  return (
    <main className="bg-stone-100 text-stone-800">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,720px)_300px]">
          <section className="space-y-6">
                        {homeHero.enabled && (
              <section className="rounded-md border border-stone-200 bg-white px-6 py-8">
                <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
                  {homeHero.eyebrow}
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-800">
                  {homeHero.title}
                </h1>
                <p className="mt-4 max-w-2xl text-[15px] leading-8 text-stone-600">
                  {homeHero.description}
                </p>
                {(homeHero.primaryAction || homeHero.secondaryAction) && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {homeHero.primaryAction && (
                      <Link
                        href={homeHero.primaryAction.href}
                        className="inline-flex items-center rounded-sm bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
                      >
                        {homeHero.primaryAction.label}
                      </Link>
                    )}
                    {homeHero.secondaryAction && (
                      <Link
                        href={homeHero.secondaryAction.href}
                        className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-600 transition hover:text-emerald-700"
                      >
                        {homeHero.secondaryAction.label}
                      </Link>
                    )}
                  </div>
                )}
              </section>
            )}

            <section className="rounded-md border border-stone-200 bg-white">
              <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  最近广播
                </h2>
                <Link
                  href="/broadcast"
                  className="text-sm text-emerald-700 hover:text-emerald-800"
                >
                  更多广播
                </Link>
              </div>

              <div className="divide-y divide-stone-200">
                {recentBroadcasts.map((item) => (
                  <article key={item.id} className="px-6 py-5">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
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
                          <span className="font-medium text-stone-700">
                            {item.nickname}
                          </span>
                          <span className="ml-1">说：</span>
                        </p>

                        <div className="mt-2 text-[15px] leading-7 text-stone-700">
                          <Link
                            href={`/broadcast/${item.id}`}
                            className="hover:text-emerald-700"
                          >
                            {item.content}
                          </Link>
                        </div>

                        <div className="mt-3 flex flex-col gap-2 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
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
                ))}
              </div>
            </section>

            <section className="rounded-md border border-stone-200 bg-white">
              <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  最近日记
                </h2>
                <Link
                  href="/notes"
                  className="text-sm text-emerald-700 hover:text-emerald-800"
                >
                  更多日记
                </Link>
              </div>

              <div className="divide-y divide-stone-200">
                {recentNotes.map((note) => (
                  <article key={note.slug} className="px-6 py-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-stone-500">
                        <time dateTime={note.date}>{note.date}</time>
                        <span>·</span>
                        <span>{note.readingTime}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-stone-800">
                        <Link
                          href={`/notes/${note.slug}`}
                          className="hover:text-emerald-700"
                        >
                          {note.title}
                        </Link>
                      </h3>

                      <p className="text-[15px] leading-7 text-stone-600">
                        {note.summary}
                      </p>

                      <div className="flex flex-wrap gap-2">
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
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-md border border-stone-200 bg-white px-6 py-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  最近项目
                </h2>
              </div>

              <div className="mt-4 space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <h3 className="text-base font-medium text-stone-800">
                      {project.title}
                      <span className="ml-2 text-xs text-stone-400">
                        · {project.status}
                      </span>
                    </h3>

                    <p className="text-sm leading-7 text-stone-600">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs text-stone-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </section>

          <aside className="space-y-6">
            <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="flex items-start gap-4">
                <Image
                  src={avatar}
                  alt={nickname}
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-full border border-stone-200 object-cover bg-stone-100"
                />

                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-stone-800">
                    {nickname}
                  </h2>
                  <p className="mt-1 text-sm text-stone-500">{location}</p>
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm transition hover:text-emerald-700"
                  >
                    个人主页链接
                  </a>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-stone-600">{bio}</p>
            </section>

            <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  标签
                </h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-3 py-1 text-sm text-stone-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  归档
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-stone-600">
                {archives.map((item) => (
                  <li
                    key={`${item.year}-${item.month}`}
                    className="flex items-center justify-between"
                  >
                    <Link
                      href={`/broadcast?month=${item.year}-${String(item.month).padStart(2, "0")}`}
                      className="transition hover:text-emerald-700"
                    >
                      {item.year} 年 {String(item.month).padStart(2, "0")} 月
                    </Link>
                    <span className="text-stone-400">{item.count}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  外部链接
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-stone-600">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center transition hover:text-emerald-700"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}