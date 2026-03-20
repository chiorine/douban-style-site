-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Broadcast" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedAt" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Broadcast" ("avatar", "content", "createdAt", "id", "nickname", "publishedAt", "tags", "updatedAt") SELECT "avatar", "content", "createdAt", "id", "nickname", "publishedAt", "tags", "updatedAt" FROM "Broadcast";
DROP TABLE "Broadcast";
ALTER TABLE "new_Broadcast" RENAME TO "Broadcast";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
