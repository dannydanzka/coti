/**
 * Footer Component
 *
 * Site footer with navigation links and social media icons.
 * Shows different links based on authentication state.
 * Design: Neubrutalismo suave with Montserrat font.
 *
 * Uses useAuth (AuthContext) as SINGLE SOURCE OF TRUTH for auth state.
 */

'use client';

import { useTranslation } from 'react-i18next';

import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from '@components/icons';
import { FOOTER_LINKS, FOOTER_LINKS_AUTHENTICATED, FOOTER_UI_TEXT, SOCIAL_LINKS } from '@constants';
import { useAuth, useLayoutBgColor } from '@hooks';

import type { FooterProps } from './Footer.interfaces';

import {
  Copyright,
  FooterBottom,
  FooterBrandSection,
  FooterContainer,
  FooterContent,
  FooterLink,
  FooterLinksContainer,
  FooterLogo,
  FooterSection,
  FooterTitle,
  SocialIcon,
  SocialLinks,
} from './Footer.styled';

export const Footer = ({ bgColor }: FooterProps) => {
  const { t } = useTranslation();
  const { layoutBgColor } = useLayoutBgColor();
  const { isAuthenticated, isLoading } = useAuth();
  const effectiveBgColor = bgColor ?? layoutBgColor ?? undefined;

  const showAuthenticatedLinks = !isLoading && isAuthenticated;

  const renderBrandSection = () => (
    <FooterBrandSection>
      <FooterLogo>{FOOTER_UI_TEXT.BRAND_NAME}</FooterLogo>
      <SocialLinks>
        <SocialIcon
          aria-label={t('footer.facebook')}
          href={SOCIAL_LINKS.FACEBOOK}
          rel='noopener noreferrer'
          target='_blank'
        >
          <FacebookIcon />
        </SocialIcon>
        <SocialIcon
          aria-label={t('footer.instagram')}
          href={SOCIAL_LINKS.INSTAGRAM}
          rel='noopener noreferrer'
          target='_blank'
        >
          <InstagramIcon />
        </SocialIcon>
        <SocialIcon
          aria-label={t('footer.tiktok')}
          href={SOCIAL_LINKS.TIKTOK}
          rel='noopener noreferrer'
          target='_blank'
        >
          <TiktokIcon />
        </SocialIcon>
        <SocialIcon
          aria-label={t('footer.youtube')}
          href={SOCIAL_LINKS.YOUTUBE}
          rel='noopener noreferrer'
          target='_blank'
        >
          <YoutubeIcon />
        </SocialIcon>
      </SocialLinks>
    </FooterBrandSection>
  );

  /** Una sección sin enlaces no se pinta: evita encabezados huérfanos. */
  const renderLinksSection = (
    title: string,
    links: ReadonlyArray<{ href: string; label: string }>
  ) =>
    links.length === 0 ? null : (
      <FooterSection>
        <FooterTitle>{title}</FooterTitle>
        {links.map((link) => (
          <FooterLink href={link.href} key={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </FooterSection>
    );

  const renderFooterBottom = () => (
    <FooterBottom>
      <FooterSection>
        <Copyright>{FOOTER_UI_TEXT.COPYRIGHT}</Copyright>
      </FooterSection>
    </FooterBottom>
  );

  const renderPublicLinks = () => (
    <FooterLinksContainer>
      {renderLinksSection(FOOTER_UI_TEXT.SECTION_ABOUT, FOOTER_LINKS.ABOUT)}
      {renderLinksSection(FOOTER_UI_TEXT.SECTION_LEGAL, FOOTER_LINKS.LEGAL)}
      {renderLinksSection(FOOTER_UI_TEXT.SECTION_SUPPORT, FOOTER_LINKS.SUPPORT)}
    </FooterLinksContainer>
  );

  const renderAuthenticatedLinks = () => (
    <FooterLinksContainer>
      {renderLinksSection(FOOTER_UI_TEXT.SECTION_NAVIGATION, FOOTER_LINKS_AUTHENTICATED.ABOUT)}
      {renderLinksSection(FOOTER_UI_TEXT.SECTION_ACCOUNT, FOOTER_LINKS_AUTHENTICATED.ACCOUNT)}
      {renderLinksSection(FOOTER_UI_TEXT.SECTION_LEGAL, FOOTER_LINKS_AUTHENTICATED.LEGAL)}
      {renderLinksSection(FOOTER_UI_TEXT.SECTION_SUPPORT, FOOTER_LINKS_AUTHENTICATED.SUPPORT)}
    </FooterLinksContainer>
  );

  return (
    <FooterContainer $bgColor={effectiveBgColor}>
      <FooterContent>
        {renderBrandSection()}
        {showAuthenticatedLinks ? renderAuthenticatedLinks() : renderPublicLinks()}
      </FooterContent>
      {renderFooterBottom()}
    </FooterContainer>
  );
};
