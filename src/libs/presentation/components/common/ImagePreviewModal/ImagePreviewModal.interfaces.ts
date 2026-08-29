/**
 * ImagePreviewModal Interfaces
 *
 * Agnostic modal for image preview. Category is optional and passed as props.
 */

export interface CategoryBadgeConfig {
  label: string;
  color: string;
}

export interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description?: string;
  category?: CategoryBadgeConfig | null;
  mediaType?: 'image' | 'video';
  /** When provided, renders next/previous arrows and enables keyboard navigation. */
  onNext?: () => void;
  onPrevious?: () => void;
}
