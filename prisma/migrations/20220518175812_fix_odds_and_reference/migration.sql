/*
  Warnings:

  - You are about to drop the column `tournamentId` on the `matches` table. All the data in the column will be lost.
  - Added the required column `apiTournamentId` to the `matches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_tournamentId_fkey";

-- AlterTable
ALTER TABLE "matches" DROP COLUMN "tournamentId",
ADD COLUMN     "apiTournamentId" INTEGER NOT NULL,
ALTER COLUMN "leftTeamOdd" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rightTeamOdd" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_apiTournamentId_fkey" FOREIGN KEY ("apiTournamentId") REFERENCES "tournaments"("apiId") ON DELETE RESTRICT ON UPDATE CASCADE;
