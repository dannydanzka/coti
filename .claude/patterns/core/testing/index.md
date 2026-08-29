# Testing Patterns

> **Module**: core/testing
> **Scope**: Testing philosophy and strategies (agnostic, framework-independent)
> **Updated**: 2026-04-06

---

## Patterns

| Pattern | Purpose | Priority |
|---------|---------|----------|
| `philosophy.md` | Value > Coverage, Essential testing, standard patterns | High |
| `mocking.md` | Mock boundaries, global mocks, stable references, anti-patterns | High |
| `qa-scenario-seeds.md` | Persistent QA dataset (every state) — idempotent, scoped, prod-referenced seeds | High |
| `unit-e2e-complementarity.md` | Unit proves code paths, E2E proves the feature works — division of labor, neither replaces the other | High |

---

## TL;DR

**Principle**: Tests that deliver value, not coverage for coverage's sake.

```typescript
// ✅ Essential: business behavior
it('rejects payment with expired card', () => { ... });

// ❌ Verbose: implementation detail
it('calls setLoading with true', () => { ... });
```

**Mock-first**: Mock at system boundaries (Prisma, APIs, external services). Keep internals real.

**Global mocks** (never re-mock in tests): `@logger`, `@helpers`, `@database`, `bcryptjs`,
`next/navigation`, `next/image`, `next/dynamic`, `@prisma/client`, `uuid`

**Anti-patterns automated** (ESLint — 10 custom rules + 11 native plugin rules):
- `no-inline-hook-mock-factory` — OOM risk (inline objects in vi.mock factories)
- `no-redundant-global-mocks` — already mocked globally
- `prefer-once-in-test` — isolation inside it() bodies
- `prefer-mocked-helper` — type safety over as Mock casts
- See `frontend/testing/anti-patterns.md` for full catalog

---

## When to Consult

- Deciding what to test → `philosophy.md`
- Unit vs E2E scope for a feature → `unit-e2e-complementarity.md`
- Human-facing QA data (every state, pre-built) → `qa-scenario-seeds.md`
- Mock strategy, global mocks, stable references → `mocking.md`
- ESLint-flagged patterns → `frontend/testing/anti-patterns.md`
- Project-specific testing reference → `frontend/testing/vitest.md`

---

**Total**: 3 patterns
