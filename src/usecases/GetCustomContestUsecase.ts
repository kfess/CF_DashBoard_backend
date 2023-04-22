import { CustomContest } from "@/entities/CustomContest";

export interface GetCustomContestUsecase {
  getByContestId(contestId: string): Promise<CustomContest | null>;
  getAll(): Promise<CustomContest[]>;
  getByOwnerId(ownerId: string): Promise<CustomContest[]>;
  create(customContest: CustomContest): Promise<CustomContest>;
  update(customContest: CustomContest): Promise<CustomContest>;
  addUserToContest(participant: string, contestId: string): Promise<void>;
  removeUserFromContest(participant: string, contestId: string): Promise<void>;
}
