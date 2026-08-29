/**
 * Date Utilities
 * Date manipulation and formatting with Spanish locale support.
 */

import { logError } from '@logger';

/**
 * Formats date in Spanish locale format.
 * Supports both Date objects and ISO date strings.
 */
export const formatDate = (date: Date | string, locale = 'es-MX'): string => {
  if (!date) {
    throw new Error('Date is required');
  }

  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided');
  }

  try {
    return d.toLocaleDateString(locale, { timeZone: 'UTC' });
  } catch (error) {
    logError(error, 'formatDate.toLocaleDateString');
    throw error;
  }
};

/**
 * Formats date with time in Spanish locale format.
 * Includes date, hours, minutes, and seconds.
 */
export const formatDateTime = (date: Date | string, locale = 'es-MX'): string => {
  if (!date) {
    throw new Error('Date is required');
  }

  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided');
  }

  try {
    return d.toLocaleString(locale);
  } catch (error) {
    logError(error, 'formatDateTime.toLocaleString');
    throw error;
  }
};

/**
 * Formats elapsed time from date in Spanish.
 * Calculates difference between current date and provided date.
 */
export const formatTimeAgo = (date: Date | string, locale = 'es'): string => {
  if (!date) {
    throw new Error('Date is required');
  }

  const now = new Date();
  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided');
  }

  const diff = now.getTime() - d.getTime();

  if (diff < 0) {
    const futureDiff = Math.abs(diff);
    const futureMinutes = Math.floor(futureDiff / (1000 * 60));
    const futureHours = Math.floor(futureDiff / (1000 * 60 * 60));
    const futureDays = Math.floor(futureDiff / (1000 * 60 * 60 * 24));

    if (futureMinutes < 1) return 'ahora';
    if (futureMinutes < 60) {
      return futureMinutes === 1 ? 'en 1 minuto' : `en ${futureMinutes} minutos`;
    }
    if (futureHours < 24) {
      return futureHours === 1 ? 'en 1 hora' : `en ${futureHours} horas`;
    }
    return futureDays === 1 ? 'en 1 día' : `en ${futureDays} días`;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'ahora';
  if (minutes < 60) {
    return minutes === 1 ? 'hace 1 minuto' : `hace ${minutes} minutos`;
  }
  if (hours < 24) {
    return hours === 1 ? 'hace 1 hora' : `hace ${hours} horas`;
  }
  if (days < 7) {
    return days === 1 ? 'hace 1 día' : `hace ${days} días`;
  }

  return formatDate(d, locale);
};

/**
 * Checks if date has expired (is before current date).
 * Useful for token validation, scheduled events, etc.
 */
export const isExpired = (date: Date | string): boolean => {
  if (!date) {
    throw new Error('Date is required to verify expiration');
  }

  const d = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided');
  }

  return d.getTime() < Date.now();
};

/**
 * Adds specified number of days to date.
 * Automatically handles month and year changes.
 */
export const addDays = (date: Date, days: number): Date => {
  if (!date || !(date instanceof Date)) {
    throw new Error('Valid Date object required');
  }

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }

  if (!Number.isInteger(days)) {
    throw new Error('Number of days must be an integer');
  }

  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
