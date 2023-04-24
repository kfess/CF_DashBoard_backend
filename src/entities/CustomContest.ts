import { Mode, Visibility } from "@/entities/sharedTypes";
import { Problem } from "@/entities/Problem";

export class CustomContest {
  public contestId: string | undefined; // UUID
  public title: string;
  public description: string;
  public owner: string;
  public ownerId: string;
  public problems: Problem[];
  public startTime: Date;
  public endTime: Date;
  public penalty: number;
  public mode: Mode;
  public visibility: Visibility;
  public participants: string[];

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
  }: {
    contestId?: string; // UUID
    title: string;
    description: string;
    owner: string;
    ownerId: string;
    problems: Problem[];
    startTime: Date;
    endTime: Date;
    penalty: number;
    mode: Mode;
    visibility: Visibility;
    participants: string[];
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
  }
}
