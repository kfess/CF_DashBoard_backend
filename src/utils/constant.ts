// if env variable is not set, use default value
export const CF_CONTESTS_URL =
  process.env.CF_CONTESTS_URL || "https://codeforces.com/api/contest.list";

export const CF_PROBLEMS_URL =
  process.env.CF_PROBLEMS_URL ||
  "https://codeforces.com/api/problemset.problems";
