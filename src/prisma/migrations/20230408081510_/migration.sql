/*
  Warnings:

  - You are about to drop the column `problemId` on the `CustomContestProblem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customContestId,problemContestId,problemIndex]` on the table `CustomContestProblem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CustomContestProblem_customContestId_problemId_key";

-- AlterTable
ALTER TABLE "CustomContestProblem" DROP COLUMN "problemId";

-- CreateIndex
CREATE UNIQUE INDEX "CustomContestProblem_customContestId_problemContestId_probl_key" ON "CustomContestProblem"("customContestId", "problemContestId", "problemIndex");
