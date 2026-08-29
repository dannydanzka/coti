/**
 * SVG Module Declaration
 *
 * Allows importing SVG files as React components using @svgr/webpack.
 */

declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}
