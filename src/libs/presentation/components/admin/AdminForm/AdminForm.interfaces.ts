/**
 * AdminForm Interfaces
 *
 * Type definitions for admin form components.
 */

import type { ChangeEvent, ReactNode } from 'react';

export interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

export interface FormLabelProps {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
  required?: boolean;
}

export interface FormInputProps {
  autoComplete?: string;
  className?: string;
  'data-field'?: string;
  'data-index'?: number;
  disabled?: boolean;
  id?: string;
  max?: string;
  maxLength?: number;
  min?: string;
  minLength?: number;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  step?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'datetime-local';
  value?: string;
}

export interface FormSelectProps {
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: FormSelectOption[];
  placeholder?: string;
  value?: string;
}

export interface FormSelectOption {
  disabled?: boolean;
  label: string;
  value: string;
}

export interface FormTextareaProps {
  className?: string;
  'data-field'?: string;
  disabled?: boolean;
  id?: string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  value?: string;
}

export interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

export interface FormActionsProps {
  children: ReactNode;
  className?: string;
}

export interface PasswordInputProps extends Omit<FormInputProps, 'type'> {
  disablePaste?: boolean;
  onToggleVisibility?: () => void;
  showPassword?: boolean;
}

export interface StyledFormLabelProps {
  $required?: boolean;
}

export interface FormCheckboxProps {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface FormRadioProps {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export interface FormRadioGroupProps {
  children: ReactNode;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export interface FormSwitchProps {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface StyledCheckboxWrapperProps {
  $disabled?: boolean;
}

export interface StyledRadioGroupProps {
  $direction?: 'horizontal' | 'vertical';
}

export interface StyledSwitchTrackProps {
  $checked?: boolean;
  $disabled?: boolean;
}

export interface FormFieldErrorProps {
  children: ReactNode;
  className?: string;
}
