# ESLint Testing Rules — per-rule detail

> **Module**: frontend/tooling — detail companion of [`eslint-rules-reference.md`](eslint-rules-reference.md) (the authoritative 40-rule catalog)
> **Scope**: the 10 testing-specific custom rules (apply only to test files) + the 2 plugin configs
> **Rule sources**: `eslint-rules/` (canonical here; projects consume via `scripts/eslint-rules/`)
> **Plugins**: `@vitest/eslint-plugin` + `eslint-plugin-testing-library`
> **Elevated**: 2026-07-06 from a reference project of this tenant (doc dated 2026-04-06)

---

## Testing Rules (10 custom)

All testing rules apply **only to `.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx` files**.
All rules are **agnostic** — work with both Vitest (`vi.*`) and Jest (`jest.*`).

### 1. `essential-testing` — `scripts/eslint-rules/essential-testing.js`

**Type**: `problem` | **Severity**: `warn`

Prevents verbose and low-value testing patterns.

| Check | Default Limit |
|---|---|
| Verbose test names (English/Spanish patterns) | Blocklist |
| Redundant describe blocks (`edge cases`, `validation`, etc.) | Blocklist |
| Nesting depth | Max 3 |
| Tests without assertions | 0 |
| Empty tests | 0 |
| `.only()` / `.skip()` | Blocked |
| Tests per describe | Max 10 |
| Tests per file | Max 30 |
| Snapshots per file | Max 5 |
| English mock data (names, emails) | Blocklist |

---

### 2. `prefer-centralized-assertions` — `scripts/eslint-rules/prefer-centralized-assertions.js`

**Type**: `suggestion` | **Severity**: `warn`

Enforce centralized `@testing` assertion helpers over verbose inline patterns.

| Inline (flagged) | Helper (preferred) |
|---|---|
| `expect(screen.getByText(x)).toBeInTheDocument()` | `assertText(x)` |
| `expect(screen.queryByText(x)).not.toBeInTheDocument()` | `assertNoText(x)` |
| `expect(screen.getByTestId(x)).toBeInTheDocument()` | `assertTestId(x)` |
| `expect(screen.getByRole(x)).toBeInTheDocument()` | `assertRole(x)` |
| `expect(screen.queryByRole(x)).not.toBeInTheDocument()` | `assertNoRole(x)` |

---

### 3. `prefer-user-helper` — `scripts/eslint-rules/prefer-user-helper.js`

**Type**: `suggestion` | **Severity**: `warn`

Disallows direct import of `@testing-library/user-event`. Use the centralized `user` export.

```typescript
// ❌ import userEvent from '@testing-library/user-event'
// ✅ import { user } from '@testing'
```

---

### 4. `no-redundant-clear-mocks` — `scripts/eslint-rules/no-redundant-clear-mocks.js`

**Type**: `suggestion` | **Severity**: `warn`

Flags `vi.clearAllMocks()` / `vi.restoreAllMocks()` — already configured globally in `vitest.config.ts` (`clearMocks: true`, `restoreMocks: true`).

---

### 5. `no-await-import-in-beforeeach` — `scripts/eslint-rules/no-await-import-in-beforeeach.js`

**Type**: `problem` | **Severity**: `error`

Disallows `await import(...)` inside `beforeEach`/`beforeAll`. Use `vi.mock()` at module level + `vi.mocked()` in tests.

```typescript
// ❌ beforeEach(async () => { const mod = await import('@repos/user'); vi.spyOn(mod, 'find') })
// ✅ vi.mock('@repos/user'); const mockRepo = vi.mocked(userRepo);
```

---

### 6. `no-redundant-global-mocks` — `scripts/eslint-rules/no-redundant-global-mocks.js`

**Type**: `problem` | **Severity**: `error`

Disallows `vi.mock()` for modules already mocked globally in `vitest.setup.ts`.

Fully mocked modules (do not re-mock): `@dannydanzka/sovereignty-ui`, `next/image`, `next/dynamic`, `@logger`, `@prisma/client`, `@prisma/adapter-pg`, `@helpers/use-case/authorization`, `@helpers/use-case/authorization/authorization`

Excluded (tests may legitimately override): `@database`, `@helpers`, `bcryptjs`, `next/navigation`, `uuid`

---

### 7. `prefer-mocked-helper` — `scripts/eslint-rules/prefer-mocked-helper.js`

**Type**: `suggestion` | **Severity**: `warn`

Disallows `as Mock` and `as Mocked<typeof x>` type casts. Use the framework helper.

```typescript
// ❌ (myFn as Mock).mockResolvedValue(...)
// ✅ vi.mocked(myFn).mockResolvedValue(...)
```

---

### 8. `no-english-in-mock-errors` — `scripts/eslint-rules/no-english-in-mock-errors.js`

**Type**: `suggestion` | **Severity**: `warn` | **Phase**: 2 (2026-04-06)

Detects English error message strings passed to `new Error()` in test files. Test data must follow project locale.

```typescript
// ❌ mockRepo.findById.mockRejectedValue(new Error('Network error'))
// ✅ mockRepo.findById.mockRejectedValue(new Error('Error de red'))
```

**Default patterns**: `Network error`, `Database error`, `Unexpected error`, `Server error`, `Connection error`, `Internal error`, `Internal server error`, `Service unavailable`, `Permission denied`, `Access denied`, `Unauthorized`, `Forbidden`, `Not found`, `Bad request`, `Timeout`, `Request timeout`, `Connection refused`, `Something went wrong`, `An error occurred`, `Unknown error`, `Failed to fetch`, `Request failed`

**Configurable**: add extra patterns via `additionalPatterns` option.

**Exception — pattern-matching tests**: If the test is verifying that a function correctly
identifies errors by English keywords (e.g., `categorizeError('network error') === 'network'`),
the English string is the **input under test**, not mock data. Suppress the rule with an inline
disable comment:

```typescript
// ✅ Pattern-matching test — English is the input, not user-facing data
// eslint-disable-next-line custom/no-english-in-mock-errors
expect(categorizeError(new Error('network error'))).toBe('network');
// eslint-disable-next-line custom/no-english-in-mock-errors
expect(categorizeError(new Error('permission denied'))).toBe('authorization');
```

---

### 9. `no-inline-hook-mock-factory` — `scripts/eslint-rules/no-inline-hook-mock-factory.js`

**Type**: `problem` | **Severity**: `error` | **Phase**: 2 (2026-04-06)

Detects arrow/function expressions inside `vi.mock()` / `jest.mock()` factories that return object or array literals directly. Each call creates a new reference → React detects state change → infinite re-render loop → Worker OOM crash.

**Primary fix — module-scope const** (sync factories):

```typescript
// ❌ New reference on every render → OOM crash
vi.mock('@hooks/useAuth', () => ({
  useAuth: () => ({ user: mockUser, isLoading: false }),
}));

// ✅ Module-scope const — lazy factories run after module-level code
const mockAuthReturn = { user: mockUser, isLoading: false };
vi.mock('@hooks/useAuth', () => ({ useAuth: () => mockAuthReturn }));
```

**Secondary fix — `vi.hoisted()`** (async factories with `importOriginal`):

```typescript
// ✅ Required when factory is async
const mockAdminRouter = vi.hoisted(() => ({ push: vi.fn(), replace: vi.fn() }));
vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return { ...actual, useRouter: () => mockAdminRouter };
});
```

**Allowed**: primitive returns (`() => true`), `vi.fn()` values, Identifier returns (`() => stableRef`).

> **Why module-scope const works**: `vi.mock()` factories are lazy — they execute when the mocked
> module is first imported, which is always **after** all module-level code has run. So `const`
> declarations defined before the factory in source are always available at execution time.

---

### 10. `prefer-once-in-test` — `scripts/eslint-rules/prefer-once-in-test.js`

**Type**: `suggestion` | **Severity**: `warn` | **Phase**: 2 (2026-04-06)

Flags persistent mock methods (`mockReturnValue`, `mockResolvedValue`, `mockRejectedValue`, `mockImplementation`) inside `it()`/`test()` bodies. Use `*Once` variants for test isolation.

```typescript
// ❌ Persists across tests (inside it() body)
it('test', () => {
  vi.mocked(service.getAll).mockResolvedValue(data);
});

// ✅ Isolated to current test call
it('test', () => {
  vi.mocked(service.getAll).mockResolvedValueOnce(data);
});
```

**Allowed**: persistent variants in `beforeEach`/`beforeAll` (intentional global setup).
**Allowed**: `vi.fn().mockReturnValue(x)` — new mock definition inline.

---

## Native Plugin Rules (Testing)

Rules from `@vitest/eslint-plugin` and `eslint-plugin-testing-library` active in the test override block.

### Vitest Plugin (`@vitest/eslint-plugin`)

| Rule | Severity | What it enforces |
|---|---|---|
| `vitest/consistent-test-it` | `warn` | Use `it` (not `test`), `it` within describes |
| `vitest/no-identical-title` | `error` | No duplicate test names in same describe |
| `vitest/require-top-level-describe` | `warn` | All tests must be inside a describe block |
| `vitest/no-duplicate-hooks` | `warn` | No duplicate `beforeEach` etc. in same describe |
| `vitest/no-focused-tests` | `error` | No `.only()` |
| `vitest/no-disabled-tests` | `warn` | No `.skip()` |
| `vitest/expect-expect` | `warn` | Every test must call expect (or centralized helper) |
| `vitest/no-standalone-expect` | `warn` | No `expect()` outside test blocks |
| `vitest/prefer-to-be` | `warn` | Prefer `.toBe()` over `.toEqual()` for primitives |
| `vitest/prefer-to-have-length` | `warn` | Prefer `.toHaveLength()` over `.length.toBe()` |
| `vitest/prefer-equality-matcher` | `warn` | Prefer equality matchers |
| `vitest/no-test-return-statement` | `warn` | No `return` inside test bodies |
| `vitest/prefer-hooks-on-top` | `warn` | Hooks before tests inside describe |
| `vitest/valid-expect-in-promise` | `error` | `expect()` inside `.then()` must be awaited/returned |
| `vitest/no-alias-methods` | `warn` (autofix) | `toBeCalled` → `toHaveBeenCalled` |
| `vitest/prefer-comparison-matcher` | `warn` (autofix) | `expect(x > 5).toBe(true)` → `expect(x).toBeGreaterThan(5)` |
| `vitest/prefer-mock-promise-shorthand` | `warn` (autofix) | `mockImplementation(()=>Promise.resolve(x))` → `mockResolvedValue(x)` |
| `vitest/prefer-called-once` | `warn` (autofix) | `toHaveBeenCalledTimes(1)` → `toHaveBeenCalledOnce()` |

### Testing Library Plugin (`eslint-plugin-testing-library`)

| Rule | Severity | What it enforces |
|---|---|---|
| `testing-library/await-async-queries` | `warn` | Async queries must be awaited |
| `testing-library/prefer-screen-queries` | `warn` | Use `screen.*` not destructured queries |
| `testing-library/render-result-naming-convention` | `warn` | Consistent render result naming |
| `testing-library/no-wait-for-multiple-assertions` | `warn` | No multiple assertions in `waitFor` |
| `testing-library/no-wait-for-side-effects` | `warn` | No side effects in `waitFor` |
| `testing-library/prefer-find-by` | `warn` (autofix) | `waitFor(() => getBy*())` → `findBy*()` |
| `testing-library/no-unnecessary-act` | `warn` | Remove `act()` around sync queries |
| `testing-library/prefer-presence-queries` | `warn` | `queryBy` for presence → `getBy` |

---

## General Rules (22 custom)

| Rule | Severity | Category |
|---|---|---|
| `architecture-boundaries` | `error` | Context isolation + layer hierarchy |
| `code-size-limits` | `warn` | File ≤350 lines, function ≤50, JSX ≤50 |
| `comments-policy` | `warn` | File headers, no obvious comments |
| `component-organization` | `warn` | Types in .interfaces.ts, constants in .constants.ts |
| `custom-import-order` | `warn` | Consistent import group ordering |
| `design-tokens-policy` | `warn` | No hardcoded colors/spacing |
| `enforce-hook-composition` | `warn` | Prevent over-complex hooks |
| `enforce-zod-forms` | `warn` | Form validation via Zod |
| `import-strategy` | `warn` | No deep relative imports, prefer aliases |
| `index-barrel-exports-only` | `warn` | index.ts uses `export *` only |
| `no-alias-exports` | `warn` | No re-export aliases |
| `no-direct-service-calls` | `warn` | Components use Redux, not services directly |
| `no-emojis-in-jsx` | `warn` | No emojis in JSX |
| `no-eslint-disable` | `warn` | No disable comments |
| `no-hardcoded-ui-strings` | `warn` | No hardcoded UI strings |
| `no-inline-styles` | `warn` | No inline style objects |
| `no-magic-literal-comparison` | `warn` | No magic literal comparisons |
| `no-native-html` | `warn` | Styled-components only |
| `no-raw-supabase-client` | `warn` | Use abstracted DB client |
| `no-redux-in-components` | `warn` | Use `useAuth()` hook |
| `no-try-catch-abuse` | `warn` | Require error handlers in UI |
| `no-underscore-prefix` | `warn` | Zero tolerance underscore prefix |
| `redux-naming-policy` | `warn` | Consistent Redux naming |
| `route-delegation` | `error` | API routes must delegate to use cases — no prisma/repositories/supabase/stripe imports in `src/app/api` (per-file allowlist tracks legacy debt; see PLAN-ESLINT-ROUTE-DELEGATION) |
| `require-use-client-directive` | `warn` | Auto-detect missing 'use client' |
| `use-case-policy` | `warn` | Arrow functions only, no direct repo imports |

---

## Related

- `.claude/patterns/frontend/testing/vitest.md` — Main testing standard
- `.claude/patterns/core/testing/mocking.md` — Mock-first strategy
- `.claude/patterns/frontend/testing/anti-patterns.md` — Anti-patterns catalog
- `vitest.config.ts` — Test runner config (clearMocks, restoreMocks, timeouts)
- `vitest.setup.ts` — Global mocks (logger, auth, database, bcrypt, etc.)
