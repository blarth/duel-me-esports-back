/*
  Warnings:

  - You are about to drop the column `apiId` on the `matches` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apiMatchesId]` on the table `matches` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[apiId]` on the table `tournaments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiMatchesId` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "apiId",
ADD COLUMN     "apiMatchesId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "matches_apiMatchesId_key" ON "matches"("apiMatchesId");

-- CreateIndex
CREATE UNIQUE INDEX "tournaments_apiId_key" ON "tournaments"("apiId");
