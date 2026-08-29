/**
 * FormTextareaField Component
 * Reusable textarea field with label and error handling.
 */

'use client';

import React, { useCallback } from 'react';

import type { FormTextareaFieldProps } from './FormTextareaField.interfaces';

import { Container, ErrorMessage, Label, Textarea } from './FormTextareaField.styled';

export const FormTextareaField: React.FC<FormTextareaFieldProps> = ({
  disabled = false,
  error = undefined,
  id = '',
  label = '',
  onChange = () => {},
  placeholder = '',
  required = false,
  rows = 3,
  value = '',
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Container>
      <Label htmlFor={id}>
        {label} {required && '*'}
      </Label>
      <Textarea
        $hasError={Boolean(error)}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};
