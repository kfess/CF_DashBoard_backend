import { CustomContest } from "@/entities/CustomContest";

export interface GetCustomContestUsecase {
  findByContestId(contestId: string): Promise<CustomContest | null>;
  findAll(userId: string | undefined): Promise<CustomContest[]>;
  findMyContests(ownerId: string): Promise<{
    createdContests: CustomContest[];
    participatedContests: CustomContest[];
  }>;
  create(customContest: CustomContest): Promise<CustomContest>;
  update(customContest: CustomContest): Promise<CustomContest>;
  addUserToContest(participant: string, contestId: string): Promise<void>;
  removeUserFromContest(participant: string, contestId: string): Promise<void>;
}
