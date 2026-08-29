/**
 * PublicNavbar Styled Components - Part 2
 *
 * Additional styled components for PublicNavbar.
 */

import styled from 'styled-components';

import {
  brandColor,
  color,
  elevation,
  layout,
  motion,
  shape,
  spacing,
  typography,
} from '@constants';

export const DropdownTrigger = styled.button<{ $isActive?: boolean; $isOpen?: boolean }>`
  align-items: center;
  background: none;
  border: none;
  border-radius: ${shape.sm};
  color: ${({ $isActive }) => ($isActive ? brandColor.landingBlueDark : color.textPrimary)};
  cursor: pointer;
  display: flex;
  font-size: ${typography.size.sm};
  font-weight: 600;
  gap: ${spacing.xs};
  letter-spacing: 0.05em;
  padding: ${spacing.sm} ${spacing.md};
  text-transform: uppercase;
  transition: ${motion.normal};

  @media (max-width: ${layout.breakpoint.lg}) {
    font-size: ${typography.size.base};
    justify-content: center;
    padding: ${spacing.md};
    width: 100%;
  }

  &:hover {
    background: rgb(${color.blackRgb} / 0.05);
    color: ${brandColor.landingBlueDark};
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    background: rgb(${color.blackRgb} / 0.08);
  `}
`;

export const DropdownIcon = styled.span<{ $isOpen?: boolean }>`
  display: inline-block;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: ${motion.normal};
`;

export const DropdownMenu = styled.div<{ $isOpen?: boolean }>`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: ${shape.sm};
  box-shadow: ${elevation.xl};
  left: 0;
  min-width: 200px;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  position: absolute;
  top: calc(100% + ${spacing.xs});
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-8px)')};
  transition: all 0.2s ease-in-out;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  z-index: ${layout.zIndex.dropdown};

  @media (max-width: ${layout.breakpoint.lg}) {
    border: none;
    border-radius: 0;
    border-top: 1px solid ${color.border};
    box-shadow: none;
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    margin-top: ${spacing.sm};
    min-width: auto;
    opacity: 1;
    position: static;
    transform: none;
    visibility: visible;
    width: 100%;
  }
`;

export const DropdownItem = styled.a`
  color: ${color.textPrimary};
  display: block;
  font-size: ${typography.size.sm};
  font-weight: 500;
  padding: ${spacing.md};
  text-decoration: none;
  transition: ${motion.normal};

  &:hover {
    background: ${color.backgroundDark};
    color: ${brandColor.landingBlueDark};
  }

  &:first-child {
    border-top-left-radius: ${shape.sm};
    border-top-right-radius: ${shape.sm};
  }

  &:last-child {
    border-bottom-left-radius: ${shape.sm};
    border-bottom-right-radius: ${shape.sm};
  }
`;

export const MobileMenuToggle = styled.button`
  background: none;
  border: none;
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  display: none;
  font-size: ${typography.size.xl};
  padding: ${spacing.sm};
  transition: ${motion.normal};

  @media (max-width: ${layout.breakpoint.lg}) {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &:hover {
    color: ${brandColor.landingBlueDark};
    opacity: 0.7;
  }
`;
