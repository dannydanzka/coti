/**
 * useProfileUpdate Custom Hook
 *
 * Manages profile update flow with API call.
 * Uses toast notifications for success/error feedback.
 * Updates Redux auth state after successful save (single source of truth).
 */

'use client';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { AddressData } from '@entities';
import type { AppDispatch } from '@redux';
import { getLocalizedError } from '@i18n';
import { handleRequest } from '@helpers';
import { logError } from '@logger';
import { updateUserProfile } from '@redux';
import { useNotifications } from '@hooks';

import type { ProfileUpdatePayload, UseProfileUpdateReturn } from './useProfileUpdate.interfaces';

export const useProfileUpdate = (): UseProfileUpdateReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState<AddressData | null>(null);
  const { showError, showSuccess } = useNotifications();

  const reset = useCallback(() => {
    setIsLoading(false);
    setUpdatedAddress(null);
  }, []);

  const buildAddressFromPayload = useCallback(
    (payload: ProfileUpdatePayload): AddressData => ({
      city: payload.city,
      country: payload.country ?? 'México',
      neighborhood: payload.neighborhood,
      number: payload.number,
      state: payload.state,
      street: payload.street,
      zipCode: payload.zipCode,
    }),
    []
  );

  const dispatchProfileUpdate = useCallback(
    (payload: ProfileUpdatePayload) => {
      dispatch(
        updateUserProfile({
          age: payload.age ?? null,
          bio: payload.bio ?? null,
          city: payload.city ?? null,
          country: payload.country ?? 'México',
          firstName: payload.firstName ?? undefined,
          lastName: payload.lastName ?? undefined,
          neighborhood: payload.neighborhood ?? null,
          number: payload.number ?? null,
          phone: payload.phone ?? null,
          state: payload.state ?? null,
          street: payload.street ?? null,
          zipCode: payload.zipCode ?? null,
        })
      );
    },
    [dispatch]
  );

  const updateProfile = useCallback(
    async (payload: ProfileUpdatePayload): Promise<boolean> => {
      setIsLoading(true);

      try {
        const response = (await handleRequest({
          body: payload as unknown as Record<string, unknown>,
          customDefaultErrorMessage: 'Error al actualizar el perfil',
          endpoint: '/api/public/profile',
          method: 'PUT',
          timeout: 10000,
        })) as {
          data?: { address: AddressData };
          message?: string;
          success: boolean;
        };

        if (!response.success) {
          throw new Error(response.message ?? 'No se pudo actualizar el perfil');
        }

        setUpdatedAddress(buildAddressFromPayload(payload));
        dispatchProfileUpdate(payload);
        showSuccess('Perfil actualizado correctamente');
        return true;
      } catch (err) {
        logError(err, 'useProfileUpdate.updateProfile');
        showError(getLocalizedError(err, t, 'Error al actualizar el perfil'));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [buildAddressFromPayload, dispatchProfileUpdate, showSuccess, showError, t]
  );

  return {
    isLoading,
    reset,
    updateProfile,
    updatedAddress,
  };
};
