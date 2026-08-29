/**
 * Users Service (Public)
 *
 * HTTP client for user profile operations.
 */

import { handleRequest } from '@helpers';

export const PublicUsersService = {
  /**
   * Update user's profile photo
   */
  updatePhoto: async (photoUrl: string) => {
    return handleRequest({
      body: { photoUrl },
      endpoint: '/api/public/users/me/photo',
      method: 'PUT',
    });
  },
};
