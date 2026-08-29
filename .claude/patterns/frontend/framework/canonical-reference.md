# Canonical Reference — Stack & Alignment

> **Purpose**: Single source of truth for the canonical stack. Other projects read this to know what they need to align to.
> **Source**: Reference project implementation
> **Updated**: 2026-03-23
> **Framework**: 1.9.9

---

## Canonical Stack

| Package | Version | Pin? | Notes |
|---------|---------|------|-------|
| Next.js | 16.1.1 | No | Turbopack default |
| React | 19.2.3 | No | |
| TypeScript | 5.9.3 | No | Strict mode mandatory |
| styled-components | **6.1.14** | **Yes** | 6.2.0+ breaks SSR with Next.js 16 |
| Prisma | 7.x | No | |
| Vitest | 4.0.16 | No | Replaced Jest |
| @reduxjs/toolkit | 2.5.0 | No | |

---

## Critical Configs

### styled-components compiler (next.config.ts)

```typescript
compiler: {
  styledComponents: { displayName: true, ssr: true },
},
```

### Turbopack SVGR (next.config.ts)

```typescript
turbopack: {
  rules: {
    '*.svg': {
      as: '*.js',
      loaders: [{
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
          },
        },
      }],
    },
  },
},
```

### TypeScript aliases (tsconfig.json)

Pattern: explicit short aliases, single root tsconfig. Must match `turbopack.resolveAlias` in next.config.ts.

---

## Known Issues & Fixes

| Issue | Symptom | Fix |
|-------|---------|-----|
| styled-components 6.2.0+ | Styles not injected, `body { margin: 8px }` visible | Pin to `6.1.14` |
| Turbopack SVG | SVGs lose aspect ratio | `removeViewBox: false` in SVGR config |
| Keyframe interpolation | `${keyframe}` → `[object Object]` | Use `css` helper wrapping the animation |

---

## ESLint Custom Rules

19 rules enforcing Code Sovereignty via static analysis.

| Category | Rules | Key |
|----------|-------|-----|
| Architecture | 2 | `architecture-boundaries`, `use-case-policy` |
| Redux | 4 | `no-direct-service-calls`, `no-redux-in-components`, `redux-naming-policy`, `enforce-hook-composition` |
| Imports | 1 | `import-strategy` (unified v2.0) |
| Quality | 5 | `no-magic-strings`, `no-hardcoded-ui-strings`, size limits, naming |
| Design tokens | 3 | `no-hardcoded-colors`, `no-hardcoded-spacing`, `no-hardcoded-typography` |
| React/Next.js | 4 | `require-use-client-directive`, `no-native-html-elements`, `no-emojis-in-jsx`, `essential-testing` |

Full reference: `.claude/patterns/frontend/tooling/eslint-rules-reference.md`

---

## Reusable Assets (Categories)

These are agnostic, replicable to any project:

| Category | Location | Examples |
|----------|----------|---------|
| Common Components | `libs/presentation/components/common/` | Button, Modal, Toast, Table, Pagination, Image |
| HTTP Helpers | `libs/shared/helpers/http/` | Request handler, error parser, auth interceptor |
| Error Handling | `libs/shared/helpers/error-handling/` | AppError, error factory, error boundary |
| Design Tokens | `libs/shared/constants/theme/` | Colors, spacing, typography, breakpoints |
| Utilities | `libs/shared/utils/` | Date, string, currency formatters |

To get exact counts and current inventory: `find src/libs -name "index.ts" | head -20`

---

## Quality Metrics (Current)

| Metric | Status |
|--------|--------|
| TypeScript errors | 0 |
| ESLint errors | 0 |
| ESLint warnings | 0 |
| Tests | 2140+ passing |
| Build | Clean (turbopack) |

---

## Alignment Checklist

When aligning a project to this reference:

```markdown
- [ ] Package versions match Canonical Stack table
- [ ] styled-components pinned to 6.1.14
- [ ] styled-components compiler configured (displayName + ssr)
- [ ] Turbopack SVGR configured (removeViewBox: false)
- [ ] TypeScript strict mode enabled
- [ ] TypeScript aliases use explicit short pattern
- [ ] ESLint custom rules installed (check count)
- [ ] Vitest configured (not Jest)
- [ ] Build passes clean
- [ ] 0 TS errors, 0 ESLint errors, 0 warnings
```

---

## Evolution Log

Key milestones (not exhaustive — see git history for full detail):

| Version | Date | Key Change |
|---------|------|------------|
| 1.9.9 | 2026-01-28 | Prisma migrations v2.0 (drift, hosted DB) |
| 1.9.4 | 2026-01-24 | Global Image component with fallback |
| 1.9.0 | 2026-01-19 | TypeScript alias simplification |
| 1.7.0 | 2026-01-17 | Unified `import-strategy` ESLint rule |
| 1.4.3 | 2026-01-12 | AuthProvider as single source of truth |
| 1.4.2 | 2026-01-11 | styled-components pin, Turbopack SVGR fix |
| 1.4.0 | 2026-01-09 | Vitest migration (replaced Jest) |

---

**How to use**: Read this file → run alignment checklist → fix gaps → verify quality metrics match.
