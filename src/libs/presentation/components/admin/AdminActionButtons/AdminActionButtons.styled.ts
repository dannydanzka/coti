/**
 * AdminActionButtons Styled Components
 */

'use client';

import styled, { keyframes } from 'styled-components';

import { color, shape, spacing } from '@constants';

import type { StyledToggleButtonProps } from './AdminActionButtons.interfaces';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const StyledToggleButton = styled.button<StyledToggleButtonProps>`
  align-items: center;
  background: ${({ $isActive, $isLoading }) => {
    if ($isLoading) return color.warningBackground;
    return $isActive ? color.errorBackground : color.successBackground;
  }};
  border: none;
  border-radius: ${({ $shape }) => ($shape === 'circle' ? shape.full : shape.md)};
  color: ${({ $isActive, $isLoading }) => {
    if ($isLoading) return color.warningDark;
    return $isActive ? color.errorDark : color.successDark;
  }};
  cursor: ${({ $isLoading }) => ($isLoading ? 'wait' : 'pointer')};
  display: inline-flex;
  height: ${spacing.md};
  justify-content: center;
  min-width: ${spacing.md};
  padding: 0;
  transition: all 0.2s ease;
  width: ${spacing.md};

  &:hover:not(:disabled) {
    filter: brightness(0.92);
  }
`;

export const SpinnerIcon = styled.span`
  animation: ${spin} 1s linear infinite;
  display: inline-flex;
`;
