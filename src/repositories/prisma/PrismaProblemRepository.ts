import { Prisma, PrismaClient, Problem as PrismaProblem } from "@prisma/client";
import { ProblemType, Tag, Classification } from "../../entities/sharedTypes";
import { Problem } from "../../entities/Problem";
import { ProblemRepository } from "../../repositories/ProblemRepository";

export class PrismaProblemRepository implements ProblemRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(contestId: number, index: string): Promise<Problem | null> {
    const problem = await this.prisma.problem.findUnique({
      where: { contestId_index: { contestId: contestId, index: index } },
    });

    return problem ? this.toEntity(problem) : null;
  }

  async findAll(): Promise<Problem[]> {
    const problems = await this.prisma.problem.findMany();
    return problems.map((problem) => this.toEntity(problem));
  }

  async create(problem: Problem): Promise<Problem> {
    const createdProblem = await this.prisma.problem.create({
      data: this.fromEntity(problem, false),
    });
    return this.toEntity(createdProblem);
  }

  async update(problem: Problem): Promise<Problem> {
    const updatedProblem = await this.prisma.problem.update({
      where: {
        contestId_index: { contestId: problem.contestId, index: problem.index },
      },
      data: this.fromEntity(problem, true),
    });
    return this.toEntity(updatedProblem);
  }

  private toEntity(problem: PrismaProblem): Problem {
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

  private fromEntity(
    problem: Problem,
    isUpdate: boolean,
  ): Prisma.ProblemCreateInput {
    const problemData: Prisma.ProblemCreateInput = {
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
    };

    if (!isUpdate) {
      problemData.contest = {
        connect: {
          id: problem.contestId,
        },
      };
    }
    return problemData;
  }
}
