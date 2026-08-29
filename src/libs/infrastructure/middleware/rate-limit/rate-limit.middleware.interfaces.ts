/**
 * Rate Limiting Middleware Interfaces
 *
 * Type definitions for rate limiting middleware.
 */

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export interface RateLimitCheck {
  exceeded: boolean;
  remaining: number;
  resetTime: number;
}
