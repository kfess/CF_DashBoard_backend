import "module-alias/register";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema/index";
import { resolvers } from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
