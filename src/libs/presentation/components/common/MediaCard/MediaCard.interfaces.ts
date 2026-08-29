/**
 * MediaCard Interfaces
 *
 * Generic media card for displaying images/videos across different contexts.
 */

import type { GalleryCategory, GalleryMediaType } from '@domain-types';

/** Base media data for card display */
export interface MediaCardData {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  mediaType?: GalleryMediaType | null;
  category: GalleryCategory | null;
  isActive: boolean;
}

/** Display variant for the card */
export type MediaCardVariant = 'asset' | 'preview';

export interface MediaCardProps<T extends MediaCardData = MediaCardData> {
  /** Media data */
  image: T;
  /**
   * Display variant:
   * - 'asset': Full asset with title, description, status badge, actions (default)
   * - 'preview': Simple preview mode - only image/video with click to enlarge, fixed height
   */
  variant?: MediaCardVariant;
  /** Fixed height for preview variant (default: 120px) */
  previewHeight?: number;
  /** Show admin actions (edit, delete, toggle, download) - only applies to 'asset' variant */
  showActions?: boolean;
  /** Category color mapping */
  categoryColors?: Record<string, { bg: string; text: string }>;
  /** Category label mapping */
  categoryLabels?: Record<string, string>;
  /** Whether this image is being toggled */
  isTogglingId?: string | null;
  /** Handler for preview click */
  onPreview?: (imageUrl: string, title: string, mediaType?: GalleryMediaType) => () => void;
  /** Handler for edit click */
  onEdit?: (image: T) => () => void;
  /** Handler for delete click */
  onDelete?: (image: T) => () => void;
  /** Handler for toggle active click */
  onToggle?: (image: T) => () => void;
  /** Handler for download click */
  onDownload?: (url: string, title: string, mediaType: GalleryMediaType) => () => void;
  /** Handler for image load error */
  onImageError?: (imageId: string) => void;
}
