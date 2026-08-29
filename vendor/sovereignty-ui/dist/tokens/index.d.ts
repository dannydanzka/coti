/**
 * Design System Tokens
 *
 * Agnostic design token system following:
 * - Material Design 3 (Google)
 * - Apple Human Interface Guidelines
 * - 8-Point Grid System
 * - Tailwind CSS naming conventions
 *
 * SSR-safe: All exports are flat objects (no theme context required)
 *
 * AGNOSTIC TOKENS: spacing, shape, motion, elevation, layout are universal.
 * OVERRIDEABLE TOKENS: color (primary/secondary/accent palettes), typography.family.
 * Projects override via createTokens() — see create-tokens.ts.
 */
declare const spacing: {
    readonly '2xl': "3rem";
    readonly '3xl': "3.5rem";
    readonly '4xl': "4rem";
    readonly '5xl': "4.5rem";
    readonly '6xl': "5rem";
    readonly '7xl': "6rem";
    readonly lg: "2rem";
    readonly md: "1.5rem";
    readonly micro: "0.25rem";
    readonly sm: "1rem";
    readonly xl: "2.5rem";
    readonly xs: "0.5rem";
};
/**
 * Color Tokens
 *
 * Organized alphabetically within semantic groups.
 * Neutrals, status, and semantic colors are agnostic.
 * Primary, secondary, tertiary/accent palettes are overrideable via createTokens().
 * Default palette uses yellow/blue/pink. Projects override as needed.
 */
declare const color: {
    readonly accent100: "#F8BBD9";
    readonly accent200: "#F48FB1";
    readonly accent50: "#FCE4EC";
    readonly accent500: "#FF4081";
    readonly accent600: "#D81B60";
    readonly accent700: "#C2185B";
    readonly background: "#FFFFFF";
    readonly backgroundAlt: "#FFF9E6";
    readonly backgroundDark: "#F5F7FA";
    readonly backgroundInverse: "#1A237E";
    readonly black: "#000000";
    readonly blackRgb: "0, 0, 0";
    readonly border: "#E4E9F0";
    readonly borderDark: "#C5D0DE";
    readonly borderLight: "#F5F7FA";
    readonly cyan400: "#22D3EE";
    readonly cyan500: "#06B6D4";
    readonly cyan600: "#0891B2";
    readonly dark100: "#374151";
    readonly dark200: "#1F2937";
    readonly dark300: "#111827";
    readonly error: "#F44336";
    readonly errorBackground: "#FFEBEE";
    readonly errorBorder: "#FFCDD2";
    readonly errorDark: "#D32F2F";
    readonly errorFocusShadow: "rgba(244, 67, 54, 0.1)";
    readonly errorLight: "#E57373";
    readonly info: "#2196F3";
    readonly infoDark: "#1976D2";
    readonly infoLight: "#64B5F6";
    readonly magenta400: "#F472B6";
    readonly magenta500: "#EC4899";
    readonly modalOverlay: "rgba(30, 58, 95, 0.6)";
    readonly neutral0: "#FFFFFF";
    readonly neutral100: "#E4E9F0";
    readonly neutral200: "#C5D0DE";
    readonly neutral300: "#A6B7CB";
    readonly neutral400: "#8FA3BC";
    readonly neutral50: "#F5F7FA";
    readonly neutral500: "#7890AD";
    readonly neutral600: "#6583A0";
    readonly neutral700: "#4D7190";
    readonly neutral800: "#3B5F80";
    readonly neutral900: "#1E3A5F";
    readonly overlay: "rgba(26, 35, 126, 0.5)";
    readonly overlayDark: "rgba(26, 35, 126, 0.7)";
    readonly overlayLight: "rgba(26, 35, 126, 0.3)";
    readonly primary100: "#FFF9C4";
    readonly primary200: "#FFF176";
    readonly primary300: "#FFEE58";
    readonly primary400: "#FDD835";
    readonly primary50: "#FFFBEB";
    readonly primary500: "#FFC107";
    readonly primary600: "#FFB300";
    readonly primary700: "#FFA000";
    readonly primary800: "#FF8F00";
    readonly primary900: "#FF6F00";
    readonly primaryFocusShadow: "rgba(255, 193, 7, 0.1)";
    readonly purple400: "#A78BFA";
    readonly purple500: "#8B5CF6";
    readonly purple600: "#7C3AED";
    readonly secondary100: "#BBDEFB";
    readonly secondary200: "#90CAF9";
    readonly secondary300: "#64B5F6";
    readonly secondary400: "#42A5F5";
    readonly secondary50: "#E3F2FD";
    readonly secondary500: "#2196F3";
    readonly secondary600: "#1E88E5";
    readonly secondary700: "#1976D2";
    readonly secondary800: "#1565C0";
    readonly secondary900: "#0D47A1";
    readonly success: "#4CAF50";
    readonly successBackground: "#E8F5E9";
    readonly successDark: "#388E3C";
    readonly successLight: "#81C784";
    readonly surface: "#FFFFFF";
    readonly teal500: "#00C4AD";
    readonly tealRgb: "0, 196, 173";
    readonly tertiary100: "#F8BBD9";
    readonly tertiary200: "#F48FB1";
    readonly tertiary300: "#F06292";
    readonly tertiary400: "#EC407A";
    readonly tertiary50: "#FCE4EC";
    readonly tertiary500: "#FF4081";
    readonly tertiary600: "#D81B60";
    readonly tertiary700: "#C2185B";
    readonly tertiary800: "#AD1457";
    readonly tertiary900: "#880E4F";
    readonly textAccent: "#FF4081";
    readonly textDisabled: "#A0AEC0";
    readonly textInverse: "#FFFFFF";
    readonly textPrimary: "#1A237E";
    readonly textSecondary: "#4A5568";
    readonly textTertiary: "#718096";
    readonly transparent: "transparent";
    readonly warning: "#FF9800";
    readonly warningBackground: "#FFF8E1";
    readonly warningDark: "#F57C00";
    readonly warningLight: "#FFB74D";
    readonly white: "#FFFFFF";
    readonly whiteRgb: "255, 255, 255";
};
declare const typography: {
    readonly family: {
        readonly body: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly display: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly mono: "'Courier New', monospace";
    };
    readonly leading: {
        readonly normal: 1.5;
        readonly relaxed: 1.75;
        readonly tight: 1.2;
    };
    readonly size: {
        readonly '2xl': "1.5rem";
        readonly '3xl': "1.75rem";
        readonly '4xl': "2rem";
        readonly '5xl': "2.25rem";
        readonly '6xl': "2.5rem";
        readonly '7xl': "3rem";
        readonly '8xl': "4rem";
        readonly base: "1rem";
        readonly lg: "1.125rem";
        readonly sm: "0.875rem";
        readonly xl: "1.25rem";
        readonly xs: "0.75rem";
    };
    readonly tracking: {
        readonly normal: "0";
        readonly tight: "-0.02em";
        readonly wide: "0.02em";
    };
    readonly weight: {
        readonly black: 900;
        readonly bold: 700;
        readonly medium: 500;
        readonly regular: 400;
        readonly semibold: 600;
    };
};
declare const elevation: {
    readonly card: "0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)";
    readonly lg: "0 20px 40px rgba(30, 58, 95, 0.12)";
    readonly md: "0 8px 24px rgba(30, 58, 95, 0.12)";
    readonly none: "none";
    readonly sm: "0 2px 8px rgba(30, 58, 95, 0.08)";
    readonly xl: "0 30px 60px rgba(30, 58, 95, 0.16)";
};
declare const shape: {
    readonly '2xl': "2rem";
    readonly full: "9999px";
    readonly lg: "0.75rem";
    readonly md: "0.5rem";
    readonly none: "0";
    readonly sm: "0.25rem";
    readonly xl: "1rem";
};
declare const motion: {
    readonly fast: "150ms ease-in-out";
    readonly normal: "250ms ease-in-out";
    readonly slow: "400ms ease-in-out";
};
declare const layout: {
    readonly breakpoint: {
        readonly '2xl': "1536px";
        readonly lg: "1024px";
        readonly md: "768px";
        readonly sm: "640px";
        readonly xl: "1280px";
    };
    readonly container: {
        readonly lg: "1200px";
        readonly md: "1000px";
        readonly sm: "800px";
    };
    readonly contentMaxWidth: "600px";
    readonly heroMinHeight: "500px";
    readonly heroMinHeightLg: "600px";
    readonly icon: {
        readonly lg: "24px";
        readonly md: "20px";
        readonly sm: "16px";
        readonly xl: "32px";
    };
    readonly illustrationMaxHeightSm: "300px";
    readonly sectionMaxWidth: "1200px";
    readonly zIndex: {
        readonly base: 0;
        readonly dropdown: 100;
        readonly fixed: 300;
        readonly modal: 500;
        readonly overlay: 400;
        readonly popover: 600;
        readonly sticky: 200;
        readonly toast: 700;
    };
};

/**
 * Design System Presets
 *
 * Composed design tokens for common use cases.
 * These are combinations of base tokens for typography, components, etc.
 */
declare const textPreset: {
    readonly body: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "1rem";
        readonly fontWeight: 400;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.75;
    };
    readonly bodyLarge: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "1.125rem";
        readonly fontWeight: 400;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.75;
    };
    readonly bodySmall: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "0.875rem";
        readonly fontWeight: 400;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.75;
    };
    readonly button: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "1rem";
        readonly fontWeight: 700;
        readonly letterSpacing: "0.02em";
        readonly lineHeight: 1.5;
    };
    readonly buttonLarge: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "1.125rem";
        readonly fontWeight: 700;
        readonly letterSpacing: "0.02em";
        readonly lineHeight: 1.5;
    };
    readonly buttonSmall: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "0.875rem";
        readonly fontWeight: 600;
        readonly letterSpacing: "0.02em";
        readonly lineHeight: 1.5;
    };
    readonly caption: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "0.75rem";
        readonly fontWeight: 400;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.5;
    };
    readonly displayLarge: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "4rem";
        readonly fontWeight: 900;
        readonly letterSpacing: "-0.02em";
        readonly lineHeight: 1.2;
    };
    readonly displayMedium: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "3rem";
        readonly fontWeight: 900;
        readonly letterSpacing: "-0.02em";
        readonly lineHeight: 1.2;
    };
    readonly displaySmall: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "2.25rem";
        readonly fontWeight: 700;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.5;
    };
    readonly h1: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "2.5rem";
        readonly fontWeight: 700;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.5;
    };
    readonly h2: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "2rem";
        readonly fontWeight: 700;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.5;
    };
    readonly h3: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "1.75rem";
        readonly fontWeight: 700;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.5;
    };
    readonly h4: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "1.5rem";
        readonly fontWeight: 700;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.5;
    };
    readonly h5: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "1.25rem";
        readonly fontWeight: 600;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.5;
    };
    readonly h6: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "1.125rem";
        readonly fontWeight: 600;
        readonly letterSpacing: "0";
        readonly lineHeight: 1.5;
    };
    readonly label: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "0.875rem";
        readonly fontWeight: 500;
        readonly letterSpacing: "0.02em";
        readonly lineHeight: 1.5;
    };
    readonly labelLarge: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "1rem";
        readonly fontWeight: 500;
        readonly letterSpacing: "0.02em";
        readonly lineHeight: 1.5;
    };
    readonly labelSmall: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "0.75rem";
        readonly fontWeight: 500;
        readonly letterSpacing: "0.02em";
        readonly lineHeight: 1.5;
    };
    readonly overline: {
        readonly fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        readonly fontSize: "0.75rem";
        readonly fontWeight: 500;
        readonly letterSpacing: "0.02em";
        readonly lineHeight: 1.5;
        readonly textTransform: "uppercase";
    };
};

/**
 * Design System Token Types
 *
 * Type contracts for all design tokens.
 * Provides type safety, autocompletion, and structural types for createTokens overrides.
 */

type SpacingToken = keyof typeof spacing;
type ColorToken = keyof typeof color;
type ElevationToken = keyof typeof elevation;
type ShapeToken = keyof typeof shape;
type MotionToken = keyof typeof motion;
type FontFamilyToken = keyof typeof typography.family;
type FontSizeToken = keyof typeof typography.size;
type FontWeightToken = keyof typeof typography.weight;
type LineHeightToken = keyof typeof typography.leading;
type LetterSpacingToken = keyof typeof typography.tracking;
type BreakpointToken = keyof typeof layout.breakpoint;
type ContainerToken = keyof typeof layout.container;
type ZIndexToken = keyof typeof layout.zIndex;
type IconSizeToken = keyof typeof layout.icon;
type SpacingValue = (typeof spacing)[SpacingToken];
type ColorValue = (typeof color)[ColorToken];
type ElevationValue = (typeof elevation)[ElevationToken];
type ShapeValue = (typeof shape)[ShapeToken];
type MotionValue = (typeof motion)[MotionToken];
interface ColorTokens {
    readonly [key: string]: string;
}
interface TypographyFamilyTokens {
    readonly body: string;
    readonly display: string;
    readonly mono: string;
}
interface TypographyTokens {
    readonly family: TypographyFamilyTokens;
    readonly leading: typeof typography.leading;
    readonly size: typeof typography.size;
    readonly tracking: typeof typography.tracking;
    readonly weight: typeof typography.weight;
}
interface TokenOverrides {
    readonly color?: Partial<Record<ColorToken, string>>;
    readonly typography?: {
        readonly family?: Partial<TypographyFamilyTokens>;
        readonly size?: Partial<Record<FontSizeToken, string>>;
    };
}

/**
 * Token Factory
 *
 * Creates a customized token set by merging project-specific overrides
 * with agnostic defaults. Projects use this to set their brand colors
 * and typography without modifying the library.
 *
 * @example
 * ```typescript
 * import { createTokens } from 'sovereignty-ui/tokens';
 *
 * const { color, typography } = createTokens({
 *   color: {
 *     primary500: '#FFC107',
 *     secondary500: '#2196F3',
 *     accent500: '#FF00B2',
 *   },
 *   typography: {
 *     family: {
 *       body: "'Inter', sans-serif",
 *       display: "'Lato', sans-serif",
 *     },
 *   },
 * });
 * ```
 */

declare const createTokens: (overrides?: TokenOverrides) => {
    color: typeof color;
    typography: typeof typography;
};

/** Brand Palette Factory interfaces. */
interface BrandPaletteInput {
    /** Main action color — drives accent family (Button, Pagination, Tabs). */
    accent?: string;
    /** Primary family base (Badge "primary", focus rings, StatItem). */
    primary?: string;
    /** Secondary family base. */
    secondary?: string;
}

/**
 * Brand Palette Factory
 *
 * Expands a few brand base colors into a full SUI color-token override set by
 * generating a 50–900 shade scale (lighten toward white below 500, darken toward
 * black above 500). Agnostic: no project knowledge, pure color math.
 *
 * Pair with `injectSuiTokens` to theme all SUI components from a brand color:
 *
 * @example
 * ```typescript
 * import { createBrandPalette, injectSuiTokens } from '@dannydanzka/sovereignty-ui/tokens';
 *
 * const GlobalStyles = createGlobalStyle`
 *   :root { ${injectSuiTokens(createBrandPalette({ accent: '#8B0000', primary: '#8B0000' }))} }
 * `;
 * ```
 */

/**
 * Build SUI color-token overrides from brand base colors.
 * Only the families you pass are generated; everything else keeps library defaults.
 */
declare const createBrandPalette: (input: BrandPaletteInput) => TokenOverrides;

/**
 * CSS Variables Token Helpers
 *
 * Provides typed helper functions that wrap design tokens in CSS custom properties
 * with static fallbacks. This enables runtime theming without ThemeProvider:
 *
 *   BEFORE: color: ${color.textPrimary};           // hardcoded at build time
 *   AFTER:  color: ${c('textPrimary')};             // var(--sui-text-primary, #1A237E)
 *
 * Consumers override via :root { --sui-text-primary: #navy; }
 */

declare const toKebab: (str: string) => string;
/**
 * Color helper: c('textPrimary') → 'var(--sui-text-primary, #1A237E)'
 */
declare const c: (key: ColorToken) => string;
/**
 * Spacing helper: s('md') → 'var(--sui-spacing-md, 1.5rem)'
 */
declare const s: (key: SpacingToken) => string;
/**
 * Shape helper: sh('md') → 'var(--sui-shape-md, 0.5rem)'
 */
declare const sh: (key: ShapeToken) => string;
/**
 * Typography family: tf('body') → 'var(--sui-font-family-body, system-ui, ...)'
 */
declare const tf: (key: FontFamilyToken) => string;
/**
 * Typography size: ts('sm') → 'var(--sui-font-size-sm, 0.875rem)'
 */
declare const ts: (key: FontSizeToken) => string;
/**
 * Typography weight: tw('bold') → 'var(--sui-font-weight-bold, 700)'
 */
declare const tw: (key: FontWeightToken) => string;
/**
 * Typography leading: tl('relaxed') → 'var(--sui-leading-relaxed, 1.75)'
 */
declare const tl: (key: LineHeightToken) => string;
/**
 * Typography tracking: tt('wide') → 'var(--sui-tracking-wide, 0.02em)'
 */
declare const tt: (key: LetterSpacingToken) => string;
/**
 * Elevation helper: el('md') → 'var(--sui-elevation-md, 0 8px 24px ...)'
 */
declare const el: (key: ElevationToken) => string;
/**
 * Motion helper: mo('normal') → 'var(--sui-motion-normal, 250ms ease-in-out)'
 */
declare const mo: (key: MotionToken) => string;

/**
 * Token Injection for Consumer Projects
 *
 * Generates CSS variable declarations so consumer projects can theme SUI components.
 *
 * @example
 * import { injectSuiTokens } from '@dannydanzka/sovereignty-ui/tokens';
 *
 * const GlobalStyles = createGlobalStyle`
 *   :root {
 *     ${injectSuiTokens({ color: myProjectColors, typography: { family: myFonts } })}
 *   }
 * `;
 */

declare const injectSuiTokens: (overrides?: TokenOverrides) => string;

/**
 * Native Token Values + Runtime Registry
 *
 * React Native has no CSS custom properties, so the native token helpers
 * (css-variables.native.ts) resolve raw values from this registry instead of
 * emitting var() expressions. Values are px-based (1rem = 16px) because
 * css-to-react-native does not support rem/em/var().
 *
 * Pure module — no react-native imports — so it is unit-testable everywhere
 * and safe to export from the shared tokens barrel.
 */

declare const nativeSpacing: {
    readonly '2xl': "48px";
    readonly '3xl': "56px";
    readonly '4xl': "64px";
    readonly '5xl': "72px";
    readonly '6xl': "80px";
    readonly '7xl': "96px";
    readonly lg: "32px";
    readonly md: "24px";
    readonly micro: "4px";
    readonly sm: "16px";
    readonly xl: "40px";
    readonly xs: "8px";
};
declare const nativeShape: {
    readonly '2xl': "32px";
    readonly full: "9999px";
    readonly lg: "12px";
    readonly md: "8px";
    readonly none: "0px";
    readonly sm: "4px";
    readonly xl: "16px";
};
declare const nativeFontSize: {
    readonly '2xl': "24px";
    readonly '3xl': "28px";
    readonly '4xl': "32px";
    readonly '5xl': "36px";
    readonly '6xl': "40px";
    readonly '7xl': "48px";
    readonly '8xl': "64px";
    readonly base: "16px";
    readonly lg: "18px";
    readonly sm: "14px";
    readonly xl: "20px";
    readonly xs: "12px";
};
declare const nativeLeading: {
    readonly normal: "24px";
    readonly relaxed: "28px";
    readonly tight: "19px";
};
declare const nativeTracking: {
    readonly normal: "0px";
    readonly tight: "-0.32px";
    readonly wide: "0.32px";
};
declare const nativeFontFamily: {
    readonly body: "System";
    readonly display: "System";
    readonly mono: "Courier";
};
declare const nativeElevation: {
    readonly card: "0px 8px 12px rgba(0, 0, 0, 0.15)";
    readonly lg: "0px 20px 40px rgba(30, 58, 95, 0.12)";
    readonly md: "0px 8px 24px rgba(30, 58, 95, 0.12)";
    readonly none: "0px 0px 0px rgba(0, 0, 0, 0)";
    readonly sm: "0px 2px 8px rgba(30, 58, 95, 0.08)";
    readonly xl: "0px 30px 60px rgba(30, 58, 95, 0.16)";
};
declare const nativeMotion: {
    readonly fast: "0ms";
    readonly normal: "0ms";
    readonly slow: "0ms";
};
/**
 * Native counterpart of injectSuiTokens(): merges brand overrides into the
 * runtime registry consumed by the native token helpers. Call once at app
 * startup, before rendering SUI components.
 */
declare const setSuiTokens: (overrides?: TokenOverrides) => void;
/** Restore registry defaults (mainly for tests). */
declare const resetSuiTokens: () => void;
declare const getNativeColor: (key: string) => string;
declare const getNativeFamily: (key: string) => string;
declare const getNativeSize: (key: string) => string;
declare const nativeWeight: {
    readonly black: 900;
    readonly bold: 700;
    readonly medium: 500;
    readonly regular: 400;
    readonly semibold: 600;
};

export { type BrandPaletteInput, type BreakpointToken, type ColorToken, type ColorTokens, type ColorValue, type ContainerToken, type ElevationToken, type ElevationValue, type FontFamilyToken, type FontSizeToken, type FontWeightToken, type IconSizeToken, type LetterSpacingToken, type LineHeightToken, type MotionToken, type MotionValue, type ShapeToken, type ShapeValue, type SpacingToken, type SpacingValue, type TokenOverrides, type TypographyFamilyTokens, type TypographyTokens, type ZIndexToken, c, color, createBrandPalette, createTokens, el, elevation, getNativeColor, getNativeFamily, getNativeSize, injectSuiTokens, layout, mo, motion, nativeElevation, nativeFontFamily, nativeFontSize, nativeLeading, nativeMotion, nativeShape, nativeSpacing, nativeTracking, nativeWeight, resetSuiTokens, s, setSuiTokens, sh, shape, spacing, textPreset, tf, tl, toKebab, ts, tt, tw, typography };
