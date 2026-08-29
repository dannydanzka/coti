/**
 * Count Users By Role Use Case Tests
 */

vi.mock('@repositories', () => ({
  userRepository: { count: vi.fn() },
}));

import {
  expectSuccess,
  itRejectsUnauthorized,
  MOCK_REQUEST,
  mockAuthSuccess,
} from '@testing/helpers';
import { userRepository } from '@repositories';

import { executeCountUsersByRole } from './count-users-by-role.use-case';

const mockUserRepo = vi.mocked(userRepository);
const params = { request: MOCK_REQUEST };

describe('executeCountUsersByRole', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockUserRepo.count.mockImplementation(((filters: { role?: string; isActive?: boolean }) => {
      const counts: Record<string, number> = { ADMIN: 2, OWNER: 1, PARTICIPANT: 3 };
      const activeCounts: Record<string, number> = { ADMIN: 2, OWNER: 1, PARTICIPANT: 2 };
      const role = filters?.role?.toUpperCase() ?? '';
      return Promise.resolve(filters?.isActive ? (activeCounts[role] ?? 0) : (counts[role] ?? 0));
    }) as never);
  });

  it('counts only active users by default', async () => {
    const result = expectSuccess(await executeCountUsersByRole(params));
    expect(result.data?.activeOnly).toBe(true);
  });

  it('counts all users when activeOnly is false', async () => {
    const result = expectSuccess(await executeCountUsersByRole({ ...params, activeOnly: false }));
    expect(result.data?.activeOnly).toBe(false);
  });

  it('returns count grouped by role and total', async () => {
    const result = expectSuccess(await executeCountUsersByRole(params));
    expect(result.data?.countByRole).toBeDefined();
    expect(typeof result.data?.total).toBe('number');
  });

  itRejectsUnauthorized(executeCountUsersByRole, params);
});
