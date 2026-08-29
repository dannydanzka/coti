/**
 * useUsersSelection Hook Tests
 *
 * Tests user selection and notification operations.
 * Spanish locale mandatory.
 */

import { act } from 'react';
import { renderHook } from '@testing-library/react';

import { useUsersSelection } from './useUsersSelection';

const mockDispatch = vi.fn();

vi.mock('@hooks/useRedux', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn().mockReturnValue([]),
}));

vi.mock('@redux', () => ({
  clearAllNotifications: vi.fn(() => ({ type: 'notifications/clearAll' })),
  clearSelectedUsersAction: vi.fn(() => ({ type: 'users/clearSelected' })),
  dequeueNotification: vi.fn((data: unknown) => ({ payload: data, type: 'notifications/dequeue' })),
  selectSelectedUsers: vi.fn(),
  selectUserAction: vi.fn((id: unknown) => ({ payload: id, type: 'users/select' })),
  unselectUserAction: vi.fn((id: unknown) => ({ payload: id, type: 'users/unselect' })),
}));

describe('useUsersSelection', () => {
  it('selects user by id', () => {
    const { result } = renderHook(() => useUsersSelection());

    act(() => {
      result.current.selectUserById('user-1');
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('unselects user by id', () => {
    const { result } = renderHook(() => useUsersSelection());

    act(() => {
      result.current.unselectUserById('user-1');
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('clears selected users', () => {
    const { result } = renderHook(() => useUsersSelection());

    act(() => {
      result.current.clearSelectedUsers();
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('clears error', () => {
    const { result } = renderHook(() => useUsersSelection());

    act(() => {
      result.current.clearError();
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('clears notification by id', () => {
    const { result } = renderHook(() => useUsersSelection());

    act(() => {
      result.current.clearNotification('notif-1');
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
