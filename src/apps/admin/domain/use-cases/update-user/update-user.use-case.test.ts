/**
 * Update User Use Case Tests
 */

vi.mock('@repositories', () => ({
  userRepository: { emailExists: vi.fn(), findById: vi.fn(), findByRole: vi.fn(), update: vi.fn() },
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
import { userRepository } from '@repositories';

import { executeUpdateUser } from './update-user.use-case';

const mockUserRepo = vi.mocked(userRepository);
const mockTargetUser = {
  email: 'carlos.martinez@example.com',
  firstName: 'Carlos',
  id: 'user-456',
  isActive: true,
  lastName: 'Martínez',
  role: 'participant' as const,
};
const validParams = {
  id: 'user-456',
  request: MOCK_REQUEST,
  updates: { firstName: 'Carlos Actualizado' },
};

describe('executeUpdateUser', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockUserRepo.findById.mockResolvedValue(mockTargetUser as never);
    mockUserRepo.emailExists.mockResolvedValue(false);
    mockUserRepo.update.mockResolvedValue({
      ...mockTargetUser,
      firstName: 'Carlos Actualizado',
    } as never);
  });

  it('updates user with valid data', async () => {
    const result = expectSuccess(await executeUpdateUser(validParams));
    expect(result.message).toContain('exitosamente');
    expect(result.data?.user).toBeDefined();
    expect(result.data?.changes).toBeDefined();
  });

  it('rejects empty updates object', async () => {
    expectFailure(await executeUpdateUser({ ...validParams, updates: {} }));
  });

  it('rejects duplicate email', async () => {
    mockUserRepo.emailExists.mockResolvedValueOnce(true);
    expectFailure(
      await executeUpdateUser({ ...validParams, updates: { email: 'existing@example.com' } }),
      'Ya existe un usuario'
    );
  });

  it('prevents self-deactivation', async () => {
    mockAuthSuccess({ id: 'self-user-123', role: 'admin' });
    mockUserRepo.findById.mockResolvedValueOnce({
      ...mockTargetUser,
      id: 'self-user-123',
      role: 'admin',
    } as never);
    expectFailure(
      await executeUpdateUser({
        id: 'self-user-123',
        request: MOCK_REQUEST,
        updates: { isActive: false },
      }),
      'desactivar tu propia cuenta'
    );
  });

  it('prevents self-role-change', async () => {
    mockAuthSuccess({ id: 'self-user-123', role: 'admin' });
    mockUserRepo.findById.mockResolvedValueOnce({
      ...mockTargetUser,
      id: 'self-user-123',
      role: 'admin',
    } as never);
    expectFailure(
      await executeUpdateUser({
        id: 'self-user-123',
        request: MOCK_REQUEST,
        updates: { role: 'participant' },
      }),
      'cambiar tu propio rol'
    );
  });

  it('rejects invalid email format', async () => {
    expectFailure(await executeUpdateUser({ ...validParams, updates: { email: 'invalid-email' } }));
  });

  it('rejects short firstName', async () => {
    expectFailure(await executeUpdateUser({ ...validParams, updates: { firstName: 'A' } }));
  });

  it('rejects invalid role', async () => {
    expectFailure(
      await executeUpdateUser({ ...validParams, updates: { role: 'superadmin' as never } })
    );
  });

  it('rejects non-boolean isActive', async () => {
    expectFailure(
      await executeUpdateUser({ ...validParams, updates: { isActive: 'yes' as never } })
    );
  });

  it('rejects self-update with restricted fields', async () => {
    mockAuthSuccess({ id: 'user-456', role: 'admin' });
    mockUserRepo.findById.mockResolvedValueOnce({
      ...mockTargetUser,
      id: 'user-456',
      role: 'admin',
    } as never);
    expectFailure(
      await executeUpdateUser({
        id: 'user-456',
        request: MOCK_REQUEST,
        updates: { role: 'admin' as const },
      })
    );
  });

  it('prevents non-admin from modifying admin user', async () => {
    mockAuthSuccess({ id: 'user-789', role: 'participant' });
    mockUserRepo.findById.mockResolvedValueOnce({
      ...mockTargetUser,
      id: 'user-456',
      role: 'admin',
    } as never);
    expectFailure(await executeUpdateUser(validParams), 'administradores');
  });

  it('prevents non-admin from assigning admin role', async () => {
    mockAuthSuccess({ id: 'user-789', role: 'participant' });
    expectFailure(
      await executeUpdateUser({ ...validParams, updates: { role: 'admin' as const } }),
      'administradores'
    );
  });

  it('prevents removing last admin without owner', async () => {
    mockAuthSuccess({ id: 'owner-1', role: 'owner' });
    mockUserRepo.findById.mockResolvedValueOnce({
      ...mockTargetUser,
      id: 'user-456',
      role: 'admin',
    } as never);
    mockUserRepo.findByRole
      .mockResolvedValueOnce([{ id: 'user-456' }] as never)
      .mockResolvedValueOnce([] as never);
    expectFailure(
      await executeUpdateUser({ ...validParams, updates: { role: 'participant' as const } }),
      'último administrador'
    );
  });

  it('allows removing admin when owner exists', async () => {
    mockAuthSuccess({ id: 'owner-1', role: 'owner' });
    mockUserRepo.findById.mockResolvedValueOnce({
      ...mockTargetUser,
      id: 'user-456',
      role: 'admin',
    } as never);
    mockUserRepo.findByRole
      .mockResolvedValueOnce([{ id: 'user-456' }] as never)
      .mockResolvedValueOnce([{ id: 'owner-1' }] as never);
    mockUserRepo.update.mockResolvedValueOnce({ ...mockTargetUser, role: 'participant' } as never);
    expectSuccess(
      await executeUpdateUser({ ...validParams, updates: { role: 'participant' as const } })
    );
  });

  it('sanitizes email to lowercase', async () => {
    mockUserRepo.update.mockResolvedValueOnce({
      ...mockTargetUser,
      email: 'test@example.com',
    } as never);
    expectSuccess(
      await executeUpdateUser({ ...validParams, updates: { email: 'TEST@EXAMPLE.COM' } })
    );
    expect(mockUserRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'test@example.com' })
    );
  });

  it('tracks changes between old and new user', async () => {
    mockUserRepo.update.mockResolvedValueOnce({
      ...mockTargetUser,
      firstName: 'Carlos Actualizado',
    } as never);
    const result = expectSuccess(await executeUpdateUser(validParams));
    expect((result.data as any)?.changes).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'firstName' })])
    );
  });

  it('uses partial updateType for restricted fields', async () => {
    expectFailure(
      await executeUpdateUser({
        ...validParams,
        updateType: 'partial',
        updates: { role: 'admin' as const },
      })
    );
  });

  itRejectsUnauthorized(executeUpdateUser, validParams);
  itRejectsMissingId(executeUpdateUser, validParams);
  itRejectsNotFound(executeUpdateUser, validParams, mockUserRepo.findById);
});
