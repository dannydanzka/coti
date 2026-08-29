/**
 * Login Use Case Tests
 *
 * Tests authentication flow: validation, credentials, account status, JWT, errors.
 * Spanish locale mandatory.
 */

// ─── MOCKS ─────────────────────────────────────────────────────────
vi.mock('@repositories', () => ({
  authRepository: {
    authenticateUser: vi.fn(),
    updateLastLogin: vi.fn(),
  },
}));

vi.mock('@helpers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@helpers')>();
  return {
    ...actual,
    getEnvVar: vi.fn(),
    signToken: vi.fn(),
  };
});

// ─── IMPORTS ────────────────────────────────────────────────────────
import type { NextRequest } from 'next/server';

import { authRepository } from '@repositories';
import type { EnvVarOptions } from '@helpers';
import { expectFailure, expectSuccessData } from '@testing/helpers';
import { getEnvVar, signToken } from '@helpers';
import type { UserEntity } from '@interfaces';

import { executeLogin } from './login.use-case';
import type { LoginParams } from './login.interfaces';

// ─── TEST DATA ──────────────────────────────────────────────────────
const mockUser: UserEntity = {
  age: 30,
  bio: null,
  city: 'Ciudad de México',
  country: 'México',
  createdAt: new Date('2025-01-15'),
  deletedAt: null,
  deletedBy: null,
  email: 'maria.garcia@example.com',
  firstName: 'María',
  id: 'user-1',
  isActive: true,
  lastLoginAt: null,
  lastName: 'García López',
  neighborhood: null,
  number: null,
  passwordHash: 'hashed-password',
  phone: '+52 55 1234 5678',
  photoUrl: null,
  role: 'participant',
  state: 'CDMX',
  street: null,
  updatedAt: new Date('2025-01-15'),
  zipCode: null,
};

// ─── SETUP ──────────────────────────────────────────────────────────
const mockAuthRepo = vi.mocked(authRepository);
const mockGetEnvVar = vi.mocked(getEnvVar);
const mockSignToken = vi.mocked(signToken);

const validParams: LoginParams = {
  email: 'maria.garcia@example.com',
  password: 'SecureP@ss123!',
  request: {} as NextRequest,
};

// ─── TESTS ──────────────────────────────────────────────────────────
describe('executeLogin', () => {
  beforeEach(() => {
    mockGetEnvVar.mockImplementation((key: string, options?: EnvVarOptions) => {
      if (key === 'JWT_SECRET') return 'test-jwt-secret';
      if (key === 'SESSION_TIMEOUT') return '24h';
      return options?.defaultValue ?? undefined;
    });
    mockSignToken.mockReturnValue('mocked-jwt-token');
    mockAuthRepo.authenticateUser.mockResolvedValue(mockUser);
    mockAuthRepo.updateLastLogin.mockResolvedValue(undefined);
  });

  describe('Input Validation', () => {
    it('rejects missing email', async () => {
      expectFailure(await executeLogin({ ...validParams, email: '' }), 'Email');
    });

    it('rejects missing password', async () => {
      expectFailure(await executeLogin({ ...validParams, password: '' }), 'Contraseña');
    });

    it('rejects invalid email format', async () => {
      expectFailure(await executeLogin({ ...validParams, email: 'invalid-email' }));
    });

    it('rejects password shorter than 6 characters', async () => {
      expectFailure(await executeLogin({ ...validParams, password: '12345' }), '6 caracteres');
    });
  });

  describe('Authentication', () => {
    it('authenticates user with valid credentials', async () => {
      const data = expectSuccessData(await executeLogin(validParams));
      expect(data.token).toBe('mocked-jwt-token');
      expect(data.user.email).toBe('maria.garcia@example.com');
      expect(data.user.firstName).toBe('María');
      expect(data.expiresIn).toBe('24h');
    });

    it('normalizes email to lowercase', async () => {
      await executeLogin({ ...validParams, email: 'Maria.Garcia@Example.COM' });
      expect(mockAuthRepo.authenticateUser).toHaveBeenCalledWith({
        email: 'maria.garcia@example.com',
        password: 'SecureP@ss123!',
      });
    });

    it('returns error for invalid credentials', async () => {
      mockAuthRepo.authenticateUser.mockResolvedValueOnce(null);
      expectFailure(await executeLogin(validParams), 'Credenciales inválidas');
    });

    it('updates last login timestamp on success', async () => {
      await executeLogin(validParams);
      expect(mockAuthRepo.updateLastLogin).toHaveBeenCalledWith('user-1', expect.any(Date));
    });

    it('excludes passwordHash from response', async () => {
      const data = expectSuccessData(await executeLogin(validParams));
      expect(data.user).not.toHaveProperty('passwordHash');
    });
  });

  describe('Account Status', () => {
    it('rejects deactivated account', async () => {
      mockAuthRepo.authenticateUser.mockResolvedValueOnce({ ...mockUser, isActive: false });
      expectFailure(await executeLogin(validParams), 'Cuenta desactivada');
    });
  });

  describe('JWT Generation', () => {
    it('generates token with correct user payload', async () => {
      await executeLogin(validParams);
      expect(mockSignToken).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'maria.garcia@example.com',
          firstName: 'María',
          lastName: 'García López',
          role: 'participant',
          userId: 'user-1',
        }),
        'test-jwt-secret',
        { expiresIn: '24h' }
      );
    });

    it('returns error when JWT_SECRET is not configured', async () => {
      mockGetEnvVar.mockImplementationOnce((key: string, options?: EnvVarOptions) => {
        if (key === 'JWT_SECRET') return '';
        if (key === 'SESSION_TIMEOUT') return '24h';
        return options?.defaultValue ?? undefined;
      });
      expectFailure(await executeLogin(validParams));
    });
  });

  describe('Error Handling', () => {
    it('handles repository errors gracefully', async () => {
      mockAuthRepo.authenticateUser.mockRejectedValueOnce(new Error('Database connection failed'));
      expectFailure(await executeLogin(validParams));
    });
  });
});
