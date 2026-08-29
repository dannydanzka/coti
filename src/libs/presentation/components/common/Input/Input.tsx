/**
 * Input Component
 *
 * Text input with label, error state, and validation.
 * Password inputs include toggle visibility button.
 */

'use client';

import type { ChangeEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { InputProps } from './Input.interfaces';

import {
  InputContainer,
  InputError,
  InputLabel,
  InputRequired,
  InputWrapper,
  PasswordToggle,
  StyledInput,
} from './Input.styled';

export const Input = ({
  autoComplete,
  disabled = false,
  error,
  fullWidth = false,
  id,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  value,
}: InputProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.value);
      }
    },
    [onChange]
  );

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <InputWrapper $fullWidth={fullWidth}>
      {label && (
        <InputLabel htmlFor={id}>
          {label}
          {required && <InputRequired>*</InputRequired>}
        </InputLabel>
      )}

      <InputContainer>
        <StyledInput
          $hasError={Boolean(error)}
          $hasToggle={isPassword}
          autoComplete={autoComplete}
          disabled={disabled}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          type={inputType}
          value={value}
          onChange={handleChange}
        />
        {isPassword && (
          <PasswordToggle
            aria-label={
              showPassword ? t('components.input.hidePassword') : t('components.input.showPassword')
            }
            type='button'
            onClick={handleTogglePassword}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </PasswordToggle>
        )}
      </InputContainer>

      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};
