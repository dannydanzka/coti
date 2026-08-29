/**
 * Tabs Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import { TabBadge, TabButton, TabContent, TabList, TabsContainer } from './Tabs.styled';

describe('Tabs Styled Components', () => {
  it('should export all styled components', () => {
    expect(TabsContainer).toBeDefined();
    expect(TabList).toBeDefined();
    expect(TabButton).toBeDefined();
    expect(TabBadge).toBeDefined();
    expect(TabContent).toBeDefined();
  });
});
