/**
 * useProfileUpdate Hook Interfaces
 *
 * Type definitions for profile update hook.
 */

import type { AddressData } from '@entities';

export interface ProfileUpdatePayload {
  age?: number;
  bio?: string;
  city: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  neighborhood: string;
  number: string;
  phone?: string;
  state: string;
  street: string;
  zipCode: string;
}

export interface UseProfileUpdateReturn {
  isLoading: boolean;
  reset: () => void;
  updateProfile: (payload: ProfileUpdatePayload) => Promise<boolean>;
  updatedAddress: AddressData | null;
}
