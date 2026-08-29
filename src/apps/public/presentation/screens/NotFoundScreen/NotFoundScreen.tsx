/**
 * NotFoundScreen Component
 *
 * Unified page for both 404 and general errors.
 * - No error prop = 404 page (route not found)
 * - With error prop = Error page (runtime error)
 */

'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Footer, Header, PublicPageWrapper } from '@components';
import { PopButton } from '@dannydanzka/sovereignty-ui';

import type { NotFoundScreenProps } from './NotFoundScreen.interfaces';

import {
  Actions,
  Content,
  ErrorCode,
  ErrorDetails,
  Message,
  Section,
  Title,
} from './NotFoundScreen.styled';

export const NotFoundScreen = ({ error, reset }: NotFoundScreenProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isError = Boolean(error);

  const handleGoHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleRetry = useCallback(() => {
    if (reset) {
      reset();
    }
  }, [reset]);

  return (
    <PublicPageWrapper>
      <Header variant='public' />
      <Section>
        <Content>
          {!isError && <ErrorCode>404</ErrorCode>}
          <Title>{isError ? 'Algo salió mal' : 'Página no encontrada'}</Title>
          <Message>
            {isError
              ? 'Lo sentimos, ha ocurrido un error inesperado. Puedes intentar de nuevo o volver al inicio.'
              : 'Parece que esta página se fue de aventura y no regresó. No te preocupes, te ayudamos a encontrar el camino.'}
          </Message>
          {error?.message && (
            <ErrorDetails>
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </ErrorDetails>
          )}
          <Actions>
            {isError ? (
              <>
                <PopButton variant='blue' onClick={handleGoHome}>
                  {t('common.goHome')}
                </PopButton>
                <PopButton variant='yellow' onClick={handleRetry}>
                  {t('common.retryAction')}
                </PopButton>
              </>
            ) : (
              <>
                <PopButton variant='blue' onClick={handleGoBack}>
                  {t('common.goBack')}
                </PopButton>
                <PopButton variant='yellow' onClick={handleGoHome}>
                  {t('common.goHome')}
                </PopButton>
              </>
            )}
          </Actions>
        </Content>
      </Section>
      <Footer />
    </PublicPageWrapper>
  );
};
