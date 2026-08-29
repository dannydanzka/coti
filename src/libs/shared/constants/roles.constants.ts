/**
 * Role Constants
 *
 * RBAC role definitions for the platform.
 * 3-tier hierarchy: OWNER (1) > ADMIN (N) > PARTICIPANT (unlimited).
 *
 */

import type { PrismaUserRole } from '@domain-types';

export const USER_ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner',
  PARTICIPANT: 'participant',
} as const;

export const USER_ROLES_ARRAY = Object.values(USER_ROLES);

export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.OWNER]: 'Propietario',
  [USER_ROLES.PARTICIPANT]: 'Participante',
} as const;

export const ROLE_HIERARCHY = {
  [USER_ROLES.OWNER]: 3,
  [USER_ROLES.ADMIN]: 2,
  [USER_ROLES.PARTICIPANT]: 1,
} as const;

/**
 * Prisma UserRole enum values
 * Maps to the Prisma schema enum UserRole { OWNER, ADMIN, PARTICIPANT }
 */
export const PRISMA_USER_ROLES = {
  ADMIN: 'ADMIN',
  OWNER: 'OWNER',
  PARTICIPANT: 'PARTICIPANT',
} as const;

/**
 * Map application role (lowercase) to Prisma enum (uppercase)
 */
export const mapRoleToPrisma = (role: string): PrismaUserRole => {
  const roleMap: Record<string, PrismaUserRole> = {
    admin: PRISMA_USER_ROLES.ADMIN,
    owner: PRISMA_USER_ROLES.OWNER,
    participant: PRISMA_USER_ROLES.PARTICIPANT,
  };
  return roleMap[role.toLowerCase()] ?? PRISMA_USER_ROLES.PARTICIPANT;
};

/**
 * Map Prisma enum (uppercase) to application role (lowercase)
 */
export const mapRoleFromPrisma = (prismaRole: PrismaUserRole): string => {
  const roleMap: Record<PrismaUserRole, string> = {
    [PRISMA_USER_ROLES.ADMIN]: USER_ROLES.ADMIN,
    [PRISMA_USER_ROLES.OWNER]: USER_ROLES.OWNER,
    [PRISMA_USER_ROLES.PARTICIPANT]: USER_ROLES.PARTICIPANT,
  };
  return roleMap[prismaRole] ?? USER_ROLES.PARTICIPANT;
};
