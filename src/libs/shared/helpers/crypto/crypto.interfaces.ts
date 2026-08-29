/**
 * Crypto Helper Interfaces
 *
 * Abstracts password hashing operations for use in domain layer.
 */

export interface HashPasswordOptions {
  saltRounds?: number;
}

export interface CryptoHelper {
  hashPassword: (password: string, options?: HashPasswordOptions) => Promise<string>;
  comparePassword: (password: string, hash: string) => Promise<boolean>;
}
