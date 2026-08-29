import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';
import React from 'react';

import { authSlice } from '@redux/slices/auth/auth.slice';
import { configureStore } from '@reduxjs/toolkit';
import { globalSlice } from '@redux';

import { useAppDispatch, useAppSelector } from './useRedux';

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      global: globalSlice.reducer,
    },
  });

describe('useRedux', () => {
  let store: ReturnType<typeof createTestStore>;
  let wrapper: ({ children }: { children: React.ReactNode }) => React.ReactElement;

  beforeEach(() => {
    store = createTestStore();
    wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
  });

  it('useAppDispatch provides dispatch function', () => {
    const { result } = renderHook(() => useAppDispatch(), { wrapper });

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe('function');
  });

  it('useAppSelector provides selector function', () => {
    const { result } = renderHook(() => useAppSelector((state) => state.auth), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('selector returns current auth state', () => {
    const { result } = renderHook(() => useAppSelector((state) => state.auth), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('selector returns current global state', () => {
    const { result } = renderHook(() => useAppSelector((state) => state.global), { wrapper });

    expect(result.current.toasts).toEqual([]);
    expect(result.current.notifications).toEqual([]);
    expect(result.current.activeModals).toEqual([]);
    expect(result.current.theme).toBe('dark');
  });

  it('dispatch can trigger actions', () => {
    const { result: dispatchResult } = renderHook(() => useAppDispatch(), { wrapper });

    const action = { type: 'test/action' };
    expect(() => {
      dispatchResult.current(action);
    }).not.toThrow();
  });
});
