import {
  Classification,
  Kind,
  Phase,
  ContestType,
} from "@/entities/sharedTypes";
import { Problem } from "@/entities/Problem";

export class Contest {
  readonly contestId: number;
  readonly contestName: string;
  readonly type: ContestType;
  readonly phase: Phase;
  readonly frozen: boolean;
  readonly durationSeconds: number;
  readonly startTimeSeconds: number;
  readonly relativeTimeSeconds: number;
  readonly kind: Kind;
  readonly problems: Problem[];
  readonly classification: Classification;
  readonly icpcRegion?: string;
  readonly country?: string;
  readonly city?: string;
  readonly season?: string;
  readonly preparedBy?: number;
  readonly websiteUrl?: number;
  readonly description?: number;
  readonly difficulty?: number;

  constructor({
    contestId,
    contestName,
    type,
    phase,
    frozen,
    durationSeconds,
    startTimeSeconds,
    relativeTimeSeconds,
    kind,
    problems,
    classification,
    icpcRegion,
    country,
    city,
    season,
    preparedBy,
    websiteUrl,
    description,
    difficulty,
  }: {
    contestId: number;
    contestName: string;
    type: ContestType;
    phase: Phase;
    frozen: boolean;
    durationSeconds: number;
    startTimeSeconds: number;
    relativeTimeSeconds: number;
    kind: Kind;
    problems: Problem[];
    classification: Classification;
    icpcRegion?: string;
    country?: string;
    city?: string;
    season?: string;
    preparedBy?: number;
    websiteUrl?: number;
    description?: number;
    difficulty?: number;
  }) {
    this.contestId = contestId;
    this.contestName = contestName;
    this.type = type;
    this.phase = phase;
    this.frozen = frozen;
    this.durationSeconds = durationSeconds;
    this.startTimeSeconds = startTimeSeconds;
    this.relativeTimeSeconds = relativeTimeSeconds;
    this.kind = kind;
    this.icpcRegion = icpcRegion;
    this.country = country;
    this.city = city;
    this.season = season;
    this.problems = problems;
    this.classification = classification;
    this.preparedBy = preparedBy;
    this.websiteUrl = websiteUrl;
    this.description = description;
    this.difficulty = difficulty;
  }
}
