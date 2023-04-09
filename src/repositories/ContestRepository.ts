import { Contest } from "@/entities/Contest";
import { Problem } from "@/entities/Problem";

export interface ContestRepository {
  findById(id: number): Promise<Contest | null>;
  findAll(): Promise<Contest[]>;
  create(contest: Contest): Promise<Contest>;
  update(contest: Contest): Promise<Contest>;
  updateProblem(contestId: number, problem: Problem): Promise<Problem>;
}
