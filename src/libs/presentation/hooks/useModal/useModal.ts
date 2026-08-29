/**
 * useModal Hook - Redux-only modal management
 *
 * Replaces Context API with Redux-only modal state management
 */

import { useCallback } from 'react';

import type { ActiveModal, ModalConfig } from '@redux';
import {
  addModal,
  clearAllModals,
  removeModal,
  removeTopModal,
  selectActiveModals,
  selectHasModals,
  selectTopModal,
} from '@redux';

import { useAppDispatch, useAppSelector } from '../useRedux';

const generateModalId = (): string => {
  return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useModal = () => {
  const dispatch = useAppDispatch();
  const activeModals = useAppSelector(selectActiveModals);
  const topModal = useAppSelector(selectTopModal);
  const hasModals = useAppSelector(selectHasModals);

  const closeModal = useCallback(
    (modalId?: string) => {
      if (modalId) {
        dispatch(removeModal({ modalId }));
      } else {
        dispatch(removeTopModal());
      }
    },
    [dispatch]
  );

  const showAlert = useCallback(
    (title: string, content: string, onConfirm: () => void = () => {}): string => {
      const id = generateModalId();
      const config: ModalConfig = {
        actions: [
          {
            label: 'Aceptar',
            onClick: () => {
              onConfirm();
              closeModal(id);
            },
            variant: 'primary',
          },
        ],
        canCloseOnBackdrop: false,
        canCloseOnEscape: true,
        content,
        id,
        showCloseButton: false,
        title,
        type: 'alert',
      };

      const modal: ActiveModal = { config, id };
      dispatch(addModal({ modal }));
      return id;
    },
    [dispatch, closeModal]
  );

  const showConfirm = useCallback(
    (
      title: string,
      content: string,
      onConfirm: () => void,
      onCancel: () => void = () => {}
    ): string => {
      const id = generateModalId();
      const config: ModalConfig = {
        actions: [
          {
            label: 'Cancelar',
            onClick: () => {
              onCancel();
              closeModal(id);
            },
            variant: 'secondary',
          },
          {
            label: 'Confirmar',
            onClick: () => {
              onConfirm();
              closeModal(id);
            },
            variant: 'primary',
          },
        ],
        canCloseOnBackdrop: false,
        canCloseOnEscape: true,
        content,
        id,
        showCloseButton: false,
        title,
        type: 'confirm',
      };

      const modal: ActiveModal = { config, id };
      dispatch(addModal({ modal }));
      return id;
    },
    [dispatch, closeModal]
  );

  const showFixed = useCallback(
    (title: string, content: React.ReactNode): string => {
      const id = generateModalId();
      const config: ModalConfig = {
        canCloseOnBackdrop: false,
        canCloseOnEscape: false,
        content,
        id,
        showCloseButton: true,
        title,
        type: 'fixed',
      };

      const modal: ActiveModal = { config, id };
      dispatch(addModal({ modal }));
      return id;
    },
    [dispatch]
  );

  const showDismissible = useCallback(
    (title: string, content: React.ReactNode): string => {
      const id = generateModalId();
      const config: ModalConfig = {
        canCloseOnBackdrop: true,
        canCloseOnEscape: true,
        content,
        id,
        showCloseButton: true,
        title,
        type: 'dismissible',
      };

      const modal: ActiveModal = { config, id };
      dispatch(addModal({ modal }));
      return id;
    },
    [dispatch]
  );

  const showCustomModal = useCallback(
    (config: Omit<ModalConfig, 'id'>): string => {
      const id = generateModalId();
      const fullConfig: ModalConfig = { ...config, id };
      const modal: ActiveModal = { config: fullConfig, id };

      dispatch(addModal({ modal }));
      return id;
    },
    [dispatch]
  );

  const clearAll = useCallback(() => {
    dispatch(clearAllModals());
  }, [dispatch]);

  return {
    activeModals,
    clearAll,
    closeModal,
    hasModals,
    showAlert,
    showConfirm,
    showCustomModal,
    showDismissible,
    showFixed,
    topModal,
  };
};
