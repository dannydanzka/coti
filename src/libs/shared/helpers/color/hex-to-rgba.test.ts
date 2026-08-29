/**
 * hexToRgba Helper Tests
 *
 * Tests hex to RGBA color conversion.
 */

import { hexToRgba } from './hex-to-rgba';

describe('hexToRgba', () => {
  it('converts white with full opacity', () => {
    expect(hexToRgba('#FFFFFF', 1)).toBe('rgba(255, 255, 255, 1)');
  });

  it('converts black with half opacity', () => {
    expect(hexToRgba('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
  });

  it('converts color with custom alpha', () => {
    expect(hexToRgba('#FF5733', 0.8)).toBe('rgba(255, 87, 51, 0.8)');
  });

  it('handles lowercase hex', () => {
    expect(hexToRgba('#ff0000', 1)).toBe('rgba(255, 0, 0, 1)');
  });
});
