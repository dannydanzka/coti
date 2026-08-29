/**
 * Container Styled Components
 */

'use client';

import styled from 'styled-components';

import { spacing } from '@constants';

import type { ContainerSize } from './Container.interfaces';

const getMaxWidth = (size: ContainerSize) => {
  switch (size) {
    case 'small':
      return '640px';
    case 'medium':
      return '1024px';
    case 'large':
      return '1280px';
    case 'full':
      return '100%';
    default:
      return '1024px';
  }
};

export const StyledContainer = styled.div<{ $size: ContainerSize }>`
  margin: 0 auto;
  max-width: ${({ $size }) => getMaxWidth($size)};
  padding-left: ${spacing.sm};
  padding-right: ${spacing.sm};
  width: 100%;

  @media (width >= 768px) {
    padding-left: ${spacing.md};
    padding-right: ${spacing.md};
  }

  @media (width >= 1024px) {
    padding-left: ${spacing.lg};
    padding-right: ${spacing.lg};
  }
`;
