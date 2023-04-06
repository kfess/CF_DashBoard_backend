import { Label } from "@/entities/Label";

export interface ProblemLabelRepository {
  findById(id: number): Promise<Label | null>;
  findAll(): Promise<Label[]>;
  findByOwnerId(ownerId: string): Promise<Label[]>;
  create(label: Label): Promise<Label>;
  update(label: Label): Promise<Label>;
  delete(id: number): Promise<void>;
  addProblemToLabel(problemId: number, labelId: number): Promise<void>;
  removeProblemFromLabel(problemId: number, labelId: number): Promise<void>;
}
