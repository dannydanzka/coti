/**
 * AdminModalFooter Styled Components
 *
 * Consistent styling for modal footers with action buttons.
 */

'use client';

import styled from 'styled-components';

import { spacing } from '@constants';

export const ModalFooter = styled.div`
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;
  margin-top: ${spacing.md};
`;

export const ModalFooterLeft = styled.div`
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-start;
  margin-top: ${spacing.md};
`;

export const ModalFooterSpaceBetween = styled.div`
  display: flex;
  gap: ${spacing.sm};
  justify-content: space-between;
  margin-top: ${spacing.md};
`;
