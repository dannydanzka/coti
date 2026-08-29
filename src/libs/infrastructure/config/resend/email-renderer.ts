/**
 * React Email Renderer
 *
 * Helper functions to render React Email templates to HTML strings.
 * Uses @react-email/render for server-side rendering.
 *
 * @module Email Renderer
 */

import type { ReactElement } from 'react';

import { logError } from '@logger';
import { render } from '@react-email/render';

/**
 * Render a React Email component to HTML string
 *
 * @param template - React Email component
 * @returns HTML string ready for email sending
 */
export const renderEmailTemplate = async (template: ReactElement): Promise<string> => {
  try {
    const html = await render(template, {
      pretty: false,
    });

    return html;
  } catch (error) {
    logError(error, 'renderEmailTemplate');
    throw new Error(
      `Failed to render email template: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

/**
 * Render a React Email component to plain text
 *
 * @param template - React Email component
 * @returns Plain text version of the email
 */
export const renderEmailText = async (template: ReactElement): Promise<string> => {
  try {
    const text = await render(template, {
      plainText: true,
    });

    return text;
  } catch (error) {
    logError(error, 'renderEmailText');
    throw new Error(
      `Failed to render email text: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
