/**
 * Resend Email Service Configuration
 *
 * Server-side Resend SDK configuration for sending transactional emails.
 * Uses React Email templates for type-safe, maintainable email content.
 *
 * @module Resend Configuration
 */

import { Resend } from 'resend';

import { getEnvVar } from '@helpers';

const resendApiKey =
  getEnvVar('RESEND_API_KEY', {
    defaultValue: 're_mock_key_for_development',
    required: false,
  }) || 're_mock_key_for_development';

export const resend = new Resend(resendApiKey);

/**
 * Default sender email (verified domain: dearadry.com)
 */
export const DEFAULT_FROM_EMAIL =
  process.env['RESEND_FROM_EMAIL'] || 'DearAdry <noreply@dearadry.com>';

/**
 * Check if Resend is configured (not using mock key)
 */
export const isResendConfigured = (): boolean => {
  return !resendApiKey.includes('mock') && !resendApiKey.includes('re_mock');
};

/**
 * Email addresses for system notifications
 * Default admin email matches Resend account for sandbox compatibility
 */
export const SYSTEM_EMAILS = {
  admin: process.env['ADMIN_EMAIL'] || 'dearadrydev@gmail.com',
  noreply: process.env['NOREPLY_EMAIL'] || 'noreply@dearadry.com',
  support: process.env['SUPPORT_EMAIL'] || 'support@dearadry.com',
} as const;
