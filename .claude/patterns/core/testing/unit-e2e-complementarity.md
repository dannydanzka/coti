# Unit + E2E Complementarity

> **Principle**: Unit and e2e tests cover different holes. Unit proves *code paths* (lines/branches with mocked boundaries); e2e proves *the feature works* (real HTTP → app → DB, real third-party sandbox). Neither replaces the other. A line executed by a smoke test is not a behavior verified.
> **Origin**: Established on the Stripe payment flow, 2026-06-20. Reference impls cited inline.
> **See also**: `philosophy.md` (value > coverage), `mocking.md` (mock at boundaries), `frontend/testing/vitest.md`, `frontend/testing/runners/playwright.md`.

---

## 1. Division of labor

For any feature with an HTTP surface + side effects, split coverage like this:

| Concern | Unit owns | E2E owns |
|---------|-----------|----------|
| Input validation, branch logic, error mapping | use case / controller tests (boundaries mocked) | — |
| Status-code routing, auth gate, signature gate | route handler test | — |
| Real integration: HTTP → app → DB | — | spec via factories, asserts DB state via API |
| Real third-party (Stripe/Supabase) in **sandbox** | — | real `cs_test_` session, real signed webhook |
| Cross-entity side effects (rows created/updated) | partially (mocked repos) | ✅ asserted end-to-end |

Rule of thumb: if a bug could pass every unit test and still break the product, that bug belongs to an e2e. If a branch is annoying to reach through HTTP, it belongs to a unit test.

---

## 2. Anti-pattern: coverage theater

The single biggest source of fake confidence is the smoke test that executes a handler and asserts only that *something* happened:

```ts
// ❌ Coverage theater — passes whether the route works or throws.
it('handles POST request successfully', async () => {
  try { const r = await POST(req); expect(r).toBeDefined(); }
  catch (e) { expect(e).toBeDefined(); }
});
```

It inflates line/statement coverage (the handler ran) while verifying nothing: not the status code, not validation, not auth, not which use case was called. Treat these as **untested**. Replace with real assertions:

```ts
// ✅ Real — asserts status + that the right collaborator was called with the right args.
it('returns 400 when required metadata is missing', async () => {
  constructEvent.mockReturnValueOnce(stripeEvent('payment_intent.succeeded', pi({ eventId: 'e' })));
  const res = await POST(buildRequest('sig'));
  expect(res.status).toBe(400);
  expect(processWebhook).not.toHaveBeenCalled();
});
```

Reference: `src/app/api/webhooks/stripe/route.test.ts` (16 real cases) replaced a 1-assert "should export POST" smoke test.

---

## 3. Tests must never touch production — guard at both layers

A test that can reach prod credentials is a liability, not a safety net. Fail closed.

**Unit (vitest)** — in the global setup, throw on a live key and force deterministic fakes:
```ts
const hasLiveStripe = process.env['STRIPE_SECRET_KEY']?.startsWith('sk_live');
const hasProdDb = [URL, DATABASE_URL, DIRECT_URL].some((v) => v?.includes(PROD_REF));
if (hasLiveStripe || hasProdDb) throw new Error('[vitest] Refusing to run: prod creds detected.');
process.env['STRIPE_SECRET_KEY'] = 'sk_test_fake'; // boundary mocks never see a real secret
```

**E2E (Playwright)** — a guard called from `playwright.config.ts` *after* dotenv loads, aborting the whole run if Stripe is live / DB is the prod project / `APP_ENV=prod`. Reference: `e2e/setup/guard-prod-env.ts` → `assertNonProdEnv()`.

Verify guards in **both** directions (passes on QA, throws on injected prod) — a guard you haven't seen trip is a guard you don't trust.

---

## 4. E2E that exercises webhooks without `stripe listen`

Third-party webhooks can't reach `localhost`. Instead of provisioning a tunnel, **sign the event yourself** with the same algorithm the provider uses and POST it to the running app. This exercises the real route + use case + DB write, deterministically, in CI:

```ts
// e2e/support/stripe.ts
const sig = crypto.createHmac('sha256', secret).update(`${ts}.${payload}`).digest('hex');
// POST payload with header `stripe-signature: t=${ts},v1=${sig}` → app verifies with its STRIPE_WEBHOOK_SECRET
```

Always include the **negative** case (sign with a wrong secret → expect 400): it proves the deployed endpoint actually verifies, not just that the happy path is wired. Reference: `e2e/specs/events/enrollment-payment.spec.ts` (PAY-001 creates the enrollment; PAY-002 rejects a bad signature).

---

## 5. E2E creates its own data — and its own users

API-level e2e should not depend on seeded fixtures. Use factories that create + clean up via the admin API (`createTestUser/Kit/Event`), then log in via the API (`createApiParticipant`). The webhook-created rows are cleaned by deleting the parent entity (cascade) — verify **zero orphans** in the test DB after a run.

**Credentials**: the browser auth-setup needs real users. Don't guess passwords — verify candidates against the test DB by `bcrypt.compare` on the stored hash, then wire the confirmed values into the gitignored env. Recovering a verified existing credential beats minting a new one (no duplicate accounts, no drift).

---

## 6. Gotchas that cost time (project-specific, but instructive)

- **Globally-mocked modules can't be re-mocked.** If `@database`, `@logger`, `next/server` are mocked in the global setup, a local `vi.mock()` of them is an ESLint error (`no-redundant-global-mocks`). Import the global mock and `vi.mocked()` it. If the global mock omits an export you need (e.g. `prisma`), that branch isn't unit-testable cleanly → cover it in e2e instead.
- **`prefer-once-in-test`**: inside `it()` use `mockReturnValueOnce`/`mockResolvedValueOnce`; reserve the non-Once setters for `beforeEach`.
- **`return promise` inside try/catch does not catch the rejection.** `try { return handler(); } catch {}` lets a rejection inside `handler()` escape. A test that asserts the catch path must trigger the error in the *awaited/synchronous* part. Finding this is a feature of real tests, not a nuisance.
- **Test the controller's own logic, delegate the rest.** Route tests assert signature/routing/status and that the right use case was called; the use case's internals are the use case test's job.

---

## Checklist for adding coverage to a feature

- [ ] Use case test: happy + each error/boundary branch, boundaries mocked.
- [ ] Route test: auth gate, validation → status code, correct use-case delegation. **No smoke tests.**
- [ ] E2E: factory-built data → real HTTP flow → assert DB state via API; include a negative/security case.
- [ ] Third-party in sandbox only; prod-key guard proven in both directions.
- [ ] Zero orphan rows in the test DB after the run.
- [ ] `lint` 0/0, `type-check` green, full unit suite green.
