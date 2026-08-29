/**
 * Signup Screen Component
 *
 * Signup page with centered form card and character illustrations.
 * Handles user registration and redirects on success.
 * Header and Footer are provided by PublicLayout.
 */

'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import {
  AuthCard,
  AuthCardWrapper,
  AuthContent,
  AuthHeader,
  AuthPageWrapper,
  AuthSection,
  AuthSubtitle,
  AuthTitle,
  SignupForm,
} from '@components';
import { isMeetOriginRedirect } from '@apps/public/constants';
import type { SignupFormData } from '@components';
import { useAuth } from '@hooks';

import type { SignupScreenProps } from './SignupScreen.interfaces';

export const SignupScreen = ({ redirectTo }: SignupScreenProps = {}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { signup } = useAuth();

  const subtitleKey = isMeetOriginRedirect(redirectTo)
    ? 'auth.signupForm.subtitleMeet'
    : 'auth.signupForm.subtitle';

  const handleSignup = useCallback(
    async (data: SignupFormData) => {
      const result = await signup({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      if (result.success) {
        sessionStorage.setItem('signupSuccess', 'true');
        const successUrl = redirectTo
          ? `/registro-exitoso?redirect=${encodeURIComponent(redirectTo)}`
          : '/registro-exitoso';
        router.push(successUrl);
      }
    },
    [redirectTo, router, signup]
  );

  return (
    <AuthPageWrapper>
      <AuthSection>
        <AuthContent>
          <AuthCardWrapper>
            <AuthHeader>
              <AuthTitle>{t('common.joinAdventure')}</AuthTitle>
              <AuthSubtitle>{t(subtitleKey)}</AuthSubtitle>
            </AuthHeader>
            <AuthCard>
              <SignupForm onSubmit={handleSignup} />
            </AuthCard>
          </AuthCardWrapper>
        </AuthContent>
      </AuthSection>
    </AuthPageWrapper>
  );
};
