import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { ReactNode, MouseEvent, ChangeEvent } from 'react';
import * as styled_components from 'styled-components';
import * as styled_components_dist_types from 'styled-components/dist/types';
import { N as NotificationToastProps, Q as QueuedNotification } from './index-SPSdbsR8.js';
export { a as NotificationType, b as NotifyInput, S as StyledContainerProps, c as StyledIconProps, T as TableSort, d as ToastNotification, U as UseLoadingReturn, e as UseModalReturn, f as UseNotificationsOptions, g as UseNotificationsResult, h as UsePaginationOptions, i as UsePaginationReturn, j as UseTableSortOptions, k as UseTableSortReturn, u as useClickOutside, l as useDebounce, m as useLoading, n as useMediaQuery, o as useModal, p as useNotifications, q as usePagination, r as useTableSort } from './index-SPSdbsR8.js';
export { capitalize, capitalizeWords, chunk, deepMerge, diffInDays, formatBytes, formatCompact, formatCurrency, formatDate, formatDateTime, formatNumber, formatPercentage, formatPhone, formatRelative, groupBy, initials, isEmpty, isExpired, omit, pick, pluralize, slugify, sortBy, truncate, unique, uniqueBy } from './utils/index.js';

/**
 * ActionButton Component Interfaces
 */

type ActionButtonVariant = 'delete' | 'edit' | 'neutral' | 'view';
type ActionButtonSize = 'md' | 'sm';
interface ActionButtonProps {
    className?: string;
    disabled?: boolean;
    icon: ReactNode;
    isLoading?: boolean;
    onClick: () => void;
    size?: ActionButtonSize;
    title: string;
    variant?: ActionButtonVariant;
}
interface StyledActionButtonProps {
    $isLoading: boolean;
    $size: ActionButtonSize;
    $variant: ActionButtonVariant;
}

declare const ActionButton: ({ className, disabled, icon, isLoading, onClick, size, title, variant, }: ActionButtonProps) => react_jsx_runtime.JSX.Element;

/** Alert component props */

interface AlertProps {
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    onDismiss?: () => void;
    title?: string;
    variant?: 'info' | 'success' | 'warning' | 'error';
}

declare const Alert: ({ children, className, icon, onDismiss, title, variant, }: AlertProps) => react_jsx_runtime.JSX.Element;

/** Avatar component props */
interface AvatarProps {
    alt?: string;
    className?: string;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    src?: string | null;
}

declare const Avatar: ({ alt, className, name, size, src }: AvatarProps) => react_jsx_runtime.JSX.Element;

/**
 * Badge Component Interfaces
 */

type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeVariant = 'danger' | 'default' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';
interface BadgeProps {
    children: ReactNode;
    className?: string;
    size?: BadgeSize;
    variant?: BadgeVariant;
}
interface StyledBadgeProps {
    $size?: BadgeSize;
    $variant: BadgeVariant;
}

declare const Badge: ({ children, className, size, variant }: BadgeProps) => react_jsx_runtime.JSX.Element;

/**
 * Button Component Interfaces
 *
 * Unified button component supporting all admin variants:
 * - CancelButton, SaveButton, ConfirmButton, CreateButton
 * - IconButton, CloseButton
 */

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'brand' | 'brand-outline' | 'brand-ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
type ButtonShape = 'square' | 'circle' | 'pill';
interface ButtonProps {
    'aria-label'?: string;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: ReactNode;
    iconOnly?: boolean;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    loadingIcon?: ReactNode;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    shape?: ButtonShape;
    size?: ButtonSize;
    title?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
}
interface StyledButtonProps {
    $fullWidth?: boolean;
    $iconOnly?: boolean;
    $shape?: ButtonShape;
    $size: ButtonSize;
    $variant: ButtonVariant;
}

declare const Button: ({ "aria-label": ariaLabel, children, className, disabled, fullWidth, icon, iconOnly, iconPosition, loading, loadingIcon, onClick, shape, size, title, type, variant, }: ButtonProps) => react_jsx_runtime.JSX.Element;

/**
 * Card Component Interfaces
 */

interface CardProps {
    children: ReactNode;
    onClick?: () => void;
    padding?: 'large' | 'medium' | 'none' | 'small';
}

declare const Card: ({ children, onClick, padding }: CardProps) => react_jsx_runtime.JSX.Element;

/** Checkbox component props */
interface CheckboxProps {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    id?: string;
    label?: string;
    name?: string;
    onChange?: (checked: boolean) => void;
}

declare const Checkbox: ({ checked, className, disabled, id, label, name, onChange, }: CheckboxProps) => react_jsx_runtime.JSX.Element;

/**
 * Container Component Interfaces
 */

type ContainerSize = 'full' | 'large' | 'medium' | 'small';
interface ContainerProps {
    children: ReactNode;
    size?: ContainerSize;
}

declare const Container: ({ children, size }: ContainerProps) => react_jsx_runtime.JSX.Element;

/**
 * DetailLayout Interfaces
 */

type DetailContentBoxVariant = 'default' | 'info' | 'warning' | 'error';
interface DetailSectionProps {
    children: ReactNode;
    className?: string;
}
interface DetailLabelProps {
    children: ReactNode;
    className?: string;
}
interface DetailValueProps {
    children: ReactNode;
    className?: string;
    mono?: boolean;
}
interface DetailRowProps {
    children: ReactNode;
    className?: string;
    columns?: 2 | 3 | 4;
}
interface DetailDividerProps {
    className?: string;
}
interface DetailAmountProps {
    children: ReactNode;
    className?: string;
    size?: 'default' | 'large';
}
interface DetailContentBoxProps {
    children: ReactNode;
    className?: string;
    variant?: DetailContentBoxVariant;
}
interface StyledDetailRowProps {
    $columns: number;
}
interface StyledDetailContentBoxProps {
    $variant: DetailContentBoxVariant;
}

declare const DetailSection: ({ children, className }: DetailSectionProps) => react_jsx_runtime.JSX.Element;
declare const DetailLabel: ({ children, className }: DetailLabelProps) => react_jsx_runtime.JSX.Element;
declare const DetailValue: ({ children, className, mono }: DetailValueProps) => react_jsx_runtime.JSX.Element;
declare const DetailRow: ({ children, className, columns }: DetailRowProps) => react_jsx_runtime.JSX.Element;
declare const DetailDivider: ({ className }: DetailDividerProps) => react_jsx_runtime.JSX.Element;
declare const DetailAmount: ({ children, className, size }: DetailAmountProps) => react_jsx_runtime.JSX.Element;
declare const DetailContentBox: ({ children, className, variant, }: DetailContentBoxProps) => react_jsx_runtime.JSX.Element;

/** Divider component props */
interface DividerProps {
    className?: string;
    color?: string;
    orientation?: 'horizontal' | 'vertical';
    spacing?: string;
}

declare const Divider: ({ className, color, orientation, spacing, }: DividerProps) => react_jsx_runtime.JSX.Element;

/**
 * Dropdown Interfaces
 */

type DropdownPosition = 'top' | 'bottom';
interface DropdownOption {
    disabled?: boolean;
    label: string;
    value: string;
}
interface DropdownProps {
    className?: string;
    disabled?: boolean;
    icon?: ReactNode;
    onChange: (value: string) => void;
    options: DropdownOption[];
    placeholder?: string;
    position?: DropdownPosition;
    value: string;
}
interface StyledDropdownMenuProps {
    $position: DropdownPosition;
}
interface StyledDropdownItemProps {
    $disabled?: boolean;
    $selected?: boolean;
}

declare const Dropdown: ({ className, disabled, icon, onChange, options, placeholder, position, value, }: DropdownProps) => react_jsx_runtime.JSX.Element;

/**
 * EmptyState Interfaces
 */

interface EmptyStateProps {
    action?: ReactNode;
    className?: string;
    icon?: ReactNode;
    message?: string;
    title?: string;
}

declare const EmptyState: ({ action, className, icon, message, title }: EmptyStateProps) => react_jsx_runtime.JSX.Element;

/**
 * EntityCell Interfaces
 */
interface EntityCellProps {
    className?: string;
    description?: string;
    id?: string;
    name: string;
}

declare const EntityCell: ({ className, description, id, name }: EntityCellProps) => react_jsx_runtime.JSX.Element;

/** ErrorFallback component interfaces */

interface ErrorAction {
    label: string;
    onClick: () => void;
}
interface ErrorFallbackProps {
    actions?: ErrorAction[];
    className?: string;
    description?: string;
    icon?: ReactNode;
    onRetry?: () => void;
    retryLabel?: string;
    title?: string;
}

declare const ErrorFallback: ({ actions, className, description, icon, onRetry, retryLabel, title, }: ErrorFallbackProps) => react_jsx_runtime.JSX.Element;

/**
 * ErrorState Interfaces
 */

interface ErrorStateProps {
    action?: ReactNode;
    className?: string;
    icon?: ReactNode;
    message?: string;
    title?: string;
}

declare const ErrorState: ({ action, className, icon, message, title }: ErrorStateProps) => react_jsx_runtime.JSX.Element;

/**
 * FormActions Interfaces
 */

type FormActionsAlign = 'left' | 'right' | 'center';
interface FormActionsProps {
    align?: FormActionsAlign;
    children: ReactNode;
    className?: string;
}
interface StyledFormActionsProps {
    $align: FormActionsAlign;
}

declare const FormActions: ({ align, children, className }: FormActionsProps) => react_jsx_runtime.JSX.Element;

/**
 * FormError Interfaces
 */

type FormErrorVariant = 'form' | 'field';
interface FormErrorProps {
    children: ReactNode;
    className?: string;
    variant?: FormErrorVariant;
}
interface StyledFormErrorProps {
    $variant: FormErrorVariant;
}

declare const FormError: ({ children, className, variant }: FormErrorProps) => react_jsx_runtime.JSX.Element;

/**
 * FormGroup Interfaces
 */

interface FormGroupProps {
    children: ReactNode;
    className?: string;
}

declare const FormGroup: ({ children, className }: FormGroupProps) => react_jsx_runtime.JSX.Element;

/** GlobalLoading component props */

interface GlobalLoadingProps {
    children?: ReactNode;
    className?: string;
    isVisible: boolean;
    text?: string;
}

declare const GlobalLoading: ({ children, className, isVisible, text }: GlobalLoadingProps) => react_jsx_runtime.JSX.Element;

/**
 * Image Component Interfaces
 *
 * Global image component with implicit fallback handling.
 */

interface ImageProps {
    /** Image alt text (required for accessibility) */
    alt: string;
    /** Optional CSS class */
    className?: string;
    /** Custom fallback icon (defaults to ImageIcon) */
    fallbackIcon?: ReactNode;
    /** Custom fallback text */
    fallbackText?: string;
    /** Image height */
    height?: number | string;
    /** Lazy loading behavior */
    loading?: 'eager' | 'lazy';
    /** Object fit behavior */
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    /** Image source URL */
    src?: null | string;
    /** Image width */
    width?: number | string;
}

declare const Image: ({ alt, className, fallbackIcon, fallbackText, height, loading, objectFit, src, width, }: ImageProps) => react_jsx_runtime.JSX.Element;

/**
 * InfoMessage Interfaces
 */

type InfoMessageVariant = 'info' | 'warning' | 'success' | 'error';
interface InfoMessageProps {
    children: ReactNode;
    className?: string;
    variant?: InfoMessageVariant;
}
interface StyledInfoMessageProps {
    $variant: InfoMessageVariant;
}

declare const InfoMessage: ({ children, className, variant }: InfoMessageProps) => react_jsx_runtime.JSX.Element;

/**
 * Input Component Interfaces
 */
type InputType = 'email' | 'number' | 'password' | 'tel' | 'text';
interface InputProps {
    autoComplete?: string;
    disabled?: boolean;
    error?: string;
    fullWidth?: boolean;
    hidePasswordLabel?: string;
    id: string;
    label?: string;
    name: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    showPasswordLabel?: string;
    type?: InputType;
    value?: string;
}
interface StyledInputWrapperProps {
    $fullWidth?: boolean;
}
interface StyledInputProps {
    $hasError?: boolean;
    $hasToggle?: boolean;
}

declare const Input: ({ autoComplete, disabled, error, fullWidth, hidePasswordLabel, id, label, name, onChange, placeholder, required, showPasswordLabel, type, value, }: InputProps) => react_jsx_runtime.JSX.Element;

/** LazyFallback component props */

interface LazyFallbackProps {
    children?: ReactNode;
    className?: string;
}

declare const LazyFallback: ({ children, className }: LazyFallbackProps) => react_jsx_runtime.JSX.Element;

/**
 * LoadingState Interfaces
 */
interface LoadingStateProps {
    className?: string;
    message?: string;
}

declare const LoadingState: ({ className, message }: LoadingStateProps) => react_jsx_runtime.JSX.Element;

/**
 * Modal Component Interfaces
 *
 * Unified modal supporting:
 * - Standard modal with custom content (variant: 'default')
 * - Confirmation modal with icon, message, and action buttons (variant: 'confirm')
 */

type ModalSize = 'full' | 'large' | 'lg' | 'md' | 'medium' | 'sm' | 'small' | 'xl';
type ModalVariant = 'confirm' | 'default';
type ConfirmVariant = 'danger' | 'info' | 'success' | 'warning';
interface ModalProps {
    cancelText?: string;
    children?: ReactNode;
    closeLabel?: string;
    confirmText?: string;
    confirmVariant?: ConfirmVariant;
    disableClose?: boolean;
    footer?: ReactNode;
    icon?: ReactNode;
    isOpen: boolean;
    loading?: boolean;
    message?: string;
    noPadding?: boolean;
    onCancel?: () => void;
    onClose: () => void;
    onConfirm?: () => void;
    size?: ModalSize;
    title?: string;
    variant?: ModalVariant;
}
interface StyledModalContainerProps {
    $isClosing: boolean;
    $size: 'full' | 'lg' | 'md' | 'sm' | 'xl';
}
interface StyledModalOverlayProps {
    $isClosing: boolean;
}
interface StyledModalIconProps {
    $variant: ConfirmVariant;
}

declare const Modal: ({ cancelText, children, closeLabel, confirmText, confirmVariant, disableClose, footer, icon, isOpen, loading, message, noPadding, onCancel, onClose, onConfirm, size, title, variant, }: ModalProps) => react_jsx_runtime.JSX.Element | null;

declare const ModalOverlay: styled_components_dist_types.IStyledComponentBase<"web", styled_components_dist_types.Substitute<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyledModalOverlayProps>> & string;
declare const ModalContainer: styled_components_dist_types.IStyledComponentBase<"web", styled_components_dist_types.Substitute<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyledModalContainerProps>> & string;
declare const ModalHeader: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
declare const ModalTitle: styled_components_dist_types.IStyledComponentBase<"web", styled_components_dist_types.Substitute<react.DetailedHTMLProps<react.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {
    $centered?: boolean;
}>> & string;
declare const ModalContent: styled_components_dist_types.IStyledComponentBase<"web", styled_components_dist_types.Substitute<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
    $noPadding?: boolean;
}>> & string;
declare const ModalFooterBar: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
declare const ModalIcon: styled_components_dist_types.IStyledComponentBase<"web", styled_components_dist_types.Substitute<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyledModalIconProps>> & string;
declare const ModalMessage: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, never>> & string;
declare const ModalConfirmChildren: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
declare const ModalActions: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;

/**
 * ModalFooter Interfaces
 */

type ModalFooterAlign = 'left' | 'right' | 'space-between';
interface ModalFooterProps {
    align?: ModalFooterAlign;
    children: ReactNode;
    className?: string;
}
interface StyledModalFooterProps {
    $align: ModalFooterAlign;
}

declare const ModalFooter: ({ align, children, className }: ModalFooterProps) => react_jsx_runtime.JSX.Element;

declare const NotificationToast: ({ notification, onClose, }: NotificationToastProps) => react_jsx_runtime.JSX.Element;

/**
 * PageLayout Interfaces
 */

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

/**
 * PageLayout Styled Components
 */
declare const PageWrapper: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
declare const ScreenContainer: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLElement>, HTMLElement>, never>> & string;
declare const PageTitle: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, never>> & string;
declare const HeaderRow: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
declare const SectionTitle: styled_components_dist_types.IStyledComponentBase<"web", styled_components.FastOmit<react.DetailedHTMLProps<react.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, never>> & string;

declare const PageLayout: ({ children, className, title }: PageLayoutProps) => react_jsx_runtime.JSX.Element;

/**
 * PasswordInput Interfaces
 */

interface PasswordInputProps {
    autoComplete?: string;
    className?: string;
    disabled?: boolean;
    disablePaste?: boolean;
    id?: string;
    name?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onToggleVisibility?: () => void;
    placeholder?: string;
    showPassword?: boolean;
    value?: string;
}

declare const PasswordInput: ({ autoComplete, className, disabled, disablePaste, id, name, onChange, onToggleVisibility, placeholder, showPassword, value, }: PasswordInputProps) => react_jsx_runtime.JSX.Element;

/**
 * PopButton Component Interfaces
 *
 * Neubrutalismo style button with solid border + shadow effects.
 * Variants: yellow (default), blue, primary, secondary, accent, pill (rounded, no border).
 */

type PopButtonVariant = 'yellow' | 'blue' | 'pill' | 'primary' | 'secondary' | 'accent';
interface PopButtonProps {
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: PopButtonVariant;
}
interface StyledPopButtonProps {
    $variant?: PopButtonVariant;
}

declare const PopButton: ({ children, disabled, onClick, type, variant, }: PopButtonProps) => react_jsx_runtime.JSX.Element;

/**
 * ProgressBar Component Interfaces
 */
interface ProgressBarProps {
    className?: string;
    label?: string;
    max?: number;
    showPercentage?: boolean;
    size?: 'large' | 'medium' | 'small';
    value: number;
    variant?: 'default' | 'success' | 'warning';
}

declare const ProgressBar: ({ className, label, max, showPercentage, size, value, variant, }: ProgressBarProps) => react_jsx_runtime.JSX.Element;

/**
 * RadioGroup Interfaces
 */

type RadioGroupDirection = 'horizontal' | 'vertical';
interface RadioGroupProps {
    children: ReactNode;
    className?: string;
    direction?: RadioGroupDirection;
}
interface RadioProps {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    id?: string;
    label?: string;
    name?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}
interface StyledRadioGroupProps {
    $direction: RadioGroupDirection;
}
interface StyledRadioWrapperProps {
    $disabled?: boolean;
}

declare const RadioGroup: ({ children, className, direction }: RadioGroupProps) => react_jsx_runtime.JSX.Element;
declare const Radio: ({ checked, className, disabled, id, label, name, onChange, value, }: RadioProps) => react_jsx_runtime.JSX.Element;

/**
 * ScreenBoundary Interfaces
 */

interface ScreenBoundaryProps {
    children: ReactNode;
    className?: string;
    error?: string | null;
    errorAction?: ReactNode;
    errorTitle?: string;
    isLoading: boolean;
    loadingMessage?: string;
    title: string;
}

declare const ScreenBoundary: ({ children, className, error, errorAction, errorTitle, isLoading, loadingMessage, title, }: ScreenBoundaryProps) => react_jsx_runtime.JSX.Element;

/**
 * SearchInput Interfaces
 */

interface SearchInputProps {
    children?: ReactNode;
    className?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    value: string;
}

declare const SearchInput: ({ children, className, onChange, placeholder, value, }: SearchInputProps) => react_jsx_runtime.JSX.Element;

/** Select component props */
interface SelectOption {
    disabled?: boolean;
    label: string;
    value: string;
}
interface SelectProps {
    className?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    label?: string;
    name?: string;
    onChange?: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
    size?: 'sm' | 'md' | 'lg';
    value?: string;
}

declare const Select: ({ className, disabled, error, id, label, name, onChange, options, placeholder, required, size, value, }: SelectProps) => react_jsx_runtime.JSX.Element;

/**
 * Switch Interfaces
 */

interface SwitchProps {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    id?: string;
    label?: string;
    name?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface StyledSwitchWrapperProps {
    $disabled?: boolean;
}
interface StyledSwitchTrackProps {
    $checked?: boolean;
    $disabled?: boolean;
}

declare const Switch: ({ checked, className, disabled, id, label, name, onChange, }: SwitchProps) => react_jsx_runtime.JSX.Element;

/** Skeleton component props */
interface SkeletonProps {
    borderRadius?: string;
    className?: string;
    height?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string;
}

declare const Skeleton: ({ borderRadius, className, height, variant, width, }: SkeletonProps) => react_jsx_runtime.JSX.Element;

/**
 * SortableHeader Interfaces
 */
interface SortableHeaderProps {
    active?: boolean;
    className?: string;
    direction?: 'asc' | 'desc';
    label: string;
    onSort: () => void;
    sortKey: string;
    width?: string;
}
interface StyledSortableHeaderProps {
    $active?: boolean;
    $width?: string;
}

declare const SortableHeader: ({ active, className, direction, label, onSort, width, }: SortableHeaderProps) => react_jsx_runtime.JSX.Element;

/**
 * Spacer Interfaces
 */

type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
interface SpacerProps {
    children?: ReactNode;
    className?: string;
    horizontal?: SpacerSize;
    mode?: 'margin' | 'padding';
    vertical?: SpacerSize;
}
interface StyledSpacerProps {
    $horizontal?: SpacerSize;
    $isWrapper: boolean;
    $mode: 'margin' | 'padding';
    $vertical?: SpacerSize;
}

declare const Spacer: ({ children, className, horizontal, mode, vertical, }: SpacerProps) => react_jsx_runtime.JSX.Element;

/** Spinner component props */
interface SpinnerProps {
    className?: string;
    color?: string;
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

declare const Spinner: ({ className, color, size, text }: SpinnerProps) => react_jsx_runtime.JSX.Element;

/**
 * StatItem Interfaces
 */

type StatVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
interface StatItemProps {
    className?: string;
    icon?: ReactNode;
    label: string;
    value: number | string;
    variant?: StatVariant;
}
interface StatsBarProps {
    children: ReactNode;
    className?: string;
}
interface StatsGridProps {
    children: ReactNode;
    className?: string;
    columns?: 2 | 3 | 4;
}
interface StyledStatItemProps {
    $variant: StatVariant;
}
interface StyledStatsGridProps {
    $columns: number;
}

declare const StatItem: ({ className, icon, label, value, variant }: StatItemProps) => react_jsx_runtime.JSX.Element;
declare const StatsBar: ({ children, className }: StatsBarProps) => react_jsx_runtime.JSX.Element;
declare const StatsGrid: ({ children, className, columns }: StatsGridProps) => react_jsx_runtime.JSX.Element;

/**
 * StatsCard Component Interfaces
 */

type StatsCardVariant = 'danger' | 'default' | 'info' | 'primary' | 'success' | 'warning';
interface StatsCardProps {
    className?: string;
    icon?: ReactNode;
    label: string;
    sublabel?: string;
    value: number | string;
    variant?: StatsCardVariant;
}
interface StyledStatsCardProps {
    $variant: StatsCardVariant;
}

declare const StatsCard: ({ className, icon, label, sublabel, value, variant, }: StatsCardProps) => react_jsx_runtime.JSX.Element;

/**
 * StepCard Component Interfaces
 */
interface StepCardProps {
    className?: string;
    description: string;
    number: number | string;
    title: string;
}

declare const StepCard: ({ className, description, number, title }: StepCardProps) => react_jsx_runtime.JSX.Element;

/**
 * Tabs Component Interfaces
 */

interface TabItem {
    badge?: number | string;
    content: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
    id: string;
    label: string;
}
interface TabsProps {
    activeTabId: string;
    className?: string;
    onTabChange: (tabId: string) => void;
    tabs: TabItem[];
}

declare const Tabs: ({ activeTabId, className, onTabChange, tabs }: TabsProps) => react_jsx_runtime.JSX.Element;

/**
 * TapHint Component Interfaces
 *
 * Pulsing icon overlay that hints "click here" on interactive elements.
 */
type TapHintPosition = 'bottom-right' | 'center' | 'top-right';
interface TapHintProps {
    autoHideMs?: number;
    position?: TapHintPosition;
    size?: number;
}
interface StyledTapHintProps {
    $position: TapHintPosition;
    $size: number;
}

/**
 * TapHint Component
 *
 * Subtle pulsing icon overlay that hints "click here" on interactive elements.
 * Fades away after autoHideMs or on first parent interaction.
 */

declare const TapHint: ({ autoHideMs, position, size, }: TapHintProps) => React.JSX.Element | null;

/** Textarea component props */
interface TextareaProps {
    className?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    label?: string;
    maxLength?: number;
    name?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    showCount?: boolean;
    value?: string;
}

declare const Textarea: ({ className, disabled, error, id, label, maxLength, name, onChange, placeholder, required, rows, showCount, value, }: TextareaProps) => react_jsx_runtime.JSX.Element;

/** Toggle component props */
interface ToggleProps {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    id?: string;
    label?: string;
    name?: string;
    onChange?: (checked: boolean) => void;
    size?: 'sm' | 'md';
}

declare const Toggle: ({ checked, className, disabled, id, label, name, onChange, size, }: ToggleProps) => react_jsx_runtime.JSX.Element;

/**
 * ToggleActiveButton Interfaces
 *
 * Admin icon button for toggling entity active/inactive status.
 * Shows Power icon (active/inactive states) with spinning Loader2 while loading.
 */
interface ToggleActiveButtonProps {
    isActive: boolean;
    isLoading?: boolean;
    onClick: () => void;
    shape?: 'circle' | 'square';
    size?: 'md' | 'sm';
    title?: string;
}
interface StyledToggleButtonProps {
    $isActive: boolean;
    $isLoading: boolean;
    $shape: 'circle' | 'square';
    $size: 'md' | 'sm';
}

declare const ToggleActiveButton: ({ isActive, isLoading, onClick, shape, size, title, }: ToggleActiveButtonProps) => react_jsx_runtime.JSX.Element;

/** Tooltip component props */

interface TooltipProps {
    children: ReactNode;
    className?: string;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

declare const Tooltip: ({ children, className, content, position }: TooltipProps) => react_jsx_runtime.JSX.Element;

/**
 * ImagePreviewModal Component Interfaces
 */

interface ImagePreviewModalProps {
    badge?: ReactNode;
    closeLabel?: string;
    description?: string;
    imageUrl: string;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}
interface StyledOverlayProps {
    $isOpen: boolean;
}

declare const ImagePreviewModal: ({ badge, closeLabel, description, imageUrl, isOpen, onClose, title, }: ImagePreviewModalProps) => react_jsx_runtime.JSX.Element | null;

/**
 * InlineIcon Component Interfaces
 */

type InlineIconPosition = 'left' | 'top';
interface InlineIconProps {
    children: ReactNode;
    className?: string;
    position?: InlineIconPosition;
    tight?: boolean;
}
interface StyledInlineIconProps {
    $position: InlineIconPosition;
    $tight: boolean;
}

declare const InlineIcon: ({ children, className, position, tight, }: InlineIconProps) => react_jsx_runtime.JSX.Element;

/**
 * AppFooter Pattern Interfaces
 */

interface AppFooterColumn {
    content: ReactNode;
    title?: string;
}
interface AppFooterProps {
    bottomSlot?: ReactNode;
    brandSlot?: ReactNode;
    className?: string;
    columns?: AppFooterColumn[];
    copyright?: string;
    socialSlot?: ReactNode;
}

declare const AppFooter: ({ bottomSlot, brandSlot, className, columns, copyright, socialSlot, }: AppFooterProps) => react_jsx_runtime.JSX.Element;

/**
 * AppHeader Pattern Interfaces
 */

interface AppHeaderProps {
    actionsSlot?: ReactNode;
    className?: string;
    closeMenuLabel?: string;
    logoSlot: ReactNode;
    mobileMenuContent?: ReactNode;
    navSlot?: ReactNode;
    openMenuLabel?: string;
    sticky?: boolean;
}
interface StyledHeaderProps {
    $sticky: boolean;
}
interface StyledMobileMenuProps {
    $isOpen: boolean;
}

declare const AppHeader: ({ actionsSlot, className, closeMenuLabel, logoSlot, mobileMenuContent, navSlot, openMenuLabel, sticky, }: AppHeaderProps) => react_jsx_runtime.JSX.Element;

/**
 * AuthLayout Pattern Interfaces
 */

interface AuthLayoutProps {
    children: ReactNode;
    className?: string;
    leftSlot?: ReactNode;
    rightSlot?: ReactNode;
    subtitle?: string;
    title?: string;
}
interface AuthCardProps {
    children: ReactNode;
    className?: string;
}

declare const AuthCard: ({ children, className }: AuthCardProps) => react_jsx_runtime.JSX.Element;
declare const AuthLayout: ({ children, className, leftSlot, rightSlot, subtitle, title, }: AuthLayoutProps) => react_jsx_runtime.JSX.Element;

/**
 * AvatarUpload Pattern Interfaces
 */
type AvatarUploadSize = 'large' | 'medium' | 'small';
interface AvatarUploadProps {
    accept?: string;
    changeLabel?: string;
    className?: string;
    currentPhotoUrl?: string | null;
    disabled?: boolean;
    initials: string;
    isUploading?: boolean;
    name?: string;
    onFileSelect: (file: File, previewUrl: string) => void;
    size?: AvatarUploadSize;
}
interface StyledAvatarWrapperProps {
    $disabled: boolean;
    $size: AvatarUploadSize;
}
interface StyledAvatarProps {
    $hasPhoto: boolean;
    $size: AvatarUploadSize;
}

declare const AvatarUpload: ({ accept, changeLabel, className, currentPhotoUrl, disabled, initials, isUploading, name, onFileSelect, size, }: AvatarUploadProps) => react_jsx_runtime.JSX.Element;

/**
 * DataTable Component Interfaces
 */

interface DataTableRowAction<T> {
    disabled?: (row: T) => boolean;
    icon: ReactNode;
    key: string;
    onClick: (row: T) => void;
    title: string;
    variant?: ActionButtonVariant;
}
interface DataTableColumn<T> {
    align?: 'center' | 'left' | 'right';
    header: string;
    key: string;
    render?: (row: T, index: number) => ReactNode;
    sortable?: boolean;
    width?: string;
}
type SortDirection = 'asc' | 'desc';
interface DataTableSort {
    direction: SortDirection;
    key: string;
}
interface DataTableProps<T> {
    actionsHeader?: string;
    className?: string;
    columns: DataTableColumn<T>[];
    currentPage?: number;
    data: T[];
    emptyMessage?: string;
    loading?: boolean;
    onPageChange?: (page: number) => void;
    onSearch?: (term: string) => void;
    onSelectionChange?: (selectedKeys: string[]) => void;
    onSort?: (sort: DataTableSort) => void;
    rowActions?: DataTableRowAction<T>[];
    rowKey: (row: T) => string;
    searchPlaceholder?: string;
    searchValue?: string;
    selectAllLabel?: string;
    selectRowLabel?: string;
    selectable?: boolean;
    selectedKeys?: string[];
    sort?: DataTableSort;
    totalPages?: number;
}

declare const DataTable: <T>({ actionsHeader, className, columns, currentPage, data, emptyMessage, loading, onPageChange, onSearch, onSelectionChange, onSort, rowActions, rowKey, searchPlaceholder, searchValue, selectable, selectAllLabel, selectedKeys, selectRowLabel, sort, totalPages, }: DataTableProps<T>) => react_jsx_runtime.JSX.Element;

/**
 * FileUploader Component Interfaces
 */
interface FileUploaderFile {
    file: File;
    id: string;
    preview?: string;
}
interface FileUploaderProps {
    accept?: string;
    className?: string;
    description?: string;
    disabled?: boolean;
    error?: string;
    label?: string;
    maxFiles?: number;
    maxSizeMB?: number;
    multiple?: boolean;
    onChange: (files: FileUploaderFile[]) => void;
    value?: FileUploaderFile[];
}

declare const FileUploader: ({ accept, className, description, disabled, error, label, maxFiles, maxSizeMB, multiple, onChange, value, }: FileUploaderProps) => react_jsx_runtime.JSX.Element;

/**
 * FormField Component Interfaces
 */

interface FormFieldProps {
    children: ReactNode;
    className?: string;
    error?: string;
    helpText?: string;
    htmlFor?: string;
    label?: string;
    required?: boolean;
}

declare const FormField: ({ children, className, error, helpText, htmlFor, label, required, }: FormFieldProps) => react_jsx_runtime.JSX.Element;

/**
 * FloatingActions Pattern Interfaces
 */

type FloatingActionsSide = 'left' | 'right';
interface FloatingActionItem {
    href?: string;
    icon: ReactNode;
    label: string;
    onClick?: () => void;
}
interface FloatingActionsProps {
    animated?: boolean;
    className?: string;
    items: FloatingActionItem[];
    side?: FloatingActionsSide;
}
interface StyledFloatingContainerProps {
    $side: FloatingActionsSide;
}
interface StyledFloatingButtonProps {
    $animated: boolean;
    $delay: number;
}

declare const FloatingActions: ({ animated, className, items, side, }: FloatingActionsProps) => react_jsx_runtime.JSX.Element | null;

/**
 * FormFields Pattern Interfaces
 *
 * Ready-to-use field compositions: FormField wrapper (label + error + help)
 * around SUI form controls.
 */

interface BaseFieldProps {
    className?: string;
    disabled?: boolean;
    error?: string;
    helpText?: string;
    id: string;
    label: string;
    name?: string;
    required?: boolean;
}
interface TextFieldProps extends BaseFieldProps {
    autoComplete?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    type?: InputType;
    value?: string;
}
interface SelectFieldProps extends BaseFieldProps {
    onChange?: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    value?: string;
}
interface TextareaFieldProps extends BaseFieldProps {
    maxLength?: number;
    onChange?: (value: string) => void;
    placeholder?: string;
    rows?: number;
    showCount?: boolean;
    value?: string;
}

declare const TextField: ({ autoComplete, className, disabled, error, helpText, id, label, name, onChange, placeholder, required, type, value, }: TextFieldProps) => react_jsx_runtime.JSX.Element;
declare const SelectField: ({ className, disabled, error, helpText, id, label, name, onChange, options, placeholder, required, value, }: SelectFieldProps) => react_jsx_runtime.JSX.Element;
declare const TextareaField: ({ className, disabled, error, helpText, id, label, maxLength, name, onChange, placeholder, required, rows, showCount, value, }: TextareaFieldProps) => react_jsx_runtime.JSX.Element;

/**
 * ImageUploader Pattern Interfaces
 */
interface ImageUploaderProps {
    accept?: string;
    changeLabel?: string;
    className?: string;
    currentImageUrl?: string | null;
    disabled?: boolean;
    height?: string;
    id?: string;
    isUploading?: boolean;
    label?: string;
    onFileSelect: (file: File, previewUrl: string) => void;
    placeholder?: string;
}
interface StyledUploadAreaProps {
    $disabled: boolean;
    $hasImage: boolean;
    $height: string;
}

declare const ImageUploader: ({ accept, changeLabel, className, currentImageUrl, disabled, height, id, isUploading, label, onFileSelect, placeholder, }: ImageUploaderProps) => react_jsx_runtime.JSX.Element;

/**
 * NotificationContainer Pattern Interfaces
 */

type NotificationPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
interface NotificationContainerProps {
    notifications: QueuedNotification[];
    onClose: (id: string) => void;
    position?: NotificationPosition;
}
interface StyledNotificationStackProps {
    $position: NotificationPosition;
}

declare const NotificationContainer: ({ notifications, onClose, position, }: NotificationContainerProps) => react_jsx_runtime.JSX.Element | null;

/**
 * Pagination Component Interfaces
 */
interface PaginationProps {
    className?: string;
    currentPage: number;
    nextLabel?: string;
    onPageChange: (page: number) => void;
    previousLabel?: string;
    showFirstLast?: boolean;
    siblingCount?: number;
    totalPages: number;
}

declare const Pagination: ({ className, currentPage, nextLabel, onPageChange, previousLabel, showFirstLast, siblingCount, totalPages, }: PaginationProps) => react_jsx_runtime.JSX.Element | null;

export { ActionButton, type ActionButtonProps, type ActionButtonSize, type ActionButtonVariant, Alert, type AlertProps, AppFooter, type AppFooterColumn, type AppFooterProps, AppHeader, type AppHeaderProps, AuthCard, type AuthCardProps, AuthLayout, type AuthLayoutProps, Avatar, type AvatarProps, AvatarUpload, type AvatarUploadProps, type AvatarUploadSize, Badge, type BadgeProps, type BadgeSize, type BadgeVariant, Button, type ButtonProps, type ButtonShape, type ButtonSize, type ButtonVariant, Card, type CardProps, Checkbox, type CheckboxProps, type ConfirmVariant, Container, type ContainerProps, type ContainerSize, DataTable, type DataTableColumn, type DataTableProps, type DataTableRowAction, type DataTableSort, DetailAmount, type DetailAmountProps, DetailContentBox, type DetailContentBoxProps, type DetailContentBoxVariant, DetailDivider, type DetailDividerProps, DetailLabel, type DetailLabelProps, DetailRow, type DetailRowProps, DetailSection, type DetailSectionProps, DetailValue, type DetailValueProps, Divider, type DividerProps, Dropdown, type DropdownOption, type DropdownPosition, type DropdownProps, EmptyState, type EmptyStateProps, EntityCell, type EntityCellProps, type ErrorAction, ErrorFallback, type ErrorFallbackProps, ErrorState, type ErrorStateProps, FileUploader, type FileUploaderFile, type FileUploaderProps, type FloatingActionItem, FloatingActions, type FloatingActionsProps, type FloatingActionsSide, FormActions, type FormActionsAlign, type FormActionsProps, FormError, type FormErrorProps, type FormErrorVariant, FormField, type FormFieldProps, FormGroup, type FormGroupProps, GlobalLoading, type GlobalLoadingProps, HeaderRow, Image, ImagePreviewModal, type ImagePreviewModalProps, type ImageProps, ImageUploader, type ImageUploaderProps, InfoMessage, type InfoMessageProps, type InfoMessageVariant, InlineIcon, type InlineIconPosition, type InlineIconProps, Input, type InputProps, type InputType, LazyFallback, type LazyFallbackProps, LoadingState, type LoadingStateProps, Modal, ModalActions, ModalConfirmChildren, ModalContainer, ModalContent, ModalFooter, type ModalFooterAlign, ModalFooterBar, type ModalFooterProps, ModalHeader, ModalIcon, ModalMessage, ModalOverlay, type ModalProps, type ModalSize, ModalTitle, type ModalVariant, NotificationContainer, type NotificationContainerProps, type NotificationPosition, NotificationToast, NotificationToastProps, PageLayout, type PageLayoutProps, PageTitle, PageWrapper, Pagination, type PaginationProps, PasswordInput, type PasswordInputProps, PopButton, type PopButtonProps, type PopButtonVariant, ProgressBar, type ProgressBarProps, QueuedNotification, Radio, RadioGroup, type RadioGroupDirection, type RadioGroupProps, type RadioProps, ScreenBoundary, type ScreenBoundaryProps, ScreenContainer, SearchInput, type SearchInputProps, SectionTitle, Select, SelectField, type SelectFieldProps, type SelectOption, type SelectProps, Skeleton, type SkeletonProps, type SortDirection, SortableHeader, type SortableHeaderProps, Spacer, type SpacerProps, type SpacerSize, Spinner, type SpinnerProps, StatItem, type StatItemProps, type StatVariant, StatsBar, type StatsBarProps, StatsCard, type StatsCardProps, type StatsCardVariant, StatsGrid, type StatsGridProps, StepCard, type StepCardProps, type StyledActionButtonProps, type StyledAvatarProps, type StyledAvatarWrapperProps, type StyledBadgeProps, type StyledButtonProps, type StyledDetailContentBoxProps, type StyledDetailRowProps, type StyledDropdownItemProps, type StyledDropdownMenuProps, type StyledFloatingButtonProps, type StyledFloatingContainerProps, type StyledFormActionsProps, type StyledFormErrorProps, type StyledHeaderProps, type StyledInfoMessageProps, type StyledInlineIconProps, type StyledInputProps, type StyledInputWrapperProps, type StyledMobileMenuProps, type StyledModalContainerProps, type StyledModalFooterProps, type StyledModalIconProps, type StyledModalOverlayProps, type StyledNotificationStackProps, type StyledOverlayProps, type StyledPopButtonProps, type StyledRadioGroupProps, type StyledRadioWrapperProps, type StyledSortableHeaderProps, type StyledSpacerProps, type StyledStatItemProps, type StyledStatsCardProps, type StyledStatsGridProps, type StyledSwitchTrackProps, type StyledSwitchWrapperProps, type StyledTapHintProps, type StyledToggleButtonProps, type StyledUploadAreaProps, Switch, type SwitchProps, type TabItem, Tabs, type TabsProps, TapHint, type TapHintPosition, type TapHintProps, TextField, type TextFieldProps, Textarea, TextareaField, type TextareaFieldProps, type TextareaProps, Toggle, ToggleActiveButton, type ToggleActiveButtonProps, type ToggleProps, Tooltip, type TooltipProps };
