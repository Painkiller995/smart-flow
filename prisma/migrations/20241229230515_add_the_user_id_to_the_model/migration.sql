/*
  Warnings:

  - Added the required column `userId` to the `AiAgent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AiAgent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "temperature" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_AiAgent" ("createdAt", "id", "model", "name", "temperature", "updatedAt") SELECT "createdAt", "id", "model", "name", "temperature", "updatedAt" FROM "AiAgent";
DROP TABLE "AiAgent";
ALTER TABLE "new_AiAgent" RENAME TO "AiAgent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
