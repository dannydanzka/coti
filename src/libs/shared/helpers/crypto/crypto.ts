/**
 * Crypto Helper
 *
 * Encapsulates password hashing operations using bcryptjs.
 * This helper can be imported in domain layer via @helpers.
 */

import bcrypt from 'bcryptjs';

import type { HashPasswordOptions } from './crypto.interfaces';

const DEFAULT_SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 */
export const hashPassword = async (
  password: string,
  options?: HashPasswordOptions
): Promise<string> => {
  const saltRounds = options?.saltRounds ?? DEFAULT_SALT_ROUNDS;
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compare a password with a hash
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
