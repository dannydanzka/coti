/**
 * global-error
 *
 * Global error boundary — rendered outside the root layout, so it has NO
 * access to Providers (i18next, styled-components theme, Redux). Must be
 * fully self-contained with inline styles and literal strings.
 */

'use client';

import type { GlobalErrorProps } from './global-error.interfaces';

const GlobalError = ({ reset }: GlobalErrorProps) => (
  <html lang='es'>
    <body
      style={{
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        color: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        justifyContent: 'center',
        margin: 0,
        minHeight: '100vh',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', margin: '0 0 16px' }}>Algo salió mal</h1>
      <p style={{ fontSize: '1rem', marginBottom: '24px', maxWidth: '480px' }}>
        Ocurrió un error inesperado. Por favor intenta de nuevo.
      </p>
      <button
        style={{
          backgroundColor: '#1a1a1a',
          border: 'none',
          borderRadius: '8px',
          color: '#ffffff',
          cursor: 'pointer',
          fontSize: '1rem',
          padding: '12px 24px',
        }}
        type='button'
        onClick={reset}
      >
        Reintentar
      </button>
    </body>
  </html>
);

export default GlobalError;
