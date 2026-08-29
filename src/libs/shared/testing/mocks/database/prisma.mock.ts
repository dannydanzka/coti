/**
 * Prisma Client Mock
 *
 * Mock implementation of Prisma client for testing.
 * Used by repository tests that have been migrated to Prisma.
 *
 * Usage in tests:
 * ```typescript
 * vi.mock('@database', () => require('@mocks/database/prisma.mock'));
 * ```
 */

import type { Mock } from 'vitest';
import { vi } from 'vitest';

interface MockPrismaModel {
  count: Mock;
  create: Mock;
  delete: Mock;
  deleteMany: Mock;
  findFirst: Mock;
  findMany: Mock;
  findUnique: Mock;
  groupBy: Mock;
  update: Mock;
  updateMany: Mock;
  upsert: Mock;
}

const createMockModel = (): MockPrismaModel => ({
  count: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
  deleteMany: vi.fn(),
  findFirst: vi.fn(),
  findMany: vi.fn(),
  findUnique: vi.fn(),
  groupBy: vi.fn().mockResolvedValue([]),
  update: vi.fn(),
  updateMany: vi.fn(),
  upsert: vi.fn(),
});

export const prismaMock = {
  $connect: vi.fn(),
  $disconnect: vi.fn(),
  $transaction: vi.fn((operations: unknown[]) => Promise.all(operations)),
  challenge: createMockModel(),
  companion: createMockModel(),
  companionEnrollment: createMockModel(),
  contactMessage: createMockModel(),
  enrollment: createMockModel(),
  event: createMockModel(),
  eventKit: createMockModel(),
  evidence: createMockModel(),
  evidenceAttempt: createMockModel(),
  faq: createMockModel(),
  galleryImage: createMockModel(),
  kit: createMockModel(),
  notification: createMockModel(),
  passwordResetToken: createMockModel(),
  payment: createMockModel(),
  settings: createMockModel(),
  storySection: createMockModel(),
  user: createMockModel(),
  userChallenge: createMockModel(),
};

export const prisma = prismaMock;

export const disconnectPrisma = vi.fn();

/**
 * Reset all mocks - call in beforeEach
 */
