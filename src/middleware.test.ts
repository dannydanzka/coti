/**
 * Next.js Route Protection Middleware Tests
 *
 * Tests for authentication, authorization, and route protection.
 */

const mockCookiesSet = vi.fn();

vi.mock('next/server', () => {
  const createMockResponse = (status: number, extra: Record<string, unknown> = {}) => ({
    cookies: { set: mockCookiesSet },
    headers: new Headers(extra['location'] ? { location: extra['location'] as string } : {}),
    json: vi.fn().mockResolvedValue(extra['body'] ?? {}),
    status,
    ...extra,
  });

  return {
    NextRequest: vi.fn(),
    NextResponse: {
      json: vi.fn((data: unknown, options?: { status?: number }) =>
        createMockResponse(options?.status ?? 200, {
          body: data,
          json: vi.fn().mockResolvedValue(data),
        })
      ),
      next: vi.fn(() => createMockResponse(200)),
      redirect: vi.fn((url: URL) => createMockResponse(307, { location: url.toString() })),
    },
  };
});

vi.mock('jose', () => ({
  jwtVerify: vi.fn(),
}));

import { jwtVerify } from 'jose';

import { middleware } from './middleware';

const createMockRequest = (
  pathname: string,
  options: { cookie?: string; authHeader?: string } = {}
) => {
  const url = `http://localhost:3000${pathname}`;
  const headers = new Headers();
  if (options.authHeader) {
    headers.set('authorization', options.authHeader);
  }

  return {
    cookies: {
      get: vi.fn((name: string) =>
        name === 'auth-token' && options.cookie ? { value: options.cookie } : undefined
      ),
    },
    headers,
    nextUrl: { pathname },
    url,
  } as never;
};

describe('middleware', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, JWT_SECRET: 'test-secret-key-123' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('Public routes', () => {
    it('allows access to public pages without auth', async () => {
      const response = await middleware(createMockRequest('/nosotros'));
      expect(response.status).toBe(200);
    });

    it('allows access to home page', async () => {
      const response = await middleware(createMockRequest('/'));
      expect(response.status).toBe(200);
    });

    it('allows non-matched routes to pass through', async () => {
      const response = await middleware(createMockRequest('/some-other-page'));
      expect(response.status).toBe(200);
    });
  });

  describe('Auth pages redirect for authenticated users', () => {
    it('redirects authenticated admin from /login to /admin', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'admin', userId: 'u1' },
      } as never);

      const response = await middleware(createMockRequest('/login', { cookie: 'valid-token' }));
      expect(response.status).toBe(307);
    });

    it('redirects authenticated participant from /login to /dashboard', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'participant', userId: 'u1' },
      } as never);

      const response = await middleware(createMockRequest('/login', { cookie: 'valid-token' }));
      expect(response.status).toBe(307);
    });

    it('allows unauthenticated users to access /login', async () => {
      const response = await middleware(createMockRequest('/login'));
      expect(response.status).toBe(200);
    });

    it('clears cookie when JWT_SECRET missing on auth page', async () => {
      delete process.env['JWT_SECRET'];
      const response = await middleware(createMockRequest('/login', { cookie: 'some-token' }));
      expect(response.status).toBe(200);
      expect(mockCookiesSet).toHaveBeenCalled();
    });

    it('clears cookie when token is invalid on auth page', async () => {
      vi.mocked(jwtVerify).mockRejectedValueOnce(new Error('Invalid token'));
      const response = await middleware(createMockRequest('/login', { cookie: 'bad-token' }));
      expect(response.status).toBe(200);
      expect(mockCookiesSet).toHaveBeenCalled();
    });
  });

  describe('Admin route protection', () => {
    it('redirects to admin login without token', async () => {
      const response = await middleware(createMockRequest('/admin'));
      expect(response.status).toBe(307);
    });

    it('returns 401 JSON for admin API without token', async () => {
      const response = await middleware(createMockRequest('/api/admin/users'));
      expect(response.status).toBe(401);
    });

    it('allows admin with valid token and role', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'admin', userId: 'u1' },
      } as never);

      const response = await middleware(createMockRequest('/admin', { cookie: 'valid-token' }));
      expect(response.status).toBe(200);
    });

    it('returns 403 for participant trying admin API', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'participant', userId: 'u1' },
      } as never);

      const response = await middleware(
        createMockRequest('/api/admin/users', { cookie: 'valid-token' })
      );
      expect(response.status).toBe(403);
    });

    it('redirects participant from admin page to login', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'participant', userId: 'u1' },
      } as never);

      const response = await middleware(createMockRequest('/admin', { cookie: 'valid-token' }));
      expect(response.status).toBe(307);
    });

    it('returns 401 for expired token on admin API', async () => {
      vi.mocked(jwtVerify).mockRejectedValueOnce(new Error('Token expired'));

      const response = await middleware(
        createMockRequest('/api/admin/users', { cookie: 'expired-token' })
      );
      expect(response.status).toBe(401);
    });

    it('redirects to admin login for expired token on admin page', async () => {
      vi.mocked(jwtVerify).mockRejectedValueOnce(new Error('Token expired'));

      const response = await middleware(createMockRequest('/admin', { cookie: 'expired-token' }));
      expect(response.status).toBe(307);
    });

    it('handles missing JWT_SECRET for admin API', async () => {
      delete process.env['JWT_SECRET'];
      const response = await middleware(createMockRequest('/api/admin/users', { cookie: 'token' }));
      expect(response.status).toBe(401);
    });

    it('handles missing JWT_SECRET for admin page', async () => {
      delete process.env['JWT_SECRET'];
      const response = await middleware(createMockRequest('/admin', { cookie: 'token' }));
      expect(response.status).toBe(307);
    });

    it('allows owner role to access admin', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'owner', userId: 'u1' },
      } as never);

      const response = await middleware(createMockRequest('/admin', { cookie: 'valid-token' }));
      expect(response.status).toBe(200);
    });
  });

  describe('Authenticated route protection', () => {
    it('redirects to login without token on /dashboard', async () => {
      const response = await middleware(createMockRequest('/dashboard'));
      expect(response.status).toBe(307);
    });

    it('returns 401 for API evidence without token', async () => {
      const response = await middleware(createMockRequest('/api/public/evidence/upload'));
      expect(response.status).toBe(401);
    });

    it('allows authenticated user to access /dashboard', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'participant', userId: 'u1' },
      } as never);

      const response = await middleware(createMockRequest('/dashboard', { cookie: 'valid-token' }));
      expect(response.status).toBe(200);
    });

    it('protects /payment routes', async () => {
      const response = await middleware(createMockRequest('/payment/checkout'));
      expect(response.status).toBe(307);
    });

    it('returns 401 for expired token on dashboard API', async () => {
      vi.mocked(jwtVerify).mockRejectedValueOnce(new Error('Token expired'));

      const response = await middleware(
        createMockRequest('/dashboard', { cookie: 'expired-token' })
      );
      expect(response.status).toBe(307);
    });

    it('handles missing JWT_SECRET for authenticated route', async () => {
      delete process.env['JWT_SECRET'];
      const response = await middleware(createMockRequest('/dashboard', { cookie: 'token' }));
      expect(response.status).toBe(307);
    });

    it('returns 401 for missing JWT_SECRET on evidence API', async () => {
      delete process.env['JWT_SECRET'];
      const response = await middleware(
        createMockRequest('/api/public/evidence/upload', { cookie: 'token' })
      );
      expect(response.status).toBe(401);
    });
  });

  describe('Token extraction', () => {
    it('extracts token from Bearer header', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'admin', userId: 'u1' },
      } as never);

      const response = await middleware(
        createMockRequest('/admin', { authHeader: 'Bearer valid-token' })
      );
      expect(response.status).toBe(200);
      expect(jwtVerify).toHaveBeenCalled();
    });

    it('falls back to cookie when no auth header', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'admin', userId: 'u1' },
      } as never);

      const response = await middleware(createMockRequest('/admin', { cookie: 'cookie-token' }));
      expect(response.status).toBe(200);
    });
  });

  describe('Admin login page', () => {
    it('redirects authenticated admin from /admin/login', async () => {
      vi.mocked(jwtVerify).mockResolvedValueOnce({
        payload: { role: 'owner', userId: 'u1' },
      } as never);

      const response = await middleware(
        createMockRequest('/admin/login', { cookie: 'valid-token' })
      );
      expect(response.status).toBe(307);
    });

    it('allows unauthenticated access to /admin/login', async () => {
      const response = await middleware(createMockRequest('/admin/login'));
      expect(response.status).toBe(200);
    });
  });
});
