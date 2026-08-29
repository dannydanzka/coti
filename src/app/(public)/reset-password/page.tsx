'use client';

/**
 * Reset Password Page
 *
 * New password form with token from URL.
 * Route: /reset-password?token=xxx
 */

import { Suspense, useEffect } from 'react';

import { ResetPasswordScreen } from '@apps/public/presentation/screens/ResetPasswordScreen';

const ResetPasswordContent = () => {
  useEffect(() => {
    document.title = 'Restablecer Contraseña | Coti';
  }, []);

  return <ResetPasswordScreen />;
};

const ResetPasswordPage = () => (
  <Suspense>
    <ResetPasswordContent />
  </Suspense>
);

export default ResetPasswordPage;
