# Skill-First Execution Rule

## 1. Nguyên tắc Cốt lõi
- **Phương châm:** "Nếu kho skill có kỹ năng chuyên biệt cho công việc, luôn luôn kích hoạt và áp dụng skill đó."
- **Mục đích:** Đảm bảo mọi tác vụ trong dự án MBHMS đều đạt chất lượng chuyên gia cao nhất, tuân thủ đúng phương pháp luận đã được đúc kết thay vì để AI xử lý tự phát.

## 2. Quy trình Thực thi (Skill-First Workflow)
Khi tiếp nhận một nhiệm vụ hoặc bước triển khai trong Daily Plan:
1. **Rà soát kho Skill (Skill Discovery):**
   - Kiểm tra danh sách skills sẵn có (trong workspace `.agent/skills/` và global `~/.gemini/config/skills/`).
2. **Kích hoạt & Đọc `SKILL.md` (Skill Activation):**
   - Đọc kỹ tài liệu chỉ dẫn `SKILL.md` của skill phù hợp trước khi chạm vào mã nguồn hoặc tài liệu.
3. **Thực thi theo Tiêu chuẩn của Skill:**
   - Áp dụng các playbooks, quy tắc kiểm tra, anti-pattern checks, rubrics và scripts đi kèm skill.

## 3. Ma trận Ánh xạ Công việc & Skill Thường gặp

| Lĩnh vực / Loại công việc | Kỹ năng ưu tiên áp dụng | Mục tiêu & Giá trị mang lại |
| :--- | :--- | :--- |
| **Thiết kế UI/UX & Frontend** | `impeccable` | Đạt chuẩn craft cao cấp; tối ưu $\le 3$ chạm, responsive $\ge 360\text{px}$; loại bỏ AI design slop; chuẩn hóa `DESIGN.md` |
| **Xem xét Kiến trúc Hệ thống** | `architect-review` | Đảm bảo Clean Architecture, tính mở rộng, cô lập dữ liệu theo dãy (BR-14) |
| **Xử lý Lỗi & Bug Fix** | `debugger`, `systematic-debugging`, `phase-gated-debugging` | Phân tích nguyên nhân gốc rễ (root cause) trước khi sửa mã, tránh sửa mò |
| **Đánh giá & Kiểm tra Code** | `code-reviewer`, `code-review-excellence`, `code-review-and-quality` | Thẩm định chất lượng đa trục (Bảo mật, Clean Code, Hiệu năng) trước khi commit |
| **Soạn thảo Tài liệu Kỹ thuật** | `docs-architect`, `documentation`, `code-documentation-code-explain` | Viết tài liệu BA, SRS, Data Dictionary, Kiến trúc chuyên nghiệp, trực quan |
| **Lập Kế hoạch Chi tiết** | `concise-planning`, `planning-and-task-breakdown`, `writing-plans` | Chia nhỏ task nguyên tử, rõ ràng ranh giới Target Files và tiêu chí nghiệm thu |
