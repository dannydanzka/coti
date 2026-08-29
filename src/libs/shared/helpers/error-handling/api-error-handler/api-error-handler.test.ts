/**
 * API Error Handler Tests
 *
 * Functional tests for API error handling utilities.
 */

vi.mock('../logger', () => ({
  logError: vi.fn(),
}));

vi.mock('../prisma-errors', () => ({
  translatePrismaError: vi.fn(),
}));

import { createAppError } from '../app-error';
import { createErrorResponse, handleApiError } from './api-error-handler';
import { translatePrismaError } from '../prisma-errors';

const mockTranslate = vi.mocked(translatePrismaError);

describe('API Error Handler', () => {
  beforeEach(() => {
    mockTranslate.mockReturnValue(null);
  });

  describe('handleApiError', () => {
    it('retorna respuesta JSON con Error', async () => {
      const response = handleApiError(new Error('Error de prueba'), 'test-context');
      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error).toBe('Error de prueba');
      expect(response.status).toBe(500);
    });

    it('traduce error de Prisma cuando aplica', async () => {
      mockTranslate.mockReturnValueOnce('El correo electrónico ya está registrado');
      const response = handleApiError(new Error('Unique constraint'), 'test-context');
      const body = await response.json();
      expect(body.error).toBe('El correo electrónico ya está registrado');
    });

    it('maneja errores no-Error con mensaje genérico', async () => {
      const response = handleApiError('string error', 'test-context');
      const body = await response.json();
      expect(body.error).toContain('Error interno del servidor');
    });

    it('extrae status de error con propiedad status', async () => {
      const errorWithStatus = Object.assign(new Error('No encontrado'), { status: 404 });
      const response = handleApiError(errorWithStatus, 'test-context');
      expect(response.status).toBe(404);
    });

    it('ignora status no numérico', async () => {
      const errorWithBadStatus = Object.assign(new Error('Error'), { status: 'bad' });
      const response = handleApiError(errorWithBadStatus, 'test-context');
      expect(response.status).toBe(500);
    });

    it('maneja null como error', async () => {
      const response = handleApiError(null, 'test-context');
      const body = await response.json();
      expect(body.error).toContain('Error interno del servidor');
    });
  });

  describe('createErrorResponse', () => {
    it('crea respuesta con mensaje y status personalizados', async () => {
      const response = createErrorResponse('Recurso no encontrado', 404);
      const body = await response.json();
      expect(body.error).toBe('Recurso no encontrado');
      expect(body.success).toBe(false);
      expect(response.status).toBe(404);
    });

    it('usa status 500 por defecto', async () => {
      const response = createErrorResponse('Error del servidor');
      expect(response.status).toBe(500);
    });

    it('crea respuesta 400 para validación', async () => {
      const response = createErrorResponse('Campo requerido', 400);
      const body = await response.json();
      expect(body.error).toBe('Campo requerido');
      expect(response.status).toBe(400);
    });
  });

  describe('i18n contract (additive)', () => {
    it('createErrorResponse con key emite i18n metadata y resuelve fallback ES', async () => {
      const response = createErrorResponse({ key: 'errors.auth.unauthenticated' }, 401);
      const body = await response.json();
      expect(body.error).toBe('Usuario no autenticado');
      expect(body.i18n).toEqual({ key: 'errors.auth.unauthenticated' });
      expect(response.status).toBe(401);
    });

    it('createErrorResponse con key + params interpola el fallback', async () => {
      const response = createErrorResponse({
        key: 'errors.enrollment.notFound',
        params: { id: 'abc' },
      });
      const body = await response.json();
      expect(body.error).toBe('Inscripción no encontrada');
      expect(body.i18n).toEqual({ key: 'errors.enrollment.notFound', params: { id: 'abc' } });
    });

    it('createErrorResponse con string no emite i18n metadata (legacy)', async () => {
      const response = createErrorResponse('mensaje plano', 400);
      const body = await response.json();
      expect(body.error).toBe('mensaje plano');
      expect(body.i18n).toBeUndefined();
    });

    it('handleApiError convierte AppError con key válida en respuesta i18n', async () => {
      const appErr = createAppError({ userId: 'u1' }, 'errors.auth.unauthenticated');
      const response = handleApiError(appErr, 'ctx');
      const body = await response.json();
      expect(body.i18n).toEqual({
        key: 'errors.auth.unauthenticated',
        params: { userId: 'u1' },
      });
      expect(body.error).toBe('Usuario no autenticado');
    });

    it('handleApiError con AppError sin key mantiene fallback plano', async () => {
      const appErr = createAppError({}, 'Mensaje legacy en español');
      const response = handleApiError(appErr, 'ctx');
      const body = await response.json();
      expect(body.error).toBe('Mensaje legacy en español');
      expect(body.i18n).toBeUndefined();
    });
  });
});
