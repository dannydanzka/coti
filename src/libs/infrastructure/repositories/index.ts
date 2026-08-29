/**
 * Repository Infrastructure - Barrel Exports
 *
 * Exports all repositories from all contexts.
 * Context isolation maintained through directory structure:
 * - Admin repositories live in ./admin/
 * - Auth repository (shared) lives in ./auth/
 * - DearAdry repositories live in ./dearadry/
 * - Public repositories live in ./public/
 *
 */

export * from './admin';
export * from './auth';
