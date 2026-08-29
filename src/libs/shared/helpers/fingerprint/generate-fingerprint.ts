/**
 * Generate Device Fingerprint
 *
 * Anti-fraud Layer 4: Generates a unique, persistent device fingerprint
 * using FingerprintJS library. This fingerprint is stable across sessions
 * and survives browser restarts.
 */

'use client';

import { load } from '@fingerprintjs/fingerprintjs';
import { logError } from '@logger';

let fpPromise: ReturnType<typeof load> | null = null;

/**
 * Initialize FingerprintJS (singleton pattern)
 */
const initFingerprint = (): ReturnType<typeof load> => {
  if (!fpPromise) {
    fpPromise = load();
  }
  return fpPromise;
};

/**
 * Generate basic fallback fingerprint
 */
const generateBasicFingerprint = (): string => {
  try {
    const { userAgent } = navigator;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const { colorDepth } = window.screen;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const data = `${userAgent}|${screenResolution}|${colorDepth}|${timezone}`;

    let hash = 0;
    for (let i = 0; i < data.length; i += 1) {
      const char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    return `fallback-${Math.abs(hash).toString(36)}`;
  } catch (error) {
    logError(error, 'generateFallbackFingerprint');
    return `fallback-${Date.now().toString(36)}`;
  }
};

/**
 * Generate a unique device fingerprint
 */
export const generateFingerprint = async (): Promise<string> => {
  try {
    if (typeof window === 'undefined') {
      return 'server-side-render';
    }

    const fp = await initFingerprint();
    const result = await fp.get();

    return result.visitorId;
  } catch (error) {
    logError(error, 'generateFingerprint');
    return generateBasicFingerprint();
  }
};

/**
 * Check if fingerprint is available
 */
export const isFingerprintReady = (): boolean => {
  return fpPromise !== null;
};

/**
 * Clear fingerprint cache
 */
export const clearFingerprintCache = (): void => {
  fpPromise = null;
};
