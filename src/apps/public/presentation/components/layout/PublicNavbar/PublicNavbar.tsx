/**
 * PublicNavbar Component
 *
 * Main navigation component for public pages with responsive menu.
 * Supports dropdown menus, search functionality, and active states.
 */

'use client';

import { ChevronDown, Menu, X } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Image } from '@dannydanzka/sovereignty-ui';
import { NAVBAR_UI_TEXT } from '@apps/public/constants';
import { ROUTES } from '@constants';

import type { PublicNavbarItem, PublicNavbarProps } from './PublicNavbar.interfaces';

import {
  DropdownContainer,
  DropdownIcon,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  LogoContainer,
  LogoImageWrapper,
  LogoLink,
  LogoText,
  MobileMenuToggle,
  NavContent,
  NavItem,
  NavLink,
  NavMenu,
  PublicNavbarContainer,
} from './PublicNavbar.styled';

const PublicNavbar: React.FC<PublicNavbarProps> = ({
  className,
  currentPath = '',
  items = [],
  logo = { alt: '', src: '', text: '' },
  variant = 'default',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setOpenDropdowns(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setOpenDropdowns(new Set());
  }, []);

  const handleDropdownToggle = useCallback((itemId: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.clear();
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  const isPathActive = useCallback(
    (url: string): boolean => {
      if (url === ROUTES.PUBLIC.HOME && currentPath === ROUTES.PUBLIC.HOME) return true;
      if (url !== ROUTES.PUBLIC.HOME && currentPath.startsWith(url)) return true;
      return false;
    },
    [currentPath]
  );

  const hasActiveChildren = useCallback(
    (item: PublicNavbarItem): boolean => {
      return item.children?.some((child) => isPathActive(child.url)) || false;
    },
    [isPathActive]
  );

  const handleDropdownItemClick = useCallback(() => {
    setOpenDropdowns(new Set());
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavLinkClick = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdowns(new Set());
  }, []);

  const createDropdownHandler = useCallback(
    (itemId: string) => () => {
      handleDropdownToggle(itemId);
    },
    [handleDropdownToggle]
  );

  const createItemClickHandler = useCallback(
    (itemOnClick?: () => void) => () => {
      itemOnClick?.();
      handleNavLinkClick();
    },
    [handleNavLinkClick]
  );

  const renderDropdownItem = useCallback(
    (item: PublicNavbarItem, isDropdownOpen: boolean, isActiveOrHasChild: boolean) => (
      <NavItem key={item.id}>
        <DropdownContainer>
          <DropdownTrigger
            $isActive={isActiveOrHasChild}
            $isOpen={isDropdownOpen}
            type='button'
            onClick={createDropdownHandler(item.id)}
          >
            {item.title}
            <DropdownIcon $isOpen={isDropdownOpen}>
              <ChevronDown size={16} />
            </DropdownIcon>
          </DropdownTrigger>
          <DropdownMenu $isOpen={isDropdownOpen}>
            {item.children?.map((child) => (
              <DropdownItem href={child.url} key={child.id} onClick={handleDropdownItemClick}>
                {child.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </DropdownContainer>
      </NavItem>
    ),
    [createDropdownHandler, handleDropdownItemClick]
  );

  const renderButtonItem = useCallback(
    (item: PublicNavbarItem) => (
      <NavItem key={item.id}>
        <NavLink
          $isActive={false}
          as='button'
          href={item.url}
          type='button'
          onClick={createItemClickHandler(item.onClick)}
        >
          {item.title}
        </NavLink>
      </NavItem>
    ),
    [createItemClickHandler]
  );

  const renderLinkItem = useCallback(
    (item: PublicNavbarItem, isActive: boolean) => (
      <NavItem key={item.id}>
        <NavLink $isActive={isActive} href={item.url} onClick={handleNavLinkClick}>
          {item.title}
        </NavLink>
      </NavItem>
    ),
    [handleNavLinkClick]
  );

  const renderNavItem = useCallback(
    (item: PublicNavbarItem) => {
      const isActive = isPathActive(item.url);
      const hasChildren = item.children && item.children.length > 0;
      const hasActiveChild = hasChildren && hasActiveChildren(item);
      const isDropdownOpen = openDropdowns.has(item.id);

      if (hasChildren) {
        return renderDropdownItem(item, isDropdownOpen, Boolean(isActive || hasActiveChild));
      }

      if (item.onClick) {
        return renderButtonItem(item);
      }

      return renderLinkItem(item, isActive);
    },
    [
      isPathActive,
      hasActiveChildren,
      openDropdowns,
      renderDropdownItem,
      renderButtonItem,
      renderLinkItem,
    ]
  );

  const renderLogo = () => (
    <LogoContainer>
      <LogoLink href={logo?.url || '/'}>
        {logo?.src ? (
          <LogoImageWrapper>
            <Image alt={logo.alt} src={logo.src} />
          </LogoImageWrapper>
        ) : (
          <LogoText>{NAVBAR_UI_TEXT.LOGO_TEXT}</LogoText>
        )}
      </LogoLink>
    </LogoContainer>
  );

  return (
    <PublicNavbarContainer $variant={variant} className={className}>
      <NavContent ref={menuRef}>
        {renderLogo()}

        <NavMenu $isOpen={isMobileMenuOpen}>
          {items
            .filter((item) => item.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(renderNavItem)}
        </NavMenu>

        <MobileMenuToggle
          aria-label={NAVBAR_UI_TEXT.MOBILE_MENU_TOGGLE}
          type='button'
          onClick={handleMobileMenuToggle}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </MobileMenuToggle>
      </NavContent>
    </PublicNavbarContainer>
  );
};

export { PublicNavbar };
