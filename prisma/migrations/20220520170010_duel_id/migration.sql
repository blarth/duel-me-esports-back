/*
  Warnings:

  - Added the required column `matchId` to the `duels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "duels" ADD COLUMN     "matchId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "duels" ADD CONSTRAINT "duels_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("apiMatchesId") ON DELETE RESTRICT ON UPDATE CASCADE;
