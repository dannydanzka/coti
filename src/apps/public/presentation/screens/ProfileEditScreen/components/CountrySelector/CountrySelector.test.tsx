/**
 * CountrySelector Component Tests
 *
 * Tests searchable country dropdown rendering.
 * Spanish locale mandatory.
 */

import { assertRole, renderWithProviders, screen } from '@testing';

import { CountrySelector } from './CountrySelector';

const defaultProps = {
  onChange: vi.fn(),
  value: '',
};

describe('CountrySelector', () => {
  it('renders input field', () => {
    renderWithProviders(<CountrySelector {...defaultProps} />);
    assertRole('textbox');
  });

  it('renders with initial value', () => {
    renderWithProviders(<CountrySelector {...defaultProps} value='México' />);
    expect(screen.getByDisplayValue('México')).toBeInTheDocument();
  });

  it('renders component', () => {
    renderWithProviders(<CountrySelector {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeVisible();
  });
});
