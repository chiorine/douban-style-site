/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `Note` table. All the data in the column will be lost.
  - Added the required column `date` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readingTime` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "content" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'published',
    "date" TEXT NOT NULL,
    "readingTime" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Note" ("content", "createdAt", "id", "slug", "summary", "tags", "title", "updatedAt") SELECT "content", "createdAt", "id", "slug", "summary", "tags", "title", "updatedAt" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE UNIQUE INDEX "Note_slug_key" ON "Note"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
