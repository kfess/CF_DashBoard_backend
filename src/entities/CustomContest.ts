import { Mode } from "@/entities/sharedTypes";
import { Problem } from "@/entities/Problem";

export class CustomContest {
  public contestId: number;
  public title: string;
  public description: string;
  public owner: string;
  public ownerId: string;
  public problems: Problem[];
  public startTime: Date;
  public endTime: Date;
  public penalty: number;
  public mode: Mode;
  public visibility: boolean;
  public participants: string[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    contestId: number,
    title: string,
    description: string,
    owner: string,
    ownerId: string,
    problems: Problem[],
    startTime: Date,
    endTime: Date,
    penalty: number,
    mode: Mode,
    visibility: boolean,
    participants: string[],
    createdAt: Date,
    updatedAt: Date
  ) {
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
