/**
 * Error Handler Middleware
 *
 * Centralized error handling for API routes.
 * Formats errors consistently and logs for debugging.
 */

import { NextResponse } from 'next/server';

import { HTTP_STATUS } from '@constants';
import { logError } from '@logger';

import type {
  ApiError,
  ErrorHandlerOptions,
  ErrorResponse,
} from './error-handler.middleware.interfaces';
import {
  extractErrorDetails,
  extractErrorMessage,
  extractStatusCode,
} from './error-handler.middleware.helpers';

/**
 * Build error response object
 */
const buildErrorResponse = (error: unknown, options?: ErrorHandlerOptions): ErrorResponse => {
  const message = extractErrorMessage(error);
  const statusCode = extractStatusCode(error);
  const details = extractErrorDetails(error);

  const response: ErrorResponse = {
    error: message,
    statusCode,
    success: false,
  };

  if (details) {
    response.details = details;
  }

  if (process.env['NODE_ENV'] === 'development' && error instanceof Error && error.stack) {
    response.stack = error.stack;
  }

  if (options?.data) {
    response.data = options.data;
  }

  return response;
};

/**
 * Handle errors and return formatted JSON response
 */
export const handleError = (error: unknown, options?: ErrorHandlerOptions): NextResponse => {
  if (!options?.silent) {
    logError(error, 'handleError');
  }

  const errorResponse = buildErrorResponse(error, options);

  return NextResponse.json(errorResponse, {
    status: errorResponse.statusCode,
  });
};

/**
 * Create a custom API error
 */
export const createApiError = (
  message: string,
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  details?: Record<string, unknown>
): ApiError => {
  const error: ApiError = {
    message,
    name: 'ApiError',
    statusCode,
    ...(details && { details }),
  };

  return error;
};

/**
 * Wrap async handler with error handling
 */
export const withErrorHandler = <T = unknown>(
  handler: (request: Request, context?: T) => Promise<NextResponse>
) => {
  return async (request: Request, context?: T): Promise<NextResponse> => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleError(error);
    }
  };
};
