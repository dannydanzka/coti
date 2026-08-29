/**
 * Count Users Use Case Tests
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

import { executeCountUsers } from './count-users.use-case';

const mockUserRepo = vi.mocked(userRepository);
const params = { request: MOCK_REQUEST };

describe('executeCountUsers', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockUserRepo.count.mockResolvedValue(150);
  });

  it('returns user count', async () => {
    const result = expectSuccess(await executeCountUsers(params));
    expect(result.data?.count).toBe(150);
    expect(result.timestamp).toBeDefined();
  });

  it('counts users by role', async () => {
    await executeCountUsers({ ...params, role: 'participant' });
    expect(mockUserRepo.count).toHaveBeenCalledWith(
      expect.objectContaining({ role: 'participant' })
    );
  });

  it('counts active users only', async () => {
    await executeCountUsers({ ...params, isActive: 'true' });
    expect(mockUserRepo.count).toHaveBeenCalledWith(expect.objectContaining({ isActive: true }));
  });

  it('returns applied filters', async () => {
    const result = expectSuccess(
      await executeCountUsers({ ...params, isActive: 'true', role: 'participant' })
    );
    expect(result.data?.filters?.role).toBe('participant');
    expect(result.data?.filters?.isActive).toBe(true);
  });

  itRejectsUnauthorized(executeCountUsers, params);
});
