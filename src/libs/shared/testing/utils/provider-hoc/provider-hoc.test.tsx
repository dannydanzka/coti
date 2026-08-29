/**
 * Provider HOC Unit Tests
 *
 * Essential tests for Higher-Order Component patterns following Essential Testing Philosophy.
 */

'use client';

import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';

import { composeHOCs, createTestStore, withProviders, withReduxProvider } from './provider-hoc';

const createMockStore = (initialState = {}) => ({
  dispatch: vi.fn(),
  getState: vi.fn(() => initialState),
  subscribe: vi.fn(),
  [Symbol.observable]: vi.fn(),
});

vi.mock('@store', () => ({
  configureStore: vi.fn((initialState = {}) => createMockStore(initialState)),
}));

const TestComponent = ({ testId = 'test-component' }: { testId?: string }) => (
  <div data-testid={testId}>Contenido Coti</div>
);

const AppProvider = ({ children }: { children: ReactNode }) => (
  <div data-testid='app-provider'>{children}</div>
);

describe('Provider HOC Utilities', () => {
  describe('withReduxProvider', () => {
    it('should create Redux wrapper for Coti state', () => {
      const enrollmentState = { enrollments: { 'maría-garcía': 'rally-emocional-2025' } };
      const ReduxWrapper = withReduxProvider(enrollmentState);

      render(<TestComponent />, { wrapper: ReduxWrapper });

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(screen.getByTestId('test-component')).toHaveTextContent('Contenido Coti');
      expect(ReduxWrapper.displayName).toBe('withReduxProvider(Component)');
    });

    it('should handle custom providers with Spanish user data', () => {
      const userState = { currentUser: 'José Martínez' };
      const ReduxWrapper = withReduxProvider(userState, AppProvider);

      render(<TestComponent />, { wrapper: ReduxWrapper });

      expect(screen.getByTestId('app-provider')).toBeInTheDocument();
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  describe('withProviders', () => {
    it('should create multi-provider wrapper for Coti', () => {
      const participantState = { participants: ['Ana López', 'Carlos Rodríguez'] };
      const MultiWrapper = withProviders({
        customProviders: [AppProvider],
        storeState: participantState,
      });

      render(<TestComponent />, { wrapper: MultiWrapper });

      expect(screen.getByTestId('app-provider')).toBeInTheDocument();
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(MultiWrapper.displayName).toBe('withProviders(Component)');
    });

    it('should handle multiple providers with enrollment data', () => {
      const EnrollmentProvider = ({ children }: { children: ReactNode }) => (
        <div data-testid='enrollment-provider'>{children}</div>
      );
      const ManagerProvider = ({ children }: { children: ReactNode }) => (
        <div data-testid='manager-provider'>{children}</div>
      );

      const MultiWrapper = withProviders({
        customProviders: [EnrollmentProvider, ManagerProvider],
        storeState: { event: 'rally-emocional', manager: 'Elena Fernández' },
      });

      render(<TestComponent />, { wrapper: MultiWrapper });

      expect(screen.getByTestId('enrollment-provider')).toBeInTheDocument();
      expect(screen.getByTestId('manager-provider')).toBeInTheDocument();
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  describe('createTestStore', () => {
    it('should handle Coti state objects', () => {
      const appState = {
        auth: { user: { name: 'Sofía Herrera', role: 'admin' } },
        challenges: { types: ['physical', 'emotional', 'family'] },
      };

      const store = createTestStore(appState);
      const existingStore = createMockStore({ existing: true });
      const resultStore = createTestStore(existingStore);

      expect(store.getState()).toEqual(appState);
      expect(resultStore).toBe(existingStore);
    });
  });

  describe('composeHOCs', () => {
    it('should compose HOCs for Coti context', () => {
      const authHOC = (Component: React.ComponentType<any>) => (props: any) => (
        <div data-testid='auth-hoc'>
          <Component {...props} />
        </div>
      );

      const challengeHOC = (Component: React.ComponentType<any>) => (props: any) => (
        <div data-testid='challenge-hoc'>
          <Component {...props} />
        </div>
      );

      const ComposedComponent = composeHOCs([authHOC, challengeHOC])(TestComponent);

      render(<ComposedComponent testId='composed-coti' />);

      expect(screen.getByTestId('auth-hoc')).toBeInTheDocument();
      expect(screen.getByTestId('challenge-hoc')).toBeInTheDocument();
      expect(screen.getByTestId('composed-coti')).toBeInTheDocument();
    });
  });
});
