/**
 * PasswordModal
 *
 * Modal component for password change with Zod + react-hook-form validation.
 */

'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AdminFormError,
  AdminFormGroup,
  AdminFormInput,
  AdminFormLabel,
  AdminPasswordInput,
} from '@components';
import { Button, Modal } from '@dannydanzka/sovereignty-ui';

import type { PasswordModalProps } from './PasswordModal.interfaces';

import { FormActions } from './PasswordModal.styled';

export const PasswordModal = ({
  handleChangePassword,
  handleClosePasswordModal,
  handleToggleConfirmPasswordVisibility,
  handleToggleNewPasswordVisibility,
  isChangingPassword,
  passwordForm,
  passwordModal,
  showConfirmPassword,
  showNewPassword,
}: PasswordModalProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    setValue,
    watch,
  } = passwordForm;

  const handleNewPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('newPassword', event.target.value, { shouldValidate: true });
    },
    [setValue]
  );

  const handleConfirmPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue('confirmPassword', event.target.value, { shouldValidate: true });
    },
    [setValue]
  );

  if (!passwordModal.isOpen) return null;

  const renderFooter = () => (
    <FormActions>
      <Button disabled={isChangingPassword} variant='secondary' onClick={handleClosePasswordModal}>
        {t('common.cancel')}
      </Button>
      <Button loading={isChangingPassword} variant='primary' onClick={handleChangePassword}>
        {t('admin.users.changePassword')}
      </Button>
    </FormActions>
  );

  return (
    <Modal
      disableClose={isChangingPassword}
      footer={renderFooter()}
      isOpen={passwordModal.isOpen}
      size='md'
      title={t('admin.users.changePassword')}
      onClose={handleClosePasswordModal}
    >
      <AdminFormGroup>
        <AdminFormLabel>{t('common.user')}</AdminFormLabel>
        <AdminFormInput disabled type='text' value={passwordModal.userName} />
      </AdminFormGroup>

      <AdminFormGroup>
        <AdminFormLabel required>{t('admin.users.newPassword')}</AdminFormLabel>
        <AdminPasswordInput
          disabled={isChangingPassword}
          placeholder={t('admin.users.passwordHint')}
          showPassword={showNewPassword}
          value={watch('newPassword') || ''}
          onChange={handleNewPasswordChange}
          onToggleVisibility={handleToggleNewPasswordVisibility}
        />
        {errors.newPassword && <AdminFormError>{errors.newPassword.message}</AdminFormError>}
      </AdminFormGroup>
      <AdminFormGroup>
        <AdminFormLabel required>{t('admin.users.confirmPasswordLabel')}</AdminFormLabel>
        <AdminPasswordInput
          disabled={isChangingPassword}
          disablePaste
          placeholder={t('admin.users.repeatPassword')}
          showPassword={showConfirmPassword}
          value={watch('confirmPassword') || ''}
          onChange={handleConfirmPasswordChange}
          onToggleVisibility={handleToggleConfirmPasswordVisibility}
        />
        {errors.confirmPassword && (
          <AdminFormError>{errors.confirmPassword.message}</AdminFormError>
        )}
      </AdminFormGroup>
    </Modal>
  );
};
