/**
 * Common Interfaces
 *
 * Shared interface definitions used across all applications.
 * These interfaces represent common patterns used throughout the system.
 *
 * @pattern Clean Architecture - Common Contracts
 * @context Shared (All Applications)
 */

/**
 * Discriminated Response Type
 *
 * Standard response pattern for use cases with success/error discrimination.
 * Enables type-safe handling of operation results.
 *
 * Success response: { success: true, data: T, status: number }
 * Error response: { success: false, error: string, context?: Record<string, unknown>, status: number }
 */
export type DiscriminatedResponse<T> =
  | {
      success: true;
      data: T;
      status: number;
    }
  | {
      success: false;
      error?: string;
      context?: Record<string, unknown>;
      status: number;
      i18n?: { key: string; params?: Record<string, unknown> };
    };
