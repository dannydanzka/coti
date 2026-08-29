'use client';

/**
 * Home Page
 *
 * Punto de entrada público del producto.
 *
 * La portada es material de venta: sólo tiene sentido para quien todavía no
 * tiene cuenta. Con sesión abierta se manda directo a la cajita de ahorro, que
 * es la pantalla que esa persona vino a ver.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AUTHENTICATED_ROUTES } from '@constants';
import { HomeScreen } from '@apps/public/presentation/screens/HomeScreen';
import { useAuth } from '@hooks';

const HomePage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(AUTHENTICATED_ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return null;
  }

  return <HomeScreen />;
};

export default HomePage;
