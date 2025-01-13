/*
  Warnings:

  - A unique constraint covering the columns `[secretId]` on the table `Workflow` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "secretId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_secretId_key" ON "Workflow"("secretId");

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_secretId_fkey" FOREIGN KEY ("secretId") REFERENCES "Secret"("id") ON DELETE SET NULL ON UPDATE CASCADE;
