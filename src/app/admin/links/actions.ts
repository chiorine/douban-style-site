"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function revalidateLinkPages() {
  revalidatePath("/");
  revalidatePath("/admin/links");
}

function validateUrl(url: string): string | null {
  if (!url) return "URL 不能为空。";
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "URL 必须以 http:// 或 https:// 开头。";
    }
    return null;
  } catch {
    return "请输入合法的完整 URL，例如 https://example.com。";
  }
}

export async function createExternalLink(formData: FormData) {
  const title = (formData.get("title") as string).trim();
  const url = (formData.get("url") as string).trim();
  const description = ((formData.get("description") as string) ?? "").trim();
  const sortOrder = parseInt((formData.get("sortOrder") as string) ?? "0", 10);
  const status =
    (formData.get("status") as string) === "draft" ? "draft" : "published";

  const urlError = validateUrl(url);
  if (urlError) {
    redirect(`/admin/links/new?error=${encodeURIComponent(urlError)}`);
  }

  await prisma.externalLink.create({
    data: {
      title,
      url,
      description: description || null,
      sortOrder: isNaN(sortOrder) ? 0 : sortOrder,
      status,
    },
  });

  revalidateLinkPages();
  redirect("/admin/links");
}

export async function updateExternalLink(id: string, formData: FormData) {
  const title = (formData.get("title") as string).trim();
  const url = (formData.get("url") as string).trim();
  const description = ((formData.get("description") as string) ?? "").trim();
  const sortOrder = parseInt((formData.get("sortOrder") as string) ?? "0", 10);
  const status =
    (formData.get("status") as string) === "draft" ? "draft" : "published";

  const urlError = validateUrl(url);
  if (urlError) {
    redirect(
      `/admin/links/${id}/edit?error=${encodeURIComponent(urlError)}`
    );
  }

  await prisma.externalLink.update({
    where: { id },
    data: {
      title,
      url,
      description: description || null,
      sortOrder: isNaN(sortOrder) ? 0 : sortOrder,
      status,
    },
  });

  revalidateLinkPages();
  redirect("/admin/links");
}

export async function deleteExternalLink(id: string) {
  await prisma.externalLink.delete({ where: { id } });
  revalidateLinkPages();
  redirect("/admin/links");
}
