/**
 * Auth Me Route Controller Tests
 *
 * Asserts the controller delegates to the use case (passing the request),
 * maps success → 200 / failure → 401, and routes thrown errors to
 * handleApiError. Uses the global next/server mock (no cookies involved).
 */

vi.mock('@apps/auth/domain/use-cases', () => ({
  executeGetCurrentUser: vi.fn(),
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import { executeGetCurrentUser } from '@apps/auth/domain/use-cases';

import { GET } from './route';

const getCurrentUser = vi.mocked(executeGetCurrentUser);

describe('GET /api/auth/me', () => {
  it('returns 200 with the profile and passes the request through', async () => {
    getCurrentUser.mockResolvedValueOnce({
      data: { user: { id: 'user-1' } },
      success: true,
    } as never);

    const request = { marker: 'req' } as never;
    const response = await GET(request);

    expect(getCurrentUser).toHaveBeenCalledWith({ request });
    expect(response.status).toBe(200);
  });

  it('maps an unauthenticated result to 401', async () => {
    getCurrentUser.mockResolvedValueOnce({ success: false } as never);

    const response = await GET({} as never);

    expect(response.status).toBe(401);
  });

  it('routes thrown errors to handleApiError', async () => {
    getCurrentUser.mockRejectedValueOnce(new Error('boom'));

    const response = await GET({} as never);

    expect(response.status).toBe(500);
  });
});
