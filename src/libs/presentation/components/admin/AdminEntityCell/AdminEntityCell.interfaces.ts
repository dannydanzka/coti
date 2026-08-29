/**
 * AdminEntityCell Interfaces
 *
 * Type definitions for entity cell components used in admin tables.
 * Provides consistent styling for displaying entity names, IDs, and descriptions.
 */

import type { ReactNode } from 'react';

export interface EntityNameProps {
  children: ReactNode;
  className?: string;
}

export interface EntityIdProps {
  children: ReactNode;
  className?: string;
}

export interface EntityDescriptionProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export interface EntityCellProps {
  className?: string;
  description?: string;
  id?: string;
  name: string;
}

export interface StyledEntityDescriptionProps {
  $maxWidth?: string;
}
