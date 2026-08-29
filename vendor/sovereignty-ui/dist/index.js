export { useClickOutside, useDebounce, useLoading, useMediaQuery, useModal, useNotifications, usePagination, useTableSort } from './chunk-T5JZGLIT.js';
import { sh, c, s, tf, ts, tw, tl, el, layout, tt, color, mo } from './chunk-LRRWCQEQ.js';
export { capitalize, capitalizeWords, chunk, deepMerge, diffInDays, formatBytes, formatCompact, formatCurrency, formatDate, formatDateTime, formatNumber, formatPercentage, formatPhone, formatRelative, groupBy, initials, isEmpty, isExpired, omit, pick, pluralize, slugify, sortBy, truncate, unique, uniqueBy } from './chunk-JAKVBB76.js';
import { Loader2, X, ChevronDown, AlertTriangle, AlertCircle, ImageIcon, EyeOff, Eye, ArrowUpDown, ArrowUp, ArrowDown, Maximize2, Power, Menu as Menu$1, Camera, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Upload, XCircle, Info, CheckCircle } from 'lucide-react';
import styled56, { keyframes, css } from 'styled-components';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';

var spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var buttonSize = ($size) => $size === "sm" ? s("md") : s("lg");
var background = ($variant) => {
  if ($variant === "view") return c("infoLight");
  if ($variant === "edit") return c("warningBackground");
  if ($variant === "delete") return c("errorBackground");
  return c("backgroundAlt");
};
var foreground = ($variant) => {
  if ($variant === "view") return c("infoDark");
  if ($variant === "edit") return c("warningDark");
  if ($variant === "delete") return c("errorDark");
  return c("textSecondary");
};
var StyledActionButton = styled56.button`
  align-items: center;
  background: ${({ $variant }) => background($variant)};
  border: none;
  border-radius: ${sh("md")};
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
var SpinnerIcon = styled56.span`
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
  return /* @__PURE__ */ jsx(
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
      children: isLoading ? /* @__PURE__ */ jsx(SpinnerIcon, { children: /* @__PURE__ */ jsx(Loader2, { size: iconSize }) }) : icon
    }
  );
};
var VARIANT_COLORS = {
  error: { bg: c("errorBackground"), border: c("errorBorder"), icon: c("error") },
  info: { bg: c("secondary50"), border: c("secondary200"), icon: c("info") },
  success: { bg: c("successBackground"), border: c("successLight"), icon: c("success") },
  warning: { bg: c("warningBackground"), border: c("warningLight"), icon: c("warning") }
};
var AlertContainer = styled56.div`
  background-color: ${({ $variant }) => VARIANT_COLORS[$variant].bg};
  border: 1px solid ${({ $variant }) => VARIANT_COLORS[$variant].border};
  border-left: 4px solid ${({ $variant }) => VARIANT_COLORS[$variant].icon};
  border-radius: ${sh("md")};
  display: flex;
  gap: ${s("sm")};
  padding: ${s("sm")} ${s("md")};
`;
var AlertIcon = styled56.div`
  color: ${({ $variant }) => VARIANT_COLORS[$variant].icon};
  flex-shrink: 0;
  margin-top: 2px;
`;
var AlertBody = styled56.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${s("micro")};
`;
var AlertTitle = styled56.strong`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("semibold")};
`;
var AlertMessage = styled56.div`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  line-height: ${tl("relaxed")};
`;
var AlertDismiss = styled56.button`
  background: none;
  border: none;
  color: ${c("textTertiary")};
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: color 0.15s ease;

  &:hover {
    color: ${c("textPrimary")};
  }
`;
var DEFAULT_ICONS = {
  error: /* @__PURE__ */ jsx(AlertCircle, { size: 20 }),
  info: /* @__PURE__ */ jsx(Info, { size: 20 }),
  success: /* @__PURE__ */ jsx(CheckCircle, { size: 20 }),
  warning: /* @__PURE__ */ jsx(AlertTriangle, { size: 20 })
};
var Alert = ({
  children,
  className,
  icon,
  onDismiss,
  title,
  variant = "info"
}) => /* @__PURE__ */ jsxs(AlertContainer, { $variant: variant, className, "data-testid": "alert", role: "alert", children: [
  /* @__PURE__ */ jsx(AlertIcon, { $variant: variant, children: icon ?? DEFAULT_ICONS[variant] }),
  /* @__PURE__ */ jsxs(AlertBody, { children: [
    title && /* @__PURE__ */ jsx(AlertTitle, { children: title }),
    /* @__PURE__ */ jsx(AlertMessage, { children })
  ] }),
  onDismiss && /* @__PURE__ */ jsx(AlertDismiss, { "aria-label": "Dismiss", onClick: onDismiss, children: /* @__PURE__ */ jsx(X, { size: 16 }) })
] });
var SIZE_MAP = {
  lg: "48px",
  md: "40px",
  sm: "32px",
  xl: "64px"
};
var FONT_MAP = {
  lg: ts("lg"),
  md: ts("base"),
  sm: ts("xs"),
  xl: ts("2xl")
};
var AvatarContainer = styled56.div`
  align-items: center;
  background-color: ${c("primary200")};
  border-radius: 50%;
  color: ${c("textPrimary")};
  display: inline-flex;
  flex-shrink: 0;
  font-family: ${tf("display")};
  font-size: ${({ $size }) => FONT_MAP[$size]};
  font-weight: ${tw("semibold")};
  height: ${({ $size }) => SIZE_MAP[$size]};
  justify-content: center;
  overflow: hidden;
  width: ${({ $size }) => SIZE_MAP[$size]};
`;
var AvatarImage = styled56.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
var AvatarInitials = styled56.span`
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
  const [hasError, setHasError] = useState(false);
  const handleError = useCallback(() => {
    setHasError(true);
  }, []);
  const showImage = src && !hasError;
  return /* @__PURE__ */ jsx(AvatarContainer, { $size: size, className, "data-testid": "avatar", children: showImage ? /* @__PURE__ */ jsx(AvatarImage, { alt: alt ?? name ?? "Avatar", src, onError: handleError }) : /* @__PURE__ */ jsx(AvatarInitials, { $size: size, children: getInitials(name) }) });
};
var getVariantStyles = ($variant) => {
  switch ($variant) {
    case "primary":
      return css`
        background: ${c("primary100")};
        color: ${c("primary700")};
      `;
    case "success":
      return css`
        background: ${c("successBackground")};
        color: ${c("successDark")};
      `;
    case "warning":
      return css`
        background: ${c("warningBackground")};
        color: ${c("warningDark")};
      `;
    case "danger":
      return css`
        background: ${c("errorBackground")};
        color: ${c("errorDark")};
      `;
    case "info":
      return css`
        background: ${c("secondary100")};
        color: ${c("secondary700")};
      `;
    case "secondary":
      return css`
        background: ${c("secondary50")};
        color: ${c("secondary600")};
      `;
    case "default":
    default:
      return css`
        background: ${c("neutral100")};
        color: ${c("neutral700")};
      `;
  }
};
var getSizeStyles = ($size) => {
  switch ($size) {
    case "sm":
      return css`
        font-size: ${ts("xs")};
        padding: 2px ${s("xs")};
      `;
    case "lg":
      return css`
        font-size: ${ts("sm")};
        padding: ${s("xs")} ${s("md")};
      `;
    case "md":
    case void 0:
    default:
      return css`
        font-size: ${ts("xs")};
        padding: ${s("micro")} ${s("sm")};
      `;
  }
};
var StyledBadge = styled56.span`
  border-radius: ${sh("full")};
  display: inline-block;
  font-family: ${tf("body")};
  font-weight: ${tw("medium")};
  white-space: nowrap;
  ${({ $size }) => getSizeStyles($size)}
  ${({ $variant }) => getVariantStyles($variant)}
`;
var Badge = ({ children, className, size = "md", variant = "default" }) => /* @__PURE__ */ jsx(StyledBadge, { $size: size, $variant: variant, className, children });
var spin2 = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
var getVariantStyles2 = (variant) => {
  const variants = {
    accent: css`
      background: ${c("accent500")};
      border: none;
      color: ${c("white")};

      &:hover:not(:disabled) {
        background: ${c("accent600")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${c("accent200")};
      }
    `,
    brand: css`
      background: ${c("accent500")};
      border: none;
      color: ${c("white")};

      &:hover:not(:disabled) {
        background: ${c("accent700")};
        transform: translateY(-1px);
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${c("accent200")};
      }
    `,
    "brand-ghost": css`
      background: transparent;
      border: none;
      color: ${c("accent500")};

      &:hover:not(:disabled) {
        color: ${c("accent700")};
        text-decoration: underline;
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px ${c("accent200")};
      }
    `,
    "brand-outline": css`
      background: ${c("white")};
      border: 2px solid ${c("accent500")};
      color: ${c("accent500")};

      &:hover:not(:disabled) {
        background: ${c("accent500")};
        color: ${c("white")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${c("accent200")};
      }
    `,
    danger: css`
      background: ${c("error")};
      border: none;
      color: ${c("white")};

      &:hover:not(:disabled) {
        background: ${c("errorDark")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${c("errorBackground")};
      }
    `,
    ghost: css`
      background: ${c("neutral100")};
      border: none;
      color: ${c("textSecondary")};

      &:hover:not(:disabled) {
        background: ${c("neutral200")};
        color: ${c("textPrimary")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px ${c("neutral300")};
      }
    `,
    outline: css`
      background: ${c("white")};
      border: 1px solid ${c("neutral300")};
      color: ${c("textPrimary")};

      &:hover:not(:disabled) {
        background: ${c("neutral50")};
        border-color: ${c("primary300")};
      }

      &:focus-visible {
        border-color: ${c("primary500")};
      }
    `,
    primary: css`
      background: ${c("primary500")};
      border: none;
      color: ${c("neutral900")};

      &:hover:not(:disabled) {
        background: ${c("primary400")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${c("primary200")};
      }
    `,
    secondary: css`
      background: ${c("white")};
      border: 1px solid ${c("neutral300")};
      color: ${c("textPrimary")};

      &:hover:not(:disabled) {
        background: ${c("neutral50")};
        border-color: ${c("neutral400")};
      }

      &:focus-visible {
        border-color: ${c("primary500")};
        box-shadow: 0 0 0 3px ${c("primary100")};
      }
    `,
    success: css`
      background: ${c("success")};
      border: none;
      color: ${c("white")};

      &:hover:not(:disabled) {
        background: ${c("successDark")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${c("successBackground")};
      }
    `,
    warning: css`
      background: ${c("warning")};
      border: none;
      color: ${c("neutral900")};

      &:hover:not(:disabled) {
        background: ${c("warningDark")};
      }

      &:focus-visible {
        box-shadow: 0 0 0 3px ${c("warningBackground")};
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
    return sh("full");
  }
  return sh("md");
};
var getSizeStyles2 = (size, iconOnly, buttonShape) => {
  const normalizedSize = normalizeSize(size);
  const borderRadius = getBorderRadius(buttonShape);
  if (iconOnly) {
    const iconOnlySizes = {
      lg: css`
        border-radius: ${borderRadius};
        height: ${s("md")};
        min-width: ${s("md")};
        padding: 0;
        width: ${s("md")};
      `,
      md: css`
        border-radius: ${borderRadius};
        height: ${s("md")};
        min-width: ${s("md")};
        padding: 0;
        width: ${s("md")};
      `,
      sm: css`
        border-radius: ${borderRadius};
        height: ${s("md")};
        min-width: ${s("md")};
        padding: 0;
        width: ${s("md")};
      `
    };
    return iconOnlySizes[normalizedSize];
  }
  const sizes = {
    lg: css`
      font-size: ${ts("sm")};
      min-height: ${s("lg")};
      padding: ${s("xs")} ${s("md")};
    `,
    md: css`
      font-size: ${ts("sm")};
      min-height: ${s("md")};
      padding: ${s("xs")} ${s("sm")};
    `,
    sm: css`
      font-size: ${ts("xs")};
      min-height: ${s("sm")};
      padding: ${s("micro")} ${s("sm")};
    `
  };
  return sizes[normalizedSize];
};
var StyledButton = styled56.button`
  align-items: center;
  border-radius: ${({ $shape }) => getBorderRadius($shape)};
  cursor: pointer;
  display: inline-flex;
  font-family: ${tf("body")};
  font-weight: ${tw("medium")};
  gap: ${s("xs")};
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
var ButtonLoader = styled56.span`
  animation: ${spin2} 0.6s linear infinite;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  display: inline-block;
  height: ${s("sm")};
  width: ${s("sm")};
`;
var ButtonIcon = styled56.span`
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
    return /* @__PURE__ */ jsx(ButtonIcon, { children: icon });
  };
  const renderLoadingIcon = () => {
    if (loadingIcon) {
      return /* @__PURE__ */ jsx(ButtonIcon, { children: loadingIcon });
    }
    return /* @__PURE__ */ jsx(ButtonLoader, {});
  };
  const renderContent = () => {
    if (loading) {
      if (iconOnly) {
        return renderLoadingIcon();
      }
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        iconPosition === "left" && renderLoadingIcon(),
        children,
        iconPosition === "right" && renderLoadingIcon()
      ] });
    }
    if (iconOnly) {
      return renderIcon();
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      iconPosition === "left" && renderIcon(),
      children,
      iconPosition === "right" && renderIcon()
    ] });
  };
  return /* @__PURE__ */ jsx(
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
      return `padding: ${s("sm")};`;
    case "medium":
      return `padding: ${s("md")};`;
    case "large":
      return `padding: ${s("lg")};`;
  }
};
var StyledCard = styled56.div`
  background-color: ${c("white")};
  border-radius: 12px;
  box-shadow: ${el("sm")};
  transition: all 0.2s ease-in-out;

  ${({ $padding }) => getPaddingStyles($padding)}

  ${({ $clickable }) => $clickable && `
    cursor: pointer;

    &:hover {
      box-shadow: ${el("md")};
      transform: translateY(-4px);
    }

    &:active {
      transform: translateY(-2px);
    }
  `}
`;
var Card = ({ children, onClick, padding = "medium" }) => /* @__PURE__ */ jsx(StyledCard, { $clickable: Boolean(onClick), $padding: padding, onClick, children });
var CHECKBOX_SIZE = layout.icon.md;
var CheckboxWrapper = styled56.label`
  align-items: center;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: inline-flex;
  gap: ${s("xs")};
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
`;
var HiddenInput = styled56.input`
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;
var CheckboxBox = styled56.div`
  align-items: center;
  background-color: ${({ $checked }) => $checked ? c("primary500") : c("white")};
  border: 2px solid ${({ $checked }) => $checked ? c("primary500") : c("neutral300")};
  border-radius: ${sh("sm")};
  display: flex;
  flex-shrink: 0;
  height: ${CHECKBOX_SIZE};
  justify-content: center;
  transition: all 0.15s ease;
  width: ${CHECKBOX_SIZE};

  &::after {
    border: solid ${c("white")};
    border-width: 0 2px 2px 0;
    content: '';
    display: ${({ $checked }) => $checked ? "block" : "none"};
    height: ${s("xs")};
    transform: rotate(45deg) translate(-1px, -1px);
    width: ${s("micro")};
  }
`;
var CheckboxLabel = styled56.span`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
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
  const handleChange = useCallback(
    (e) => {
      onChange?.(e.target.checked);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxs(CheckboxWrapper, { $disabled: disabled, className, children: [
    /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(CheckboxBox, { $checked: checked }),
    label && /* @__PURE__ */ jsx(CheckboxLabel, { children: label })
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
var StyledContainer = styled56.div`
  margin: 0 auto;
  max-width: ${({ $size }) => getMaxWidth($size)};
  padding-left: ${s("sm")};
  padding-right: ${s("sm")};
  width: 100%;

  @media (width >= 768px) {
    padding-left: ${s("md")};
    padding-right: ${s("md")};
  }

  @media (width >= 1024px) {
    padding-left: ${s("lg")};
    padding-right: ${s("lg")};
  }
`;
var Container = ({ children, size = "medium" }) => /* @__PURE__ */ jsx(StyledContainer, { $size: size, children });

// src/components/DetailLayout/DetailLayout.constants.ts
var DETAIL_AMOUNT_SIZE_LARGE = "large";
var DetailSectionWrapper = styled56.div`
  margin-bottom: ${s("md")};
`;
var DetailLabelText = styled56.span`
  color: ${c("textSecondary")};
  display: block;
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
  font-weight: ${tw("medium")};
  letter-spacing: ${tt("wide")};
  margin-bottom: ${s("micro")};
  text-transform: uppercase;
`;
var DetailValueText = styled56.span`
  color: ${c("textPrimary")};
  display: block;
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  line-height: ${tl("relaxed")};
`;
var DetailValueMonoText = styled56(DetailValueText)`
  font-family: ${tf("mono")};
`;
var DetailRowGrid = styled56.div`
  display: grid;
  gap: ${s("sm")};
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  margin-bottom: ${s("sm")};

  @media (width <= 480px) {
    grid-template-columns: 1fr;
  }
`;
var DetailDividerLine = styled56.hr`
  border: none;
  border-top: 1px solid ${c("border")};
  margin: ${s("md")} 0;
`;
var DetailAmountText = styled56.div`
  color: ${c("textPrimary")};
  font-family: ${tf("mono")};
  font-size: ${ts("base")};
  font-weight: ${tw("medium")};
`;
var DetailAmountLargeText = styled56(DetailAmountText)`
  font-size: ${ts("2xl")};
  font-weight: ${tw("bold")};
`;
var DetailContentBoxWrapper = styled56.div`
  background: ${({ $variant }) => {
  switch ($variant) {
    case "info":
      return c("primary50");
    case "warning":
      return c("warningBackground");
    case "error":
      return c("errorBackground");
    case "default":
    default:
      return c("neutral50");
  }
}};
  border-left: 3px solid
    ${({ $variant }) => {
  switch ($variant) {
    case "info":
      return c("primary500");
    case "warning":
      return c("warning");
    case "error":
      return c("error");
    case "default":
    default:
      return c("neutral300");
  }
}};
  border-radius: ${sh("md")};
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  line-height: ${tl("relaxed")};
  padding: ${s("sm")};
  white-space: pre-wrap;
`;
styled56.div`
  display: grid;
  gap: ${s("sm")};
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: ${s("md")};

  @media (width <= 480px) {
    grid-template-columns: 1fr;
  }
`;
styled56.div`
  background: ${c("neutral100")};
  border-radius: ${sh("md")};
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
var DetailSection = ({ children, className }) => /* @__PURE__ */ jsx(DetailSectionWrapper, { className, children });
var DetailLabel = ({ children, className }) => /* @__PURE__ */ jsx(DetailLabelText, { className, children });
var DetailValue = ({ children, className, mono = false }) => mono ? /* @__PURE__ */ jsx(DetailValueMonoText, { className, children }) : /* @__PURE__ */ jsx(DetailValueText, { className, children });
var DetailRow = ({ children, className, columns = 2 }) => /* @__PURE__ */ jsx(DetailRowGrid, { $columns: columns, className, children });
var DetailDivider = ({ className }) => /* @__PURE__ */ jsx(DetailDividerLine, { className });
var DetailAmount = ({ children, className, size = "default" }) => size === DETAIL_AMOUNT_SIZE_LARGE ? /* @__PURE__ */ jsx(DetailAmountLargeText, { className, children }) : /* @__PURE__ */ jsx(DetailAmountText, { className, children });
var DetailContentBox = ({
  children,
  className,
  variant = "default"
}) => /* @__PURE__ */ jsx(DetailContentBoxWrapper, { $variant: variant, className, children });
var StyledDivider = styled56.hr`
  background-color: ${({ $color }) => $color ?? c("border")};
  border: none;
  flex-shrink: 0;

  ${({ $orientation, $spacing: $gap }) => $orientation === "vertical" ? `
    height: auto;
    margin: 0 ${$gap ?? s("sm")};
    min-height: 100%;
    width: 1px;
  ` : `
    height: 1px;
    margin: ${$gap ?? s("sm")} 0;
    width: 100%;
  `}
`;
var Divider = ({
  className,
  color: color2,
  orientation = "horizontal",
  spacing
}) => /* @__PURE__ */ jsx(
  StyledDivider,
  {
    $color: color2,
    $orientation: orientation,
    $spacing: spacing,
    className,
    "data-testid": "divider"
  }
);
var Container2 = styled56.div`
  display: inline-block;
  position: relative;
`;
var Trigger = styled56.button`
  align-items: center;
  background-color: ${c("white")};
  border: 1px solid ${c("border")};
  border-radius: ${sh("md")};
  color: ${c("textPrimary")};
  cursor: pointer;
  display: flex;
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  gap: ${s("xs")};
  justify-content: space-between;
  min-width: 160px;
  padding: ${s("xs")} ${s("sm")};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    border-color: ${c("primary400")};
  }

  &:focus {
    border-color: ${c("primary500")};
    box-shadow: 0 0 0 3px ${c("primary100")};
    outline: none;
  }

  &:disabled {
    background-color: ${c("neutral100")};
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
var Menu = styled56.div`
  background: ${c("white")};
  border: 1px solid ${c("border")};
  border-radius: ${sh("md")};
  box-shadow: ${el("md")};
  left: 0;
  max-height: 240px;
  min-width: 100%;
  overflow-y: auto;
  position: absolute;
  z-index: 100;

  ${({ $position }) => $position === "top" ? css`
          bottom: calc(100% + ${s("micro")});
        ` : css`
          top: calc(100% + ${s("micro")});
        `}
`;
var Item = styled56.button`
  background: ${({ $selected }) => $selected ? c("primary50") : "transparent"};
  border: none;
  color: ${({ $disabled, $selected }) => {
  if ($disabled) return c("textTertiary");
  if ($selected) return c("primary700");
  return c("textPrimary");
}};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: block;
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${({ $selected }) => $selected ? tw("medium") : tw("regular")};
  padding: ${s("xs")} ${s("sm")};
  text-align: left;
  transition: background 0.15s ease;
  width: 100%;

  &:hover:not(:disabled) {
    background: ${({ $selected }) => $selected ? c("primary100") : c("neutral50")};
  }

  &:focus {
    background: ${c("primary50")};
    outline: none;
  }
`;
var IconWrapper = styled56.span`
  align-items: center;
  display: flex;
  height: ${s("sm")};
  justify-content: center;
  width: ${s("sm")};
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
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label ?? placeholder;
  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);
  const handleSelect = useCallback(
    (optionValue, optionDisabled) => {
      if (optionDisabled) return;
      onChange(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );
  const createSelectHandler = useCallback(
    (optionValue, optionDisabled) => () => handleSelect(optionValue, optionDisabled),
    [handleSelect]
  );
  const handleKeyDown = useCallback(
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
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(Container2, { className, ref: containerRef, children: [
    /* @__PURE__ */ jsxs(
      Trigger,
      {
        "data-open": isOpen,
        disabled,
        type: "button",
        onClick: handleToggle,
        onKeyDown: handleKeyDown,
        children: [
          icon && /* @__PURE__ */ jsx(IconWrapper, { children: icon }),
          displayText,
          /* @__PURE__ */ jsx(ChevronDown, { size: 16 })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx(Menu, { $position: position, children: options.map((option) => /* @__PURE__ */ jsx(
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
var Container3 = styled56.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${s("sm")};
  justify-content: center;
  padding: ${s("2xl")};
  text-align: center;
`;
var IconWrapper2 = styled56.div`
  align-items: center;
  background: ${c("neutral100")};
  border-radius: 50%;
  color: ${c("textTertiary")};
  display: flex;
  height: ${s("4xl")};
  justify-content: center;
  width: ${s("4xl")};

  svg {
    height: ${s("lg")};
    width: ${s("lg")};
  }
`;
var Title = styled56.h3`
  color: ${c("textPrimary")};
  font-family: ${tf("display")};
  font-size: ${ts("lg")};
  font-weight: ${tw("semibold")};
  margin: 0;
`;
var Message = styled56.p`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  line-height: ${tl("relaxed")};
  margin: 0;
  max-width: 400px;
`;
var Action = styled56.div`
  margin-top: ${s("xs")};
`;
var EmptyState = ({ action, className, icon, message, title }) => /* @__PURE__ */ jsxs(Container3, { className, children: [
  icon && /* @__PURE__ */ jsx(IconWrapper2, { children: icon }),
  title && /* @__PURE__ */ jsx(Title, { children: title }),
  message && /* @__PURE__ */ jsx(Message, { children: message }),
  action && /* @__PURE__ */ jsx(Action, { children: action })
] });
var Container4 = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("micro")};
  min-width: 0;
  width: 100%;
`;
var Name = styled56.span`
  color: ${c("textPrimary")};
  display: block;
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("medium")};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
var Id = styled56.span`
  color: ${c("textTertiary")};
  display: block;
  font-family: ${tf("mono")};
  font-size: ${ts("xs")};
  margin-top: ${s("micro")};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
var Description = styled56.span`
  color: ${c("textSecondary")};
  display: block;
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
var EntityCell = ({ className, description, id, name }) => /* @__PURE__ */ jsxs(Container4, { className, children: [
  /* @__PURE__ */ jsx(Name, { children: name }),
  id && /* @__PURE__ */ jsx(Id, { children: id }),
  description && /* @__PURE__ */ jsx(Description, { children: description })
] });
var ErrorContainer = styled56.div`
  align-items: center;
  background-color: ${c("errorBackground")};
  border: 1px solid ${c("errorBorder")};
  border-radius: ${sh("lg")};
  display: flex;
  flex-direction: column;
  gap: ${s("sm")};
  justify-content: center;
  min-height: 200px;
  padding: ${s("lg")};
`;
var ErrorIconWrapper = styled56.div`
  color: ${c("error")};
`;
var ErrorTitle = styled56.h3`
  color: ${c("textPrimary")};
  font-family: ${tf("display")};
  font-size: ${ts("xl")};
  font-weight: ${tw("semibold")};
  margin: 0;
  text-align: center;
`;
var ErrorDescription = styled56.p`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("base")};
  margin: 0;
  max-width: 500px;
  text-align: center;
`;
var ErrorActions = styled56.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${s("xs")};
  justify-content: center;
  margin-top: ${s("xs")};
`;
var ActionButton2 = styled56.button`
  background-color: ${({ $variant }) => $variant === "primary" ? c("primary500") : c("transparent")};
  border: 1px solid ${({ $variant }) => $variant === "primary" ? c("primary500") : c("border")};
  border-radius: ${sh("md")};
  color: ${({ $variant }) => $variant === "primary" ? c("white") : c("textPrimary")};
  cursor: pointer;
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("medium")};
  padding: ${s("xs")} ${s("sm")};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $variant }) => $variant === "primary" ? c("primary600") : c("backgroundDark")};
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
}) => /* @__PURE__ */ jsxs(ErrorContainer, { className, "data-testid": "error-fallback", children: [
  /* @__PURE__ */ jsx(ErrorIconWrapper, { children: icon ?? /* @__PURE__ */ jsx(AlertTriangle, { size: 48 }) }),
  /* @__PURE__ */ jsx(ErrorTitle, { children: title }),
  /* @__PURE__ */ jsx(ErrorDescription, { children: description }),
  /* @__PURE__ */ jsxs(ErrorActions, { children: [
    onRetry && /* @__PURE__ */ jsx(ActionButton2, { $variant: "primary", onClick: onRetry, children: retryLabel }),
    actions.map((action) => /* @__PURE__ */ jsx(ActionButton2, { $variant: "secondary", onClick: action.onClick, children: action.label }, action.label))
  ] })
] });
var Container5 = styled56.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${s("sm")};
  justify-content: center;
  padding: ${s("2xl")};
  text-align: center;
`;
var IconWrapper3 = styled56.div`
  align-items: center;
  background: ${c("errorBackground")};
  border-radius: 50%;
  color: ${c("errorDark")};
  display: flex;
  height: ${s("4xl")};
  justify-content: center;
  width: ${s("4xl")};

  svg {
    height: ${s("lg")};
    width: ${s("lg")};
  }
`;
var Title2 = styled56.h3`
  color: ${c("textPrimary")};
  font-family: ${tf("display")};
  font-size: ${ts("lg")};
  font-weight: ${tw("semibold")};
  margin: 0;
`;
var Message2 = styled56.p`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  line-height: ${tl("relaxed")};
  margin: 0;
  max-width: 400px;
`;
var Action2 = styled56.div`
  margin-top: ${s("xs")};
`;
var ErrorState = ({ action, className, icon, message, title }) => /* @__PURE__ */ jsxs(Container5, { className, children: [
  /* @__PURE__ */ jsx(IconWrapper3, { children: icon ?? /* @__PURE__ */ jsx(AlertCircle, {}) }),
  title && /* @__PURE__ */ jsx(Title2, { children: title }),
  message && /* @__PURE__ */ jsx(Message2, { children: message }),
  action && /* @__PURE__ */ jsx(Action2, { children: action })
] });
var alignMap = {
  center: "center",
  left: "flex-start",
  right: "flex-end"
};
var StyledFormActions = styled56.div`
  display: flex;
  gap: ${s("sm")};
  justify-content: ${({ $align }) => alignMap[$align]};
  margin-top: ${s("md")};
`;
var FormActions = ({ align = "right", children, className }) => /* @__PURE__ */ jsx(StyledFormActions, { $align: align, className, children });
var StyledFormError = styled56.span`
  color: ${c("errorDark")};
  display: block;
  font-family: ${tf("body")};
  font-size: ${({ $variant }) => $variant === "field" ? ts("xs") : ts("sm")};
  margin-top: ${({ $variant }) => $variant === "field" ? s("micro") : s("xs")};
`;
var FormError = ({ children, className, variant = "form" }) => /* @__PURE__ */ jsx(StyledFormError, { $variant: variant, className, children });
var StyledFormGroup = styled56.div`
  margin-bottom: ${s("sm")};
`;
var FormGroup = ({ children, className }) => /* @__PURE__ */ jsx(StyledFormGroup, { className, children });
var spin3 = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
var pulse = keyframes`
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
var SpinnerContainer = styled56.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${s("sm")};
  justify-content: center;
`;
var SpinnerRing = styled56.div`
  animation: ${spin3} 0.8s linear infinite;
  border: ${({ $size }) => SIZE_MAP2[$size].stroke} solid ${c("neutral200")};
  border-radius: 50%;
  border-top-color: ${({ $color }) => $color ?? c("accent500")};
  height: ${({ $size }) => SIZE_MAP2[$size].ring};
  width: ${({ $size }) => SIZE_MAP2[$size].ring};
`;
var SpinnerText = styled56.span`
  animation: ${pulse} 2s ease-in-out infinite;
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("medium")};
  text-align: center;
`;
var Spinner = ({ className, color: color2, size = "md", text }) => /* @__PURE__ */ jsxs(SpinnerContainer, { className, "data-testid": "spinner", children: [
  /* @__PURE__ */ jsx(SpinnerRing, { $color: color2, $size: size }),
  text && /* @__PURE__ */ jsx(SpinnerText, { children: text })
] });
var LoadingOverlay = styled56.div`
  align-items: center;
  background: ${c("background")};
  display: ${({ $isVisible }) => $isVisible ? "flex" : "none"};
  flex-direction: column;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: ${layout.zIndex.modal};
`;
var GlobalLoading = ({ children, className, isVisible, text }) => /* @__PURE__ */ jsx(LoadingOverlay, { $isVisible: isVisible, className, "data-testid": "global-loading", children: children ?? /* @__PURE__ */ jsx(Spinner, { size: "lg", text }) });
var ImageContainer = styled56.div`
  height: 100%;
  position: relative;
  width: 100%;
`;
var StyledImage = styled56.img`
  display: block;
  height: 100%;
  object-fit: ${({ $objectFit }) => $objectFit ?? "cover"};
  width: 100%;
`;
var FallbackContainer = styled56.div`
  align-items: center;
  background: ${c("neutral50")};
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
  height: 100%;
  justify-content: center;
  width: 100%;
`;
var FallbackIcon = styled56.span`
  color: ${c("accent500")};
  opacity: 0.6;

  svg {
    height: ${s("xl")};
    width: ${s("xl")};
  }
`;
var FallbackText = styled56.span`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
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
  const [hasError, setHasError] = useState(false);
  const handleError = useCallback(() => {
    setHasError(true);
  }, []);
  const showFallback = !src || hasError;
  const containerStyle = {
    height: typeof height === "number" ? `${height}px` : height,
    width: typeof width === "number" ? `${width}px` : width
  };
  if (showFallback) {
    return /* @__PURE__ */ jsx(ImageContainer, { className, style: containerStyle, children: /* @__PURE__ */ jsxs(FallbackContainer, { children: [
      /* @__PURE__ */ jsx(FallbackIcon, { children: fallbackIcon ?? /* @__PURE__ */ jsx(ImageIcon, {}) }),
      /* @__PURE__ */ jsx(FallbackText, { children: fallbackText })
    ] }) });
  }
  return /* @__PURE__ */ jsx(ImageContainer, { className, style: containerStyle, children: /* @__PURE__ */ jsx(
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
      return css`
        background: ${c("successBackground")};
        border-left-color: ${c("success")};
        color: ${c("successDark")};
      `;
    case "error":
      return css`
        background: ${c("errorBackground")};
        border-left-color: ${c("error")};
        color: ${c("errorDark")};
      `;
    case "warning":
      return css`
        background: ${c("warningBackground")};
        border-left-color: ${c("warning")};
        color: ${c("warningDark")};
      `;
    case "info":
    default:
      return css`
        background: ${c("secondary100")};
        border-left-color: ${c("secondary500")};
        color: ${c("secondary700")};
      `;
  }
};
var StyledInfoMessage = styled56.div`
  border-left: 4px solid;
  border-radius: ${sh("md")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  line-height: ${tl("relaxed")};
  padding: ${s("sm")};
  ${({ $variant }) => getVariantStyles3($variant)}
`;
var InfoMessage = ({ children, className, variant = "info" }) => /* @__PURE__ */ jsx(StyledInfoMessage, { $variant: variant, className, children });
var InputWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}
`;
var InputLabel = styled56.label`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("medium")};
`;
var InputContainer = styled56.div`
  position: relative;
  width: 100%;
`;
var StyledInput = styled56.input`
  background-color: ${c("white")};
  border: 2px solid ${({ $hasError }) => $hasError ? c("error") : c("neutral200")};
  border-radius: ${sh("md")};
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("base")};
  min-height: ${s("xl")};
  padding: ${s("sm")};
  padding-right: ${({ $hasToggle }) => $hasToggle ? "48px" : s("sm")};
  transition: all 0.2s ease-in-out;
  width: 100%;

  &::placeholder {
    color: ${c("textTertiary")};
  }

  &:hover:not(:disabled) {
    border-color: ${({ $hasError }) => $hasError ? c("errorDark") : c("neutral300")};
  }

  &:focus {
    border-color: ${({ $hasError }) => $hasError ? c("error") : c("primary500")};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => $hasError ? c("errorFocusShadow") : c("primaryFocusShadow")};
    outline: none;
  }

  &:disabled {
    background-color: ${c("neutral50")};
    color: ${c("textDisabled")};
    cursor: not-allowed;
  }
`;
var PasswordToggle = styled56.button`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: ${ts("lg")};
  height: 100%;
  justify-content: center;
  padding: 0 ${s("sm")};
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid ${c("primary500")};
    outline-offset: -2px;
  }
`;
var InputError = styled56.span`
  color: ${c("error")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
`;
var InputRequired = styled56.span`
  color: ${c("error")};
  margin-left: ${s("micro")};
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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const handleChange = useCallback(
    (event) => {
      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange]
  );
  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  const inputType = isPassword && showPassword ? "text" : type;
  return /* @__PURE__ */ jsxs(InputWrapper, { $fullWidth: fullWidth, children: [
    label && /* @__PURE__ */ jsxs(InputLabel, { htmlFor: id, children: [
      label,
      required && /* @__PURE__ */ jsx(InputRequired, { children: "*" })
    ] }),
    /* @__PURE__ */ jsxs(InputContainer, { children: [
      /* @__PURE__ */ jsx(
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
      isPassword && /* @__PURE__ */ jsx(
        PasswordToggle,
        {
          "aria-label": showPassword ? hidePasswordLabel : showPasswordLabel,
          type: "button",
          onClick: handleTogglePassword,
          children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 20 }) : /* @__PURE__ */ jsx(Eye, { size: 20 })
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx(InputError, { children: error })
  ] });
};
var FallbackContainer2 = styled56.div`
  align-items: center;
  background: ${c("background")};
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: ${layout.zIndex.modal};
`;
var LazyFallback = ({ children, className }) => /* @__PURE__ */ jsx(FallbackContainer2, { className, "data-testid": "lazy-fallback", children: children ?? /* @__PURE__ */ jsx(Spinner, { size: "lg" }) });
var spin4 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var Container6 = styled56.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${s("sm")};
  justify-content: center;
  padding: ${s("2xl")};
  text-align: center;
`;
var SpinnerElement = styled56.div`
  animation: ${spin4} 1s linear infinite;
  border: 3px solid ${c("neutral200")};
  border-radius: 50%;
  border-top-color: ${c("primary500")};
  height: ${s("xl")};
  width: ${s("xl")};
`;
var Text = styled56.span`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
`;
var LoadingState = ({ className, message }) => /* @__PURE__ */ jsxs(Container6, { className, "data-testid": "loading-state", children: [
  /* @__PURE__ */ jsx(SpinnerElement, {}),
  message && /* @__PURE__ */ jsx(Text, { children: message })
] });

// src/components/Modal/Modal.constants.ts
var MODAL_VARIANTS = {
  CONFIRM: "confirm"};
var CONFIRM_VARIANTS = {
  INFO: "info"
};
var fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
var fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;
var slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
var slideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;
var ModalOverlay = styled56.div`
  align-items: center;
  animation: ${({ $isClosing }) => $isClosing ? fadeOut : fadeIn} 0.2s ease-out forwards;
  background-color: ${c("modalOverlay")};
  display: flex;
  inset: 0;
  justify-content: center;
  padding: ${s("sm")};
  position: fixed;
  z-index: 1100;
`;
var sizeStyles = {
  full: css`
    max-height: 90vh;
    max-width: 90vw;
    width: 90vw;
  `,
  lg: css`
    max-width: 600px;
  `,
  md: css`
    max-width: 480px;
  `,
  sm: css`
    max-width: 360px;
  `,
  xl: css`
    max-width: 700px;
  `
};
var ModalContainer = styled56.div`
  animation: ${({ $isClosing }) => $isClosing ? slideDown : slideUp} 0.2s ease-out forwards;
  background-color: ${c("white")};
  border-radius: ${sh("lg")};
  box-shadow: ${el("xl")};
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  width: 100%;
  ${({ $size }) => sizeStyles[$size]}

  @media (min-width: ${layout.breakpoint.md}) {
    max-height: 85vh;
  }
`;
var ModalHeader = styled56.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: ${s("sm")};
`;
var ModalTitle = styled56.h2`
  color: ${c("textPrimary")};
  font-family: ${tf("display")};
  font-size: ${ts("xl")};
  font-weight: ${tw("bold")};
  margin: 0;
  ${({ $centered }) => $centered && `
    margin-bottom: ${s("xs")};
    text-align: center;
  `}
`;
var ModalContent = styled56.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ $noPadding }) => $noPadding ? "0" : s("sm")};
`;
var ModalFooterBar = styled56.div`
  display: flex;
  gap: ${s("sm")};
  justify-content: flex-end;
  padding: ${s("xs")} ${s("sm")};
`;
var getIconVariantStyles = (variant) => {
  const variants = {
    danger: css`
      background: ${c("errorBackground")};
      color: ${c("error")};
    `,
    info: css`
      background: ${c("primary50")};
      color: ${c("primary500")};
    `,
    success: css`
      background: ${c("successBackground")};
      color: ${c("success")};
    `,
    warning: css`
      background: ${c("warningBackground")};
      color: ${c("warning")};
    `
  };
  return variants[variant];
};
var ModalIcon = styled56.div`
  align-items: center;
  border-radius: ${sh("full")};
  display: flex;
  height: ${s("4xl")};
  justify-content: center;
  margin: 0 auto ${s("sm")};
  width: ${s("4xl")};
  ${({ $variant }) => getIconVariantStyles($variant)}
`;
var ModalMessage = styled56.p`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  line-height: 1.6;
  margin: 0 0 ${s("md")};
  text-align: center;
`;
var ModalConfirmChildren = styled56.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${s("md")};
  width: 100%;
`;
var ModalActions = styled56.div`
  display: flex;
  gap: ${s("sm")};
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
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = useCallback(() => {
    if (disableClose || loading) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [disableClose, loading, onClose]);
  const handleCancel = useCallback(() => {
    if (loading) return;
    if (onCancel) {
      onCancel();
    } else {
      handleClose();
    }
  }, [loading, onCancel, handleClose]);
  const handleConfirm = useCallback(() => {
    if (loading || !onConfirm) return;
    onConfirm();
  }, [loading, onConfirm]);
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape" && !disableClose && !loading) {
        handleClose();
      }
    },
    [handleClose, disableClose, loading]
  );
  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);
  useEffect(() => {
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
  const renderConfirmContent = () => /* @__PURE__ */ jsxs(ModalContent, { children: [
    icon && /* @__PURE__ */ jsx(ModalIcon, { $variant: confirmVariant, children: icon }),
    title && /* @__PURE__ */ jsx(ModalTitle, { $centered: true, children: title }),
    message && /* @__PURE__ */ jsx(ModalMessage, { children: message }),
    children && /* @__PURE__ */ jsx(ModalConfirmChildren, { children }),
    /* @__PURE__ */ jsxs(ModalActions, { children: [
      /* @__PURE__ */ jsx(Button, { disabled: loading, variant: "secondary", onClick: handleCancel, children: cancelText ?? "Cancel" }),
      /* @__PURE__ */ jsx(
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
  const renderDefaultContent = () => /* @__PURE__ */ jsxs(Fragment, { children: [
    title && /* @__PURE__ */ jsxs(ModalHeader, { children: [
      /* @__PURE__ */ jsx(ModalTitle, { children: title }),
      /* @__PURE__ */ jsx(
        Button,
        {
          "aria-label": closeLabel,
          disabled: disableClose || loading,
          icon: /* @__PURE__ */ jsx(X, { size: 20 }),
          iconOnly: true,
          size: "sm",
          variant: "ghost",
          onClick: handleClose
        }
      )
    ] }),
    /* @__PURE__ */ jsx(ModalContent, { $noPadding: noPadding, children }),
    footer && /* @__PURE__ */ jsx(ModalFooterBar, { children: footer })
  ] });
  return /* @__PURE__ */ jsx(ModalOverlay, { $isClosing: isClosing, children: /* @__PURE__ */ jsx(
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
var StyledModalFooter = styled56.div`
  display: flex;
  gap: ${s("sm")};
  justify-content: ${({ $align }) => alignMap2[$align]};
  margin-top: ${s("md")};
`;
var ModalFooter = ({ align = "right", children, className }) => /* @__PURE__ */ jsx(StyledModalFooter, { $align: align, className, children });
var slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
var slideOut = keyframes`
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
      return c("success");
    case "error":
      return c("error");
    case "warning":
      return c("warning");
    case "info":
      return c("info");
  }
};
var ToastContainer = styled56.div`
  align-items: center;
  animation: ${({ $isClosing }) => $isClosing ? slideOut : slideIn} 0.3s ease-in-out;
  background: ${c("white")};
  border-left: 4px solid ${({ $type }) => getBorderColor($type)};
  border-radius: ${sh("md")};
  box-shadow: ${el("lg")};
  display: flex;
  gap: ${s("sm")};
  max-width: 400px;
  min-width: 300px;
  padding: ${s("sm")};
  pointer-events: auto;
  position: relative;
`;
var ToastIcon = styled56.div`
  color: ${({ $type }) => getBorderColor($type)};
  flex-shrink: 0;
`;
var ToastContent = styled56.div`
  flex: 1;
`;
var ToastTitle = styled56.p`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("semibold")};
  margin: 0 0 ${s("micro")};
`;
var ToastMessage = styled56.p`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  line-height: 1.4;
  margin: 0;
`;
var ToastCloseButton = styled56.button`
  background: transparent;
  border: none;
  color: ${c("textSecondary")};
  cursor: pointer;
  flex-shrink: 0;
  padding: ${s("micro")};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${c("textPrimary")};
  }

  &:focus {
    color: ${c("textPrimary")};
    outline: 2px solid ${c("primary500")};
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
        return /* @__PURE__ */ jsx(CheckCircle, { size: 20 });
      case "warning":
        return /* @__PURE__ */ jsx(AlertTriangle, { size: 20 });
      case "info":
        return /* @__PURE__ */ jsx(Info, { size: 20 });
      case "error":
      default:
        return /* @__PURE__ */ jsx(XCircle, { size: 20 });
    }
  };
  return /* @__PURE__ */ jsxs(ToastContainer, { $type: safeNotification.type, children: [
    /* @__PURE__ */ jsx(ToastIcon, { $type: safeNotification.type, children: getIcon() }),
    /* @__PURE__ */ jsxs(ToastContent, { children: [
      safeNotification.title && /* @__PURE__ */ jsx(ToastTitle, { children: safeNotification.title }),
      /* @__PURE__ */ jsx(ToastMessage, { children: safeNotification.message })
    ] }),
    /* @__PURE__ */ jsx(ToastCloseButton, { type: "button", onClick: onClose, children: /* @__PURE__ */ jsx(X, { size: 16 }) })
  ] });
};
var PageWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;
var ScreenContainer = styled56.section`
  flex: 1;
`;
var PageTitle = styled56.h1`
  color: ${c("textPrimary")};
  font-family: ${tf("display")};
  font-size: ${ts("4xl")};
  font-weight: ${tw("semibold")};
  margin: 0 0 ${s("sm")};
`;
var HeaderRow = styled56.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${s("sm")};
  justify-content: space-between;
  margin-bottom: ${s("md")};
`;
var SectionTitle = styled56.h2`
  color: ${c("textPrimary")};
  font-family: ${tf("display")};
  font-size: ${ts("xl")};
  font-weight: ${tw("semibold")};
  margin: 0 0 ${s("sm")};
`;
var PageLayout = ({ children, className, title }) => /* @__PURE__ */ jsx(PageWrapper, { className, children: /* @__PURE__ */ jsxs(ScreenContainer, { children: [
  title && /* @__PURE__ */ jsx(PageTitle, { children: title }),
  children
] }) });
var Wrapper = styled56.div`
  position: relative;
  width: 100%;
`;
var Input2 = styled56.input`
  background: ${c("white")};
  border: 1px solid ${c("border")};
  border-radius: ${sh("md")};
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  padding: ${s("xs")};
  padding-right: ${({ $hasIcon }) => $hasIcon ? "48px" : s("xs")};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &::placeholder {
    color: ${c("textTertiary")};
  }

  &:hover:not(:disabled) {
    border-color: ${c("primary300")};
  }

  &:focus {
    border-color: ${c("primary500")};
    box-shadow: 0 0 0 3px ${c("primary100")};
    outline: none;
  }

  &:disabled {
    background: ${c("neutral100")};
    cursor: not-allowed;
  }
`;
var ToggleButton = styled56.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${c("textTertiary")};
  cursor: pointer;
  display: flex;
  padding: ${s("xs")};
  position: absolute;
  right: ${s("micro")};
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.2s ease;

  &:hover:not(:disabled) {
    color: ${c("textPrimary")};
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
}) => /* @__PURE__ */ jsxs(Wrapper, { children: [
  /* @__PURE__ */ jsx(
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
  onToggleVisibility && /* @__PURE__ */ jsx(ToggleButton, { disabled, type: "button", onClick: onToggleVisibility, children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 20 }) : /* @__PURE__ */ jsx(Eye, { size: 20 }) })
] });
var getBackgroundColor = (variant) => {
  switch (variant) {
    case "blue":
    case "secondary":
      return c("secondary300");
    case "pill":
    case "accent":
      return c("accent500");
    case "primary":
      return c("primary400");
    case "yellow":
      return c("primary200");
  }
};
var isPillVariant = (variant) => variant === "pill" || variant === "accent";
var pillStyles = css`
  border: none;
  border-radius: 9999px;
  box-shadow: none;
  color: ${c("white")};
  font-size: ${ts("sm")};
  padding: ${s("sm")} ${s("md")};

  &:hover:not(:disabled) {
    box-shadow: none;
    transform: scale(1.02);
  }

  &:active:not(:disabled) {
    box-shadow: none;
    transform: scale(0.98);
  }
`;
var solidStyles = css`
  border: 2px solid ${c("neutral900")};
  border-radius: ${sh("full")};
  color: ${c("neutral900")};
  padding: ${s("sm")} ${s("lg")};

  &:hover:not(:disabled) {
    box-shadow: ${el("md")};
    transform: translateY(2px);
  }

  &:active:not(:disabled) {
    box-shadow: ${el("sm")};
    transform: translateY(4px);
  }
`;
var StyledPopButton = styled56.button`
  background-color: ${({ $variant }) => getBackgroundColor($variant ?? "yellow")};
  cursor: pointer;
  font-family: ${tf("body")};
  font-size: ${ts("2xl")};
  font-weight: ${tw("bold")};
  letter-spacing: 0.02em;
  min-height: ${s("2xl")};
  transition: all 0.15s ease;

  &:focus-visible {
    outline: 2px solid ${c("cyan500")};
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
}) => /* @__PURE__ */ jsx(StyledPopButton, { $variant: variant, disabled, type, onClick, children });
var fillAnimation = keyframes`
  from {
    width: 0;
  }
`;
var ProgressContainer = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("micro")};
  width: 100%;
`;
var ProgressHeader = styled56.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
var ProgressLabel = styled56.span`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
`;
var ProgressPercentage = styled56.span`
  color: ${c("accent500")};
  font-family: ${tf("display")};
  font-size: ${ts("sm")};
  font-weight: ${tw("bold")};
`;
var ProgressTrack = styled56.div`
  background: ${c("neutral200")};
  border-radius: ${sh("full")};
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
var ProgressFill = styled56.div`
  animation: ${fillAnimation} 0.6s ease-out forwards;
  background: ${({ $variant }) => {
  switch ($variant) {
    case "success":
      return c("success");
    case "warning":
      return c("warning");
    case "default":
      return `linear-gradient(90deg, ${c("accent500")}, ${c("tertiary300")})`;
  }
}};
  border-radius: ${sh("full")};
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
  return /* @__PURE__ */ jsxs(ProgressContainer, { className, children: [
    (label || showPercentage) && /* @__PURE__ */ jsxs(ProgressHeader, { children: [
      label && /* @__PURE__ */ jsx(ProgressLabel, { children: label }),
      showPercentage && /* @__PURE__ */ jsxs(ProgressPercentage, { children: [
        percentage,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx(ProgressTrack, { $size: size, children: /* @__PURE__ */ jsx(ProgressFill, { $percentage: percentage, $variant: variant }) })
  ] });
};
var StyledRadioGroup = styled56.div`
  display: flex;
  flex-direction: ${({ $direction }) => $direction === "horizontal" ? "row" : "column"};
  gap: ${({ $direction }) => $direction === "horizontal" ? s("sm") : s("xs")};
`;
var RadioWrapper = styled56.label`
  align-items: center;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: inline-flex;
  gap: ${s("xs")};
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  user-select: none;
`;
var RadioInput = styled56.input`
  appearance: none;
  background-color: ${c("white")};
  border: 2px solid ${c("border")};
  border-radius: ${sh("full")};
  cursor: inherit;
  height: ${s("sm")};
  margin: 0;
  position: relative;
  transition: all 0.2s ease;
  width: ${s("sm")};

  &:hover:not(:disabled) {
    border-color: ${c("primary400")};
  }

  &:focus {
    border-color: ${c("primary500")};
    box-shadow: 0 0 0 3px ${c("primary100")};
    outline: none;
  }

  &:checked {
    border-color: ${c("primary500")};
  }

  &:checked::after {
    background-color: ${c("primary500")};
    border-radius: ${sh("full")};
    content: '';
    height: ${s("xs")};
    left: 3px;
    position: absolute;
    top: 3px;
    width: ${s("xs")};
  }

  &:disabled {
    background-color: ${c("neutral100")};
    border-color: ${c("neutral300")};
  }
`;
var RadioLabel = styled56.span`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
`;
var RadioGroup = ({ children, className, direction = "vertical" }) => /* @__PURE__ */ jsx(StyledRadioGroup, { $direction: direction, className, children });
var Radio = ({
  checked = false,
  className,
  disabled = false,
  id,
  label,
  name,
  onChange,
  value
}) => /* @__PURE__ */ jsxs(RadioWrapper, { $disabled: disabled, className, children: [
  /* @__PURE__ */ jsx(
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
  label && /* @__PURE__ */ jsx(RadioLabel, { children: label })
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
    return /* @__PURE__ */ jsxs(ScreenContainer, { className, children: [
      /* @__PURE__ */ jsx(PageTitle, { children: title }),
      /* @__PURE__ */ jsx(LoadingState, { message: loadingMessage })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxs(ScreenContainer, { className, children: [
      /* @__PURE__ */ jsx(PageTitle, { children: title }),
      /* @__PURE__ */ jsx(ErrorState, { action: errorAction, message: error, title: errorTitle })
    ] });
  }
  return /* @__PURE__ */ jsxs(ScreenContainer, { className, children: [
    /* @__PURE__ */ jsx(PageTitle, { children: title }),
    children
  ] });
};
var FilterBar = styled56.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: ${s("sm")};
  margin-bottom: ${s("md")};
`;
var StyledSearchInput = styled56.input`
  background: ${c("white")};
  border: 1px solid ${c("border")};
  border-radius: ${sh("md")};
  flex: 1;
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  min-width: 200px;
  padding: ${s("xs")} ${s("sm")};
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${c("primary500")};
    outline: none;
  }

  &::placeholder {
    color: ${c("textTertiary")};
  }
`;
var SearchInput = ({
  children,
  className,
  onChange,
  placeholder = "Search...",
  value
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxs(FilterBar, { className, children: [
    /* @__PURE__ */ jsx(
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
  lg: css`
    font-size: ${ts("base")};
    min-height: ${s("lg")};
    padding: ${s("xs")} ${s("md")};
  `,
  md: css`
    font-size: ${ts("sm")};
    min-height: ${s("md")};
    padding: ${s("xs")} ${s("sm")};
  `,
  sm: css`
    font-size: ${ts("xs")};
    min-height: ${s("sm")};
    padding: ${s("micro")} ${s("sm")};
  `
};
var SelectWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("micro")};
  width: 100%;
`;
var SelectLabel = styled56.label`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("medium")};
`;
var StyledSelect = styled56.select`
  appearance: none;
  background-color: ${c("white")};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right ${s("xs")} center;
  background-repeat: no-repeat;
  border: 1px solid ${({ $hasError }) => $hasError ? c("error") : c("border")};
  border-radius: ${sh("md")};
  color: ${c("textPrimary")};
  cursor: pointer;
  font-family: ${tf("body")};
  outline: none;
  padding-right: ${s("lg")};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  ${({ $size }) => SIZE_STYLES[$size]}

  &:focus {
    border-color: ${({ $hasError }) => $hasError ? c("error") : c("primary500")};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => $hasError ? c("errorFocusShadow") : c("primaryFocusShadow")};
  }

  &:disabled {
    background-color: ${c("backgroundDark")};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
var SelectError = styled56.span`
  color: ${c("error")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
`;
var SelectOption = styled56.option``;
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
  const handleChange = useCallback(
    (e) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );
  const selectId = id ?? name;
  return /* @__PURE__ */ jsxs(SelectWrapper, { className, children: [
    label && /* @__PURE__ */ jsx(SelectLabel, { htmlFor: selectId, children: label }),
    /* @__PURE__ */ jsxs(
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
          placeholder && /* @__PURE__ */ jsx(SelectOption, { disabled: true, value: "", children: placeholder }),
          options.map((option) => /* @__PURE__ */ jsx(SelectOption, { disabled: option.disabled, value: option.value, children: option.label }, option.value))
        ]
      }
    ),
    error && /* @__PURE__ */ jsx(SelectError, { children: error })
  ] });
};
var Wrapper2 = styled56.label`
  align-items: center;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: inline-flex;
  gap: ${s("xs")};
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  user-select: none;
`;
var HiddenInput2 = styled56.input`
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;
var Track = styled56.span`
  background-color: ${({ $checked }) => $checked ? c("primary500") : c("neutral300")};
  border-radius: ${sh("full")};
  display: inline-block;
  height: ${s("md")};
  position: relative;
  transition: background-color 0.2s ease;
  width: ${s("xl")};

  &::after {
    background-color: ${c("white")};
    border-radius: ${sh("full")};
    content: '';
    height: ${s("sm")};
    left: ${({ $checked }) => $checked ? "22px" : "2px"};
    position: absolute;
    top: 2px;
    transition: left 0.2s ease;
    width: ${s("sm")};
  }

  ${({ $disabled }) => $disabled && `
    background-color: ${c("neutral200")};
  `}
`;
var Label = styled56.span`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
`;
var Switch = ({
  checked = false,
  className,
  disabled = false,
  id,
  label,
  name,
  onChange
}) => /* @__PURE__ */ jsxs(Wrapper2, { $disabled: disabled, className, children: [
  /* @__PURE__ */ jsx(
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
  /* @__PURE__ */ jsx(Track, { $checked: checked, $disabled: disabled }),
  label && /* @__PURE__ */ jsx(Label, { children: label })
] });
var shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;
var VARIANT_DEFAULTS = {
  circular: { borderRadius: "50%", height: s("xl"), width: s("xl") },
  rectangular: { borderRadius: sh("md"), height: "120px", width: "100%" },
  text: { borderRadius: sh("sm"), height: s("sm"), width: "100%" }
};
var SkeletonBox = styled56.div`
  animation: ${shimmer} 1.5s ease-in-out infinite;
  background: linear-gradient(
    90deg,
    ${c("neutral100")} 25%,
    ${c("neutral50")} 50%,
    ${c("neutral100")} 75%
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
}) => /* @__PURE__ */ jsx(
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
var Header = styled56.th`
  color: ${({ $active }) => $active ? c("primary500") : c("textSecondary")};
  cursor: pointer;
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
  font-weight: ${tw("medium")};
  letter-spacing: ${tt("wide")};
  padding: ${s("sm")};
  text-align: left;
  text-transform: uppercase;
  transition: color 0.15s ease;
  user-select: none;
  ${({ $width }) => $width && `width: ${$width};`}

  &:hover {
    color: ${c("primary500")};
  }
`;
var SortIcon = styled56.span`
  display: inline-flex;
  margin-left: ${s("micro")};
  vertical-align: middle;
`;
var SortableHeader = ({
  active = false,
  className,
  direction,
  label,
  onSort,
  width
}) => /* @__PURE__ */ jsxs(Header, { $active: active, $width: width, className, onClick: onSort, children: [
  label,
  /* @__PURE__ */ jsxs(SortIcon, { children: [
    !active && /* @__PURE__ */ jsx(ArrowUpDown, { size: 12 }),
    active && direction === "asc" && /* @__PURE__ */ jsx(ArrowUp, { size: 12 }),
    active && direction === "desc" && /* @__PURE__ */ jsx(ArrowDown, { size: 12 })
  ] })
] });
var sizeMap = {
  "2xl": s("2xl"),
  "3xl": s("3xl"),
  lg: s("lg"),
  md: s("md"),
  sm: s("sm"),
  xl: s("xl"),
  xs: s("xs")
};
var getSpacing = (size) => size ? sizeMap[size] : "0";
var StyledSpacer = styled56.div`
  ${({ $horizontal, $isWrapper, $mode, $vertical }) => {
  const verticalValue = getSpacing($vertical);
  const horizontalValue = getSpacing($horizontal);
  if ($isWrapper) {
    if ($mode === "padding") {
      return css`
          padding: ${$vertical ? verticalValue : "0"} ${$horizontal ? horizontalValue : "0"};
        `;
    }
    return css`
        margin: ${$vertical ? verticalValue : "0"} ${$horizontal ? horizontalValue : "0"};
      `;
  }
  return css`
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
  return /* @__PURE__ */ jsx(
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
      return css`
        background: ${c("primary100")};
        color: ${c("primary700")};
      `;
    case "success":
      return css`
        background: ${c("successBackground")};
        color: ${c("successDark")};
      `;
    case "warning":
      return css`
        background: ${c("warningBackground")};
        color: ${c("warningDark")};
      `;
    case "danger":
      return css`
        background: ${c("errorBackground")};
        color: ${c("errorDark")};
      `;
    case "info":
      return css`
        background: ${c("secondary100")};
        color: ${c("secondary700")};
      `;
    case "default":
    default:
      return css`
        background: ${c("neutral100")};
        color: ${c("neutral700")};
      `;
  }
};
var StyledStatItem = styled56.div`
  align-items: center;
  border-radius: ${sh("md")};
  display: flex;
  gap: ${s("sm")};
  padding: ${s("sm")} ${s("md")};
  ${({ $variant }) => getStatVariantStyles($variant)}
`;
var StatIconWrapper = styled56.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  height: ${s("md")};
  justify-content: center;
  width: ${s("md")};

  svg {
    height: 100%;
    width: 100%;
  }
`;
var StatContent = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("micro")};
`;
var StatLabel = styled56.span`
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  opacity: 0.8;
`;
var StatValue = styled56.span`
  font-family: ${tf("display")};
  font-size: ${ts("2xl")};
  font-weight: ${tw("bold")};
`;
var StyledStatsBar = styled56.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${s("md")};
  margin-bottom: ${s("md")};
`;
var StyledStatsGrid = styled56.div`
  display: grid;
  gap: ${s("md")};
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  margin-bottom: ${s("md")};

  @media (width <= 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width <= 640px) {
    grid-template-columns: 1fr;
  }
`;
var StatItem = ({ className, icon, label, value, variant = "default" }) => /* @__PURE__ */ jsxs(StyledStatItem, { $variant: variant, className, children: [
  icon && /* @__PURE__ */ jsx(StatIconWrapper, { children: icon }),
  /* @__PURE__ */ jsxs(StatContent, { children: [
    /* @__PURE__ */ jsx(StatLabel, { children: label }),
    /* @__PURE__ */ jsx(StatValue, { children: value })
  ] })
] });
var StatsBar = ({ children, className }) => /* @__PURE__ */ jsx(StyledStatsBar, { className, children });
var StatsGrid = ({ children, className, columns = 4 }) => /* @__PURE__ */ jsx(StyledStatsGrid, { $columns: columns, className, children });
var cardBackground = ($variant) => {
  switch ($variant) {
    case "primary":
      return `linear-gradient(135deg, ${c("accent500")}, ${c("tertiary300")})`;
    case "success":
      return c("successLight");
    case "warning":
      return c("warningLight");
    case "danger":
      return c("errorLight");
    case "info":
      return c("infoLight");
    case "default":
      return c("white");
  }
};
var iconColor = ($variant) => {
  switch ($variant) {
    case "primary":
      return c("white");
    case "success":
      return c("successDark");
    case "warning":
      return c("warningDark");
    case "danger":
      return c("errorDark");
    case "info":
      return c("infoDark");
    case "default":
      return c("accent500");
  }
};
var CardContainer = styled56.div`
  background: ${({ $variant }) => cardBackground($variant)};
  border-radius: ${sh("lg")};
  box-shadow: ${el("sm")};
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
  padding: ${s("md")};
`;
var iconBackground = ($variant) => {
  if ($variant === "primary") return "rgba(255, 255, 255, 0.2)";
  if ($variant === "default") return c("primary200");
  return `rgb(${c("whiteRgb")} / 0.6)`;
};
var CardIcon = styled56.div`
  align-items: center;
  background: ${({ $variant }) => iconBackground($variant)};
  border-radius: ${sh("full")};
  color: ${({ $variant }) => iconColor($variant)};
  display: flex;
  height: ${s("xl")};
  justify-content: center;
  width: ${s("xl")};

  svg {
    height: ${s("sm")};
    width: ${s("sm")};
  }
`;
var CardValue = styled56.span`
  color: ${({ $variant }) => $variant === "primary" ? c("white") : c("textPrimary")};
  font-family: ${tf("display")};
  font-size: ${ts("3xl")};
  font-weight: ${tw("bold")};
`;
var CardLabel = styled56.span`
  color: ${({ $variant }) => $variant === "primary" ? "rgba(255, 255, 255, 0.9)" : c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
`;
var CardSublabel = styled56.span`
  color: ${({ $variant }) => $variant === "primary" ? "rgba(255, 255, 255, 0.7)" : c("neutral400")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
`;
var StatsCard = ({
  className,
  icon,
  label,
  sublabel,
  value,
  variant = "default"
}) => /* @__PURE__ */ jsxs(CardContainer, { $variant: variant, className, children: [
  icon && /* @__PURE__ */ jsx(CardIcon, { $variant: variant, children: icon }),
  /* @__PURE__ */ jsx(CardValue, { $variant: variant, children: value }),
  /* @__PURE__ */ jsx(CardLabel, { $variant: variant, children: label }),
  sublabel && /* @__PURE__ */ jsx(CardSublabel, { $variant: variant, children: sublabel })
] });
var StepCardContainer = styled56.div`
  background-color: ${c("surface")};
  border: 1px solid ${c("border")};
  border-radius: ${sh("lg")};
  padding: ${s("xl")};
  text-align: center;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: ${el("md")};
    transform: translateY(-4px);
  }
`;
var StepNumber = styled56.div`
  align-items: center;
  background: linear-gradient(135deg, ${c("primary500")}, ${c("textAccent")});
  border-radius: 50%;
  color: ${c("white")};
  display: flex;
  font-size: ${ts("2xl")};
  font-weight: ${tw("bold")};
  height: ${s("2xl")};
  justify-content: center;
  margin: 0 auto ${s("md")};
  width: ${s("2xl")};
`;
var StepTitle = styled56.div`
  color: ${c("textPrimary")};
  font-family: ${tf("display")};
  font-size: ${ts("xl")};
  font-weight: ${tw("semibold")};
  margin-bottom: ${s("sm")};
`;
var StepDescription = styled56.p`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("base")};
  line-height: 1.6;
`;
var StepCard = ({ className, description, number, title }) => /* @__PURE__ */ jsxs(StepCardContainer, { className, children: [
  /* @__PURE__ */ jsx(StepNumber, { children: number }),
  /* @__PURE__ */ jsx(StepTitle, { children: title }),
  /* @__PURE__ */ jsx(StepDescription, { children: description })
] });
var TabsContainer = styled56.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
var TabList = styled56.div`
  border-bottom: 2px solid ${c("neutral200")};
  display: flex;
  gap: ${s("micro")};
  overflow-x: auto;
  scrollbar-width: none;

  @media (min-width: ${layout.breakpoint.md}) {
    gap: ${s("xs")};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
var TabButton = styled56.button`
  align-items: center;
  background: transparent;
  border: none;
  border-bottom: 3px solid ${({ $isActive }) => $isActive ? c("accent500") : "transparent"};
  color: ${({ $isActive, $isDisabled }) => {
  if ($isDisabled) return c("neutral400");
  return $isActive ? c("accent500") : c("textSecondary");
}};
  cursor: ${({ $isDisabled }) => $isDisabled ? "not-allowed" : "pointer"};
  display: flex;
  flex-shrink: 0;
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${({ $isActive }) => $isActive ? tw("semibold") : tw("medium")};
  gap: ${s("xs")};
  margin-bottom: -2px;
  opacity: ${({ $isDisabled }) => $isDisabled ? 0.5 : 1};
  padding: ${s("sm")} ${s("sm")};
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  @media (min-width: ${layout.breakpoint.md}) {
    font-size: ${ts("base")};
    padding: ${s("sm")} ${s("md")};
  }

  &:hover:not(:disabled) {
    background: ${c("neutral50")};
    color: ${({ $isActive }) => $isActive ? c("accent500") : c("textPrimary")};
  }

  svg {
    height: ${s("sm")};
    width: ${s("sm")};
  }
`;
var TabBadge = styled56.span`
  background: ${c("accent500")};
  border-radius: ${sh("full")};
  color: ${c("white")};
  font-size: ${ts("xs")};
  font-weight: ${tw("semibold")};
  min-width: ${s("sm")};
  padding: ${s("micro")} ${s("xs")};
  text-align: center;
`;
var TabContent = styled56.div`
  padding: ${s("md")} 0;
`;
var Tabs = ({ activeTabId, className, onTabChange, tabs }) => {
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const handleClick = useCallback(
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
    return /* @__PURE__ */ jsxs(
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
          tab.badge !== void 0 && /* @__PURE__ */ jsx(TabBadge, { children: tab.badge })
        ]
      },
      tab.id
    );
  };
  return /* @__PURE__ */ jsxs(TabsContainer, { className, children: [
    /* @__PURE__ */ jsx(TabList, { role: "tablist", children: tabs.map(renderTab) }),
    /* @__PURE__ */ jsx(TabContent, { role: "tabpanel", children: activeTab?.content })
  ] });
};
var pulse2 = keyframes`
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
`;
var fadeOut2 = keyframes`
  from { opacity: 1; }
  to { opacity: 0; pointer-events: none; }
`;
var getPositionStyles = (position) => {
  switch (position) {
    case "bottom-right":
      return css`
        bottom: ${s("sm")};
        right: ${s("sm")};
      `;
    case "top-right":
      return css`
        right: ${s("sm")};
        top: ${s("sm")};
      `;
    case "center":
      return css`
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `;
  }
};
var hiddenAnimation = css`
  animation:
    ${pulse2} 2s ease-in-out infinite,
    ${fadeOut2} 0.3s ease-out forwards;
`;
var visibleAnimation = css`
  animation: ${pulse2} 2s ease-in-out infinite;
`;
var TapHintWrapper = styled56.div`
  align-items: center;
  ${({ $isHidden }) => $isHidden ? hiddenAnimation : visibleAnimation}
  background: ${c("black")};
  border-radius: ${sh("full")};
  color: ${c("white")};
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
  const [isHidden, setIsHidden] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  useEffect(() => {
    if (autoHideMs <= 0) return;
    const timer = setTimeout(() => setIsHidden(true), autoHideMs);
    return () => clearTimeout(timer);
  }, [autoHideMs]);
  useEffect(() => {
    if (!isHidden) return;
    const timer = setTimeout(() => setIsRemoved(true), 300);
    return () => clearTimeout(timer);
  }, [isHidden]);
  if (isRemoved) return null;
  const iconSize = Math.round(size * 0.5);
  return /* @__PURE__ */ jsx(TapHintWrapper, { $isHidden: isHidden, $position: position, $size: size, "data-testid": "tap-hint", children: /* @__PURE__ */ jsx(Maximize2, { size: iconSize }) });
};
var TextareaWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("micro")};
  width: 100%;
`;
var TextareaLabel = styled56.label`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: var(--sui-font-weight-medium, 500);
`;
var StyledTextarea = styled56.textarea`
  border: 1px solid ${({ $hasError }) => $hasError ? c("error") : c("border")};
  border-radius: ${sh("md")};
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  line-height: ${tl("relaxed")};
  outline: none;
  padding: ${s("xs")} ${s("sm")};
  resize: vertical;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &::placeholder {
    color: ${c("textDisabled")};
  }

  &:focus {
    border-color: ${({ $hasError }) => $hasError ? c("error") : c("primary500")};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => $hasError ? c("errorFocusShadow") : c("primaryFocusShadow")};
  }

  &:disabled {
    background-color: ${c("backgroundDark")};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
var TextareaFooter = styled56.div`
  display: flex;
  justify-content: space-between;
`;
var TextareaError = styled56.span`
  color: ${c("error")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
`;
var TextareaSpacer = styled56.span``;
var TextareaCount = styled56.span`
  color: ${({ $isOver }) => $isOver ? c("error") : c("textTertiary")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
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
  const handleChange = useCallback(
    (e) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );
  const textareaId = id ?? name;
  const currentLength = value.length;
  const isOver = maxLength ? currentLength > maxLength : false;
  const hasFooter = error || showCount && maxLength;
  return /* @__PURE__ */ jsxs(TextareaWrapper, { className, children: [
    label && /* @__PURE__ */ jsx(TextareaLabel, { htmlFor: textareaId, children: label }),
    /* @__PURE__ */ jsx(
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
    hasFooter && /* @__PURE__ */ jsxs(TextareaFooter, { children: [
      error ? /* @__PURE__ */ jsx(TextareaError, { children: error }) : /* @__PURE__ */ jsx(TextareaSpacer, {}),
      showCount && maxLength && /* @__PURE__ */ jsxs(TextareaCount, { $isOver: isOver, children: [
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
var ToggleWrapper = styled56.label`
  align-items: center;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: inline-flex;
  gap: ${s("xs")};
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
`;
var HiddenInput3 = styled56.input`
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;
var ToggleTrack = styled56.div`
  background-color: ${({ $checked }) => $checked ? c("success") : c("neutral300")};
  border-radius: 9999px;
  height: ${({ $size }) => TRACK_SIZES[$size].height};
  position: relative;
  transition: background-color 0.2s ease;
  width: ${({ $size }) => TRACK_SIZES[$size].width};
`;
var ToggleThumb = styled56.div`
  background-color: ${c("white")};
  border-radius: 50%;
  box-shadow: 0 1px 3px rgb(${color.blackRgb} / 0.2);
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
var ToggleLabel = styled56.span`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
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
  const handleChange = useCallback(
    (e) => {
      onChange?.(e.target.checked);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxs(ToggleWrapper, { $disabled: disabled, className, children: [
    /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(ToggleTrack, { $checked: checked, $size: size, children: /* @__PURE__ */ jsx(ToggleThumb, { $checked: checked, $size: size }) }),
    label && /* @__PURE__ */ jsx(ToggleLabel, { children: label })
  ] });
};
var spin5 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var buttonSize2 = ($size) => $size === "sm" ? s("md") : s("lg");
var StyledToggleButton = styled56.button`
  align-items: center;
  background: ${({ $isActive, $isLoading }) => {
  if ($isLoading) return c("warningBackground");
  return $isActive ? c("errorBackground") : c("successBackground");
}};
  border: none;
  border-radius: ${({ $shape }) => $shape === "circle" ? sh("full") : sh("md")};
  color: ${({ $isActive, $isLoading }) => {
  if ($isLoading) return c("warningDark");
  return $isActive ? c("errorDark") : c("successDark");
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
var SpinnerIcon2 = styled56.span`
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
  return /* @__PURE__ */ jsx(
    StyledToggleButton,
    {
      $isActive: isActive,
      $isLoading: isLoading,
      $shape: shape,
      $size: size,
      title: buttonTitle,
      type: "button",
      onClick: isLoading ? void 0 : onClick,
      children: isLoading ? /* @__PURE__ */ jsx(SpinnerIcon2, { children: /* @__PURE__ */ jsx(Loader2, { size: iconSize }) }) : /* @__PURE__ */ jsx(Power, { size: iconSize })
    }
  );
};
var POSITION_STYLES = {
  bottom: css`
    left: 50%;
    top: calc(100% + ${s("xs")});
    transform: translateX(-50%);
  `,
  left: css`
    right: calc(100% + ${s("xs")});
    top: 50%;
    transform: translateY(-50%);
  `,
  right: css`
    left: calc(100% + ${s("xs")});
    top: 50%;
    transform: translateY(-50%);
  `,
  top: css`
    bottom: calc(100% + ${s("xs")});
    left: 50%;
    transform: translateX(-50%);
  `
};
var TooltipContainer = styled56.div`
  display: inline-block;
  position: relative;
`;
var TooltipContent = styled56.div`
  background-color: ${c("dark300")};
  border-radius: ${sh("md")};
  color: ${c("white")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
  font-weight: ${tw("medium")};
  max-width: 250px;
  opacity: 0;
  padding: ${s("micro")} ${s("xs")};
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
var Tooltip = ({ children, className, content, position = "top" }) => /* @__PURE__ */ jsxs(TooltipContainer, { className, children: [
  children,
  /* @__PURE__ */ jsx(TooltipContent, { $position: position, children: content })
] });
var ModalOverlay2 = styled56.div`
  align-items: center;
  backdrop-filter: blur(4px);
  background: rgb(${c("blackRgb")} / 0.85);
  display: flex;
  inset: 0;
  justify-content: center;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  position: fixed;
  transition: opacity ${mo("normal")};
  visibility: ${({ $isOpen }) => $isOpen ? "visible" : "hidden"};
  z-index: ${layout.zIndex.modal};
`;
var ModalContent2 = styled56.div`
  max-height: 90vh;
  max-width: 90vw;
  position: relative;
`;
var PreviewImage = styled56.img`
  border-radius: ${sh("lg")};
  display: block;
  max-height: 80vh;
  max-width: 85vw;
  object-fit: contain;
`;
var ImageOverlay = styled56.div`
  align-items: flex-start;
  background: linear-gradient(to bottom, rgb(${c("blackRgb")} / 0.7) 0%, transparent 100%);
  border-radius: ${sh("lg")} ${sh("lg")} 0 0;
  display: flex;
  gap: ${s("sm")};
  justify-content: space-between;
  left: 0;
  padding: ${s("md")} ${s("lg")};
  position: absolute;
  right: 0;
  top: 0;
`;
var TitleWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
`;
var ImageTitle = styled56.h2`
  color: ${c("white")};
  font-family: ${tf("display")};
  font-size: ${ts("xl")};
  font-weight: ${tw("bold")};
  margin: 0;
  text-shadow: 0 2px 4px rgb(${c("blackRgb")} / 0.5);
`;
var BadgeSlot = styled56.span`
  width: fit-content;
`;
var CloseButton = styled56.button`
  align-items: center;
  background: rgb(${c("whiteRgb")} / 0.2);
  border: none;
  border-radius: ${sh("full")};
  color: ${c("white")};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: ${s("lg")};
  justify-content: center;
  transition: background ${mo("fast")};
  width: ${s("lg")};

  &:hover {
    background: rgb(${c("whiteRgb")} / 0.3);
  }
`;
var CaptionOverlay = styled56.div`
  background: linear-gradient(to top, rgb(${c("blackRgb")} / 0.7) 0%, transparent 100%);
  border-radius: 0 0 ${sh("lg")} ${sh("lg")};
  bottom: 0;
  left: 0;
  padding: ${s("lg")} ${s("lg")} ${s("md")};
  position: absolute;
  right: 0;
`;
var ImageDescription = styled56.p`
  color: ${c("white")};
  font-size: ${ts("sm")};
  line-height: ${tl("normal")};
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgb(${c("blackRgb")} / 0.5);
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
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );
  const handleOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(ModalOverlay2, { $isOpen: isOpen, onClick: handleOverlayClick, children: /* @__PURE__ */ jsxs(ModalContent2, { children: [
    /* @__PURE__ */ jsx(PreviewImage, { alt: title, src: imageUrl }),
    /* @__PURE__ */ jsxs(ImageOverlay, { children: [
      /* @__PURE__ */ jsxs(TitleWrapper, { children: [
        /* @__PURE__ */ jsx(ImageTitle, { children: title }),
        badge && /* @__PURE__ */ jsx(BadgeSlot, { children: badge })
      ] }),
      /* @__PURE__ */ jsx(CloseButton, { "aria-label": closeLabel, type: "button", onClick: onClose, children: /* @__PURE__ */ jsx(X, { size: 20 }) })
    ] }),
    description && /* @__PURE__ */ jsx(CaptionOverlay, { children: /* @__PURE__ */ jsx(ImageDescription, { children: description }) })
  ] }) });
};
var StyledInlineIcon = styled56.span`
  display: inline-flex;
  margin-bottom: ${({ $position, $tight }) => $position === "top" ? s($tight ? "micro" : "xs") : "0"};
  margin-right: ${({ $position, $tight }) => $position === "left" ? s($tight ? "micro" : "xs") : "0"};
  vertical-align: middle;
`;
var InlineIcon = ({
  children,
  className,
  position = "left",
  tight = false
}) => /* @__PURE__ */ jsx(StyledInlineIcon, { $position: position, $tight: tight, className, children });
var FooterContainer = styled56.footer`
  background: ${c("backgroundDark")};
  color: ${c("textInverse")};
  width: 100%;
`;
var FooterContent = styled56.div`
  display: grid;
  gap: ${s("lg")};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 0 auto;
  max-width: ${layout.container.lg};
  padding: ${s("lg")} ${s("md")};
`;
var BrandSection = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
`;
var FooterColumnWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
`;
var ColumnTitle = styled56.h3`
  color: ${c("textInverse")};
  font-family: ${tf("display")};
  font-size: ${ts("sm")};
  font-weight: ${tw("bold")};
  letter-spacing: 0.05em;
  margin: 0 0 ${s("micro")};
  text-transform: uppercase;
`;
var FooterBottom = styled56.div`
  align-items: center;
  border-top: 1px solid rgb(${c("whiteRgb")} / 0.15);
  display: flex;
  flex-wrap: wrap;
  gap: ${s("sm")};
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${layout.container.lg};
  padding: ${s("sm")} ${s("md")};

  @media (max-width: ${layout.breakpoint.md}) {
    flex-direction: column;
    text-align: center;
  }
`;
var Copyright = styled56.p`
  color: ${c("textInverse")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
  margin: 0;
  opacity: 0.8;
`;
var SocialSlot = styled56.div`
  align-items: center;
  display: flex;
  gap: ${s("xs")};
`;
var AppFooter = ({
  bottomSlot,
  brandSlot,
  className,
  columns = [],
  copyright,
  socialSlot
}) => /* @__PURE__ */ jsxs(FooterContainer, { className, children: [
  (brandSlot ?? columns.length > 0) && /* @__PURE__ */ jsxs(FooterContent, { children: [
    brandSlot && /* @__PURE__ */ jsx(BrandSection, { children: brandSlot }),
    columns.map((column, index) => /* @__PURE__ */ jsxs(FooterColumnWrapper, { children: [
      column.title && /* @__PURE__ */ jsx(ColumnTitle, { children: column.title }),
      column.content
    ] }, column.title ?? `column-${index}`))
  ] }),
  (copyright ?? socialSlot ?? bottomSlot) && /* @__PURE__ */ jsxs(FooterBottom, { children: [
    copyright && /* @__PURE__ */ jsx(Copyright, { children: copyright }),
    bottomSlot,
    socialSlot && /* @__PURE__ */ jsx(SocialSlot, { children: socialSlot })
  ] })
] });
var HeaderBar = styled56.header`
  background: ${c("surface")};
  border-bottom: 1px solid ${c("border")};
  position: ${({ $sticky }) => $sticky ? "sticky" : "relative"};
  top: 0;
  width: 100%;
  z-index: ${layout.zIndex.sticky};
`;
var HeaderContent = styled56.div`
  align-items: center;
  display: flex;
  gap: ${s("md")};
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${layout.container.lg};
  padding: ${s("sm")} ${s("md")};
`;
var LogoSlot = styled56.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
`;
var NavSlot = styled56.nav`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${s("sm")};
  justify-content: center;

  @media (max-width: ${layout.breakpoint.md}) {
    display: none;
  }
`;
var ActionsSlot = styled56.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: ${s("xs")};

  @media (max-width: ${layout.breakpoint.md}) {
    display: none;
  }
`;
var MenuButton = styled56.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${c("textPrimary")};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  padding: ${s("micro")};

  @media (min-width: ${layout.breakpoint.md}) {
    display: none;
  }
`;
var MobileMenu = styled56.div`
  background: ${c("surface")};
  box-shadow: ${el("md")};
  display: ${({ $isOpen }) => $isOpen ? "block" : "none"};
  padding: ${s("sm")} ${s("md")};
  transition: ${mo("fast")};

  @media (min-width: ${layout.breakpoint.md}) {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);
  return /* @__PURE__ */ jsxs(HeaderBar, { $sticky: sticky, className, children: [
    /* @__PURE__ */ jsxs(HeaderContent, { children: [
      /* @__PURE__ */ jsx(LogoSlot, { children: logoSlot }),
      navSlot && /* @__PURE__ */ jsx(NavSlot, { children: navSlot }),
      actionsSlot && /* @__PURE__ */ jsx(ActionsSlot, { children: actionsSlot }),
      mobileMenuContent && /* @__PURE__ */ jsx(
        MenuButton,
        {
          "aria-expanded": isMenuOpen,
          "aria-label": isMenuOpen ? closeMenuLabel : openMenuLabel,
          type: "button",
          onClick: handleToggleMenu,
          children: isMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu$1, { size: 24 })
        }
      )
    ] }),
    mobileMenuContent && /* @__PURE__ */ jsx(MobileMenu, { $isOpen: isMenuOpen, children: mobileMenuContent })
  ] });
};
var AuthPageWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;
var AuthSection = styled56.section`
  align-items: center;
  background-color: ${c("backgroundAlt")};
  display: flex;
  flex: 1;
  justify-content: center;
  padding: ${s("lg")} ${s("sm")};
  position: relative;

  @media (max-width: ${layout.breakpoint.md}) {
    align-items: flex-start;
    padding: ${s("md")} ${s("sm")};
  }
`;
var AuthContent = styled56.div`
  align-items: center;
  display: flex;
  gap: ${s("lg")};
  justify-content: center;
  max-width: ${layout.container.lg};
  position: relative;
  width: 100%;

  @media (max-width: ${layout.breakpoint.lg}) {
    flex-direction: column;
  }
`;
var AuthSideSlot = styled56.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;

  @media (max-width: ${layout.breakpoint.lg}) {
    display: none;
  }

  img {
    height: auto;
    max-height: 420px;
    width: auto;
  }
`;
var AuthCardWrapper = styled56.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: ${s("md")};
  max-width: 480px;
  width: 100%;

  @media (max-width: ${layout.breakpoint.md}) {
    max-width: 100%;
  }
`;
var AuthHeader = styled56.div`
  text-align: center;
`;
var AuthTitle = styled56.h1`
  color: ${c("textPrimary")};
  font-family: ${tf("display")};
  font-size: ${ts("6xl")};
  font-weight: ${tw("bold")};
  margin: 0;

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${ts("4xl")};
  }
`;
var AuthSubtitle = styled56.p`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("2xl")};
  font-weight: ${tw("semibold")};
  margin: ${s("xs")} 0 0;

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${ts("xl")};
  }
`;
var StyledAuthCard = styled56.div`
  background: ${c("surface")};
  border-radius: ${sh("lg")};
  box-shadow: ${el("md")};
  padding: ${s("lg")};

  @media (max-width: ${layout.breakpoint.md}) {
    padding: ${s("md")};
  }
`;
var AuthCard = ({ children, className }) => /* @__PURE__ */ jsx(StyledAuthCard, { className, children });
var AuthLayout = ({
  children,
  className,
  leftSlot,
  rightSlot,
  subtitle,
  title
}) => /* @__PURE__ */ jsx(AuthPageWrapper, { className, children: /* @__PURE__ */ jsx(AuthSection, { children: /* @__PURE__ */ jsxs(AuthContent, { children: [
  leftSlot && /* @__PURE__ */ jsx(AuthSideSlot, { children: leftSlot }),
  /* @__PURE__ */ jsxs(AuthCardWrapper, { children: [
    (title ?? subtitle) && /* @__PURE__ */ jsxs(AuthHeader, { children: [
      title && /* @__PURE__ */ jsx(AuthTitle, { children: title }),
      subtitle && /* @__PURE__ */ jsx(AuthSubtitle, { children: subtitle })
    ] }),
    children
  ] }),
  rightSlot && /* @__PURE__ */ jsx(AuthSideSlot, { children: rightSlot })
] }) }) });
var spin6 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var sizeStyles2 = ($size) => {
  if ($size === "large") {
    return css`
      font-size: ${ts("4xl")};
      height: 120px;
      width: 120px;
    `;
  }
  if ($size === "small") {
    return css`
      font-size: ${ts("base")};
      height: ${s("2xl")};
      width: ${s("2xl")};
    `;
  }
  return css`
    font-size: ${ts("2xl")};
    height: ${s("6xl")};
    width: ${s("6xl")};
  `;
};
var Container7 = styled56.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
`;
var AvatarWrapper = styled56.div`
  border-radius: ${sh("full")};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  position: relative;
  ${({ $size }) => sizeStyles2($size)}

  &:hover > div:last-child {
    opacity: ${({ $disabled }) => $disabled ? 0 : 1};
  }
`;
var Avatar2 = styled56.div`
  align-items: center;
  background: ${({ $hasPhoto }) => $hasPhoto ? "transparent" : c("secondary700")};
  border: 4px solid ${c("white")};
  border-radius: ${sh("full")};
  box-shadow: ${el("lg")};
  color: ${c("white")};
  display: flex;
  font-family: ${tf("display")};
  font-weight: ${tw("bold")};
  justify-content: center;
  overflow: hidden;
  text-transform: uppercase;
  ${({ $size }) => sizeStyles2($size)}
`;
var AvatarImage2 = styled56.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
var Overlay = styled56.div`
  align-items: center;
  background: rgb(${c("blackRgb")} / 0.5);
  border-radius: ${sh("full")};
  color: ${c("white")};
  display: flex;
  inset: 0;
  justify-content: center;
  opacity: 0;
  position: absolute;
  transition: opacity 0.2s ease-in-out;

  svg {
    height: ${s("md")};
    width: ${s("md")};
  }
`;
var LoadingOverlay2 = styled56.div`
  align-items: center;
  background: rgb(${c("blackRgb")} / 0.6);
  border-radius: ${sh("full")};
  color: ${c("white")};
  display: flex;
  inset: 0;
  justify-content: center;
  position: absolute;

  svg {
    animation: ${spin6} 1s linear infinite;
    height: ${s("md")};
    width: ${s("md")};
  }
`;
var HiddenInput4 = styled56.input`
  display: none;
`;
var Name2 = styled56.span`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
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
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleClick = useCallback(() => {
    if (!disabled && !isUploading) {
      inputRef.current?.click();
    }
  }, [disabled, isUploading]);
  const handleFileChange = useCallback(
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
  return /* @__PURE__ */ jsxs(Container7, { className, children: [
    /* @__PURE__ */ jsxs(
      AvatarWrapper,
      {
        $disabled: disabled,
        $size: size,
        "aria-label": changeLabel,
        role: "button",
        onClick: handleClick,
        children: [
          /* @__PURE__ */ jsx(Avatar2, { $hasPhoto: Boolean(displayUrl), $size: size, children: displayUrl ? /* @__PURE__ */ jsx(AvatarImage2, { alt: name ?? changeLabel, src: displayUrl }) : initials2 }),
          isUploading ? /* @__PURE__ */ jsx(LoadingOverlay2, { children: /* @__PURE__ */ jsx(Loader2, {}) }) : /* @__PURE__ */ jsx(Overlay, { children: /* @__PURE__ */ jsx(Camera, {}) })
        ]
      }
    ),
    name && /* @__PURE__ */ jsx(Name2, { children: name }),
    /* @__PURE__ */ jsx(
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
var PaginationWrapper = styled56.nav`
  align-items: center;
  display: flex;
  gap: ${s("micro")};
  justify-content: center;
`;
var buttonBase = css`
  align-items: center;
  background: none;
  border: 1px solid ${c("border")};
  border-radius: ${sh("md")};
  color: ${c("textSecondary")};
  cursor: pointer;
  display: inline-flex;
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("medium")};
  justify-content: center;
  min-height: 2rem;
  min-width: 2rem;
  padding: ${s("micro")} ${s("xs")};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${c("neutral50")};
    border-color: ${c("primary500")};
    color: ${c("primary500")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;
var PaginationButton = styled56.button`
  ${buttonBase}

  ${({ $active }) => $active && css`
      background-color: ${c("primary500")};
      border-color: ${c("primary500")};
      color: ${c("white")};

      &:hover:not(:disabled) {
        background-color: ${c("primary600")};
        border-color: ${c("primary600")};
        color: ${c("white")};
      }
    `}
`;
var PaginationEllipsis = styled56.span`
  align-items: center;
  color: ${c("textTertiary")};
  display: inline-flex;
  font-size: ${ts("sm")};
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
  const pages = useMemo(
    () => generatePages(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );
  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
      }
    },
    [currentPage, onPageChange, totalPages]
  );
  const handleFirst = useCallback(() => handlePageChange(1), [handlePageChange]);
  const handlePrev = useCallback(
    () => handlePageChange(currentPage - 1),
    [currentPage, handlePageChange]
  );
  const handleNext = useCallback(
    () => handlePageChange(currentPage + 1),
    [currentPage, handlePageChange]
  );
  const handleLast = useCallback(
    () => handlePageChange(totalPages),
    [handlePageChange, totalPages]
  );
  const handlePageClick = useCallback(
    (e) => {
      const page = Number(e.currentTarget.dataset.page);
      if (!Number.isNaN(page)) handlePageChange(page);
    },
    [handlePageChange]
  );
  const renderPages = () => pages.map(
    (page, index) => page === ELLIPSIS ? /* @__PURE__ */ jsx(PaginationEllipsis, { children: "..." }, `ellipsis-${index}`) : /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(PaginationWrapper, { "aria-label": "Pagination", className, children: [
    showFirstLast && /* @__PURE__ */ jsx(
      PaginationButton,
      {
        "aria-label": "First page",
        disabled: currentPage === 1,
        onClick: handleFirst,
        children: /* @__PURE__ */ jsx(ChevronsLeft, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsx(
      PaginationButton,
      {
        "aria-label": previousLabel ?? "Previous page",
        disabled: currentPage === 1,
        onClick: handlePrev,
        children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16 })
      }
    ),
    renderPages(),
    /* @__PURE__ */ jsx(
      PaginationButton,
      {
        "aria-label": nextLabel ?? "Next page",
        disabled: currentPage === totalPages,
        onClick: handleNext,
        children: /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
      }
    ),
    showFirstLast && /* @__PURE__ */ jsx(
      PaginationButton,
      {
        "aria-label": "Last page",
        disabled: currentPage === totalPages,
        onClick: handleLast,
        children: /* @__PURE__ */ jsx(ChevronsRight, { size: 16 })
      }
    )
  ] });
};
var DataTableWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("sm")};
  width: 100%;
`;
var DataTableToolbar = styled56.div`
  display: flex;
  gap: ${s("sm")};
  justify-content: flex-end;
`;
var DataTableSearchInput = styled56.input`
  border: 1px solid ${c("border")};
  border-radius: ${sh("md")};
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  max-width: 20rem;
  outline: none;
  padding: ${s("xs")} ${s("sm")};
  transition: border-color 0.2s ease;
  width: 100%;

  &::placeholder {
    color: ${c("textDisabled")};
  }

  &:focus {
    border-color: ${c("primary500")};
    box-shadow: 0 0 0 3px ${c("primaryFocusShadow")};
  }
`;
var DataTableContainer = styled56.div`
  border: 1px solid ${c("border")};
  border-radius: ${sh("lg")};
  overflow-x: auto;
  width: 100%;
`;
var StyledTable = styled56.table`
  border-collapse: collapse;
  min-width: 100%;
  width: 100%;
`;
var TableHead = styled56.thead`
  background-color: ${c("neutral50")};
`;
var TableHeadRow = styled56.tr`
  border-bottom: 1px solid ${c("border")};
`;
var TableHeadCell = styled56.th`
  color: ${c("textSecondary")};
  cursor: ${({ $sortable }) => $sortable ? "pointer" : "default"};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
  font-weight: ${tw("semibold")};
  letter-spacing: ${tt("wide")};
  padding: ${s("xs")} ${s("sm")};
  text-align: ${({ $align }) => $align};
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;
  width: ${({ $width }) => $width ?? "auto"};

  ${({ $sortable }) => $sortable && css`
      &:hover {
        color: ${c("textPrimary")};
      }
    `}
`;
var TableHeadCellContent = styled56.span`
  align-items: center;
  display: inline-flex;
  gap: ${s("micro")};
`;
var SortIcon2 = styled56.span`
  color: ${({ $active }) => $active ? c("primary500") : c("textDisabled")};
  display: inline-flex;
`;
var TableBody = styled56.tbody``;
var TableRow = styled56.tr`
  border-bottom: 1px solid ${c("borderLight")};
  transition: background-color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${c("neutral50")};
  }
`;
var TableCell = styled56.td`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  padding: ${s("xs")} ${s("sm")};
  text-align: ${({ $align }) => $align};
`;
var TableEmptyRow = styled56.tr``;
var TableEmptyCell = styled56.td`
  color: ${c("textTertiary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  padding: ${s("xl")} ${s("sm")};
  text-align: center;
`;
var shimmer2 = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;
var TableLoadingCell = styled56.td`
  padding: ${s("xs")} ${s("sm")};
`;
var TableLoadingBar = styled56.div`
  animation: ${shimmer2} 1.5s infinite;
  background: linear-gradient(
    90deg,
    ${c("neutral50")} 25%,
    ${c("neutral100")} 50%,
    ${c("neutral50")} 75%
  );
  background-size: 200% 100%;
  border-radius: ${sh("sm")};
  height: 1rem;
  width: 100%;
`;
var DataTableFooter = styled56.div`
  display: flex;
  justify-content: center;
  padding-top: ${s("xs")};
`;
var SelectionCheckbox = styled56.input`
  accent-color: ${c("primary500")};
  cursor: pointer;
  height: ${s("sm")};
  width: ${s("sm")};
`;
var RowActions = styled56.div`
  display: inline-flex;
  gap: ${s("micro")};
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
  const handleSort = useCallback(
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
  const handleSearch = useCallback(
    (e) => {
      onSearch?.(e.target.value);
    },
    [onSearch]
  );
  const handleToggleAll = useCallback(() => {
    if (!onSelectionChange) return;
    const allKeys = data.map(rowKey);
    const allSelected2 = allKeys.length > 0 && allKeys.every((key) => selectedKeys.includes(key));
    onSelectionChange(allSelected2 ? [] : allKeys);
  }, [data, onSelectionChange, rowKey, selectedKeys]);
  const handleToggleRowEvent = useCallback(
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
      return /* @__PURE__ */ jsx(SortIcon2, { $active: false, children: /* @__PURE__ */ jsx(ArrowUpDown, { size: 14 }) });
    }
    return /* @__PURE__ */ jsx(SortIcon2, { $active: true, children: sort?.direction === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { size: 14 }) : /* @__PURE__ */ jsx(ArrowDown, { size: 14 }) });
  };
  const renderCell = (column, row, index) => {
    if (column.render) return column.render(row, index);
    return row[column.key];
  };
  const handleRowAction = useCallback(
    (action, row) => () => action.onClick(row),
    []
  );
  const renderRowActions = (row, actions) => /* @__PURE__ */ jsx(RowActions, { children: actions.map((action) => /* @__PURE__ */ jsx(
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
  const renderLoadingRows = () => loadingRowKeys.map((key) => /* @__PURE__ */ jsxs(TableRow, { children: [
    hasSelection && /* @__PURE__ */ jsx(TableLoadingCell, { children: /* @__PURE__ */ jsx(TableLoadingBar, {}) }),
    columns.map((col) => /* @__PURE__ */ jsx(TableLoadingCell, { children: /* @__PURE__ */ jsx(TableLoadingBar, {}) }, col.key)),
    hasActions && /* @__PURE__ */ jsx(TableLoadingCell, { children: /* @__PURE__ */ jsx(TableLoadingBar, {}) })
  ] }, key));
  const renderEmptyRow = () => /* @__PURE__ */ jsx(TableEmptyRow, { children: /* @__PURE__ */ jsx(TableEmptyCell, { colSpan: totalColumns, children: emptyMessage }) });
  const renderDataRows = () => data.map((row, index) => {
    const key = rowKey(row);
    return /* @__PURE__ */ jsxs(TableRow, { children: [
      hasSelection && /* @__PURE__ */ jsx(TableCell, { $align: "center", children: /* @__PURE__ */ jsx(
        SelectionCheckbox,
        {
          "aria-label": selectRowLabel,
          checked: selectedKeys.includes(key),
          "data-row-key": key,
          type: "checkbox",
          onChange: handleToggleRowEvent
        }
      ) }),
      columns.map((col) => /* @__PURE__ */ jsx(TableCell, { $align: col.align ?? "left", children: renderCell(col, row, index) }, col.key)),
      hasActions && rowActions && /* @__PURE__ */ jsx(TableCell, { $align: "right", children: renderRowActions(row, rowActions) })
    ] }, key);
  });
  const allSelected = data.length > 0 && data.map(rowKey).every((key) => selectedKeys.includes(key));
  const renderHead = () => /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableHeadRow, { children: [
    hasSelection && /* @__PURE__ */ jsx(TableHeadCell, { $align: "center", $sortable: false, $width: "40px", children: /* @__PURE__ */ jsx(
      SelectionCheckbox,
      {
        "aria-label": selectAllLabel,
        checked: allSelected,
        type: "checkbox",
        onChange: handleToggleAll
      }
    ) }),
    columns.map((col) => /* @__PURE__ */ jsx(
      TableHeadCell,
      {
        $align: col.align ?? "left",
        $sortable: Boolean(col.sortable),
        $width: col.width,
        "data-col-key": col.key,
        onClick: handleSort,
        children: /* @__PURE__ */ jsxs(TableHeadCellContent, { children: [
          col.header,
          renderSortIcon(col)
        ] })
      },
      col.key
    )),
    hasActions && /* @__PURE__ */ jsx(TableHeadCell, { $align: "right", $sortable: false, children: /* @__PURE__ */ jsx(TableHeadCellContent, { children: actionsHeader }) })
  ] }) });
  const hasPagination = onPageChange !== void 0 && currentPage !== void 0 && totalPages !== void 0;
  return /* @__PURE__ */ jsxs(DataTableWrapper, { className, children: [
    onSearch !== void 0 && /* @__PURE__ */ jsx(DataTableToolbar, { children: /* @__PURE__ */ jsx(
      DataTableSearchInput,
      {
        placeholder: searchPlaceholder,
        type: "text",
        value: searchValue ?? "",
        onChange: handleSearch
      }
    ) }),
    /* @__PURE__ */ jsx(DataTableContainer, { children: /* @__PURE__ */ jsxs(StyledTable, { children: [
      renderHead(),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        loading && renderLoadingRows(),
        !loading && data.length === 0 && renderEmptyRow(),
        !loading && data.length > 0 && renderDataRows()
      ] })
    ] }) }),
    hasPagination && totalPages > 1 && /* @__PURE__ */ jsx(DataTableFooter, { children: /* @__PURE__ */ jsx(
      Pagination,
      {
        currentPage,
        totalPages,
        onPageChange
      }
    ) })
  ] });
};
var FileUploaderWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
  width: 100%;
`;
var FileUploaderLabel = styled56.label`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("medium")};
`;
var FileUploaderDropzone = styled56.div`
  align-items: center;
  border: 2px dashed ${({ $hasError }) => $hasError ? c("error") : c("border")};
  border-radius: ${sh("lg")};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
  justify-content: center;
  min-height: 8rem;
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  padding: ${s("lg")};
  transition: all 0.2s ease;

  ${({ $hasError, $isDragOver }) => $isDragOver && css`
      background-color: ${$hasError ? c("errorBackground") : c("primary50")};
      border-color: ${$hasError ? c("error") : c("primary500")};
    `}

  &:hover {
    border-color: ${({ $disabled, $hasError }) => $disabled ? void 0 : $hasError ? c("error") : c("primary500")};
  }
`;
var FileUploaderIcon = styled56.div`
  color: ${c("textTertiary")};
`;
var FileUploaderText = styled56.span`
  color: ${c("textSecondary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  text-align: center;
`;
var FileUploaderBrowse = styled56.span`
  color: ${c("primary500")};
  cursor: pointer;
  font-weight: ${tw("medium")};
  text-decoration: underline;
`;
var FileUploaderDescription = styled56.span`
  color: ${c("textTertiary")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
  text-align: center;
`;
var FileUploaderError = styled56.span`
  color: ${c("error")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
`;
var FileUploaderFileList = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("micro")};
`;
var FileUploaderFileItem = styled56.div`
  align-items: center;
  background-color: ${c("neutral50")};
  border: 1px solid ${c("border")};
  border-radius: ${sh("md")};
  display: flex;
  gap: ${s("xs")};
  justify-content: space-between;
  padding: ${s("xs")} ${s("sm")};
`;
var FileUploaderFileName = styled56.span`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
var FileUploaderFileSize = styled56.span`
  color: ${c("textTertiary")};
  flex-shrink: 0;
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
`;
var FileUploaderRemoveButton = styled56.button`
  align-items: center;
  background: none;
  border: none;
  color: ${c("textTertiary")};
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  padding: ${s("micro")};
  transition: color 0.2s ease;

  &:hover {
    color: ${c("error")};
  }
`;
var FileUploaderHiddenInput = styled56.input`
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
  const [isDragOver, setIsDragOver] = useState(false);
  const [localError, setLocalError] = useState(null);
  const inputRef = useRef(null);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const processFiles = useCallback(
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
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    },
    [disabled]
  );
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );
  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);
  const handleInputChange = useCallback(
    (e) => {
      processFiles(e.target.files);
      if (inputRef.current) inputRef.current.value = "";
    },
    [processFiles]
  );
  const handleRemoveClick = useCallback(
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
  return /* @__PURE__ */ jsxs(FileUploaderWrapper, { className, children: [
    label && /* @__PURE__ */ jsx(FileUploaderLabel, { children: label }),
    /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsx(FileUploaderIcon, { children: /* @__PURE__ */ jsx(Upload, { size: 24 }) }),
          /* @__PURE__ */ jsxs(FileUploaderText, { children: [
            "Drag files here or ",
            /* @__PURE__ */ jsx(FileUploaderBrowse, { children: "browse" })
          ] }),
          description && /* @__PURE__ */ jsx(FileUploaderDescription, { children: description })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      FileUploaderHiddenInput,
      {
        accept,
        multiple,
        ref: inputRef,
        type: "file",
        onChange: handleInputChange
      }
    ),
    displayError && /* @__PURE__ */ jsx(FileUploaderError, { children: displayError }),
    value.length > 0 && /* @__PURE__ */ jsx(FileUploaderFileList, { children: value.map((uploaderFile) => /* @__PURE__ */ jsxs(FileUploaderFileItem, { children: [
      /* @__PURE__ */ jsx(FileUploaderFileName, { children: uploaderFile.file.name }),
      /* @__PURE__ */ jsx(FileUploaderFileSize, { children: formatFileSize(uploaderFile.file.size) }),
      /* @__PURE__ */ jsx(
        FileUploaderRemoveButton,
        {
          "aria-label": `Remove ${uploaderFile.file.name}`,
          "data-file-id": uploaderFile.id,
          type: "button",
          onClick: handleRemoveClick,
          children: /* @__PURE__ */ jsx(X, { size: 16 })
        }
      )
    ] }, uploaderFile.id)) })
  ] });
};
var FormFieldWrapper = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("micro")};
  width: 100%;
`;
var FormFieldLabel = styled56.label`
  color: ${c("textPrimary")};
  font-family: ${tf("body")};
  font-size: ${ts("sm")};
  font-weight: ${tw("medium")};
`;
var FormFieldRequired = styled56.span`
  color: ${c("error")};
  margin-left: ${s("micro")};
`;
var FormFieldError = styled56.span`
  color: ${c("error")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
`;
var FormFieldHelp = styled56.span`
  color: ${c("textTertiary")};
  font-family: ${tf("body")};
  font-size: ${ts("xs")};
`;
var FormField = ({
  children,
  className,
  error,
  helpText,
  htmlFor,
  label,
  required = false
}) => /* @__PURE__ */ jsxs(FormFieldWrapper, { className, children: [
  label && /* @__PURE__ */ jsxs(FormFieldLabel, { htmlFor, children: [
    label,
    required && /* @__PURE__ */ jsx(FormFieldRequired, { children: "*" })
  ] }),
  children,
  error && /* @__PURE__ */ jsx(FormFieldError, { children: error }),
  !error && helpText && /* @__PURE__ */ jsx(FormFieldHelp, { children: helpText })
] });
var fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
var breath = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;
var Container8 = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("sm")};
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: ${layout.zIndex.fixed};
  ${({ $side }) => $side === "left" ? css`
          left: ${s("md")};
        ` : css`
          right: ${s("md")};
        `}

  @media (max-width: ${layout.breakpoint.md}) {
    gap: ${s("xs")};
    ${({ $side }) => $side === "left" ? css`
            left: ${s("sm")};
          ` : css`
            right: ${s("sm")};
          `}
  }
`;
var buttonBase2 = css`
  align-items: center;
  backdrop-filter: blur(10px);
  background: rgb(${c("tealRgb")} / 0.1);
  border: 1px solid rgb(${c("tealRgb")} / 0.2);
  border-radius: 50%;
  color: ${c("primary500")};
  cursor: pointer;
  display: flex;
  height: ${s("2xl")};
  justify-content: center;
  text-decoration: none;
  transition: all ${mo("fast")};
  width: ${s("2xl")};

  &:hover {
    background: rgb(${c("tealRgb")} / 0.2);
    transform: translateY(-3px) scale(1.1);
  }

  svg {
    height: ${s("sm")};
    width: ${s("sm")};
  }
`;
var animation = ({ $animated, $delay }) => $animated ? css`
        animation:
          ${fadeInUp} 1s ease-out ${$delay}s both,
          ${breath} 6s ease-in-out infinite ${$delay * 0.3}s;
      ` : css``;
var ActionLink = styled56.a`
  ${buttonBase2}
  ${animation}
`;
var ActionTrigger = styled56.button`
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
  return /* @__PURE__ */ jsx(Container8, { $side: side, className, children: items.map((item, index) => {
    const delay = (index + 1) * STAGGER_SECONDS;
    if (item.href) {
      return /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx(
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
}) => /* @__PURE__ */ jsx(FormField, { className, helpText: error ? void 0 : helpText, children: /* @__PURE__ */ jsx(
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
}) => /* @__PURE__ */ jsx(FormField, { className, helpText: error ? void 0 : helpText, children: /* @__PURE__ */ jsx(
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
}) => /* @__PURE__ */ jsx(FormField, { className, helpText: error ? void 0 : helpText, children: /* @__PURE__ */ jsx(
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
var spin7 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
var Container9 = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
  width: 100%;
`;
var Label2 = styled56.label`
  color: ${c("textSecondary")};
  font-size: ${ts("sm")};
  font-weight: ${tw("medium")};
`;
var UploadArea = styled56.div`
  align-items: center;
  background-color: ${c("backgroundAlt")};
  border: 2px dashed ${c("border")};
  border-radius: ${sh("lg")};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};
  display: flex;
  height: ${({ $height }) => $height};
  justify-content: center;
  opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
  overflow: hidden;
  position: relative;
  transition: ${mo("normal")};
  width: 100%;

  &:hover {
    border-color: ${({ $disabled }) => $disabled ? c("border") : c("primary400")};
  }
`;
var PreviewImage2 = styled56.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
var Placeholder = styled56.div`
  align-items: center;
  color: ${c("textTertiary")};
  display: flex;
  flex-direction: column;
  font-size: ${ts("sm")};
  gap: ${s("xs")};
`;
var PlaceholderText = styled56.span`
  color: inherit;
`;
var Overlay2 = styled56.div`
  align-items: center;
  background-color: rgb(${c("blackRgb")} / 0.5);
  display: flex;
  inset: 0;
  justify-content: center;
  opacity: 0;
  position: absolute;
  transition: ${mo("normal")};

  &:hover {
    opacity: 1;
  }

  svg {
    color: ${c("white")};
    height: ${s("lg")};
    width: ${s("lg")};
  }
`;
var LoadingOverlay3 = styled56.div`
  align-items: center;
  background-color: rgb(${c("blackRgb")} / 0.7);
  display: flex;
  inset: 0;
  justify-content: center;
  position: absolute;

  svg {
    animation: ${spin7} 1s linear infinite;
    color: ${c("white")};
    height: ${s("lg")};
    width: ${s("lg")};
  }
`;
var HiddenInput5 = styled56.input`
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
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleClick = useCallback(() => {
    if (!disabled && !isUploading) {
      inputRef.current?.click();
    }
  }, [disabled, isUploading]);
  const handleFileChange = useCallback(
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
  return /* @__PURE__ */ jsxs(Container9, { className, children: [
    label && /* @__PURE__ */ jsx(Label2, { htmlFor: id, children: label }),
    /* @__PURE__ */ jsxs(
      UploadArea,
      {
        $disabled: disabled,
        $hasImage: Boolean(displayUrl),
        $height: height,
        "aria-label": displayUrl ? changeLabel : placeholder,
        role: "button",
        onClick: handleClick,
        children: [
          displayUrl ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(PreviewImage2, { alt: label ?? changeLabel, src: displayUrl }),
            !isUploading && /* @__PURE__ */ jsx(Overlay2, { children: /* @__PURE__ */ jsx(Camera, {}) })
          ] }) : /* @__PURE__ */ jsxs(Placeholder, { children: [
            /* @__PURE__ */ jsx(ImageIcon, {}),
            /* @__PURE__ */ jsx(PlaceholderText, { children: placeholder })
          ] }),
          isUploading && /* @__PURE__ */ jsx(LoadingOverlay3, { children: /* @__PURE__ */ jsx(Loader2, {}) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
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
    return css`
      left: ${s("md")};
      top: ${s("md")};
    `;
  }
  if ($position === "bottom-left") {
    return css`
      bottom: ${s("md")};
      left: ${s("md")};
    `;
  }
  if ($position === "bottom-right") {
    return css`
      bottom: ${s("md")};
      right: ${s("md")};
    `;
  }
  return css`
    right: ${s("md")};
    top: ${s("md")};
  `;
};
var Container10 = styled56.div`
  display: flex;
  flex-direction: column;
  gap: ${s("xs")};
  max-width: 400px;
  position: fixed;
  width: calc(100vw - ${s("lg")});
  z-index: ${layout.zIndex.toast};
  ${({ $position }) => positionStyles($position)}
`;
var NotificationContainer = ({
  notifications,
  onClose,
  position = "top-right"
}) => {
  const handleClose = useCallback((id) => () => onClose(id), [onClose]);
  if (notifications.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(Container10, { $position: position, "aria-live": "polite", role: "status", children: notifications.map((notification) => /* @__PURE__ */ jsx(
    NotificationToast,
    {
      notification,
      onClose: handleClose(notification.id)
    },
    notification.id
  )) });
};

export { ActionButton, Alert, AppFooter, AppHeader, AuthCard, AuthLayout, Avatar, AvatarUpload, Badge, Button, Card, Checkbox, Container, DataTable, DetailAmount, DetailContentBox, DetailDivider, DetailLabel, DetailRow, DetailSection, DetailValue, Divider, Dropdown, EmptyState, EntityCell, ErrorFallback, ErrorState, FileUploader, FloatingActions, FormActions, FormError, FormField, FormGroup, GlobalLoading, HeaderRow, Image, ImagePreviewModal, ImageUploader, InfoMessage, InlineIcon, Input, LazyFallback, LoadingState, Modal, ModalActions, ModalConfirmChildren, ModalContainer, ModalContent, ModalFooter, ModalFooterBar, ModalHeader, ModalIcon, ModalMessage, ModalOverlay, ModalTitle, NotificationContainer, NotificationToast, PageLayout, PageTitle, PageWrapper, Pagination, PasswordInput, PopButton, ProgressBar, Radio, RadioGroup, ScreenBoundary, ScreenContainer, SearchInput, SectionTitle, Select, SelectField, Skeleton, SortableHeader, Spacer, Spinner, StatItem, StatsBar, StatsCard, StatsGrid, StepCard, Switch, Tabs, TapHint, TextField, Textarea, TextareaField, Toggle, ToggleActiveButton, Tooltip };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map