import { Contest } from "@/entities/Contest";

export interface FetchContestUsecase {
  run(): Promise<Contest[]>;
}
