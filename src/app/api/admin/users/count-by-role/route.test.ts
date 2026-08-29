/**
 * Admin Users Count By Role Route Controller Tests
 *
 * Asserts the controller parses the `activeOnly` flag (string → boolean),
 * delegates to `executeCountUsersByRole`, and maps success → 200 / failure → 400.
 * Auth via `withAuthMiddleware` (stubbed).
 */

vi.mock('@apps/admin/domain/use-cases', () => ({
  executeCountUsersByRole: vi.fn(),
}));

vi.mock('@middleware', () => ({
  withAuthMiddleware: (handler: unknown) => handler,
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import { executeCountUsersByRole } from '@apps/admin/domain/use-cases';

import { GET } from './route';

const countByRole = vi.mocked(executeCountUsersByRole);

const requestWith = (url: string) => ({ url }) as never;

describe('GET /api/admin/users/count-by-role', () => {
  it('parses activeOnly=true and returns 200 on success', async () => {
    countByRole.mockResolvedValueOnce({ data: { byRole: {} }, success: true } as never);

    const response = await GET(
      requestWith('http://localhost/api/admin/users/count-by-role?activeOnly=true'),
      {}
    );

    expect(countByRole).toHaveBeenCalledWith(expect.objectContaining({ activeOnly: true }));
    expect(response.status).toBe(200);
  });

  it('maps a use-case failure to 400', async () => {
    countByRole.mockResolvedValueOnce({ success: false } as never);

    const response = await GET(requestWith('http://localhost/api/admin/users/count-by-role'), {});

    expect(response.status).toBe(400);
  });
});
