/*
  Warnings:

  - A unique constraint covering the columns `[apiTeamId]` on the table `teams` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiTeamId` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "matchesTeams" DROP CONSTRAINT "matchesTeams_teamId_fkey";

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "apiTeamId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "teams_apiTeamId_key" ON "teams"("apiTeamId");

-- AddForeignKey
ALTER TABLE "matchesTeams" ADD CONSTRAINT "matchesTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("apiTeamId") ON DELETE RESTRICT ON UPDATE CASCADE;
