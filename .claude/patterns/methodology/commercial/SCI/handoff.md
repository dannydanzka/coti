# SCI.5 — IT Handoff (INVEST Gate)

> **Parent**: [SCI.md](../SCI.md) — Sovereign Commercial Intake
> **Gate reference**: [admin/methodology/invest.md](../invest.md)
> **Output**: Transitioned ticket, estimated, in IT backlog

---

## Purpose

Final gate before IT picks up the ticket. Runs the INVEST criteria against the story. If any criterion fails, rework — do not hand off a failing story.

---

## The INVEST Checklist

| Criterion | Pass = | Common failures |
|-----------|--------|-----------------|
| **I — Independent** | Can ship without other pending tickets | Depends on ticket X that doesn't exist yet |
| **N — Negotiable** | Scope can be adjusted in grooming | Spec frozen, "all or nothing" |
| **V — Valuable** | Delivers business value to an identified user | Technical refactor disguised as story |
| **E — Estimable** | IT can estimate in 15 minutes | Missing AC, missing contracts, vague scope |
| **S — Small** | Fits in one sprint (team definition) | Epic disguised as story |
| **T — Testable** | AC have verifiable outcomes | AC use "works well", "is fast", "user-friendly" |

For each criterion: **Pass / Partial / Fail** + note what to fix if not Pass.

---

## Pre-Grooming Conversation

Before transitioning to IT, schedule a 15-min sync with the IT lead:

1. Walk through the story title and goal
2. Confirm IT has enough context to estimate
3. Collect clarifying questions — answer them now, not in grooming
4. Confirm target sprint / release window

If the IT lead cannot estimate after this conversation → **rework**, do not transition.

---

## Transition

Once INVEST passes + pre-grooming conversation complete:

- Transition the ticket to the IT backlog (team-specific status: "Ready", "To Do", "Backlog")
- Add a transition comment: *"SCI complete. INVEST passed. Pre-groomed with <IT lead name>. Ready for SCD."*
- Remove yourself as owner — IT assigns during grooming

---

## Rework Path

If INVEST fails:

- Identify the failing criterion
- Return to the relevant SCI step:
  - `I` fails → re-check dependencies in story-writing
  - `V` fails → re-check intent in srd-application
  - `E` fails → re-check AC in story-writing + spec
  - `S` fails → split the story (story-writing step 4)
  - `T` fails → rewrite AC as Given/When/Then
- Re-run INVEST after fix
- Do not skip — rework is cheaper than a half-built feature

---

## Exit Criteria

- [ ] INVEST checklist — all 6 criteria Pass (not Partial, not Fail)
- [ ] Pre-grooming conversation with IT lead — estimate confirmed
- [ ] Transition comment added
- [ ] Ticket moved to IT backlog status
- [ ] Owner reassigned (PO → IT during grooming)

**Next**: [core/sops/SCD.md](../../development/SCD.md) — IT absorbs the SCI-compliant ticket
