/**
 * Mock Utilities
 * Testing utilities for mocking timers, API, storage, router, and browser APIs.
 */
import type { Mock } from 'vitest';
import { vi } from 'vitest';

import type { ClipboardMock, ConsoleMocks, MockStorage } from './mock-utilities.interfaces';

export type { ClipboardMock, ConsoleMocks, MockStorage };

export const timers = {
  advance: (ms: number) => {
    vi.advanceTimersByTime(ms);
  },
  flush: () => {
    vi.runAllTimers();
  },
  getCurrentTime: () => {
    return new Date();
  },
  restore: () => {
    vi.useRealTimers();
  },
  runPending: () => {
    vi.runOnlyPendingTimers();
  },
  setSystemTime: (time: string | Date) => {
    const timestamp = typeof time === 'string' ? Date.parse(time) : time.getTime();
    vi.setSystemTime(timestamp);
  },
  useFake: () => {
    vi.useFakeTimers();
  },
};

export const api = {
  cleanupGlobalFetch: (mockFetch: Mock<typeof fetch>) => {
    if (mockFetch.mockRestore) {
      mockFetch.mockRestore();
    }
  },
  createMockFetch: () => {
    return vi.fn();
  },
  error: (message: string, status = 500) =>
    api.mockResponse({ error: message, success: false }, status),
  mockResponse: (data: unknown, status = 200) => {
    return {
      clone: () => ({ json: () => Promise.resolve(data) }),
      json: () => Promise.resolve(data),
      ok: status >= 200 && status < 300,
      status,
      statusText: status === 200 ? 'OK' : 'Error',
      text: () => Promise.resolve(JSON.stringify(data)),
    };
  },
  setupGlobalFetch: (mockFetch: Mock<typeof fetch>) => {
    (global.fetch as unknown) = mockFetch;
    mockFetch.mockClear();
  },
  success: (data: unknown) => api.mockResponse(data, 200),
  validationError: (errors: Record<string, string>) =>
    api.mockResponse({ errors, success: false }, 422),
};

export const redux = {
  mockAsyncThunk: <T>(payload: T) => ({
    fulfilled: { meta: { requestId: 'test' }, payload, type: 'test/fulfilled' },
    pending: { meta: { requestId: 'test' }, type: 'test/pending' },
    rejected: {
      error: new Error('Test error'),
      meta: { requestId: 'test' },
      type: 'test/rejected',
    },
  }),
  mockDispatch: () => {
    const dispatch = vi.fn();
    dispatch.mockImplementation((action) => {
      if (typeof action === 'function') {
        return action(dispatch, vi.fn(), {});
      }
      return action;
    });
    return dispatch;
  },
  mockSelector: <T>(returnValue: T) => vi.fn(() => returnValue),
};

export const storage = {
  createLocalStorage: (): MockStorage => {
    const mockStorage = {
      clear: vi.fn(() => {
        mockStorage.store = {};
      }),
      getItem: vi.fn((key: string) => mockStorage.store[key] ?? null),
      key: vi.fn(),
      length: 0,
      removeItem: vi.fn((key: string) => {
        delete mockStorage.store[key];
      }),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage.store[key] = value;
      }),
      store: {} as Record<string, string>,
    } as MockStorage;

    return mockStorage;
  },
  createSessionStorage: (): MockStorage => {
    const mockStorage = {
      clear: vi.fn(() => {
        mockStorage.store = {};
      }),
      getItem: vi.fn((key: string) => mockStorage.store[key] ?? null),
      key: vi.fn(),
      length: 0,
      removeItem: vi.fn((key: string) => {
        delete mockStorage.store[key];
      }),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage.store[key] = value;
      }),
      store: {} as Record<string, string>,
    } as MockStorage;

    return mockStorage;
  },
  setupLocalStorage: (mockStorage: MockStorage) => {
    Object.defineProperty(window, 'localStorage', { value: mockStorage });
    mockStorage.store = {};
  },
  setupSessionStorage: (mockStorage: MockStorage) => {
    Object.defineProperty(window, 'sessionStorage', { value: mockStorage });
    mockStorage.store = {};
  },
};

export const router = {
  createNavigationMocks: () => {
    return {
      mockBack: vi.fn(),
      mockForward: vi.fn(),
      mockPush: vi.fn(),
      mockReplace: vi.fn(),
    };
  },
  createRouterMock: () => {
    return {
      asPath: '/',
      back: vi.fn(),
      basePath: '',
      beforePopState: vi.fn(),
      events: {
        emit: vi.fn(),
        off: vi.fn(),
        on: vi.fn(),
      },
      forward: vi.fn(),
      isFallback: false,
      isLocaleDomain: true,
      isPreview: false,
      isReady: true,
      pathname: '/',
      prefetch: vi.fn(() => Promise.resolve()),
      push: vi.fn(() => Promise.resolve()),
      query: {},
      reload: vi.fn(),
      replace: vi.fn(() => Promise.resolve()),
      route: '/',
    };
  },
};

export const consoleMock = {
  cleanupMocks: (mocks: ConsoleMocks) => {
    global.console.error = mocks.originalError;
    global.console.warn = mocks.originalWarn;
    global.console.log = mocks.originalLog;
  },
  createMocks: (): ConsoleMocks => {
    const originalError = global.console.error;
    const originalWarn = global.console.warn;
    const originalLog = global.console.log;

    const mockError = vi.fn();
    const mockWarn = vi.fn();
    const mockLog = vi.fn();

    return {
      mockError,
      mockLog,
      mockWarn,
      originalError,
      originalLog,
      originalWarn,
    };
  },
  setupMocks: (mocks: ConsoleMocks) => {
    global.console.error = mocks.mockError as unknown as typeof console.error;
    global.console.warn = mocks.mockWarn as unknown as typeof console.warn;
    global.console.log = mocks.mockLog as unknown as typeof console.log;
  },
};

export const intersectionObserver = {
  createMock: () => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    });

    return mockIntersectionObserver;
  },
  setupMock: (mockObserver: Mock) => {
    (window.IntersectionObserver as unknown) = mockObserver;
  },
};

export const resizeObserver = {
  createMock: () => {
    const mockResizeObserver = vi.fn();
    mockResizeObserver.mockReturnValue({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    });

    return mockResizeObserver;
  },
  setupMock: (mockObserver: Mock) => {
    (window.ResizeObserver as unknown) = mockObserver;
  },
};

export const clipboard = {
  createMock: (): ClipboardMock => {
    return {
      readText: vi.fn(() => Promise.resolve('test')),
      writeText: vi.fn(() => Promise.resolve()),
    };
  },
  setupMock: (mockClipboard: ClipboardMock) => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: mockClipboard,
    });
  },
};
