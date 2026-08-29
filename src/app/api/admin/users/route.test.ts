/**
 * Admin Users Route Controller Tests
 *
 * GET: forwards query filters to `executeGetUsers`, maps success → 200 /
 * failure → 400. POST: real Zod validation (invalid → 400, no delegation),
 * mapped fields → `executeCreateUser`, success → 201 / failure → 400.
 * Auth via `withAuthMiddleware` (stubbed).
 */

vi.mock('@apps/admin/domain/use-cases', () => ({
  executeCreateUser: vi.fn(),
  executeGetUsers: vi.fn(),
}));

vi.mock('@middleware', () => ({
  withAuthMiddleware: (handler: unknown) => handler,
}));

vi.mock('@api-error', () => ({
  handleApiError: vi.fn(() => ({ status: 500 })),
}));

import { executeCreateUser, executeGetUsers } from '@apps/admin/domain/use-cases';

import { GET, POST } from './route';

const getUsers = vi.mocked(executeGetUsers);
const createUser = vi.mocked(executeCreateUser);

const getRequest = (url: string) => ({ url }) as never;
const postRequest = (body: unknown) => ({ json: () => Promise.resolve(body) }) as never;

const validBody = {
  email: 'nuevo@test.com',
  firstName: 'Ana',
  lastName: 'Ruiz',
  password: 'TestAdmin123',
  role: 'admin',
};

describe('GET /api/admin/users', () => {
  it('forwards filters and returns 200 on success', async () => {
    getUsers.mockResolvedValueOnce({ data: { users: [] }, success: true } as never);

    const response = await GET(
      getRequest('http://localhost/api/admin/users?role=admin&page=2'),
      {}
    );

    expect(getUsers).toHaveBeenCalledWith(expect.objectContaining({ page: 2, role: 'admin' }));
    expect(response.status).toBe(200);
  });

  it('maps a use-case failure to 400', async () => {
    getUsers.mockResolvedValueOnce({ success: false } as never);

    const response = await GET(getRequest('http://localhost/api/admin/users'), {});

    expect(response.status).toBe(400);
  });
});

describe('POST /api/admin/users', () => {
  it('creates the user and returns 201 on success', async () => {
    createUser.mockResolvedValueOnce({ data: { id: 'u-1' }, success: true } as never);

    const response = await POST(postRequest(validBody), {});

    expect(createUser).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'nuevo@test.com', role: 'admin' })
    );
    expect(response.status).toBe(201);
  });

  it('maps a use-case failure to 400', async () => {
    createUser.mockResolvedValueOnce({ success: false } as never);

    const response = await POST(postRequest(validBody), {});

    expect(response.status).toBe(400);
  });

  it('rejects an invalid body with 400 before delegating (real Zod validation)', async () => {
    const response = await POST(postRequest({ ...validBody, password: 'weak' }), {});

    expect(response.status).toBe(400);
    expect(createUser).not.toHaveBeenCalled();
  });
});
