/**
 * PublicForm Styled Components
 *
 * Form components for public-facing pages.
 */

'use client';

import styled, { css } from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type {
  StyledPublicFormInputProps,
  StyledPublicFormLabelProps,
  StyledPublicFormMessageProps,
} from './PublicForm.interfaces';

export const PublicForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const PublicFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const PublicFormLabel = styled.label<StyledPublicFormLabelProps>`
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};

  ${({ $required }) =>
    $required &&
    css`
      &::after {
        color: ${color.error};
        content: ' *';
      }
    `}
`;

export const PublicFormInput = styled.input<StyledPublicFormInputProps>`
  background-color: ${color.white};
  border: 1px solid ${({ $hasError }) => ($hasError ? color.error : color.neutral300)};
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  min-height: ${spacing.xl};
  padding: ${spacing.sm} ${spacing.sm};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &:focus {
    border-color: ${color.primary500};
    box-shadow: 0 0 0 3px ${color.primary100};
    outline: none;
  }

  &::placeholder {
    color: ${color.neutral400};
  }

  &:disabled {
    background-color: ${color.neutral100};
    cursor: not-allowed;
  }
`;

export const PublicFormTextarea = styled.textarea<StyledPublicFormInputProps>`
  background-color: ${color.white};
  border: 1px solid ${({ $hasError }) => ($hasError ? color.error : color.neutral300)};
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  min-height: 120px;
  padding: ${spacing.sm} ${spacing.sm};
  resize: vertical;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &:focus {
    border-color: ${color.primary500};
    box-shadow: 0 0 0 3px ${color.primary100};
    outline: none;
  }

  &::placeholder {
    color: ${color.neutral400};
  }

  &:disabled {
    background-color: ${color.neutral100};
    cursor: not-allowed;
  }
`;

export const PublicFormSelect = styled.select<StyledPublicFormInputProps>`
  appearance: none;
  background-color: ${color.white};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M2.5 4.5L6 8l3.5-3.5'/%3E%3C/svg%3E");
  background-position: right ${spacing.sm} center;
  background-repeat: no-repeat;
  border: 1px solid ${({ $hasError }) => ($hasError ? color.error : color.neutral300)};
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.base};
  min-height: ${spacing.xl};
  padding: ${spacing.sm} ${spacing.lg} ${spacing.sm} ${spacing.sm};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &:focus {
    border-color: ${color.primary500};
    box-shadow: 0 0 0 3px ${color.primary100};
    outline: none;
  }

  &:disabled {
    background-color: ${color.neutral100};
    cursor: not-allowed;
  }
`;

const getMessageStyles = (variant?: StyledPublicFormMessageProps['$variant']) => {
  switch (variant) {
    case 'success':
      return css`
        background-color: ${color.successLight};
        border-color: ${color.successDark};
        color: ${color.successDark};
      `;
    case 'warning':
      return css`
        background-color: ${color.warningLight};
        border-color: ${color.warningDark};
        color: ${color.warningDark};
      `;
    case 'info':
      return css`
        background-color: ${color.infoLight};
        border-color: ${color.infoDark};
        color: ${color.infoDark};
      `;
    case 'error':
    case undefined:
      return css`
        background-color: ${color.errorLight};
        border-color: ${color.errorDark};
        color: ${color.errorDark};
      `;
  }
};

export const PublicFormMessage = styled.div<StyledPublicFormMessageProps>`
  border: 1px solid;
  border-radius: ${shape.md};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.sm};
  text-align: center;
  ${({ $variant }) => getMessageStyles($variant)}
`;

export const PublicFormError = styled.span`
  color: ${color.errorDark};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  margin-top: ${spacing.micro};
`;

export const PublicFormHint = styled.span`
  color: ${color.textSecondary};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  margin-top: ${spacing.micro};
`;

export const PublicFormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-top: ${spacing.xs};
`;

export const PublicFormRow = styled.div`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(2, 1fr);

  @media (width <= 600px) {
    grid-template-columns: 1fr;
  }
`;
