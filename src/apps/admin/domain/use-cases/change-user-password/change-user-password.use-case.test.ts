/**
 * Change User Password Use Case Tests
 */

vi.mock('@repositories', () => ({
  userRepository: { findById: vi.fn(), updatePassword: vi.fn() },
}));
vi.mock('@helpers', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@helpers')>()),
  hashPassword: vi.fn(),
}));

import {
  expectFailure,
  expectSuccess,
  itHandlesStandardCases,
  MOCK_REQUEST,
  mockAuthSuccess,
} from '@testing/helpers';
import { hashPassword } from '@helpers';
import { userRepository } from '@repositories';

import { executeChangeUserPassword } from './change-user-password.use-case';

const mockUserRepo = vi.mocked(userRepository);
const mockHash = vi.mocked(hashPassword);

const mockTarget = { firstName: 'María', id: 'user-1', lastName: 'García', role: 'participant' };
const adminUser = {
  email: 'admin@example.com',
  firstName: 'José',
  id: 'admin-1',
  lastName: 'López',
  role: 'admin',
};
const ownerUser = {
  email: 'owner@example.com',
  firstName: 'Ana',
  id: 'owner-1',
  lastName: 'Martínez',
  role: 'owner',
};

const defaultParams = { newPassword: 'Pass12345', request: MOCK_REQUEST, userId: 'user-1' };

describe('executeChangeUserPassword', () => {
  beforeEach(() => {
    mockAuthSuccess(ownerUser);
    mockUserRepo.findById.mockResolvedValue(mockTarget as never);
    mockHash.mockResolvedValue('hashed-new-password');
    mockUserRepo.updatePassword.mockResolvedValue(undefined);
  });

  it('changes password for valid request', async () => {
    const r = expectSuccess(
      await executeChangeUserPassword({
        ...defaultParams,
        newPassword: 'NuevaContraseña123',
      })
    );
    expect((r as { message: string }).message).toContain('María García');
    expect(mockHash).toHaveBeenCalledWith('NuevaContraseña123', { saltRounds: 12 });
    expect(mockUserRepo.updatePassword).toHaveBeenCalledWith('user-1', 'hashed-new-password');
  });

  it('rejects missing userId', async () => {
    expectFailure(await executeChangeUserPassword({ ...defaultParams, userId: '' }));
  });

  it('rejects missing password', async () => {
    expectFailure(await executeChangeUserPassword({ ...defaultParams, newPassword: '' }));
  });

  it('rejects password shorter than 8 characters', async () => {
    expectFailure(
      await executeChangeUserPassword({ ...defaultParams, newPassword: '1234567' }),
      '8 caracteres'
    );
  });

  describe('RBAC Authorization', () => {
    it('owner can change any password', async () => {
      mockAuthSuccess(ownerUser);
      mockUserRepo.findById.mockResolvedValueOnce({ ...mockTarget, role: 'admin' } as never);
      expectSuccess(await executeChangeUserPassword(defaultParams));
    });

    it('admin cannot change owner password', async () => {
      mockAuthSuccess(adminUser);
      mockUserRepo.findById.mockResolvedValueOnce({ ...mockTarget, role: 'owner' } as never);
      expectFailure(await executeChangeUserPassword(defaultParams), 'propietario');
    });

    it('admin cannot change other admin password', async () => {
      mockAuthSuccess(adminUser);
      mockUserRepo.findById.mockResolvedValueOnce({
        ...mockTarget,
        id: 'admin-2',
        role: 'admin',
      } as never);
      expectFailure(
        await executeChangeUserPassword({ ...defaultParams, userId: 'admin-2' }),
        'otros administradores'
      );
    });

    it('admin can change own password', async () => {
      mockAuthSuccess(adminUser);
      mockUserRepo.findById.mockResolvedValueOnce({
        ...mockTarget,
        id: 'admin-1',
        role: 'admin',
      } as never);
      expectSuccess(await executeChangeUserPassword({ ...defaultParams, userId: 'admin-1' }));
    });
  });

  itHandlesStandardCases(executeChangeUserPassword, defaultParams, mockUserRepo.updatePassword, {
    findByIdMock: mockUserRepo.findById,
  });
});
