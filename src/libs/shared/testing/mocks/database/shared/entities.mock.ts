/**
 * Shared Database Entity Mocks
 *
 * Mock data for common entity patterns.
 * Used for testing base functionality - specific entities should use context mocks.
 *
 * NOTE: For specific entities, use context-specific mocks:
 * - Admin participants: @mocks/database/admin
 * - Public participants: @mocks/database/public
 */

// Base Entity type for shared patterns
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Base Entity Mock - Common audit fields pattern
export const mockBaseEntity: BaseEntity = {
  createdAt: new Date('2025-01-15T10:00:00Z'),
  id: 'test-id-123',
  updatedAt: new Date('2025-01-15T11:00:00Z'),
};

// Base Entity with different ID for testing
export const mockBaseEntityAlt: BaseEntity = {
  createdAt: new Date('2025-01-14T09:00:00Z'),
  id: 'test-id-456',
  updatedAt: new Date('2025-01-15T10:30:00Z'),
};
