/**
 * Auth Session Interfaces
 *
 * All types and interfaces for authentication session entity.
 * Following DOMAIN-OBJECTS-STANDARDS: Types/Interfaces ONLY in .interfaces.ts files.
 *
 */

import type { AuthSessionStatus } from '@domain-types';

export interface AuthSessionEntity {
  id: string;

  userId: string;
  token: string;
  status: AuthSessionStatus;

  ipAddress: string;
  userAgent?: string;
  deviceInfo?: string;

  isActive: boolean;
  expiresAt: Date;
  lastUsedAt: Date;
  revokedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}
