/**
 * AdminStates Styled Components
 *
 * State components for admin screens (loading, empty, error).
 */

'use client';

import styled, { css } from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type { StyledInfoMessageProps } from './AdminStates.interfaces';

export const EmptyContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  justify-content: center;
  padding: ${spacing['2xl']};
  text-align: center;
`;

export const EmptyIcon = styled.div`
  align-items: center;
  background: ${color.neutral100};
  border-radius: 50%;
  color: ${color.textTertiary};
  display: flex;
  height: ${spacing['4xl']};
  justify-content: center;
  width: ${spacing['4xl']};

  svg {
    height: ${spacing.lg};
    width: ${spacing.lg};
  }
`;

export const EmptyTitle = styled.h3`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.semibold};
  margin: 0;
`;

export const EmptyMessage = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  line-height: ${typography.leading.relaxed};
  margin: 0;
  max-width: 400px;
`;

export const EmptyAction = styled.div`
  margin-top: ${spacing.xs};
`;

export const ErrorContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  justify-content: center;
  padding: ${spacing['2xl']};
  text-align: center;
`;

export const ErrorIcon = styled.div`
  align-items: center;
  background: ${color.errorBackground};
  border-radius: 50%;
  color: ${color.errorDark};
  display: flex;
  height: ${spacing['4xl']};
  justify-content: center;
  width: ${spacing['4xl']};

  svg {
    height: ${spacing.lg};
    width: ${spacing.lg};
  }
`;

export const ErrorTitle = styled.h3`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.semibold};
  margin: 0;
`;

export const ErrorMessage = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  line-height: ${typography.leading.relaxed};
  margin: 0;
  max-width: 400px;
`;

export const ErrorAction = styled.div`
  margin-top: ${spacing.xs};
`;

const getInfoMessageStyles = (variant: StyledInfoMessageProps['$variant']) => {
  switch (variant) {
    case 'success':
      return css`
        background: ${color.successLight};
        border-left-color: ${color.success};
        color: ${color.successDark};
      `;
    case 'error':
      return css`
        background: ${color.errorLight};
        border-left-color: ${color.error};
        color: ${color.errorDark};
      `;
    case 'warning':
      return css`
        background: ${color.warningLight};
        border-left-color: ${color.warning};
        color: ${color.warningDark};
      `;
    case 'info':
    default:
      return css`
        background: ${color.secondary100};
        border-left-color: ${color.secondary500};
        color: ${color.secondary700};
      `;
  }
};

export const InfoMessage = styled.div<StyledInfoMessageProps>`
  border-left: 4px solid;
  border-radius: ${shape.md};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  line-height: ${typography.leading.relaxed};
  padding: ${spacing.sm};
  ${({ $variant }) => getInfoMessageStyles($variant)}
`;
