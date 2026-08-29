/**
 * AdminForm Styled Components
 *
 * Form components for admin screens.
 */

'use client';

import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

import type {
  StyledCheckboxWrapperProps,
  StyledFormLabelProps,
  StyledRadioGroupProps,
  StyledSwitchTrackProps,
} from './AdminForm.interfaces';

export const FormGroup = styled.div`
  margin-bottom: ${spacing.sm};
`;

export const FormLabel = styled.label<StyledFormLabelProps>`
  color: ${color.textPrimary};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  margin-bottom: ${spacing.micro};

  ${({ $required }) =>
    $required &&
    `
    &::after {
      color: ${color.error};
      content: ' *';
    }
  `}
`;

export const FormInput = styled.input<{ $hasIcon?: boolean }>`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.xs};
  padding-right: ${({ $hasIcon }) => ($hasIcon ? '48px' : spacing.xs)};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &::placeholder {
    color: ${color.textTertiary};
  }

  &:hover:not(:disabled) {
    border-color: ${color.primary300};
  }

  &:focus {
    border-color: ${color.primary500};
    box-shadow: 0 0 0 3px ${color.primary100};
    outline: none;
  }

  &:disabled {
    background: ${color.neutral100};
    cursor: not-allowed;
  }
`;

export const FormSelect = styled.select`
  appearance: none;
  background-color: ${color.white};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M2.5 4.5L6 8l3.5-3.5'/%3E%3C/svg%3E");
  background-position: right ${spacing.xs} center;
  background-repeat: no-repeat;
  border: 1px solid ${color.border};
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.xs} ${spacing.md} ${spacing.xs} ${spacing.xs};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &:hover:not(:disabled) {
    border-color: ${color.primary300};
  }

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

export const FormOption = styled.option`
  background: ${color.white};
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
`;

export const FormTextarea = styled.textarea<{ $minHeight?: string }>`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: ${shape.md};
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  min-height: ${({ $minHeight }) => $minHeight ?? '100px'};
  padding: ${spacing.xs};
  resize: vertical;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  width: 100%;

  &::placeholder {
    color: ${color.textTertiary};
  }

  &:hover:not(:disabled) {
    border-color: ${color.primary300};
  }

  &:focus {
    border-color: ${color.primary500};
    box-shadow: 0 0 0 3px ${color.primary100};
    outline: none;
  }

  &:disabled {
    background: ${color.neutral100};
    cursor: not-allowed;
  }
`;

export const FormError = styled.p`
  color: ${color.errorDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  margin: ${spacing.xs} 0 0;
`;

export const FormActions = styled.div`
  display: flex;
  gap: ${spacing.sm};
  justify-content: flex-end;
  margin-top: ${spacing.md};
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${color.textTertiary};
  cursor: pointer;
  display: flex;
  padding: ${spacing.xs};
  position: absolute;
  right: ${spacing.micro};
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.2s ease;

  &:hover:not(:disabled) {
    color: ${color.textPrimary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const FormHint = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  margin: ${spacing.micro} 0 0;
`;

export const FormRow = styled.div`
  display: grid;
  gap: ${spacing.sm};
  grid-template-columns: repeat(2, 1fr);

  @media (width <= 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FormRow3 = styled(FormRow)`
  grid-template-columns: repeat(3, 1fr);

  @media (width <= 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (width <= 480px) {
    grid-template-columns: 1fr;
  }
`;

export const CheckboxWrapper = styled.label<StyledCheckboxWrapperProps>`
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  gap: ${spacing.xs};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  user-select: none;
`;

export const CheckboxInput = styled.input`
  appearance: none;
  background-color: ${color.white};
  border: 2px solid ${color.border};
  border-radius: ${shape.sm};
  cursor: inherit;
  height: ${spacing.sm};
  margin: 0;
  position: relative;
  transition: all 0.2s ease;
  width: ${spacing.sm};

  &:hover:not(:disabled) {
    border-color: ${color.primary400};
  }

  &:focus {
    border-color: ${color.primary500};
    box-shadow: 0 0 0 3px ${color.primary100};
    outline: none;
  }

  &:checked {
    background-color: ${color.primary500};
    border-color: ${color.primary500};
  }

  &:checked::after {
    border: solid ${color.white};
    border-width: 0 2px 2px 0;
    content: '';
    height: ${spacing.xs};
    left: ${spacing.micro};
    position: absolute;
    top: 2px;
    transform: rotate(45deg);
    width: ${spacing.micro};
  }

  &:disabled {
    background-color: ${color.neutral100};
    border-color: ${color.neutral300};
  }
`;

export const CheckboxLabel = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
`;

export const RadioGroup = styled.div<StyledRadioGroupProps>`
  display: flex;
  flex-direction: ${({ $direction }) => ($direction === 'horizontal' ? 'row' : 'column')};
  gap: ${({ $direction }) => ($direction === 'horizontal' ? spacing.sm : spacing.xs)};
`;

export const RadioWrapper = styled.label<StyledCheckboxWrapperProps>`
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  gap: ${spacing.xs};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  user-select: none;
`;

export const RadioInput = styled.input`
  appearance: none;
  background-color: ${color.white};
  border: 2px solid ${color.border};
  border-radius: ${shape.full};
  cursor: inherit;
  height: ${spacing.sm};
  margin: 0;
  position: relative;
  transition: all 0.2s ease;
  width: ${spacing.sm};

  &:hover:not(:disabled) {
    border-color: ${color.primary400};
  }

  &:focus {
    border-color: ${color.primary500};
    box-shadow: 0 0 0 3px ${color.primary100};
    outline: none;
  }

  &:checked {
    border-color: ${color.primary500};
  }

  &:checked::after {
    background-color: ${color.primary500};
    border-radius: ${shape.full};
    content: '';
    height: ${spacing.xs};
    left: 3px;
    position: absolute;
    top: 3px;
    width: ${spacing.xs};
  }

  &:disabled {
    background-color: ${color.neutral100};
    border-color: ${color.neutral300};
  }
`;

export const RadioLabel = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
`;

export const SwitchWrapper = styled.label<StyledCheckboxWrapperProps>`
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  gap: ${spacing.xs};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  user-select: none;
`;

export const SwitchInput = styled.input`
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
`;

export const SwitchTrack = styled.span<StyledSwitchTrackProps>`
  background-color: ${({ $checked }) => ($checked ? color.primary500 : color.neutral300)};
  border-radius: ${shape.full};
  display: inline-block;
  height: ${spacing.md};
  position: relative;
  transition: background-color 0.2s ease;
  width: ${spacing.xl};

  &::after {
    background-color: ${color.white};
    border-radius: ${shape.full};
    box-shadow: 0 1px 3px rgb(${color.neutral900} / 0.2);
    content: '';
    height: ${spacing.sm};
    left: ${({ $checked }) => ($checked ? '22px' : '2px')};
    position: absolute;
    top: 2px;
    transition: left 0.2s ease;
    width: ${spacing.sm};
  }

  ${({ $disabled }) =>
    $disabled &&
    `
    background-color: ${color.neutral200};
  `}
`;

export const SwitchLabel = styled.span`
  color: ${color.textPrimary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
`;

export const FormFieldError = styled.span`
  color: ${color.errorDark};
  display: block;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  margin-top: ${spacing.micro};
`;

export const FormButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
`;
