/**
 * Header Component
 *
 * Main navigation header with different variants for public, authenticated, and admin users.
 * Design: Neubrutalismo suave with Montserrat font.
 * Logo centered with navigation items on each side.
 */

'use client';

import { CalendarPlus, LogIn, Menu, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import {
  AUTHENTICATED_ROUTES,
  HEADER_ROUTES,
  HOME_NAV_ITEMS,
  MANGO_PACKAGES_ANCHOR,
  NAVBAR_UI_TEXT,
} from '@constants';
import { Button } from '@dannydanzka/sovereignty-ui';
import { useAuth, useLayoutBgColor } from '@hooks';
import LogoSvg from '@assets/branding/Logo.svg';

import type { HeaderProps } from './Header.interfaces';
import { MeetButton } from '../../common/MeetButton';

import {
  ButtonIcon,
  ButtonText,
  EnrollButton,
  HeaderContainer,
  HeaderContent,
  HomeNav,
  LogoContainer,
  MeetCtaSlot,
  MeetMenuButton,
  MeetMobileMenu,
  MeetMobileNavLink,
  MembersButton,
  MembersCtaWrap,
  MenuButton,
  NavLeft,
  NavLink,
  NavRight,
  UserInfo,
  UserMenu,
  UserName,
  UserRole,
} from './Header.styled';

export const Header = ({ bgColor, onMenuClick, variant = 'public' }: HeaderProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuth();
  const isHome = pathname === HEADER_ROUTES.HOME;
  const { layoutBgColor } = useLayoutBgColor();
  const effectiveBgColor = bgColor ?? layoutBgColor ?? undefined;
  const [isMeetMenuOpen, setIsMeetMenuOpen] = useState(false);

  const handleToggleMeetMenu = useCallback(() => {
    setIsMeetMenuOpen((open) => !open);
  }, []);

  const handleCloseMeetMenu = useCallback(() => {
    setIsMeetMenuOpen(false);
  }, []);

  const handleLogoClick = useCallback(() => {
    router.push(HEADER_ROUTES.HOME);
  }, [router]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const handleMembersClick = useCallback(() => {
    router.push(HEADER_ROUTES.LOGIN);
  }, [router]);

  const handleEnrollClick = useCallback(() => {
    router.push(HEADER_ROUTES.ENROLLMENT);
  }, [router]);

  const handleReserveClick = useCallback(() => {
    router.push(MANGO_PACKAGES_ANCHOR);
  }, [router]);

  /** Mango landing members entry: dashboard for signed-in users, login for guests. */
  const handleMeetMembersClick = useCallback(() => {
    router.push(isAuthenticated ? AUTHENTICATED_ROUTES.DASHBOARD : HEADER_ROUTES.LOGIN);
  }, [isAuthenticated, router]);

  const meetMembersLabel = isAuthenticated
    ? NAVBAR_UI_TEXT.CTA_DASHBOARD
    : NAVBAR_UI_TEXT.CTA_MEMBERS;

  const meetMembersHref = isAuthenticated ? AUTHENTICATED_ROUTES.DASHBOARD : HEADER_ROUTES.LOGIN;

  const renderPublicNav = () => (
    <>
      <NavLeft>{/* Empty left side for balance */}</NavLeft>
      <LogoContainer onClick={handleLogoClick}>
        <LogoSvg />
      </LogoContainer>
      <NavRight>
        <EnrollButton onClick={handleEnrollClick}>
          <ButtonIcon>
            <CalendarPlus size={18} />
          </ButtonIcon>
          <ButtonText>{NAVBAR_UI_TEXT.CTA_ENROLL}</ButtonText>
        </EnrollButton>
        <MembersButton onClick={handleMembersClick}>
          <ButtonIcon>
            <LogIn size={18} />
          </ButtonIcon>
          <ButtonText>{NAVBAR_UI_TEXT.CTA_MEMBERS}</ButtonText>
        </MembersButton>
      </NavRight>
    </>
  );

  const renderMeetNav = () => (
    <>
      <LogoContainer onClick={handleLogoClick}>
        <LogoSvg />
      </LogoContainer>
      <HomeNav>
        {HOME_NAV_ITEMS.map((item) => (
          <NavLink href={item.href} key={item.href}>
            {item.label}
          </NavLink>
        ))}
      </HomeNav>
      <NavRight>
        <MeetCtaSlot>
          <MembersCtaWrap>
            <MeetButton size='small' variant='outline' onClick={handleMeetMembersClick}>
              {meetMembersLabel}
            </MeetButton>
          </MembersCtaWrap>
          <MeetButton size='small' variant='primary' onClick={handleReserveClick}>
            {NAVBAR_UI_TEXT.CTA_RESERVE}
          </MeetButton>
        </MeetCtaSlot>
        <MeetMenuButton
          aria-expanded={isMeetMenuOpen}
          aria-label={NAVBAR_UI_TEXT.MOBILE_MENU_TOGGLE}
          type='button'
          onClick={handleToggleMeetMenu}
        >
          {isMeetMenuOpen ? <X /> : <Menu />}
        </MeetMenuButton>
      </NavRight>
    </>
  );

  const handleAuthLogoClick = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const renderAuthenticatedNav = () => (
    <>
      <NavLeft>
        <MenuButton aria-label={t('common.openMenu')} type='button' onClick={onMenuClick}>
          <Menu />
        </MenuButton>
      </NavLeft>
      <LogoContainer onClick={handleAuthLogoClick}>
        <LogoSvg />
      </LogoContainer>
      <NavRight />
    </>
  );

  const handleAdminLogoClick = useCallback(() => {
    router.push('/admin');
  }, [router]);

  const renderAdminNav = () => (
    <>
      <NavLeft>
        <MenuButton aria-label={t('common.openMenu')} type='button' onClick={onMenuClick}>
          <Menu />
        </MenuButton>
        <NavLink href='/admin'>{t('public.nav.dashboard')}</NavLink>
        <NavLink href='/admin/kits'>{t('public.nav.kits')}</NavLink>
      </NavLeft>
      <LogoContainer onClick={handleAdminLogoClick}>
        <LogoSvg />
      </LogoContainer>
      <NavRight>
        <NavLink href='/admin/events'>{t('public.nav.events')}</NavLink>
        <NavLink href='/admin/evidences'>{t('public.nav.evidences')}</NavLink>
        <UserMenu>
          <UserInfo>
            <UserName>
              {`${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Admin'}
            </UserName>
            <UserRole>{user?.role ?? 'admin'}</UserRole>
          </UserInfo>
          <Button size='small' variant='outline' onClick={handleLogout}>
            {t('auth.logout')}
          </Button>
        </UserMenu>
      </NavRight>
    </>
  );

  const renderNav = () => {
    switch (variant) {
      case 'authenticated':
        return renderAuthenticatedNav();
      case 'admin':
        return renderAdminNav();
      case 'public':
      default:
        return isHome ? renderMeetNav() : renderPublicNav();
    }
  };

  /**
   * The meet hamburger only renders inside renderMeetNav (home, public variant),
   * so isMeetMenuOpen can only be true there — no need to re-check the variant.
   */
  const showMeetMenu = isHome && isMeetMenuOpen;

  return (
    <HeaderContainer $bgColor={effectiveBgColor}>
      <HeaderContent>{renderNav()}</HeaderContent>
      {showMeetMenu && (
        <MeetMobileMenu $bgColor={effectiveBgColor}>
          {HOME_NAV_ITEMS.map((item) => (
            <MeetMobileNavLink href={item.href} key={item.href} onClick={handleCloseMeetMenu}>
              {item.label}
            </MeetMobileNavLink>
          ))}
          <MeetMobileNavLink href={meetMembersHref} onClick={handleCloseMeetMenu}>
            {meetMembersLabel}
          </MeetMobileNavLink>
        </MeetMobileMenu>
      )}
    </HeaderContainer>
  );
};
