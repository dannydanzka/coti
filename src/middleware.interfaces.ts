/**
 * Middleware Interfaces
 */

export interface JWTPayload {
  userId: string;
  role: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
