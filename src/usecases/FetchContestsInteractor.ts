import axios from "axios";
import { ProblemApiResponseSchema } from "@/validators/codeforcesProblemSchema";
import { ContestApiResponseSchema } from "@/validators/codeforcesContestSchema";
import type { OfficialContest } from "@/validators/codeforcesContestSchema";
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

  async run(): Promise<Contest[]> {}

  //   private async fetchContestsFromCodeforcesAPI(): Promise<Contest[]> {
  //     try {
  //       const response = await axios.get(CF_CONTESTS_URL);
  //       const validationResult = ContestApiResponseSchema.safeParse(
  //         response.data
  //       );

  //       if (!validationResult.success) {
  //         throw new Error(
  //           `Failed to validate contest data from Codeforces API. Error: ${validationResult.error}`
  //         );
  //       }

  //       const contestsData = validationResult.data.result;
  //       return contestsData.map((contestData) => {
  //         return new Contest({
  //           ...contestData,
  //           contestId: contestData.id,
  //           contestName: contestData.name,
  //         });
  //       });
  //     } catch (error) {
  //       console.error(`Failed to fetch contests from Codeforces API: ${error}`);
  //       return [];
  //     }
  //   }

  //   private async fetchProblemsFromCodeforcesAPI(
  //     contests: OfficialContest[]
  //   ): Promise<Problem[]> {
  //     try {
  //       const response = await axios.get(CF_PROBLEMS_URL);
  //       if (response.status !== 200) {
  //         throw new Error(
  //           `Failed to fetch problems from Codeforces API. Status code: ${response.status}`
  //         );
  //       }

  //       const validatedResponse = ProblemApiResponseSchema.safeParse(
  //         response.data
  //       );
  //       if (!validatedResponse.success) {
  //         throw new Error(
  //           `Failed to validate problem data from Codeforces API. Error: ${validatedResponse.error}`
  //         );
  //       }

  //       const problemsData = validatedResponse.data.result.problems;
  //       const problemsStatisticsData =
  //         validatedResponse.data.result.problemStatistics;

  //       const contestMap = new Map(
  //         contests.map((contest) => [contest.id, contest.name])
  //       );

  //       const statisticsMap = new Map(
  //         problemsStatisticsData.map((stat) => [
  //           `${stat.contestId}-${stat.index}`,
  //           stat.solvedCount,
  //         ])
  //       );

  //       return problemsData.map((problemData) => {
  //         const solvedCount = statisticsMap.get(
  //           `${problemData.contestId}-${problemData.index}`
  //         );
  //         const contestName = contestMap.get(problemData.contestId) ?? "";
  //         const classification = getClassification(contestName ?? "");

  //         return new Problem({
  //           ...problemData,
  //           solvedCount: solvedCount,
  //           contestName: contestName,
  //           classification: classification,
  //           tags: [...problemData.tags],
  //         });
  //       });
  //     } catch (error) {
  //       console.error(`Failed to fetch problems from Codeforces API: ${error}`);
  //       return [];
  //     }
  //   }
}
