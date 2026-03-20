/**
 * 前台渲染用的 Note 类型
 * 与 Prisma Note 模型字段保持一致（tags/content 已反序列化）
 */
export type NoteForPage = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string[];   // JSON.parse 后的段落数组
  tags: string[];      // JSON.parse 后的标签数组
  status: string;
  date: string;
  readingTime: string;
  createdAt: Date;
  updatedAt: Date;
};
