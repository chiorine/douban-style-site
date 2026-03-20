/**
 * Prisma Client 单例封装
 *
 * Next.js 开发模式下 HMR 会多次执行模块，直接 new PrismaClient()
 * 会导致连接数持续增长。标准做法是把实例挂在 globalThis 上，
 * 生产环境每次冷启动只创建一次即可。
 *
 * Prisma 7 使用 driver adapter 架构，SQLite 需要匹配
 * @prisma/adapter-better-sqlite3 传入数据库连接。
 */

import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client";

// SQLite 数据文件路径：prisma/dev.db
const DB_PATH = path.join(process.cwd(), "prisma", "dev.db");

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaBetterSqlite3({ url: DB_PATH });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
