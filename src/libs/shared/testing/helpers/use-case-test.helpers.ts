/**
 * Use Case Test Helpers
 *
 * Centralized boilerplate for admin/public use case tests.
 * Eliminates ~20 lines of repeated setup per test file.
 *
 * NOTE: validateAndGetUser is already mocked globally in vitest.setup.ts.
 * Tests do NOT need their own vi.mock('@helpers/use-case/authorization/authorization').
 * Just import { mockAuthSuccess } and call it in beforeEach.
 */

import type { Mock } from 'vitest';
import type { NextRequest } from 'next/server';

import { validateAndGetUser } from '@helpers';

/** ── Stable Constants ── */

/** Reusable mock request — avoids `const mockRequest = {} as NextRequest` in every file */
export const MOCK_REQUEST = {} as NextRequest;

/** Default admin user (Spanish locale) */
export const MOCK_ADMIN = {
  email: 'admin@coti.mx',
  firstName: 'José',
  id: 'admin-1',
  lastName: 'López',
  role: 'admin' as const,
};

/** Default owner user (Spanish locale) */
export const MOCK_OWNER = {
  email: 'owner@coti.mx',
  firstName: 'María',
  id: 'owner-1',
  lastName: 'García',
  role: 'owner' as const,
};

/** Default participant user (Spanish locale) */
export const MOCK_PARTICIPANT = {
  email: 'participante@coti.mx',
  firstName: 'Carlos',
  id: 'participant-1',
  lastName: 'Martínez',
  role: 'participant' as const,
};

/** ── Auth Mock Helpers ── */

/** Configure validateAndGetUser to return success. Defaults to MOCK_ADMIN. */
export const mockAuthSuccess = (user: Record<string, unknown> = MOCK_ADMIN) => {
  (validateAndGetUser as Mock).mockResolvedValue({ success: true, user });
};

/** Configure validateAndGetUser to return auth failure. */
export const mockAuthFailure = (error = 'No autorizado', status = 401) => {
  (validateAndGetUser as Mock).mockResolvedValue({
    error: { error, status, success: false },
    success: false,
  });
};

/** ── Result Assertion Helpers ── */

interface UseCaseResult {
  data?: unknown;
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
  success: boolean;
}

/** Assert use case returned success. Returns typed result for chaining. */
export const expectSuccess = <T extends UseCaseResult>(result: T) => {
  expect(result.success).toBe(true);
  return result as T & { success: true };
};

/**
 * Assert use case returned success and extract data.
 * Eliminates the `if (r.success)` guard pattern.
 *
 * @example
 * const data = expectSuccessData(await executeGetBook({ id: 'book-1', request: MOCK_REQUEST }));
 * expect(data.book.title).toBe('Mi Libro');
 */

export const expectSuccessData = <D = any>(result: UseCaseResult): D => {
  expect(result.success).toBe(true);
  expect(result.data).toBeDefined();
  return result.data as D;
};

/**
 * Assert use case returned failure. Optional second arg asserts a fragment:
 *   - Fragment starting with `errors.` is matched against `result.i18n.key`.
 *   - Any other fragment is matched against `result.error` when present
 *     (legacy ES string path). Silently accepted for migrated UCs that only
 *     expose `i18n.key` — those call sites should migrate to an `errors.xxx`
 *     fragment for strict assertions.
 */
export const expectFailure = <T extends UseCaseResult>(result: T, errorContains?: string) => {
  expect(result.success).toBe(false);
  if (errorContains) {
    if (errorContains.startsWith('errors.')) {
      expect(result.i18n?.key ?? '').toContain(errorContains);
    } else if (result.error) {
      expect(result.error).toContain(errorContains);
    }
  }
  return result as T & { success: false };
};

/** ── Test Generators (call inside describe blocks) ── */

/** Generates standard "rejects unauthorized user" test */
export const itRejectsUnauthorized = <P>(
  executeFn: (params: P) => Promise<UseCaseResult>,
  params: P
) => {
  it('rejects unauthorized user', async () => {
    mockAuthFailure();
    expectFailure(await executeFn(params));
  });
};

/** Generates standard "handles repository errors" test */
export const itHandlesRepoError = <P>(
  executeFn: (params: P) => Promise<UseCaseResult>,
  params: P,
  mockMethod: Mock
) => {
  it('handles repository errors', async () => {
    mockMethod.mockRejectedValue(new Error('Database error'));
    expectFailure(await executeFn(params));
  });
};

/** Generates standard "returns error when not found" test */
export const itRejectsNotFound = <P>(
  executeFn: (params: P) => Promise<UseCaseResult>,
  params: P,
  mockFindById: Mock
) => {
  it('returns error when not found', async () => {
    mockFindById.mockResolvedValue(null);
    expectFailure(await executeFn(params), 'no encontrad');
  });
};

/** Generates standard "rejects missing id" test */
export const itRejectsMissingId = <P extends { id: string }>(
  executeFn: (params: P) => Promise<UseCaseResult>,
  params: P
) => {
  it('rejects missing id', async () => {
    expectFailure(await executeFn({ ...params, id: '' }));
  });
};

/**
 * Generates ALL standard error-handling tests in one call.
 * Combines auth rejection + repo error (+ optional not-found and missing-id).
 *
 * @example
 * // Simple (auth + repo error):
 * itHandlesStandardCases(executeCountBooks, { request: MOCK_REQUEST }, mockRepo.count);
 *
 * // With not-found:
 * itHandlesStandardCases(executeGetBookById, { id: 'b-1', request: MOCK_REQUEST }, mockRepo.findById, {
 *   findByIdMock: mockRepo.findById,
 *   notFoundError: 'no encontrad',
 * });
 *
 * // With missing-id:
 * itHandlesStandardCases(executeDeleteBook, { id: 'b-1', request: MOCK_REQUEST }, mockRepo.delete, {
 *   checkMissingId: true,
 * });
 */
export const itHandlesStandardCases = <P>(
  executeFn: (params: P) => Promise<UseCaseResult>,
  params: P,
  repoMock: Mock,
  options?: {
    checkMissingId?: boolean;
    findByIdMock?: Mock;
    notFoundError?: string;
  }
) => {
  itRejectsUnauthorized(executeFn, params);
  itHandlesRepoError(executeFn, params, repoMock);

  if (options?.findByIdMock) {
    itRejectsNotFound(executeFn, params, options.findByIdMock);
  }

  if (options?.checkMissingId && 'id' in (params as Record<string, unknown>)) {
    itRejectsMissingId(
      executeFn as (p: P & { id: string }) => Promise<UseCaseResult>,
      params as P & { id: string }
    );
  }
};
