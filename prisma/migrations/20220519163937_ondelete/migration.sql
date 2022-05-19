-- DropForeignKey
ALTER TABLE "matchesTeams" DROP CONSTRAINT "matchesTeams_matchId_fkey";

-- AddForeignKey
ALTER TABLE "matchesTeams" ADD CONSTRAINT "matchesTeams_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("apiMatchesId") ON DELETE CASCADE ON UPDATE CASCADE;
