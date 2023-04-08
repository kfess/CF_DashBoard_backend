-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "githubId" TEXT NOT NULL,
    "githubUsername" TEXT NOT NULL,
    "codeforcesUsername" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contest" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "frozen" BOOLEAN NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "startTimeSeconds" INTEGER NOT NULL,
    "relativeTimeSeconds" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "icpcRegion" TEXT,
    "country" TEXT,
    "city" TEXT,
    "season" TEXT,
    "preparedBy" INTEGER,
    "websiteUrl" INTEGER,
    "description" INTEGER,
    "difficulty" INTEGER,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomContest" (
    "contestId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "penalty" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL,
    "participants" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomContest_pkey" PRIMARY KEY ("contestId")
);

-- CreateTable
CREATE TABLE "Problem" (
    "contestId" INTEGER NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tags" TEXT[],
    "contestName" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "problemsetName" TEXT,
    "points" INTEGER,
    "rating" INTEGER,
    "solvedCount" INTEGER
);

-- CreateTable
CREATE TABLE "CustomContestProblem" (
    "id" INTEGER NOT NULL,
    "customContestId" TEXT NOT NULL,
    "problemContestId" INTEGER NOT NULL,
    "problemIndex" TEXT NOT NULL,

    CONSTRAINT "CustomContestProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" INTEGER NOT NULL,
    "githubId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemLabel" (
    "id" INTEGER NOT NULL,
    "problemContestId" INTEGER NOT NULL,
    "problemIndex" TEXT NOT NULL,
    "labelId" INTEGER NOT NULL,

    CONSTRAINT "ProblemLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestLabel" (
    "id" INTEGER NOT NULL,
    "contestId" INTEGER NOT NULL,
    "labelId" INTEGER NOT NULL,

    CONSTRAINT "ContestLabel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "Contest_id_key" ON "Contest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_contestId_index_key" ON "Problem"("contestId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "CustomContestProblem_id_key" ON "CustomContestProblem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomContestProblem_customContestId_problemContestId_probl_key" ON "CustomContestProblem"("customContestId", "problemContestId", "problemIndex");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomContestProblem" ADD CONSTRAINT "CustomContestProblem_customContestId_fkey" FOREIGN KEY ("customContestId") REFERENCES "CustomContest"("contestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomContestProblem" ADD CONSTRAINT "CustomContestProblem_problemContestId_problemIndex_fkey" FOREIGN KEY ("problemContestId", "problemIndex") REFERENCES "Problem"("contestId", "index") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemLabel" ADD CONSTRAINT "ProblemLabel_problemContestId_problemIndex_fkey" FOREIGN KEY ("problemContestId", "problemIndex") REFERENCES "Problem"("contestId", "index") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemLabel" ADD CONSTRAINT "ProblemLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestLabel" ADD CONSTRAINT "ContestLabel_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestLabel" ADD CONSTRAINT "ContestLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
