'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CF_PROBLEMS_URL = exports.CF_CONTESTS_URL = void 0;
// if env variable is not set, use default value
exports.CF_CONTESTS_URL =
  process.env.CF_CONTESTS_URL ||
  'https://raw.githubusercontent.com/kfess/Codeforces_Problems_daily_update/main/scripts/data/contest-list.json';
exports.CF_PROBLEMS_URL =
  process.env.CF_PROBLEMS_URL ||
  'https://raw.githubusercontent.com/kfess/Codeforces_Problems_daily_update/main/scripts/data/problems.json';
