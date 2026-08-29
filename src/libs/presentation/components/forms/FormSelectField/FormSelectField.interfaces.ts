/**
 * FormSelectField Interfaces
 * Type definitions for the select field component.
 */
export interface FormSelectFieldOption {
  label: string;
  value: string;
}

export interface FormSelectFieldProps {
  disabled?: boolean;
  error?: string | undefined;
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: FormSelectFieldOption[];
  required?: boolean;
  value: string;
}
