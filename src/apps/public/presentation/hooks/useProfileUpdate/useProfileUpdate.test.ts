/**
 * useProfileUpdate Hook Tests
 *
 * Essential tests for profile update hook with toast notifications.
 * Tests state management, API interactions, and notification feedback.
 * Spanish locale mandatory.
 */

import { act, renderHook } from '@testing-library/react';

import { handleRequest } from '@helpers';
import { setupServiceMock } from '@testing/helpers';

import { useProfileUpdate } from './useProfileUpdate';

const mockShowSuccess = vi.fn();
const mockShowError = vi.fn();
const mockDispatch = vi.fn();

vi.mock('@helpers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@helpers')>();
  return {
    ...actual,
    handleRequest: vi.fn(),
  };
});

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-redux')>();
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

const mockNotificationsReturn = { showError: mockShowError, showSuccess: mockShowSuccess };

vi.mock('@hooks', () => ({
  useNotifications: () => mockNotificationsReturn,
}));

const { mockError, mockRejection, mockSuccess } = setupServiceMock();

describe('useProfileUpdate', () => {
  const mockProfilePayload = {
    city: 'Ciudad de México',
    country: 'México',
    neighborhood: 'Condesa',
    number: '123',
    phone: '+52 55 1234 5678',
    state: 'CDMX',
    street: 'Av. Insurgentes Sur',
    zipCode: '06100',
  };

  const mockAddress = {
    city: 'Ciudad de México',
    country: 'México',
    neighborhood: 'Condesa',
    number: '123',
    state: 'CDMX',
    street: 'Av. Insurgentes Sur',
    zipCode: '06100',
  };
  describe('Initial State', () => {
    it('returns correct initial values', () => {
      const { result } = renderHook(() => useProfileUpdate());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.updatedAddress).toBeNull();
      expect(typeof result.current.updateProfile).toBe('function');
      expect(typeof result.current.reset).toBe('function');
    });
  });

  describe('reset', () => {
    it('clears state values', async () => {
      mockSuccess({ address: mockAddress });

      const { result } = renderHook(() => useProfileUpdate());

      await act(async () => {
        await result.current.updateProfile(mockProfilePayload);
      });

      expect(result.current.updatedAddress).toEqual(mockAddress);

      act(() => {
        result.current.reset();
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.updatedAddress).toBeNull();
    });
  });

  describe('updateProfile', () => {
    it('updates profile successfully and shows toast', async () => {
      mockSuccess({ address: mockAddress });

      const { result } = renderHook(() => useProfileUpdate());

      let success: boolean | undefined;
      await act(async () => {
        success = await result.current.updateProfile(mockProfilePayload);
      });

      expect(success).toBe(true);
      expect(result.current.updatedAddress).toEqual(mockAddress);
      expect(mockShowSuccess).toHaveBeenCalledWith('Perfil actualizado correctamente');
      expect(mockShowError).not.toHaveBeenCalled();
    });

    it('sets loading state during request', async () => {
      let resolveRequest: ((value: unknown) => void) | undefined;
      const requestPromise = new Promise((resolve) => {
        resolveRequest = resolve;
      });

      vi.mocked(handleRequest).mockReturnValueOnce(requestPromise);

      const { result } = renderHook(() => useProfileUpdate());

      act(() => {
        void result.current.updateProfile(mockProfilePayload);
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        resolveRequest?.({ data: { address: mockAddress }, success: true });
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('handles API error response and shows error toast', async () => {
      vi.mocked(handleRequest).mockResolvedValueOnce({
        message: 'Código postal inválido',
        success: false,
      });

      const { result } = renderHook(() => useProfileUpdate());

      let success: boolean | undefined;
      await act(async () => {
        success = await result.current.updateProfile(mockProfilePayload);
      });

      expect(success).toBe(false);
      expect(result.current.updatedAddress).toBeNull();
      expect(mockShowError).toHaveBeenCalledWith('Código postal inválido');
      expect(mockShowSuccess).not.toHaveBeenCalled();
    });

    it('handles missing error message', async () => {
      mockError();

      const { result } = renderHook(() => useProfileUpdate());

      await act(async () => {
        await result.current.updateProfile(mockProfilePayload);
      });

      expect(mockShowError).toHaveBeenCalledWith('No se pudo actualizar el perfil');
    });

    it('calls API with correct payload', async () => {
      mockSuccess({ address: mockAddress });

      const { result } = renderHook(() => useProfileUpdate());

      await act(async () => {
        await result.current.updateProfile(mockProfilePayload);
      });

      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          body: mockProfilePayload,
          endpoint: '/api/public/profile',
          method: 'PUT',
        })
      );
    });

    it('uses default country when not provided', async () => {
      mockSuccess({ address: mockAddress });

      const payloadWithoutCountry = {
        city: 'Guadalajara',
        neighborhood: 'Centro',
        number: '456',
        state: 'Jalisco',
        street: 'Av. Vallarta',
        zipCode: '44100',
      };

      const { result } = renderHook(() => useProfileUpdate());

      await act(async () => {
        await result.current.updateProfile(payloadWithoutCountry);
      });

      expect(result.current.updatedAddress?.country).toBe('México');
    });
  });

  describe('Error Handling', () => {
    it('handles network errors gracefully', async () => {
      mockRejection('Error de red');

      const { result } = renderHook(() => useProfileUpdate());

      let success: boolean | undefined;
      await act(async () => {
        success = await result.current.updateProfile(mockProfilePayload);
      });

      expect(success).toBe(false);
      expect(mockShowError).toHaveBeenCalledWith('Error de red');
      expect(result.current.isLoading).toBe(false);
    });

    it('handles unknown errors', async () => {
      vi.mocked(handleRequest).mockRejectedValueOnce('Unknown error');

      const { result } = renderHook(() => useProfileUpdate());

      await act(async () => {
        await result.current.updateProfile(mockProfilePayload);
      });

      expect(mockShowError).toHaveBeenCalledWith('Error al actualizar el perfil');
    });
  });
});
