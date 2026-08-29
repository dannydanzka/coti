/**
 * AdminForm Components
 *
 * Reusable form components for admin screens.
 */

'use client';

import type { ClipboardEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import type {
  FormActionsProps,
  FormCheckboxProps,
  FormErrorProps,
  FormFieldErrorProps,
  FormGroupProps,
  FormInputProps,
  FormLabelProps,
  FormRadioGroupProps,
  FormRadioProps,
  FormSelectProps,
  FormSwitchProps,
  FormTextareaProps,
  PasswordInputProps,
} from './AdminForm.interfaces';

import {
  CheckboxInput,
  CheckboxLabel,
  CheckboxWrapper,
  FormActions as StyledFormActions,
  FormError as StyledFormError,
  FormFieldError as StyledFormFieldError,
  FormGroup as StyledFormGroup,
  FormInput as StyledFormInput,
  FormLabel as StyledFormLabel,
  FormOption,
  FormSelect as StyledFormSelect,
  FormTextarea as StyledFormTextarea,
  PasswordInputWrapper,
  PasswordToggle,
  RadioGroup as StyledRadioGroup,
  RadioInput,
  RadioLabel,
  RadioWrapper,
  SwitchInput,
  SwitchLabel,
  SwitchTrack,
  SwitchWrapper,
} from './AdminForm.styled';

export const AdminFormGroup = ({ children, className }: FormGroupProps) => (
  <StyledFormGroup className={className}>{children}</StyledFormGroup>
);

export const AdminFormLabel = ({
  children,
  className,
  htmlFor,
  required = false,
}: FormLabelProps) => (
  <StyledFormLabel $required={required} className={className} htmlFor={htmlFor}>
    {children}
  </StyledFormLabel>
);

export const AdminFormInput = ({
  autoComplete,
  className,
  'data-field': dataField,
  'data-index': dataIndex,
  disabled = false,
  id,
  max,
  maxLength,
  min,
  minLength,
  name,
  onChange,
  placeholder,
  step,
  type = 'text',
  value,
}: FormInputProps) => (
  <StyledFormInput
    autoComplete={autoComplete}
    className={className}
    data-field={dataField}
    data-index={dataIndex}
    disabled={disabled}
    id={id}
    max={max}
    maxLength={maxLength}
    min={min}
    minLength={minLength}
    name={name}
    placeholder={placeholder}
    step={step}
    type={type}
    value={value}
    onChange={onChange}
  />
);

export const AdminFormSelect = ({
  className,
  disabled = false,
  id,
  name,
  onChange,
  options,
  placeholder,
  value,
}: FormSelectProps) => (
  <StyledFormSelect
    className={className}
    disabled={disabled}
    id={id}
    name={name}
    value={value}
    onChange={onChange}
  >
    {placeholder && <FormOption value=''>{placeholder}</FormOption>}
    {options.map((option) => (
      <FormOption disabled={option.disabled} key={option.value} value={option.value}>
        {option.label}
      </FormOption>
    ))}
  </StyledFormSelect>
);

export const AdminFormTextarea = ({
  className,
  'data-field': dataField,
  disabled = false,
  id,
  maxLength,
  minLength,
  name,
  onChange,
  placeholder,
  rows = 4,
  value,
}: FormTextareaProps) => (
  <StyledFormTextarea
    className={className}
    data-field={dataField}
    disabled={disabled}
    id={id}
    maxLength={maxLength}
    minLength={minLength}
    name={name}
    placeholder={placeholder}
    rows={rows}
    value={value}
    onChange={onChange}
  />
);

export const AdminFormError = ({ children, className }: FormErrorProps) => (
  <StyledFormError className={className}>{children}</StyledFormError>
);

export const AdminFormActions = ({ children, className }: FormActionsProps) => (
  <StyledFormActions className={className}>{children}</StyledFormActions>
);

const preventPaste = (e: ClipboardEvent<HTMLInputElement>) => e.preventDefault();

export const AdminPasswordInput = ({
  autoComplete,
  className,
  disabled = false,
  disablePaste = false,
  id,
  name,
  onChange,
  onToggleVisibility,
  placeholder,
  showPassword = false,
  value,
}: PasswordInputProps) => (
  <PasswordInputWrapper>
    <StyledFormInput
      $hasIcon
      autoComplete={autoComplete}
      className={className}
      disabled={disabled}
      id={id}
      name={name}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      onPaste={disablePaste ? preventPaste : undefined}
    />
    {onToggleVisibility && (
      <PasswordToggle disabled={disabled} type='button' onClick={onToggleVisibility}>
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </PasswordToggle>
    )}
  </PasswordInputWrapper>
);

export const AdminFormCheckbox = ({
  checked = false,
  className,
  disabled = false,
  id,
  label,
  name,
  onChange,
}: FormCheckboxProps) => (
  <CheckboxWrapper $disabled={disabled} className={className}>
    <CheckboxInput
      checked={checked}
      disabled={disabled}
      id={id}
      name={name}
      type='checkbox'
      onChange={onChange}
    />
    {label && <CheckboxLabel>{label}</CheckboxLabel>}
  </CheckboxWrapper>
);

export const AdminFormRadioGroup = ({
  children,
  className,
  direction = 'vertical',
}: FormRadioGroupProps) => (
  <StyledRadioGroup $direction={direction} className={className}>
    {children}
  </StyledRadioGroup>
);

export const AdminFormRadio = ({
  checked = false,
  className,
  disabled = false,
  id,
  label,
  name,
  onChange,
  value,
}: FormRadioProps) => (
  <RadioWrapper $disabled={disabled} className={className}>
    <RadioInput
      checked={checked}
      disabled={disabled}
      id={id}
      name={name}
      type='radio'
      value={value}
      onChange={onChange}
    />
    {label && <RadioLabel>{label}</RadioLabel>}
  </RadioWrapper>
);

export const AdminFormSwitch = ({
  checked = false,
  className,
  disabled = false,
  id,
  label,
  name,
  onChange,
}: FormSwitchProps) => (
  <SwitchWrapper $disabled={disabled} className={className}>
    <SwitchInput
      checked={checked}
      disabled={disabled}
      id={id}
      name={name}
      type='checkbox'
      onChange={onChange}
    />
    <SwitchTrack $checked={checked} $disabled={disabled} />
    {label && <SwitchLabel>{label}</SwitchLabel>}
  </SwitchWrapper>
);

export const AdminFormFieldError = ({ children, className }: FormFieldErrorProps) => (
  <StyledFormFieldError className={className}>{children}</StyledFormFieldError>
);

export {
  CheckboxInput,
  CheckboxLabel,
  CheckboxWrapper,
  FormActions,
  FormButtonGroup,
  FormError,
  FormFieldError,
  FormGroup,
  FormHint,
  FormInput,
  FormLabel,
  FormOption,
  FormRow,
  FormRow3,
  FormSelect,
  FormTextarea,
  PasswordInputWrapper,
  PasswordToggle,
  RadioGroup,
  RadioInput,
  RadioLabel,
  RadioWrapper,
  SwitchInput,
  SwitchLabel,
  SwitchTrack,
  SwitchWrapper,
} from './AdminForm.styled';
