import {
  Prisma,
  PrismaClient,
  CustomContest as PrismaCustomContest,
  CustomContestProblem as PrismaCustomContestProblem,
} from "@prisma/client";
import { CustomContestRepository } from "@/repositories/CustomContestRepository";
import { CustomContest, CustomContestProblem } from "@/entities/CustomContest";
import { Mode } from "@/entities/sharedTypes";

export class PrismaCustomContestRepository implements CustomContestRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByContestId(contestId: string): Promise<CustomContest | null> {
    const contest = await this.prisma.customContest.findUnique({
      where: { contestId: contestId },
      include: { problems: true },
    });
    return contest ? this.toEntity(contest, contest.problems) : null;
  }

  async findAll(): Promise<CustomContest[]> {
    const contests = await this.prisma.customContest.findMany({
      include: { problems: true },
    });
    return contests.map((contest) => this.toEntity(contest, contest.problems));
  }

  async findByOwnerId(ownerId: string): Promise<CustomContest[]> {
    const contests = await this.prisma.customContest.findMany({
      where: { ownerId: ownerId },
      include: { problems: true },
    });
    return contests.map((contest) => this.toEntity(contest, contest.problems));
  }

  async create(customContest: CustomContest): Promise<CustomContest> {
    const createdContest = await this.prisma.customContest.create({
      data: this.fromEntity(customContest),
      include: { problems: true },
    });

    return this.toEntity(createdContest, createdContest.problems);
  }

  async update(customContest: CustomContest): Promise<CustomContest> {
    const updatedContest = await this.prisma.customContest.update({
      where: { contestId: customContest.contestId },
      data: { ...this.fromEntity(customContest), problems: undefined },
      include: { problems: true },
    });
    return this.toEntity(updatedContest, updatedContest.problems);
  }

  async addUserToContest(
    participant: string,
    contestId: string
  ): Promise<void> {
    const contest = await this.prisma.customContest.findUnique({
      where: { contestId: contestId },
    });

    if (!contest) {
      throw new Error("Custom contest not found");
    }

    if (contest.participants.includes(participant)) {
      throw new Error("User is already a participant in the custom contest");
    }

    const updatedParticipants = [...contest.participants, participant];

    await this.prisma.customContest.update({
      where: { contestId: contestId },
      data: { participants: updatedParticipants },
    });
  }

  async removeUserFromContest(
    participant: string,
    contestId: string
  ): Promise<void> {
    const contest = await this.prisma.customContest.findUnique({
      where: { contestId: contestId },
    });

    if (!contest) {
      throw new Error("Custom contest not found");
    }

    if (!contest.participants.includes(participant)) {
      throw new Error("User is already a participant in the custom contest");
    }

    const updatedParticipants = contest.participants.filter(
      (p) => p != participant
    );

    await this.prisma.customContest.update({
      where: { contestId: contestId },
      data: { participants: updatedParticipants },
    });
  }

  private toProblemEntity(
    problem: PrismaCustomContestProblem
  ): CustomContestProblem {
    return new CustomContestProblem({
      customContestId: problem.customContestId,
      problemContestId: problem.problemContestId,
      problemIndex: problem.problemIndex,
    });
  }

  private toEntity(
    customContest: PrismaCustomContest,
    problems: PrismaCustomContestProblem[]
  ): CustomContest {
    const mode = customContest.mode as Mode;
    const customContestProblems = problems.map((problem) =>
      this.toProblemEntity(problem)
    );
    return new CustomContest({
      ...customContest,
      mode,
      problems: customContestProblems,
    });
  }

  private fromEntity(
    customContest: CustomContest
  ): Prisma.CustomContestCreateInput {
    const problems: Prisma.CustomContestProblemCreateNestedManyWithoutCustomContestInput =
      {
        create: customContest.problems.map((problem) => ({
          problemContestId: problem.problemContestId,
          problemIndex: problem.problemIndex,
        })),
      };

    return { ...customContest, problems: problems };
  }
}
