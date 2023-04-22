import { CustomContest } from "@/entities/CustomContest";
import { CustomContestRepository } from "@/repositories/CustomContestRepository";
import { GetCustomContestUsecase } from "@/usecases/GetCustomContestUsecase";

export class GetCustomContestInteractor implements GetCustomContestUsecase {
  private readonly customContestRepository: CustomContestRepository;

  constructor(customContestRepository: CustomContestRepository) {
    this.customContestRepository = customContestRepository;
  }

  async getByContestId(contestId: string): Promise<CustomContest | null> {
    return this.customContestRepository.findByContestId(contestId);
  }

  async getAll(): Promise<CustomContest[]> {
    return this.customContestRepository.findAll();
  }

  async getByOwnerId(ownerId: string): Promise<CustomContest[]> {
    return this.customContestRepository.findByOwnerId(ownerId);
  }

  async create(customContest: CustomContest): Promise<CustomContest> {
    return this.customContestRepository.create(customContest);
  }

  async update(customContest: CustomContest): Promise<CustomContest> {
    return this.customContestRepository.update(customContest);
  }

  async addUserToContest(
    participant: string,
    contestId: string
  ): Promise<void> {
    return this.customContestRepository.addUserToContest(
      participant,
      contestId
    );
  }

  async removeUserFromContest(
    participant: string,
    contestId: string
  ): Promise<void> {
    return this.customContestRepository.removeUserFromContest(
      participant,
      contestId
    );
  }
}
