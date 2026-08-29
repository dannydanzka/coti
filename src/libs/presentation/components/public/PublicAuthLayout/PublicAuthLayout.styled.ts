/**
 * PublicAuthLayout Styled Components
 *
 * Shared layout components for authentication screens (Login, Signup).
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, elevation, layout, shape, spacing, typography } from '@constants';

import type { StyledIllustrationPlaceholderProps } from './PublicAuthLayout.interfaces';

export const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${spacing['6xl']});
  width: 100%;
`;

export const AuthSection = styled.section`
  align-items: center;
  background-color: ${brandColor.cotiCream};
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
  gap: ${spacing['2xl']};
  justify-content: center;
  max-width: 1200px;
  position: relative;
  width: 100%;

  @media (width <= 900px) {
    flex-direction: column;
  }
`;

/**
 * Panel ilustrado que acompaña al formulario (login/registro): el paisaje de
 * marca a la derecha, recortado en cover, con el mismo radio que la tarjeta.
 */
export const AuthIllustrationPanel = styled.aside`
  border-radius: ${shape['2xl']};
  box-shadow: ${elevation.md};
  flex: 1;
  max-width: 520px;
  min-height: 640px;
  overflow: hidden;
  position: relative;

  @media (max-width: ${layout.breakpoint.lg}) {
    display: none;
  }
`;

export const AuthIllustrationImage = styled.img`
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  object-position: center bottom;
  position: absolute;
  width: 100%;
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
  text-align: left;

  @media (width <= 900px) {
    text-align: center;
  }
`;

export const AuthTitle = styled.h1`
  color: ${brandColor.cotiForest};
  font-family: ${typography.family.rounded};
  font-size: ${typography.size['6xl']};
  font-weight: ${typography.weight.bold};
  letter-spacing: ${typography.tracking.tight};
  margin: 0;

  @media (width <= 768px) {
    font-size: ${typography.size['4xl']};
  }
`;

export const AuthSubtitle = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.regular};
  margin: ${spacing.xs} 0 0;

  @media (width <= 768px) {
    font-size: ${typography.size.xl};
  }
`;

export const AuthCard = styled.div`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: ${shape['2xl']};
  box-shadow: ${elevation.sm};
  padding: ${spacing.lg};

  @media (width <= 768px) {
    padding: ${spacing.md};
  }
`;
