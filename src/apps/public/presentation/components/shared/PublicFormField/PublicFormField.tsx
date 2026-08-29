/**
 * PublicFormField Component
 *
 * Reusable form field for all Public/Participant screens.
 * Includes label with character counter, styled input.
 *
 * Usage:
 * <PublicFormField
 *   id='firstName'
 *   label='Nombre'
 *   maxLength={FIELD_LIMITS.FIRST_NAME}
 *   required
 *   value={firstName}
 *   onChange={handleChange}
 * />
 */

'use client';

import type { PublicFormFieldProps } from './PublicFormField.interfaces';

import {
  CharCount,
  FormGroup,
  Input,
  Label,
  LabelText,
  RequiredAsterisk,
} from './PublicFormField.styled';

export const PublicFormField = ({
  disabled = false,
  id,
  inputMode,
  label,
  maxLength,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  value,
}: PublicFormFieldProps) => (
  <FormGroup>
    <Label htmlFor={id}>
      <LabelText>
        {label}
        {required && <RequiredAsterisk>*</RequiredAsterisk>}
      </LabelText>
      {maxLength && (
        <CharCount>
          {value.length}/{maxLength}
        </CharCount>
      )}
    </Label>
    <Input
      disabled={disabled}
      id={id}
      inputMode={inputMode}
      maxLength={maxLength}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  </FormGroup>
);
