/**
 * Resend Email Service
 *
 * Production-ready email service using Resend and React Email templates.
 * Travel Savings App: Challenge & Events vertical
 */

import { createElement } from 'react';

import { DEFAULT_FROM_EMAIL, isResendConfigured, renderEmailTemplate, resend } from '@config';
import { logError } from '@logger';

import type { EmailSendResult } from './email.service.interfaces';

/**
 * Send email using Resend with React Email template
 */
const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactElement
): Promise<EmailSendResult> => {
  try {
    if (!isResendConfigured()) {
      return {
        messageId: `mock_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
        success: true,
      };
    }

    const html = await renderEmailTemplate(template);

    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      html,
      subject,
      to,
    });

    if (error) {
      logError(new Error(`Resend API error: ${error.message} (name: ${error.name})`), 'sendEmail');
      return {
        error: error.message || 'Failed to send email',
        success: false,
      };
    }

    return {
      messageId: data?.id || 'unknown',
      success: true,
    };
  } catch (error) {
    logError(error, 'sendEmail');
    return {
      error: error instanceof Error ? error.message : 'Error sending email',
      success: false,
    };
  }
};

export const ResendEmailService = {
  sendPasswordResetEmail: async (
    email: string,
    name: string,
    resetUrl: string
  ): Promise<EmailSendResult> => {
    const { PasswordResetEmail } = await import('./templates/password-reset/PasswordResetEmail');

    const template = createElement(PasswordResetEmail, { name, resetUrl });

    return sendEmail(email, 'Restablecer contraseña - Travel Savings App', template);
  },
  sendWelcomeEmail: async (email: string, name: string): Promise<EmailSendResult> => {
    const { WelcomeEmail } = await import('./templates/welcome/WelcomeEmail');

    const template = createElement(WelcomeEmail, { email, name });

    return sendEmail(email, '¡Bienvenido/a a Travel Savings App! 🎉', template);
  },
};
