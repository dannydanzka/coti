/**
 * Signup Use Case Tests
 *
 * Essential tests for participant self-registration.
 * Coti Model: No email verification, immediate account access.
 * Spanish locale and comprehensive validation.
 */

vi.mock('@repositories', () => ({
  userRepository: {
    create: vi.fn().mockResolvedValue({
      email: 'maria.garcia@example.com',
      firstName: 'María',
      id: 'user-new',
      lastName: 'García López',
    }),
    findByEmail: vi.fn().mockResolvedValue(null),
  },
}));

vi.mock('@helpers', () => ({
  createValidationError: vi.fn().mockImplementation((error: string, field?: string) => ({
    error,
    field,
    success: false,
  })),
  getEnvVar: vi.fn().mockReturnValue('test-secret'),
  hashPassword: vi.fn().mockResolvedValue('hashed-password'),
  signToken: vi.fn().mockReturnValue('mock-jwt-token'),
}));

vi.mock('@use-case-error', async () => {
  const { resolveI18n } = await import('@i18n');
  return {
    UseCaseErrorResponse: class {},
    createValidationError: vi
      .fn()
      .mockImplementation(
        (
          input: string | { key: string; params?: Record<string, unknown>; fallback?: string },
          field?: string
        ) => {
          const error =
            typeof input === 'string'
              ? input
              : (input.fallback ?? resolveI18n(input.key, input.params, 'es'));
          return { error, field, success: false };
        }
      ),
    handleUseCaseError: vi.fn().mockReturnValue({ error: 'Error interno', success: false }),
  };
});

vi.mock('@email', () => ({
  ResendEmailService: {
    sendWelcomeEmail: vi.fn().mockResolvedValue(undefined),
  },
}));

import type { NextRequest } from 'next/server';

import { expectFailure, expectSuccessData } from '@testing/helpers';
import { userRepository } from '@repositories';

import { executeSignup } from './signup.use-case';
import type { SignupParams } from './signup.interfaces';

describe('executeSignup', () => {
  const mockRequest = {} as NextRequest;

  const validParams: SignupParams = {
    email: 'maria.garcia@example.com',
    firstName: 'María',
    lastName: 'García López',
    password: 'SecureP@ss123!',
    request: mockRequest,
  };
  describe('Input Validation', () => {
    it('rejects missing email', async () => {
      expectFailure(await executeSignup({ ...validParams, email: '' }), 'Email');
    });

    it('rejects invalid email format', async () => {
      expectFailure(await executeSignup({ ...validParams, email: 'invalid-email' }), 'formato');
    });

    it('rejects missing firstName', async () => {
      expectFailure(await executeSignup({ ...validParams, firstName: '' }), 'nombre');
    });

    it('rejects firstName shorter than 2 characters', async () => {
      expectFailure(await executeSignup({ ...validParams, firstName: 'A' }), '2 caracteres');
    });
  });

  describe('Password Validation', () => {
    it('rejects missing password', async () => {
      expectFailure(await executeSignup({ ...validParams, password: '' }), 'Contraseña');
    });

    it('rejects password shorter than 8 characters', async () => {
      expectFailure(await executeSignup({ ...validParams, password: 'Abc1@' }), '8 caracteres');
    });

    it('rejects password without uppercase', async () => {
      expectFailure(
        await executeSignup({ ...validParams, password: 'securepass123!' }),
        'mayúscula'
      );
    });

    it('rejects password without lowercase', async () => {
      expectFailure(
        await executeSignup({ ...validParams, password: 'SECUREPASS123!' }),
        'minúscula'
      );
    });

    it('rejects password without number', async () => {
      expectFailure(await executeSignup({ ...validParams, password: 'SecurePass!@#' }), 'número');
    });

    it('rejects password without special character', async () => {
      expectFailure(
        await executeSignup({ ...validParams, password: 'SecurePass123' }),
        'carácter especial'
      );
    });
  });

  describe('lastName Validation', () => {
    it('rechaza lastName vacío', async () => {
      expectFailure(await executeSignup({ ...validParams, lastName: '' }));
    });

    it('rechaza lastName menor a 2 caracteres', async () => {
      expectFailure(await executeSignup({ ...validParams, lastName: 'G' }));
    });
  });

  describe('Email Availability', () => {
    it('rechaza email duplicado', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValueOnce({ id: 'existing-user' } as never);
      expectFailure(await executeSignup(validParams));
    });
  });

  describe('Successful Signup', () => {
    it('crea usuario exitosamente', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValueOnce(null);
      vi.mocked(userRepository.create).mockResolvedValueOnce({
        email: 'maria.garcia@example.com',
        firstName: 'María',
        id: 'user-new',
        lastName: 'García López',
      } as never);

      const data = expectSuccessData(await executeSignup(validParams));
      expect(data?.email).toBe('maria.garcia@example.com');
      expect(data?.firstName).toBe('María');
    });

    it('envía email de bienvenida', async () => {
      const { ResendEmailService } = await import('@email');
      expectSuccessData(await executeSignup(validParams));
      expect(ResendEmailService.sendWelcomeEmail).toHaveBeenCalled();
    });
  });
});
