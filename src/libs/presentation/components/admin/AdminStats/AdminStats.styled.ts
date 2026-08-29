/**
 * AdminStats Styled Components
 *
 * Stats components for admin dashboard screens.
 */

'use client';

import styled, { css } from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type { StyledStatItemProps, StyledStatsGridProps } from './AdminStats.interfaces';

const getStatVariantStyles = (variant: StyledStatItemProps['$variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${color.primary100};
        color: ${color.primary700};
      `;
    case 'success':
      return css`
        background: ${color.successBackground};
        color: ${color.successDark};
      `;
    case 'warning':
      return css`
        background: ${color.warningBackground};
        color: ${color.warningDark};
      `;
    case 'danger':
      return css`
        background: ${color.errorBackground};
        color: ${color.errorDark};
      `;
    case 'info':
      return css`
        background: ${color.secondary100};
        color: ${color.secondary700};
      `;
    case 'default':
    default:
      return css`
        background: ${color.neutral100};
        color: ${color.neutral700};
      `;
  }
};

export const StatsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
`;

export const StatsGrid = styled.div<StyledStatsGridProps>`
  display: grid;
  gap: ${spacing.md};
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  margin-bottom: ${spacing.md};

  @media (width <= 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width <= 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatItem = styled.div<StyledStatItemProps>`
  align-items: center;
  border-radius: ${shape.md};
  display: flex;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  ${({ $variant }) => getStatVariantStyles($variant)}
`;

export const StatIcon = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  height: ${spacing.md};
  justify-content: center;
  width: ${spacing.md};

  svg {
    height: 100%;
    width: 100%;
  }
`;

export const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
`;

export const StatLabel = styled.span`
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  opacity: 0.8;
`;

export const StatValue = styled.span`
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
`;

export const StatCard = styled.div`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: ${shape.lg};
  padding: ${spacing.md};
`;

export const StatCardTitle = styled.h3`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  margin: 0 0 ${spacing.xs};
  text-transform: uppercase;
`;

export const StatCardValue = styled.p`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['4xl']};
  font-weight: ${typography.weight.bold};
  margin: 0;
`;

export const StatCardDescription = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  margin: ${spacing.xs} 0 0;
`;
