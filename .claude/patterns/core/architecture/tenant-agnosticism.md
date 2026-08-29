# Tenant Agnosticism

> **Module**: core/architecture
> **Enforcement**: `npm run agnosticism:check`
> **Version**: 1.0 | **Created**: 2026-05-24

---

## Rule

**`src/` must contain zero references to client brand names.**
Client names (tenant slugs, company names, emails) belong in data — never in logic.

---

## What is Allowed vs Forbidden

| Location | Allowed | Forbidden |
|----------|---------|-----------|
| `src/**/*.ts(x)` — logic/constants | ❌ Never | client name in any string, variable, comment |
| `prisma/seed*.ts` | ✅ Expected | — |
| `prisma/*-site-config.ts` | ✅ Expected | — |
| `prisma/*-catalog.*` | ✅ Expected | — |
| UI copy / i18n keys | ✅ Expected | — |
| JSDoc file headers | ✅ OK | — |
| `package.json` → `"name"` | ✅ OK (project identifier) | — |
| Domain names / URLs in config | ✅ OK | — |
| `.claude/` docs & patterns | ✅ OK | — |

---

## Common Violations

### ❌ Hardcoded brand in email subject
```ts
// route.constants.ts
export const SUBJECT = '[Trackia] Mantenimientos próximos'; // ❌
```

```ts
// route.ts — ✅ use tenant.displayName
subject: `[${tenant.displayName}] Mantenimientos próximos (${count})`,
```

### ❌ Hardcoded tenant slug in logic
```ts
const tenant = await tenantRepository.findBySlug('corf'); // ❌
```

```ts
// ✅ resolve from request context (middleware sets x-tenant-slug header)
const tenantSlug = request.headers.get(TENANT_SLUG_HEADER); // ✅
```

### ❌ Client name in a constant
```ts
export const APP_TITLE = 'CORF Admin'; // ❌
```

```ts
// ✅ read from tenant.displayName or siteConfig
export const buildAppTitle = (tenantName: string) => `${tenantName} Admin`;
```

---

## Enforcement

```bash
npm run agnosticism:check
# Scans: src/**/*.ts(x), prisma/*.ts, middleware.ts
# Patterns: the tenant names THIS repo must never mention (list them in package.json)
# Exit 0 = clean | Exit 1 = contamination found
```

Add each new client name to the grep pattern in `package.json` when onboarding a tenant:

```json
"agnosticism:check": "grep -rniE '<tenant-a>|<tenant-b>|<new-client>' src/ prisma/ middleware.ts && exit 1 || echo OK"
```

> **The check itself must stay agnostic.** Until 2026-08-22 this file shipped a hard-coded list of real
> client names as the example — a verifier of agnosticism that was itself the contamination it looks for.
> The list belongs in the consuming repo's `package.json`, which is the only place that knows who its
> tenants are. Note also the exit code: `|| echo 'OK'` after a bare `grep` **always exits 0** — the
> original example could not fail. A gate that cannot fail is decoration.

---

## Why This Matters

The platform serves multiple tenants from the same codebase. A client name hardcoded in `src/` means:
- Every new tenant deployment requires a code change
- The codebase leaks one client's identity into another's runtime
- Renaming a client (e.g. `corf` → `corf2`) breaks unrelated code paths

Tenant identity must flow from **data** (DB row) → **session** (JWT) → **request headers** (middleware) → **use case parameters**. Never from hardcoded strings in logic.

---

## Standard agnostic SaaS module set (sovereignty reference)

> Consolidated 2026-06-21 from the former `saas-modules-comparison` plan. The canonical module set a
> multi-tenant Soverum product builds on; Trackia is the reference implementation. Domain-specific
> modules (rental lifecycle, maintenance) sit on top and are **not** agnostic.

- **Tier 1 — Core (every SaaS)**: Auth (JWT + HttpOnly + reset + rate limit) · RBAC (platform + tenant
  roles + route guards) · Tenant entity + edge resolution (subdomain + custom domain) · agnosticism CI
  check · append-only audit log (`actorUserId` + `tenantId` + before/after) · tenant-scoped member signup.
- **Tier 2 — Operational**: owner impersonation (support mode, no creds) · subscription tiers
  (FREE/PRO/ENTERPRISE) · transactional email (Resend) · in-tenant user management · per-tenant site
  config/branding.
- **Tier 3 — Commercial (e-commerce)**: section-based public CMS (`tenant-sites.md`) · cart + checkout
  (anon + auth + Stripe) · `AssetLock` TTL reservations · campaign/UTM attribution · product feeds.

Canonical multi-tenant rules: Tenant model (not a user-as-tenant) · resolve at the edge (inject
`x-tenant-id` before any handler) · every domain table carries `tenantId` with `@@index([tenantId, …])`
· `@@unique([tenantId, email])` (never global `@unique`) · `owner` = platform-level (`tenantId = null`)
· `member` = B2B portal (`tenantId + clientId`).
