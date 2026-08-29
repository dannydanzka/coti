/**
 * Authenticated Layout Styled Components
 */

'use client';

import styled from 'styled-components';

import { layout, spacing } from '@constants';

export const AuthenticatedContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
`;

export const PageContent = styled.main`
  flex: 1;
  padding: ${spacing.xl};

  @media (max-width: ${layout.breakpoint.md}) {
    padding: ${spacing.md};
  }
`;
