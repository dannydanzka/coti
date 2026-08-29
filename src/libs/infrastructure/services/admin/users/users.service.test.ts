/**
 * Users Service Tests
 *
 * Essential tests for user management service layer with handleRequest integration.
 * Spanish locale, CRUD operations, error handling.
 *
 */

import { apiConfig } from '@config';
import { handleRequest } from '@helpers';
import { setupServiceMock } from '@testing/helpers';
import type { UserRole } from '@domain-types';

import { UsersService } from './users.service';

const { mockError, mockRejection, mockSuccess } = setupServiceMock();
vi.mock('@helpers/http/handleRequest/handleRequest', () => ({
  handleRequest: vi.fn(),
}));

describe('UsersService', () => {
  const mockUserData = {
    createdAt: new Date(),
    email: 'newuser@coti.mx',
    firstName: 'Nuevo',
    id: 'user-new-123',
    isActive: true,
    isVerified: false,
    lastLoginAt: null,
    lastName: 'Usuario',
    password: '',
    role: 'admin',
    updatedAt: null,
  };
  describe('create', () => {
    const createRequest = {
      email: 'newuser@coti.mx',
      firstName: 'Nuevo',
      lastName: 'Usuario',
      password: 'password123',
      role: 'admin' as UserRole,
    };

    it('successfully creates user', async () => {
      mockSuccess(mockUserData);

      const result = await UsersService.create(createRequest);

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          body: createRequest,
          customDefaultErrorMessage: 'No se pudo crear el usuario',
          endpoint: apiConfig.API_BASE.ENDPOINTS.ADMIN.USERS,
          method: 'POST',
          timeout: 10000,
        })
      );

      expect(result).toEqual(mockUserData);
    });

    it('throws error when creation fails', async () => {
      mockError();

      await expect(UsersService.create(createRequest)).rejects.toThrow(
        'No se pudo crear el usuario'
      );
    });
  });

  describe('delete', () => {
    const userId = 'user-123';

    it('successfully deletes user', async () => {
      mockSuccess(undefined);

      await expect(UsersService.delete(userId)).resolves.not.toThrow();

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          endpoint: `${apiConfig.API_BASE.ENDPOINTS.ADMIN.USERS}/${userId}`,
          method: 'DELETE',
        })
      );
    });

    it('throws error when deletion fails', async () => {
      mockError();

      await expect(UsersService.delete(userId)).rejects.toThrow('No se pudo eliminar el usuario');
    });
  });

  describe('Error Handling', () => {
    it('handles network errors in create', async () => {
      mockRejection('Error de red');

      await expect(
        UsersService.create({
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'User',
          password: 'pass',
          role: 'admin',
        })
      ).rejects.toThrow();
    });

    it('handles network errors in delete', async () => {
      mockRejection('Error de red');

      await expect(UsersService.delete('user-123')).rejects.toThrow();
    });
  });

  describe('getAll', () => {
    it('returns users list', async () => {
      mockSuccess({
        pagination: {
          hasNextPage: false,
          hasPrevPage: false,
          limit: 20,
          page: 1,
          total: 1,
          totalPages: 1,
        },
        users: [mockUserData],
      });

      const result = await UsersService.getAll({ limit: 20, page: 1 });
      expect(result.users).toHaveLength(1);
    });

    it('returns empty on failure', async () => {
      mockError();

      const result = await UsersService.getAll();
      expect(result.users).toEqual([]);
      expect(result.pagination.total).toBe(0);
    });

    it('builds query params correctly', async () => {
      mockSuccess({ users: [] });

      await UsersService.getAll({
        isActive: 'true',
        limit: 10,
        page: 2,
        role: 'admin',
        search: 'María',
        sortBy: 'firstName',
        sortOrder: 'asc',
      });

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          endpoint: expect.stringContaining('search=Mar'),
        })
      );
    });
  });

  describe('getById', () => {
    it('returns user by id', async () => {
      mockSuccess(mockUserData);

      const result = await UsersService.getById('user-123');
      expect(result.id).toBe('user-new-123');
    });

    it('throws on not found', async () => {
      mockError();

      await expect(UsersService.getById('user-999')).rejects.toThrow('Usuario no encontrado');
    });
  });

  describe('update', () => {
    it('updates user successfully', async () => {
      mockSuccess({ user: { ...mockUserData, firstName: 'Actualizado' } });

      const result = await UsersService.update('user-123', { firstName: 'Actualizado' });
      expect(result.firstName).toBe('Actualizado');
    });

    it('throws on failure', async () => {
      mockError();

      await expect(UsersService.update('user-123', {})).rejects.toThrow(
        'No se pudo actualizar el usuario'
      );
    });
  });

  describe('changePassword', () => {
    it('changes password successfully', async () => {
      mockSuccess(undefined);

      await expect(
        UsersService.changePassword('user-123', 'nuevaContraseña123')
      ).resolves.toBeUndefined();
    });

    it('throws on failure', async () => {
      mockError();

      await expect(UsersService.changePassword('user-123', 'nueva')).rejects.toThrow(
        'No se pudo cambiar la contraseña'
      );
    });
  });

  describe('getCountByRole', () => {
    it('returns count by role', async () => {
      mockSuccess({
        activeOnly: true,
        countByRole: { admin: 2, owner: 1, participant: 50 },
        total: 53,
      });

      const result = await UsersService.getCountByRole();
      expect(result.total).toBe(53);
    });

    it('returns empty on failure', async () => {
      mockError();

      const result = await UsersService.getCountByRole(false);
      expect(result.total).toBe(0);
    });
  });

  describe('Spanish Error Messages', () => {
    it('uses Spanish error message for create', async () => {
      mockError();

      await expect(
        UsersService.create({
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'User',
          password: 'pass',
          role: 'admin',
        })
      ).rejects.toThrow('No se pudo crear el usuario');
    });

    it('uses Spanish error message for delete', async () => {
      mockError();

      await expect(UsersService.delete('user-123')).rejects.toThrow(
        'No se pudo eliminar el usuario'
      );
    });
  });
});
