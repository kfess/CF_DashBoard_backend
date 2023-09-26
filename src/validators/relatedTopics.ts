import { z } from 'zod';

const levelTopics = [
  'Easy-Level',
  'Medium-Level',
  'Hard-Level',
  'Typical',
] as const;
type LevelTopics = (typeof levelTopics)[number];

const targetTopics = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
] as const;
type TargetTopics = (typeof targetTopics)[number];

const difficultyTopics = Array.from(
  { length: 33 },
  (_, i) => 800 + i * 100
).map((val) => `Difficult-${val}` as const);
type DifficultyTopics = (typeof difficultyTopics)[number];

const unknownTopics = ['Uncategorized'] as const;
type UnknownTopics = (typeof unknownTopics)[number];

const tags = [
  'implementation',
  'math',
  'greedy',
  'dp',
  'data structures',
  'brute force',
  'constructive algorithms',
  'graphs',
  'sortings',
  'binary search',
  'dfs and similar',
  'trees',
  'strings',
  'number theory',
  'combinatorics',
  '*special',
  'geometry',
  'bitmasks',
  'two pointers',
  'dsu',
  'shortest paths',
  'probabilities',
  'divide and conquer',
  'hashing',
  'games',
  'flows',
  'interactive',
  'matrices',
  'fft',
  'ternary search',
  'expression parsing',
  'meet-in-the-middle',
  '2-sat',
  'chinese remainder theorem',
  'schedules',
  'no tags',
] as const;
export type AlgorithmTopics = (typeof tags)[number];

const modes = ['Normal', 'Training'] as const;
type ModeTopics = (typeof modes)[number];

const classifications = [
  'All',
  'Div. 1',
  'Div. 1 + Div. 2',
  'Div. 2',
  'Div. 3',
  'Div. 4',
  'ICPC',
  'Kotlin Heroes',
  'Global',
  'Educational',
  'Others',
] as const;
type ClassificationTopics = (typeof classifications)[number];

const contestType = ['CF', 'IOI', 'Other'] as const;
export type ContestType = (typeof contestType)[number];

export type RelatedTopics =
  | LevelTopics
  | TargetTopics
  | DifficultyTopics
  | UnknownTopics
  | AlgorithmTopics
  | ModeTopics
  | ClassificationTopics
  | ContestType;

export const relatedTopics = [
  ...levelTopics,
  ...targetTopics,
  ...difficultyTopics,
  ...unknownTopics,
  ...tags,
  ...modes,
  ...classifications,
  ...contestType,
] as const;

export const relatedTopicsSchema = z.array(
  z
    .enum(relatedTopics)
    .refine((val) => relatedTopics.includes(val), {
      message: 'Invalid Related Topics',
    })
);
