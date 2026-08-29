'use client';

/**
 * Signup Page
 *
 * User registration page. Honors an optional `?redirect=` param (forwarded from
 * login) so the origin-aware copy survives the login → signup hop and the user
 * lands where they were headed.
 * Role-based redirects handled by middleware.
 */

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { SignupScreen } from '@apps/public/presentation/screens/SignupScreen';

const SignupPageContent = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? undefined;

  return <SignupScreen redirectTo={redirectTo} />;
};

const SignupPage = () => (
  <Suspense>
    <SignupPageContent />
  </Suspense>
);

export default SignupPage;
