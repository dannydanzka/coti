# SCI.3 — Story Writing

> **Parent**: [SCI.md](../SCI.md) — Sovereign Commercial Intake
> **Template reference**: [admin/commercial/user-story-template.md](../user-story-template.md)
> **Standards reference**: [admin/commercial/ticket-issue-standards.md](../ticket-issue-standards.md)
> **Output**: INVEST-compliant story in the ticket system

---

## Purpose

Translate the completed SRD worksheet into a ticket that follows team standards and passes INVEST. The story lives in the ticket description — **never in a Word doc, never in a comment, never in chat**.

---

## Story Structure

### Title

```
[Layer][Module] As a <role>, I want <action> so that <outcome>
```

Examples:

- `[FE][Orders] As an associate, I want to see order classification labels so that I know customer tier at a glance`
- `[BE][Auth] As an admin, I want to reset user 2FA so that I can unblock locked-out users`

Prefix conventions:
- Layer: `[FE]`, `[BE]`, `[FS]` (fullstack), `[INFRA]`, `[QA]`
- Module: business module short name (consistent project-wide)

### Description

```markdown
## Context

<2-3 sentences. Why now? What system/flow is this in?>

## Goal

As a <role>
I want <action>
So that <outcome/metric>

## Acceptance Criteria

**Scenario 1: Happy path**
Given <precondition>
When <action>
Then <expected result>
And <additional check>

**Scenario 2: Error path**
Given <precondition>
When <invalid action>
Then <error message/behavior>

**Scenario 3: Boundary**
Given <edge case>
When <action>
Then <expected>

## Out of Scope

- <explicit exclusion 1>
- <explicit exclusion 2>

## References

- Design: <link>
- Flow: <link>
- Related ticket: <link>
```

### Attachments

Design mocks, flow diagrams, data samples. Always linked, never only attached.

---

## Splitting Rules

Split when any of these appear:

- More than 8 acceptance criteria scenarios
- Multiple user roles with distinct flows
- Multiple layers that could ship independently (FE and BE)
- Estimate > 8 story points (team threshold)
- Regulatory/SOX scope on top of functional scope

Split into independently-estimable child stories. Parent becomes the epic.

---

## Exit Criteria

- [ ] Title follows `[Layer][Module] As a X, I want Y so that Z` format
- [ ] Context explains why (2-3 sentences)
- [ ] As a / I want / So that complete
- [ ] Minimum 2 AC scenarios (1 happy + 1 error)
- [ ] Out-of-scope is explicit
- [ ] References linked (design, flow, related)
- [ ] Attachments attached AND linked inline where relevant
- [ ] Reporter is a human, not automation

**Next**: [spec.md](spec.md) — Complete the technical-facing spec
