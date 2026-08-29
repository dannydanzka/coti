# Ticket System Issue Standards

> **Type**: Standards + Patterns
> **Discipline**: Admin → Commercial
> **Audience**: Commercial (PO), IT leads, developers
> **Based on**: Analysis of TICKET-ID, TICKET-ID, TICKET-ID, TICKET-ID, TICKET-ID + industry INVEST standards
> **Updated**: 2026-04-06

---

## Diagnosis: What the Current Tasks Reveal

Analysis of 5 active/closed tasks shows systematic patterns that cause scope creep, rework, and QA incidents.

| Problem | Evidence from real tasks | Impact |
|---------|--------------------------|--------|
| **No user story format** | All 5 tasks use feature-request language, not "As a / I want / So that" | Can't validate business value or user context |
| **No acceptance criteria in description** | TICKET-ID: AC written in a developer *comment* during QA phase | "Done" is subjective; disputes at delivery |
| **Spec lives in Word attachments** | Every task has a `.docx` — the real spec is not in ticket system | ticket system and spec can drift; AC not visible without opening file |
| **Scope discovered during development** | TICKET-ID: vigencia, límites, devoluciones — all clarified via comments after assignment. TICKET-ID: 13 scope-clarification comments | IT builds while requirements change |
| **Epic masquerading as story** | TICKET-ID: 72 subtasks, multiple functional areas, SOX-level regulatory scope | Impossible to estimate, track, or close independently |
| **Inconsistent subtask naming** | Same project uses `[FE]`, `FE -`, `BE \|`, `BE` and no prefix | Unclear ownership; hard to filter by layer |
| **Automation reporter** | "Automation for ticket system" is reporter on all 5 tasks | No human accountable for description quality |
| **QA incidents as defects of poor AC** | TICKET-ID: 8+ "Incidencia en pruebas" subtasks | Every QA incident is a scope gap that AC would have prevented |

---

## Issue Type Reference

```
Epic
└── Historia de usuario (Story)
    ├── Subtarea (technical execution)
    ├── Estimación QA (QA estimate — dedicated subtask type)
    └── Incidencia en pruebas (QA bug — created during testing)
```

| Type | When to use | Size | Who creates |
|------|-------------|------|-------------|
| **Epic** | A goal requiring 5+ stories or multiple sprints | Roadmap-level | Commercial Director / PO |
| **Historia de usuario** | A deliverable unit of value completable in 1 sprint | Sprint-level | Commercial / PO |
| **Subtarea** | A technical execution task inside a story | Hours to days | Tech Lead / Developer |
| **Estimación QA** | QA effort estimation for the parent story | Fixed subtype | QA Lead |
| **Incidencia en pruebas** | Bug found during QA — linked to parent story | Fix scope | QA Tester |

**Rule**: If a story requires more than 8 subtasks OR spans multiple functional areas, it is an Epic. Decompose it.

---

## Story Title Format

**Standard:**
```
As a [specific user type], I want to [action] so that [business benefit]
```

**Platform prefix (when the story is platform-specific):**
```
[Web] As a Distributor, I want to filter the order monitor by status so that I can identify retained orders quickly
[Mobile] As an Associate, I want to see my VIP/GOLD label in the order capture so that I know my classification at a glance
```

| Violates | Satisfies |
|---------|-----------|
| `Ajustes Monitoreo` | `As a Staff user, I want to see the order status hierarchy in Monitoring so that I can identify the real state of any distribution network at a glance` |
| `Incluir etiqueta de tipo de AS en la captura de pedido` | `As a Distributor, I want to see the AS classification tag (VIP/GOLD) in the order capture screen so that I know the associate's profile before completing the order` |
| `Última Llamada condicionada a un monto de pedido` | `As an Associate, I want to add Last Call products only after reaching the minimum order amount so that the promotion is activated only when the purchase threshold is met` |
| `Modalidad de Regalos en B+` | `[Epic] As the B+ platform, I want to automatically assign promotional gift SKUs when an order meets purchase volume rules so that the promotion is applied without manual intervention` |

---

## Story Description Template

Copy this template into every new Historia de usuario:

```markdown
**Context**: [1-2 sentences explaining why this story matters now and who it benefits]

**Acceptance Criteria**:

  Given [starting state — what is true before the action]
  When [the user takes a specific action]
  Then [the system does something observable and verifiable]

  Given [alternative starting state]
  When [user action]
  Then [expected result]

  Given [error condition or edge case]
  When [user action]
  Then [error handling behavior — what the system shows/does]

**Out of scope**: [What this story does NOT cover — explicit and specific]

**Dependencies**: [Other stories, APIs, or systems that must exist first — ideally none]

**Definition of Ready**:
- [ ] INVEST validated (I, N, V, E, S, T)
- [ ] Acceptance criteria complete (at least 2 scenarios, 1 negative)
- [ ] IT confirmed estimable
- [ ] Figma/design referenced (if UI change)
- [ ] API contract referenced (if BE change)

**Definition of Done**: All acceptance criteria pass in QA environment. Reviewed and signed off by [PO name].
```

---

## Before / After: Real Task Examples

### TICKET-ID — AS Tag in Order Capture

**Current description (actual):**
> Se requiere que las etiquetas de AS VIP y PLUS, sean agregadas a la vista de captura de pedido electrónico, considerando versión Asociados y Distribuidores.

**Improved:**
```
Title: As a Distributor, I want to see the AS classification tag (VIP/GOLD/BASE) in the order capture screen so that I know the associate's profile before completing the electronic order

Context: The VIP/GOLD tags already exist in the Altas, Monitoring, Performance, and Electronic Order sections. This story adds them to the order capture flow, which currently shows no classification.

Acceptance Criteria:

  Given a Distributor is in the order capture screen
  When an Associate is selected from the list
  Then the classification tag (AssociateVIPTag / AssociatePlusTag) is shown in the associate card using the same visual format as other sections

  Given a Distributor is in the order capture screen
  When an Associate with BASE classification (isAssociateClasificationId = 1) is selected
  Then no tag is shown (BASE = no tag)

  Given a Distributor is in the order capture screen using the auto-selection flow (authenticated user IS the associate)
  When the associate is auto-selected
  Then the classification tag from the /profile/{userid} fallback endpoint is used

Out of scope: Changing the tag visual design. Showing tags in sections other than order capture. Admin classification changes.

Dependencies: Backend must expose isAssociateClasificationId in the /profile/GetAllAssociates endpoint (confirmed in TICKET-ID).
```

---

### TICKET-ID — Monitoring Adjustments

**Current description (actual):**
> Mejorar la visibilidad y entendimiento de la información en la sección de monitoreo mediante:
> - Separación clara de venta (facturada vs no facturada)
> - Mejora en interpretación de estatus
> Alineación de métricas para Distribuidores y Staff Comercial
> ^Formato Monitoreo - VF3.docx

**Problem**: Spec is in the Word attachment. AC were written in a developer comment during QA. The description is 3 bullets.

**Improved:**
```
Title: As a Staff user, I want the Monitoring module to show the correct order status hierarchy and full amounts in the detail view so that I can see the real distribution of statuses and amounts including retained, cancelled, and unfulfilled orders

Context: Currently the Monitoring module shows inconsistent status logic and sums across the header and detail sections. This story defines a clear status hierarchy and ensures detail views show all-status totals while headers keep the clean sum.

Acceptance Criteria:

  Given any user is viewing the Monitoring header (all modules except Staff)
  When the orders are loaded
  Then the displayed status follows this hierarchy: Facturado > Recibido > Retenido > No surtido > Cancelado > Procesando (first applicable status wins)
  And the header amount excludes Cancelado, Retenido, and No surtido statuses

  Given any user is viewing the Monitoring detail (all modules)
  When the order detail is loaded
  Then the amount shown includes ALL statuses (including Cancelado, Retenido, No surtido)
  And a difference between header and detail amounts is expected and correct

  Given a Staff user is viewing their module
  When the detail is loaded
  Then the amount includes all statuses (same rule as other modules)

Out of scope: Modifying the header sum logic. Adding new columns beyond what is defined in Formato Monitoreo VF3.docx. Changes to the Admin panel.

Dependencies: BE status hierarchy function (TICKET-ID), BE staff detail adjustment (TICKET-ID).
```

---

### TICKET-ID — Promotional Gifts (Epic diagnosis)

**This story should be an Epic.** It has 7 subtasks spanning Cart, BE calculation, BE storage, BE configuration, BE orders, FE visualization, and Returns. It cannot be completed in one sprint.

**Correct structure:**

```
EPIC: Modalidad de Regalos Promocionales en B+
├── Story 1: As a cart user, I want the system to automatically add a gift SKU when I add the minimum required products from the eligible list so that the gift is applied without manual action
├── Story 2: As a platform admin, I want promotional gift rules stored and managed in the database so that the promotion can be activated without code deploys
├── Story 3: As a user viewing the order, I want to see the promotional gift as a separate line item (not affecting subtotal) so that I can see what I received as a gift
└── Story 4 (future): As a returns processor, I want the system to correctly handle returns that include promotional gifts so that gift SKUs are removed when the qualifying purchase is reversed
```

---

## Subtask Naming Convention

**Format:**
```
[LAYER] [PLATFORM] - Description of the work
```

| Layer prefix | When to use |
|-------------|-------------|
| `FE` | Frontend — applies to both platforms unless specified |
| `FE Web` | Frontend web only |
| `FE Móvil` | Frontend mobile only |
| `BE` | Backend — microservice, API, database |
| `QA` | Quality assurance (use only for Estimación QA subtask type) |

**Examples — good:**
```
FE Web - Render AS classification tag in associate card (order capture)
FE Móvil - Render AS classification tag in associate card (order capture)
BE - Add isAssociateClasificationId to GetAllAssociates endpoint
```

**Examples — bad (real cases):**
```
BE                                    → No description (TICKET-ID)
BE | Ajuste detale promotor y header  → Typo + inconsistent separator
[FE] -  Hook  Permissions refactor    → Double space, inconsistent brackets
Estimacion QA                         → Missing accent (minor, but inconsistent)
```

**Rule**: Every subtask must answer: *who does the work* (layer) + *on what platform* (if platform-specific) + *what specifically* (clear action).

---

## Epic Structure Template

```markdown
**Epic title**: [Verb + Feature + Business outcome]

**Business driver**: [Why now? What metric does this improve?]

**Affected users**: [Who uses this? What is their pain point?]

**Success definition**: [Measurable — how do we know this epic succeeded?]

**Out of scope**: [What are we explicitly NOT building in this epic?]

**Stories in this epic** (must be linked in ticket system):
- Story 1: [title]
- Story 2: [title]
- Story 3: [title]

**Definition of Done (Epic)**: All child stories are Done. Business stakeholder sign-off received.
```

---

## Definition of Ready — Enforcement

A **Historia de usuario** may not be assigned to IT or have subtasks created until:

```
[ ] Title follows "As a [user], I want [action] so that [benefit]" format
[ ] Context field explains why this matters now
[ ] At least 2 Given/When/Then acceptance criteria are in the description (not in a Word doc, not in a comment)
[ ] At least 1 error/edge case scenario is covered in the acceptance criteria
[ ] Out of scope is explicitly stated
[ ] INVEST validated:
    [ ] I — Can this be built without waiting for another story?
    [ ] N — Does it say WHAT and WHY, not HOW?
    [ ] V — Is the business value explicit?
    [ ] E — Can IT estimate it?
    [ ] S — Completable in one sprint?
    [ ] T — Do the AC define "done" without ambiguity?
[ ] IT Tech Lead confirmed: "This story is estimable as written"
```

**If any checkbox is unchecked → Commercial must update before IT sees the story.**

---

## Definition of Done — Story

A **Historia de usuario** is Done when:

```
[ ] All Given/When/Then acceptance criteria pass in QA environment
[ ] No open Incidencia en pruebas subtasks on this story
[ ] PO has reviewed in QA environment (not just confirmed via comment)
[ ] PO written sign-off: "Validated against acceptance criteria on [date]"
[ ] Release notes written (or confirmed not needed for this story)
```

---

## Attachment Policy

| Attachment type | Allowed | Rule |
|----------------|---------|------|
| **Figma design links** | Yes | Paste URL in description, not as attachment |
| **Word spec documents** | Transition only | During transition period: attach AND copy key AC into description. Target: AC in ticket system, not in Word |
| **API contract documents** | Yes | Link to external docs page (like TICKET-ID did: Contrato API link in comment) |
| **Screenshots (design reference)** | Yes | Attach to description or comment |
| **Videos (happy path demos)** | Yes | Attach to story — useful for QA reference |
| **Sign-off documents** | Yes | FormatoLiberacion_TICKET-ID.xlsx is the release sign-off format — keep this |
| **Email chains** | No | Summarize the decision in a comment instead |

---

## Common Mistakes — Real Examples

| Mistake | Real example | Fix |
|---------|-------------|-----|
| Story title is a feature label | `Ajustes Monitoreo` | Write the user, action, and benefit |
| AC written during QA, not before | TICKET-ID: AC in comment by developer on April 2 | AC must be in description before IT estimates |
| Spec in Word, not in ticket system | All 5 tasks have `.docx` attachments as primary spec | Copy AC into ticket system description; Word doc becomes secondary reference |
| 72-subtask story | TICKET-ID | If >8 subtasks expected, create an Epic first, then stories |
| Scope negotiated via comments | TICKET-ID: vigencia, límites, devoluciones via comments after assignment | These are missing AC scenarios — write them first |
| Subtask named "BE" | TICKET-ID | Name it: `BE - [what specifically]` |
| Missing negative scenarios | Most tasks | Add at least 1 Given [error condition] per story |

---

## Claude Prompts for Story Creation

**From a Commercial brief to INVEST story:**
```
Write a ticket system user story in INVEST format for the following business need at the organization:

[Paste the brief or Word document description here]

Requirements:
- Title: "As a [specific the organization user type — Distributor, Associate, Staff, Admin], I want [action] so that [business benefit]"
- DO NOT prescribe the technical implementation
- Write 3-4 Given/When/Then acceptance criteria
- Include at least 1 error or edge case scenario
- Define what is explicitly out of scope
- Flag any dependencies that would break the Independent criterion
- If this looks like an Epic (multiple functional areas or >1 sprint), say so and propose how to split it

Audience: IT development team at the organization. Platform: [Web / Mobile / Both].
```

**Evaluate an existing story:**
```
Evaluate this ticket system story from the ticket project against INVEST criteria:

[Paste story title + description]

For each criterion (I, N, V, E, S, T):
1. Does this story satisfy it? Yes / Partially / No
2. Why?
3. What specific change would fix the gap?

Also identify: Are any acceptance criteria missing? What edge cases are not covered?
```

**Detect if a story is actually an Epic:**
```
Review this ticket system story. Based on its description and subtask list, determine:
1. Is this a Story or an Epic? Justify.
2. If it's an Epic, propose how to split it into 3-5 independent, estimable stories
3. For each proposed story, write a title in "As a / I want / So that" format

Story: [title + description]
Current subtasks: [list]
```

---

## See Also

- `methodology/invest.md` — INVEST framework full reference with examples
- `commercial/po-methodology.md` — 3-phase PO workflow (Discover → Specify → Prioritize)
- `methodology/sdd-admin.md` — Spec Driven Development for non-technical teams
- `commercial/user-story-template.md` — Copy-paste story + acceptance criteria template
