"use client";

import { useState } from "react";
import type { ProjectLog } from "@/lib/projects";

type LogsEditorProps = {
  initialLogs?: ProjectLog[];
};

const inputCls =
  "w-full rounded-sm border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-200";

export default function LogsEditor({ initialLogs = [] }: LogsEditorProps) {
  const [logs, setLogs] = useState<ProjectLog[]>(initialLogs);

  function addLog() {
    setLogs((prev) => [{ date: "", content: "" }, ...prev]);
  }

  function removeLog(index: number) {
    setLogs((prev) => prev.filter((_, i) => i !== index));
  }

  function updateLog(index: number, field: keyof ProjectLog, value: string) {
    setLogs((prev) =>
      prev.map((log, i) => (i === index ? { ...log, [field]: value } : log)),
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-stone-400">
          按时间倒序排列，最新记录放最前面。保存时会自动按日期排序。
        </p>
        <button
          type="button"
          onClick={addLog}
          className="rounded-sm border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-600 transition hover:border-emerald-300 hover:text-emerald-700"
        >
          + 新增一条
        </button>
      </div>

      {logs.length === 0 && (
        <p className="rounded-sm border border-dashed border-stone-200 px-4 py-6 text-center text-sm text-stone-400">
          暂无开发记录，点击"新增一条"开始添加。
        </p>
      )}

      {logs.map((log, index) => (
        <div
          key={index}
          className="space-y-2 rounded-sm border border-stone-200 bg-stone-50 px-4 py-3"
        >
          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              name={`logs[${index}][date]`}
              value={log.date}
              onChange={(e) => updateLog(index, "date", e.target.value)}
              placeholder="2026-03-24"
              className={inputCls}
            />
            <button
              type="button"
              onClick={() => removeLog(index)}
              className="shrink-0 text-xs text-stone-400 transition hover:text-red-500"
            >
              删除
            </button>
          </div>
          <textarea
            name={`logs[${index}][content]`}
            value={log.content}
            onChange={(e) => updateLog(index, "content", e.target.value)}
            placeholder="这条记录的内容……"
            rows={2}
            className={inputCls}
          />
        </div>
      ))}
    </div>
  );
}
