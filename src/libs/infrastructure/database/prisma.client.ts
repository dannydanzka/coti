/**
 * Prisma Client Singleton
 *
 * Centralized Prisma client for the entire application.
 * Implements singleton pattern to prevent multiple instances in development.
 * Hot reload safe with global caching.
 *
 * Prisma 7+ Configuration:
 * - Uses adapter pattern for database connections
 * - Migration URLs are configured in prisma/prisma.config.ts
 *
 * Usage:
 * ```typescript
 * import { prisma } from '@libs/infrastructure/database/prisma.client';
 *
 * const user = await prisma.user.findUnique({ where: { id } });
 * ```
 *
 * @see https://pris.ly/d/prisma7-client-config
 */

import { Pool } from 'pg';

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Create Prisma client with PostgreSQL adapter
 * Prisma 7 requires adapter pattern for database connections
 *
 * Configuration for Vercel + Supabase:
 * - Uses pg Pool with SSL for secure connections
 * - Pool settings optimized for serverless (max 1 connection per instance)
 */
const createPrismaClient = (): PrismaClient => {
  const connectionString = process.env['DATABASE_URL'];

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  /**
   * Pool size defaults to 1 (serverless: one connection per instance, pgbouncer
   * pools across instances). A single long-lived server under concurrent load
   * (e.g. parallel E2E against `yarn start`) needs more, or implicit write
   * transactions can't acquire a connection in time ("Unable to start a
   * transaction in the given time"). Override via DB_POOL_MAX in those contexts.
   */
  const poolMax = Number(process.env['DB_POOL_MAX'] ?? '1');

  const pool = new Pool({
    connectionString,
    max: Number.isFinite(poolMax) && poolMax > 0 ? poolMax : 1,
    ssl: process.env['NODE_ENV'] === 'production' ? { rejectUnauthorized: false } : false,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env['NODE_ENV'] === 'development' ? ['error', 'warn'] : ['error'],
  });
};

/**
 * Centralized Prisma client instance
 * - Singleton pattern prevents multiple connections
 * - Development: Enables query logging for debugging
 * - Production: Error logging only for performance
 * - Hot reload safe: Reuses global instance
 * - Prisma 7: Uses PrismaPg adapter
 */
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Graceful shutdown handler
 * Ensures database connections are properly closed
 */
export const disconnectPrisma = async (): Promise<void> => {
  await prisma.$disconnect();
};
