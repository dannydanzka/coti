/**
 * UserManagerScreen Constants Tests
 *
 * Tests formatDate and getVisiblePages utility functions.
 */

import { formatDate, getVisiblePages } from './UserManagerScreen.constants';

describe('UserManagerScreen Constants', () => {
  describe('formatDate', () => {
    it('formats a Date object', () => {
      const date = new Date('2025-06-15T00:00:00Z');
      const result = formatDate(date);
      expect(result).toContain('2025');
    });

    it('formats a string date', () => {
      const result = formatDate('2025-06-15');
      expect(result).toContain('2025');
    });

    it('returns N/A for null', () => {
      expect(formatDate(null)).toBe('N/A');
    });
  });

  describe('getVisiblePages', () => {
    it('returns all pages when total is less than maxVisible', () => {
      expect(getVisiblePages(1, 3)).toEqual([1, 2, 3]);
    });

    it('returns maxVisible pages centered on current page', () => {
      const pages = getVisiblePages(5, 10, 5);
      expect(pages).toHaveLength(5);
      expect(pages).toContain(5);
    });

    it('adjusts start when near the end', () => {
      const pages = getVisiblePages(9, 10, 5);
      expect(pages).toEqual([6, 7, 8, 9, 10]);
    });

    it('adjusts start when near the beginning', () => {
      const pages = getVisiblePages(1, 10, 5);
      expect(pages).toEqual([1, 2, 3, 4, 5]);
    });

    it('handles single page', () => {
      expect(getVisiblePages(1, 1)).toEqual([1]);
    });

    it('uses default maxVisible of 5', () => {
      const pages = getVisiblePages(3, 10);
      expect(pages).toHaveLength(5);
    });
  });
});
