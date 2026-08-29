/**
 * LazyFallback
 *
 * LazyFallback component.
 */

'use client';

import Logo from '@assets/branding/Logo.svg';

import { Container, LogoWrapper } from './LazyFallback.styled';

export const LazyFallback = () => (
  <Container>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
  </Container>
);
