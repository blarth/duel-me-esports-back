/*
  Warnings:

  - Added the required column `apiId` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apiId` to the `tournaments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "apiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tournaments" ADD COLUMN     "apiId" INTEGER NOT NULL;
