/**
 * useUserPasswordModal
 *
 * Password change modal hook using react-hook-form + Zod validation.
 */

'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getLocalizedError } from '@i18n';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ChangePasswordFormData } from '../components/PasswordModal/PasswordModal.interfaces';
import { changePasswordSchema } from '../components/PasswordModal/PasswordModal.validation';
import { INITIAL_PASSWORD_MODAL } from '../UserManagerScreen.constants';
import type {
  PasswordModalData,
  UserItem,
  UseUserPasswordModalProps,
  UseUserPasswordModalReturn,
} from '../UserManagerScreen.interfaces';

export const useUserPasswordModal = ({
  changeUserPassword,
}: UseUserPasswordModalProps): UseUserPasswordModalReturn => {
  const [passwordModal, setPasswordModal] = useState<PasswordModalData>(INITIAL_PASSWORD_MODAL);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();

  const passwordForm = useForm<ChangePasswordFormData>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(changePasswordSchema),
  });

  const handleOpenPasswordModal = useCallback(
    (user: UserItem) => {
      setPasswordModal({
        isOpen: true,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
      });
      passwordForm.reset({ confirmPassword: '', newPassword: '' });
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    },
    [passwordForm]
  );

  const handleClosePasswordModal = useCallback(() => {
    setPasswordModal(INITIAL_PASSWORD_MODAL);
    passwordForm.reset();
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  }, [passwordForm]);

  const handleToggleNewPasswordVisibility = useCallback(() => {
    setShowNewPassword((prev) => !prev);
  }, []);

  const handleToggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleChangePassword = useCallback(async () => {
    const isValid = await passwordForm.trigger();
    if (!isValid) return;

    if (!passwordModal.userId) return;

    const data = passwordForm.getValues();

    setIsChangingPassword(true);

    try {
      const result = await changeUserPassword(passwordModal.userId, data.newPassword);
      if (!result.success) {
        passwordForm.setError('newPassword', {
          message: getLocalizedError(result, t, 'Error al cambiar la contraseña'),
        });
        return;
      }
      handleClosePasswordModal();
    } catch {
      passwordForm.setError('newPassword', {
        message: 'Error al cambiar la contraseña. Intenta de nuevo.',
      });
    } finally {
      setIsChangingPassword(false);
    }
  }, [changeUserPassword, handleClosePasswordModal, passwordForm, passwordModal, t]);

  return {
    handleChangePassword,
    handleClosePasswordModal,
    handleOpenPasswordModal,
    handleToggleConfirmPasswordVisibility,
    handleToggleNewPasswordVisibility,
    isChangingPassword,
    passwordForm,
    passwordModal,
    showConfirmPassword,
    showNewPassword,
  };
};
