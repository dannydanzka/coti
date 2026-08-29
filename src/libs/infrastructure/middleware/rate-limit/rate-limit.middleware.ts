/**
 * Rate Limiting Middleware
 *
 * Dual-backend rate limiter:
 *   1. Upstash Redis (preferred) — distributed, survives cold starts and works
 *      across all serverless instances. Activated when both
 *      UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set.
 *   2. In-memory fallback — single-process only. Safe for local dev / tests,
 *      but ineffective across Vercel function instances. A single warning is
 *      logged when running in production without Upstash configured.
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { logError, logWarning } from '@logger';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import type {
  RateLimitCheck,
  RateLimitConfig,
  RateLimitEntry,
} from './rate-limit.middleware.interfaces';

export type { RateLimitConfig };

const rateLimitStore = new Map<string, RateLimitEntry>();
const limiterCache = new Map<string, Ratelimit>();
let redisClient: Redis | null = null;
let warnedMissing = false;

const getRedis = (): Redis | null => {
  const url = process.env['UPSTASH_REDIS_REST_URL'];
  const token = process.env['UPSTASH_REDIS_REST_TOKEN'];
  if (!url || !token) return null;
  if (!redisClient) {
    redisClient = new Redis({ token, url });
  }
  return redisClient;
};

const getLimiter = (config: RateLimitConfig): Ratelimit | null => {
  const redis = getRedis();
  if (!redis) return null;
  const cacheKey = `${config.maxRequests}:${config.windowMs}`;
  const cached = limiterCache.get(cacheKey);
  if (cached) return cached;
  const limiter = new Ratelimit({
    analytics: false,
    limiter: Ratelimit.fixedWindow(config.maxRequests, `${config.windowMs} ms`),
    prefix: 'rl',
    redis,
  });
  limiterCache.set(cacheKey, limiter);
  return limiter;
};

const warnIfMissingInProduction = (): void => {
  if (warnedMissing) return;
  if (process.env['NODE_ENV'] !== 'production') return;
  warnedMissing = true;
  logWarning(
    '[rate-limit] Upstash Redis not configured — falling back to in-memory limiter. ' +
      'In serverless this is ineffective across instances. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
  );
};

const cleanupExpiredEntries = (): void => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
};

setInterval(cleanupExpiredEntries, 5 * 60 * 1000);

const getClientIp = (request: NextRequest): string => {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
};

const checkInMemory = (ip: string, config: RateLimitConfig): RateLimitCheck => {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetTime < now) {
    const fresh: RateLimitEntry = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(ip, fresh);
    return { exceeded: false, remaining: config.maxRequests - 1, resetTime: fresh.resetTime };
  }

  if (entry.count >= config.maxRequests) {
    return { exceeded: true, remaining: 0, resetTime: entry.resetTime };
  }

  entry.count += 1;
  return {
    exceeded: false,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
};

const checkRateLimit = async (ip: string, config: RateLimitConfig): Promise<RateLimitCheck> => {
  const limiter = getLimiter(config);
  if (limiter) {
    const result = await limiter.limit(ip);
    return {
      exceeded: !result.success,
      remaining: result.remaining,
      resetTime: result.reset,
    };
  }
  warnIfMissingInProduction();
  return checkInMemory(ip, config);
};

/**
 * Higher-order function that wraps API handlers with rate limiting.
 * @param handler - The API handler function
 * @param config - Rate limit configuration (maxRequests per windowMs)
 */
export const withRateLimit = <T = unknown>(
  handler: (request: NextRequest, context: T) => Promise<Response>,
  config: RateLimitConfig = {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000,
  }
) => {
  return async (request: NextRequest, context: T): Promise<Response> => {
    try {
      const ip = getClientIp(request);
      const check = await checkRateLimit(ip, config);

      if (check.exceeded) {
        const retryAfter = Math.max(1, Math.ceil((check.resetTime - Date.now()) / 1000));
        return NextResponse.json(
          {
            error: 'Demasiadas solicitudes. Por favor, intenta más tarde.',
            retryAfter,
            success: false,
          },
          {
            headers: {
              'Retry-After': retryAfter.toString(),
              'X-RateLimit-Limit': config.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': Math.floor(check.resetTime / 1000).toString(),
            },
            status: 429,
          }
        );
      }

      return await handler(request, context);
    } catch (error) {
      logError(error, 'withRateLimit');
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : 'Internal server error',
          success: false,
        },
        { status: 500 }
      );
    }
  };
};

/**
 * Get current rate limit status for an IP (in-memory backend only).
 * Returns null when Upstash is the active backend or the entry is missing.
 */
export const getRateLimitStatus = (ip: string): RateLimitEntry | null => {
  return rateLimitStore.get(ip) || null;
};

/**
 * Reset rate limit for an IP (in-memory backend only — useful for testing).
 */
export const resetRateLimit = (ip: string): void => {
  rateLimitStore.delete(ip);
};

/**
 * Clear all in-memory rate limit entries (useful for testing).
 */
export const clearAllRateLimits = (): void => {
  rateLimitStore.clear();
};
