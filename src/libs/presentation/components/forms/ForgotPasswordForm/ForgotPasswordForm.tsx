/**
 * ForgotPasswordForm Component
 *
 * Email-only form to request password reset.
 * Uses Zod validation from auth schemas.
 */

'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { forgotPasswordValidationSchema } from '@validation';
import { Input, PopButton } from '@dannydanzka/sovereignty-ui';
import { zodResolver } from '@hookform/resolvers/zod';

import type {
  ForgotPasswordFormData,
  ForgotPasswordFormProps,
} from './ForgotPasswordForm.interfaces';

import {
  FormActions,
  FormContainer,
  FormDescription,
  FormDivider,
  FormDividerText,
  FormError,
  FormFields,
  FormLink,
  FormTitle,
} from '../LoginForm/LoginForm.styled';

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const { t } = useTranslation();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<ForgotPasswordFormData>({
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordValidationSchema),
  });

  const handleInputChange = useCallback(
    (field: keyof ForgotPasswordFormData) => (value: string) => {
      const event = { target: { name: field, value } };
      register(field).onChange(event);
    },
    [register]
  );

  const handleFormSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      setGeneralError(null);
      try {
        await onSubmit(data);
        setIsSuccess(true);
      } catch (err) {
        const error = err as Error;
        setGeneralError(error.message || t('auth.forgotPasswordForm.generalError'));
      }
    },
    [onSubmit, t]
  );

  if (isSuccess) {
    return (
      <FormContainer>
        <FormTitle>{t('auth.forgotPasswordForm.successTitle')}</FormTitle>
        <FormDescription>{t('auth.forgotPasswordForm.successMessage')}</FormDescription>
        <FormDivider>
          <FormDividerText>{t('auth.hasAccount')}</FormDividerText>
        </FormDivider>
        <FormLink href='/login'>{t('auth.login')}</FormLink>
      </FormContainer>
    );
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <FormTitle>{t('auth.forgotPasswordForm.title')}</FormTitle>
      <FormDescription>{t('auth.forgotPasswordForm.subtitle')}</FormDescription>
      {generalError && <FormError>{generalError}</FormError>}
      <FormFields>
        <Input
          autoComplete='email'
          error={errors.email?.message}
          fullWidth
          id='forgot-email'
          label={t('auth.email')}
          name='email'
          placeholder={t('auth.loginForm.emailPlaceholder')}
          required
          type='email'
          value={watch('email') || ''}
          onChange={handleInputChange('email')}
        />
      </FormFields>

      <FormActions>
        <PopButton disabled={isSubmitting} type='submit' variant='yellow'>
          {isSubmitting
            ? t('auth.forgotPasswordForm.submitting')
            : t('auth.forgotPasswordForm.submit')}
        </PopButton>
      </FormActions>

      <FormDivider>
        <FormDividerText>{t('auth.hasAccount')}</FormDividerText>
      </FormDivider>

      <FormLink href='/login'>{t('auth.login')}</FormLink>
    </FormContainer>
  );
};
