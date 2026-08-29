/**
 * PublicShell Component Interfaces
 */

import { ReactNode } from 'react';

export interface PublicShellProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}
