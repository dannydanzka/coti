/**
 * AppDrawerFooter Styled Components
 *
 * Colors aligned with Public UI (yellow/blue scheme).
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, motion, shape, spacing, typography } from '@constants';

export const SidebarFooter = styled.div<{ $isCollapsed: boolean }>`
  border-top: 1px solid ${color.neutral200};
  display: flex;
  flex-shrink: 0;
  justify-content: center;

  /* Aire abajo: pegado a la esquina, cualquier widget flotante se le encima. */
  padding: ${spacing.md} ${({ $isCollapsed }) => ($isCollapsed ? spacing.xs : spacing.sm)}
    ${spacing.xl};
`;

export const LogoutButton = styled.button<{ $isCollapsed: boolean }>`
  align-items: center;
  background-color: transparent;
  border: 1px solid ${brandColor.landingBlueDark};
  border-radius: ${shape.md};
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  gap: ${spacing.xs};
  justify-content: center;
  padding: ${spacing.xs} ${spacing.sm};
  transition: ${motion.normal};
  width: 100%;

  &:hover {
    background-color: ${brandColor.landingBlueDark}10;
    border-color: ${brandColor.landingBlueDark};
    color: ${brandColor.landingBlueDark};
    transform: translateY(-1px);
  }

  svg {
    flex-shrink: 0;
  }
`;

export const LogoutText = styled.span<{ $isCollapsed: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'inline')};
`;
