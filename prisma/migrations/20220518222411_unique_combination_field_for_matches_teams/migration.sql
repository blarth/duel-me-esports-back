/*
  Warnings:

  - A unique constraint covering the columns `[teamId,matchId]` on the table `matchesTeams` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "matchesTeams_teamId_matchId_key" ON "matchesTeams"("teamId", "matchId");
