/**
 * AppDrawerHeader Styled Components
 *
 * User info section with avatar, name, email, km badge and collapse button.
 * Colors aligned with Public UI (yellow/blue scheme).
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, layout, shape, spacing, typography } from '@constants';

export const SidebarHeader = styled.div<{ $isCollapsed: boolean }>`
  align-items: center;
  background: ${brandColor.bgHeader};
  border-bottom: 1px solid ${color.border};
  display: flex;
  flex-shrink: 0;
  gap: ${spacing.xs};
  height: ${spacing['6xl']};
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'space-between')};
  padding: ${spacing.md} ${({ $isCollapsed }) => ($isCollapsed ? spacing.xs : spacing.md)};
`;

export const UserSection = styled.div<{ $isCollapsed: boolean }>`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${spacing.xs};
  justify-content: ${({ $isCollapsed }) => ($isCollapsed ? 'center' : 'flex-start')};
  min-width: 0;
  overflow: hidden;
`;

export const UserAvatar = styled.div`
  align-items: center;
  background: ${brandColor.landingBlueDark};
  border-radius: ${shape.full};
  color: ${color.white};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: ${typography.family.display};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.bold};
  height: ${spacing.xl};
  justify-content: center;
  text-transform: uppercase;
  width: ${spacing.xl};

  @media (max-width: ${layout.breakpoint.lg}) {
    cursor: default;
    pointer-events: none;
  }

  &:hover {
    opacity: 0.85;

    @media (max-width: ${layout.breakpoint.lg}) {
      opacity: 1;
    }
  }
`;

export const UserInfo = styled.div<{ $isCollapsed: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'flex')};
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
`;

export const UserName = styled.span`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserEmail = styled.span`
  color: ${brandColor.landingTextGray};
  font-size: ${typography.size.xs};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MobileCloseButton = styled.button`
  align-items: center;
  background: ${color.white};
  border: 2px solid ${brandColor.landingBlueDark};
  border-radius: ${shape.full};
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  display: none;
  flex-shrink: 0;
  height: ${spacing.lg};
  justify-content: center;
  width: ${spacing.lg};

  @media (max-width: ${layout.breakpoint.lg}) {
    display: flex;
  }

  &:hover {
    background: ${brandColor.landingBlueDark};
    color: ${color.white};
  }
`;
