/**
 * AppDrawerHeader Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  MobileCloseButton,
  SidebarHeader,
  UserAvatar,
  UserEmail,
  UserInfo,
  UserName,
  UserSection,
} from './AppDrawerHeader.styled';

describe('AppDrawerHeader Styled Components', () => {
  it('should export all styled components', () => {
    expect(SidebarHeader).toBeDefined();
    expect(UserSection).toBeDefined();
    expect(UserAvatar).toBeDefined();
    expect(UserInfo).toBeDefined();
    expect(UserName).toBeDefined();
    expect(UserEmail).toBeDefined();
    expect(MobileCloseButton).toBeDefined();
  });
});
