/**
 * Mock for @prisma/client package
 * Prevents Prisma installation requirement in development/testing
 *
 * @module Prisma Client Mock
 */

const mockFn = () => {
  const fn = () => Promise.resolve(undefined);
  fn.mockResolvedValue = () => fn;
  fn.mockImplementation = (impl) => impl;
  return fn;
};

const mockPrismaClient = {
  $connect: mockFn(),
  $disconnect: mockFn(),
  $executeRaw: mockFn(),
  $queryRaw: mockFn(),
  $transaction: (callback) => callback(mockPrismaClient),
};

const PrismaClientConstructor = () => mockPrismaClient;

module.exports = {
  PrismaClient: PrismaClientConstructor,
};
