/**
 * MeetButton Styled Components
 *
 * Local skin over the agnostic sovereignty-ui Button: it re-styles the base
 * button with the meet landing palette (flat-map tokens) instead of forking the
 * library or hardcoding a brand component. Behavior is inherited from Button;
 * only the look is overridden. `&&` bumps specificity over the library's own
 * single-class styles so the skin wins deterministically.
 */

'use client';

import styled, { css } from 'styled-components';

import { brandColor, color, elevation, shape, spacing, typography } from '@constants';
import { Button } from '@dannydanzka/sovereignty-ui';

import type { MeetButtonSize, MeetButtonVariant } from './MeetButton.interfaces';

const variantSkin = {
  outline: css`
    background-color: transparent;
    border: 2px solid ${brandColor.landingTextDark};
    color: ${brandColor.landingTextDark};
  `,
  primary: css`
    background-color: ${brandColor.landingOrange};
    border: none;
    color: ${color.white};
  `,
} as const;

const sizeSkin = {
  medium: css`
    font-size: ${typography.size.base};
    padding: ${spacing.sm} ${spacing.lg};
  `,
  small: css`
    font-size: ${typography.size.sm};
    padding: ${spacing.xs} ${spacing.md};
  `,
} as const;

export const SkinnedButton = styled(Button)<{
  $fullWidth: boolean;
  $size: MeetButtonSize;
  $variant: MeetButtonVariant;
}>`
  && {
    border-radius: ${shape.full};
    box-shadow: ${elevation.md};
    cursor: pointer;
    font-family: ${typography.family.display};
    font-weight: ${typography.weight.bold};
    letter-spacing: 0.02em;
    text-decoration: none;
    text-transform: none;
    transition: transform 0.18s ease;
    width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

    ${({ $size }) => sizeSkin[$size]}
    ${({ $variant }) => variantSkin[$variant]}

    /* Hover: just a slight lift — no link underline, no background/colour change.
       Re-assert the variant skin so the base button's own hover can't recolour it. */
    &:hover:not(:disabled) {
      text-decoration: none;
      transform: translateY(-2px);
      ${({ $variant }) => variantSkin[$variant]}
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
