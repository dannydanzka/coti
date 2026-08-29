/**
 * LoginForm Component Tests
 *
 * Tests form structure and rendering.
 * Spanish locale mandatory.
 */

import {
  assertNoText,
  assertSelector,
  assertTestId,
  assertTexts,
  renderWithProviders,
} from '@testing';

import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = vi.fn();

  describe('Rendering', () => {
    it('renders form with all elements', () => {
      const { container } = renderWithProviders(<LoginForm onSubmit={mockOnSubmit} />);

      assertSelector(container, 'form');
      assertTestId('pop-button');
      assertTexts(['¿Olvidaste tu contraseña?', 'Crear una cuenta nueva', '¿No tienes cuenta?']);
    });
  });

  describe('Options', () => {
    it('hides forgot password when hideForgotPassword is true', () => {
      renderWithProviders(<LoginForm hideForgotPassword onSubmit={mockOnSubmit} />);

      assertNoText('¿Olvidaste tu contraseña?');
    });
  });
});
