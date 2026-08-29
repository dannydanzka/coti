/**
 * Mock Utilities Interfaces
 *
 * Type definitions for testing mock utilities.
 */

import type { Mock } from 'vitest';

export interface MockStorage {
  clear: Mock;
  getItem: Mock;
  key: Mock;
  length: number;
  removeItem: Mock;
  setItem: Mock;
  store: Record<string, string>;
}

export interface ConsoleMocks {
  mockError: Mock;
  mockLog: Mock;
  mockWarn: Mock;
  originalError: typeof console.error;
  originalLog: typeof console.log;
  originalWarn: typeof console.warn;
}

export interface ClipboardMock {
  readText: Mock;
  writeText: Mock;
}
