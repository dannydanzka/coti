/**
 * Domain Constants
 *
 * Business domain constants derived from common types.
 * Use these constants instead of string literals for type safety.
 */

export const EVIDENCE_TYPES = {
  PHOTO: 'PHOTO',
  TEXT: 'TEXT',
  VIDEO: 'VIDEO',
} as const;

export const CHALLENGE_TYPES = {
  CLOSURE: 'CLOSURE',
  STANDARD: 'STANDARD',
} as const;

export type ChallengeType = (typeof CHALLENGE_TYPES)[keyof typeof CHALLENGE_TYPES];

export const CHALLENGE_TYPE_LABELS: Record<string, string> = {
  CLOSURE: 'Cierre',
  STANDARD: 'Standard',
};

export const KIT_STATUS = {
  DELIVERED: 'delivered',
  PENDING: 'pending',
  SENT: 'sent',
} as const;

export const SHIPPING_TYPES = {
  HOME_DELIVERY: 'home_delivery',
  PICKUP_POINT: 'pickup_point',
} as const;

export const PAYMENT_STATUS = {
  FAILED: 'failed',
  PAID: 'paid',
  PENDING: 'pending',
  REFUNDED: 'refunded',
} as const;

export const EVIDENCE_STATUS = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  RESUBMITTED: 'RESUBMITTED',
} as const;

export const USER_CHALLENGE_STATUS = {
  COMPLETED: 'COMPLETED',
  IN_PROGRESS: 'IN_PROGRESS',
  LOCKED: 'LOCKED',
  PENDING_REVIEW: 'PENDING_REVIEW',
  UNLOCKED: 'UNLOCKED',
} as const;

export const EVENT_STATUS = {
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  DRAFT: 'DRAFT',
  REGISTRATION_OPEN: 'REGISTRATION_OPEN',
} as const;

export const CHALLENGE_WEEK_STATUS = {
  AVAILABLE: 'available',
  COMPLETED: 'completed',
  IN_PROGRESS: 'in_progress',
  LOCKED: 'locked',
  PENDING_REVIEW: 'pending_review',
} as const;

export const ENROLLMENT_SOURCE = {
  EXTERNAL: 'external',
  STRIPE: 'stripe',
} as const;

export const EXTERNAL_PAYMENT_TYPES = {
  CORTESIA: 'CORTESIA',
  DEPOSITO_TRANSFERENCIA: 'DEPOSITO_TRANSFERENCIA',
  OTRA_PLATAFORMA: 'OTRA_PLATAFORMA',
  PAGO_EFECTIVO: 'PAGO_EFECTIVO',
} as const;

export const ENROLLMENT_STATUS = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  KIT_DELIVERED: 'kit_delivered',
  KIT_PENDING: 'kit_pending',
  PAYMENT_CONFIRMED: 'payment_confirmed',
  PAYMENT_PENDING: 'payment_pending',
} as const;

export const CONTACT_MESSAGE_STATUS = {
  ARCHIVED: 'ARCHIVED',
  PENDING: 'PENDING',
  READ: 'READ',
  REPLIED: 'REPLIED',
} as const;

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
} as const;

export const FILTER_VALUES = {
  ALL: 'all',
  ALL_UPPER: 'ALL',
} as const;

export const PRICING_PERIODS = {
  EARLY_BIRD: 'earlyBird',
  FINAL: 'final',
  REGULAR: 'regular',
} as const;

export const PROGRESS_UNITS = {
  KM: 'km',
} as const;

export const MODAL_VARIANT = {
  CONFIRM: 'confirm',
  DEFAULT: 'default',
  INFO: 'info',
} as const;

export const BUTTON_SIZE = {
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
} as const;

export const KEYBOARD_KEY = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
  TAB: 'Tab',
} as const;
