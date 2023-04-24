import {
  Prisma,
  PrismaClient,
  CustomContest as PrismaCustomContest,
  CustomContestProblem as PrismaCustomContestProblem,
} from "@prisma/client";
import { CustomContestRepository } from "@/repositories/CustomContestRepository";
import { CustomContest, CustomContestProblem } from "@/entities/CustomContest";
import { Mode, Visibility } from "@/entities/sharedTypes";

export class PrismaCustomContestRepository implements CustomContestRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByContestId(contestId: string): Promise<CustomContest | null> {
    try {
      const contest = await this.prisma.customContest.findUnique({
        where: { contestId: contestId },
        include: { problems: true },
      });
      return contest ? this.toEntity(contest, contest.problems) : null;
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string | undefined): Promise<CustomContest[]> {
    try {
      const contests = await this.prisma.customContest.findMany({
        where: {
          OR: [
            { visibility: "Public" },
            ...(userId ? [{ ownerId: userId }] : []),
          ],
        },
        include: { problems: true },
      });
      return contests.map((contest) =>
        this.toEntity(contest, contest.problems)
      );
    } catch (error) {
      throw error;
    }
  }

  async findCreatedContests(ownerId: string): Promise<CustomContest[]> {
    try {
      const contests = await this.prisma.customContest.findMany({
        where: { ownerId: ownerId },
        include: { problems: true },
      });
      return contests.map((contest) =>
        this.toEntity(contest, contest.problems)
      );
    } catch (error) {
      throw error;
    }
  }

  async findParticipatedContests(ownerId: string): Promise<CustomContest[]> {
    try {
      const contests = await this.prisma.customContest.findMany({
        where: { participants: { has: ownerId } },
        include: { problems: true },
      });
      return contests.map((contest) =>
        this.toEntity(contest, contest.problems)
      );
    } catch (error) {
      throw error;
    }
  }

  async create(customContest: CustomContest): Promise<CustomContest> {
    try {
      const createdContest = await this.prisma.customContest.create({
        data: this.fromEntity(customContest),
        include: { problems: true },
      });

      return this.toEntity(createdContest, createdContest.problems);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(customContest: CustomContest): Promise<CustomContest> {
    try {
      const updatedContest = await this.prisma.customContest.update({
        where: { contestId: customContest.contestId },
        data: { ...this.fromEntity(customContest), problems: undefined },
        include: { problems: true },
      });
      return this.toEntity(updatedContest, updatedContest.problems);
    } catch (error) {
      throw error;
    }
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
    const visibility = customContest.visibility as Visibility;
    const customContestProblems = problems.map((problem) =>
      this.toProblemEntity(problem)
    );
    return new CustomContest({
      ...customContest,
      mode,
      visibility,
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
