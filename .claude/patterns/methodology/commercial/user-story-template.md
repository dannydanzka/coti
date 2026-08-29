# User Story Template — Copy-Paste

> **Type**: Template
> **Discipline**: Admin → Commercial
> **Usage**: Copy this template into every new user story before submitting to IT
> **Updated**: 2026-04-09

---

## Minimal Story Template

For straightforward features with a clear user and benefit.

```
**Context**: [Why does this story exist? What user problem does it solve? 1-2 sentences.]

**Acceptance Criteria**:

  Given [starting state — what is true before the user acts]
  When [the user takes a specific action]
  Then [the system does something observable and verifiable]

  Given [a different starting state or variation]
  When [user action]
  Then [expected result]

  Given [error condition, empty state, or edge case]
  When [user action]
  Then [what the system shows or does — specific error message, fallback, validation]

**Out of scope**: [What this story does NOT cover — be specific]

**Dependencies**: [Other stories, endpoints, or systems that must exist first. If none: "None identified."]

**Definition of Ready**:
- [ ] INVEST validated
- [ ] At least 2 AC scenarios written (1 must be an error/edge case)
- [ ] IT confirmed estimable
- [ ] Design referenced (if UI change)

**Definition of Done**: All AC pass in QA. Signed off by [PO name] on [date].
```

---

## Full Story Template

For complex features, multi-role stories, or anything touching multiple screens.

```
**Title**: As a [specific user type], I want to [action] so that [business benefit]

**Context**: [Why does this story exist? What business metric does it affect? 2-3 sentences.]

**Affected users**:
- Primary: [who benefits directly]
- Secondary: [who else is affected, if any]

**Acceptance Criteria**:

  --- Happy path ---

  Given [primary starting state]
  When [the primary user action]
  Then [the expected result — specific fields, labels, behaviors]
  And [secondary observable effect, if any]

  --- Edge cases ---

  Given [edge condition — empty state, missing data, limit case]
  When [user action]
  Then [what the system does — message, fallback, partial result]

  --- Error handling ---

  Given [error condition — invalid data, network issue, permission denied]
  When [user action]
  Then [specific error message or behavior — not just "an error is shown"]

**Out of scope**:
- [Specific thing this story does NOT cover]
- [Another explicit exclusion]

**Dependencies**: [List stories, epics, or endpoints that must be done first.]

**Design reference**: [Figma link or screenshot description]

**Definition of Ready**:
- [ ] Title follows "As a / I want / So that" format
- [ ] At least 3 AC scenarios (2 happy path, 1 error/edge)
- [ ] Out of scope explicitly stated
- [ ] INVEST validated: I N V E S T
- [ ] IT Tech Lead confirmed: "Estimable as written"
- [ ] Design attached or linked

**Definition of Done**: All acceptance criteria pass in QA environment. PO reviewed in QA (not just via screenshot). PO sign-off: "Validated on [date]."
```

---

## Epic Template

```
**Epic title**: [Verb + Feature + Business outcome]

**Business driver**: [Why now? What metric does this improve?]

**Affected users**: [Who uses this? What is their current pain point?]

**Success definition**: [How do we know this epic succeeded? Measurable.]

**Out of scope**: [What are we explicitly NOT building in this epic?]

**Stories in this epic**:
- Story 1: As a [user], I want [action] so that [benefit]
- Story 2: As a [user], I want [action] so that [benefit]
- Story 3: As a [user], I want [action] so that [benefit]

**Estimated size**: [S = 1-2 stories / M = 3-5 / L = 6-9 / XL = 10+ (split the epic)]

**Dependencies**: [Other epics or systems]

**Definition of Done (Epic)**: All child stories are Done. Business stakeholder sign-off received.
```

---

## INVEST Quick-Check

Before submitting any story to IT:

```
[ ] I — Can IT build this without waiting for another story to finish?
[ ] N — Does the story say WHAT and WHY, not HOW?
[ ] V — Is the business value explicit ("so that...")?
[ ] E — Is it specific enough for IT to give a size estimate?
[ ] S — Can it be completed in one sprint (1-2 weeks)?
[ ] T — Are there Given/When/Then criteria that define "done" without ambiguity?

→ If any box is unchecked: do not submit. Fix the gap first.
```

---

## Acceptance Criteria Patterns

### Show/Display something
```
Given the user is on [specific screen]
When [the page loads / the user navigates to it]
Then [specific field or element] is shown [in what format / with what value]
```

### User performs an action
```
Given [starting state]
When the user [clicks / selects / submits / enters] [specific element]
Then [the system response — what changes, what appears, what is saved]
```

### Validation / Error
```
Given the user [has not completed a required field / has entered invalid data]
When the user [submits the form / triggers the action]
Then [specific error message] is shown [in what location]
And the user is not able to proceed until [correction]
```

### Empty state
```
Given [no data exists for the user's context]
When the user opens [screen]
Then [empty state message] is shown
And [call-to-action or next step] is visible
```

### Permission-based visibility
```
Given the user has [role X] permissions
When the user opens [screen]
Then [action or element] is [visible / hidden / disabled]
```

---

## See Also

- `methodology/invest.md` — Full INVEST reference
- `commercial/po-methodology.md` — PO workflow: Discover → Specify → Prioritize
- `methodology/sdd-admin.md` — Spec-first discipline
