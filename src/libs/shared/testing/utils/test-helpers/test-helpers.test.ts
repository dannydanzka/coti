/**
 * Test Helpers Unit Tests
 *
 * Tests for centralized test utility functions.
 * NOTE: modal/form assertion tests use real DOM elements appended to document.body
 * because toBeInTheDocument() requires elements in the actual DOM.
 */

'use client';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  assertEmpty,
  assertEmptyContainer,
  assertMinElements,
  assertNoRole,
  assertNoSelector,
  assertNoText,
  assertRole,
  assertRoleCount,
  assertSelector,
  assertTestId,
  assertTestIds,
  assertText,
  assertTextCount,
  assertTexts,
  async,
  form,
  modal,
  user,
} from './test-helpers';

vi.mock('@testing-library/react', () => ({
  screen: {
    getAllByRole: vi.fn(),
    getAllByText: vi.fn(),
    getByLabelText: vi.fn(),
    getByRole: vi.fn(),
    getByTestId: vi.fn(),
    getByText: vi.fn(),
    queryByRole: vi.fn().mockReturnValue(null),
    queryByTestId: vi.fn(),
    queryByText: vi.fn().mockReturnValue(null),
  },
  waitFor: vi.fn().mockImplementation((fn) => Promise.resolve(fn())),
}));

vi.mock('@testing-library/user-event', () => ({
  __esModule: true,
  default: {
    setup: vi.fn(),
  },
}));

describe('Test Helpers', () => {
  const mockUserInstance = {
    clear: vi.fn(),
    click: vi.fn(),
    type: vi.fn(),
  };

  const mockInput = document.createElement('input');
  const mockButton = document.createElement('button');

  beforeEach(() => {
    vi.mocked(userEvent.setup).mockReturnValue(mockUserInstance as any);
    vi.mocked(screen.getByLabelText).mockReturnValue(mockInput);
    vi.mocked(screen.getByRole).mockReturnValue(mockButton);
  });

  describe('user.setup', () => {
    it('calls userEvent.setup with default delay null', () => {
      user.setup();
      expect(userEvent.setup).toHaveBeenCalledWith({ delay: null });
    });

    it('merges custom options with default delay', () => {
      const options = { advanceTimers: vi.fn() };
      user.setup(options);
      expect(userEvent.setup).toHaveBeenCalledWith({ delay: null, ...options });
    });
  });

  describe('user.fillForm', () => {
    it('fills form with provided data', async () => {
      const formData = { email: 'test@example.com', password: 'password123' };
      await user.fillForm(formData);

      expect(screen.getByLabelText).toHaveBeenCalledTimes(2);
      expect(mockUserInstance.clear).toHaveBeenCalledTimes(2);
      expect(mockUserInstance.type).toHaveBeenCalledWith(mockInput, 'test@example.com');
      expect(mockUserInstance.type).toHaveBeenCalledWith(mockInput, 'password123');
    });

    it('handles empty form data', async () => {
      await user.fillForm({});
      expect(screen.getByLabelText).not.toHaveBeenCalled();
    });
  });

  describe('user.typeInField', () => {
    it('types value into labeled field', async () => {
      const result = await user.typeInField('Email', 'maria@dearadry.com');
      expect(screen.getByLabelText).toHaveBeenCalledWith(/Email/i);
      expect(mockUserInstance.clear).toHaveBeenCalledWith(mockInput);
      expect(mockUserInstance.type).toHaveBeenCalledWith(mockInput, 'maria@dearadry.com');
      expect(result).toBe(mockInput);
    });
  });

  describe('user.clickButton', () => {
    it('clicks button by name string', async () => {
      await user.clickButton('Iniciar sesión');
      expect(screen.getByRole).toHaveBeenCalledWith('button', { name: /Iniciar sesión/i });
      expect(mockUserInstance.click).toHaveBeenCalledWith(mockButton);
    });

    it('clicks button by name regex', async () => {
      await user.clickButton(/guardar/i);
      expect(screen.getByRole).toHaveBeenCalledWith('button', { name: /guardar/i });
    });
  });

  describe('async utilities', () => {
    it('waitForCall resolves when mock is called', async () => {
      const mockFn = vi.fn();
      mockFn();
      await expect(async.waitForCall(mockFn)).resolves.not.toThrow();
    });

    it('waitForElement resolves', async () => {
      const query = vi.fn().mockReturnValue('element');
      const result = await async.waitForElement(query);
      expect(result).toBe('element');
    });

    it('waitForLoadingToFinish checks loading-state by default', async () => {
      vi.mocked(screen.queryByTestId).mockReturnValueOnce(null);
      await expect(async.waitForLoadingToFinish()).resolves.not.toThrow();
    });

    it('waitForAction resolves when action dispatched', async () => {
      const mockDispatch = vi.fn();
      mockDispatch.mock.calls = [[{ type: 'test/action' }]];
      await expect(async.waitForAction(mockDispatch, 'test/action')).resolves.not.toThrow();
    });
  });

  describe('modal assertions', () => {
    it('assertOpen calls screen.getByRole with dialog', () => {
      const dialogEl = document.createElement('div');
      document.body.appendChild(dialogEl);
      vi.mocked(screen.getByRole).mockReturnValueOnce(dialogEl);

      modal.assertOpen();
      expect(screen.getByRole).toHaveBeenCalledWith('dialog');

      document.body.removeChild(dialogEl);
    });

    it('assertClosed checks container for missing dialog', () => {
      const container = { querySelector: vi.fn().mockReturnValue(null) };
      modal.assertClosed(container);
      expect(container.querySelector).toHaveBeenCalledWith('[role="dialog"]');
    });

    it('assertTitle checks text and dialog presence', () => {
      const titleEl = document.createElement('h2');
      const dialogEl = document.createElement('div');
      document.body.appendChild(titleEl);
      document.body.appendChild(dialogEl);
      vi.mocked(screen.getByText).mockReturnValueOnce(titleEl);
      vi.mocked(screen.getByRole).mockReturnValueOnce(dialogEl);

      modal.assertTitle('Crear usuario');
      expect(screen.getByText).toHaveBeenCalledWith('Crear usuario');

      document.body.removeChild(titleEl);
      document.body.removeChild(dialogEl);
    });

    it('assertFormFields checks min input count', () => {
      const container = document.createElement('div');
      container.innerHTML = '<input /><input />';
      modal.assertFormFields(container, 2);
    });
  });

  describe('text assertions', () => {
    it('assertText verifies text is present', () => {
      const el = document.createElement('span');
      el.textContent = 'Hola mundo';
      document.body.appendChild(el);
      vi.mocked(screen.getByText).mockReturnValueOnce(el);

      assertText('Hola mundo');
      expect(screen.getByText).toHaveBeenCalledWith('Hola mundo');

      document.body.removeChild(el);
    });

    it('assertTexts verifies multiple texts', () => {
      const el1 = document.createElement('span');
      const el2 = document.createElement('span');
      document.body.appendChild(el1);
      document.body.appendChild(el2);
      vi.mocked(screen.getByText).mockReturnValueOnce(el1).mockReturnValueOnce(el2);

      assertTexts(['Texto A', 'Texto B']);
      expect(screen.getByText).toHaveBeenCalledTimes(2);

      document.body.removeChild(el1);
      document.body.removeChild(el2);
    });

    it('assertNoText verifies text is absent', () => {
      vi.mocked(screen.queryByTestId).mockReturnValueOnce(null);

      assertNoText('Texto inexistente');
      expect(screen.queryByText).toHaveBeenCalledWith('Texto inexistente');
    });
  });

  describe('form assertions', () => {
    it('assertField checks labeled input exists', () => {
      document.body.appendChild(mockInput);
      vi.mocked(screen.getByLabelText).mockReturnValueOnce(mockInput);

      const result = form.assertField('Email');
      expect(result).toBe(mockInput);

      document.body.removeChild(mockInput);
    });

    it('assertError checks error text is visible', () => {
      const errorEl = document.createElement('span');
      document.body.appendChild(errorEl);
      vi.mocked(screen.getByText).mockReturnValueOnce(errorEl);

      form.assertError('Email inválido');
      expect(screen.getByText).toHaveBeenCalledWith(/Email inválido/i);

      document.body.removeChild(errorEl);
    });

    it('assertButton checks button exists and is enabled', () => {
      document.body.appendChild(mockButton);
      vi.mocked(screen.getByRole).mockReturnValueOnce(mockButton);

      const result = form.assertButton('Guardar');
      expect(result).toBe(mockButton);

      document.body.removeChild(mockButton);
    });
  });

  describe('testId assertions', () => {
    it('assertTestId verifies element by test ID', () => {
      const el = document.createElement('div');
      document.body.appendChild(el);
      vi.mocked(screen.getByTestId).mockReturnValueOnce(el);

      assertTestId('loading-state');
      expect(screen.getByTestId).toHaveBeenCalledWith('loading-state');

      document.body.removeChild(el);
    });

    it('assertTestIds verifies multiple test IDs', () => {
      const el1 = document.createElement('div');
      const el2 = document.createElement('div');
      document.body.appendChild(el1);
      document.body.appendChild(el2);
      vi.mocked(screen.getByTestId).mockReturnValueOnce(el1).mockReturnValueOnce(el2);

      assertTestIds(['hero', 'main-content']);
      expect(screen.getByTestId).toHaveBeenCalledTimes(2);

      document.body.removeChild(el1);
      document.body.removeChild(el2);
    });
  });

  describe('role assertions', () => {
    it('assertRole verifies element by role', () => {
      const el = document.createElement('div');
      document.body.appendChild(el);
      vi.mocked(screen.getByRole).mockReturnValueOnce(el);

      assertRole('dialog');
      expect(screen.getByRole).toHaveBeenCalledWith('dialog', undefined);

      document.body.removeChild(el);
    });

    it('assertRole with name option', () => {
      const el = document.createElement('button');
      document.body.appendChild(el);
      vi.mocked(screen.getByRole).mockReturnValueOnce(el);

      assertRole('button', { name: 'Guardar' });
      expect(screen.getByRole).toHaveBeenCalledWith('button', { name: 'Guardar' });

      document.body.removeChild(el);
    });

    it('assertNoRole verifies element is absent', () => {
      vi.mocked(screen.queryByRole).mockReturnValueOnce(null);

      assertNoRole('button');
      expect(screen.queryByRole).toHaveBeenCalledWith('button', undefined);
    });
  });

  describe('assertEmpty', () => {
    it('verifies container has no children', () => {
      const container = { firstChild: null };
      assertEmpty(container);
    });
  });

  describe('container assertions', () => {
    it('assertEmptyContainer verifies empty innerHTML', () => {
      const container = { innerHTML: '' };
      assertEmptyContainer(container);
    });

    it('assertSelector verifies element exists by CSS selector', () => {
      const el = document.createElement('input');
      document.body.appendChild(el);
      const container = { querySelector: vi.fn().mockReturnValue(el) };

      assertSelector(container, 'input[type="file"]');
      expect(container.querySelector).toHaveBeenCalledWith('input[type="file"]');

      document.body.removeChild(el);
    });

    it('assertNoSelector verifies element absent by CSS selector', () => {
      const container = { querySelector: vi.fn().mockReturnValue(null) };
      assertNoSelector(container, '[role="dialog"]');
      expect(container.querySelector).toHaveBeenCalledWith('[role="dialog"]');
    });

    it('assertMinElements verifies minimum element count', () => {
      const container = document.createElement('div');
      container.innerHTML = '<input /><input /><input />';
      assertMinElements(container, 'input', 2);
    });
  });

  describe('count assertions', () => {
    it('assertTextCount verifies minimum text occurrences', () => {
      const els = [document.createElement('span'), document.createElement('span')];
      vi.mocked(screen.getAllByText).mockReturnValueOnce(els);

      assertTextCount('Evento', 2);
      expect(screen.getAllByText).toHaveBeenCalledWith('Evento');
    });

    it('assertRoleCount verifies minimum role occurrences', () => {
      const els = [document.createElement('button'), document.createElement('button')];
      vi.mocked(screen.getAllByRole).mockReturnValueOnce(els);

      assertRoleCount('button', 1);
      expect(screen.getAllByRole).toHaveBeenCalledWith('button', undefined);
    });

    it('assertRoleCount with options', () => {
      const els = [document.createElement('a')];
      vi.mocked(screen.getAllByRole).mockReturnValueOnce(els);

      assertRoleCount('link', 1, { name: /inicio/i });
      expect(screen.getAllByRole).toHaveBeenCalledWith('link', { name: /inicio/i });
    });
  });
});
