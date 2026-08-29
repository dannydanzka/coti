/**
 * Test Helpers - Utilities for testing
 *
 * Adapted to DearAdry patterns: Spanish locale, prop-controlled modals,
 * react-hook-form, styled-components.
 */
import type { Mock } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

export const user = {
  clickButton: async (name: string | RegExp, userEventInstance?: UserEvent) => {
    const userInstance = userEventInstance || user.setup();
    const nameRegex = typeof name === 'string' ? new RegExp(name, 'i') : name;
    const button = screen.getByRole('button', { name: nameRegex });
    await userInstance.click(button);
    return button;
  },
  fillForm: async (formData: Record<string, string>, userEventInstance?: UserEvent) => {
    const userInstance = userEventInstance || user.setup();
    for (const [field, value] of Object.entries(formData)) {
      const input = screen.getByLabelText(new RegExp(field, 'i'));
      await userInstance.clear(input);
      await userInstance.type(input, value);
    }
  },
  setup: (options: Parameters<typeof userEvent.setup>[0] = {}) =>
    userEvent.setup({ delay: null, ...options }),
  typeInField: async (label: string, value: string, userEventInstance?: UserEvent) => {
    const userInstance = userEventInstance || user.setup();
    const input = screen.getByLabelText(new RegExp(label, 'i'));
    await userInstance.clear(input);
    await userInstance.type(input, value);
    return input;
  },
};

export const async = {
  waitForAction: async (mockDispatch: Mock, actionType: string, timeout: number = 5000) => {
    await waitFor(
      () => {
        const { calls } = mockDispatch.mock;
        const actionCalled = calls.some((call: unknown[]) => {
          const action = call[0] as { type?: string };
          return action?.type === actionType;
        });
        expect(actionCalled).toBe(true);
      },
      { timeout }
    );
  },
  waitForCall: async (mockFn: Mock, timeout: number = 5000) => {
    await waitFor(
      () => {
        expect(mockFn).toHaveBeenCalled();
      },
      { timeout }
    );
  },
  waitForElement: async <T>(
    query: () => T,
    options: { timeout?: number; interval?: number } = {}
  ): Promise<T> => {
    return waitFor(query, { timeout: 5000, ...options });
  },
  waitForLoadingToFinish: async (testId = 'loading-state', timeout: number = 5000) => {
    await waitFor(
      () => {
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
      },
      { timeout }
    );
  },
};

export const modal = {
  assertClosed: (container: { querySelector: (s: string) => Element | null }) => {
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  },
  assertFormFields: (container: { querySelectorAll: (s: string) => NodeList }, minFields = 1) => {
    expect(container.querySelectorAll('input').length).toBeGreaterThanOrEqual(minFields);
  },
  assertOpen: () => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  },
  assertTitle: (title: string) => {
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  },
};

export const assertText = (text: string | RegExp) => {
  const matcher = typeof text === 'string' ? text : text;
  expect(screen.getByText(matcher)).toBeInTheDocument();
};

export const assertTexts = (texts: Array<string | RegExp>) => {
  for (const text of texts) {
    assertText(text);
  }
};

export const assertNoText = (text: string | RegExp) => {
  const matcher = typeof text === 'string' ? text : text;
  expect(screen.queryByText(matcher)).not.toBeInTheDocument();
};

export const assertTestId = (testId: string) => {
  expect(screen.getByTestId(testId)).toBeInTheDocument();
};

export const assertTestIds = (testIds: string[]) => {
  for (const testId of testIds) {
    assertTestId(testId);
  }
};

export const assertRole = (role: string, options?: { name?: string | RegExp }) => {
  expect(screen.getByRole(role, options)).toBeInTheDocument();
};

export const assertNoRole = (role: string, options?: { name?: string | RegExp }) => {
  expect(screen.queryByRole(role, options)).not.toBeInTheDocument();
};

export const assertEmpty = (container: { firstChild: ChildNode | null }) => {
  expect(container.firstChild).toBeNull();
};

export const assertEmptyContainer = (container: { innerHTML: string }) => {
  expect(container.innerHTML).toBe('');
};

export const assertSelector = (
  container: { querySelector: (s: string) => Element | null },
  selector: string
) => {
  expect(container.querySelector(selector)).toBeInTheDocument();
};

export const assertNoSelector = (
  container: { querySelector: (s: string) => Element | null },
  selector: string
) => {
  expect(container.querySelector(selector)).not.toBeInTheDocument();
};

export const assertMinElements = (
  container: { querySelectorAll: (s: string) => NodeList },
  selector: string,
  min = 1
) => {
  expect(container.querySelectorAll(selector).length).toBeGreaterThanOrEqual(min);
};

export const assertTextCount = (text: string | RegExp, min = 1) => {
  expect(screen.getAllByText(text).length).toBeGreaterThanOrEqual(min);
};

export const assertRoleCount = (role: string, min = 1, options?: { name?: string | RegExp }) => {
  expect(screen.getAllByRole(role, options).length).toBeGreaterThanOrEqual(min);
};

export const form = {
  assertButton: (name: string | RegExp, shouldBeEnabled = true) => {
    const nameRegex = typeof name === 'string' ? new RegExp(name, 'i') : name;
    const button = screen.getByRole('button', { name: nameRegex });
    expect(button).toBeInTheDocument();
    if (shouldBeEnabled) {
      expect(button).not.toBeDisabled();
    } else {
      expect(button).toBeDisabled();
    }
    return button;
  },
  assertError: (errorText: string) => {
    expect(screen.getByText(new RegExp(errorText, 'i'))).toBeInTheDocument();
  },
  assertField: (label: string, expectedType?: string) => {
    const field = screen.getByLabelText(new RegExp(label, 'i'));
    expect(field).toBeInTheDocument();
    if (expectedType) {
      expect(field).toHaveAttribute('type', expectedType);
    }
    return field;
  },
  assertFieldValue: (label: string, expectedValue: string) => {
    expect(screen.getByLabelText(new RegExp(label, 'i'))).toHaveValue(expectedValue);
  },
};
