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
    "contestId" INTEGER NOT NULL,
    "contestName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "frozen" BOOLEAN NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "startTimeSeconds" INTEGER NOT NULL,
    "relativeTimeSeconds" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "icpcRegion" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "preparedBy" INTEGER,
    "websiteUrl" INTEGER,
    "description" INTEGER,
    "difficulty" INTEGER,

    CONSTRAINT "Contest_pkey" PRIMARY KEY ("contestId")
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
    "problemId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "contestId" INTEGER NOT NULL,
    "index" TEXT NOT NULL,
    "rating" INTEGER,
    "tags" TEXT[],

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("problemId")
);

-- CreateTable
CREATE TABLE "CustomContestProblem" (
    "id" INTEGER NOT NULL,
    "customContestId" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,

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
    "problemId" INTEGER NOT NULL,
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
CREATE UNIQUE INDEX "Contest_contestId_key" ON "Contest"("contestId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomContestProblem_id_key" ON "CustomContestProblem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomContestProblem_customContestId_problemId_key" ON "CustomContestProblem"("customContestId", "problemId");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("contestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomContestProblem" ADD CONSTRAINT "CustomContestProblem_customContestId_fkey" FOREIGN KEY ("customContestId") REFERENCES "CustomContest"("contestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomContestProblem" ADD CONSTRAINT "CustomContestProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("problemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemLabel" ADD CONSTRAINT "ProblemLabel_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("problemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemLabel" ADD CONSTRAINT "ProblemLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestLabel" ADD CONSTRAINT "ContestLabel_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("contestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestLabel" ADD CONSTRAINT "ContestLabel_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
