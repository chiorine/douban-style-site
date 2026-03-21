/**
 * home-hero.ts — 首页 Hero 欢迎区的读写工具
 *
 * - getHomeHero()   : 读取并解析 JSON，出错时返回安全默认值，不崩页面
 * - updateHomeHero(): 服务端写回 JSON（仅在 Server Action / Route Handler 调用）
 *
 * JSON 文件路径：src/data/content/home-hero.json
 * 使用 path.join(process.cwd(), ...) 确保在 VPS 任意工作目录下都能正确定位。
 */

import fs from "node:fs";
import path from "node:path";
import type { HomeHeroData } from "@/types/home-hero";

// ── 常量 ─────────────────────────────────────────────────────
const DATA_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "content",
  "home-hero.json",
);

/** JSON 读取失败时使用的安全默认值，保证首页不崩溃 */
const FALLBACK: HomeHeroData = {
  enabled: true,
  eyebrow: "WELCOME",
  title: "你好，欢迎来到 Wewkee。",
  description:
    "Wewkee——一处缓慢更新的个人角落，记录阅读、写作、项目与日常想法。不赶时间，不追热点。",
  primaryAction: { label: "", href: "" },
  secondaryAction: { label: "", href: "" },
};

// ── 读取 ─────────────────────────────────────────────────────

/**
 * 读取并解析 home-hero.json。
 * 任何异常（文件缺失、JSON 格式错误、字段缺失）都会静默降级到 FALLBACK，
 * 不会导致首页渲染崩溃。
 */
export function getHomeHero(): HomeHeroData {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<HomeHeroData>;

    return {
      enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : FALLBACK.enabled,
      eyebrow: parsed.eyebrow?.trim() || FALLBACK.eyebrow,
      title: parsed.title?.trim() || FALLBACK.title,
      description: parsed.description?.trim() || FALLBACK.description,
      primaryAction: {
        label: parsed.primaryAction?.label?.trim() ?? "",
        href: parsed.primaryAction?.href?.trim() ?? "",
      },
      secondaryAction: {
        label: parsed.secondaryAction?.label?.trim() ?? "",
        href: parsed.secondaryAction?.href?.trim() ?? "",
      },
    };
  } catch {
    // 文件不存在或 JSON 损坏时，静默使用默认值
    return { ...FALLBACK };
  }
}

// ── 写入 ─────────────────────────────────────────────────────

/**
 * 将新的 HomeHeroData 序列化并写回 JSON 文件。
 * 只应在 Server Action 或 Route Handler（Node.js runtime）中调用。
 * @throws 写入失败时抛出 Error，调用方负责 try/catch 并向前端返回错误信息
 */
export function updateHomeHero(data: HomeHeroData): void {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(DATA_PATH, json, "utf-8");
}
