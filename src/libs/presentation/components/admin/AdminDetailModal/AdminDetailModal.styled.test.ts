/**
 * AdminDetailModal Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  DetailAmount,
  DetailAmountLarge,
  DetailContentBox,
  DetailDivider,
  DetailInfoGrid,
  DetailLabel,
  DetailMediaContainer,
  DetailRow,
  DetailSection,
  DetailValue,
  DetailValueMono,
} from './AdminDetailModal.styled';

describe('AdminDetailModal Styled Components', () => {
  it('should export all styled components', () => {
    expect(DetailSection).toBeDefined();
    expect(DetailLabel).toBeDefined();
    expect(DetailValue).toBeDefined();
    expect(DetailValueMono).toBeDefined();
    expect(DetailRow).toBeDefined();
    expect(DetailDivider).toBeDefined();
    expect(DetailAmount).toBeDefined();
    expect(DetailAmountLarge).toBeDefined();
    expect(DetailContentBox).toBeDefined();
    expect(DetailInfoGrid).toBeDefined();
    expect(DetailMediaContainer).toBeDefined();
  });
});
