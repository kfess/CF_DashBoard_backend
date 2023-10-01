"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemApiResponseSchema = exports.tags = exports.TagSchema = void 0;
// This schema is offical from Codeforces API
const zod_1 = require("zod");
exports.TagSchema = zod_1.z.union([
    zod_1.z.literal('implementation'),
    zod_1.z.literal('math'),
    zod_1.z.literal('greedy'),
    zod_1.z.literal('dp'),
    zod_1.z.literal('data structures'),
    zod_1.z.literal('brute force'),
    zod_1.z.literal('constructive algorithms'),
    zod_1.z.literal('graphs'),
    zod_1.z.literal('sortings'),
    zod_1.z.literal('binary search'),
    zod_1.z.literal('dfs and similar'),
    zod_1.z.literal('trees'),
    zod_1.z.literal('strings'),
    zod_1.z.literal('number theory'),
    zod_1.z.literal('combinatorics'),
    zod_1.z.literal('*special'),
    zod_1.z.literal('geometry'),
    zod_1.z.literal('bitmasks'),
    zod_1.z.literal('two pointers'),
    zod_1.z.literal('dsu'),
    zod_1.z.literal('shortest paths'),
    zod_1.z.literal('probabilities'),
    zod_1.z.literal('divide and conquer'),
    zod_1.z.literal('hashing'),
    zod_1.z.literal('games'),
    zod_1.z.literal('flows'),
    zod_1.z.literal('interactive'),
    zod_1.z.literal('matrices'),
    zod_1.z.literal('fft'),
    zod_1.z.literal('ternary search'),
    zod_1.z.literal('expression parsing'),
    zod_1.z.literal('meet-in-the-middle'),
    zod_1.z.literal('2-sat'),
    zod_1.z.literal('chinese remainder theorem'),
    zod_1.z.literal('schedules'),
    zod_1.z.literal('no tags'),
]);
exports.tags = [
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
];
const OfficialProblemSchema = zod_1.z.object({
    contestId: zod_1.z.number(),
    problemsetName: zod_1.z.string().optional(),
    index: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.union([zod_1.z.literal('PROGRAMMING'), zod_1.z.literal('QUESTION')]),
    points: zod_1.z.number().optional(),
    rating: zod_1.z.number().optional(),
    tags: zod_1.z
        .array(exports.TagSchema)
        .or(zod_1.z.array(zod_1.z.string())) // "tags" is sometimes empty array [], how can this situation be handled more elegantly?
        .transform((val) => val.length > 0 ? val : ['no tags']),
});
const OfficialProblemStatisticsSchema = zod_1.z.object({
    contestId: zod_1.z.number(),
    index: zod_1.z.string(),
    solvedCount: zod_1.z.number(),
});
exports.ProblemApiResponseSchema = zod_1.z.object({
    status: zod_1.z.literal('OK'),
    result: zod_1.z.object({
        problems: zod_1.z.array(OfficialProblemSchema),
        problemStatistics: zod_1.z.array(OfficialProblemStatisticsSchema),
    }),
});
