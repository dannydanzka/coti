# SCI — Sovereign Commercial Intake

> **Phase**: ORIGIN — business need → estimable story
> **Owner**: Product Owner + Commercial team
> **Prerequisite**: A real business need exists (stakeholder request, market signal, metric gap)
> **Location**: `rules/sop/SCI.md` (always loaded for commercial team)
> **Status**: v0.1 draft — template not yet validated against a real intake cycle. Treat as starting scaffold, adapt per organization.
> **Updated**: 2026-04-19

---

## Purpose

Orchestrate the commercial intake lifecycle. The phase where business language becomes an INVEST-compliant ticket that IT can estimate. Every feature originates here. No story enters IT without passing this process.

---

## Steps

### 1. Need Capture → `sops/SCI/need-capture.md`

Receive the raw business need. Reframe the real problem — not the first solution proposed. Identify stakeholder, business intent, success metric.

**Trigger**: Any new request from a business stakeholder (email, meeting, Slack, email).

### 2. SRD Application → `sops/SCI/srd-application.md`

Apply the 6 SRD phases: REFRAME → INTENT → QUESTION → DOMAIN → SPEC → HANDOFF. Ask blind-spot questions before writing. Research the business domain.

**Trigger**: Every new intake. Skipping SRD produces vague stories IT cannot estimate.

### 3. Story Writing → `sops/SCI/story-writing.md`

Write the INVEST-compliant story: title, As a / I want / So that, acceptance criteria (Given/When/Then), out-of-scope. Attach artifacts. No Word docs for the spec — spec lives in the ticket.

**Trigger**: Every intake. The story IS the contract with IT.

### 4. Spec Completion → `sops/SCI/spec.md`

Complete the technical-facing context: external docs links (design, flows, data contracts), stakeholder sign-off, regulatory/SOX/legal constraints. Update external docs if scope will be durable.

**Trigger**: Every intake. Incomplete spec = IT estimates blindly.

### 5. IT Handoff → `sops/SCI/handoff.md`

Run the INVEST gate: Independent, Negotiable, Valuable, Estimable, Small, Testable. If any criterion fails → rework. If all pass → transition to IT backlog. Confirm estimate in a pre-grooming conversation.

**Trigger**: Before transitioning the ticket to IT. This is the quality gate.

---

## Flow

```
Business need received
       ↓
  1. Need Capture       → Real problem framed, stakeholder + intent identified
       ↓
  2. SRD Application    → 6 phases complete, blind spots resolved
       ↓
  3. Story Writing      → INVEST story drafted, AC in ticket
       ↓
  4. Spec Completion    → Docs linked, artifacts attached, sign-off
       ↓
  5. IT Handoff         → INVEST gate passes, estimated, transitioned to IT
       ↓
  ✅ Ready for SCD (IT pre-code phase)
```

---

## Anti-Patterns

| Anti-Pattern | Correct |
|-------------|---------|
| Accept the first solution proposed | Reframe to the underlying problem |
| Skip SRD, write story from raw request | Apply 6 phases — always |
| Put AC in Word doc or comments | AC lives in the ticket description |
| Send spec only in chat or email | Consolidate in the ticket + linked docs |
| Ship story when PO is uncertain about scope | Close the blind spot before handoff |
| Transition to IT without estimate conversation | Pre-groom: confirm IT can estimate |
| "Automation" as reporter on all tickets | A human must own description quality |
| Epic masquerading as story (>20 subtasks of different layers) | Split into independently estimable stories |

---

## Exit Criteria

- [ ] Real problem reframed from raw request (not first solution)
- [ ] SRD 6 phases complete (business and technical context captured)
- [ ] INVEST story written with Given/When/Then acceptance criteria
- [ ] AC lives in the ticket description (not a Word doc or comment)
- [ ] External docs linked (design, flows, contracts)
- [ ] Stakeholder sign-off recorded
- [ ] INVEST gate passes (all 6 criteria)
- [ ] Pre-grooming conversation with IT lead → estimate confirmed

**Only after ALL checkboxes → transition to IT backlog (SCD phase)**

---

## Related

- `admin/methodology/srd.md` — The 6-phase SRD methodology (step 2 deep-dive)
- `admin/methodology/invest.md` — INVEST criteria reference
- `admin/commercial/po-methodology.md` — Full PO workflow wrapper
- `admin/commercial/user-story-template.md` — Copy-paste story templates
- `admin/commercial/ticket-issue-standards.md` — Standards + naming conventions
- `core/sops/SCD.md` — Next phase: IT absorbs the SCI-compliant ticket
