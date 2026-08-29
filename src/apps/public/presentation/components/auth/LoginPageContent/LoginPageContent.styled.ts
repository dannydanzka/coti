/**
 * Login Page Content Styled Components
 *
 * Styled components specific to the LoginPageContent component.
 */

import styled from 'styled-components';

import { color, layout, shape, spacing, typography } from '@constants';

export const LoginContainer = styled.div`
  align-items: center;
  background: linear-gradient(
    135deg,
    ${color.backgroundInverse} 0%,
    color.neutral800 50%,
    ${color.neutral900} 100%
  );
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: ${spacing.lg};
  position: relative;

  &::before {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E6B800' fill-opacity='0.03'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    content: '';
    inset: 0;
    position: absolute;
    z-index: 1;
  }
`;

export const LoginCard = styled.div`
  backdrop-filter: blur(10px);
  background: linear-gradient(
    145deg,
    rgb(${color.white} / 0.95) 0%,
    rgb(${color.white} / 0.9) 100%
  );
  border: 2px solid ${color.primary500};
  border-radius: ${shape.xl};
  box-shadow:
    0 25px 50px -12px rgb(${color.neutral900} / 0.5),
    0 0 30px rgb(${color.primary500} / 0.15),
    inset 0 1px 0 rgb(${color.white} / 0.1);
  max-width: 480px;
  padding: ${spacing['2xl']};
  position: relative;
  width: 100%;
  z-index: 2;

  @media (max-width: ${layout.breakpoint.sm}) {
    border-radius: ${shape.lg};
    margin: ${spacing.md};
    padding: ${spacing.xl};
  }

  &::before {
    background: linear-gradient(45deg, ${color.primary500}20, transparent, ${color.primary500}20);
    border-radius: ${shape.xl};
    content: '';
    inset: -2px;
    position: absolute;
    z-index: -1;
  }
`;

export const LoginHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${spacing.xl};
  text-align: center;
`;

export const LoginTitle = styled.div`
  align-items: center;
  background: linear-gradient(
    135deg,
    ${color.primary500} 0%,
    color.primary500 50%,
    ${color.primary500} 100%
  );
  background-clip: text;
  display: flex;
  font-family: ${typography.family.display};
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 900;
  justify-content: center;
  letter-spacing: -0.02em;
  margin-bottom: ${spacing.md};
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgb(${color.neutral900} / 0.1);
`;

export const TitleIcon = styled.div`
  background: linear-gradient(135deg, ${color.primary500}, color.primary500);
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgb(${color.primary500} / 0.3));
  margin-right: ${spacing.md};
  -webkit-text-fill-color: transparent;
`;

export const LoginSubtitle = styled.span`
  color: ${color.neutral700};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.medium};
  letter-spacing: 0.01em;
  margin-bottom: ${spacing.lg};
  text-transform: uppercase;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const FormLabel = styled.label`
  color: ${color.textPrimary};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.medium};
`;

export const FormInput = styled.input<{ $hasError?: boolean }>`
  background: ${({ $hasError }) =>
    $hasError
      ? `linear-gradient(145deg, rgb(${color.error} / 0.05) 0%, rgb(${color.white} / 1) 100%)`
      : `linear-gradient(145deg, rgb(${color.white} / 0.9) 0%, rgb(${color.neutral100} / 0.5) 100%)`};
  border: 2px solid ${({ $hasError }) => ($hasError ? color.error : color.neutral300)};
  border-radius: ${shape.lg};
  box-shadow: inset 0 2px 4px rgb(${color.neutral900} / 0.05);
  color: ${color.textPrimary};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.medium};
  padding: ${spacing.lg} ${spacing.md};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;

  &:focus {
    background: linear-gradient(
      145deg,
      rgb(${color.white} / 1) 0%,
      rgb(${color.white} / 0.95) 100%
    );
    border-color: ${color.primary500};
    box-shadow:
      inset 0 2px 4px rgb(${color.neutral900} / 0.05),
      0 0 0 4px rgb(${color.primary500} / 0.15),
      0 8px 16px rgb(${color.neutral900} / 0.1);
    outline: none;
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${color.neutral500};
    font-style: italic;
  }

  &:disabled {
    background-color: ${color.neutral100};
    border-color: ${color.neutral300};
    color: ${color.neutral500};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  align-items: center;
  color: ${color.error};
  display: flex;
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  gap: ${spacing.xs};

  &::before {
    content: '⚠';
    font-size: ${typography.size.base};
  }
`;

export { LoginButton, LoginFooter, FooterText, BrandLink } from './LoginPageContent.parts.styled';
