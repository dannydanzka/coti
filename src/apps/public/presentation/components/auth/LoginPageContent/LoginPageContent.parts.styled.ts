/**
 * LoginPageContent Styled Components - Part 2
 *
 * Additional styled components for LoginPageContent.
 */

import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

export const LoginButton = styled.button<{ $isLoading?: boolean }>`
  align-items: center;
  background: linear-gradient(
    135deg,
    ${color.primary500} 0%,
    color.primary500 50%,
    ${color.primary500} 100%
  );
  border: none;
  border-radius: ${shape.lg};
  box-shadow:
    0 8px 16px rgb(${color.primary500} / 0.3),
    0 4px 8px rgb(${color.neutral900} / 0.1);
  color: ${color.backgroundInverse};
  cursor: pointer;
  display: flex;
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.bold};
  gap: ${spacing.sm};
  justify-content: center;
  letter-spacing: 0.02em;
  margin-top: ${spacing.md};
  padding: ${spacing.lg} ${spacing.xl};
  position: relative;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;

  &::before {
    background: linear-gradient(
      135deg,
      color.primary500 0%,
      ${color.primary500} 50%,
      color.primary500 100%
    );
    border-radius: ${shape.lg};
    content: '';
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover:not(:disabled) {
    box-shadow:
      0 ${spacing.sm} ${spacing.md} rgb(${color.primary500} / 0.4),
      0 ${spacing.micro} ${spacing.sm} rgb(${color.neutral900} / 0.15);
    transform: translateY(-3px);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${color.neutral400};
    box-shadow: none;
    color: ${color.neutral500};
    cursor: not-allowed;
    transform: none;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    `
    cursor: not-allowed;
    &::before { opacity: 0; }
  `}
`;

export const LoginFooter = styled.div`
  border-top: 1px solid ${color.neutral300};
  margin-top: ${spacing.xl};
  padding-top: ${spacing.lg};
  text-align: center;
`;

export const FooterText = styled.span`
  color: ${color.neutral600};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
  line-height: 1.5;
`;

export const BrandLink = styled.a`
  background: linear-gradient(135deg, ${color.primary500}, color.primary500);
  background-clip: text;
  font-weight: ${typography.weight.bold};
  position: relative;
  text-decoration: none;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  &::after {
    background: linear-gradient(135deg, ${color.primary500}, color.primary500);
    bottom: -2px;
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    transform: scaleX(0);
    transition: transform 0.3s ease;
    width: 100%;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;
