'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PrismaContestRepository = void 0;
const Problem_1 = require('../../entities/Problem');
const Contest_1 = require('../../entities/Contest');
class PrismaContestRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async findById(id) {
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
  async findAll() {
    const contests = await this.prisma.contest.findMany({
      include: {
        problems: true,
      },
    });
    return contests.map((contest) =>
      this.toEntity(contest, contest.problems.map(this.toProblemEntity))
    );
  }
  async create(contest) {
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
  async update(contest) {
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
  async updateProblem(contestId, problem) {
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
  toProblemEntity(problem) {
    var _a, _b, _c, _d;
    const type = problem.type;
    const tags = problem.tags;
    const classification = problem.classification;
    const problemsetName =
      (_a = problem.problemsetName) !== null && _a !== void 0 ? _a : undefined;
    const points =
      (_b = problem.points) !== null && _b !== void 0 ? _b : undefined;
    const rating =
      (_c = problem.rating) !== null && _c !== void 0 ? _c : undefined;
    const solvedCount =
      (_d = problem.solvedCount) !== null && _d !== void 0 ? _d : undefined;
    return new Problem_1.Problem({
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
  toEntity(contest, problems) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const type = contest.type;
    const phase = contest.phase;
    const kind = contest.kind;
    const classification = contest.classification;
    const relativeTimeSeconds =
      (_a = contest.relativeTimeSeconds) !== null && _a !== void 0
        ? _a
        : undefined;
    const icpcRegion =
      (_b = contest.icpcRegion) !== null && _b !== void 0 ? _b : undefined;
    const country =
      (_c = contest.country) !== null && _c !== void 0 ? _c : undefined;
    const city = (_d = contest.city) !== null && _d !== void 0 ? _d : undefined;
    const season =
      (_e = contest.season) !== null && _e !== void 0 ? _e : undefined;
    const preparedBy =
      (_f = contest.preparedBy) !== null && _f !== void 0 ? _f : undefined;
    const websiteUrl =
      (_g = contest.websiteUrl) !== null && _g !== void 0 ? _g : undefined;
    const description =
      (_h = contest.description) !== null && _h !== void 0 ? _h : undefined;
    const difficulty =
      (_j = contest.difficulty) !== null && _j !== void 0 ? _j : undefined;
    return new Contest_1.Contest({
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
  fromEntity(contest) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const problems = {
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
      icpcRegion:
        (_a = contest.icpcRegion) !== null && _a !== void 0 ? _a : null,
      country: (_b = contest.country) !== null && _b !== void 0 ? _b : null,
      city: (_c = contest.city) !== null && _c !== void 0 ? _c : null,
      season: (_d = contest.season) !== null && _d !== void 0 ? _d : null,
      preparedBy:
        (_e = contest.preparedBy) !== null && _e !== void 0 ? _e : null,
      websiteUrl:
        (_f = contest.websiteUrl) !== null && _f !== void 0 ? _f : null,
      description:
        (_g = contest.description) !== null && _g !== void 0 ? _g : null,
      difficulty:
        (_h = contest.difficulty) !== null && _h !== void 0 ? _h : null,
      problems: problems,
    };
  }
}
exports.PrismaContestRepository = PrismaContestRepository;
