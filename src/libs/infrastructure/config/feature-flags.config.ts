/**
 * Feature Flags Configuration
 * Runtime feature toggles for the application.
 */

export const FEATURE_FLAGS = {
  ENABLE_EMAIL_VERIFICATION: process.env['ENABLE_EMAIL_VERIFICATION'] !== 'false',
  ENABLE_REAL_TIME_UPDATES: process.env['ENABLE_REAL_TIME_UPDATES'] !== 'false',
  ENABLE_REGISTRATION: process.env['ENABLE_REGISTRATION'] !== 'false',
  ENABLE_SOCIAL_LOGIN: process.env['ENABLE_SOCIAL_LOGIN'] === 'true',
  ENABLE_VOTING: process.env['ENABLE_VOTING'] === 'true',
  MAINTENANCE_MODE: process.env['MAINTENANCE_MODE'] === 'true',
} as const;
