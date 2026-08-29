/**
 * Admin User Mapper
 *
 * Domain mappers for admin user entity transformations.
 * Handles conversion between API responses and domain entities.
 *
 */
import type { UserApiData, UserEntity } from '@interfaces';

/**
 * Transform API response data to UserEntity domain entity.
 * Note: passwordHash is empty as API should never expose it.
 * Note: deletedAt/deletedBy default to null for active users.
 * Note: Address fields not exposed in basic API response (security).
 */
export const transformUser = (userData: UserApiData): UserEntity => ({
  age: null,
  bio: null,
  city: userData.city ?? null,
  country: null,
  createdAt: new Date(userData.createdAt),
  deletedAt: null,
  deletedBy: null,
  email: userData.email,
  firstName: userData.firstName,
  id: userData.id,
  isActive: userData.isActive,
  lastLoginAt: userData.lastLoginAt ? new Date(userData.lastLoginAt) : null,
  lastName: userData.lastName,
  neighborhood: null,
  number: null,
  passwordHash: '',
  phone: userData.phone ?? null,
  photoUrl: null,
  role: userData.role,
  state: userData.state ?? null,
  street: null,
  updatedAt: new Date(userData.updatedAt),
  zipCode: null,
});

/**
 * Transform full API response (admin context) to UserEntity
 * Includes all fields except passwordHash
 */
export const transformUserFull = (userData: Omit<UserEntity, 'passwordHash'>): UserEntity => ({
  ...userData,
  createdAt: new Date(userData.createdAt),
  deletedAt: userData.deletedAt ? new Date(userData.deletedAt) : null,
  lastLoginAt: userData.lastLoginAt ? new Date(userData.lastLoginAt) : null,
  passwordHash: '',
  updatedAt: new Date(userData.updatedAt),
});
