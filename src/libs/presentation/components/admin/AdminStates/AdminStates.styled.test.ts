/**
 * AdminStates Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  EmptyAction,
  EmptyContainer,
  EmptyIcon,
  EmptyMessage,
  EmptyTitle,
  ErrorAction,
  ErrorContainer,
  ErrorIcon,
  ErrorMessage,
  ErrorTitle,
  InfoMessage,
} from './AdminStates.styled';

describe('AdminStates Styled Components', () => {
  it('should export all styled components', () => {
    expect(EmptyContainer).toBeDefined();
    expect(EmptyIcon).toBeDefined();
    expect(EmptyTitle).toBeDefined();
    expect(EmptyMessage).toBeDefined();
    expect(EmptyAction).toBeDefined();
    expect(ErrorContainer).toBeDefined();
    expect(ErrorIcon).toBeDefined();
    expect(ErrorTitle).toBeDefined();
    expect(ErrorMessage).toBeDefined();
    expect(ErrorAction).toBeDefined();
    expect(InfoMessage).toBeDefined();
  });
});
