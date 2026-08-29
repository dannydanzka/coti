/**
 * useAuthenticatedLayout Hook
 *
 * Encapsulates Redux state and navigation for authenticated layout.
 * Manages drawer collapsed state (persisted via redux-persist).
 */

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { selectIsDrawerCollapsed, setDrawerCollapsed } from '@redux';
import { useAuth } from '@hooks';

export const useAuthenticatedLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useAuth();
  const isSidebarCollapsed = useSelector(selectIsDrawerCollapsed);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleCollapsedChange = useCallback(
    (collapsed: boolean) => {
      dispatch(setDrawerCollapsed(collapsed));
    },
    [dispatch]
  );

  const handleMobileClose = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const handleMobileOpen = useCallback(() => {
    setIsMobileOpen(true);
  }, []);

  const canAccess = isAuthenticated;

  return {
    canAccess,
    handleCollapsedChange,
    handleMobileClose,
    handleMobileOpen,
    isAuthenticated,
    isLoading,
    isMobileOpen,
    isSidebarCollapsed,
  };
};
