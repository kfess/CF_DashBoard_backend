import { gql } from "apollo-server";
import { Contest } from "@/graphql/schema/Contest";
import { Problem } from "@/graphql/schema/Problem";

export const typeDefs = gql`
  ${Contest}
  ${Problem}

  type Query {
    contest(id: Int!): Contest
    contests: [Contest]!
  }
`;
