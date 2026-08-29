/**
 * Validation Helper Interfaces
 *
 *
 * Type definitions for validation helpers.
 */

import type { createValidationError } from '../../error-handling/use-case-error-handler';

/**
 * Validation error response type
 */
export type ValidationError = ReturnType<typeof createValidationError> | null;

/**
 * Validator function type
 */
export type ValidatorFn<T> = (params: T) => ValidationError;

/**
 * Validator builder interface
 */
export interface ValidatorBuilder<T> {
  required: (field: keyof T, message?: string) => ValidatorFn<T>;
  requiredId: (field?: keyof T) => ValidatorFn<T>;
  email: (field: keyof T) => ValidatorFn<T>;
  minLength: (field: keyof T, length: number, message?: string) => ValidatorFn<T>;
  maxLength: (field: keyof T, length: number, message?: string) => ValidatorFn<T>;
  oneOf: (field: keyof T, allowedValues: unknown[], message?: string) => ValidatorFn<T>;
  compose: (...validators: ValidatorFn<T>[]) => ValidatorFn<T>;
}
