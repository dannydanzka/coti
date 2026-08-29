/**
 * ErrorScreen Component
 *
 * Re-exports NotFoundScreen with error props for backward compatibility.
 * Both 404 and error pages now use the unified NotFoundScreen.
 */

'use client';

import type { ErrorScreenProps } from './ErrorScreen.interfaces';
import { NotFoundScreen } from '../NotFoundScreen';

export const ErrorScreen = ({ error, reset }: ErrorScreenProps) => (
  <NotFoundScreen error={error} reset={reset} />
);
