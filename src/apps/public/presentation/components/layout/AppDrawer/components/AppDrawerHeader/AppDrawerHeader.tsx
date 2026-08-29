/**
 * AppDrawerHeader Component
 *
 * User info (avatar, name, email).
 * Avatar click toggles collapse/expand.
 */

'use client';

import { X } from 'lucide-react';

import type { AppDrawerHeaderProps } from './AppDrawerHeader.interfaces';
import { UI_TEXT } from './AppDrawerHeader.constants';

import {
  MobileCloseButton,
  SidebarHeader,
  UserAvatar,
  UserEmail,
  UserInfo,
  UserName,
  UserSection,
} from './AppDrawerHeader.styled';

export const AppDrawerHeader = ({
  isCollapsed,
  onMobileClose,
  onToggleCollapse,
  userEmail,
  userInitials,
  userName,
}: AppDrawerHeaderProps) => {
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
      </UserSection>

      <MobileCloseButton aria-label={UI_TEXT.CLOSE} onClick={onMobileClose}>
        <X size={20} />
      </MobileCloseButton>
    </SidebarHeader>
  );
};
