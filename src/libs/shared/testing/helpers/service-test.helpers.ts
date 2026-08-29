/**
 * Service Test Helpers
 *
 * Centralized boilerplate for service layer tests.
 * Eliminates repeated vi.mocked(handleRequest) patterns (~303 occurrences).
 *
 * Usage:
 *   const { mockSuccess, mockError, mockRejection, getLastCall } = setupServiceMock();
 */

import type { Mock } from 'vitest';

import { handleRequest } from '@helpers';

/** Typed mock for handleRequest */
type MockedHandleRequest = Mock<typeof handleRequest>;

/**
 * Creates a pre-configured handleRequest mock interface.
 * Must be called AFTER vi.mock('@helpers/http/handleRequest/handleRequest').
 *
 * @example
 * vi.mock('@helpers/http/handleRequest/handleRequest', () => ({ handleRequest: vi.fn() }));
 * const { mockSuccess, mockError, getLastCall } = setupServiceMock();
 *
 * it('fetches users', async () => {
 *   mockSuccess({ users: [mockUser] });
 *   await UsersService.getAll();
 *   expect(getLastCall().endpoint).toBe('/api/admin/users');
 * });
 */
export const setupServiceMock = () => {
  const mock = vi.mocked(handleRequest) as MockedHandleRequest;

  return {
    expectCalledWith: (endpoint: string, method: string) => {
      expect(mock).toHaveBeenCalledWith(expect.objectContaining({ endpoint, method }));
    },
    getLastCall: () => {
      const { calls } = mock.mock;
      return calls[calls.length - 1]?.[0] as Record<string, unknown> | undefined;
    },
    mock,
    mockError: (error?: string, status = 500) => {
      mock.mockResolvedValueOnce(error ? { error, status, success: false } : { success: false });
    },
    mockRejection: (error: string | Error = 'Error de red') => {
      const err = typeof error === 'string' ? new Error(error) : error;
      mock.mockRejectedValueOnce(err);
    },
    mockSuccess: <T>(data: T, status = 200) => {
      mock.mockResolvedValueOnce({ data, status, success: true });
    },
  };
};

/**
 * Generates standard service error-handling test.
 *
 * @example
 * itHandlesServiceError(
 *   () => UsersService.getAll(),
 *   setupServiceMock
 * );
 */
export const itHandlesServiceError = (
  executeFn: () => Promise<unknown>,
  getMock: () => ReturnType<typeof setupServiceMock>
) => {
  it('throws on API error', async () => {
    getMock().mockError('Error del servidor');
    await expect(executeFn()).rejects.toThrow();
  });
};

/**
 * Generates standard "handles network error" test.
 */
export const itHandlesNetworkError = (
  executeFn: () => Promise<unknown>,
  getMock: () => ReturnType<typeof setupServiceMock>
) => {
  it('throws on network error', async () => {
    getMock().mockRejection('Error de red');
    await expect(executeFn()).rejects.toThrow('Error de red');
  });
};
