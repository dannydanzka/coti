/**
 * Date Utils Test Suite
 *
 * Essential tests for date utility functions following Essential Testing Philosophy.
 */

import { addDays, formatDate, formatDateTime, formatTimeAgo, isExpired } from './date.utils';

describe('DateUtils', () => {
  const mockDate = new Date('2025-01-15T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('formatDate', () => {
    it('should format Date object with Spanish locale', () => {
      const result = formatDate(mockDate);
      expect(result).toBe('15/1/2025');
    });

    it('should format date string', () => {
      const result = formatDate('2025-01-15T12:00:00Z');
      expect(result).toBe('15/1/2025');
    });

    it('should handle custom locale', () => {
      const result = formatDate(mockDate, 'en-US');
      expect(result).toBe('1/15/2025');
    });
  });

  describe('formatDateTime', () => {
    it('should format with Spanish time', () => {
      const result = formatDateTime(mockDate);
      expect(result).toContain('15/1/2025');
      expect(result).toContain(':');
    });

    it('should handle timezone differences', () => {
      const utcDate = new Date('2025-01-15T12:00:00Z');
      const result = formatDateTime(utcDate, 'es-MX');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(10);
    });
  });

  describe('formatTimeAgo', () => {
    it('should format recent times in Spanish', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const result = formatTimeAgo(fiveMinutesAgo);
      expect(result).toContain('minuto');
    });

    it('should handle hours and days', () => {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const result = formatTimeAgo(twoDaysAgo);
      expect(result).toContain('día');
    });
  });

  describe('addDays', () => {
    it('should add positive days', () => {
      const result = addDays(mockDate, 7);
      const expected = new Date('2025-01-22T12:00:00Z');
      expect(result).toEqual(expected);
    });

    it('should subtract days with negative values', () => {
      const result = addDays(mockDate, -3);
      const expected = new Date('2025-01-12T12:00:00Z');
      expect(result).toEqual(expected);
    });
  });

  describe('isExpired', () => {
    it('should detect expired dates', () => {
      const yesterday = new Date('2025-01-14T12:00:00Z');
      expect(isExpired(yesterday)).toBe(true);
    });

    it('should detect non-expired dates', () => {
      const tomorrow = new Date('2025-01-16T12:00:00Z');
      expect(isExpired(tomorrow)).toBe(false);
    });

    it('should handle current date', () => {
      expect(isExpired(mockDate)).toBe(false);
    });
  });

  describe('formatTimeAgo edge cases', () => {
    it('returns "ahora" for just now', () => {
      const result = formatTimeAgo(new Date());
      expect(result).toBe('ahora');
    });

    it('returns singular minute', () => {
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      expect(formatTimeAgo(oneMinuteAgo)).toBe('hace 1 minuto');
    });

    it('returns singular hour', () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      expect(formatTimeAgo(oneHourAgo)).toBe('hace 1 hora');
    });

    it('returns multiple hours', () => {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
      expect(formatTimeAgo(threeHoursAgo)).toBe('hace 3 horas');
    });

    it('returns singular day', () => {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(formatTimeAgo(oneDayAgo)).toBe('hace 1 día');
    });

    it('falls back to formatDate for old dates', () => {
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      const result = formatTimeAgo(twoWeeksAgo);
      expect(result).toContain('/');
    });

    it('handles future dates', () => {
      const fiveMinutesAhead = new Date(Date.now() + 5 * 60 * 1000);
      expect(formatTimeAgo(fiveMinutesAhead)).toContain('en');
    });

    it('handles future hours', () => {
      const twoHoursAhead = new Date(Date.now() + 2 * 60 * 60 * 1000);
      expect(formatTimeAgo(twoHoursAhead)).toContain('hora');
    });

    it('handles future days', () => {
      const threeDaysAhead = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      expect(formatTimeAgo(threeDaysAhead)).toContain('día');
    });

    it('handles future singular minute', () => {
      const oneMinuteAhead = new Date(Date.now() + 61 * 1000);
      expect(formatTimeAgo(oneMinuteAhead)).toBe('en 1 minuto');
    });

    it('handles future singular hour', () => {
      const oneHourAhead = new Date(Date.now() + 61 * 60 * 1000);
      expect(formatTimeAgo(oneHourAhead)).toBe('en 1 hora');
    });

    it('handles future singular day', () => {
      const oneDayAhead = new Date(Date.now() + 25 * 60 * 60 * 1000);
      expect(formatTimeAgo(oneDayAhead)).toBe('en 1 día');
    });

    it('handles near-future "ahora"', () => {
      const thirtySecondsAhead = new Date(Date.now() + 30 * 1000);
      expect(formatTimeAgo(thirtySecondsAhead)).toBe('ahora');
    });

    it('handles string date input', () => {
      const result = formatTimeAgo('2025-01-15T11:55:00Z');
      expect(result).toContain('minuto');
    });
  });

  describe('Error handling', () => {
    it('formatDate throws for invalid date', () => {
      expect(() => formatDate('invalid')).toThrow('Invalid date');
    });

    it('formatDateTime throws for invalid date', () => {
      expect(() => formatDateTime('invalid')).toThrow('Invalid date');
    });

    it('formatTimeAgo throws for invalid date', () => {
      expect(() => formatTimeAgo('invalid')).toThrow('Invalid date');
    });

    it('isExpired throws for invalid date', () => {
      expect(() => isExpired('invalid')).toThrow('Invalid date');
    });

    it('addDays throws for invalid date', () => {
      expect(() => addDays(new Date('invalid'), 1)).toThrow('Invalid date');
    });

    it('addDays throws for non-integer days', () => {
      expect(() => addDays(mockDate, 1.5)).toThrow('integer');
    });

    it('formatDate throws for null', () => {
      expect(() => formatDate(null as never)).toThrow('Date is required');
    });

    it('formatDateTime throws for null', () => {
      expect(() => formatDateTime(null as never)).toThrow('Date is required');
    });

    it('formatTimeAgo throws for null', () => {
      expect(() => formatTimeAgo(null as never)).toThrow('Date is required');
    });

    it('isExpired throws for null', () => {
      expect(() => isExpired(null as never)).toThrow('Date is required');
    });

    it('addDays throws for non-Date', () => {
      expect(() => addDays('2025-01-01' as never, 1)).toThrow('Valid Date object required');
    });
  });

  describe('Integration with Spanish voting dates', () => {
    it('should handle voting period calculations', () => {
      const votingStart = new Date('2025-01-01T00:00:00Z');
      const votingEnd = addDays(votingStart, 30);

      expect(isExpired(votingEnd)).toBe(false);
      expect(formatDate(votingStart)).toBe('1/1/2025');
      expect(formatDate(votingEnd)).toBe('31/1/2025');
    });
  });
});
