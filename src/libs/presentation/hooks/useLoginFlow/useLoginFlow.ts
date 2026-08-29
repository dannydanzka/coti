/**
 * useLoginFlow Hook - Context7 Compliant
 *
 * Perfect Redux bridge for login workflow management.
 * Provides memoized selectors and actions following useAuth pattern.
 * All error messages support Spanish locale.
 *
 * Handles complete login flow including:
 * - Authentication check on mount
 * - Login form submission with validation
 * - Navigation and redirects
 * - Loading states and error handling
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

import { ERROR_MESSAGES, USER_ROLES } from '@constants';
import { logError } from '@logger';
import type { LoginFormData } from '@components';

import type { LoginFlowOptions } from './useLoginFlow.interfaces';
import { useAuth } from '../useAuth';
import { useNotifications } from '../useNotifications';

export const useLoginFlow = ({ redirectUrl }: LoginFlowOptions = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showError } = useNotifications();
  const [isInitializing, setIsInitializing] = useState(
    process.env['NODE_ENV'] === 'test' ? false : true
  );
  const isRedirectingRef = useRef(false);

  const { isAuthenticated, isLoading, login } = useAuth();

  const {
    formState: { errors, isSubmitting },
    handleSubmit: handleFormSubmit,
    register,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const getRedirectUrl = useCallback(
    (role?: string): string => {
      const paramRedirect = searchParams.get('redirect');
      if (redirectUrl) return redirectUrl;
      if (paramRedirect) return paramRedirect;
      return role === USER_ROLES.PARTICIPANT ? '/dashboard' : '/admin';
    },
    [redirectUrl, searchParams]
  );

  /**
   * Check authentication on mount with proper error handling
   * Skip redirect if already redirecting from login/demo submit
   */
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (isAuthenticated && !isRedirectingRef.current) {
          isRedirectingRef.current = true;
          router.push(getRedirectUrl());
          return;
        }
      } catch (error) {
        logError(error, 'checkAuthentication');
        showError(ERROR_MESSAGES.AUTH_CHECK_ERROR);
      } finally {
        setIsInitializing(false);
      }
    };

    checkAuthentication();
  }, [getRedirectUrl, isAuthenticated, router, showError]);

  /**
   * Handle form submission with Spanish error handling
   */
  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        const result = await login(data.email.trim(), data.password);
        if (result.user) {
          isRedirectingRef.current = true;
          router.push(getRedirectUrl(result.user.role));
        } else if (result.error) {
          showError(result.error);
        }
      } catch (error) {
        logError(error, 'onSubmit');
        showError(ERROR_MESSAGES.LOGIN_ERROR);
      }
    },
    [getRedirectUrl, login, router, showError]
  );

  const handleSubmit = handleFormSubmit(onSubmit);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return {
    errors,
    handleKeyDown,
    handleSubmit,
    isInitializing,
    isLoading,
    isSubmitting,
    register,
  };
};
