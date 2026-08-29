/**
 * Auth Repository Interfaces
 *
 * Repository contracts for authentication operations
 *
 */
import type { AuthSessionEntity } from './auth-session.interfaces';
import type { UserEntity } from '../user';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthRepository {
  authenticateUser(credentials: AuthCredentials): Promise<UserEntity | null>;

  createSession(
    userId: string,
    token: string,
    expiresAt: Date,
    ipAddress: string,
    userAgent?: string
  ): Promise<AuthSessionEntity>;

  findSessionByToken(token: string): Promise<AuthSessionEntity | null>;

  invalidateSession(token: string): Promise<void>;

  findUserById(userId: string): Promise<UserEntity | null>;

  updateLastLogin(userId: string, timestamp: Date): Promise<void>;
}
