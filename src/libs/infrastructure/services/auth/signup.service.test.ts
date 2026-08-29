/**
 * Signup Service Tests
 *
 * Essential tests for signup service layer with handleRequest integration.
 * Spanish locale, error handling, API contract validation.
 */

import { handleRequest } from '@helpers';
import { setupServiceMock } from '@testing/helpers';

import { SignupService } from './signup.service';

const { mockError, mockRejection, mockSuccess } = setupServiceMock();
vi.mock('@helpers/http/handleRequest/handleRequest', () => ({
  handleRequest: vi.fn(),
}));

describe('SignupService', () => {
  describe('register', () => {
    const mockSignupData = {
      email: 'maria.garcia@ejemplo.com',
      firstName: 'María',
      lastName: 'García López',
      password: 'SecurePass123!',
    };

    const mockResponse = {
      message: 'Cuenta creada exitosamente',
      user: {
        email: 'maria.garcia@ejemplo.com',
        id: 'user-123',
        name: 'María García López',
      },
    };

    it('successfully registers new user', async () => {
      mockSuccess(mockResponse);

      const result = await SignupService.register(mockSignupData);

      expect(handleRequest).toHaveBeenCalledWith({
        body: mockSignupData,
        endpoint: '/api/auth/signup',
        method: 'POST',
        timeout: 15000,
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('returns error on failed registration', async () => {
      mockError('El correo electrónico ya está registrado');

      const result = await SignupService.register(mockSignupData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('El correo electrónico ya está registrado');
    });

    it('uses correct timeout for registration', async () => {
      mockSuccess(mockResponse);

      await SignupService.register(mockSignupData);

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 15000,
        })
      );
    });
  });

  describe('resendVerification', () => {
    const mockEmailData = {
      email: 'maria.garcia@ejemplo.com',
    };

    it('successfully resends verification email', async () => {
      mockSuccess({ message: 'Email de verificación enviado' });

      const result = await SignupService.resendVerification(mockEmailData);

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          body: mockEmailData,
          customDefaultErrorMessage: 'Error al reenviar el email de verificación',
          endpoint: '/api/auth/resend-verification',
          method: 'POST',
          timeout: 10000,
        })
      );

      expect(result.success).toBe(true);
    });

    it('returns error when resend fails', async () => {
      mockError('Usuario no encontrado');

      const result = await SignupService.resendVerification(mockEmailData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Usuario no encontrado');
    });
  });

  describe('Error Handling', () => {
    it('handles network errors in register', async () => {
      mockRejection('Error de red');

      await expect(
        SignupService.register({
          email: 'test@test.com',
          firstName: 'Test',
          lastName: 'Usuario',
          password: 'pass',
        })
      ).rejects.toThrow();
    });

    it('handles network errors in resendVerification', async () => {
      mockRejection('Error de red');

      await expect(SignupService.resendVerification({ email: 'test@test.com' })).rejects.toThrow();
    });
  });
});
