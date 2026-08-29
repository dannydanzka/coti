/**
 * useUserConfirmModal Hook Tests
 *
 * Tests confirm modal state, toggle status, and delete operations.
 * Spanish locale mandatory.
 */

import { act, renderHook } from '@testing-library/react';

import { useUserConfirmModal } from './useUserConfirmModal';
import type { UseUserConfirmModalProps } from '../UserManagerScreen.interfaces';

const defaultProps: UseUserConfirmModalProps = {
  deleteUserWithConfirmation: vi.fn().mockResolvedValue(undefined),
  loadUsers: vi.fn(),
  toggleUserStatusWithNotification: vi.fn().mockResolvedValue(undefined),
};

describe('useUserConfirmModal', () => {
  describe('Initial State', () => {
    it('returns correct initial values', () => {
      const { result } = renderHook(() => useUserConfirmModal(defaultProps));

      expect(result.current.confirmModal.isOpen).toBe(false);
      expect(result.current.processingUserId).toBeNull();
      expect(result.current.isDeleting).toBe(false);
    });
  });

  describe('handleToggleStatus', () => {
    it('toggles user status successfully', async () => {
      const { result } = renderHook(() => useUserConfirmModal(defaultProps));

      await act(async () => {
        await result.current.handleToggleStatus('user-1', true, 'María García');
      });

      expect(defaultProps.toggleUserStatusWithNotification).toHaveBeenCalledWith('user-1', true);
      expect(result.current.processingUserId).toBeNull();
    });

    it('handles toggle error gracefully', async () => {
      const props = {
        ...defaultProps,
        toggleUserStatusWithNotification: vi.fn().mockRejectedValue(new Error('Error de red')),
      };
      const { result } = renderHook(() => useUserConfirmModal(props));

      await act(async () => {
        await result.current.handleToggleStatus('user-1', true, 'María García');
      });

      expect(result.current.processingUserId).toBeNull();
    });
  });

  describe('handleOpenDeleteConfirm', () => {
    it('opens delete confirmation modal', () => {
      const { result } = renderHook(() => useUserConfirmModal(defaultProps));

      act(() => {
        result.current.handleOpenDeleteConfirm({
          email: 'maria@example.com',
          firstName: 'María',
          id: 'user-1',
          isActive: true,
          lastName: 'García',
          role: 'participant',
        } as never);
      });

      expect(result.current.confirmModal.isOpen).toBe(true);
      expect(result.current.confirmModal.title).toBe('Eliminar usuario');
      expect(result.current.confirmModal.variant).toBe('danger');
      expect(result.current.confirmModal.message).toContain('María García');
    });
  });

  describe('handleCloseConfirmModal', () => {
    it('closes the modal and resets state', () => {
      const { result } = renderHook(() => useUserConfirmModal(defaultProps));

      act(() => {
        result.current.handleOpenDeleteConfirm({
          email: 'test@example.com',
          firstName: 'Test',
          id: 'user-1',
          isActive: true,
          lastName: 'User',
          role: 'participant',
        } as never);
      });

      expect(result.current.confirmModal.isOpen).toBe(true);

      act(() => {
        result.current.handleCloseConfirmModal();
      });

      expect(result.current.confirmModal.isOpen).toBe(false);
    });
  });
});
