/**
 * MediaCard Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  CardImage,
  CardVideo,
  CategoryBadge,
  ImageActions,
  ImageCard,
  ImageDescription,
  ImageDescriptionWrapper,
  ImageOverlay,
  ImageOverlayTop,
  ImagePlaceholder,
  ImagePlaceholderText,
  ImageTitle,
  ImageWrapper,
  StatusBadge,
  VideoClickOverlay,
  VideoIcon,
  VideoPlaceholder,
  VideoPlaceholderText,
} from './MediaCard.styled';

describe('MediaCard Styled Components', () => {
  it('should export all styled components', () => {
    expect(ImageCard).toBeDefined();
    expect(ImageWrapper).toBeDefined();
    expect(ImageOverlayTop).toBeDefined();
    expect(ImageOverlay).toBeDefined();
    expect(ImageTitle).toBeDefined();
    expect(ImageActions).toBeDefined();
    expect(ImageDescriptionWrapper).toBeDefined();
    expect(ImageDescription).toBeDefined();
    expect(CategoryBadge).toBeDefined();
    expect(StatusBadge).toBeDefined();
    expect(CardVideo).toBeDefined();
    expect(VideoIcon).toBeDefined();
    expect(ImagePlaceholder).toBeDefined();
    expect(ImagePlaceholderText).toBeDefined();
    expect(VideoPlaceholder).toBeDefined();
    expect(VideoClickOverlay).toBeDefined();
    expect(VideoPlaceholderText).toBeDefined();
    expect(CardImage).toBeDefined();
  });
});
