/**
 * Badge Styled Components
 *
 * Global badge components for all contexts.
 */

'use client';

import styled, { css } from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type {
  StyledAvailabilityBadgeProps,
  StyledDeliveryStatusBadgeProps,
  StyledEventStatusBadgeProps,
  StyledMessageStatusBadgeProps,
  StyledPaymentStatusBadgeProps,
  StyledRoleBadgeProps,
  StyledShippingTypeBadgeProps,
  StyledStatusBadgeProps,
  StyledTypeBadgeProps,
} from './Badge.interfaces';

const baseBadgeStyles = css`
  border-radius: ${shape.full};
  display: inline-block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.medium};
  padding: ${spacing.micro} ${spacing.sm};
  white-space: nowrap;
`;

const getRoleStyles = (role: StyledRoleBadgeProps['$role']) => {
  switch (role) {
    case 'owner':
      return css`
        background: ${color.accent100};
        color: ${color.accent700};
      `;
    case 'admin':
      return css`
        background: ${color.primary100};
        color: ${color.primary700};
      `;
    case 'participant':
    default:
      return css`
        background: ${color.neutral100};
        color: ${color.neutral700};
      `;
  }
};

const getStatusStyles = (status: StyledStatusBadgeProps['$status']) => {
  switch (status) {
    case 'active':
    case 'approved':
    case 'completed':
      return css`
        background: ${color.successBackground};
        color: ${color.successDark};
      `;
    case 'inactive':
    case 'rejected':
    case 'cancelled':
      return css`
        background: ${color.errorBackground};
        color: ${color.errorDark};
      `;
    case 'pending':
      return css`
        background: ${color.warningBackground};
        color: ${color.warningDark};
      `;
    case 'resubmitted':
      return css`
        background: ${color.secondary100};
        color: ${color.secondary700};
      `;
    case 'archived':
    case 'draft':
    default:
      return css`
        background: ${color.neutral100};
        color: ${color.neutral700};
      `;
  }
};

const getTypeStyles = (type: StyledTypeBadgeProps['$type']) => {
  switch (type) {
    case 'photo':
      return css`
        background: ${color.primary100};
        color: ${color.primary700};
      `;
    case 'video':
      return css`
        background: ${color.secondary100};
        color: ${color.secondary700};
      `;
    case 'text':
    case 'default':
    default:
      return css`
        background: ${color.neutral100};
        color: ${color.neutral700};
      `;
  }
};

const getEventStatusStyles = (status: StyledEventStatusBadgeProps['$status']) => {
  switch (status) {
    case 'DRAFT':
      return css`
        background: ${color.neutral500};
        color: ${color.white};
      `;
    case 'REGISTRATION_OPEN':
      return css`
        background: ${color.primary500};
        color: ${color.white};
      `;
    case 'ACTIVE':
      return css`
        background: ${color.info};
        color: ${color.white};
      `;
    case 'CLOSED':
      return css`
        background: ${color.neutral700};
        color: ${color.white};
      `;
    default:
      return css`
        background: ${color.neutral500};
        color: ${color.white};
      `;
  }
};

const getPaymentStatusStyles = (status: StyledPaymentStatusBadgeProps['$status']) => {
  switch (status) {
    case 'paid':
      return css`
        background: ${color.successBackground};
        color: ${color.successDark};
      `;
    case 'pending':
    case 'processing':
      return css`
        background: ${color.warningBackground};
        color: ${color.warningDark};
      `;
    case 'failed':
      return css`
        background: ${color.errorBackground};
        color: ${color.errorDark};
      `;
    case 'refunded':
      return css`
        background: ${color.secondary100};
        color: ${color.secondary700};
      `;
    default:
      return css`
        background: ${color.neutral100};
        color: ${color.neutral700};
      `;
  }
};

const getMessageStatusStyles = (status: StyledMessageStatusBadgeProps['$status']) => {
  switch (status) {
    case 'PENDING':
      return css`
        background: ${color.warningBackground};
        color: ${color.warningDark};
      `;
    case 'READ':
      return css`
        background: ${color.secondary100};
        color: ${color.secondary700};
      `;
    case 'REPLIED':
      return css`
        background: ${color.successBackground};
        color: ${color.successDark};
      `;
    case 'ARCHIVED':
      return css`
        background: ${color.neutral100};
        color: ${color.neutral700};
      `;
    default:
      return css`
        background: ${color.neutral100};
        color: ${color.neutral700};
      `;
  }
};

const getDeliveryStatusStyles = (status: StyledDeliveryStatusBadgeProps['$status']) => {
  switch (status) {
    case 'pending':
      return css`
        background: ${color.warningBackground};
        color: ${color.warningDark};
      `;
    case 'sent':
      return css`
        background: ${color.secondary100};
        color: ${color.secondary700};
      `;
    case 'delivered':
      return css`
        background: ${color.successBackground};
        color: ${color.successDark};
      `;
    case 'returned':
      return css`
        background: ${color.errorBackground};
        color: ${color.errorDark};
      `;
    default:
      return css`
        background: ${color.neutral100};
        color: ${color.neutral700};
      `;
  }
};

const getShippingTypeStyles = (type: StyledShippingTypeBadgeProps['$type']) => {
  switch (type) {
    case 'pickup_point':
      return css`
        background: ${color.primary100};
        color: ${color.primary700};
      `;
    case 'home_delivery':
    default:
      return css`
        background: ${color.neutral100};
        color: ${color.neutral700};
      `;
  }
};

export const StyledRoleBadge = styled.span<StyledRoleBadgeProps>`
  ${baseBadgeStyles}
  ${({ $role }) => getRoleStyles($role)}
`;

export const StyledStatusBadge = styled.span<StyledStatusBadgeProps>`
  ${baseBadgeStyles}
  ${({ $status }) => getStatusStyles($status)}
`;

export const StyledTypeBadge = styled.span<StyledTypeBadgeProps>`
  ${baseBadgeStyles}
  align-items: center;
  border-radius: ${shape.md};
  display: inline-flex;
  gap: ${spacing.micro};
  padding: ${spacing.micro} ${spacing.xs};
  ${({ $type }) => getTypeStyles($type)}
`;

export const StyledEventStatusBadge = styled.span<StyledEventStatusBadgeProps>`
  ${baseBadgeStyles}
  text-transform: uppercase;
  ${({ $status }) => getEventStatusStyles($status)}
`;

export const StyledPaymentStatusBadge = styled.span<StyledPaymentStatusBadgeProps>`
  ${baseBadgeStyles}
  ${({ $status }) => getPaymentStatusStyles($status)}
`;

export const StyledMessageStatusBadge = styled.span<StyledMessageStatusBadgeProps>`
  ${baseBadgeStyles}
  ${({ $status }) => getMessageStatusStyles($status)}
`;

export const StyledDeliveryStatusBadge = styled.span<StyledDeliveryStatusBadgeProps>`
  ${baseBadgeStyles}
  ${({ $status }) => getDeliveryStatusStyles($status)}
`;

export const StyledAvailabilityBadge = styled.span<StyledAvailabilityBadgeProps>`
  ${baseBadgeStyles}
  ${({ $available }) =>
    $available
      ? css`
          background: ${color.successBackground};
          color: ${color.successDark};
        `
      : css`
          background: ${color.errorBackground};
          color: ${color.errorDark};
        `}
`;

export const StyledShippingTypeBadge = styled.span<StyledShippingTypeBadgeProps>`
  ${baseBadgeStyles}
  align-items: center;
  border-radius: ${shape.md};
  display: inline-flex;
  gap: ${spacing.micro};
  padding: ${spacing.micro} ${spacing.xs};
  ${({ $type }) => getShippingTypeStyles($type)}
`;
