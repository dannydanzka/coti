/**
 * Update Profile Use Case
 *
 * Un participante edita su propio perfil. A diferencia del caso de uso de
 * administración, aquí no hay `id` en la petición: la identidad la impone el
 * middleware de auth vía `x-user-id`, así que nadie puede editar a otro.
 */

import { createNotFoundError, handleUseCaseError } from '@use-case-error';
import type { UpdateProfileParams, UpdateProfileResponse } from '@interfaces';
import { userRepository } from '@repositories';

import type { UpdateProfileErrorResponse } from './update-profile.interfaces';

export const executeUpdateProfile = async (
  params: UpdateProfileParams
): Promise<UpdateProfileResponse | UpdateProfileErrorResponse> => {
  try {
    const existingUser = await userRepository.findById(params.userId);

    if (!existingUser) {
      return createNotFoundError<UpdateProfileErrorResponse>('Usuario', params.userId);
    }

    const user = await userRepository.updateProfile(params.userId, params.updates);

    return {
      data: { user },
      message: 'Perfil actualizado correctamente',
      success: true,
    };
  } catch (error) {
    return handleUseCaseError<UpdateProfileErrorResponse>(error, 'executeUpdateProfile');
  }
};
