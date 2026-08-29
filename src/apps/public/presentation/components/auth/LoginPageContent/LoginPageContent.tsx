/**
 * Login Page Content Component
 *
 * Main content component for the login page with authentication flow.
 * Extracted from LoginPage for better component organization.
 */

'use client';

import { Mic } from 'lucide-react';
import React from 'react';

import { LOGIN_UI_TEXT } from '@apps/public/constants';
import { useLoginFlow } from '@hooks';

import type { LoginPageContentProps } from './LoginPageContent.interfaces';

import {
  BrandLink,
  ErrorMessage,
  FooterText,
  FormGroup,
  FormInput,
  FormLabel,
  LoginButton,
  LoginCard,
  LoginContainer,
  LoginFooter,
  LoginForm,
  LoginHeader,
  LoginSubtitle,
  LoginTitle,
  TitleIcon,
} from './LoginPageContent.styled';

const LoginPageContent: React.FC<LoginPageContentProps> = ({ redirectUrl }) => {
  const { errors, handleKeyDown, handleSubmit, isInitializing, isLoading, isSubmitting, register } =
    useLoginFlow(redirectUrl ? { redirectUrl } : {});

  const renderHeader = () => (
    <LoginHeader>
      <LoginTitle>
        <TitleIcon>
          <Mic size={32} />
        </TitleIcon>
        {LOGIN_UI_TEXT.HEADER.TITLE}
      </LoginTitle>
      <LoginSubtitle>{LOGIN_UI_TEXT.HEADER.SUBTITLE}</LoginSubtitle>
    </LoginHeader>
  );

  const renderLoginForm = () => (
    <LoginForm onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel htmlFor='email'>{LOGIN_UI_TEXT.FORM.EMAIL_LABEL}</FormLabel>
        <FormInput
          {...register('email')}
          $hasError={Boolean(errors.email)}
          autoComplete='email'
          disabled={isSubmitting}
          id='email'
          placeholder={LOGIN_UI_TEXT.FORM.EMAIL_PLACEHOLDER}
          type='email'
          onKeyDown={handleKeyDown}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor='password'>{LOGIN_UI_TEXT.FORM.PASSWORD_LABEL}</FormLabel>
        <FormInput
          {...register('password')}
          $hasError={Boolean(errors.password)}
          autoComplete='current-password'
          disabled={isSubmitting}
          id='password'
          placeholder={LOGIN_UI_TEXT.FORM.PASSWORD_PLACEHOLDER}
          type='password'
          onKeyDown={handleKeyDown}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </FormGroup>

      {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

      <LoginButton $isLoading={isSubmitting} disabled={isSubmitting} type='submit'>
        {isSubmitting ? LOGIN_UI_TEXT.LOADING.LOGIN_PROCESS : LOGIN_UI_TEXT.FORM.SUBMIT_BUTTON}
      </LoginButton>
    </LoginForm>
  );

  const renderFooter = () => (
    <LoginFooter>
      <FooterText>
        {LOGIN_UI_TEXT.FOOTER.DESCRIPTION}{' '}
        <BrandLink href='/public' target='_blank'>
          {LOGIN_UI_TEXT.FOOTER.BRAND_TEXT}
        </BrandLink>{' '}
        {LOGIN_UI_TEXT.FOOTER.LOCATION}
      </FooterText>
    </LoginFooter>
  );

  if (isInitializing || (isLoading && process.env['NODE_ENV'] !== 'test')) {
    return null;
  }

  return (
    <LoginContainer>
      <LoginCard>
        {renderHeader()}
        {renderLoginForm()}
        {renderFooter()}
      </LoginCard>
    </LoginContainer>
  );
};

export { LoginPageContent };
