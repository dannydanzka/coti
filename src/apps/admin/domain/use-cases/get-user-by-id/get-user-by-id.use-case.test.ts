/**
 * Get User By ID Use Case Tests
 */

vi.mock('@repositories', () => ({
  userRepository: { findById: vi.fn() },
}));

import {
  expectFailure,
  expectSuccess,
  itHandlesRepoError,
  itRejectsMissingId,
  itRejectsNotFound,
  itRejectsUnauthorized,
  MOCK_REQUEST,
  mockAuthSuccess,
} from '@testing/helpers';
import { userRepository } from '@repositories';

import { executeGetUserById } from './get-user-by-id.use-case';

const mockUserRepo = vi.mocked(userRepository);
const mockTargetUser = {
  email: 'maria.garcia@example.com',
  firstName: 'María',
  id: 'user-456',
  isActive: true,
  lastLoginAt: new Date(),
  lastName: 'García',
  role: 'participant',
};
const params = { id: 'user-456', request: MOCK_REQUEST };

describe('executeGetUserById', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockUserRepo.findById.mockResolvedValue(mockTargetUser as never);
  });

  it('returns enriched user data with permissions', async () => {
    const result = expectSuccess(await executeGetUserById(params));
    expect(result.data?.firstName).toBe('María');
    expect(result.data?.canBeEdited).toBeDefined();
    expect(result.data?.canBeDeleted).toBeDefined();
  });

  it('marks current user correctly', async () => {
    mockUserRepo.findById.mockResolvedValueOnce({ ...mockTargetUser, id: 'admin-1' } as never);
    const result = expectSuccess(
      await executeGetUserById({ id: 'admin-1', request: MOCK_REQUEST })
    );
    expect(result.data?.isCurrentUser).toBe(true);
  });

  describe('displayRole', () => {
    it.each([
      ['participant', 'Participante'],
      ['admin', 'Administrador'],
      ['owner', 'Owner'],
      ['unknown_role', 'Usuario'],
    ])('role %s → %s', async (role, label) => {
      mockUserRepo.findById.mockResolvedValue({ ...mockTargetUser, role } as never);
      const result = expectSuccess(await executeGetUserById(params));
      expect(result.data?.displayRole).toBe(label);
    });
  });

  describe('lastActivityFormatted', () => {
    it('shows "Nunca" when no lastLoginAt', async () => {
      mockUserRepo.findById.mockResolvedValueOnce({
        ...mockTargetUser,
        lastLoginAt: null,
      } as never);
      const result = expectSuccess(await executeGetUserById(params));
      expect(result.data?.lastActivityFormatted).toBe('Nunca');
    });

    it('shows "Hace menos de una hora" for recent activity', async () => {
      mockUserRepo.findById.mockResolvedValueOnce({
        ...mockTargetUser,
        lastLoginAt: new Date(Date.now() - 30 * 60 * 1000),
      } as never);
      const result = expectSuccess(await executeGetUserById(params));
      expect(result.data?.lastActivityFormatted).toBe('Hace menos de una hora');
    });

    it('shows hours for activity 1-23h ago', async () => {
      mockUserRepo.findById.mockResolvedValueOnce({
        ...mockTargetUser,
        lastLoginAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      } as never);
      const result = expectSuccess(await executeGetUserById(params));
      expect(result.data?.lastActivityFormatted).toContain('horas');
    });

    it('shows days for activity 1+ days ago', async () => {
      mockUserRepo.findById.mockResolvedValueOnce({
        ...mockTargetUser,
        lastLoginAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      } as never);
      const result = expectSuccess(await executeGetUserById(params));
      expect(result.data?.lastActivityFormatted).toContain('día');
    });

    it('shows date for old entries', async () => {
      mockUserRepo.findById.mockResolvedValueOnce({
        ...mockTargetUser,
        lastLoginAt: new Date('2025-01-15'),
      } as never);
      const result = expectSuccess(await executeGetUserById(params));
      expect(result.data?.lastActivityFormatted).toContain('2025');
    });
  });

  describe('canBeDeleted rules', () => {
    it('admin target cannot be deleted by admin', async () => {
      mockUserRepo.findById.mockResolvedValueOnce({ ...mockTargetUser, role: 'admin' } as never);
      const result = expectSuccess(await executeGetUserById(params));
      expect(result.data?.canBeDeleted).toBe(false);
    });

    it('current user cannot delete self', async () => {
      mockUserRepo.findById.mockResolvedValueOnce({ ...mockTargetUser, id: 'admin-1' } as never);
      const result = expectSuccess(
        await executeGetUserById({ id: 'admin-1', request: MOCK_REQUEST })
      );
      expect(result.data?.canBeDeleted).toBe(false);
    });
  });

  describe('access control', () => {
    it('non-admin cannot access other users', async () => {
      mockAuthSuccess({ id: 'other-user', role: 'participant' });
      expectFailure(await executeGetUserById(params));
    });

    it('non-admin can access own data', async () => {
      mockAuthSuccess({ id: 'user-456', role: 'participant' });
      expectSuccess(await executeGetUserById(params));
    });
  });

  itRejectsUnauthorized(executeGetUserById, params);
  itRejectsMissingId(executeGetUserById, params);
  itRejectsNotFound(executeGetUserById, params, mockUserRepo.findById);
  itHandlesRepoError(executeGetUserById, params, mockUserRepo.findById);
});
