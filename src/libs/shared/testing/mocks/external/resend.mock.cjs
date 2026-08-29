/**
 * Mock for resend package
 * Prevents svix/uuid import errors in tests
 *
 * @module Resend Mock
 */

class Resend {
  constructor() {
    this.emails = {
      send: () =>
        Promise.resolve({
          created_at: new Date().toISOString(),
          from: 'test@example.com',
          id: 'mock-email-id',
          to: ['recipient@example.com'],
        }),
    };
  }
}

module.exports = { Resend };
