/**
 * Tabs Component Tests
 *
 * Spanish locale mandatory.
 */

import { assertText, assertTexts, renderWithProviders, screen } from '@testing';

import { Tabs } from './Tabs';

const tabs = [
  { content: <div>Contenido General</div>, id: 'general', label: 'General' },
  { badge: 3, content: <div>Contenido Pagos</div>, id: 'pagos', label: 'Pagos' },
  {
    content: <div>Contenido Desactivado</div>,
    disabled: true,
    id: 'disabled',
    label: 'Desactivado',
  },
];

describe('Tabs', () => {
  it('renders tab buttons and active content', () => {
    renderWithProviders(<Tabs activeTabId='general' tabs={tabs} onTabChange={vi.fn()} />);
    assertTexts(['General', 'Pagos', 'Desactivado', 'Contenido General']);
  });

  it('renders badge', () => {
    renderWithProviders(<Tabs activeTabId='pagos' tabs={tabs} onTabChange={vi.fn()} />);
    assertText('3');
  });

  it('marks active tab as selected', () => {
    renderWithProviders(<Tabs activeTabId='general' tabs={tabs} onTabChange={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'General' })).toHaveAttribute('aria-selected', 'true');
  });
});
