/**
 * String Utilities
 * String manipulation with Spanish character support and UTF-8 handling.
 */

export const capitalize = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Valid string required');
  }
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const slugify = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Valid string required');
  }
  if (str.length === 0) {
    return '';
  }
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const removeAccents = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Valid string required');
  }
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const sanitizeHtml = (str: string): string => {
  if (typeof str !== 'string') {
    throw new Error('Valid string required');
  }
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

export const getUserInitials = (name: string): string => {
  if (typeof name !== 'string') {
    throw new Error('Valid name string required');
  }
  if (name.trim().length === 0) {
    return '';
  }
  return name
    .trim()
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
