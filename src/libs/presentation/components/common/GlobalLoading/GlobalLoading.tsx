/**
 * GlobalLoading Component
 * Global loading overlay connected to Redux global state
 *
 * Displays DearAdry logo with heartbeat animation when loading.
 * Uses Redux instead of Context API for state management.
 *
 */

'use client';

import { useLoading } from '@hooks';
import Logo from '@assets/branding/Logo.svg';

import type { GlobalLoadingProps } from './GlobalLoading.interfaces';

import { LoadingContainer, LoadingOverlay, LogoWrapper } from './GlobalLoading.styled';

export const GlobalLoading = ({ className, forceVisible = false }: GlobalLoadingProps) => {
  const { isAnyLoading } = useLoading();

  const isVisible = forceVisible || isAnyLoading;

  return (
    <LoadingOverlay $isVisible={isVisible} className={className}>
      <LoadingContainer>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </LoadingContainer>
    </LoadingOverlay>
  );
};
