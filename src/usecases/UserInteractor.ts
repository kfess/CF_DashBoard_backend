import { User } from "@/entities/User";
import { UserRepository } from "@/repositories/UserRepository";
import { UserUseCase } from "@/usecases/UserUsecase";

//interactor for userusecase
export class UserInteractor implements UserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findOrCreateByGithubId(
    githubId: string,
    githubUsername: string,
    codeforcesUsername?: string
  ): Promise<User> {
    let user = await this.userRepository.findByGithubId(githubId);

    if (!user) {
      user = new User(githubId, githubUsername, codeforcesUsername);
      user = await this.userRepository.create(user);
    }

    return user;
  }

  async updateCodeforcesUsername(
    githubId: string,
    codeforcesUsername?: string
  ): Promise<User> {}

  async delete(githubId: string): Promise<void> {}

  async exchangeCodeForAccessToken(
    code: string,
    state: string
  ): Promise<string> {}

  async getGithubUser(
    accessToken: string
  ): Promise<{ id: string; login: string }> {}
}
