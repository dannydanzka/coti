/**
 * PublicAuthLayout Styled Components
 *
 * Shared layout components for authentication screens (Login, Signup).
 */

'use client';

import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type { StyledIllustrationPlaceholderProps } from './PublicAuthLayout.interfaces';

export const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${spacing['6xl']});
  width: 100%;
`;

export const AuthSection = styled.section`
  align-items: center;
  background-color: ${color.backgroundAlt};
  display: flex;
  flex: 1;
  justify-content: center;
  padding: ${spacing.lg} ${spacing.sm};
  position: relative;

  @media (width <= 768px) {
    align-items: flex-start;
    padding: ${spacing.md} ${spacing.sm};
  }
`;

export const AuthContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: 1200px;
  position: relative;
  width: 100%;

  @media (width <= 900px) {
    flex-direction: column;
  }
`;

export const AuthIllustrationLeft = styled.div<{ $maxHeight?: string; $fullWidth?: boolean }>`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;

  @media (width <= 900px) {
    display: none;
  }

  img {
    height: auto;
    max-height: ${({ $maxHeight }) => $maxHeight ?? 'none'};
    width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  }
`;

export const AuthIllustrationRight = styled.div<{ $maxHeight?: string; $fullWidth?: boolean }>`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;

  @media (width <= 900px) {
    display: none;
  }

  img {
    height: auto;
    max-height: ${({ $maxHeight }) => $maxHeight ?? 'none'};
    width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  }
`;

export const AuthIllustrationPlaceholder = styled.div<StyledIllustrationPlaceholderProps>`
  align-items: center;
  background: ${({ $variant }) =>
    $variant === 'accent'
      ? `linear-gradient(135deg, ${color.accent100} 0%, ${color.accent200} 100%)`
      : `linear-gradient(135deg, ${color.primary100} 0%, ${color.primary200} 100%)`};
  border-radius: ${shape.lg};
  color: ${color.textSecondary};
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  height: ${({ $height }) => $height ?? '350px'};
  justify-content: center;
  text-align: center;
  width: ${({ $width }) => $width ?? '200px'};
`;

export const AuthCardWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: ${spacing.md};
  max-width: 480px;
  width: 100%;

  @media (width <= 768px) {
    max-width: 100%;
  }
`;

export const AuthHeader = styled.div`
  text-align: center;
`;

export const AuthTitle = styled.h1`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['6xl']};
  font-style: italic;
  font-weight: ${typography.weight.bold};
  margin: 0;

  @media (width <= 768px) {
    font-size: ${typography.size['4xl']};
  }
`;

export const AuthSubtitle = styled.p`
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.semibold};
  margin: ${spacing.xs} 0 0;

  @media (width <= 768px) {
    font-size: ${typography.size.xl};
  }
`;

export const AuthCard = styled.div`
  background: ${color.white};
  border-radius: ${shape.lg};
  box-shadow: 0 4px 20px rgb(${color.neutral900} / 0.08);
  padding: ${spacing.lg};

  @media (width <= 768px) {
    padding: ${spacing.md};
  }
`;
