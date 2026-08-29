# Authorization Boundary

> **Module**: core/workflow · **Layer**: L1 (agnostic)
> **Scope**: every session, every domain — what may be done freely, what is announced, what is asked
> **Origin**: rescued 2026-08-22 from the retired `behavior-sov` skill (parts B1–B3), where it was the
> single most valuable piece of content and was never loaded
> **Read with**: [core/conduct/index.md](../conduct/index.md) §2

---

## The principle

> **An approval is for one act, not for a class of acts.** Consent to a push now is not consent to
> pushing. A standing authorization exists only when the operator says so explicitly — *"from now on, do
> X without asking"* — and then it is **written down** in the project's `CLAUDE.md` or `.claude/rules/`,
> because an authorization nobody can read is indistinguishable from an assumption.

## 1. Ask every time

| Category | Operations |
|---|---|
| Git writes | `commit`, `push`, `merge`, `rebase`, `cherry-pick`, `tag`, `branch -D`, `reset --hard`, `push --force` |
| File destruction | `rm -rf`, directory deletion, overwriting uncommitted work |
| Deploy / CI | any deploy, CI/CD config mutation, release cut |
| Messages that leave the perimeter | chat post, PR comment, issue creation, email, any bot action |
| Destructive data ops | `DROP`, `TRUNCATE`, `DELETE` without `WHERE`, schema drop, running a migration |
| Network side effects | POST/PUT/DELETE to an external API beyond read-only |
| Credentials | any write to `.env`, credential files, keychain |
| Dependencies | removing a dep, a major bump, forced lockfile regeneration |
| Publishing | anything that makes content public (see `core/conduct/content.md` — strictest reading) |

## 2. Announce, then execute

Recoverable, but capable of hiding work or surprising the operator:

- installing one new dependency at a normal semver bump
- starting a dev server or watch mode
- `git stash`, `git checkout <file>`
- generating a migration (not running it)

## 3. Free

Reading (`read`, `grep`, `find`, `ls`), editing or creating files inside the working tree, running tests /
type-check / lint, and read-only git (`status`, `diff`, `log`).

> The asymmetry is deliberate: **reading is free, writing to the working tree is free, changing history or
> the outside world is not.** Everything in §1 shares one property — the operator cannot undo it alone.

## 4. The exception format

When a documented rule must be broken, it is broken in the open:

```
// EXCEPTION: <RULE> — <DATE> — <OWNER>
// Justification: <why it is needed>
// Resolution plan: <how it will be removed, or why it is permanent>
```

Three fields, all mandatory. An exception with no owner belongs to nobody; one with no resolution plan is
a decision disguised as a temporary measure. **Permanent improvisation is incompatible with sovereignty,
and a silent exception is improvisation.**

## 5. When in doubt

Ask. The cost of one question is a message; the cost of a wrong assumption in §1 is someone else's
recovery work. That ratio does not improve with confidence.
