/**
 * Object Utilities
 * Functions for object manipulation with type safety.
 */

/**
 * Checks if value is empty (null, undefined, or empty object).
 */
export const isEmpty = (obj: unknown): boolean => {
  return (
    obj === null ||
    obj === undefined ||
    (typeof obj === 'object' && obj && Object.keys(obj).length === 0)
  );
};
