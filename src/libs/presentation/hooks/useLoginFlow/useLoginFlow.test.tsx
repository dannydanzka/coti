import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@redux';

import { useLoginFlow } from './useLoginFlow';

const mockDispatch = vi.fn();
const mockPush = vi.fn();

const mockAuthReturn = {
  checkAuth: vi.fn().mockResolvedValue(undefined),
  isAuthenticated: false,
  isLoading: false,
  login: vi.fn(),
  logout: vi.fn(),
};

vi.mock('../useAuth/useAuth', () => ({
  useAuth: () => mockAuthReturn,
}));

const mockRouterReturn = { push: mockPush };
const mockSearchParamsReturn = { get: vi.fn(() => null) };

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouterReturn,
  useSearchParams: () => mockSearchParamsReturn,
}));

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn(),
}));

const mockUseSelector = vi.mocked(useSelector);

describe('useLoginFlow', () => {
  beforeEach(() => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector === selectIsAuthenticated) return false;
      return null;
    });
  });

  it('provides form interface from react-hook-form', () => {
    const { result } = renderHook(() => useLoginFlow());

    expect(result.current.errors).toBeDefined();
    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.handleKeyDown).toBeDefined();
    expect(result.current.isInitializing).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('handles initialization state in test environment', () => {
    const { result } = renderHook(() => useLoginFlow());

    expect(result.current.isInitializing).toBe(false);
  });

  it('provides keyboard event handler', () => {
    const { result } = renderHook(() => useLoginFlow());

    expect(typeof result.current.handleKeyDown).toBe('function');
  });

  it('handles form submission through react-hook-form', () => {
    const { result } = renderHook(() => useLoginFlow());

    expect(typeof result.current.handleSubmit).toBe('function');
  });

  it('tracks form state correctly', () => {
    const { result } = renderHook(() => useLoginFlow());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });
});
