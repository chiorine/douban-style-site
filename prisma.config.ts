import { defineConfig } from "prisma/config";
import path from "node:path";

// SQLite 数据文件位于项目根目录的 prisma/dev.db
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: `file:${path.join(__dirname, "prisma", "dev.db")}`,
  },
});
