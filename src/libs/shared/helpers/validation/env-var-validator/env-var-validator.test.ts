/**
 * Environment Variable Validator Tests
 */

import { getEnvVar } from './env-var-validator';

describe('getEnvVar', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  describe('when variable exists', () => {
    it('should return the environment variable value', () => {
      process.env['TEST_VAR'] = 'test-value';

      const result = getEnvVar('TEST_VAR');

      expect(result).toBe('test-value');
    });

    it('should return value when not required', () => {
      process.env['TEST_VAR'] = 'test-value';

      const result = getEnvVar('TEST_VAR', { required: false });

      expect(result).toBe('test-value');
    });
  });

  describe('when variable does not exist', () => {
    it('should throw error when required (default)', () => {
      delete process.env['TEST_VAR'];

      expect(() => getEnvVar('TEST_VAR')).toThrow(
        'Missing required environment variable: TEST_VAR'
      );
    });

    it('should return undefined when not required', () => {
      delete process.env['TEST_VAR'];

      const result = getEnvVar('TEST_VAR', { required: false });

      expect(result).toBeUndefined();
    });

    it('should return default value when provided', () => {
      delete process.env['TEST_VAR'];

      const result = getEnvVar('TEST_VAR', {
        defaultValue: 'default-value',
        required: false,
      });

      expect(result).toBe('default-value');
    });
  });

  describe('when variable is empty string', () => {
    it('should throw error when required', () => {
      process.env['TEST_VAR'] = '';

      expect(() => getEnvVar('TEST_VAR')).toThrow(
        'Missing required environment variable: TEST_VAR'
      );
    });

    it('should return default value when not required', () => {
      process.env['TEST_VAR'] = '';

      const result = getEnvVar('TEST_VAR', {
        defaultValue: 'default-value',
        required: false,
      });

      expect(result).toBe('default-value');
    });
  });
});
