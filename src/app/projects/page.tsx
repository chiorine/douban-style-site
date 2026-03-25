import SidebarCard from "@/components/layout/SidebarCard";
import ProjectCard from "@/components/projects/ProjectCard";
import { getAllProjects, formatProjectStatus } from "@/lib/projects";
import type { ProjectStatus } from "@/lib/projects";

const statusOrder: ProjectStatus[] = ["ongoing", "done", "paused"];

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const sorted = [...projects].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  const ongoingCount = projects.filter((p) => p.status === "ongoing").length;
  const doneCount = projects.filter((p) => p.status === "done").length;

  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,720px)_300px]">
          {/* 主内容区 */}
          <section className="space-y-6">
            {/* 页面标题区 */}
            <section className="rounded-md border border-stone-200 bg-white px-6 py-6">
              <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
                Projects
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-800">
                项目
              </h1>
              <p className="mt-4 text-[15px] leading-8 text-stone-600">
                记录一些长期在做的东西，也放一些已经完成的小工具。
                大多是自己用得上的，慢慢在迭代。
              </p>
            </section>

            {/* 项目列表 */}
            <section className="rounded-md border border-stone-200 bg-white">
              <div className="border-b border-stone-200 px-6 py-4">
                <h2 className="text-base font-semibold tracking-tight text-stone-800">
                  全部项目
                </h2>
              </div>

              <div className="divide-y divide-stone-200">
                {sorted.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    variant="full"
                  />
                ))}
              </div>
            </section>
          </section>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            <SidebarCard title="项目状态">
              <ul className="space-y-3 text-sm text-stone-600">
                <li className="flex items-center justify-between">
                  <span>{formatProjectStatus("ongoing")}</span>
                  <span className="text-stone-400">{ongoingCount}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>{formatProjectStatus("done")}</span>
                  <span className="text-stone-400">{doneCount}</span>
                </li>
              </ul>
            </SidebarCard>

            <SidebarCard title="关于这个页面">
              <p className="text-sm leading-7 text-stone-600">
                这里放的是我一直在做、或者做完了的东西。
                不是作品集，只是觉得记下来比较好，方便自己回头看看做了些什么。
              </p>
            </SidebarCard>

            <SidebarCard title="说明">
              <ul className="space-y-3 text-sm leading-7 text-stone-600">
                <li>点击项目标题或"查看详情"可以看到更多内容。</li>
                <li>状态为"进行中"的项目随时可能有更新。</li>
                <li>技术栈标签仅供参考，不代表项目已完整实现所有特性。</li>
              </ul>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </main>
  );
}
