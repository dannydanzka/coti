/**
 * AdminSidebarFooter Component
 *
 * Logout button section.
 */

'use client';

import { LogOut } from 'lucide-react';

import type { AdminSidebarFooterProps } from './AdminSidebarFooter.interfaces';
import { UI_TEXT } from './AdminSidebarFooter.constants';

import { LogoutButton, LogoutText, SidebarFooter } from './AdminSidebarFooter.styled';

export const AdminSidebarFooter = ({ isCollapsed, onLogout }: AdminSidebarFooterProps) => {
  return (
    <SidebarFooter $isCollapsed={isCollapsed}>
      <LogoutButton $isCollapsed={isCollapsed} type='button' onClick={onLogout}>
        <LogOut size={18} />
        <LogoutText $isCollapsed={isCollapsed}>{UI_TEXT.LOGOUT}</LogoutText>
      </LogoutButton>
    </SidebarFooter>
  );
};
