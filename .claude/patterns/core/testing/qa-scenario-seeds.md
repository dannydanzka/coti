# Pattern — QA Scenario Seeds (idempotent, scoped, prod-referenced)

> **What**: How to build a persistent QA dataset that holds one row in every testable state of every
> flow, so manual QA never hand-builds data. Distinct from E2E factories (which build + tear down their
> own data per spec).
> **Reference implementation** (dearadry, elevated 2026-07-06): project SOP
> `.claude/rules/sop/qa-scenario-seeding.md` (`yarn qa:reset`) + `prisma/seeds/qa-platform-scenarios.seed.ts`
> + `scripts/qa/*.ts` — adapt names/ORM to your project.

---

## When to use

- You need a **human-facing** QA environment pre-filled with every scenario (paywall states, kit states,
  evidence states, commerce states, CMS active/inactive…).
- NOT for automated tests — those use self-contained factories that clean up (`e2e/support/factories.ts`).

The two assets are complementary: factories prove behavior in CI; scenario seeds let a person see every
state without building it.

---

## Principles

### 1. Compose, don't monolith
One backbone seed (`comprehensive`) + focused, dependency-ordered seeds composed by a single `qa:reset`
wrapper. Each seed runs standalone (`isDirectRun` guard) and is independently re-runnable.

```
teardown → backbone → domain seeds → scenario seed → asset copy → fixtures
```

### 2. Idempotency = scoped clear-then-recreate (never blanket truncate)
Every seed must survive a second run with EXIT 0. Two safe shapes:

- **Upsert by a unique key** (slug, email, unique marker):
  ```ts
  await prisma.sponsor.upsert({ where: { slug }, create: {...}, update: {...} });
  ```
- **Scoped delete + recreate** using a stable marker (`QA — ` prefix, persona id, event scope):
  ```ts
  await prisma.faq.deleteMany({ where: { question: { startsWith: 'QA — ' } } });
  await prisma.faq.createMany({ data: [...] });
  ```

Never `deleteMany()` unscoped on a shared table — it nukes the backbone.

### 3. FK-restricted layers need an explicit teardown step
When a seed replaces rows that another seed references with a `Restrict` FK (e.g. `meetPackage` replaced
while `meet_orders` reference it), a re-run fails. Add a teardown that clears the dependent layer FIRST,
in FK-safe order (children → parents), as the first step of the wrapper. Leave the shared seed unchanged.

### 4. Personas are the index
Key every scenario to a small set of stable personas (fully-progressed / early / edge-empty). A tester
logs in as one and finds the state. Don't scatter rows across anonymous users.

### 5. Cover the enum, verified against schema
For every status enum, guarantee one row per value — but read the **actual** schema first
(`KitStatus = PENDING|SENT|DELIVERED`, not assumed `SHIPPED`). Wrong enum names = silent gaps.

### 6. Prod is a read-only reference, never a PII copy
Shape scenarios after real prod volumes/states (read-only census). Copy only **non-PII marketing
imagery** (gallery/sponsors/challenges/events) prod→QA; never `evidences`/`profiles` (real faces) or
real emails/addresses. Guard hard: source MUST be prod-ref, destination MUST be qa-ref; writes only ever
target QA.

```ts
if (!qaUrl.includes(QA_REF)) throw new Error('Destination is not QA. Abort.');
if (!prodUrl.includes(PROD_REF)) throw new Error('Source is not PROD. Abort.');
```

### 7. Prod-guard every write script
Refuse to run if the write target is the prod ref. One guard at the top of each seed/script:

```ts
if (url.includes(PROD_SUPABASE_REF)) throw new Error('Refusing to run against PROD. QA only.');
```

### 8. Link storage to rows
A seeded evidence/book/profile row that points at a non-existent file 404s on read. Upload a real sample
to the bucket and repoint the row's path/url at it (and flip private buckets like `documents` so signed
URLs are exercised).

---

## Structure (reference impl)

```
prisma/seeds/
  comprehensive.seed.ts        backbone (don't bloat — keep minimal)
  qa-platform-scenarios.seed.ts  phased: P1 events/enroll · P2 challenges/evidence · P3 commerce · P4 companions/CMS
scripts/qa/
  reset-teardown.ts            FK-safe scenario-layer clear (runs first)
  copy-prod-assets.ts          prod→QA marketing imagery (read-only prod, guarded), repoint rows
  seed-fixtures.ts             bucket visibility + sample files + link profile/book paths
package.json
  qa:reset = teardown → db:seed → mango → books → platform → mango-scenarios → assets → fixtures
```

Phase functions take the shared `PrismaClient`, resolve personas/kits/events by stable key, and clear
their own scope before recreating. A phase that needs another's output re-resolves by key (decoupled),
not by threading return values.

---

## Anti-patterns

| Anti-pattern | Correct |
|--------------|---------|
| One giant seed that truncates everything | Composed, scoped seeds; teardown only the FK layer that blocks re-run |
| Assuming enum values from memory | Read `schema.prisma`; cover the real enum |
| Copying prod rows wholesale (PII risk) | Reference prod shape; copy only non-PII imagery |
| Seeding a row whose file doesn't exist | Upload a sample + repoint the path |
| `deleteMany()` unscoped to reset | Scoped marker/persona delete, or upsert |
| No second-run check | Run twice; EXIT 0 is the idempotency contract |

---

## See also

- `.claude/rules/sop/qa-scenario-seeding.md` — operate it.
- `.claude/patterns/core/testing/philosophy.md` — value > coverage.
- `e2e/support/factories.ts` — the complementary self-cleaning factory model.
