/**
 * PublicNavbar.parts Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  DropdownIcon,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  MobileMenuToggle,
} from './PublicNavbar.parts.styled';

describe('PublicNavbar.parts Styled Components', () => {
  it('should export all styled components', () => {
    expect(DropdownTrigger).toBeDefined();
    expect(DropdownIcon).toBeDefined();
    expect(DropdownMenu).toBeDefined();
    expect(DropdownItem).toBeDefined();
    expect(MobileMenuToggle).toBeDefined();
  });
});
