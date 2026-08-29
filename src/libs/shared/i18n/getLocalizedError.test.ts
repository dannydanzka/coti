/**
 * getLocalizedError — branch coverage
 *
 * Resolves user-facing messages from thrown Errors/AppErrors and from use-case
 * `{ error, i18n }` shapes. Covers the i18n-key path, the AppError fallback,
 * the param extraction, and every default fallback branch.
 */

import { createAppError } from '../helpers/error-handling/app-error';
import { getLocalizedError } from './getLocalizedError';

const t = ((key: string, params?: Record<string, unknown>) =>
  `t(${key})${params && Object.keys(params).length ? `:${JSON.stringify(params)}` : ''}`) as never;

describe('getLocalizedError', () => {
  it('returns the fallback for falsy input', () => {
    expect(getLocalizedError(null, t, 'defecto')).toBe('defecto');
  });

  it('returns the fallback for a non-object primitive', () => {
    expect(getLocalizedError(42, t, 'defecto')).toBe('defecto');
  });

  it('translates an i18n-key message on a plain Error', () => {
    const result = getLocalizedError(new Error('errors.auth.tokenExpired'), t);
    expect(result).toBe('t(errors.auth.tokenExpired)');
  });

  it('translates an i18n-key AppError forwarding its params', () => {
    const error = createAppError({ fallback: 'Inválido', min: 8 }, 'errors.validation.minLength');
    const result = getLocalizedError(error, t);
    expect(result).toBe('t(errors.validation.minLength):{"min":8}');
  });

  it('prefers the AppError ES fallback for a non-key message', () => {
    const error = createAppError({ fallback: 'Texto en español' }, 'algo no traducible');
    expect(getLocalizedError(error, t)).toBe('Texto en español');
  });

  it('uses the raw message when an AppError has no usable fallback', () => {
    const error = createAppError({ raw: 'x' }, 'Mensaje plano');
    expect(getLocalizedError(error, t)).toBe('Mensaje plano');
  });

  it('falls back when a plain Error has an empty message', () => {
    expect(getLocalizedError(new Error(''), t, 'defecto')).toBe('defecto');
  });

  it('translates the i18n key of a use-case error shape', () => {
    const result = getLocalizedError(
      { i18n: { key: 'errors.kit.notFound', params: { id: 'k1' } } },
      t
    );
    expect(result).toBe('t(errors.kit.notFound):{"id":"k1"}');
  });

  it('returns the error string of a use-case error shape', () => {
    expect(getLocalizedError({ error: 'No autorizado' }, t)).toBe('No autorizado');
  });

  it('falls back when the error shape carries neither i18n nor error', () => {
    expect(getLocalizedError({}, t, 'defecto')).toBe('defecto');
  });

  it('ignores AppError content that has only helper fields (no params)', () => {
    const error = createAppError({ fallback: 'Solo fallback' }, 'errors.auth.tokenExpired');
    // i18n key path with no real params → t called with empty object
    expect(getLocalizedError(error, t)).toBe('t(errors.auth.tokenExpired)');
  });
});
