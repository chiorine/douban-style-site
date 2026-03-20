/**
 * Prisma Seed — 将现有静态数据导入数据库
 * 执行方式：npm run db:seed
 *
 * 注意：seed 仅用于初始化/演示，数据库有内容后无需重复执行。
 * 如需重置，先删除 prisma/dev.db 再重新 migrate + seed。
 */

import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { broadcasts } from "../src/data/broadcasts";
import { notes } from "../src/data/notes";

// seed 直接运行于项目根目录，显式传入 SQLite 路径
const DB_PATH = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: DB_PATH });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("开始导入静态数据...");

  // ── 清空旧数据（幂等执行）─────────────────────────────────
  await prisma.broadcast.deleteMany();
  await prisma.note.deleteMany();

  // ── 导入广播 ─────────────────────────────────────────────
  for (const b of broadcasts) {
    await prisma.broadcast.create({
      data: {
        nickname: b.nickname,
        avatar: b.avatar,
        content: b.content,
        publishedAt: b.publishedAt,
        tags: JSON.stringify(b.tags), // string[] → JSON 字符串
      },
    });
  }
  console.log(`✓ 广播：已导入 ${broadcasts.length} 条`);

  // ── 导入笔记 ─────────────────────────────────────────────
  for (const n of notes) {
    await prisma.note.create({
      data: {
        slug: n.slug,
        title: n.title,
        summary: n.summary,
        content: JSON.stringify(n.content), // string[] → JSON 字符串
        tags: JSON.stringify(n.tags),       // string[] → JSON 字符串
        status: "published",
        date: n.date,
        readingTime: n.readingTime,
      },
    });
  }
  console.log(`✓ 笔记：已导入 ${notes.length} 条`);

  console.log("数据导入完成。");
}

main()
  .catch((e) => {
    console.error("Seed 失败：", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
