/**
 * ErrorFallback Component
 *
 * Default fallback UI component for Error Boundaries.
 * Provides error details and recovery actions.
 */

'use client';

import { AlertTriangle, Bug, Home, RefreshCw } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { ErrorFallbackProps } from './ErrorFallback.interfaces';

import {
  ButtonIcon,
  ErrorActions,
  ErrorBreak,
  ErrorButton,
  ErrorDetails,
  ErrorFallbackContainer,
  ErrorIcon,
  ErrorMessage,
  ErrorStack,
  ErrorStrong,
  ErrorSummary,
  ErrorTitle,
} from './ErrorFallback.styled';

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error = null,
  recoveryActions = [],
  resetError = () => {},
}) => {
  const { t } = useTranslation();
  const defaultError = {
    category: 'unknown' as const,
    componentStack: undefined,
    id: 'unknown',
    message: t('error.unknownError'),
    severity: 'medium' as const,
    stack: undefined,
    timestamp: Date.now(),
  };

  const errorInfo = error || defaultError;

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const handleGoHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  const handleReportError = useCallback(() => {
    alert(t('error.errorReported'));
  }, [t]);

  const getSeverityIcon = () => {
    switch (errorInfo.severity) {
      case 'critical':
        return <AlertTriangle size={48} />;
      case 'high':
        return <AlertTriangle size={48} />;
      case 'medium':
        return <Bug size={48} />;
      case 'low':
      default:
        return <AlertTriangle size={48} />;
    }
  };

  const getErrorTitle = () => {
    switch (errorInfo.severity) {
      case 'critical':
        return t('error.criticalTitle');
      case 'high':
        return t('error.highTitle');
      case 'medium':
        return t('error.mediumTitle');
      case 'low':
      default:
        return t('error.defaultTitle');
    }
  };

  const getErrorDescription = () => {
    switch (errorInfo.category) {
      case 'network':
        return t('error.networkDescription');
      case 'authentication':
        return t('error.authDescription');
      case 'authorization':
        return t('error.authorizationDescription');
      case 'validation':
        return t('error.validationDescription');
      case 'runtime':
        return t('error.runtimeDescription');
      case 'unknown':
      default:
        return t('error.defaultDescription');
    }
  };

  const renderErrorHeader = () => (
    <>
      <ErrorIcon>{getSeverityIcon()}</ErrorIcon>
      <ErrorTitle>{getErrorTitle()}</ErrorTitle>
      <ErrorMessage>{getErrorDescription()}</ErrorMessage>
    </>
  );

  const renderErrorActions = () => (
    <ErrorActions>
      <ErrorButton variant='primary' onClick={resetError}>
        <ButtonIcon>
          <RefreshCw size={16} />
        </ButtonIcon>
        {t('error.tryAgain')}
      </ErrorButton>

      <ErrorButton variant='secondary' onClick={handleRefresh}>
        {t('error.refreshPage')}
      </ErrorButton>

      <ErrorButton variant='secondary' onClick={handleGoHome}>
        <ButtonIcon>
          <Home size={16} />
        </ButtonIcon>
        {t('error.goHome')}
      </ErrorButton>

      {recoveryActions.map((action, index) => (
        <ErrorButton key={index} variant='secondary' onClick={action.action}>
          {action.label}
        </ErrorButton>
      ))}

      {process.env['NODE_ENV'] === 'development' && (
        <ErrorButton variant='secondary' onClick={handleReportError}>
          <ButtonIcon>
            <Bug size={16} />
          </ButtonIcon>
          {t('error.reportError')}
        </ErrorButton>
      )}
    </ErrorActions>
  );

  const renderStackTrace = () => {
    if (!errorInfo.stack) return null;

    return (
      <>
        <ErrorBreak />
        <ErrorBreak />
        <ErrorStrong>{t('error.stackTrace')}</ErrorStrong>
        <ErrorBreak />
        {errorInfo.stack}
      </>
    );
  };

  const renderComponentStack = () => {
    if (!errorInfo.componentStack) return null;

    return (
      <>
        <ErrorBreak />
        <ErrorBreak />
        <ErrorStrong>{t('error.componentStack')}</ErrorStrong>
        <ErrorBreak />
        {errorInfo.componentStack}
      </>
    );
  };

  const renderTechnicalDetails = () => {
    if (process.env['NODE_ENV'] !== 'development') {
      return null;
    }

    return (
      <ErrorDetails>
        <ErrorSummary>{t('error.technicalDetails')}</ErrorSummary>
        <ErrorStack>
          <ErrorStrong>{t('common.error')}:</ErrorStrong> {errorInfo.message}
          {renderStackTrace()}
          {renderComponentStack()}
          <ErrorBreak />
          <ErrorBreak />
          <ErrorStrong>{`${'Timestamp'}:`}</ErrorStrong>{' '}
          {new Date(errorInfo.timestamp).toISOString()}
          <ErrorBreak />
          <ErrorStrong>{`${'Category'}:`}</ErrorStrong> {errorInfo.category}
          <ErrorBreak />
          <ErrorStrong>{`${'Severity'}:`}</ErrorStrong> {errorInfo.severity}
        </ErrorStack>
      </ErrorDetails>
    );
  };

  return (
    <ErrorFallbackContainer>
      {renderErrorHeader()}
      {renderErrorActions()}
      {renderTechnicalDetails()}
    </ErrorFallbackContainer>
  );
};

export { ErrorFallback };
