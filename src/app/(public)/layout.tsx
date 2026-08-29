/**
 * Public Layout
 *
 * Layout de las páginas públicas y autenticadas: Header + contenido + Footer.
 *
 * Usa useAuth (AuthContext) como ÚNICA FUENTE DE VERDAD del estado de sesión.
 *
 * La sesión cambia el header (enlaces de la cuenta en lugar de los públicos),
 * pero NO el envoltorio del contenido: antes, estando logueado, se metía un
 * contenedor con relleno que le abría un hueco al hero de ancho completo y
 * hacía que la portada se viera distinta con y sin sesión. Cada pantalla se
 * encarga de su propio espaciado.
 */

'use client';

import { Footer, Header } from '@components';
import { useAuth } from '@hooks';

import type { PublicLayoutProps } from './layout.interfaces';

import { MainContent, MainWrapper, PublicContainer } from './layout.styled';

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  const showAuthenticatedUI = isAuthenticated && !isLoading;

  return (
    <PublicContainer>
      <MainWrapper>
        {!isLoading && <Header variant={showAuthenticatedUI ? 'authenticated' : 'public'} />}
        <MainContent>{children}</MainContent>
        {!isLoading && <Footer />}
      </MainWrapper>
    </PublicContainer>
  );
};

export default PublicLayout;
