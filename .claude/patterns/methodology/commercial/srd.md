# SOP: Sovereign Requirement Design (SRD)

> **PURPOSE**: Transform organizational ambiguity (a business need, a complaint, a directive) into a formal requirement artifact that IT can estimate and build — not interpret
> **SCOPE**: Any administrative or Commercial team that feeds requirements to a development team
> **AUDIENCE**: Commercial (PO), Marketing, Operations — non-technical requirement writers
> **COMPANION**: `core/sops/sovereign-context-design.md` (SCD) — IT's equivalent for code design
> **UPDATED**: 2026-04-06

---

## What This SOP Is

SRD is the discipline of **requirement clarity before story writing**. It separates business need discovery from requirement formalization.

Before a single acceptance criterion is written, SRD absorbs organizational ambiguity and transforms it into a formal requirement artifact. This SOP covers everything BEFORE IT sees the story. For what happens after handoff, see `core/sops/sovereign-context-design.md`.

> *"La calidad, el costo y la velocidad del desarrollo se definen ANTES de que IT vea el requerimiento."*
> The quality, cost, and velocity of development are defined BEFORE IT sees the requirement.

**This is the Commercial equivalent of what developers do with SCD.** The problem is the same — it just appears at a different layer:

```
Without SRD:  Business pain → vague story → IT estimates a black box → scope creep → wrong product
With SRD:     Business pain → [Commercial thinks] → INVEST story → IT estimates confidently → right product
```

---

## The Three-Layer Development Chain

SRD, SCD, and SCG form a complete chain. Each SOP hands off a formal artifact to the next:

```
COMMERCIAL (SRD)               IT/DEV (SCD)                 IT/DEV (SCG)
────────────────               ────────────                 ────────────
Phase 1: REFRAME
Phase 2: INTENT
Phase 3: QUESTION
Phase 4: DOMAIN (business)
Phase 5: SPEC
Phase 6: HANDOFF            →  Phase 1-6: SCD           →  Phase 7-9: SCG
                               (technical investigation)    (code execution)

Output: INVEST story           Output: implementation plan  Output: shipped feature
        (ticket system)                         (business doc + plan)
```

**The handoff protocol**: SRD ends when IT confirms "This story is estimable as written." SCD begins with that story as its input.

---

## The Other Methodologies (When to Use What)

INVEST defines the quality criteria for a story. Three other methods help discover what to write:

| Method | What it does | Where it fits in SRD |
|--------|-------------|---------------------|
| **JTBD** (Jobs To Be Done) | Identifies the real job the user needs done — not the feature they asked for | Phase 1: REFRAME |
| **Example Mapping** | Structured 25-min conversation that discovers Given/When/Then before formalizing | Phase 3: QUESTION |
| **Impact Mapping** | Connects features to business goals (Why → Who → How → What) | Phase 2: INTENT |
| **Story Mapping** | Maps the user journey backbone, then slices by priority | Phase 4: DOMAIN |
| **INVEST** | Validates the story is ready for IT to estimate | Phase 5: SPEC |
| **MoSCoW** | Prioritizes which stories go first | Post-SRD: backlog ordering |

---

## SRD Checklist — All Must Pass Before Handing to IT

- [ ] Real business problem identified — not the symptom (Phase 1)
- [ ] User type confirmed: DS / AS / Staff / all (Phase 2)
- [ ] Business outcome defined: what changes if this is built? (Phase 2)
- [ ] Edge cases and empty states documented (Phase 3)
- [ ] Error scenarios documented (at least 1) (Phase 3)
- [ ] Existing platform behavior understood (Phase 4)
- [ ] Regulatory/compliance constraints checked (Phase 4)
- [ ] Story title in "As a [user], I want [action] so that [benefit]" format (Phase 5)
- [ ] Minimum 2 Given/When/Then criteria in ticket system description (Phase 5)
- [ ] At least 1 error/edge case scenario in AC (Phase 5)
- [ ] Out of scope stated explicitly (Phase 5)
- [ ] INVEST quick-check passed (Phase 5)
- [ ] IT confirmed: "Estimable as written" (Phase 6)
- [ ] No spec in Word doc — all context in ticket system description (Phase 6)

---

## Phase 1 — REFRAME

> *"Suspend the stated request and analyze the real business problem."*

Most requirements arrive as solutions, not problems. Reframe before writing anything.

### The JTBD lens (Jobs To Be Done)

Instead of: "The user wants to see their sales history"
Ask: "**When** a Distribuidora is [situation], she **wants** to [motivation], so she can [expected outcome]"

Example reframe:
- **Stated**: "Mejorar la pantalla de captura de pedido"
- **JTBD**: "When a Distribuidora is capturing an order for a VIP associate, she wants to quickly confirm the associate's classification, so she doesn't apply the wrong pricing tier"
- **Real problem**: The classification tag is missing — that's what needs building, not a full screen redesign

### Reframe questions

| Question | What it prevents |
|----------|-----------------|
| Is this the symptom or the root cause? | Building the wrong feature |
| Who actually reported this need? (user feedback / metric / leadership) | Misattributing priority |
| Does this behavior already exist somewhere in the platform? | Requesting a duplicate feature |
| Is the scope what the title suggests, or broader/narrower? | Scope drift during development |
| What metric will improve if this is built? | Untestable business value claims |

**Output**: A one-sentence real problem statement. If you cannot write it in one sentence, the problem is not clear enough to proceed.

---

## Phase 2 — INTENT (Documented Intention)

**Objective**: Define success from the user's perspective and the business's perspective — before considering implementation.

### 2.1 Identify affected user types

| User type | Description |
|-----------|-------------|
| Distribuidora (DS) | Direct seller — manages Asociadas, captures orders |
| Asociada (AS) | End customer of the DS network |
| Staff | Internal the organization operations team |

Answer: Who is the primary user of this story? Who is secondary? Does the behavior differ per role?

### 2.2 Define the business outcome (Impact Mapping)

Impact Mapping: **Why → Who → How → What**

```
WHY:  Business goal this serves (revenue, retention, activation rate, compliance)
WHO:  Actor whose behavior changes (DS, AS, Staff)
HOW:  What behavior change enables the goal
WHAT: The minimal deliverable that enables the behavior change
```

If you cannot fill in WHY, the story should not be prioritized — it has no confirmed business value.

### 2.3 Document current vs desired state

```
Current state:  [What happens today — describe the actual user experience]
Pain:           [Why the current state is a problem — specific, not "is bad"]
Desired state:  [What happens after — observable by the user]
Success signal: [How will we know it's working — what changes in behavior or metrics]
```

---

## Phase 3 — QUESTION (Proactive Interrogation)

> *"The questions Commercial doesn't ask are the ones that produce scope changes during QA."*

This phase is the Commercial equivalent of SCD's Phase 3. **These are the questions that never appear in a story but always appear as surprises during QA.**

### Example Mapping — discover AC before writing it

Before writing Given/When/Then, run a structured Example Mapping session:

1. **Write the story title** on an index card
2. **Identify rules**: What business rules govern this behavior? (yellow cards)
3. **For each rule, find examples**: Give a specific concrete example (green cards)
4. **Flag questions**: Anything unclear becomes a question card (red) — stop and answer before proceeding

Each green example card becomes a Given/When/Then scenario. Each red question card is a scope risk.

### Business blind spots — always ask

| Question | What it catches |
|----------|----------------|
| What happens when the user doesn't qualify for this feature? | Empty state — never in the brief |
| What happens mid-flow if the data changes? (another user edits simultaneously) | Race condition — never spec'd |
| Does this behavior differ depending on DS classification (VIP/BASE/etc.)? | Role-based behavior — often assumed |
| Does this apply to existing records or only new ones? | Retroactivity — assumed, never confirmed |
| What is the error message when it fails? (specific text, not "shows an error") | Error state — always forgotten |
| Is there a maximum limit? (max N items, max value, max length) | Validation edge case |
| What happens if the supporting service is unavailable? | Degradation behavior |
| Is this always visible, or conditional on a user state? | Guard condition |

### Resolution protocol

For each question:
1. **Can Commercial answer it from business knowledge?** → Document the answer as a business rule
2. **Needs confirmation from IT?** → Flag it — **do NOT write the AC for that scenario until answered**
3. **Needs confirmation from another business area?** → Escalate and block story progress until resolved

**An unanswered question is not a problem. An un-asked question is.**

---

## Phase 4 — DOMAIN (Business Domain Investigation)

**Objective**: Understand the existing business domain before writing the story — so the AC reflects reality, not assumptions.

### 4.1 Understand existing platform behavior

Before specifying what you want, confirm what currently exists:
- Does the platform already have a similar feature? (ask IT or search ticket system)
- How does the user currently solve this problem? (workaround → becomes a migration concern)
- What is the current business rule this replaces or extends?

### 4.2 Check cloud docs / external docs for existing documentation

Before writing a new requirement, read what's already documented:

```
# From Claude Code (commercial/ workspace)
"Busca en cloud docs documentos sobre [proceso afectado].
¿Hay reglas de negocio documentadas que deba incluir en los AC?"
```

If a module knowledge page exists in external docs (`platform-knowledge.md`), review it. Known edge cases from previous features may affect your AC.

### 4.3 Identify business constraints

| Constraint type | Examples |
|----------------|---------|
| Regulatory | SOX compliance, fiscal rules, COFEPRIS |
| Business policy | Promotions cannot stack, returns require approval |
| Technical (ask IT) | API limitation, platform constraint |
| Dependencies | Another team must deliver X before this works |

### 4.4 Story Mapping — see the whole before slicing

For large features, map the user journey before slicing into stories:

```
BACKBONE (left to right):  Step 1 → Step 2 → Step 3 → Step 4 → Step 5
                           (user activity narrative)

SLICE 1 (top row):         Core flow — minimum to be useful
SLICE 2 (second row):      Important but not blocking
SLICE 3 (third row):       Nice to have
```

Each row = one potential sprint. Each column = one user activity area. The intersection = a candidate story.

**Use this when**: the requirement has more than 4-5 user activities and it's unclear how to slice it into independent stories.

---

## Phase 5 — SPEC (Formalized Requirement)

**Objective**: Write the complete INVEST story with all AC before IT sees it — AC in the ticket system description, not in a Word doc.

### 5.1 Write the story title

Format: **"As a [user type], I want [specific action] so that [concrete benefit]"**

Checklist before proceeding:
- [ ] "As a [user type]" — identifies a specific role, not "the system" or "the user"
- [ ] "I want [specific action]" — one verb, one object. Not "improve" or "optimize"
- [ ] "so that [concrete benefit]" — measureable or observable outcome

**Rewrite if**: the title contains "improve", "optimize", "mejorar", "allow users to", or describes a UI element instead of a user goal.

### 5.2 Write acceptance criteria (Given/When/Then)

Minimum required:
- **2 happy path scenarios** (normal flow)
- **1 error / edge case scenario** (what fails or is absent)
- **1 empty state scenario** (when there's no data to show)

Format:
```
Given [a specific, confirmed state of the system or user]
When  [a specific user action or system event]
Then  [a specific, observable result — what the user sees or can do]
```

Rules:
- Each Given/When/Then maps to ONE Playwright test scenario (see `core/sops/playwright-bdd.md`)
- "Then" must be observable by a person — not an internal system state
- No "And" in the middle — split into a separate scenario if needed
- Error "Then" must include the exact error message or behavior — not "shows an error"

### 5.3 Define out of scope explicitly

```
Out of scope for this story:
- [Exclusion 1 — what you are NOT building]
- [Exclusion 2]
- [Future consideration — what goes in a separate story later]
```

This is as important as the AC. Without it, "it wasn't what we wanted" happens at delivery.

### 5.4 INVEST quick-check

| Criterion | Question | Pass condition |
|-----------|----------|---------------|
| **Independent** | Can this be developed without waiting for another story? | Yes — or the dependency is documented |
| **Negotiable** | Can IT propose a different technical approach? | Yes — AC defines outcome, not implementation |
| **Valuable** | Does the "so that" have a real business outcome? | Yes — not "clean up the screen" |
| **Estimable** | Can IT give a point estimate right now? | Yes — or ask IT and revise until yes |
| **Small** | Can this be delivered in one sprint (≤2 weeks)? | Yes — or split it |
| **Testable** | Can QA validate each AC in the QA environment? | Yes — or rewrite the vague AC |

**If any criterion is Partial or Fail**: revise the story before proceeding. Do not hand to IT until all pass.

---

## Phase 6 — HANDOFF (Definition of Ready Confirmed)

**Objective**: IT confirms the story is estimable, Commercial confirms the AC is correct. No scope negotiation after handoff.

### 6.1 Pre-handoff checklist

Before assigning the story to IT:

- [ ] Story title in "As a [user], I want [action] so that [benefit]" format
- [ ] All AC in ticket system description — no "see attached Word doc"
- [ ] At least 1 error scenario in AC
- [ ] Out of scope stated explicitly
- [ ] INVEST quick-check: all Pass
- [ ] Open questions from Phase 3 answered
- [ ] Design reference linked (Figma URL) if UI is involved
- [ ] Business constraints from Phase 4 documented in story

### 6.2 IT confirmation protocol

After assigning the story, IT confirms:

```
"This story is estimable as written."
```

If IT responds with questions: go back to Phase 3 or 5 and answer them — update the ticket system description, not the comments. The description is the spec; the comments are historical.

If IT cannot estimate: the story has a scoping problem. Apply Example Mapping (Phase 3) together in a brief sync.

### 6.3 The spec lock

After IT confirms estimability:
- AC are **locked** — no changes without a new story or explicit re-estimation
- "It wasn't what we wanted" at QA = a failure of SRD Phase 5, not a failure of IT
- New scope = new story (with new estimate) — not an amendment to the current story

> *"A spec that changes during development is not a spec — it's a conversation. SRD ensures the conversation happens before the sprint, not during it."*

### 6.4 Create ticket system story (Claude Code, Workflow #8)

After INVEST validation and IT confirmation:

```
Crea esta historia en ticket system, proyecto PLUS, tipo "Historia de usuario":

[Pegar la historia completa con AC y fuera de alcance]
```

Claude Code creates it directly via ticket system MCP.

---

## Outputs

| Artifact | Location | Purpose |
|---------|----------|---------|
| **INVEST story** | ticket system — story description | Single source of truth for the feature |
| **Business context notes** (optional) | ticket system comment or cloud docs | JTBD analysis, domain research, open Q&A history |
| **Story Map** (for large features) | external docs or cloud docs | Visual planning artifact — not required for every story |

**Why ticket system, not Word docs**: The story must live where IT works. If it lives in a Word doc, IT creates a parallel interpretation in their heads. The ticket system description IS the spec.

---

## Lessons Learned (from real task analysis)

These are patterns observed from analyzing TICKET-ID, 9836, 9483, 7507, 8257:

- **Spec in Word doc = scope creep guaranteed.** TICKET-ID and TICKET-ID had specs in attachments. Acceptance criteria were negotiated during QA.
- **AC written in comments = not a spec.** TICKET-ID had business rules discovered and documented in comments, not in the description. This creates ambiguity about what's authoritative.
- **72 subtasks = someone skipped Phase 1.** TICKET-ID was an Epic treated as a Story. REFRAME would have caught this.
- **QA incidents after delivery = missing Phase 3.** TICKET-ID generated 8 QA incident subtasks. Each one was a question not asked in Phase 3.
- **"Mejorar la experiencia" is not a story.** Every vague story found in analysis could be traced to a missing REFRAME + INTENT phase.

---

## SRD vs SCD — The Mirror

| | SRD (Commercial) | SCD (IT) |
|--|-----------------|---------|
| **Starts from** | Business pain / complaint / directive | INVEST story from Commercial |
| **Phase 1** | Is this the real business problem? | Is this the correct technical domain? |
| **Phase 2** | What outcome for which user? | What does the ticket actually say? |
| **Phase 3** | What business edge cases nobody asked? | What technical blind spots nobody considered? |
| **Phase 4** | What business domain / existing rules? | What code territory needs investigation? |
| **Phase 5** | INVEST story + Given/When/Then | Technical AC + guard contract |
| **Phase 6** | IT confirms estimability | Developer validates AI conclusions |
| **Output** | ticket system story (business language) | Implementation plan (technical language) |
| **Anti-pattern** | "It wasn't what we wanted" at delivery | "The ticket wasn't clear" at planning |

**Same discipline, different layer. The quality of the code is bounded by the quality of the requirement.**

---

## See Also

- `admin/methodology/invest.md` — INVEST framework full reference
- `admin/methodology/sdd-admin.md` — Spec Driven Development: why AC goes in ticket system description
- `admin/commercial/user-story-template.md` — Story templates + INVEST quick-check
- `admin/commercial/ticket-issue-standards.md` — ticket system standards with real examples
- `core/sops/sovereign-context-design.md` — SCD: IT's equivalent (what happens after handoff)
- `core/sops/feature-delivery-workflow.md` — Full lifecycle: SRD → SCD → code → QA sign-off
