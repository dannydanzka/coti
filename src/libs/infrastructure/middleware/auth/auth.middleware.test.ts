/**
 * AuthMiddleware Tests
 *
 * Essential smoke tests for authentication middleware.
 *
 */

vi.mock('jsonwebtoken', () => ({
  JsonWebTokenError: class JsonWebTokenError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'JsonWebTokenError';
    }
  },
  TokenExpiredError: class TokenExpiredError extends Error {
    public expiredAt: Date;
    constructor(message: string, expiredAt: Date) {
      super(message);
      this.name = 'TokenExpiredError';
      this.expiredAt = expiredAt;
    }
  },
  verify: vi.fn(),
}));

import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

import { USER_ROLES } from '@constants';

import { checkRequiredRoles, validateAdminRole, validateToken } from './auth.middleware';

const mockVerify = vi.mocked(verify);

describe('Auth Middleware', () => {
  beforeEach(() => {
    process.env['JWT_SECRET'] = 'test-secret-key';
  });

  afterEach(() => {
    delete process.env['JWT_SECRET'];
  });

  describe('validateToken', () => {
    it('should validate valid token with Spanish user data', async () => {
      mockVerify.mockImplementationOnce(() => ({
        email: 'maria.admin@dearadry.com',
        exp: Math.floor(Date.now() / 1000) + 3600,
        firstName: 'María',
        iat: Math.floor(Date.now() / 1000),
        isActive: true,
        lastName: 'Administrador López',
        role: USER_ROLES.ADMIN,
        userId: 'admin-maria-123',
      }));

      const mockRequest = {
        headers: new Map([['authorization', 'Bearer valid-jwt-token']]),
      } as unknown as NextRequest;

      const result = await validateToken(mockRequest);

      expect(result.success).toBe(true);
      expect(result.status).toBe(200);
      expect(result.user?.firstName).toBe('María');
      expect(result.user?.lastName).toBe('Administrador López');
      expect(result.user?.role).toBe(USER_ROLES.ADMIN);
    });

    it('should reject invalid requests', async () => {
      const noHeaderResult = await validateToken({ headers: new Map() } as unknown as NextRequest);
      expect(noHeaderResult.success).toBe(false);
      expect(noHeaderResult.error).toBe('Autenticación fallida');

      mockVerify.mockImplementationOnce(() => {
        throw new TokenExpiredError('jwt expired', new Date());
      });
      const expiredResult = await validateToken({
        headers: new Map([['authorization', 'Bearer expired']]),
      } as unknown as NextRequest);
      expect(expiredResult.success).toBe(false);
      expect(expiredResult.error).toBe('Token expirado');

      mockVerify.mockImplementationOnce(() => {
        throw new JsonWebTokenError('invalid token');
      });
      const invalidResult = await validateToken({
        headers: new Map([['authorization', 'Bearer invalid']]),
      } as unknown as NextRequest);
      expect(invalidResult.success).toBe(false);
      expect(invalidResult.error).toBe('Token inválido');
    });

    it('should handle user validation edge cases', async () => {
      const mockRequest = {
        headers: new Map([['authorization', 'Bearer valid-token']]),
      } as unknown as NextRequest;

      mockVerify.mockImplementationOnce(() => ({
        email: 'test@test.com',
        exp: Math.floor(Date.now() / 1000) + 3600,
        firstName: 'Usuario',
        iat: Math.floor(Date.now() / 1000),
        isActive: false,
        lastName: 'Desactivado',
        role: USER_ROLES.ADMIN,
        userId: 'user1',
      }));
      const deactivatedResult = await validateToken(mockRequest);
      expect(deactivatedResult.success).toBe(false);
      expect(deactivatedResult.error).toBe('Cuenta desactivada');

      mockVerify.mockImplementationOnce(() => ({
        email: 'test@test.com',
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
      }));
      const invalidPayloadResult = await validateToken(mockRequest);
      expect(invalidPayloadResult.success).toBe(false);
      expect(invalidPayloadResult.error).toBe('Token sin payload válido');
    });
  });

  describe('validateAdminRole', () => {
    it('should validate admin access and reject insufficient permissions', async () => {
      const mockRequest = {
        headers: new Map([['authorization', 'Bearer token']]),
      } as unknown as NextRequest;

      mockVerify.mockImplementationOnce(() => ({
        email: 'admin@test.com',
        exp: Math.floor(Date.now() / 1000) + 3600,
        firstName: 'Carlos',
        iat: Math.floor(Date.now() / 1000),
        isActive: true,
        lastName: 'Admin',
        role: USER_ROLES.OWNER,
        userId: 'admin1',
      }));
      const adminResult = await validateAdminRole(mockRequest);
      expect(adminResult.success).toBe(true);
      expect(adminResult.user?.role).toBe(USER_ROLES.OWNER);

      mockVerify.mockImplementationOnce(() => ({
        email: 'user@test.com',
        exp: Math.floor(Date.now() / 1000) + 3600,
        firstName: 'Ana',
        iat: Math.floor(Date.now() / 1000),
        isActive: true,
        lastName: 'User',
        role: USER_ROLES.PARTICIPANT,
        userId: 'user1',
      }));
      const userResult = await validateAdminRole(mockRequest);
      expect(userResult.success).toBe(false);
      expect(userResult.error).toBe('Permisos insuficientes');

      mockVerify.mockImplementationOnce(() => ({
        email: 'admin2@test.com',
        exp: Math.floor(Date.now() / 1000) + 3600,
        firstName: 'Patricia',
        iat: Math.floor(Date.now() / 1000),
        isActive: true,
        lastName: 'Admin',
        role: USER_ROLES.ADMIN,
        userId: 'admin2',
      }));
      const customResult = await validateAdminRole(mockRequest, [
        USER_ROLES.ADMIN,
        USER_ROLES.OWNER,
      ]);
      expect(customResult.success).toBe(true);
      expect(customResult.user?.role).toBe(USER_ROLES.ADMIN);
    });
  });

  describe('checkRequiredRoles', () => {
    it('should allow access with exact role match', () => {
      const organizerAuth = {
        status: 200,
        success: true,
        user: {
          email: 'organizer@test.com',
          firstName: 'María',
          id: 'org-1',
          lastName: 'Organizadora',
          organizerId: 'org-123',
          role: USER_ROLES.ADMIN,
        },
      };

      const result = checkRequiredRoles(organizerAuth, [USER_ROLES.ADMIN]);
      expect(result.success).toBe(true);
    });

    it('should allow access with higher role (hierarchy)', () => {
      const adminAuth = {
        status: 200,
        success: true,
        user: {
          email: 'admin@test.com',
          firstName: 'Carlos',
          id: 'admin-1',
          lastName: 'Admin',
          role: USER_ROLES.ADMIN,
        },
      };

      const result = checkRequiredRoles(adminAuth, [USER_ROLES.ADMIN]);
      expect(result.success).toBe(true);
    });

    it('should reject access with lower role', () => {
      const participantAuth = {
        status: 200,
        success: true,
        user: {
          email: 'participant@test.com',
          firstName: 'José',
          id: 'part-1',
          lastName: 'Participant',
          role: USER_ROLES.PARTICIPANT,
        },
      };

      const result = checkRequiredRoles(participantAuth, [USER_ROLES.ADMIN]);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Permisos insuficientes');
    });

    it('should allow access with multiple allowed roles', () => {
      const organizerAuth = {
        status: 200,
        success: true,
        user: {
          email: 'organizer@test.com',
          firstName: 'Ana',
          id: 'org-1',
          lastName: 'Organizadora',
          organizerId: 'org-456',
          role: USER_ROLES.ADMIN,
        },
      };

      const result = checkRequiredRoles(organizerAuth, [USER_ROLES.ADMIN, USER_ROLES.ADMIN]);
      expect(result.success).toBe(true);
    });

    it('should allow access with empty roles array (no restriction)', () => {
      const managerAuth = {
        status: 200,
        success: true,
        user: {
          email: 'manager@test.com',
          firstName: 'Luis',
          id: 'mgr-1',
          lastName: 'Manager',
          role: USER_ROLES.ADMIN,
        },
      };

      const result = checkRequiredRoles(managerAuth, []);
      expect(result.success).toBe(true);
    });

    it('should require authentication', () => {
      const failedAuth = { error: 'Token invalid', status: 401, success: false };
      const result = checkRequiredRoles(failedAuth, [USER_ROLES.ADMIN]);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Autenticación requerida');
    });

    it('should validate role hierarchy correctly', () => {
      const superAdminAuth = {
        status: 200,
        success: true,
        user: {
          email: 'superadmin@test.com',
          firstName: 'Super',
          id: 'sa-1',
          lastName: 'Admin',
          role: USER_ROLES.OWNER,
        },
      };

      expect(checkRequiredRoles(superAdminAuth, [USER_ROLES.OWNER]).success).toBe(true);
      expect(checkRequiredRoles(superAdminAuth, [USER_ROLES.ADMIN]).success).toBe(true);
      expect(checkRequiredRoles(superAdminAuth, [USER_ROLES.ADMIN]).success).toBe(true);
      expect(checkRequiredRoles(superAdminAuth, [USER_ROLES.ADMIN]).success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle system errors', async () => {
      const mockRequest = {
        headers: new Map([['authorization', 'Bearer token']]),
      } as unknown as NextRequest;

      delete process.env['JWT_SECRET'];
      const secretResult = await validateToken(mockRequest);
      expect(secretResult.success).toBe(false);
      expect(secretResult.error).toBe('Error de configuración del servidor');

      process.env['JWT_SECRET'] = 'test-secret';
      mockVerify.mockImplementationOnce(() => {
        throw new Error('Error inesperado');
      });
      const errorResult = await validateToken(mockRequest);
      expect(errorResult.success).toBe(false);
      expect(errorResult.error).toBe('Autenticación fallida');
    });
  });
});
