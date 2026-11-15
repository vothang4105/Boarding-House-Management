# Kế Hoạch Chi Tiết Các Giai Đoạn & Workflow Phát Triển Dự Án MBHMS (Solo Developer)

Tài liệu này tổng hợp toàn bộ lộ trình 16 tuần (80 ngày làm việc) được tối ưu hóa riêng cho mô hình **1 Solo Developer** (kiêm nhiệm toàn bộ vai trò BA và Dev), sử dụng Tech Stack: **C# .NET 10 Web API + Next.js (TypeScript) + PostgreSQL (Supabase)**.

---

## TỔNG QUAN LỘ TRÌNH 16 TUẦN (80 NGÀY)

| Giai đoạn | Tuần | Số ngày | Trọng tâm chính |
| :--- | :--- | :--- | :--- |
| **Giai đoạn 1** | Tuần 1 - 2 | Ngày 1 – 10 | Khởi động, thiết lập môi trường & cấu trúc dự án |
| **Giai đoạn 2** | Tuần 3 - 5 | Ngày 11 – 25 | Phân tích nghiệp vụ, thiết kế Database & Tài liệu BA |
| **Giai đoạn 3** | Tuần 8 - 9 | Ngày 36 – 45 | Sprint 1: Core Authentication, Dãy phòng & Hợp đồng |
| **Giai đoạn 4** | Tuần 10 - 11 | Ngày 46 – 55 | Sprint 2: Điện nước (Offline Sync), Hóa đơn & SePay VietQR |
| **Giai đoạn 5** | Tuần 12 - 13 | Ngày 56 – 65 | Sprint 3: Sự cố (Tickets), Thông báo & Dashboard |
| **Giai đoạn 6** | Tuần 14 - 15 | Ngày 66 – 75 | Tích hợp toàn diện, E2E Testing & UAT |
| **Giai đoạn 7** | Tuần 16 | Ngày 76 – 80 | Đóng gói, viết README, quay Video Demo & Bàn giao |

---

## CHI TIẾT CÁC GIAI ĐOẠN THEO TỪNG NGÀY

### Giai đoạn 1: Khởi động & Chuẩn bị (Ngày 1 – Ngày 10)
* **Ngày 1:** Đọc kỹ toàn bộ tài liệu SRS, lập danh sách các bảng cần thiết và gạch đầu dòng tính năng cốt lõi theo MoSCoW.
* **Ngày 2:** Khởi tạo GitHub Repository (`mbhms-system`), chia nhánh `main` / `develop`, cài đặt Git Hooks và Conventional Commits.
* **Ngày 3:** Xây dựng khung Ma trận truy vết yêu cầu (RTM) trên Notion/Excel để theo dõi các yêu cầu Must-have.
* **Ngày 4:** Thiết lập môi trường local: .NET 10 SDK, Node.js, Docker Desktop và chạy thử PostgreSQL container.
* **Ngày 5:** Chốt hạ tầng dịch vụ: **Supabase** (DB & Storage), **SePay Test Mode** (VietQR + Webhook), **Resend/Mailtrap** (Email) & lập phiếu Change Request CR-01.
* **Ngày 6:** Viết tài liệu Vision & Scope ngắn gọn, định nghĩa rõ ràng Actor (Owner, Manager, Tenant, Guest) và phạm vi ứng dụng.
* **Ngày 7:** Dựng khung Project Backend bằng ASP.NET Core Web API Clean Architecture.
* **Ngày 8:** Dựng khung Project Frontend bằng Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui.
* **Ngày 9:** Cấu hình kết nối Entity Framework Core từ Backend sang PostgreSQL, chạy thử migration đầu tiên thành công.
* **Ngày 10:** Cấu hình Docker Compose và thiết lập CI/CD cơ bản trên GitHub Actions.

### Giai đoạn 2: Phân tích & Thiết kế Kiến trúc (Ngày 11 – Ngày 25)
* **Ngày 11:** Thiết kế sơ đồ **ERD** hoàn chỉnh cho toàn bộ hệ thống (Users, Buildings, Rooms, Contracts, Tenants, Invoices, Tickets, AuditLogs).
* **Ngày 12:** Viết đặc tả Use Case cho nhóm Quản lý Nhà/Phòng và thiết kế các bảng ánh xạ Scope cho Manager (BR-14).
* **Ngày 13:** Thiết kế sơ đồ **Sequence Diagram** cho 3 luồng: Đăng nhập/Phân quyền, Sinh hóa đơn tự động, và Thanh toán SePay VietQR & Webhook đối soát tự động.
* **Ngày 14:** Vẽ sơ đồ **BPMN** cho 2 quy trình: *Nhận khách mới* và *Chốt tiền cuối tháng*.
* **Ngày 15:** Vẽ sơ đồ **BPMN** cho 3 quy trình: *Xử lý sự cố, Gia hạn hợp đồng, Chấm dứt hợp đồng*.
* **Ngày 16:** Thiết kế Low-fi Wireframes trên Figma cho Owner và Manager.
* **Ngày 17:** Thiết kế Low-fi Wireframes cho Tenant và Guest (đảm bảo $\le 3$ chạm - NFR-07).
* **Ngày 18:** Hoàn thiện ít nhất 10 màn hình Mockup (hi-fi) chính trên Figma dùng bộ kit shadcn/ui.
* **Ngày 19:** Viết tài liệu Data Dictionary chi tiết mô tả trường dữ liệu, kiểu dữ liệu và ràng buộc nghiệp vụ.
* **Ngày 20:** Viết hoàn chỉnh tài liệu SRS v1.0 phiên bản cá nhân trong file Markdown tại Repo.
* **Ngày 21:** Thiết kế danh sách RESTful API Endpoints và cấu trúc JSON Request/Response (chuẩn bị viết Swagger).
* **Ngày 22:** Viết mã nguồn cho các **Database Entities** và thiết lập Foreign Keys trong EF Core.
* **Ngày 23:** Cấu hình **EF Core Global Query Filters** để tự động lọc dữ liệu theo phân quyền Manager (BR-14).
* **Ngày 24:** Cấu hình **SaveChangesInterceptor** trong EF Core để tự động ghi nhận **Audit Log** cho Hợp đồng và Hóa đơn (NFR-11).
* **Ngày 25:** Kiểm tra lại toàn bộ tài liệu thiết kế và Database, sẵn sàng bước vào giai đoạn code.

### Giai đoạn 3: Sprint 1 - Core & Hợp đồng (Ngày 36 – Ngày 45)
*(Lưu ý: Tuần 6-7 dùng để thiết kế trên Figma/Architecture, ta gom chuẩn bị gọn vào Giai đoạn 2)*
* **Ngày 36:** Code API **Đăng nhập & Xác thực JWT** với mật khẩu hash `Bcrypt` (cost $\ge 10$) (FR-45, NFR-04).
* **Ngày 37:** Code API **Quản lý Tài khoản & Phân quyền**: Tạo Manager theo dãy và gửi email kích hoạt (FR-44, FR-46, FR-47).
* **Ngày 38:** Code API & Giao diện **Quản lý Dãy trọ & Phòng**: Thêm, sửa, xóa, phân loại 3 loại phòng và 4 trạng thái (FR-01 -> FR-04, BR-10).
* **Ngày 39:** Code API & Giao diện **Sơ đồ phòng dạng Grid**: Đổi màu trực quan theo trạng thái và upload tối đa 5 ảnh phòng (FR-05, FR-06).
* **Ngày 40:** Code API & Giao diện **Hồ sơ Khách thuê**: Kiểm tra ràng buộc CCCD duy nhất (BR-13) và lưu trữ ảnh CCCD qua Signed URL (FR-07, NFR-06).
* **Ngày 41:** Code API **Tạo Hợp đồng thuê**: Ràng buộc sức chứa phòng, tự động đổi trạng thái phòng sang "Đang thuê" (FR-08, FR-12, BR-06, BR-12).
* **Ngày 42:** Code API **Upload file PDF Hợp đồng** ($\le 10\text{MB}$) lên Supabase Storage và giao diện xem chi tiết cho Tenant (FR-09, FR-14, NFR-06).
* **Ngày 43:** Code API **Gia hạn & Chấm dứt Hợp đồng trước hạn**: Tự động trừ 50% cọc nếu báo $< 30$ ngày (FR-10, FR-11, BR-11).
* **Ngày 44:** Viết Background Job kiểm tra hàng ngày để tự động nhắc trước 30 ngày khi hợp đồng sắp hết hạn (FR-13).
* **Ngày 45:** Kiểm thử tích hợp toàn bộ Sprint 1, fix lỗi và commit code lên nhánh chính.

### Giai đoạn 4: Sprint 2 - Điện Nước & Thanh toán (Ngày 46 – Ngày 55)
* **Ngày 46:** Code API **Nhập chỉ số điện hàng tháng**: Tính số kWh tiêu thụ và cảnh báo vượt 200% trung bình 3 tháng (FR-15, FR-16, FR-17).
* **Ngày 47:** Xây dựng tính năng **Offline-first cho màn hình nhập điện**: Tích hợp `Dexie.js` (IndexedDB) lưu tạm khi mất mạng và tự động đồng bộ khi có mạng (FR-18, NFR-09).
* **Ngày 48:** Code logic **Tính tiền nước, internet, rác, giữ xe tự động** theo các quy tắc BR-01 đến BR-05.
* **Ngày 49:** Viết **Cronjob tự động sinh hóa đơn hàng loạt** vào ngày 28 hàng tháng cho 64 phòng ($\le 30$ giây) (FR-21, BR-07, NFR-02).
* **Ngày 50:** Code API cho phép **thêm/sửa các khoản phụ thu** vào hóa đơn trước khi gửi (FR-23).
* **Ngày 51:** Code tính năng **Gửi hóa đơn qua Email** bằng Resend và hiển thị thông báo In-app (FR-24, FR-36).
* **Ngày 52:** Tích hợp **SePay VietQR**: Tạo mã QR chuyển khoản động chuẩn NAPAS247 (FR-25, CR-01).
* **Ngày 53:** Xây dựng **SePay Webhook Endpoint**: Xác thực chữ ký/API Key và tự động đổi trạng thái hóa đơn sang "Đã thanh toán" (FR-26, CR-01).
* **Ngày 54:** Viết Background Job tự động chuyển trạng thái hóa đơn sang **Quá hạn** sau ngày 5 tháng tiếp theo (FR-27, FR-28, BR-08).
* **Ngày 55:** Code tính năng **In và Xuất hóa đơn ra file PDF** chuẩn VNĐ (FR-29, NFR-12) và hoàn tất Sprint 2.

### Giai đoạn 5: Sprint 3 - Sự cố, Thông báo & Dashboard (Ngày 56 – Ngày 65)
* **Ngày 56:** Code API & Giao diện **Tạo Ticket sự cố**: Khách thuê gửi báo cáo kèm tối đa 3 ảnh (FR-30).
* **Ngày 57:** Code API quản lý 4 trạng thái ticket, tính năng bình luận và đánh giá 1-5 sao sau khi đóng ticket (FR-31 -> FR-34).
* **Ngày 58:** Xây dựng hệ thống **Hộp thông báo In-app** kèm bộ đếm số lượng chưa đọc (FR-36).
* **Ngày 59:** Viết dịch vụ gửi **Email nhắc nhở tự động** cho hóa đơn, quá hạn 3 ngày, hợp đồng sắp hết hạn và thông báo chung theo dãy (FR-37, FR-38).
* **Ngày 60:** Code API **Dashboard chính**: Tổng hợp tỷ lệ lấp đầy, doanh thu tháng, số HĐ quá hạn, số ticket mở ($\le 3$ giây) (FR-39, NFR-01).
* **Ngày 61:** Code API & Giao diện **Báo cáo doanh thu 12 tháng** với biểu đồ cột Recharts (FR-40).
* **Ngày 62:** Code API **Báo cáo công nợ** liệt kê hóa đơn quá hạn kèm số ngày trễ và tính năng **Xuất báo cáo ra Excel `.xlsx`** (FR-41, FR-43).
* **Ngày 63:** Cấu hình **Database Backup tự động hàng ngày** trên Supabase (giữ 30 ngày) và múi giờ `Asia/Ho_Chi_Minh` (NFR-10, NFR-13).
* **Ngày 64:** Rà soát toàn bộ giao diện Frontend, đảm bảo responsive từ `360px` trở lên (NFR-08).
* **Ngày 65:** Đóng băng tính năng (Feature Freeze), hoàn thành 100% yêu cầu Must-have và Should-have.

### Giai đoạn 6: Tích hợp, Kiểm thử & UAT (Ngày 66 – Ngày 75)
* **Ngày 66:** Viết kịch bản kiểm thử toàn diện bám sát tiêu chí nghiệm thu (Acceptance Criteria).
* **Ngày 67:** Thực hiện **End-to-End (E2E) Testing**: Chạy thử toàn bộ luồng từ tạo phòng, hợp đồng, nhập điện, sinh hóa đơn đến thanh toán SePay VietQR.
* **Ngày 68:** Kiểm thử bảo mật phân quyền chéo (Thử dùng Manager dãy A truy cập dữ liệu dãy B theo BR-14) và kiểm tra tính năng Offline.
* **Ngày 69:** Kiểm thử tương thích trình duyệt (Chrome, Safari, Edge) và tối ưu hóa tốc độ tải trang.
* **Ngày 70:** Sửa tất cả các lỗi tồn đọng, đảm bảo hệ thống **0 lỗi Blocker hoặc Critical**.
* **Ngày 71:** Chuẩn bị bộ dữ liệu mẫu (Seed Data): 1 Owner, 2 Manager, 10 Tenant, 64 phòng, 3 dãy trọ.
* **Ngày 72:** Deploy Backend lên Render/Railway và Frontend lên Vercel, kiểm tra lại toàn bộ Public URL.
* **Ngày 73:** Tổ chức phiên **UAT giả lập** (tự đóng vai "chị Lan" thao tác toàn bộ hệ thống).
* **Ngày 74:** Tinh chỉnh nhỏ giao diện hoặc văn bản theo kết quả tự nghiệm thu.
* **Ngày 75:** Hoàn tất biên bản nghiệm thu sản phẩm MVP.

### Giai đoạn 7: Đóng gói & Bàn giao (Ngày 76 – Ngày 80)
* **Ngày 76:** Hoàn thiện file `README.md` chỉn chu trên GitHub (hướng dẫn cài đặt local, công nghệ, hình ảnh minh họa).
* **Ngày 77:** Xuất tài liệu API qua Swagger và tạo Postman Collection vào thư mục gốc dự án.
* **Ngày 78:** Quay và dựng **Video Demo ngắn gọn ($\le 5$ phút)** trình bày các tính năng nổi bật.
* **Ngày 79:** Thiết kế Slide thuyết trình bảo vệ dự án theo Deliverables.
* **Ngày 80:** **Bàn giao toàn bộ dự án** (Mã nguồn GitHub, Link Demo, Video, Slide, Tài liệu) và hoàn thành mục tiêu.

---

## WORKFLOW VẬN HÀNH HÀNG NGÀY CHO SOLO DEVELOPER

1. **Buổi sáng (08:30 – 09:00):** Đối chiếu lịch ngày hôm đó trên bảng kế hoạch. Chia nhỏ nhiệm vụ thành 2-3 gạch đầu dòng cụ thể lên giấy note hoặc Trello cá nhân.
2. **Khung giờ vàng (09:00 – 12:00 & 13:30 – 17:00):** Deep Work tập trung tuyệt đối. Tắt mọi thông báo mạng xã hội. Ưu tiên code phần logic nghiệp vụ (Happy Case) chạy đúng trước, sau đó mới polish giao diện bằng shadcn/ui.
3. **Cuối buổi chiều (17:00 – 17:30):** Commit code chuẩn quy tắc **Conventional Commits** (VD: `feat(invoice): implement auto-generation cronjob (FR-21)`) và cập nhật Ma trận truy vết RTM.
4. **Quy tắc vượt chướng ngại vật:** Nếu gặp bug khó quá 45 phút, dừng lại tra cứu tài liệu hoặc dùng AI gỡ rối; không cố húc đầu vào tường làm trễ nhịp kế hoạch ngày.
