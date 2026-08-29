/**
 * AdminSearch Component Interfaces
 *
 * Unified search input for admin screens with filter bar.
 */

import type { ReactNode } from 'react';

export interface AdminSearchProps {
  children?: ReactNode;
  className?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}
