/**
 * Render With Providers Interfaces
 *
 * Type definitions for render with providers testing utility.
 */

import type { ReactNode } from 'react';
import type { RenderOptions } from '@testing-library/react';

import type { AuthContextValue } from '@providers';
import type { EnhancedStore } from '@reduxjs/toolkit';
import type { RootState } from '@redux';

export interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  authContext?: Partial<AuthContextValue>;
  preloadedState?: Partial<RootState>;
  testStore?: EnhancedStore;

  wrapper?: ({ children }: { children: ReactNode }) => React.JSX.Element;
}
