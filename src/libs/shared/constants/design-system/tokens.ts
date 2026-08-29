/**
 * Design System Tokens
 *
 * Unified design token system following:
 * - Material Design 3 (Google)
 * - Apple Human Interface Guidelines
 * - 8-Point Grid System
 * - Tailwind CSS naming conventions
 *
 * SSR-safe: All exports are flat objects (no theme context required)
 *
 * @see ~/.claude/standards/DESIGN-SYSTEM-STANDARDS.md
 * @see ~/.claude/patterns/design-system-patterns.md
 */

export const spacing = {
  '2xl': '3rem',
  '3xl': '3.5rem',
  '4xl': '4rem',
  '5xl': '4.5rem',
  '6xl': '5rem',
  '7xl': '6rem',
  lg: '2rem',
  md: '1.5rem',
  micro: '0.25rem',
  sm: '1rem',
  xl: '2.5rem',
  xs: '0.5rem',
} as const;

/**
 * Agnostic Color Tokens
 *
 * Framework-level colors that can be reused across any project.
 * Includes: palettes, status colors, semantic colors, neutrals.
 */
export const color = {
  accent100: '#F9D6CB',
  accent200: '#F3B3A0',
  accent50: '#FCEBE5',
  accent500: '#E15D3B',
  accent600: '#C94E2F',
  accent700: '#AB4127',
  background: '#FEFBF3',
  backgroundAlt: '#F7EDD8',
  backgroundDark: '#F3EBDA',
  backgroundInverse: '#305233',
  black: '#000000',
  blackRgb: '0, 0, 0',
  border: '#E6D9BF',
  borderDark: '#CDBB97',
  borderLight: '#F3EBDA',
  cyan400: '#22D3EE',
  cyan500: '#06B6D4',
  cyan600: '#0891B2',
  dark100: '#374151',
  dark200: '#1F2937',
  dark300: '#111827',
  error: '#F44336',
  errorBackground: '#FFEBEE',
  errorBorder: '#FFCDD2',
  errorDark: '#D32F2F',
  errorLight: '#E57373',
  indigo500: '#6366F1',
  info: '#2196F3',
  infoDark: '#1976D2',
  infoLight: '#64B5F6',
  magenta400: '#F472B6',
  magenta500: '#EC4899',
  neutral0: '#FFFFFF',
  neutral100: '#EFE6D2',
  neutral200: '#DDB16F',
  neutral300: '#C9A466',
  neutral400: '#A98A55',
  neutral50: '#F7F1E3',
  neutral500: '#8C7048',
  neutral600: '#6F5A38',
  neutral700: '#5E4A2A',
  neutral800: '#503A1C',
  neutral900: '#3A2A14',
  overlay: 'rgba(80, 58, 28, 0.5)',
  overlayDark: 'rgba(80, 58, 28, 0.7)',
  overlayLight: 'rgba(80, 58, 28, 0.3)',
  primary100: '#FBEBD0',
  primary200: '#F6D9A6',
  primary300: '#F0C67C',
  primary400: '#EAB05A',
  primary50: '#FDF6E8',
  primary500: '#E39B38',
  primary600: '#CF8A2C',
  primary700: '#B87724',
  primary800: '#9C641D',
  primary900: '#7E5017',
  purple400: '#A78BFA',
  purple500: '#8B5CF6',
  purple600: '#7C3AED',
  secondary100: '#D6E2D5',
  secondary200: '#B3C8B2',
  secondary300: '#8FAD8F',
  secondary400: '#6C9070',
  secondary50: '#EBF1EA',
  secondary500: '#4F7452',
  secondary600: '#305233',
  secondary700: '#28452B',
  secondary800: '#203823',
  secondary900: '#172A1A',
  success: '#4CAF50',
  successBackground: '#E8F5E9',
  successDark: '#388E3C',
  successLight: '#81C784',
  surface: '#FFFFFF',
  teal500: '#00C4AD',
  tealRgb: '0, 196, 173',
  tertiary100: '#F9D6CB',
  tertiary200: '#F3B3A0',
  tertiary300: '#EC8F74',
  tertiary400: '#E67456',
  tertiary50: '#FCEBE5',
  tertiary500: '#E15D3B',
  tertiary600: '#C94E2F',
  tertiary700: '#AB4127',
  tertiary800: '#8C3520',
  tertiary900: '#6E2A19',
  textAccent: '#E15D3B',
  textDisabled: '#B5A78C',
  textInverse: '#FFFFFF',
  textPrimary: '#503A1C',
  textSecondary: '#6F5A38',
  textTertiary: '#8C7048',
  transparent: 'transparent',
  warning: '#FF9800',
  warningBackground: '#FFF8E1',
  warningDark: '#F57C00',
  warningLight: '#FFB74D',
  white: '#FFFFFF',
  whiteRgb: '255, 255, 255',
} as const;

/**
 * Brand Color Tokens
 *
 * Business-specific colors for Coti project. The legacy `landing*` / `bg*`
 * names are kept for compatibility but every value is mapped to the Coti
 * palette (`assets/branding/README.md`): forest, brown, coral, mustard,
 * sand and cream. Prefer the `coti*` tokens for new code.
 */
export const brandColor = {
  alertBg: '#FBEBD0',
  alertIconBg: '#E39B38',
  alertIconFg: '#FFFFFF',
  bgButtonsCta: '#F7EDD8',
  bgCauseYellow: '#F6D9A6',
  bgFooterCTA: '#F7EDD8',
  bgHeader: '#F7EDD8',
  bgMissionBlue: '#305233',
  bgPricingBody: '#FBEBD0',
  bgPricingHeader: '#305233',
  bgStepsPink: '#FCEBE5',
  categoryComunidad: '#FFC107',
  categoryComunidadBg: '#FFF8E1',
  categoryEquipo: '#4CAF50',
  categoryEquipoBg: '#E8F5E9',
  categoryEventos: '#1565C0',
  categoryEventosBg: '#E3F2FD',
  categoryKits: '#E91E63',
  categoryKitsBg: '#FCE4EC',
  faqEventos: '#1565C0',
  faqEventosBg: '#E3F2FD',
  faqGeneral: '#6366F1',
  faqGeneralBg: '#EEF2FF',
  faqKits: '#E91E63',
  faqKitsBg: '#FCE4EC',
  faqPagos: '#4CAF50',
  faqPagosBg: '#E8F5E9',
  landingBgCream: '#FEFBF3',
  landingBgCreamAlt: '#F7EDD8',
  landingBgCreamWarm: '#F3E3C4',
  landingBgSage: '#D6E2D5',
  landingBgSand: '#DDB16F',
  landingBgSkyBlue: '#8FAD8F',
  landingBgYellow: '#F7EDD8',
  landingBlueDark: '#305233',
  landingBlueLight: '#B3C8B2',
  landingOrange: '#E15D3B',
  landingOrangeDark: '#C94E2F',
  landingPinkLight: '#F3B3A0',
  landingPinkRgb: '225, 93, 59',
  landingPinkVibrant: '#E15D3B',
  landingTextBody: '#5E4A2A',
  landingTextDark: '#503A1C',
  landingTextGray: '#6F5A38',
  landingYellowIntense: '#E39B38',
  signupSuccessBg: '#EBF1EA',

  /**
   * Paleta de marca de Coti — fuente de verdad: `assets/branding/README.md`.
   * Úsala para todo lo nuevo; el resto de este bloque es paleta heredada.
   */
  cotiBrown: '#503A1C',
  cotiCoral: '#E15D3B',
  cotiCream: '#FEFBF3',
  cotiForest: '#305233',
  cotiMustard: '#E39B38',
  cotiSand: '#DDB16F',
} as const;

export const typography = {
  family: {
    body: "var(--font-inter), 'Inter', sans-serif",
    display: "'Lato', sans-serif",
    mono: "'Courier New', monospace",
    rounded: "var(--font-rounded), 'Fredoka', 'Lato', sans-serif" /** Logotipo y titulares hero. */,
  },
  leading: {
    normal: 1.5,
    relaxed: 1.75,
    tight: 1.2,
  },
  size: {
    '10xl': '7rem',
    '11xl': '8.5rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    '4xl': '2rem',
    '5xl': '2.25rem',
    '6xl': '2.5rem',
    '7xl': '3rem',
    '8xl': '4rem',
    '9xl': '5.5rem',
    base: '1rem',
    lg: '1.125rem',
    sm: '0.875rem',
    xl: '1.25rem',
    xs: '0.75rem',
  },
  tracking: {
    normal: '0',
    tight: '-0.02em',
    wide: '0.02em',
  },
  weight: {
    black: 900,
    bold: 700,
    medium: 500,
    regular: 400,
    semibold: 600,
  },
} as const;

export const elevation = {
  card: '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
  lg: '0 20px 40px rgba(80, 58, 28, 0.12)',
  md: '0 8px 24px rgba(80, 58, 28, 0.12)',
  none: 'none',
  sm: '0 2px 8px rgba(80, 58, 28, 0.08)',
  soil: '0 -10px 22px -6px rgba(91, 75, 59, 0.35)' /** Warm upward "soil" line under the floor plants. */,
  xl: '0 30px 60px rgba(80, 58, 28, 0.16)',
} as const;

export const shape = {
  '2xl': '2rem',
  full: '9999px',
  lg: '0.75rem',
  md: '0.5rem',
  none: '0',
  sm: '0.25rem',
  xl: '1rem',
} as const;

export const motion = {
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '400ms ease-in-out',
} as const;

export const layout = {
  breakpoint: {
    '2xl': '1536px',
    lg: '1024px',
    md: '768px',
    sm: '640px',
    xl: '1280px',
  },
  container: {
    lg: '1200px',
    md: '1000px',
    sm: '800px',
  },
  contentMaxWidth: '600px',
  heroMinHeight: '500px',
  heroMinHeightLg: '600px',
  icon: {
    lg: '24px',
    md: '20px',
    sm: '16px',
    xl: '32px',
  },
  illustrationMaxHeightSm: '300px',
  sectionMaxWidth: '1200px',
  zIndex: {
    base: 0,
    dropdown: 100,
    fixed: 300,
    modal: 500,
    overlay: 400,
    popover: 600,
    sticky: 200,
    toast: 700,
  },
} as const;
