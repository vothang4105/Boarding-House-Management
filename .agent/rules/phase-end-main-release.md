# Phase-End Review & Main Branch Release Cadence Rule

## 1. Mục đích & Chu kỳ Phát hành
- **Chu kỳ:** Kích hoạt ngay sau khi hoàn thành ngày làm việc cuối cùng của từng **Giai đoạn (Phase)** theo kế hoạch tổng thể [MASTER_PLAN.md](file:///d:/TaDuss/Boarding-House-Management/docs/planning/MASTER_PLAN.md).
- **Mục tiêu:** Nhánh `main` là nhánh đại diện cho các phiên bản phát hành chính thức (Release Milestones) của từng Giai đoạn, đảm bảo tuyệt đối ổn định và không chứa lỗi tồn đọng.

## 2. Các Mốc Phát hành theo Giai đoạn (Milestones)

| Giai đoạn | Tuần | Mốc ngày | Trọng tâm giai đoạn | Nhãn Git Tag đề xuất |
| :--- | :--- | :--- | :--- | :--- |
| **Giai đoạn 1** | Tuần 1 – 2 | Cuối Ngày 10 | Khởi động, cấu trúc Monorepo Backend/Frontend, Docker & CI/CD | `v0.1-phase1` |
| **Giai đoạn 2** | Tuần 3 – 5 | Cuối Ngày 25 | Phân tích nghiệp vụ, tài liệu BA, SRS v1.0, ERD, Wireframes Figma | `v0.2-phase2` |
| **Giai đoạn 3** | Tuần 8 – 9 | Cuối Ngày 45 | Sprint 1: Core Auth, Quản lý Dãy/Phòng & Hợp đồng điện tử | `v0.3-sprint1` |
| **Giai đoạn 4** | Tuần 10 – 11 | Cuối Ngày 55 | Sprint 2: Điện nước Offline-first, Hóa đơn & SePay VietQR | `v0.4-sprint2` |
| **Giai đoạn 5** | Tuần 12 – 13 | Cuối Ngày 65 | Sprint 3: Sự cố Tickets, Thông báo In-app/Email & Dashboard | `v0.5-sprint3` |
| **Giai đoạn 6** | Tuần 14 – 15 | Cuối Ngày 75 | Tích hợp toàn diện, E2E Testing, UAT giả lập & Tối ưu hóa | `v0.9-rc` |
| **Giai đoạn 7** | Tuần 16 | Cuối Ngày 80 | Hoàn thiện README, Video Demo, Slide & Bàn giao sản phẩm | `v1.0.0` |

---

## 3. Quy trình Rà soát Toàn diện Cuối Giai đoạn (Full System Review Checklist)

Trước khi thực hiện merge từ `develop` vào `main`, bắt buộc phải hoàn thành 4 bước kiểm tra nghiêm ngặt:

1. **Build Quality (Biên dịch toàn diện):**
   - Backend: `dotnet build backend/MBHMS.sln` đạt **0 Errors, 0 Warnings**.
   - Frontend: `npm run build` / `pnpm build` biên dịch sạch sẽ, không lỗi TypeScript hoặc ESLint.
2. **Test Quality (Kiểm thử tự động):**
   - Chạy toàn bộ các bộ kiểm thử Unit Tests và Integration Tests đạt **100% PASS** (`0 Failed`).
3. **Scope & Security Audit (Kiểm toán bảo mật & ranh giới):**
   - Chạy script kiểm toán `scripts/verify-scope.ps1`.
   - Rà soát toàn bộ commit không lộ lọt mật khẩu, API key, Connection string thật (chỉ dùng template `.example`).
4. **Documentation & Traceability Sync (Đồng bộ tài liệu):**
   - `docs/development/DEVELOPMENT_LOG.md` được cập nhật đầy đủ và chính xác tất cả các ngày trong giai đoạn.
   - `docs/requirements/RTM.md` phản ánh trung thực trạng thái của toàn bộ FRs, BRs, NFRs thuộc phạm vi giai đoạn.

---

## 4. Lệnh Hợp nhất Nhánh (Merge & Release to Main)

Khi cả 4 tiêu chí ở Mục 3 đạt kết quả **PASS**:

```bash
# 1. Chuyển sang nhánh main và cập nhật mới nhất
git checkout main
git pull origin main

# 2. Hợp nhất từ nhánh develop (tạo merge commit rõ ràng)
git merge develop --no-ff -m "chore(release): complete Phase X milestone (Days Y-Z)"

# 3. Đánh tag phiên bản
git tag -a v0.X-phaseX -m "Release Milestone Phase X"

# 4. Đẩy mã nguồn và tags lên remote
git push origin main --tags

# 5. Quay trở lại nhánh develop tiếp tục làm việc
git checkout develop
```
