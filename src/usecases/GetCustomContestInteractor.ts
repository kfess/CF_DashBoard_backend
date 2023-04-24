import { CustomContest } from "@/entities/CustomContest";
import { CustomContestRepository } from "@/repositories/CustomContestRepository";
import { GetCustomContestUsecase } from "@/usecases/GetCustomContestUsecase";

export class GetCustomContestInteractor implements GetCustomContestUsecase {
  private readonly customContestRepository: CustomContestRepository;

  constructor(customContestRepository: CustomContestRepository) {
    this.customContestRepository = customContestRepository;
  }

  async findByContestId(contestId: string): Promise<CustomContest | null> {
    return this.customContestRepository.findByContestId(contestId);
  }

  async findAll(userId: string | undefined): Promise<CustomContest[]> {
    return this.customContestRepository.findAll(userId);
  }

  async findMyContests(ownerId: string): Promise<{
    createdContests: CustomContest[];
    participatedContests: CustomContest[];
  }> {
    const createdContests =
      await this.customContestRepository.findCreatedContests(ownerId);
    const participatedContests =
      await this.customContestRepository.findParticipatedContests(ownerId);
    return { createdContests, participatedContests };
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
