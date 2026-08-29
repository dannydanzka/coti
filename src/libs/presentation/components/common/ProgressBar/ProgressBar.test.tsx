import { assertNoText, assertText, renderWithProviders } from '@testing';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with default props', () => {
    renderWithProviders(<ProgressBar value={50} />);
    assertText('50%');
  });

  it('renders with label', () => {
    renderWithProviders(<ProgressBar label='Progreso' value={75} />);
    assertText('Progreso');
    assertText('75%');
  });

  it('hides percentage when showPercentage is false', () => {
    renderWithProviders(<ProgressBar showPercentage={false} value={50} />);
    assertNoText('50%');
  });

  it('renders with custom max', () => {
    renderWithProviders(<ProgressBar max={200} value={100} />);
    assertText('50%');
  });

  it('handles zero max', () => {
    renderWithProviders(<ProgressBar max={0} value={50} />);
    assertText('0%');
  });

  it('renders without label and without percentage', () => {
    renderWithProviders(<ProgressBar label='' showPercentage={false} value={50} />);
    assertNoText('50%');
  });

  it('renders with size and variant', () => {
    renderWithProviders(<ProgressBar size='small' value={30} variant='success' />);
    assertText('30%');
  });
});
