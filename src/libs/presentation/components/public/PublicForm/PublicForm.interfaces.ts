/**
 * PublicForm Interfaces
 *
 * Types for public form components.
 */

export interface StyledPublicFormLabelProps {
  $required?: boolean;
}

export interface StyledPublicFormInputProps {
  $hasError?: boolean;
}

export interface StyledPublicFormMessageProps {
  $variant?: 'error' | 'success' | 'info' | 'warning';
}
