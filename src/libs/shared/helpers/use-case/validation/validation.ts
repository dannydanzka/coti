/**
 * Validation Helper
 *
 *
 * Centralized validation logic for use cases across all contexts.
 */

import { createValidationError } from '../../error-handling/use-case-error-handler';
import type { ValidationError, ValidatorBuilder, ValidatorFn } from './validation.interfaces';

/**
 * Creates a composable validator builder for type-safe validation
 *
 * Provides fluent API for building complex validators with common patterns:
 * - Required field validation
 * - ID format validation
 * - Email format validation
 * - Composable validator chains
 *
 * Can be used in any context (admin, public, auth, etc.)
 *
 * @example
 * ```typescript
 * // Admin context
 * const validator = createValidator<GetUserByIdParams>();
 * const validate = validator.compose(
 *   validator.required('request'),
 *   validator.requiredId('id')
 * );
 *
 * // Public context
 * const validator = createValidator<SubmitVoteParams>();
 * const validate = validator.compose(
 *   validator.required('participantId'),
 *   validator.required('categoryId')
 * );
 *
 * const error = validate(params);
 * if (error) return error;
 * ```
 */
export const createValidator = <T = Record<string, unknown>>(): ValidatorBuilder<T> => {
  return {
    /**
     * Composes multiple validators into a single validation function
     * Returns the first error encountered, or null if all validations pass
     */
    compose: (...validators: ValidatorFn<T>[]): ValidatorFn<T> => {
      return (params: T): ValidationError => {
        for (const validator of validators) {
          const error = validator(params);
          if (error) return error;
        }
        return null;
      };
    },
    email: (field: keyof T): ValidatorFn<T> => {
      return (params: T): ValidationError => {
        const value = params[field];
        if (value && typeof value === 'string') {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return createValidationError(
              { key: 'errors.auth.emailInvalidFormat' },
              String(field),
              value
            );
          }
        }
        return null;
      };
    },
    maxLength: (field: keyof T, length: number, message?: string): ValidatorFn<T> => {
      return (params: T): ValidationError => {
        const value = params[field];
        if (value && typeof value === 'string' && value.length > length) {
          return createValidationError(
            message || `${String(field)} no puede exceder ${length} caracteres`,
            String(field),
            value
          );
        }
        return null;
      };
    },
    minLength: (field: keyof T, length: number, message?: string): ValidatorFn<T> => {
      return (params: T): ValidationError => {
        const value = params[field];
        if (value && typeof value === 'string' && value.length < length) {
          return createValidationError(
            message || `${String(field)} debe tener al menos ${length} caracteres`,
            String(field),
            value
          );
        }
        return null;
      };
    },
    oneOf: (field: keyof T, allowedValues: unknown[], message?: string): ValidatorFn<T> => {
      return (params: T): ValidationError => {
        const value = params[field];
        if (value && !allowedValues.includes(value)) {
          return createValidationError(
            message || `${String(field)} debe ser uno de: ${allowedValues.join(', ')}`,
            String(field),
            value
          );
        }
        return null;
      };
    },
    required: (field: keyof T, message?: string): ValidatorFn<T> => {
      return (params: T): ValidationError => {
        if (!params[field]) {
          return createValidationError(
            message || `${String(field)} es requerido`,
            String(field),
            params[field]
          );
        }
        return null;
      };
    },
    requiredId: (field: keyof T = 'id' as keyof T): ValidatorFn<T> => {
      return (params: T): ValidationError => {
        const value = params[field];
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
          return createValidationError({ key: 'errors.auth.idRequired' }, String(field), value);
        }
        return null;
      };
    },
  };
};

/**
 * Common standalone validators for frequently used patterns across all contexts
 */
export const CommonValidators = {
  /**
   * Validates email format
   */
  emailFormat: (email: string): ValidationError => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return createValidationError({ key: 'errors.auth.emailInvalidFormat' }, 'email', email);
    }
    return null;
  },
  idFormat: (id: unknown, fieldName = 'id'): ValidationError => {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return createValidationError({ key: 'errors.auth.idRequired' }, fieldName, id);
    }
    return null;
  },
  requiredRequest: <T extends { request: unknown }>(params: T): ValidationError => {
    if (!params.request) {
      return createValidationError(
        { key: 'errors.auth.requestRequired' },
        'request',
        params.request
      );
    }
    return null;
  },
};
