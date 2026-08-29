/**
 * RegistrarAporteModal Styled Components
 */

'use client';

import styled from 'styled-components';

import { spacing } from '@constants';

export const AporteFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const ModalFooterActions = styled.div`
  display: flex;
  gap: ${spacing.xs};
  justify-content: flex-end;
`;
