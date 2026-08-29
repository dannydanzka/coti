import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    /** Nombres de clase legibles y SSR correcto para styled-components. */
    styledComponents: true,
  },

  /**
   * SVG como componente React.
   *
   * Next 16 usa Turbopack por defecto, así que la regla va aquí y no en
   * `webpack()`: sin esto, `import Logo from '*.svg'` devuelve el objeto de
   * imagen estática y renderizar `<Logo />` revienta con
   * "Element type is invalid… but got: object".
   *
   * El contrato de tipos vive en `src/libs/domain/types/external/svg.d.ts`.
   */
  turbopack: {
    rules: {
      '*.svg': {
        as: '*.js',
        loaders: [
          {
            loader: '@svgr/webpack',
            options: { svgo: false },
          },
        ],
      },
    },
  },
};

export default nextConfig;
