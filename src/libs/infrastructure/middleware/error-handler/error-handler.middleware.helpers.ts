/**
 * Error Handler Middleware Helpers
 *
 * Pure extraction transforms for shaping API error responses.
 */

import { HTTP_STATUS } from '@constants';

import type { ApiError } from './error-handler.middleware.interfaces';

/** Check if error is an ApiError */
const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof (error as ApiError).statusCode === 'number'
  );
};

/** Extract error message from unknown error */
export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (isApiError(error) && error.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

/** Extract status code from error */
export const extractStatusCode = (error: unknown): number => {
  if (isApiError(error)) {
    return error.statusCode;
  }

  if (error instanceof Error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return HTTP_STATUS.UNAUTHORIZED;
    }

    if (error.message.includes('permission') || error.message.includes('forbidden')) {
      return HTTP_STATUS.FORBIDDEN;
    }

    if (error.message.includes('not found')) {
      return HTTP_STATUS.NOT_FOUND;
    }

    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return HTTP_STATUS.BAD_REQUEST;
    }
  }

  return HTTP_STATUS.INTERNAL_SERVER_ERROR;
};

/** Extract additional error details */
export const extractErrorDetails = (error: unknown): Record<string, unknown> | undefined => {
  if (isApiError(error) && error.details) {
    return error.details;
  }

  return undefined;
};
