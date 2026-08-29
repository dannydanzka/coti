/**
 * Array utility functions
 */
declare const unique: <T>(arr: T[]) => T[];
declare const uniqueBy: <T>(arr: T[], key: keyof T) => T[];
declare const groupBy: <T>(arr: T[], key: keyof T) => Record<string, T[]>;
declare const sortBy: <T>(arr: T[], key: keyof T, direction?: "asc" | "desc") => T[];
declare const chunk: <T>(arr: T[], size: number) => T[][];

/**
 * Date utility functions
 *
 * Lightweight date helpers — no external dependencies.
 */
declare const formatDate: (date: Date | string, locale?: string) => string;
declare const formatDateTime: (date: Date | string, locale?: string) => string;
declare const formatRelative: (date: Date | string) => string;
declare const diffInDays: (dateA: Date | string, dateB: Date | string) => number;
declare const isExpired: (date: Date | string) => boolean;

/**
 * Format utility functions
 */
declare const formatCurrency: (amount: number, currency?: string, locale?: string) => string;
declare const formatNumber: (value: number, locale?: string) => string;
declare const formatCompact: (value: number, locale?: string) => string;
declare const formatPercentage: (value: number, decimals?: number) => string;
declare const formatBytes: (bytes: number) => string;
declare const formatPhone: (phone: string) => string;

/**
 * Object utility functions
 */
declare const pick: <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]) => Pick<T, K>;
declare const omit: <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]) => Omit<T, K>;
declare const isEmpty: (value: unknown) => boolean;
declare const deepMerge: <T extends Record<string, unknown>>(target: T, source: Partial<T>) => T;

/**
 * String utility functions
 */
declare const truncate: (str: string, maxLength: number, suffix?: string) => string;
declare const capitalize: (str: string) => string;
declare const capitalizeWords: (str: string) => string;
declare const slugify: (str: string) => string;
declare const pluralize: (count: number, singular: string, plural?: string) => string;
declare const initials: (name: string, maxChars?: number) => string;

export { capitalize, capitalizeWords, chunk, deepMerge, diffInDays, formatBytes, formatCompact, formatCurrency, formatDate, formatDateTime, formatNumber, formatPercentage, formatPhone, formatRelative, groupBy, initials, isEmpty, isExpired, omit, pick, pluralize, slugify, sortBy, truncate, unique, uniqueBy };
