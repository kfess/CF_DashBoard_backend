import { PrismaClient } from "@prisma/client";

export class PrismaSingleton {
  private static prismaInstance: PrismaClient | null;

  static getInstance(): PrismaClient {
    if (!this.prismaInstance) {
      return new PrismaClient();
    }
    return this.prismaInstance;
  }
}
