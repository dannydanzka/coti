/**
 * ImagePicker Component Tests
 *
 * Tests image picker rendering.
 * Spanish locale mandatory.
 */

import { assertText, renderWithProviders } from '@testing';

import { ImagePicker } from './ImagePicker';

describe('ImagePicker', () => {
  it('renders dropzone placeholder', () => {
    renderWithProviders(<ImagePicker onFileSelect={vi.fn()} />);
    assertText(/arrastra/i);
  });

  it('exports ImagePicker component', () => {
    expect(ImagePicker).toBeDefined();
    expect(typeof ImagePicker).toBe('function');
  });
});
