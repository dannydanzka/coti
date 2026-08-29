# SCI.2 — SRD Application

> **Parent**: [SCI.md](../SCI.md) — Sovereign Commercial Intake
> **Method reference**: [admin/methodology/srd.md](../srd.md)
> **Output**: Completed SRD 6-phase worksheet

---

## Purpose

Apply the 6-phase Sovereign Requirement Design to the captured need. SRD is the discipline that separates underspecified wishes from estimable stories.

---

## The 6 Phases (summary — full detail in `methodology/srd.md`)

### 1. REFRAME
Reframe the solution-phrased request into a problem statement. Done in `need-capture.md` (step 4), verified here.

### 2. INTENT
Define the business intent in a single sentence: *"So that `<role>` can `<outcome>` measured by `<metric>`"*.

### 3. QUESTION
Ask blind-spot questions. What does the PO not know yet?
- Edge cases: what happens when X is empty, too many, invalid, concurrent?
- User roles: who else interacts with this? Admin, support, auditor?
- Data: where does it come from? How current? Source of truth?
- Regulatory: SOX, GDPR, industry rules?
- Non-happy paths: what breaks this? What does "bad" look like?

### 4. DOMAIN
Research the business domain. Read relevant internal docs, interview a domain expert, check if similar features exist elsewhere.

### 5. SPEC
Write acceptance criteria in Given/When/Then. At minimum:
- 1 happy-path scenario
- 1 error scenario
- 1 boundary scenario

### 6. HANDOFF
Confirm the spec is reviewable. Can a developer estimate it without asking you clarifying questions? If yes → ready for story writing.

---

## Claude Prompt Template (Spanish, for Commercial)

```
Aplica el proceso SRD para este requerimiento de negocio:
[pega el framing de need-capture.md]

Guíame por las 6 fases en orden:
1. REFRAME — reformula el problema real (no la solución propuesta)
2. INTENT — una frase: "para que <rol> pueda <resultado> medido por <métrica>"
3. QUESTION — enumera los puntos ciegos (edge cases, roles, datos, regulatorio)
4. DOMAIN — qué necesito investigar antes de escribir
5. SPEC — acceptance criteria en Given/When/Then (feliz, error, frontera)
6. HANDOFF — lista qué falta para que IT pueda estimar sin preguntar
```

---

## Exit Criteria

- [ ] Reframe validated from need-capture
- [ ] Intent in a single sentence with role + outcome + metric
- [ ] At least 5 blind-spot questions asked and answered
- [ ] Domain research complete (docs consulted, expert interviewed if needed)
- [ ] 3+ Given/When/Then scenarios drafted (happy + error + boundary)
- [ ] Handoff self-review — could a developer estimate this?

**Next**: [story-writing.md](story-writing.md) — Write the INVEST-compliant story
