/**
 * Badge Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  StyledAvailabilityBadge,
  StyledDeliveryStatusBadge,
  StyledEventStatusBadge,
  StyledMessageStatusBadge,
  StyledPaymentStatusBadge,
  StyledRoleBadge,
  StyledShippingTypeBadge,
  StyledStatusBadge,
  StyledTypeBadge,
} from './Badge.styled';

describe('Badge Styled Components', () => {
  it('should export all styled components', () => {
    expect(StyledRoleBadge).toBeDefined();
    expect(StyledStatusBadge).toBeDefined();
    expect(StyledTypeBadge).toBeDefined();
    expect(StyledEventStatusBadge).toBeDefined();
    expect(StyledPaymentStatusBadge).toBeDefined();
    expect(StyledMessageStatusBadge).toBeDefined();
    expect(StyledDeliveryStatusBadge).toBeDefined();
    expect(StyledAvailabilityBadge).toBeDefined();
    expect(StyledShippingTypeBadge).toBeDefined();
  });
});
