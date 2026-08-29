# SCI.4 — Spec Completion

> **Parent**: [SCI.md](../SCI.md) — Sovereign Commercial Intake
> **Output**: Ticket with complete technical spec, stakeholder sign-off, external docs linked

---

## Purpose

Close the gap between a user story and a ticket IT can implement. The story tells the *what/why*. This step adds the *what else IT needs* — contracts, constraints, sign-off, traceability.

---

## Procedure

### Step 1: Link or create the external docs page

If the feature is durable (not a one-off fix):

- Create or update a page in external documentation (design system, architecture wiki, product glossary)
- The ticket links to this page — the page does **not** replace the AC

Minimum content on the external doc:

- Business rules (authoritative)
- Data flow / process diagram
- Integration points (APIs, events, queues)
- Non-functional requirements (performance, accessibility, i18n)

### Step 2: Document API/data contracts inline

If new endpoints, payloads, or events will be involved:

- Request/response shape (preliminary — IT may refine)
- New fields with types
- Source of truth for each field

### Step 3: Flag regulatory / compliance scope

Explicit callout in the ticket when:

- SOX-relevant
- PII or payment data
- Auditable trail required
- Regulatory deadline
- Legal review required

Add a `regulatory` label if the project uses one.

### Step 4: Stakeholder sign-off

Before handoff to IT:

- Stakeholder confirms the problem framing (not just the solution)
- Stakeholder confirms the acceptance criteria
- Record the sign-off in a ticket comment (with timestamp and name)

Sign-off is a **comment in the ticket**, not a Slack message that will be forgotten.

### Step 5: Set meta fields

- Priority
- Target release / version
- Business value (score or label, per team convention)
- Epic link (if part of larger initiative)
- Component(s)
- Reporter — a human

---

## Anti-Patterns

| Anti-Pattern | Correct |
|-------------|---------|
| Word doc is the spec | Spec lives in the ticket + linked external docs |
| External doc is the spec (AC omitted) | AC in ticket, context in external doc |
| Sign-off in chat | Sign-off as a ticket comment |
| Missing regulatory flag on SOX feature | Flag explicitly — QA and dev need to know |
| Contracts "to be defined later" | Preliminary contract before IT estimates |

---

## Exit Criteria

- [ ] External docs linked or created
- [ ] Preliminary API/data contracts drafted (if applicable)
- [ ] Regulatory/compliance scope flagged (if applicable)
- [ ] Stakeholder sign-off recorded as a ticket comment
- [ ] Priority, target release, component set
- [ ] Reporter is a human

**Next**: [handoff.md](handoff.md) — Run the INVEST gate
