/**
 * Icon Utilities
 * Icon mapping and selection for error states.
 */

import { AlertTriangle, Info, XCircle } from 'lucide-react';

import type { ErrorIconType } from './icon.utils.interfaces';

export type { ErrorIconType };

/**
 * Maps error type to corresponding Lucide icon component.
 */
export const getErrorIcon = (type: ErrorIconType) => {
  const iconMap = {
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  };

  return iconMap[type] || iconMap.error;
};
