# Root Cause over Palliative

> **Module**: core/workflow · **Layer**: L1 (agnostic)
> **Scope**: what to do between a symptom appearing and a fix being proposed
> **Origin**: rescued 2026-08-22 from the retired `behavior-sov` skill (part C1)
> **Doctrine**: principle #5, *Prevention over Correction* (`doctrine/principles.md`)

---

> **Investigate two levels below the symptom before proposing a fix.** A green test after a disabled rule
> is not a fix — it is debt with a receipt nobody kept.

## The protocol

```
1. Reproduce the symptom deterministically      ← if it is not reproducible, it is not diagnosed
2. Trace to the proximate cause                 ← the line that breaks
3. Trace to the root cause                      ← why that line is reachable with that state
4. Propose the fix at the root
5. If a palliative is chosen anyway, document it as an EXCEPTION with a resolution plan
   (core/workflow/authorization-boundary.md §4)
```

Step 5 is not a loophole: a palliative chosen **knowingly, with an owner and a plan** is a legitimate
engineering decision under time pressure. A palliative chosen **silently** is the failure this file exists
to prevent.

## The band-aids that compound

| Band-aid | What it hides |
|---|---|
| `try/catch` that swallows | the error still happens, now invisibly |
| Null-check patch at the call site | the value should never have been null; the producer is unfixed |
| Silent fallback / default value | the system now runs on fiction and reports success |
| Type assertion (`as`, `@ts-ignore`) | the type was already telling you the truth |
| Feature flag that never sunsets | two code paths forever, one of them untested |
| Retry around a deterministic failure | it will fail N times instead of once |

Each is cheap once and expensive as a habit: the next reader inherits a system whose failures are
invisible and whose state cannot be trusted.

## When to stop digging

Two levels is the floor, not a ceiling — but it is also not an invitation to rewrite the architecture from
a typo. Stop when the next level up would be a different owner's system, and then **report the boundary**:
*"root cause is in X, which we do not own; the local containment is Y, with this exception block."*
