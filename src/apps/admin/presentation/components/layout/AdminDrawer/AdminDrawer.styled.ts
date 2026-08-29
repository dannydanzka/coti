/**
 * AdminDrawer Styled Components
 *
 * Design: Admin-focused with blue/purple gradient header.
 * Slide-in drawer for admin navigation.
 */

'use client';

import styled, { keyframes } from 'styled-components';

import { color, elevation, layout, shape, spacing, typography } from '@constants';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const DrawerOverlay = styled.div<{ $isClosing: boolean }>`
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.2s ease-out forwards;
  background-color: rgb(${color.black} / 0.5);
  inset: 0;
  position: fixed;
  z-index: 1300;
`;

export const DrawerContainer = styled.aside<{ $isClosing: boolean }>`
  animation: ${({ $isClosing }) => ($isClosing ? slideOut : slideIn)} 0.2s ease-out forwards;
  background-color: ${color.white};
  box-shadow: ${elevation.xl};
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;
  max-width: 320px;
  position: fixed;
  top: 0;
  width: 85%;
  z-index: 1400;

  @media (min-width: ${layout.breakpoint.md}) {
    max-width: 360px;
  }
`;

export const DrawerHeader = styled.div`
  background: linear-gradient(135deg, ${color.primary600}, ${color.primary800});
  padding: ${spacing.md};
  position: relative;
`;

export const CloseButton = styled.button`
  align-items: center;
  background: ${color.white};
  border: none;
  border-radius: ${shape.full};
  color: ${color.primary700};
  cursor: pointer;
  display: flex;
  height: ${spacing.lg};
  justify-content: center;
  position: absolute;
  right: ${spacing.sm};
  top: ${spacing.sm};
  transition: all 0.2s ease-in-out;
  width: ${spacing.lg};

  &:hover {
    background: ${color.neutral100};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const UserSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding-top: ${spacing.xs};
`;

export const UserAvatar = styled.div`
  align-items: center;
  background: ${color.white};
  border: 3px solid ${color.white};
  border-radius: ${shape.full};
  box-shadow: ${elevation.md};
  color: ${color.primary600};
  display: flex;
  font-family: ${typography.family.display};
  font-size: ${typography.size['2xl']};
  font-weight: ${typography.weight.bold};
  height: ${spacing['5xl']};
  justify-content: center;
  text-transform: uppercase;
  width: ${spacing['5xl']};
`;

export const UserInfo = styled.div`
  text-align: center;
`;

export const UserName = styled.h3`
  color: ${color.white};
  font-family: ${typography.family.display};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.semibold};
  margin: 0;
  text-shadow: 0 1px 2px rgb(${color.black} / 0.1);
`;

export const UserRole = styled.p`
  color: rgb(${color.white} / 0.85);
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  margin: ${spacing.micro} 0 0;
`;

export const RoleBadge = styled.div`
  align-items: center;
  background: ${color.white};
  border-radius: ${shape.full};
  box-shadow: ${elevation.sm};
  display: flex;
  gap: ${spacing.xs};
  margin-top: ${spacing.xs};
  padding: ${spacing.xs} ${spacing.sm};
`;

export const RoleLabel = styled.span`
  color: ${color.primary600};
  font-family: ${typography.family.display};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
`;

export const NavSection = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.sm} 0;
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li``;

export const NavLinkStyled = styled.a<{ $isActive: boolean }>`
  align-items: center;
  background: ${({ $isActive }) => ($isActive ? color.primary50 : 'transparent')};
  border-left: 4px solid ${({ $isActive }) => ($isActive ? color.primary600 : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? color.primary700 : color.textPrimary)};
  cursor: pointer;
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  font-weight: ${({ $isActive }) =>
    $isActive ? typography.weight.semibold : typography.weight.medium};
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  text-decoration: none;
  transition: all 0.15s ease-in-out;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? color.primary50 : color.neutral50)};
  }

  svg {
    flex-shrink: 0;
    height: ${spacing.md};
    width: ${spacing.md};
  }
`;

export const NavBadge = styled.span`
  background: ${color.primary600};
  border-radius: ${shape.full};
  color: ${color.white};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  margin-left: auto;
  min-width: ${spacing.md};
  padding: ${spacing.micro} ${spacing.xs};
  text-align: center;
`;

export const DrawerFooter = styled.div`
  border-top: 1px solid ${color.neutral200};
  padding: ${spacing.sm} ${spacing.md};
`;

export const LogoutButton = styled.button`
  align-items: center;
  background: transparent;
  border: 2px solid ${color.error};
  border-radius: ${shape.md};
  color: ${color.error};
  cursor: pointer;
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.medium};
  gap: ${spacing.xs};
  justify-content: center;
  padding: ${spacing.sm} ${spacing.sm};
  transition: all 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background: ${color.errorBackground};
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    height: ${spacing.md};
    width: ${spacing.md};
  }
`;
