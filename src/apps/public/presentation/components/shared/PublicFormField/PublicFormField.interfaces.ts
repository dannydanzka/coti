/**
 * PublicFormField Interfaces
 *
 * Reusable form field component for all Public/Participant screens.
 */

export interface PublicFormFieldProps {
  disabled?: boolean;
  id: string;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email';
  label: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'email' | 'tel' | 'password';
  value: string;
}
