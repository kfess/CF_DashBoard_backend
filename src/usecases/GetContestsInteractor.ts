import { Contest } from '../entities/Contest';
import { ContestRepository } from '../repositories/ContestRepository';
import { GetContestsUsecase } from '../usecases/GetContestsUsecase';

export class GetContestsInteractor implements GetContestsUsecase {
  private contestRepository;

  constructor(contestRepository: ContestRepository) {
    this.contestRepository = contestRepository;
  }

  async getContest(id: number): Promise<Contest | null> {
    return await this.contestRepository.findById(id);
  }

  async getAllContests(): Promise<Contest[]> {
    return await this.contestRepository.findAll();
  }
}
