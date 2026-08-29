/**
 * Badge Interfaces
 *
 * Type definitions for badge components.
 * Includes configurable domain badges with color maps.
 */

import type { ReactNode } from 'react';

export interface BadgeColorScheme {
  background: string;
  color: string;
}

export type RoleBadgeVariant = 'owner' | 'admin' | 'participant';

export interface RoleBadgeProps {
  className?: string;
  role: RoleBadgeVariant;
}

export interface StyledRoleBadgeProps {
  $role: RoleBadgeVariant;
}

export type StatusBadgeVariant =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'resubmitted'
  | 'completed'
  | 'cancelled'
  | 'archived'
  | 'draft';

export interface StatusBadgeProps {
  className?: string;
  status: StatusBadgeVariant;
}

export interface StyledStatusBadgeProps {
  $status: StatusBadgeVariant;
}

export type TypeBadgeVariant = 'photo' | 'video' | 'text' | 'default';

export interface TypeBadgeProps {
  className?: string;
  icon?: ReactNode;
  type: TypeBadgeVariant;
}

export interface StyledTypeBadgeProps {
  $type: TypeBadgeVariant;
}

export type EventStatusVariant = 'DRAFT' | 'REGISTRATION_OPEN' | 'ACTIVE' | 'CLOSED';

export interface EventStatusBadgeProps {
  className?: string;
  status: EventStatusVariant;
}

export interface StyledEventStatusBadgeProps {
  $status: EventStatusVariant;
}

export type PaymentStatusVariant = 'paid' | 'pending' | 'failed' | 'refunded' | 'processing';

export interface PaymentStatusBadgeProps {
  className?: string;
  status: PaymentStatusVariant;
}

export interface StyledPaymentStatusBadgeProps {
  $status: PaymentStatusVariant;
}

export type MessageStatusVariant = 'PENDING' | 'READ' | 'REPLIED' | 'ARCHIVED';

export interface MessageStatusBadgeProps {
  className?: string;
  status: MessageStatusVariant;
}

export interface StyledMessageStatusBadgeProps {
  $status: MessageStatusVariant;
}

export type DeliveryStatusVariant = 'pending' | 'sent' | 'delivered' | 'returned';

export interface DeliveryStatusBadgeProps {
  className?: string;
  status: DeliveryStatusVariant;
}

export interface StyledDeliveryStatusBadgeProps {
  $status: DeliveryStatusVariant;
}

export interface AvailabilityBadgeProps {
  available: boolean;
  className?: string;
}

export interface StyledAvailabilityBadgeProps {
  $available: boolean;
}

export type ShippingTypeVariant = 'pickup_point' | 'home_delivery';

export interface ShippingTypeBadgeProps {
  className?: string;
  icon?: ReactNode;
  type: ShippingTypeVariant;
}

export interface StyledShippingTypeBadgeProps {
  $type: ShippingTypeVariant;
}
