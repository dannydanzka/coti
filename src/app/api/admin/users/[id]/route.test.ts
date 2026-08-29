/**
 * Admin User By ID Route Controller Tests
 *
 * GET/PUT/PATCH/DELETE all resolve the `[id]` param onto their use case and map
 * success → 200 / failure → 400 (GET/DELETE use the use-case `status` when set).
 * PUT/PATCH forward the body as `updates` with the correct `updateType`.
 * Auth via `withAuthMiddleware` (stubbed).
 */

vi.mock('@apps/admin/domain/use-cases', () => ({
  executeDeleteUser: vi.fn(),
  executeGetUserById: vi.fn(),
  executeUpdateUser: vi.fn(),
}));

vi.mock('@middleware', () => ({
  withAuthMiddleware: (handler: unknown) => handler,
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import {
  executeDeleteUser,
  executeGetUserById,
  executeUpdateUser,
} from '@apps/admin/domain/use-cases';

import { DELETE, GET, PATCH, PUT } from './route';

const getById = vi.mocked(executeGetUserById);
const updateUser = vi.mocked(executeUpdateUser);
const deleteUser = vi.mocked(executeDeleteUser);

const requestWith = (body: unknown) => ({ json: () => Promise.resolve(body) }) as never;
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

describe('GET /api/admin/users/[id]', () => {
  it('returns 200 with the user on success', async () => {
    getById.mockResolvedValueOnce({ data: { id: 'u-1' }, success: true } as never);

    const response = await GET({} as never, ctx('u-1'));

    expect(getById).toHaveBeenCalledWith(expect.objectContaining({ id: 'u-1' }));
    expect(response.status).toBe(200);
  });

  it('returns the use-case status on failure', async () => {
    getById.mockResolvedValueOnce({ status: 404, success: false } as never);

    const response = await GET({} as never, ctx('missing'));

    expect(response.status).toBe(404);
  });
});

describe('PUT /api/admin/users/[id]', () => {
  it('forwards updates with updateType=full and returns 200', async () => {
    updateUser.mockResolvedValueOnce({ data: { id: 'u-1' }, success: true } as never);

    const response = await PUT(requestWith({ firstName: 'Ana' }), ctx('u-1'));

    expect(updateUser).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'u-1', updateType: 'full', updates: { firstName: 'Ana' } })
    );
    expect(response.status).toBe(200);
  });

  it('maps a use-case failure to 400', async () => {
    updateUser.mockResolvedValueOnce({ success: false } as never);

    const response = await PUT(requestWith({}), ctx('u-1'));

    expect(response.status).toBe(400);
  });
});

describe('PATCH /api/admin/users/[id]', () => {
  it('forwards updates with updateType=partial and returns 200', async () => {
    updateUser.mockResolvedValueOnce({ data: { id: 'u-1' }, success: true } as never);

    const response = await PATCH(requestWith({ isActive: false }), ctx('u-1'));

    expect(updateUser).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'u-1', updateType: 'partial' })
    );
    expect(response.status).toBe(200);
  });
});

describe('DELETE /api/admin/users/[id]', () => {
  it('returns 200 on success', async () => {
    deleteUser.mockResolvedValueOnce({ data: { id: 'u-1' }, success: true } as never);

    const response = await DELETE({} as never, ctx('u-1'));

    expect(deleteUser).toHaveBeenCalledWith(expect.objectContaining({ id: 'u-1' }));
    expect(response.status).toBe(200);
  });

  it('returns the use-case status on failure', async () => {
    deleteUser.mockResolvedValueOnce({ status: 409, success: false } as never);

    const response = await DELETE({} as never, ctx('u-1'));

    expect(response.status).toBe(409);
  });
});
