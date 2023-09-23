import {
  Prisma,
  PrismaClient,
  CustomContest as PrismaCustomContest,
  Problem as PrismaProblem,
} from "@prisma/client";
import { CustomContestRepository } from "../CustomContestRepository";
import { CustomContest } from "../../entities/CustomContest";
import { Mode, Visibility } from "../../entities/sharedTypes";
import { ProblemType, Tag, Classification } from "../../entities/sharedTypes";
import { Problem } from "../../entities/Problem";

export class PrismaCustomContestRepository implements CustomContestRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByContestId(contestId: string): Promise<CustomContest | null> {
    try {
      const contest = await this.prisma.customContest.findUnique({
        where: { contestId: contestId },
        include: { problems: { include: { problem: true } } },
      });

      const problems =
        contest?.problems.map((problem) => problem.problem) ?? [];

      return contest ? this.toEntity(contest, problems) : null;
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
        include: { problems: { include: { problem: true } } },
      });

      const cleanedContests = contests.map((contest) => {
        const cleanedProblems: PrismaProblem[] = contest.problems.map(
          (problem) => problem.problem,
        );
        return { ...contest, problems: cleanedProblems };
      });

      return cleanedContests.map((contest) =>
        this.toEntity(contest, contest.problems),
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findCreatedContests(ownerId: string): Promise<CustomContest[]> {
    try {
      const contests = await this.prisma.customContest.findMany({
        where: { ownerId: ownerId },
        include: { problems: { include: { problem: true } } },
      });

      const cleanedContests = contests.map((contest) => {
        const cleanedProblems: PrismaProblem[] = contest.problems.map(
          (problem) => problem.problem,
        );
        return { ...contest, problems: cleanedProblems };
      });

      return cleanedContests.map((contest) =>
        this.toEntity(contest, contest.problems),
      );
    } catch (error) {
      throw error;
    }
  }

  // need to fix this
  async findParticipatedContests(ownerId: string): Promise<CustomContest[]> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { githubUsername: ownerId },
      });

      const contests = await this.prisma.customContest.findMany({
        where: { participants: { has: user?.codeforcesUsername } },
        include: { problems: { include: { problem: true } } },
      });

      const cleanedContests = contests.map((contest) => {
        const cleanedProblems: PrismaProblem[] = contest.problems.map(
          (problem) => problem.problem,
        );
        return { ...contest, problems: cleanedProblems };
      });

      return cleanedContests.map((contest) =>
        this.toEntity(contest, contest.problems),
      );
    } catch (error) {
      throw error;
    }
  }

  async create(customContest: CustomContest): Promise<CustomContest> {
    try {
      const createdContest = await this.prisma.customContest.create({
        data: this.fromEntity(customContest),
        include: { problems: { include: { problem: true } } },
      });

      const problems =
        createdContest?.problems.map((problem) => problem.problem) ?? [];

      return this.toEntity(createdContest, problems);
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
        include: { problems: { include: { problem: true } } },
      });

      const problems =
        updatedContest?.problems.map((problem) => problem.problem) ?? [];

      return this.toEntity(updatedContest, problems);
    } catch (error) {
      throw error;
    }
  }

  async addUserToContest(
    participant: string,
    contestId: string,
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
    contestId: string,
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
      (p) => p != participant,
    );

    await this.prisma.customContest.update({
      where: { contestId: contestId },
      data: { participants: updatedParticipants },
    });
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

  private toEntity(
    customContest: PrismaCustomContest,
    problems: PrismaProblem[],
  ): CustomContest {
    const mode = customContest.mode as Mode;
    const visibility = customContest.visibility as Visibility;
    const customContestProblems = problems.map((problem) =>
      this.toProblemEntity(problem),
    );
    return new CustomContest({
      ...customContest,
      mode,
      visibility,
      problems: customContestProblems,
    });
  }

  private fromEntity(
    customContest: CustomContest,
  ): Prisma.CustomContestCreateInput {
    const problems: Prisma.CustomContestProblemCreateNestedManyWithoutCustomContestInput =
      {
        create: customContest.problems.map((problem) => ({
          problem: {
            connectOrCreate: {
              create: {
                contestId: problem.contestId,
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
              },
              where: {
                contestId_index: {
                  contestId: problem.contestId,
                  index: problem.index,
                },
              },
            },
          },
        })),
      };

    return { ...customContest, problems: problems };
  }
}
