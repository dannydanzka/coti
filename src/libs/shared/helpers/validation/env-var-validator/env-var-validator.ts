/**
 * Environment Variable Validator
 *
 * Centralized helper for extracting and validating environment variables
 * with type-safe access and consistent error handling.
 */

import type { EnvVarOptions } from './env-var-validator.interfaces';

/**
 * Extract environment variable with validation
 *
 * @param key - Environment variable key
 * @param options - Validation options (required, defaultValue)
 * @returns Environment variable value or undefined
 * @throws Error if required variable is missing
 *
 * @example
 * ```typescript
 * const apiKey = getEnvVar('API_KEY'); // Required by default
 * const folder = getEnvVar('FOLDER', { required: false, defaultValue: 'default' });
 * ```
 */
export const getEnvVar = (key: string, options: EnvVarOptions = {}): string | undefined => {
  const { defaultValue, required = true } = options;
  const value = process.env[key];

  if (!value) {
    if (required) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return defaultValue;
  }

  return value;
};
