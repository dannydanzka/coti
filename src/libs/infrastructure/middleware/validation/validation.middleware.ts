/**
 * Validation Middleware
 *
 * Request validation for API routes using Zod schemas.
 * Validates request body, query params, and path params.
 */

import { type NextRequest, NextResponse } from 'next/server';
import { ZodError, type ZodSchema } from 'zod';

import { HTTP_STATUS } from '@constants';
import { logError } from '@logger';

import type { ValidationOptions, ValidationResult } from './validation.middleware.interfaces';

/**
 * Parse and validate request body
 */
const validateBody = async <T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<ValidationResult<T>> => {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    return {
      data,
      success: true,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        errors: error.errors.map((err) => ({
          message: err.message,
          path: err.path.join('.'),
        })),
        success: false,
      };
    }

    logError(error, 'validateBody');
    return {
      errors: [{ message: 'Invalid request body', path: 'body' }],
      success: false,
    };
  }
};

/**
 * Parse and validate query parameters
 */
const validateQuery = <T>(request: NextRequest, schema: ZodSchema<T>): ValidationResult<T> => {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const data = schema.parse(searchParams);

    return {
      data,
      success: true,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        errors: error.errors.map((err) => ({
          message: err.message,
          path: err.path.join('.'),
        })),
        success: false,
      };
    }

    logError(error, 'validateQuery');
    return {
      errors: [{ message: 'Invalid query parameters', path: 'query' }],
      success: false,
    };
  }
};

/**
 * Parse and validate path parameters
 */
const validateParams = <T>(params: unknown, schema: ZodSchema<T>): ValidationResult<T> => {
  try {
    const data = schema.parse(params);

    return {
      data,
      success: true,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        errors: error.errors.map((err) => ({
          message: err.message,
          path: err.path.join('.'),
        })),
        success: false,
      };
    }

    logError(error, 'validateParams');
    return {
      errors: [{ message: 'Invalid path parameters', path: 'params' }],
      success: false,
    };
  }
};

/**
 * Create validation error response
 */
const createValidationErrorResponse = (
  errors: Array<{ message: string; path: string }>
): NextResponse => {
  return NextResponse.json(
    {
      error: 'Validation failed',
      errors,
      success: false,
    },
    { status: HTTP_STATUS.BAD_REQUEST }
  );
};

/**
 * Validate request with schema
 *
 * @example
 * ```typescript
 * const bodySchema = z.object({
 *   name: z.string().min(3),
 *   email: z.string().email(),
 * });
 *
 * export const POST = async (request: NextRequest) => {
 *   const validation = await validateRequest(request, { body: bodySchema });
 *
 *   if (!validation.success) {
 *     return NextResponse.json(validation, { status: 400 });
 *   }
 *
 *   const { name, email } = validation.data;
 *   // ... use validated data
 * };
 * ```
 */
export const validateRequest = async <TBody = unknown, TQuery = unknown, TParams = unknown>(
  request: NextRequest,
  options: ValidationOptions<TBody, TQuery, TParams>,
  params?: unknown
): Promise<
  | { data: { body?: TBody; params?: TParams; query?: TQuery }; success: true }
  | { errors: Array<{ message: string; path: string }>; success: false }
> => {
  const validatedData: { body?: TBody; params?: TParams; query?: TQuery } = {};

  if (options.body) {
    const bodyResult = await validateBody(request, options.body);
    if (!bodyResult.success) {
      return bodyResult;
    }
    validatedData.body = bodyResult.data;
  }

  if (options.query) {
    const queryResult = validateQuery(request, options.query);
    if (!queryResult.success) {
      return queryResult;
    }
    validatedData.query = queryResult.data;
  }

  if (options.params && params) {
    const paramsResult = validateParams(params, options.params);
    if (!paramsResult.success) {
      return paramsResult;
    }
    validatedData.params = paramsResult.data;
  }

  return {
    data: validatedData,
    success: true,
  };
};

/**
 * Higher-order function that wraps API handlers with validation
 *
 * @example
 * ```typescript
 * const bodySchema = z.object({
 *   name: z.string().min(3),
 *   email: z.string().email(),
 * });
 *
 * export const POST = withValidation(
 *   async (request, { body }) => {
 *     // body is already validated and typed
 *     const { name, email } = body;
 *     return NextResponse.json({ name, email });
 *   },
 *   { body: bodySchema }
 * );
 * ```
 */
export const withValidation = <
  TBody = unknown,
  TQuery = unknown,
  TParams = unknown,
  TContext = unknown,
>(
  handler: (
    request: NextRequest,
    validated: { body?: TBody; params?: TParams; query?: TQuery },
    context?: TContext
  ) => Promise<NextResponse>,
  options: ValidationOptions<TBody, TQuery, TParams>
) => {
  return async (request: NextRequest, context?: TContext): Promise<NextResponse> => {
    const params =
      context && typeof context === 'object' && 'params' in context ? context.params : undefined;

    const validation = await validateRequest(request, options, params);

    if (!validation.success) {
      return createValidationErrorResponse(validation.errors);
    }

    return await handler(request, validation.data, context);
  };
};
