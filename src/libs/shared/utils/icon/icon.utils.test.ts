/**
 * Icon Utils Test Suite
 *
 * Essential tests for icon utility functions following Essential Testing Philosophy.
 */

import { AlertTriangle, Info, XCircle } from 'lucide-react';

import { type ErrorIconType, getErrorIcon } from './icon.utils';

describe('IconUtils', () => {
  describe('getErrorIcon', () => {
    it('should return correct icons for valid App error types', () => {
      expect(getErrorIcon('error')).toBe(XCircle);
      expect(getErrorIcon('warning')).toBe(AlertTriangle);
      expect(getErrorIcon('info')).toBe(Info);
    });

    it('should fallback to error icon for invalid types', () => {
      expect(getErrorIcon('invalid' as ErrorIconType)).toBe(XCircle);
      expect(getErrorIcon(undefined as any)).toBe(XCircle);
      expect(getErrorIcon(null as any)).toBe(XCircle);
      expect(getErrorIcon('' as ErrorIconType)).toBe(XCircle);
    });
  });

  describe('App Integration', () => {
    it('should work with notification system for Spanish messages', () => {
      const notifications = [
        { message: 'Error al procesar voto de María García', type: 'error' as ErrorIconType },
        { message: 'Advertencia: José Martínez ya votó', type: 'warning' as ErrorIconType },
        { message: 'Información: Nueva categoría agregada', type: 'info' as ErrorIconType },
      ];

      notifications.forEach(({ message, type }) => {
        const Icon = getErrorIcon(type);
        expect(Icon).toBeDefined();
        expect(typeof Icon).toBe('object');
        expect(message).toContain('í');
      });
    });

    it('should handle dynamic error severity for voting validation', () => {
      const getErrorSeverity = (errorCode: string): ErrorIconType => {
        if (errorCode.startsWith('ERR_')) return 'error';
        if (errorCode.startsWith('WARN_')) return 'warning';
        return 'info';
      };

      const votingErrors = ['ERR_DUPLICATE_VOTE', 'WARN_LOW_PARTICIPATION', 'INFO_VOTE_SAVED'];

      votingErrors.forEach((errorCode) => {
        const severity = getErrorSeverity(errorCode);
        const icon = getErrorIcon(severity);
        expect(icon).toBeDefined();
        expect([XCircle, AlertTriangle, Info]).toContain(icon);
      });
    });
  });
});
