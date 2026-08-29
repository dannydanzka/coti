/**
 * LoginForm Styled Components
 *
 * Styled components for login form.
 */

'use client';

import styled from 'styled-components';

import { color, spacing, textPreset } from '@constants';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  width: 100%;
`;

export const FormTitle = styled.h2`
  color: ${color.neutral900};
  font-family: ${textPreset.h2.fontFamily};
  font-size: ${textPreset.h3.fontSize};
  font-weight: ${textPreset.h2.fontWeight};
  line-height: ${textPreset.h2.lineHeight};
  margin-bottom: ${spacing.xs};
  text-align: center;
`;

export const FormDescription = styled.p`
  color: ${color.neutral700};
  font-family: ${textPreset.body.fontFamily};
  font-size: ${textPreset.body.fontSize};
  line-height: ${textPreset.body.lineHeight};
  margin-bottom: ${spacing.md};
  text-align: center;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-top: ${spacing.sm};
`;

export const FormLink = styled.a`
  color: ${color.primary600};
  cursor: pointer;
  font-family: ${textPreset.body.fontFamily};
  font-size: ${textPreset.bodySmall.fontSize};
  text-align: center;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${color.primary700};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${color.primary500};
    outline-offset: 2px;
  }
`;

export const FormError = styled.div`
  background: ${color.errorLight};
  border-left: 4px solid ${color.error};
  border-radius: 4px;
  color: ${color.errorDark};
  font-family: ${textPreset.body.fontFamily};
  font-size: ${textPreset.bodySmall.fontSize};
  padding: ${spacing.sm};
`;

export const FormDivider = styled.div`
  align-items: center;
  display: flex;
  gap: ${spacing.sm};
  margin: ${spacing.sm} 0;

  &::before,
  &::after {
    background: ${color.neutral300};
    content: '';
    flex: 1;
    height: 1px;
  }
`;

export const FormDividerText = styled.span`
  color: ${color.neutral700};
  font-family: ${textPreset.body.fontFamily};
  font-size: ${textPreset.bodySmall.fontSize};
`;
