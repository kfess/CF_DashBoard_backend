import { gql } from "apollo-server";

export const Contest = gql`
  type Contest {
    id: Int!
    name: String!
    type: String!
    phase: String!
    frozen: Boolean!
    durationSeconds: Int!
    startTimeSeconds: Int!
    kind: String!
    problems: [Problem]!
    classification: String!
    icpcRegion: String
    country: String
    city: String
    season: String
    preparedBy: String
    websiteUrl: String
    description: String
    difficulty: Int
  }
`;
