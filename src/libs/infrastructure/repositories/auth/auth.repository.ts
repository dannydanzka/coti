/**
 * Auth Repository - Prisma Implementation
 *
 * Infrastructure layer implementation of AuthRepository contract.
 * Uses Prisma with Supabase PostgreSQL.
 * Context7 Clean Architecture pattern with object literal export.
 *
 */

import bcryptjs from 'bcryptjs';

import type { AuthCredentials, AuthRepository, AuthSessionEntity, UserEntity } from '@interfaces';
import { logError } from '@logger';
import { mapRoleFromPrisma } from '@constants';
import { prisma } from '@database';
import type { PrismaUserRole, UserRole } from '@domain-types';

const generateSessionId = (): string =>
  `auth_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

const handleAuthError = (operation: string, error: unknown): never => {
  logError(error, `authRepository.${operation}`);
  throw error instanceof Error
    ? error
    : new Error(`Error en operación de autenticación: ${operation}`);
};

/**
 * Transform Prisma User to UserEntity interface
 */
const transformPrismaUserToUserEntity = (user: {
  age: number | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  createdAt: Date;
  deletedAt: Date | null;
  deletedBy: string | null;
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  lastName: string;
  lastLoginAt: Date | null;
  neighborhood: string | null;
  number: string | null;
  passwordHash: string;
  phone: string | null;
  photoUrl: string | null;
  role: PrismaUserRole;
  state: string | null;
  street: string | null;
  updatedAt: Date;
  zipCode: string | null;
}): UserEntity => ({
  age: user.age,
  bio: user.bio,
  city: user.city,
  country: user.country,
  createdAt: user.createdAt,
  deletedAt: user.deletedAt ?? null,
  deletedBy: user.deletedBy ?? null,
  email: user.email,
  firstName: user.firstName,
  id: user.id,
  isActive: user.isActive,
  lastLoginAt: user.lastLoginAt,
  lastName: user.lastName,
  neighborhood: user.neighborhood,
  number: user.number,
  passwordHash: user.passwordHash,
  phone: user.phone,
  photoUrl: user.photoUrl,
  role: mapRoleFromPrisma(user.role) as UserRole,
  state: user.state,
  street: user.street,
  updatedAt: user.updatedAt,
  zipCode: user.zipCode,
});

export const authRepository: AuthRepository = {
  authenticateUser: async (credentials: AuthCredentials): Promise<UserEntity | null> => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          deletedAt: null,
          email: credentials.email.toLowerCase(),
          isActive: true,
        },
      });

      if (!user) return null;

      const isValidPassword = await bcryptjs.compare(credentials.password, user.passwordHash);
      if (!isValidPassword) return null;

      return transformPrismaUserToUserEntity(user);
    } catch (err) {
      return handleAuthError('authenticateUser', err);
    }
  },
  createSession: async (
    userId: string,
    token: string,
    expiresAt: Date,
    ipAddress: string,
    userAgent?: string
  ): Promise<AuthSessionEntity> => {
    try {
      const session: AuthSessionEntity = {
        createdAt: new Date(),
        expiresAt,
        id: generateSessionId(),
        ipAddress,
        isActive: true,
        lastUsedAt: new Date(),
        revokedAt: null,
        status: 'active',
        token,
        updatedAt: new Date(),
        userAgent,
        userId,
      };

      return session;
    } catch (err) {
      return handleAuthError('createSession', err);
    }
  },
  findSessionByToken: async (): Promise<AuthSessionEntity | null> => {
    return null;
  },
  findUserById: async (userId: string): Promise<UserEntity | null> => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          deletedAt: null,
          id: userId,
          isActive: true,
        },
      });

      if (!user) return null;

      return transformPrismaUserToUserEntity(user);
    } catch (err) {
      return handleAuthError('findUserById', err);
    }
  },
  invalidateSession: async (): Promise<void> => {},
  updateLastLogin: async (userId: string, timestamp: Date): Promise<void> => {
    try {
      await prisma.user.update({
        data: { lastLoginAt: timestamp },
        where: { id: userId },
      });
    } catch (err) {
      return handleAuthError('updateLastLogin', err);
    }
  },
};
