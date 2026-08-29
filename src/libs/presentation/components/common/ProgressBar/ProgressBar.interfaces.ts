/**
 * ProgressBar Component Interfaces
 */

export interface ProgressBarProps {
  className?: string;
  label?: string;
  max?: number;
  showPercentage?: boolean;
  size?: 'small' | 'medium' | 'large';
  value: number;
  variant?: 'default' | 'success' | 'warning';
}
