import { User } from "@/entities/User";

export interface Userrepository {
  findById(id: number): Promise<User | null>;
  findByGithubId(githubId: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
