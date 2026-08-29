/**
 * ProfileEditScreen Interfaces
 *
 * Type definitions for profile edit form.
 */

import type { z } from 'zod';

import type { COUNTRIES } from './ProfileEditScreen.countries';
import type { profileEditFormSchema } from './ProfileEditScreen.validation';

export type Country = (typeof COUNTRIES)[number];

export interface ProfileEditScreenProps {
  className?: string;
}

export type ProfileEditFormData = z.infer<typeof profileEditFormSchema>;
