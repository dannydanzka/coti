/**
 * SignupForm Component
 *
 * Signup form using react-hook-form with Zod validation.
 * Password rules: 8+ chars, uppercase, lowercase, number, special char.
 * Email confirmation required.
 */

'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Input, PopButton } from '@dannydanzka/sovereignty-ui';
import type { RegisterFormData } from '@validation';
import { registerValidationSchema } from '@validation';
import { zodResolver } from '@hookform/resolvers/zod';

import type { SignupFormProps } from './SignupForm.interfaces';

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

export const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const { t } = useTranslation();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    formState: { dirtyFields, errors, isSubmitting },
    handleSubmit,
    register,
    trigger,
    watch,
  } = useForm<RegisterFormData>({
    /**
     * 'onSubmit' (default): the sovereignty-ui Input forwards only `onChange` (no
     * blur), and a per-field onChange validation would re-validate the single
     * changed field and clobber object-level cross-field refine errors (email /
     * password confirmation). Instead handleInputChange runs a full-form `trigger()`
     * after each change, so single-field AND cross-field errors surface together.
     */
    mode: 'onSubmit',
    resolver: zodResolver(registerValidationSchema),
  });

  const handleFormSubmit = useCallback(
    async (data: RegisterFormData) => {
      setGeneralError(null);
      try {
        await onSubmit({
          email: data.email,
          emailConfirm: data.confirmEmail,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          passwordConfirm: data.confirmPassword,
        });
      } catch (err) {
        const error = err as Error;
        setGeneralError(error.message || t('auth.signupForm.generalError'));
      }
    },
    [onSubmit, t]
  );

  const handleInputChange = useCallback(
    (field: keyof RegisterFormData) => (value: string) => {
      const event = { target: { name: field, value } };
      register(field).onChange(event);
      /**
       * Full-form validation so object-level cross-field refines (email/password
       * confirmation) surface live — single-field onChange validation skips them.
       * Errors are gated on `dirtyFields` at render so untouched fields stay clean.
       */
      void trigger();
    },
    [register, trigger]
  );

  /** Show a field's error only once the user has edited it (no premature errors). */
  const fieldError = (field: keyof RegisterFormData): string | undefined =>
    dirtyFields[field] ? errors[field]?.message : undefined;

  const renderFormFields = () => (
    <FormFields>
      <Input
        autoComplete='given-name'
        error={fieldError('firstName')}
        fullWidth
        id='signup-firstName'
        label={t('auth.signupForm.firstNameLabel')}
        name='firstName'
        placeholder={t('auth.signupForm.firstNamePlaceholder')}
        required
        type='text'
        value={watch('firstName') || ''}
        onChange={handleInputChange('firstName')}
      />
      <Input
        autoComplete='family-name'
        error={fieldError('lastName')}
        fullWidth
        id='signup-lastName'
        label={t('auth.signupForm.lastNameLabel')}
        name='lastName'
        placeholder={t('auth.signupForm.lastNamePlaceholder')}
        required
        type='text'
        value={watch('lastName') || ''}
        onChange={handleInputChange('lastName')}
      />
      <Input
        autoComplete='email'
        error={fieldError('email')}
        fullWidth
        id='signup-email'
        label={t('auth.email')}
        name='email'
        placeholder={t('auth.signupForm.emailPlaceholder')}
        required
        type='email'
        value={watch('email') || ''}
        onChange={handleInputChange('email')}
      />
      <Input
        autoComplete='email'
        error={fieldError('confirmEmail')}
        fullWidth
        id='signup-confirmEmail'
        label={t('auth.confirmEmail')}
        name='confirmEmail'
        placeholder={t('auth.signupForm.confirmEmailPlaceholder')}
        required
        type='email'
        value={watch('confirmEmail') || ''}
        onChange={handleInputChange('confirmEmail')}
      />
      <Input
        autoComplete='new-password'
        error={fieldError('password')}
        fullWidth
        id='signup-password'
        label={t('auth.password')}
        name='password'
        placeholder={t('auth.signupForm.passwordPlaceholder')}
        required
        type='password'
        value={watch('password') || ''}
        onChange={handleInputChange('password')}
      />
      <Input
        autoComplete='new-password'
        error={fieldError('confirmPassword')}
        fullWidth
        id='signup-confirmPassword'
        label={t('auth.confirmPassword')}
        name='confirmPassword'
        placeholder={t('auth.signupForm.confirmPasswordPlaceholder')}
        required
        type='password'
        value={watch('confirmPassword') || ''}
        onChange={handleInputChange('confirmPassword')}
      />
    </FormFields>
  );

  return (
    <FormContainer onSubmit={handleSubmit(handleFormSubmit)}>
      <FormTitle>{t('auth.signupForm.title')}</FormTitle>
      <FormDescription>{t('auth.signupForm.subtitle')}</FormDescription>
      {generalError && <FormError>{generalError}</FormError>}
      {renderFormFields()}

      <FormActions>
        <PopButton disabled={isSubmitting} type='submit' variant='yellow'>
          {isSubmitting ? t('auth.signupForm.submitting') : t('auth.signupForm.submit')}
        </PopButton>
      </FormActions>

      <FormDivider>
        <FormDividerText>{t('auth.hasAccount')}</FormDividerText>
      </FormDivider>

      <FormLink href='/login'>{t('auth.login')}</FormLink>
    </FormContainer>
  );
};
