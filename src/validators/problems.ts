import { z } from 'zod';

// this is the same as "@features/contests/contest"
// Importing classificationSchema from "@features/contests/contest"
// did not work for me. So I redefined the same classificationSchema
// I want to fix anyway.
export const classificationSchema = z.union([
  z.literal('All'),
  z.literal('Div. 1'),
  z.literal('Div. 2'),
  z.literal('Div. 1 + Div. 2'),
  z.literal('Div. 3'),
  z.literal('Div. 4'),
  z.literal('ICPC'),
  z.literal('Kotlin Heroes'),
  z.literal('Global'),
  z.literal('Educational'),
  z.literal('Others'),
]);

// https://codeforces.com/apiHelp/objects#Problem

export const typeSchema = z.union([
  z.literal('PROGRAMMING'),
  z.literal('QUESTION'),
]);
export const problemType = ['PROGRAMMING', 'QUESTION'] as const;
export type ProblemType = (typeof problemType)[number];

export const tagSchema = z.union([
  z.literal('implementation'),
  z.literal('math'),
  z.literal('greedy'),
  z.literal('dp'),
  z.literal('data structures'),
  z.literal('brute force'),
  z.literal('constructive algorithms'),
  z.literal('graphs'),
  z.literal('sortings'),
  z.literal('binary search'),
  z.literal('dfs and similar'),
  z.literal('trees'),
  z.literal('strings'),
  z.literal('number theory'),
  z.literal('combinatorics'),
  z.literal('*special'),
  z.literal('geometry'),
  z.literal('bitmasks'),
  z.literal('two pointers'),
  z.literal('dsu'),
  z.literal('shortest paths'),
  z.literal('probabilities'),
  z.literal('divide and conquer'),
  z.literal('hashing'),
  z.literal('games'),
  z.literal('flows'),
  z.literal('interactive'),
  z.literal('matrices'),
  z.literal('fft'),
  z.literal('ternary search'),
  z.literal('expression parsing'),
  z.literal('meet-in-the-middle'),
  z.literal('2-sat'),
  z.literal('chinese remainder theorem'),
  z.literal('schedules'),
  z.literal('no tags'),
]);
export const tags = [
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
export type Tag = (typeof tags)[number];

export const problemSchema = z.object({
  contestId: z.number().optional(),
  problemsetName: z.string().optional(),
  index: z.string(),
  name: z.string(),
  type: typeSchema,
  points: z.number().optional(),
  rating: z.number().optional(),
  tags: z
    .array(tagSchema)
    .or(z.array(z.string())) // "tags" is sometimes empty array [], how can this situation be handled more elegantly?
    .transform((tags) =>
      tags.length > 0 ? (tags as Tag[]) : (['no tags'] as Tag[])
    ),
  contestName: z.string().optional(), // need to remove optional in the future
  classification: z.optional(classificationSchema), // need to remove optional in the future
  solvedCount: z.number().optional(),
});
export const problemsSchema = z.array(problemSchema);
export type Problem = z.infer<typeof problemSchema>;

export const reshapedProblemSchema = z.object({
  index: z.string(),
  indexedProblems: z.array(problemSchema),
});
export type ReshapedProblem = z.infer<typeof reshapedProblemSchema>;
