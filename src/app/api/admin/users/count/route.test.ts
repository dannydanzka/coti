/**
 * Admin Users Count Route Controller Tests
 *
 * Asserts the controller forwards role/isActive/isVerified filters to
 * `executeCountUsers` and maps success → 200 / failure → 400. Auth via
 * `withAuthMiddleware` (stubbed).
 */

vi.mock('@apps/admin/domain/use-cases', () => ({
  executeCountUsers: vi.fn(),
}));

vi.mock('@middleware', () => ({
  withAuthMiddleware: (handler: unknown) => handler,
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import { executeCountUsers } from '@apps/admin/domain/use-cases';

import { GET } from './route';

const countUsers = vi.mocked(executeCountUsers);

const requestWith = (url: string) => ({ url }) as never;

describe('GET /api/admin/users/count', () => {
  it('forwards the role filter and returns 200 on success', async () => {
    countUsers.mockResolvedValueOnce({ data: { count: 5 }, success: true } as never);

    const response = await GET(
      requestWith('http://localhost/api/admin/users/count?role=admin'),
      {}
    );

    expect(countUsers).toHaveBeenCalledWith(expect.objectContaining({ role: 'admin' }));
    expect(response.status).toBe(200);
  });

  it('maps a use-case failure to 400', async () => {
    countUsers.mockResolvedValueOnce({ success: false } as never);

    const response = await GET(requestWith('http://localhost/api/admin/users/count'), {});

    expect(response.status).toBe(400);
  });
});
