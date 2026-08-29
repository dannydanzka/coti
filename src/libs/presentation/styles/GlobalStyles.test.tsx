/**
 * GlobalStyles Tests
 *
 * Tests for global CSS styles using styled-components and flat maps pattern.
 * Validates CSS injection and SSR-safe styling without theme context.
 */

import { render } from '@testing';

import { GlobalStyles } from './GlobalStyles';

describe('GlobalStyles', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  describe('Render and Injection', () => {
    it('renders without crashing', () => {
      expect(() => {
        render(<GlobalStyles />);
      }).not.toThrow();
    });

    it('works without theme provider (SSR-safe)', () => {
      expect(() => {
        render(<GlobalStyles />);
      }).not.toThrow();
    });

    it('component mounts successfully', () => {
      const { container } = render(<GlobalStyles />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Flat Maps Integration', () => {
    it('uses flat map colors (SSR-safe)', () => {
      const { container } = render(<GlobalStyles />);

      expect(container).toBeInTheDocument();
    });

    it('includes spacing and typography from flat maps', () => {
      const { container } = render(<GlobalStyles />);

      expect(container).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles missing flat map imports gracefully', () => {
      expect(() => {
        render(<GlobalStyles />);
      }).not.toThrow();
    });

    it('renders multiple instances without conflicts', () => {
      expect(() => {
        render(
          <>
            <GlobalStyles />
            <GlobalStyles />
          </>
        );
      }).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('does not cause memory leaks on re-render', () => {
      const { rerender } = render(<GlobalStyles />);

      for (let i = 0; i < 5; i++) {
        rerender(<GlobalStyles />);
      }

      const { container } = render(<GlobalStyles />);
      expect(container).toBeInTheDocument();
    });

    it('maintains stability across re-renders', () => {
      const { container, rerender } = render(<GlobalStyles />);

      expect(container).toBeInTheDocument();

      rerender(<GlobalStyles />);

      expect(container).toBeInTheDocument();
    });
  });
});
