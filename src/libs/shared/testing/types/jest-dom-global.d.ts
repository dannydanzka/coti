/**
 * Global Jest DOM Types
 *
 * Declaraciones de tipos globales para @testing-library/jest-dom matchers
 * Compatible con Jest 29 y siguiendo mejores prácticas 2025
 */

interface JestDOMMatchers<R = void> {
  toBeInTheDocument(): R;
  toHaveTextContent(text?: string | RegExp): R;
  toHaveClass(...classNames: string[]): R;
  toHaveAttribute(attr: string, value?: unknown): R;
  toContainElement(element: HTMLElement | null): R;
  toBeVisible(): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toBeEmptyDOMElement(): R;
  toBeInvalid(): R;
  toBeRequired(): R;
  toBeValid(): R;
  toHaveFocus(): R;
  toHaveFormValues(expectedValues: Record<string, unknown>): R;
  toHaveStyle(css: string | Record<string, unknown>): R;
  toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R;
  toBeChecked(): R;
  toBePartiallyChecked(): R;
  toHaveDescription(text?: string | RegExp): R;
  toHaveErrorMessage(text?: string | RegExp): R;
  toContainHTML(htmlText: string): R;
  toHaveAccessibleDescription(text?: string | RegExp): R;
  toHaveAccessibleName(text?: string | RegExp): R;
  toHaveValue(value?: string | string[] | number): R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends JestDOMMatchers<R> {
      [key: string]: unknown;
    }
  }
}

export {};
