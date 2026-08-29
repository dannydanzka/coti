/**
 * PublicShell Component Tests
 */

import { assertNoRole, assertTestId, assertText, assertTexts, render, screen } from '@testing';

import { PublicShell } from './PublicShell';

describe('PublicShell', () => {
  const mockChildren = <div data-testid='content'>Contenido de prueba</div>;

  it('renders children content', () => {
    render(<PublicShell>{mockChildren}</PublicShell>);

    assertTestId('content');
    assertText('Contenido de prueba');
  });

  it('renders title and subtitle', () => {
    render(
      <PublicShell subtitle='Subtítulo descriptivo' title='Título Principal'>
        {mockChildren}
      </PublicShell>
    );

    assertTexts(['Título Principal', 'Subtítulo descriptivo']);
    expect(screen.getByText('Título Principal').tagName).toBe('DIV');
    expect(screen.getByText('Subtítulo descriptivo').tagName).toBe('SPAN');
  });

  it('applies custom className', () => {
    const { container } = render(
      <PublicShell className='custom-layout'>{mockChildren}</PublicShell>
    );

    expect(container.firstChild).toHaveClass('custom-layout');
  });

  it('does not render header when no title or subtitle provided', () => {
    render(<PublicShell>{mockChildren}</PublicShell>);

    assertNoRole('banner');
  });
});
