/**
 * getLocalizedError Interfaces
 */

export interface ErrorLike {
  error?: string;
  i18n?: { key: string; params?: Record<string, unknown> };
}
