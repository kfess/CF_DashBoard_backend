import { Problem } from "../entities/Problem";

export interface ProblemRepository {
  findById(contestId: number, index: string): Promise<Problem | null>;
  findAll(): Promise<Problem[]>;
  create(problem: Problem): Promise<Problem>;
  update(problem: Problem): Promise<Problem>;
}
