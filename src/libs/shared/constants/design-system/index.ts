/**
 * Design System - Barrel Export
 *
 * Centralized design token system for consistent UI development.
 *
 * Usage:
 * ```typescript
 * import { color, spacing, typography, elevation, shape, motion, layout } from '@constants';
 *
 * // Spacing (8-point grid)
 * padding: ${spacing.md};           // 24px
 * gap: ${spacing.sm};               // 16px
 *
 * // Colors
 * background: ${color.primary500};  // #FFC107
 * color: ${color.textPrimary};      // #1A237E
 *
 * // Typography
 * font-family: ${typography.family.body};
 * font-size: ${typography.size.base};
 *
 * // Elevation
 * box-shadow: ${elevation.md};
 *
 * // Shape
 * border-radius: ${shape.md};
 *
 * // Motion
 * transition: ${motion.normal};
 *
 * // Layout
 * @media (min-width: ${layout.breakpoint.md}) { }
 * z-index: ${layout.zIndex.modal};
 * ```
 *
 * @see ~/.claude/standards/DESIGN-SYSTEM-STANDARDS.md
 * @see ~/.claude/patterns/design-system-patterns.md
 */

export * from './tokens';

export * from './presets';

export type * from './tokens.types';
