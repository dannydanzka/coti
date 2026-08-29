/**
 * useAdminNavigation Hook Tests
 *
 * Essential tests for admin navigation hook.
 * Tests navigation items and role-based filtering.
 * Spanish locale mandatory.
 */

import { renderHook } from '@testing-library/react';

import { useAdminNavigation } from './useAdminNavigation';

const mockHasRole = vi.fn();

vi.mock('@utils', () => ({
  hasRole: (role: string) => mockHasRole(role),
}));

describe('useAdminNavigation', () => {
  beforeEach(() => {
    mockHasRole.mockReturnValue(true);
  });

  describe('Initial State', () => {
    it('returns navigation items array', () => {
      const { result } = renderHook(() => useAdminNavigation());

      expect(result.current.navigationItems).toBeDefined();
      expect(Array.isArray(result.current.navigationItems)).toBe(true);
    });

    it('returns visible nav items array', () => {
      const { result } = renderHook(() => useAdminNavigation());

      expect(result.current.visibleNavItems).toBeDefined();
      expect(Array.isArray(result.current.visibleNavItems)).toBe(true);
    });
  });

  describe('Navigation Items Structure', () => {
    it('each item has required properties', () => {
      const { result } = renderHook(() => useAdminNavigation());

      result.current.navigationItems.forEach((item) => {
        expect(item.id).toBeDefined();
        expect(item.label).toBeDefined();
        expect(item.path).toBeDefined();
        expect(item.icon).toBeDefined();
      });
    });

    it('includes dashboard item', () => {
      const { result } = renderHook(() => useAdminNavigation());

      const dashboardItem = result.current.navigationItems.find((item) => item.id === 'dashboard');

      expect(dashboardItem).toBeDefined();
      expect(dashboardItem?.path).toBe('/admin');
    });

    it('includes participants item with Spanish label', () => {
      const { result } = renderHook(() => useAdminNavigation());

      const participantsItem = result.current.navigationItems.find(
        (item) => item.id === 'participants'
      );

      expect(participantsItem).toBeDefined();
      expect(participantsItem?.label).toBe('Participantes');
    });
  });

  describe('Role-based Filtering', () => {
    it('shows all items when user has admin role', () => {
      mockHasRole.mockReturnValueOnce(true);

      const { result } = renderHook(() => useAdminNavigation());

      expect(result.current.visibleNavItems).toHaveLength(result.current.navigationItems.length);
    });

    describe('when user lacks required role', () => {
      beforeEach(() => {
        mockHasRole.mockReturnValue(false);
      });

      it('filters items when user lacks required role', () => {
        const { result } = renderHook(() => useAdminNavigation());

        expect(result.current.visibleNavItems).toHaveLength(0);
      });
    });

    it('calls hasRole for each item with roles', () => {
      mockHasRole.mockReturnValueOnce(true);

      renderHook(() => useAdminNavigation());

      expect(mockHasRole).toHaveBeenCalled();
    });

    it('shows items without role restrictions', () => {
      mockHasRole.mockReturnValueOnce(false);

      const { result } = renderHook(() => useAdminNavigation());

      const itemsWithoutRoles = result.current.navigationItems.filter((item) => !item.roles);
      const visibleItemsWithoutRoles = result.current.visibleNavItems.filter((item) => !item.roles);

      expect(visibleItemsWithoutRoles).toHaveLength(itemsWithoutRoles.length);
    });
  });

  describe('Memoization', () => {
    it('returns same reference for navigationItems on rerender', () => {
      const { rerender, result } = renderHook(() => useAdminNavigation());

      const initialItems = result.current.navigationItems;

      rerender();

      expect(result.current.navigationItems).toBe(initialItems);
    });

    it('returns same reference for visibleNavItems when deps unchanged', () => {
      mockHasRole.mockReturnValueOnce(true);

      const { rerender, result } = renderHook(() => useAdminNavigation());

      const initialVisibleItems = result.current.visibleNavItems;

      rerender();

      expect(result.current.visibleNavItems).toBe(initialVisibleItems);
    });
  });

  describe('Navigation Paths', () => {
    it('all paths start with /admin', () => {
      const { result } = renderHook(() => useAdminNavigation());

      result.current.navigationItems.forEach((item) => {
        expect(item.path.startsWith('/admin')).toBe(true);
      });
    });

    it('paths are unique', () => {
      const { result } = renderHook(() => useAdminNavigation());

      const paths = result.current.navigationItems.map((item) => item.path);
      const uniquePaths = new Set(paths);

      expect(uniquePaths.size).toBe(paths.length);
    });
  });
});
