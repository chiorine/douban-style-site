import type { Metadata } from "next";
import { siteName } from "@/data/site";

export const metadata: Metadata = {
  title: `关于 | ${siteName}`,
  description: "关于这个站点",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,720px)_300px]">
          <section className="space-y-6">

            {/* 页头 */}
            <section className="rounded-md border border-stone-200 bg-white px-6 py-8">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">About</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-800">
                关于
              </h1>
              <p className="mt-4 text-[15px] leading-8 text-stone-600">
                这是一个缓慢更新的个人站点，没有特定主题，也没有固定更新频率。
                它更像是一个长期放着的小本子，用来收拾零散的日常和不想太快忘掉的东西。
              </p>
            </section>

            {/* 内容说明 */}
            <section className="rounded-md border border-stone-200 bg-white px-6 py-6">
              <h2 className="text-base font-semibold tracking-tight text-stone-800">
                这里有什么
              </h2>
              <div className="mt-4 space-y-5 text-[15px] leading-8 text-stone-600">
                <div>
                  <p className="font-medium text-stone-700">广播</p>
                  <p className="mt-1">
                    短的、即时的记录。可能只是一个念头，一句感受，或者某个普通时刻里不想让它就这么过去的东西。
                    不一定完整，也不一定有什么结论。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-stone-700">日记</p>
                  <p className="mt-1">
                    稍微长一点的文字。阅读、观影、建站，或者是生活里某件事带来的一点思考。
                    它们不是文章，更不是总结，只是比广播多一些展开的空间。
                  </p>
                </div>
                <div>
                  <p className="font-medium text-stone-700">项目</p>
                  <p className="mt-1">
                    做过的一些小东西。有的是工具，有的是尝试，有的只是为了解决自己遇到的某个具体问题。
                    大多不起眼，但都是认真做过的。
                  </p>
                </div>
              </div>
            </section>

            {/* 补充说明 */}
            <section className="rounded-md border border-stone-200 bg-white px-6 py-6">
              <h2 className="text-base font-semibold tracking-tight text-stone-800">
                关于这个站点本身
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-8 text-stone-600">
                <p>
                  这个站点不是短期项目，也没有明确的完成时间。
                  它会随着时间慢慢变化，内容会积累，功能会调整，设计也可能小幅迭代。
                  我希望它是一个能长期使用、持续打磨的地方。
                </p>
                <p>
                  没有评论，没有订阅，没有推送。
                  写这些东西主要是为了自己，但如果你来到这里，翻到了一点有意思的东西，那也挺好的。
                </p>
              </div>
            </section>

            {/* 结尾 */}
            <section className="rounded-md border border-stone-200 bg-white px-6 py-6">
              <p className="text-[15px] leading-8 text-stone-500">
                谢谢你来到这里。
              </p>
            </section>

          </section>

          {/* 右侧边栏 */}
          <aside className="space-y-6">
            <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  基本信息
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 text-stone-400">站点</span>
                  <span>{siteName}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 text-stone-400">技术</span>
                  <span>Next.js · Tailwind CSS · SQLite</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 text-stone-400">更新</span>
                  <span>不定期，慢慢来</span>
                </li>
              </ul>
            </section>

            <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
              <div className="border-b border-stone-200 pb-3">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  页面导航
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-stone-600">
                <li>
                  <a href="/broadcast" className="transition hover:text-emerald-700">
                    广播 →
                  </a>
                </li>
                <li>
                  <a href="/notes" className="transition hover:text-emerald-700">
                    日记 →
                  </a>
                </li>
                <li>
                  <a href="/projects" className="transition hover:text-emerald-700">
                    项目 →
                  </a>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
