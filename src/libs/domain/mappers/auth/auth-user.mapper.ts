/**
 * Auth User Mapper
 *
 * Domain mappers for auth user entity transformations.
 * Converts API responses to Redux-serializable format (ISO strings for dates).
 * Aligned with Prisma User model.
 */

import type { AuthUserApiData, UserApiData } from '@interfaces';
import type { SerializableAuthUser } from '@redux';

const FALLBACK_DATE = '1970-01-01T00:00:00.000Z';

/**
 * Transform API response data to SerializableAuthUser for Redux state.
 * Converts Date objects to ISO strings for Redux serialization.
 * ONLY includes fields from Prisma User model.
 */
export const transformAuthUser = (
  userData: UserApiData | AuthUserApiData
): SerializableAuthUser => {
  const toISOString = (value: string | Date | null | undefined): string | null => {
    if (!value) return null;
    return value instanceof Date ? value.toISOString() : value;
  };

  const extendedData = userData as UserApiData & {
    street?: string | null;
    number?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
    country?: string | null;
    age?: number | null;
    photoUrl?: string | null;
    bio?: string | null;
  };

  return {
    age: extendedData.age ?? null,
    bio: extendedData.bio ?? null,
    city: extendedData.city ?? null,
    country: extendedData.country ?? null,
    createdAt: toISOString(userData.createdAt) || FALLBACK_DATE,
    deletedAt: null,
    deletedBy: null,
    email: userData.email,
    firstName: userData.firstName,
    id: userData.id,
    isActive: userData.isActive,
    lastLoginAt: toISOString(userData.lastLoginAt),
    lastName: userData.lastName,
    neighborhood: extendedData.neighborhood ?? null,
    number: extendedData.number ?? null,
    passwordHash: '',
    phone: extendedData.phone ?? null,
    photoUrl: extendedData.photoUrl ?? null,
    role: userData.role,
    state: extendedData.state ?? null,
    street: extendedData.street ?? null,
    updatedAt: toISOString(userData.updatedAt) || FALLBACK_DATE,
    zipCode: extendedData.zipCode ?? null,
  };
};
