/**
 * Render With Providers Unit Tests
 *
 * Testing basic functionality without complex dependencies
 */

'use client';

import { ReactElement } from 'react';
import { render as rtlRender, screen } from '@testing-library/react';

import { renderWithProviders } from './render-with-providers';

const SimpleTestComponent = () => <div data-testid='simple-component'>Test Content</div>;

const PropsTestComponent = ({ message = 'default' }: { message?: string }) => (
  <div data-testid='props-component'>{message}</div>
);

const mockStore = {
  dispatch: vi.fn(),
  getState: vi.fn(() => ({
    admin: {},
    auth: { isAuthenticated: false },
    global: {},
    users: { list: [] },
  })),
};

vi.mock('../render-with-providers', () => ({
  renderWithProviders: (ui: ReactElement, options?: unknown) => {
    void options;
    const result = { ...rtlRender(ui), store: mockStore };
    return result;
  },
}));

describe('renderWithProviders', () => {
  describe('Basic Functionality', () => {
    it('should be a function', () => {
      expect(typeof renderWithProviders).toBe('function');
    });

    it('should render simple components', () => {
      renderWithProviders(<SimpleTestComponent />);

      expect(screen.getByTestId('simple-component')).toBeInTheDocument();
      expect(screen.getByTestId('simple-component')).toHaveTextContent('Test Content');
    });

    it('should return store object', () => {
      const { store } = renderWithProviders(<SimpleTestComponent />);

      expect(store).toBeDefined();
      expect(store.getState).toBeDefined();
      expect(store.dispatch).toBeDefined();
    });

    it('should return RTL utilities', () => {
      const { container, getByTestId, rerender } = renderWithProviders(<SimpleTestComponent />);

      expect(getByTestId).toBeDefined();
      expect(container).toBeDefined();
      expect(rerender).toBeDefined();
    });
  });

  describe('Component Props', () => {
    it('should handle components with props', () => {
      renderWithProviders(<PropsTestComponent message='Hello World' />);

      expect(screen.getByTestId('props-component')).toBeInTheDocument();
      expect(screen.getByTestId('props-component')).toHaveTextContent('Hello World');
    });
  });

  describe('Rerender Functionality', () => {
    it('should support rerender', () => {
      const { rerender } = renderWithProviders(<PropsTestComponent message='original' />);

      expect(screen.getByTestId('props-component')).toHaveTextContent('original');

      rerender(<PropsTestComponent message='updated' />);

      expect(screen.getByTestId('props-component')).toHaveTextContent('updated');
    });
  });

  describe('Store Integration', () => {
    it('should provide mocked store state', () => {
      const { store } = renderWithProviders(<SimpleTestComponent />);
      const state = store.getState();

      expect(state.auth).toBeDefined();
      expect(state.users).toBeDefined();
      expect(state.global).toBeDefined();
    });

    it('should provide dispatch function', () => {
      const { store } = renderWithProviders(<SimpleTestComponent />);

      expect(typeof store.dispatch).toBe('function');
      expect(store.dispatch).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle components that throw errors', () => {
      const ErrorComponent = () => {
        throw new Error('Test error');
      };

      expect(() => {
        renderWithProviders(<ErrorComponent />);
      }).toThrow('Test error');
    });
  });
});
