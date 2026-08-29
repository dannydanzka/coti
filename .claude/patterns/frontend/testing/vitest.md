# Testing (Vitest)

> **Module**: frontend/testing
> **ESLint**: `custom/essential-testing`
> **Framework**: Vitest 4.0+ (ESM-native)
> **Timeout**: 5s per test (vitest.config.ts)

---

## TL;DR

**DO**:
- Essential tests only (value > coverage)
- `vi.mock()` after type imports, before project imports
- `vi.mocked()` for type-safe mocks (NEVER `as Mocked<typeof x>`)
- Max 350 lines per test file
- Localized test data (match target audience)
- Stable references in hook mocks (`vi.hoisted()` or module-scope `const`)
- Tests MUST run in <1s — if slower, investigate root cause
- `*Once` mock variants inside `it()`/`test()` bodies for isolation
- Nested `describe` + `beforeEach` when `*Once` doesn't work (multi-render hooks)
- Chained `mockResolvedValueOnce` for sequential calls with different values

**DON'T**:
- Test constants, interfaces, styled components
- 100% coverage goal (aim for essential)
- Test implementation details (test behavior)
- `jest.fn()` / `jest.mock()` (use `vi.*`)
- Increase timeouts/RAM to mask slow tests — fix the code
- `vi.clearAllMocks()` in beforeEach — already global in vitest.setup.ts
- `vi.mock('@logger')` — already global in vitest.setup.ts
- `vi.mock('@helpers/use-case/authorization/authorization')` — already global
- `await import('@repositories/...')` in beforeEach — use `vi.mocked()` at module level
- `prisma as Mocked<typeof prisma>` — use `vi.mocked(prisma)` instead
- `new Error('Network error')` — use locale (`new Error('Error de red')`)
- `() => ({ field: value })` inside `vi.mock()` factory — use `vi.hoisted()` instead
- `mockResolvedValue(x)` inside `it()` body — use `mockResolvedValueOnce(x)`
- `// eslint-disable` comments — **PROHIBITED** (rule `no-eslint-disable`). Fix at root

---

## Why Vitest

- **Speed**: 2-3x faster than Jest (ESM-native)
- **TypeScript**: First-class support
- **API**: Same as Jest (easy migration)
- **Modern**: Built for Vite/Next.js ecosystem

---

## What to Test

| Test | Don't Test |
|------|------------|
| Business logic (use cases) | Constants/interfaces |
| User interactions | Styled components |
| API route behavior | Trivial getters |
| Error handling | Type definitions |
| Critical paths | Implementation details |

---

## Assert Helpers (`@testing`)

28 centralized, agnostic helpers — import from `@testing`, never inline raw assertions.

### Text Assertions

| Helper | Replaces |
|--------|----------|
| `assertText(text)` | `expect(screen.getByText(text)).toBeInTheDocument()` |
| `assertTexts([...])` | Multiple `assertText` calls |
| `assertNoText(text)` | `expect(screen.queryByText(text)).not.toBeInTheDocument()` |
| `assertTextCount(text, min?)` | `expect(screen.getAllByText(text).length).toBeGreaterThanOrEqual(min)` |

### Role Assertions

| Helper | Replaces |
|--------|----------|
| `assertRole(role, opts?)` | `expect(screen.getByRole(role, opts)).toBeInTheDocument()` |
| `assertNoRole(role, opts?)` | `expect(screen.queryByRole(role, opts)).not.toBeInTheDocument()` |
| `assertRoleCount(role, min?, opts?)` | `expect(screen.getAllByRole(role, opts).length).toBeGreaterThanOrEqual(min)` |

### TestId Assertions

| Helper | Replaces |
|--------|----------|
| `assertTestId(testId)` | `expect(screen.getByTestId(testId)).toBeInTheDocument()` |
| `assertTestIds([...])` | Multiple `assertTestId` calls |

### Container Assertions

| Helper | Replaces |
|--------|----------|
| `assertEmpty(container)` | `expect(container.firstChild).toBeNull()` |
| `assertEmptyContainer(container)` | `expect(container.innerHTML).toBe('')` |
| `assertSelector(container, sel)` | `expect(container.querySelector(sel)).toBeInTheDocument()` |
| `assertNoSelector(container, sel)` | `expect(container.querySelector(sel)).not.toBeInTheDocument()` |
| `assertMinElements(container, sel, min?)` | `expect(container.querySelectorAll(sel).length).toBeGreaterThanOrEqual(min)` |

### Form Assertions (`form.*`)

| Helper | Purpose |
|--------|---------|
| `form.assertField(label, type?)` | Asserts field by label exists, optional type check |
| `form.assertFieldValue(label, value)` | Asserts field has expected value |
| `form.assertButton(name, enabled?)` | Asserts button exists and enabled/disabled state |
| `form.assertError(text)` | Asserts error message visible |

### Modal Assertions (`modal.*`)

| Helper | Purpose |
|--------|---------|
| `modal.assertOpen()` | `screen.getByRole('dialog')` exists |
| `modal.assertClosed(container)` | No `[role="dialog"]` in container |
| `modal.assertTitle(title)` | Title text + dialog present |
| `modal.assertFormFields(container, min?)` | Minimum input fields in modal |

### User Interaction (`user.*`)

| Helper | Purpose |
|--------|---------|
| `user.setup(opts?)` | `userEvent.setup({ delay: null })` |
| `user.clickButton(name, instance?)` | Click button by name regex |
| `user.fillForm(data, instance?)` | Fill multiple fields by label |
| `user.typeInField(label, value, instance?)` | Type in single field |

### Async Utilities (`async.*`)

| Helper | Purpose |
|--------|---------|
| `async.waitForElement(query, opts?)` | `waitFor(query)` wrapper |
| `async.waitForLoadingToFinish(testId?)` | Wait for loading indicator to disappear |
| `async.waitForCall(mockFn, timeout?)` | Wait for mock to be called |
| `async.waitForAction(dispatch, type, timeout?)` | Wait for Redux action |

### Usage

```typescript
import { assertText, assertTexts, assertRole, assertRoleCount, renderWithProviders } from '@testing';

describe('UserCard', () => {
  it('displays user name and role', () => {
    renderWithProviders(<UserCard user={mockUser} />);
    assertText('María García');
    assertRole('button', { name: /editar/i });
    assertRoleCount('button', 2);
  });
});
```

---

## Global Mocks (vitest.setup.ts)

These are mocked globally — **NEVER mock them per-file**:

| Module | Mock provides | Notes |
|--------|---------------|-------|
| `@logger` | `logError`, `logInfo`, `logWarning` | All as `vi.fn()` |
| `@helpers` (validateAndGetUser) | `vi.fn()` via 3 import paths | Use `mockAuthSuccess()` to configure |
| `@database` (Supabase) | `getStorageClient`, `supabaseAdmin` | Returns `null`/`false` |
| `bcryptjs` | `hash`, `compare` | Avoids 220ms real hashing |
| `next/navigation` | `useRouter`, `usePathname`, `useSearchParams` | Standard Next.js |
| `next/server` | `NextRequest`, `NextResponse` | Full mock implementation |
| `next/image` | Returns `<img>` element | Avoids Image optimization |
| `next/dynamic` | `div` with `data-testid="dynamic-component"` | Avoids dynamic imports |
| `uuid` | `v4`, `v5` | Returns `'mocked-uuid-v4'` |
| `@prisma/client` | `PrismaClient` stub | `$connect`/`$disconnect` as `vi.fn()` |
| `@prisma/adapter-pg` | `PrismaPg` stub | No real PostgreSQL adapter |
| `@dannydanzka/sovereignty-ui` | 12 components as DOM elements | Avoids loading full library |
| Browser APIs | `matchMedia`, `IntersectionObserver`, `ResizeObserver`, `localStorage` | See `mocking.md` for details |

`clearMocks: true` + `restoreMocks: true` in config — do NOT call `vi.clearAllMocks()` per-file.

---

## Mocking

```typescript
// ✅ Mock order: vi.mock (hoisted) → imports → vi.mocked at module level
vi.mock('./user.service', () => ({
  userService: { getById: vi.fn() },
}));

import { userService } from './user.service';

// Type-safe mock — ALWAYS use vi.mocked(), NEVER "as Mocked<typeof x>"
const mockUserService = vi.mocked(userService);
mockUserService.getById.mockResolvedValue({ id: '1', name: 'Test' });
```

---

## Constructible Globals (IntersectionObserver, ResizeObserver)

Browser APIs invoked with `new` (used by `next/link`, virtualization libs, sticky headers) **must** be mocked as classes — `vi.fn().mockImplementation(arrow)` fails because the inner arrow is not a constructor. Symptom: `TypeError: ... is not a constructor`.

```typescript
// ❌ Breaks: next/link prefetch calls `new IntersectionObserver(cb)`
global.IntersectionObserver = vi
  .fn()
  .mockImplementation((cb) => ({ disconnect: vi.fn(), observe: vi.fn(), unobserve: vi.fn() }));

// ✅ Class form — supports `new`
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => [] as IntersectionObserverEntry[]);
  unobserve = vi.fn();
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb;
  }
  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}
global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
```

Same shape for `ResizeObserver`, `MutationObserver`, `PerformanceObserver`.

---

## UI Library Mocks: Render All Slot Props

When mocking a component library (sovereignty-ui, MUI, etc.), the mock **must** render every slot prop the production component supports — `children`, `footer`, `header`, `actions`, etc. Dropping a slot makes its descendants invisible to RTL queries even though they exist in the JSX.

```typescript
// ❌ Footer dropped → tests can't find buttons placed in <Modal footer={...}>
Modal: ({ children, isOpen, title }: P) =>
  isOpen ? React.createElement('div', { role: 'dialog' }, children) : null;

// ✅ Render every slot
Modal: ({ children, footer, isOpen, title }: P) =>
  isOpen
    ? React.createElement(
        'div',
        { 'data-testid': 'modal', role: 'dialog' },
        title ? React.createElement('h2', null, title) : null,
        children,
        footer ? React.createElement('div', { 'data-testid': 'modal-footer' }, footer) : null
      )
    : null;
```

**Rule of thumb**: a global mock that hides a documented prop is a structural defect, not a parch. Audit the production component's prop surface before publishing the mock.

---

## Partial Mocks

```typescript
// Use importOriginal when you need other exports from the module
vi.mock('@config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@config')>();
  return { ...actual, stripe: { checkout: { sessions: { create: vi.fn() } } } };
});
```

---

## Testing Use Cases

### Use Case Test Helpers (`@testing/helpers`)

Centralized helpers eliminate ~20 lines of boilerplate per test file.

**Important**: `validateAndGetUser` is already mocked globally in `vitest.setup.ts`.
Individual test files do NOT need `vi.mock('@helpers/use-case/authorization/authorization')`.

```typescript
import { faqRepository } from '@repositories';
import {
  MOCK_REQUEST,
  expectFailure,
  expectSuccess,
  itHandlesRepoError,
  itRejectsUnauthorized,
  mockAuthSuccess,
} from '@testing/helpers';

import { executeGetFaqs } from './get-faqs.use-case';

const mockFaqRepo = vi.mocked(faqRepository);
const params = { filters: {}, request: MOCK_REQUEST };

describe('executeGetFaqs', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockFaqRepo.findMany.mockResolvedValue([{ id: 'faq-1' }] as never);
  });

  it('returns FAQ list', async () => {
    const result = expectSuccess(await executeGetFaqs(params));
    expect(result.data).toHaveLength(1);
  });

  itRejectsUnauthorized(executeGetFaqs, params);
  itHandlesRepoError(executeGetFaqs, params, mockFaqRepo.findMany);
});
```

### Available Helpers

| Helper | Replaces |
|--------|----------|
| `MOCK_REQUEST` | `const mockRequest = {} as NextRequest` (55 files) |
| `MOCK_ADMIN` / `MOCK_OWNER` / `MOCK_PARTICIPANT` | Per-file `mockAdminUser` objects (60 files) |
| `mockAuthSuccess(user?)` | 5-line `validateAndGetUser` setup (134 occurrences) |
| `mockAuthFailure(error?, status?)` | 4-line auth rejection setup (83 files) |
| `expectSuccess(result)` | `expect(result.success).toBe(true); if (result.success) {...}` |
| `expectFailure(result, contains?)` | `expect(result.success).toBe(false); if (!result.success) {...}` |
| `itRejectsUnauthorized(fn, params)` | 6-line auth rejection test (45 files) |
| `itHandlesRepoError(fn, params, mock)` | 5-line repo error test |
| `itRejectsNotFound(fn, params, mock)` | 6-line not-found test |
| `itRejectsMissingId(fn, params)` | 4-line missing-id test |

### Before / After Comparison

```typescript
// ❌ BEFORE — 107 lines (count-kits.use-case.test.ts)
import type { NextRequest } from 'next/server';
import { USER_ROLES } from '@constants';
import { validateAndGetUser } from '@helpers';
import type { CountKitsParams } from './count-kits.interfaces';
import { executeCountKits } from './count-kits.use-case';

vi.mock('@repositories/business/kit-management', () => ({
  kitRepository: { count: vi.fn() },
}));
vi.mock('@helpers/use-case/authorization/authorization', () => ({
  validateAndGetUser: vi.fn(),
}));

describe('executeCountKits', () => {
  const mockRequest = {} as NextRequest;
  const mockAdminUser = {
    email: 'admin@example.com',
    firstName: 'Admin',
    id: 'admin-123',
    lastName: 'Sistema',
    role: USER_ROLES.ADMIN,
  };
  const validParams: CountKitsParams = { request: mockRequest };

  beforeEach(async () => {
    vi.clearAllMocks();
    (validateAndGetUser as Mock).mockResolvedValue({
      success: true, user: mockAdminUser,
    });
    const { kitRepository } = await import('@repositories/business/kit-management');
    (kitRepository.count as Mock).mockResolvedValue(5);
  });

  describe('Authorization', () => {
    it('rejects unauthorized user', async () => {
      (validateAndGetUser as Mock).mockResolvedValue({
        error: { error: 'No autorizado', status: 401, success: false },
        success: false,
      });
      const result = await executeCountKits(validParams);
      expect(result.success).toBe(false);
    });
  });
  // ... 70+ more lines
});

// ✅ AFTER — ~40 lines
import { kitRepository } from '@repositories';
import {
  MOCK_REQUEST,
  expectSuccess,
  itRejectsUnauthorized,
  mockAuthSuccess,
} from '@testing/helpers';
import { executeCountKits } from './count-kits.use-case';

vi.mock('@repositories/business/kit-management', () => ({
  kitRepository: { count: vi.fn() },
}));

const mockKitRepo = vi.mocked(kitRepository);
const params = { request: MOCK_REQUEST };

describe('executeCountKits', () => {
  beforeEach(() => {
    mockAuthSuccess();
    mockKitRepo.count.mockResolvedValue(5);
  });

  itRejectsUnauthorized(executeCountKits, params);

  it('counts all kits', async () => {
    const result = expectSuccess(await executeCountKits(params));
    expect(result.data?.total).toBe(5);
  });

  it('counts available kits only', async () => {
    mockKitRepo.count.mockResolvedValue(3);
    expectSuccess(await executeCountKits({ ...params, availableOnly: true }));
    expect(mockKitRepo.count).toHaveBeenCalledWith(true);
  });
});
```

---

## Testing Repositories (Prisma)

```typescript
// Override the global @database mock with prisma model methods
vi.mock('@database', () => ({
  prisma: {
    kit: { count: vi.fn(), create: vi.fn(), findMany: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
  },
}));

import { prisma } from '@database';
import { kitRepository } from './kit.repository';

// ✅ CORRECT — vi.mocked() for type safety
const prismaMock = vi.mocked(prisma);

// ❌ WRONG — old pattern, do not use
// const prismaMock = prisma as Mocked<typeof prisma>;

describe('kitRepository', () => {
  it('finds kit by id', async () => {
    prismaMock.kit.findUnique.mockResolvedValue(mockKit as never);
    const result = await kitRepository.findById('kit-1');
    expect(result?.id).toBe('kit-1');
  });
});
```

---

## Testing Components with Redux

```typescript
import { renderWithProviders } from '@testing';

it('loads users on mount', async () => {
  renderWithProviders(<UserList />, {
    preloadedState: {
      users: { items: [], loading: false },
    },
  });

  expect(screen.getByRole('list')).toBeInTheDocument();
});
```

---

## Test Isolation (`prefer-once-in-test`)

Inside `it()`/`test()` bodies, use `*Once` variants so the mock configuration is consumed
after one call and doesn't leak into subsequent tests.

```typescript
// ❌ Persistent — config survives into next test (even with clearMocks: true, runs AFTER)
it('returns users', async () => {
  vi.mocked(userService.getAll).mockResolvedValue(mockUsers);    // lingers
  vi.mocked(userService.getAll).mockReturnValue(mockUsers);      // lingers
  vi.mocked(userService.getAll).mockImplementation(() => data);  // lingers
});

// ✅ Isolated — config consumed after first call
it('returns users', async () => {
  vi.mocked(userService.getAll).mockResolvedValueOnce(mockUsers);
  vi.mocked(userService.getAll).mockReturnValueOnce(mockUsers);
  vi.mocked(userService.getAll).mockImplementationOnce(() => data);
});
```

**Allowed**: persistent variants in `beforeEach`/`beforeAll` (global setup is intentional).
**Allowed**: `vi.fn().mockReturnValue(x)` — defining a brand-new mock inline.

### When `*Once` Doesn't Work: Nested `describe` + `beforeEach`

Some mocks are called **multiple times per test** (React re-renders, hooks called during mount).
`mockReturnValueOnce` gets consumed on the first call, returning `undefined` on subsequent calls.

**Solution**: Wrap tests needing persistent mocks in a nested `describe` with `beforeEach`
(where persistent variants are allowed by the ESLint rule).

```typescript
// ❌ WRONG — mockReturnValueOnce consumed after first render, undefined on re-render
it('renders sections list', () => {
  vi.mocked(useStorySectionManager).mockReturnValueOnce({ ids: ['s-1', 's-2'], ... });
  renderWithProviders(<StorySectionManager {...defaultProps} />);
  // Hook called multiple times during render → second call returns undefined → crash
});

// ✅ CORRECT — nested describe + beforeEach (persistent is allowed in beforeEach)
describe('with sections data', () => {
  beforeEach(() => {
    vi.mocked(useStorySectionManager).mockReturnValue({ ids: ['s-1', 's-2'], ... });
  });

  it('renders sections list', () => {
    renderWithProviders(<StorySectionManager {...defaultProps} />);
    assertTestIds(['section-s-1', 'section-s-2']);
  });
});
```

**When to use this pattern**:
- Component tests where hooks are called multiple times per render
- `useSelector` mocks that React calls on every re-render
- Any mock consumed by React lifecycle (not just your test code)

### Chained `*Once` for Sequential Calls

When a mock is called multiple times in sequence with **different return values**,
chain `mockResolvedValueOnce` calls instead of using `mockImplementation`.

```typescript
// ❌ WRONG — mockImplementation inside it() body (ESLint violation)
it('prevents removing last admin without owner', async () => {
  vi.mocked(userRepo.findByRole).mockImplementation((role) =>
    role === 'admin' ? Promise.resolve([adminUser]) : Promise.resolve([])
  );
});

// ✅ CORRECT — chained Once calls (order matches call order)
it('prevents removing last admin without owner', async () => {
  vi.mocked(userRepo.findByRole)
    .mockResolvedValueOnce([adminUser] as never)   // 1st call: findByRole('admin')
    .mockResolvedValueOnce([] as never);            // 2nd call: findByRole('owner')
});
```

---

## Stable References in Hook Mocks (CRITICAL)

**Never return inline object/array literals from React hook mocks.** Each render creates a new
reference → React detects state change → re-render → infinite loop → OOM crash.

```typescript
// ❌ WRONG — infinite re-render loop (new array on every call)
vi.mock('react-redux', () => ({
  useSelector: vi.fn().mockReturnValue([{ id: '1', name: 'Test' }]),
}));

// ❌ WRONG — new object reference on every hook call
vi.mock('@hooks', () => ({
  useAuth: () => ({ user: { firstName: 'María', lastName: 'García' } }),
}));

// ✅ CORRECT — stable reference via vi.hoisted()
const { stableData, stableUser } = vi.hoisted(() => ({
  stableData: [{ id: '1', name: 'Test' }],
  stableUser: { firstName: 'María', lastName: 'García' },
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn().mockReturnValue(stableData),
}));

vi.mock('@hooks', () => ({
  useAuth: () => ({ user: stableUser }),
}));
```

**Why `vi.hoisted()`**: Mock factories are hoisted above imports. Variables defined outside
the factory may not be available. `vi.hoisted()` guarantees the value exists when the mock
factory runs while keeping the reference stable across renders.

**Symptoms of this bug**: Worker OOM crash, 0 tests executed, test appears to "hang" forever.

> **Enforced by**: `custom/no-inline-hook-mock-factory` (error) — flags `() => ({...})` / `() => ([...])` inside `vi.mock()` factories.

---

## Locale in Mock Errors (`no-english-in-mock-errors`)

`new Error()` messages in test files are test data → must follow project locale (Spanish).

```typescript
// ❌ English error messages (flagged)
mockRepo.findById.mockRejectedValue(new Error('Network error'));
mockRepo.findById.mockRejectedValue(new Error('Database error'));
mockRepo.findById.mockRejectedValue(new Error('Unexpected error'));

// ✅ Spanish locale
mockRepo.findById.mockRejectedValue(new Error('Error de red'));
mockRepo.findById.mockRejectedValue(new Error('Error de base de datos'));
mockRepo.findById.mockRejectedValue(new Error('Error inesperado'));
```

> **Enforced by**: `custom/no-english-in-mock-errors` (warn) — detects common English error phrases.

---

## Performance Discipline

A well-written test with proper mocks runs in **milliseconds, not seconds**.
Proven baseline: 4833 tests, 15s execution = **3ms average per test**.

### Time Thresholds

| Duration | Verdict | Action |
|----------|---------|--------|
| **< 50ms** | Normal | Expected for a properly-mocked test |
| **50ms – 1s** | Acceptable | OK for complex renderHook / RTL tests |
| **1s – 5s** | Investigate | Something is wrong — find and fix root cause |
| **> 5s** | Bug | Timeout will kill it. Fix before merging |

### If a Test is Slow, Check These (in order)

1. **Infinite re-render loop** — Mock returns new object/array reference each render
   (see "Stable References in Hook Mocks" above)
2. **Real heavy libraries loaded** — `react-hook-form`, `zod`, `sharp` not mocked
3. **Real timers** — `setTimeout`/`setInterval` without `vi.useFakeTimers()`
4. **Real crypto** — `bcrypt.hash()` not mocked (220ms per call with 12 rounds)
5. **Real file I/O** — `new File(buffer, ...)` allocating real memory instead of mock with `size` property

### Rules

- **Never increase timeouts or RAM to mask a slow test** — fix the code
- **`testTimeout: 5s`** — safety net, not a target. If a test needs 5s, it has a bug
- **Environment matters** — use `node` environment for domain/repo/API tests (no jsdom overhead)
- **Mock at boundaries** — heavy third-party libraries should be mocked, not loaded

### Config (vitest.config.ts)

```typescript
testTimeout: 5000,                    // 5s safety net — tests should be <1s
maxWorkers: '50%',                    // Balance parallelism vs memory
environmentMatchGlobs: [
  ['src/**/domain/**/*.test.ts', 'node'],        // No jsdom for pure logic
  ['src/**/repositories/**/*.test.ts', 'node'],  // No jsdom for data layer
  ['src/app/api/**/*.test.ts', 'node'],           // No jsdom for API routes
],
```

---

## ESLint-Disable Comments — PROHIBITED

The `no-eslint-disable` rule (error severity) **blocks all** `eslint-disable` comments in the
codebase. There are zero exceptions — every violation must be fixed at root.

**Common root-cause fixes**:

| ESLint Warning | Root Fix |
|----------------|----------|
| `prefer-once-in-test` (mock called multiple times per render) | Nested `describe` + `beforeEach` with `mockReturnValue` |
| `prefer-once-in-test` (sequential calls with different values) | Chained `mockResolvedValueOnce` |
| `no-inline-hook-mock-factory` | Extract to module-scope `const` or `vi.hoisted()` |
| `no-english-in-mock-errors` | Translate to Spanish locale |

**Never** add `eslint-disable` as a workaround. If a rule seems wrong for a case, the code
pattern needs to change, not the rule enforcement.

---

## Testing ESLint Rules (10 custom + native plugins)

| Rule | Severity | Purpose |
|------|----------|---------|
| `essential-testing` | warn | No `.only()`, no empty tests, no `console.log` |
| `prefer-once-in-test` | warn | `*Once` variants inside `it()` bodies |
| `no-inline-hook-mock-factory` | error | No inline objects/arrays in `vi.mock()` factories |
| `no-english-in-mock-errors` | warn | Spanish locale for `new Error()` in tests |
| `prefer-mocked-helper` | warn | `vi.mocked()` over `as Mock`/`as Mocked<>` |
| `no-redundant-global-mocks` | error | Don't re-mock globally mocked modules |
| `no-redundant-clear-mocks` | warn | Don't call `vi.clearAllMocks()` (already global) |
| `no-await-import-in-beforeeach` | error | No `await import()` in beforeEach |
| `prefer-centralized-assertions` | warn | Use `@testing` assert helpers |
| `prefer-user-helper` | warn | Use `user.*` interaction helpers |

**Plus**: `no-eslint-disable` (error) applies globally — including test files.

---

## Related

- `core/testing/philosophy.md` - Testing philosophy
- `core/testing/mocking.md` - Mock-first strategy
- `core/sops/coverage-report.md` - Coverage analysis SOP
- `.claude/status/testing/coverage-baseline.md` - Current metrics and optimization history
