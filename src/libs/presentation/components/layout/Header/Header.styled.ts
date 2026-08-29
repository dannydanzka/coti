/**
 * Header Styled Components
 *
 * Design: Neubrutalismo suave with Montserrat font.
 * Yellow background (#FFEBB5) for landing pages.
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, elevation, layout, shape, spacing, typography } from '@constants';

export const HeaderContainer = styled.header<{ $bgColor?: string }>`
  background-color: ${({ $bgColor }) => $bgColor ?? brandColor.bgHeader};

  /* Extra right padding below lg so the hamburger / action cluster never sits
     glued to the screen edge. Desktop reverts to symmetric padding. */
  padding: ${spacing.xs} ${spacing.lg} ${spacing.xs} ${spacing.xs};
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (min-width: ${layout.breakpoint.lg}) {
    padding: ${spacing.xs} ${spacing.sm};
  }
`;

export const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.xs};
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;

  @media (min-width: ${layout.breakpoint.md}) {
    gap: ${spacing.sm};
  }
`;

export const LogoContainer = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.2s ease-in-out;

  svg {
    height: ${spacing.md};
    width: auto;

    @media (min-width: ${layout.breakpoint.sm}) {
      height: ${spacing['3xl']};
    }

    @media (min-width: ${layout.breakpoint.md}) {
      height: ${spacing['4xl']};
    }
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const Nav = styled.nav`
  align-items: center;
  display: flex;
  gap: ${spacing.sm};

  @media (min-width: ${layout.breakpoint.md}) {
    gap: ${spacing.md};
  }
`;

export const NavLeft = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${spacing.sm};
  justify-content: flex-start;

  @media (min-width: ${layout.breakpoint.md}) {
    gap: ${spacing.md};
  }
`;

export const NavRight = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${spacing.xs};
  justify-content: flex-end;

  @media (min-width: ${layout.breakpoint.md}) {
    gap: ${spacing.md};
  }
`;

export const NavLink = styled.a`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  padding: ${spacing.xs};
  text-decoration: none;
  transition: opacity 0.2s ease-in-out;

  @media (min-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size.base};
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const HomeNav = styled.nav`
  align-items: center;
  display: none;
  gap: ${spacing.md};
  justify-content: center;

  @media (min-width: ${layout.breakpoint.xl}) {
    display: flex;
  }

  /* Meet landing nav: dark (not bluish) and bold, per the mock. Scoped here so
     the admin nav (also using NavLink) keeps its own style. */
  ${NavLink} {
    color: ${brandColor.landingTextDark};
    font-weight: ${typography.weight.bold};
  }
`;

export const MeetCtaSlot = styled.div`
  /* Wraps the meet CTAs (Miembros + Apartar). The buttons ship size="small" so
     they fit next to the hamburger on tablet/mobile; at xl+ (hamburger hidden,
     room to spare) restore the full medium scale. The gap keeps "Miembros" and
     "Apartar mi ejemplar" from crowding each other. */
  align-items: center;
  display: flex;
  gap: ${spacing.sm};

  @media (min-width: ${layout.breakpoint.xl}) {
    & button {
      font-size: ${typography.size.base};
      padding: ${spacing.sm} ${spacing.lg};
    }
  }
`;

/* "Miembros" is redundant below xl (the hamburger menu already carries it), so
   it only shows at xl+; the primary "Apartar" CTA stays visible at every width. */
export const MembersCtaWrap = styled.span`
  display: none;

  @media (min-width: ${layout.breakpoint.xl}) {
    display: inline-flex;
  }
`;

export const MeetMenuButton = styled.button`
  /* Hamburger that reveals the meet nav links below xl (where HomeNav hides). */
  align-items: center;
  background: transparent;
  border: none;
  color: ${brandColor.landingTextDark};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: ${spacing.xl};
  justify-content: center;
  padding: ${spacing.xs};
  transition: opacity 0.2s ease-in-out;
  width: ${spacing.xl};

  @media (min-width: ${layout.breakpoint.xl}) {
    display: none;
  }

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    height: ${spacing.lg};
    width: ${spacing.lg};
  }
`;

export const MeetMobileMenu = styled.nav<{ $bgColor?: string }>`
  /* Collapsible dropdown panel for the meet nav links on mobile/tablet. Anchored
     under the sticky header, full-bleed, matching the header background. */
  background-color: ${({ $bgColor }) => $bgColor ?? brandColor.bgHeader};
  box-shadow: ${elevation.md};
  display: flex;
  flex-direction: column;
  left: 0;
  padding: ${spacing.sm} ${spacing.md} ${spacing.md};
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 999;

  @media (min-width: ${layout.breakpoint.xl}) {
    display: none;
  }
`;

export const MeetMobileNavLink = styled.a`
  border-bottom: 1px solid ${brandColor.landingBgCreamWarm};
  color: ${brandColor.landingTextDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.bold};
  padding: ${spacing.sm} 0;
  text-decoration: none;
  transition: opacity 0.2s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const ButtonIcon = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;

  @media (min-width: ${layout.breakpoint.md}) {
    display: none;
  }
`;

export const ButtonText = styled.span`
  display: none;

  @media (min-width: ${layout.breakpoint.md}) {
    display: inline;
  }
`;

export const EnrollButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  gap: ${spacing.xs};
  justify-content: center;
  padding: ${spacing.xs};
  transition: opacity 0.2s ease-in-out;

  @media (min-width: ${layout.breakpoint.md}) {
    font-size: ${typography.size.base};
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const MembersButton = styled.button`
  align-items: center;
  background-color: ${brandColor.landingPinkVibrant};
  border: none;
  border-radius: ${shape.full};
  color: ${color.white};
  cursor: pointer;
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  gap: ${spacing.xs};
  justify-content: center;
  padding: ${spacing.xs};
  transition: all 0.2s ease-in-out;

  @media (min-width: ${layout.breakpoint.md}) {
    padding: ${spacing.sm} ${spacing.md};
  }

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const UserMenu = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.sm};
`;

export const UserInfo = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;

  @media (max-width: ${layout.breakpoint.md}) {
    display: none;
  }
`;

export const UserName = styled.span`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
`;

export const UserRole = styled.span`
  color: ${brandColor.landingTextGray};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  text-transform: capitalize;
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  display: none;
  padding: ${spacing.xs};

  @media (max-width: ${layout.breakpoint.md}) {
    display: block;
  }
`;

export const MenuButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  display: flex;
  height: ${spacing.xl};
  justify-content: center;
  padding: ${spacing.xs};
  transition: all 0.2s ease-in-out;
  width: ${spacing.xl};

  @media (min-width: ${layout.breakpoint.lg}) {
    display: none;
  }

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    height: ${spacing.md};
    width: ${spacing.md};
  }
`;
