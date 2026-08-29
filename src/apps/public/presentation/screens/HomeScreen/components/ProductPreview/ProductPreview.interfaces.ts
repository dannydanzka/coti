/**
 * ProductPreview Interfaces
 */

export type ProductPreviewScreen = 'cajita' | 'plan' | 'projection';

export interface ProductPreviewProps {
  caption?: string;
  screen: ProductPreviewScreen;
  tilt?: 'left' | 'none' | 'right';
}
