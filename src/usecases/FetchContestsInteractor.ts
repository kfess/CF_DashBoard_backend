import axios from "axios";
import {
  ProblemApiResponseSchema,
  OfficialProblem,
  OfficialStatisticsProblem,
} from "@/validators/codeforcesProblemSchema";
import {
  ContestApiResponseSchema,
  OfficialContest,
} from "@/validators/codeforcesContestSchema";
import { CF_CONTESTS_URL, CF_PROBLEMS_URL } from "@/utils/constant";
import { Contest } from "@/entities/Contest";
import { Problem } from "@/entities/Problem";
import { ContestRepository } from "@/repositories/ContestRepository";
import { FetchContestUsecase } from "@/usecases/FetchContestsUsecase";
import { getClassification } from "@/utils/getClassification";

export class FetchContestsInteractor implements FetchContestUsecase {
  private contestRepository: ContestRepository;

  constructor(contestRepository: ContestRepository) {
    this.contestRepository = contestRepository;
  }

  async run(): Promise<void> {
    const officialContests = await this.fetchContestsFromCodeforcesAPI();
    const [officialProblems, officialStatisticsProblems] =
      await this.fetchProblemsFromCodeforcesAPI();
    const mergedContests = this.mergeContestsWithProblems(
      officialContests,
      officialProblems,
      officialStatisticsProblems
    );

    for (const contest of mergedContests) {
      try {
        const existingContest = await this.contestRepository.findById(
          contest.id
        );
        if (!existingContest) {
          await this.contestRepository.create(contest);
        } else {
          await this.contestRepository.update(contest);
        }
      } catch (error) {
        console.error(
          `Failed to save contest with ID: ${contest.id}. Error: ${error}`
        );
      }
    }
  }

  private async fetchContestsFromCodeforcesAPI(): Promise<OfficialContest[]> {
    try {
      const response = await axios.get(CF_CONTESTS_URL);
      const validationResult = ContestApiResponseSchema.safeParse(
        response.data
      );
      if (!validationResult.success) {
        throw new Error(
          `Failed to validate contest data from Codeforces API. Error: ${validationResult.error}`
        );
      }

      return validationResult.data.result;
    } catch (error) {
      console.error(`Failed to fetch contests from Codeforces API: ${error}`);
      return [];
    }
  }

  private async fetchProblemsFromCodeforcesAPI(): Promise<
    [OfficialProblem[], OfficialStatisticsProblem[]]
  > {
    try {
      const response = await axios.get(CF_PROBLEMS_URL);
      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch problems from Codeforces API. Status code: ${response.status}`
        );
      }

      const validatedResponse = ProblemApiResponseSchema.safeParse(
        response.data
      );
      if (!validatedResponse.success) {
        throw new Error(
          `Failed to validate problem data from Codeforces API. Error: ${validatedResponse.error}`
        );
      }

      const problemsData = validatedResponse.data.result.problems;
      const problemsStatisticsData =
        validatedResponse.data.result.problemStatistics;

      return [problemsData, problemsStatisticsData];
    } catch (error) {
      console.error(`Failed to fetch problems from Codeforces API: ${error}`);
      return [[], []];
    }
  }

  private mergeContestsWithProblems(
    officialContests: OfficialContest[],
    officialProblems: OfficialProblem[],
    officialProblemsStatistics: OfficialStatisticsProblem[]
  ): Contest[] {
    const contestMap = new Map(
      officialContests.map((contest) => [contest.id, contest.name])
    );

    const statisticsMap = new Map(
      officialProblemsStatistics.map((stat) => [
        `${stat.contestId}-${stat.index}`,
        stat.solvedCount,
      ])
    );

    const problems = officialProblems.map((problem) => {
      const solvedCount = statisticsMap.get(
        `${problem.contestId}-${problem.index}`
      );
      const contestName = contestMap.get(problem.contestId) ?? "";
      const classification = getClassification(contestName ?? "");
      return new Problem({
        ...problem,
        solvedCount: solvedCount,
        contestName: contestName,
        classification: classification,
        tags: [...problem.tags],
      });
    });

    // Group problems by contestId
    const problemMap: Map<number, Problem[]> = new Map();
    problems.forEach((problem) => {
      const contestId = problem.contestId;
      const problems = problemMap.get(contestId) || [];
      problemMap.set(contestId, problems);
    });

    return officialContests.map((contest) => {
      return new Contest({
        ...contest,
        problems: problemMap.get(contest.id) || [],
        classification: getClassification(contest.name),
      });
    });
  }
}
