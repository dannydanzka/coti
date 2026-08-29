/**
 * Layout Interfaces
 * Common layout prop types for presentation layouts
 *
 * NOTE: PublicLayoutProps is exported from apps/public/presentation/layouts
 * to avoid duplicate exports
 */
import type { ReactNode } from 'react';

export interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}
