/**
 * Base Entity Interfaces
 *
 * All types and interfaces for base entity.
 * Following DOMAIN-OBJECTS-STANDARDS: Types/Interfaces ONLY in .interfaces.ts files.
 *
 */

export interface BaseEntity {
  id: string;

  createdAt: Date;
  updatedAt: Date;
}
