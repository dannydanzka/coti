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
  AuthIllustrationImage,
  AuthIllustrationPanel,
  AuthPageWrapper,
  AuthSection,
  AuthSubtitle,
  AuthTitle,
  SignupForm,
} from '@components';
import { AUTHENTICATED_ROUTES, BRAND_ASSETS } from '@constants';
import { isProjectionOriginRedirect } from '@apps/public/constants';
import type { SignupFormData } from '@components';
import { useAuth } from '@hooks';

import type { SignupScreenProps } from './SignupScreen.interfaces';

export const SignupScreen = ({ redirectTo }: SignupScreenProps = {}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { signup } = useAuth();

  const subtitleKey = isProjectionOriginRedirect(redirectTo)
    ? 'auth.signupForm.subtitleProjection'
    : 'auth.signupForm.subtitle';

  const handleSignup = useCallback(
    async (data: SignupFormData) => {
      const result = await signup({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      /**
       * El endpoint de signup ya deja la cookie de sesión: la cuenta queda
       * activa sin verificación por correo. Por eso vamos directo a la cajita
       * de ahorro (o al destino que traía el `?redirect=`).
       */
      if (result.success) {
        router.push(redirectTo ?? AUTHENTICATED_ROUTES.DASHBOARD);
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
              <SignupForm hideHeader onSubmit={handleSignup} />
            </AuthCard>
          </AuthCardWrapper>
          <AuthIllustrationPanel aria-hidden='true'>
            <AuthIllustrationImage alt='' src={BRAND_ASSETS.AUTH} />
          </AuthIllustrationPanel>
        </AuthContent>
      </AuthSection>
    </AuthPageWrapper>
  );
};
