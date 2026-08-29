/**
 * ImagePreviewModal Styled Components Tests
 * Coverage: Import verification for styled-components (generates v8 coverage)
 */

import {
  ActionButton,
  ActionButtonsWrapper,
  CaptionOverlay,
  CategoryBadge,
  CloseButton,
  ImageDescription,
  ImageOverlay,
  ImageTitle,
  ModalContent,
  ModalOverlay,
  PreviewImage,
  PreviewVideo,
  TitleWrapper,
} from './ImagePreviewModal.styled';

describe('ImagePreviewModal Styled Components', () => {
  it('should export all styled components', () => {
    expect(ModalOverlay).toBeDefined();
    expect(ModalContent).toBeDefined();
    expect(PreviewImage).toBeDefined();
    expect(PreviewVideo).toBeDefined();
    expect(ImageOverlay).toBeDefined();
    expect(TitleWrapper).toBeDefined();
    expect(ImageTitle).toBeDefined();
    expect(CategoryBadge).toBeDefined();
    expect(ActionButtonsWrapper).toBeDefined();
    expect(ActionButton).toBeDefined();
    expect(CloseButton).toBeDefined();
    expect(CaptionOverlay).toBeDefined();
    expect(ImageDescription).toBeDefined();
  });
});
