/**
 * AdminDetailModal Styled Components
 *
 * Consistent styling for detail modals in admin screens.
 */

'use client';

import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type {
  StyledDetailContentBoxProps,
  StyledDetailRowProps,
} from './AdminDetailModal.interfaces';

export const DetailSection = styled.div`
  margin-bottom: ${spacing.md};
`;

export const DetailLabel = styled.span`
  color: ${color.textSecondary};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.medium};
  letter-spacing: ${typography.tracking.wide};
  margin-bottom: ${spacing.micro};
  text-transform: uppercase;
`;

export const DetailValue = styled.span`
  color: ${color.textPrimary};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  line-height: ${typography.leading.relaxed};
`;

export const DetailValueMono = styled(DetailValue)`
  font-family: ${typography.family.mono};
`;

export const DetailRow = styled.div<StyledDetailRowProps>`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(${({ $columns }) => $columns ?? 2}, 1fr);
  margin-bottom: ${spacing.sm};

  @media (width <= 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailDivider = styled.hr`
  border: none;
  border-top: 1px solid ${color.border};
  margin: ${spacing.md} 0;
`;

export const DetailAmount = styled.div`
  color: ${color.textPrimary};
  font-family: ${typography.family.mono};
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.medium};
`;

export const DetailAmountLarge = styled(DetailAmount)`
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
`;

export const DetailContentBox = styled.div<StyledDetailContentBoxProps>`
  background: ${({ $variant }) => {
    switch ($variant) {
      case 'info':
        return color.primary50;
      case 'warning':
        return color.warningBackground;
      case 'error':
        return color.errorBackground;
      case 'default':
      case undefined:
        return color.neutral50;
    }
  }};
  border-left: 3px solid
    ${({ $variant }) => {
      switch ($variant) {
        case 'info':
          return color.primary500;
        case 'warning':
          return color.warning;
        case 'error':
          return color.error;
        case 'default':
        case undefined:
          return color.neutral300;
      }
    }};
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  line-height: ${typography.leading.relaxed};
  padding: ${spacing.sm} ${spacing.sm};
  white-space: pre-wrap;
`;

export const DetailInfoGrid = styled.div`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: ${spacing.md};

  @media (width <= 480px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailMediaContainer = styled.div`
  background: ${color.neutral100};
  border-radius: ${shape.md};
  max-height: 300px;
  overflow: hidden;
  width: 100%;

  img,
  video {
    height: auto;
    max-height: 300px;
    object-fit: contain;
    width: 100%;
  }
`;
