/**
 * Admin User Password Route Controller Tests
 *
 * Asserts the controller resolves the `[id]` param + body newPassword onto
 * `executeChangeUserPassword` and maps success → 200 / failure → the use-case
 * `status`. Auth via `withAuthMiddleware` (stubbed).
 */

vi.mock('@apps/admin/domain/use-cases', () => ({
  executeChangeUserPassword: vi.fn(),
}));

vi.mock('@middleware', () => ({
  withAuthMiddleware: (handler: unknown) => handler,
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import { executeChangeUserPassword } from '@apps/admin/domain/use-cases';

import { PUT } from './route';

const changePassword = vi.mocked(executeChangeUserPassword);

const requestWith = (body: unknown) => ({ json: () => Promise.resolve(body) }) as never;
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

describe('PUT /api/admin/users/[id]/password', () => {
  it('forwards userId + newPassword and returns 200 on success', async () => {
    changePassword.mockResolvedValueOnce({ data: { changed: true }, success: true } as never);

    const response = await PUT(requestWith({ newPassword: 'NuevaClave123' }), ctx('u-1'));

    expect(changePassword).toHaveBeenCalledWith(
      expect.objectContaining({ newPassword: 'NuevaClave123', userId: 'u-1' })
    );
    expect(response.status).toBe(200);
  });

  it('returns the use-case status on failure', async () => {
    changePassword.mockResolvedValueOnce({ status: 400, success: false } as never);

    const response = await PUT(requestWith({ newPassword: 'x' }), ctx('u-1'));

    expect(response.status).toBe(400);
  });
});
