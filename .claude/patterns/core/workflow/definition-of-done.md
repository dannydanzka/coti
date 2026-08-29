# Definition of Done

> **Module**: core/workflow · **Layer**: L1 (agnostic)
> **Scope**: the single gate every task passes before the word "done" is used
> **Origin**: rescued 2026-08-22 from the retired `behavior-sov` skill (part N)

---

> **A task is done when it is verified done — not when the last edit was saved.**

## The checklist

Every box is checked explicitly, never assumed:

```
[ ] The quality gate is green, and reported VERBATIM — "TS: 0 / ESLint: 0 / Tests: N passed"
[ ] No dead code, no debug logging, no commented-out blocks left behind
[ ] No secret in the diff, the logs or the output
[ ] Names carry no business leakage (core/quality/naming.md)
[ ] The root cause is fixed, not palliated; any exception is in the B3 format
    (core/workflow/authorization-boundary.md §4)
[ ] Project state updated where the task changed it (.claude/status/)
[ ] Reported truthfully: what was done vs attempted, blockers named
```

**A task that fails a box is not done — it is in progress with an undeclared blocker.** Say which box
failed and why. Never round "almost" up to "done".

## Verified, not asserted

*"Should work"*, *"looks correct"*, *"this fixes it"* are hypotheses. Done requires a tool to confirm it:
the test ran green, the file reads as expected, the exit code was 0. If the confirmation did not happen,
the honest status is **"implemented, unverified"** — which is a perfectly acceptable thing to report and
a fireable thing to hide.

## Why "verbatim" is in the checklist

A summarized gate is an unverifiable gate. *"Tests pass"* hides how many ran; *"only warnings"* hides that
the warning count is not zero. Quoting the numbers costs one line and removes the only place this rule
can be quietly bent.
