/**
 * Root Layout
 *
 * Next.js 16 App Router compliant layout.
 */

import { Fredoka, Inter, Lato, Montserrat } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

import { APP_METADATA } from '@constants';
import { Providers } from '@providers';

import type { RootLayoutProps } from './layout.interfaces';

const montserrat = Montserrat({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-montserrat',
});

/** Body/UI sans — referenced by typography.family.body. */
const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
});

/** Rounded display — matches the Coti logotype; referenced by typography.family.rounded. */
const fredoka = Fredoka({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-rounded',
  weight: ['500', '600', '700'],
});

const lato = Lato({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700', '900'],
});

export const metadata: Metadata = {
  description: APP_METADATA.DESCRIPTION,
  title: APP_METADATA.TITLE,
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

/**
 * Force dynamic rendering on demand.
 *
 * Prerender is flaky for this app because the client-only tree (Providers,
 * i18next, styled-components) runs hooks during the build-time worker pass,
 * which occasionally reads null React dispatcher and fails the export.
 * Data is fetched client-side via Redux anyway, so prerender gives no benefit.
 */
export const dynamic = 'force-dynamic';

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html data-scroll-behavior='smooth' lang='es'>
      <body
        className={`${montserrat.variable} ${lato.variable} ${inter.variable} ${fredoka.variable}`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
