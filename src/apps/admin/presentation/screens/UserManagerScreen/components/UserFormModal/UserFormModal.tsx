/**
 * UserFormModal
 *
 * Modal component for user creation/editing with Zod + react-hook-form validation.
 * Uses separate form instances for create vs edit to avoid TypeScript union issues.
 */

'use client';

import { useCallback } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  AdminFormError,
  AdminFormGroup,
  AdminFormInput,
  AdminFormLabel,
  AdminFormSelect,
  AdminPasswordInput,
} from '@components';
import { Button, Modal } from '@dannydanzka/sovereignty-ui';
import { FIELD_LIMITS } from '@constants';

import type {
  CreateUserFormData,
  EditUserFormData,
  UserFormModalProps,
} from './UserFormModal.interfaces';

import { FormActions } from './UserFormModal.styled';

const ROLE_OPTIONS = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Participante', value: 'participant' },
];

const CreateFields = ({
  form,
  handleToggleConfirmPasswordVisibility,
  handleTogglePasswordVisibility,
  isOwner,
  isSaving,
  showConfirmPassword,
  showPassword,
}: {
  form: UseFormReturn<CreateUserFormData>;
  handleToggleConfirmPasswordVisibility: () => void;
  handleTogglePasswordVisibility: () => void;
  isOwner: boolean;
  isSaving: boolean;
  showConfirmPassword: boolean;
  showPassword: boolean;
}) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    setValue,
    watch,
  } = form;

  const handleChange = useCallback(
    (field: keyof CreateUserFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(field, event.target.value, { shouldValidate: true });
    },
    [setValue]
  );

  const handleRoleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue('role', e.target.value as 'admin' | 'participant');
    },
    [setValue]
  );

  const renderPersonalFields = () => (
    <>
      <AdminFormGroup>
        <AdminFormLabel required>
          {t('form.name')} ({(watch('firstName') || '').length}/{FIELD_LIMITS.FIRST_NAME})
        </AdminFormLabel>
        <AdminFormInput
          disabled={isSaving}
          maxLength={FIELD_LIMITS.FIRST_NAME}
          placeholder={t('public.enrollment.enterFirstName')}
          type='text'
          value={watch('firstName') || ''}
          onChange={handleChange('firstName')}
        />
        {errors.firstName && <AdminFormError>{errors.firstName.message}</AdminFormError>}
      </AdminFormGroup>
      <AdminFormGroup>
        <AdminFormLabel required>
          {t('form.lastName')} ({(watch('lastName') || '').length}/{FIELD_LIMITS.LAST_NAME})
        </AdminFormLabel>
        <AdminFormInput
          disabled={isSaving}
          maxLength={FIELD_LIMITS.LAST_NAME}
          placeholder={t('public.enrollment.enterLastName')}
          type='text'
          value={watch('lastName') || ''}
          onChange={handleChange('lastName')}
        />
        {errors.lastName && <AdminFormError>{errors.lastName.message}</AdminFormError>}
      </AdminFormGroup>
      <AdminFormGroup>
        <AdminFormLabel required>
          {t('form.email')} ({(watch('email') || '').length}/{FIELD_LIMITS.EMAIL})
        </AdminFormLabel>
        <AdminFormInput
          disabled={isSaving}
          maxLength={FIELD_LIMITS.EMAIL}
          placeholder='correo@ejemplo.com'
          type='email'
          value={watch('email') || ''}
          onChange={handleChange('email')}
        />
        {errors.email && <AdminFormError>{errors.email.message}</AdminFormError>}
      </AdminFormGroup>
    </>
  );

  const renderPasswordFields = () => (
    <>
      <AdminFormGroup>
        <AdminFormLabel required>
          {t('form.password')} ({(watch('password') || '').length}/{FIELD_LIMITS.PASSWORD_MAX})
        </AdminFormLabel>
        <AdminPasswordInput
          disabled={isSaving}
          placeholder={t('admin.users.passwordHint')}
          showPassword={showPassword}
          value={watch('password') || ''}
          onChange={handleChange('password')}
          onToggleVisibility={handleTogglePasswordVisibility}
        />
        {errors.password && <AdminFormError>{errors.password.message}</AdminFormError>}
      </AdminFormGroup>
      <AdminFormGroup>
        <AdminFormLabel required>
          {t('form.confirmPassword')} ({(watch('confirmPassword') || '').length}/
          {FIELD_LIMITS.PASSWORD_MAX})
        </AdminFormLabel>
        <AdminPasswordInput
          disabled={isSaving}
          disablePaste
          placeholder={t('admin.users.repeatPassword')}
          showPassword={showConfirmPassword}
          value={watch('confirmPassword') || ''}
          onChange={handleChange('confirmPassword')}
          onToggleVisibility={handleToggleConfirmPasswordVisibility}
        />
        {errors.confirmPassword && (
          <AdminFormError>{errors.confirmPassword.message}</AdminFormError>
        )}
      </AdminFormGroup>
    </>
  );

  return (
    <>
      {renderPersonalFields()}
      {renderPasswordFields()}
      {isOwner && (
        <AdminFormGroup>
          <AdminFormLabel>{t('table.role')}</AdminFormLabel>
          <AdminFormSelect
            disabled={isSaving}
            options={ROLE_OPTIONS}
            value={watch('role')}
            onChange={handleRoleChange}
          />
        </AdminFormGroup>
      )}
    </>
  );
};

const EditFields = ({
  form,
  isEditingSelf,
  isOwner,
  isSaving,
}: {
  form: UseFormReturn<EditUserFormData>;
  isEditingSelf: boolean;
  isOwner: boolean;
  isSaving: boolean;
}) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    setValue,
    watch,
  } = form;

  const handleChange = useCallback(
    (field: keyof EditUserFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(field, event.target.value, { shouldValidate: true });
    },
    [setValue]
  );

  const handleRoleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue('role', e.target.value as 'admin' | 'participant');
    },
    [setValue]
  );

  const showRoleSelector = isOwner && !isEditingSelf;

  const renderPersonalFields = () => (
    <>
      <AdminFormGroup>
        <AdminFormLabel required>
          {t('form.name')} ({(watch('firstName') || '').length}/{FIELD_LIMITS.FIRST_NAME})
        </AdminFormLabel>
        <AdminFormInput
          disabled={isSaving}
          maxLength={FIELD_LIMITS.FIRST_NAME}
          placeholder={t('public.enrollment.enterFirstName')}
          type='text'
          value={watch('firstName') || ''}
          onChange={handleChange('firstName')}
        />
        {errors.firstName && <AdminFormError>{errors.firstName.message}</AdminFormError>}
      </AdminFormGroup>
      <AdminFormGroup>
        <AdminFormLabel required>
          {t('form.lastName')} ({(watch('lastName') || '').length}/{FIELD_LIMITS.LAST_NAME})
        </AdminFormLabel>
        <AdminFormInput
          disabled={isSaving}
          maxLength={FIELD_LIMITS.LAST_NAME}
          placeholder={t('public.enrollment.enterLastName')}
          type='text'
          value={watch('lastName') || ''}
          onChange={handleChange('lastName')}
        />
        {errors.lastName && <AdminFormError>{errors.lastName.message}</AdminFormError>}
      </AdminFormGroup>
      <AdminFormGroup>
        <AdminFormLabel required>
          {t('form.email')} ({(watch('email') || '').length}/{FIELD_LIMITS.EMAIL})
        </AdminFormLabel>
        <AdminFormInput
          disabled={isSaving}
          maxLength={FIELD_LIMITS.EMAIL}
          placeholder='correo@ejemplo.com'
          type='email'
          value={watch('email') || ''}
          onChange={handleChange('email')}
        />
        {errors.email && <AdminFormError>{errors.email.message}</AdminFormError>}
      </AdminFormGroup>
    </>
  );

  return (
    <>
      {renderPersonalFields()}
      {showRoleSelector && (
        <AdminFormGroup>
          <AdminFormLabel>{t('table.role')}</AdminFormLabel>
          <AdminFormSelect
            disabled={isSaving}
            options={ROLE_OPTIONS}
            value={watch('role')}
            onChange={handleRoleChange}
          />
        </AdminFormGroup>
      )}
    </>
  );
};

export const UserFormModal = ({
  createForm,
  editForm,
  handleCloseModal,
  handleSaveUser,
  handleToggleConfirmPasswordVisibility,
  handleTogglePasswordVisibility,
  isEditing,
  isEditingSelf,
  isModalOpen,
  isOwner,
  isSaving,
  showConfirmPassword,
  showPassword,
}: UserFormModalProps) => {
  const { t } = useTranslation();

  const renderFooter = () => (
    <FormActions>
      <Button disabled={isSaving} variant='secondary' onClick={handleCloseModal}>
        {t('common.cancel')}
      </Button>
      <Button loading={isSaving} variant='primary' onClick={handleSaveUser}>
        {isEditing ? t('common.saveChanges') : t('admin.users.create')}
      </Button>
    </FormActions>
  );

  return (
    <Modal
      disableClose={isSaving}
      footer={renderFooter()}
      isOpen={isModalOpen}
      size='md'
      title={isEditing ? t('admin.users.editUser') : t('admin.users.create')}
      onClose={handleCloseModal}
    >
      {isEditing ? (
        <EditFields
          form={editForm}
          isEditingSelf={isEditingSelf}
          isOwner={isOwner}
          isSaving={isSaving}
        />
      ) : (
        <CreateFields
          form={createForm}
          handleToggleConfirmPasswordVisibility={handleToggleConfirmPasswordVisibility}
          handleTogglePasswordVisibility={handleTogglePasswordVisibility}
          isOwner={isOwner}
          isSaving={isSaving}
          showConfirmPassword={showConfirmPassword}
          showPassword={showPassword}
        />
      )}
    </Modal>
  );
};
