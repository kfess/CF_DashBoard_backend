import { z } from 'zod';

export const TagSchema = z.union([
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

const OfficialProblemSchema = z.object({
  contestId: z.number(),
  problemsetName: z.string().optional(),
  index: z.string(),
  name: z.string(),
  type: z.union([z.literal('PROGRAMMING'), z.literal('QUESTION')]),
  points: z.number().optional(),
  rating: z.number().optional(),
  tags: z
    .array(TagSchema)
    .or(z.array(z.string())) // "tags" is sometimes empty array [], how can this situation be handled more elegantly?
    .transform((val) =>
      val.length > 0 ? (val as Tag[]) : (['no tags'] as const)
    ),
});

export type OfficialProblem = z.infer<typeof OfficialProblemSchema>;

const OfficialProblemStatisticsSchema = z.object({
  contestId: z.number(),
  index: z.string(),
  solvedCount: z.number(),
});

export type OfficialStatisticsProblem = z.infer<
  typeof OfficialProblemStatisticsSchema
>;

export const ProblemApiResponseSchema = z.object({
  status: z.literal('OK'),
  result: z.object({
    problems: z.array(OfficialProblemSchema),
    problemStatistics: z.array(OfficialProblemStatisticsSchema),
  }),
});
