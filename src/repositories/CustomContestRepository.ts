import { CustomContest } from "@/entities/CustomContest";

export interface CustomContestRepository {
  findById(id: number): Promise<CustomContest | null>;
  findAll(): Promise<CustomContest[]>;
  findByOwnerId(): Promise<CustomContest[]>;
  create(customContest: CustomContest): Promise<CustomContest>;
  update(customContest: CustomContest): Promise<CustomContest>;
  addUserToContest(participant: string, contestId: string): Promise<void>;
  removeUserFromContest(participant: string, contestId: string): Promise<void>;
}
