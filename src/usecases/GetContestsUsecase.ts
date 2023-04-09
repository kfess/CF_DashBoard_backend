import { Contest } from "@/entities/Contest";

export interface GetContestsUsecase {
  getContest(id: number): Promise<Contest | null>;
  getAllContests(): Promise<Contest[]>;
}
