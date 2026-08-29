/**
 * useAuthenticatedLayout Hook Tests
 *
 * Tests authenticated layout state, redirects, and drawer management.
 * Spanish locale mandatory.
 */

import { act } from 'react';
import { renderHook } from '@testing-library/react';

import { useAuthenticatedLayout } from './useAuthenticatedLayout';

const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockDispatch = vi.fn();

const mockRouterReturn = { push: mockPush, replace: mockReplace };

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouterReturn,
}));

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn().mockReturnValue(false),
}));

vi.mock('@constants', () => ({
  DEV_USER_EMAIL: 'dev@test.com',
  USER_ROLES: { ADMIN: 'admin', OWNER: 'owner', PARTICIPANT: 'participant' },
}));

const mockAuthReturn = {
  isAuthenticated: true,
  isLoading: false,
  user: { email: 'admin@ejemplo.com', id: 'user-1', role: 'admin' },
};

vi.mock('@hooks', () => ({
  useAuth: () => mockAuthReturn,
}));

vi.mock('@redux', () => ({
  selectIsDrawerCollapsed: vi.fn(),
  setDrawerCollapsed: vi.fn((collapsed: boolean) => ({
    payload: collapsed,
    type: 'ui/setDrawerCollapsed',
  })),
}));

describe('useAuthenticatedLayout', () => {
  it('returns layout state', () => {
    const { result } = renderHook(() => useAuthenticatedLayout());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isMobileOpen).toBe(false);
    expect(result.current.canAccess).toBe(true);
  });

  it('handles collapsed change', () => {
    const { result } = renderHook(() => useAuthenticatedLayout());

    act(() => {
      result.current.handleCollapsedChange(true);
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handles mobile open/close', () => {
    const { result } = renderHook(() => useAuthenticatedLayout());

    act(() => {
      result.current.handleMobileOpen();
    });

    expect(result.current.isMobileOpen).toBe(true);

    act(() => {
      result.current.handleMobileClose();
    });

    expect(result.current.isMobileOpen).toBe(false);
  });
});
