/**
 * ProfileScreen Component Tests
 *
 * Tests profile rendering.
 * Spanish locale mandatory.
 */

vi.mock('@hooks', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    useAuth: vi.fn(() => ({
      user: {
        city: 'Guadalajara',
        country: 'México',
        email: 'maria@test.com',
        firstName: 'María',
        id: '1',
        lastName: 'García',
        phone: '3312345678',
        photoUrl: null,
        state: 'Jalisco',
        street: 'Calle 123',
      },
    })),
  };
});

vi.mock('./hooks', () => ({
  useProfileScreen: vi.fn(() => ({
    handlePhotoChange: vi.fn(),
    isUpdatingPhoto: false,
  })),
}));

import { assertTextCount, renderWithProviders } from '@testing';

import { ProfileScreen } from './ProfileScreen';

describe('ProfileScreen', () => {
  it('renders user name', () => {
    renderWithProviders(<ProfileScreen />);
    assertTextCount(/María García/);
  });

  it('renders user email', () => {
    renderWithProviders(<ProfileScreen />);
    assertTextCount('maria@test.com');
  });
});
