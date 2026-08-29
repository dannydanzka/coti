/**
 * API Route Body Validator
 *
 * Validates request body against a Zod schema before passing to Use Cases.
 * Returns type-safe parsed data or a NextResponse error.
 */

import { NextResponse } from 'next/server';
import type { ZodSchema } from 'zod';

import { HTTP_STATUS } from '@constants';

import type { ValidationResult } from './validate-body.interfaces';

export const validateBody = <T>(schema: ZodSchema<T>, body: unknown): ValidationResult<T> => {
  const result = schema.safeParse(body);

  if (!result.success) {
    const [firstIssue] = result.error.issues;
    const errorMessage = firstIssue?.message ?? 'Datos inválidos';

    return {
      error: NextResponse.json(
        { error: errorMessage, success: false },
        { status: HTTP_STATUS.BAD_REQUEST }
      ),
      success: false,
    };
  }

  return { data: result.data, success: true };
};
