/**
 * ModalContainer - Generic modal system only
 *
 * NO cross-context imports, NO circular dependencies, NO dynamic imports
 * Only renders generic modals - specialized modals handle themselves
 */

'use client';

import React, { useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

import { useModal } from '@hooks';

import {
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalContainer as StyledModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalText,
  ModalTitle,
} from './ModalContainer.styled';

export const ModalContainer: React.FC = () => {
  const { activeModals, closeModal } = useModal();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const topModal = activeModals[activeModals.length - 1];
        if (topModal?.config.canCloseOnEscape) {
          closeModal(topModal.id);
        }
      }
    };

    if (activeModals.length > 0) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeModals, closeModal]);

  const createBackdropClickHandler = useCallback(
    (modalId: string, canCloseOnBackdrop: boolean) => () => {
      if (canCloseOnBackdrop) {
        closeModal(modalId);
      }
    },
    [closeModal]
  );

  const createCloseHandler = useCallback(
    (modalId: string) => () => {
      closeModal(modalId);
    },
    [closeModal]
  );

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const renderModalHeader = useCallback(
    (modalId: string, title: React.ReactNode, showCloseButton: boolean) => {
      if (!title && !showCloseButton) return null;

      return (
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          {showCloseButton && (
            <ModalCloseButton type='button' onClick={createCloseHandler(modalId)}>
              <X size={20} />
            </ModalCloseButton>
          )}
        </ModalHeader>
      );
    },
    [createCloseHandler]
  );

  const renderModalBody = useCallback((content: React.ReactNode) => {
    if (!content) return null;

    return (
      <ModalBody>
        {typeof content === 'string' ? <ModalText>{content}</ModalText> : content}
      </ModalBody>
    );
  }, []);

  const renderModalFooter = useCallback(
    (
      modalId: string,
      actions: Array<{ label: string; onClick: () => void; variant?: 'primary' | 'secondary' }>
    ) => {
      if (actions.length === 0) return null;

      return (
        <ModalFooter>
          {actions.map((action, index) => (
            <ModalButton
              $variant={action.variant ?? 'secondary'}
              key={`${modalId}-action-${index}`}
              type='button'
              onClick={action.onClick}
            >
              {action.label}
            </ModalButton>
          ))}
        </ModalFooter>
      );
    },
    []
  );

  if (activeModals.length === 0) {
    return null;
  }

  return (
    <>
      {activeModals.map((modal) => {
        const { config, id } = modal;
        const {
          actions = [],
          canCloseOnBackdrop = false,
          content,
          showCloseButton = true,
          title,
          type,
        } = config;

        return (
          <ModalOverlay
            $isOpen
            key={id}
            onClick={createBackdropClickHandler(id, canCloseOnBackdrop)}
          >
            <StyledModalContainer $type={type} onClick={handleContainerClick}>
              {renderModalHeader(id, title, showCloseButton)}
              {renderModalBody(content)}
              {renderModalFooter(id, actions)}
            </StyledModalContainer>
          </ModalOverlay>
        );
      })}
    </>
  );
};
