/**
 * AdminEntityCell Components
 *
 * Reusable components for displaying entity information in admin tables.
 * Provides consistent styling for names, IDs, descriptions, and emails.
 */

'use client';

import type { EntityCellProps } from './AdminEntityCell.interfaces';

import {
  EntityCellContainer,
  EntityDescription as StyledEntityDescription,
  EntityId as StyledEntityId,
  EntityName as StyledEntityName,
} from './AdminEntityCell.styled';

export const AdminEntityCell = ({ className, description, id, name }: EntityCellProps) => (
  <EntityCellContainer className={className}>
    <StyledEntityName>{name}</StyledEntityName>
    {id && <StyledEntityId>{id}</StyledEntityId>}
    {description && <StyledEntityDescription>{description}</StyledEntityDescription>}
  </EntityCellContainer>
);

export {
  EntityCellContainer,
  EntityDescription,
  EntityEmail,
  EntityId,
  EntityName,
  EntitySubtext,
} from './AdminEntityCell.styled';
