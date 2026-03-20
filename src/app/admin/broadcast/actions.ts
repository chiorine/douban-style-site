"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// 标签处理：支持中文逗号和英文逗号
function parseTags(raw: string): string {
  return JSON.stringify(
    raw
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
  );
}

function revalidateBroadcastPages() {
  revalidatePath("/broadcast");
  revalidatePath("/broadcast/[id]", "page");
  revalidatePath("/admin/broadcast");
  revalidatePath("/");
}

export async function createBroadcast(formData: FormData) {
  const nickname = (formData.get("nickname") as string).trim();
  const avatar = (formData.get("avatar") as string).trim();
  const content = (formData.get("content") as string).trim();
  const publishedAt = (formData.get("publishedAt") as string).trim();
  const tagsRaw = ((formData.get("tags") as string) ?? "").trim();
  const status = (formData.get("status") as string) === "draft" ? "draft" : "published";

  await prisma.broadcast.create({
    data: { nickname, avatar, content, publishedAt, tags: parseTags(tagsRaw), status },
  });

  revalidateBroadcastPages();
  redirect("/admin/broadcast");
}

export async function updateBroadcast(id: number, formData: FormData) {
  const nickname = (formData.get("nickname") as string).trim();
  const avatar = (formData.get("avatar") as string).trim();
  const content = (formData.get("content") as string).trim();
  const publishedAt = (formData.get("publishedAt") as string).trim();
  const tagsRaw = ((formData.get("tags") as string) ?? "").trim();
  const status = (formData.get("status") as string) === "draft" ? "draft" : "published";

  await prisma.broadcast.update({
    where: { id },
    data: { nickname, avatar, content, publishedAt, tags: parseTags(tagsRaw), status },
  });

  revalidateBroadcastPages();
  redirect("/admin/broadcast");
}

export async function deleteBroadcast(id: number) {
  await prisma.broadcast.delete({ where: { id } });
  revalidateBroadcastPages();
  redirect("/admin/broadcast");
}
