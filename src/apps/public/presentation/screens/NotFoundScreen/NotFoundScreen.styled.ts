/**
 * NotFoundScreen Styled Components
 *
 * Unified styles for 404 and error pages.
 * Layout uses global PublicPageWrapper.
 */

'use client';

import styled from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

export const Section = styled.section`
  align-items: center;
  background-color: ${color.backgroundAlt};
  display: flex;
  flex: 1;
  justify-content: center;
  padding: ${spacing.lg} ${spacing.md};

  @media (width <= 768px) {
    padding: ${spacing.md} ${spacing.sm};
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  max-width: 700px;
  text-align: center;
`;

export const Illustration = styled.div`
  aspect-ratio: 869 / 651;
  max-width: 400px;
  position: relative;
  width: 100%;

  img {
    object-fit: contain;
  }
`;

export const ErrorCode = styled.span`
  color: ${color.primary500};
  font-family: ${typography.family.display};
  font-size: ${typography.size['8xl']};
  font-weight: ${typography.weight.black};
  line-height: 1;

  @media (width <= 768px) {
    font-size: ${typography.size['7xl']};
  }
`;

export const Title = styled.h1`
  color: ${color.textPrimary};
  font-family: ${typography.family.display};
  font-size: ${typography.size['6xl']};
  font-weight: ${typography.weight.bold};
  margin: 0;

  @media (width <= 768px) {
    font-size: ${typography.size['4xl']};
  }
`;

export const Message = styled.p`
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.lg};
  line-height: 1.6;
  margin: 0;

  @media (width <= 768px) {
    font-size: ${typography.size.base};
  }
`;

export const ErrorDetails = styled.div`
  background: ${color.neutral50};
  border: 1px solid ${color.neutral200};
  border-radius: ${shape.md};
  color: ${color.textSecondary};
  font-family: ${typography.family.body};
  font-size: ${typography.size.sm};
  max-width: 100%;
  overflow-wrap: break-word;
  overflow-x: auto;
  padding: ${spacing.sm};
  text-align: left;
  white-space: pre-wrap;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-top: ${spacing.xs};

  @media (width >= 480px) {
    flex-direction: row;
  }
`;
