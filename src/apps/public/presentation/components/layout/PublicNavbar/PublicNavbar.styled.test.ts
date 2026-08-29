/**
 * PublicNavbar Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  DropdownContainer,
  LogoContainer,
  LogoImageWrapper,
  LogoLink,
  LogoText,
  NavContent,
  NavItem,
  NavLink,
  NavMenu,
  PublicNavbarContainer,
} from './PublicNavbar.styled';

describe('PublicNavbar Styled Components', () => {
  it('should export all styled components', () => {
    expect(PublicNavbarContainer).toBeDefined();
    expect(NavContent).toBeDefined();
    expect(LogoContainer).toBeDefined();
    expect(LogoLink).toBeDefined();
    expect(LogoImageWrapper).toBeDefined();
    expect(LogoText).toBeDefined();
    expect(NavMenu).toBeDefined();
    expect(NavItem).toBeDefined();
    expect(NavLink).toBeDefined();
    expect(DropdownContainer).toBeDefined();
  });
});
