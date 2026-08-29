/**
 * Card Component
 *
 * Container with shadow and rounded corners.
 * Supports clickable state with hover effects.
 */

'use client';

import type { CardProps } from './Card.interfaces';

import { StyledCard } from './Card.styled';

export const Card = ({ children, onClick, padding = 'medium' }: CardProps) => {
  return (
    <StyledCard $clickable={Boolean(onClick)} $padding={padding} onClick={onClick}>
      {children}
    </StyledCard>
  );
};
