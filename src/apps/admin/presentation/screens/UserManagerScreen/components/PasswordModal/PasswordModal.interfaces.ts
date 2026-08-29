/**
 * PasswordModal Interfaces
 */

import type { UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';

import type { changePasswordSchema } from './PasswordModal.validation';

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export interface PasswordModalData {
  isOpen: boolean;
  userId: string | null;
  userName: string;
}

export interface PasswordModalProps {
  handleChangePassword: () => void;
  handleClosePasswordModal: () => void;
  handleToggleConfirmPasswordVisibility: () => void;
  handleToggleNewPasswordVisibility: () => void;
  isChangingPassword: boolean;
  passwordForm: UseFormReturn<ChangePasswordFormData>;
  passwordModal: PasswordModalData;
  showConfirmPassword: boolean;
  showNewPassword: boolean;
}
