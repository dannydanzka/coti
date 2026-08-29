'use client';

/**
 * Login Page
 *
 * User authentication page. Honors an optional `?redirect=` param so flows that
 * require auth (e.g. meet checkout) can send the user back after login.
 */

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { LoginScreen } from '@apps/public/presentation/screens/LoginScreen';

const LoginPageContent = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? undefined;

  return <LoginScreen redirectTo={redirectTo} />;
};

const LoginPage = () => (
  <Suspense>
    <LoginPageContent />
  </Suspense>
);

export default LoginPage;
