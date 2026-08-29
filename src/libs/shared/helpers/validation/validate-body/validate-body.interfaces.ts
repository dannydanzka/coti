/**
 * ValidateBody Interfaces
 */

import type { NextResponse } from 'next/server';

export interface ValidationSuccess<T> {
  data: T;
  success: true;
}

export interface ValidationFailure {
  error: NextResponse;
  success: false;
}

export type ValidationResult<T> = ValidationFailure | ValidationSuccess<T>;
