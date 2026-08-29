/**
 * Auth Logout Route Controller Tests
 *
 * Asserts the controller delegates to the use case, ALWAYS clears the
 * `auth-token` cookie (expired epoch, httpOnly), maps success → 200 / failure →
 * 400, and routes thrown errors to handleApiError.
 *
 * `next/server` is locally mocked (the global mock has no `response.cookies`)
 * — allowed: it is NOT in the redundant-global-mock allowlist.
 */

vi.mock('next/server', () => ({
  NextRequest: class {},
  NextResponse: {
    json: vi.fn((data, options) => ({
      cookies: { set: vi.fn() },
      json: () => Promise.resolve(data),
      status: options?.status ?? 200,
    })),
  },
}));

vi.mock('@apps/auth/domain/use-cases', () => ({
  executeLogout: vi.fn(),
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import { executeLogout } from '@apps/auth/domain/use-cases';

import { POST } from './route';

const logout = vi.mocked(executeLogout);

describe('POST /api/auth/logout', () => {
  it('returns 200 and clears the auth-token cookie on success', async () => {
    logout.mockResolvedValueOnce({ success: true } as never);

    const response = await POST({} as never);

    expect(logout).toHaveBeenCalledWith({ request: {} });
    expect(response.status).toBe(200);
    expect(response.cookies.set).toHaveBeenCalledWith(
      'auth-token',
      '',
      expect.objectContaining({ expires: expect.any(Date), httpOnly: true, path: '/' })
    );
  });

  it('still clears the cookie and maps a use-case failure to 400', async () => {
    logout.mockResolvedValueOnce({ success: false } as never);

    const response = await POST({} as never);

    expect(response.status).toBe(400);
    expect(response.cookies.set).toHaveBeenCalledWith('auth-token', '', expect.any(Object));
  });

  it('routes thrown errors to handleApiError', async () => {
    logout.mockRejectedValueOnce(new Error('boom'));

    const response = await POST({} as never);

    expect(response.status).toBe(500);
  });
});
