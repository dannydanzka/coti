/**
 * ErrorProvider Helper Tests
 *
 * Functional tests for error provider utility functions.
 */

vi.mock('../logger', () => ({
  logError: vi.fn(),
}));

import {
  categorizeError,
  createErrorInfo,
  detectBlankScreen,
  detectSeverity,
  generateErrorId,
  logErrorInDevelopment,
  sendErrorNotification,
} from './error-provider.helpers';

describe('ErrorProvider Helpers', () => {
  describe('generateErrorId', () => {
    it('genera IDs únicos con prefijo error_', () => {
      const id1 = generateErrorId();
      const id2 = generateErrorId();
      expect(id1).toMatch(/^error_\d+_/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('categorizeError', () => {
    it('categoriza errores de red', () => {
      expect(categorizeError(new Error('network error'))).toBe('network');
      expect(categorizeError(new Error('fetch failed'))).toBe('network');
    });

    it('categoriza errores de autenticación', () => {
      expect(categorizeError(new Error('unauthorized'))).toBe('authentication');
      expect(categorizeError(new Error('token expired'))).toBe('authentication');
    });

    it('categoriza errores de autorización', () => {
      expect(categorizeError(new Error('forbidden'))).toBe('authorization');

      expect(categorizeError(new Error('permission denied'))).toBe('authorization');
    });

    it('categoriza errores de validación', () => {
      expect(categorizeError(new Error('validation error'))).toBe('validation');
      expect(categorizeError(new Error('invalid email'))).toBe('validation');
    });

    it('categoriza errores de runtime', () => {
      const typeError = new TypeError('Cannot read property');
      expect(categorizeError(typeError)).toBe('runtime');

      const refError = new ReferenceError('x is not defined');
      expect(categorizeError(refError)).toBe('runtime');
    });

    it('retorna unknown para errores no reconocidos', () => {
      expect(categorizeError(new Error('algo inesperado'))).toBe('unknown');
    });
  });

  describe('detectSeverity', () => {
    it('detecta errores críticos', () => {
      expect(detectSeverity(new Error('critical failure'))).toBe('critical');
      expect(detectSeverity(new Error('fatal error'))).toBe('critical');
    });

    it('detecta errores de alta severidad', () => {
      expect(detectSeverity(new Error('server error 500'))).toBe('high');
      expect(detectSeverity(new TypeError('cannot read'))).toBe('high');
    });

    it('detecta errores de baja severidad', () => {
      expect(detectSeverity(new Error('warning: deprecated'))).toBe('low');
    });

    it('retorna medium por defecto', () => {
      expect(detectSeverity(new Error('algo pasó'))).toBe('medium');
    });
  });

  describe('createErrorInfo', () => {
    it('crea ErrorInfo completo', () => {
      const error = new Error('Error de prueba');
      const info = createErrorInfo(error, { userId: 'u-1' });
      expect(info.id).toMatch(/^error_/);
      expect(info.message).toBe('Error de prueba');
      expect(info.category).toBe('unknown');
      expect(info.severity).toBe('medium');
      expect(info.context?.['userId']).toBe('u-1');
      expect(info.timestamp).toBeDefined();
    });

    it('incluye stack trace cuando está disponible', () => {
      const error = new Error('Con stack');
      const info = createErrorInfo(error);
      expect(info.stack).toBeDefined();
    });

    it('usa severidad personalizada', () => {
      const error = new Error('Error');
      const info = createErrorInfo(error, {}, 'critical');
      expect(info.severity).toBe('critical');
    });

    it('maneja error sin stack', () => {
      const error = new Error('Sin stack');
      error.stack = undefined;
      const info = createErrorInfo(error);
      expect(info.stack).toBeUndefined();
    });
  });

  describe('sendErrorNotification', () => {
    it('envía notificación con mensaje formateado', () => {
      const showError = vi.fn();
      const errorInfo = {
        category: 'network' as const,
        context: {},
        id: 'err-1',
        message: 'Error de conexión',
        severity: 'medium' as const,
        timestamp: Date.now(),
      };
      sendErrorNotification(errorInfo, showError);
      expect(showError).toHaveBeenCalledWith('Network Error: Error de conexión', {
        displayDuration: 5000,
      });
    });

    it('usa duración 0 para errores críticos', () => {
      const showError = vi.fn();
      const errorInfo = {
        category: 'runtime' as const,
        context: {},
        id: 'err-2',
        message: 'Error fatal',
        severity: 'critical' as const,
        timestamp: Date.now(),
      };
      sendErrorNotification(errorInfo, showError);
      expect(showError).toHaveBeenCalledWith(expect.any(String), { displayDuration: 0 });
    });

    it('no lanza si showError falla', () => {
      const showError = vi.fn().mockImplementation(() => {
        throw new Error('UI error');
      });
      const errorInfo = {
        category: 'unknown' as const,
        context: {},
        id: 'err-3',
        message: 'Error',
        severity: 'medium' as const,
        timestamp: Date.now(),
      };
      expect(() => sendErrorNotification(errorInfo, showError)).not.toThrow();
    });
  });

  describe('logErrorInDevelopment', () => {
    it('no lanza error', () => {
      const errorInfo = {
        category: 'network' as const,
        context: {},
        id: 'err-1',
        message: 'Error',
        severity: 'high' as const,
        timestamp: Date.now(),
      };
      expect(() => logErrorInDevelopment(errorInfo, new Error('Test'))).not.toThrow();
    });
  });

  describe('detectBlankScreen', () => {
    it('no reporta cuando hay contenido visible', () => {
      const reportError = vi.fn();
      Object.defineProperty(document.body, 'offsetHeight', { configurable: true, value: 200 });
      detectBlankScreen(reportError);
      expect(reportError).not.toHaveBeenCalled();
    });

    it('reporta cuando no hay contenido visible', () => {
      const reportError = vi.fn();
      Object.defineProperty(document.body, 'offsetHeight', { configurable: true, value: 0 });
      Object.defineProperty(document.body, 'scrollHeight', { configurable: true, value: 0 });

      // Remove all children temporarily
      const originalChildren = document.body.innerHTML;
      document.body.innerHTML = '';

      detectBlankScreen(reportError);
      expect(reportError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({ type: 'blank_screen' }),
        'high'
      );

      document.body.innerHTML = originalChildren;
    });
  });
});
