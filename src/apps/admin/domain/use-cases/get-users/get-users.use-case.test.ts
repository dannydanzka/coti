/**
 * Get Users Use Case Tests
 */

vi.mock('@repositories', () => ({
  userRepository: { findMany: vi.fn() },
}));

import {
  expectSuccess,
  itRejectsUnauthorized,
  MOCK_REQUEST,
  mockAuthSuccess,
} from '@testing/helpers';
import { userRepository } from '@repositories';

import { executeGetUsers } from './get-users.use-case';

const mockUserRepo = vi.mocked(userRepository);
const mockUsers = [
  {
    email: 'maria.garcia@example.com',
    firstName: 'María',
    id: 'user-1',
    isActive: true,
    lastName: 'García',
    role: 'participant',
  },
  {
    email: 'carlos.martinez@example.com',
    firstName: 'Carlos',
    id: 'user-2',
    isActive: true,
    lastName: 'Martínez',
    role: 'participant',
  },
];
const params = { request: MOCK_REQUEST };

describe('executeGetUsers', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockUserRepo.findMany.mockResolvedValue({
      pagination: { total: 2, totalPages: 1 },
      users: mockUsers,
    } as never);
  });

  it('returns paginated users with permissions enrichment', async () => {
    const result = expectSuccess(await executeGetUsers(params));
    expect(result.data?.users).toHaveLength(2);
    expect(result.data?.pagination.total).toBe(2);
    expect(result.data?.users[0]).toHaveProperty('canBeDeleted');
    expect(result.data?.users[0]).toHaveProperty('displayName');
  });

  it('applies custom page and limit', async () => {
    await executeGetUsers({ ...params, limit: 20, page: 2 });
    expect(mockUserRepo.findMany).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ limit: 20, page: 2 })
    );
  });

  it('filters by role', async () => {
    await executeGetUsers({ ...params, role: 'participant' });
    expect(mockUserRepo.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ role: 'participant' }),
      expect.anything()
    );
  });

  it('filters by active status', async () => {
    await executeGetUsers({ ...params, isActive: 'true' });
    expect(mockUserRepo.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ isActive: true }),
      expect.anything()
    );
  });

  it('marks current user correctly', async () => {
    mockUserRepo.findMany.mockResolvedValueOnce({
      pagination: { total: 1, totalPages: 1 },
      users: [{ ...mockUsers[0], id: 'admin-1' }],
    } as never);
    const result = expectSuccess(await executeGetUsers(params));
    expect(result.data?.users[0]?.isCurrentUser).toBe(true);
  });

  itRejectsUnauthorized(executeGetUsers, params);
});
