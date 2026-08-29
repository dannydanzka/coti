/**
 * ForgotPasswordScreen Component
 *
 * Password reset request page with centered form and illustrations.
 * Calls request-password-reset API endpoint.
 */

'use client';

import { useCallback } from 'react';

import {
  AuthCard,
  AuthCardWrapper,
  AuthContent,
  AuthPageWrapper,
  AuthSection,
  ForgotPasswordForm,
} from '@components';
import { AuthService } from '@services';
import type { ForgotPasswordFormData } from '@components';

export const ForgotPasswordScreen = () => {
  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    await AuthService.requestPasswordReset(data.email);
  }, []);

  return (
    <AuthPageWrapper>
      <AuthSection>
        <AuthContent>
          <AuthCardWrapper>
            <AuthCard>
              <ForgotPasswordForm onSubmit={handleSubmit} />
            </AuthCard>
          </AuthCardWrapper>
        </AuthContent>
      </AuthSection>
    </AuthPageWrapper>
  );
};
