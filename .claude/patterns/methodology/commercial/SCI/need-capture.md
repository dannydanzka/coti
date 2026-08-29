# SCI.1 — Need Capture

> **Parent**: [SCI.md](../SCI.md) — Sovereign Commercial Intake
> **Output**: Problem framing doc with stakeholder, intent, success metric

---

## Purpose

Receive the raw business need and separate the **problem** from the **proposed solution**. Most intake requests arrive phrased as solutions ("we need a button that does X"). The PO's job is to extract the underlying problem before letting it progress.

---

## Inputs

- Stakeholder request (email, meeting notes, Slack, verbal)
- Relevant metric, incident, or market signal
- Stakeholder identity and authority level

---

## Procedure

### Step 1: Capture the raw request verbatim

Copy the request as received. Do not paraphrase yet.

### Step 2: Identify the stakeholder

- Who requested this?
- What is their role and authority?
- Who else needs to agree?

### Step 3: Extract the proposed solution

Most requests hide the solution in the wording. Mark it:

> *"I want a button that exports to Excel"* → **Proposed solution**: Excel export button.

### Step 4: Ask "What does this enable?" until you hit intent

Keep asking until you reach a **business outcome**, not an action.

> Excel export → to analyze data offline → to build weekly report → **to decide which SKUs to discontinue**.

The last answer is the real problem.

### Step 5: Define the success metric

- How will we know this worked?
- What number changes? By how much? By when?

### Step 6: Record the framing

Save as `business/NEED-<identifier>.md` (or equivalent location) with:

- Stakeholder
- Raw request (verbatim)
- Proposed solution (as-received)
- Underlying problem (reframed)
- Business intent (outcome)
- Success metric (quantifiable)
- Constraints (regulatory, deadline, budget)

### Step 7: Read the framing back to the stakeholder

Send the reframing back **before** anything is estimated, scheduled, or quoted. Two parts, both
required:

1. **The scope, as N numbered points.** Each point is one deliverable, stated in the stakeholder's own
   business language. Numbering matters — it gives them something to correct by number instead of
   re-explaining from scratch.
2. **The open questions, named explicitly.** Every assumption you would otherwise make silently
   becomes a question. Ask them as questions, not as caveats buried in prose.

Close with a direct confirmation request: *"Is this what you are asking for?"*

Steps 1–6 produce your understanding; only the read-back proves it matches theirs. It also converts
silence into a decision — an unanswered numbered question is visibly unanswered, and it is now their
turn. Assumptions buried in a proposal never come back; numbered questions do.

> A request that cannot be read back in a handful of numbered points has not been understood yet.
> Return to Step 4.

---

## Exit Criteria

- [ ] Raw request captured verbatim
- [ ] Stakeholder and authority identified
- [ ] Proposed solution extracted and set aside
- [ ] Real problem articulated (not restatement of solution)
- [ ] Business intent reaches an outcome, not an action
- [ ] Success metric is measurable
- [ ] Framing doc saved
- [ ] Framing read back to the stakeholder as numbered scope + named open questions
- [ ] Stakeholder confirmed, or corrected by point

**Next**: [srd-application.md](srd-application.md) — Apply SRD 6 phases
