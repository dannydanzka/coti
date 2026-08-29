# SOP: Sovereign Business Domain (SBD)

> **PURPOSE**: Define the canonical repository of business domain knowledge — the first link of the sovereignty chain, the source SRD reads from and IT consumes through MCP
> **SCOPE**: Any business domain whose flow, rules, or implementation must survive beyond the memory of a single person
> **AUDIENCE**: Domain Owners (Commercial), Platform Leads (IT), Sovereignty Stewards
> **COMPANION**: `methodology/commercial/SCI.md` (intake consumes SBD)
> **ORIGIN**: imported 2026-07-06 from the origin fork (where the chain starts at SBD and requirement
> intake is called SRD — our SCI). There SBD is hosted in a wiki; here the domain repository is the
> product repo's own `domain/` — same contract, different host.
> **UPDATED**: 2026-04-22

---

## What This SOP Is

SBD is the **single source of truth for business process knowledge** — hosted in a shared knowledge base (a wiki upstream; the product repo's own `domain/` here), structured as two views per domain (Business · Technical), consumable by both humans and AI.

Before SRD can reframe intent, SRD Phase 4 must retrieve the current state of the domain. Without SBD, that retrieval is memory recall. With SBD, it is lookup.

> *"Business knowledge stops living in heroes' heads. It lives in sovereign pages."*

SBD is the first link of the chain. Without it, SRD is written from memory, SCD is built on assumptions, and SCG ships code against a moving target.

---

## The Extended Chain

```
SBD → SRD → SCD → SCG
 │      │      │      │
 │      │      │      └─ Code execution (Claude Code, governed prompts)
 │      │      └─────── Technical context design (IT)
 │      └────────────── Requirement design (Commercial)
 └───────────────────── Domain knowledge (domain repository, both teams)
```

**SBD is the foundation.** Each subsequent layer depends on SBD being accurate and current. A drifted SBD propagates decay through the entire chain.

---

## Architecture: Two Views Per Domain

Each domain has **two structured views** — same source of truth, different audience and language:

```
[Domain Page]
├── Business View          ← Commercial team, claude.ai + M365
│   ├── Process Flow       (actor → action → system response)
│   ├── Business Rules     (conditions, exceptions, explicit policies)
│   ├── Variants           (edge cases, user types, time-based rules)
│   └── Stakeholders       (owner, approver, escalation)
│
└── Technical View         ← IT team, Claude Code + domain-repo access
    ├── Web Implementation     (modules, hooks, state, API calls)
    ├── Mobile Implementation  (screens, navigation, platform variants)
    ├── Platform Differences   (explicit delta between web and mobile)
    ├── API Contracts          (endpoints, payloads, auth)
    └── Technical Edge Cases   (race conditions, offline, error states)
```

**Platform variants are first-class citizens.** "Same flow on web and mobile" is never true at the implementation layer — the delta lives explicitly in the Technical View, because undocumented deltas are where bugs live.

---

## Page Template (Canonical 9 Blocks)

Every SBD page, regardless of view, uses this header + block structure:

```markdown
# [Domain]: [Business View | Technical View]
> **Last updated**: YYYY-MM-DD
> **Owner**: [Name / Team]
> **Epic/Ticket**: [TASK-XXXX]
> **Companion view**: [link to the other view of this domain]

## 1. Overview
One paragraph. What this domain does and why it matters.

## 2. [Process Flow | Web Implementation]
## 3. [Business Rules | Mobile Implementation]
## 4. [Variants | Platform Differences]
## 5. [Stakeholders | API Contracts]
## 6. [— | Technical Edge Cases]
## 7. Open Questions   (anything not yet decided)
## 8. Change Log       (dated entries: what changed, why, by whom)
## 9. See Also         (links to SRDs, PRs, related domains)
```

Promotions domain (`1550876673` Business · `1550974978` Technical) is the reference implementation. New domains copy its structure exactly — no creative variants.

---

## Governance Model

| Role | Owns | Responsibility |
|------|------|----------------|
| **Domain Owner** (Commercial) | Business View | Keeps process flow and rules current; approves variant additions |
| **Platform Lead** (IT) | Technical View | Updates after each feature delivery; maintains API contracts and platform deltas |
| **Sovereignty Steward** | Structure & drift | Enforces template, blocks free-form pages, runs cadence reviews |

**Update triggers**:
- **New feature** (PLUS ticket with scope change) → SBD update is part of Definition of Done
- **Bug fix** revealing an undocumented variant → Business View Variants table gets a new row
- **Refactor** changing modules, hooks, or API shapes → Technical View updated before PR merge

**Review cadence**: Quarterly cross-team review (Commercial + IT) — sync Business View intent against Technical View reality. Divergence is a finding, not a footnote.

---

## Consumption Model

### IT team — Claude Code + domain repository

```
Developer: "How does the promotions cart flow work on mobile?"
Claude Code:
  1. mcp__atlassian-jira-confluence__confluence_search("Promotions Technical View")
  2. Reads the structured page
  3. Answers with exact variants, edge cases, API contracts
→ SCD context is richer, hallucination rate drops
```

### Commercial team — claude.ai + knowledge-base connector

```
Analyst: "¿Cuáles son las reglas de promociones para distribuidores?"
claude.ai:
  1. Searches the connected knowledge base / domain repo
  2. Reads the Business View
  3. Answers in business language, cites the source page
→ SRD Phase 4 becomes lookup + refinement, not memory recall
```

The same page serves both audiences. No parallel documentation, no translation layer, no drift between "what IT thinks" and "what Commercial thinks."

---

## Intake Checklist — Admitting a Domain to the Catalog

A domain enters SBD only when all of the following are true. Partial pages are worse than no pages — they signal false coverage.

- [ ] **Owner assigned** — Domain Owner (Business) and Platform Lead (IT) named in the page header, not `—`
- [ ] **Both views exist** — Business View and Technical View published and cross-linked
- [ ] **Variants documented** — at least the known edge cases; "none" is a valid answer, silence is not
- [ ] **Platform delta explicit** — Technical View declares either "identical to web" (with justification) or lists the differences
- [ ] **At least one real flow** — not a template with placeholders; a real, current flow with real actors and real rules
- [ ] **Linked from SBD Index** — page `1550811137` updated, domain appears in the catalog
- [ ] **Change log initialized** — first entry dated, signed, with reason

If any box is unchecked, the domain is not in SBD. It is a draft.

---

## Handoff to SRD (Phase 4 · DOMAIN)

The intake SOP (SCI) tells the PO: *"Check the domain repository for the current state of the domain before writing the story."* That instruction is SBD's contract.

**What SRD expects from SBD**:
1. Business View retrievable by domain name
2. Variants table current to the last shipped feature
3. Stakeholders reachable (not stale names)
4. Change log recent enough to trust (≤ 1 quarter old for active domains)

**What SRD returns to SBD**:
- Any gap discovered during requirement writing → filed as an Open Question on the SBD page (block 7), not as a work ticket
- Any new variant surfaced by the new requirement → added to Business View Variants *before* the INVEST story is finalized

This bidirectional flow is what keeps SBD alive. A read-only SBD is a stale SBD.

---

## Anti-patterns

| Anti-pattern | Why it breaks SBD |
|--------------|-------------------|
| Free-form pages that skip the template | No structure → no MCP retrievability → no AI consumption |
| Business View written by IT | Loses domain voice; reads like a spec, not a process |
| Technical View written by Business | Loses platform precision; misses deltas where bugs live |
| Documenting "the flow" without variants | Variants are the value; the happy path is the trivial part |
| Creating a page to "reserve the slot" | Empty pages simulate coverage and block honest gap detection |
| Updating the page after the PR merges | Sovereignty inverted — code became the source of truth, SBD became the artifact |

---

## Related

- `methodology/commercial/SCI.md` — Consumer of SBD (domain lookup during intake)
- `admin/methodology/` — INVEST + SDD, the story quality gates SCI hands off to IT
- `methodology/development/SCD.md` — SCD consumes the Technical View
- `core/documentation/knowledge-architecture.md` — where the Soverum domain repository lives
  (`soverum/products/<name>/domain/`)
