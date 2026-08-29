/**
 * Math Utils Tests
 *
 * Tests clamp, randomBetween, percentage, and round.
 */

import { clamp, percentage, randomBetween, round } from './math.utils';

describe('Math Utils', () => {
  describe('clamp', () => {
    it('clamps value below min', () => {
      expect(clamp(-5, 0, 100)).toBe(0);
    });

    it('clamps value above max', () => {
      expect(clamp(150, 0, 100)).toBe(100);
    });

    it('returns value within range', () => {
      expect(clamp(50, 0, 100)).toBe(50);
    });

    it('handles equal min and max', () => {
      expect(clamp(10, 5, 5)).toBe(5);
    });
  });

  describe('randomBetween', () => {
    it('returns value within range', () => {
      const result = randomBetween(10, 20);
      expect(result).toBeGreaterThanOrEqual(10);
      expect(result).toBeLessThanOrEqual(20);
    });

    it('handles negative range', () => {
      const result = randomBetween(-10, -5);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-5);
    });
  });

  describe('percentage', () => {
    it('calculates percentage', () => {
      expect(percentage(25, 100)).toBe(25);
    });

    it('returns 0 for zero total', () => {
      expect(percentage(10, 0)).toBe(0);
    });

    it('handles decimals', () => {
      expect(percentage(1, 3)).toBeCloseTo(33.33, 1);
    });
  });

  describe('round', () => {
    it('rounds to 2 decimals by default', () => {
      expect(round(3.14159)).toBe(3.14);
    });

    it('rounds to specified decimals', () => {
      expect(round(3.14159, 3)).toBe(3.142);
    });

    it('rounds to 0 decimals', () => {
      expect(round(3.7, 0)).toBe(4);
    });
  });
});
