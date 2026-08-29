/**
 * useUserFormModal
 *
 * Form modal hook using react-hook-form + Zod validation.
 */

'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { logError } from '@logger';
import type { UserRole } from '@domain-types';
import { zodResolver } from '@hookform/resolvers/zod';

import type {
  CreateUserFormData,
  EditUserFormData,
  UserFormData,
} from '../components/UserFormModal/UserFormModal.interfaces';
import {
  createUserSchema,
  editUserSchema,
} from '../components/UserFormModal/UserFormModal.validation';
import type {
  UserItem,
  UseUserFormModalProps,
  UseUserFormModalReturn,
} from '../UserManagerScreen.interfaces';

export const useUserFormModal = ({
  createUser,
  currentUserId,
  isOwner,
  loadUsers,
  updateUser,
}: UseUserFormModalProps): UseUserFormModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isEditing = editingUserId !== null;
  const isEditingSelf = isEditing && editingUserId === currentUserId;

  const createForm = useForm<CreateUserFormData>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: 'participant',
    },
    mode: 'onBlur',
    resolver: zodResolver(createUserSchema),
  });

  const editForm = useForm<EditUserFormData>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      role: 'participant',
    },
    mode: 'onBlur',
    resolver: zodResolver(editUserSchema),
  });

  const activeForm = isEditing ? editForm : createForm;

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleToggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleOpenCreateModal = useCallback(() => {
    setEditingUserId(null);
    createForm.reset({
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: 'participant',
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsModalOpen(true);
  }, [createForm]);

  const handleOpenEditModal = useCallback(
    (user: UserItem) => {
      setEditingUserId(user.id);
      editForm.reset({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role as 'admin' | 'participant',
      });
      setIsModalOpen(true);
    },
    [editForm]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingUserId(null);
    createForm.reset();
    editForm.reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [createForm, editForm]);

  const handleSaveUser = useCallback(async () => {
    const isValid = await activeForm.trigger();
    if (!isValid) return;

    const data = activeForm.getValues() as UserFormData;

    setIsSaving(true);

    try {
      if (isEditing && editingUserId) {
        const editData = data as EditUserFormData;
        const updateData: { email: string; firstName: string; lastName: string; role?: UserRole } =
          {
            email: editData.email.trim(),
            firstName: editData.firstName.trim(),
            lastName: editData.lastName.trim(),
          };
        if (isOwner && !isEditingSelf) updateData.role = editData.role;

        const result = await updateUser(editingUserId, updateData);
        if (!result.success) return;
      } else {
        const createData = data as CreateUserFormData;
        const result = await createUser({
          email: createData.email.trim(),
          firstName: createData.firstName.trim(),
          lastName: createData.lastName.trim(),
          password: createData.password,
          role: createData.role,
        });
        if (!result.success) return;
      }
      handleCloseModal();
      loadUsers();
    } catch (err) {
      logError(err, 'handleSaveUser');
    } finally {
      setIsSaving(false);
    }
  }, [
    activeForm,
    createUser,
    editingUserId,
    handleCloseModal,
    isEditing,
    isEditingSelf,
    isOwner,
    loadUsers,
    updateUser,
  ]);

  return {
    createForm,
    editForm,
    editingUserId,
    handleCloseModal,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleSaveUser,
    handleToggleConfirmPasswordVisibility,
    handleTogglePasswordVisibility,
    isEditing,
    isEditingSelf,
    isModalOpen,
    isSaving,
    showConfirmPassword,
    showPassword,
  };
};
