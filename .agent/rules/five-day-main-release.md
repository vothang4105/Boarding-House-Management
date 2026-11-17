# 5-Day Review & Main Branch Release Cadence Rule

## 1. Mục đích & Chu kỳ
- **Chu kỳ:** Mỗi 5 ngày làm việc (vào cuối Ngày 5, Ngày 10, Ngày 15, Ngày 20,... theo lộ trình `MASTER_PLAN.md`).
- **Mục tiêu:** Đảm bảo nhánh `main` luôn là nhánh mã nguồn ổn định, đã qua kiểm chứng toàn diện, sẵn sàng cho việc triển khai hoặc demo.

## 2. Quy trình Rà soát Toàn diện (Full System Review Checklist)
Trước khi merge và push lên `main`, bắt buộc phải hoàn thành các bước kiểm tra sau:
1. **Build Check:**
   - Backend: `dotnet build backend/MBHMS.sln` đạt 0 Errors, 0 Warnings.
   - Frontend (nếu đã có): `npm run build` / `pnpm build` đạt 0 lỗi biên dịch và 0 lỗi TypeScript/lint.
2. **Test Check:**
   - Toàn bộ automated tests (unit tests, integration tests) chạy đạt 100% PASS.
3. **Scope & Security Audit:**
   - Chạy script kiểm toán scope `scripts/verify-scope.ps1`.
   - Kiểm tra không có thông tin bí mật, khóa API, mật khẩu thật bị đưa vào git.
4. **Documentation & Log Sync:**
   - File `docs/development/DEVELOPMENT_LOG.md` cập nhật đầy đủ mọi thay đổi của 5 ngày qua.
   - Ma trận truy vết `docs/requirements/RTM.md` phản ánh đúng tiến độ hoàn thành các FRs/BRs/NFRs.

## 3. Quy tắc Merge & Push lên Main
- Chỉ thực hiện merge từ `develop` vào `main` khi tất cả 4 bước kiểm tra ở Mục 2 đạt kết quả PASS.
- Lệnh thực thi:
  ```bash
  git checkout main
  git merge develop --no-ff -m "chore(release): milestone sync after Day X (5-day cadence review)"
  git push origin main
  git checkout develop
  ```
- Tuyệt đối không commit trực tiếp mã tính năng mới vào nhánh `main`. Mọi hoạt động code hàng ngày tiếp tục diễn ra trên nhánh `develop`.
