import {
  Prisma,
  PrismaClient,
  Contest as PrismaContest,
  Problem as PrismaProblem,
} from '@prisma/client';
import {
  ProblemType,
  Tag,
  Classification,
  ContestType,
  Phase,
  Kind,
} from '@/entities/sharedTypes';
import { Problem } from '../../entities/Problem';
import { Contest } from '../../entities/Contest';
import { ContestRepository } from '../../repositories/ContestRepository';

export class PrismaContestRepository implements ContestRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: number): Promise<Contest | null> {
    const contest = await this.prisma.contest.findUnique({
      where: {
        id: id,
      },
      include: {
        problems: true,
      },
    });
    return contest
      ? this.toEntity(contest, contest.problems.map(this.toProblemEntity))
      : null;
  }

  async findAll(): Promise<Contest[]> {
    const contests = await this.prisma.contest.findMany({
      include: {
        problems: true,
      },
    });
    return contests.map((contest) =>
      this.toEntity(contest, contest.problems.map(this.toProblemEntity))
    );
  }

  async create(contest: Contest): Promise<Contest> {
    const createdContest = await this.prisma.contest.create({
      data: this.fromEntity(contest),
      include: {
        problems: true,
      },
    });
    return this.toEntity(
      createdContest,
      createdContest.problems.map(this.toProblemEntity)
    );
  }

  async update(contest: Contest): Promise<Contest> {
    const updatedContest = await this.prisma.contest.update({
      where: {
        id: contest.id,
      },
      data: {
        ...this.fromEntity(contest),
        problems: undefined,
      },
      include: {
        problems: true,
      },
    });
    return this.toEntity(
      updatedContest,
      updatedContest.problems.map(this.toProblemEntity)
    );
  }

  async updateProblem(contestId: number, problem: Problem): Promise<Problem> {
    const updatedProblem = await this.prisma.problem.upsert({
      where: {
        contestId_index: {
          contestId: contestId,
          index: problem.index,
        },
      },
      update: problem,
      create: {
        ...problem,
        contestId: contestId,
      },
    });

    return this.toProblemEntity(updatedProblem);
  }

  private toProblemEntity(problem: PrismaProblem): Problem {
    const type = problem.type as ProblemType;
    const tags = problem.tags as Tag[];
    const classification = problem.classification as Classification;
    const problemsetName = problem.problemsetName ?? undefined;
    const points = problem.points ?? undefined;
    const rating = problem.rating ?? undefined;
    const solvedCount = problem.solvedCount ?? undefined;

    return new Problem({
      ...problem,
      type,
      tags,
      classification,
      problemsetName,
      points,
      rating,
      solvedCount,
    });
  }

  private toEntity(contest: PrismaContest, problems: Problem[]): Contest {
    const type = contest.type as ContestType;
    const phase = contest.phase as Phase;
    const kind = contest.kind as Kind;
    const classification = contest.classification as Classification;
    const relativeTimeSeconds = contest.relativeTimeSeconds ?? undefined;
    const icpcRegion = contest.icpcRegion ?? undefined;
    const country = contest.country ?? undefined;
    const city = contest.city ?? undefined;
    const season = contest.season ?? undefined;
    const preparedBy = contest.preparedBy ?? undefined;
    const websiteUrl = contest.websiteUrl ?? undefined;
    const description = contest.description ?? undefined;
    const difficulty = contest.difficulty ?? undefined;

    return new Contest({
      ...contest,
      problems,
      type,
      phase,
      kind,
      classification,
      relativeTimeSeconds,
      icpcRegion,
      country,
      city,
      season,
      preparedBy,
      websiteUrl,
      description,
      difficulty,
    });
  }

  private fromEntity(contest: Contest): Prisma.ContestCreateInput {
    const problems: Prisma.ProblemCreateNestedManyWithoutContestInput = {
      create: contest.problems.map((problem) => ({
        index: problem.index,
        name: problem.name,
        type: problem.type,
        tags: problem.tags,
        contestName: problem.contestName,
        classification: problem.classification,
        problemsetName: problem.problemsetName,
        points: problem.points,
        rating: problem.rating,
        solvedCount: problem.solvedCount,
      })),
    };

    return {
      id: contest.id,
      name: contest.name,
      type: contest.type,
      startTimeSeconds: contest.startTimeSeconds,
      durationSeconds: contest.durationSeconds,
      relativeTimeSeconds: contest.relativeTimeSeconds,
      phase: contest.phase,
      frozen: contest.frozen,
      kind: contest.kind,
      classification: contest.classification,
      icpcRegion: contest.icpcRegion ?? null,
      country: contest.country ?? null,
      city: contest.city ?? null,
      season: contest.season ?? null,
      preparedBy: contest.preparedBy ?? null,
      websiteUrl: contest.websiteUrl ?? null,
      description: contest.description ?? null,
      difficulty: contest.difficulty ?? null,
      problems: problems,
    };
  }
}
