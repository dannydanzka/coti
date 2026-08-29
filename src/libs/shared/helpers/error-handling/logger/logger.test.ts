/**
 * Logger Tests
 *
 * Essential smoke tests for logger utility following TESTING-STANDARDS.md.
 * Tests verify logger methods are defined and callable without errors.
 */

import { logger } from './logger';

describe('Logger', () => {
  describe('logger object', () => {
    it('should be defined', () => {
      expect(logger).toBeDefined();
    });

    it('should have debug method', () => {
      expect(logger.debug).toBeDefined();
      expect(typeof logger.debug).toBe('function');
    });

    it('should have error method', () => {
      expect(logger.error).toBeDefined();
      expect(typeof logger.error).toBe('function');
    });

    it('should have info method', () => {
      expect(logger.info).toBeDefined();
      expect(typeof logger.info).toBe('function');
    });

    it('should have warn method', () => {
      expect(logger.warn).toBeDefined();
      expect(typeof logger.warn).toBe('function');
    });
  });

  describe('logger methods execution', () => {
    it('should call debug method without throwing', () => {
      const debugFn = logger.debug;
      expect(() => debugFn('Test debug message')).not.toThrow();
    });

    it('should call error without throwing', () => {
      expect(() => logger.error('Test error message')).not.toThrow();
    });

    it('should call info without throwing', () => {
      expect(() => logger.info('Test info message')).not.toThrow();
    });

    it('should call warn without throwing', () => {
      expect(() => logger.warn('Test warn message')).not.toThrow();
    });

    it('should call methods with context without throwing', () => {
      const context = { userId: 'test-123' };
      expect(() => logger.info('Test with context', context)).not.toThrow();
    });
  });
});
