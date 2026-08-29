/**
 * Server-side i18n resolver (no React hooks).
 *
 * Reads the canonical es/en JSON dictionaries and resolves a dotted key with
 * optional interpolation params. Used by API error handlers to embed a
 * human-readable fallback alongside the i18n key in error responses.
 *
 * Usage:
 *   resolveI18n('errors.auth.unauthenticated', undefined, 'es')
 *   resolveI18n('errors.enrollment.notFound', { id: '123' }, 'en')
 */

import enMessages from './messages/en.json';
import esMessages from './messages/es.json';

export type Locale = 'es' | 'en';

const DICTIONARIES: Record<Locale, unknown> = {
  en: enMessages,
  es: esMessages,
};

const lookup = (dict: unknown, key: string): string | undefined => {
  const parts = key.split('.');
  let node: unknown = dict;
  for (const part of parts) {
    if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof node === 'string' ? node : undefined;
};

const interpolate = (template: string, params?: Record<string, unknown>): string => {
  if (!params) return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, token: string) => {
    void match;
    const value = params[token];
    return value === undefined || value === null ? `{{${token}}}` : String(value);
  });
};

/**
 * Resolve an i18n key. Returns the raw key if not found (caller treats it as key,
 * not as user-facing text).
 */
export const resolveI18n = (
  key: string,
  params?: Record<string, unknown>,
  locale: Locale = 'es'
): string => {
  const dict = DICTIONARIES[locale] ?? DICTIONARIES.es;
  const template = lookup(dict, key) ?? lookup(DICTIONARIES.es, key) ?? key;
  return interpolate(template, params);
};

/**
 * Check if a key exists in the es dictionary (used by validator script).
 */
export const hasI18nKey = (key: string): boolean => lookup(DICTIONARIES.es, key) !== undefined;
