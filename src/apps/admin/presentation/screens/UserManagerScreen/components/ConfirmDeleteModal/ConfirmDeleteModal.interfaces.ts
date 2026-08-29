/**
 * ConfirmDeleteModal Interfaces
 */

export interface ConfirmModalData {
  confirmText: string;
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  title: string;
  userId: string | null;
  variant: 'danger' | 'info' | 'warning';
}

export interface ConfirmDeleteModalProps {
  confirmModal: ConfirmModalData;
  handleCloseConfirmModal: () => void;
  isDeleting: boolean;
}
