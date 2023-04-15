import { User } from "@/entities/User";

export interface UserUseCase {
  findOrCreateByGithubId(
    githubId: string,
    githubUsername: string,
    codeforcesUsername?: string
  ): Promise<User>;

  updateCodeforcesUsername(
    githubId: string,
    codeforcesUsername?: string
  ): Promise<User>;

  delete(githubId: string): Promise<void>;

  exchangeCodeForAccessToken(code: string, state: string): Promise<string>;
  getGithubUser(accessToken: string): Promise<{ id: string; login: string }>;
}
