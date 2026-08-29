/**
 * Public Layout
 *
 * Layout de las páginas públicas y autenticadas: Header + contenido + Footer.
 *
 * Usa useAuth (AuthContext) como ÚNICA FUENTE DE VERDAD del estado de sesión.
 * El drawer lateral de navegación se agrega en el workshop, cuando exista
 * navegación autenticada que lo justifique.
 */

'use client';

import { Footer, Header } from '@components';
import { useAuth } from '@hooks';

import type { PublicLayoutProps } from './layout.interfaces';

import {
  ContentArea,
  MainContent,
  MainWrapper,
  PageContent,
  PublicContainer,
} from './layout.styled';

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  const showAuthenticatedUI = isAuthenticated && !isLoading;

  return (
    <PublicContainer>
      <MainWrapper>
        {!isLoading && <Header variant={showAuthenticatedUI ? 'authenticated' : 'public'} />}
        <MainContent $isAuthenticated={showAuthenticatedUI}>
          {showAuthenticatedUI ? (
            <ContentArea>
              <PageContent>{children}</PageContent>
            </ContentArea>
          ) : (
            children
          )}
        </MainContent>
        {!isLoading && <Footer />}
      </MainWrapper>
    </PublicContainer>
  );
};

export default PublicLayout;
