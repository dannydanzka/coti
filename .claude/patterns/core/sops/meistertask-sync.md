# SOP: MeisterTask Sync

> **PURPOSE**: Give Claude Code read/write access to a MeisterTask board via its REST API, so it can pull
> tasks, work them one at a time, and write completion back — keeping the board and a local mirror 1:1.
> **SCOPE**: Agnostic procedure. The one project-specific part (token file, board/section IDs, mirror
> path) is isolated in §5 "Project binding".
> **PREREQUISITES**: A MeisterTask account; ability to create a MindMeister Personal Access Token; `curl`
> and `python3` available.
> **UPDATED**: 2026-08-29

---

## 1. Mechanism

MeisterTask exposes a REST API at `https://www.meistertask.com/api`. Claude Code calls it with `curl`
from the Bash tool — **no MCP server exists or is needed**. Auth is a Bearer token.

MeisterTask authentication is handled by **MindMeister**, so the credential is a **MindMeister Personal
Access Token**, not a MeisterTask one. It does not expire until revoked and works on every plan.

---

## 2. Procedure — one-time setup

### Step 1: Create the token

1. Log in at `https://www.mindmeister.com/api`.
2. Create a **Personal Access Token** with scopes **`meistertask · userinfo.profile · userinfo.email`**.
   The `meistertask` scope is mandatory — without it every API call returns **403**.
3. Copy the token (shown once).

**Validation**: token string is ~43 chars.

### Step 2: Store the token

Use a **dedicated env file**, not `~/.bashrc` — Ubuntu's `~/.bashrc` has a `*) return;;` guard that
exits early for non-interactive shells, so the Bash tool would never see the export.

```bash
printf 'export MEISTERTASK_TOKEN="%s"\n' '<paste-token>' > ~/.meistertask.env
chmod 600 ~/.meistertask.env
```

Every command in this SOP prefixes `source ~/.meistertask.env`. Never print the token value; never
commit the env file.

**Validation**:

```bash
source ~/.meistertask.env; T="$MEISTERTASK_TOKEN"
curl -s -o /dev/null -w '%{http_code}\n' -H "Authorization: Bearer $T" \
  "https://www.meistertask.com/api/projects"     # expect 200
```

### Step 3: Resolve board IDs

```bash
source ~/.meistertask.env; T="$MEISTERTASK_TOKEN"
curl -s -H "Authorization: Bearer $T" "https://www.meistertask.com/api/projects"
curl -s -H "Authorization: Bearer $T" "https://www.meistertask.com/api/projects/<PROJECT_ID>/sections"
```

Record the numeric project id and the section ids in §5. `/tasks` needs the **numeric** id (quirk 1).

### Step 4 (optional): Reduce permission prompts

Add the single-call read form to `.claude/settings.json` `permissions.allow`. Because writes are always
`curl -s -X PUT …` / `curl -s -X POST …`, a prefix rule on `curl -s -H "Authorization: Bearer $T"
"https://www.meistertask.com/api/` allows reads while still prompting on writes.

---

## 3. Procedure — daily use

### Read (pull the board)

```bash
source ~/.meistertask.env; T="$MEISTERTASK_TOKEN"
# per-section pull — reliable (see quirk 6). Filter out status 8 (quirk 5).
for S in <SECTION_OPEN> <SECTION_DOING> <SECTION_DONE>; do
  curl -s -H "Authorization: Bearer $T" "https://www.meistertask.com/api/sections/$S/tasks"
done
```

### Write back (complete / move / create / trash)

```bash
source ~/.meistertask.env; T="$MEISTERTASK_TOKEN"
# complete → Done column (BOTH fields, quirk 3):
curl -s -X PUT -H "Authorization: Bearer $T" -H "Content-Type: application/json" \
  -d '{"status":2,"section_id":<SECTION_DONE>}' "https://www.meistertask.com/api/tasks/<TASK_ID>"
# move:   -d '{"section_id":<SECTION_DOING>}'   reopen: -d '{"status":1}'   trash: -d '{"status":8}'
# create: curl -s -X POST … "…/sections/<SECTION_OPEN>/tasks" -d '{"name":"…","notes":"…"}'
```

> **Authorization boundary**: completing / moving / creating / trashing a task is an **outward state
> change on a real shared board**. Do it only when the task owner confirms the task is resolved, one at a
> time — **never in bulk without asking**. Reads are free.

### The work loop

1. **Pull** → refresh the mirror (§5), keeping each row's `[task_id]` for sync.
2. **Pick one task, announce it** — state which task, its context, and the inputs needed to resolve it.
3. **Resolve it** — produce the artifact, send the message, make the edit.
4. **Write back** — `PUT {"status":2,"section_id":<SECTION_DONE>}` **and** move the row in the mirror in
   the same sitting. Keep board ⇄ mirror 1:1 (same count per section).
5. Repeat. Tasks completed directly in MeisterTask also get pulled into the mirror's done list.

**Done-condition**: board and mirror agree 1:1 per section; every resolved task is completed in
MeisterTask and logged in the mirror; nothing was written back without the owner's confirmation.

---

## 4. Troubleshooting — API quirks

| Problem | Cause | Solution |
|---|---|---|
| `401 Invalid credentials` | Token var empty — `source ~/.bashrc` hit the non-interactive `return` guard | Use a dedicated `~/.meistertask.env` file (Step 2) |
| `403 Forbidden`, token valid | Token created without the `meistertask` scope | Regenerate the token with all three scopes (Step 1) |
| `404` on `/projects/:id/tasks` | Used the slug token, not the numeric id | `/projects` and `/sections` accept either; `/tasks` needs the **numeric** id |
| `DELETE /tasks/:id` → 301/405 | MeisterTask has no DELETE | Trash with `PUT {"status":8}` |
| Completed task still in old column | `PUT {"status":2}` doesn't move sections | Send **both** `{"status":2,"section_id":<SECTION_DONE>}` |
| Board pull silently missing a task | `GET /projects/:id/tasks` paginates at 50; `per_page` ignored | Read per section (`GET /sections/:id/tasks`) or walk pages until empty |
| Trashed tasks appear in a pull | `GET /sections/:id/tasks` returns `status: 8` tasks | Filter `status == 8` client-side |
| `PUT {"tracked_time": …}` ignored | `tracked_time` is a read-only aggregate | Write time via `POST /tasks/:id/work_intervals {"started_at","finished_at"}` (ISO UTC); edit via flat `PUT /work_intervals/:id` |
| No rate-limit headers | MeisterTask doesn't send them | Keep pulls reasonable anyway |

**Status codes**: `1 = open/actionable` · `2 = completed` · `8 = trashed`.
**Endpoints**: `GET /projects` · `GET /projects/:id/sections` · `GET /projects/:id/tasks[?status=completed]`
· `GET /sections/:id/tasks` · `POST /projects/:id/sections {"name"}` · `POST /sections/:id/tasks
{"name","notes"}` · `PUT /tasks/:id` · `PUT /sections/:id` (`sequence` writable, `indicator` ignored) ·
`POST /tasks/:id/task_labels {"label_id"}` · `/tasks/:id/comments` · webhooks.
**Useful task fields**: `id · token · name · notes/notes_html · status · section_id · section_name ·
project_id · sequence · assigned_to_id · assignee_name · tracked_time · due · created_at · updated_at`.

---

## 5. Project binding — Coti (workshop)

| Item | Value |
|---|---|
| Token file | `~/.meistertask.env` → `MEISTERTASK_TOKEN` |
| Project | **Coti** — numeric id `9209433` · slug token `rqcSRwyQ` |
| Section — `Open` (backlog) | `37656376` |
| Section — `In Progress` | `37656377` |
| Section — `Done` | `37656378` |
| Local mirror | `ops/board-mirror.md` |
| Resolved on | 2026-08-29 |

Re-run Step 3 if the board's sections change.

---

## 6. Checklist

- [ ] MindMeister PAT created with `meistertask · userinfo.profile · userinfo.email`
- [ ] Token in `~/.meistertask.env` (mode 600), **not** committed
- [ ] `GET /api/projects` returns `200`
- [ ] Project + section IDs recorded in §5
- [ ] `ops/board-mirror.md` reflects the current board 1:1
- [ ] Read calls allow-listed in `.claude/settings.json`; writes still prompt
