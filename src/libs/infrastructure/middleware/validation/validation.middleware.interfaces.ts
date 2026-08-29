/**
 * Validation Middleware Interfaces
 *
 * Type definitions for validation middleware.
 */

import type { ZodSchema } from 'zod';

/**
 * Validation options
 */
export interface ValidationOptions<TBody = unknown, TQuery = unknown, TParams = unknown> {
  body?: ZodSchema<TBody>;
  params?: ZodSchema<TParams>;
  query?: ZodSchema<TQuery>;
}

/**
 * Validation error
 */
export interface ValidationError {
  message: string;
  path: string;
}

/**
 * Validation result
 */
export type ValidationResult<T> =
  | {
      data: T;
      success: true;
    }
  | {
      errors: ValidationError[];
      success: false;
    };
