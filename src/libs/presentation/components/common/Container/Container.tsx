/**
 * Container Component
 *
 * Responsive container with max-width and horizontal padding.
 */

'use client';

import type { ContainerProps } from './Container.interfaces';

import { StyledContainer } from './Container.styled';

export const Container = ({ children, size = 'medium' }: ContainerProps) => {
  return <StyledContainer $size={size}>{children}</StyledContainer>;
};
