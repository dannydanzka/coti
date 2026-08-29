/**
 * Base Repository Utilities Tests
 *
 * Essential tests para utilidades compartidas de repositorios.
 * Tests de funciones de error handling y response formatting.
 */

import {
  applyPagination,
  calculatePagination,
  createErrorResponse,
  createRepositoryHelpers,
  createSuccessResponse,
  generateId,
  handleRepositoryError,
  logRepositoryOperation,
  validateRequiredFields,
} from './base.repository';

describe('base.repository utilities', () => {
  describe('createSuccessResponse', () => {
    it('debe crear respuesta exitosa con data', () => {
      const data = { id: '123', name: 'Test' };
      const response = createSuccessResponse(data);

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.metadata).toBeDefined();
    });

    it('debe incluir metadata personalizado', () => {
      const data = { test: true };
      const metadata = { source: 'test' };
      const response = createSuccessResponse(data, metadata);

      expect(response.metadata['source']).toBe('test');
    });
  });

  describe('createErrorResponse', () => {
    it('debe crear respuesta de error', () => {
      const errorMsg = 'Error de prueba';
      const response = createErrorResponse(errorMsg);

      expect(response.success).toBe(false);
      expect(response.error).toBe(errorMsg);
      expect(response.data).toBeNull();
    });
  });

  describe('handleRepositoryError', () => {
    it('debe lanzar error con formato de repositorio', () => {
      expect(() => {
        handleRepositoryError('TestRepo', 'findById', new Error('Error original'));
      }).toThrow('[TestRepo] Error en findById: Error original');
    });

    it('maneja errores no-Error', () => {
      expect(() => {
        handleRepositoryError('TestRepo', 'create', 'string error');
      }).toThrow('Error desconocido');
    });
  });

  describe('generateId', () => {
    it('genera ID único', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).toBeDefined();
      expect(typeof id1).toBe('string');
      expect(id1).not.toBe(id2);
    });
  });

  describe('validateRequiredFields', () => {
    it('no lanza error cuando todos los campos están presentes', () => {
      expect(() => {
        validateRequiredFields({ email: 'maria@ejemplo.com', name: 'María' }, ['name', 'email']);
      }).not.toThrow();
    });

    it('lanza error para campos faltantes', () => {
      expect(() => {
        validateRequiredFields({ email: '', name: 'María' }, ['name', 'email']);
      }).toThrow('Campos requeridos faltantes: email');
    });

    it('lanza error para campos null', () => {
      expect(() => {
        validateRequiredFields({ email: null, name: undefined }, ['name', 'email']);
      }).toThrow('name, email');
    });
  });

  describe('calculatePagination', () => {
    it('calcula paginación correctamente', () => {
      const result = calculatePagination(50, 2, 10);
      expect(result.total).toBe(50);
      expect(result.totalPages).toBe(5);
      expect(result.hasNextPage).toBe(true);
      expect(result.hasPrevPage).toBe(true);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
    });

    it('primera página no tiene prevPage', () => {
      const result = calculatePagination(30, 1, 10);
      expect(result.hasPrevPage).toBe(false);
      expect(result.hasNextPage).toBe(true);
    });

    it('última página no tiene nextPage', () => {
      const result = calculatePagination(30, 3, 10);
      expect(result.hasNextPage).toBe(false);
      expect(result.hasPrevPage).toBe(true);
    });

    it('una sola página', () => {
      const result = calculatePagination(5, 1, 10);
      expect(result.totalPages).toBe(1);
      expect(result.hasNextPage).toBe(false);
      expect(result.hasPrevPage).toBe(false);
    });
  });

  describe('applyPagination', () => {
    const items = ['a', 'b', 'c', 'd', 'e'];

    it('retorna la página correcta', () => {
      const result = applyPagination(items, { limit: 2, page: 1 });
      expect(result.data).toEqual(['a', 'b']);
      expect(result.pagination.total).toBe(5);
    });

    it('retorna segunda página', () => {
      const result = applyPagination(items, { limit: 2, page: 2 });
      expect(result.data).toEqual(['c', 'd']);
    });

    it('retorna última página parcial', () => {
      const result = applyPagination(items, { limit: 2, page: 3 });
      expect(result.data).toEqual(['e']);
    });
  });

  describe('logRepositoryOperation', () => {
    it('no lanza error', () => {
      expect(() => {
        logRepositoryOperation('TestRepo', 'findById', { id: 'user-1' });
      }).not.toThrow();
    });

    it('funciona sin params', () => {
      expect(() => {
        logRepositoryOperation('TestRepo', 'findAll');
      }).not.toThrow();
    });
  });

  describe('createRepositoryHelpers', () => {
    it('retorna objeto con todas las utilidades', () => {
      const helpers = createRepositoryHelpers('TestRepo');
      expect(helpers.handleError).toBeDefined();
      expect(helpers.logOperation).toBeDefined();
      expect(helpers.validateRequiredFields).toBeDefined();
      expect(helpers.generateId).toBeDefined();
      expect(helpers.calculatePagination).toBeDefined();
      expect(helpers.applyPagination).toBeDefined();
      expect(helpers.createSuccessResponse).toBeDefined();
      expect(helpers.createErrorResponse).toBeDefined();
    });

    it('handleError lanza con nombre del repo', () => {
      const helpers = createRepositoryHelpers('UserRepo');
      expect(() => {
        helpers.handleError('update', new Error('DB error'));
      }).toThrow('[UserRepo]');
    });

    it('logOperation no lanza error', () => {
      const helpers = createRepositoryHelpers('UserRepo');
      expect(() => {
        helpers.logOperation('findAll', { page: 1 });
      }).not.toThrow();
    });
  });
});
