import { User } from "../entities/User";

export interface UserRepository {
  findByGithubId(githubId: number): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(githubId: number): Promise<void>;
}
