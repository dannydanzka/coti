/**
 * Admin Routes Loading
 *
 * Next.js App Router loading file for admin routes.
 * Automatically wraps routes in Suspense with GlobalLoading as fallback.
 */

import { GlobalLoading } from '@components';

const Loading = () => <GlobalLoading forceVisible />;

export default Loading;
