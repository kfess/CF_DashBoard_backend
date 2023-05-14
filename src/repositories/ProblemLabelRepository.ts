import { Label } from '../entities/Label';

export interface ProblemLabelRepository {
  findByUserId(userId: string): Promise<Label[]>;
  findByIdAndGithubId(id: number, userId: string): Promise<Label | null>;
  create(label: Label): Promise<Label>;
  update(label: Label): Promise<Label>;
  delete(id: number, userId: string): Promise<void>;
  addProblemToLabel(problemId: number, labelId: number, userId: string): Promise<void>;
  removeProblemFromLabel(problemId: number, labelId: number, userId: string): Promise<void>;
}
