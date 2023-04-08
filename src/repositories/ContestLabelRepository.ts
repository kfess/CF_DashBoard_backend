import { Label } from "@/entities/Label";

export interface ContestLabelRepository {
  findByUserId(userId: string): Promise<Label[]>;
  findByIdAndGithubId(id: number, userId: string): Promise<Label | null>;
  create(label: Label): Promise<Label>;
  update(label: Label): Promise<Label>;
  delete(id: number, userId: string): Promise<void>;
  addContestToLabel(contestId: number, labelId: number): Promise<void>;
  removeContestFromLabel(contestId: number, labelId: number): Promise<void>;
}
