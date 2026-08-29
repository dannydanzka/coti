/**
 * AdminSidebarHeader Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  MobileCloseButton,
  RoleBadge,
  RoleLabel,
  SidebarHeader,
  UserAvatar,
  UserEmail,
  UserInfo,
  UserName,
  UserSection,
} from './AdminSidebarHeader.styled';

describe('AdminSidebarHeader Styled Components', () => {
  it('should export all styled components', () => {
    expect(SidebarHeader).toBeDefined();
    expect(UserSection).toBeDefined();
    expect(UserAvatar).toBeDefined();
    expect(UserInfo).toBeDefined();
    expect(UserName).toBeDefined();
    expect(UserEmail).toBeDefined();
    expect(RoleBadge).toBeDefined();
    expect(RoleLabel).toBeDefined();
    expect(MobileCloseButton).toBeDefined();
  });
});
