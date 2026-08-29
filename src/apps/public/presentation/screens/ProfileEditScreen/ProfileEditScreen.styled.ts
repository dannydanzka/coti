/**
 * ProfileEditScreen Styled Components
 *
 * Form styling for profile editing with responsive grid.
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, elevation, layout, shape, spacing, typography } from '@constants';

export const HeaderRow = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};

  @media (min-width: ${layout.breakpoint.sm}) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const HeaderTitles = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const FormCard = styled.form`
  background: ${color.white};
  border: 2px solid ${brandColor.landingBlueDark};
  border-radius: ${shape.lg};
  box-shadow: ${elevation.md};
  overflow: hidden;
`;

export const FormSection = styled.div`
  border-bottom: 1px solid ${color.neutral200};
  padding: ${spacing.md};

  &:last-child {
    border-bottom: none;
  }
`;

export const SectionTitle = styled.h2`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.display};
  font-size: ${typography.size.base};
  font-weight: ${typography.weight.semibold};
  margin: 0 0 ${spacing.sm} 0;
`;

export const FormGrid = styled.div`
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

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
`;

export const FullWidthField = styled(FormField)`
  @media (min-width: ${layout.breakpoint.sm}) {
    grid-column: span 2;
  }

  @media (min-width: ${layout.breakpoint.md}) {
    grid-column: span 3;
  }

  @media (min-width: ${layout.breakpoint.lg}) {
    grid-column: span 4;
  }
`;

export const Label = styled.label`
  color: ${brandColor.landingTextGray};
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  justify-content: space-between;
  text-transform: uppercase;
`;

export const CharCount = styled.span`
  color: ${brandColor.landingTextGray};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.regular};
  text-transform: none;
`;

export const RequiredAsterisk = styled.span`
  color: ${color.error};
  margin-left: ${spacing.micro};
`;

export const LabelText = styled.span`
  display: flex;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  background: ${color.white};
  border: 1px solid ${({ $hasError }) => ($hasError ? color.error : color.neutral300)};
  border-radius: ${shape.sm};
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.sm} ${spacing.xs};
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${brandColor.landingBlueDark};
    outline: none;
  }

  &:disabled {
    background: ${color.neutral100};
    color: ${brandColor.landingTextGray};
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea<{ $hasError?: boolean }>`
  background: ${color.white};
  border: 1px solid ${({ $hasError }) => ($hasError ? color.error : color.neutral300)};
  border-radius: ${shape.sm};
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  min-height: 100px;
  padding: ${spacing.sm};
  resize: vertical;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${brandColor.landingBlueDark};
    outline: none;
  }
`;

export const ErrorText = styled.span`
  color: ${color.error};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
`;

export const CancelButton = styled.button`
  background: transparent;
  border: 2px solid ${brandColor.landingBlueDark};
  border-radius: ${shape.lg};
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  padding: ${spacing.sm} ${spacing.lg};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${brandColor.landingBlueDark};
    color: ${color.white};
  }
`;

export const SaveButton = styled.button`
  background: ${brandColor.cotiCoral};
  border: none;
  border-radius: ${shape.lg};
  color: ${color.white};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  padding: ${spacing.sm} ${spacing.lg};
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const SuccessMessage = styled.div`
  background: ${color.successBackground};
  border: 1px solid ${color.success};
  border-radius: ${shape.md};
  color: ${color.successDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.sm} ${spacing.md};
  text-align: center;
`;

export const ErrorMessage = styled.div`
  background: ${color.errorBackground};
  border: 1px solid ${color.error};
  border-radius: ${shape.md};
  color: ${color.errorDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.sm} ${spacing.md};
  text-align: center;
`;

export const DisabledNote = styled.span`
  color: ${brandColor.landingTextGray};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  font-style: italic;
`;

/** Country Selector Components */
export const CountrySelectorWrapper = styled.div`
  position: relative;
`;

export const CountryInput = styled.input`
  background: ${color.white};
  border: 1px solid ${color.neutral300};
  border-radius: ${shape.sm};
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.sm};
  padding-right: ${spacing.xl};
  transition: border-color 0.2s ease-in-out;
  width: 100%;

  &:focus {
    border-color: ${brandColor.landingBlueDark};
    cursor: text;
    outline: none;
  }

  &::placeholder {
    color: ${color.neutral400};
  }
`;

export const CountryDropdownIcon = styled.span<{ $isOpen: boolean }>`
  align-items: center;
  color: ${brandColor.landingTextGray};
  display: flex;
  pointer-events: none;
  position: absolute;
  right: ${spacing.sm};
  top: 50%;
  transform: translateY(-50%) ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.2s ease-in-out;
`;

export const CountryDropdown = styled.ul<{ $isOpen: boolean }>`
  background: ${color.white};
  border: 1px solid ${color.neutral300};
  border-radius: ${shape.sm};
  box-shadow: ${elevation.lg};
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  left: 0;
  list-style: none;
  margin: ${spacing.micro} 0 0 0;
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 10;
`;

export const CountryOption = styled.li<{ $isHighlighted?: boolean }>`
  background: ${({ $isHighlighted }) => ($isHighlighted ? color.neutral100 : 'transparent')};
  color: ${brandColor.landingBlueDark};
  cursor: pointer;
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.sm} ${spacing.md};
  transition: background 0.1s ease-in-out;

  &:hover {
    background: ${color.neutral100};
  }
`;

export const NoResults = styled.li`
  color: ${brandColor.landingTextGray};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-style: italic;
  padding: ${spacing.sm} ${spacing.md};
  text-align: center;
`;
