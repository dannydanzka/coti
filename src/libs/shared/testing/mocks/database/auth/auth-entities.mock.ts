/**
 * Auth Entities Mock Data
 *
 * ES6+ functional patterns for authentication domain entities.
 * Factory functions for dynamic mock creation with Spanish data.
 */

import type {
  AuthCredentials,
  AuthSessionEntity,
  AuthTokenEntity,
  AuthTokenGenerationRequest,
  AuthTokenPayload,
  AuthTokenValidation,
  UserEntity,
} from '@interfaces';
import { HTTP_STATUS } from '@constants';
import type { UserRole } from '@domain-types';

// Auth result type (local definition for mocks)
interface AuthResult {
  expiresAt: Date;
  status: number;
  success: boolean;
  token: string;
  user: UserEntity;
}

// Factory function for creating auth users
const createUserEntity = (overrides = {}): UserEntity => ({
  age: null,
  bio: null,
  city: null,
  country: 'México',
  createdAt: new Date('2025-01-10T08:00:00Z'),
  deletedAt: null,
  deletedBy: null,
  email: 'user@dearadry.com',
  firstName: 'Usuario',
  id: 'user-default',
  isActive: true,
  lastLoginAt: new Date('2025-01-15T09:30:00Z'),
  lastName: 'Default',
  neighborhood: null,
  number: null,
  passwordHash: '$2b$10$u0oSBAPQ0blC5PKUzxWJC.0iq4/CQlGVUz5msQb/A.KWmWdZXEpFS', // admin123
  phone: null,
  photoUrl: null,
  role: 'admin' as UserRole,
  state: null,
  street: null,
  updatedAt: new Date('2025-01-15T09:30:00Z'),
  zipCode: null,
  ...overrides,
});

// ==================== MAIN USERS FOR LOGIN ====================
// Password for all: admin123

export const mockUserEntityOwner = createUserEntity({
  createdAt: new Date('2024-01-01T08:00:00Z'),
  email: 'danny.danzka21@gmail.com',
  firstName: 'Danny',
  id: 'owner-danny-id',
  lastLoginAt: new Date('2025-11-28T09:00:00Z'),
  lastName: 'Ramírez',
  passwordHash: '$2b$10$u0oSBAPQ0blC5PKUzxWJC.0iq4/CQlGVUz5msQb/A.KWmWdZXEpFS', // admin123
  role: 'owner',
  updatedAt: new Date('2024-01-01T08:00:00Z'),
});

export const mockUserEntityAdmin = createUserEntity({
  createdAt: new Date('2024-01-15T09:00:00Z'),
  email: 'admin@dearadry.com',
  firstName: 'Admin',
  id: 'admin-1-id',
  lastLoginAt: new Date('2025-11-27T14:30:00Z'),
  lastName: 'DearAdry',
  passwordHash: '$2b$10$u0oSBAPQ0blC5PKUzxWJC.0iq4/CQlGVUz5msQb/A.KWmWdZXEpFS', // admin123
  role: 'admin',
  updatedAt: new Date('2024-01-15T09:00:00Z'),
});

export const mockUserEntityMaria = createUserEntity({
  createdAt: new Date('2024-03-01T12:00:00Z'),
  email: 'maria.garcia@example.com',
  firstName: 'María',
  id: 'user-maria-001',
  lastLoginAt: new Date('2025-11-27T18:00:00Z'),
  lastName: 'García López',
  passwordHash: '$2b$10$u0oSBAPQ0blC5PKUzxWJC.0iq4/CQlGVUz5msQb/A.KWmWdZXEpFS', // admin123
  role: 'participant',
  updatedAt: new Date('2024-03-01T12:00:00Z'),
});

export const mockUserEntityJose = createUserEntity({
  createdAt: new Date('2024-03-05T13:00:00Z'),
  email: 'jose.martinez@example.com',
  firstName: 'José',
  id: 'user-jose-002',
  lastLoginAt: new Date('2025-11-27T17:30:00Z'),
  lastName: 'Martínez Ruiz',
  passwordHash: '$2b$10$u0oSBAPQ0blC5PKUzxWJC.0iq4/CQlGVUz5msQb/A.KWmWdZXEpFS', // admin123
  role: 'participant',
  updatedAt: new Date('2024-03-05T13:00:00Z'),
});

export const mockUserEntityInactive = createUserEntity({
  createdAt: new Date('2025-01-05T15:00:00Z'),
  email: 'carlos.inactivo@dearadry.com',
  firstName: 'Carlos',
  id: 'user-inactive-999',
  isActive: false,
  lastLoginAt: new Date('2025-01-10T14:00:00Z'),
  lastName: 'Usuario Inactivo',
  passwordHash: '$2b$10$u0oSBAPQ0blC5PKUzxWJC.0iq4/CQlGVUz5msQb/A.KWmWdZXEpFS', // admin123
  role: 'participant',
  updatedAt: new Date('2025-01-14T16:00:00Z'),
});

// ==================== DEARADRY DEV TEST USER ====================
// Full test data: completed event + active event + premium kit
export const mockUserEntityDearAdryDev = createUserEntity({
  age: 32,
  bio: 'Apasionado del running y el bienestar emocional',
  city: 'Ciudad de México',
  country: 'México',
  createdAt: new Date('2024-08-15T10:00:00Z'),
  email: 'dearadrydev@gmail.com',
  firstName: 'Developer',
  id: 'user-dearadry-dev-001',
  lastLoginAt: new Date('2025-12-24T08:00:00Z'),
  lastName: 'DearAdry',
  neighborhood: 'Roma Norte',
  passwordHash: '$2b$10$u0oSBAPQ0blC5PKUzxWJC.0iq4/CQlGVUz5msQb/A.KWmWdZXEpFS', // admin123
  phone: '+52 55 1234 5678',
  role: 'participant',
  state: 'CDMX',
  street: 'Av. Álvaro Obregón 123',
  updatedAt: new Date('2025-12-24T08:00:00Z'),
  zipCode: '06700',
});

export const mockValidCredentials: AuthCredentials = {
  email: 'ana.martinez@dearadry.com',
  password: 'SecurePass123!',
};

export const mockInvalidCredentials: AuthCredentials = {
  email: 'invalid@dearadry.com',
  password: 'wrongpassword',
};

export const mockWeakPasswordCredentials: AuthCredentials = {
  email: 'carlos.garcia@dearadry.com',
  password: '123',
};

export const mockValidCredentialsAdminDemo: AuthCredentials = {
  email: 'admin.demo@dearadry.com',
  password: 'DemoAdminPass123!',
};

export const mockValidCredentialsManagerDemo: AuthCredentials = {
  email: 'manager.demo@dearadry.com',
  password: 'DemoManagerPass123!',
};

export const mockValidCredentialsManagerGeneral: AuthCredentials = {
  email: 'carlos.garcia@dearadry.com',
  password: 'ManagerGeneralPass123!',
};

export const mockAuthResultAdmin: AuthResult = {
  expiresAt: new Date('2025-01-16T09:30:00Z'),
  status: HTTP_STATUS.OK,
  success: true,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWFkbWluLWFuYTEyMyIsInNpZCI6InNlc3Npb24tYW5hLWFjdGl2ZSIsImlhdCI6MTczNjkzNDYwMCwiZXhwIjoxNzM2OTQ5MDAwLCJyb2xlIjoiYWRtaW4ifQ.admin_token_signature',
  user: mockUserEntityAdmin,
};

export const mockAuthResultOwner: AuthResult = {
  expiresAt: new Date('2025-01-16T08:15:00Z'),
  status: HTTP_STATUS.OK,
  success: true,
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvd25lci1kYW5ueS1pZCIsInNpZCI6InNlc3Npb24tb3duZXItYWN0aXZlIiwiaWF0IjoxNzM2OTI3NzAwLCJleHAiOjE3MzY5NDIxMDAsInJvbGUiOiJvd25lciJ9.owner_token_signature',
  user: mockUserEntityOwner,
};

export const mockAuthTokenAccess: AuthTokenEntity = {
  audience: 'app-web',
  createdAt: new Date('2025-01-15T09:30:00Z'),
  expiresAt: new Date('2025-01-16T09:30:00Z'),
  id: 'token-access-ana-123',
  isRevoked: false,
  issuedAt: new Date('2025-01-15T09:30:00Z'),
  issuer: 'dearadry.com',
  jwtId: 'jwt-ana-access-123',
  revokedAt: null,
  sessionId: 'session-ana-active',
  type: 'access',
  updatedAt: new Date('2025-01-15T09:30:00Z'),
  userId: 'user-admin-ana123',
  value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.access_token_payload.signature',
};

export const mockAuthTokenRefresh: AuthTokenEntity = {
  audience: 'app-web',
  createdAt: new Date('2025-01-15T09:30:00Z'),
  expiresAt: new Date('2025-01-22T09:30:00Z'),
  id: 'token-refresh-ana-456',
  isRevoked: false,
  issuedAt: new Date('2025-01-15T09:30:00Z'),
  issuer: 'dearadry.com',
  jwtId: 'jwt-ana-refresh-456',
  revokedAt: null,
  sessionId: 'session-ana-active',
  type: 'refresh',
  updatedAt: new Date('2025-01-15T09:30:00Z'),
  userId: 'user-admin-ana123',
  value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh_token_payload.refresh_signature',
};

export const mockAuthTokenExpired: AuthTokenEntity = {
  audience: 'app-web',
  createdAt: new Date('2025-01-13T09:30:00Z'),
  expiresAt: new Date('2025-01-14T09:30:00Z'),
  id: 'token-expired-789',
  isRevoked: false,
  issuedAt: new Date('2025-01-13T09:30:00Z'),
  issuer: 'dearadry.com',
  jwtId: 'jwt-expired-789',
  revokedAt: null,
  sessionId: 'session-expired',
  type: 'access',
  updatedAt: new Date('2025-01-13T09:30:00Z'),
  userId: 'user-expired',
  value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired_token_payload.expired_signature',
};

export const mockAuthTokenPayloadAdmin: AuthTokenPayload = {
  aud: 'app-web',
  exp: Math.floor(new Date('2025-01-16T09:30:00Z').getTime() / 1000),
  iat: Math.floor(new Date('2025-01-15T09:30:00Z').getTime() / 1000),
  iss: 'dearadry.com',
  jti: 'jwt-ana-access-123',
  role: 'admin',
  sid: 'session-ana-active',
  sub: 'user-admin-ana123',
  type: 'access',
};

export const mockAuthTokenPayloadOwner: AuthTokenPayload = {
  aud: 'app-web',
  exp: Math.floor(new Date('2025-01-16T08:15:00Z').getTime() / 1000),
  iat: Math.floor(new Date('2025-01-15T08:15:00Z').getTime() / 1000),
  iss: 'dearadry.com',
  jti: 'jwt-owner-access-456',
  role: 'owner',
  sid: 'session-owner-active',
  sub: 'owner-danny-id',
  type: 'access',
};

export const mockAuthTokenPayloadExpired: AuthTokenPayload = {
  aud: 'app-web',
  exp: Math.floor(new Date('2025-01-14T09:30:00Z').getTime() / 1000),
  iat: Math.floor(new Date('2025-01-13T09:30:00Z').getTime() / 1000),
  iss: 'dearadry.com',
  jti: 'jwt-expired-789',
  role: 'admin',
  sid: 'session-expired',
  sub: 'user-expired',
  type: 'access',
};

export const mockAuthTokenValidationValid: AuthTokenValidation = {
  isExpired: false,
  isRevoked: false,
  isValid: true,
  payload: mockAuthTokenPayloadAdmin,
};

export const mockAuthTokenValidationExpired: AuthTokenValidation = {
  error: 'Token ha expirado',
  isExpired: true,
  isRevoked: false,
  isValid: false,
  payload: mockAuthTokenPayloadExpired,
};

export const mockAuthTokenValidationInvalid: AuthTokenValidation = {
  error: 'Formato de token inválido',
  isExpired: false,
  isRevoked: false,
  isValid: false,
};

export const mockAuthTokenGenerationAdmin: AuthTokenGenerationRequest = {
  expiresInHours: 24,
  role: 'admin',
  sessionId: 'session-ana-active',
  userId: 'user-admin-ana123',
};

export const mockAuthTokenGenerationOwner: AuthTokenGenerationRequest = {
  expiresInHours: 24,
  role: 'owner',
  sessionId: 'session-owner-active',
  userId: 'owner-danny-id',
};

export const mockAuthTokenGenerationDefault: AuthTokenGenerationRequest = {
  role: 'admin',
  sessionId: 'session-default',
  userId: 'user-default',
};

export const mockAuthSessionActive: AuthSessionEntity = {
  createdAt: new Date('2025-01-15T09:30:00Z'),
  expiresAt: new Date('2025-01-16T09:30:00Z'),
  id: 'session-ana-active',
  ipAddress: '192.168.1.100',
  isActive: true,
  lastUsedAt: new Date('2025-01-15T14:45:00Z'),
  revokedAt: null,
  status: 'active',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.session_payload.session_signature',
  updatedAt: new Date('2025-01-15T14:45:00Z'),
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  userId: 'user-admin-ana123',
};

export const mockAuthSessionExpired: AuthSessionEntity = {
  createdAt: new Date('2025-01-14T08:00:00Z'),
  expiresAt: new Date('2025-01-14T20:00:00Z'), // Past date
  id: 'session-expired-carlos',
  ipAddress: '192.168.1.101',
  isActive: false,
  lastUsedAt: new Date('2025-01-14T19:30:00Z'),
  revokedAt: null,
  status: 'expired',
  token: 'expired_session_token',
  updatedAt: new Date('2025-01-14T19:30:00Z'),
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  userId: 'user-manager-carlos456',
};

export const mockAuthSessionInactive: AuthSessionEntity = {
  createdAt: new Date('2025-01-13T15:00:00Z'),
  expiresAt: new Date('2025-01-16T15:00:00Z'),
  id: 'session-inactive-maria',
  ipAddress: '192.168.1.102',
  isActive: false,
  lastUsedAt: new Date('2025-01-13T16:00:00Z'),
  revokedAt: null,
  status: 'invalid',
  token: 'inactive_session_token',
  updatedAt: new Date('2025-01-13T16:00:00Z'),
  userId: 'user-inactive-maria789',
};

export const mockAuthSessionMobile: AuthSessionEntity = {
  createdAt: new Date('2025-01-15T12:00:00Z'),
  expiresAt: new Date('2025-01-17T12:00:00Z'),
  id: 'session-mobile-pedro',
  ipAddress: '10.0.0.50',
  isActive: true,
  lastUsedAt: new Date('2025-01-15T16:30:00Z'),
  revokedAt: null,
  status: 'active',
  token: 'mobile_session_token',
  updatedAt: new Date('2025-01-15T16:30:00Z'),
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
  userId: 'user-new-pedro101',
};

export const mockUserEntitys = [
  mockUserEntityOwner,
  mockUserEntityAdmin,
  mockUserEntityMaria,
  mockUserEntityJose,
  mockUserEntityInactive,
  mockUserEntityDearAdryDev,
] as const;

export const mockAuthTokens = [
  mockAuthTokenAccess,
  mockAuthTokenRefresh,
  mockAuthTokenExpired,
] as const;

export const mockAuthSessions = [
  mockAuthSessionActive,
  mockAuthSessionExpired,
  mockAuthSessionInactive,
  mockAuthSessionMobile,
] as const;

// ==================== SERIALIZABLE AUTH USERS (for Redux tests) ====================

const FALLBACK_DATE = '1970-01-01T00:00:00.000Z';

/**
 * Convert Date to ISO string for Redux serialization
 */
const toISOString = (date: Date | null): string | null => (date ? date.toISOString() : null);

/**
 * Create a serializable auth user for Redux state tests
 */
export const createSerializableUserEntity = (user: UserEntity) => ({
  createdAt: toISOString(user.createdAt) || FALLBACK_DATE,
  deletedAt: null,
  deletedBy: null,
  email: user.email,
  firstName: user.firstName,
  id: user.id,
  isActive: user.isActive,
  lastLoginAt: toISOString(user.lastLoginAt),
  lastName: user.lastName,
  passwordHash: '',
  role: user.role,
  updatedAt: toISOString(user.updatedAt) || FALLBACK_DATE,
});

export const mockSerializableUserEntityOwner = createSerializableUserEntity(mockUserEntityOwner);
export const mockSerializableUserEntityAdmin = createSerializableUserEntity(mockUserEntityAdmin);
export const mockSerializableUserEntityMaria = createSerializableUserEntity(mockUserEntityMaria);
export const mockSerializableUserEntityJose = createSerializableUserEntity(mockUserEntityJose);
export const mockSerializableUserEntityInactive =
  createSerializableUserEntity(mockUserEntityInactive);
export const mockSerializableUserEntityDearAdryDev =
  createSerializableUserEntity(mockUserEntityDearAdryDev);
