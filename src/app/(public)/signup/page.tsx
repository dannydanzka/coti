'use client';

/**
 * Signup Page
 *
 * User registration page. Controlled by NEXT_PUBLIC_SIGNUP_ENABLED flag.
 * Honors an optional `?redirect=` param (forwarded from login) so origin-aware
 * copy (e.g. Mango presale) survives the login → signup hop.
 * Role-based redirects handled by middleware.
 */

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SignupScreen } from '@apps/public/presentation/screens/SignupScreen';

const isSignupEnabled = process.env['NEXT_PUBLIC_SIGNUP_ENABLED'] === 'true';

const SignupPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? undefined;

  useEffect(() => {
    if (!isSignupEnabled) {
      router.replace('/login');
    }
  }, [router]);

  if (!isSignupEnabled) return null;

  return <SignupScreen redirectTo={redirectTo} />;
};

const SignupPage = () => (
  <Suspense>
    <SignupPageContent />
  </Suspense>
);

export default SignupPage;
