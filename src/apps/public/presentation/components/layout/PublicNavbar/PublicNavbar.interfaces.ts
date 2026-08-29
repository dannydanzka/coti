/**
 * PublicNavbar Component Interfaces
 *
 * Type definitions for public navigation component used in public pages.
 * Supports dynamic menu items and responsive behavior.
 */

export interface PublicNavbarItem {
  children?: Array<{
    id: string;
    title: string;
    url: string;
  }>;
  id: string;
  isActive?: boolean;
  onClick?: () => void;
  order?: number;
  title: string;
  url: string;
}

export interface PublicNavbarProps {
  items: PublicNavbarItem[];
  logo?: {
    src: string;
    alt: string;
    url?: string;
  };
  variant?: 'default' | 'transparent' | 'solid';
  currentPath?: string;
  className?: string;
}
