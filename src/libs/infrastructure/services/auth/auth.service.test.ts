/**
 * Auth Service Tests
 *
 * Essential tests for authentication service layer with handleRequest integration.
 * Spanish locale, error handling, API contract validation.
 *
 */

import { apiConfig } from '@config';
import { handleRequest } from '@helpers';
import { setupServiceMock } from '@testing/helpers';

import { AuthService } from './auth.service';

const { mockError, mockRejection, mockSuccess } = setupServiceMock();
vi.mock('@helpers/http/handleRequest/handleRequest', () => ({
  handleRequest: vi.fn(),
}));

describe('AuthService', () => {
  describe('login', () => {
    const mockCredentials = {
      email: 'admin@coti.mx',
      password: 'password123',
    };

    const mockLoginData = {
      expiresIn: '24h',
      permissions: [],
      session: {
        ipAddress: '192.168.1.1',
        isActive: true,
        isValid: true,
        token: 'mock-jwt-token',
        userAgent: 'Mozilla/5.0',
        userId: 'user-123',
      },
      token: 'mock-jwt-token',
      user: {
        createdAt: new Date(),
        email: 'admin@coti.mx',
        id: 'user-123',
        isActive: true,
        isVerified: true,
        lastLoginAt: null,
        name: 'Admin User',
        password: '',
        role: 'admin',
        updatedAt: null,
      },
    };

    it('successfully logs in user with valid credentials', async () => {
      mockSuccess(mockLoginData);

      const result = await AuthService.login(mockCredentials);

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          body: mockCredentials,
          customDefaultErrorMessage: 'Error al iniciar sesión',
          endpoint: apiConfig.API_BASE.ENDPOINTS.AUTH.LOGIN,
          method: 'POST',
          timeout: 10000,
        })
      );

      expect(result).toEqual(mockLoginData);
    });

    it('returns token and user data on successful login', async () => {
      mockSuccess(mockLoginData);

      const result = await AuthService.login(mockCredentials);

      expect(result.token).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user?.email).toBe(mockCredentials.email);
    });

    it('includes session data in response', async () => {
      mockSuccess(mockLoginData);

      const result = await AuthService.login(mockCredentials);

      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user).toBeDefined();
    });

    it('throws error when API response is not successful', async () => {
      mockError('Credenciales inválidas');

      await expect(AuthService.login(mockCredentials)).rejects.toThrow('Credenciales inválidas');
    });

    it('throws error when API response has no data', async () => {
      mockSuccess(null);

      await expect(AuthService.login(mockCredentials)).rejects.toThrow('Error al iniciar sesión');
    });

    it('uses correct timeout for login request', async () => {
      mockSuccess(mockLoginData);

      await AuthService.login(mockCredentials);

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 10000,
        })
      );
    });
  });

  describe('logout', () => {
    it('successfully logs out user', async () => {
      mockSuccess(undefined);

      await expect(AuthService.logout()).resolves.not.toThrow();

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          customDefaultErrorMessage: 'Error al cerrar sesión',
          endpoint: apiConfig.API_BASE.ENDPOINTS.AUTH.LOGOUT,
          method: 'POST',
          timeout: 5000,
        })
      );
    });

    it('throws error when logout fails', async () => {
      mockError('Error de servidor');

      await expect(AuthService.logout()).rejects.toThrow('Error de servidor');
    });

    it('falls back to fixed message when logout response has no error', async () => {
      mockError();

      await expect(AuthService.logout()).rejects.toThrow('No se pudo cerrar la sesión');
    });

    it('uses correct timeout for logout request', async () => {
      mockSuccess(undefined);

      await AuthService.logout();

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 5000,
        })
      );
    });
  });

  describe('me', () => {
    const mockUserData = {
      email: 'admin@coti.mx',
      id: 'user-123',
      isActive: true,
      isVerified: true,
      name: 'Admin User',
      role: 'admin',
    };

    it('successfully retrieves current user data', async () => {
      mockSuccess(mockUserData);

      const result = await AuthService.me();

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          customDefaultErrorMessage: 'Error al obtener información del usuario',
          endpoint: apiConfig.API_BASE.ENDPOINTS.AUTH.ME,
          method: 'GET',
          timeout: 8000,
        })
      );

      expect(result).toEqual(mockUserData);
    });

    it('returns user with correct properties', async () => {
      mockSuccess(mockUserData);

      const result = await AuthService.me();

      expect(result.id).toBeDefined();
      expect(result.email).toBeDefined();
      expect(result.role).toBeDefined();
      expect(result.isActive).toBe(true);
    });

    it('throws error when API response is not successful', async () => {
      mockError('No autorizado');

      await expect(AuthService.me()).rejects.toThrow('No autorizado');
    });

    it('throws error when API response has no data', async () => {
      mockSuccess(null);

      await expect(AuthService.me()).rejects.toThrow('Usuario no encontrado');
    });

    it('uses correct timeout for me request', async () => {
      mockSuccess(mockUserData);

      await AuthService.me();

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 8000,
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('handles network errors in login', async () => {
      mockRejection('Error de red');

      await expect(
        AuthService.login({ email: 'test@test.com', password: 'pass' })
      ).rejects.toThrow();
    });

    it('handles network errors in logout', async () => {
      mockRejection('Error de red');

      await expect(AuthService.logout()).rejects.toThrow();
    });

    it('handles network errors in me', async () => {
      mockRejection('Error de red');

      await expect(AuthService.me()).rejects.toThrow();
    });
  });

  describe('Spanish Error Messages', () => {
    it('uses Spanish error message for login', async () => {
      mockError();

      await expect(AuthService.login({ email: 'test@test.com', password: 'pass' })).rejects.toThrow(
        'Error al iniciar sesión'
      );
    });

    it('uses Spanish error message for logout', async () => {
      mockError();

      await expect(AuthService.logout()).rejects.toThrow('No se pudo cerrar la sesión');
    });

    it('uses Spanish error message for me', async () => {
      mockError();

      await expect(AuthService.me()).rejects.toThrow('Usuario no encontrado');
    });
  });
});
