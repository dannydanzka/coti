'use client';

/**
 * useProfileEditForm Hook
 *
 * Encapsulates profile edit form state with react-hook-form + Zod.
 */

import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useAuth } from '@hooks';
import { useProfileUpdate } from '@apps/public/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import type { ProfileEditFormData } from '../ProfileEditScreen.interfaces';
import { profileEditFormSchema } from '../ProfileEditScreen.validation';

const INITIAL_FORM: ProfileEditFormData = {
  age: undefined,
  bio: '',
  city: '',
  country: 'México',
  firstName: '',
  lastName: '',
  neighborhood: '',
  number: '',
  phone: '',
  state: '',
  street: '',
  zipCode: '',
};

export const useProfileEditForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { isLoading, reset, updateProfile } = useProfileUpdate();

  const profileForm = useForm<ProfileEditFormData>({
    defaultValues: INITIAL_FORM,
    mode: 'onBlur',
    resolver: zodResolver(profileEditFormSchema),
  });

  const { setValue } = profileForm;

  useEffect(() => {
    if (user) {
      profileForm.reset({
        age: user.age ?? undefined,
        bio: user.bio ?? '',
        city: user.city ?? '',
        country: user.country ?? 'México',
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        neighborhood: user.neighborhood ?? '',
        number: user.number ?? '',
        phone: user.phone ?? '',
        state: user.state ?? '',
        street: user.street ?? '',
        zipCode: user.zipCode ?? '',
      });
    }
  }, [user, profileForm]);

  const handleInputChange = useCallback(
    (field: keyof ProfileEditFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value =
          field === 'age' ? (e.target.value ? Number(e.target.value) : undefined) : e.target.value;
        setValue(field, value as never);
      },
    [setValue]
  );

  const handleNumericInput = useCallback(
    (field: 'number' | 'phone' | 'zipCode') => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(field, e.target.value.replace(/\D/g, ''));
    },
    [setValue]
  );

  const handleCountryChange = useCallback(
    (country: string) => {
      setValue('country', country);
    },
    [setValue]
  );

  const handleCancel = useCallback(() => {
    const redirect = sessionStorage.getItem('pendingEnrollment');
    sessionStorage.removeItem('pendingEnrollment');
    if (redirect) router.push(redirect);
    else router.back();
  }, [router]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      reset();

      const data = profileForm.getValues();
      const success = await updateProfile(data);

      if (success) {
        const redirect = sessionStorage.getItem('pendingEnrollment') ?? '/dashboard/profile';
        sessionStorage.removeItem('pendingEnrollment');
        setTimeout(() => router.push(redirect), 1500);
      }
    },
    [profileForm, reset, router, updateProfile]
  );

  return {
    handleCancel,
    handleCountryChange,
    handleInputChange,
    handleNumericInput,
    handleSubmit,
    isLoading,
    profileForm,
    user,
  };
};
