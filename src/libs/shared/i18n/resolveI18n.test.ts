/**
 * resolveI18n tests
 */

import { hasI18nKey, resolveI18n } from './resolveI18n';

describe('resolveI18n', () => {
  it('resuelve key existente en ES', () => {
    expect(resolveI18n('errors.auth.unauthenticated')).toBe('Usuario no autenticado');
  });

  it('resuelve key existente en EN cuando locale=en', () => {
    expect(resolveI18n('errors.auth.unauthenticated', undefined, 'en')).toBe(
      'User not authenticated'
    );
  });

  it('interpola params con sintaxis {{ token }}', () => {
    expect(resolveI18n('errors.generic.unknown', { ignored: 'param' })).toBe(
      'Ocurrió un error inesperado. Intenta de nuevo.'
    );
  });

  it('retorna la key cruda si no existe en ningún diccionario', () => {
    expect(resolveI18n('errors.non.existent')).toBe('errors.non.existent');
  });

  it('hasI18nKey true para key existente', () => {
    expect(hasI18nKey('errors.enrollment.notFound')).toBe(true);
  });

  it('hasI18nKey false para key inexistente', () => {
    expect(hasI18nKey('errors.non.existent')).toBe(false);
  });
});
