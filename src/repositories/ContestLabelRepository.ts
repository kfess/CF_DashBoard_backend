import { Label } from "@/entities/Label";

export interface ContestLabelRepository {
  findById(id: number): Promise<Label | null>;
  findAll(): Promise<Label[]>;
  findByOwnerId(ownerId: string): Promise<Label[]>;
  create(label: Label): Promise<Label>;
  update(label: Label): Promise<Label>;
  delete(id: number): Promise<void>;
  addContestToLabel(contestId: number, labelId: number): Promise<void>;
  removeContestFromLabel(contestId: number, labelId: number): Promise<void>;
}
