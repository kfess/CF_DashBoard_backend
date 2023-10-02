'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FetchContestsInteractor = void 0;
const axios_1 = __importDefault(require('axios'));
const codeforcesProblemSchema_1 = require('../validators/codeforcesProblemSchema');
const codeforcesContestSchema_1 = require('../validators/codeforcesContestSchema');
const constant_1 = require('../utils/constant');
const Contest_1 = require('../entities/Contest');
const Problem_1 = require('../entities/Problem');
const getClassification_1 = require('../utils/getClassification');
class FetchContestsInteractor {
  constructor(contestRepository) {
    this.contestRepository = contestRepository;
  }
  async fetchAllAndUpdate() {
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
        for (const problem of contest.problems) {
          try {
            await this.contestRepository.updateProblem(contest.id, problem);
          } catch (error) {
            console.error(
              `Failed to upsert problem with index: ${problem.index} in contest with ID: ${contest.id}. Error: ${error}`
            );
          }
        }
      } catch (error) {
        console.error(
          `Failed to save contest with ID: ${contest.id}. Error: ${error}`
        );
      }
    }
  }
  async fetchContestsFromCodeforcesAPI() {
    try {
      const response = await axios_1.default.get(constant_1.CF_CONTESTS_URL);
      const validationResult =
        codeforcesContestSchema_1.ContestApiResponseSchema.safeParse(
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
  async fetchProblemsFromCodeforcesAPI() {
    try {
      const response = await axios_1.default.get(constant_1.CF_PROBLEMS_URL);
      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch problems from Codeforces API. Status code: ${response.status}`
        );
      }
      const validatedResponse =
        codeforcesProblemSchema_1.ProblemApiResponseSchema.safeParse(
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
  mergeContestsWithProblems(
    officialContests,
    officialProblems,
    officialProblemsStatistics
  ) {
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
      var _a;
      const solvedCount = statisticsMap.get(
        `${problem.contestId}-${problem.index}`
      );
      const contestName =
        (_a = contestMap.get(problem.contestId)) !== null && _a !== void 0
          ? _a
          : '';
      const classification = (0, getClassification_1.getClassification)(
        contestName !== null && contestName !== void 0 ? contestName : ''
      );
      return new Problem_1.Problem({
        ...problem,
        solvedCount: solvedCount,
        contestName: contestName,
        classification: classification,
        tags: [...problem.tags],
      });
    });
    // Group problems by contestId
    const problemMap = new Map();
    problems.forEach((problem) => {
      const contestId = problem.contestId;
      const contestProblems = problemMap.get(contestId) || [];
      problemMap.set(contestId, [...contestProblems, problem]);
    });
    return officialContests.map((contest) => {
      return new Contest_1.Contest({
        ...contest,
        problems: problemMap.get(contest.id) || [],
        classification: (0, getClassification_1.getClassification)(
          contest.name
        ),
      });
    });
  }
}
exports.FetchContestsInteractor = FetchContestsInteractor;
