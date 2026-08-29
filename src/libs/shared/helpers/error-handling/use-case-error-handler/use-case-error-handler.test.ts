/**
 * Use Case Error Handler Tests
 *
 * Essential smoke tests for use case error handling utilities following TESTING-STANDARDS.md.
 * Tests verify error handler methods are defined and return proper response structures.
 */

import {
  createAuthorizationError,
  createBusinessLogicError,
  createNotFoundError,
  createValidationError,
  handleUseCaseError,
} from './use-case-error-handler';

describe('Use Case Error Handler', () => {
  describe('handleUseCaseError', () => {
    it('should be defined', () => {
      expect(handleUseCaseError).toBeDefined();
      expect(typeof handleUseCaseError).toBe('function');
    });

    it('should return error response object', () => {
      const response = handleUseCaseError(new Error('Error de prueba'), 'test-context');
      expect(response).toBeDefined();
      expect(response).toHaveProperty('error');
      expect(response).toHaveProperty('status');
      expect(response).toHaveProperty('success');
      expect(response.success).toBe(false);
    });

    it('should preserve original error message for domain errors', () => {
      const error = new Error('Al menos un ID de usuario es requerido');
      const response = handleUseCaseError(error, 'test-context');
      expect(response.error).toBe('Al menos un ID de usuario es requerido');
    });

    it('should translate Prisma column-too-long errors', () => {
      const error = new Error(
        "Invalid prisma.evidenceAttempt.create() invocation: The provided value for the column is too long for the column's type."
      );
      const response = handleUseCaseError(error, 'test-context');
      expect(response.error).toContain('excede el tamaño máximo permitido');
    });

    it('should translate Prisma unique constraint errors', () => {
      const error = new Error('Unique constraint failed on the fields: (`email`)');
      const response = handleUseCaseError(error, 'test-context');
      expect(response.error).toContain('correo electrónico');
    });
  });

  describe('createValidationError', () => {
    it('should be defined', () => {
      expect(createValidationError).toBeDefined();
      expect(typeof createValidationError).toBe('function');
    });

    it('should create validation error with message', () => {
      const response = createValidationError('Campo requerido');
      expect(response).toBeDefined();
      expect(response.error).toBe('Campo requerido');
      expect(response.status).toBe(400);
      expect(response.success).toBe(false);
    });

    it('should include field details when provided', () => {
      const response = createValidationError('Email inválido', 'email', 'test@invalid');
      expect(response.details).toBeDefined();
    });

    it('should not include details without field', () => {
      const response = createValidationError('Error general');
      expect(response.details).toBeUndefined();
    });
  });

  describe('createAuthorizationError', () => {
    it('returns authorization error with default message', () => {
      const response = createAuthorizationError();
      expect(response.error).toBe('Acceso denegado');
      expect(response.status).toBe(401);
      expect(response.success).toBe(false);
    });

    it('returns authorization error with custom message', () => {
      const response = createAuthorizationError('No tienes permisos suficientes');
      expect(response.error).toBe('No tienes permisos suficientes');
    });

    it('includes reason when provided', () => {
      const response = createAuthorizationError('Sin acceso', 'Rol insuficiente');
      expect(response.details).toBeDefined();
    });

    it('omits details without reason', () => {
      const response = createAuthorizationError('Sin acceso');
      expect(response.details).toBeUndefined();
    });
  });

  describe('createNotFoundError', () => {
    it('returns not found error with resource name', () => {
      const response = createNotFoundError('Usuario');
      expect(response.error).toBe('Usuario no encontrado');
      expect(response.status).toBe(404);
      expect(response.success).toBe(false);
    });

    it('returns not found error with identifier', () => {
      const response = createNotFoundError('Usuario', 'user-123');
      expect(response.error).toContain("'user-123'");
      expect(response.error).toContain('no encontrado');
    });

    it('includes details with resource info', () => {
      const response = createNotFoundError('Evento', 'evt-456');
      expect(response.details).toBeDefined();
    });
  });

  describe('createBusinessLogicError', () => {
    it('returns business logic error', () => {
      const response = createBusinessLogicError('No se puede eliminar un evento activo');
      expect(response.error).toBe('No se puede eliminar un evento activo');
      expect(response.status).toBe(422);
      expect(response.success).toBe(false);
    });

    it('includes error code when provided', () => {
      const response = createBusinessLogicError('Error de negocio', 'EVENT_ACTIVE');
      expect(response.details).toBeDefined();
    });

    it('includes context when provided', () => {
      const response = createBusinessLogicError('Error de negocio', 'ENROLLMENT_LIMIT', {
        maxEnrollments: 100,
      });
      expect(response.details).toBeDefined();
    });

    it('works without code and context', () => {
      const response = createBusinessLogicError('Regla de negocio violada');
      expect(response.details).toBeDefined();
    });
  });

  describe('handleUseCaseError edge cases', () => {
    it('handles AppError instances', async () => {
      const { AppError } = await import('../app-error');
      const appError = new AppError({ code: 'TEST' }, 'Error de aplicación');
      const response = handleUseCaseError(appError, 'test-context');
      expect(response.error).toBe('Error de aplicación');
      expect(response.status).toBe(400);
    });

    it('handles non-Error objects', () => {
      const response = handleUseCaseError('string error', 'test-context');
      expect(response.i18n?.key).toBe('errors.generic.serverError');
      expect(response.status).toBe(500);
    });

    it('handles null error', () => {
      const response = handleUseCaseError(null, 'test-context');
      expect(response.success).toBe(false);
      expect(response.status).toBe(500);
    });

    it('handles undefined error', () => {
      const response = handleUseCaseError(undefined, 'test-context');
      expect(response.success).toBe(false);
    });
  });
});
