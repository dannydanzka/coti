/**
 * Auth Login Route Controller Tests
 *
 * Asserts real Zod body validation (invalid body → 400, no delegation), the
 * mapped credentials reaching the use case, status mapping (success → 200 /
 * failure → 401), the httpOnly `auth-token` cookie set on a successful login
 * that returns a token, and body-read errors → handleApiError.
 *
 * `next/server` is locally mocked (the global mock has no `response.cookies`)
 * — allowed: it is NOT in the redundant-global-mock allowlist. `withRateLimit`
 * is stubbed to a passthrough so the handler logic is under test. The handler's
 * static return type is `Response` (no `.cookies`), so responses are cast to a
 * cookie-aware shape for the cookie assertions.
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
  executeLogin: vi.fn(),
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

vi.mock('@middleware', () => ({
  withRateLimit: (handler: unknown) => handler,
}));

import { executeLogin } from '@apps/auth/domain/use-cases';

import { POST } from './route';

const login = vi.mocked(executeLogin);

interface CookieResponse {
  cookies: { set: ReturnType<typeof vi.fn> };
  status: number;
}

const requestWith = (body: unknown) => ({ json: () => Promise.resolve(body) }) as never;

const callLogin = async (body: unknown): Promise<CookieResponse> =>
  (await POST(requestWith(body), {})) as unknown as CookieResponse;

const validBody = { email: 'maria.garcia@test.com', password: 'TestAdmin123!' };

describe('POST /api/auth/login', () => {
  it('sets the httpOnly auth-token cookie and returns 200 on a successful login', async () => {
    login.mockResolvedValueOnce({ data: { token: 'jwt-token' }, success: true } as never);

    const response = await callLogin(validBody);

    expect(login).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'maria.garcia@test.com', password: 'TestAdmin123!' })
    );
    expect(response.status).toBe(200);
    expect(response.cookies.set).toHaveBeenCalledWith(
      'auth-token',
      'jwt-token',
      expect.objectContaining({ httpOnly: true, path: '/', sameSite: 'lax' })
    );
  });

  it('does not set a cookie when the login succeeds without a token', async () => {
    login.mockResolvedValueOnce({ data: {}, success: true } as never);

    const response = await callLogin(validBody);

    expect(response.status).toBe(200);
    expect(response.cookies.set).not.toHaveBeenCalled();
  });

  it('maps invalid credentials to 401 and sets no cookie', async () => {
    login.mockResolvedValueOnce({ success: false } as never);

    const response = await callLogin(validBody);

    expect(response.status).toBe(401);
    expect(response.cookies.set).not.toHaveBeenCalled();
  });

  it('rejects an invalid body with 400 before delegating (real Zod validation)', async () => {
    const response = await callLogin({ email: 'not-an-email', password: '' });

    expect(response.status).toBe(400);
    expect(login).not.toHaveBeenCalled();
  });

  it('routes a body-read error to handleApiError', async () => {
    const response = (await POST(
      { json: () => Promise.reject(new Error('bad json')) } as never,
      {}
    )) as unknown as CookieResponse;

    expect(response.status).toBe(500);
  });
});
