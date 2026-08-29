import {
  CloseButton,
  DrawerContainer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  LogoutButton,
  NavBadge,
  NavItem,
  NavLinkStyled,
  NavList,
  NavSection,
  RoleBadge,
  RoleLabel,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  UserSection,
} from './AdminDrawer.styled';

describe('AdminDrawer Styled Components', () => {
  it('DrawerOverlay está definido', () => {
    expect(DrawerOverlay).toBeDefined();
  });

  it('DrawerContainer está definido', () => {
    expect(DrawerContainer).toBeDefined();
  });

  it('DrawerHeader está definido', () => {
    expect(DrawerHeader).toBeDefined();
  });

  it('CloseButton está definido', () => {
    expect(CloseButton).toBeDefined();
  });

  it('UserSection está definido', () => {
    expect(UserSection).toBeDefined();
  });

  it('UserAvatar está definido', () => {
    expect(UserAvatar).toBeDefined();
  });

  it('UserInfo está definido', () => {
    expect(UserInfo).toBeDefined();
  });

  it('UserName está definido', () => {
    expect(UserName).toBeDefined();
  });

  it('exporta todos los componentes styled', () => {
    expect(DrawerOverlay).toBeDefined();
    expect(DrawerContainer).toBeDefined();
    expect(DrawerHeader).toBeDefined();
    expect(CloseButton).toBeDefined();
    expect(UserSection).toBeDefined();
    expect(UserAvatar).toBeDefined();
    expect(UserInfo).toBeDefined();
    expect(UserName).toBeDefined();
    expect(UserRole).toBeDefined();
    expect(RoleBadge).toBeDefined();
    expect(RoleLabel).toBeDefined();
    expect(NavSection).toBeDefined();
    expect(NavList).toBeDefined();
    expect(NavItem).toBeDefined();
    expect(NavLinkStyled).toBeDefined();
    expect(NavBadge).toBeDefined();
    expect(DrawerFooter).toBeDefined();
    expect(LogoutButton).toBeDefined();
  });
});
