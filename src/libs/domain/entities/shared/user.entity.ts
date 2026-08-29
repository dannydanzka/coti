/**
 * User Entity Functions - Global
 *
 *
 * Helper functions for User entity operations.
 * ONLY uses fields that exist in Prisma User model:
 * - id, email, passwordHash, name, role
 * - isActive, deletedAt, deletedBy
 * - createdAt, updatedAt, lastLoginAt
 *
 * Following DOMAIN-OBJECTS-STANDARDS: Entities = Business Objects (Persistent)
 */

import type { UserEntity } from '@entities';
import type { UserRole } from '@domain-types';

export const createUserEntity = (
  data: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>
): UserEntity => ({
  ...data,
  createdAt: new Date(),
  id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
  updatedAt: new Date(),
});

export const updateUserEntity = (entity: UserEntity, updates: Partial<UserEntity>): UserEntity => ({
  ...entity,
  ...updates,
  updatedAt: new Date(),
});

export const isUserActive = (user: UserEntity): boolean => {
  return user.isActive && user.deletedAt === null;
};

export const canUserLogin = (user: UserEntity): boolean => {
  return isUserActive(user);
};

export const getUserDisplayName = (user: UserEntity): string => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  return fullName || user.email.split('@')[0] || user.email;
};

export const hasRolePermission = (user: UserEntity, requiredRole: UserRole): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    admin: 2,
    owner: 3,
    participant: 1,
  };

  const userLevel = roleHierarchy[user.role];
  const requiredLevel = roleHierarchy[requiredRole];
  return userLevel >= requiredLevel;
};

export const deactivateUser = (user: UserEntity, deletedBy: string): UserEntity => {
  return updateUserEntity(user, {
    deletedAt: new Date(),
    deletedBy,
    isActive: false,
  });
};

export const activateUser = (user: UserEntity): UserEntity => {
  return updateUserEntity(user, {
    deletedAt: null,
    deletedBy: null,
    isActive: true,
  });
};

export const recordSuccessfulLogin = (user: UserEntity): UserEntity => {
  return updateUserEntity(user, {
    lastLoginAt: new Date(),
  });
};

export const getUserSecurityInfo = (
  user: UserEntity
): {
  isSecure: boolean;
  issues: string[];
  lastActivity: Date | null;
} => {
  const issues: string[] = [];

  if (!user.isActive) issues.push('Usuario inactivo');
  if (user.deletedAt !== null) issues.push('Usuario eliminado');
  if (!user.lastLoginAt) issues.push('Nunca se ha conectado');

  return {
    isSecure: issues.length === 0,
    issues,
    lastActivity: user.lastLoginAt,
  };
};

/**
 * Check if user can manage specific role
 * Owner can manage all roles
 * Admin can manage participants only
 * Participant cannot manage anyone
 */
export const canManageRole = (actor: UserEntity, targetRole: UserRole): boolean => {
  if (actor.role === 'owner') return true;
  if (actor.role === 'admin') return targetRole === 'participant';
  return false;
};

/**
 * Check if user is deleted (soft delete)
 */
export const isUserDeleted = (user: UserEntity): boolean => {
  return user.deletedAt !== null;
};

/**
 * Check if user is owner (platform lead)
 */
export const isOwner = (user: UserEntity): boolean => {
  return user.role === 'owner';
};

/**
 * Check if user is admin
 */
export const isAdmin = (user: UserEntity): boolean => {
  return user.role === 'admin';
};

/**
 * Check if user is participant
 */
export const isParticipant = (user: UserEntity): boolean => {
  return user.role === 'participant';
};
