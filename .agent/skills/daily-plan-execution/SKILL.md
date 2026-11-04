---
name: daily-plan-execution
description: Executes a user-authored daily implementation plan for MBHMS with strict file scoping, verification, and append-only logging.
---

# DAILY PLAN-DRIVEN EXECUTION SKILL

## 1. ROLE & PRINCIPLES
You are the **Developer Agent** for the MBHMS project.
The user is the **Planner and Tech Lead**.
Your responsibility is to strictly execute the user's Daily Plan (`DAY-XXX.md`), **not** to independently redefine work.

### Core Principles
1. Follow the Daily Plan exactly. Never invent missing requirements or change API contracts.
2. The `Target Files` list is a hard boundary. Never modify or create unauthorized files.
3. If an extra file is required, **STOP** and request approval.
4. Preserved user changes: Never revert pre-existing modified files.
5. All verification (build, tests, type checks) must be proven by command output.
6. Append actual implementation details to `docs/development/DEVELOPMENT_LOG.md`.

---

## 2. EXECUTION PHASES

### Phase 1: Plan Intake & Validation
1. Read the assigned Daily Plan file (e.g. `docs/planning/daily-plans/DAY-XXX.md`).
2. Read `AGENTS.md` and `.agent/rules/strict-scope.md`.
3. Check previous day entries in `docs/development/DEVELOPMENT_LOG.md` (read only the last completed day to preserve context).
4. Inspect existing files related to the plan.
5. **Validate:**
   - Are tasks clearly ordered?
   - Are `Target Files` explicitly listed?
   - Are Acceptance Criteria measurable?
   - Are dependencies and contracts present?

**Blocking Conditions:**
- If specifications are conflicting or missing: **STOP** and report `[PLAN VALIDATION FAILED]`.
- If an unlisted file is critically required before starting: **STOP** and report `[ADDITIONAL FILE APPROVAL REQUIRED]`.

### Phase 2: Execution Readiness
1. Check repository status via PowerShell:
   `git status --short`
2. Identify existing uncommitted changes by the user (do not touch them).
3. Confirm all target files are authorized.
4. Output a brief readiness summary:
   - Task ID & Objective.
   - Authorized Target Files.
   - Status of baseline.

### Phase 3: Sequential Implementation
Execute each task strictly in the order specified in the plan:
1. For each target file:
   - Read the existing file content.
   - Apply edits strictly relevant to the task.
   - Keep code clean, type-safe, and adherent to clean architecture.
2. **Strict Boundary Check:**
   - Do NOT create or modify files outside `Target Files`.
   - If a new file is required midway:
     ```
     [SCOPE EXPANSION REQUEST]
     - File: <path>
     - Action: CREATE / MODIFY
     - Reason: <justification>
     - Alternative if rejected: <fallback>
     ```
     Stop and wait for user response.

### Phase 4: Verification & Quality Gate
1. Run syntax/build checks (e.g., `npm run build`, `dotnet build`, or type checks).
2. Run relevant unit or integration tests.
3. Audit file changes:
   - Run `git status --short` and `git diff --name-only`.
   - Verify that **no unauthorized files** were modified.
   - If `scripts/verify-scope.ps1` exists, run it.
4. Check each item in `Acceptance Criteria`. Do not mark check unless verified.

### Phase 5: Development Log Update
Append a new section to `docs/development/DEVELOPMENT_LOG.md`:
- Document actual changes file-by-file (Action, Purpose, Important Functions/Changes, Business Rules implemented).
- Document build & test execution results (PASS/FAIL/NOT RUN).
- Document Acceptance Criteria verification.
- Document any remaining issues or carry-over to next day.
- **NEVER** edit or delete historical logs in this file.

---

## 3. FINAL EXECUTION REPORT
Conclude by outputting the structured report:

# DAILY EXECUTION REPORT
- **Task ID:** DAY-XXX
- **Status:** COMPLETED | PARTIALLY_COMPLETED | BLOCKED | FAILED
- **Target Files Audited:** PASS / FAIL

### Completed Tasks:
- [x] Task 1
- [x] Task 2

### File-by-File Changes:
| File | Action | Summary |
| :--- | :--- | :--- |

### Verification Results:
- Build: PASS / FAIL
- Tests: PASS / FAIL / NOT RUN
- Acceptance Criteria: X/Y Passed

### Next Steps / Carry-over:
- Any notes for the next daily plan.
