/**
 * Format Utilities
 * Platform-agnostic formatting for numbers, votes, and data with Spanish locale support.
 */

import { logError } from '@logger';

export const formatNumber = (num: number, locale = 'es-MX'): string => {
  try {
    if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
      return '0';
    }
    return new Intl.NumberFormat(locale).format(num);
  } catch (error) {
    logError(error, 'formatNumber');
    return '0';
  }
};

export const formatPercentage = (num: number, decimals = 1, locale = 'es-MX'): string => {
  try {
    if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) {
      return '0%';
    }
    if (!Number.isInteger(decimals) || decimals < 0 || decimals > 10) {
      return '0%';
    }
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
      style: 'percent',
    }).format(num / 100);
  } catch (error) {
    logError(error, 'formatPercentage');
    return '0%';
  }
};

export const formatFileSize = (bytes: number): string => {
  try {
    if (typeof bytes !== 'number' || isNaN(bytes) || bytes < 0 || !isFinite(bytes)) {
      return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizeIndex = Math.min(i, sizes.length - 1);
    const formattedSize = (bytes / Math.pow(1024, sizeIndex)).toFixed(1);
    return `${formattedSize} ${sizes[sizeIndex]}`;
  } catch (error) {
    logError(error, 'formatFileSize');
    return '0 B';
  }
};

/**
 * Formats user role to display label in Spanish
 * Coti roles: owner, admin, participant
 */
export const formatUserRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    admin: 'Administrador',
    owner: 'Propietario',
    participant: 'Participante',
  };
  return roleMap[role] || role;
};

/**
 * Formats a number as currency in Mexican Pesos (MXN)
 */
export const formatCurrency = (amount: number, locale = 'es-MX'): string => {
  try {
    if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
      return '$0.00 MXN';
    }
    return new Intl.NumberFormat(locale, {
      currency: 'MXN',
      style: 'currency',
    }).format(amount);
  } catch (error) {
    logError(error, 'formatCurrency');
    return '$0.00 MXN';
  }
};

interface ShippingAddressSnapshot {
  city?: string;
  country?: string;
  neighborhood?: string;
  number?: string;
  state?: string;
  street?: string;
  zipCode?: string;
}

/**
 * Renders a stored shipping-address JSON snapshot (see meet checkout) as a single
 * human-readable line. Returns null when absent (pickup); shows legacy plain-text
 * values verbatim.
 */
export const formatShippingAddress = (address: string | null | undefined): string | null => {
  if (!address) return null;

  let parsed: ShippingAddressSnapshot;
  try {
    parsed = JSON.parse(address) as ShippingAddressSnapshot;
  } catch (error) {
    logError(error, 'formatShippingAddress');
    return address;
  }

  const streetLine = [parsed.street, parsed.number].filter(Boolean).join(' ');
  const zipLine = parsed.zipCode ? `CP ${parsed.zipCode}` : '';

  const parts = [
    streetLine,
    parsed.neighborhood,
    parsed.city,
    parsed.state,
    zipLine,
    parsed.country,
  ].filter((part) => Boolean(part) && part !== '');

  return parts.length > 0 ? parts.join(', ') : null;
};
