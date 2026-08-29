/**
 * Spacer Component
 *
 * Flexible spacing utility component.
 * Can work as wrapper (with children) or as empty space (without children).
 */

'use client';

import type { SpacerProps } from './Spacer.interfaces';

import { StyledSpacer } from './Spacer.styled';

export const Spacer = ({
  children,
  className,
  horizontal,
  mode = 'margin',
  vertical,
}: SpacerProps) => {
  const isWrapper = children !== undefined;

  return (
    <StyledSpacer
      $horizontal={horizontal}
      $isWrapper={isWrapper}
      $mode={mode}
      $vertical={vertical}
      className={className}
    >
      {children}
    </StyledSpacer>
  );
};
