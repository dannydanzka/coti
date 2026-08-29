/**
 * Modal Component
 *
 * Unified modal component with multiple modes:
 * - Default: Standard modal with header, content, optional footer
 * - Confirm: Confirmation modal with icon, message, and action buttons
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

import { KEYBOARD_KEY, MODAL_VARIANT } from '@constants';

import { Button } from '../Button';
import type { ModalProps } from './Modal.interfaces';
import { normalizeSize } from './ModalImpl.helpers';

import {
  BaseModalContainer,
  BaseModalFooter,
  ModalActions,
  ModalConfirmTitle,
  ModalContent,
  ModalHeader,
  ModalIcon,
  ModalMessage,
  ModalOverlay,
  ModalTitle,
} from './Modal.styled';

export const ModalImpl = ({
  cancelText = 'Cancelar',
  children,
  confirmText = 'Confirmar',
  confirmVariant = 'danger',
  disableClose = false,
  footer,
  icon,
  isOpen,
  loading = false,
  message,
  noPadding = false,
  onCancel,
  onClose,
  onConfirm,
  size = 'md',
  title,
  variant = 'default',
}: ModalProps) => {
  const { t } = useTranslation();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (disableClose || loading) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [disableClose, loading, onClose]);

  const handleCancel = useCallback(() => {
    if (loading) return;
    if (onCancel) {
      onCancel();
    } else {
      handleClose();
    }
  }, [loading, onCancel, handleClose]);

  const handleConfirm = useCallback(() => {
    if (loading || !onConfirm) return;
    onConfirm();
  }, [loading, onConfirm]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEYBOARD_KEY.ESCAPE && !disableClose && !loading) {
        handleClose();
      }
    },
    [handleClose, disableClose, loading]
  );

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen && !isClosing) return null;

  const normalizedSize = normalizeSize(size);

  const renderConfirmContent = () => (
    <ModalContent>
      {icon && <ModalIcon $variant={confirmVariant}>{icon}</ModalIcon>}
      {title && <ModalConfirmTitle>{title}</ModalConfirmTitle>}
      {message && <ModalMessage>{message}</ModalMessage>}
      <ModalActions>
        <Button disabled={loading} variant='secondary' onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button
          loading={loading}
          variant={confirmVariant === MODAL_VARIANT.INFO ? 'primary' : confirmVariant}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </ModalActions>
    </ModalContent>
  );

  const renderDefaultContent = () => (
    <>
      {title && (
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <Button
            aria-label={t('components.modal.close')}
            disabled={disableClose || loading}
            icon={<X size={20} />}
            iconOnly
            size='sm'
            variant='ghost'
            onClick={handleClose}
          />
        </ModalHeader>
      )}
      <ModalContent $noPadding={noPadding}>{children}</ModalContent>
      {footer && <BaseModalFooter>{footer}</BaseModalFooter>}
    </>
  );

  return (
    <ModalOverlay $isClosing={isClosing}>
      <BaseModalContainer
        $isClosing={isClosing}
        $size={normalizedSize}
        aria-modal='true'
        role='dialog'
        onClick={handleContentClick}
      >
        {variant === MODAL_VARIANT.CONFIRM ? renderConfirmContent() : renderDefaultContent()}
      </BaseModalContainer>
    </ModalOverlay>
  );
};
