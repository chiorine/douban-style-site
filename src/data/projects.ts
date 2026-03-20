export type Project = {
  id: string;
  title: string;
  summary: string;
  status: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: "douban-site",
    title: "个人网站（Wewkee）",
    summary: "基于 Next.js + Tailwind 构建的个人内容站，支持广播、日记与项目模块。",
    status: "进行中",
    tags: ["Next.js", "Tailwind", "个人网站"],
  },
  {
    id: "yt-system",
    title: "YouTube 自动下载系统",
    summary: "使用 yt-dlp + VPS + Tailscale + SMB，实现自动下载与本地同步。",
    status: "已完成",
    tags: ["VPS", "自动化", "媒体库"],
  },
];