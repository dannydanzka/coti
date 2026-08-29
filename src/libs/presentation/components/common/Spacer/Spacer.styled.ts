/**
 * Spacer Styled Components
 */

'use client';

import styled, { css } from 'styled-components';

import { spacing } from '@constants';

import type { SpacerSize, StyledSpacerProps } from './Spacer.interfaces';

const sizeMap: Record<SpacerSize, string> = {
  '2xl': spacing['2xl'],
  '3xl': spacing['4xl'],
  lg: spacing.md,
  md: spacing.sm,
  sm: spacing.xs,
  xl: spacing.lg,
  xs: spacing.micro,
};

const getSpacing = (size?: SpacerSize): string => (size ? sizeMap[size] : '0');

export const StyledSpacer = styled.div<StyledSpacerProps>`
  ${({ $horizontal, $isWrapper, $mode, $vertical }) => {
    const verticalValue = getSpacing($vertical);
    const horizontalValue = getSpacing($horizontal);

    if ($isWrapper) {
      if ($mode === 'padding') {
        return css`
          padding: ${$vertical ? verticalValue : '0'} ${$horizontal ? horizontalValue : '0'}
            ${$vertical ? verticalValue : '0'} ${$horizontal ? horizontalValue : '0'};
        `;
      }
      return css`
        margin: ${$vertical ? verticalValue : '0'} ${$horizontal ? horizontalValue : '0'}
          ${$vertical ? verticalValue : '0'} ${$horizontal ? horizontalValue : '0'};
      `;
    }

    return css`
      display: block;
      height: ${$vertical ? verticalValue : '0'};
      width: ${$horizontal ? horizontalValue : '0'};
    `;
  }}
`;
