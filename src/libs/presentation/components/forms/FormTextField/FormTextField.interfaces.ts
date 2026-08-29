/**
 * FormTextField Interfaces
 * Type definitions for the text field component.
 */
export interface FormTextFieldProps {
  disabled?: boolean;
  error?: string | undefined;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'email' | 'password' | 'text';
  value: string;
}
