/**
 * Error Monitoring Service Tests
 *
 * Smoke tests for error monitoring service.
 * Module structure tests.
 */

import { errorMonitoringService } from './error-monitoring.service';

describe('errorMonitoringService', () => {
  const mockError = {
    message: 'Error crítico en la aplicación',
    severity: 8,
    timestamp: '2025-01-15T10:00:00Z',
    url: '/admin/users',
    userAgent: 'Mozilla/5.0',
  };

  describe('Module Structure', () => {
    it('exports errorMonitoringService object', () => {
      expect(errorMonitoringService).toBeDefined();
      expect(typeof errorMonitoringService).toBe('object');
    });
  });

  describe('captureException', () => {
    it('captures exception and returns success', async () => {
      const result = await errorMonitoringService.captureException(mockError);

      expect(result.success).toBe(true);
      expect(result.errorId).toContain('sentry_mock_');
    });

    it('captures exception with default severity', async () => {
      const result = await errorMonitoringService.captureException({
        ...mockError,
        severity: undefined,
      });

      expect(result.success).toBe(true);
    });
  });

  describe('saveToDatabase', () => {
    it('saves error to database', async () => {
      const result = await errorMonitoringService.saveToDatabase(mockError);

      expect(result.success).toBe(true);
      expect(result.id).toContain('db_mock_');
    });
  });

  describe('sendAlert', () => {
    it('sends alerts to all channels', async () => {
      const result = await errorMonitoringService.sendAlert({
        errorId: 'err-1',
        message: 'Error crítico',
        severity: 9,
        timestamp: '2025-01-15T10:00:00Z',
        url: '/admin',
        userAgent: 'test',
      });

      expect(result.success).toBe(true);
    });
  });
});
