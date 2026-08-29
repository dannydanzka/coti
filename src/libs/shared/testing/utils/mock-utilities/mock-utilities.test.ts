/**
 * Mock Utilities Unit Tests
 *
 * Essential tests for mock utility functions following Essential Testing Philosophy.
 */

'use client';

import {
  api,
  clipboard,
  consoleMock,
  intersectionObserver,
  redux,
  resizeObserver,
  router,
  storage,
  timers,
} from './mock-utilities';

describe('Mock Utilities', () => {
  describe('Timers & API Utilities', () => {
    it('should have timer utilities for Coti testing', () => {
      vi.useFakeTimers();
      expect(typeof timers.advance).toBe('function');
      expect(typeof timers.flush).toBe('function');
      expect(typeof timers.runPending).toBe('function');
      expect(() => timers.advance(1000)).not.toThrow();
      vi.useRealTimers();
    });

    it('should have API mock utilities for Coti endpoints', () => {
      const mockFetch = api.createMockFetch();
      const successResponse = api.success({ participants: ['María García', 'José Martínez'] });
      const errorResponse = api.error('Usuario Ana López no encontrado', 404);

      expect(vi.isMockFunction(mockFetch)).toBe(true);
      expect(successResponse.status).toBe(200);
      expect(errorResponse.status).toBe(404);
    });
  });

  describe('Redux & Storage Utilities', () => {
    it('should have Redux mock utilities for Coti state', () => {
      const dispatch = redux.mockDispatch();
      const selector = redux.mockSelector({ currentUser: 'Carlos Rodríguez' });
      const thunk = redux.mockAsyncThunk({ enrollmentData: 'rally-emocional-2025' });

      expect(vi.isMockFunction(dispatch)).toBe(true);
      expect(selector().currentUser).toBe('Carlos Rodríguez');
      expect(thunk.fulfilled.payload.enrollmentData).toBe('rally-emocional-2025');
    });

    it('should have storage mock utilities for user preferences', () => {
      const localStorage = storage.createLocalStorage();
      const sessionStorage = storage.createSessionStorage();

      ['getItem', 'setItem', 'removeItem', 'clear'].forEach((method) => {
        expect(localStorage).toHaveProperty(method);
        expect(sessionStorage).toHaveProperty(method);
      });
      expect(vi.isMockFunction(localStorage.getItem)).toBe(true);
    });
  });

  describe('Navigation & Observer Utilities', () => {
    it('should have router mock utilities for Coti navigation', () => {
      const navigationMocks = router.createNavigationMocks();
      const routerMock = router.createRouterMock();

      ['mockBack', 'mockForward', 'mockPush', 'mockReplace'].forEach((method) => {
        expect(navigationMocks).toHaveProperty(method);
      });
      expect(vi.isMockFunction(routerMock.push)).toBe(true);
      expect(routerMock.pathname).toBe('/');
    });

    it('should have observer mock utilities for UI interactions', () => {
      const intersectionMock = intersectionObserver.createMock();
      const resizeMock = resizeObserver.createMock();
      const clipboardMock = clipboard.createMock();

      expect(vi.isMockFunction(intersectionMock)).toBe(true);
      expect(vi.isMockFunction(resizeMock)).toBe(true);
      expect(vi.isMockFunction(clipboardMock.readText)).toBe(true);
      expect(vi.isMockFunction(clipboardMock.writeText)).toBe(true);
    });
  });

  describe('Console Utilities', () => {
    it('should have console mock utilities for error handling', () => {
      const consoleMocks = consoleMock.createMocks();

      ['mockError', 'mockWarn', 'mockLog', 'originalError'].forEach((property) => {
        expect(consoleMocks).toHaveProperty(property);
      });
      expect(vi.isMockFunction(consoleMocks.mockError)).toBe(true);
    });

    it('should setup and cleanup console mocks', () => {
      const mocks = consoleMock.createMocks();
      expect(() => {
        consoleMock.setupMocks(mocks);
        consoleMock.cleanupMocks(mocks);
      }).not.toThrow();
    });
  });

  describe('Timer operations', () => {
    it('useFake and restore timers', () => {
      expect(() => {
        timers.useFake();
        timers.restore();
      }).not.toThrow();
    });

    it('setSystemTime with string', () => {
      timers.useFake();
      timers.setSystemTime('2026-01-01T00:00:00Z');
      const time = timers.getCurrentTime();
      expect(time.getUTCFullYear()).toBe(2026);
      timers.restore();
    });

    it('setSystemTime with Date', () => {
      timers.useFake();
      const testDate = new Date('2026-06-15T00:00:00Z');
      timers.setSystemTime(testDate);
      const time = timers.getCurrentTime();
      expect(time.getUTCMonth()).toBe(5);
      timers.restore();
    });

    it('flush runs all timers', () => {
      timers.useFake();
      const callback = vi.fn();
      setTimeout(callback, 5000);
      timers.flush();
      expect(callback).toHaveBeenCalled();
      timers.restore();
    });

    it('runPending runs only pending timers', () => {
      timers.useFake();
      const callback = vi.fn();
      setTimeout(callback, 100);
      timers.runPending();
      expect(callback).toHaveBeenCalled();
      timers.restore();
    });
  });

  describe('API utilities detailed', () => {
    it('mockResponse creates response with correct shape', () => {
      const res = api.mockResponse({ data: 'test' }, 201);
      expect(res.status).toBe(201);
      expect(res.ok).toBe(true);
    });

    it('mockResponse with error status', () => {
      const res = api.mockResponse({ error: 'fail' }, 500);
      expect(res.ok).toBe(false);
      expect(res.statusText).toBe('Error');
    });

    it('mockResponse json resolves', async () => {
      const res = api.mockResponse({ name: 'María' });
      const data = (await res.json()) as { name: string };
      expect(data.name).toBe('María');
    });

    it('mockResponse text resolves', async () => {
      const res = api.mockResponse({ name: 'José' });
      const text = await res.text();
      expect(text).toContain('José');
    });

    it('mockResponse clone works', async () => {
      const res = api.mockResponse({ val: 42 });
      const cloned = res.clone();
      const data = (await cloned.json()) as { val: number };
      expect(data.val).toBe(42);
    });

    it('validationError creates 422 response', () => {
      const res = api.validationError({ email: 'Email inválido' });
      expect(res.status).toBe(422);
      expect(res.ok).toBe(false);
    });

    it('error with default status', () => {
      const res = api.error('Error general');
      expect(res.status).toBe(500);
    });

    it('setupGlobalFetch and cleanupGlobalFetch', () => {
      const mockFetch = api.createMockFetch();
      api.setupGlobalFetch(mockFetch);
      expect(global.fetch).toBe(mockFetch);
      api.cleanupGlobalFetch(mockFetch);
    });
  });

  describe('Redux utilities detailed', () => {
    it('mockDispatch handles function actions (thunks)', () => {
      const dispatch = redux.mockDispatch();
      const thunkAction = vi.fn();
      dispatch(thunkAction);
      expect(thunkAction).toHaveBeenCalledWith(dispatch, expect.any(Function), {});
    });

    it('mockDispatch handles plain actions', () => {
      const dispatch = redux.mockDispatch();
      const action = { payload: 'data', type: 'test/action' };
      const result = dispatch(action);
      expect(result).toEqual(action);
    });

    it('mockAsyncThunk returns all states', () => {
      const thunk = redux.mockAsyncThunk({ userId: 'u1' });
      expect(thunk.pending.type).toBe('test/pending');
      expect(thunk.fulfilled.payload.userId).toBe('u1');
      expect(thunk.rejected.error).toBeInstanceOf(Error);
    });
  });

  describe('Storage utilities detailed', () => {
    it('localStorage setItem and getItem', () => {
      const ls = storage.createLocalStorage();
      ls.setItem('key', 'valor');
      expect(ls.store['key']).toBe('valor');
    });

    it('localStorage removeItem', () => {
      const ls = storage.createLocalStorage();
      ls.store['key'] = 'valor';
      ls.removeItem('key');
      expect(ls.store['key']).toBeUndefined();
    });

    it('localStorage clear', () => {
      const ls = storage.createLocalStorage();
      ls.store['a'] = '1';
      ls.store['b'] = '2';
      ls.clear();
      expect(Object.keys(ls.store)).toHaveLength(0);
    });

    it('localStorage getItem returns null for missing key', () => {
      const ls = storage.createLocalStorage();
      expect(ls.getItem('nonexistent')).toBeNull();
    });

    it('sessionStorage works the same', () => {
      const ss = storage.createSessionStorage();
      ss.setItem('session_key', 'session_val');
      expect(ss.store['session_key']).toBe('session_val');
      ss.clear();
      expect(Object.keys(ss.store)).toHaveLength(0);
    });

    it('setupLocalStorage attaches to window', () => {
      const ls = storage.createLocalStorage();
      storage.setupLocalStorage(ls);
      expect(ls.store).toEqual({});
    });

    it('setupSessionStorage attaches to window', () => {
      const ss = storage.createSessionStorage();
      storage.setupSessionStorage(ss);
      expect(ss.store).toEqual({});
    });
  });

  describe('Observer utilities detailed', () => {
    it('intersectionObserver mock returns proper methods', () => {
      const mock = intersectionObserver.createMock();
      const instance = mock();
      expect(instance.observe).toBeDefined();
      expect(instance.unobserve).toBeDefined();
      expect(instance.disconnect).toBeDefined();
    });

    it('intersectionObserver setupMock attaches to window', () => {
      const mock = intersectionObserver.createMock();
      intersectionObserver.setupMock(mock);
      expect(window.IntersectionObserver).toBe(mock);
    });

    it('resizeObserver mock returns proper methods', () => {
      const mock = resizeObserver.createMock();
      const instance = mock();
      expect(instance.observe).toBeDefined();
      expect(instance.disconnect).toBeDefined();
    });

    it('resizeObserver setupMock attaches to window', () => {
      const mock = resizeObserver.createMock();
      resizeObserver.setupMock(mock);
      expect(window.ResizeObserver).toBe(mock);
    });
  });

  describe('Clipboard utilities', () => {
    it('clipboard mock readText resolves', async () => {
      const mock = clipboard.createMock();
      const result = await mock.readText();
      expect(result).toBe('test');
    });

    it('clipboard mock writeText resolves', async () => {
      const mock = clipboard.createMock();
      await expect(mock.writeText('texto')).resolves.toBeUndefined();
    });

    it('clipboard setupMock attaches to navigator', () => {
      const mock = clipboard.createMock();
      expect(() => clipboard.setupMock(mock)).not.toThrow();
    });
  });

  describe('Router utilities detailed', () => {
    it('createRouterMock has all expected methods', () => {
      const routerMock = router.createRouterMock();
      expect(routerMock.isReady).toBe(true);
      expect(routerMock.isFallback).toBe(false);
      expect(typeof routerMock.prefetch).toBe('function');
      expect(typeof routerMock.reload).toBe('function');
    });

    it('createRouterMock push resolves', async () => {
      const routerMock = router.createRouterMock();
      await expect(
        (routerMock.push as unknown as (url: string) => Promise<void>)('/admin')
      ).resolves.toBeUndefined();
    });

    it('createRouterMock events has methods', () => {
      const routerMock = router.createRouterMock();
      expect(typeof routerMock.events.on).toBe('function');
      expect(typeof routerMock.events.off).toBe('function');
      expect(typeof routerMock.events.emit).toBe('function');
    });
  });
});
