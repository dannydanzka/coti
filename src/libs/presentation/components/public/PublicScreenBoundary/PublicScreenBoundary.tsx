/**
 * PublicScreenBoundary Component
 *
 * Declarative boundary that handles loading/error states for public screens.
 * Eliminates repetitive if/else boilerplate in every public screen.
 *
 * Usage:
 * <PublicScreenBoundary isLoading={isLoading} error={error} onRetry={handleRetry}>
 *   <ScreenHeader>...</ScreenHeader>
 *   <EventsGrid>...</EventsGrid>
 * </PublicScreenBoundary>
 */

'use client';

import { useTranslation } from 'react-i18next';

import { Button } from '@dannydanzka/sovereignty-ui';
import { useSyncGlobalLoading } from '@hooks';

import type { PublicScreenBoundaryProps } from './PublicScreenBoundary.interfaces';

import {
  PublicContainer,
  PublicPageWrapper,
  PublicSection,
} from '../PublicPageLayout/PublicPageLayout.styled';
import { PublicErrorState, PublicErrorText } from '../PublicStates/PublicStates.styled';

export const PublicScreenBoundary = ({
  children,
  error,
  isLoading,
  onRetry,
  retryLabel,
}: PublicScreenBoundaryProps) => {
  const { t } = useTranslation();

  useSyncGlobalLoading(isLoading);

  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <PublicPageWrapper>
        <PublicSection $padding='none'>
          <PublicContainer>
            <PublicErrorState>
              <PublicErrorText>{error}</PublicErrorText>
              {onRetry && (
                <Button shape='pill' onClick={onRetry}>
                  {retryLabel ?? t('common.retry')}
                </Button>
              )}
            </PublicErrorState>
          </PublicContainer>
        </PublicSection>
      </PublicPageWrapper>
    );
  }

  return (
    <PublicPageWrapper>
      <PublicSection $padding='none'>
        <PublicContainer>{children}</PublicContainer>
      </PublicSection>
    </PublicPageWrapper>
  );
};
