/**
 * Provider HOC Utilities
 *
 * Higher-Order Components for wrapping components with providers in tests.
 * Agnóstico pattern inspired by Betterware's testing architecture.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const TestWrapper = withProviders(mockStoreState);
 * const { result } = renderHook(() => useSelector(selectUser), { wrapper: TestWrapper });
 *
 * // With custom component
 * const CustomWrapper = withProviders(mockStoreState, MyCustomProvider);
 * render(<TestComponent />, { wrapper: CustomWrapper });
 * ```
 */

'use client';

import { Fragment, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import type { ProviderHOCOptions, WrapperComponent } from './provider-hoc.interfaces';

export type { ProviderHOCOptions, WrapperComponent };

/**
 * Creates a HOC for wrapping components with Redux Provider and other providers
 *
 * @param storeState - Initial state for Redux store (optional)
 * @param WrappedComponent - Component to wrap providers around (defaults to Fragment)
 * @returns Wrapper component for testing
 *
 * @example
 * ```tsx
 * // Basic Redux provider wrapping
 * const ReduxWrapper = withReduxProvider({ auth: { user: mockUser } });
 * render(<MyComponent />, { wrapper: ReduxWrapper });
 *
 * // With custom wrapped component
 * const CustomWrapper = withReduxProvider(mockState, MyProviderComponent);
 * render(<MyComponent />, { wrapper: CustomWrapper });
 * ```
 */
export const withReduxProvider = (
  storeState: Record<string, unknown> = {},
  WrappedComponent: React.ComponentType<{ children: ReactNode }> = Fragment
): WrapperComponent => {
  const wrapper = ({ children }: { children: ReactNode }) => {
    const store = configureStore({
      reducer: (state = storeState) => state,
    });

    return (
      <Provider store={store}>
        <WrappedComponent>{children}</WrappedComponent>
      </Provider>
    );
  };

  wrapper.displayName = `withReduxProvider(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return wrapper;
};

/**
 * Creates a HOC for wrapping components with multiple providers
 *
 * @param options - Configuration options for providers
 * @returns Wrapper component with all providers applied
 *
 * @example
 * ```tsx
 * // Multiple providers
 * const MultiWrapper = withProviders({
 *   storeState: { auth: { user: mockUser } },
 *   customProviders: [ThemeProvider, I18nProvider]
 * });
 * render(<MyComponent />, { wrapper: MultiWrapper });
 * ```
 */
export const withProviders = (
  options: ProviderHOCOptions = {},
  WrappedComponent: React.ComponentType<{ children: ReactNode }> = Fragment
): WrapperComponent => {
  const { customProviders = [], storeState = {} } = options;

  const wrapper = ({ children }: { children: ReactNode }) => {
    const store = configureStore({
      reducer: (state = storeState) => state,
    });

    let element = <WrappedComponent>{children}</WrappedComponent>;

    for (let i = customProviders.length - 1; i >= 0; i -= 1) {
      const CustomProvider = customProviders[i];
      if (CustomProvider) {
        element = <CustomProvider>{element}</CustomProvider>;
      }
    }

    return <Provider store={store}>{element}</Provider>;
  };

  wrapper.displayName = `withProviders(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return wrapper;
};

/**
 * Auto-detection utility: creates store from plain object or uses existing store
 *
 * @param storeOrState - Redux store instance or plain state object
 * @returns Configured Redux store
 *
 * @example
 * ```tsx
 * // With plain object (auto-creates store)
 * const store = createTestStore({ auth: { user: mockUser } });
 *
 * // With existing store (returns as-is)
 * const existingStore = configureStore({});
 * const store = createTestStore(existingStore); // Returns existingStore
 * ```
 */
export const createTestStore = (storeOrState: any) => {
  if (storeOrState && typeof storeOrState.getState === 'function') {
    return storeOrState;
  }

  return configureStore({
    reducer: (state = storeOrState || {}) => state,
  });
};

/**
 * Enhanced render wrapper with auto-detection
 *
 * @param storeOrState - Store instance or plain state object
 * @param WrappedComponent - Optional component to wrap
 * @returns Wrapper component ready for testing
 *
 * @example
 * ```tsx
 * // Auto-detects store vs state
 * const wrapper1 = createRenderWrapper({ auth: { user: mockUser } }); // Creates store
 * const wrapper2 = createRenderWrapper(existingStore); // Uses existing
 * ```
 */
export const createRenderWrapper = (
  storeOrState: any = {},
  WrappedComponent: React.ComponentType<{ children: ReactNode }> = Fragment
): WrapperComponent => {
  const wrapper = ({ children }: { children: ReactNode }) => {
    const store = createTestStore(storeOrState);

    return (
      <Provider store={store}>
        <WrappedComponent>{children}</WrappedComponent>
      </Provider>
    );
  };

  wrapper.displayName = `createRenderWrapper(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return wrapper;
};

/**
 * Utility for composing multiple HOCs
 *
 * @param hocs - Array of HOC functions
 * @returns Single composed HOC
 *
 * @example
 * ```tsx
 * const ComposedWrapper = composeHOCs([
 *   withReduxProvider(mockState),
 *   withRouter(mockRoutes),
 *   withTheme(mockTheme)
 * ]);
 * ```
 */
export const composeHOCs = (
  hocs: Array<(component: React.ComponentType<any>) => React.ComponentType<any>>
) => {
  return (BaseComponent: React.ComponentType<any>) => {
    return hocs.reduceRight((acc, hoc) => hoc(acc), BaseComponent);
  };
};

export const providerHOC = {
  auto: createRenderWrapper,
  compose: composeHOCs,
  multi: withProviders,
  redux: withReduxProvider,
  store: createTestStore,
};
