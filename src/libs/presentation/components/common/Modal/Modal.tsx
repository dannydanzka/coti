/**
 * Modal Component - Lazy Loaded Wrapper
 *
 * This wrapper lazily loads the modal implementation on demand.
 * Re-exports from ModalImpl for component API compatibility.
 */

'use client';

import dynamic from 'next/dynamic';

import type { ModalProps } from './Modal.interfaces';

export const Modal = dynamic<ModalProps>(
  () => import('./ModalImpl').then((mod) => ({ default: mod.ModalImpl })),
  {
    loading: () => null,
    ssr: false,
  }
);
