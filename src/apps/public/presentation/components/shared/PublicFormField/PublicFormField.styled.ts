/**
 * PublicFormField Styled Components
 *
 * Standard form styling for all Public/Participant screens.
 * Reference: ProfileEditScreen.styled.ts
 */

'use client';

import styled from 'styled-components';

import { brandColor, color, shape, spacing, typography } from '@constants';

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.micro};
`;

export const Label = styled.label`
  color: ${brandColor.landingTextGray};
  display: flex;
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  justify-content: space-between;
  text-transform: uppercase;
`;

export const LabelText = styled.span`
  display: flex;
`;

export const RequiredAsterisk = styled.span`
  color: ${color.error};
  margin-left: ${spacing.micro};
`;

export const CharCount = styled.span`
  color: ${brandColor.landingTextGray};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weight.regular};
  text-transform: none;
`;

export const Input = styled.input`
  background: ${color.white};
  border: 1px solid ${color.neutral300};
  border-radius: ${shape.sm};
  box-sizing: border-box;
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  padding: ${spacing.sm} ${spacing.xs};
  transition: border-color 0.2s ease-in-out;
  width: 100%;

  &:focus {
    border-color: ${brandColor.landingBlueDark};
    outline: none;
  }

  &::placeholder {
    color: ${color.neutral400};
  }

  &:disabled {
    background: ${color.neutral100};
    color: ${brandColor.landingTextGray};
    cursor: not-allowed;
  }
`;
