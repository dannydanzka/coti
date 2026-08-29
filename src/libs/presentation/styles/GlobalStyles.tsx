/**
 * Global Styles (Flat Maps Pattern)
 *
 * Global CSS styles using styled-components and color.
 * Includes CSS reset, typography, and base styles.
 * Uses direct color imports to avoid SSR theme context issues.
 */

'use client';

import { createGlobalStyle } from 'styled-components';

import { color, shape, spacing, typography } from '@constants';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Root HTML */
  html {
    font-size: 16px; /* Base font size for rem calculations */
    height: 100%;
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
    text-size-adjust: 100%;
  }

  /* Body */
  body {
    background-color: ${color.background};
    color: ${color.textPrimary};
    font-family: ${typography.family.body};
    font-size: ${typography.size.base};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: ${typography.weight.regular};
    min-height: 100%;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    color: ${color.textPrimary};
    font-family: ${typography.family.display};
    font-weight: ${typography.weight.bold};
    margin-bottom: ${spacing.md};
  }

  h1 {
    font-size: ${typography.size['4xl']};
  }

  h2 {
    font-size: ${typography.size['3xl']};
  }

  h3 {
    font-size: ${typography.size['2xl']};
  }

  h4 {
    font-size: ${typography.size.xl};
  }

  h5 {
    font-size: ${typography.size.lg};
  }

  h6 {
    font-size: ${typography.size.base};
  }

  p {
    color: ${color.textPrimary};
    margin-bottom: ${spacing.md};
  }

  /* Links */
  a {
    color: ${color.textAccent};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover,
    &:focus {
      color: ${color.primary600};
      text-decoration: underline;
    }
  }

  /* Lists */
  ul, ol {
    margin-bottom: ${spacing.md};
    padding-left: ${spacing.lg};
  }

  li {
    margin-bottom: ${spacing.xs};
  }

  /* Form Elements */
  input,
  textarea,
  select,
  button {
    font-family: inherit;
    font-size: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input,
  textarea,
  select {
    border: 1px solid ${color.border};
    border-radius: ${shape.md};
    padding: ${spacing.sm} ${spacing.md};

    &:focus {
      border-color: ${color.textAccent};
      box-shadow: 0 0 0 2px ${color.primary100};
      outline: none;
    }

    &:disabled {
      background-color: ${color.neutral100};
      cursor: not-allowed;
    }
  }

  /* Images */
  img {
    display: block;
    height: auto;
    max-width: 100%;
  }

  /* Tables */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border-bottom: 1px solid ${color.border};
    padding: ${spacing.sm};
    text-align: left;
  }

  th {
    background-color: ${color.backgroundDark};
    color: ${color.textPrimary};
    font-weight: ${typography.weight.semibold};
  }

  /* Code */
  code,
  pre {
    background-color: ${color.neutral100};
    border-radius: ${shape.sm};
    font-family: ${typography.family.mono};
    font-size: ${typography.size.sm};
    padding: ${spacing.xs} ${spacing.sm};
  }

  pre {
    display: block;
    margin-bottom: ${spacing.md};
    overflow-x: auto;
    padding: ${spacing.md};
  }

  /* Focus Styles */
  :focus-visible {
    outline: 2px solid ${color.textAccent};
    outline-offset: 2px;
  }

  /* Selection */
  ::selection {
    background-color: ${color.primary200};
    color: ${color.textPrimary};
  }

  /* Scrollbar Styling (Webkit) */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${color.backgroundDark};
  }

  ::-webkit-scrollbar-thumb {
    background: ${color.neutral400};
    border-radius: ${shape.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${color.neutral600};
  }

  /* Utility Classes */
  .sr-only {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .font-bold {
    font-weight: ${typography.weight.bold};
  }

  .font-semibold {
    font-weight: ${typography.weight.semibold};
  }

  .text-accent {
    color: ${color.textAccent};
  }

  .text-secondary {
    color: ${color.textSecondary};
  }
`;
