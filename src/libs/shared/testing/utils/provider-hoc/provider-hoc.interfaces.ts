/**
 * Provider HOC Interfaces
 *
 * Type definitions for provider HOC testing utilities.
 */

import type { ReactNode } from 'react';

export interface ProviderHOCOptions {
  storeState?: Record<string, unknown>;
  customProviders?: React.ComponentType<{ children: ReactNode }>[];
}

export interface WrapperComponent {
  ({ children }: { children: ReactNode }): React.JSX.Element;
  displayName?: string;
}
