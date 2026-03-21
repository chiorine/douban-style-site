"use server";

import { revalidatePath } from "next/cache";
import { getHomeHero, updateHomeHero } from "@/lib/home-hero";
import type { ActionResult, HomeHeroData } from "@/types/home-hero";

/**
 * saveHomeHero — 后台首页 Hero 编辑表单的 Server Action
 *
 * 流程：
 *  1. 从 FormData 中提取并校验各字段
 *  2. 调用 updateHomeHero() 写回 JSON 文件
 *  3. 调用 revalidatePath 使首页和后台编辑页缓存失效
 *  4. 返回 ActionResult，前端根据 success 展示提示
 */
export async function saveHomeHero(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    // ── 字段提取 ────────────────────────────────────────────
    const enabled = formData.get("enabled") === "true";
    const eyebrow = ((formData.get("eyebrow") as string) ?? "").trim();
    const title = ((formData.get("title") as string) ?? "").trim();
    const description = ((formData.get("description") as string) ?? "").trim();
    const primaryLabel = ((formData.get("primaryAction.label") as string) ?? "").trim();
    const primaryHref = ((formData.get("primaryAction.href") as string) ?? "").trim();
    const secondaryLabel = ((formData.get("secondaryAction.label") as string) ?? "").trim();
    const secondaryHref = ((formData.get("secondaryAction.href") as string) ?? "").trim();

    // ── 服务端校验 ───────────────────────────────────────────
    if (!title) {
      return { success: false, message: "主标题不能为空。" };
    }
    if (!description) {
      return { success: false, message: "描述内容不能为空。" };
    }
    // 按钮：label 和 href 必须同时填写或同时为空
    if (primaryLabel && !primaryHref) {
      return { success: false, message: "主按钮填写了文字，但缺少链接地址。" };
    }
    if (!primaryLabel && primaryHref) {
      return { success: false, message: "主按钮填写了链接，但缺少按钮文字。" };
    }
    if (secondaryLabel && !secondaryHref) {
      return { success: false, message: "次按钮填写了文字，但缺少链接地址。" };
    }
    if (!secondaryLabel && secondaryHref) {
      return { success: false, message: "次按钮填写了链接，但缺少按钮文字。" };
    }

    // ── 当前数据（保留已有结构，仅覆盖表单字段）────────────
    const current = getHomeHero();
    const next: HomeHeroData = {
      ...current,
      enabled,
      eyebrow: eyebrow || current.eyebrow,
      title,
      description,
      primaryAction: { label: primaryLabel, href: primaryHref },
      secondaryAction: { label: secondaryLabel, href: secondaryHref },
    };

    // ── 写入 JSON ────────────────────────────────────────────
    updateHomeHero(next);

    // ── 使相关页面缓存失效 ────────────────────────────────────
    revalidatePath("/");
    revalidatePath("/admin/home-hero");

    return { success: true, message: "保存成功，首页已同步更新。" };
  } catch (err) {
    console.error("[saveHomeHero] 写入失败：", err);
    return {
      success: false,
      message: "写入失败，请检查服务器文件权限或联系管理员。",
    };
  }
}
