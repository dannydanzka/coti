/**
 * Validation Middleware Tests
 *
 * Tests validateRequest and withValidation with Zod schemas.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { validateRequest, withValidation } from './validation.middleware';

vi.mock('@constants', () => ({
  HTTP_STATUS: { BAD_REQUEST: 400 },
}));

const createMockRequest = (options: {
  body?: unknown;
  method?: string;
  searchParams?: Record<string, string>;
  url?: string;
}): NextRequest => {
  const url = new URL(options.url ?? 'http://localhost:3000/api/test');

  if (options.searchParams) {
    Object.entries(options.searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const request = new NextRequest(url, {
    method: options.method ?? 'POST',
  });

  if (options.body !== undefined) {
    vi.spyOn(request, 'json').mockResolvedValue(options.body);
  }

  return request;
};

describe('validateRequest', () => {
  const bodySchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
  });

  const querySchema = z.object({
    limit: z.string(),
    page: z.string(),
  });

  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  describe('Body Validation', () => {
    it('validates valid body', async () => {
      const request = createMockRequest({
        body: { email: 'maria@example.com', name: 'María García' },
      });

      const result = await validateRequest(request, { body: bodySchema });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.body).toEqual({
          email: 'maria@example.com',
          name: 'María García',
        });
      }
    });

    it('rejects invalid body', async () => {
      const request = createMockRequest({
        body: { email: 'not-email', name: 'AB' },
      });

      const result = await validateRequest(request, { body: bodySchema });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('handles non-JSON body', async () => {
      const request = createMockRequest({});
      vi.spyOn(request, 'json').mockRejectedValueOnce(new Error('Invalid JSON'));

      const result = await validateRequest(request, { body: bodySchema });

      expect(result.success).toBe(false);
    });
  });

  describe('Query Validation', () => {
    it('validates valid query params', async () => {
      const request = createMockRequest({
        searchParams: { limit: '10', page: '1' },
      });

      const result = await validateRequest(request, { query: querySchema });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.query).toEqual({ limit: '10', page: '1' });
      }
    });

    it('rejects missing query params', async () => {
      const request = createMockRequest({});

      const result = await validateRequest(request, { query: querySchema });

      expect(result.success).toBe(false);
    });
  });

  describe('Params Validation', () => {
    it('validates valid path params', async () => {
      const validId = '550e8400-e29b-41d4-a716-446655440000';
      const request = createMockRequest({});

      const result = await validateRequest(request, { params: paramsSchema }, { id: validId });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.params?.id).toBe(validId);
      }
    });

    it('rejects invalid path params', async () => {
      const request = createMockRequest({});

      const result = await validateRequest(request, { params: paramsSchema }, { id: 'not-uuid' });

      expect(result.success).toBe(false);
    });
  });

  describe('Combined Validation', () => {
    it('validates body and query together', async () => {
      const request = createMockRequest({
        body: { email: 'maria@example.com', name: 'María' },
        searchParams: { limit: '20', page: '2' },
      });

      const result = await validateRequest(request, {
        body: bodySchema,
        query: querySchema,
      });

      expect(result.success).toBe(true);
    });

    it('fails on first invalid part', async () => {
      const request = createMockRequest({
        body: { email: 'invalid', name: 'AB' },
        searchParams: { limit: '10', page: '1' },
      });

      const result = await validateRequest(request, {
        body: bodySchema,
        query: querySchema,
      });

      expect(result.success).toBe(false);
    });
  });
});

describe('withValidation', () => {
  const bodySchema = z.object({
    name: z.string().min(1),
  });

  it('calls handler with validated data', async () => {
    const handler = vi.fn().mockResolvedValue(NextResponse.json({ ok: true }));

    const wrapped = withValidation(handler, { body: bodySchema });

    const request = createMockRequest({
      body: { name: 'María García' },
    });

    await wrapped(request);

    expect(handler).toHaveBeenCalledWith(
      request,
      expect.objectContaining({ body: { name: 'María García' } }),
      undefined
    );
  });

  it('returns 400 on validation error', async () => {
    const handler = vi.fn();

    const wrapped = withValidation(handler, { body: bodySchema });

    const request = createMockRequest({
      body: { name: '' },
    });

    const response = await wrapped(request);

    expect(handler).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
  });
});
