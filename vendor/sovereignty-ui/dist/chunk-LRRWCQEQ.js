// src/tokens/tokens.ts
var spacing = {
  "2xl": "3rem",
  "3xl": "3.5rem",
  "4xl": "4rem",
  "5xl": "4.5rem",
  "6xl": "5rem",
  "7xl": "6rem",
  lg: "2rem",
  md: "1.5rem",
  micro: "0.25rem",
  sm: "1rem",
  xl: "2.5rem",
  xs: "0.5rem"
};
var color = {
  accent100: "#F8BBD9",
  accent200: "#F48FB1",
  accent50: "#FCE4EC",
  accent500: "#FF4081",
  accent600: "#D81B60",
  accent700: "#C2185B",
  background: "#FFFFFF",
  backgroundAlt: "#FFF9E6",
  backgroundDark: "#F5F7FA",
  backgroundInverse: "#1A237E",
  black: "#000000",
  blackRgb: "0, 0, 0",
  border: "#E4E9F0",
  borderDark: "#C5D0DE",
  borderLight: "#F5F7FA",
  cyan400: "#22D3EE",
  cyan500: "#06B6D4",
  cyan600: "#0891B2",
  dark100: "#374151",
  dark200: "#1F2937",
  dark300: "#111827",
  error: "#F44336",
  errorBackground: "#FFEBEE",
  errorBorder: "#FFCDD2",
  errorDark: "#D32F2F",
  errorFocusShadow: "rgba(244, 67, 54, 0.1)",
  errorLight: "#E57373",
  info: "#2196F3",
  infoDark: "#1976D2",
  infoLight: "#64B5F6",
  magenta400: "#F472B6",
  magenta500: "#EC4899",
  modalOverlay: "rgba(30, 58, 95, 0.6)",
  neutral0: "#FFFFFF",
  neutral100: "#E4E9F0",
  neutral200: "#C5D0DE",
  neutral300: "#A6B7CB",
  neutral400: "#8FA3BC",
  neutral50: "#F5F7FA",
  neutral500: "#7890AD",
  neutral600: "#6583A0",
  neutral700: "#4D7190",
  neutral800: "#3B5F80",
  neutral900: "#1E3A5F",
  overlay: "rgba(26, 35, 126, 0.5)",
  overlayDark: "rgba(26, 35, 126, 0.7)",
  overlayLight: "rgba(26, 35, 126, 0.3)",
  primary100: "#FFF9C4",
  primary200: "#FFF176",
  primary300: "#FFEE58",
  primary400: "#FDD835",
  primary50: "#FFFBEB",
  primary500: "#FFC107",
  primary600: "#FFB300",
  primary700: "#FFA000",
  primary800: "#FF8F00",
  primary900: "#FF6F00",
  primaryFocusShadow: "rgba(255, 193, 7, 0.1)",
  purple400: "#A78BFA",
  purple500: "#8B5CF6",
  purple600: "#7C3AED",
  secondary100: "#BBDEFB",
  secondary200: "#90CAF9",
  secondary300: "#64B5F6",
  secondary400: "#42A5F5",
  secondary50: "#E3F2FD",
  secondary500: "#2196F3",
  secondary600: "#1E88E5",
  secondary700: "#1976D2",
  secondary800: "#1565C0",
  secondary900: "#0D47A1",
  success: "#4CAF50",
  successBackground: "#E8F5E9",
  successDark: "#388E3C",
  successLight: "#81C784",
  surface: "#FFFFFF",
  teal500: "#00C4AD",
  tealRgb: "0, 196, 173",
  tertiary100: "#F8BBD9",
  tertiary200: "#F48FB1",
  tertiary300: "#F06292",
  tertiary400: "#EC407A",
  tertiary50: "#FCE4EC",
  tertiary500: "#FF4081",
  tertiary600: "#D81B60",
  tertiary700: "#C2185B",
  tertiary800: "#AD1457",
  tertiary900: "#880E4F",
  textAccent: "#FF4081",
  textDisabled: "#A0AEC0",
  textInverse: "#FFFFFF",
  textPrimary: "#1A237E",
  textSecondary: "#4A5568",
  textTertiary: "#718096",
  transparent: "transparent",
  warning: "#FF9800",
  warningBackground: "#FFF8E1",
  warningDark: "#F57C00",
  warningLight: "#FFB74D",
  white: "#FFFFFF",
  whiteRgb: "255, 255, 255"
};
var typography = {
  family: {
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    display: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'Courier New', monospace"
  },
  leading: {
    normal: 1.5,
    relaxed: 1.75,
    tight: 1.2
  },
  size: {
    "2xl": "1.5rem",
    "3xl": "1.75rem",
    "4xl": "2rem",
    "5xl": "2.25rem",
    "6xl": "2.5rem",
    "7xl": "3rem",
    "8xl": "4rem",
    base: "1rem",
    lg: "1.125rem",
    sm: "0.875rem",
    xl: "1.25rem",
    xs: "0.75rem"
  },
  tracking: {
    normal: "0",
    tight: "-0.02em",
    wide: "0.02em"
  },
  weight: {
    black: 900,
    bold: 700,
    medium: 500,
    regular: 400,
    semibold: 600
  }
};
var elevation = {
  card: "0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)",
  lg: "0 20px 40px rgba(30, 58, 95, 0.12)",
  md: "0 8px 24px rgba(30, 58, 95, 0.12)",
  none: "none",
  sm: "0 2px 8px rgba(30, 58, 95, 0.08)",
  xl: "0 30px 60px rgba(30, 58, 95, 0.16)"
};
var shape = {
  "2xl": "2rem",
  full: "9999px",
  lg: "0.75rem",
  md: "0.5rem",
  none: "0",
  sm: "0.25rem",
  xl: "1rem"
};
var motion = {
  fast: "150ms ease-in-out",
  normal: "250ms ease-in-out",
  slow: "400ms ease-in-out"
};
var layout = {
  breakpoint: {
    "2xl": "1536px",
    lg: "1024px",
    md: "768px",
    sm: "640px",
    xl: "1280px"
  },
  container: {
    lg: "1200px",
    md: "1000px",
    sm: "800px"
  },
  contentMaxWidth: "600px",
  heroMinHeight: "500px",
  heroMinHeightLg: "600px",
  icon: {
    lg: "24px",
    md: "20px",
    sm: "16px",
    xl: "32px"
  },
  illustrationMaxHeightSm: "300px",
  sectionMaxWidth: "1200px",
  zIndex: {
    base: 0,
    dropdown: 100,
    fixed: 300,
    modal: 500,
    overlay: 400,
    popover: 600,
    sticky: 200,
    toast: 700
  }
};

// src/tokens/presets.ts
var textPreset = {
  body: {
    fontFamily: typography.family.body,
    fontSize: typography.size.base,
    fontWeight: typography.weight.regular,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.relaxed
  },
  bodyLarge: {
    fontFamily: typography.family.body,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.regular,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.relaxed
  },
  bodySmall: {
    fontFamily: typography.family.body,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.regular,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.relaxed
  },
  button: {
    fontFamily: typography.family.display,
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    letterSpacing: typography.tracking.wide,
    lineHeight: typography.leading.normal
  },
  buttonLarge: {
    fontFamily: typography.family.display,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    letterSpacing: typography.tracking.wide,
    lineHeight: typography.leading.normal
  },
  buttonSmall: {
    fontFamily: typography.family.display,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.wide,
    lineHeight: typography.leading.normal
  },
  caption: {
    fontFamily: typography.family.body,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.regular,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.normal
  },
  displayLarge: {
    fontFamily: typography.family.display,
    fontSize: typography.size["8xl"],
    fontWeight: typography.weight.black,
    letterSpacing: typography.tracking.tight,
    lineHeight: typography.leading.tight
  },
  displayMedium: {
    fontFamily: typography.family.display,
    fontSize: typography.size["7xl"],
    fontWeight: typography.weight.black,
    letterSpacing: typography.tracking.tight,
    lineHeight: typography.leading.tight
  },
  displaySmall: {
    fontFamily: typography.family.display,
    fontSize: typography.size["5xl"],
    fontWeight: typography.weight.bold,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.normal
  },
  h1: {
    fontFamily: typography.family.display,
    fontSize: typography.size["6xl"],
    fontWeight: typography.weight.bold,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.normal
  },
  h2: {
    fontFamily: typography.family.display,
    fontSize: typography.size["4xl"],
    fontWeight: typography.weight.bold,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.normal
  },
  h3: {
    fontFamily: typography.family.display,
    fontSize: typography.size["3xl"],
    fontWeight: typography.weight.bold,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.normal
  },
  h4: {
    fontFamily: typography.family.display,
    fontSize: typography.size["2xl"],
    fontWeight: typography.weight.bold,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.normal
  },
  h5: {
    fontFamily: typography.family.display,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.normal
  },
  h6: {
    fontFamily: typography.family.display,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    letterSpacing: typography.tracking.normal,
    lineHeight: typography.leading.normal
  },
  label: {
    fontFamily: typography.family.body,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    letterSpacing: typography.tracking.wide,
    lineHeight: typography.leading.normal
  },
  labelLarge: {
    fontFamily: typography.family.body,
    fontSize: typography.size.base,
    fontWeight: typography.weight.medium,
    letterSpacing: typography.tracking.wide,
    lineHeight: typography.leading.normal
  },
  labelSmall: {
    fontFamily: typography.family.body,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    letterSpacing: typography.tracking.wide,
    lineHeight: typography.leading.normal
  },
  overline: {
    fontFamily: typography.family.body,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    letterSpacing: typography.tracking.wide,
    lineHeight: typography.leading.normal,
    textTransform: "uppercase"
  }
};

// src/tokens/create-tokens.ts
var createTokens = (overrides = {}) => ({
  color: {
    ...color,
    ...overrides.color
  },
  typography: {
    ...typography,
    family: {
      ...typography.family,
      ...overrides.typography?.family
    }
  }
});

// src/tokens/create-brand-palette.constants.ts
var SHADE_AMOUNT = {
  50: 0.92,
  100: 0.8,
  200: 0.6,
  300: 0.4,
  400: 0.2,
  500: 0,
  600: -0.12,
  700: -0.24,
  800: -0.38,
  900: -0.52
};
var FULL_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
var ACCENT_STEPS = [50, 100, 200, 500, 600, 700];

// src/tokens/create-brand-palette.ts
var clampChannel = (value) => Math.max(0, Math.min(255, Math.round(value)));
var hexToRgb = (hex) => {
  const normalized = hex.trim().replace(/^#/, "");
  const full = normalized.length === 3 ? normalized.split("").map((ch) => ch + ch).join("") : normalized;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    throw new Error(`createBrandPalette: invalid hex color "${hex}"`);
  }
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16)
  ];
};
var rgbToHex = ([r, g, b]) => `#${[r, g, b].map((n) => clampChannel(n).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
var mix = (base, target, amount) => [
  base[0] + (target[0] - base[0]) * amount,
  base[1] + (target[1] - base[1]) * amount,
  base[2] + (target[2] - base[2]) * amount
];
var WHITE = [255, 255, 255];
var BLACK = [0, 0, 0];
var shadeForStep = (base, step) => {
  const amount = SHADE_AMOUNT[step] ?? 0;
  if (amount === 0) return rgbToHex(base);
  return rgbToHex(amount > 0 ? mix(base, WHITE, amount) : mix(base, BLACK, -amount));
};
var familyScale = (prefix, baseHex, steps) => {
  const base = hexToRgb(baseHex);
  const out = {};
  for (const step of steps) {
    out[`${prefix}${step}`] = shadeForStep(base, step);
  }
  return out;
};
var createBrandPalette = (input) => {
  const color2 = {};
  if (input.accent) Object.assign(color2, familyScale("accent", input.accent, ACCENT_STEPS));
  if (input.primary) {
    Object.assign(color2, familyScale("primary", input.primary, FULL_STEPS));
    const [r, g, b] = hexToRgb(input.primary);
    color2["primaryFocusShadow"] = `rgba(${r}, ${g}, ${b}, 0.1)`;
  }
  if (input.secondary) {
    Object.assign(color2, familyScale("secondary", input.secondary, FULL_STEPS));
  }
  return { color: color2 };
};

// src/tokens/css-variables.ts
var toKebab = (str) => str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/(\d+)/g, "-$1").toLowerCase().replace(/^-/, "");
var c = (key) => `var(--sui-${toKebab(key)}, ${color[key]})`;
var s = (key) => `var(--sui-spacing-${key}, ${spacing[key]})`;
var sh = (key) => `var(--sui-shape-${key}, ${shape[key]})`;
var tf = (key) => `var(--sui-font-family-${key}, ${typography.family[key]})`;
var ts = (key) => `var(--sui-font-size-${key}, ${typography.size[key]})`;
var tw = (key) => `var(--sui-font-weight-${key}, ${typography.weight[key]})`;
var tl = (key) => `var(--sui-leading-${key}, ${typography.leading[key]})`;
var tt = (key) => `var(--sui-tracking-${key}, ${typography.tracking[key]})`;
var el = (key) => `var(--sui-elevation-${key}, ${elevation[key]})`;
var mo = (key) => `var(--sui-motion-${key}, ${motion[key]})`;

// src/tokens/inject.ts
var injectSuiTokens = (overrides = {}) => {
  const mergedColor = { ...color, ...overrides.color };
  const mergedFamily = { ...typography.family, ...overrides.typography?.family };
  const colorVars = Object.entries(mergedColor).map(([key, val]) => `--sui-${toKebab(key)}: ${val};`).join("\n    ");
  const familyVars = Object.entries(mergedFamily).map(([key, val]) => `--sui-font-family-${key}: ${val};`).join("\n    ");
  const sizeVars = Object.entries({ ...typography.size, ...overrides.typography?.size }).map(([key, val]) => `--sui-font-size-${key}: ${val};`).join("\n    ");
  const weightVars = Object.entries(typography.weight).map(([key, val]) => `--sui-font-weight-${key}: ${val};`).join("\n    ");
  const leadingVars = Object.entries(typography.leading).map(([key, val]) => `--sui-leading-${key}: ${val};`).join("\n    ");
  const trackingVars = Object.entries(typography.tracking).map(([key, val]) => `--sui-tracking-${key}: ${val};`).join("\n    ");
  const spacingVars = Object.entries(spacing).map(([key, val]) => `--sui-spacing-${key}: ${val};`).join("\n    ");
  const shapeVars = Object.entries(shape).map(([key, val]) => `--sui-shape-${key}: ${val};`).join("\n    ");
  const elevationVars = Object.entries(elevation).map(([key, val]) => `--sui-elevation-${key}: ${val};`).join("\n    ");
  const motionVars = Object.entries(motion).map(([key, val]) => `--sui-motion-${key}: ${val};`).join("\n    ");
  return [
    colorVars,
    familyVars,
    sizeVars,
    weightVars,
    leadingVars,
    trackingVars,
    spacingVars,
    shapeVars,
    elevationVars,
    motionVars
  ].join("\n    ");
};

// src/tokens/native-values.ts
var nativeSpacing = {
  "2xl": "48px",
  "3xl": "56px",
  "4xl": "64px",
  "5xl": "72px",
  "6xl": "80px",
  "7xl": "96px",
  lg: "32px",
  md: "24px",
  micro: "4px",
  sm: "16px",
  xl: "40px",
  xs: "8px"
};
var nativeShape = {
  "2xl": "32px",
  full: "9999px",
  lg: "12px",
  md: "8px",
  none: "0px",
  sm: "4px",
  xl: "16px"
};
var nativeFontSize = {
  "2xl": "24px",
  "3xl": "28px",
  "4xl": "32px",
  "5xl": "36px",
  "6xl": "40px",
  "7xl": "48px",
  "8xl": "64px",
  base: "16px",
  lg: "18px",
  sm: "14px",
  xl: "20px",
  xs: "12px"
};
var nativeLeading = {
  normal: "24px",
  relaxed: "28px",
  tight: "19px"
};
var nativeTracking = {
  normal: "0px",
  tight: "-0.32px",
  wide: "0.32px"
};
var nativeFontFamily = {
  body: "System",
  display: "System",
  mono: "Courier"
};
var nativeElevation = {
  card: "0px 8px 12px rgba(0, 0, 0, 0.15)",
  lg: "0px 20px 40px rgba(30, 58, 95, 0.12)",
  md: "0px 8px 24px rgba(30, 58, 95, 0.12)",
  none: "0px 0px 0px rgba(0, 0, 0, 0)",
  sm: "0px 2px 8px rgba(30, 58, 95, 0.08)",
  xl: "0px 30px 60px rgba(30, 58, 95, 0.16)"
};
var nativeMotion = {
  fast: "0ms",
  normal: "0ms",
  slow: "0ms"
};
var defaultState = () => ({
  color: { ...color },
  family: { ...nativeFontFamily },
  size: { ...nativeFontSize }
});
var state = defaultState();
var setSuiTokens = (overrides = {}) => {
  if (overrides.color) {
    state.color = { ...state.color, ...overrides.color };
  }
  if (overrides.typography?.family) {
    state.family = { ...state.family, ...overrides.typography.family };
  }
  if (overrides.typography?.size) {
    state.size = { ...state.size, ...overrides.typography.size };
  }
};
var resetSuiTokens = () => {
  state = defaultState();
};
var getNativeColor = (key) => state.color[key] ?? color[key] ?? "transparent";
var getNativeFamily = (key) => state.family[key] ?? nativeFontFamily.body;
var getNativeSize = (key) => state.size[key] ?? nativeFontSize.base;
var nativeWeight = typography.weight;

export { c, color, createBrandPalette, createTokens, el, elevation, getNativeColor, getNativeFamily, getNativeSize, injectSuiTokens, layout, mo, motion, nativeElevation, nativeFontFamily, nativeFontSize, nativeLeading, nativeMotion, nativeShape, nativeSpacing, nativeTracking, nativeWeight, resetSuiTokens, s, setSuiTokens, sh, shape, spacing, textPreset, tf, tl, toKebab, ts, tt, tw, typography };
//# sourceMappingURL=chunk-LRRWCQEQ.js.map
//# sourceMappingURL=chunk-LRRWCQEQ.js.map