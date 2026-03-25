"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProject,
  updateProject,
  deleteProject,
  getProjectBySlug,
} from "@/lib/projects";
import type { Project, ProjectLog, ProjectStatus } from "@/lib/projects";

// ── 公共工具 ──────────────────────────────────────────────────

/** 逗号分隔字符串 → string[]，去空 */
function parseCSV(raw: string): string[] {
  return raw
    .split(/[,，]/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

/** slug 格式校验：只允许小写字母、数字、连字符 */
function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * 从 FormData 中解析 logs 数组。
 *
 * 表单约定：
 *   logs[0][date]    logs[0][content]
 *   logs[1][date]    logs[1][content]
 *   ...
 * 直到找不到对应 index 为止。
 */
function parseLogs(formData: FormData): ProjectLog[] {
  const logs: ProjectLog[] = [];
  let i = 0;
  while (true) {
    const date = (formData.get(`logs[${i}][date]`) as string | null)?.trim();
    const content = (
      formData.get(`logs[${i}][content]`) as string | null
    )?.trim();
    if (date === undefined && content === undefined) break;
    if (date === null || date === undefined) break;
    if (date && content) {
      logs.push({ date, content });
    }
    i++;
  }
  return logs;
}

/** 从 FormData 构建 Project 对象（新建 / 更新共用） */
function buildProjectFromForm(
  formData: FormData,
  slugOverride?: string,
): Project {
  const slug = slugOverride ?? (formData.get("slug") as string).trim();
  const status = (formData.get("status") as ProjectStatus) ?? "ongoing";

  return {
    slug,
    title: (formData.get("title") as string).trim(),
    description: (formData.get("description") as string).trim(),
    content: ((formData.get("content") as string) ?? "").trim() || undefined,
    status,
    tags: parseCSV((formData.get("tags") as string) ?? ""),
    tech: parseCSV((formData.get("tech") as string) ?? ""),
    createdAt: (formData.get("createdAt") as string).trim(),
    updatedAt:
      ((formData.get("updatedAt") as string) ?? "").trim() || undefined,
    featured: formData.get("featured") === "on",
    links: {
      github:
        ((formData.get("github") as string) ?? "").trim() || undefined,
      demo: ((formData.get("demo") as string) ?? "").trim() || undefined,
    },
    logs: parseLogs(formData),
  };
}

// ── revalidate 所有项目相关页面 ───────────────────────────────

function revalidateProjectPages(slug?: string) {
  revalidatePath("/projects");
  revalidatePath("/projects/[slug]", "page");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  if (slug) revalidatePath(`/projects/${slug}`);
}

// ── 新建项目 ──────────────────────────────────────────────────

export async function createProjectAction(
  formData: FormData,
): Promise<void> {
  const slug = (formData.get("slug") as string).trim();

  if (!slug) {
    redirect(`/admin/projects/new?error=${encodeURIComponent("slug 不能为空。")}`);
  }
  if (!isValidSlug(slug)) {
    redirect(
      `/admin/projects/new?error=${encodeURIComponent("slug 格式有误，只允许小写字母、数字和连字符（-）。")}`,
    );
  }

  const existing = await getProjectBySlug(slug);
  if (existing) {
    redirect(
      `/admin/projects/new?error=${encodeURIComponent(`slug "${slug}" 已存在，请换一个。`)}`,
    );
  }

  const project = buildProjectFromForm(formData);

  try {
    await createProject(project);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "创建失败。";
    redirect(`/admin/projects/new?error=${encodeURIComponent(msg)}`);
  }

  revalidateProjectPages(slug);
  redirect("/admin/projects");
}

// ── 更新项目 ──────────────────────────────────────────────────

export async function updateProjectAction(
  slug: string,
  formData: FormData,
): Promise<void> {
  // slug 在编辑页为只读，直接沿用原 slug
  const project = buildProjectFromForm(formData, slug);

  try {
    await updateProject(slug, project);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "保存失败。";
    redirect(`/admin/projects/${slug}/edit?error=${encodeURIComponent(msg)}`);
  }

  revalidateProjectPages(slug);
  redirect(`/admin/projects`);
}

// ── 删除项目 ──────────────────────────────────────────────────

export async function deleteProjectAction(slug: string): Promise<void> {
  await deleteProject(slug);
  revalidateProjectPages(slug);
  redirect("/admin/projects");
}
