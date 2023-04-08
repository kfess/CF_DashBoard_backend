import { PrismaClient } from "@prisma/client";
import { Contest } from "./entities/Contest";
import { PrismaContestRepository } from "./repositories/prisma/PrismaContestRepository";

async function main() {
  const prisma = new PrismaClient();
  const contestRepository = new PrismaContestRepository(prisma);

  const contest = new Contest({
    contestId: 2,
    contestName: "test",
    type: "CF",
    phase: "BEFORE",
    frozen: true,
    durationSeconds: 1,
    startTimeSeconds: 1,
    relativeTimeSeconds: 1,
    kind: "Official ICPC Contest",
    classification: "Div. 1",
    problems: [
      {
        contestId: 2,
        contestName: "test",
        index: "A",
        name: "test",
        type: "PROGRAMMING",
        tags: ["2-sat"],
        problemsetName: "test",
        points: 1000,
        rating: 1000,
        solvedCount: 1000,
        classification: "Div. 1",
      },
    ],
  });

  await contestRepository.create(contest);

  const fetchedContest = await contestRepository.findById(1);
  const allContests = await contestRepository.findAll();
  console.log(allContests);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
