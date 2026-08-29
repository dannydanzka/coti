/**
 * ImagePreviewModal Component
 *
 * Agnostic modal for image preview. Shows image with title and optional category badge.
 * Category config (label + color) is passed as props for flexibility across projects.
 */

'use client';

import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { MEDIA_TYPES } from '@constants';

import type { ImagePreviewModalProps } from './ImagePreviewModal.interfaces';

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
  NavArrowButton,
  PreviewImage,
  PreviewVideo,
  TitleWrapper,
} from './ImagePreviewModal.styled';

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  category,
  description,
  imageUrl,
  isOpen,
  mediaType = 'image',
  onClose,
  onNext,
  onPrevious,
  title,
}) => {
  const { t } = useTranslation();
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowRight' && onNext) {
        onNext();
      }
      if (event.key === 'ArrowLeft' && onPrevious) {
        onPrevious();
      }
    },
    [onClose, onNext, onPrevious]
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleDownload = useCallback(() => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = title || 'download';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl, title]);

  if (!isOpen) return null;

  const renderMedia = () => {
    if (mediaType === MEDIA_TYPES.VIDEO) {
      return <PreviewVideo autoPlay controls src={imageUrl} />;
    }
    return <PreviewImage alt={title} src={imageUrl} />;
  };

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        {renderMedia()}

        {onPrevious && (
          <NavArrowButton $side='left' aria-label={t('media.previousImage')} onClick={onPrevious}>
            <ChevronLeft size={28} />
          </NavArrowButton>
        )}
        {onNext && (
          <NavArrowButton $side='right' aria-label={t('media.nextImage')} onClick={onNext}>
            <ChevronRight size={28} />
          </NavArrowButton>
        )}

        <ImageOverlay>
          <TitleWrapper>
            <ImageTitle>{title}</ImageTitle>
            {category && (
              <CategoryBadge $categoryColor={category.color}>{category.label}</CategoryBadge>
            )}
          </TitleWrapper>
          <ActionButtonsWrapper>
            <ActionButton aria-label={t('media.download')} onClick={handleDownload}>
              <Download size={18} />
            </ActionButton>
            <CloseButton aria-label={t('modal.close')} onClick={onClose}>
              <X size={20} />
            </CloseButton>
          </ActionButtonsWrapper>
        </ImageOverlay>

        {description && (
          <CaptionOverlay>
            <ImageDescription>{description}</ImageDescription>
          </CaptionOverlay>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};
