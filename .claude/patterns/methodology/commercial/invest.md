# INVEST — User Story Quality Framework

> **Type**: Methodology Reference
> **Discipline**: Admin — Commercial, Product Management
> **Updated**: 2026-04-09

---

## What INVEST Is

INVEST is the six-criteria checklist that determines whether a user story is ready for development. Originally proposed by Bill Wake (2003), it remains the industry standard for agile requirements quality.

A story that fails any criterion is not ready for development. It will cause estimation errors, scope creep, or rework.

---

## The Six Criteria

### I — Independent

Each story can be developed, tested, and delivered without depending on another story being completed first.

| Violates Independent | Satisfies Independent |
|---------------------|----------------------|
| "After the login story is done, add the welcome screen" | "Show a welcome screen when a logged-in user opens the app for the first time" |
| "Add filters to the table from story #47" | "Allow the user to filter the [table name] by [field]" |

**How to fix**: If a story depends on another, either merge them or rewrite the dependent one to describe the behavior from scratch.

### N — Negotiable

The story describes WHAT and WHY — not HOW. Implementation details are negotiated with the development team.

| Violates Negotiable | Satisfies Negotiable |
|--------------------|---------------------|
| "Add a red button in the top-right corner that opens a modal using React Portal" | "Allow the user to report an issue from any screen" |

**How to fix**: Remove all references to technology, implementation, or UI specifics from the story.

### V — Valuable

Every story delivers a complete unit of value to a specific user or the business.

| Violates Valuable | Satisfies Valuable |
|------------------|-------------------|
| "Refactor the database schema" | "Reduce catalog page load time so users complete purchases more often" |

**How to fix**: Every story title should answer: *who benefits and how*?

### E — Estimable

The development team can give a size estimate. If they cannot, the story has too many unknowns.

**Three reasons a story is inestimable:**

| Reason | Fix |
|--------|-----|
| Too vague | Define exactly what changes, for which users, with what AC |
| Too large | Split into independent, estimable stories |
| Unknown technology | Add a spike story first: investigate and document constraints |

### S — Small

A story is completable within one sprint (1-2 weeks). If it takes more, it is an epic.

**Splitting techniques:**

| Split by | Example |
|----------|---------|
| User type | "Promoter sees commissions" + "Manager sees team commissions" |
| Data scope | "Show last 30 days" → then "Add date range filter" |
| Happy path first | "User adds to cart" → then "Handle out-of-stock" |
| CRUD operations | View → Add → Edit → Remove |

### T — Testable

The story has clear, verifiable acceptance criteria in **Given/When/Then** format:

```
Given [a condition that is already true — the starting state]
When [the user takes a specific action]
Then [the expected result is observable and verifiable]
```

**Negative scenarios must also be tested:**
```
Given the user selects a category with no products
Then a "No products found" message is shown
And the user is offered a way to clear the filter
```

---

## INVEST Checklist

Use this before submitting any story for development:

```
[ ] I — Can this story be developed without waiting for another story to finish?
[ ] N — Does the story describe WHAT and WHY, not HOW?
[ ] V — Is there a clear user or business benefit from this story?
[ ] E — Can development give a size estimate for this story?
[ ] S — Can this story be completed within one sprint?
[ ] T — Does this story have Given/When/Then acceptance criteria?

If any box is unchecked → the story is not ready for development.
```

---

## INVEST in Practice with Claude

**Evaluate a story:**
```
Evaluate this user story against the INVEST criteria:

[paste story]

For each criterion (I, N, V, E, S, T), tell me:
1. Does this story satisfy it? Yes / Partially / No
2. Why?
3. What specific change would fix the gap?
```

**Rewrite a story:**
```
Rewrite this user story to satisfy all INVEST criteria:

[paste story]

Requirements:
- Keep the business intent
- Do not prescribe implementation
- Add 2-3 Given/When/Then acceptance criteria
- Make sure it fits in one sprint
```

**Split an epic:**
```
This is an epic that is too large for one sprint:

[paste epic]

Split it into independent, estimable user stories that each deliver value independently.
For each story, provide: title, description, and acceptance criteria.
```

---

## See Also

- `methodology/sdd-admin.md` — Spec Driven Development: writing the full spec before development
- `commercial/po-methodology.md` — How Commercial uses INVEST as Product Owner
- `commercial/user-story-template.md` — Template for writing stories
