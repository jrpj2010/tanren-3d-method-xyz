import { PrismaClient } from '@prisma/client';

// PrismaClientのグローバルインスタンス
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 開発環境では複数のインスタンスが作成されることを防ぐ
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
