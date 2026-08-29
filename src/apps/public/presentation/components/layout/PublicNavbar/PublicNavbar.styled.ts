/**
 * PublicNavbar Styled Components
 *
 * Styled components for public navigation.
 * Uses flat maps for SSR-safe styling.
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

export const PublicNavbarContainer = styled.div<{ $variant: 'default' | 'transparent' | 'solid' }>`
  backdrop-filter: blur(${spacing.xs});
  left: 0;
  position: sticky;
  right: 0;
  top: 0;
  transition: ${motion.normal};
  width: 100%;
  z-index: ${layout.zIndex.modal};

  ${({ $variant }) => {
    switch ($variant) {
      case 'transparent':
        return `
          background: ${brandColor.bgHeader};
          border-bottom: 1px solid ${color.border};
        `;
      case 'solid':
        return `
          background: ${brandColor.bgHeader};
          border-bottom: 1px solid ${color.border};
          box-shadow: ${elevation.lg};
        `;
      case 'default':
      default:
        return `
          background: ${brandColor.bgHeader};
          border-bottom: 1px solid ${color.border};
        `;
    }
  }}
`;

export const NavContent = styled.div`
  align-items: center;
  display: flex;
  height: ${spacing['6xl']};
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
  padding: ${spacing.md} ${spacing.lg};

  @media (max-width: ${layout.breakpoint.lg}) {
    padding: ${spacing.md};
  }
`;

export const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.md};
`;

export const LogoLink = styled.a`
  align-items: center;
  display: flex;
  text-decoration: none;
  transition: ${motion.normal};

  &:hover {
    transform: scale(1.05);
  }
`;

export const LogoImageWrapper = styled.div`
  height: ${spacing.xl};
  width: 150px;

  @media (max-width: ${layout.breakpoint.md}) {
    height: ${spacing.lg};
    width: 120px;
  }
`;

export const LogoText = styled.div`
  color: ${brandColor.landingBlueDark};
  font-size: ${typography.size.xl};
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  @media (max-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size.lg};
  }
`;

export const NavMenu = styled.div<{ $isOpen?: boolean }>`
  align-items: center;
  display: flex;
  gap: ${spacing.lg};

  @media (max-width: ${layout.breakpoint.lg}) {
    background: ${brandColor.bgHeader};
    border-bottom: 1px solid ${color.border};
    box-shadow: ${elevation.lg};
    flex-direction: column;
    gap: ${spacing.md};
    left: 0;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    padding: ${spacing.lg};
    position: absolute;
    right: 0;
    top: 100%;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    transition: all 0.3s ease-in-out;
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  }
`;

export const NavItem = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const NavLink = styled.a<{ $isActive?: boolean }>`
  border-radius: ${shape.sm};
  color: ${({ $isActive }) => ($isActive ? brandColor.landingBlueDark : color.textPrimary)};
  font-size: ${typography.size.sm};
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: ${spacing.sm} ${spacing.md};
  position: relative;
  text-decoration: none;
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

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: ${spacing.sm};
      height: 2px;
      background: ${brandColor.landingBlueDark};
      border-radius: 1px;
    }
  `}
`;

export const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export {
  DropdownIcon,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  MobileMenuToggle,
} from './PublicNavbar.parts.styled';
