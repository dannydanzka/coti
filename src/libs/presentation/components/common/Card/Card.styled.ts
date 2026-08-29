/**
 * Card Styled Components
 */

'use client';

import styled from 'styled-components';

import { color, spacing } from '@constants';

const getPaddingStyles = (padding: 'none' | 'small' | 'medium' | 'large') => {
  switch (padding) {
    case 'none':
      return 'padding: 0;';
    case 'small':
      return `padding: ${spacing.sm};`;
    case 'medium':
      return `padding: ${spacing.md};`;
    case 'large':
      return `padding: ${spacing.lg};`;
    default:
      return '';
  }
};

export const StyledCard = styled.div<{
  $clickable?: boolean;
  $padding: 'none' | 'small' | 'medium' | 'large';
}>`
  background-color: ${color.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(${color.neutral900} / 0.08);
  transition: all 0.2s ease-in-out;

  ${({ $padding }) => getPaddingStyles($padding)}

  ${({ $clickable }) =>
    $clickable &&
    `
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgb(${color.neutral900} / 0.12);
    }

    &:active {
      transform: translateY(-2px);
    }
  `}
`;
