/**
 * Array Utilities
 * Utilities for array manipulation with deduplication.
 */

/**
 * Removes duplicate elements from array preserving order.
 * Supports primitives and objects with deep comparison.
 */
export const unique = <T>(array: T[]): T[] => {
  if (!Array.isArray(array)) {
    throw new Error('Parameter must be a valid array');
  }

  if (array.length === 0) return [];

  const [firstItem] = array;

  if (typeof firstItem !== 'object' || firstItem === null) {
    return Array.from(new Set(array));
  }

  const seen = new Set<string>();
  return array.filter((item) => {
    const serialized = JSON.stringify(item);
    if (seen.has(serialized)) {
      return false;
    }
    seen.add(serialized);
    return true;
  });
};
