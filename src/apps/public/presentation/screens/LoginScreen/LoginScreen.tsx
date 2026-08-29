/**
 * Login Screen Component
 *
 * Login page with centered form card and character illustrations.
 * Role-based redirects handled post-login via useAuth result.
 * Header and Footer are provided by PublicLayout.
 */

'use client';

import { useCallback, useEffect } from 'react';
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
  LoginForm,
} from '@components';
import { getLocalizedError } from '@i18n';
import { isMeetOriginRedirect } from '@apps/public/constants';
import type { LoginFormData } from '@components';
import { ROUTES, USER_ROLES } from '@constants';
import { useAuth, useNotifications } from '@hooks';

import type { LoginScreenProps } from './LoginScreen.interfaces';

const getRedirectByRole = (role?: string, redirectTo?: string): string => {
  if (redirectTo) return redirectTo;
  if (role === USER_ROLES.ADMIN || role === USER_ROLES.OWNER) return ROUTES.ADMIN.ROOT;
  return ROUTES.PUBLIC.DASHBOARD;
};

export const LoginScreen = ({ redirectTo }: LoginScreenProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated, isLoading, login, user } = useAuth();
  const { showError } = useNotifications();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const target = getRedirectByRole(user?.role, redirectTo);
      router.replace(target);
    }
  }, [isAuthenticated, isLoading, redirectTo, router, user?.role]);

  const handleLogin = useCallback(
    async (data: LoginFormData): Promise<string | undefined> => {
      const result = await login(data.email, data.password);

      if (result.user) {
        router.push(getRedirectByRole(result.user.role, redirectTo));
        return undefined;
      }

      showError(getLocalizedError(result, t, 'Error al iniciar sesión'));
      return undefined;
    },
    [login, redirectTo, router, showError, t]
  );

  if (isAuthenticated) {
    return null;
  }

  const isMeetOrigin = isMeetOriginRedirect(redirectTo);
  const subtitleKey = isMeetOrigin ? 'auth.loginForm.subtitleMeet' : 'auth.loginForm.subtitle';
  const signupHref = redirectTo
    ? `${ROUTES.PUBLIC.SIGNUP}?redirect=${encodeURIComponent(redirectTo)}`
    : ROUTES.PUBLIC.SIGNUP;

  return (
    <AuthPageWrapper>
      <AuthSection>
        <AuthContent>
          <AuthCardWrapper>
            <AuthHeader>
              <AuthTitle>{t('auth.loginForm.title')}</AuthTitle>
              <AuthSubtitle>{t(subtitleKey)}</AuthSubtitle>
            </AuthHeader>
            <AuthCard>
              <LoginForm
                hideForgotPassword
                hideHeader
                signupHref={signupHref}
                onSubmit={handleLogin}
              />
            </AuthCard>
          </AuthCardWrapper>
        </AuthContent>
      </AuthSection>
    </AuthPageWrapper>
  );
};
