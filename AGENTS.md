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
6. **Phase-End Comprehensive Review & Main Branch Release Cadence:**
   - **Chu kỳ theo từng Giai đoạn (Cuối Giai đoạn 1 đến 7 theo `MASTER_PLAN.md`):**
     - Các mốc phát hành (Milestone Release Points):
       - **Giai đoạn 1 (Cuối Ngày 10):** Hoàn thành chuẩn bị hạ tầng, cấu trúc Monorepo, Backend, Frontend, Docker & CI/CD.
       - **Giai đoạn 2 (Cuối Ngày 25):** Hoàn thành phân tích nghiệp vụ, tài liệu SRS, ERD, Use Cases, Wireframes/Figma.
       - **Giai đoạn 3 (Cuối Ngày 45):** Hoàn thành Sprint 1 (Auth, Dãy trọ, Phòng & Hợp đồng).
       - **Giai đoạn 4 (Cuối Ngày 55):** Hoàn thành Sprint 2 (Điện nước Offline-first, Hóa đơn & SePay VietQR).
       - **Giai đoạn 5 (Cuối Ngày 65):** Hoàn thành Sprint 3 (Sự cố Tickets, Thông báo In-app/Email & Dashboard).
       - **Giai đoạn 6 (Cuối Ngày 75):** Hoàn thành Tích hợp E2E, UAT & Tối ưu hiệu năng.
       - **Giai đoạn 7 (Cuối Ngày 80):** Nghiệm thu toàn bộ sản phẩm và bàn giao dự án.
     - **Quy trình nghiệm thu cuối mỗi Giai đoạn (Phase Review):**
       1. **Build Quality:** Biên dịch sạch toàn bộ Solution Backend (.NET 10) & Frontend (Next.js) đảm bảo 0 Errors, 0 Warnings.
       2. **Test Quality:** Chạy toàn bộ các bộ kiểm thử tự động (Unit / Integration Tests) đạt 100% PASS.
       3. **Scope & Security Audit:** Chạy script kiểm toán phạm vi tệp, rà soát bảo mật không để lộ credentials thật.
       4. **Documentation & RTM Sync:** Rà soát tính toàn vẹn của `DEVELOPMENT_LOG.md`, ma trận `RTM.md`, và các Daily Plans trong toàn bộ giai đoạn.
     - Sau khi vượt qua Definition of Done của Giai đoạn, tiến hành merge nhánh `develop` vào nhánh `main`, tạo Git Tag mốc giai đoạn (vd: `v0.1-phase1`), và push lên remote `origin/main`.
