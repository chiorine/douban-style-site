/**
 * src/data/projects.ts
 *
 * ⚠️  本文件已降级为「类型 + 工具函数」兼容层。
 * 项目数据已全部迁移到 content/projects/*.json，
 * 读写统一经由 src/lib/projects.ts。
 *
 * 保留此文件仅为防止旧 import 路径报错，
 * 类型和工具函数重新从 src/lib/projects.ts 导出。
 */

export type {
  ProjectStatus,
  ProjectLog,
  Project,
} from "@/lib/projects";

export {
  formatProjectStatus,
  resolveUpdatedAt,
} from "@/lib/projects";