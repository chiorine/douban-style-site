"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// ── 标签处理：支持中英文逗号 ─────────────────────────────────
function parseTags(raw: string): string {
  return JSON.stringify(
    raw
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0),
  );
}

// ── 内容处理：每个非空行作为一段 ─────────────────────────────
function parseContent(raw: string): string {
  return JSON.stringify(
    raw
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0),
  );
}

// ── 刷新所有相关页面缓存 ──────────────────────────────────────
function revalidateNotePages() {
  revalidatePath("/notes");
  revalidatePath("/notes/[slug]", "page");
  revalidatePath("/admin/notes");
  revalidatePath("/");
}

// ── 新建 ─────────────────────────────────────────────────────
export async function createNote(formData: FormData) {
  const title = (formData.get("title") as string).trim();
  const slug = (formData.get("slug") as string).trim();
  const summary = ((formData.get("summary") as string) ?? "").trim();
  const contentRaw = ((formData.get("content") as string) ?? "").trim();
  const tagsRaw = ((formData.get("tags") as string) ?? "").trim();
  const status =
    (formData.get("status") as string) === "draft" ? "draft" : "published";
  const date = (formData.get("date") as string).trim();
  const readingTime = ((formData.get("readingTime") as string) ?? "").trim();

  await prisma.note.create({
    data: {
      title,
      slug,
      summary: summary || null,
      content: parseContent(contentRaw),
      tags: parseTags(tagsRaw),
      status,
      date,
      readingTime,
    },
  });

  revalidateNotePages();
  redirect("/admin/notes");
}

// ── 编辑 ─────────────────────────────────────────────────────
export async function updateNote(id: number, formData: FormData) {
  const title = (formData.get("title") as string).trim();
  const slug = (formData.get("slug") as string).trim();
  const summary = ((formData.get("summary") as string) ?? "").trim();
  const contentRaw = ((formData.get("content") as string) ?? "").trim();
  const tagsRaw = ((formData.get("tags") as string) ?? "").trim();
  const status =
    (formData.get("status") as string) === "draft" ? "draft" : "published";
  const date = (formData.get("date") as string).trim();
  const readingTime = ((formData.get("readingTime") as string) ?? "").trim();

  await prisma.note.update({
    where: { id },
    data: {
      title,
      slug,
      summary: summary || null,
      content: parseContent(contentRaw),
      tags: parseTags(tagsRaw),
      status,
      date,
      readingTime,
    },
  });

  revalidateNotePages();
  redirect("/admin/notes");
}

// ── 删除 ─────────────────────────────────────────────────────
export async function deleteNote(id: number) {
  await prisma.note.delete({ where: { id } });
  revalidateNotePages();
  redirect("/admin/notes");
}
