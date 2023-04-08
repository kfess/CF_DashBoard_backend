/*
  Warnings:

  - The primary key for the `Contest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contestId` on the `Contest` table. All the data in the column will be lost.
  - You are about to drop the column `contestName` on the `Contest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Contest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Contest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContestLabel" DROP CONSTRAINT "ContestLabel_contestId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_contestId_fkey";

-- DropIndex
DROP INDEX "Contest_contestId_key";

-- AlterTable
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_pkey",
DROP COLUMN "contestId",
DROP COLUMN "contestName",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Contest_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Contest_id_key" ON "Contest"("id");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestLabel" ADD CONSTRAINT "ContestLabel_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
