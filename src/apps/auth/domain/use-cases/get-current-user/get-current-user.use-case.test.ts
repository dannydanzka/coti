/**
 * Get Current User Use Case Tests
 *
 * Tests profile retrieval: token extraction, JWT verification, user lookup, account status.
 * Spanish locale mandatory.
 */

// ─── MOCKS ─────────────────────────────────────────────────────────
vi.mock('@repositories', () => ({
  authRepository: {
    findUserById: vi.fn(),
  },
}));

vi.mock('@helpers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@helpers')>();
  return {
    ...actual,
    getEnvVar: vi.fn(),
    verifyToken: vi.fn(),
  };
});

// ─── IMPORTS ────────────────────────────────────────────────────────
import type { NextRequest } from 'next/server';

import { authRepository } from '@repositories';
import { expectFailure, expectSuccessData } from '@testing/helpers';
import { getEnvVar, verifyToken } from '@helpers';
import type { UserEntity } from '@interfaces';

import { executeGetCurrentUser } from './get-current-user.use-case';

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
  lastLoginAt: new Date('2025-03-01'),
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

const mockJWTPayload = {
  email: 'maria.garcia@example.com',
  exp: 1700000000,
  firstName: 'María',
  iat: 1699913600,
  isActive: true,
  lastName: 'García López',
  role: 'participant',
  userId: 'user-1',
};

// ─── SETUP ──────────────────────────────────────────────────────────
const mockAuthRepo = vi.mocked(authRepository);
const mockGetEnvVar = vi.mocked(getEnvVar);
const mockVerifyToken = vi.mocked(verifyToken);

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.valid-token-payload.signature';

const createMockRequest = (authHeader?: string): NextRequest => {
  const headers = new Map<string, string>();
  if (authHeader) {
    headers.set('authorization', authHeader);
  }
  return {
    headers: {
      get: (name: string) => headers.get(name.toLowerCase()) || null,
    },
  } as unknown as NextRequest;
};

// ─── TESTS ──────────────────────────────────────────────────────────
describe('executeGetCurrentUser', () => {
  beforeEach(() => {
    mockGetEnvVar.mockImplementation((key: string) => {
      if (key === 'JWT_SECRET') return 'test-jwt-secret';
      return undefined;
    });
    mockVerifyToken.mockReturnValue({ payload: mockJWTPayload, valid: true });
    mockAuthRepo.findUserById.mockResolvedValue(mockUser);
  });

  describe('Token Extraction', () => {
    it('rejects request without authorization header', async () => {
      expectFailure(await executeGetCurrentUser({ request: createMockRequest() }), 'autorización');
    });

    it('rejects non-Bearer token format', async () => {
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest('Basic token123') }),
        'Bearer'
      );
    });

    it('rejects empty Bearer token', async () => {
      expectFailure(await executeGetCurrentUser({ request: createMockRequest('Bearer ') }));
    });

    it('rejects token shorter than 10 characters', async () => {
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest('Bearer abc') }),
        'corto'
      );
    });

    it('rejects token longer than 2000 characters', async () => {
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${'a'.repeat(2001)}`) }),
        'largo'
      );
    });
  });

  describe('Input Validation', () => {
    it('rejects null params', async () => {
      expectFailure(await executeGetCurrentUser(null as never));
    });

    it('rejects request without headers function', async () => {
      expectFailure(
        await executeGetCurrentUser({ request: { headers: {} } as unknown as NextRequest }),
        'headers'
      );
    });
  });

  describe('JWT Verification', () => {
    it('returns user profile with valid token', async () => {
      const data = expectSuccessData(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
      expect(data.user.email).toBe('maria.garcia@example.com');
      expect(data.user.firstName).toBe('María');
      expect(data.session.sessionType).toBe('jwt_stateless');
    });

    it('rejects expired or invalid JWT', async () => {
      mockVerifyToken.mockReturnValueOnce({ error: 'Token expirado', valid: false });
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
    });

    it('rejects token with missing userId', async () => {
      mockVerifyToken.mockReturnValueOnce({
        payload: { ...mockJWTPayload, userId: '' },
        valid: true,
      });
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
    });

    it('rejects token with missing email', async () => {
      mockVerifyToken.mockReturnValueOnce({
        payload: { ...mockJWTPayload, email: '' },
        valid: true,
      });
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
    });

    it('rejects token with missing role', async () => {
      mockVerifyToken.mockReturnValueOnce({
        payload: { ...mockJWTPayload, role: '' },
        valid: true,
      });
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
    });

    it('returns error when JWT_SECRET is not configured', async () => {
      mockGetEnvVar.mockReturnValueOnce('');
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
    });
  });

  describe('User Lookup & Account Status', () => {
    it('returns error when user not found in database', async () => {
      mockAuthRepo.findUserById.mockResolvedValueOnce(null);
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
    });

    it('rejects deactivated account', async () => {
      mockAuthRepo.findUserById.mockResolvedValueOnce({ ...mockUser, isActive: false });
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) }),
        'Cuenta desactivada'
      );
    });

    it('excludes passwordHash from response', async () => {
      const data = expectSuccessData(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
      expect(data.user).not.toHaveProperty('passwordHash');
    });

    it('includes session metadata with token timestamps', async () => {
      const data = expectSuccessData(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
      expect(data.session).toEqual({
        sessionType: 'jwt_stateless',
        tokenExpiresAt: 1700000000,
        tokenIssuedAt: 1699913600,
      });
    });
  });

  describe('Error Handling', () => {
    it('handles repository errors gracefully', async () => {
      mockAuthRepo.findUserById.mockRejectedValueOnce(new Error('Error de base de datos'));
      expectFailure(
        await executeGetCurrentUser({ request: createMockRequest(`Bearer ${VALID_TOKEN}`) })
      );
    });
  });
});
