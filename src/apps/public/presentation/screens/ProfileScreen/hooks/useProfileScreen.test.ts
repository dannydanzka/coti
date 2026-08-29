/**
 * useProfileScreen Hook Tests
 *
 * Tests photo update dispatch.
 * Spanish locale mandatory.
 */

import { act, renderHook } from '@testing-library/react';
import * as redux from 'react-redux';

import { useProfileScreen } from './useProfileScreen';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('@redux', () => ({
  updateUserPhotoThunk: vi.fn((url: string) => ({ payload: url, type: 'user/updatePhoto' })),
}));

const mockDispatch = vi.fn().mockReturnValue({ unwrap: vi.fn().mockResolvedValue(undefined) });

describe('useProfileScreen', () => {
  beforeEach(() => {
    vi.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
  });

  it('dispatches photo update', async () => {
    const { result } = renderHook(() => useProfileScreen());

    await act(async () => {
      await result.current.updateUserPhoto('https://example.com/photo.jpg');
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
