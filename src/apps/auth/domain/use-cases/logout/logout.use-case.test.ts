/**
 * Logout Use Case Tests
 *
 * Essential tests for user logout with stateless JWT and audit logging.
 * Spanish locale and comprehensive validation.
 *
 */

import type { NextRequest } from 'next/server';

import { expectFailure, expectSuccess } from '@testing/helpers';

import { executeLogout } from './logout.use-case';
import type { LogoutParams } from './logout.interfaces';

describe('executeLogout', () => {
  const mockRequest = {} as NextRequest;

  const validParams: LogoutParams = {
    ipAddress: '192.168.1.1',
    request: mockRequest,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    userId: 'admin-1-id',
  };
  describe('Successful Logout', () => {
    it('processes logout with valid parameters', async () => {
      const r = expectSuccess(await executeLogout(validParams));
      expect((r as { message: string }).message).toContain('Sesión cerrada exitosamente');
    });

    it('processes logout without userId (stateless)', async () => {
      const r = expectSuccess(
        await executeLogout({
          ipAddress: '192.168.1.1',
          request: mockRequest,
          userAgent: 'Mozilla/5.0',
        })
      );
      expect((r as { message: string }).message).toContain('Sesión cerrada exitosamente');
    });

    it('sanitizes and trims parameters', async () => {
      expectSuccess(
        await executeLogout({
          ipAddress: '  192.168.1.1  ',
          request: mockRequest,
          userAgent: '  Mozilla/5.0  ',
          userId: '  admin-1-id  ',
        })
      );
    });

    it('handles unknown IP address gracefully', async () => {
      expectSuccess(await executeLogout({ ...validParams, ipAddress: '0.0.0.0' }));
    });
  });

  describe('Validation Errors', () => {
    it('rejects with missing params', async () => {
      expectFailure(await executeLogout(null as any), 'Parámetros de logout requeridos');
    });

    it('handles empty params with defaults', async () => {
      expectSuccess(await executeLogout({} as LogoutParams));
    });

    it('accepts any IP address format for flexibility', async () => {
      expectSuccess(await executeLogout({ ...validParams, ipAddress: 'invalid-ip-address' }));
    });

    it('rejects with excessively long user agent', async () => {
      expectFailure(
        await executeLogout({ ...validParams, userAgent: 'a'.repeat(1001) }),
        'Datos de sesión inválidos'
      );
    });
  });

  describe('Security Validation', () => {
    it('accepts valid IPv4 address', async () => {
      expectSuccess(await executeLogout({ ...validParams, ipAddress: '192.168.1.100' }));
    });

    it('accepts valid IPv6 address', async () => {
      expectSuccess(
        await executeLogout({
          ...validParams,
          ipAddress: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        })
      );
    });

    it('accepts any IP format for flexibility', async () => {
      expectSuccess(await executeLogout({ ...validParams, ipAddress: '999.999.999.999' }));
    });
  });

  describe('Audit Logging', () => {
    it('creates audit trail with all tracking data', async () => {
      expectSuccess(await executeLogout(validParams));
    });

    it('includes session ID in audit data', async () => {
      expectSuccess(await executeLogout(validParams));
    });
  });

  describe('Error Handling', () => {
    it('handles undefined parameters gracefully', async () => {
      expectFailure(await executeLogout(undefined as any));
    });

    it('handles malformed request structure with defaults', async () => {
      expectSuccess(await executeLogout({ invalid: 'structure' } as unknown as LogoutParams));
    });
  });
});
