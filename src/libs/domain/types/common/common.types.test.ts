/**
 * Common Types Tests
 */

import type { PaginationParams, SortOrder, SortParams } from './common.types';

describe('Common Types', () => {
  it('PaginationParams type is valid', () => {
    const params: PaginationParams = { limit: 20, page: 1 };
    expect(params.page).toBe(1);
  });

  it('SortParams type is valid', () => {
    const params: SortParams = { sortBy: 'name', sortOrder: 'asc' as SortOrder };
    expect(params.sortBy).toBe('name');
  });
});
