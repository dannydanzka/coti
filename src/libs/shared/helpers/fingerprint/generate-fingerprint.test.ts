/**
 * Generate Fingerprint Tests
 *
 * Tests fingerprint generation, caching, and fallback.
 */

import {
  clearFingerprintCache,
  generateFingerprint,
  isFingerprintReady,
} from './generate-fingerprint';

const mockGet = vi.fn();

vi.mock('@fingerprintjs/fingerprintjs', () => ({
  load: vi.fn().mockResolvedValue({
    get: () => mockGet(),
  }),
}));

describe('generateFingerprint', () => {
  beforeEach(() => {
    clearFingerprintCache();
  });

  it('generates fingerprint from FingerprintJS', async () => {
    mockGet.mockResolvedValueOnce({ visitorId: 'fp-abc123' });

    const result = await generateFingerprint();
    expect(result).toBe('fp-abc123');
  });

  it('returns fallback on FingerprintJS error', async () => {
    mockGet.mockRejectedValueOnce(new Error('FP error'));

    const result = await generateFingerprint();
    expect(result).toContain('fallback-');
  });
});

describe('isFingerprintReady', () => {
  it('returns false before initialization', () => {
    clearFingerprintCache();
    expect(isFingerprintReady()).toBe(false);
  });

  it('returns true after generation', async () => {
    mockGet.mockResolvedValueOnce({ visitorId: 'fp-123' });
    await generateFingerprint();
    expect(isFingerprintReady()).toBe(true);
  });
});

describe('clearFingerprintCache', () => {
  it('clears cache', async () => {
    mockGet.mockResolvedValueOnce({ visitorId: 'fp-123' });
    await generateFingerprint();
    expect(isFingerprintReady()).toBe(true);

    clearFingerprintCache();
    expect(isFingerprintReady()).toBe(false);
  });
});
