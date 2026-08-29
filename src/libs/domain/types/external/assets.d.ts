/**
 * Asset Module Declarations
 *
 * Type declarations for static asset imports (images, fonts, etc.)
 * Images use StaticImageData for Next.js Image component compatibility
 */

/** @see https://nextjs.org/docs/app/building-your-application/optimizing/images */

declare module '*.webp' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}

declare module '*.png' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}

declare module '*.jpg' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}

declare module '*.jpeg' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}

declare module '*.gif' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}

declare module '*.ico' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}
