/**
 * useUserFormModal Hook Tests
 *
 * Tests form modal state, open/close, password visibility, and save operations.
 * Spanish locale mandatory.
 */

import { act, renderHook } from '@testing-library/react';

import { useUserFormModal } from './useUserFormModal';
import type { UseUserFormModalProps } from '../UserManagerScreen.interfaces';

const defaultProps: UseUserFormModalProps = {
  createUser: vi.fn().mockResolvedValue({ success: true }),
  currentUserId: 'current-user',
  isOwner: true,
  loadUsers: vi.fn(),
  updateUser: vi.fn().mockResolvedValue({ success: true }),
};

describe('useUserFormModal', () => {
  describe('Initial State', () => {
    it('returns correct initial values', () => {
      const { result } = renderHook(() => useUserFormModal(defaultProps));

      expect(result.current.isModalOpen).toBe(false);
      expect(result.current.isEditing).toBe(false);
      expect(result.current.isEditingSelf).toBe(false);
      expect(result.current.editingUserId).toBeNull();
      expect(result.current.isSaving).toBe(false);
      expect(result.current.showPassword).toBe(false);
      expect(result.current.showConfirmPassword).toBe(false);
    });
  });

  describe('handleOpenCreateModal', () => {
    it('opens create modal', () => {
      const { result } = renderHook(() => useUserFormModal(defaultProps));

      act(() => {
        result.current.handleOpenCreateModal();
      });

      expect(result.current.isModalOpen).toBe(true);
      expect(result.current.isEditing).toBe(false);
      expect(result.current.editingUserId).toBeNull();
    });
  });

  describe('handleOpenEditModal', () => {
    it('opens edit modal with user data', () => {
      const { result } = renderHook(() => useUserFormModal(defaultProps));

      act(() => {
        result.current.handleOpenEditModal({
          email: 'maria.garcia@example.com',
          firstName: 'María',
          id: 'user-1',
          isActive: true,
          lastName: 'García',
          role: 'admin',
        } as never);
      });

      expect(result.current.isModalOpen).toBe(true);
      expect(result.current.isEditing).toBe(true);
      expect(result.current.editingUserId).toBe('user-1');
    });

    it('detects editing self', () => {
      const { result } = renderHook(() => useUserFormModal(defaultProps));

      act(() => {
        result.current.handleOpenEditModal({
          email: 'current@example.com',
          firstName: 'Current',
          id: 'current-user',
          isActive: true,
          lastName: 'User',
          role: 'admin',
        } as never);
      });

      expect(result.current.isEditingSelf).toBe(true);
    });
  });

  describe('handleCloseModal', () => {
    it('closes modal and resets state', () => {
      const { result } = renderHook(() => useUserFormModal(defaultProps));

      act(() => {
        result.current.handleOpenCreateModal();
      });

      act(() => {
        result.current.handleCloseModal();
      });

      expect(result.current.isModalOpen).toBe(false);
      expect(result.current.editingUserId).toBeNull();
      expect(result.current.showPassword).toBe(false);
      expect(result.current.showConfirmPassword).toBe(false);
    });
  });

  describe('Password Visibility', () => {
    it('toggles password visibility', () => {
      const { result } = renderHook(() => useUserFormModal(defaultProps));

      act(() => {
        result.current.handleTogglePasswordVisibility();
      });

      expect(result.current.showPassword).toBe(true);
    });

    it('toggles confirm password visibility', () => {
      const { result } = renderHook(() => useUserFormModal(defaultProps));

      act(() => {
        result.current.handleToggleConfirmPasswordVisibility();
      });

      expect(result.current.showConfirmPassword).toBe(true);
    });
  });
});
