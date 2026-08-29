/**
 * useAuthDispatch Hook Tests
 *
 * Tests auth dispatch operations (login, logout, signup, restore).
 * Spanish locale mandatory.
 */

import { act } from 'react';
import { renderHook } from '@testing-library/react';

import { useAuthDispatch } from './useAuthDispatch';

const mockDispatch = vi.fn();
const mockUnwrap = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock('@redux', () => ({
  loginUser: vi.fn((params: unknown) => ({ payload: params, type: 'auth/login' })),
  logoutUser: vi.fn(() => ({ type: 'auth/logout' })),
  resetAuthState: vi.fn(() => ({ type: 'auth/reset' })),
  restoreSession: vi.fn((user: unknown) => ({ payload: user, type: 'auth/restore' })),
  setDrawerCollapsed: vi.fn((collapsed: boolean) => ({
    payload: collapsed,
    type: 'ui/setDrawerCollapsed',
  })),
  signupUser: vi.fn((params: unknown) => ({ payload: params, type: 'auth/signup' })),
}));

describe('useAuthDispatch', () => {
  beforeEach(() => {
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue({ user: { id: 'user-1' } });
  });

  it('dispatches login', async () => {
    const { result } = renderHook(() => useAuthDispatch());

    await act(async () => {
      await result.current.dispatchLogin({
        email: 'maria@ejemplo.com',
        password: 'contraseña123',
      });
    });

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockUnwrap).toHaveBeenCalled();
  });

  it('dispatches signup', async () => {
    const { result } = renderHook(() => useAuthDispatch());

    await act(async () => {
      await result.current.dispatchSignup({
        email: 'jose@ejemplo.com',
        firstName: 'José',
        lastName: 'López',
        password: 'contraseña123',
      });
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches logout and resets drawer', async () => {
    const { result } = renderHook(() => useAuthDispatch());

    await act(async () => {
      await result.current.dispatchLogout();
    });

    // logout + setDrawerCollapsed(false)
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('dispatches restore session', () => {
    const { result } = renderHook(() => useAuthDispatch());

    act(() => {
      result.current.dispatchRestoreSession({
        email: 'maria@ejemplo.com',
        id: 'user-1',
        role: 'participant',
      } as never);
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('dispatches reset auth state and drawer', () => {
    const { result } = renderHook(() => useAuthDispatch());

    act(() => {
      result.current.dispatchResetAuthState();
    });

    // resetAuthState + setDrawerCollapsed(false)
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
