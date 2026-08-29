/**
 * Reset Password Route Controller Tests
 *
 * Asserts real Zod body validation (invalid body → 400, no delegation), the
 * mapped token/passwords reaching the use case, and status mapping (success →
 * 200, failure → 400). `validateBody` + `resetPasswordBodySchema` run for real.
 */

vi.mock('@apps/auth/domain/use-cases', () => ({
  executeResetPassword: vi.fn(),
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import { executeResetPassword } from '@apps/auth/domain/use-cases';

import { POST } from './route';

const resetPassword = vi.mocked(executeResetPassword);

const requestWith = (body: unknown) => ({ json: () => Promise.resolve(body) }) as never;

const validBody = {
  confirmPassword: 'NuevaClave123!',
  newPassword: 'NuevaClave123!',
  token: 'reset-token-abc',
};

describe('POST /api/auth/reset-password', () => {
  it('completes the reset and returns 200 on success', async () => {
    resetPassword.mockResolvedValueOnce({ success: true } as never);

    const response = await POST(requestWith(validBody));

    expect(resetPassword).toHaveBeenCalledWith({
      confirmPassword: 'NuevaClave123!',
      newPassword: 'NuevaClave123!',
      token: 'reset-token-abc',
    });
    expect(response.status).toBe(200);
  });

  it('maps a use-case failure to 400', async () => {
    resetPassword.mockResolvedValueOnce({ success: false } as never);

    const response = await POST(requestWith(validBody));

    expect(response.status).toBe(400);
  });

  it('rejects an invalid body (missing token) with 400 before delegating', async () => {
    const response = await POST(requestWith({ ...validBody, token: '' }));

    expect(response.status).toBe(400);
    expect(resetPassword).not.toHaveBeenCalled();
  });
});
