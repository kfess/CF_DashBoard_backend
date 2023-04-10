import { gql } from "apollo-server";
import { Contest } from "./Contest";
import { Problem } from "./Problem";

export const typeDefs = gql`
  ${Contest}
  ${Problem}

  type Query {
    contest(id: Int!): Contest
    contests: [Contest]!
  }
`;
