import { Prisma, PrismaClient, User as PrismaUser } from "@prisma/client";
import { UserRepository } from "../UserRepository";
import { User } from "../../entities/User";

export class PrismaUserRepository implements UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByGithubId(githubId: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { githubId: githubId },
    });
    return user ? this.toEntity(user) : null;
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: this.fromEntity(user),
    });
    return this.toEntity(createdUser);
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { githubId: user.githubId },
      data: this.fromEntity(user),
    });
    return this.toEntity(updatedUser);
  }

  async delete(githubId: number): Promise<void> {
    await this.prisma.user.delete({ where: { githubId: githubId } });
  }

  private toEntity(user: PrismaUser): User {
    return new User(
      user.githubId,
      user.githubUsername,
      user.codeforcesUsername ?? undefined
    );
  }

  private fromEntity(user: User): Prisma.UserCreateInput {
    return {
      githubId: user.githubId,
      githubUsername: user.githubUsername,
      codeforcesUsername: user.codeforcesUsername ?? null,
    };
  }
}
