/**
 * FormTextField Styled Components
 * Styled components for the text field.
 */
import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  width: 100%;
`;

export const Label = styled.label`
  color: ${color.neutral700};
  font-size: ${typography.size.sm};
  font-weight: 500;
`;

export const Input = styled.input<{ $hasError: boolean }>`
  background-color: ${color.neutral0};
  border: 1px solid ${({ $hasError }) => ($hasError ? color.error : color.neutral300)};
  border-radius: ${shape.sm};
  color: ${color.neutral900};
  font-size: ${typography.size.base};
  padding: ${spacing.sm} ${spacing.md};
  transition: border-color 0.2s ease-in-out;
  width: 100%;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? color.error : color.primary500)};
    outline: none;
  }

  &:disabled {
    background-color: ${color.neutral100};
    color: ${color.neutral500};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${color.neutral400};
  }
`;

export const ErrorMessage = styled.span`
  color: ${color.error};
  font-size: ${typography.size.sm};
`;
