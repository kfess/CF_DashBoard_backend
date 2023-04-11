import { Problem } from "@/entities/Problem";

export interface GetProblemsUsecase {
  /**
   * Gets a problem object from the backend database
   * @param {number} contestId - The ID of the contest to find.
   * @param {number} index - The problem index.
   * @returns {Promise<Problem | null>} A promise that resolves to a problem object or null
   */
  getProblem(contestId: number, index: string): Promise<Problem | null>;

  /**
   * Gets a list of problems from the backend database
   * @returns {Promise<Problem[]>} A promise that resolves to an array of problem objects
   */
  getAllProblems(): Promise<Problem[]>;
}
