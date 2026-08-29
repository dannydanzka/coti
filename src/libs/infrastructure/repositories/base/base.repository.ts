/**
 * Base Repository Utilities
 *
 * Shared functionality for all repositories following REPOSITORIES-STANDARDS.
 * Context7 Clean Architecture pattern - reusable utilities layer.
 * Provides common patterns for error handling, logging, and mock data management.
 *
 */

import { logError, logInfo } from '@logger';

import type {
  ErrorResponse,
  PaginatedResult,
  PaginationOptions,
  SuccessResponse,
} from './base.repository.interfaces';

export const handleRepositoryError = (
  repositoryName: string,
  operation: string,
  error: unknown
): never => {
  const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
  const repositoryError = new Error(`[${repositoryName}] Error en ${operation}: ${errorMessage}`);

  logError(repositoryError, `Repository Error [${repositoryName}]`);

  throw repositoryError;
};

export const createSuccessResponse = <T>(
  data: T,
  metadata?: Record<string, unknown>
): SuccessResponse<T> => ({
  data,
  metadata: {
    lastUpdated: new Date().toISOString(),
    ...metadata,
  },
  success: true,
});

export const createErrorResponse = <T = null>(error: string): ErrorResponse<T> => ({
  data: null as T,
  error,
  metadata: {
    lastUpdated: new Date().toISOString(),
  },
  success: false,
});

export const generateId = (): string =>
  `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

export const logRepositoryOperation = (
  repositoryName: string,
  operation: string,
  params?: Record<string, unknown>
): void => {
  if (process.env['NODE_ENV'] === 'development') {
    const message = params ? `${operation} - Params: ${JSON.stringify(params)}` : operation;
    logInfo(message, `[${repositoryName}]`);
  }
};

export const validateRequiredFields = <T extends Record<string, unknown>>(
  entity: T,
  requiredFields: (keyof T)[]
): void => {
  const missingFields = requiredFields.filter((field) => {
    const value = entity[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
  }
};

export const calculatePagination = (
  total: number,
  page: number,
  limit: number
): PaginatedResult<never>['pagination'] => {
  const totalPages = Math.ceil(total / limit);

  return {
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    limit,
    page,
    total,
    totalPages,
  };
};

export const applyPagination = <T>(
  data: T[],
  { limit, page }: PaginationOptions
): PaginatedResult<T> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: calculatePagination(data.length, page, limit),
  };
};

export const createRepositoryHelpers = (repositoryName: string) => ({
  applyPagination,
  calculatePagination,
  createErrorResponse,
  createSuccessResponse,
  generateId,
  handleError: (operation: string, error: unknown) =>
    handleRepositoryError(repositoryName, operation, error),
  logOperation: (operation: string, params?: Record<string, unknown>) =>
    logRepositoryOperation(repositoryName, operation, params),
  validateRequiredFields,
});
