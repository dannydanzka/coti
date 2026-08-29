/**
 * Styled Components Type Declaration
 *
 * This project uses Flat Maps (colorsFlatMap, spacingFlatMap, etc.)
 * instead of ThemeProvider context for SSR compatibility.
 *
 * DefaultTheme is empty because we don't use theme context.
 */
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    /** Placeholder - project uses Flat Maps instead of theme context */
    readonly _dependencies?: never;
  }
}
