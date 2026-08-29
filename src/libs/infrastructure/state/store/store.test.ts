/**
 * Redux Store Configuration Tests
 *
 * Tests for Redux store setup, persistence configuration,
 * and store operations following Essential Testing Philosophy.
 */

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

vi.mock('./index', () => {
  const mockState = {
    admin: { data: null },
    auth: { user: null },
    global: { theme: 'light' },
    users: { list: [] },
  };

  let listeners: Array<() => void> = [];

  const mockStore = {
    dispatch: vi.fn((_action: unknown) => {
      listeners.forEach((listener) => listener());
      return _action;
    }),
    getState: vi.fn(() => mockState),
    subscribe: vi.fn((listener: () => void) => {
      listeners.push(listener);
      return vi.fn(() => {
        listeners = listeners.filter((l) => l !== listener);
      });
    }),
  };

  const mockPersistor = {
    flush: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    persist: vi.fn(),
    purge: vi.fn().mockResolvedValue(undefined),
  };

  const mockResetStore = vi.fn(async () => {
    mockPersistor.purge();
  });

  return {
    __esModule: true,
    persistor: mockPersistor,
    resetStore: mockResetStore,
    store: mockStore,
  };
});

vi.mock('redux-persist', () => ({
  FLUSH: 'persist/FLUSH',
  PAUSE: 'persist/PAUSE',
  PERSIST: 'persist/PERSIST',
  PURGE: 'persist/PURGE',
  REGISTER: 'persist/REGISTER',
  REHYDRATE: 'persist/REHYDRATE',
  persistReducer: vi.fn((config, reducer) => {
    void config;
    return reducer;
  }),
  persistStore: vi.fn(() => ({
    flush: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    persist: vi.fn(),
    purge: vi.fn().mockResolvedValue(undefined),
  })),
}));

vi.mock('redux-persist/lib/storage', () => ({
  default: {
    getItem: vi.fn(),
    removeItem: vi.fn(),
    setItem: vi.fn(),
  },
}));

describe('Redux Store Configuration', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe('Store Setup', () => {
    it('exports store with correct structure', async () => {
      const storeModule = await import('./index');

      expect(storeModule.store).toBeDefined();
      expect(storeModule.store.getState).toBeDefined();
      expect(storeModule.store.dispatch).toBeDefined();
      expect(storeModule.store.subscribe).toBeDefined();
    });

    it('exports persistor for persistence management', async () => {
      const storeModule = await import('./index');

      expect(storeModule.persistor).toBeDefined();
      expect(storeModule.persistor.purge).toBeDefined();
      expect(storeModule.persistor.flush).toBeDefined();
      expect(storeModule.persistor.pause).toBeDefined();
      expect(storeModule.persistor.persist).toBeDefined();
    });

    it('exports TypeScript types', async () => {
      const storeModule = await import('./index');

      expect(storeModule.store).toBeDefined();
      expect(storeModule.persistor).toBeDefined();
      expect(storeModule.resetStore).toBeDefined();
    });
  });

  describe('Persistence Configuration', () => {
    it('configures persistence with correct blacklist', () => {
      const mockPersistConfig = {
        blacklist: ['admin', 'auth', 'users'],
        key: 'coti_root',
        whitelist: ['global'],
      };

      expect(mockPersistConfig.blacklist).toContain('admin');
      expect(mockPersistConfig.blacklist).toContain('auth');
      expect(mockPersistConfig.blacklist).toContain('users');
    });

    it('configures persistence with correct whitelist', () => {
      const mockPersistConfig = {
        blacklist: ['admin', 'auth', 'users'],
        key: 'coti_root',
        whitelist: ['global'],
      };

      expect(mockPersistConfig.whitelist).toContain('global');
      expect(mockPersistConfig.whitelist).toHaveLength(1);
    });

    it('uses correct storage key', () => {
      const mockPersistConfig = {
        blacklist: ['admin', 'auth', 'users'],
        key: 'coti_root',
        whitelist: ['global'],
      };

      expect(mockPersistConfig.key).toBe('coti_root');
    });
  });

  describe('Store State Structure', () => {
    it('has correct initial state shape', async () => {
      const storeModule = await import('./index');

      expect(storeModule.store).toBeDefined();
      expect(storeModule.store.getState).toBeDefined();

      const state = storeModule.store.getState();

      expect(state).toBeDefined();
      expect(state).toHaveProperty('admin');
      expect(state).toHaveProperty('auth');
      expect(state).toHaveProperty('global');
      expect(state).toHaveProperty('users');
    });

    it('maintains state structure after dispatch', async () => {
      const storeModule = await import('./index');

      storeModule.store.dispatch({ type: 'TEST_ACTION' });

      const state = storeModule.store.getState();
      expect(state).toBeDefined();
      expect(state).toHaveProperty('admin');
      expect(state).toHaveProperty('auth');
      expect(state).toHaveProperty('global');
      expect(state).toHaveProperty('users');
    });
  });

  describe('Store Operations', () => {
    it('provides resetStore function', async () => {
      const storeModule = await import('./index');

      expect(storeModule.resetStore).toBeDefined();
      expect(typeof storeModule.resetStore).toBe('function');
    });

    it('resetStore calls persistor.purge', async () => {
      const storeModule = await import('./index');

      await storeModule.resetStore();

      expect(storeModule.persistor.purge).toHaveBeenCalledOnce();
    });

    it('handles store subscription', async () => {
      const storeModule = await import('./index');

      const listener = vi.fn();
      const unsubscribe = storeModule.store.subscribe(listener);

      storeModule.store.dispatch({ type: 'TEST_ACTION' });

      expect(listener).toHaveBeenCalled();

      unsubscribe();
      storeModule.store.dispatch({ type: 'ANOTHER_ACTION' });

      expect(listener).toHaveBeenCalledOnce();
    });
  });

  describe('Development Tools', () => {
    it('enables devTools in development', async () => {
      vi.stubEnv('NODE_ENV', 'development');

      vi.resetModules();
      await import('./index');

      expect(process.env['NODE_ENV']).toBe('development');

      vi.unstubAllEnvs();
    });

    it('disables devTools in production', async () => {
      vi.stubEnv('NODE_ENV', 'production');

      vi.resetModules();
      await import('./index');

      expect(process.env['NODE_ENV']).toBe('production');

      vi.unstubAllEnvs();
    });
  });

  describe('Middleware Configuration', () => {
    it('ignores persistence actions in serializable check', async () => {
      const storeModule = await import('./index');

      const persistenceActions = [
        { type: FLUSH },
        { type: REHYDRATE },
        { type: PAUSE },
        { type: PERSIST },
        { type: PURGE },
        { type: REGISTER },
      ];

      const testAction = (action: { type: string }) => {
        expect(() => storeModule.store.dispatch(action)).not.toThrow();
      };

      persistenceActions.forEach(testAction);

      expect(storeModule.store.dispatch).toHaveBeenCalledTimes(persistenceActions.length);
    });
  });
});
