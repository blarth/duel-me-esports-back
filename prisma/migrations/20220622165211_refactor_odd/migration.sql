/*
  Warnings:

  - You are about to drop the column `leftTeamOdd` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `rightTeamOdd` on the `matches` table. All the data in the column will be lost.
  - Added the required column `odd` to the `matchesTeams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" DROP COLUMN "leftTeamOdd",
DROP COLUMN "rightTeamOdd";

-- AlterTable
ALTER TABLE "matchesTeams" ADD COLUMN     "odd" INTEGER NOT NULL;
