import { gql } from "apollo-server";

export const Problem = gql`
  type Problem {
    contestId: Int!
    index: String!
    type: String!
    tags: [String]!
    contestName: String!
    classification: String
    problemsetName: String
    points: Float
    rating: Int
    solvedCount: Int
  }
`;
