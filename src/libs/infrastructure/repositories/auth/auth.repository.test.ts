/**
 * Auth Repository Tests
 *
 * Tests for Prisma-based auth repository implementation.
 * Uses mocked Prisma client for isolated testing.
 */

vi.mock('@database', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock('bcryptjs', () => ({
  compare: vi.fn(),
  default: {
    compare: vi.fn(),
  },
}));

import bcryptjs from 'bcryptjs';

import { prisma } from '@database';

import { authRepository } from './auth.repository';

const prismaMock = vi.mocked(prisma);
const bcryptMock = vi.mocked(bcryptjs);

const mockUser = {
  age: 30,
  bio: 'Descripción de prueba',
  city: 'Ciudad de México',
  country: 'México',
  createdAt: new Date(),
  deletedAt: null,
  deletedBy: null,
  email: 'maria@ejemplo.com',
  firstName: 'María',
  id: 'user-1',
  isActive: true,
  lastLoginAt: new Date(),
  lastName: 'García',
  neighborhood: 'Coyoacán',
  number: '123',
  passwordHash: 'hashed-password',
  phone: '+521234567890',
  photoUrl: null,
  role: 'PARTICIPANT' as const,
  state: 'CDMX',
  street: 'Calle Principal',
  updatedAt: new Date(),
  zipCode: '04000',
};

describe('authRepository', () => {
  describe('authenticateUser', () => {
    it('debería autenticar usuario con credenciales válidas', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
      vi.mocked(bcryptMock.compare).mockResolvedValueOnce(true as never);

      const result = await authRepository.authenticateUser({
        email: 'maria@ejemplo.com',
        password: 'password123',
      });

      expect(result).toBeDefined();
      expect(result?.email).toBe('maria@ejemplo.com');
      expect(result?.firstName).toBe('María');
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          deletedAt: null,
          email: 'maria@ejemplo.com',
          isActive: true,
        },
      });
    });

    it('debería retornar null para usuario inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      const result = await authRepository.authenticateUser({
        email: 'noexiste@ejemplo.com',
        password: 'password123',
      });

      expect(result).toBeNull();
    });

    it('debería retornar null para contraseña incorrecta', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);
      vi.mocked(bcryptMock.compare).mockResolvedValueOnce(false as never);

      const result = await authRepository.authenticateUser({
        email: 'maria@ejemplo.com',
        password: 'wrong-password',
      });

      expect(result).toBeNull();
    });
  });

  describe('findUserById', () => {
    it('debería encontrar usuario por ID', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(mockUser);

      const result = await authRepository.findUserById('user-1');

      expect(result).toBeDefined();
      expect(result?.id).toBe('user-1');
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          deletedAt: null,
          id: 'user-1',
          isActive: true,
        },
      });
    });

    it('debería retornar null para ID inexistente', async () => {
      vi.mocked(prismaMock.user.findUnique).mockResolvedValueOnce(null);

      const result = await authRepository.findUserById('user-inexistente');

      expect(result).toBeNull();
    });
  });

  describe('updateLastLogin', () => {
    it('debería actualizar fecha de último login', async () => {
      const timestamp = new Date();
      vi.mocked(prismaMock.user.update).mockResolvedValueOnce({
        ...mockUser,
        lastLoginAt: timestamp,
      });

      await authRepository.updateLastLogin('user-1', timestamp);

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        data: { lastLoginAt: timestamp },
        where: { id: 'user-1' },
      });
    });
  });

  describe('createSession', () => {
    it('debería crear nueva sesión', async () => {
      const expiresAt = new Date(Date.now() + 86400000);

      const result = await authRepository.createSession(
        'user-1',
        'jwt-token',
        expiresAt,
        '127.0.0.1',
        'Mozilla/5.0'
      );

      expect(result).toBeDefined();
      expect(result.userId).toBe('user-1');
      expect(result.token).toBe('jwt-token');
      expect(result.ipAddress).toBe('127.0.0.1');
      expect(result.userAgent).toBe('Mozilla/5.0');
      expect(result.status).toBe('active');
      expect(result.isActive).toBe(true);
    });
  });

  describe('findSessionByToken', () => {
    it('debería retornar null (no implementado)', async () => {
      const result = await authRepository.findSessionByToken('jwt-token');

      expect(result).toBeNull();
    });
  });

  describe('invalidateSession', () => {
    it('debería completar sin error (no implementado)', async () => {
      await expect(authRepository.invalidateSession('session-id')).resolves.not.toThrow();
    });
  });
});
