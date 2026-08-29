/**
 * Footer Styled Components
 *
 * Design: Neubrutalismo suave with Montserrat font.
 * Yellow background (#FFEBB5) for landing pages.
 */

'use client';

import styled from 'styled-components';

import { brandColor, layout, spacing, typography } from '@constants';

export const FooterContainer = styled.footer<{ $bgColor?: string }>`
  background-color: ${({ $bgColor }) => $bgColor ?? brandColor.bgHeader};
  margin-top: auto;
  padding: ${spacing.lg} ${spacing.sm};

  @media (min-width: ${layout.breakpoint.md}) {
    padding: ${spacing['2xl']} ${spacing.lg};
  }
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin: 0 auto;
  max-width: 1200px;

  @media (min-width: ${layout.breakpoint.md}) {
    flex-direction: row;
    gap: ${spacing['2xl']};
  }
`;

export const FooterBrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};

  @media (min-width: ${layout.breakpoint.md}) {
    min-width: 200px;
  }
`;

export const FooterLogo = styled.span`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.display};
  font-size: ${typography.size.lg};
  font-weight: ${typography.weight.semibold};
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const SocialIcon = styled.a`
  align-items: center;
  color: ${brandColor.landingTextGray};
  display: flex;
  height: ${spacing.md};
  justify-content: center;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  width: ${spacing.md};

  svg {
    height: ${spacing.sm};
    width: ${spacing.sm};
  }

  &:hover {
    color: ${brandColor.landingBlueDark};
  }
`;

export const FooterLinksContainer = styled.div`
  display: grid;
  flex: 1;
  gap: ${spacing.md};
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${layout.breakpoint.md}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${layout.breakpoint.lg}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const FooterTitle = styled.h3`
  color: ${brandColor.landingBlueDark};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weight.semibold};
  margin: 0 0 ${spacing.micro} 0;
`;

export const FooterLink = styled.a`
  color: ${brandColor.landingTextGray};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${brandColor.landingBlueDark};
  }
`;

export const FooterBottom = styled.div`
  align-items: center;
  border-top: 1px solid ${brandColor.landingBlueDark}1A;
  display: flex;
  justify-content: center;
  margin: ${spacing.lg} auto 0;
  max-width: 1200px;
  padding-top: ${spacing.md};
`;

export const Copyright = styled.p`
  color: ${brandColor.landingTextGray};
  font-family: ${typography.family.body};
  font-size: ${typography.size.xs};
  margin: 0;
  text-align: center;
`;
