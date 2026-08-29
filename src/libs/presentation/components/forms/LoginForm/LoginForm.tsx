/**
 * LoginForm Component
 *
 * Login form with email and password validation.
 * Uses react-hook-form + Zod validation.
 * Error handling is local to avoid context sync issues.
 */

'use client';

import type { FormEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Input } from '@dannydanzka/sovereignty-ui';
import { zodResolver } from '@hookform/resolvers/zod';

import type { LoginFormData, LoginFormProps } from './LoginForm.interfaces';
import { loginFormSchema } from './LoginForm.validation';
import { MeetButton } from '../../common/MeetButton';

import {
  FormActions,
  FormContainer,
  FormDescription,
  FormDivider,
  FormDividerText,
  FormFields,
  FormLink,
  FormTitle,
} from './LoginForm.styled';

export const LoginForm = ({
  hideForgotPassword = false,
  hideHeader = false,
  onSubmit,
  signupHref = '/signup',
}: LoginFormProps) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const loginForm = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
    resolver: zodResolver(loginFormSchema),
  });

  const {
    formState: { errors },
    setValue,
    watch,
  } = loginForm;

  const email = watch('email');
  const password = watch('password');

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isSubmittingRef.current) return;

      const isValid = await loginForm.trigger();
      if (!isValid) return;

      isSubmittingRef.current = true;
      setIsSubmitting(true);

      await onSubmit({ email, password });

      setIsSubmitting(false);
      isSubmittingRef.current = false;
    },
    [email, loginForm, onSubmit, password]
  );

  const handleEmailChange = useCallback((value: string) => setValue('email', value), [setValue]);

  const handlePasswordChange = useCallback(
    (value: string) => setValue('password', value),
    [setValue]
  );

  const renderHeader = () => {
    if (hideHeader) return null;
    return (
      <>
        <FormTitle>{t('auth.loginForm.title')}</FormTitle>
        <FormDescription>{t('auth.loginForm.subtitle')}</FormDescription>
      </>
    );
  };

  const renderFormFields = () => (
    <FormFields>
      <Input
        autoComplete='email'
        error={errors.email ? t(errors.email.message ?? '') : undefined}
        fullWidth
        id='login-email'
        label={t('auth.loginForm.emailLabel')}
        name='email'
        placeholder={t('auth.loginForm.emailPlaceholder')}
        required
        type='email'
        value={email}
        onChange={handleEmailChange}
      />
      <Input
        autoComplete='current-password'
        error={errors.password ? t(errors.password.message ?? '') : undefined}
        fullWidth
        id='login-password'
        label={t('auth.loginForm.passwordLabel')}
        name='password'
        placeholder={t('auth.loginForm.passwordPlaceholder')}
        required
        type='password'
        value={password}
        onChange={handlePasswordChange}
      />
    </FormFields>
  );

  const renderActions = () => (
    <FormActions>
      <MeetButton disabled={isSubmitting} fullWidth type='submit' variant='primary'>
        {isSubmitting ? t('auth.loginForm.submitting') : t('auth.loginForm.submit')}
      </MeetButton>
      {!hideForgotPassword && (
        <FormLink href='/forgot-password'>{t('auth.forgotPassword')}</FormLink>
      )}
    </FormActions>
  );

  const renderSignupLink = () => (
    <>
      <FormDivider>
        <FormDividerText>{t('auth.noAccount')}</FormDividerText>
      </FormDivider>
      <FormLink href={signupHref}>{t('auth.loginForm.createAccount')}</FormLink>
    </>
  );

  return (
    <FormContainer onSubmit={handleSubmit}>
      {renderHeader()}
      {renderFormFields()}
      {renderActions()}
      {renderSignupLink()}
    </FormContainer>
  );
};
