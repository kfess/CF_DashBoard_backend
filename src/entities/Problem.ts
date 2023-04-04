import { Classification, ProblemType, Tag } from "@/entities/sharedTypes";

export class Problem {
  readonly contestId: number;
  readonly index: string;
  readonly name: string;
  readonly type: ProblemType;
  readonly tags: Tag[];
  readonly contestName: string;
  readonly classification: Classification;
  readonly problemsetName?: string;
  readonly points?: number;
  readonly rating?: number;
  readonly solvedCount?: number;

  constructor(
    contestId: number,
    index: string,
    name: string,
    type: ProblemType,
    tags: Tag[],
    contestName: string,
    classification: Classification,
    problemsetName?: string,
    points?: number,
    rating?: number,
    solvedCount?: number
  ) {
    this.contestId = contestId;
    this.contestName = contestName;
    this.index = index;
    this.name = name;
    this.type = type;
    this.tags = tags;
    this.classification = classification;
    this.problemsetName = problemsetName;
    this.points = points;
    this.rating = rating;
    this.solvedCount = solvedCount;
  }
}
