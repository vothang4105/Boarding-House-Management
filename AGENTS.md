# AGENTS.md - MBHMS Project Roles & Working Principles

> **Project:** Mini Boarding House Management System (MBHMS)  
> **Repository:** `D:\TaDuss\Boarding-House-Management`

---

## 1. System Roles

In this workspace, we adhere to the **Daily Plan-Driven Development** methodology:

| Role | Entity | Responsibilities |
| :--- | :--- | :--- |
| **Planner & Tech Lead** | **User (You)** | • Reads project requirements (SRS, Master Plan).<br>• Analyzes architecture and writes the Daily Implementation Plan (`DAY-XXX.md`).<br>• Defines Target Files, business rules, and acceptance criteria.<br>• Approves or rejects scope expansion requests. |
| **Developer Agent** | **Antigravity AI** | • Validates the assigned Daily Plan against rules and current codebase.<br>• Sequentially implements tasks **strictly within Target Files**.<br>• Runs builds and tests to verify criteria.<br>• Documents actual changes in `DEVELOPMENT_LOG.md`. |

---

## 2. Core Working Principles

1. **The Daily Plan is the Single Source of Truth:**
   - The Agent will never invent missing requirements, add unplanned features, or guess business logic.
2. **Target Files are a Hard Boundary:**
   - The Agent will **never** create, modify, rename, or delete any file not explicitly listed in the `Target Files` section of today's plan, with the sole exception of logging to `DEVELOPMENT_LOG.md`.
   - If an additional file is genuinely necessary (e.g., a new DTO or utility), the Agent **must halt immediately** and request explicit user approval.
3. **No Unapproved Dependencies:**
   - Never run `npm install <package>`, `dotnet add package`, etc., unless authorized in the plan.
4. **Preserve User Changes:**
   - Pre-existing git changes by the user must never be overwritten, discarded, or refactored.
5. **Verified Evidence in Logs:**
   - Never report tests or builds as "PASS" unless actually executed and verified.
   - The `DEVELOPMENT_LOG.md` is strictly **Append-Only**; historical entries must never be modified or deleted.
