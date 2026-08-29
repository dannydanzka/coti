/**
 * ResetPasswordForm Component
 *
 * New password form for completing password reset.
 * Uses Zod validation for password strength rules.
 */

'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Input, PopButton } from '@dannydanzka/sovereignty-ui';
import { resetPasswordValidationSchema } from '@validation';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ResetPasswordFormData, ResetPasswordFormProps } from './ResetPasswordForm.interfaces';

import {
  FormActions,
  FormContainer,
  FormDescription,
  FormError,
  FormFields,
  FormLink,
  FormTitle,
} from '../LoginForm/LoginForm.styled';

export const ResetPasswordForm = ({ onSubmit }: ResetPasswordFormProps) => {
  const { t } = useTranslation();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<ResetPasswordFormData>({
    mode: 'onBlur',
    resolver: zodResolver(resetPasswordValidationSchema),
  });

  const handleInputChange = useCallback(
    (field: keyof ResetPasswordFormData) => (value: string) => {
      const event = { target: { name: field, value } };
      register(field).onChange(event);
    },
    [register]
  );

  const handleFormSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      setGeneralError(null);
      try {
        await onSubmit({
          confirmPassword: data.confirmPassword,
          password: data.password,
        });
        setIsSuccess(true);
      } catch (err) {
        const error = err as Error;
        setGeneralError(error.message || t('auth.resetPasswordForm.generalError'));
      }
    },
    [onSubmit, t]
  );

  if (isSuccess) {
    return (
      <FormContainer>
        <FormTitle>{t('auth.resetPasswordForm.successTitle')}</FormTitle>
        <FormDescription>{t('auth.resetPasswordForm.successMessage')}</FormDescription>
        <FormActions>
          <FormLink href='/login'>{t('auth.login')}</FormLink>
        </FormActions>
      </FormContainer>
    );
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <FormTitle>{t('auth.resetPasswordForm.title')}</FormTitle>
      <FormDescription>{t('auth.resetPasswordForm.subtitle')}</FormDescription>
      {generalError && <FormError>{generalError}</FormError>}
      <FormFields>
        <Input
          autoComplete='new-password'
          error={errors.password?.message}
          fullWidth
          id='reset-password'
          label={t('auth.resetPasswordForm.newPasswordLabel')}
          name='password'
          placeholder={t('auth.resetPasswordForm.newPasswordPlaceholder')}
          required
          type='password'
          value={watch('password') || ''}
          onChange={handleInputChange('password')}
        />
        <Input
          autoComplete='new-password'
          error={errors.confirmPassword?.message}
          fullWidth
          id='reset-confirmPassword'
          label={t('auth.confirmPassword')}
          name='confirmPassword'
          placeholder={t('auth.resetPasswordForm.confirmPasswordPlaceholder')}
          required
          type='password'
          value={watch('confirmPassword') || ''}
          onChange={handleInputChange('confirmPassword')}
        />
      </FormFields>

      <FormActions>
        <PopButton disabled={isSubmitting} type='submit' variant='yellow'>
          {isSubmitting
            ? t('auth.resetPasswordForm.submitting')
            : t('auth.resetPasswordForm.submit')}
        </PopButton>
      </FormActions>
    </FormContainer>
  );
};
