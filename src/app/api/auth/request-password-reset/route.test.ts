/**
 * Request Password Reset Route Controller Tests
 *
 * Asserts the controller forwards the body email to the use case, maps
 * success → 200 / failure → 400, and routes body-read errors to handleApiError.
 */

vi.mock('@apps/auth/domain/use-cases', () => ({
  executeRequestPasswordReset: vi.fn(),
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import { executeRequestPasswordReset } from '@apps/auth/domain/use-cases';

import { POST } from './route';

const requestReset = vi.mocked(executeRequestPasswordReset);

const requestWith = (body: unknown) => ({ json: () => Promise.resolve(body) }) as never;

describe('POST /api/auth/request-password-reset', () => {
  it('forwards the email and returns 200 on success', async () => {
    requestReset.mockResolvedValueOnce({ success: true } as never);

    const response = await POST(requestWith({ email: 'maria.garcia@test.com' }));

    expect(requestReset).toHaveBeenCalledWith({ email: 'maria.garcia@test.com' });
    expect(response.status).toBe(200);
  });

  it('maps a use-case failure to 400', async () => {
    requestReset.mockResolvedValueOnce({ success: false } as never);

    const response = await POST(requestWith({ email: 'nobody@test.com' }));

    expect(response.status).toBe(400);
  });

  it('routes a body-read error to handleApiError', async () => {
    const response = await POST({ json: () => Promise.reject(new Error('bad json')) } as never);

    expect(response.status).toBe(500);
    expect(requestReset).not.toHaveBeenCalled();
  });
});
