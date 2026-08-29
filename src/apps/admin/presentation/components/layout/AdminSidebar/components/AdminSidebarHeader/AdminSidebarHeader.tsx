/**
 * AdminSidebarHeader Component
 *
 * User info (avatar, name, email, role badge).
 * Avatar click toggles collapse/expand.
 */

'use client';

import { X } from 'lucide-react';

import type { AdminSidebarHeaderProps } from './AdminSidebarHeader.interfaces';
import { UI_TEXT } from './AdminSidebarHeader.constants';

import {
  MobileCloseButton,
  RoleBadge,
  RoleLabel,
  SidebarHeader,
  UserAvatar,
  UserEmail,
  UserInfo,
  UserName,
  UserSection,
} from './AdminSidebarHeader.styled';

export const AdminSidebarHeader = ({
  isCollapsed,
  onMobileClose,
  onToggleCollapse,
  roleLabel,
  userEmail,
  userInitials,
  userName,
}: AdminSidebarHeaderProps) => {
  return (
    <SidebarHeader $isCollapsed={isCollapsed}>
      <UserSection $isCollapsed={isCollapsed}>
        <UserAvatar
          aria-label={isCollapsed ? UI_TEXT.EXPAND : UI_TEXT.COLLAPSE}
          role='button'
          tabIndex={0}
          onClick={onToggleCollapse}
        >
          {userInitials}
        </UserAvatar>
        <UserInfo $isCollapsed={isCollapsed}>
          <UserName>{userName}</UserName>
          <UserEmail>{userEmail}</UserEmail>
        </UserInfo>
        <RoleBadge $isCollapsed={isCollapsed}>
          <RoleLabel>{roleLabel}</RoleLabel>
        </RoleBadge>
      </UserSection>

      <MobileCloseButton aria-label={UI_TEXT.CLOSE} onClick={onMobileClose}>
        <X size={20} />
      </MobileCloseButton>
    </SidebarHeader>
  );
};
