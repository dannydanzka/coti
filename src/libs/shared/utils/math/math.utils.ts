/**
 * Math Utilities
 * Pure mathematical operations for common calculations.
 */

/**
 * Clamps value between min and max bounds.
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Generates random number between min and max.
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Calculates percentage of value relative to total.
 * Returns 0 if total is 0 to avoid division by zero.
 */
export const percentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Rounds number to specified decimal places.
 * Defaults to 2 decimal places.
 */
export const round = (value: number, decimals = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
