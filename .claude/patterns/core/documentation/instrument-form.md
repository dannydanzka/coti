# The Instrument Form Contract — one shape for every governing repo

> **Document type**: Core practice (L1) — transversal, domain-agnostic
> **Version**: 1.0 · **Created**: 2026-08-15
> **Applies to**: every **instrument repo**, in every domain (Gestión · Contenido · any future one)
> **Companion**: `doctrine/governing-instruments.md` holds the *law* of instruments (delimitation,
> invariants, mediated learning); this document holds their *form*
> **Provenance**: authored inside `disciplines/management/index.md` (§The form, homologation of
> 2026-08-04, corrections of 2026-08-12) while the Gestión instruments were the only consumers. The day
> a second family appeared — `sovertent`, discipline `content` — the contract stopped belonging to one
> discipline. Two families of consumers and structural genericity are the graduation test; the body moved
> here. The Gestión file keeps its family-specific evidence and instances.

---

## The rule

> **The form is inscribed from the SSOT and versioned. Only `patterns/business/` and the SOPs that
> operate a specific object may differ between instruments.** If two instruments hold the same body, one
> of them is a copy — and a copy is a future divergence with a date on it.

The whole point of a layer embodiment is that instruments do **not** each invent their own governance
architecture. An operator who can navigate one instrument can navigate any of them — including one from
another domain they have never opened.

## Governing subject vs governed object — the distinction that decides ownership

Two kinds of repos consume this system, and the same folder names carry **opposite ownership**:

| | Governed object (an Engineering consumer) | Governing subject (an instrument repo) |
|---|---|---|
| What it is | a codebase that **receives** governance | a repo that **exercises** governance |
| `patterns/{doctrine,core,<discipline>}` | wholly mother-owned, synced | **instrument-authored**: its identity, its craft, its specialization |
| What is a pointer | almost nothing | what **graduated** — a body two instruments needed, which by the 2+ test stopped belonging to either |

Writing one rule for both collapses the distinction the SGE category exists to make. An instrument authors
real bodies: nobody else can author what the instrument *is* (`patterns/doctrine/`), the craft of one verb
is not the craft of another (`patterns/core/`), and the discipline deliberately leaves the specialization
to the instrument (`patterns/<discipline>/`).

## The canonical `.claude/` layout

Every instrument has **this** shape. An instrument that adds a first-level folder is declaring a new
artifact type — a discipline-level decision, not a local one.

```
.claude/
├── rules/_global.md            ← artifact type · thin routing: golden rules + "what to read when"
├── patterns/                   ← artifact type · pattern bodies, grouped by LAYER
│   ├── doctrine/       L0        the instrument's own identity: <name>-architecture.md · linaje.md
│   ├── core/           L1        the craft, agnostic — deliverable to another org as-is
│   │   └── sops/                   procedures of the craft
│   ├── <discipline>/   L2        the discipline layer, NAMED AFTER THE INSTRUMENT'S DISCIPLINE
│   │   ├── sops/                   (management/ for a Gestión instrument, content/ for a Contenido one)
│   │   └── templates/              canonical shapes (optional)
│   └── business/       L3      ← ⭐ THE ONLY LEGITIMATE DIFFERENCE: bindings, resolved values,
│       └── sops/                   this instance's sources — and the SOPs that operate its object
├── hooks/ + settings.json      ← artifact type · deterministic guardrails, synced from the mother
├── status/                     ← artifact type · current-state.md (thin, auto-loads) + changelog.md
└── plans/                      ← artifact type · working docs (PLAN-*), archived when done
```

**Layer ≠ artifact type — the axis error this layout corrects.** `doctrine · core · <discipline> ·
business` are **layers** (L0→L3) and all four live under `patterns/`, on one axis. `patterns · sops ·
rules · templates · hooks · status · plans` are **artifact types**. A *binding* is not an artifact type:
it is what L3 contains (`core/documentation/layer-taxonomy.md`).

| Rule | Consequence |
|---|---|
| The L2 folder is named after the instrument's **discipline** | a Contenido instrument with a `management/` L2 is carrying another domain's name for its own specialization |
| `plans/`, never `plan/` | plural, as in the layer taxonomy's artifact-type list |
| `patterns/**` outside `business/` is **agnostic** | no tenant name, no sibling repo, no absolute path — a leak is a defect, not a detail |
| `patterns/business/**` holds the resolved values | it does **not** travel when the method is delivered: it regenerates empty |
| Everything else must be identical | an instrument may **add** golden rules, never drop the common ones |

> **Optional, declared per instrument:** `docs/` (long-form reference that is neither pattern nor SOP) and
> `settings.local.json` (author overrides). Anything else needs a discipline-level decision.

> ✅ **Declared exception — computed state.** An instrument **with an engine** may keep `status/`, `plans/`
> and `docs/` present but empty and replace the third auto-load slot with a **command**: its state is
> computed, not narrated. The shape is respected (the folders exist, the contract still names exactly three
> things); what changed is the *medium* of one slot. **An instrument with no engine cannot claim it** — a
> state nobody computes and nobody writes is a state nobody knows.

## The canonical `CLAUDE.md` skeleton

The layout homologates the *folders*; this homologates the **door**. These sections appear in this order,
with these names. Content is per-instrument; the skeleton is not.

| # | Section | What it must answer |
|---|---|---|
| 0 | **Header blockquote** | verb · object · capability · tenant · perimeter · nature · language |
| 1 | `## Qué es esto en una línea` | the one sentence, quotable verbatim — if it cannot be said in one sentence, the verb is not settled |
| 2 | `## Contrato de auto-carga` | exactly which files load every session; everything else is on-trigger |
| 3 | `## Las reglas que más se rompen` | the 3–5 that actually get violated, pointing at `rules/_global.md` for the rest |
| 4 | `## Su lugar en la familia` | the sibling instruments, **and what this one is not** — the Law of Delimitation only works if each instrument states the borders from its own side |
| 5 | `## Grafo` | the folder tree with one line of purpose each |
| 6 | `## Arquitectura de gobernanza (.claude/)` | the L0→L3 layer table + the agnostic/resolved split |
| 7 | `## Cómo trabajar aquí` | the 3–5 most frequent entry actions → their SOP |
| 8 | `## Estado · por dónde entrar` | pointer to `status/current-state.md` (or the computed-state command) + the first reads |

**Done condition:** *reading any one instrument's `CLAUDE.md` tells you its siblings exist, what they are
not, and how to navigate a repo you have never opened.*

> **The order and the presence are mandatory; the exact wording of a heading is not — provided the mapping
> is declared.** A heading may legitimately vary when the canonical wording would cost meaning (a stricter
> claim, a declared-language convention). **What may never vary is the answer each section gives.** *A
> skeleton enforces that the questions get answered, not that they get asked in identical words.*

## The business layer is split by project

The rule says the business layer **may** differ; this says **how it is shaped** — it is what keeps "the
only legitimate difference" from becoming "the folder where everything that did not fit went".

```
patterns/business/
├── _index.md              ← REQUIRED · the catalogue: project → tenant → object → where its corpus lives
├── doctrine-sources.md    ← REQUIRED · the ONLY file holding resolved paths (mother · siblings · tenants)
├── <project-a>/           ← one folder per governed project WITH bindings of its own
│   └── sops/                 the SOPs that operate THIS project's object
└── <project-b>/
```

| Rule | The failure it prevents |
|---|---|
| **The catalogue is required.** A project with no row in `_index.md` is not governed — it is stored | Material accumulates in a flat business layer and nobody can say which projects the instrument holds |
| **What is mandatory is the row, not the folder.** The folder is created when there is a resolved value to put in it — *an empty folder is not order, it is ceremony* | A layer full of empty folders re-teaches that you cannot tell governed from merely stored |
| **Resolved paths live in exactly one file** (`doctrine-sources.md`) | Machine-local wiring scatters through the agnostic zone and the instrument stops being deliverable |
| **The governance folder points at the corpus; it does not contain it** | The corpus lives in the repo root on its own terms; duplicating it under `.claude/` creates a second copy that drifts |

> **Why the split matters more than it looks.** Between instruments, the verb enforces the delimitation;
> *inside* an instrument, nothing does — a flat business layer is the one place where two tenants' material
> can meet without any rule being visibly broken. **Perimeter follows the tenant holds inside a repo too**,
> and the per-project split is what makes it checkable.

## How the form is inscribed (the mechanism, not a convention)

Consumers are registered so the sync engine can ship guardrails to them — nothing is hand-copied:

```
.claude/.project-id (in the instrument itself)    ← `project:` + `discipline: <discipline>`
tooling/sync-all-projects.sh  → PROJECTS[]        ← the instrument's absolute path
disciplines.json → <discipline>                   ← anchors declared
```

> ⛔ **Known engine limitation (measured 2026-08-12, still open):** the sync engine treats
> `.claude/patterns/` as WIPE + REPLACE, which is correct for governed objects and **destructive for
> governing subjects** — it would prune everything an instrument authors. Until the engine grows a declared
> consumer class, **`sync.sh` is not run from any instrument repo.** Hooks are reconciled by hand against
> the mother's checksums. Evidence and consequences: `disciplines/management/index.md §The sync engine
> cannot plancha this family`.

## See Also

- `doctrine/governing-instruments.md` — the law these repos obey (delimitation · six invariants · mediated learning)
- `core/documentation/layer-taxonomy.md` — the layer/artifact-type axes this layout implements
- `disciplines/management/index.md` — the Gestión family's instance: hook inventory, `lab/` collision, sync-engine evidence
- `disciplines/content/index.md` — the Contenido discipline; its instrument (`sovertent`) consumes this contract as-is
