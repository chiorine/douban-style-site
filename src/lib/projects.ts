/**
 * src/lib/projects.ts
 *
 * 项目模块统一数据层。
 * 所有对项目数据的读写都经由此文件，前台和后台均从这里取数据。
 *
 * 存储方式：每个项目对应 content/projects/<slug>.json 一个文件。
 * 文件路径基于 process.cwd()，在 VPS / 本地均可正常定位。
 */

import fs from "node:fs";
import path from "node:path";

// ── 类型定义 ──────────────────────────────────────────────────

export type ProjectStatus = "ongoing" | "done" | "paused";

export type ProjectLog = {
  date: string;
  content: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  content?: string;
  status: ProjectStatus;
  tags: string[];
  tech: string[];
  createdAt: string;
  updatedAt?: string;
  featured?: boolean;
  links?: {
    github?: string;
    demo?: string;
  };
  logs?: ProjectLog[];
};

// ── 常量 ─────────────────────────────────────────────────────

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

// ── 工具函数（公开） ──────────────────────────────────────────

/**
 * 将内部状态值转换为前台展示文案。
 */
export function formatProjectStatus(status: ProjectStatus): string {
  const map: Record<ProjectStatus, string> = {
    ongoing: "进行中",
    done: "已完成",
    paused: "已搁置",
  };
  return map[status];
}

/**
 * 取项目的「最近更新时间」：
 * 有 logs 时优先取 logs[0].date（最新记录），否则回退到 updatedAt。
 */
export function resolveUpdatedAt(project: Project): string | undefined {
  if (project.logs && project.logs.length > 0) {
    return project.logs[0].date;
  }
  return project.updatedAt;
}

// ── 内部辅助函数 ──────────────────────────────────────────────

function ensureProjectsDir(): void {
  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
  }
}

function getProjectFilePath(slug: string): string {
  return path.join(PROJECTS_DIR, `${slug}.json`);
}

function readProjectFile(slug: string): Project | null {
  const filePath = getProjectFilePath(slug);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Project;
  } catch {
    return null;
  }
}

function writeProjectFile(slug: string, project: Project): void {
  ensureProjectsDir();
  const filePath = getProjectFilePath(slug);
  fs.writeFileSync(filePath, JSON.stringify(project, null, 2), "utf-8");
}

// ── 公开 CRUD 函数 ────────────────────────────────────────────

/**
 * 读取全部项目，按 createdAt 倒序返回。
 */
export async function getAllProjects(): Promise<Project[]> {
  ensureProjectsDir();
  let files: string[];
  try {
    files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }

  const projects: Project[] = [];
  for (const file of files) {
    const slug = file.replace(/\.json$/, "");
    const project = readProjectFile(slug);
    if (project) projects.push(project);
  }

  // 按 createdAt 倒序
  projects.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return projects;
}

/**
 * 按 slug 读取单个项目，找不到返回 null。
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return readProjectFile(slug);
}

/**
 * 新建项目，写入 content/projects/<slug>.json。
 * 如果 slug 已存在则抛出错误，调用方负责提示用户。
 */
export async function createProject(project: Project): Promise<void> {
  const existing = readProjectFile(project.slug);
  if (existing) {
    throw new Error(`slug "${project.slug}" 已存在，请换一个。`);
  }
  const sorted = sortLogs(project);
  writeProjectFile(project.slug, sorted);
}

/**
 * 更新已有项目，覆盖写入对应 JSON 文件。
 */
export async function updateProject(
  slug: string,
  project: Project,
): Promise<void> {
  const sorted = sortLogs(project);
  writeProjectFile(slug, sorted);
}

/**
 * 删除项目，移除对应 JSON 文件。
 */
export async function deleteProject(slug: string): Promise<void> {
  const filePath = getProjectFilePath(slug);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

// ── 内部：logs 排序 ────────────────────────────────────────────

/** 保存前将 logs 按 date 倒序排序（最新在前）。 */
function sortLogs(project: Project): Project {
  if (!project.logs || project.logs.length === 0) return project;
  return {
    ...project,
    logs: [...project.logs].sort((a, b) => (a.date < b.date ? 1 : -1)),
  };
}
