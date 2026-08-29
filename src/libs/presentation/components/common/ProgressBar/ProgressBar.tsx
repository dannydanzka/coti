/**
 * ProgressBar Component
 *
 * Animated progress bar for gamification elements.
 * Shows completion percentage with optional label.
 */

'use client';

import type { ProgressBarProps } from './ProgressBar.interfaces';

import {
  ProgressContainer,
  ProgressFill,
  ProgressHeader,
  ProgressLabel,
  ProgressPercentage,
  ProgressTrack,
} from './ProgressBar.styled';

export const ProgressBar = ({
  className,
  label,
  max = 100,
  showPercentage = true,
  size = 'medium',
  value,
  variant = 'default',
}: ProgressBarProps) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <ProgressContainer className={className}>
      {(label || showPercentage) && (
        <ProgressHeader>
          {label && <ProgressLabel>{label}</ProgressLabel>}
          {showPercentage && <ProgressPercentage>{percentage}%</ProgressPercentage>}
        </ProgressHeader>
      )}
      <ProgressTrack $size={size}>
        <ProgressFill $percentage={percentage} $variant={variant} />
      </ProgressTrack>
    </ProgressContainer>
  );
};
