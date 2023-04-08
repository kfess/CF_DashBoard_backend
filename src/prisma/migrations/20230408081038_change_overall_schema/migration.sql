/*
  Warnings:

  - The primary key for the `Problem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `problemId` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `problemId` on the `ProblemLabel` table. All the data in the column will be lost.
  - Added the required column `problemContestId` to the `CustomContestProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemIndex` to the `CustomContestProblem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemContestId` to the `ProblemLabel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemIndex` to the `ProblemLabel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomContestProblem" DROP CONSTRAINT "CustomContestProblem_problemId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemLabel" DROP CONSTRAINT "ProblemLabel_problemId_fkey";

-- AlterTable
ALTER TABLE "CustomContestProblem" ADD COLUMN     "problemContestId" INTEGER NOT NULL,
ADD COLUMN     "problemIndex" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_pkey",
DROP COLUMN "problemId";

-- AlterTable
ALTER TABLE "ProblemLabel" DROP COLUMN "problemId",
ADD COLUMN     "problemContestId" INTEGER NOT NULL,
ADD COLUMN     "problemIndex" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CustomContestProblem" ADD CONSTRAINT "CustomContestProblem_problemContestId_problemIndex_fkey" FOREIGN KEY ("problemContestId", "problemIndex") REFERENCES "Problem"("contestId", "index") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemLabel" ADD CONSTRAINT "ProblemLabel_problemContestId_problemIndex_fkey" FOREIGN KEY ("problemContestId", "problemIndex") REFERENCES "Problem"("contestId", "index") ON DELETE RESTRICT ON UPDATE CASCADE;
