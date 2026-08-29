/**
 * Auth Utilities Interfaces
 *
 * Type definitions for auth utilities.
 */

import type { UserRole } from '@domain-types';

/**
 * Current user data extracted from JWT token.
 */
export interface CurrentUser {
  email: string;
  isActive: boolean;
  name: string;
  role: UserRole;
  userId: string;
}
