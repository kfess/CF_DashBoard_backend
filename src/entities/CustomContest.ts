import { Mode, RelatedTopics, Visibility } from './sharedTypes';
import { Problem } from './Problem';

export class CustomContest {
  public contestId: string | undefined; // UUID
  public title: string;
  public description: string;
  public owner: string;
  public ownerId: string;
  public problems: Problem[];
  public startDate: Date;
  public endDate: Date;
  public penalty: number;
  public mode: Mode;
  public visibility: Visibility;
  public relatedTopics: RelatedTopics[];
  public participants: string[];

  constructor({
    contestId,
    title,
    description,
    owner,
    ownerId,
    problems,
    startDate,
    endDate,
    penalty,
    mode,
    visibility,
    relatedTopics,
    participants,
  }: {
    contestId?: string; // UUID
    title: string;
    description: string;
    owner: string;
    ownerId: string;
    problems: Problem[];
    startDate: Date;
    endDate: Date;
    penalty: number;
    mode: Mode;
    visibility: Visibility;
    relatedTopics: RelatedTopics[];
    participants: string[];
  }) {
    this.contestId = contestId;
    this.title = title;
    this.description = description;
    this.owner = owner;
    this.ownerId = ownerId;
    this.problems = problems;
    this.startDate = startDate;
    this.endDate = endDate;
    this.penalty = penalty;
    this.mode = mode;
    this.visibility = visibility;
    this.relatedTopics = relatedTopics;
    this.participants = participants;
  }
}
