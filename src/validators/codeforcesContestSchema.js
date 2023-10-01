"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestApiResponseSchema = exports.OfficialContestSchema = void 0;
// This schema is offical from Codeforces API
const zod_1 = require("zod");
exports.OfficialContestSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    type: zod_1.z.union([
        zod_1.z.literal('CF'),
        zod_1.z.literal('IOI'),
        zod_1.z.literal('ICPC'),
        zod_1.z.literal('Other'),
    ]),
    phase: zod_1.z.union([
        zod_1.z.literal('BEFORE'),
        zod_1.z.literal('CODING'),
        zod_1.z.literal('PENDING_SYSTEM_TEST'),
        zod_1.z.literal('SYSTEM_TEST'),
        zod_1.z.literal('FINISHED'),
    ]),
    frozen: zod_1.z.boolean(),
    durationSeconds: zod_1.z.number(),
    startTimeSeconds: zod_1.z.number(),
    relativeTimeSeconds: zod_1.z.number().optional(),
    preparedBy: zod_1.z.string().optional(),
    websiteUrl: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    difficulty: zod_1.z.number().optional(),
    kind: zod_1.z
        .union([
        zod_1.z.literal('Official ICPC Contest'),
        zod_1.z.literal('Official School Contest'),
        zod_1.z.literal('Opencup Contest'),
        zod_1.z.literal('School/University/City/Region Championship'),
        zod_1.z.literal('Training Camp Contest'),
        zod_1.z.literal('Official International Personal Contest'),
        zod_1.z.literal('Training Contest'),
        zod_1.z.literal('Unknown'),
    ])
        .optional()
        .default('Unknown'),
    icpcRegion: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    season: zod_1.z.string().optional(),
});
exports.ContestApiResponseSchema = zod_1.z.object({
    status: zod_1.z.literal('OK'),
    result: zod_1.z.array(exports.OfficialContestSchema),
});
