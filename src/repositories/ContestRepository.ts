import { Contest } from "@/entities/Contest";

export interface ContestRepository {
  findById(id: number): Promise<Contest | null>;
  findAll(): Promise<Contest[]>;
  create(contest: Contest): Promise<Contest>;
  update(contest: Contest): Promise<Contest>;
}
