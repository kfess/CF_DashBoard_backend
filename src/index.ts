import "module-alias/register";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema/index";
import { resolvers } from "./graphql/resolvers";
import { PrismaContestRepository } from "./repositories/prisma/PrismaContestRepository";
import { GetContestsInteractor } from "./usecases/GetContestsInteractor";

const prisma = new PrismaClient();
const contestRepository = new PrismaContestRepository(prisma);
const getContestsUsecase = new GetContestsInteractor(contestRepository);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    getContestsUsecase,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
