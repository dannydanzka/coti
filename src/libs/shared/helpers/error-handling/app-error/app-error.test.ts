/**
 * AppError Tests
 *
 * Essential tests for the custom application error class following Essential Testing Philosophy.
 */

import { AppError, createAppError } from './app-error';

describe('AppError', () => {
  describe('Error Creation', () => {
    it('should create AppError with message and content', () => {
      const content = { code: 'USER_NOT_FOUND', error: 'Usuario María García no encontrado' };
      const message = 'Usuario no encontrado';

      const appError = new AppError(content, message);

      expect(appError).toBeInstanceOf(AppError);
      expect(appError).toBeInstanceOf(Error);
      expect(appError.name).toBe('AppError');
      expect(appError.message).toBe(message);
      expect(appError.content).toEqual(content);
    });

    it('should create AppError with only content', () => {
      const content = 'Error de validación para José Martínez';

      const appError = new AppError(content);

      expect(appError).toBeInstanceOf(AppError);
      expect(appError.message).toBe('');
      expect(appError.content).toBe(content);
    });

    it('preserves falsy content values', () => {
      const nullError = new AppError(null, 'Error nulo');

      expect(nullError.content).toBeNull();
    });
  });

  describe('Content Types', () => {
    it('should handle different content types with Spanish data', () => {
      const stringError = new AppError('Error de autenticación', 'Token inválido');
      const objectError = new AppError({
        error: 'Datos inválidos',
        field: 'email',
        value: 'maria.garcia@correo.com',
      });
      const arrayError = new AppError(['Error email', 'Error contraseña', 'Error nombre']);

      expect(typeof stringError.content).toBe('string');
      expect(typeof objectError.content).toBe('object');
      expect(Array.isArray(arrayError.content)).toBe(true);
    });
  });

  describe('Error Inheritance', () => {
    it('should be throwable and catchable Error instance', () => {
      const content = { error: 'Usuario Ana López no autorizado' };
      const message = 'Acceso denegado';

      expect(() => {
        throw new AppError(content, message);
      }).toThrow(AppError);

      let caughtError: AppError<unknown> | null = null;
      try {
        throw new AppError(content, message);
      } catch (error) {
        caughtError = error as AppError<unknown>;
      }
      expect(caughtError).toBeInstanceOf(AppError);
      expect(caughtError?.content).toEqual(content);
    });
  });

  describe('Stack Trace', () => {
    it('should have stack trace with AppError name', () => {
      const appError = new AppError('test error', 'Mensaje de error');

      expect(appError.stack).toBeDefined();
      expect(typeof appError.stack).toBe('string');
      expect(appError.stack).toContain('AppError');
    });
  });

  describe('Real-world Usage', () => {
    it('should handle HTTP error response', () => {
      const httpErrorData = {
        error: 'Usuario Carlos Ruiz no autorizado',
        path: '/api/admin/users',
        status: 401,
      };

      const appError = new AppError(httpErrorData, 'Acceso denegado');

      expect(appError.content.status).toBe(401);
      expect(appError.content.error).toContain('Carlos Ruiz');
      expect(appError.message).toBe('Acceso denegado');
    });

    it('should handle validation errors with Spanish data', () => {
      const validationErrors = [
        { field: 'email', message: 'Email de María es requerido', value: null },
        { field: 'password', message: 'Contraseña muy corta', value: '123' },
      ];

      const appError = new AppError(validationErrors, 'Errores de validación');

      expect(appError.content).toHaveLength(2);
      expect(appError.content[0]?.message).toContain('María');
      expect(appError.message).toBe('Errores de validación');
    });
  });

  describe('Generic Type Support', () => {
    it('should support generic types with Spanish content', () => {
      interface ErrorData {
        code: string;
        details: string;
        usuario: string;
      }

      const errorData: ErrorData = {
        code: 'VALIDATION_ERROR',
        details: 'Campo email es requerido',
        usuario: 'Elena Fernández',
      };

      const appError = new AppError<ErrorData>(errorData, 'Error de validación');

      expect(appError.content.code).toBe('VALIDATION_ERROR');
      expect(appError.content.usuario).toBe('Elena Fernández');
    });
  });

  describe('createAppError Factory', () => {
    it('should create AppError via factory function', () => {
      const content = { error: 'Error de prueba', usuario: 'Pedro Sánchez' };
      const appError = createAppError(content, 'Error de fábrica');

      expect(appError).toBeInstanceOf(AppError);
      expect(appError.content).toEqual(content);
      expect(appError.message).toBe('Error de fábrica');
    });
  });
});
