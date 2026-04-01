import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import sharp from "sharp";

const uploadDir = path.join(process.cwd(), "public", "uploads", "notes");

function sanitizeBaseName(filename: string) {
  const parsed = path.parse(filename);
  const normalized = parsed.name
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);

  return normalized || "note-image";
}

function getExtension(file: File) {
  switch (file.type) {
    case "image/jpeg":
    case "image/png":
    case "image/gif":
    case "image/webp":
    case "image/svg+xml":
      return ".jpg";
    default:
      return "";
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "未接收到上传文件。" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "仅支持图片文件上传。" }, { status: 400 });
  }

  const safeBaseName = sanitizeBaseName(file.name);
  const ext = getExtension(file);
  if (!ext) {
    return NextResponse.json({ error: "无法识别图片格式。" }, { status: 400 });
  }

  await mkdir(uploadDir, { recursive: true });

  const filename = `${safeBaseName}-${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  const absolutePath = path.join(uploadDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  const output = await sharp(buffer, { animated: true })
    .rotate()
    .resize({
      width: 1600,
      withoutEnlargement: true,
      fit: "inside",
    })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 80 })
    .toBuffer();

  await writeFile(absolutePath, output);

  return NextResponse.json({
    path: `/uploads/notes/${filename}`,
  });
}