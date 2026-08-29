/**
 * PublicNavbar Component Tests
 *
 * Tests for public navigation component with responsive menu.
 * Spanish locale for data and UI text.
 */

import { assertRole, assertTexts, renderWithProviders, screen } from '@testing';

import { PublicNavbar } from './PublicNavbar';

const defaultProps = {
  items: [
    { id: 'home', title: 'Inicio', url: '/' },
    { id: 'events', title: 'Eventos', url: '/eventos' },
    {
      children: [
        { id: 'about', title: 'Nosotros', url: '/nosotros' },
        { id: 'faq', title: 'Preguntas', url: '/faq' },
      ],
      id: 'more',
      title: 'Más',
      url: '#',
    },
  ],
  logo: { alt: 'Coti', src: '/logo.png' },
};

describe('PublicNavbar', () => {
  it('renders nav items and dropdown', () => {
    renderWithProviders(<PublicNavbar {...defaultProps} />);
    assertTexts(['Inicio', 'Eventos', 'Más']);
  });

  it('renders mobile menu toggle', () => {
    renderWithProviders(<PublicNavbar {...defaultProps} />);
    assertRole('button');
  });

  it('renders logo', () => {
    renderWithProviders(<PublicNavbar {...defaultProps} />);
    expect(screen.getByAltText('Coti')).toBeInTheDocument();
  });
});
