import { Contest } from "@/entities/Contest";

export interface GetContestsUsecase {
  /**
   * Gets a contest object from the backend database
   * @param {number} id - The ID of the contest to find.
   * @returns {Promise<Contest | null>} A promise that resolves to a contest object or null
   */
  getContest(id: number): Promise<Contest | null>;

  /**
   * Gets a list of contests from the backend database
   * @returns {Promise<Contest[]>} A promise that resolves to an array of contest objects
   */
  getAllContests(): Promise<Contest[]>;
}
