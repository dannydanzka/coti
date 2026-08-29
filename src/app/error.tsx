/**
 * error
 *
 * Error boundary component for route error handling.
 */

'use client';

import { NotFoundScreen } from '@apps/public/presentation/screens/NotFoundScreen';

import type { ErrorProps } from './error.interfaces';

const Error = ({ error, reset }: ErrorProps) => <NotFoundScreen error={error} reset={reset} />;

export default Error;
