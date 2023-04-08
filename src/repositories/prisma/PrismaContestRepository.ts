import {
  PrismaClient,
  Contest as PrismaContest,
  Problem as PrismaProblem,
} from "@prisma/client";
import {
  ProblemType,
  Tag,
  Classification,
  ContestType,
  Phase,
  Kind,
} from "@/entities/sharedTypes";
import { Problem } from "@/entities/Problem";
import { Contest } from "@/entities/Contest";
import { ContestRepository } from "@/repositories/ContestRepository";

export class PrismaContestRepository implements ContestRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: number): Promise<Contest | null> {
    const contest = await this.prisma.contest.findUnique({
      where: { contestId: id },
    });
    const problems = await this.prisma.problem.findMany({
      where: { contestId: id },
    });

    const problemEntities = problems.map(this.toProblemEntity);

    return contest ? this.toEntity(contest, problemEntities) : null;
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
}
