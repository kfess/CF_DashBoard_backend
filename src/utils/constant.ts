// if env variable is not set, use default value
export const CF_CONTESTS_URL =
  process.env.CF_CONTESTS_URL ||
  'https://raw.githubusercontent.com/kfess/CF_DashBoard_crawler/main/scripts/data/contest-list.json';

export const CF_PROBLEMS_URL =
  process.env.CF_PROBLEMS_URL ||
  'https://raw.githubusercontent.com/kfess/CF_DashBoard_crawler/main/scripts/data/problems.json';
