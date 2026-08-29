/**
 * Array Utils Test Suite
 *
 * Essential tests for array utility functions following Essential Testing Philosophy.
 */

import { unique } from './array.utils';

describe('ArrayUtils', () => {
  describe('unique', () => {
    it('should remove duplicate numbers', () => {
      const input = [1, 2, 2, 3, 3, 3, 4];
      const expected = [1, 2, 3, 4];
      expect(unique(input)).toEqual(expected);
    });

    it('should remove duplicate strings with Spanish data', () => {
      const input = ['María', 'José', 'María', 'Ana', 'José'];
      const expected = ['María', 'José', 'Ana'];
      expect(unique(input)).toEqual(expected);
    });

    it('should handle empty arrays', () => {
      expect(unique([])).toEqual([]);
    });

    it('should handle objects with Spanish data', () => {
      const user1 = { id: 1, name: 'María García' };
      const user2 = { id: 2, name: 'José Martínez' };
      const input = [user1, user2, user1];

      expect(unique(input)).toHaveLength(2);
      expect(unique(input)).toContain(user1);
      expect(unique(input)).toContain(user2);
    });
  });
});
