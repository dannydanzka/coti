/**
 * Authenticated Layout
 *
 * Envoltura de las rutas que exigen sesión. Usa useAuth (AuthContext) como
 * ÚNICA FUENTE DE VERDAD del estado de sesión; el middleware ya bloquea el
 * acceso, esto sólo evita el parpadeo de contenido mientras resuelve.
 */

'use client';

import { Footer, Header } from '@components';
import { useAuth } from '@hooks';

import type { AuthenticatedLayoutProps } from './layout.interfaces';

import { AuthenticatedContainer, MainContent, PageContent } from './layout.styled';

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <AuthenticatedContainer>
      <MainContent>
        <Header variant='authenticated' />
        <PageContent>{children}</PageContent>
        <Footer />
      </MainContent>
    </AuthenticatedContainer>
  );
};

export default AuthenticatedLayout;
