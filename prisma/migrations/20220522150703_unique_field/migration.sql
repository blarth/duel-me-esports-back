/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "duels" DROP CONSTRAINT "duels_matchId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- AddForeignKey
ALTER TABLE "duels" ADD CONSTRAINT "duels_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
