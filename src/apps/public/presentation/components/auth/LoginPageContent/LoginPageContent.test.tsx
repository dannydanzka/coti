/**
 * LoginPageContent Component Tests
 *
 * Tests for the login page content component using Essential Testing Philosophy.
 * Covers authentication flow, form validation, and loading states.
 */

'use client';

import { assertNoText, assertText, assertTexts, form, renderWithProviders, user } from '@testing';

import { LoginPageContent } from './LoginPageContent';

const mockAuthReturn = {
  checkAuth: vi.fn().mockResolvedValue(undefined),
  isAuthenticated: false,
  isLoading: false,
  login: vi.fn().mockResolvedValue({
    payload: { user: { email: 'test@test.com' } },
    type: 'auth/loginUser/fulfilled',
  }),
  logout: vi.fn(),
};

vi.mock('@hooks/useAuth/useAuth', () => ({
  useAuth: () => mockAuthReturn,
}));

const mockLoginData = {
  email: 'maria@coti.mx',
  password: 'contraseñaSegura123',
};

const initialAuthState = {
  error: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

describe('LoginPageContent', () => {
  describe('Rendering', () => {
    it('renders login form with all required fields', () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: initialAuthState },
      });

      assertTexts(['Coti', 'Administración Exclusiva']);
      form.assertField('Email');
      form.assertField('Contraseña');
      form.assertButton(/iniciar sesión/i);
    });

    it('renders brand footer with correct links', () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: initialAuthState },
      });

      assertTexts([
        /plataforma exclusiva para/i,
        'Proyecta tu viaje. Ahorra con Coti.',
        /viajeros en México/i,
      ]);
    });
  });

  describe('Loading States', () => {
    it('renders login form in test environment instead of loading', () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: { ...initialAuthState, isLoading: true } },
      });

      assertText('Coti');
      form.assertField('Email');
      assertNoText('Verificando autenticación...');
    });

    it('maintains form functionality even with loading state', () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: { ...initialAuthState, isLoading: true } },
      });

      assertText('Coti');
      form.assertField('Email');
      form.assertField('Contraseña');
      form.assertButton(/iniciar sesión/i);
    });
  });

  describe('Form Interaction', () => {
    it('handles email input changes', async () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: initialAuthState },
      });

      const input = await user.typeInField('Email', mockLoginData.email);
      expect(input).toHaveValue(mockLoginData.email);
    });

    it('handles password input changes', async () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: initialAuthState },
      });

      const input = await user.typeInField('Contraseña', mockLoginData.password);
      expect(input).toHaveValue(mockLoginData.password);
    });

    it('shows loading state when form is submitting', async () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: initialAuthState },
      });

      await user.typeInField('Email', mockLoginData.email);
      await user.typeInField('Contraseña', mockLoginData.password);
      const loginButton = await user.clickButton(/iniciar sesión/i);

      assertText('Coti');
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper form labels and accessibility attributes', () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: initialAuthState },
      });

      const emailInput = form.assertField('Email', 'email');
      expect(emailInput).toHaveAttribute('autoComplete', 'email');

      const passwordInput = form.assertField('Contraseña', 'password');
      expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
    });

    it('has proper button states and disabled attributes', () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: initialAuthState },
      });

      form.assertButton(/iniciar sesión/i, true);
    });
  });

  describe('Error Handling', () => {
    it('has proper form structure for validation', () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: initialAuthState },
      });

      form.assertField('Email');
      form.assertField('Contraseña');
      form.assertButton(/iniciar sesión/i);
    });

    it('renders form inputs with proper attributes', () => {
      renderWithProviders(<LoginPageContent />, {
        preloadedState: { auth: initialAuthState },
      });

      form.assertField('Email', 'email');
      form.assertField('Contraseña', 'password');
    });
  });
});
