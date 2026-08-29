/**
 * FormTextField Component
 * Reusable text input field with label and error handling.
 */

'use client';

import React, { useCallback } from 'react';

import type { FormTextFieldProps } from './FormTextField.interfaces';

import { Container, ErrorMessage, Input, Label } from './FormTextField.styled';

export const FormTextField: React.FC<FormTextFieldProps> = ({
  disabled = false,
  error = undefined,
  id = '',
  label = '',
  onChange = () => {},
  placeholder = '',
  required = false,
  type = 'text',
  value = '',
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Container>
      <Label htmlFor={id}>
        {label} {required && '*'}
      </Label>
      <Input
        $hasError={Boolean(error)}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};
