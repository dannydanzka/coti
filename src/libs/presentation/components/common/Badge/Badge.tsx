/**
 * Badge Components
 *
 * Global badge components for all contexts (admin and public).
 * Includes generic badges and domain-specific badges.
 */

'use client';

import type {
  AvailabilityBadgeProps,
  DeliveryStatusBadgeProps,
  DeliveryStatusVariant,
  EventStatusBadgeProps,
  EventStatusVariant,
  MessageStatusBadgeProps,
  MessageStatusVariant,
  PaymentStatusBadgeProps,
  PaymentStatusVariant,
  RoleBadgeProps,
  RoleBadgeVariant,
  ShippingTypeBadgeProps,
  ShippingTypeVariant,
  StatusBadgeProps,
  StatusBadgeVariant,
  TypeBadgeProps,
} from './Badge.interfaces';

import {
  StyledAvailabilityBadge,
  StyledDeliveryStatusBadge,
  StyledEventStatusBadge,
  StyledMessageStatusBadge,
  StyledPaymentStatusBadge,
  StyledRoleBadge,
  StyledShippingTypeBadge,
  StyledStatusBadge,
  StyledTypeBadge,
} from './Badge.styled';

const ROLE_LABELS: Record<RoleBadgeVariant, string> = {
  admin: 'Administrador',
  owner: 'Propietario',
  participant: 'Participante',
};

const STATUS_LABELS: Record<StatusBadgeVariant, string> = {
  active: 'Activo',
  approved: 'Aprobado',
  archived: 'Archivado',
  cancelled: 'Cancelado',
  completed: 'Completado',
  draft: 'Borrador',
  inactive: 'Inactivo',
  pending: 'Pendiente',
  rejected: 'Rechazado',
  resubmitted: 'Reenviado',
};

const TYPE_LABELS: Record<string, string> = {
  default: 'Otro',
  photo: 'Foto',
  text: 'Texto',
  video: 'Video',
};

const EVENT_STATUS_LABELS: Record<EventStatusVariant, string> = {
  ACTIVE: 'En Progreso',
  CLOSED: 'Cerrado',
  DRAFT: 'Borrador',
  REGISTRATION_OPEN: 'Inscripciones Abiertas',
};

const PAYMENT_STATUS_LABELS: Record<PaymentStatusVariant, string> = {
  failed: 'Fallido',
  paid: 'Pagado',
  pending: 'Pendiente',
  processing: 'Procesando',
  refunded: 'Reembolsado',
};

const MESSAGE_STATUS_LABELS: Record<MessageStatusVariant, string> = {
  ARCHIVED: 'Archivado',
  PENDING: 'Pendiente',
  READ: 'Leído',
  REPLIED: 'Respondido',
};

const DELIVERY_STATUS_LABELS: Record<DeliveryStatusVariant, string> = {
  delivered: 'Entregado',
  pending: 'Pendiente',
  returned: 'Devuelto',
  sent: 'Enviado',
};

const SHIPPING_TYPE_LABELS: Record<ShippingTypeVariant, string> = {
  home_delivery: 'Envío a Domicilio',
  pickup_point: 'Punto de Recolección',
};

export const RoleBadge = ({ className, role }: RoleBadgeProps) => (
  <StyledRoleBadge $role={role} className={className}>
    {ROLE_LABELS[role]}
  </StyledRoleBadge>
);

export const StatusBadge = ({ className, status }: StatusBadgeProps) => (
  <StyledStatusBadge $status={status} className={className}>
    {STATUS_LABELS[status]}
  </StyledStatusBadge>
);

export const TypeBadge = ({ className, icon, type }: TypeBadgeProps) => (
  <StyledTypeBadge $type={type} className={className}>
    {icon}
    {TYPE_LABELS[type] ?? type}
  </StyledTypeBadge>
);

export const EventStatusBadge = ({ className, status }: EventStatusBadgeProps) => (
  <StyledEventStatusBadge $status={status} className={className}>
    {EVENT_STATUS_LABELS[status]}
  </StyledEventStatusBadge>
);

export const PaymentStatusBadge = ({ className, status }: PaymentStatusBadgeProps) => (
  <StyledPaymentStatusBadge $status={status} className={className}>
    {PAYMENT_STATUS_LABELS[status]}
  </StyledPaymentStatusBadge>
);

export const MessageStatusBadge = ({ className, status }: MessageStatusBadgeProps) => (
  <StyledMessageStatusBadge $status={status} className={className}>
    {MESSAGE_STATUS_LABELS[status]}
  </StyledMessageStatusBadge>
);

export const DeliveryStatusBadge = ({ className, status }: DeliveryStatusBadgeProps) => (
  <StyledDeliveryStatusBadge $status={status} className={className}>
    {DELIVERY_STATUS_LABELS[status]}
  </StyledDeliveryStatusBadge>
);

export const AvailabilityBadge = ({ available, className }: AvailabilityBadgeProps) => (
  <StyledAvailabilityBadge $available={available} className={className}>
    {available ? 'Disponible' : 'No Disponible'}
  </StyledAvailabilityBadge>
);

export const ShippingTypeBadge = ({ className, icon, type }: ShippingTypeBadgeProps) => (
  <StyledShippingTypeBadge $type={type} className={className}>
    {icon}
    {SHIPPING_TYPE_LABELS[type]}
  </StyledShippingTypeBadge>
);
