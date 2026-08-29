'use strict';

var chunkBNRFVIDY_cjs = require('./chunk-BNRFVIDY.cjs');
var chunkKKTUNDGG_cjs = require('./chunk-KKTUNDGG.cjs');
var chunkCV5S7LZ7_cjs = require('./chunk-CV5S7LZ7.cjs');
var lucideReact = require('lucide-react');
var styled56 = require('styled-components');
var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var styled56__default = /*#__PURE__*/_interopDefault(styled56);

var spin = styled56.keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var buttonSize = ($size) => $size === "sm" ? chunkKKTUNDGG_cjs.s("md") : chunkKKTUNDGG_cjs.s("lg");
var background = ($variant) => {
  if ($variant === "view") return chunkKKTUNDGG_cjs.c("infoLight");
  if ($variant === "edit") return chunkKKTUNDGG_cjs.c("warningBackground");
  if ($variant === "delete") return chunkKKTUNDGG_cjs.c("errorBackground");
  return chunkKKTUNDGG_cjs.c("backgroundAlt");
};
var foreground = ($variant) => {
  if ($variant === "view") return chunkKKTUNDGG_cjs.c("infoDark");
  if ($variant === "edit") return chunkKKTUNDGG_cjs.c("warningDark");
  if ($variant === "delete") return chunkKKTUNDGG_cjs.c("errorDark");
  return chunkKKTUNDGG_cjs.c("textSecondary");
};
var StyledActionButton = styled56__default.default.button`
  align-items: center;
  background: ${({ $variant }) => background($variant)};
  border: none;
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${({ $variant }) => foreground($variant)};
  cursor: ${({ $isLoading }) => $isLoading ? "wait" : "pointer"};
  display: inline-flex;
  height: ${({ $size }) => buttonSize($size)};
  justify-content: center;
  min-width: ${({ $size }) => buttonSize($size)};
  padding: 0;
  transition: filter 0.2s ease;
  width: ${({ $size }) => buttonSize($size)};

  &:hover:not(:disabled) {
    filter: brightness(0.92);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
var SpinnerIcon = styled56__default.default.span`
  animation: ${spin} 1s linear infinite;
  display: inline-flex;
`;
var ActionButton = ({
  className,
  disabled = false,
  icon,
  isLoading = false,
  onClick,
  size = "sm",
  title,
  variant = "neutral"
}) => {
  const iconSize = size === "sm" ? 14 : 16;
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledActionButton,
    {
      $isLoading: isLoading,
      $size: size,
      $variant: variant,
      "aria-label": title,
      className,
      disabled,
      title,
      type: "button",
      onClick: isLoading ? void 0 : onClick,
      children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(SpinnerIcon, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { size: iconSize }) }) : icon
    }
  );
};
var VARIANT_COLORS = {
  error: { bg: chunkKKTUNDGG_cjs.c("errorBackground"), border: chunkKKTUNDGG_cjs.c("errorBorder"), icon: chunkKKTUNDGG_cjs.c("error") },
  info: { bg: chunkKKTUNDGG_cjs.c("secondary50"), border: chunkKKTUNDGG_cjs.c("secondary200"), icon: chunkKKTUNDGG_cjs.c("info") },
  success: { bg: chunkKKTUNDGG_cjs.c("successBackground"), border: chunkKKTUNDGG_cjs.c("successLight"), icon: chunkKKTUNDGG_cjs.c("success") },
  warning: { bg: chunkKKTUNDGG_cjs.c("warningBackground"), border: chunkKKTUNDGG_cjs.c("warningLight"), icon: chunkKKTUNDGG_cjs.c("warning") }
};
var AlertContainer = styled56__default.default.div`
  background-color: ${({ $variant }) => VARIANT_COLORS[$variant].bg};
  border: 1px solid ${({ $variant }) => VARIANT_COLORS[$variant].border};
  border-left: 4px solid ${({ $variant }) => VARIANT_COLORS[$variant].icon};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  padding: ${chunkKKTUNDGG_cjs.s("sm")} ${chunkKKTUNDGG_cjs.s("md")};
`;
var AlertIcon = styled56__default.default.div`
  color: ${({ $variant }) => VARIANT_COLORS[$variant].icon};
  flex-shrink: 0;
  margin-top: 2px;
`;
var AlertBody = styled56__default.default.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
`;
var AlertTitle = styled56__default.default.strong`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
`;
var AlertMessage = styled56__default.default.div`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: ${chunkKKTUNDGG_cjs.tl("relaxed")};
`;
var AlertDismiss = styled56__default.default.button`
  background: none;
  border: none;
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: color 0.15s ease;

  &:hover {
    color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  }
`;
var DEFAULT_ICONS = {
  error: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertCircle, { size: 20 }),
  info: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Info, { size: 20 }),
  success: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckCircle, { size: 20 }),
  warning: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertTriangle, { size: 20 })
};
var Alert = ({
  children,
  className,
  icon,
  onDismiss,
  title,
  variant = "info"
}) => /* @__PURE__ */ jsxRuntime.jsxs(AlertContainer, { $variant: variant, className, "data-testid": "alert", role: "alert", children: [
  /* @__PURE__ */ jsxRuntime.jsx(AlertIcon, { $variant: variant, children: icon ?? DEFAULT_ICONS[variant] }),
  /* @__PURE__ */ jsxRuntime.jsxs(AlertBody, { children: [
    title && /* @__PURE__ */ jsxRuntime.jsx(AlertTitle, { children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(AlertMessage, { children })
  ] }),
  onDismiss && /* @__PURE__ */ jsxRuntime.jsx(AlertDismiss, { "aria-label": "Dismiss", onClick: onDismiss, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 16 }) })
] });
var SIZE_MAP = {
  lg: "48px",
  md: "40px",
  sm: "32px",
  xl: "64px"
};
var FONT_MAP = {
  lg: chunkKKTUNDGG_cjs.ts("lg"),
  md: chunkKKTUNDGG_cjs.ts("base"),
  sm: chunkKKTUNDGG_cjs.ts("xs"),
  xl: chunkKKTUNDGG_cjs.ts("2xl")
};
var AvatarContainer = styled56__default.default.div`
  align-items: center;
  background-color: ${chunkKKTUNDGG_cjs.c("primary200")};
  border-radius: 50%;
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  display: inline-flex;
  flex-shrink: 0;
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${({ $size }) => FONT_MAP[$size]};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  height: ${({ $size }) => SIZE_MAP[$size]};
  justify-content: center;
  overflow: hidden;
  width: ${({ $size }) => SIZE_MAP[$size]};
`;
var AvatarImage = styled56__default.default.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
var AvatarInitials = styled56__default.default.span`
  font-size: inherit;
`;
var getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }
  return (name[0] ?? "?").toUpperCase();
};
var Avatar = ({ alt, className, name, size = "md", src }) => {
  const [hasError, setHasError] = react.useState(false);
  const handleError = react.useCallback(() => {
    setHasError(true);
  }, []);
  const showImage = src && !hasError;
  return /* @__PURE__ */ jsxRuntime.jsx(AvatarContainer, { $size: size, className, "data-testid": "avatar", children: showImage ? /* @__PURE__ */ jsxRuntime.jsx(AvatarImage, { alt: alt ?? name ?? "Avatar", src, onError: handleError }) : /* @__PURE__ */ jsxRuntime.jsx(AvatarInitials, { $size: size, children: getInitials(name) }) });
};
var getVariantStyles = ($variant) => {
  switch ($variant) {
    case "primary":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("primary100")};
        color: ${chunkKKTUNDGG_cjs.c("primary700")};
      `;
    case "success":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("successBackground")};
        color: ${chunkKKTUNDGG_cjs.c("successDark")};
      `;
    case "warning":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("warningBackground")};
        color: ${chunkKKTUNDGG_cjs.c("warningDark")};
      `;
    case "danger":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("errorBackground")};
        color: ${chunkKKTUNDGG_cjs.c("errorDark")};
      `;
    case "info":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("secondary100")};
        color: ${chunkKKTUNDGG_cjs.c("secondary700")};
      `;
    case "secondary":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("secondary50")};
        color: ${chunkKKTUNDGG_cjs.c("secondary600")};
      `;
    case "default":
    default:
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("neutral100")};
        color: ${chunkKKTUNDGG_cjs.c("neutral700")};
      `;
  }
};
var getSizeStyles = ($size) => {
  switch ($size) {
    case "sm":
      return styled56.css`
        font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
        padding: 2px ${chunkKKTUNDGG_cjs.s("xs")};
      `;
    case "lg":
      return styled56.css`
        font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
        padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("md")};
      `;
    case "md":
    case void 0:
    default:
      return styled56.css`
        font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
        padding: ${chunkKKTUNDGG_cjs.s("micro")} ${chunkKKTUNDGG_cjs.s("sm")};
      `;
  }
};
var StyledBadge = styled56__default.default.span`
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  display: inline-block;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  white-space: nowrap;
  ${({ $size }) => getSizeStyles($size)}
  ${({ $variant }) => getVariantStyles($variant)}
`;
var Badge = ({ children, className, size = "md", variant = "default" }) => /* @__PURE__ */ jsxRuntime.jsx(StyledBadge, { $size: size, $variant: variant, className, children });
var spin2 = styled56.keyframes`
  to {
    transform: rotate(360deg);
  }
`;
var getVariantStyles2 = (variant) => {
  const variants = {
    accent: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("accent500")};
      border: none;
      color: ${chunkKKTUNDGG_cjs.c("white")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("accent600")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("accent200")};
      }
    `,
    brand: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("accent500")};
      border: none;
      color: ${chunkKKTUNDGG_cjs.c("white")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("accent700")};
        transform: translateY(-1px);
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("accent200")};
      }
    `,
    "brand-ghost": styled56.css`
      background: transparent;
      border: none;
      color: ${chunkKKTUNDGG_cjs.c("accent500")};

      &:hover:not(:disabled) {
        color: ${chunkKKTUNDGG_cjs.c("accent700")};
        text-decoration: underline;
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px ${chunkKKTUNDGG_cjs.c("accent200")};
      }
    `,
    "brand-outline": styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("white")};
      border: 2px solid ${chunkKKTUNDGG_cjs.c("accent500")};
      color: ${chunkKKTUNDGG_cjs.c("accent500")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("accent500")};
        color: ${chunkKKTUNDGG_cjs.c("white")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("accent200")};
      }
    `,
    danger: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("error")};
      border: none;
      color: ${chunkKKTUNDGG_cjs.c("white")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("errorDark")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("errorBackground")};
      }
    `,
    ghost: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("neutral100")};
      border: none;
      color: ${chunkKKTUNDGG_cjs.c("textSecondary")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("neutral200")};
        color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px ${chunkKKTUNDGG_cjs.c("neutral300")};
      }
    `,
    outline: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("white")};
      border: 1px solid ${chunkKKTUNDGG_cjs.c("neutral300")};
      color: ${chunkKKTUNDGG_cjs.c("textPrimary")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("neutral50")};
        border-color: ${chunkKKTUNDGG_cjs.c("primary300")};
      }

      &:focus-visible {
        border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
      }
    `,
    primary: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("primary500")};
      border: none;
      color: ${chunkKKTUNDGG_cjs.c("neutral900")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("primary400")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("primary200")};
      }
    `,
    secondary: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("white")};
      border: 1px solid ${chunkKKTUNDGG_cjs.c("neutral300")};
      color: ${chunkKKTUNDGG_cjs.c("textPrimary")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("neutral50")};
        border-color: ${chunkKKTUNDGG_cjs.c("neutral400")};
      }

      &:focus-visible {
        border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
        box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("primary100")};
      }
    `,
    success: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("success")};
      border: none;
      color: ${chunkKKTUNDGG_cjs.c("white")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("successDark")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("successBackground")};
      }
    `,
    warning: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("warning")};
      border: none;
      color: ${chunkKKTUNDGG_cjs.c("neutral900")};

      &:hover:not(:disabled) {
        background: ${chunkKKTUNDGG_cjs.c("warningDark")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("warningBackground")};
      }
    `
  };
  return variants[variant];
};
var normalizeSize = (size) => {
  const sizeMap2 = {
    large: "lg",
    lg: "lg",
    md: "md",
    medium: "md",
    sm: "sm",
    small: "sm"
  };
  return sizeMap2[size];
};
var getBorderRadius = (buttonShape) => {
  if (buttonShape === "circle" || buttonShape === "pill") {
    return chunkKKTUNDGG_cjs.sh("full");
  }
  return chunkKKTUNDGG_cjs.sh("md");
};
var getSizeStyles2 = (size, iconOnly, buttonShape) => {
  const normalizedSize = normalizeSize(size);
  const borderRadius = getBorderRadius(buttonShape);
  if (iconOnly) {
    const iconOnlySizes = {
      lg: styled56.css`
        border-radius: ${borderRadius};
        height: ${chunkKKTUNDGG_cjs.s("md")};
        min-width: ${chunkKKTUNDGG_cjs.s("md")};
        padding: 0;
        width: ${chunkKKTUNDGG_cjs.s("md")};
      `,
      md: styled56.css`
        border-radius: ${borderRadius};
        height: ${chunkKKTUNDGG_cjs.s("md")};
        min-width: ${chunkKKTUNDGG_cjs.s("md")};
        padding: 0;
        width: ${chunkKKTUNDGG_cjs.s("md")};
      `,
      sm: styled56.css`
        border-radius: ${borderRadius};
        height: ${chunkKKTUNDGG_cjs.s("md")};
        min-width: ${chunkKKTUNDGG_cjs.s("md")};
        padding: 0;
        width: ${chunkKKTUNDGG_cjs.s("md")};
      `
    };
    return iconOnlySizes[normalizedSize];
  }
  const sizes = {
    lg: styled56.css`
      font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
      min-height: ${chunkKKTUNDGG_cjs.s("lg")};
      padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("md")};
    `,
    md: styled56.css`
      font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
      min-height: ${chunkKKTUNDGG_cjs.s("md")};
      padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
    `,
    sm: styled56.css`
      font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
      min-height: ${chunkKKTUNDGG_cjs.s("sm")};
      padding: ${chunkKKTUNDGG_cjs.s("micro")} ${chunkKKTUNDGG_cjs.s("sm")};
    `
  };
  return sizes[normalizedSize];
};
var StyledButton = styled56__default.default.button`
  align-items: center;
  border-radius: ${({ $shape }) => getBorderRadius($shape)};
  cursor: pointer;
  display: inline-flex;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  justify-content: center;
  outline: none;
  transition: all 0.2s ease;
  white-space: nowrap;

  ${({ $variant }) => getVariantStyles2($variant)}
  ${({ $iconOnly, $shape, $size }) => getSizeStyles2($size, $iconOnly ?? false, $shape)}
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
var ButtonLoader = styled56__default.default.span`
  animation: ${spin2} 0.6s linear infinite;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  display: inline-block;
  height: ${chunkKKTUNDGG_cjs.s("sm")};
  width: ${chunkKKTUNDGG_cjs.s("sm")};
`;
var ButtonIcon = styled56__default.default.span`
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
`;
var Button = ({
  "aria-label": ariaLabel,
  children,
  className,
  disabled = false,
  fullWidth = false,
  icon,
  iconOnly = false,
  iconPosition = "left",
  loading = false,
  loadingIcon,
  onClick,
  shape,
  size = "md",
  title,
  type = "button",
  variant = "primary"
}) => {
  const renderIcon = () => {
    if (!icon) return null;
    return /* @__PURE__ */ jsxRuntime.jsx(ButtonIcon, { children: icon });
  };
  const renderLoadingIcon = () => {
    if (loadingIcon) {
      return /* @__PURE__ */ jsxRuntime.jsx(ButtonIcon, { children: loadingIcon });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(ButtonLoader, {});
  };
  const renderContent = () => {
    if (loading) {
      if (iconOnly) {
        return renderLoadingIcon();
      }
      return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        iconPosition === "left" && renderLoadingIcon(),
        children,
        iconPosition === "right" && renderLoadingIcon()
      ] });
    }
    if (iconOnly) {
      return renderIcon();
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      iconPosition === "left" && renderIcon(),
      children,
      iconPosition === "right" && renderIcon()
    ] });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledButton,
    {
      $fullWidth: fullWidth,
      $iconOnly: iconOnly,
      $shape: shape,
      $size: size,
      $variant: variant,
      "aria-label": ariaLabel,
      className,
      disabled: disabled || loading,
      title,
      type,
      onClick,
      children: renderContent()
    }
  );
};
var getPaddingStyles = (padding) => {
  switch (padding) {
    case "none":
      return "padding: 0;";
    case "small":
      return `padding: ${chunkKKTUNDGG_cjs.s("sm")};`;
    case "medium":
      return `padding: ${chunkKKTUNDGG_cjs.s("md")};`;
    case "large":
      return `padding: ${chunkKKTUNDGG_cjs.s("lg")};`;
  }
};
var StyledCard = styled56__default.default.div`
  background-color: ${chunkKKTUNDGG_cjs.c("white")};
  border-radius: 12px;
  box-shadow: ${chunkKKTUNDGG_cjs.el("sm")};
  transition: all 0.2s ease-in-out;

  ${({ $padding }) => getPaddingStyles($padding)}

  ${({ $clickable }) => $clickable && `
    cursor: pointer;

    &:hover {
      box-shadow: ${chunkKKTUNDGG_cjs.el("md")};
      transform: translateY(-4px);
    }

    &:active {
      transform: translateY(-2px);
    }
  `}
`;
var Card = ({ children, onClick, padding = "medium" }) => /* @__PURE__ */ jsxRuntime.jsx(StyledCard, { $clickable: Boolean(onClick), $padding: padding, onClick, children });
var CHECKBOX_SIZE = chunkKKTUNDGG_cjs.layout.icon.md;
var CheckboxWrapper = styled56__default.default.label`
  align-items: center;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: inline-flex;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
`;
var HiddenInput = styled56__default.default.input`
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;
var CheckboxBox = styled56__default.default.div`
  align-items: center;
  background-color: ${({ $checked }) => $checked ? chunkKKTUNDGG_cjs.c("primary500") : chunkKKTUNDGG_cjs.c("white")};
  border: 2px solid ${({ $checked }) => $checked ? chunkKKTUNDGG_cjs.c("primary500") : chunkKKTUNDGG_cjs.c("neutral300")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("sm")};
  display: flex;
  flex-shrink: 0;
  height: ${CHECKBOX_SIZE};
  justify-content: center;
  transition: all 0.15s ease;
  width: ${CHECKBOX_SIZE};

  &::after {
    border: solid ${chunkKKTUNDGG_cjs.c("white")};
    border-width: 0 2px 2px 0;
    content: '';
    display: ${({ $checked }) => $checked ? "block" : "none"};
    height: ${chunkKKTUNDGG_cjs.s("xs")};
    transform: rotate(45deg) translate(-1px, -1px);
    width: ${chunkKKTUNDGG_cjs.s("micro")};
  }
`;
var CheckboxLabel = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
`;
var Checkbox = ({
  checked = false,
  className,
  disabled = false,
  id,
  label,
  name,
  onChange
}) => {
  const handleChange = react.useCallback(
    (e) => {
      onChange?.(e.target.checked);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(CheckboxWrapper, { $disabled: disabled, className, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      HiddenInput,
      {
        checked,
        disabled,
        id: id ?? name,
        name,
        type: "checkbox",
        onChange: handleChange
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(CheckboxBox, { $checked: checked }),
    label && /* @__PURE__ */ jsxRuntime.jsx(CheckboxLabel, { children: label })
  ] });
};
var getMaxWidth = (size) => {
  switch (size) {
    case "small":
      return "640px";
    case "medium":
      return "1024px";
    case "large":
      return "1280px";
    case "full":
      return "100%";
  }
};
var StyledContainer = styled56__default.default.div`
  margin: 0 auto;
  max-width: ${({ $size }) => getMaxWidth($size)};
  padding-left: ${chunkKKTUNDGG_cjs.s("sm")};
  padding-right: ${chunkKKTUNDGG_cjs.s("sm")};
  width: 100%;

  @media (width >= 768px) {
    padding-left: ${chunkKKTUNDGG_cjs.s("md")};
    padding-right: ${chunkKKTUNDGG_cjs.s("md")};
  }

  @media (width >= 1024px) {
    padding-left: ${chunkKKTUNDGG_cjs.s("lg")};
    padding-right: ${chunkKKTUNDGG_cjs.s("lg")};
  }
`;
var Container = ({ children, size = "medium" }) => /* @__PURE__ */ jsxRuntime.jsx(StyledContainer, { $size: size, children });

// src/components/DetailLayout/DetailLayout.constants.ts
var DETAIL_AMOUNT_SIZE_LARGE = "large";
var DetailSectionWrapper = styled56__default.default.div`
  margin-bottom: ${chunkKKTUNDGG_cjs.s("md")};
`;
var DetailLabelText = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  display: block;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  letter-spacing: ${chunkKKTUNDGG_cjs.tt("wide")};
  margin-bottom: ${chunkKKTUNDGG_cjs.s("micro")};
  text-transform: uppercase;
`;
var DetailValueText = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  display: block;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: ${chunkKKTUNDGG_cjs.tl("relaxed")};
`;
var DetailValueMonoText = styled56__default.default(DetailValueText)`
  font-family: ${chunkKKTUNDGG_cjs.tf("mono")};
`;
var DetailRowGrid = styled56__default.default.div`
  display: grid;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  margin-bottom: ${chunkKKTUNDGG_cjs.s("sm")};

  @media (width <= 480px) {
    grid-template-columns: 1fr;
  }
`;
var DetailDividerLine = styled56__default.default.hr`
  border: none;
  border-top: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  margin: ${chunkKKTUNDGG_cjs.s("md")} 0;
`;
var DetailAmountText = styled56__default.default.div`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("mono")};
  font-size: ${chunkKKTUNDGG_cjs.ts("base")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
`;
var DetailAmountLargeText = styled56__default.default(DetailAmountText)`
  font-size: ${chunkKKTUNDGG_cjs.ts("2xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
`;
var DetailContentBoxWrapper = styled56__default.default.div`
  background: ${({ $variant }) => {
  switch ($variant) {
    case "info":
      return chunkKKTUNDGG_cjs.c("primary50");
    case "warning":
      return chunkKKTUNDGG_cjs.c("warningBackground");
    case "error":
      return chunkKKTUNDGG_cjs.c("errorBackground");
    case "default":
    default:
      return chunkKKTUNDGG_cjs.c("neutral50");
  }
}};
  border-left: 3px solid
    ${({ $variant }) => {
  switch ($variant) {
    case "info":
      return chunkKKTUNDGG_cjs.c("primary500");
    case "warning":
      return chunkKKTUNDGG_cjs.c("warning");
    case "error":
      return chunkKKTUNDGG_cjs.c("error");
    case "default":
    default:
      return chunkKKTUNDGG_cjs.c("neutral300");
  }
}};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: ${chunkKKTUNDGG_cjs.tl("relaxed")};
  padding: ${chunkKKTUNDGG_cjs.s("sm")};
  white-space: pre-wrap;
`;
styled56__default.default.div`
  display: grid;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: ${chunkKKTUNDGG_cjs.s("md")};

  @media (width <= 480px) {
    grid-template-columns: 1fr;
  }
`;
styled56__default.default.div`
  background: ${chunkKKTUNDGG_cjs.c("neutral100")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  max-height: 300px;
  overflow: hidden;
  width: 100%;

  img,
  video {
    height: auto;
    max-height: 300px;
    object-fit: contain;
    width: 100%;
  }
`;
var DetailSection = ({ children, className }) => /* @__PURE__ */ jsxRuntime.jsx(DetailSectionWrapper, { className, children });
var DetailLabel = ({ children, className }) => /* @__PURE__ */ jsxRuntime.jsx(DetailLabelText, { className, children });
var DetailValue = ({ children, className, mono = false }) => mono ? /* @__PURE__ */ jsxRuntime.jsx(DetailValueMonoText, { className, children }) : /* @__PURE__ */ jsxRuntime.jsx(DetailValueText, { className, children });
var DetailRow = ({ children, className, columns = 2 }) => /* @__PURE__ */ jsxRuntime.jsx(DetailRowGrid, { $columns: columns, className, children });
var DetailDivider = ({ className }) => /* @__PURE__ */ jsxRuntime.jsx(DetailDividerLine, { className });
var DetailAmount = ({ children, className, size = "default" }) => size === DETAIL_AMOUNT_SIZE_LARGE ? /* @__PURE__ */ jsxRuntime.jsx(DetailAmountLargeText, { className, children }) : /* @__PURE__ */ jsxRuntime.jsx(DetailAmountText, { className, children });
var DetailContentBox = ({
  children,
  className,
  variant = "default"
}) => /* @__PURE__ */ jsxRuntime.jsx(DetailContentBoxWrapper, { $variant: variant, className, children });
var StyledDivider = styled56__default.default.hr`
  background-color: ${({ $color }) => $color ?? chunkKKTUNDGG_cjs.c("border")};
  border: none;
  flex-shrink: 0;

  ${({ $orientation, $spacing: $gap }) => $orientation === "vertical" ? `
    height: auto;
    margin: 0 ${$gap ?? chunkKKTUNDGG_cjs.s("sm")};
    min-height: 100%;
    width: 1px;
  ` : `
    height: 1px;
    margin: ${$gap ?? chunkKKTUNDGG_cjs.s("sm")} 0;
    width: 100%;
  `}
`;
var Divider = ({
  className,
  color: color2,
  orientation = "horizontal",
  spacing
}) => /* @__PURE__ */ jsxRuntime.jsx(
  StyledDivider,
  {
    $color: color2,
    $orientation: orientation,
    $spacing: spacing,
    className,
    "data-testid": "divider"
  }
);
var Container2 = styled56__default.default.div`
  display: inline-block;
  position: relative;
`;
var Trigger = styled56__default.default.button`
  align-items: center;
  background-color: ${chunkKKTUNDGG_cjs.c("white")};
  border: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  cursor: pointer;
  display: flex;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  justify-content: space-between;
  min-width: 160px;
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    border-color: ${chunkKKTUNDGG_cjs.c("primary400")};
  }

  &:focus {
    border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
    box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("primary100")};
    outline: none;
  }

  &:disabled {
    background-color: ${chunkKKTUNDGG_cjs.c("neutral100")};
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  &[data-open='true'] svg {
    transform: rotate(180deg);
  }
`;
var Menu = styled56__default.default.div`
  background: ${chunkKKTUNDGG_cjs.c("white")};
  border: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  box-shadow: ${chunkKKTUNDGG_cjs.el("md")};
  left: 0;
  max-height: 240px;
  min-width: 100%;
  overflow-y: auto;
  position: absolute;
  z-index: 100;

  ${({ $position }) => $position === "top" ? styled56.css`
          bottom: calc(100% + ${chunkKKTUNDGG_cjs.s("micro")});
        ` : styled56.css`
          top: calc(100% + ${chunkKKTUNDGG_cjs.s("micro")});
        `}
`;
var Item = styled56__default.default.button`
  background: ${({ $selected }) => $selected ? chunkKKTUNDGG_cjs.c("primary50") : "transparent"};
  border: none;
  color: ${({ $disabled, $selected }) => {
  if ($disabled) return chunkKKTUNDGG_cjs.c("textTertiary");
  if ($selected) return chunkKKTUNDGG_cjs.c("primary700");
  return chunkKKTUNDGG_cjs.c("textPrimary");
}};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: block;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${({ $selected }) => $selected ? chunkKKTUNDGG_cjs.tw("medium") : chunkKKTUNDGG_cjs.tw("regular")};
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
  text-align: left;
  transition: background 0.15s ease;
  width: 100%;

  &:hover:not(:disabled) {
    background: ${({ $selected }) => $selected ? chunkKKTUNDGG_cjs.c("primary100") : chunkKKTUNDGG_cjs.c("neutral50")};
  }

  &:focus {
    background: ${chunkKKTUNDGG_cjs.c("primary50")};
    outline: none;
  }
`;
var IconWrapper = styled56__default.default.span`
  align-items: center;
  display: flex;
  height: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: center;
  width: ${chunkKKTUNDGG_cjs.s("sm")};
`;
var Dropdown = ({
  className,
  disabled = false,
  icon,
  onChange,
  options,
  placeholder = "Select",
  position = "bottom",
  value
}) => {
  const [isOpen, setIsOpen] = react.useState(false);
  const containerRef = react.useRef(null);
  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label ?? placeholder;
  const handleToggle = react.useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);
  const handleSelect = react.useCallback(
    (optionValue, optionDisabled) => {
      if (optionDisabled) return;
      onChange(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );
  const createSelectHandler = react.useCallback(
    (optionValue, optionDisabled) => () => handleSelect(optionValue, optionDisabled),
    [handleSelect]
  );
  const handleKeyDown = react.useCallback(
    (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );
  react.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return /* @__PURE__ */ jsxRuntime.jsxs(Container2, { className, ref: containerRef, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      Trigger,
      {
        "data-open": isOpen,
        disabled,
        type: "button",
        onClick: handleToggle,
        onKeyDown: handleKeyDown,
        children: [
          icon && /* @__PURE__ */ jsxRuntime.jsx(IconWrapper, { children: icon }),
          displayText,
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { size: 16 })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntime.jsx(Menu, { $position: position, children: options.map((option) => /* @__PURE__ */ jsxRuntime.jsx(
      Item,
      {
        $disabled: option.disabled,
        $selected: option.value === value,
        disabled: option.disabled,
        type: "button",
        onClick: createSelectHandler(option.value, option.disabled),
        children: option.label
      },
      option.value
    )) })
  ] });
};
var Container3 = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: center;
  padding: ${chunkKKTUNDGG_cjs.s("2xl")};
  text-align: center;
`;
var IconWrapper2 = styled56__default.default.div`
  align-items: center;
  background: ${chunkKKTUNDGG_cjs.c("neutral100")};
  border-radius: 50%;
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  display: flex;
  height: ${chunkKKTUNDGG_cjs.s("4xl")};
  justify-content: center;
  width: ${chunkKKTUNDGG_cjs.s("4xl")};

  svg {
    height: ${chunkKKTUNDGG_cjs.s("lg")};
    width: ${chunkKKTUNDGG_cjs.s("lg")};
  }
`;
var Title = styled56__default.default.h3`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("lg")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  margin: 0;
`;
var Message = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: ${chunkKKTUNDGG_cjs.tl("relaxed")};
  margin: 0;
  max-width: 400px;
`;
var Action = styled56__default.default.div`
  margin-top: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var EmptyState = ({ action, className, icon, message, title }) => /* @__PURE__ */ jsxRuntime.jsxs(Container3, { className, children: [
  icon && /* @__PURE__ */ jsxRuntime.jsx(IconWrapper2, { children: icon }),
  title && /* @__PURE__ */ jsxRuntime.jsx(Title, { children: title }),
  message && /* @__PURE__ */ jsxRuntime.jsx(Message, { children: message }),
  action && /* @__PURE__ */ jsxRuntime.jsx(Action, { children: action })
] });
var Container4 = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
  min-width: 0;
  width: 100%;
`;
var Name = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  display: block;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
var Id = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  display: block;
  font-family: ${chunkKKTUNDGG_cjs.tf("mono")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  margin-top: ${chunkKKTUNDGG_cjs.s("micro")};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
var Description = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  display: block;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
var EntityCell = ({ className, description, id, name }) => /* @__PURE__ */ jsxRuntime.jsxs(Container4, { className, children: [
  /* @__PURE__ */ jsxRuntime.jsx(Name, { children: name }),
  id && /* @__PURE__ */ jsxRuntime.jsx(Id, { children: id }),
  description && /* @__PURE__ */ jsxRuntime.jsx(Description, { children: description })
] });
var ErrorContainer = styled56__default.default.div`
  align-items: center;
  background-color: ${chunkKKTUNDGG_cjs.c("errorBackground")};
  border: 1px solid ${chunkKKTUNDGG_cjs.c("errorBorder")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")};
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: center;
  min-height: 200px;
  padding: ${chunkKKTUNDGG_cjs.s("lg")};
`;
var ErrorIconWrapper = styled56__default.default.div`
  color: ${chunkKKTUNDGG_cjs.c("error")};
`;
var ErrorTitle = styled56__default.default.h3`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  margin: 0;
  text-align: center;
`;
var ErrorDescription = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("base")};
  margin: 0;
  max-width: 500px;
  text-align: center;
`;
var ErrorActions = styled56__default.default.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  justify-content: center;
  margin-top: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var ActionButton2 = styled56__default.default.button`
  background-color: ${({ $variant }) => $variant === "primary" ? chunkKKTUNDGG_cjs.c("primary500") : chunkKKTUNDGG_cjs.c("transparent")};
  border: 1px solid ${({ $variant }) => $variant === "primary" ? chunkKKTUNDGG_cjs.c("primary500") : chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${({ $variant }) => $variant === "primary" ? chunkKKTUNDGG_cjs.c("white") : chunkKKTUNDGG_cjs.c("textPrimary")};
  cursor: pointer;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $variant }) => $variant === "primary" ? chunkKKTUNDGG_cjs.c("primary600") : chunkKKTUNDGG_cjs.c("backgroundDark")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
var ErrorFallback = ({
  actions = [],
  className,
  description = "An unexpected error occurred. Please try again.",
  icon,
  onRetry,
  retryLabel = "Try Again",
  title = "Something went wrong"
}) => /* @__PURE__ */ jsxRuntime.jsxs(ErrorContainer, { className, "data-testid": "error-fallback", children: [
  /* @__PURE__ */ jsxRuntime.jsx(ErrorIconWrapper, { children: icon ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertTriangle, { size: 48 }) }),
  /* @__PURE__ */ jsxRuntime.jsx(ErrorTitle, { children: title }),
  /* @__PURE__ */ jsxRuntime.jsx(ErrorDescription, { children: description }),
  /* @__PURE__ */ jsxRuntime.jsxs(ErrorActions, { children: [
    onRetry && /* @__PURE__ */ jsxRuntime.jsx(ActionButton2, { $variant: "primary", onClick: onRetry, children: retryLabel }),
    actions.map((action) => /* @__PURE__ */ jsxRuntime.jsx(ActionButton2, { $variant: "secondary", onClick: action.onClick, children: action.label }, action.label))
  ] })
] });
var Container5 = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: center;
  padding: ${chunkKKTUNDGG_cjs.s("2xl")};
  text-align: center;
`;
var IconWrapper3 = styled56__default.default.div`
  align-items: center;
  background: ${chunkKKTUNDGG_cjs.c("errorBackground")};
  border-radius: 50%;
  color: ${chunkKKTUNDGG_cjs.c("errorDark")};
  display: flex;
  height: ${chunkKKTUNDGG_cjs.s("4xl")};
  justify-content: center;
  width: ${chunkKKTUNDGG_cjs.s("4xl")};

  svg {
    height: ${chunkKKTUNDGG_cjs.s("lg")};
    width: ${chunkKKTUNDGG_cjs.s("lg")};
  }
`;
var Title2 = styled56__default.default.h3`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("lg")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  margin: 0;
`;
var Message2 = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: ${chunkKKTUNDGG_cjs.tl("relaxed")};
  margin: 0;
  max-width: 400px;
`;
var Action2 = styled56__default.default.div`
  margin-top: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var ErrorState = ({ action, className, icon, message, title }) => /* @__PURE__ */ jsxRuntime.jsxs(Container5, { className, children: [
  /* @__PURE__ */ jsxRuntime.jsx(IconWrapper3, { children: icon ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertCircle, {}) }),
  title && /* @__PURE__ */ jsxRuntime.jsx(Title2, { children: title }),
  message && /* @__PURE__ */ jsxRuntime.jsx(Message2, { children: message }),
  action && /* @__PURE__ */ jsxRuntime.jsx(Action2, { children: action })
] });
var alignMap = {
  center: "center",
  left: "flex-start",
  right: "flex-end"
};
var StyledFormActions = styled56__default.default.div`
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: ${({ $align }) => alignMap[$align]};
  margin-top: ${chunkKKTUNDGG_cjs.s("md")};
`;
var FormActions = ({ align = "right", children, className }) => /* @__PURE__ */ jsxRuntime.jsx(StyledFormActions, { $align: align, className, children });
var StyledFormError = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("errorDark")};
  display: block;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${({ $variant }) => $variant === "field" ? chunkKKTUNDGG_cjs.ts("xs") : chunkKKTUNDGG_cjs.ts("sm")};
  margin-top: ${({ $variant }) => $variant === "field" ? chunkKKTUNDGG_cjs.s("micro") : chunkKKTUNDGG_cjs.s("xs")};
`;
var FormError = ({ children, className, variant = "form" }) => /* @__PURE__ */ jsxRuntime.jsx(StyledFormError, { $variant: variant, className, children });
var StyledFormGroup = styled56__default.default.div`
  margin-bottom: ${chunkKKTUNDGG_cjs.s("sm")};
`;
var FormGroup = ({ children, className }) => /* @__PURE__ */ jsxRuntime.jsx(StyledFormGroup, { className, children });
var spin3 = styled56.keyframes`
  to {
    transform: rotate(360deg);
  }
`;
var pulse = styled56.keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;
var SIZE_MAP2 = {
  lg: { ring: "64px", stroke: "4px" },
  md: { ring: "40px", stroke: "3px" },
  sm: { ring: "24px", stroke: "2px" }
};
var SpinnerContainer = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: center;
`;
var SpinnerRing = styled56__default.default.div`
  animation: ${spin3} 0.8s linear infinite;
  border: ${({ $size }) => SIZE_MAP2[$size].stroke} solid ${chunkKKTUNDGG_cjs.c("neutral200")};
  border-radius: 50%;
  border-top-color: ${({ $color }) => $color ?? chunkKKTUNDGG_cjs.c("accent500")};
  height: ${({ $size }) => SIZE_MAP2[$size].ring};
  width: ${({ $size }) => SIZE_MAP2[$size].ring};
`;
var SpinnerText = styled56__default.default.span`
  animation: ${pulse} 2s ease-in-out infinite;
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  text-align: center;
`;
var Spinner = ({ className, color: color2, size = "md", text }) => /* @__PURE__ */ jsxRuntime.jsxs(SpinnerContainer, { className, "data-testid": "spinner", children: [
  /* @__PURE__ */ jsxRuntime.jsx(SpinnerRing, { $color: color2, $size: size }),
  text && /* @__PURE__ */ jsxRuntime.jsx(SpinnerText, { children: text })
] });
var LoadingOverlay = styled56__default.default.div`
  align-items: center;
  background: ${chunkKKTUNDGG_cjs.c("background")};
  display: ${({ $isVisible }) => $isVisible ? "flex" : "none"};
  flex-direction: column;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: ${chunkKKTUNDGG_cjs.layout.zIndex.modal};
`;
var GlobalLoading = ({ children, className, isVisible, text }) => /* @__PURE__ */ jsxRuntime.jsx(LoadingOverlay, { $isVisible: isVisible, className, "data-testid": "global-loading", children: children ?? /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "lg", text }) });
var ImageContainer = styled56__default.default.div`
  height: 100%;
  position: relative;
  width: 100%;
`;
var StyledImage = styled56__default.default.img`
  display: block;
  height: 100%;
  object-fit: ${({ $objectFit }) => $objectFit ?? "cover"};
  width: 100%;
`;
var FallbackContainer = styled56__default.default.div`
  align-items: center;
  background: ${chunkKKTUNDGG_cjs.c("neutral50")};
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  height: 100%;
  justify-content: center;
  width: 100%;
`;
var FallbackIcon = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("accent500")};
  opacity: 0.6;

  svg {
    height: ${chunkKKTUNDGG_cjs.s("xl")};
    width: ${chunkKKTUNDGG_cjs.s("xl")};
  }
`;
var FallbackText = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  opacity: 0.8;
`;
var Image = ({
  alt,
  className,
  fallbackIcon,
  fallbackText = "No image",
  height,
  loading = "lazy",
  objectFit = "cover",
  src,
  width
}) => {
  const [hasError, setHasError] = react.useState(false);
  const handleError = react.useCallback(() => {
    setHasError(true);
  }, []);
  const showFallback = !src || hasError;
  const containerStyle = {
    height: typeof height === "number" ? `${height}px` : height,
    width: typeof width === "number" ? `${width}px` : width
  };
  if (showFallback) {
    return /* @__PURE__ */ jsxRuntime.jsx(ImageContainer, { className, style: containerStyle, children: /* @__PURE__ */ jsxRuntime.jsxs(FallbackContainer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(FallbackIcon, { children: fallbackIcon ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ImageIcon, {}) }),
      /* @__PURE__ */ jsxRuntime.jsx(FallbackText, { children: fallbackText })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ImageContainer, { className, style: containerStyle, children: /* @__PURE__ */ jsxRuntime.jsx(
    StyledImage,
    {
      $objectFit: objectFit,
      alt,
      loading,
      src,
      onError: handleError
    }
  ) });
};
var getVariantStyles3 = (variant) => {
  switch (variant) {
    case "success":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("successBackground")};
        border-left-color: ${chunkKKTUNDGG_cjs.c("success")};
        color: ${chunkKKTUNDGG_cjs.c("successDark")};
      `;
    case "error":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("errorBackground")};
        border-left-color: ${chunkKKTUNDGG_cjs.c("error")};
        color: ${chunkKKTUNDGG_cjs.c("errorDark")};
      `;
    case "warning":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("warningBackground")};
        border-left-color: ${chunkKKTUNDGG_cjs.c("warning")};
        color: ${chunkKKTUNDGG_cjs.c("warningDark")};
      `;
    case "info":
    default:
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("secondary100")};
        border-left-color: ${chunkKKTUNDGG_cjs.c("secondary500")};
        color: ${chunkKKTUNDGG_cjs.c("secondary700")};
      `;
  }
};
var StyledInfoMessage = styled56__default.default.div`
  border-left: 4px solid;
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: ${chunkKKTUNDGG_cjs.tl("relaxed")};
  padding: ${chunkKKTUNDGG_cjs.s("sm")};
  ${({ $variant }) => getVariantStyles3($variant)}
`;
var InfoMessage = ({ children, className, variant = "info" }) => /* @__PURE__ */ jsxRuntime.jsx(StyledInfoMessage, { $variant: variant, className, children });
var InputWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}
`;
var InputLabel = styled56__default.default.label`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
`;
var InputContainer = styled56__default.default.div`
  position: relative;
  width: 100%;
`;
var StyledInput = styled56__default.default.input`
  background-color: ${chunkKKTUNDGG_cjs.c("white")};
  border: 2px solid ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("neutral200")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("base")};
  min-height: ${chunkKKTUNDGG_cjs.s("xl")};
  padding: ${chunkKKTUNDGG_cjs.s("sm")};
  padding-right: ${({ $hasToggle }) => $hasToggle ? "48px" : chunkKKTUNDGG_cjs.s("sm")};
  transition: all 0.2s ease-in-out;
  width: 100%;

  &::placeholder {
    color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  }

  &:hover:not(:disabled) {
    border-color: ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("errorDark") : chunkKKTUNDGG_cjs.c("neutral300")};
  }

  &:focus {
    border-color: ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("primary500")};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("errorFocusShadow") : chunkKKTUNDGG_cjs.c("primaryFocusShadow")};
    outline: none;
  }

  &:disabled {
    background-color: ${chunkKKTUNDGG_cjs.c("neutral50")};
    color: ${chunkKKTUNDGG_cjs.c("textDisabled")};
    cursor: not-allowed;
  }
`;
var PasswordToggle = styled56__default.default.button`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: ${chunkKKTUNDGG_cjs.ts("lg")};
  height: 100%;
  justify-content: center;
  padding: 0 ${chunkKKTUNDGG_cjs.s("sm")};
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid ${chunkKKTUNDGG_cjs.c("primary500")};
    outline-offset: -2px;
  }
`;
var InputError = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("error")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
`;
var InputRequired = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("error")};
  margin-left: ${chunkKKTUNDGG_cjs.s("micro")};
`;
var Input = ({
  autoComplete,
  disabled = false,
  error,
  fullWidth = false,
  hidePasswordLabel = "Hide password",
  id,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  showPasswordLabel = "Show password",
  type = "text",
  value
}) => {
  const [showPassword, setShowPassword] = react.useState(false);
  const isPassword = type === "password";
  const handleChange = react.useCallback(
    (event) => {
      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange]
  );
  const handleTogglePassword = react.useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  const inputType = isPassword && showPassword ? "text" : type;
  return /* @__PURE__ */ jsxRuntime.jsxs(InputWrapper, { $fullWidth: fullWidth, children: [
    label && /* @__PURE__ */ jsxRuntime.jsxs(InputLabel, { htmlFor: id, children: [
      label,
      required && /* @__PURE__ */ jsxRuntime.jsx(InputRequired, { children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(InputContainer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        StyledInput,
        {
          $hasError: Boolean(error),
          $hasToggle: isPassword,
          autoComplete,
          disabled,
          id,
          name,
          placeholder,
          required,
          type: inputType,
          value,
          onChange: handleChange
        }
      ),
      isPassword && /* @__PURE__ */ jsxRuntime.jsx(
        PasswordToggle,
        {
          "aria-label": showPassword ? hidePasswordLabel : showPasswordLabel,
          type: "button",
          onClick: handleTogglePassword,
          children: showPassword ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.EyeOff, { size: 20 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Eye, { size: 20 })
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntime.jsx(InputError, { children: error })
  ] });
};
var FallbackContainer2 = styled56__default.default.div`
  align-items: center;
  background: ${chunkKKTUNDGG_cjs.c("background")};
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: ${chunkKKTUNDGG_cjs.layout.zIndex.modal};
`;
var LazyFallback = ({ children, className }) => /* @__PURE__ */ jsxRuntime.jsx(FallbackContainer2, { className, "data-testid": "lazy-fallback", children: children ?? /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "lg" }) });
var spin4 = styled56.keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var Container6 = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: center;
  padding: ${chunkKKTUNDGG_cjs.s("2xl")};
  text-align: center;
`;
var SpinnerElement = styled56__default.default.div`
  animation: ${spin4} 1s linear infinite;
  border: 3px solid ${chunkKKTUNDGG_cjs.c("neutral200")};
  border-radius: 50%;
  border-top-color: ${chunkKKTUNDGG_cjs.c("primary500")};
  height: ${chunkKKTUNDGG_cjs.s("xl")};
  width: ${chunkKKTUNDGG_cjs.s("xl")};
`;
var Text = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
`;
var LoadingState = ({ className, message }) => /* @__PURE__ */ jsxRuntime.jsxs(Container6, { className, "data-testid": "loading-state", children: [
  /* @__PURE__ */ jsxRuntime.jsx(SpinnerElement, {}),
  message && /* @__PURE__ */ jsxRuntime.jsx(Text, { children: message })
] });

// src/components/Modal/Modal.constants.ts
var MODAL_VARIANTS = {
  CONFIRM: "confirm"};
var CONFIRM_VARIANTS = {
  INFO: "info"
};
var fadeIn = styled56.keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
var fadeOut = styled56.keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;
var slideUp = styled56.keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
var slideDown = styled56.keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;
var ModalOverlay = styled56__default.default.div`
  align-items: center;
  animation: ${({ $isClosing }) => $isClosing ? fadeOut : fadeIn} 0.2s ease-out forwards;
  background-color: ${chunkKKTUNDGG_cjs.c("modalOverlay")};
  display: flex;
  inset: 0;
  justify-content: center;
  padding: ${chunkKKTUNDGG_cjs.s("sm")};
  position: fixed;
  z-index: 1100;
`;
var sizeStyles = {
  full: styled56.css`
    max-height: 90vh;
    max-width: 90vw;
    width: 90vw;
  `,
  lg: styled56.css`
    max-width: 600px;
  `,
  md: styled56.css`
    max-width: 480px;
  `,
  sm: styled56.css`
    max-width: 360px;
  `,
  xl: styled56.css`
    max-width: 700px;
  `
};
var ModalContainer = styled56__default.default.div`
  animation: ${({ $isClosing }) => $isClosing ? slideDown : slideUp} 0.2s ease-out forwards;
  background-color: ${chunkKKTUNDGG_cjs.c("white")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")};
  box-shadow: ${chunkKKTUNDGG_cjs.el("xl")};
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  width: 100%;
  ${({ $size }) => sizeStyles[$size]}

  @media (min-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    max-height: 85vh;
  }
`;
var ModalHeader = styled56__default.default.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: ${chunkKKTUNDGG_cjs.s("sm")};
`;
var ModalTitle = styled56__default.default.h2`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
  margin: 0;
  ${({ $centered }) => $centered && `
    margin-bottom: ${chunkKKTUNDGG_cjs.s("xs")};
    text-align: center;
  `}
`;
var ModalContent = styled56__default.default.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ $noPadding }) => $noPadding ? "0" : chunkKKTUNDGG_cjs.s("sm")};
`;
var ModalFooterBar = styled56__default.default.div`
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: flex-end;
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
`;
var getIconVariantStyles = (variant) => {
  const variants = {
    danger: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("errorBackground")};
      color: ${chunkKKTUNDGG_cjs.c("error")};
    `,
    info: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("primary50")};
      color: ${chunkKKTUNDGG_cjs.c("primary500")};
    `,
    success: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("successBackground")};
      color: ${chunkKKTUNDGG_cjs.c("success")};
    `,
    warning: styled56.css`
      background: ${chunkKKTUNDGG_cjs.c("warningBackground")};
      color: ${chunkKKTUNDGG_cjs.c("warning")};
    `
  };
  return variants[variant];
};
var ModalIcon = styled56__default.default.div`
  align-items: center;
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  display: flex;
  height: ${chunkKKTUNDGG_cjs.s("4xl")};
  justify-content: center;
  margin: 0 auto ${chunkKKTUNDGG_cjs.s("sm")};
  width: ${chunkKKTUNDGG_cjs.s("4xl")};
  ${({ $variant }) => getIconVariantStyles($variant)}
`;
var ModalMessage = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: 1.6;
  margin: 0 0 ${chunkKKTUNDGG_cjs.s("md")};
  text-align: center;
`;
var ModalConfirmChildren = styled56__default.default.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${chunkKKTUNDGG_cjs.s("md")};
  width: 100%;
`;
var ModalActions = styled56__default.default.div`
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: center;
`;
var normalizeSize2 = (size) => {
  const sizeMap2 = {
    full: "full",
    large: "lg",
    lg: "lg",
    md: "md",
    medium: "md",
    sm: "sm",
    small: "sm",
    xl: "xl"
  };
  return sizeMap2[size];
};
var Modal = ({
  cancelText,
  children,
  closeLabel = "Close",
  confirmText,
  confirmVariant = "danger",
  disableClose = false,
  footer,
  icon,
  isOpen,
  loading = false,
  message,
  noPadding = false,
  onCancel,
  onClose,
  onConfirm,
  size = "md",
  title,
  variant = "default"
}) => {
  const [isClosing, setIsClosing] = react.useState(false);
  const handleClose = react.useCallback(() => {
    if (disableClose || loading) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [disableClose, loading, onClose]);
  const handleCancel = react.useCallback(() => {
    if (loading) return;
    if (onCancel) {
      onCancel();
    } else {
      handleClose();
    }
  }, [loading, onCancel, handleClose]);
  const handleConfirm = react.useCallback(() => {
    if (loading || !onConfirm) return;
    onConfirm();
  }, [loading, onConfirm]);
  const handleKeyDown = react.useCallback(
    (event) => {
      if (event.key === "Escape" && !disableClose && !loading) {
        handleClose();
      }
    },
    [handleClose, disableClose, loading]
  );
  const handleContentClick = react.useCallback((e) => {
    e.stopPropagation();
  }, []);
  react.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);
  if (!isOpen && !isClosing) return null;
  const normalizedSize = normalizeSize2(size);
  const renderConfirmContent = () => /* @__PURE__ */ jsxRuntime.jsxs(ModalContent, { children: [
    icon && /* @__PURE__ */ jsxRuntime.jsx(ModalIcon, { $variant: confirmVariant, children: icon }),
    title && /* @__PURE__ */ jsxRuntime.jsx(ModalTitle, { $centered: true, children: title }),
    message && /* @__PURE__ */ jsxRuntime.jsx(ModalMessage, { children: message }),
    children && /* @__PURE__ */ jsxRuntime.jsx(ModalConfirmChildren, { children }),
    /* @__PURE__ */ jsxRuntime.jsxs(ModalActions, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(Button, { disabled: loading, variant: "secondary", onClick: handleCancel, children: cancelText ?? "Cancel" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button,
        {
          loading,
          variant: confirmVariant === CONFIRM_VARIANTS.INFO ? "primary" : confirmVariant,
          onClick: handleConfirm,
          children: confirmText ?? "Confirm"
        }
      )
    ] })
  ] });
  const renderDefaultContent = () => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    title && /* @__PURE__ */ jsxRuntime.jsxs(ModalHeader, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ModalTitle, { children: title }),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button,
        {
          "aria-label": closeLabel,
          disabled: disableClose || loading,
          icon: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 20 }),
          iconOnly: true,
          size: "sm",
          variant: "ghost",
          onClick: handleClose
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(ModalContent, { $noPadding: noPadding, children }),
    footer && /* @__PURE__ */ jsxRuntime.jsx(ModalFooterBar, { children: footer })
  ] });
  return /* @__PURE__ */ jsxRuntime.jsx(ModalOverlay, { $isClosing: isClosing, children: /* @__PURE__ */ jsxRuntime.jsx(
    ModalContainer,
    {
      $isClosing: isClosing,
      $size: normalizedSize,
      "aria-modal": "true",
      role: "dialog",
      onClick: handleContentClick,
      children: variant === MODAL_VARIANTS.CONFIRM ? renderConfirmContent() : renderDefaultContent()
    }
  ) });
};
var alignMap2 = {
  left: "flex-start",
  right: "flex-end",
  "space-between": "space-between"
};
var StyledModalFooter = styled56__default.default.div`
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: ${({ $align }) => alignMap2[$align]};
  margin-top: ${chunkKKTUNDGG_cjs.s("md")};
`;
var ModalFooter = ({ align = "right", children, className }) => /* @__PURE__ */ jsxRuntime.jsx(StyledModalFooter, { $align: align, className, children });
var slideIn = styled56.keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
var slideOut = styled56.keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;
var getBorderColor = ($type) => {
  switch ($type) {
    case "success":
      return chunkKKTUNDGG_cjs.c("success");
    case "error":
      return chunkKKTUNDGG_cjs.c("error");
    case "warning":
      return chunkKKTUNDGG_cjs.c("warning");
    case "info":
      return chunkKKTUNDGG_cjs.c("info");
  }
};
var ToastContainer = styled56__default.default.div`
  align-items: center;
  animation: ${({ $isClosing }) => $isClosing ? slideOut : slideIn} 0.3s ease-in-out;
  background: ${chunkKKTUNDGG_cjs.c("white")};
  border-left: 4px solid ${({ $type }) => getBorderColor($type)};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  box-shadow: ${chunkKKTUNDGG_cjs.el("lg")};
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  max-width: 400px;
  min-width: 300px;
  padding: ${chunkKKTUNDGG_cjs.s("sm")};
  pointer-events: auto;
  position: relative;
`;
var ToastIcon = styled56__default.default.div`
  color: ${({ $type }) => getBorderColor($type)};
  flex-shrink: 0;
`;
var ToastContent = styled56__default.default.div`
  flex: 1;
`;
var ToastTitle = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  margin: 0 0 ${chunkKKTUNDGG_cjs.s("micro")};
`;
var ToastMessage = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: 1.4;
  margin: 0;
`;
var ToastCloseButton = styled56__default.default.button`
  background: transparent;
  border: none;
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  cursor: pointer;
  flex-shrink: 0;
  padding: ${chunkKKTUNDGG_cjs.s("micro")};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  }

  &:focus {
    color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
    outline: 2px solid ${chunkKKTUNDGG_cjs.c("primary500")};
    outline-offset: 2px;
  }
`;
var DEFAULT_NOTIFICATION = { id: "", message: "", type: "info" };
var NotificationToast = ({
  notification = DEFAULT_NOTIFICATION,
  onClose = () => {
  }
}) => {
  const safeNotification = notification || DEFAULT_NOTIFICATION;
  const getIcon = () => {
    switch (safeNotification.type) {
      case "success":
        return /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckCircle, { size: 20 });
      case "warning":
        return /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertTriangle, { size: 20 });
      case "info":
        return /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Info, { size: 20 });
      case "error":
      default:
        return /* @__PURE__ */ jsxRuntime.jsx(lucideReact.XCircle, { size: 20 });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(ToastContainer, { $type: safeNotification.type, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ToastIcon, { $type: safeNotification.type, children: getIcon() }),
    /* @__PURE__ */ jsxRuntime.jsxs(ToastContent, { children: [
      safeNotification.title && /* @__PURE__ */ jsxRuntime.jsx(ToastTitle, { children: safeNotification.title }),
      /* @__PURE__ */ jsxRuntime.jsx(ToastMessage, { children: safeNotification.message })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(ToastCloseButton, { type: "button", onClick: onClose, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 16 }) })
  ] });
};
var PageWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;
var ScreenContainer = styled56__default.default.section`
  flex: 1;
`;
var PageTitle = styled56__default.default.h1`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("4xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  margin: 0 0 ${chunkKKTUNDGG_cjs.s("sm")};
`;
var HeaderRow = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: space-between;
  margin-bottom: ${chunkKKTUNDGG_cjs.s("md")};
`;
var SectionTitle = styled56__default.default.h2`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  margin: 0 0 ${chunkKKTUNDGG_cjs.s("sm")};
`;
var PageLayout = ({ children, className, title }) => /* @__PURE__ */ jsxRuntime.jsx(PageWrapper, { className, children: /* @__PURE__ */ jsxRuntime.jsxs(ScreenContainer, { children: [
  title && /* @__PURE__ */ jsxRuntime.jsx(PageTitle, { children: title }),
  children
] }) });
var Wrapper = styled56__default.default.div`
  position: relative;
  width: 100%;
`;
var Input2 = styled56__default.default.input`
  background: ${chunkKKTUNDGG_cjs.c("white")};
  border: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  padding: ${chunkKKTUNDGG_cjs.s("xs")};
  padding-right: ${({ $hasIcon }) => $hasIcon ? "48px" : chunkKKTUNDGG_cjs.s("xs")};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &::placeholder {
    color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  }

  &:hover:not(:disabled) {
    border-color: ${chunkKKTUNDGG_cjs.c("primary300")};
  }

  &:focus {
    border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
    box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("primary100")};
    outline: none;
  }

  &:disabled {
    background: ${chunkKKTUNDGG_cjs.c("neutral100")};
    cursor: not-allowed;
  }
`;
var ToggleButton = styled56__default.default.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  cursor: pointer;
  display: flex;
  padding: ${chunkKKTUNDGG_cjs.s("xs")};
  position: absolute;
  right: ${chunkKKTUNDGG_cjs.s("micro")};
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.2s ease;

  &:hover:not(:disabled) {
    color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
var preventPaste = (e) => e.preventDefault();
var PasswordInput = ({
  autoComplete,
  className,
  disabled = false,
  disablePaste = false,
  id,
  name,
  onChange,
  onToggleVisibility,
  placeholder,
  showPassword = false,
  value
}) => /* @__PURE__ */ jsxRuntime.jsxs(Wrapper, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(
    Input2,
    {
      $hasIcon: Boolean(onToggleVisibility),
      autoComplete,
      className,
      disabled,
      id,
      name,
      placeholder,
      type: showPassword ? "text" : "password",
      value,
      onChange,
      onPaste: disablePaste ? preventPaste : void 0
    }
  ),
  onToggleVisibility && /* @__PURE__ */ jsxRuntime.jsx(ToggleButton, { disabled, type: "button", onClick: onToggleVisibility, children: showPassword ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.EyeOff, { size: 20 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Eye, { size: 20 }) })
] });
var getBackgroundColor = (variant) => {
  switch (variant) {
    case "blue":
    case "secondary":
      return chunkKKTUNDGG_cjs.c("secondary300");
    case "pill":
    case "accent":
      return chunkKKTUNDGG_cjs.c("accent500");
    case "primary":
      return chunkKKTUNDGG_cjs.c("primary400");
    case "yellow":
      return chunkKKTUNDGG_cjs.c("primary200");
  }
};
var isPillVariant = (variant) => variant === "pill" || variant === "accent";
var pillStyles = styled56.css`
  border: none;
  border-radius: 9999px;
  box-shadow: none;
  color: ${chunkKKTUNDGG_cjs.c("white")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  padding: ${chunkKKTUNDGG_cjs.s("sm")} ${chunkKKTUNDGG_cjs.s("md")};

  &:hover:not(:disabled) {
    box-shadow: none;
    transform: scale(1.02);
  }

  &:active:not(:disabled) {
    box-shadow: none;
    transform: scale(0.98);
  }
`;
var solidStyles = styled56.css`
  border: 2px solid ${chunkKKTUNDGG_cjs.c("neutral900")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  color: ${chunkKKTUNDGG_cjs.c("neutral900")};
  padding: ${chunkKKTUNDGG_cjs.s("sm")} ${chunkKKTUNDGG_cjs.s("lg")};

  &:hover:not(:disabled) {
    box-shadow: ${chunkKKTUNDGG_cjs.el("md")};
    transform: translateY(2px);
  }

  &:active:not(:disabled) {
    box-shadow: ${chunkKKTUNDGG_cjs.el("sm")};
    transform: translateY(4px);
  }
`;
var StyledPopButton = styled56__default.default.button`
  background-color: ${({ $variant }) => getBackgroundColor($variant ?? "yellow")};
  cursor: pointer;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("2xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
  letter-spacing: 0.02em;
  min-height: ${chunkKKTUNDGG_cjs.s("2xl")};
  transition: all 0.15s ease;

  &:focus-visible {
    outline: 2px solid ${chunkKKTUNDGG_cjs.c("cyan500")};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ $variant }) => isPillVariant($variant) ? pillStyles : solidStyles}
`;
var PopButton = ({
  children,
  disabled,
  onClick,
  type = "button",
  variant = "yellow"
}) => /* @__PURE__ */ jsxRuntime.jsx(StyledPopButton, { $variant: variant, disabled, type, onClick, children });
var fillAnimation = styled56.keyframes`
  from {
    width: 0;
  }
`;
var ProgressContainer = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
  width: 100%;
`;
var ProgressHeader = styled56__default.default.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
var ProgressLabel = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
`;
var ProgressPercentage = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("accent500")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
`;
var ProgressTrack = styled56__default.default.div`
  background: ${chunkKKTUNDGG_cjs.c("neutral200")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  height: ${({ $size }) => {
  switch ($size) {
    case "small":
      return "6px";
    case "medium":
      return "8px";
    case "large":
      return "12px";
  }
}};
  overflow: hidden;
  width: 100%;
`;
var ProgressFill = styled56__default.default.div`
  animation: ${fillAnimation} 0.6s ease-out forwards;
  background: ${({ $variant }) => {
  switch ($variant) {
    case "success":
      return chunkKKTUNDGG_cjs.c("success");
    case "warning":
      return chunkKKTUNDGG_cjs.c("warning");
    case "default":
      return `linear-gradient(90deg, ${chunkKKTUNDGG_cjs.c("accent500")}, ${chunkKKTUNDGG_cjs.c("tertiary300")})`;
  }
}};
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  height: 100%;
  transition: width 0.3s ease-out;
  width: ${({ $percentage }) => `${Math.min(100, Math.max(0, $percentage))}%`};
`;
var ProgressBar = ({
  className,
  label,
  max = 100,
  showPercentage = true,
  size = "medium",
  value,
  variant = "default"
}) => {
  const percentage = max > 0 ? Math.round(value / max * 100) : 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(ProgressContainer, { className, children: [
    (label || showPercentage) && /* @__PURE__ */ jsxRuntime.jsxs(ProgressHeader, { children: [
      label && /* @__PURE__ */ jsxRuntime.jsx(ProgressLabel, { children: label }),
      showPercentage && /* @__PURE__ */ jsxRuntime.jsxs(ProgressPercentage, { children: [
        percentage,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(ProgressTrack, { $size: size, children: /* @__PURE__ */ jsxRuntime.jsx(ProgressFill, { $percentage: percentage, $variant: variant }) })
  ] });
};
var StyledRadioGroup = styled56__default.default.div`
  display: flex;
  flex-direction: ${({ $direction }) => $direction === "horizontal" ? "row" : "column"};
  gap: ${({ $direction }) => $direction === "horizontal" ? chunkKKTUNDGG_cjs.s("sm") : chunkKKTUNDGG_cjs.s("xs")};
`;
var RadioWrapper = styled56__default.default.label`
  align-items: center;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: inline-flex;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  user-select: none;
`;
var RadioInput = styled56__default.default.input`
  appearance: none;
  background-color: ${chunkKKTUNDGG_cjs.c("white")};
  border: 2px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  cursor: inherit;
  height: ${chunkKKTUNDGG_cjs.s("sm")};
  margin: 0;
  position: relative;
  transition: all 0.2s ease;
  width: ${chunkKKTUNDGG_cjs.s("sm")};

  &:hover:not(:disabled) {
    border-color: ${chunkKKTUNDGG_cjs.c("primary400")};
  }

  &:focus {
    border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
    box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("primary100")};
    outline: none;
  }

  &:checked {
    border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
  }

  &:checked::after {
    background-color: ${chunkKKTUNDGG_cjs.c("primary500")};
    border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
    content: '';
    height: ${chunkKKTUNDGG_cjs.s("xs")};
    left: 3px;
    position: absolute;
    top: 3px;
    width: ${chunkKKTUNDGG_cjs.s("xs")};
  }

  &:disabled {
    background-color: ${chunkKKTUNDGG_cjs.c("neutral100")};
    border-color: ${chunkKKTUNDGG_cjs.c("neutral300")};
  }
`;
var RadioLabel = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
`;
var RadioGroup = ({ children, className, direction = "vertical" }) => /* @__PURE__ */ jsxRuntime.jsx(StyledRadioGroup, { $direction: direction, className, children });
var Radio = ({
  checked = false,
  className,
  disabled = false,
  id,
  label,
  name,
  onChange,
  value
}) => /* @__PURE__ */ jsxRuntime.jsxs(RadioWrapper, { $disabled: disabled, className, children: [
  /* @__PURE__ */ jsxRuntime.jsx(
    RadioInput,
    {
      checked,
      disabled,
      id,
      name,
      type: "radio",
      value,
      onChange
    }
  ),
  label && /* @__PURE__ */ jsxRuntime.jsx(RadioLabel, { children: label })
] });
var ScreenBoundary = ({
  children,
  className,
  error,
  errorAction,
  errorTitle = "Error",
  isLoading,
  loadingMessage,
  title
}) => {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsxs(ScreenContainer, { className, children: [
      /* @__PURE__ */ jsxRuntime.jsx(PageTitle, { children: title }),
      /* @__PURE__ */ jsxRuntime.jsx(LoadingState, { message: loadingMessage })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntime.jsxs(ScreenContainer, { className, children: [
      /* @__PURE__ */ jsxRuntime.jsx(PageTitle, { children: title }),
      /* @__PURE__ */ jsxRuntime.jsx(ErrorState, { action: errorAction, message: error, title: errorTitle })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(ScreenContainer, { className, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PageTitle, { children: title }),
    children
  ] });
};
var FilterBar = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  margin-bottom: ${chunkKKTUNDGG_cjs.s("md")};
`;
var StyledSearchInput = styled56__default.default.input`
  background: ${chunkKKTUNDGG_cjs.c("white")};
  border: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  flex: 1;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  min-width: 200px;
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
    outline: none;
  }

  &::placeholder {
    color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  }
`;
var SearchInput = ({
  children,
  className,
  onChange,
  placeholder = "Search...",
  value
}) => {
  const handleChange = react.useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(FilterBar, { className, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      StyledSearchInput,
      {
        placeholder,
        type: "text",
        value,
        onChange: handleChange
      }
    ),
    children
  ] });
};
var SIZE_STYLES = {
  lg: styled56.css`
    font-size: ${chunkKKTUNDGG_cjs.ts("base")};
    min-height: ${chunkKKTUNDGG_cjs.s("lg")};
    padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("md")};
  `,
  md: styled56.css`
    font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
    min-height: ${chunkKKTUNDGG_cjs.s("md")};
    padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
  `,
  sm: styled56.css`
    font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
    min-height: ${chunkKKTUNDGG_cjs.s("sm")};
    padding: ${chunkKKTUNDGG_cjs.s("micro")} ${chunkKKTUNDGG_cjs.s("sm")};
  `
};
var SelectWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
  width: 100%;
`;
var SelectLabel = styled56__default.default.label`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
`;
var StyledSelect = styled56__default.default.select`
  appearance: none;
  background-color: ${chunkKKTUNDGG_cjs.c("white")};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right ${chunkKKTUNDGG_cjs.s("xs")} center;
  background-repeat: no-repeat;
  border: 1px solid ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  cursor: pointer;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  outline: none;
  padding-right: ${chunkKKTUNDGG_cjs.s("lg")};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  ${({ $size }) => SIZE_STYLES[$size]}

  &:focus {
    border-color: ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("primary500")};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("errorFocusShadow") : chunkKKTUNDGG_cjs.c("primaryFocusShadow")};
  }

  &:disabled {
    background-color: ${chunkKKTUNDGG_cjs.c("backgroundDark")};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
var SelectError = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("error")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
`;
var SelectOption = styled56__default.default.option``;
var Select = ({
  className,
  disabled = false,
  error,
  id,
  label,
  name,
  onChange,
  options,
  placeholder,
  required = false,
  size = "md",
  value
}) => {
  const handleChange = react.useCallback(
    (e) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );
  const selectId = id ?? name;
  return /* @__PURE__ */ jsxRuntime.jsxs(SelectWrapper, { className, children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(SelectLabel, { htmlFor: selectId, children: label }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      StyledSelect,
      {
        $hasError: Boolean(error),
        $size: size,
        disabled,
        id: selectId,
        name,
        required,
        value,
        onChange: handleChange,
        children: [
          placeholder && /* @__PURE__ */ jsxRuntime.jsx(SelectOption, { disabled: true, value: "", children: placeholder }),
          options.map((option) => /* @__PURE__ */ jsxRuntime.jsx(SelectOption, { disabled: option.disabled, value: option.value, children: option.label }, option.value))
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntime.jsx(SelectError, { children: error })
  ] });
};
var Wrapper2 = styled56__default.default.label`
  align-items: center;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: inline-flex;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  user-select: none;
`;
var HiddenInput2 = styled56__default.default.input`
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;
var Track = styled56__default.default.span`
  background-color: ${({ $checked }) => $checked ? chunkKKTUNDGG_cjs.c("primary500") : chunkKKTUNDGG_cjs.c("neutral300")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  display: inline-block;
  height: ${chunkKKTUNDGG_cjs.s("md")};
  position: relative;
  transition: background-color 0.2s ease;
  width: ${chunkKKTUNDGG_cjs.s("xl")};

  &::after {
    background-color: ${chunkKKTUNDGG_cjs.c("white")};
    border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
    content: '';
    height: ${chunkKKTUNDGG_cjs.s("sm")};
    left: ${({ $checked }) => $checked ? "22px" : "2px"};
    position: absolute;
    top: 2px;
    transition: left 0.2s ease;
    width: ${chunkKKTUNDGG_cjs.s("sm")};
  }

  ${({ $disabled }) => $disabled && `
    background-color: ${chunkKKTUNDGG_cjs.c("neutral200")};
  `}
`;
var Label = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
`;
var Switch = ({
  checked = false,
  className,
  disabled = false,
  id,
  label,
  name,
  onChange
}) => /* @__PURE__ */ jsxRuntime.jsxs(Wrapper2, { $disabled: disabled, className, children: [
  /* @__PURE__ */ jsxRuntime.jsx(
    HiddenInput2,
    {
      checked,
      disabled,
      id,
      name,
      type: "checkbox",
      onChange
    }
  ),
  /* @__PURE__ */ jsxRuntime.jsx(Track, { $checked: checked, $disabled: disabled }),
  label && /* @__PURE__ */ jsxRuntime.jsx(Label, { children: label })
] });
var shimmer = styled56.keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;
var VARIANT_DEFAULTS = {
  circular: { borderRadius: "50%", height: chunkKKTUNDGG_cjs.s("xl"), width: chunkKKTUNDGG_cjs.s("xl") },
  rectangular: { borderRadius: chunkKKTUNDGG_cjs.sh("md"), height: "120px", width: "100%" },
  text: { borderRadius: chunkKKTUNDGG_cjs.sh("sm"), height: chunkKKTUNDGG_cjs.s("sm"), width: "100%" }
};
var SkeletonBox = styled56__default.default.div`
  animation: ${shimmer} 1.5s ease-in-out infinite;
  background: linear-gradient(
    90deg,
    ${chunkKKTUNDGG_cjs.c("neutral100")} 25%,
    ${chunkKKTUNDGG_cjs.c("neutral50")} 50%,
    ${chunkKKTUNDGG_cjs.c("neutral100")} 75%
  );
  background-size: 200% 100%;
  border-radius: ${({ $borderRadius, $variant }) => $borderRadius ?? VARIANT_DEFAULTS[$variant].borderRadius};
  height: ${({ $height, $variant }) => $height ?? VARIANT_DEFAULTS[$variant].height};
  width: ${({ $variant, $width }) => $width ?? VARIANT_DEFAULTS[$variant].width};
`;
var Skeleton = ({
  borderRadius,
  className,
  height,
  variant = "text",
  width
}) => /* @__PURE__ */ jsxRuntime.jsx(
  SkeletonBox,
  {
    $borderRadius: borderRadius,
    $height: height,
    $variant: variant,
    $width: width,
    className,
    "data-testid": "skeleton"
  }
);
var Header = styled56__default.default.th`
  color: ${({ $active }) => $active ? chunkKKTUNDGG_cjs.c("primary500") : chunkKKTUNDGG_cjs.c("textSecondary")};
  cursor: pointer;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  letter-spacing: ${chunkKKTUNDGG_cjs.tt("wide")};
  padding: ${chunkKKTUNDGG_cjs.s("sm")};
  text-align: left;
  text-transform: uppercase;
  transition: color 0.15s ease;
  user-select: none;
  ${({ $width }) => $width && `width: ${$width};`}

  &:hover {
    color: ${chunkKKTUNDGG_cjs.c("primary500")};
  }
`;
var SortIcon = styled56__default.default.span`
  display: inline-flex;
  margin-left: ${chunkKKTUNDGG_cjs.s("micro")};
  vertical-align: middle;
`;
var SortableHeader = ({
  active = false,
  className,
  direction,
  label,
  onSort,
  width
}) => /* @__PURE__ */ jsxRuntime.jsxs(Header, { $active: active, $width: width, className, onClick: onSort, children: [
  label,
  /* @__PURE__ */ jsxRuntime.jsxs(SortIcon, { children: [
    !active && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUpDown, { size: 12 }),
    active && direction === "asc" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUp, { size: 12 }),
    active && direction === "desc" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowDown, { size: 12 })
  ] })
] });
var sizeMap = {
  "2xl": chunkKKTUNDGG_cjs.s("2xl"),
  "3xl": chunkKKTUNDGG_cjs.s("3xl"),
  lg: chunkKKTUNDGG_cjs.s("lg"),
  md: chunkKKTUNDGG_cjs.s("md"),
  sm: chunkKKTUNDGG_cjs.s("sm"),
  xl: chunkKKTUNDGG_cjs.s("xl"),
  xs: chunkKKTUNDGG_cjs.s("xs")
};
var getSpacing = (size) => size ? sizeMap[size] : "0";
var StyledSpacer = styled56__default.default.div`
  ${({ $horizontal, $isWrapper, $mode, $vertical }) => {
  const verticalValue = getSpacing($vertical);
  const horizontalValue = getSpacing($horizontal);
  if ($isWrapper) {
    if ($mode === "padding") {
      return styled56.css`
          padding: ${$vertical ? verticalValue : "0"} ${$horizontal ? horizontalValue : "0"};
        `;
    }
    return styled56.css`
        margin: ${$vertical ? verticalValue : "0"} ${$horizontal ? horizontalValue : "0"};
      `;
  }
  return styled56.css`
      display: block;
      height: ${$vertical ? verticalValue : "0"};
      width: ${$horizontal ? horizontalValue : "0"};
    `;
}}
`;
var Spacer = ({
  children,
  className,
  horizontal,
  mode = "margin",
  vertical
}) => {
  const isWrapper = children !== void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledSpacer,
    {
      $horizontal: horizontal,
      $isWrapper: isWrapper,
      $mode: mode,
      $vertical: vertical,
      className,
      "data-testid": "spacer",
      children
    }
  );
};
var getStatVariantStyles = (variant) => {
  switch (variant) {
    case "primary":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("primary100")};
        color: ${chunkKKTUNDGG_cjs.c("primary700")};
      `;
    case "success":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("successBackground")};
        color: ${chunkKKTUNDGG_cjs.c("successDark")};
      `;
    case "warning":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("warningBackground")};
        color: ${chunkKKTUNDGG_cjs.c("warningDark")};
      `;
    case "danger":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("errorBackground")};
        color: ${chunkKKTUNDGG_cjs.c("errorDark")};
      `;
    case "info":
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("secondary100")};
        color: ${chunkKKTUNDGG_cjs.c("secondary700")};
      `;
    case "default":
    default:
      return styled56.css`
        background: ${chunkKKTUNDGG_cjs.c("neutral100")};
        color: ${chunkKKTUNDGG_cjs.c("neutral700")};
      `;
  }
};
var StyledStatItem = styled56__default.default.div`
  align-items: center;
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  padding: ${chunkKKTUNDGG_cjs.s("sm")} ${chunkKKTUNDGG_cjs.s("md")};
  ${({ $variant }) => getStatVariantStyles($variant)}
`;
var StatIconWrapper = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  height: ${chunkKKTUNDGG_cjs.s("md")};
  justify-content: center;
  width: ${chunkKKTUNDGG_cjs.s("md")};

  svg {
    height: 100%;
    width: 100%;
  }
`;
var StatContent = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
`;
var StatLabel = styled56__default.default.span`
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  opacity: 0.8;
`;
var StatValue = styled56__default.default.span`
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("2xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
`;
var StyledStatsBar = styled56__default.default.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${chunkKKTUNDGG_cjs.s("md")};
  margin-bottom: ${chunkKKTUNDGG_cjs.s("md")};
`;
var StyledStatsGrid = styled56__default.default.div`
  display: grid;
  gap: ${chunkKKTUNDGG_cjs.s("md")};
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  margin-bottom: ${chunkKKTUNDGG_cjs.s("md")};

  @media (width <= 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width <= 640px) {
    grid-template-columns: 1fr;
  }
`;
var StatItem = ({ className, icon, label, value, variant = "default" }) => /* @__PURE__ */ jsxRuntime.jsxs(StyledStatItem, { $variant: variant, className, children: [
  icon && /* @__PURE__ */ jsxRuntime.jsx(StatIconWrapper, { children: icon }),
  /* @__PURE__ */ jsxRuntime.jsxs(StatContent, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(StatLabel, { children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(StatValue, { children: value })
  ] })
] });
var StatsBar = ({ children, className }) => /* @__PURE__ */ jsxRuntime.jsx(StyledStatsBar, { className, children });
var StatsGrid = ({ children, className, columns = 4 }) => /* @__PURE__ */ jsxRuntime.jsx(StyledStatsGrid, { $columns: columns, className, children });
var cardBackground = ($variant) => {
  switch ($variant) {
    case "primary":
      return `linear-gradient(135deg, ${chunkKKTUNDGG_cjs.c("accent500")}, ${chunkKKTUNDGG_cjs.c("tertiary300")})`;
    case "success":
      return chunkKKTUNDGG_cjs.c("successLight");
    case "warning":
      return chunkKKTUNDGG_cjs.c("warningLight");
    case "danger":
      return chunkKKTUNDGG_cjs.c("errorLight");
    case "info":
      return chunkKKTUNDGG_cjs.c("infoLight");
    case "default":
      return chunkKKTUNDGG_cjs.c("white");
  }
};
var iconColor = ($variant) => {
  switch ($variant) {
    case "primary":
      return chunkKKTUNDGG_cjs.c("white");
    case "success":
      return chunkKKTUNDGG_cjs.c("successDark");
    case "warning":
      return chunkKKTUNDGG_cjs.c("warningDark");
    case "danger":
      return chunkKKTUNDGG_cjs.c("errorDark");
    case "info":
      return chunkKKTUNDGG_cjs.c("infoDark");
    case "default":
      return chunkKKTUNDGG_cjs.c("accent500");
  }
};
var CardContainer = styled56__default.default.div`
  background: ${({ $variant }) => cardBackground($variant)};
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")};
  box-shadow: ${chunkKKTUNDGG_cjs.el("sm")};
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  padding: ${chunkKKTUNDGG_cjs.s("md")};
`;
var iconBackground = ($variant) => {
  if ($variant === "primary") return "rgba(255, 255, 255, 0.2)";
  if ($variant === "default") return chunkKKTUNDGG_cjs.c("primary200");
  return `rgb(${chunkKKTUNDGG_cjs.c("whiteRgb")} / 0.6)`;
};
var CardIcon = styled56__default.default.div`
  align-items: center;
  background: ${({ $variant }) => iconBackground($variant)};
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  color: ${({ $variant }) => iconColor($variant)};
  display: flex;
  height: ${chunkKKTUNDGG_cjs.s("xl")};
  justify-content: center;
  width: ${chunkKKTUNDGG_cjs.s("xl")};

  svg {
    height: ${chunkKKTUNDGG_cjs.s("sm")};
    width: ${chunkKKTUNDGG_cjs.s("sm")};
  }
`;
var CardValue = styled56__default.default.span`
  color: ${({ $variant }) => $variant === "primary" ? chunkKKTUNDGG_cjs.c("white") : chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("3xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
`;
var CardLabel = styled56__default.default.span`
  color: ${({ $variant }) => $variant === "primary" ? "rgba(255, 255, 255, 0.9)" : chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
`;
var CardSublabel = styled56__default.default.span`
  color: ${({ $variant }) => $variant === "primary" ? "rgba(255, 255, 255, 0.7)" : chunkKKTUNDGG_cjs.c("neutral400")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
`;
var StatsCard = ({
  className,
  icon,
  label,
  sublabel,
  value,
  variant = "default"
}) => /* @__PURE__ */ jsxRuntime.jsxs(CardContainer, { $variant: variant, className, children: [
  icon && /* @__PURE__ */ jsxRuntime.jsx(CardIcon, { $variant: variant, children: icon }),
  /* @__PURE__ */ jsxRuntime.jsx(CardValue, { $variant: variant, children: value }),
  /* @__PURE__ */ jsxRuntime.jsx(CardLabel, { $variant: variant, children: label }),
  sublabel && /* @__PURE__ */ jsxRuntime.jsx(CardSublabel, { $variant: variant, children: sublabel })
] });
var StepCardContainer = styled56__default.default.div`
  background-color: ${chunkKKTUNDGG_cjs.c("surface")};
  border: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")};
  padding: ${chunkKKTUNDGG_cjs.s("xl")};
  text-align: center;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: ${chunkKKTUNDGG_cjs.el("md")};
    transform: translateY(-4px);
  }
`;
var StepNumber = styled56__default.default.div`
  align-items: center;
  background: linear-gradient(135deg, ${chunkKKTUNDGG_cjs.c("primary500")}, ${chunkKKTUNDGG_cjs.c("textAccent")});
  border-radius: 50%;
  color: ${chunkKKTUNDGG_cjs.c("white")};
  display: flex;
  font-size: ${chunkKKTUNDGG_cjs.ts("2xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
  height: ${chunkKKTUNDGG_cjs.s("2xl")};
  justify-content: center;
  margin: 0 auto ${chunkKKTUNDGG_cjs.s("md")};
  width: ${chunkKKTUNDGG_cjs.s("2xl")};
`;
var StepTitle = styled56__default.default.div`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  margin-bottom: ${chunkKKTUNDGG_cjs.s("sm")};
`;
var StepDescription = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("base")};
  line-height: 1.6;
`;
var StepCard = ({ className, description, number, title }) => /* @__PURE__ */ jsxRuntime.jsxs(StepCardContainer, { className, children: [
  /* @__PURE__ */ jsxRuntime.jsx(StepNumber, { children: number }),
  /* @__PURE__ */ jsxRuntime.jsx(StepTitle, { children: title }),
  /* @__PURE__ */ jsxRuntime.jsx(StepDescription, { children: description })
] });
var TabsContainer = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
var TabList = styled56__default.default.div`
  border-bottom: 2px solid ${chunkKKTUNDGG_cjs.c("neutral200")};
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
  overflow-x: auto;
  scrollbar-width: none;

  @media (min-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    gap: ${chunkKKTUNDGG_cjs.s("xs")};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
var TabButton = styled56__default.default.button`
  align-items: center;
  background: transparent;
  border: none;
  border-bottom: 3px solid ${({ $isActive }) => $isActive ? chunkKKTUNDGG_cjs.c("accent500") : "transparent"};
  color: ${({ $isActive, $isDisabled }) => {
  if ($isDisabled) return chunkKKTUNDGG_cjs.c("neutral400");
  return $isActive ? chunkKKTUNDGG_cjs.c("accent500") : chunkKKTUNDGG_cjs.c("textSecondary");
}};
  cursor: ${({ $isDisabled }) => $isDisabled ? "not-allowed" : "pointer"};
  display: flex;
  flex-shrink: 0;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${({ $isActive }) => $isActive ? chunkKKTUNDGG_cjs.tw("semibold") : chunkKKTUNDGG_cjs.tw("medium")};
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  margin-bottom: -2px;
  opacity: ${({ $isDisabled }) => $isDisabled ? 0.5 : 1};
  padding: ${chunkKKTUNDGG_cjs.s("sm")} ${chunkKKTUNDGG_cjs.s("sm")};
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  @media (min-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    font-size: ${chunkKKTUNDGG_cjs.ts("base")};
    padding: ${chunkKKTUNDGG_cjs.s("sm")} ${chunkKKTUNDGG_cjs.s("md")};
  }

  &:hover:not(:disabled) {
    background: ${chunkKKTUNDGG_cjs.c("neutral50")};
    color: ${({ $isActive }) => $isActive ? chunkKKTUNDGG_cjs.c("accent500") : chunkKKTUNDGG_cjs.c("textPrimary")};
  }

  svg {
    height: ${chunkKKTUNDGG_cjs.s("sm")};
    width: ${chunkKKTUNDGG_cjs.s("sm")};
  }
`;
var TabBadge = styled56__default.default.span`
  background: ${chunkKKTUNDGG_cjs.c("accent500")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  color: ${chunkKKTUNDGG_cjs.c("white")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  min-width: ${chunkKKTUNDGG_cjs.s("sm")};
  padding: ${chunkKKTUNDGG_cjs.s("micro")} ${chunkKKTUNDGG_cjs.s("xs")};
  text-align: center;
`;
var TabContent = styled56__default.default.div`
  padding: ${chunkKKTUNDGG_cjs.s("md")} 0;
`;
var Tabs = ({ activeTabId, className, onTabChange, tabs }) => {
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const handleClick = react.useCallback(
    (event) => {
      const { tabId } = event.currentTarget.dataset;
      const tab = tabs.find((t) => t.id === tabId);
      if (tab && !tab.disabled) {
        onTabChange(tab.id);
      }
    },
    [onTabChange, tabs]
  );
  const renderTab = (tab) => {
    const isActive = tab.id === activeTabId;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      TabButton,
      {
        $isActive: isActive,
        $isDisabled: tab.disabled ?? false,
        "aria-selected": isActive,
        "data-tab-id": tab.id,
        disabled: tab.disabled,
        role: "tab",
        type: "button",
        onClick: handleClick,
        children: [
          tab.icon,
          tab.label,
          tab.badge !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(TabBadge, { children: tab.badge })
        ]
      },
      tab.id
    );
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(TabsContainer, { className, children: [
    /* @__PURE__ */ jsxRuntime.jsx(TabList, { role: "tablist", children: tabs.map(renderTab) }),
    /* @__PURE__ */ jsxRuntime.jsx(TabContent, { role: "tabpanel", children: activeTab?.content })
  ] });
};
var pulse2 = styled56.keyframes`
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
`;
var fadeOut2 = styled56.keyframes`
  from { opacity: 1; }
  to { opacity: 0; pointer-events: none; }
`;
var getPositionStyles = (position) => {
  switch (position) {
    case "bottom-right":
      return styled56.css`
        bottom: ${chunkKKTUNDGG_cjs.s("sm")};
        right: ${chunkKKTUNDGG_cjs.s("sm")};
      `;
    case "top-right":
      return styled56.css`
        right: ${chunkKKTUNDGG_cjs.s("sm")};
        top: ${chunkKKTUNDGG_cjs.s("sm")};
      `;
    case "center":
      return styled56.css`
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `;
  }
};
var hiddenAnimation = styled56.css`
  animation:
    ${pulse2} 2s ease-in-out infinite,
    ${fadeOut2} 0.3s ease-out forwards;
`;
var visibleAnimation = styled56.css`
  animation: ${pulse2} 2s ease-in-out infinite;
`;
var TapHintWrapper = styled56__default.default.div`
  align-items: center;
  ${({ $isHidden }) => $isHidden ? hiddenAnimation : visibleAnimation}
  background: ${chunkKKTUNDGG_cjs.c("black")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  color: ${chunkKKTUNDGG_cjs.c("white")};
  display: flex;
  height: ${({ $size }) => `${$size}px`};
  justify-content: center;
  opacity: 0.7;
  pointer-events: none;
  position: absolute;
  width: ${({ $size }) => `${$size}px`};
  z-index: 5;

  ${({ $position }) => getPositionStyles($position)}
`;
var TapHint = ({
  autoHideMs = 5e3,
  position = "bottom-right",
  size = 32
}) => {
  const [isHidden, setIsHidden] = react.useState(false);
  const [isRemoved, setIsRemoved] = react.useState(false);
  react.useEffect(() => {
    if (autoHideMs <= 0) return;
    const timer = setTimeout(() => setIsHidden(true), autoHideMs);
    return () => clearTimeout(timer);
  }, [autoHideMs]);
  react.useEffect(() => {
    if (!isHidden) return;
    const timer = setTimeout(() => setIsRemoved(true), 300);
    return () => clearTimeout(timer);
  }, [isHidden]);
  if (isRemoved) return null;
  const iconSize = Math.round(size * 0.5);
  return /* @__PURE__ */ jsxRuntime.jsx(TapHintWrapper, { $isHidden: isHidden, $position: position, $size: size, "data-testid": "tap-hint", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Maximize2, { size: iconSize }) });
};
var TextareaWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
  width: 100%;
`;
var TextareaLabel = styled56__default.default.label`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: var(--sui-font-weight-medium, 500);
`;
var StyledTextarea = styled56__default.default.textarea`
  border: 1px solid ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: ${chunkKKTUNDGG_cjs.tl("relaxed")};
  outline: none;
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
  resize: vertical;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &::placeholder {
    color: ${chunkKKTUNDGG_cjs.c("textDisabled")};
  }

  &:focus {
    border-color: ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("primary500")};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("errorFocusShadow") : chunkKKTUNDGG_cjs.c("primaryFocusShadow")};
  }

  &:disabled {
    background-color: ${chunkKKTUNDGG_cjs.c("backgroundDark")};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
var TextareaFooter = styled56__default.default.div`
  display: flex;
  justify-content: space-between;
`;
var TextareaError = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("error")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
`;
var TextareaSpacer = styled56__default.default.span``;
var TextareaCount = styled56__default.default.span`
  color: ${({ $isOver }) => $isOver ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("textTertiary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  margin-left: auto;
`;
var Textarea = ({
  className,
  disabled = false,
  error,
  id,
  label,
  maxLength,
  name,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  showCount = false,
  value = ""
}) => {
  const handleChange = react.useCallback(
    (e) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );
  const textareaId = id ?? name;
  const currentLength = value.length;
  const isOver = maxLength ? currentLength > maxLength : false;
  const hasFooter = error || showCount && maxLength;
  return /* @__PURE__ */ jsxRuntime.jsxs(TextareaWrapper, { className, children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(TextareaLabel, { htmlFor: textareaId, children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      StyledTextarea,
      {
        $hasError: Boolean(error) || isOver,
        disabled,
        id: textareaId,
        maxLength,
        name,
        placeholder,
        required,
        rows,
        value,
        onChange: handleChange
      }
    ),
    hasFooter && /* @__PURE__ */ jsxRuntime.jsxs(TextareaFooter, { children: [
      error ? /* @__PURE__ */ jsxRuntime.jsx(TextareaError, { children: error }) : /* @__PURE__ */ jsxRuntime.jsx(TextareaSpacer, {}),
      showCount && maxLength && /* @__PURE__ */ jsxRuntime.jsxs(TextareaCount, { $isOver: isOver, children: [
        currentLength,
        "/",
        maxLength
      ] })
    ] })
  ] });
};
var TRACK_SIZES = {
  md: { height: "24px", thumb: "20px", width: "44px" },
  sm: { height: "18px", thumb: "14px", width: "34px" }
};
var ToggleWrapper = styled56__default.default.label`
  align-items: center;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: inline-flex;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
`;
var HiddenInput3 = styled56__default.default.input`
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;
var ToggleTrack = styled56__default.default.div`
  background-color: ${({ $checked }) => $checked ? chunkKKTUNDGG_cjs.c("success") : chunkKKTUNDGG_cjs.c("neutral300")};
  border-radius: 9999px;
  height: ${({ $size }) => TRACK_SIZES[$size].height};
  position: relative;
  transition: background-color 0.2s ease;
  width: ${({ $size }) => TRACK_SIZES[$size].width};
`;
var ToggleThumb = styled56__default.default.div`
  background-color: ${chunkKKTUNDGG_cjs.c("white")};
  border-radius: 50%;
  box-shadow: 0 1px 3px rgb(${chunkKKTUNDGG_cjs.color.blackRgb} / 0.2);
  height: ${({ $size }) => TRACK_SIZES[$size].thumb};
  left: 2px;
  position: absolute;
  top: 2px;
  transform: translateX(
    ${({ $checked, $size }) => $checked ? `calc(${TRACK_SIZES[$size].width} - ${TRACK_SIZES[$size].thumb} - 4px)` : "0"}
  );
  transition: transform 0.2s ease;
  width: ${({ $size }) => TRACK_SIZES[$size].thumb};
`;
var ToggleLabel = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
`;
var Toggle = ({
  checked = false,
  className,
  disabled = false,
  id,
  label,
  name,
  onChange,
  size = "md"
}) => {
  const handleChange = react.useCallback(
    (e) => {
      onChange?.(e.target.checked);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(ToggleWrapper, { $disabled: disabled, className, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      HiddenInput3,
      {
        checked,
        disabled,
        id: id ?? name,
        name,
        type: "checkbox",
        onChange: handleChange
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(ToggleTrack, { $checked: checked, $size: size, children: /* @__PURE__ */ jsxRuntime.jsx(ToggleThumb, { $checked: checked, $size: size }) }),
    label && /* @__PURE__ */ jsxRuntime.jsx(ToggleLabel, { children: label })
  ] });
};
var spin5 = styled56.keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var buttonSize2 = ($size) => $size === "sm" ? chunkKKTUNDGG_cjs.s("md") : chunkKKTUNDGG_cjs.s("lg");
var StyledToggleButton = styled56__default.default.button`
  align-items: center;
  background: ${({ $isActive, $isLoading }) => {
  if ($isLoading) return chunkKKTUNDGG_cjs.c("warningBackground");
  return $isActive ? chunkKKTUNDGG_cjs.c("errorBackground") : chunkKKTUNDGG_cjs.c("successBackground");
}};
  border: none;
  border-radius: ${({ $shape }) => $shape === "circle" ? chunkKKTUNDGG_cjs.sh("full") : chunkKKTUNDGG_cjs.sh("md")};
  color: ${({ $isActive, $isLoading }) => {
  if ($isLoading) return chunkKKTUNDGG_cjs.c("warningDark");
  return $isActive ? chunkKKTUNDGG_cjs.c("errorDark") : chunkKKTUNDGG_cjs.c("successDark");
}};
  cursor: ${({ $isLoading }) => $isLoading ? "wait" : "pointer"};
  display: inline-flex;
  height: ${({ $size }) => buttonSize2($size)};
  justify-content: center;
  min-width: ${({ $size }) => buttonSize2($size)};
  padding: 0;
  transition: all 0.2s ease;
  width: ${({ $size }) => buttonSize2($size)};

  &:hover:not(:disabled) {
    filter: brightness(0.92);
  }
`;
var SpinnerIcon2 = styled56__default.default.span`
  animation: ${spin5} 1s linear infinite;
  display: inline-flex;
`;
var ToggleActiveButton = ({
  isActive,
  isLoading = false,
  onClick,
  shape = "square",
  size = "sm",
  title
}) => {
  const buttonTitle = title ?? (isActive ? "Desactivar" : "Activar");
  const iconSize = size === "sm" ? 14 : 16;
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledToggleButton,
    {
      $isActive: isActive,
      $isLoading: isLoading,
      $shape: shape,
      $size: size,
      title: buttonTitle,
      type: "button",
      onClick: isLoading ? void 0 : onClick,
      children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(SpinnerIcon2, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { size: iconSize }) }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Power, { size: iconSize })
    }
  );
};
var POSITION_STYLES = {
  bottom: styled56.css`
    left: 50%;
    top: calc(100% + ${chunkKKTUNDGG_cjs.s("xs")});
    transform: translateX(-50%);
  `,
  left: styled56.css`
    right: calc(100% + ${chunkKKTUNDGG_cjs.s("xs")});
    top: 50%;
    transform: translateY(-50%);
  `,
  right: styled56.css`
    left: calc(100% + ${chunkKKTUNDGG_cjs.s("xs")});
    top: 50%;
    transform: translateY(-50%);
  `,
  top: styled56.css`
    bottom: calc(100% + ${chunkKKTUNDGG_cjs.s("xs")});
    left: 50%;
    transform: translateX(-50%);
  `
};
var TooltipContainer = styled56__default.default.div`
  display: inline-block;
  position: relative;
`;
var TooltipContent = styled56__default.default.div`
  background-color: ${chunkKKTUNDGG_cjs.c("dark300")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${chunkKKTUNDGG_cjs.c("white")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  max-width: 250px;
  opacity: 0;
  padding: ${chunkKKTUNDGG_cjs.s("micro")} ${chunkKKTUNDGG_cjs.s("xs")};
  pointer-events: none;
  position: absolute;
  transition: opacity 0.15s ease;
  white-space: nowrap;
  z-index: 100;

  ${({ $position }) => POSITION_STYLES[$position]}

  ${TooltipContainer}:hover & {
    opacity: 1;
  }
`;
var Tooltip = ({ children, className, content, position = "top" }) => /* @__PURE__ */ jsxRuntime.jsxs(TooltipContainer, { className, children: [
  children,
  /* @__PURE__ */ jsxRuntime.jsx(TooltipContent, { $position: position, children: content })
] });
var ModalOverlay2 = styled56__default.default.div`
  align-items: center;
  backdrop-filter: blur(4px);
  background: rgb(${chunkKKTUNDGG_cjs.c("blackRgb")} / 0.85);
  display: flex;
  inset: 0;
  justify-content: center;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  position: fixed;
  transition: opacity ${chunkKKTUNDGG_cjs.mo("normal")};
  visibility: ${({ $isOpen }) => $isOpen ? "visible" : "hidden"};
  z-index: ${chunkKKTUNDGG_cjs.layout.zIndex.modal};
`;
var ModalContent2 = styled56__default.default.div`
  max-height: 90vh;
  max-width: 90vw;
  position: relative;
`;
var PreviewImage = styled56__default.default.img`
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")};
  display: block;
  max-height: 80vh;
  max-width: 85vw;
  object-fit: contain;
`;
var ImageOverlay = styled56__default.default.div`
  align-items: flex-start;
  background: linear-gradient(to bottom, rgb(${chunkKKTUNDGG_cjs.c("blackRgb")} / 0.7) 0%, transparent 100%);
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")} ${chunkKKTUNDGG_cjs.sh("lg")} 0 0;
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: space-between;
  left: 0;
  padding: ${chunkKKTUNDGG_cjs.s("md")} ${chunkKKTUNDGG_cjs.s("lg")};
  position: absolute;
  right: 0;
  top: 0;
`;
var TitleWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var ImageTitle = styled56__default.default.h2`
  color: ${chunkKKTUNDGG_cjs.c("white")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
  margin: 0;
  text-shadow: 0 2px 4px rgb(${chunkKKTUNDGG_cjs.c("blackRgb")} / 0.5);
`;
var BadgeSlot = styled56__default.default.span`
  width: fit-content;
`;
var CloseButton = styled56__default.default.button`
  align-items: center;
  background: rgb(${chunkKKTUNDGG_cjs.c("whiteRgb")} / 0.2);
  border: none;
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  color: ${chunkKKTUNDGG_cjs.c("white")};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: ${chunkKKTUNDGG_cjs.s("lg")};
  justify-content: center;
  transition: background ${chunkKKTUNDGG_cjs.mo("fast")};
  width: ${chunkKKTUNDGG_cjs.s("lg")};

  &:hover {
    background: rgb(${chunkKKTUNDGG_cjs.c("whiteRgb")} / 0.3);
  }
`;
var CaptionOverlay = styled56__default.default.div`
  background: linear-gradient(to top, rgb(${chunkKKTUNDGG_cjs.c("blackRgb")} / 0.7) 0%, transparent 100%);
  border-radius: 0 0 ${chunkKKTUNDGG_cjs.sh("lg")} ${chunkKKTUNDGG_cjs.sh("lg")};
  bottom: 0;
  left: 0;
  padding: ${chunkKKTUNDGG_cjs.s("lg")} ${chunkKKTUNDGG_cjs.s("lg")} ${chunkKKTUNDGG_cjs.s("md")};
  position: absolute;
  right: 0;
`;
var ImageDescription = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("white")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  line-height: ${chunkKKTUNDGG_cjs.tl("normal")};
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgb(${chunkKKTUNDGG_cjs.c("blackRgb")} / 0.5);
`;
var ImagePreviewModal = ({
  badge,
  closeLabel = "Close",
  description,
  imageUrl,
  isOpen,
  onClose,
  title
}) => {
  const handleKeyDown = react.useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );
  const handleOverlayClick = react.useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );
  react.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(ModalOverlay2, { $isOpen: isOpen, onClick: handleOverlayClick, children: /* @__PURE__ */ jsxRuntime.jsxs(ModalContent2, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(PreviewImage, { alt: title, src: imageUrl }),
    /* @__PURE__ */ jsxRuntime.jsxs(ImageOverlay, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(TitleWrapper, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ImageTitle, { children: title }),
        badge && /* @__PURE__ */ jsxRuntime.jsx(BadgeSlot, { children: badge })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CloseButton, { "aria-label": closeLabel, type: "button", onClick: onClose, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 20 }) })
    ] }),
    description && /* @__PURE__ */ jsxRuntime.jsx(CaptionOverlay, { children: /* @__PURE__ */ jsxRuntime.jsx(ImageDescription, { children: description }) })
  ] }) });
};
var StyledInlineIcon = styled56__default.default.span`
  display: inline-flex;
  margin-bottom: ${({ $position, $tight }) => $position === "top" ? chunkKKTUNDGG_cjs.s($tight ? "micro" : "xs") : "0"};
  margin-right: ${({ $position, $tight }) => $position === "left" ? chunkKKTUNDGG_cjs.s($tight ? "micro" : "xs") : "0"};
  vertical-align: middle;
`;
var InlineIcon = ({
  children,
  className,
  position = "left",
  tight = false
}) => /* @__PURE__ */ jsxRuntime.jsx(StyledInlineIcon, { $position: position, $tight: tight, className, children });
var FooterContainer = styled56__default.default.footer`
  background: ${chunkKKTUNDGG_cjs.c("backgroundDark")};
  color: ${chunkKKTUNDGG_cjs.c("textInverse")};
  width: 100%;
`;
var FooterContent = styled56__default.default.div`
  display: grid;
  gap: ${chunkKKTUNDGG_cjs.s("lg")};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0 auto;
  max-width: ${chunkKKTUNDGG_cjs.layout.container.lg};
  padding: ${chunkKKTUNDGG_cjs.s("lg")} ${chunkKKTUNDGG_cjs.s("md")};
`;
var BrandSection = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var FooterColumnWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var ColumnTitle = styled56__default.default.h3`
  color: ${chunkKKTUNDGG_cjs.c("textInverse")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
  letter-spacing: 0.05em;
  margin: 0 0 ${chunkKKTUNDGG_cjs.s("micro")};
  text-transform: uppercase;
`;
var FooterBottom = styled56__default.default.div`
  align-items: center;
  border-top: 1px solid rgb(${chunkKKTUNDGG_cjs.c("whiteRgb")} / 0.15);
  display: flex;
  flex-wrap: wrap;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${chunkKKTUNDGG_cjs.layout.container.lg};
  padding: ${chunkKKTUNDGG_cjs.s("sm")} ${chunkKKTUNDGG_cjs.s("md")};

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    flex-direction: column;
    text-align: center;
  }
`;
var Copyright = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("textInverse")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  margin: 0;
  opacity: 0.8;
`;
var SocialSlot = styled56__default.default.div`
  align-items: center;
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var AppFooter = ({
  bottomSlot,
  brandSlot,
  className,
  columns = [],
  copyright,
  socialSlot
}) => /* @__PURE__ */ jsxRuntime.jsxs(FooterContainer, { className, children: [
  (brandSlot ?? columns.length > 0) && /* @__PURE__ */ jsxRuntime.jsxs(FooterContent, { children: [
    brandSlot && /* @__PURE__ */ jsxRuntime.jsx(BrandSection, { children: brandSlot }),
    columns.map((column, index) => /* @__PURE__ */ jsxRuntime.jsxs(FooterColumnWrapper, { children: [
      column.title && /* @__PURE__ */ jsxRuntime.jsx(ColumnTitle, { children: column.title }),
      column.content
    ] }, column.title ?? `column-${index}`))
  ] }),
  (copyright ?? socialSlot ?? bottomSlot) && /* @__PURE__ */ jsxRuntime.jsxs(FooterBottom, { children: [
    copyright && /* @__PURE__ */ jsxRuntime.jsx(Copyright, { children: copyright }),
    bottomSlot,
    socialSlot && /* @__PURE__ */ jsxRuntime.jsx(SocialSlot, { children: socialSlot })
  ] })
] });
var HeaderBar = styled56__default.default.header`
  background: ${chunkKKTUNDGG_cjs.c("surface")};
  border-bottom: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  position: ${({ $sticky }) => $sticky ? "sticky" : "relative"};
  top: 0;
  width: 100%;
  z-index: ${chunkKKTUNDGG_cjs.layout.zIndex.sticky};
`;
var HeaderContent = styled56__default.default.div`
  align-items: center;
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("md")};
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${chunkKKTUNDGG_cjs.layout.container.lg};
  padding: ${chunkKKTUNDGG_cjs.s("sm")} ${chunkKKTUNDGG_cjs.s("md")};
`;
var LogoSlot = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;
var NavSlot = styled56__default.default.nav`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: center;

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    display: none;
  }
`;
var ActionsSlot = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    display: none;
  }
`;
var MenuButton = styled56__default.default.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  padding: ${chunkKKTUNDGG_cjs.s("micro")};

  @media (min-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    display: none;
  }
`;
var MobileMenu = styled56__default.default.div`
  background: ${chunkKKTUNDGG_cjs.c("surface")};
  box-shadow: ${chunkKKTUNDGG_cjs.el("md")};
  display: ${({ $isOpen }) => $isOpen ? "block" : "none"};
  padding: ${chunkKKTUNDGG_cjs.s("sm")} ${chunkKKTUNDGG_cjs.s("md")};
  transition: ${chunkKKTUNDGG_cjs.mo("fast")};

  @media (min-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    display: none;
  }
`;
var AppHeader = ({
  actionsSlot,
  className,
  closeMenuLabel = "Close menu",
  logoSlot,
  mobileMenuContent,
  navSlot,
  openMenuLabel = "Open menu",
  sticky = true
}) => {
  const [isMenuOpen, setIsMenuOpen] = react.useState(false);
  const handleToggleMenu = react.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsxs(HeaderBar, { $sticky: sticky, className, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(HeaderContent, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(LogoSlot, { children: logoSlot }),
      navSlot && /* @__PURE__ */ jsxRuntime.jsx(NavSlot, { children: navSlot }),
      actionsSlot && /* @__PURE__ */ jsxRuntime.jsx(ActionsSlot, { children: actionsSlot }),
      mobileMenuContent && /* @__PURE__ */ jsxRuntime.jsx(
        MenuButton,
        {
          "aria-expanded": isMenuOpen,
          "aria-label": isMenuOpen ? closeMenuLabel : openMenuLabel,
          type: "button",
          onClick: handleToggleMenu,
          children: isMenuOpen ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 24 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Menu, { size: 24 })
        }
      )
    ] }),
    mobileMenuContent && /* @__PURE__ */ jsxRuntime.jsx(MobileMenu, { $isOpen: isMenuOpen, children: mobileMenuContent })
  ] });
};
var AuthPageWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;
var AuthSection = styled56__default.default.section`
  align-items: center;
  background-color: ${chunkKKTUNDGG_cjs.c("backgroundAlt")};
  display: flex;
  flex: 1;
  justify-content: center;
  padding: ${chunkKKTUNDGG_cjs.s("lg")} ${chunkKKTUNDGG_cjs.s("sm")};
  position: relative;

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    align-items: flex-start;
    padding: ${chunkKKTUNDGG_cjs.s("md")} ${chunkKKTUNDGG_cjs.s("sm")};
  }
`;
var AuthContent = styled56__default.default.div`
  align-items: center;
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("lg")};
  justify-content: center;
  max-width: ${chunkKKTUNDGG_cjs.layout.container.lg};
  position: relative;
  width: 100%;

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.lg}) {
    flex-direction: column;
  }
`;
var AuthSideSlot = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.lg}) {
    display: none;
  }

  img {
    height: auto;
    max-height: 420px;
    width: auto;
  }
`;
var AuthCardWrapper = styled56__default.default.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("md")};
  max-width: 480px;
  width: 100%;

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    max-width: 100%;
  }
`;
var AuthHeader = styled56__default.default.div`
  text-align: center;
`;
var AuthTitle = styled56__default.default.h1`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-size: ${chunkKKTUNDGG_cjs.ts("6xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
  margin: 0;

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    font-size: ${chunkKKTUNDGG_cjs.ts("4xl")};
  }
`;
var AuthSubtitle = styled56__default.default.p`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("2xl")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  margin: ${chunkKKTUNDGG_cjs.s("xs")} 0 0;

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    font-size: ${chunkKKTUNDGG_cjs.ts("xl")};
  }
`;
var StyledAuthCard = styled56__default.default.div`
  background: ${chunkKKTUNDGG_cjs.c("surface")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")};
  box-shadow: ${chunkKKTUNDGG_cjs.el("md")};
  padding: ${chunkKKTUNDGG_cjs.s("lg")};

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    padding: ${chunkKKTUNDGG_cjs.s("md")};
  }
`;
var AuthCard = ({ children, className }) => /* @__PURE__ */ jsxRuntime.jsx(StyledAuthCard, { className, children });
var AuthLayout = ({
  children,
  className,
  leftSlot,
  rightSlot,
  subtitle,
  title
}) => /* @__PURE__ */ jsxRuntime.jsx(AuthPageWrapper, { className, children: /* @__PURE__ */ jsxRuntime.jsx(AuthSection, { children: /* @__PURE__ */ jsxRuntime.jsxs(AuthContent, { children: [
  leftSlot && /* @__PURE__ */ jsxRuntime.jsx(AuthSideSlot, { children: leftSlot }),
  /* @__PURE__ */ jsxRuntime.jsxs(AuthCardWrapper, { children: [
    (title ?? subtitle) && /* @__PURE__ */ jsxRuntime.jsxs(AuthHeader, { children: [
      title && /* @__PURE__ */ jsxRuntime.jsx(AuthTitle, { children: title }),
      subtitle && /* @__PURE__ */ jsxRuntime.jsx(AuthSubtitle, { children: subtitle })
    ] }),
    children
  ] }),
  rightSlot && /* @__PURE__ */ jsxRuntime.jsx(AuthSideSlot, { children: rightSlot })
] }) }) });
var spin6 = styled56.keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var sizeStyles2 = ($size) => {
  if ($size === "large") {
    return styled56.css`
      font-size: ${chunkKKTUNDGG_cjs.ts("4xl")};
      height: 120px;
      width: 120px;
    `;
  }
  if ($size === "small") {
    return styled56.css`
      font-size: ${chunkKKTUNDGG_cjs.ts("base")};
      height: ${chunkKKTUNDGG_cjs.s("2xl")};
      width: ${chunkKKTUNDGG_cjs.s("2xl")};
    `;
  }
  return styled56.css`
    font-size: ${chunkKKTUNDGG_cjs.ts("2xl")};
    height: ${chunkKKTUNDGG_cjs.s("6xl")};
    width: ${chunkKKTUNDGG_cjs.s("6xl")};
  `;
};
var Container7 = styled56__default.default.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var AvatarWrapper = styled56__default.default.div`
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  position: relative;
  ${({ $size }) => sizeStyles2($size)}

  &:hover > div:last-child {
    opacity: ${({ $disabled }) => $disabled ? 0 : 1};
  }
`;
var Avatar2 = styled56__default.default.div`
  align-items: center;
  background: ${({ $hasPhoto }) => $hasPhoto ? "transparent" : chunkKKTUNDGG_cjs.c("secondary700")};
  border: 4px solid ${chunkKKTUNDGG_cjs.c("white")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  box-shadow: ${chunkKKTUNDGG_cjs.el("lg")};
  color: ${chunkKKTUNDGG_cjs.c("white")};
  display: flex;
  font-family: ${chunkKKTUNDGG_cjs.tf("display")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("bold")};
  justify-content: center;
  overflow: hidden;
  text-transform: uppercase;
  ${({ $size }) => sizeStyles2($size)}
`;
var AvatarImage2 = styled56__default.default.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
var Overlay = styled56__default.default.div`
  align-items: center;
  background: rgb(${chunkKKTUNDGG_cjs.c("blackRgb")} / 0.5);
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  color: ${chunkKKTUNDGG_cjs.c("white")};
  display: flex;
  inset: 0;
  justify-content: center;
  opacity: 0;
  position: absolute;
  transition: opacity 0.2s ease-in-out;

  svg {
    height: ${chunkKKTUNDGG_cjs.s("md")};
    width: ${chunkKKTUNDGG_cjs.s("md")};
  }
`;
var LoadingOverlay2 = styled56__default.default.div`
  align-items: center;
  background: rgb(${chunkKKTUNDGG_cjs.c("blackRgb")} / 0.6);
  border-radius: ${chunkKKTUNDGG_cjs.sh("full")};
  color: ${chunkKKTUNDGG_cjs.c("white")};
  display: flex;
  inset: 0;
  justify-content: center;
  position: absolute;

  svg {
    animation: ${spin6} 1s linear infinite;
    height: ${chunkKKTUNDGG_cjs.s("md")};
    width: ${chunkKKTUNDGG_cjs.s("md")};
  }
`;
var HiddenInput4 = styled56__default.default.input`
  display: none;
`;
var Name2 = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  text-align: center;
`;
var DEFAULT_ACCEPT = "image/jpeg,image/png,image/webp";
var AvatarUpload = ({
  accept = DEFAULT_ACCEPT,
  changeLabel = "Change photo",
  className,
  currentPhotoUrl,
  disabled = false,
  initials: initials2,
  isUploading = false,
  name,
  onFileSelect,
  size = "medium"
}) => {
  const inputRef = react.useRef(null);
  const [previewUrl, setPreviewUrl] = react.useState(null);
  const handleClick = react.useCallback(() => {
    if (!disabled && !isUploading) {
      inputRef.current?.click();
    }
  }, [disabled, isUploading]);
  const handleFileChange = react.useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result;
        setPreviewUrl(preview);
        onFileSelect(file, preview);
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    },
    [onFileSelect]
  );
  const displayUrl = previewUrl ?? currentPhotoUrl;
  return /* @__PURE__ */ jsxRuntime.jsxs(Container7, { className, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      AvatarWrapper,
      {
        $disabled: disabled,
        $size: size,
        "aria-label": changeLabel,
        role: "button",
        onClick: handleClick,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(Avatar2, { $hasPhoto: Boolean(displayUrl), $size: size, children: displayUrl ? /* @__PURE__ */ jsxRuntime.jsx(AvatarImage2, { alt: name ?? changeLabel, src: displayUrl }) : initials2 }),
          isUploading ? /* @__PURE__ */ jsxRuntime.jsx(LoadingOverlay2, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, {}) }) : /* @__PURE__ */ jsxRuntime.jsx(Overlay, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Camera, {}) })
        ]
      }
    ),
    name && /* @__PURE__ */ jsxRuntime.jsx(Name2, { children: name }),
    /* @__PURE__ */ jsxRuntime.jsx(
      HiddenInput4,
      {
        accept,
        "aria-hidden": "true",
        "data-testid": "avatar-upload-input",
        disabled,
        ref: inputRef,
        tabIndex: -1,
        type: "file",
        onChange: handleFileChange
      }
    )
  ] });
};
var PaginationWrapper = styled56__default.default.nav`
  align-items: center;
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
  justify-content: center;
`;
var buttonBase = styled56.css`
  align-items: center;
  background: none;
  border: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  cursor: pointer;
  display: inline-flex;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  justify-content: center;
  min-height: 2rem;
  min-width: 2rem;
  padding: ${chunkKKTUNDGG_cjs.s("micro")} ${chunkKKTUNDGG_cjs.s("xs")};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${chunkKKTUNDGG_cjs.c("neutral50")};
    border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
    color: ${chunkKKTUNDGG_cjs.c("primary500")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;
var PaginationButton = styled56__default.default.button`
  ${buttonBase}

  ${({ $active }) => $active && styled56.css`
      background-color: ${chunkKKTUNDGG_cjs.c("primary500")};
      border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
      color: ${chunkKKTUNDGG_cjs.c("white")};

      &:hover:not(:disabled) {
        background-color: ${chunkKKTUNDGG_cjs.c("primary600")};
        border-color: ${chunkKKTUNDGG_cjs.c("primary600")};
        color: ${chunkKKTUNDGG_cjs.c("white")};
      }
    `}
`;
var PaginationEllipsis = styled56__default.default.span`
  align-items: center;
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  display: inline-flex;
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  justify-content: center;
  min-height: 2rem;
  min-width: 2rem;
`;
var ELLIPSIS = "ellipsis";
var range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (value, index) => {
    return start + index;
  });
};
var generatePages = (currentPage, totalPages, siblingCount) => {
  const totalNumbers = siblingCount * 2 + 3;
  const totalBlocks = totalNumbers + 2;
  if (totalPages <= totalBlocks) {
    return range(1, totalPages);
  }
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;
  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, totalNumbers), ELLIPSIS, totalPages];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, ELLIPSIS, ...range(totalPages - totalNumbers + 1, totalPages)];
  }
  return [1, ELLIPSIS, ...range(leftSiblingIndex, rightSiblingIndex), ELLIPSIS, totalPages];
};
var Pagination = ({
  className,
  currentPage,
  nextLabel,
  onPageChange,
  previousLabel,
  showFirstLast = false,
  siblingCount = 1,
  totalPages
}) => {
  const pages = react.useMemo(
    () => generatePages(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );
  const handlePageChange = react.useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
      }
    },
    [currentPage, onPageChange, totalPages]
  );
  const handleFirst = react.useCallback(() => handlePageChange(1), [handlePageChange]);
  const handlePrev = react.useCallback(
    () => handlePageChange(currentPage - 1),
    [currentPage, handlePageChange]
  );
  const handleNext = react.useCallback(
    () => handlePageChange(currentPage + 1),
    [currentPage, handlePageChange]
  );
  const handleLast = react.useCallback(
    () => handlePageChange(totalPages),
    [handlePageChange, totalPages]
  );
  const handlePageClick = react.useCallback(
    (e) => {
      const page = Number(e.currentTarget.dataset.page);
      if (!Number.isNaN(page)) handlePageChange(page);
    },
    [handlePageChange]
  );
  const renderPages = () => pages.map(
    (page, index) => page === ELLIPSIS ? /* @__PURE__ */ jsxRuntime.jsx(PaginationEllipsis, { children: "..." }, `ellipsis-${index}`) : /* @__PURE__ */ jsxRuntime.jsx(
      PaginationButton,
      {
        $active: page === currentPage,
        "aria-current": page === currentPage ? "page" : void 0,
        "data-page": page,
        onClick: handlePageClick,
        children: page
      },
      page
    )
  );
  if (totalPages <= 1) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(PaginationWrapper, { "aria-label": "Pagination", className, children: [
    showFirstLast && /* @__PURE__ */ jsxRuntime.jsx(
      PaginationButton,
      {
        "aria-label": "First page",
        disabled: currentPage === 1,
        onClick: handleFirst,
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsLeft, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      PaginationButton,
      {
        "aria-label": previousLabel ?? "Previous page",
        disabled: currentPage === 1,
        onClick: handlePrev,
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { size: 16 })
      }
    ),
    renderPages(),
    /* @__PURE__ */ jsxRuntime.jsx(
      PaginationButton,
      {
        "aria-label": nextLabel ?? "Next page",
        disabled: currentPage === totalPages,
        onClick: handleNext,
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { size: 16 })
      }
    ),
    showFirstLast && /* @__PURE__ */ jsxRuntime.jsx(
      PaginationButton,
      {
        "aria-label": "Last page",
        disabled: currentPage === totalPages,
        onClick: handleLast,
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsRight, { size: 16 })
      }
    )
  ] });
};
var DataTableWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  width: 100%;
`;
var DataTableToolbar = styled56__default.default.div`
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  justify-content: flex-end;
`;
var DataTableSearchInput = styled56__default.default.input`
  border: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  max-width: 20rem;
  outline: none;
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
  transition: border-color 0.2s ease;
  width: 100%;

  &::placeholder {
    color: ${chunkKKTUNDGG_cjs.c("textDisabled")};
  }

  &:focus {
    border-color: ${chunkKKTUNDGG_cjs.c("primary500")};
    box-shadow: 0 0 0 3px ${chunkKKTUNDGG_cjs.c("primaryFocusShadow")};
  }
`;
var DataTableContainer = styled56__default.default.div`
  border: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")};
  overflow-x: auto;
  width: 100%;
`;
var StyledTable = styled56__default.default.table`
  border-collapse: collapse;
  min-width: 100%;
  width: 100%;
`;
var TableHead = styled56__default.default.thead`
  background-color: ${chunkKKTUNDGG_cjs.c("neutral50")};
`;
var TableHeadRow = styled56__default.default.tr`
  border-bottom: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
`;
var TableHeadCell = styled56__default.default.th`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  cursor: ${({ $sortable }) => $sortable ? "pointer" : "default"};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("semibold")};
  letter-spacing: ${chunkKKTUNDGG_cjs.tt("wide")};
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
  text-align: ${({ $align }) => $align};
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;
  width: ${({ $width }) => $width ?? "auto"};

  ${({ $sortable }) => $sortable && styled56.css`
      &:hover {
        color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
      }
    `}
`;
var TableHeadCellContent = styled56__default.default.span`
  align-items: center;
  display: inline-flex;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
`;
var SortIcon2 = styled56__default.default.span`
  color: ${({ $active }) => $active ? chunkKKTUNDGG_cjs.c("primary500") : chunkKKTUNDGG_cjs.c("textDisabled")};
  display: inline-flex;
`;
var TableBody = styled56__default.default.tbody``;
var TableRow = styled56__default.default.tr`
  border-bottom: 1px solid ${chunkKKTUNDGG_cjs.c("borderLight")};
  transition: background-color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${chunkKKTUNDGG_cjs.c("neutral50")};
  }
`;
var TableCell = styled56__default.default.td`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
  text-align: ${({ $align }) => $align};
`;
var TableEmptyRow = styled56__default.default.tr``;
var TableEmptyCell = styled56__default.default.td`
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  padding: ${chunkKKTUNDGG_cjs.s("xl")} ${chunkKKTUNDGG_cjs.s("sm")};
  text-align: center;
`;
var shimmer2 = styled56.keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;
var TableLoadingCell = styled56__default.default.td`
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
`;
var TableLoadingBar = styled56__default.default.div`
  animation: ${shimmer2} 1.5s infinite;
  background: linear-gradient(
    90deg,
    ${chunkKKTUNDGG_cjs.c("neutral50")} 25%,
    ${chunkKKTUNDGG_cjs.c("neutral100")} 50%,
    ${chunkKKTUNDGG_cjs.c("neutral50")} 75%
  );
  background-size: 200% 100%;
  border-radius: ${chunkKKTUNDGG_cjs.sh("sm")};
  height: 1rem;
  width: 100%;
`;
var DataTableFooter = styled56__default.default.div`
  display: flex;
  justify-content: center;
  padding-top: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var SelectionCheckbox = styled56__default.default.input`
  accent-color: ${chunkKKTUNDGG_cjs.c("primary500")};
  cursor: pointer;
  height: ${chunkKKTUNDGG_cjs.s("sm")};
  width: ${chunkKKTUNDGG_cjs.s("sm")};
`;
var RowActions = styled56__default.default.div`
  display: inline-flex;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
  justify-content: flex-end;
`;
var LOADING_ROWS = 5;
var loadingRowKeys = Array.from({ length: LOADING_ROWS }, (value, index) => {
  return `loading-${index}`;
});
var DataTable = ({
  actionsHeader = "",
  className,
  columns,
  currentPage,
  data,
  emptyMessage = "No data available",
  loading = false,
  onPageChange,
  onSearch,
  onSelectionChange,
  onSort,
  rowActions,
  rowKey,
  searchPlaceholder = "Search...",
  searchValue,
  selectable = false,
  selectAllLabel = "Select all rows",
  selectedKeys = [],
  selectRowLabel = "Select row",
  sort,
  totalPages
}) => {
  const hasSelection = selectable && onSelectionChange !== void 0;
  const hasActions = rowActions !== void 0 && rowActions.length > 0;
  const totalColumns = columns.length + (hasSelection ? 1 : 0) + (hasActions ? 1 : 0);
  const handleSort = react.useCallback(
    (e) => {
      const { colKey } = e.currentTarget.dataset;
      if (!colKey || !onSort) return;
      const column = columns.find((c2) => c2.key === colKey);
      if (!column?.sortable) return;
      const newDirection = sort?.key === colKey && sort.direction === "asc" ? "desc" : "asc";
      onSort({ direction: newDirection, key: colKey });
    },
    [columns, onSort, sort]
  );
  const handleSearch = react.useCallback(
    (e) => {
      onSearch?.(e.target.value);
    },
    [onSearch]
  );
  const handleToggleAll = react.useCallback(() => {
    if (!onSelectionChange) return;
    const allKeys = data.map(rowKey);
    const allSelected2 = allKeys.length > 0 && allKeys.every((key) => selectedKeys.includes(key));
    onSelectionChange(allSelected2 ? [] : allKeys);
  }, [data, onSelectionChange, rowKey, selectedKeys]);
  const handleToggleRowEvent = react.useCallback(
    (e) => {
      const { rowKey: key } = e.currentTarget.dataset;
      if (!key || !onSelectionChange) return;
      const isSelected = selectedKeys.includes(key);
      onSelectionChange(
        isSelected ? selectedKeys.filter((selected) => selected !== key) : [...selectedKeys, key]
      );
    },
    [onSelectionChange, selectedKeys]
  );
  const renderSortIcon = (column) => {
    if (!column.sortable) return null;
    const isActive = sort?.key === column.key;
    if (!isActive) {
      return /* @__PURE__ */ jsxRuntime.jsx(SortIcon2, { $active: false, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUpDown, { size: 14 }) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(SortIcon2, { $active: true, children: sort?.direction === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUp, { size: 14 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowDown, { size: 14 }) });
  };
  const renderCell = (column, row, index) => {
    if (column.render) return column.render(row, index);
    return row[column.key];
  };
  const handleRowAction = react.useCallback(
    (action, row) => () => action.onClick(row),
    []
  );
  const renderRowActions = (row, actions) => /* @__PURE__ */ jsxRuntime.jsx(RowActions, { children: actions.map((action) => /* @__PURE__ */ jsxRuntime.jsx(
    ActionButton,
    {
      disabled: action.disabled?.(row) ?? false,
      icon: action.icon,
      title: action.title,
      variant: action.variant ?? "neutral",
      onClick: handleRowAction(action, row)
    },
    action.key
  )) });
  const renderLoadingRows = () => loadingRowKeys.map((key) => /* @__PURE__ */ jsxRuntime.jsxs(TableRow, { children: [
    hasSelection && /* @__PURE__ */ jsxRuntime.jsx(TableLoadingCell, { children: /* @__PURE__ */ jsxRuntime.jsx(TableLoadingBar, {}) }),
    columns.map((col) => /* @__PURE__ */ jsxRuntime.jsx(TableLoadingCell, { children: /* @__PURE__ */ jsxRuntime.jsx(TableLoadingBar, {}) }, col.key)),
    hasActions && /* @__PURE__ */ jsxRuntime.jsx(TableLoadingCell, { children: /* @__PURE__ */ jsxRuntime.jsx(TableLoadingBar, {}) })
  ] }, key));
  const renderEmptyRow = () => /* @__PURE__ */ jsxRuntime.jsx(TableEmptyRow, { children: /* @__PURE__ */ jsxRuntime.jsx(TableEmptyCell, { colSpan: totalColumns, children: emptyMessage }) });
  const renderDataRows = () => data.map((row, index) => {
    const key = rowKey(row);
    return /* @__PURE__ */ jsxRuntime.jsxs(TableRow, { children: [
      hasSelection && /* @__PURE__ */ jsxRuntime.jsx(TableCell, { $align: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
        SelectionCheckbox,
        {
          "aria-label": selectRowLabel,
          checked: selectedKeys.includes(key),
          "data-row-key": key,
          type: "checkbox",
          onChange: handleToggleRowEvent
        }
      ) }),
      columns.map((col) => /* @__PURE__ */ jsxRuntime.jsx(TableCell, { $align: col.align ?? "left", children: renderCell(col, row, index) }, col.key)),
      hasActions && rowActions && /* @__PURE__ */ jsxRuntime.jsx(TableCell, { $align: "right", children: renderRowActions(row, rowActions) })
    ] }, key);
  });
  const allSelected = data.length > 0 && data.map(rowKey).every((key) => selectedKeys.includes(key));
  const renderHead = () => /* @__PURE__ */ jsxRuntime.jsx(TableHead, { children: /* @__PURE__ */ jsxRuntime.jsxs(TableHeadRow, { children: [
    hasSelection && /* @__PURE__ */ jsxRuntime.jsx(TableHeadCell, { $align: "center", $sortable: false, $width: "40px", children: /* @__PURE__ */ jsxRuntime.jsx(
      SelectionCheckbox,
      {
        "aria-label": selectAllLabel,
        checked: allSelected,
        type: "checkbox",
        onChange: handleToggleAll
      }
    ) }),
    columns.map((col) => /* @__PURE__ */ jsxRuntime.jsx(
      TableHeadCell,
      {
        $align: col.align ?? "left",
        $sortable: Boolean(col.sortable),
        $width: col.width,
        "data-col-key": col.key,
        onClick: handleSort,
        children: /* @__PURE__ */ jsxRuntime.jsxs(TableHeadCellContent, { children: [
          col.header,
          renderSortIcon(col)
        ] })
      },
      col.key
    )),
    hasActions && /* @__PURE__ */ jsxRuntime.jsx(TableHeadCell, { $align: "right", $sortable: false, children: /* @__PURE__ */ jsxRuntime.jsx(TableHeadCellContent, { children: actionsHeader }) })
  ] }) });
  const hasPagination = onPageChange !== void 0 && currentPage !== void 0 && totalPages !== void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(DataTableWrapper, { className, children: [
    onSearch !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(DataTableToolbar, { children: /* @__PURE__ */ jsxRuntime.jsx(
      DataTableSearchInput,
      {
        placeholder: searchPlaceholder,
        type: "text",
        value: searchValue ?? "",
        onChange: handleSearch
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(DataTableContainer, { children: /* @__PURE__ */ jsxRuntime.jsxs(StyledTable, { children: [
      renderHead(),
      /* @__PURE__ */ jsxRuntime.jsxs(TableBody, { children: [
        loading && renderLoadingRows(),
        !loading && data.length === 0 && renderEmptyRow(),
        !loading && data.length > 0 && renderDataRows()
      ] })
    ] }) }),
    hasPagination && totalPages > 1 && /* @__PURE__ */ jsxRuntime.jsx(DataTableFooter, { children: /* @__PURE__ */ jsxRuntime.jsx(
      Pagination,
      {
        currentPage,
        totalPages,
        onPageChange
      }
    ) })
  ] });
};
var FileUploaderWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  width: 100%;
`;
var FileUploaderLabel = styled56__default.default.label`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
`;
var FileUploaderDropzone = styled56__default.default.div`
  align-items: center;
  border: 2px dashed ${({ $hasError }) => $hasError ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  justify-content: center;
  min-height: 8rem;
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  padding: ${chunkKKTUNDGG_cjs.s("lg")};
  transition: all 0.2s ease;

  ${({ $hasError, $isDragOver }) => $isDragOver && styled56.css`
      background-color: ${$hasError ? chunkKKTUNDGG_cjs.c("errorBackground") : chunkKKTUNDGG_cjs.c("primary50")};
      border-color: ${$hasError ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("primary500")};
    `}

  &:hover {
    border-color: ${({ $disabled, $hasError }) => $disabled ? void 0 : $hasError ? chunkKKTUNDGG_cjs.c("error") : chunkKKTUNDGG_cjs.c("primary500")};
  }
`;
var FileUploaderIcon = styled56__default.default.div`
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
`;
var FileUploaderText = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  text-align: center;
`;
var FileUploaderBrowse = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("primary500")};
  cursor: pointer;
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
  text-decoration: underline;
`;
var FileUploaderDescription = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
  text-align: center;
`;
var FileUploaderError = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("error")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
`;
var FileUploaderFileList = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
`;
var FileUploaderFileItem = styled56__default.default.div`
  align-items: center;
  background-color: ${chunkKKTUNDGG_cjs.c("neutral50")};
  border: 1px solid ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("md")};
  display: flex;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  justify-content: space-between;
  padding: ${chunkKKTUNDGG_cjs.s("xs")} ${chunkKKTUNDGG_cjs.s("sm")};
`;
var FileUploaderFileName = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
var FileUploaderFileSize = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  flex-shrink: 0;
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
`;
var FileUploaderRemoveButton = styled56__default.default.button`
  align-items: center;
  background: none;
  border: none;
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  padding: ${chunkKKTUNDGG_cjs.s("micro")};
  transition: color 0.2s ease;

  &:hover {
    color: ${chunkKKTUNDGG_cjs.c("error")};
  }
`;
var FileUploaderHiddenInput = styled56__default.default.input`
  display: none;
`;
var fileIdCounter = 0;
var generateFileId = () => {
  fileIdCounter += 1;
  return `file-${Date.now()}-${fileIdCounter}`;
};
var formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
var FileUploader = ({
  accept,
  className,
  description,
  disabled = false,
  error,
  label,
  maxFiles = 10,
  maxSizeMB = 10,
  multiple = false,
  onChange,
  value = []
}) => {
  const [isDragOver, setIsDragOver] = react.useState(false);
  const [localError, setLocalError] = react.useState(null);
  const inputRef = react.useRef(null);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const processFiles = react.useCallback(
    (fileList) => {
      if (!fileList || disabled) return;
      setLocalError(null);
      const newFiles = [];
      for (const file of Array.from(fileList)) {
        if (file.size > maxSizeBytes) {
          setLocalError(`File "${file.name}" exceeds ${maxSizeMB}MB limit`);
          return;
        }
        if (value.length + newFiles.length >= maxFiles) {
          setLocalError(`Maximum ${maxFiles} files allowed`);
          break;
        }
        const uploaderFile = {
          file,
          id: generateFileId(),
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : void 0
        };
        newFiles.push(uploaderFile);
      }
      if (newFiles.length > 0) {
        onChange([...value, ...newFiles]);
      }
    },
    [disabled, maxFiles, maxSizeBytes, maxSizeMB, onChange, value]
  );
  const handleDragOver = react.useCallback(
    (e) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    },
    [disabled]
  );
  const handleDragLeave = react.useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  const handleDrop = react.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );
  const handleClick = react.useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);
  const handleInputChange = react.useCallback(
    (e) => {
      processFiles(e.target.files);
      if (inputRef.current) inputRef.current.value = "";
    },
    [processFiles]
  );
  const handleRemoveClick = react.useCallback(
    (e) => {
      e.stopPropagation();
      const { fileId } = e.currentTarget.dataset;
      if (!fileId) return;
      const fileToRemove = value.find((f) => f.id === fileId);
      if (fileToRemove?.preview) URL.revokeObjectURL(fileToRemove.preview);
      onChange(value.filter((f) => f.id !== fileId));
      setLocalError(null);
    },
    [onChange, value]
  );
  const displayError = error ?? localError;
  return /* @__PURE__ */ jsxRuntime.jsxs(FileUploaderWrapper, { className, children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(FileUploaderLabel, { children: label }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      FileUploaderDropzone,
      {
        $disabled: disabled,
        $hasError: Boolean(displayError),
        $isDragOver: isDragOver,
        onClick: handleClick,
        onDragLeave: handleDragLeave,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(FileUploaderIcon, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Upload, { size: 24 }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(FileUploaderText, { children: [
            "Drag files here or ",
            /* @__PURE__ */ jsxRuntime.jsx(FileUploaderBrowse, { children: "browse" })
          ] }),
          description && /* @__PURE__ */ jsxRuntime.jsx(FileUploaderDescription, { children: description })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      FileUploaderHiddenInput,
      {
        accept,
        multiple,
        ref: inputRef,
        type: "file",
        onChange: handleInputChange
      }
    ),
    displayError && /* @__PURE__ */ jsxRuntime.jsx(FileUploaderError, { children: displayError }),
    value.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(FileUploaderFileList, { children: value.map((uploaderFile) => /* @__PURE__ */ jsxRuntime.jsxs(FileUploaderFileItem, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(FileUploaderFileName, { children: uploaderFile.file.name }),
      /* @__PURE__ */ jsxRuntime.jsx(FileUploaderFileSize, { children: formatFileSize(uploaderFile.file.size) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        FileUploaderRemoveButton,
        {
          "aria-label": `Remove ${uploaderFile.file.name}`,
          "data-file-id": uploaderFile.id,
          type: "button",
          onClick: handleRemoveClick,
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 16 })
        }
      )
    ] }, uploaderFile.id)) })
  ] });
};
var FormFieldWrapper = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("micro")};
  width: 100%;
`;
var FormFieldLabel = styled56__default.default.label`
  color: ${chunkKKTUNDGG_cjs.c("textPrimary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
`;
var FormFieldRequired = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("error")};
  margin-left: ${chunkKKTUNDGG_cjs.s("micro")};
`;
var FormFieldError = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("error")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
`;
var FormFieldHelp = styled56__default.default.span`
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  font-family: ${chunkKKTUNDGG_cjs.tf("body")};
  font-size: ${chunkKKTUNDGG_cjs.ts("xs")};
`;
var FormField = ({
  children,
  className,
  error,
  helpText,
  htmlFor,
  label,
  required = false
}) => /* @__PURE__ */ jsxRuntime.jsxs(FormFieldWrapper, { className, children: [
  label && /* @__PURE__ */ jsxRuntime.jsxs(FormFieldLabel, { htmlFor, children: [
    label,
    required && /* @__PURE__ */ jsxRuntime.jsx(FormFieldRequired, { children: "*" })
  ] }),
  children,
  error && /* @__PURE__ */ jsxRuntime.jsx(FormFieldError, { children: error }),
  !error && helpText && /* @__PURE__ */ jsxRuntime.jsx(FormFieldHelp, { children: helpText })
] });
var fadeInUp = styled56.keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
var breath = styled56.keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;
var Container8 = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("sm")};
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: ${chunkKKTUNDGG_cjs.layout.zIndex.fixed};
  ${({ $side }) => $side === "left" ? styled56.css`
          left: ${chunkKKTUNDGG_cjs.s("md")};
        ` : styled56.css`
          right: ${chunkKKTUNDGG_cjs.s("md")};
        `}

  @media (max-width: ${chunkKKTUNDGG_cjs.layout.breakpoint.md}) {
    gap: ${chunkKKTUNDGG_cjs.s("xs")};
    ${({ $side }) => $side === "left" ? styled56.css`
            left: ${chunkKKTUNDGG_cjs.s("sm")};
          ` : styled56.css`
            right: ${chunkKKTUNDGG_cjs.s("sm")};
          `}
  }
`;
var buttonBase2 = styled56.css`
  align-items: center;
  backdrop-filter: blur(10px);
  background: rgb(${chunkKKTUNDGG_cjs.c("tealRgb")} / 0.1);
  border: 1px solid rgb(${chunkKKTUNDGG_cjs.c("tealRgb")} / 0.2);
  border-radius: 50%;
  color: ${chunkKKTUNDGG_cjs.c("primary500")};
  cursor: pointer;
  display: flex;
  height: ${chunkKKTUNDGG_cjs.s("2xl")};
  justify-content: center;
  text-decoration: none;
  transition: all ${chunkKKTUNDGG_cjs.mo("fast")};
  width: ${chunkKKTUNDGG_cjs.s("2xl")};

  &:hover {
    background: rgb(${chunkKKTUNDGG_cjs.c("tealRgb")} / 0.2);
    transform: translateY(-3px) scale(1.1);
  }

  svg {
    height: ${chunkKKTUNDGG_cjs.s("sm")};
    width: ${chunkKKTUNDGG_cjs.s("sm")};
  }
`;
var animation = ({ $animated, $delay }) => $animated ? styled56.css`
        animation:
          ${fadeInUp} 1s ease-out ${$delay}s both,
          ${breath} 6s ease-in-out infinite ${$delay * 0.3}s;
      ` : styled56.css``;
var ActionLink = styled56__default.default.a`
  ${buttonBase2}
  ${animation}
`;
var ActionTrigger = styled56__default.default.button`
  ${buttonBase2}
  ${animation}
  padding: 0;
`;
var STAGGER_SECONDS = 0.1;
var FloatingActions = ({
  animated = true,
  className,
  items,
  side = "right"
}) => {
  if (items.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(Container8, { $side: side, className, children: items.map((item, index) => {
    const delay = (index + 1) * STAGGER_SECONDS;
    if (item.href) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        ActionLink,
        {
          $animated: animated,
          $delay: delay,
          "aria-label": item.label,
          href: item.href,
          rel: "noopener noreferrer",
          target: "_blank",
          title: item.label,
          children: item.icon
        },
        item.label
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      ActionTrigger,
      {
        $animated: animated,
        $delay: delay,
        "aria-label": item.label,
        title: item.label,
        type: "button",
        onClick: item.onClick,
        children: item.icon
      },
      item.label
    );
  }) });
};
var TextField = ({
  autoComplete,
  className,
  disabled = false,
  error,
  helpText,
  id,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = "text",
  value
}) => /* @__PURE__ */ jsxRuntime.jsx(FormField, { className, helpText: error ? void 0 : helpText, children: /* @__PURE__ */ jsxRuntime.jsx(
  Input,
  {
    autoComplete,
    disabled,
    error,
    fullWidth: true,
    id,
    label,
    name: name ?? id,
    placeholder,
    required,
    type,
    value,
    onChange
  }
) });
var SelectField = ({
  className,
  disabled = false,
  error,
  helpText,
  id,
  label,
  name,
  onChange,
  options,
  placeholder,
  required = false,
  value
}) => /* @__PURE__ */ jsxRuntime.jsx(FormField, { className, helpText: error ? void 0 : helpText, children: /* @__PURE__ */ jsxRuntime.jsx(
  Select,
  {
    disabled,
    error,
    id,
    label,
    name: name ?? id,
    options,
    placeholder,
    required,
    value,
    onChange
  }
) });
var TextareaField = ({
  className,
  disabled = false,
  error,
  helpText,
  id,
  label,
  maxLength,
  name,
  onChange,
  placeholder,
  required = false,
  rows,
  showCount = false,
  value
}) => /* @__PURE__ */ jsxRuntime.jsx(FormField, { className, helpText: error ? void 0 : helpText, children: /* @__PURE__ */ jsxRuntime.jsx(
  Textarea,
  {
    disabled,
    error,
    id,
    label,
    maxLength,
    name: name ?? id,
    placeholder,
    required,
    rows,
    showCount,
    value,
    onChange
  }
) });
var spin7 = styled56.keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var Container9 = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  width: 100%;
`;
var Label2 = styled56__default.default.label`
  color: ${chunkKKTUNDGG_cjs.c("textSecondary")};
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  font-weight: ${chunkKKTUNDGG_cjs.tw("medium")};
`;
var UploadArea = styled56__default.default.div`
  align-items: center;
  background-color: ${chunkKKTUNDGG_cjs.c("backgroundAlt")};
  border: 2px dashed ${chunkKKTUNDGG_cjs.c("border")};
  border-radius: ${chunkKKTUNDGG_cjs.sh("lg")};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: flex;
  height: ${({ $height }) => $height};
  justify-content: center;
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  overflow: hidden;
  position: relative;
  transition: ${chunkKKTUNDGG_cjs.mo("normal")};
  width: 100%;

  &:hover {
    border-color: ${({ $disabled }) => $disabled ? chunkKKTUNDGG_cjs.c("border") : chunkKKTUNDGG_cjs.c("primary400")};
  }
`;
var PreviewImage2 = styled56__default.default.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
var Placeholder = styled56__default.default.div`
  align-items: center;
  color: ${chunkKKTUNDGG_cjs.c("textTertiary")};
  display: flex;
  flex-direction: column;
  font-size: ${chunkKKTUNDGG_cjs.ts("sm")};
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
`;
var PlaceholderText = styled56__default.default.span`
  color: inherit;
`;
var Overlay2 = styled56__default.default.div`
  align-items: center;
  background-color: rgb(${chunkKKTUNDGG_cjs.c("blackRgb")} / 0.5);
  display: flex;
  inset: 0;
  justify-content: center;
  opacity: 0;
  position: absolute;
  transition: ${chunkKKTUNDGG_cjs.mo("normal")};

  &:hover {
    opacity: 1;
  }

  svg {
    color: ${chunkKKTUNDGG_cjs.c("white")};
    height: ${chunkKKTUNDGG_cjs.s("lg")};
    width: ${chunkKKTUNDGG_cjs.s("lg")};
  }
`;
var LoadingOverlay3 = styled56__default.default.div`
  align-items: center;
  background-color: rgb(${chunkKKTUNDGG_cjs.c("blackRgb")} / 0.7);
  display: flex;
  inset: 0;
  justify-content: center;
  position: absolute;

  svg {
    animation: ${spin7} 1s linear infinite;
    color: ${chunkKKTUNDGG_cjs.c("white")};
    height: ${chunkKKTUNDGG_cjs.s("lg")};
    width: ${chunkKKTUNDGG_cjs.s("lg")};
  }
`;
var HiddenInput5 = styled56__default.default.input`
  display: none;
`;
var DEFAULT_ACCEPT2 = "image/jpeg,image/png,image/webp";
var ImageUploader = ({
  accept = DEFAULT_ACCEPT2,
  changeLabel = "Change image",
  className,
  currentImageUrl,
  disabled = false,
  height = "160px",
  id,
  isUploading = false,
  label,
  onFileSelect,
  placeholder = "Click to upload an image"
}) => {
  const inputRef = react.useRef(null);
  const [previewUrl, setPreviewUrl] = react.useState(null);
  const handleClick = react.useCallback(() => {
    if (!disabled && !isUploading) {
      inputRef.current?.click();
    }
  }, [disabled, isUploading]);
  const handleFileChange = react.useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result;
        setPreviewUrl(preview);
        onFileSelect(file, preview);
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    },
    [onFileSelect]
  );
  const displayUrl = previewUrl ?? currentImageUrl;
  return /* @__PURE__ */ jsxRuntime.jsxs(Container9, { className, children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(Label2, { htmlFor: id, children: label }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      UploadArea,
      {
        $disabled: disabled,
        $hasImage: Boolean(displayUrl),
        $height: height,
        "aria-label": displayUrl ? changeLabel : placeholder,
        role: "button",
        onClick: handleClick,
        children: [
          displayUrl ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(PreviewImage2, { alt: label ?? changeLabel, src: displayUrl }),
            !isUploading && /* @__PURE__ */ jsxRuntime.jsx(Overlay2, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Camera, {}) })
          ] }) : /* @__PURE__ */ jsxRuntime.jsxs(Placeholder, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ImageIcon, {}),
            /* @__PURE__ */ jsxRuntime.jsx(PlaceholderText, { children: placeholder })
          ] }),
          isUploading && /* @__PURE__ */ jsxRuntime.jsx(LoadingOverlay3, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, {}) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      HiddenInput5,
      {
        accept,
        "aria-hidden": "true",
        "data-testid": "image-uploader-input",
        disabled,
        id,
        ref: inputRef,
        tabIndex: -1,
        type: "file",
        onChange: handleFileChange
      }
    )
  ] });
};
var positionStyles = ($position) => {
  if ($position === "top-left") {
    return styled56.css`
      left: ${chunkKKTUNDGG_cjs.s("md")};
      top: ${chunkKKTUNDGG_cjs.s("md")};
    `;
  }
  if ($position === "bottom-left") {
    return styled56.css`
      bottom: ${chunkKKTUNDGG_cjs.s("md")};
      left: ${chunkKKTUNDGG_cjs.s("md")};
    `;
  }
  if ($position === "bottom-right") {
    return styled56.css`
      bottom: ${chunkKKTUNDGG_cjs.s("md")};
      right: ${chunkKKTUNDGG_cjs.s("md")};
    `;
  }
  return styled56.css`
    right: ${chunkKKTUNDGG_cjs.s("md")};
    top: ${chunkKKTUNDGG_cjs.s("md")};
  `;
};
var Container10 = styled56__default.default.div`
  display: flex;
  flex-direction: column;
  gap: ${chunkKKTUNDGG_cjs.s("xs")};
  max-width: 400px;
  position: fixed;
  width: calc(100vw - ${chunkKKTUNDGG_cjs.s("lg")});
  z-index: ${chunkKKTUNDGG_cjs.layout.zIndex.toast};
  ${({ $position }) => positionStyles($position)}
`;
var NotificationContainer = ({
  notifications,
  onClose,
  position = "top-right"
}) => {
  const handleClose = react.useCallback((id) => () => onClose(id), [onClose]);
  if (notifications.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(Container10, { $position: position, "aria-live": "polite", role: "status", children: notifications.map((notification) => /* @__PURE__ */ jsxRuntime.jsx(
    NotificationToast,
    {
      notification,
      onClose: handleClose(notification.id)
    },
    notification.id
  )) });
};

Object.defineProperty(exports, "useClickOutside", {
  enumerable: true,
  get: function () { return chunkBNRFVIDY_cjs.useClickOutside; }
});
Object.defineProperty(exports, "useDebounce", {
  enumerable: true,
  get: function () { return chunkBNRFVIDY_cjs.useDebounce; }
});
Object.defineProperty(exports, "useLoading", {
  enumerable: true,
  get: function () { return chunkBNRFVIDY_cjs.useLoading; }
});
Object.defineProperty(exports, "useMediaQuery", {
  enumerable: true,
  get: function () { return chunkBNRFVIDY_cjs.useMediaQuery; }
});
Object.defineProperty(exports, "useModal", {
  enumerable: true,
  get: function () { return chunkBNRFVIDY_cjs.useModal; }
});
Object.defineProperty(exports, "useNotifications", {
  enumerable: true,
  get: function () { return chunkBNRFVIDY_cjs.useNotifications; }
});
Object.defineProperty(exports, "usePagination", {
  enumerable: true,
  get: function () { return chunkBNRFVIDY_cjs.usePagination; }
});
Object.defineProperty(exports, "useTableSort", {
  enumerable: true,
  get: function () { return chunkBNRFVIDY_cjs.useTableSort; }
});
Object.defineProperty(exports, "capitalize", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.capitalize; }
});
Object.defineProperty(exports, "capitalizeWords", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.capitalizeWords; }
});
Object.defineProperty(exports, "chunk", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.chunk; }
});
Object.defineProperty(exports, "deepMerge", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.deepMerge; }
});
Object.defineProperty(exports, "diffInDays", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.diffInDays; }
});
Object.defineProperty(exports, "formatBytes", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.formatBytes; }
});
Object.defineProperty(exports, "formatCompact", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.formatCompact; }
});
Object.defineProperty(exports, "formatCurrency", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.formatCurrency; }
});
Object.defineProperty(exports, "formatDate", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.formatDate; }
});
Object.defineProperty(exports, "formatDateTime", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.formatDateTime; }
});
Object.defineProperty(exports, "formatNumber", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.formatNumber; }
});
Object.defineProperty(exports, "formatPercentage", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.formatPercentage; }
});
Object.defineProperty(exports, "formatPhone", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.formatPhone; }
});
Object.defineProperty(exports, "formatRelative", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.formatRelative; }
});
Object.defineProperty(exports, "groupBy", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.groupBy; }
});
Object.defineProperty(exports, "initials", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.initials; }
});
Object.defineProperty(exports, "isEmpty", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.isEmpty; }
});
Object.defineProperty(exports, "isExpired", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.isExpired; }
});
Object.defineProperty(exports, "omit", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.omit; }
});
Object.defineProperty(exports, "pick", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.pick; }
});
Object.defineProperty(exports, "pluralize", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.pluralize; }
});
Object.defineProperty(exports, "slugify", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.slugify; }
});
Object.defineProperty(exports, "sortBy", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.sortBy; }
});
Object.defineProperty(exports, "truncate", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.truncate; }
});
Object.defineProperty(exports, "unique", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.unique; }
});
Object.defineProperty(exports, "uniqueBy", {
  enumerable: true,
  get: function () { return chunkCV5S7LZ7_cjs.uniqueBy; }
});
exports.ActionButton = ActionButton;
exports.Alert = Alert;
exports.AppFooter = AppFooter;
exports.AppHeader = AppHeader;
exports.AuthCard = AuthCard;
exports.AuthLayout = AuthLayout;
exports.Avatar = Avatar;
exports.AvatarUpload = AvatarUpload;
exports.Badge = Badge;
exports.Button = Button;
exports.Card = Card;
exports.Checkbox = Checkbox;
exports.Container = Container;
exports.DataTable = DataTable;
exports.DetailAmount = DetailAmount;
exports.DetailContentBox = DetailContentBox;
exports.DetailDivider = DetailDivider;
exports.DetailLabel = DetailLabel;
exports.DetailRow = DetailRow;
exports.DetailSection = DetailSection;
exports.DetailValue = DetailValue;
exports.Divider = Divider;
exports.Dropdown = Dropdown;
exports.EmptyState = EmptyState;
exports.EntityCell = EntityCell;
exports.ErrorFallback = ErrorFallback;
exports.ErrorState = ErrorState;
exports.FileUploader = FileUploader;
exports.FloatingActions = FloatingActions;
exports.FormActions = FormActions;
exports.FormError = FormError;
exports.FormField = FormField;
exports.FormGroup = FormGroup;
exports.GlobalLoading = GlobalLoading;
exports.HeaderRow = HeaderRow;
exports.Image = Image;
exports.ImagePreviewModal = ImagePreviewModal;
exports.ImageUploader = ImageUploader;
exports.InfoMessage = InfoMessage;
exports.InlineIcon = InlineIcon;
exports.Input = Input;
exports.LazyFallback = LazyFallback;
exports.LoadingState = LoadingState;
exports.Modal = Modal;
exports.ModalActions = ModalActions;
exports.ModalConfirmChildren = ModalConfirmChildren;
exports.ModalContainer = ModalContainer;
exports.ModalContent = ModalContent;
exports.ModalFooter = ModalFooter;
exports.ModalFooterBar = ModalFooterBar;
exports.ModalHeader = ModalHeader;
exports.ModalIcon = ModalIcon;
exports.ModalMessage = ModalMessage;
exports.ModalOverlay = ModalOverlay;
exports.ModalTitle = ModalTitle;
exports.NotificationContainer = NotificationContainer;
exports.NotificationToast = NotificationToast;
exports.PageLayout = PageLayout;
exports.PageTitle = PageTitle;
exports.PageWrapper = PageWrapper;
exports.Pagination = Pagination;
exports.PasswordInput = PasswordInput;
exports.PopButton = PopButton;
exports.ProgressBar = ProgressBar;
exports.Radio = Radio;
exports.RadioGroup = RadioGroup;
exports.ScreenBoundary = ScreenBoundary;
exports.ScreenContainer = ScreenContainer;
exports.SearchInput = SearchInput;
exports.SectionTitle = SectionTitle;
exports.Select = Select;
exports.SelectField = SelectField;
exports.Skeleton = Skeleton;
exports.SortableHeader = SortableHeader;
exports.Spacer = Spacer;
exports.Spinner = Spinner;
exports.StatItem = StatItem;
exports.StatsBar = StatsBar;
exports.StatsCard = StatsCard;
exports.StatsGrid = StatsGrid;
exports.StepCard = StepCard;
exports.Switch = Switch;
exports.Tabs = Tabs;
exports.TapHint = TapHint;
exports.TextField = TextField;
exports.Textarea = Textarea;
exports.TextareaField = TextareaField;
exports.Toggle = Toggle;
exports.ToggleActiveButton = ToggleActiveButton;
exports.Tooltip = Tooltip;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map