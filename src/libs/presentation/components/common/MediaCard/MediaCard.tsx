/**
 * MediaCard Component
 *
 * Centralized media display for images/videos across all contexts.
 * Supports two modes: 'asset' (full gallery) and 'preview' (simple display).
 */

'use client';

import { Download, Edit2, Film, ImageOff, Play, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ToggleActiveButton } from '@dannydanzka/sovereignty-ui';
import { MEDIA_TYPES } from '@constants';

import { MEDIA_CARD_VARIANTS } from './MediaCard.constants';
import type { MediaCardData, MediaCardProps } from './MediaCard.interfaces';

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

export const MediaCard = <T extends MediaCardData = MediaCardData>({
  categoryColors,
  categoryLabels,
  image,
  isTogglingId,
  onDelete,
  onDownload,
  onEdit,
  onImageError,
  onPreview,
  onToggle,
  previewHeight = 120,
  showActions = false,
  variant = 'asset',
}: MediaCardProps<T>) => {
  const { t } = useTranslation();
  const [hasImageError, setHasImageError] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const isToggling = isTogglingId === image.id;
  const mediaType = image.mediaType ?? MEDIA_TYPES.IMAGE;
  const isPreviewMode = variant === MEDIA_CARD_VARIANTS.PREVIEW;

  const handleImageError = useCallback(() => {
    setHasImageError(true);
    onImageError?.(image.id);
  }, [image.id, onImageError]);

  const handleVideoError = useCallback(() => {
    setHasVideoError(true);
  }, []);

  const handleClick = useCallback(() => {
    if (!hasImageError && onPreview) {
      onPreview(image.imageUrl, image.title, mediaType)();
    }
  }, [hasImageError, image.imageUrl, image.title, mediaType, onPreview]);

  const renderMediaThumbnail = () => {
    if (hasImageError) {
      return (
        <ImagePlaceholder>
          <ImageOff size={48} />
          <ImagePlaceholderText>{t('common.noImage')}</ImagePlaceholderText>
        </ImagePlaceholder>
      );
    }

    if (mediaType === MEDIA_TYPES.VIDEO) {
      if (hasVideoError) {
        return (
          <VideoPlaceholder onClick={handleClick}>
            <Film size={48} />
            <VideoPlaceholderText>{t('common.video')}</VideoPlaceholderText>
            <VideoIcon>
              <Play size={20} />
            </VideoIcon>
          </VideoPlaceholder>
        );
      }
      return (
        <>
          <CardVideo muted src={image.imageUrl} onError={handleVideoError} />
          <VideoClickOverlay onClick={handleClick} />
          <VideoIcon>
            <Play size={20} />
          </VideoIcon>
        </>
      );
    }

    return (
      <CardImage
        alt={image.title || 'Media'}
        src={image.imageUrl}
        onClick={handleClick}
        onError={handleImageError}
      />
    );
  };

  const renderActions = () => {
    if (!showActions) return null;

    return (
      <ImageActions>
        {onDownload && (
          <Button
            icon={<Download size={14} />}
            iconOnly
            shape='circle'
            size='sm'
            title={t('common.downloadFile')}
            variant='ghost'
            onClick={onDownload(image.imageUrl, image.title, mediaType)}
          />
        )}
        {onEdit && (
          <Button
            icon={<Edit2 size={14} />}
            iconOnly
            shape='circle'
            size='sm'
            title={t('common.edit')}
            variant='ghost'
            onClick={onEdit(image)}
          />
        )}
        {onToggle && (
          <ToggleActiveButton
            isActive={image.isActive}
            isLoading={isToggling}
            shape='circle'
            onClick={onToggle(image)}
          />
        )}
        {onDelete && (
          <Button
            icon={<Trash2 size={14} />}
            iconOnly
            shape='circle'
            size='sm'
            title={t('common.delete')}
            variant='danger'
            onClick={onDelete(image)}
          />
        )}
      </ImageActions>
    );
  };

  const renderCategoryBadge = () => {
    if (!image.category) return null;

    const colors = categoryColors?.[image.category];
    const label = categoryLabels?.[image.category] ?? image.category;

    return (
      <CategoryBadge $bgColor={colors?.bg} $textColor={colors?.text}>
        {label}
      </CategoryBadge>
    );
  };

  const hasTitle = image.title.trim().length > 0;
  const hasOverlayContent = hasTitle || showActions;

  if (isPreviewMode) {
    return (
      <ImageCard>
        <ImageWrapper $fixedHeight={previewHeight}>{renderMediaThumbnail()}</ImageWrapper>
      </ImageCard>
    );
  }

  return (
    <ImageCard>
      <ImageWrapper>
        {renderMediaThumbnail()}
        <ImageOverlayTop>
          {renderCategoryBadge()}
          {showActions && (
            <StatusBadge $active={image.isActive}>
              {image.isActive ? t('status.active') : t('status.inactive')}
            </StatusBadge>
          )}
        </ImageOverlayTop>
        {hasOverlayContent && (
          <ImageOverlay>
            {hasTitle && <ImageTitle title={image.title}>{image.title}</ImageTitle>}
            {renderActions()}
          </ImageOverlay>
        )}
      </ImageWrapper>
      {image.description && (
        <ImageDescriptionWrapper>
          <ImageDescription title={image.description}>{image.description}</ImageDescription>
        </ImageDescriptionWrapper>
      )}
    </ImageCard>
  );
};
