/**
 * ProfileScreen Styled Components
 *
 * Modern profile design with horizontal layout.
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, elevation, layout, shape, spacing, typography } from '@constants';

export const ScreenHeader = styled.div`
  margin-bottom: ${spacing.md};
`;

export const ProfileCard = styled.div`
  background: ${color.white};
  border: 2px solid ${brandColor.landingBlueDark};
  border-radius: ${shape.lg};
  box-shadow: ${elevation.md};
  overflow: hidden;
`;

export const ProfileHeader = styled.div`
  align-items: center;
  background: ${brandColor.landingBgYellow};
  border-bottom: 2px solid ${brandColor.landingBlueDark};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.lg};
  text-align: center;

  @media (min-width: ${layout.breakpoint.sm}) {
    flex-direction: row;
    gap: ${spacing.lg};
    text-align: left;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${spacing.micro};
`;

export const UserName = styled.h2`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.display};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.bold};
  margin: 0;

  @media (min-width: ${layout.breakpoint.sm}) {
    font-size: ${typography.size['2xl']};
  }
`;

export const UserEmail = styled.p`
  color: ${brandColor.landingTextGray};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  margin: 0;
`;

export const ProfileBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.div`
  border-bottom: 1px solid ${color.neutral200};
  padding: ${spacing.md};

  &:last-child {
    border-bottom: none;
  }
`;

export const SectionHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${spacing.sm};
`;

export const SectionTitle = styled.h3`
  align-items: center;
  color: ${brandColor.landingBlueDark};
  display: flex;
  font-family: ${typography.family.display};
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.semibold};
  gap: ${spacing.xs};
  margin: 0;

  svg {
    color: ${brandColor.cotiCoral};
    height: ${spacing.sm};
    width: ${spacing.sm};
  }
`;

export const EditButton = styled.button`
  align-items: center;
  background: ${brandColor.cotiCoral};
  border: none;
  border-radius: ${shape.md};
  color: ${color.white};
  cursor: pointer;
  display: inline-flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.semibold};
  gap: ${spacing.micro};
  padding: ${spacing.xs} ${spacing.sm};
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  svg {
    height: ${spacing.sm};
    width: ${spacing.sm};
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  gap: ${spacing.sm} ${spacing.md};
  grid-template-columns: 1fr;

  @media (min-width: ${layout.breakpoint.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${layout.breakpoint.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${layout.breakpoint.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
`;

export const InfoLabel = styled.span`
  color: ${brandColor.landingTextGray};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  text-transform: uppercase;
`;

export const InfoValue = styled.span`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
`;

export const AddressLine = styled.p`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  line-height: 1.6;
  margin: 0;
`;

export const EmptyState = styled.div`
  align-items: center;
  color: ${brandColor.landingTextGray};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  padding: ${spacing.sm} 0;
  text-align: center;

  svg {
    opacity: 0.5;
  }
`;

export const EmptyText = styled.p`
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  margin: 0;
`;

export const AddButton = styled.button`
  align-items: center;
  background: ${brandColor.cotiCoral};
  border: none;
  border-radius: ${shape.full};
  color: ${color.white};
  cursor: pointer;
  display: inline-flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  gap: ${spacing.xs};
  padding: ${spacing.sm} ${spacing.md};
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    height: ${spacing.sm};
    width: ${spacing.sm};
  }
`;

export const ProfileAvatar = styled.div`
  align-items: center;
  background-color: ${color.primary500};
  border-radius: 50%;
  color: ${color.white};
  display: flex;
  flex-shrink: 0;
  font-size: ${typography.size.xl};
  font-weight: ${typography.weight.bold};
  height: ${spacing['7xl']};
  justify-content: center;
  overflow: hidden;
  width: ${spacing['7xl']};
`;

export const ProfileAvatarImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
