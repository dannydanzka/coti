# Conduct — Desarrollo domain nuance

> **Reads on top of**: [core/conduct/index.md](index.md) · **Domain**: `development`
> **Applies to**: frontend · spa · mobile · backend · lib · ecommerce · fullstack · qa · sre ·
> infrastructure · operations (`disciplines.json` → `domain: development`)

---

## What the work is

**Code that must keep running after you leave the session.** Everything below follows from that: the
reader is a future maintainer with less context than you, and the environment is hostile (concurrency,
partial failure, someone else's migration).

## Where carelessness shows up in this domain

| Failure | Why it is specific to Desarrollo | Guard |
|---|---|---|
| **A green build that hides a broken rule** | The gate is automatable, so it is trusted blindly. A disabled lint rule, a `@ts-ignore`, a skipped test all read as green. | `core/workflow/definition-of-done.md` — the gate is reported verbatim (`TS: 0 / ESLint: 0 / Tests: N passed`), never summarized as "green" |
| **The spec written after the implementation** | Types and tests can be retrofitted, and then they describe the code instead of the requirement. | `methodology/development/sdd-bdd.md` — interface and mock before logic |
| **Business context leaking into agnostic code** | Names outlive the ticket that motivated them. `getPromotionAddresses` lies the moment the promotion ends. | `core/quality/naming.md §Agnostic by default` |
| **The drive-by refactor** | The diff is the unit of review; unrelated formatting buries the change that matters. | Minimal diff: touch what the request names, and nothing else |
| **Migration audits that re-read everything** | Most failures predate the migration; analyzing them is rework. | `core/sops/rtl-migration.md` — baseline once, then triage into three buckets |

## The one thing to ask before writing a file

> **Does this already exist?** — `core/workflow/investigation-first.md` and
> `core/workflow/no-reinventing-wheel.md`. In this domain the cost of the wrong answer is a second
> implementation of the same thing, and the two drift.

## Authorization, in this domain's terms

The generic boundary is `core/workflow/authorization-boundary.md`. What it means here: **the repository's
history and its deployed state are not yours.** Commits, pushes, merges, migrations, deploys and
dependency changes are asked for every time — the code you wrote is yours to write, not yours to ship.
