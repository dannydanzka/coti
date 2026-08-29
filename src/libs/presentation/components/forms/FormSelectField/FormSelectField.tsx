/**
 * FormSelectField Component
 * Reusable select field with label and error handling.
 */

'use client';

import React, { useCallback } from 'react';

import type { FormSelectFieldProps } from './FormSelectField.interfaces';

import { Container, ErrorMessage, Label, Option, Select } from './FormSelectField.styled';

export const FormSelectField: React.FC<FormSelectFieldProps> = ({
  disabled = false,
  error = undefined,
  id = '',
  label = '',
  onChange = () => {},
  options = [],
  required = false,
  value = '',
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Container>
      <Label htmlFor={id}>
        {label} {required && '*'}
      </Label>
      <Select
        $hasError={Boolean(error)}
        disabled={disabled}
        id={id}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};
