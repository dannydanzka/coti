/**
 * FormTextareaField Interfaces
 * Type definitions for the textarea field component.
 */
export interface FormTextareaFieldProps {
  disabled?: boolean;
  error?: string | undefined;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  value: string;
}
