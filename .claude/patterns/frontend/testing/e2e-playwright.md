# E2E Testing (Playwright)

> **Module**: frontend/testing — modern E2E doc (elevated 2026-07-06 from the sovertainty reference project)
> **Companion**: `runners/playwright.md` (runner-layer architecture: POM layout for Jest-era stacks, auth caching)
> **Framework**: Playwright 1.59+ (Chromium)
> **Config**: `playwright.config.ts`
> **Tests**: `e2e/` directory (separate from unit tests in `src/`)
> **ESLint**: `custom/e2e-testing-policy` (error) — enforces Playwright best practices
> **Updated**: 2026-04-09

---

## TL;DR

**DO**:
- Semantic locators: `getByRole` > `getByLabel` > `getByText` > `getByTestId`
- Page Object Model — one class per page/component
- Auth via setup project + storageState reuse
- Credentials from env vars (`E2E_*` in `.env.local`, never hardcoded)
- Web-first assertions: `await expect(locator).toBeVisible()`
- Test user-visible behavior, not implementation details
- Spanish locale for all locators (`/correo/i`, `/contraseña/i`)
- `test.skip()` when env vars are missing (graceful degradation)

**DON'T**:
- CSS/XPath selectors (fragile, break on refactors)
- Manual assertions: `expect(await locator.isVisible()).toBe(true)` (no auto-wait)
- Hardcode credentials in test files
- `page.waitForTimeout()` / `sleep` (use auto-wait or `waitForURL`)
- Test third-party behavior (Stripe checkout UI, Google OAuth)
- Share state between tests (each test must be independent)

---

## How Playwright Works

Playwright launches a **real browser** (Chromium, Firefox, or WebKit) and communicates via
the **Chrome DevTools Protocol (CDP)** over WebSocket.

| Mode | Command | What happens |
|------|---------|--------------|
| **Headless** (default) | `yarn test:e2e` | Full browser engine runs without a visible window. Same rendering, JS execution, cookies, HTTP — just no pixels on screen. |
| **Headed** | `yarn test:e2e:headed` | Browser window opens. You see clicks, navigation, form fills in real time. |
| **UI Mode** | `yarn test:e2e:ui` | Interactive panel with timeline, step-by-step replay, DOM snapshots, network log. |

**Key insight**: Headless is NOT simulation. It's the same Chromium engine that renders
real pages. The only difference is whether it draws to a screen or not.

---

## Project Structure

```
e2e/
├── fixtures/                    # Custom test fixtures (future)
├── pages/                       # Page Object Models
│   ├── login.page.ts            # Login form locators + actions
│   ├── signup.page.ts           # Signup form locators + actions
│   └── dashboard.page.ts       # Dashboard verification
├── setup/
│   └── auth.setup.ts           # Login once, save storageState
├── specs/                       # Test specifications
│   ├── auth/
│   │   ├── login.unauth.spec.ts           # Login form, validation, auth flows
│   │   ├── signup.unauth.spec.ts          # Signup form (feature flag aware)
│   │   ├── protected-routes.unauth.spec.ts # Unauthenticated redirect tests
│   │   ├── session.spec.ts                # Session persistence (authenticated)
│   │   ├── logout.spec.ts                 # Logout + session destruction
│   │   ├── protected-routes.spec.ts       # Authenticated route access
│   │   └── rbac.spec.ts                   # Role-based access, token, refresh
│   ├── navigation/
│   │   ├── dashboard-navigation.spec.ts   # Drawer items, page navigation
│   │   └── landing.unauth.spec.ts         # Public landing page
│   ├── profile/
│   │   └── profile.spec.ts               # Profile page rendering
│   ├── events/
│   │   ├── my-events.spec.ts             # Participant events listing
│   │   └── public-pages.unauth.spec.ts   # Public pages accessibility
│   └── admin/
│       ├── admin-dashboard.spec.ts       # Admin metrics, sidebar nav
│       └── admin-logout.spec.ts          # Admin logout flow
└── playwright/.auth/            # Saved auth state (gitignored)
    ├── participant.json
    └── admin.json
```

### File Naming Convention

| Pattern | Project | Description |
|---------|---------|-------------|
| `*.spec.ts` | participant, admin | Runs with saved auth state |
| `*.unauth.spec.ts` | unauthenticated | Runs without auth (fresh browser) |
| `*.setup.ts` | auth-setup | Login + save storageState |

---

## Configuration (playwright.config.ts)

```typescript
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig, devices } from '@playwright/test';

// Load env vars — Playwright does NOT read .env.local automatically
dotenv.config({ path: path.resolve(import.meta.dirname, '.env.local') });

export default defineConfig({
  testDir: './e2e/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,          // Block .only() in CI
  retries: process.env.CI ? 2 : 0,       // Retry failures in CI only
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',              // Record timeline on first retry
    screenshot: 'only-on-failure',        // Capture screen when test fails
    video: 'retain-on-failure',           // Keep video recording on failure
    locale: 'es-MX',                      // Spanish locale
  },

  projects: [
    { name: 'auth-setup', testDir: './e2e/setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'participant',
      use: { ...devices['Desktop Chrome'], storageState: 'e2e/playwright/.auth/participant.json' },
      dependencies: ['auth-setup'],
      testIgnore: /.*\.unauth\.spec\.ts/,
    },
    {
      name: 'admin',
      use: { ...devices['Desktop Chrome'], storageState: 'e2e/playwright/.auth/admin.json' },
      dependencies: ['auth-setup'],
      testIgnore: /.*\.unauth\.spec\.ts/,
    },
    {
      name: 'unauthenticated',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.unauth\.spec\.ts/,
    },
  ],

  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,  // Reuse running dev server locally
    timeout: 120_000,
  },
});
```

---

## Authentication Pattern

### Setup Project (runs once before all tests)

```typescript
// e2e/setup/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('authenticate as participant', async ({ page }) => {
  const email = process.env.E2E_PARTICIPANT_EMAIL;
  const password = process.env.E2E_PARTICIPANT_PASSWORD;
  if (!email || !password) throw new Error('E2E credentials not configured');

  await page.goto('/login');
  await page.getByLabel(/correo electrónico/i).fill(email);
  await page.getByLabel(/contraseña/i).fill(password);
  await page.getByRole('button', { name: /vamos/i }).click();
  await page.waitForURL('**/dashboard**', { timeout: 15_000 });

  // Save browser state (cookies, localStorage) for reuse
  await page.context().storageState({ path: 'e2e/playwright/.auth/participant.json' });
});
```

### Authenticated tests reuse the saved state automatically

```typescript
// e2e/specs/auth/session.spec.ts — runs in participant/admin projects
import { test, expect } from '@playwright/test';

test('participant can access dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).not.toHaveURL(/\/login/);  // NOT redirected to login
});
```

---

## Page Object Model

Encapsulates locators and actions for a page. All locators use **Spanish text** (project locale).

```typescript
// e2e/pages/login.page.ts
import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly signupLink: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByLabel(/correo electrónico/i);
    this.passwordInput = page.getByLabel(/contraseña/i);
    this.submitButton = page.getByRole('button', { name: /vamos/i });
    this.signupLink = page.getByRole('link', { name: /crear una cuenta/i });
  }

  async goto() { await this.page.goto('/login'); }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

### Locator Priority (Playwright official recommendation)

1. `getByRole` — ARIA roles (most resilient, how users perceive the page)
2. `getByLabel` — form labels (tied to accessible names)
3. `getByText` — visible text content
4. `getByTestId` — data-testid (last resort, when semantic locators don't work)

**Never**: `page.locator('.btn-primary')`, `page.$('#submit')`, `page.locator('div > span')`

---

## Locators: Spanish Locale

When the project's user-facing text is Spanish (the Soverum default), locators must match:

```typescript
// ✅ Spanish locators
page.getByLabel(/correo electrónico/i);
page.getByLabel(/contraseña/i);
page.getByRole('button', { name: /vamos/i });
page.getByText(/credenciales|error|inválid/i);
page.getByRole('link', { name: /crear una cuenta/i });

// ❌ English locators — won't match anything
page.getByLabel(/email/i);
page.getByLabel(/password/i);
page.getByRole('button', { name: /sign in/i });
```

---

## Assertions

### Web-First (auto-wait, recommended)

```typescript
// ✅ Auto-waits for element to become visible
await expect(page.getByText('Bienvenida')).toBeVisible();
await expect(page).toHaveURL(/\/dashboard/);
await expect(page).not.toHaveURL(/\/login/);

// ❌ Manual check — no auto-wait, flaky
expect(await page.getByText('Bienvenida').isVisible()).toBe(true);
```

### Browser-Native Validation

HTML5 validation (type="email", required) is handled by the browser, not the DOM.
Test via the Validity API:

```typescript
const isInvalid = await loginPage.emailInput.evaluate(
  (el: HTMLInputElement) => !el.validity.valid
);
expect(isInvalid).toBe(true);
```

---

## Debugging: Screenshots, Traces, Video

### Configuration

```typescript
// playwright.config.ts
use: {
  screenshot: 'only-on-failure',   // Auto-capture on test failure
  trace: 'on-first-retry',         // Record timeline on first retry
  video: 'retain-on-failure',      // Keep video when test fails
}
```

### When a test fails, you get:

| Artifact | What it shows | When to use |
|----------|---------------|-------------|
| **Screenshot** | Exact browser state at failure moment | Quick visual: "what was on screen?" |
| **Video** | Full recording of test execution | See the sequence of actions that led to failure |
| **Trace** | Interactive timeline: DOM, network, console, screenshots at each step | Deep debugging: "why did the API return 500?" |

### Viewing traces

```bash
# After a test failure with trace enabled
npx playwright show-trace test-results/path-to/trace.zip
```

Opens an interactive panel where you can:
- Step through each action (goto → fill → click → redirect)
- Inspect DOM at any point in time
- See all network requests and responses
- Read browser console logs
- View screenshots at each step

### Manual screenshots in tests

```typescript
// For documentation, visual QA, or regression baseline
await page.screenshot({ path: 'screenshots/dashboard-loaded.png' });
await page.screenshot({ path: 'screenshots/modal-open.png', fullPage: true });
```

---

## Credentials Security

**Credentials NEVER go in test files or committed code.**

```bash
# .env.local (gitignored) — real credentials
E2E_PARTICIPANT_EMAIL="user@example.com"
E2E_PARTICIPANT_PASSWORD="real-password"
E2E_ADMIN_EMAIL="admin@example.com"
E2E_ADMIN_PASSWORD="real-password"

# .env.example (committed) — placeholder values
E2E_PARTICIPANT_EMAIL="participant@example.com"
E2E_PARTICIPANT_PASSWORD="your_participant_password"
```

Tests gracefully skip when credentials are missing:

```typescript
if (!email || !password) {
  test.skip(true, 'E2E credentials not configured');
  return;
}
```

---

## Commands

```bash
yarn test:e2e              # Headless (CI-ready, no browser window)
yarn test:e2e:headed       # With visible browser (see clicks in real time)
yarn test:e2e:ui           # Interactive UI panel (timeline, DOM, network)
yarn test:e2e:coverage     # Run + generate route + V8/Istanbul coverage (see below)

# Run specific project
npx playwright test --project=unauthenticated
npx playwright test --project=participant
npx playwright test --project=admin

# Run specific test file
npx playwright test e2e/specs/auth/login.unauth.spec.ts

# Show HTML report after run
npx playwright show-report

# View trace from failed test
npx playwright show-trace test-results/path-to/trace.zip

# List all discovered tests
npx playwright test --list
```

---

## E2E vs Unit Testing

| Aspect | Unit (Vitest + RTL) | E2E (Playwright) |
|--------|---------------------|-------------------|
| **What it tests** | Isolated functions, components, hooks | Full user flows through real browser |
| **Browser** | jsdom (simulated DOM) | Real Chromium (full engine) |
| **Network** | Mocked (`vi.mock`, `mockResolvedValue`) | Real HTTP to real API |
| **Database** | Mocked (Prisma stubs) | Real database (dev/staging) |
| **Speed** | ~3ms per test | ~1-5s per test |
| **Debugging** | Console output, test assertions | Screenshots, video, traces |
| **CSS/Layout** | Not tested (jsdom has no layout engine) | Real rendering (detects visual bugs) |
| **Flakiness** | Very low (everything mocked) | Higher (real network, real DB) |
| **When to use** | Business logic, validation, state, edge cases | Critical user journeys, auth, payments |
| **Coverage** | 80%+ of codebase | 10-20 critical flows |

### What each layer catches

| Bug type | Unit catches? | E2E catches? |
|----------|---------------|--------------|
| Logic error in use case | ✅ Yes | ✅ Yes |
| Wrong API response format | ❌ Mocked away | ✅ Yes |
| CSS hiding a button | ❌ No layout | ✅ Yes |
| Broken redirect after login | ❌ Router mocked | ✅ Yes |
| Cookie not being set | ❌ No real cookies | ✅ Yes |
| Race condition in UI | ❌ Hard to reproduce | ✅ Easier |
| Third-party integration broken | ❌ Mocked | ✅ Yes |
| Missing translation key | ❌ i18n mocked | ✅ Yes |

### Strategy: Testing Pyramid

```
         /  E2E  \          ← Few (10-20 critical flows)
        / Integration \      ← API route + use case + DB
       /    Unit Tests  \    ← Many (5000+, fast, isolated)
```

**Unit tests** = foundation (fast, many, cheap). **E2E tests** = safety net (slow, few, high-value).

---

## ESLint Governance (`e2e-testing-policy`)

E2E specs (`.spec.ts` in `e2e/`) have a **completely different ESLint profile** than unit tests (`.test.ts` in `src/`).

### Rules DISABLED for E2E (unit-testing-only rules)

All Vitest/RTL-specific rules are turned off: `essential-testing`, `prefer-once-in-test`,
`no-inline-hook-mock-factory`, `no-redundant-global-mocks`, `prefer-mocked-helper`,
`prefer-centralized-assertions`, `prefer-user-helper`, `no-await-import-in-beforeeach`,
`no-english-in-mock-errors`, `architecture-boundaries`, `import-strategy`, `no-native-html`,
`design-tokens-policy`, all `testing-library/*` rules, and format constraints.

### Rules ENFORCED for E2E (`custom/e2e-testing-policy` — error)

| Check | What it detects | Why |
|-------|-----------------|-----|
| **No `vi.mock()` / `vi.fn()`** | Vitest mocking in E2E files | E2E uses real services, not mocks |
| **No `page.waitForTimeout()`** | Sleep-based waits | Use auto-wait or `waitForURL` |
| **No CSS/XPath selectors** | `page.locator('.btn')`, `page.locator('#id')` | Use `getByRole`, `getByLabel`, `getByText` |
| **No `page.$()` / `page.$$()`** | Legacy Puppeteer-style selectors | Use Playwright locators |
| **No hardcoded credentials** | Real emails in `fill()`/`login()` calls | Use `process.env.E2E_*` |

### Safe test domains (not flagged)

Emails with these domains are allowed in tests: `@test.com`, `@example.com`, `@localhost`,
`@mock`, `@fake`, `@invalid`. These are clearly not real credentials.

### Why separate profiles?

| Concern | Unit (.test.ts) | E2E (.spec.ts) |
|---------|-----------------|-----------------|
| Mocking | Required (vi.mock, vi.fn) | Prohibited (real services) |
| Assertions | @testing helpers (assertText, etc.) | Playwright expect (toBeVisible, etc.) |
| Imports | Centralized aliases (@utils, @redux) | Relative from e2e/ |
| HTML | Styled-components only | Not applicable (browser renders real DOM) |
| Architecture | Layer boundaries enforced | Not applicable (tests cross all layers) |
| Locators | screen.getByRole (RTL) | page.getByRole (Playwright) |

---

## E2E Coverage (Two-Channel Model)

`yarn test:e2e:coverage` produces **two independent reports** that together answer "what did our E2E tests actually exercise?":

| Channel | What it measures | Source | Output |
|---------|------------------|--------|--------|
| **A. Client V8** | Lines/branches executed in the **browser** (components, hooks, client bundles) | `page.coverage.startJSCoverage()` → `v8-to-istanbul` → `istanbul-lib-*` | `coverage/e2e-client/html/index.html` |
| **B. Route/API tracker** | **Pages visited** + **API endpoints hit** (server-side reach) | `page.on('request')` → JSONL per test | `coverage/e2e-routes/report.md` |

**Why two channels?** V8 coverage only sees code executing in the browser. Server code (API routes, Use Cases, Repositories) runs in Node and is invisible to V8. The route tracker closes that gap by diffing visited paths against the canonical inventory discovered from `src/app/**/page.tsx` and `src/app/api/**/route.ts`.

### How it works

Both channels are implemented as **auto-fixtures** in `e2e/support/fixtures.ts` that activate only when `E2E_COVERAGE=1`. Normal runs have zero overhead.

```ts
// e2e/support/fixtures.ts exports extended test + expect + request
import { test, expect } from '../../support/fixtures';
```

All `e2e/specs/**/*.spec.ts` files import from this module (not `@playwright/test` directly). The fixtures:

1. **routeTracker** — subscribes to `page.on('request')`, normalizes paths (UUIDs / numeric IDs → `[id]`), writes JSONL to `coverage/e2e-routes/raw/`.
2. **jsCoverage** (Chromium only) — calls `startJSCoverage({ resetOnNavigation: false })` before the test, stops after, filters to `baseURL`, writes JSON to `coverage/e2e-client/raw/`.

After the Playwright run, two scripts aggregate the raw data:

- `scripts/e2e-coverage-routes.ts` — reads JSONL, discovers pages/API endpoints, emits `report.md` with hit/miss tables and coverage percentages.
- `scripts/e2e-coverage-merge.ts` — converts each V8 entry via `v8-to-istanbul`, merges into an Istanbul map, emits HTML + `coverage-final.json`. Filters out framework chunks (`webpack`, `main-*`, `polyfills`, `node_modules`).

### Reading the reports

```bash
# Channel A — client code coverage (open in browser)
open coverage/e2e-client/html/index.html

# Channel B — route/API reach
cat coverage/e2e-routes/report.md
```

Channel B's report shows:
- **Pages hit / total** with percentage
- **API endpoints hit / total** (by method)
- Uncovered pages and endpoints (punch list)
- "Visited but not inventoried" — caught typos or dynamic routes not in the inventory

### Limitations

- V8 coverage is **Chromium only** (Firefox/WebKit skipped silently)
- Server-side code is **not** in Channel A — use Channel B (reach) or add unit tests
- Framework chunks are filtered to keep the report focused on project sources
- Coverage adds ~10-20% overhead per test; run selectively, not on every push

---

## Related

- `frontend/testing/vitest.md` — Unit testing patterns
- `core/testing/philosophy.md` — Testing philosophy (value > coverage)
- `core/testing/mocking.md` — Mock strategy for unit tests
- `.claude/status/testing/coverage-baseline.md` — Coverage metrics

---

**Status**: ✅ Complete | **Tests**: 73 passing (1.2m) | **ESLint**: 1 custom rule | **Updated**: 2026-04-09
