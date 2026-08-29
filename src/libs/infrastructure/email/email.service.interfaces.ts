/**
 * Email Service Interfaces
 *
 * Type definitions for email service operations.
 * Travel Savings App: Challenge & Events vertical
 */

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface VerificationEmailParams {
  to: EmailRecipient;
  verificationToken: string;
  expiresInHours?: number;
}

export interface WelcomeEmailParams {
  to: EmailRecipient;
  eventName?: string;
  dashboardUrl?: string;
}

export interface EnrollmentConfirmationParams {
  to: EmailRecipient;
  eventName: string;
  enrollmentId: string;
  kitIncluded: boolean;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}
