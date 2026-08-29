/**
 * ErrorFallback Styled Components
 *
 * Styles for error display and recovery UI components.
 */

import styled from 'styled-components';

import { color, shape, spacing } from '@constants';

export const ErrorFallbackContainer = styled.div`
  align-items: center;
  background-color: ${color.errorBackground};
  border: 1px solid ${color.errorBorder};
  border-radius: ${shape.md};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  min-height: 200px;
  padding: 2rem;
`;

export const ErrorIcon = styled.div`
  color: ${color.textSecondary};
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const ErrorTitle = styled.div`
  color: ${color.textSecondary};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  color: ${color.textSecondary};
  font-size: 1rem;
  margin-bottom: 1.5rem;
  max-width: 500px;
  text-align: center;
`;

export const ErrorActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;

export const ErrorButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  border: 1px solid;
  border-radius: ${shape.md};
  cursor: pointer;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;

  ${({ variant = 'primary' }) => {
    if (variant === 'primary') {
      return `
        background-color: ${color.primary500};
        color: ${color.white};
        border-color: ${color.primary500};

        &:hover {
          background-color: ${color.primary600};
          border-color: ${color.primary600};
        }
      `;
    }

    return `
      background-color: transparent;
      color: ${color.textPrimary};
      border-color: ${color.border};

      &:hover {
        background-color: ${color.backgroundDark};
      }
    `;
  }}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ErrorDetails = styled.details`
  margin-top: 1rem;
  max-width: 600px;
  width: 100%;
`;

export const ErrorSummary = styled.summary`
  color: ${color.textSecondary};
  cursor: pointer;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  &:hover {
    color: ${color.textSecondary};
  }
`;

export const ErrorStack = styled.pre`
  background-color: ${color.textSecondary};
  border-radius: 4px;
  color: ${color.textSecondary};
  font-size: 0.75rem;
  max-height: 200px;
  overflow: auto;
  overflow-wrap: break-word;
  padding: 1rem;
  white-space: pre-wrap;
`;

export const ErrorStrong = styled.strong`
  font-weight: 600;
`;

export const ErrorBreak = styled('br')``;

export const ButtonIcon = styled.span`
  margin-right: ${spacing.xs};
`;
