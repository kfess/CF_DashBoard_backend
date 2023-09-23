import { z } from 'zod';

export const OfficialContestSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.union([
    z.literal('CF'),
    z.literal('IOI'),
    z.literal('ICPC'),
    z.literal('Other'),
  ]),
  phase: z.union([
    z.literal('BEFORE'),
    z.literal('CODING'),
    z.literal('PENDING_SYSTEM_TEST'),
    z.literal('SYSTEM_TEST'),
    z.literal('FINISHED'),
  ]),
  frozen: z.boolean(),
  durationSeconds: z.number(),
  startTimeSeconds: z.number(),
  relativeTimeSeconds: z.number().optional(),
  preparedBy: z.string().optional(),
  websiteUrl: z.string().optional(),
  description: z.string().optional(),
  difficulty: z.number().optional(),
  kind: z
    .union([
      z.literal('Official ICPC Contest'),
      z.literal('Official School Contest'),
      z.literal('Opencup Contest'),
      z.literal('School/University/City/Region Championship'),
      z.literal('Training Camp Contest'),
      z.literal('Official International Personal Contest'),
      z.literal('Training Contest'),
      z.literal('Unknown'),
    ])
    .optional()
    .default('Unknown'),
  icpcRegion: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  season: z.string().optional(),
});

export type OfficialContest = z.infer<typeof OfficialContestSchema>;

export const ContestApiResponseSchema = z.object({
  status: z.literal('OK'),
  result: z.array(OfficialContestSchema),
});
