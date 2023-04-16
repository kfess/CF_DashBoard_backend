/*
  Warnings:

  - Changed the type of `githubId` on the `Label` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `githubId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_githubId_fkey";

-- AlterTable
ALTER TABLE "Label" DROP COLUMN "githubId",
ADD COLUMN     "githubId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubId",
ADD COLUMN     "githubId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
