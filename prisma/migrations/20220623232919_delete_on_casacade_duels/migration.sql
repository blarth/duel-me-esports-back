-- DropForeignKey
ALTER TABLE "duelUser" DROP CONSTRAINT "duelUser_duelId_fkey";

-- AddForeignKey
ALTER TABLE "duelUser" ADD CONSTRAINT "duelUser_duelId_fkey" FOREIGN KEY ("duelId") REFERENCES "duels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
