import { Mode } from "@/entities/sharedTypes";

export class CustomContestProblem {
  customContestId: string;
  problemContestId: number;
  problemIndex: string;

  constructor({
    customContestId,
    problemContestId,
    problemIndex,
  }: {
    customContestId: string;
    problemContestId: number;
    problemIndex: string;
  }) {
    this.customContestId = customContestId;
    this.problemContestId = problemContestId;
    this.problemIndex = problemIndex;
  }
}

export class CustomContest {
  public contestId: string; // UUID
  public title: string;
  public description: string;
  public owner: string;
  public ownerId: string;
  public problems: CustomContestProblem[];
  public startTime: Date;
  public endTime: Date;
  public penalty: number;
  public mode: Mode;
  public visibility: boolean;
  public participants: string[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor({
    contestId,
    title,
    description,
    owner,
    ownerId,
    problems,
    startTime,
    endTime,
    penalty,
    mode,
    visibility,
    participants,
    createdAt,
    updatedAt,
  }: {
    contestId: string; // UUID
    title: string;
    description: string;
    owner: string;
    ownerId: string;
    problems: CustomContestProblem[];
    startTime: Date;
    endTime: Date;
    penalty: number;
    mode: Mode;
    visibility: boolean;
    participants: string[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.contestId = contestId;
    this.title = title;
    this.description = description;
    this.owner = owner;
    this.ownerId = ownerId;
    this.problems = problems;
    this.startTime = startTime;
    this.endTime = endTime;
    this.penalty = penalty;
    this.mode = mode;
    this.visibility = visibility;
    this.participants = participants;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
