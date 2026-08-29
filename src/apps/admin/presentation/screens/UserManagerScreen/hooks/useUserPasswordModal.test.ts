/**
 * useUserPasswordModal Hook Tests
 *
 * Tests password modal open/close, visibility toggles, and password change.
 * Spanish locale mandatory.
 */

import { act, renderHook } from '@testing-library/react';

import { useUserPasswordModal } from './useUserPasswordModal';
import type { UseUserPasswordModalProps } from '../UserManagerScreen.interfaces';

const defaultProps: UseUserPasswordModalProps = {
  changeUserPassword: vi.fn().mockResolvedValue({ success: true }),
};

describe('useUserPasswordModal', () => {
  describe('Initial State', () => {
    it('returns correct initial values', () => {
      const { result } = renderHook(() => useUserPasswordModal(defaultProps));

      expect(result.current.passwordModal.isOpen).toBe(false);
      expect(result.current.passwordModal.userId).toBeNull();
      expect(result.current.isChangingPassword).toBe(false);
      expect(result.current.showNewPassword).toBe(false);
      expect(result.current.showConfirmPassword).toBe(false);
    });
  });

  describe('handleOpenPasswordModal', () => {
    it('opens modal with user data', () => {
      const { result } = renderHook(() => useUserPasswordModal(defaultProps));

      act(() => {
        result.current.handleOpenPasswordModal({
          email: 'maria@example.com',
          firstName: 'María',
          id: 'user-1',
          isActive: true,
          lastName: 'García',
          role: 'admin',
        } as never);
      });

      expect(result.current.passwordModal.isOpen).toBe(true);
      expect(result.current.passwordModal.userId).toBe('user-1');
      expect(result.current.passwordModal.userName).toBe('María García');
    });
  });

  describe('handleClosePasswordModal', () => {
    it('closes modal and resets state', () => {
      const { result } = renderHook(() => useUserPasswordModal(defaultProps));

      act(() => {
        result.current.handleOpenPasswordModal({
          email: 'test@example.com',
          firstName: 'Test',
          id: 'user-1',
          isActive: true,
          lastName: 'User',
          role: 'admin',
        } as never);
      });

      act(() => {
        result.current.handleClosePasswordModal();
      });

      expect(result.current.passwordModal.isOpen).toBe(false);
      expect(result.current.showNewPassword).toBe(false);
      expect(result.current.showConfirmPassword).toBe(false);
    });
  });

  describe('Password Visibility', () => {
    it('toggles new password visibility', () => {
      const { result } = renderHook(() => useUserPasswordModal(defaultProps));

      expect(result.current.showNewPassword).toBe(false);

      act(() => {
        result.current.handleToggleNewPasswordVisibility();
      });

      expect(result.current.showNewPassword).toBe(true);

      act(() => {
        result.current.handleToggleNewPasswordVisibility();
      });

      expect(result.current.showNewPassword).toBe(false);
    });

    it('toggles confirm password visibility', () => {
      const { result } = renderHook(() => useUserPasswordModal(defaultProps));

      act(() => {
        result.current.handleToggleConfirmPasswordVisibility();
      });

      expect(result.current.showConfirmPassword).toBe(true);
    });
  });
});
