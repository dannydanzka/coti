/**
 * AppDrawer Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import { SidebarContainer, SidebarOverlay } from './AppDrawer.styled';

describe('AppDrawer Styled Components', () => {
  it('should export all styled components', () => {
    expect(SidebarContainer).toBeDefined();
    expect(SidebarOverlay).toBeDefined();
  });
});
