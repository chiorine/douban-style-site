"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";

type NoteImageUploaderProps = {
  textareaId: string;
};

type UploadState =
  | { kind: "idle"; message: string }
  | { kind: "success"; message: string; path: string }
  | { kind: "error"; message: string };

const inputCls =
  "w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200";

export default function NoteImageUploader({
  textareaId,
}: NoteImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({
    kind: "idle",
    message: "上传后会返回可直接用于 Markdown 的图片路径。",
  });

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadState({ kind: "idle", message: "正在上传图片..." });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/admin/notes/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as
        | { path?: string; error?: string }
        | undefined;

      if (!response.ok || !payload?.path) {
        throw new Error(payload?.error ?? "上传失败，请稍后重试。");
      }

      setUploadState({
        kind: "success",
        message: "上传成功，可以复制路径或插入 Markdown。",
        path: payload.path,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "上传失败，请稍后重试。";
      setUploadState({ kind: "error", message });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleCopy() {
    if (uploadState.kind !== "success") return;

    try {
      await navigator.clipboard.writeText(uploadState.path);
      setUploadState({
        ...uploadState,
        message: "路径已复制到剪贴板。",
      });
    } catch {
      setUploadState({
        ...uploadState,
        message: "复制失败，请手动复制下方路径。",
      });
    }
  }

  function handleInsertMarkdown() {
    if (uploadState.kind !== "success") return;

    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement | null;
    if (!textarea) {
      setUploadState({
        ...uploadState,
        message: "未找到正文输入框，请手动复制路径。",
      });
      return;
    }

    const markdown = `![图片描述](${uploadState.path})`;
    const start = textarea.selectionStart ?? textarea.value.length;
    const end = textarea.selectionEnd ?? textarea.value.length;
    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);
    const needsLeadingBreak = before.length > 0 && !before.endsWith("\n") ? "\n" : "";
    const needsTrailingBreak = after.length > 0 && !after.startsWith("\n") ? "\n" : "";

    textarea.value = `${before}${needsLeadingBreak}${markdown}${needsTrailingBreak}${after}`;
    const cursor = before.length + needsLeadingBreak.length + markdown.length;
    textarea.focus();
    textarea.setSelectionRange(cursor, cursor);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    setUploadState({
      ...uploadState,
      message: "Markdown 已插入正文。",
    });
  }

  return (
    <div className="space-y-3 rounded-sm border border-stone-200 bg-stone-50 p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-stone-700">图片上传</p>
        <p className="text-xs text-stone-400">
          支持上传到 /uploads/notes/，返回可直接用于 Markdown 的图片路径。
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={inputCls}
      />

      <p
        className={`text-xs ${
          uploadState.kind === "error" ? "text-red-500" : "text-stone-500"
        }`}
      >
        {uploadState.message}
      </p>

      {uploadState.kind === "success" ? (
        <div className="space-y-3">
          <input
            type="text"
            readOnly
            value={uploadState.path}
            className={inputCls}
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              disabled={isUploading}
              className="rounded-sm border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              复制路径
            </button>
            <button
              type="button"
              onClick={handleInsertMarkdown}
              disabled={isUploading}
              className="rounded-sm bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              插入 Markdown
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
