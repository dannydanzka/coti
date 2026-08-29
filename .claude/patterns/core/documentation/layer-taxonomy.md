# Layer Taxonomy — the definitive knowledge architecture (Two-Truth)

> **PURPOSE**: THE contract for where knowledge lives. The folder structure IS the sync contract:
> uniform structure → declarative sync. Every repo/workspace governed by this sovereignty conforms to it.
> **ORIGIN**: imported 2026-07-06 from the Betterware sovereignty fork (v9.0.0 governance
> architecture), adapted to Soverum. Validated upstream vs Diátaxis (diataxis.fr — documentation-type
> canon) + DDD bounded contexts. Re-validate: when a new layer or artifact type is proposed
> (requires deliberate revision here first).
> **COMPANION**: `core/documentation/knowledge-architecture.md` — the concrete Soverum mapping
> (which repo holds which truth). This doc is the formal contract; that one is the field map.
> **Migration**: executed in full on 2026-07-06 (import v2, phases F1–F6); the plan was archived after execution.

---

## ① Current truth (observed 2026-07-06, pre-migration)

Sovereignty root mixes responsibilities: ~14 top-level discipline dirs (`frontend/`, `backend/`,
`qa/`, …), 5 loose `*.sh` engines at root, `skills/` and `templates/` as distribution channels
without a distribution dir, and the methodology chain (SCI→SCD→SCG→SDP→SQP→SRO) scattered across
`core/sops/`, `admin/sops/`, `qa/sops/`, `sre/sops/`. Project overlays nest by architecture
(`projects/nextjs/<name>`). It works, but structure is positional knowledge — the sync scripts
hardcode it.

## ② Future truth (the standard)

### The 5 layers (WHO owns the truth — and what validates it)

| # | Layer | Location | Owns | Two-Truth ② validated by |
|---|-------|----------|------|---------------------------|
| L0 | Doctrine | `doctrine/` | WHY — principles | deliberate revision |
| L1 | Core | `core/` (+ `methodology/`) | WHAT of engineering, agnostic | Context7 / methodology canon |
| L2 | Discipline | `disciplines/<d>/` | HOW of one discipline, product-agnostic | Context7 |
| ~~L3~~ | ~~Project~~ | **RETIRED 2026-08-22** | per-project deltas now live in the project's own repo (`.claude/rules/`, `docs/`, `patterns/business/`) — see the note below | project owner |
| L4 | Domain | `soverum/products/<name>/domain/` | WHAT of the product — business flows, cross-discipline | product/business owner |

> **L3 was retired on 2026-08-22** (`plans/PLAN-2026-08-22-de-metodologia-a-sistema-federado.md` §Fase 6).
> A layer inside this repo holding per-project deltas turned out to be a third copy that was always
> behind and always won the planchado: it replaced newer project work on every sync. The delta did not
> disappear — it moved to where its owner already backs it up, the project's own git. The numbering is
> kept (L4 stays L4) because 47+ pointers across consumer repos name these levels.

Root responsibilities OUTSIDE the layers: `machine/` (**scoped to one machine/operator — versioned, never distributed**; added 2026-08-22) · `distribution/` (skills, plugins, templates — what ships
to consumers) · `tooling/` (sync engine + scripts) · `plans/`, `status/` (working docs + facts) ·
`.claude/` (sovereignty's own governance) · meta docs at root (OSS convention).

> Until phases F4–F5 execute, L2 lives as flat root dirs and engines live at root. The contract
> above is the target; the sync engine resolves both layouts during the transition.

### Artifact types (SAME names wherever they appear — Diátaxis-mapped)

| Folder | Diátaxis | Content | Never contains |
|---|---|---|---|
| `patterns/` | explanation + reference | how X works / should be | procedures |
| `sops/` | how-to | trigger + steps + done-condition | theory |
| `rules/` | reference (routing) | thin auto-load WHEN/WHERE | full bodies |
| `skills/` | how-to (behavioral) | portable protocols | project facts |
| `hooks/` | executable reference | deterministic guardrails | docs |
| `enforcement/` | executable reference | analyzers, arch-tests, CI gates, eslint rules | prose-only rules |
| `status/` | reference (facts) | snapshots/cards — current truth ONLY | aspiration |
| `plans/` | working docs | PLAN-*, archived when done | durable knowledge |
| `scripts/` | tooling | layer-local automation | knowledge |

**Addressing contract**: `<layer>/<artifact-type>/<topic>`. An artifact type never nests inside
another type. A knowledge item lives in exactly ONE layer; other layers reference it.

### Knowledge flow (structure serves these arrows)

```
project ──(2+ projects)──▶ discipline ──(2+ disciplines)──▶ core
discipline ◀── cross-pollination ROUTED THROUGH core ──▶ discipline
domain (L4) ◀─ product owners · consumed by all disciplines (cited, never copied)
```

Full procedure: `core/sops/knowledge-elevation.md`.

### The fork relationship (Soverum ↔ company forks)

This repo is the **origin** sovereignty. Company forks (e.g. the Betterware sovereignty) adapt it
to their stacks; improvements flow back **as knowledge, adapted — never as verbatim copies**
(divergent stacks make whole-file copies regress the receiver; see the June 2026 import analysis).
Harvests in either direction are their own PLAN with acceptance criteria per item.

## ③ Gap & path

Migration executed 2026-07-06 (import v2, plan archived after execution): F1 this contract 🟢 · F4 manifest-driven
sync engine + tests · F5 `disciplines/` + `tooling/` + `distribution/` moves + methodology
consolidation · F6 plugin channel. Consumers' local `.claude/` paths do NOT change — the engine
writes the same destination regardless of source layout.
