import { User } from "@/entities/User";

export interface UserUseCase {
  findOrCreateByGithubId(
    githubId: number,
    githubUsername: string,
    codeforcesUsername?: string
  ): Promise<User>;

  updateCodeforcesUsername(
    githubId: number,
    codeforcesUsername?: string
  ): Promise<User>;

  delete(githubId: number): Promise<void>;

  exchangeCodeForAccessToken(code: string): Promise<string>;

  createJWT(githubId: number, githubUsername: string): string;

  getGithubUser(accessToken: string): Promise<{ id: number; login: string }>;
}
