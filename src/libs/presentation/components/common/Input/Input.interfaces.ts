/**
 * Input Component Interfaces
 */

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel';

export interface InputProps {
  autoComplete?: string;
  disabled?: boolean;
  error?: string;
  fullWidth?: boolean;
  id: string;
  label?: string;
  name: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: InputType;
  value?: string;
}
