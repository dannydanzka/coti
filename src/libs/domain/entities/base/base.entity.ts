/**
 * Base Entity
 *
 * Shared base implementation for all domain entities in the system.
 * Following DOMAIN-OBJECTS-STANDARDS: Entities = Implementation ONLY, NO interfaces/types
 * All interfaces/types moved to base.interfaces.ts
 *
 */

import type { BaseEntity } from './base.interfaces';

export const baseEntitySchema = {
  createdAt: { required: true, type: 'date' },
  id: { minLength: 1, required: true, type: 'string' },
  updatedAt: { required: true, type: 'date' },
};

export const createBaseEntityFields = (): Pick<BaseEntity, 'id' | 'createdAt' | 'updatedAt'> => ({
  createdAt: new Date(),
  id: `entity_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
  updatedAt: new Date(),
});

export const updateBaseEntityFields = (): Pick<BaseEntity, 'updatedAt'> => ({
  updatedAt: new Date(),
});

export const isEntityCreatedAfter = (entity: BaseEntity, date: Date): boolean => {
  return entity.createdAt > date;
};

export const isEntityUpdatedAfter = (entity: BaseEntity, date: Date): boolean => {
  return entity.updatedAt > date;
};

export const getEntityAge = (entity: BaseEntity): number => {
  return Date.now() - entity.createdAt.getTime();
};

export const getEntityAgeInDays = (entity: BaseEntity): number => {
  return Math.floor(getEntityAge(entity) / (1000 * 60 * 60 * 24));
};

export const isEntityOlderThan = (entity: BaseEntity, days: number): boolean => {
  return getEntityAgeInDays(entity) > days;
};
