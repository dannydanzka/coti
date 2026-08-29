/**
 * PhoneFrame Styled Components
 *
 * Device shell that mirrors the 390×844 mockups in `.claude/coti-flujo.html`,
 * scaled down for the landing.
 */

'use client';

import styled, { css } from 'styled-components';

import { brandColor, color, elevation, layout, shape, spacing, typography } from '@constants';

const tiltSkin = {
  left: css`
    transform: rotate(-4deg);
  `,
  none: css`
    transform: none;
  `,
  right: css`
    transform: rotate(4deg);
  `,
} as const;

export const FrameWrapper = styled.figure<{ $tilt: 'left' | 'none' | 'right' }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin: 0;
  transition: transform 0.4s ease;
  width: 100%;
  ${({ $tilt }) => tiltSkin[$tilt]}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    transform: translateY(-6px);
  }
`;

export const Device = styled.div`
  background: ${brandColor.cotiCream};
  border: 6px solid ${brandColor.cotiBrown};
  border-radius: ${spacing['2xl']};
  box-shadow: ${elevation.xl};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

export const StatusBar = styled.div`
  align-items: center;
  color: ${color.textPrimary};
  display: flex;
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  justify-content: space-between;
  padding: ${spacing.sm} ${spacing.md} ${spacing.micro};
`;

export const StatusPill = styled.span`
  background: ${brandColor.cotiBrown};
  border-radius: ${shape.full};
  height: ${spacing.xs};
  width: ${spacing.lg};
`;

export const Screen = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md} ${spacing.md};
`;

export const HomeIndicator = styled.span`
  align-self: center;
  background: ${brandColor.cotiBrown};
  border-radius: ${shape.full};
  height: ${spacing.micro};
  margin: ${spacing.xs} 0 ${spacing.sm};
  width: ${spacing['3xl']};
`;

export const Caption = styled.figcaption`
  color: ${color.textTertiary};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  text-align: center;

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size.xs};
  }
`;
