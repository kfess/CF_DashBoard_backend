import { CustomContest } from "@/entities/CustomContest";

export interface CustomContestRepository {
  findByContestId(contestId: string): Promise<CustomContest | null>;
  findAll(): Promise<CustomContest[]>;
  findByOwnerId(ownerId: string): Promise<CustomContest[]>;
  create(customContest: CustomContest): Promise<CustomContest>;
  update(customContest: CustomContest): Promise<CustomContest>;
  addUserToContest(participant: string, contestId: string): Promise<void>;
  removeUserFromContest(participant: string, contestId: string): Promise<void>;
}
