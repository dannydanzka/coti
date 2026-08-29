import { RefObject } from 'react';

/**
 * NotificationToast Interfaces
 */
type NotificationType = 'error' | 'info' | 'success' | 'warning';
interface ToastNotification {
    id: string;
    message: string;
    title?: string;
    type: NotificationType;
}
interface NotificationToastProps {
    notification?: ToastNotification;
    onClose?: () => void;
}
interface StyledContainerProps {
    $isClosing?: boolean;
    $type: NotificationType;
}
interface StyledIconProps {
    $type: NotificationType;
}

/**
 * useNotifications Hook Interfaces
 */

interface QueuedNotification {
    id: string;
    message: string;
    title?: string;
    type: NotificationType;
}
interface NotifyInput {
    message: string;
    title?: string;
    type?: NotificationType;
}
interface UseNotificationsOptions {
    autoDismissMs?: number;
    max?: number;
}
interface UseNotificationsResult {
    clear: () => void;
    notifications: QueuedNotification[];
    notify: (input: NotifyInput) => string;
    remove: (id: string) => void;
}

/**
 * useClickOutside
 *
 * Detect clicks outside a referenced element.
 */

declare const useClickOutside: (ref: RefObject<HTMLElement | null>, handler: () => void) => void;

/**
 * useDebounce
 *
 * Debounce a value with configurable delay.
 */
declare const useDebounce: <T>(value: T, delay?: number) => T;

/**
 * useLoading interfaces
 */
interface UseLoadingReturn {
    error: string | null;
    isLoading: boolean;
    setError: (error: string | null) => void;
    startLoading: () => void;
    stopLoading: () => void;
    withLoading: <T>(fn: () => Promise<T>) => Promise<T>;
}

/**
 * useLoading
 *
 * Loading state management with optional error tracking.
 */

declare const useLoading: (initialLoading?: boolean) => UseLoadingReturn;

/**
 * useMediaQuery
 *
 * Responsive breakpoint detection hook.
 */
declare const useMediaQuery: (query: string) => boolean;

/**
 * useModal interfaces
 */
interface UseModalReturn {
    close: () => void;
    isOpen: boolean;
    open: () => void;
    toggle: () => void;
}

/**
 * useModal
 *
 * Open/close/toggle state management for modals and dialogs.
 */

declare const useModal: (initialOpen?: boolean) => UseModalReturn;

/**
 * useNotifications Hook
 *
 * Local toast queue manager: push notifications, auto-dismiss after a
 * timeout, cap the visible queue. Pair with the NotificationContainer
 * pattern to render the queue — no global state library required.
 */

declare const useNotifications: ({ autoDismissMs, max, }?: UseNotificationsOptions) => UseNotificationsResult;

/**
 * usePagination interfaces
 */
interface UsePaginationOptions {
    initialPage?: number;
    pageSize?: number;
    total: number;
}
interface UsePaginationReturn {
    currentPage: number;
    goToFirst: () => void;
    goToLast: () => void;
    goToNext: () => void;
    goToPage: (page: number) => void;
    goToPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
    pageSize: number;
    totalPages: number;
}

/**
 * usePagination
 *
 * Page state and navigation handlers for paginated data.
 */

declare const usePagination: ({ initialPage, pageSize, total, }: UsePaginationOptions) => UsePaginationReturn;

/**
 * useTableSort interfaces
 */
interface TableSort {
    direction: 'asc' | 'desc';
    key: string;
}
interface UseTableSortOptions {
    initialDirection?: 'asc' | 'desc';
    initialKey?: string;
}
interface UseTableSortReturn {
    handleSort: (key: string) => void;
    sort: TableSort | null;
}

/**
 * useTableSort
 *
 * Sort column and direction state for data tables.
 */

declare const useTableSort: (options?: UseTableSortOptions) => UseTableSortReturn;

export { type NotificationToastProps as N, type QueuedNotification as Q, type StyledContainerProps as S, type TableSort as T, type UseLoadingReturn as U, type NotificationType as a, type NotifyInput as b, type StyledIconProps as c, type ToastNotification as d, type UseModalReturn as e, type UseNotificationsOptions as f, type UseNotificationsResult as g, type UsePaginationOptions as h, type UsePaginationReturn as i, type UseTableSortOptions as j, type UseTableSortReturn as k, useDebounce as l, useLoading as m, useMediaQuery as n, useModal as o, useNotifications as p, usePagination as q, useTableSort as r, useClickOutside as u };
