/**
 * PublicCard Styled Components
 *
 * Card components for public-facing pages.
 */

'use client';

import styled, { css } from 'styled-components';

import { color, elevation, shape, spacing, typography } from '@constants';

import type { StyledCardHeaderProps, StyledCardProps } from './PublicCard.interfaces';

const getCardVariant = (variant?: StyledCardProps['$variant']) => {
  switch (variant) {
    case 'elevated':
      return css`
        background: ${color.white};
        border-radius: ${shape.lg};
        box-shadow: ${elevation.lg};
      `;
    case 'outlined':
      return css`
        background: ${color.white};
        border: 1px solid ${color.border};
        border-radius: ${shape.lg};
      `;
    case 'glass':
      return css`
        backdrop-filter: blur(10px);
        background: linear-gradient(
          145deg,
          rgb(${color.white} / 0.95) 0%,
          rgb(${color.white} / 0.9) 100%
        );
        border: 1px solid rgb(${color.white} / 0.2);
        border-radius: ${shape.xl};
        box-shadow: 0 25px 50px -12px rgb(${color.neutral900} / 0.15);
      `;
    case 'default':
    case undefined:
      return css`
        background: ${color.white};
        border-radius: ${shape.lg};
        box-shadow: 0 4px 20px rgb(${color.neutral900} / 0.08);
      `;
  }
};

const getCardPadding = (padding?: StyledCardProps['$padding']) => {
  switch (padding) {
    case 'none':
      return css`
        padding: 0;
      `;
    case 'sm':
      return css`
        padding: ${spacing.sm};

        @media (width <= 768px) {
          padding: ${spacing.sm};
        }
      `;
    case 'lg':
      return css`
        padding: ${spacing.lg} ${spacing['2xl']};

        @media (width <= 768px) {
          padding: ${spacing.md};
        }
      `;
    case 'md':
    case undefined:
      return css`
        padding: ${spacing.lg};

        @media (width <= 768px) {
          padding: ${spacing.md};
        }
      `;
  }
};

export const PublicCard = styled.div<StyledCardProps>`
  ${({ $variant }) => getCardVariant($variant)}
  ${({ $padding }) => getCardPadding($padding)}
`;

export const PublicCardHeader = styled.div<StyledCardHeaderProps>`
  margin-bottom: ${spacing.md};
  ${({ $withBorder }) =>
    $withBorder &&
    css`
      border-bottom: 1px solid ${color.border};
      padding-bottom: ${spacing.sm};
    `}
`;

export const PublicCardTitle = styled.h3`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  margin: 0;
`;

export const PublicCardSubtitle = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  margin: ${spacing.micro} 0 0;
`;

export const PublicCardContent = styled.div`
  /* Content container - no default styling */
`;

export const PublicCardFooter = styled.div`
  border-top: 1px solid ${color.border};
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;
  margin-top: ${spacing.md};
  padding-top: ${spacing.sm};
`;

export const PublicCardDivider = styled.hr`
  border: none;
  border-top: 1px solid ${color.border};
  margin: ${spacing.md} 0;
`;
