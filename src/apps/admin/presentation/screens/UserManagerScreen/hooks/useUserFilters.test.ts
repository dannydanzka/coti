/**
 * useUserFilters Hook Tests
 *
 * Tests filtering, sorting, pagination, and debounced search.
 * Spanish locale mandatory.
 */

import { act, renderHook } from '@testing-library/react';

import { USER_ROLES } from '@constants';

import { useUserFilters } from './useUserFilters';
import type { UseUserFiltersProps } from '../UserManagerScreen.interfaces';

const mockUsers = [
  {
    createdAt: new Date('2025-01-01'),
    email: 'maria.garcia@example.com',
    firstName: 'María',
    id: 'user-1',
    isActive: true,
    lastName: 'García',
    role: 'admin',
  },
  {
    createdAt: new Date('2025-01-02'),
    email: 'jose.lopez@example.com',
    firstName: 'José',
    id: 'user-2',
    isActive: false,
    lastName: 'López',
    role: 'participant',
  },
  {
    createdAt: new Date('2025-01-03'),
    email: 'owner@example.com',
    firstName: 'Ana',
    id: 'user-3',
    isActive: true,
    lastName: 'Martínez',
    role: 'owner',
  },
];

const defaultProps: UseUserFiltersProps = {
  isOwner: true,
  loadUsers: vi.fn(),
  serverPagination: { total: 3, totalPages: 1 } as never,
  users: mockUsers as never,
};

describe('useUserFilters', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Initial State', () => {
    it('returns correct initial values', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      expect(result.current.searchTerm).toBe('');
      expect(result.current.roleFilter).toBe('');
      expect(result.current.statusFilter).toBe('');
      expect(result.current.hasFilters).toBe(false);
      expect(result.current.table).toBeDefined();
      expect(result.current.table.filteredItems).toHaveLength(3);
    });

    it('filters out owner when user is not owner', () => {
      const { result } = renderHook(() => useUserFilters({ ...defaultProps, isOwner: false }));

      expect(result.current.table.filteredItems).toHaveLength(2);
      expect(result.current.table.filteredItems.every((u) => u.role !== USER_ROLES.OWNER)).toBe(
        true
      );
    });
  });

  describe('Search', () => {
    it('updates search term', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      act(() => {
        result.current.setSearchTerm('María');
      });

      expect(result.current.searchTerm).toBe('María');
      expect(result.current.hasFilters).toBe(true);
    });

    it('debounces search and triggers loadUsers', () => {
      const loadUsers = vi.fn();
      const { result } = renderHook(() => useUserFilters({ ...defaultProps, loadUsers }));

      act(() => {
        result.current.setSearchTerm('test');
      });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(loadUsers).toHaveBeenCalled();
    });
  });

  describe('Filters', () => {
    it('sets role filter', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      act(() => {
        result.current.setRoleFilter('admin');
      });

      expect(result.current.roleFilter).toBe('admin');
      expect(result.current.hasFilters).toBe(true);
    });

    it('sets status filter', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      act(() => {
        result.current.setStatusFilter('active');
      });

      expect(result.current.statusFilter).toBe('active');
      expect(result.current.hasFilters).toBe(true);
    });
  });

  describe('Sorting', () => {
    it('toggles sort direction on same field', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      expect(result.current.table.sort.sortField).toBe('name');
      expect(result.current.table.sort.sortDirection).toBe('asc');

      act(() => {
        result.current.table.sort.toggleSort('name');
      });

      expect(result.current.table.sort.sortDirection).toBe('desc');
    });

    it('changes sort field and resets direction', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      act(() => {
        result.current.table.sort.toggleSort('email');
      });

      expect(result.current.table.sort.sortField).toBe('email');
      expect(result.current.table.sort.sortDirection).toBe('asc');
    });

    it('returns correct sort icons', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      expect(result.current.table.sort.getSortIcon('name')).toBe('↑');
      expect(result.current.table.sort.getSortIcon('email')).toBe('↕');
    });

    it('checks if sort is active', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      expect(result.current.table.sort.isSortActive('name')).toBe(true);
      expect(result.current.table.sort.isSortActive('email')).toBe(false);
    });
  });

  describe('Pagination', () => {
    it('provides pagination controls', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      expect(result.current.table.pagination.currentPage).toBe(1);
      expect(result.current.table.pagination.itemsPerPage).toBe(20);
      expect(result.current.table.pagination.totalPages).toBe(1);
    });

    it('navigates to next and previous pages', () => {
      const props = {
        ...defaultProps,
        serverPagination: { total: 100, totalPages: 5 } as never,
      };
      const { result } = renderHook(() => useUserFilters(props));

      act(() => {
        result.current.table.pagination.goToNextPage();
      });

      expect(result.current.table.pagination.currentPage).toBe(2);

      act(() => {
        result.current.table.pagination.goToPrevPage();
      });

      expect(result.current.table.pagination.currentPage).toBe(1);
    });

    it('navigates to first and last page', () => {
      const props = {
        ...defaultProps,
        serverPagination: { total: 100, totalPages: 5 } as never,
      };
      const { result } = renderHook(() => useUserFilters(props));

      act(() => {
        result.current.table.pagination.goToLastPage();
      });

      expect(result.current.table.pagination.currentPage).toBe(5);

      act(() => {
        result.current.table.pagination.goToFirstPage();
      });

      expect(result.current.table.pagination.currentPage).toBe(1);
    });

    it('handles items per page change', () => {
      const { result } = renderHook(() => useUserFilters(defaultProps));

      act(() => {
        result.current.table.pagination.handleItemsPerPageChange({
          target: { value: '40' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      expect(result.current.table.pagination.itemsPerPage).toBe(40);
    });
  });
});
