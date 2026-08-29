/**
 * UserFormModal Interfaces
 */

import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

import type { createUserSchema, editUserSchema } from './UserFormModal.validation';

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type EditUserFormData = z.infer<typeof editUserSchema>;
export type UserFormData = CreateUserFormData | EditUserFormData;

export interface UserFormModalProps {
  createForm: UseFormReturn<CreateUserFormData>;
  editForm: UseFormReturn<EditUserFormData>;
  handleCloseModal: () => void;
  handleSaveUser: () => void;
  handleToggleConfirmPasswordVisibility: () => void;
  handleTogglePasswordVisibility: () => void;
  isEditing: boolean;
  isEditingSelf: boolean;
  isModalOpen: boolean;
  isOwner: boolean;
  isSaving: boolean;
  showConfirmPassword: boolean;
  showPassword: boolean;
}
