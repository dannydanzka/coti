/**
 * Auth Signup Route Controller Tests
 *
 * Asserts real Zod body validation (invalid body → 400, no delegation), the
 * mapped fields reaching the use case, and status mapping (success → 201,
 * failure → 400). `validateBody` + `signupBodySchema` run for real.
 */

vi.mock('@apps/auth/domain/use-cases', () => ({
  executeSignup: vi.fn(),
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import { executeSignup } from '@apps/auth/domain/use-cases';

import { POST } from './route';

const signup = vi.mocked(executeSignup);

const requestWith = (body: unknown) => ({ json: () => Promise.resolve(body) }) as never;

const validBody = {
  email: 'maria.garcia@test.com',
  firstName: 'María',
  lastName: 'García',
  password: 'TestAdmin123!',
};

describe('POST /api/auth/signup', () => {
  it('creates the account and returns 201 on success', async () => {
    signup.mockResolvedValueOnce({ data: { user: { id: 'u-1' } }, success: true } as never);

    const response = await POST(requestWith(validBody));

    expect(signup).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'maria.garcia@test.com',
        firstName: 'María',
        lastName: 'García',
        password: 'TestAdmin123!',
      })
    );
    expect(response.status).toBe(201);
  });

  it('maps a use-case failure to 400', async () => {
    signup.mockResolvedValueOnce({ success: false } as never);

    const response = await POST(requestWith(validBody));

    expect(response.status).toBe(400);
  });

  it('rejects an invalid body with 400 before delegating (real Zod validation)', async () => {
    const response = await POST(requestWith({ ...validBody, firstName: 'M' }));

    expect(response.status).toBe(400);
    expect(signup).not.toHaveBeenCalled();
  });
});
