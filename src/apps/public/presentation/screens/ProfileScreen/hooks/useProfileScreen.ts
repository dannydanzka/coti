/**
 * useProfileScreen Hook
 *
 * Encapsulates profile actions for ProfileScreen.
 * Updates Redux auth state (single source of truth, like all other entities).
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@redux';
import { logError } from '@logger';
import { updateUserPhotoThunk } from '@redux';

export const useProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const updateUserPhoto = useCallback(
    async (photoUrl: string) => {
      try {
        await dispatch(updateUserPhotoThunk(photoUrl)).unwrap();
      } catch (err) {
        logError(err, 'useProfileScreen.updateUserPhoto');
      }
    },
    [dispatch]
  );

  return { updateUserPhoto };
};
