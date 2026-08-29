/**
 * AdminSidebarFooter Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import { LogoutButton, LogoutText, SidebarFooter } from './AdminSidebarFooter.styled';

describe('AdminSidebarFooter Styled Components', () => {
  it('should export all styled components', () => {
    expect(SidebarFooter).toBeDefined();
    expect(LogoutButton).toBeDefined();
    expect(LogoutText).toBeDefined();
  });
});
