// Purpose: Lambda function to update the database with the latest contests from Codeforces
// This function is supposed to be run on Lambda every a few hours

import { PrismaClient } from "@prisma/client";
import { PrismaContestRepository } from "./repositories/prisma/PrismaContestRepository";
import { FetchContestsInteractor } from "./usecases/FetchContestsInteractor";

// These lines are outside of the handler to take advantage of cached execution environments
// https://docs.aws.amazon.com/lambda/latest/dg/running-lambda-code.html
const prisma = new PrismaClient();
const contestRepository = new PrismaContestRepository(prisma);
const fetchContestsInteractor = new FetchContestsInteractor(contestRepository);

export async function main() {
  await fetchContestsInteractor.fetchAllAndUpdate();
  await prisma.$disconnect();
}

// Triggered by Lambda function every a few hours
exports.handler = async (event: any, context: any) => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Execute the main function if this file is run directly
if (require.main === module) {
  main().catch(console.error);
}
