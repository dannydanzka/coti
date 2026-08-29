/**
 * Rate Limit Middleware Tests
 *
 * Tests rate limiting, IP extraction, and cleanup.
 * Spanish locale mandatory.
 */

import type { NextRequest } from 'next/server';

import {
  clearAllRateLimits,
  getRateLimitStatus,
  resetRateLimit,
  withRateLimit,
} from './rate-limit.middleware';

const createMockRequest = (ip?: string): NextRequest => {
  const headers = new Headers();
  if (ip) {
    headers.set('x-forwarded-for', ip);
  }
  return {
    headers,
  } as unknown as NextRequest;
};

describe('Rate Limit Middleware', () => {
  beforeEach(() => {
    clearAllRateLimits();
  });

  describe('withRateLimit', () => {
    it('allows requests under limit', async () => {
      const handler = vi.fn().mockResolvedValue(new Response('OK'));
      const wrapped = withRateLimit(handler, { maxRequests: 5, windowMs: 60000 });

      const req = createMockRequest('192.168.1.1');
      const res = await wrapped(req, {});

      expect(handler).toHaveBeenCalledWith(req, {});
      expect(res).toBeDefined();
    });

    it('blocks requests exceeding limit', async () => {
      const handler = vi.fn().mockResolvedValue(new Response('OK'));
      const wrapped = withRateLimit(handler, { maxRequests: 2, windowMs: 60000 });
      const req = createMockRequest('192.168.1.2');

      await wrapped(req, {});
      await wrapped(req, {});
      const res = await wrapped(req, {});

      expect(res.status).toBe(429);
      const body = await res.json();
      expect(body.success).toBe(false);
      expect(body.error).toContain('Demasiadas solicitudes');
    });

    it('handles handler errors', async () => {
      const handler = vi.fn().mockRejectedValue(new Error('Error interno'));
      const wrapped = withRateLimit(handler);

      const req = createMockRequest('192.168.1.3');
      const res = await wrapped(req, {});

      expect(res.status).toBe(500);
    });

    it('extracts IP from x-real-ip header', async () => {
      const handler = vi.fn().mockResolvedValue(new Response('OK'));
      const wrapped = withRateLimit(handler, { maxRequests: 5, windowMs: 60000 });

      const headers = new Headers();
      headers.set('x-real-ip', '10.0.0.1');
      const req = { headers } as unknown as NextRequest;

      await wrapped(req, {});
      expect(getRateLimitStatus('10.0.0.1')).not.toBeNull();
    });

    it('uses unknown when no IP headers', async () => {
      const handler = vi.fn().mockResolvedValue(new Response('OK'));
      const wrapped = withRateLimit(handler, { maxRequests: 5, windowMs: 60000 });

      const req = createMockRequest();
      await wrapped(req, {});

      expect(getRateLimitStatus('unknown')).not.toBeNull();
    });
  });

  describe('getRateLimitStatus', () => {
    it('returns null for unknown IP', () => {
      expect(getRateLimitStatus('1.2.3.4')).toBeNull();
    });

    it('returns entry after request', async () => {
      const handler = vi.fn().mockResolvedValue(new Response('OK'));
      const wrapped = withRateLimit(handler, { maxRequests: 5, windowMs: 60000 });

      await wrapped(createMockRequest('10.10.10.10'), {});
      const status = getRateLimitStatus('10.10.10.10');

      expect(status).not.toBeNull();
      expect(status?.count).toBe(1);
    });
  });

  describe('resetRateLimit', () => {
    it('resets rate limit for IP', async () => {
      const handler = vi.fn().mockResolvedValue(new Response('OK'));
      const wrapped = withRateLimit(handler, { maxRequests: 5, windowMs: 60000 });

      await wrapped(createMockRequest('10.10.10.11'), {});
      expect(getRateLimitStatus('10.10.10.11')).not.toBeNull();

      resetRateLimit('10.10.10.11');
      expect(getRateLimitStatus('10.10.10.11')).toBeNull();
    });
  });

  describe('clearAllRateLimits', () => {
    it('clears all entries', async () => {
      const handler = vi.fn().mockResolvedValue(new Response('OK'));
      const wrapped = withRateLimit(handler, { maxRequests: 5, windowMs: 60000 });

      await wrapped(createMockRequest('10.0.0.1'), {});
      await wrapped(createMockRequest('10.0.0.2'), {});

      clearAllRateLimits();

      expect(getRateLimitStatus('10.0.0.1')).toBeNull();
      expect(getRateLimitStatus('10.0.0.2')).toBeNull();
    });
  });
});
