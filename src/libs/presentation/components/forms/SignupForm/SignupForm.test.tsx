/**
 * SignupForm Component Tests
 *
 * Tests form rendering and fields.
 * Spanish locale mandatory.
 */

import { assertTexts, renderWithProviders } from '@testing';

import { SignupForm } from './SignupForm';

describe('SignupForm', () => {
  it('renders form elements', () => {
    renderWithProviders(<SignupForm onSubmit={vi.fn()} />);
    assertTexts([/crea tu cuenta/i, /crear cuenta/i, /iniciar sesión/i]);
  });
});
