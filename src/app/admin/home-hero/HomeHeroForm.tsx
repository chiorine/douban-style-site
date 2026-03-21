"use client";

import { useActionState } from "react";
import { saveHomeHero } from "./actions";
import type { ActionResult, HomeHeroData } from "@/types/home-hero";

// ── 通用 input / textarea 样式 ──────────────────────────────
const inputCls =
  "w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200";

const initialState: ActionResult = { success: false, message: "" };

interface Props {
  initialData: HomeHeroData;
}

export default function HomeHeroForm({ initialData }: Props) {
  const [state, formAction, isPending] = useActionState(
    saveHomeHero,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">

      {/* ── 保存结果提示 ─────────────────────────────────── */}
      {state.message && (
        <div
          className={`rounded-sm border px-4 py-3 text-sm ${
            state.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {state.message}
        </div>
      )}

      {/* ── 基础信息卡片 ─────────────────────────────────── */}
      <div className="rounded-md border border-stone-200 bg-white px-6 py-6 space-y-5">
        <h2 className="text-base font-semibold tracking-tight text-stone-800 border-b border-stone-100 pb-3">
          基础内容
        </h2>

        {/* enabled */}
        <div className="space-y-1.5">
          <label
            htmlFor="enabled"
            className="block text-sm font-medium text-stone-700"
          >
            是否显示欢迎区
          </label>
          <select
            id="enabled"
            name="enabled"
            defaultValue={initialData.enabled ? "true" : "false"}
            className={inputCls}
          >
            <option value="true">显示</option>
            <option value="false">隐藏</option>
          </select>
          <p className="text-xs text-stone-400">
            设为「隐藏」时，首页不渲染欢迎区 section
          </p>
        </div>

        {/* eyebrow */}
        <div className="space-y-1.5">
          <label
            htmlFor="eyebrow"
            className="block text-sm font-medium text-stone-700"
          >
            顶部小标签
          </label>
          <input
            id="eyebrow"
            name="eyebrow"
            type="text"
            defaultValue={initialData.eyebrow}
            placeholder="WELCOME"
            className={inputCls}
          />
          <p className="text-xs text-stone-400">
            显示在主标题上方的小字，建议全大写，如 WELCOME / HOME
          </p>
        </div>

        {/* title */}
        <div className="space-y-1.5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-stone-700"
          >
            主标题 <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={initialData.title}
            placeholder="你好，欢迎来到 Wewkee。"
            className={inputCls}
          />
        </div>

        {/* description */}
        <div className="space-y-1.5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-stone-700"
          >
            描述正文 <span className="text-red-400">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={initialData.description}
            placeholder="这里写一段首页介绍文案……"
            className={inputCls}
          />
          <p className="text-xs text-stone-400">
            显示在主标题下方的正文段落
          </p>
        </div>
      </div>

      {/* ── 按钮配置卡片 ─────────────────────────────────── */}
      <div className="rounded-md border border-stone-200 bg-white px-6 py-6 space-y-5">
        <div className="border-b border-stone-100 pb-3">
          <h2 className="text-base font-semibold tracking-tight text-stone-800">
            操作按钮
          </h2>
          <p className="mt-1 text-xs text-stone-400">
            文字与链接同时填写才会渲染；任一留空则该按钮不显示。
          </p>
        </div>

        {/* primaryAction */}
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-stone-700">
            主按钮（绿色填充）
          </legend>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                htmlFor="primaryAction.label"
                className="block text-xs text-stone-500"
              >
                按钮文字
              </label>
              <input
                id="primaryAction.label"
                name="primaryAction.label"
                type="text"
                defaultValue={initialData.primaryAction.label}
                placeholder="了解更多"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="primaryAction.href"
                className="block text-xs text-stone-500"
              >
                跳转链接
              </label>
              <input
                id="primaryAction.href"
                name="primaryAction.href"
                type="text"
                defaultValue={initialData.primaryAction.href}
                placeholder="/about"
                className={inputCls}
              />
            </div>
          </div>
        </fieldset>

        {/* secondaryAction */}
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-stone-700">
            次按钮（描边样式）
          </legend>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                htmlFor="secondaryAction.label"
                className="block text-xs text-stone-500"
              >
                按钮文字
              </label>
              <input
                id="secondaryAction.label"
                name="secondaryAction.label"
                type="text"
                defaultValue={initialData.secondaryAction.label}
                placeholder="查看广播"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="secondaryAction.href"
                className="block text-xs text-stone-500"
              >
                跳转链接
              </label>
              <input
                id="secondaryAction.href"
                name="secondaryAction.href"
                type="text"
                defaultValue={initialData.secondaryAction.href}
                placeholder="/broadcast"
                className={inputCls}
              />
            </div>
          </div>
        </fieldset>
      </div>

      {/* ── 操作按钮 ─────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-sm bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "保存中…" : "保存"}
        </button>
        <a
          href="/admin/home-hero"
          className="text-sm text-stone-500 hover:text-stone-700"
        >
          重置
        </a>
        <span className="ml-auto text-xs text-stone-400">
          保存后首页立即生效
        </span>
      </div>

    </form>
  );
}
