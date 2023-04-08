/*
  Warnings:

  - Added the required column `classification` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contestName` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "classification" TEXT NOT NULL,
ADD COLUMN     "contestName" TEXT NOT NULL,
ADD COLUMN     "points" INTEGER,
ADD COLUMN     "problemsetName" TEXT,
ADD COLUMN     "solvedCount" INTEGER,
ADD COLUMN     "type" TEXT[];
