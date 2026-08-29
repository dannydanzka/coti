/**
 * User Entity - DearAdry Platform
 *
 * SINGLE SOURCE OF TRUTH based on Prisma schema.
 * NO email verification (immediate access after signup).
 * Address stored in User model (copied to Enrollment on enrollment).
 * 3 roles: owner (1), admin (N), participant (unlimited).
 *
 * @pattern Clean Architecture - Domain Entity
 * @context DearAdry (User Management)
 * @prisma model User
 */

import type { UserRole } from '@domain-types';

/**
 * User Entity - Exact match with Prisma User model
 *
 * Prisma fields:
 * - id, email, passwordHash
 * - firstName, lastName (separated for business requirements)
 * - Address fields: street?, number?, neighborhood?, city?, state?, zipCode?, country?
 * - Profile fields: phone?, age?, photoUrl?, bio?
 * - role, isActive, deletedAt?, deletedBy?
 * - createdAt, updatedAt, lastLoginAt?
 */
export interface UserEntity {
  id: string;
  email: string;
  passwordHash: string;

  firstName: string;
  lastName: string;

  street: string | null;
  number: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;

  phone: string | null;
  age: number | null;
  photoUrl: string | null;
  bio: string | null;

  role: UserRole;

  isActive: boolean;
  deletedAt: Date | null;
  deletedBy: string | null;

  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
}

/**
 * Computed property: Get user's full name
 */
export const getUserFullName = (user: UserEntity): string => {
  return `${user.firstName} ${user.lastName}`.trim();
};

/**
 * Minimal user data required for address validation
 * Supports both UserEntity and serialized user data from Redux
 */
interface UserAddressFields {
  city: string | null;
  state: string | null;
  street: string | null;
  zipCode: string | null;
}

/**
 * Validation: Check if user has complete address (required for enrollment)
 * Works with both UserEntity and SerializableAuthUser (Redux serialized data)
 */
export const hasCompleteAddress = (user: UserAddressFields): boolean => {
  return Boolean(user.street && user.city && user.state && user.zipCode);
};

/**
 * Address type for form submissions and temporary storage
 * Matches User model address fields
 */
export interface AddressData {
  city: string;
  country: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  zipCode: string;
}
