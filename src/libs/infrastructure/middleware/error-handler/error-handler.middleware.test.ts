/**
 * Error Handler Middleware Tests
 *
 * Tests error formatting, status extraction, and handler wrapping.
 * Spanish locale mandatory.
 */

import { createApiError, handleError, withErrorHandler } from './error-handler.middleware';

vi.mock('@constants', () => ({
  HTTP_STATUS: {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
  },
}));

describe('Error Handler Middleware', () => {
  describe('handleError', () => {
    it('handles standard Error', async () => {
      const res = handleError(new Error('Algo salió mal'));
      const body = await res.json();

      expect(body.success).toBe(false);
      expect(body.error).toBe('Algo salió mal');
      expect(body.statusCode).toBe(500);
    });

    it('handles string error', async () => {
      const res = handleError('Error de texto');
      const body = await res.json();

      expect(body.error).toBe('Error de texto');
    });

    it('handles ApiError with statusCode', async () => {
      const apiError = { message: 'No encontrado', name: 'ApiError', statusCode: 404 };
      const res = handleError(apiError);
      const body = await res.json();

      expect(body.statusCode).toBe(404);
      expect(body.error).toBe('No encontrado');
    });

    it('handles ApiError with details', async () => {
      const apiError = {
        details: { field: 'email' },
        message: 'Validación fallida',
        name: 'ApiError',
        statusCode: 400,
      };
      const res = handleError(apiError);
      const body = await res.json();

      expect(body.details).toEqual({ field: 'email' });
    });

    it('detects JWT errors as 401', async () => {
      const error = new Error('Token inválido');
      error.name = 'JsonWebTokenError';
      const res = handleError(error);
      const body = await res.json();

      expect(body.statusCode).toBe(401);
    });

    it('detects permission errors as 403', async () => {
      const res = handleError(new Error('permission denied'));
      const body = await res.json();

      expect(body.statusCode).toBe(403);
    });

    it('detects not found errors as 404', async () => {
      const res = handleError(new Error('User not found'));
      const body = await res.json();

      expect(body.statusCode).toBe(404);
    });

    it('detects validation errors as 400', async () => {
      const res = handleError(new Error('validation failed'));
      const body = await res.json();

      expect(body.statusCode).toBe(400);
    });

    it('handles unknown error type', async () => {
      const res = handleError({ foo: 'bar' });
      const body = await res.json();

      expect(body.error).toBe('An unexpected error occurred');
      expect(body.statusCode).toBe(500);
    });

    it('handles silent option', () => {
      const res = handleError(new Error('Error silencioso'), { silent: true });
      expect(res.status).toBe(500);
    });

    it('includes data option', async () => {
      const res = handleError(new Error('Error'), { data: { hint: 'Reintenta' } });
      const body = await res.json();

      expect(body.data).toEqual({ hint: 'Reintenta' });
    });
  });

  describe('createApiError', () => {
    it('creates error with defaults', () => {
      const error = createApiError('Error genérico');

      expect(error.message).toBe('Error genérico');
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe('ApiError');
    });

    it('creates error with custom status', () => {
      const error = createApiError('No encontrado', 404 as never);

      expect(error.statusCode).toBe(404);
    });

    it('creates error with details', () => {
      const error = createApiError('Validación', 400 as never, { field: 'nombre' });

      expect(error.details).toEqual({ field: 'nombre' });
    });
  });

  describe('withErrorHandler', () => {
    it('passes through successful handler', async () => {
      const { NextResponse } = await import('next/server');
      const handler = vi.fn().mockResolvedValue(NextResponse.json({ success: true }));
      const wrapped = withErrorHandler(handler);

      const req = new Request('http://localhost/api/test');
      const res = await wrapped(req);
      const body = await res.json();

      expect(body.success).toBe(true);
    });

    it('catches handler errors', async () => {
      const handler = vi.fn().mockRejectedValue(new Error('Error del handler'));
      const wrapped = withErrorHandler(handler);

      const req = new Request('http://localhost/api/test');
      const res = await wrapped(req);
      const body = await res.json();

      expect(body.success).toBe(false);
      expect(body.error).toBe('Error del handler');
    });
  });
});
