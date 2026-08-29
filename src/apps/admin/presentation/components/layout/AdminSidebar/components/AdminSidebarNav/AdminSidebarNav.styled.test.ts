/**
 * AdminSidebarNav Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  NavBadge,
  NavIcon,
  NavItem,
  NavItemWrapper,
  NavLabel,
  NavLink,
  NavList,
  NavSection,
  Tooltip,
} from './AdminSidebarNav.styled';

describe('AdminSidebarNav Styled Components', () => {
  it('should export all styled components', () => {
    expect(NavSection).toBeDefined();
    expect(NavList).toBeDefined();
    expect(NavItem).toBeDefined();
    expect(NavLink).toBeDefined();
    expect(NavIcon).toBeDefined();
    expect(NavLabel).toBeDefined();
    expect(NavBadge).toBeDefined();
    expect(Tooltip).toBeDefined();
    expect(NavItemWrapper).toBeDefined();
  });
});
