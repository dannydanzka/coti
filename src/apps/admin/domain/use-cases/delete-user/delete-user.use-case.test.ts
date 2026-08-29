/**
 * Delete User Use Case Tests
 */

vi.mock('@repositories', () => ({
  userRepository: { delete: vi.fn(), findById: vi.fn() },
}));

import {
  expectFailure,
  expectSuccess,
  itRejectsMissingId,
  itRejectsNotFound,
  itRejectsUnauthorized,
  MOCK_REQUEST,
  mockAuthSuccess,
} from '@testing/helpers';
import { USER_ROLES } from '@constants';
import { userRepository } from '@repositories';

import { executeDeleteUser } from './delete-user.use-case';

const mockUserRepo = vi.mocked(userRepository);
const mockTargetUser = {
  email: 'carlos.martinez@example.com',
  firstName: 'Carlos',
  id: 'user-456',
  isActive: true,
  lastName: 'Martínez',
  role: 'participant' as const,
};
const params = { id: 'user-456', request: MOCK_REQUEST };

describe('executeDeleteUser', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockUserRepo.findById.mockResolvedValue(mockTargetUser as never);
    mockUserRepo.delete.mockResolvedValue(undefined);
  });

  it('deletes user with valid data', async () => {
    const result = expectSuccess(await executeDeleteUser(params));
    expect(result.message).toContain('eliminado exitosamente');
    expect(mockUserRepo.delete).toHaveBeenCalledWith('user-456');
  });

  it('prevents self-deletion', async () => {
    expectFailure(
      await executeDeleteUser({ id: 'admin-1', request: MOCK_REQUEST }),
      'eliminar tu propia cuenta'
    );
  });

  it('prevents admin deletion', async () => {
    mockUserRepo.findById.mockResolvedValueOnce({
      ...mockTargetUser,
      id: 'admin-456',
      role: USER_ROLES.ADMIN,
    } as never);
    expectFailure(
      await executeDeleteUser({ id: 'admin-456', request: MOCK_REQUEST }),
      'administrador'
    );
  });

  itRejectsUnauthorized(executeDeleteUser, params);
  itRejectsMissingId(executeDeleteUser, params);
  itRejectsNotFound(executeDeleteUser, params, mockUserRepo.findById);
});
