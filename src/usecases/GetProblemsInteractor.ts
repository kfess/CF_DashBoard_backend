import { Problem } from '../entities/Problem';
import { ProblemRepository } from '../repositories/ProblemRepository';
import { GetProblemsUsecase } from './GetProblemsUsecase';

export class GetProblemsInteractor implements GetProblemsUsecase {
  private problemRepository;

  constructor(problemRepository: ProblemRepository) {
    this.problemRepository = problemRepository;
  }

  async getProblem(contestId: number, index: string): Promise<Problem | null> {
    return await this.problemRepository.findById(contestId, index);
  }

  async getAllProblems(): Promise<Problem[]> {
    return await this.problemRepository.findAll();
  }
}
