/**
 * ConfirmDeleteModal
 *
 * Modal component for ConfirmDelete operations.
 */

'use client';

import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@dannydanzka/sovereignty-ui';

import type { ConfirmDeleteModalProps } from './ConfirmDeleteModal.interfaces';

export const ConfirmDeleteModal = ({
  confirmModal,
  handleCloseConfirmModal,
  isDeleting,
}: ConfirmDeleteModalProps) => {
  const { t } = useTranslation();

  if (!confirmModal.isOpen) return null;

  return (
    <Modal
      cancelText={t('common.cancel')}
      confirmText={confirmModal.confirmText}
      confirmVariant='danger'
      icon={<AlertTriangle size={32} />}
      isOpen={confirmModal.isOpen}
      loading={isDeleting}
      message={confirmModal.message}
      title={confirmModal.title}
      variant='confirm'
      onClose={handleCloseConfirmModal}
      onConfirm={confirmModal.onConfirm}
    />
  );
};
