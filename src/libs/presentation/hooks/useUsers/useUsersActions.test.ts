/**
 * useUsersActions Hook Tests
 *
 * Tests user status toggle and password change.
 * Spanish locale mandatory.
 */

import { act } from 'react';
import { renderHook } from '@testing-library/react';

import { useUsersActions } from './useUsersActions';

const mockDispatch = vi.fn();
const mockUnwrap = vi.fn();

vi.mock('@hooks/useRedux', () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock('@redux', () => ({
  changeUserPasswordAction: vi.fn((data: unknown) => ({
    payload: data,
    type: 'users/changePassword',
  })),
  toggleUserStatusWithNotificationAction: vi.fn((data: unknown) => ({
    payload: data,
    type: 'users/toggleStatus',
  })),
}));

describe('useUsersActions', () => {
  beforeEach(() => {
    mockDispatch.mockReturnValue({ unwrap: mockUnwrap });
    mockUnwrap.mockResolvedValue(undefined);
  });

  it('toggles user status', () => {
    const { result } = renderHook(() => useUsersActions());

    act(() => {
      result.current.toggleUserStatus('user-1', true);
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('changes user password successfully', async () => {
    const { result } = renderHook(() => useUsersActions());

    const res = await act(async () => {
      return result.current.changeUserPassword('user-1', 'nuevaContraseña123');
    });

    expect(res.success).toBe(true);
  });

  it('returns error when params missing', async () => {
    const { result } = renderHook(() => useUsersActions());

    const res = await act(async () => {
      return result.current.changeUserPassword(undefined, undefined);
    });

    expect(res.success).toBe(false);
    expect(res.error).toBe('userId and newPassword are required');
  });

  it('handles password change error', async () => {
    mockUnwrap.mockRejectedValueOnce('Error al cambiar contraseña');
    const { result } = renderHook(() => useUsersActions());

    const res = await act(async () => {
      return result.current.changeUserPassword('user-1', 'nuevaContraseña123');
    });

    expect(res.success).toBe(false);
  });
});
