// Purpose: Lambda function to update the database with the latest contests from Codeforces
// This function is supposed to be run on Lambda every a few hours

import { PrismaClient } from '@prisma/client';
import { PrismaContestRepository } from '../../repositories/prisma/PrismaContestRepository';
import { FetchContestsInteractor } from '../../usecases/FetchContestsInteractor';

const readTable = async () => {
  return await prisma.$queryRaw`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE'
  `;
};

// These lines are outside of the handler to take advantage of cached execution environments
// https://docs.aws.amazon.com/lambda/latest/dg/running-lambda-code.html
const prisma = new PrismaClient();
const contestRepository = new PrismaContestRepository(prisma);
const fetchContestsInteractor = new FetchContestsInteractor(contestRepository);

export async function main() {
  const tables = await readTable();
  console.log(`Tables: ${JSON.stringify(tables)}`);

  console.log(
    'Start updating the database with the latest contests from Codeforces'
  );
  await fetchContestsInteractor.fetchAllAndUpdate();
  console.log(
    'Finished updating the database with the latest contests from Codeforces'
  );
  await prisma.$disconnect();
}

// Triggered by Lambda function every a few hours
exports.handler = async (event: any, context: any) => {
  try {
    await main();
  } catch (error: unknown) {
    throw error;
  }
};
