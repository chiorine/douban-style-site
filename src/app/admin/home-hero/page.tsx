/**
 * /admin/home-hero — 首页 Hero 欢迎区编辑页
 *
 * - 服务端渲染：进入页面时从 JSON 读取当前值并回填到表单
 * - 提交通过 Server Action (saveHomeHero) 处理，无需客户端 JS
 * - 使用 useFormState 显示保存结果提示（需要 'use client' 的部分抽成子组件）
 */

import Link from "next/link";
import { getHomeHero } from "@/lib/home-hero";
import HomeHeroForm from "./HomeHeroForm";

export const metadata = { title: "首页模块编辑 · 后台" };

export default function HomeHeroEditPage() {
  // 服务端直接读取，回填表单初始值
  const hero = getHomeHero();

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10">
      <div className="max-w-xl space-y-6">

        {/* 面包屑 */}
        <nav className="text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="hover:text-emerald-700">
              后台管理
            </Link>
            <span>/</span>
            <span className="text-stone-700">首页模块编辑</span>
          </div>
        </nav>

        {/* 说明卡片 */}
        <div className="rounded-md border border-stone-200 bg-white px-6 py-6">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-400">
            Home Hero
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-stone-800">
            首页模块编辑
          </h1>
          <p className="mt-3 text-sm leading-7 text-stone-500">
            修改后点击「保存」，首页欢迎区将立即同步更新。
            按钮文字与链接同时填写才会在前台显示，任一留空则不渲染该按钮。
          </p>
        </div>

        {/* 表单（Client Component，处理保存状态提示） */}
        <HomeHeroForm initialData={hero} />

      </div>
    </div>
  );
}
