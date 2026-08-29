/**
 * ResetPasswordScreen Component
 *
 * New password form page. Receives token from URL query param.
 * Calls reset-password API endpoint.
 */

'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  AuthCard,
  AuthCardWrapper,
  AuthContent,
  AuthPageWrapper,
  AuthSection,
  ResetPasswordForm,
} from '@components';
import { AuthService } from '@services';

export const ResetPasswordScreen = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const handleSubmit = useCallback(
    async (data: { confirmPassword: string; password: string }) => {
      if (!token) return;
      await AuthService.resetPassword({
        confirmPassword: data.confirmPassword,
        newPassword: data.password,
        token,
      });
    },
    [token]
  );

  if (!token) {
    router.replace('/forgot-password');
    return null;
  }

  return (
    <AuthPageWrapper>
      <AuthSection>
        <AuthContent>
          <AuthCardWrapper>
            <AuthCard>
              <ResetPasswordForm onSubmit={handleSubmit} />
            </AuthCard>
          </AuthCardWrapper>
        </AuthContent>
      </AuthSection>
    </AuthPageWrapper>
  );
};
