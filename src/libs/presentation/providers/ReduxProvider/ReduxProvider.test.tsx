import { useSelector } from 'react-redux';

import { assertTestId, assertText, render, screen } from '@testing';

import { ReduxProvider } from './ReduxProvider';

describe('ReduxProvider', () => {
  it('provides Redux store to children', () => {
    const TestComponent = () => {
      useSelector((state: any) => state);
      return <div data-testid='test-component'>Redux funcionando</div>;
    };

    render(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );

    assertTestId('test-component');
    assertText('Redux funcionando');
  });

  it('initializes store with default state', () => {
    const StateReader = () => {
      const auth = useSelector((state: any) => state.auth);
      const global = useSelector((state: any) => state.global);

      return (
        <div>
          <div data-testid='auth-state'>
            {auth.isAuthenticated ? 'Autenticado' : 'No autenticado'}
          </div>
          <div data-testid='notifications-count'>{global.notifications.length}</div>
        </div>
      );
    };

    render(
      <ReduxProvider>
        <StateReader />
      </ReduxProvider>
    );

    expect(screen.getByTestId('auth-state')).toHaveTextContent('No autenticado');
    expect(screen.getByTestId('notifications-count')).toHaveTextContent('0');
  });

  it('allows multiple children components to access store', () => {
    const FirstChild = () => {
      const notifications = useSelector((state: any) => state.global.notifications);
      return <div data-testid='first-child'>Notificaciones: {notifications.length}</div>;
    };

    const SecondChild = () => {
      const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
      return <div data-testid='second-child'>{isAuthenticated ? 'Sí' : 'No'} autenticado</div>;
    };

    render(
      <ReduxProvider>
        <FirstChild />
        <SecondChild />
      </ReduxProvider>
    );

    expect(screen.getByTestId('first-child')).toHaveTextContent('Notificaciones: 0');
    expect(screen.getByTestId('second-child')).toHaveTextContent('No autenticado');
  });

  it('handles Spanish content in Redux state', () => {
    const SpanishComponent = () => {
      const mockUser = {
        email: 'maria.garcia@coti.mx',
        name: 'María García López',
      };

      return (
        <div data-testid='spanish-content'>
          Usuario: {mockUser.name} - {mockUser.email}
        </div>
      );
    };

    render(
      <ReduxProvider>
        <SpanishComponent />
      </ReduxProvider>
    );

    expect(screen.getByTestId('spanish-content')).toHaveTextContent(
      'Usuario: María García López - maria.garcia@coti.mx'
    );
  });

  it('renders without crashing with minimal setup', () => {
    const SimpleChild = () => <div>Contenido simple</div>;

    expect(() => {
      render(
        <ReduxProvider>
          <SimpleChild />
        </ReduxProvider>
      );
    }).not.toThrow();

    assertText('Contenido simple');
  });
});
