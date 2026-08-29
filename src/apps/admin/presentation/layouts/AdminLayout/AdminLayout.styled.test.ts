import {
  HiddenToggleButton,
  LayoutContainer,
  LoadingMessage,
  LogoIcon,
  LogoText,
  MainContent,
  MenuToggle,
  NavIcon,
  NavItem,
  NavItemText,
  Overlay,
  PageContent,
  Sidebar,
  SidebarHeader,
  SidebarLogo,
  SidebarNav,
  TopBar,
  TopBarLeft,
  TopBarRight,
  UserAvatar,
  UserContainer,
  UserInfo,
  UserMenu,
  UserName,
  UserRole,
} from './AdminLayout.styled';

describe('AdminLayout Styled Components', () => {
  it('LayoutContainer está definido', () => {
    expect(LayoutContainer).toBeDefined();
  });

  it('Sidebar está definido', () => {
    expect(Sidebar).toBeDefined();
  });

  it('SidebarHeader está definido', () => {
    expect(SidebarHeader).toBeDefined();
  });

  it('SidebarLogo está definido', () => {
    expect(SidebarLogo).toBeDefined();
  });

  it('LogoText está definido', () => {
    expect(LogoText).toBeDefined();
  });

  it('SidebarNav está definido', () => {
    expect(SidebarNav).toBeDefined();
  });

  it('NavItem está definido', () => {
    expect(NavItem).toBeDefined();
  });

  it('NavItemText está definido', () => {
    expect(NavItemText).toBeDefined();
  });

  it('exporta todos los componentes styled', () => {
    expect(LayoutContainer).toBeDefined();
    expect(Sidebar).toBeDefined();
    expect(SidebarHeader).toBeDefined();
    expect(SidebarLogo).toBeDefined();
    expect(LogoText).toBeDefined();
    expect(SidebarNav).toBeDefined();
    expect(NavItem).toBeDefined();
    expect(NavItemText).toBeDefined();
    expect(MainContent).toBeDefined();
    expect(TopBar).toBeDefined();
    expect(TopBarLeft).toBeDefined();
    expect(MenuToggle).toBeDefined();
    expect(TopBarRight).toBeDefined();
    expect(UserMenu).toBeDefined();
    expect(UserInfo).toBeDefined();
    expect(UserAvatar).toBeDefined();
    expect(PageContent).toBeDefined();
    expect(Overlay).toBeDefined();
    expect(LogoIcon).toBeDefined();
    expect(NavIcon).toBeDefined();
    expect(UserContainer).toBeDefined();
    expect(UserName).toBeDefined();
    expect(UserRole).toBeDefined();
    expect(HiddenToggleButton).toBeDefined();
    expect(LoadingMessage).toBeDefined();
  });
});
