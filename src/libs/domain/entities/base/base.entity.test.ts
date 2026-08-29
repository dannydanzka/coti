/**
 * Base Entity Tests
 *
 * Tests for base entity helper functions.
 */

import type { BaseEntity } from './base.interfaces';
import {
  createBaseEntityFields,
  getEntityAge,
  getEntityAgeInDays,
  isEntityCreatedAfter,
  isEntityOlderThan,
  isEntityUpdatedAfter,
  updateBaseEntityFields,
} from './base.entity';

const mockEntity = (overrides: Partial<BaseEntity> = {}): BaseEntity => ({
  createdAt: new Date('2025-01-01'),
  id: 'entity-1',
  updatedAt: new Date('2025-06-01'),
  ...overrides,
});

describe('Base Entity', () => {
  describe('createBaseEntityFields', () => {
    it('genera id, createdAt y updatedAt', () => {
      const fields = createBaseEntityFields();
      expect(fields.id).toContain('entity_');
      expect(fields.createdAt).toBeInstanceOf(Date);
      expect(fields.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('updateBaseEntityFields', () => {
    it('genera nuevo updatedAt', () => {
      const fields = updateBaseEntityFields();
      expect(fields.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('isEntityCreatedAfter', () => {
    it('retorna true si fue creada después', () => {
      expect(isEntityCreatedAfter(mockEntity(), new Date('2024-12-31'))).toBe(true);
    });

    it('retorna false si fue creada antes', () => {
      expect(isEntityCreatedAfter(mockEntity(), new Date('2025-02-01'))).toBe(false);
    });
  });

  describe('isEntityUpdatedAfter', () => {
    it('retorna true si fue actualizada después', () => {
      expect(isEntityUpdatedAfter(mockEntity(), new Date('2025-05-01'))).toBe(true);
    });

    it('retorna false si fue actualizada antes', () => {
      expect(isEntityUpdatedAfter(mockEntity(), new Date('2025-07-01'))).toBe(false);
    });
  });

  describe('getEntityAge', () => {
    it('retorna edad en milisegundos', () => {
      const age = getEntityAge(mockEntity({ createdAt: new Date(Date.now() - 1000) }));
      expect(age).toBeGreaterThanOrEqual(1000);
    });
  });

  describe('getEntityAgeInDays', () => {
    it('retorna edad en días', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      const days = getEntityAgeInDays(mockEntity({ createdAt: threeDaysAgo }));
      expect(days).toBe(3);
    });
  });

  describe('isEntityOlderThan', () => {
    it('retorna true para entidad vieja', () => {
      const oldDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      expect(isEntityOlderThan(mockEntity({ createdAt: oldDate }), 5)).toBe(true);
    });

    it('retorna false para entidad reciente', () => {
      expect(isEntityOlderThan(mockEntity({ createdAt: new Date() }), 5)).toBe(false);
    });
  });
});
