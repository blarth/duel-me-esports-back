-- AlterTable
ALTER TABLE "duelUser" ALTER COLUMN "updateAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "duels" ALTER COLUMN "updateAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
CREATE SEQUENCE "matches_id_seq";
ALTER TABLE "matches" ALTER COLUMN "id" SET DEFAULT nextval('matches_id_seq');
ALTER SEQUENCE "matches_id_seq" OWNED BY "matches"."id";

-- AlterTable
CREATE SEQUENCE "teams_id_seq";
ALTER TABLE "teams" ALTER COLUMN "id" SET DEFAULT nextval('teams_id_seq');
ALTER SEQUENCE "teams_id_seq" OWNED BY "teams"."id";

-- AlterTable
CREATE SEQUENCE "tournaments_id_seq";
ALTER TABLE "tournaments" ALTER COLUMN "id" SET DEFAULT nextval('tournaments_id_seq');
ALTER SEQUENCE "tournaments_id_seq" OWNED BY "tournaments"."id";
