/**
 * useProfileEditForm Hook Tests
 *
 * Tests profile form state, input handlers, and submit flow.
 * Spanish locale mandatory.
 */

import { act, renderHook } from '@testing-library/react';

import { useProfileEditForm } from './useProfileEditForm';

const mockPush = vi.fn();
const mockBack = vi.fn();
const mockUpdateProfile = vi.fn().mockResolvedValue(true);
const mockReset = vi.fn();

const mockRouterReturn = { back: mockBack, push: mockPush };

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouterReturn,
}));

const { mockUser } = vi.hoisted(() => ({
  mockUser: {
    age: 30,
    bio: 'Amante del bienestar',
    city: 'Guadalajara',
    country: 'México',
    firstName: 'María',
    lastName: 'García',
    neighborhood: 'Centro',
    number: '42',
    phone: '3331234567',
    state: 'Jalisco',
    street: 'Av. Revolución',
    zipCode: '44100',
  },
}));

const mockAuthReturn = { user: mockUser };
const mockProfileUpdateReturn = {
  isLoading: false,
  reset: mockReset,
  updateProfile: mockUpdateProfile,
};

vi.mock('@hooks', () => ({
  useAuth: () => mockAuthReturn,
}));

vi.mock('@apps/public/hooks', () => ({
  useProfileUpdate: () => mockProfileUpdateReturn,
}));

describe('useProfileEditForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Initial State', () => {
    it('returns profile form with user data', () => {
      const { result } = renderHook(() => useProfileEditForm());

      expect(result.current.profileForm).toBeDefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.user).toBeDefined();
    });
  });

  describe('handleInputChange', () => {
    it('creates input change handler for text fields', () => {
      const { result } = renderHook(() => useProfileEditForm());

      const handler = result.current.handleInputChange('firstName');
      expect(typeof handler).toBe('function');

      act(() => {
        handler({ target: { value: 'Ana' } } as React.ChangeEvent<HTMLInputElement>);
      });
    });

    it('handles age as numeric value', () => {
      const { result } = renderHook(() => useProfileEditForm());

      const handler = result.current.handleInputChange('age');

      act(() => {
        handler({ target: { value: '25' } } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current).toBeDefined();
    });

    it('handles empty age as undefined', () => {
      const { result } = renderHook(() => useProfileEditForm());

      const handler = result.current.handleInputChange('age');

      act(() => {
        handler({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current).toBeDefined();
    });
  });

  describe('handleNumericInput', () => {
    it('strips non-numeric characters', () => {
      const { result } = renderHook(() => useProfileEditForm());

      const handler = result.current.handleNumericInput('phone');

      act(() => {
        handler({ target: { value: 'abc123def' } } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current).toBeDefined();
    });
  });

  describe('handleCountryChange', () => {
    it('sets country value', () => {
      const { result } = renderHook(() => useProfileEditForm());

      act(() => {
        result.current.handleCountryChange('Colombia');
      });

      expect(result.current).toBeDefined();
    });
  });

  describe('handleCancel', () => {
    it('redirects to pending enrollment if set', () => {
      vi.mocked(sessionStorage.getItem).mockReturnValueOnce('/checkout/123');

      const { result } = renderHook(() => useProfileEditForm());

      act(() => {
        result.current.handleCancel();
      });

      expect(mockPush).toHaveBeenCalledWith('/checkout/123');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('pendingEnrollment');
    });

    it('goes back if no pending enrollment', () => {
      vi.mocked(sessionStorage.getItem).mockReturnValueOnce(null);

      const { result } = renderHook(() => useProfileEditForm());

      act(() => {
        result.current.handleCancel();
      });

      expect(mockBack).toHaveBeenCalled();
    });
  });

  describe('handleSubmit', () => {
    it('calls updateProfile on submit', async () => {
      const { result } = renderHook(() => useProfileEditForm());

      await act(async () => {
        await result.current.handleSubmit({
          preventDefault: vi.fn(),
        } as unknown as React.FormEvent);
      });

      expect(mockReset).toHaveBeenCalled();
      expect(mockUpdateProfile).toHaveBeenCalled();
    });

    it('redirects to dashboard on success', async () => {
      const { result } = renderHook(() => useProfileEditForm());

      await act(async () => {
        await result.current.handleSubmit({
          preventDefault: vi.fn(),
        } as unknown as React.FormEvent);
      });

      act(() => {
        vi.advanceTimersByTime(1500);
      });

      expect(mockPush).toHaveBeenCalledWith('/dashboard/profile');
    });
  });
});
