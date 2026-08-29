/**
 * PhoneFrame Interfaces
 */

import type { ReactNode } from 'react';

export interface PhoneFrameProps {
  /** Screen caption shown above the device (e.g. "Paso 4 de 8"). */
  caption?: string;
  children: ReactNode;
  className?: string;
  /** Visual tilt for staggered showcase compositions. */
  tilt?: 'left' | 'none' | 'right';
}
