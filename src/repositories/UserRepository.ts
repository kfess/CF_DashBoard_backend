import { User } from "@/entities/User";

export interface UserRepository {
  findByGithubId(githubId: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(githubId: string): Promise<void>;
}
