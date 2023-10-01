import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

const readTable = async () => {
  return await prisma.$queryRaw`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE'
  `;
};

export const handler = async (event: any, context: any) => {
  console.log('Migration started');
  try {
    execSync('node node_modules/prisma/build/index.js migrate deploy', {
      stdio: 'inherit',
    });
    console.log('Migration completed');

    const tables = await readTable();

    await prisma.$disconnect();

    return {
      statusCode: 200,
      body: JSON.stringify(tables),
    };
  } catch (error: unknown) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
