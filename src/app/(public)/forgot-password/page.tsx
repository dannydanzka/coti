'use client';

/**
 * Forgot Password Page
 *
 * Password reset request form.
 * Route: /forgot-password
 */

import { useEffect } from 'react';

import { ForgotPasswordScreen } from '@apps/public/presentation/screens/ForgotPasswordScreen';

const ForgotPasswordPage = () => {
  useEffect(() => {
    document.title = 'Recuperar Contraseña | Coti';
  }, []);

  return <ForgotPasswordScreen />;
};

export default ForgotPasswordPage;
