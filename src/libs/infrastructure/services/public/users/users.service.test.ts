vi.mock('@helpers/http/handleRequest/handleRequest', () => ({
  handleRequest: vi.fn(),
}));

import { handleRequest } from '@helpers';
import { setupServiceMock } from '@testing/helpers';

import { PublicUsersService } from './users.service';

const { mockSuccess } = setupServiceMock();
describe('PublicUsersService', () => {
  describe('updatePhoto', () => {
    it('actualiza foto de perfil', async () => {
      mockSuccess({ photoUrl: 'https://img.com/photo.jpg' });

      const result = await PublicUsersService.updatePhoto('https://img.com/photo.jpg');
      expect(result).toEqual({
        data: { photoUrl: 'https://img.com/photo.jpg' },
        status: 200,
        success: true,
      });
      expect(handleRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          body: { photoUrl: 'https://img.com/photo.jpg' },
          endpoint: '/api/public/users/me/photo',
          method: 'PUT',
        })
      );
    });
  });
});
