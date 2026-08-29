/**
 * Enhanced render utility with Redux store and theme providers
 *
 * Modern testing utility that wraps components with all necessary providers
 * for isolated unit testing following React Testing Library best practices.
 */

import { Provider } from 'react-redux';
import { ReactElement, ReactNode } from 'react';
import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  RenderHookResult,
  RenderResult,
} from '@testing-library/react';

import { AuthContext } from '@providers';
import type { AuthContextValue } from '@providers';
import { authSlice, globalSlice, RootState, usersSlice } from '@redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import type { ExtendedRenderOptions } from './render-with-providers.interfaces';

export type { ExtendedRenderOptions };

const createTestStore = (preloadedState: Partial<RootState> = {}) => {
  const rootReducer = combineReducers({
    auth: authSlice.reducer,
    global: globalSlice.reducer,
    users: usersSlice.reducer,
  });

  return configureStore({
    devTools: false,
    preloadedState: preloadedState as RootState,
    reducer: rootReducer,
  });
};

/**
 * Create default auth context value from preloaded state
 */
const createDefaultAuthContext = (preloadedState: Partial<RootState>): AuthContextValue => {
  const authState = preloadedState.auth;
  return {
    isAuthenticated: authState?.isAuthenticated ?? false,
    isLoading: authState?.isLoading ?? false,
    login: vi.fn().mockResolvedValue({ user: authState?.user }),
    logout: vi.fn().mockResolvedValue(undefined),
    refreshAuth: vi.fn(),
    signup: vi.fn().mockResolvedValue({ success: true }),
    user: authState?.user ?? null,
    userId: authState?.user?.id ?? null,
  };
};

const createWrapper = (
  testStore: ReturnType<typeof createTestStore>,
  authContextValue: AuthContextValue
) => {
  return ({ children }: { children: ReactNode }) => {
    return (
      <Provider store={testStore}>
        <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
      </Provider>
    );
  };
};

/**
 * Enhanced render function with Redux store and providers
 */
export const renderWithProviders = (
  ui: ReactElement,
  options: ExtendedRenderOptions = {}
): RenderResult & { store: ReturnType<typeof createTestStore> } => {
  const {
    authContext,
    preloadedState = {},
    testStore = createTestStore(preloadedState),
    wrapper,
    ...renderOptions
  } = options;

  const defaultAuthContext = createDefaultAuthContext(preloadedState);
  const mergedAuthContext: AuthContextValue = {
    ...defaultAuthContext,
    ...authContext,
  };

  const Wrapper = wrapper || createWrapper(testStore, mergedAuthContext);

  const { rerender, ...utils } = rtlRender(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });

  return {
    rerender,
    ...utils,
    store: testStore,
  };
};

/**
 * Enhanced renderHook function with providers for hook testing
 */
export const renderHookWithProviders = <TResult, TProps>(
  hook: (props: TProps) => TResult,
  options: ExtendedRenderOptions = {}
): RenderHookResult<TResult, TProps> & { store: ReturnType<typeof createTestStore> } => {
  const {
    authContext,
    preloadedState = {},
    testStore = createTestStore(preloadedState),
    wrapper,
    ...renderOptions
  } = options;

  const defaultAuthContext = createDefaultAuthContext(preloadedState);
  const mergedAuthContext: AuthContextValue = {
    ...defaultAuthContext,
    ...authContext,
  };

  const Wrapper = wrapper || createWrapper(testStore, mergedAuthContext);

  const { rerender, ...result } = rtlRenderHook(hook, {
    wrapper: Wrapper,
    ...renderOptions,
  });

  return {
    rerender,
    ...result,
    store: testStore,
  };
};

// Note: Not re-exporting from @testing to avoid circular dependency
