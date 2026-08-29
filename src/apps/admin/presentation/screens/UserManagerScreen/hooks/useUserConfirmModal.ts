/**
 * useUserConfirmModal
 *
 * Modal component for hooks operations.
 */

'use client';

import { useCallback, useState } from 'react';

import { logError } from '@logger';

import type {
  ConfirmModalData,
  UserItem,
  UseUserConfirmModalProps,
  UseUserConfirmModalReturn,
} from '../UserManagerScreen.interfaces';
import { INITIAL_CONFIRM_MODAL } from '../UserManagerScreen.constants';

export const useUserConfirmModal = ({
  deleteUserWithConfirmation,
  loadUsers,
  toggleUserStatusWithNotification,
}: UseUserConfirmModalProps): UseUserConfirmModalReturn => {
  const [confirmModal, setConfirmModal] = useState<ConfirmModalData>(INITIAL_CONFIRM_MODAL);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCloseConfirmModal = useCallback(() => {
    setConfirmModal(INITIAL_CONFIRM_MODAL);
  }, []);

  const handleToggleStatus = useCallback(
    async (userId: string, currentStatus: boolean) => {
      setProcessingUserId(userId);
      try {
        await toggleUserStatusWithNotification(userId, currentStatus);
      } catch (err) {
        logError(err, 'handleToggleStatus');
      } finally {
        setProcessingUserId(null);
      }
    },
    [toggleUserStatusWithNotification]
  );

  const handleOpenDeleteConfirm = useCallback(
    (user: UserItem) => {
      setConfirmModal({
        confirmText: 'Eliminar',
        isOpen: true,
        message: `¿Estás seguro de que deseas eliminar a ${user.firstName} ${user.lastName}? Esta acción no se puede deshacer.`,
        onConfirm: async () => {
          setIsDeleting(true);
          setProcessingUserId(user.id);
          try {
            await deleteUserWithConfirmation(user.id);
            loadUsers();
          } catch (err) {
            logError(err, 'handleDeleteUser');
          } finally {
            setIsDeleting(false);
            setProcessingUserId(null);
            setConfirmModal(INITIAL_CONFIRM_MODAL);
          }
        },
        title: 'Eliminar usuario',
        userId: user.id,
        variant: 'danger',
      });
    },
    [deleteUserWithConfirmation, loadUsers]
  );

  return {
    confirmModal,
    handleCloseConfirmModal,
    handleOpenDeleteConfirm,
    handleToggleStatus,
    isDeleting,
    processingUserId,
  };
};
