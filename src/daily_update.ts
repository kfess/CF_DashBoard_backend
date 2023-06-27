import { PrismaClient } from "@prisma/client";
import { PrismaContestRepository } from "./repositories/prisma/PrismaContestRepository";
import { FetchContestsInteractor } from "./usecases/FetchContestsInteractor";

async function main() {
  const prisma = new PrismaClient();
  const contestRepository = new PrismaContestRepository(prisma);
  const fetchContestsInteractor = new FetchContestsInteractor(
    contestRepository
  );
  await fetchContestsInteractor.fetchAllAndUpdate();

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
