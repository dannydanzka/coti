/**
 * Admin Layout Styled Components
 */

import Link from 'next/link';
import styled from 'styled-components';

import { color, layout, shape, spacing, typography } from '@constants';

export const LayoutContainer = styled.div`
  background-color: ${color.backgroundDark};
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.aside<{ $isCollapsed?: boolean; $isMobileOpen?: boolean }>`
  background-color: ${color.backgroundAlt};
  border-right: 1px solid ${color.borderDark};
  height: 100vh;
  left: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  width: ${({ $isCollapsed }) => ($isCollapsed ? '80px' : '280px')};
  z-index: ${layout.zIndex.fixed};

  @media (max-width: ${layout.breakpoint.lg}) {
    transform: translateX(${({ $isMobileOpen }) => ($isMobileOpen ? '0' : '-100%')});
    width: 280px;
  }
`;

export const SidebarHeader = styled.div`
  border-bottom: 1px solid ${color.borderDark};
  padding: ${spacing.xl} ${spacing.lg};
`;

export const SidebarLogo = styled.div<{ $isCollapsed?: boolean }>`
  align-items: center;
  color: ${color.primary500};
  display: flex;
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.bold};
  gap: ${spacing.md};

  ${({ $isCollapsed }) =>
    $isCollapsed &&
    `
    justify-content: center;
  `}
`;

export const LogoText = styled.span<{ $isCollapsed?: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'block')};
  transition: opacity 0.3s ease-in-out;
`;

export const SidebarNav = styled.nav`
  padding: ${spacing.lg} 0;
`;

export const NavItem = styled(Link)<{ $isActive?: boolean; $isCollapsed?: boolean }>`
  align-items: center;
  color: ${({ $isActive }) => ($isActive ? color.primary600 : color.neutral700)};
  display: flex;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.lg};
  text-decoration: none;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;

  &:hover {
    background-color: ${color.neutral200};
    color: ${color.primary600};
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    background-color: ${color.neutral200};
    border-right: 3px solid ${color.primary500};
  `}

  ${({ $isCollapsed }) =>
    $isCollapsed &&
    `
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  `}
`;

export const NavItemText = styled.span<{ $isCollapsed?: boolean }>`
  display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'block')};
  transition: opacity 0.3s ease-in-out;
`;

export const MainContent = styled.main<{ $sidebarCollapsed?: boolean }>`
  flex: 1;
  margin-left: ${({ $sidebarCollapsed }) => ($sidebarCollapsed ? '80px' : '280px')};
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: ${layout.breakpoint.lg}) {
    margin-left: 0;
  }
`;

export const TopBar = styled.header`
  align-items: center;
  background-color: ${color.background};
  border-bottom: 1px solid ${color.border};
  display: flex;
  justify-content: space-between;
  padding: ${spacing.md} ${spacing.xl};
  position: sticky;
  top: 0;
  z-index: ${layout.zIndex.sticky};
`;

export const TopBarLeft = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.md};
`;

export const MenuToggle = styled.button`
  background: none;
  border: none;
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  cursor: pointer;
  display: none;
  font-size: ${typography.size.xl};
  padding: ${spacing.sm};

  @media (max-width: ${layout.breakpoint.lg}) {
    display: block;
  }

  &:hover {
    background-color: ${color.backgroundDark};
  }
`;

export const TopBarRight = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.md};
`;

export const UserMenu = styled.div`
  position: relative;
`;

export const UserInfo = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  cursor: pointer;
  display: flex;
  font-size: ${typography.size.sm};
  gap: ${spacing.sm};
  padding: ${spacing.sm};

  &:hover {
    background-color: ${color.backgroundDark};
  }
`;

export const UserAvatar = styled.div`
  align-items: center;
  background-color: ${color.primary500};
  border-radius: 50%;
  color: ${color.textInverse};
  display: flex;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  height: ${spacing.xl};
  justify-content: center;
  width: ${spacing.xl};
`;

export const PageContent = styled.div`
  min-height: calc(100vh - ${spacing['5xl']}); /* Adjust for top bar height */
  padding: ${spacing.xl};
`;

export const Overlay = styled.div<{ $isVisible?: boolean }>`
  background-color: rgba(${color.neutral900}, 0.5);
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  inset: 0;
  position: fixed;
  z-index: ${layout.zIndex.overlay};

  @media (min-width: ${layout.breakpoint.lg}) {
    display: none;
  }
`;

export const LogoIcon = styled.span`
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
`;

export const NavIcon = styled.span`
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  width: ${spacing.md};
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  color: ${color.neutral700};
  font-weight: ${typography.weight.medium};
`;

export const UserRole = styled.div`
  color: ${color.neutral500};
  font-size: ${typography.size.xs};
`;

export const HiddenToggleButton = styled.button`
  display: none;
`;

export const LoadingMessage = styled.div`
  padding: 2rem;
  text-align: center;
`;
