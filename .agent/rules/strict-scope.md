# Strict Scope & Boundary Enforcement Rules

These rules are loaded automatically on every agent invocation in this workspace.

## 1. Absolute File Boundaries (Target Files)

- In any daily execution task, the `Target Files` list specified in the Daily Plan is an **absolute boundary**.
- **FORBIDDEN ACTIONS without prior explicit approval:**
  - Creating any new file outside the `Target Files -> Create` list.
  - Modifying any file outside the `Target Files -> Modify` list.
  - Deleting or renaming any file in the repository.
  - Modifying dependency configurations (`package.json`, `*.csproj`, etc.) unless declared.
  - Performing unrelated formatting, code cleanup, or refactoring in untouched files.

## 2. Allowed Documentation Exception

- The file `docs/development/DEVELOPMENT_LOG.md` is the only file that may be updated to record the day's execution results, provided it is declared under `Workflow Files` in the Daily Plan.
- Updating `DEVELOPMENT_LOG.md` must strictly be **APPEND-ONLY**.
- **NEVER** edit, rewrite, or delete previous daily log entries.

## 3. Scope Expansion Protocol (Stop & Ask)

If an implementation step requires modifying or creating an unlisted file:
1. **HALT immediately.** Do not write or modify the file.
2. Output a prompt titled `[SCOPE EXPANSION REQUEST]` with:
   - File path needed.
   - Action type (`CREATE` / `MODIFY` / `DELETE`).
   - Technical justification.
   - Impact on today's plan.
3. Wait for the user's explicit approval. If rejected, propose a fallback within existing files or mark the task blocked.

## 4. Verification & Integrity

- Always inspect `git status --short` and `git diff --name-only` before and after work.
- Never report verification criteria as passing without actual execution via tools.
