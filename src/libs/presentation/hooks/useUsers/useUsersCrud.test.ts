/**
 * useUsersCrud Hook Tests
 *
 * Tests CRUD dispatch operations for user management.
 * Spanish locale mandatory.
 */

import { act } from 'react';
import { renderHook } from '@testing-library/react';

import { useUsersCrud } from './useUsersCrud';

const mockDispatch = vi.fn();
const mockUnwrap = vi.fn();

vi.mock('@hooks/useRedux', () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock('@redux', () => ({
  createUserAction: vi.fn((data: unknown) => ({ payload: data, type: 'users/create' })),
  deleteUserWithConfirmationAction: vi.fn((id: unknown) => ({ payload: id, type: 'users/delete' })),
  fetchUsersAction: vi.fn((params: unknown) => ({ payload: params, type: 'users/fetch' })),
  updateUserAction: vi.fn((data: unknown) => ({ payload: data, type: 'users/update' })),
}));

describe('useUsersCrud', () => {
  beforeEach(() => {
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue(undefined);
  });

  it('loads users with params', () => {
    const { result } = renderHook(() => useUsersCrud());

    act(() => {
      result.current.loadUsers({ limit: 10, page: 1 });
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('creates user successfully', async () => {
    const { result } = renderHook(() => useUsersCrud());

    const res = await act(async () => {
      return result.current.createUser({
        email: 'maria@ejemplo.com',
        firstName: 'María',
        lastName: 'García',
        password: 'contraseña123',
        role: 'participant',
      });
    });

    expect(res.success).toBe(true);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('returns error when userData is undefined', async () => {
    const { result } = renderHook(() => useUsersCrud());

    const res = await act(async () => {
      return result.current.createUser(undefined);
    });

    expect(res.success).toBe(false);
    expect(res.error).toBe('userData is required');
  });

  it('handles create user error', async () => {
    mockUnwrap.mockRejectedValueOnce('Error de red');
    const { result } = renderHook(() => useUsersCrud());

    const res = await act(async () => {
      return result.current.createUser({
        email: 'maria@ejemplo.com',
        firstName: 'María',
        lastName: 'García',
        password: 'contraseña123',
        role: 'participant',
      });
    });

    expect(res.success).toBe(false);
  });

  it('updates user successfully', async () => {
    const { result } = renderHook(() => useUsersCrud());

    const res = await act(async () => {
      return result.current.updateUser('user-1', { firstName: 'José' });
    });

    expect(res.success).toBe(true);
  });

  it('returns error when userId or data missing', async () => {
    const { result } = renderHook(() => useUsersCrud());

    const res = await act(async () => {
      return result.current.updateUser(undefined, undefined);
    });

    expect(res.success).toBe(false);
    expect(res.error).toBe('userId and data are required');
  });

  it('handles update user error', async () => {
    mockUnwrap.mockRejectedValueOnce('Error al actualizar');
    const { result } = renderHook(() => useUsersCrud());

    const res = await act(async () => {
      return result.current.updateUser('user-1', { firstName: 'José' });
    });

    expect(res.success).toBe(false);
  });

  it('deletes user', () => {
    const { result } = renderHook(() => useUsersCrud());

    act(() => {
      result.current.deleteUser('user-1');
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
