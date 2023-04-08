import { Problem } from "@/entities/Problem";

export interface ProblemInterface {
  // findById(): Promise<Problem | null>;
  findAll(): Promise<Problem[]>;
  create(problem: Problem): Promise<Problem>;
  update(problem: Problem): Promise<Problem>;
}
