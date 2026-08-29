/**
 * Container Component Interfaces
 */

import type { ReactNode } from 'react';

export type ContainerSize = 'small' | 'medium' | 'large' | 'full';

export interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
}
