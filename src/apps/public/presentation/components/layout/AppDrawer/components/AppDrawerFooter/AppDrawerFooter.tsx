/**
 * AppDrawerFooter Component
 *
 * Logout button section.
 */

'use client';

import { LogOut } from 'lucide-react';

import type { AppDrawerFooterProps } from './AppDrawerFooter.interfaces';
import { UI_TEXT } from './AppDrawerFooter.constants';

import { LogoutButton, LogoutText, SidebarFooter } from './AppDrawerFooter.styled';

export const AppDrawerFooter = ({ isCollapsed, onLogout }: AppDrawerFooterProps) => {
  return (
    <SidebarFooter $isCollapsed={isCollapsed}>
      <LogoutButton $isCollapsed={isCollapsed} type='button' onClick={onLogout}>
        <LogOut size={18} />
        <LogoutText $isCollapsed={isCollapsed}>{UI_TEXT.LOGOUT}</LogoutText>
      </LogoutButton>
    </SidebarFooter>
  );
};
