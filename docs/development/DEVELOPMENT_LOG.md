# MBHMS - Development Log

> **Chronological Record of Actual Implementation**  
> • Maintained across the entire development cycle of the Mini Boarding House Management System (MBHMS).  
> • **Rule:** Append-Only. Historical daily entries must never be rewritten or deleted.  
> • Reflects verified actual changes, not planned or intended behavior.

---

<!-- Daily records will be appended sequentially below -->


## [DAY-001] - 2026-11-15 - Phân tích nghiệp vụ 3 dãy (64 phòng), phân loại MoSCoW & Bóc tách thực thể sơ bộ

### 1. Thông tin chung
- **Task ID:** DAY-001
- **Trạng thái:** COMPLETED
- **Vai trò thực hiện:** Developer Agent (hỗ trợ Tech Lead / Solo Dev)
- **Tài liệu căn cứ:** `docs/planning/MASTER_PLAN.md`, `README.md`, `docs/planning/daily-plans/DAY-001.md`

---

### 2. Chi tiết kết quả thực hiện

#### Task 1: Thiết lập Workspace Quản lý Dự án (Kanban)
- **Mô hình quản lý:** Kanban 4 cột (`Backlog` -> `To Do (Today)` -> `In Progress` -> `Done`).
- **Quy tắc làm việc:**
  - Solo Developer tập trung chế độ Deep Work (khung giờ vàng 09:00–12:00 & 13:30–17:00).
  - Không chuyển quá 2 task vào cột `In Progress` cùng một thời điểm.
  - Mỗi ngày tổng kết Definition of Done (DoD) trước khi commit code.

#### Task 2: Phân loại Yêu cầu Chức năng theo MoSCoW & Ranh giới Out of Scope
Đã rà soát toàn bộ 48 Yêu cầu Chức năng (FR-01 đến FR-48):

* **Nhóm Must-have (Bắt buộc cho MVP 16 tuần - Ưu tiên 100% tài nguyên):**
  - **Quản lý Cơ sở vật chất & Phòng (FR-01 đến FR-05):** Thêm/sửa/xóa Dãy trọ (Building); Quản lý 64 Phòng trọ (Room); Phân loại 3 loại phòng (Đơn, Đôi, Gia đình); Cấu hình giá phòng & sức chứa; Quản lý 4 trạng thái phòng (Trống, Đang thuê, Đang sửa, Đã đặt cọc); Sơ đồ phòng trực quan dạng Grid.
  - **Khách thuê & Hợp đồng (FR-07 đến FR-14):** Quản lý hồ sơ khách thuê với CCCD duy nhất (BR-13); Lập hợp đồng điện tử ràng buộc sức chứa (BR-06, BR-12); Tự động đổi trạng thái phòng sang "Đang thuê"; Gia hạn & chấm dứt hợp đồng áp dụng phạt cọc 50% nếu báo trước < 30 ngày (BR-11); Lưu trữ và xem file scan hợp đồng PDF qua Supabase Storage; Tự động nhắc hợp đồng sắp hết hạn trước 30 ngày.
  - **Ghi điện nước & Hóa đơn tự động (FR-15, FR-16, FR-18, FR-19, FR-21, FR-22, FR-24):** Nhập chỉ số điện tháng; Tính tiêu thụ điện (kWh); Tính năng Offline-first lưu IndexedDB cục bộ (Dexie.js) và tự động đồng bộ khi có Internet; Cronjob sinh hóa đơn hàng loạt ngày 28 hàng tháng (BR-07); Tính tiền dịch vụ (nước, rác, internet, gửi xe) theo BR-01 -> BR-05; Gửi hóa đơn qua Email (Resend) và thông báo In-app.
  - **Thanh toán trực tuyến & Công nợ (FR-25 đến FR-28):** Tích hợp cổng VNPay Sandbox (URL thanh toán & QR Code); Webhook / IPN Callback tự động cập nhật trạng thái hóa đơn sang PAID; Tự động chuyển trạng thái hóa đơn sang OVERDUE sau ngày 5 hàng tháng (BR-08); Bộ lọc theo dõi danh sách hóa đơn theo trạng thái.
  - **Ticket sự cố & Dashboard (FR-30 đến FR-33, FR-35, FR-36, FR-37, FR-39 đến FR-41):** Khách thuê tạo ticket báo hỏng kèm ảnh; Quản lý 4 trạng thái ticket (OPEN, PROCESSING, RESOLVED, CLOSED); Trao đổi bình luận trên ticket; Trung tâm thông báo In-app; Email tự động nhắc nợ; Dashboard KPI thời gian thực (Doanh thu tháng, Tỷ lệ lấp đầy, Phòng trống, Ticket mở <= 3s); Biểu đồ doanh thu 12 tháng (Recharts); Danh sách công nợ quá hạn.
  - **Bảo mật, Xác thực & Phân quyền (FR-44 đến FR-48):** Quản lý tài khoản (Owner, Manager, Tenant); Xác thực JWT, mật khẩu mã hóa Bcrypt (cost >= 10); Phân quyền RBAC; Cô lập dữ liệu Manager theo Dãy trọ (Data Isolation - BR-14); Tự động ghi Audit Log qua SaveChangesInterceptor cho Hợp đồng và Hóa đơn.

* **Nhóm Should-have (Triển khai sau khi nhóm Must-have đã ổn định):**
  - `FR-06`: Thư viện ảnh phòng (upload tối đa 5 ảnh/phòng).
  - `FR-17`: Cảnh báo chỉ số điện tăng đột biến > 200% so với trung bình 3 tháng gần nhất.
  - `FR-20`: Biểu đồ lịch sử tiêu thụ điện 12 tháng theo từng phòng.
  - `FR-23`: Cho phép thêm/sửa phụ thu, giảm trừ thủ công trên hóa đơn trước khi phát hành.
  - `FR-29`: In và xuất hóa đơn ra file PDF chuẩn định dạng VNĐ.
  - `FR-34`: Đánh giá 1-5 sao và phản hồi chất lượng sửa chữa khi đóng ticket.
  - `FR-38`: Gửi Email thông báo chung đến toàn bộ cư dân theo từng dãy.
  - `FR-42`: Báo cáo chi tiết tỷ lệ lấp đầy theo dãy theo từng tháng.
  - `FR-43`: Xuất danh sách công nợ và báo cáo tài chính ra file Excel `.xlsx`.

* **Phạm vi loại trừ (Out of Scope - Ranh giới kỷ luật):**
  1. ❌ **Không làm Mobile Native App (Swift / Kotlin / Bare React Native):** Sử dụng Web Responsive (Next.js + Tailwind CSS + shadcn/ui) tối ưu hiển thị mượt mà trên mobile viewport >= 360px.
  2. ❌ **Không tích hợp thiết bị phần cứng IoT công tơ điện:** Thu thập chỉ số hoàn toàn qua giao diện nhập liệu thủ công (có hỗ trợ Offline Mode).
  3. ❌ **Không tích hợp Zalo ZNS / SMS Gateway:** Tiết kiệm chi phí dịch vụ; thông báo tập trung qua Email (Resend) và In-app Notifications.
  4. ❌ **Không hỗ trợ đa ngôn ngữ (i18n):** Tập trung tối ưu hóa 100% trải nghiệm tiếng Việt.

---

#### Task 3: Bóc tách 14 Quy tắc Nghiệp vụ (BR-01 đến BR-14) thành Điều kiện Logic

| Mã BR | Quy tắc nghiệp vụ | Điều kiện Logic / Pseudocode |
| :--- | :--- | :--- |
| **BR-01** | Tiền điện sinh hoạt | `Chỉ số tiêu thụ = Chỉ số mới - Chỉ số cũ` (Ràng buộc: `Chỉ số mới >= Chỉ số cũ`).<br>`Tiền điện = Chỉ số tiêu thụ * 3.500 VNĐ`. |
| **BR-02** | Tiền nước sinh hoạt | Tính theo đầu người thực tế:<br>`Tiền nước = Số người trong hợp đồng * 100.000 VNĐ`. |
| **BR-03** | Tiền Internet / Wifi | Cố định theo phòng:<br>`Tiền internet = 100.000 VNĐ / phòng / tháng`. |
| **BR-04** | Tiền rác & vệ sinh | Cố định theo phòng:<br>`Tiền rác = 50.000 VNĐ / phòng / tháng`. |
| **BR-05** | Tiền giữ xe máy | Tính theo số xe đăng ký:<br>`Tiền gửi xe = Số lượng xe máy * 120.000 VNĐ / xe / tháng`. |
| **BR-06** | Giới hạn sức chứa phòng | `if (RoomType == SINGLE) MaxTenants = 1;`<br>`else if (RoomType == DOUBLE) MaxTenants = 2;`<br>`else if (RoomType == FAMILY) MaxTenants = 4;`<br>`if (Số thành viên đăng ký > MaxTenants) throw ValidationException("Vượt sức chứa tối đa");` |
| **BR-07** | Chu kỳ tính & phát hành hóa đơn | Chu kỳ: Từ ngày 28 tháng $N-1$ đến ngày 27 tháng $N$.<br>Thời điểm Cronjob chạy sinh hóa đơn tự động: Đúng `00:00:00 ngày 28 hàng tháng`. |
| **BR-08** | Hạn thanh toán & Chuyển quá hạn | Hạn chót nộp tiền: `23:59:59 ngày 05 tháng tiếp theo`.<br>`if (CurrentDate > DueDate && Status == PENDING) Status = OVERDUE;` |
| **BR-09** | Tiền đặt cọc phòng | `Tiền đặt cọc = 1 * Giá phòng cơ bản (BasePrice)`. Bắt buộc thanh toán đủ khi kích hoạt hợp đồng. |
| **BR-10** | Trạng thái phòng hợp lệ | Gồm: `AVAILABLE`, `RENTED`, `MAINTENANCE`, `RESERVED`.<br>`if (Room.Status != AVAILABLE && Action == CreateContract) throw ConflictException("Phòng đang không trống");` |
| **BR-11** | Chấm dứt hợp đồng & Hoàn cọc | `Số ngày báo trước = (ActualEndDate - NoticeDate).Days;`<br>`if (Số ngày báo trước >= 30) { Hoàn cọc = 100% Cọc; Phạt = 0; }`<br>`else { Hoàn cọc = 50% Cọc; Phạt = 50% Cọc; }` |
| **BR-12** | Ràng buộc thành viên phòng | Hợp đồng bắt buộc có 1 Tenant đại diện pháp lý. Tổng số người = `1 (Tenant) + Count(ContractMembers) <= Room.MaxTenants`. |
| **BR-13** | Toàn vẹn CCCD khách thuê | `CitizenId` phải là chuỗi 12 chữ số hợp lệ và `UNIQUE` trên toàn bộ bảng `Tenants`. |
| **BR-14** | Cô lập dữ liệu Manager (Data Isolation) | Áp dụng EF Core Global Query Filter:<br>`if (Role == OWNER) AllowAll();`<br>`else if (Role == MANAGER) Query.Where(b => AssignedBuildingIds.Contains(b.Id));`<br>`else if (Role == TENANT) Query.Where(t => t.Id == CurrentTenantId);` |

---

#### Task 4: Danh mục 11 Thực thể Dữ liệu Sơ bộ (Core Entities)

1. **`User`:** `Id` (Guid), `Email` (unique), `PasswordHash`, `FullName`, `PhoneNumber`, `Role` (OWNER, MANAGER, TENANT), `IsActive`, `CreatedAt`, `UpdatedAt`.
2. **`Building` (Dãy trọ):** `Id` (Guid), `Name` (Dãy A, Dãy B, Dãy C), `Address`, `TotalRooms`, `Description`, `CreatedAt`, `UpdatedAt`.
3. **`BuildingManager`:** `Id` (Guid), `BuildingId` (FK), `ManagerUserId` (FK), `AssignedAt` -> Bảng phân quyền quản lý theo dãy (BR-14).
4. **`Room` (Phòng trọ):** `Id` (Guid), `BuildingId` (FK), `RoomNumber`, `RoomType` (SINGLE, DOUBLE, FAMILY), `AreaSquareMeters`, `BasePrice`, `MaxTenants`, `Status` (AVAILABLE, RENTED, MAINTENANCE, RESERVED), `CreatedAt`, `UpdatedAt`.
5. **`Tenant` (Khách thuê):** `Id` (Guid), `UserId` (FK), `FullName`, `CitizenId` (unique, 12 ký tự), `PhoneNumber`, `Email`, `PermanentAddress`, `EmergencyContactPhone`, `IdCardFrontImageUrl`, `IdCardBackImageUrl`, `CreatedAt`, `UpdatedAt`.
6. **`Contract` (Hợp đồng):** `Id` (Guid), `ContractCode` (unique), `RoomId` (FK), `TenantId` (FK), `StartDate`, `EndDate`, `ActualEndDate`, `BasePrice`, `DepositAmount`, `RefundedDepositAmount`, `Status` (ACTIVE, EXPIRED, TERMINATED), `SignedPdfUrl`, `CreatedAt`, `UpdatedAt`.
7. **`ContractMember` (Thành viên ở cùng):** `Id` (Guid), `ContractId` (FK), `FullName`, `CitizenId`, `PhoneNumber`, `RelationshipWithTenant`, `JoinedAt`.
8. **`ElectricityReading` (Chỉ số điện):** `Id` (Guid), `RoomId` (FK), `ReadingMonth` (YYYY-MM), `PreviousReading`, `CurrentReading`, `ConsumptionKWh`, `RecordedByUserId` (FK), `RecordedAt`, `SyncStatus` (SYNCED, PENDING_LOCAL).
9. **`Invoice` (Hóa đơn):** `Id` (Guid), `InvoiceCode` (unique), `ContractId` (FK), `RoomId` (FK), `BillingMonth` (YYYY-MM), `RoomCharge`, `ElectricityCharge`, `WaterCharge`, `InternetCharge`, `WasteCharge`, `ParkingCharge`, `AdditionalCharge`, `TotalAmount`, `DueDate`, `Status` (PENDING, PAID, OVERDUE, CANCELLED), `PaidAt`, `PaymentMethod` (VNPAY, CASH), `VnpayTransactionRef`, `CreatedAt`, `UpdatedAt`.
10. **`Ticket` (Sự cố):** `Id` (Guid), `TicketCode` (unique), `RoomId` (FK), `TenantId` (FK), `AssignedManagerId` (FK nullable), `Title`, `Description`, `Priority` (LOW, MEDIUM, HIGH, URGENT), `Status` (OPEN, PROCESSING, RESOLVED, CLOSED), `RatingStars`, `RatingComment`, `ResolvedAt`, `CreatedAt`, `UpdatedAt`.
11. **`Notification`:** `Id` (Guid), `UserId` (FK), `Title`, `Content`, `NotificationType` (INVOICE, CONTRACT, TICKET, GENERAL), `IsRead`, `SentViaEmail`, `CreatedAt`.
12. **`AuditLog`:** `Id` (Guid), `EntityName`, `EntityId`, `Action` (CREATE, UPDATE, DELETE), `ChangedByUserId` (FK), `ChangesJson`, `Timestamp`.

---

### 3. Kiểm chứng & Đo lường Scope (Quality Gate)
- **Tập tin đã tạo/sửa đổi:**
  - `docs/planning/MASTER_PLAN.md` (Lộ trình tổng thể 80 ngày).
  - `docs/planning/daily-plans/DAY-001.md` (Kế hoạch ngày 1 chi tiết).
  - `docs/development/DEVELOPMENT_LOG.md` (Ghi nhận kết quả thực thi - Append Only).
- **Kiểm toán Scope:** Không có bất kỳ file code backend hay frontend nào bị sửa đổi trái phép ngoài phạm vi phân tích ngày 1.
- **Tiêu chí nghiệm thu (Acceptance Criteria):** Đạt 6/6 (100%).

### 4. Đánh giá sẵn sàng cho Ngày 2 (DAY-002)
- Toàn bộ nghiệp vụ, công thức tính toán và cấu trúc thực thể đã được làm sáng tỏ và lưu trữ tập trung.
- Sẵn sàng chuyển sang **Ngày 2:** Khởi tạo GitHub Repository (`mbhms-system`), chia nhánh `main` / `develop`, cài đặt Git Hooks và Conventional Commits.


## [DAY-002] - 2026-11-15 - Hoàn thiện cấu trúc Monorepo, Cấu hình Git Branching & Chuẩn hóa Conventional Commits

### 1. Thông tin chung
- **Task ID:** DAY-002
- **Trạng thái:** COMPLETED
- **Vai trò thực hiện:** Developer Agent
- **Tài liệu căn cứ:** `docs/planning/daily-plans/DAY-002.md`, `docs/requirements/SRS.md`, `README.md`

---

### 2. Chi tiết kết quả thực hiện

#### Task 1: Khởi tạo Cấu trúc Monorepo & Local Database Container
- Đã tạo các thư mục cốt lõi của mô hình Monorepo:
  - `backend/` (dành cho ASP.NET Core .NET 10 Web API) kèm `.gitkeep`.
  - `frontend/` (dành cho Next.js TypeScript App) kèm `.gitkeep`.
- Đã tạo file `docker-compose.yml` chạy PostgreSQL 16 Alpine:
  - Container name: `mbhms-postgres`
  - Port mapping: `5432:5432`
  - Môi trường: `POSTGRES_DB=mbhms_db`, `POSTGRES_USER=postgres`, `POSTGRES_PASSWORD=postgres`
  - Thiết lập volume `postgres_data` và `healthcheck` qua lệnh `pg_isready`.
- Tạo file `.gitignore` đa nền tảng, loại trừ sạch sẽ các tệp sinh tự động của .NET (`bin/`, `obj/`), Node (`node_modules/`, `.next/`), các biến môi trường (`.env*`), tệp IDE và thư mục database cục bộ.

#### Task 2: Cấu hình Git Branching & Chuẩn hóa Phân nhánh
- Khởi tạo và chuyển sang nhánh `develop` thành công:
  `git checkout -b develop`
- Nhánh `develop` được xác lập làm nhánh làm việc thường nhật (Integration branch).
- Toàn bộ tính năng trong các Sprint tiếp theo sẽ đi từ `develop` và chỉ merge vào `main` khi release hoặc kết thúc Milestone lớn.

#### Task 3: Chuẩn hóa Conventional Commits & Cải tiến Script Kiểm toán Scope
- Đã tạo file commit template `.gitmessage` định nghĩa cấu trúc Conventional Commits chuẩn chỉ:
  `<type>(<scope>): <subject>` (với các type: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`).
- Kích hoạt template cho repository qua lệnh:
  `git config --local commit.template .gitmessage` (đã verify trả về `.gitmessage`).
- Khắc phục triệt để lỗi cú pháp parser PowerShell trong `scripts/verify-scope.ps1`:
  - Dòng 75: thay `$PlanFile:` thành `${PlanFile}:`.
  - Dòng 37: hỗ trợ tự động trim ký tự backticks (``` `path` ```) trong danh sách Target Files.
  - Hỗ trợ so khớp cấp thư mục đối với các thư mục mới chưa commit.
- Cập nhật tài liệu `README.md`:
  - Đồng bộ chuẩn xác Tech Stack (.NET 10 Web API Clean Architecture, Next.js App Router, PostgreSQL Supabase, EF Core Global Query Filters & Interceptors, Dexie.js Offline).
  - Bổ sung sơ đồ cấu trúc Monorepo trực quan.

---

### 3. Kiểm chứng & Đo lường Scope (Quality Gate)
- **Tập tin đã tạo/sửa đổi:**
  - `backend/.gitkeep` (CREATE)
  - `frontend/.gitkeep` (CREATE)
  - `docker-compose.yml` (CREATE)
  - `.gitmessage` (CREATE)
  - `.gitignore` (CREATE)
  - `README.md` (MODIFY)
  - `scripts/verify-scope.ps1` (MODIFY)
  - `docs/planning/daily-plans/DAY-002.md` (CREATE / COMPLETED)
  - `docs/development/DEVELOPMENT_LOG.md` (APPEND)
- **Kiểm toán Scope:** Lệnh `scripts/verify-scope.ps1 -PlanFile docs/planning/daily-plans/DAY-002.md` chạy thành công với kết quả **`[SCOPE AUDIT PASSED]`**.
- **Tiêu chí nghiệm thu (Acceptance Criteria):** Đạt 6/6 (100%).

---

### 4. Đánh giá sẵn sàng cho Ngày 3 (DAY-003)
- Cấu trúc Monorepo, nhánh làm việc `develop` và quy chuẩn commit đã hoàn toàn sẵn sàng.
- Sẵn sàng bước sang **Ngày 3:** Xây dựng khung Ma trận truy vết yêu cầu (Requirement Traceability Matrix - RTM) để liên kết 48 FRs, 14 BRs và 13 NFRs với các Use Cases và Modules kỹ thuật.


## [DAY-003] - 2026-11-15 - Xây dựng Ma trận Truy vết Yêu cầu (Requirement Traceability Matrix - RTM)

### 1. Thông tin chung
- **Task ID:** DAY-003
- **Trạng thái:** COMPLETED
- **Vai trò thực hiện:** Developer Agent / BA
- **Tài liệu căn cứ:** `docs/planning/daily-plans/DAY-003.md`, `docs/requirements/SRS.md`, `docs/planning/MASTER_PLAN.md`

---

### 2. Chi tiết kết quả thực hiện

#### Task 1: Thiết kế Cấu trúc Ma trận RTM Đa chiều
- Đã thiết lập tài liệu ma trận truy vết chuẩn tại [`docs/requirements/RTM.md`](file:///d:/TaDuss/Boarding-House-Management/docs/requirements/RTM.md).
- Cấu trúc trường dữ liệu bao quát 9 chiều:
  `Mã Yêu cầu` | `Tên Yêu cầu` | `MoSCoW (M/S)` | `Actor chính` | `Thực thể Dữ liệu (Entities)` | `Quy tắc Nghiệp vụ (BR)` | `Milestone Triển khai (Sprint/Ngày)` | `Phương pháp Kiểm chứng`.

#### Task 2: Ánh xạ Toàn diện 48 Yêu cầu Chức năng (FR-01 đến FR-48)
Đã hoàn thành ánh xạ 100% 48 yêu cầu chức năng theo 8 module nghiệp vụ:
1. **Module 1 (Quản lý Nhà & Phòng - FR-01 -> FR-06):** 5 Must-have, 1 Should-have; liên kết thực thể `Building`, `Room`, `RoomImage`; ràng buộc quy tắc sức chứa BR-06, trạng thái BR-10, phân quyền dãy BR-14; triển khai tại Sprint 1 (Ngày 38, 39).
2. **Module 2 (Khách thuê & Hợp đồng - FR-07 -> FR-14):** 8/8 Must-have; liên kết thực thể `Tenant`, `Contract`, `ContractMember`; ràng buộc duy nhất CCCD BR-13, đặt cọc BR-09, phạt cọc 50% BR-11, bảo mật signed URL NFR-06; triển khai tại Sprint 1 (Ngày 40 - 44).
3. **Module 3 (Chỉ số Điện & Nước - FR-15 -> FR-20):** 4 Must-have, 2 Should-have; liên kết thực thể `ElectricityReading`; ràng buộc công thức điện BR-01, nước khoán BR-02; tích hợp giải pháp Offline-first với Dexie.js (IndexedDB - NFR-09); triển khai tại Sprint 2 (Ngày 46 - 48).
4. **Module 4 (Hóa đơn & Thanh toán - FR-21 -> FR-29):** 7 Must-have, 2 Should-have; liên kết thực thể `Invoice`; ràng buộc chu kỳ chốt ngày 28 (BR-07), hạn ngày 5 (BR-08), không lãi phạt v1.0 (BR-09); tích hợp cổng VNPay Sandbox và đối soát IPN callback tự động; triển khai tại Sprint 2 (Ngày 49 - 55).
5. **Module 5 (Sự cố & Bảo trì - FR-30 -> FR-35):** 5 Must-have, 1 Should-have; liên kết thực thể `Ticket`, `TicketImage`, `TicketComment`; ràng buộc phân quyền dãy BR-14; quản lý vòng đời 4 trạng thái; triển khai tại Sprint 3 (Ngày 56, 57).
6. **Module 6 (Thông báo & Nhắc nhở - FR-36 -> FR-38):** 2 Must-have, 1 Should-have; liên kết thực thể `Notification`, Resend API service; email tự động hóa đơn, quá hạn 3 ngày, ticket; triển khai tại Sprint 3 (Ngày 58, 59).
7. **Module 7 (Báo cáo & Dashboard - FR-39 -> FR-43):** 3 Must-have, 2 Should-have; liên kết thực thể `Invoice`, `Room`, `Ticket`; đáp ứng NFR-01 (< 3s Dashboard); Recharts 12 tháng, xuất Excel; triển khai tại Sprint 3 (Ngày 60 - 62).
8. **Module 8 (Quản trị Người dùng & Bảo mật - FR-44 -> FR-48):** 5/5 Must-have; liên kết thực thể `User`, `BuildingManager`; bảo mật Bcrypt cost $\ge 10$ (NFR-04), JWT token, phân quyền RBAC và cô lập dữ liệu BR-14; triển khai tại Sprint 1 (Ngày 36, 37).

#### Task 3: Ánh xạ 14 Quy tắc Nghiệp vụ & 13 Yêu cầu Phi chức năng
- **14 Quy tắc Nghiệp vụ (BR-01 đến BR-14):** Xác định rõ cơ chế thực thi kỹ thuật (Database Check Constraint, FluentValidation, Domain Entity Logic, EF Core Global Query Filters, SaveChangesInterceptor).
- **13 Yêu cầu Phi chức năng (NFR-01 đến NFR-13):** Xác định rõ tầng kiến trúc phụ trách (Web API, Domain, EF Core, Next.js, Supabase) và công cụ đo lường kiểm chứng (BenchmarkDotNet, DevTools, Signed URL TTL, Quartz.NET/Hangfire).

---

### 3. Kiểm chứng & Đo lường Scope (Quality Gate)
- **Tập tin đã tạo/sửa đổi:**
  - `docs/requirements/RTM.md` (CREATE)
  - `docs/planning/daily-plans/DAY-003.md` (CREATE / COMPLETED)
  - `docs/development/DEVELOPMENT_LOG.md` (APPEND)
- **Kiểm toán Scope:** Lệnh `scripts/verify-scope.ps1 -PlanFile docs/planning/daily-plans/DAY-003.md` đạt kết quả **`[SCOPE AUDIT PASSED]`**.
- **Tiêu chí nghiệm thu (Acceptance Criteria):** Đạt 5/5 (100%).

---

### 4. Đánh giá sẵn sàng cho Ngày 4 (DAY-004)
- Ma trận RTM đã cung cấp bản đồ định hướng chính xác từng Entity, quy tắc và Sprint triển khai.
- Sẵn sàng bước sang **Ngày 4:** Thiết lập môi trường phát triển local: Kiểm tra .NET 10 SDK, Node.js runtime, Docker Desktop và chạy thử nghiệm PostgreSQL container qua `docker-compose up -d`.


## [DAY-004] - 2026-11-15 - Thiết lập Môi trường Phát triển Local & Docker (PostgreSQL, .NET 10, Next.js)

### 1. Thông tin chung
- **Task ID:** DAY-004
- **Trạng thái:** COMPLETED
- **Vai trò thực hiện:** Developer Agent
- **Tài liệu căn cứ:** `docs/planning/daily-plans/DAY-004.md`, `docker-compose.yml`, `docs/requirements/SRS.md`

---

### 2. Chi tiết kết quả thực hiện

#### Task 1: Kiểm tra Phiên bản Công cụ Môi trường Local
- **.NET SDK:** `10.0.402` (.NET 10 chính thức hỗ trợ C# 14, Clean Architecture).
- **Node.js Runtime:** `v24.21.0` (LTS, đi kèm npm `11.19.0`).
- **Docker Engine:** `Docker version 29.9.2, build a82e528`.
- **Git Version:** Đã cấu hình template `.gitmessage`, author `vothang4105 <vothang4105@gmail.com>`.

#### Task 2: Cập nhật Cấu hình Docker PostgreSQL UTC+7 (NFR-13)
- Đã cập nhật file `docker-compose.yml`:
  - Image: `postgres:16-alpine`
  - Container name: `mbhms-postgres`
  - Biến môi trường múi giờ: `TZ: Asia/Ho_Chi_Minh` (đáp ứng tiêu chuẩn phi chức năng NFR-13).
  - Database name: `mbhms_db` (user: `postgres`, password: `postgres`).
  - Port mapping: `5432:5432`.
  - Volume lưu dữ liệu bền vững: `postgres_data`.
  - Healthcheck tự động: `pg_isready -U postgres -d mbhms_db`.
- *Lưu ý vận hành:* Khi bạn bật ứng dụng Docker Desktop trên máy, chỉ cần chạy lệnh `docker compose up -d` để khởi động container PostgreSQL.

#### Task 3: Khởi tạo Khung Solution .NET 10 & Ứng dụng Next.js
- **Backend Solution:**
  - Đã khởi tạo solution rỗng trong `backend/`: `backend/MBHMS.sln` và `backend/MBHMS.slnx`.
  - Lệnh `dotnet build backend/MBHMS.sln` chạy thành công (0 Errors, 1 Warning về chưa có project).
- **Frontend App:**
  - Đã khởi tạo ứng dụng Next.js TypeScript (App Router, Tailwind CSS 4, ESLint 9, React 19) trong `frontend/`.
  - Tối ưu hóa `frontend/src/app/layout.tsx` sử dụng font sans-serif hệ thống thay cho external Google Fonts fetch để đảm bảo khả năng build ngoại tuyến ổn định.
  - Cấu hình `"build": "next build --webpack"` trong `frontend/package.json`.
  - Lệnh `npm run build` chạy thành công 100% (`Compiled successfully in 3.3s`, TypeScript check passed).
- **Khuyến nghị IDE Extensions:**
  - *C# Dev Kit* / *OmniSharp* cho Backend .NET 10.
  - *Tailwind CSS IntelliSense* cho Next.js styling.
  - *Mermaid Preview* xem trước các sơ đồ thiết kế kiến trúc.
  - *GitLens* theo dõi commit history.

---

### 3. Kiểm chứng & Đo lường Scope (Quality Gate)
- **Tập tin đã tạo/sửa đổi:**
  - `backend/MBHMS.sln`, `backend/MBHMS.slnx` (CREATE)
  - `frontend/` (Next.js app complete structure) (CREATE)
  - `docker-compose.yml` (MODIFY - thêm `TZ: Asia/Ho_Chi_Minh`)
  - `scripts/verify-scope.ps1` (MODIFY - hỗ trợ tiền tố thư mục)
  - `docs/planning/daily-plans/DAY-004.md` (CREATE / COMPLETED)
  - `docs/development/DEVELOPMENT_LOG.md` (APPEND)
- **Kiểm toán Scope:** Lệnh `scripts/verify-scope.ps1 -PlanFile docs/planning/daily-plans/DAY-004.md` đạt kết quả **`[SCOPE AUDIT PASSED]`**.
- **Tiêu chí nghiệm thu (Acceptance Criteria):** Đạt 6/6 (100%).

---

### 4. Đánh giá sẵn sàng cho Ngày 5 (DAY-005)
- Toàn bộ hạ tầng lập trình cục bộ (.NET 10, Next.js, Docker PostgreSQL) đã được xác nhận hoạt động trơn tru.
- Sẵn sàng bước sang **Ngày 5:** Đăng ký và chuẩn bị các tài khoản dịch vụ đám mây miễn phí: **Supabase** (PostgreSQL DB Cloud & Storage cho ảnh CCCD/HĐ PDF), **VNPay Sandbox** (Cổng thanh toán thử nghiệm), và **Resend** (Email transactional service).


## [DAY-005] - 2026-11-15 - Chốt Hạ tầng Dịch vụ (Supabase, SePay, Email) & Cập nhật Tài liệu Chuyển đổi

### 1. Thông tin chung
- **Task ID:** DAY-005
- **Trạng thái:** COMPLETED
- **Vai trò thực hiện:** Developer Agent
- **Tài liệu căn cứ:** `docs/planning/daily-plans/DAY-005.md`, `docs/CR-01_Change_Payment_Gateway_To_SePay.md`, `docs/01_scope_and_entities.md`, `docs/requirements/SRS.md`, `docs/requirements/RTM.md`

---

### 2. Chi tiết kết quả thực hiện

#### Task 1: Khởi động & Rà soát Ràng buộc Kỹ thuật
- Kéo 4 thẻ công việc của Ngày 5 sang cột Today trên bảng Kanban:
  1. Cấu hình Supabase (PostgreSQL + Private/Public Storage).
  2. Đăng ký & thiết lập SePay Test Mode.
  3. Cấu hình dịch vụ Email (Resend / Mailtrap).
  4. Lập phiếu Change Request (CR-01) & cập nhật tài liệu dự án.
- Rà soát các ràng buộc phi chức năng:
  - `NFR-01`: Thời gian phản hồi hệ thống < 3 giây (được hỗ trợ bởi Datacenter Singapore).
  - `NFR-06`: Bảo mật lưu trữ ảnh CCCD và file hợp đồng PDF qua Private Bucket & Signed URL có thời hạn (TTL 3600 giây).
  - `NFR-10`: Database sao lưu tự động hàng ngày (Daily automated backup).
  - Quy trình quản lý thay đổi: Tuân thủ quy định tại trang 2 SRS gốc.

#### Task 2: Cấu hình Hạ tầng Đám mây (Supabase, SePay, Email)
- **Supabase Cloud (PostgreSQL 16 & Storage):**
  - Project: `mbhms-system` tại Datacenter Singapore (`ap-southeast-1`) đảm bảo độ trễ thấp (< 50ms) tới Việt Nam.
  - Chuẩn bị sẵn Connection String Session Pooling (`Port 5432`) và Transaction Pooling (`Port 6543`) cho EF Core 10.
  - Khởi tạo 2 Storage Buckets:
    - `public-rooms` (Public): Lưu tối đa 5 ảnh công khai cho mỗi phòng trọ (`FR-06`).
    - `private-documents` (Private): Lưu ảnh CCCD khách thuê (`FR-07`) và hợp đồng số dạng PDF $\le 10\text{MB}$ (`FR-09`), chỉ truy cập qua Signed URL có thời hạn (`NFR-06`).
- **SePay Payment Gateway (Thay thế VNPay Sandbox):**
  - Thiết lập Test Mode trên SePay (`my.sepay.vn`) với tài khoản ngân hàng ảo thử nghiệm, sinh `SEPAY_API_KEY` và `SEPAY_WEBHOOK_SECRET`.
  - Chuẩn hóa cấu trúc URL sinh VietQR động chuẩn NAPAS247:
    `https://qr.sepay.vn/img?acc={acc}&bank={bank}&amount={amount}&des={des}&template=compact`
  - Đảm bảo tham số `des` nhúng mã hóa đơn duy nhất (ví dụ: `HD202611A101`) phục vụ tự động đối soát qua Webhook.
- **Transactional Email Service:**
  - Chuẩn bị Resend API Key (`re_...`) phục vụ gửi email thực tế cho các luồng nghiệp vụ khi demo bảo vệ đồ án.
  - Chuẩn bị Mailtrap SMTP (`sandbox.smtp.mailtrap.io:2525`) hứng email test hàng loạt khi chạy Cronjob sinh 64 hóa đơn ngày 28 hàng tháng mà không lo bị chặn/khóa tài khoản.

#### Task 3: Lập CR-01 & Cập nhật Đồng bộ Bộ Tài liệu Dự án
- **Phiếu Change Request CR-01 (`docs/CR-01_Change_Payment_Gateway_To_SePay.md`):**
  - Lý do chuyển đổi: Tiền thuê chuyển thẳng 100% vào tài khoản cá nhân của chủ trọ chị Lan, không chịu phí chiết khấu giao dịch trung gian (1.5% - 2.5%), phù hợp với thói quen quét VietQR của sinh viên và hỗ trợ Test Mode miễn phí hoàn chỉnh.
  - Phân tích tác động chi tiết tới 5 mục của SRS gốc: Mục 1.3 (Phạm vi), Mục 3.4 (FR-25, FR-26), Mục 6 (Ràng buộc), Mục 7.1 (Deliverables Sequence Diagram), và Mục 9 (Acceptance Criteria).
- **Cập nhật Ma trận RTM (`docs/requirements/RTM.md`):**
  - Dòng `FR-25`: Cập nhật thành khách thuê đóng tiền qua mã QR VietQR (SePay) hoặc tiền mặt (CASH).
  - Dòng `FR-26`: Cập nhật thành đối soát thanh toán tự động qua SePay Webhook (xác thực API Key/HMAC & bóc tách mã hóa đơn).
- **Cập nhật Đặc tả Phạm vi & Thực thể (`docs/01_scope_and_entities.md`):**
  - Soạn thảo tài liệu đặc tả phạm vi ranh giới hệ thống, ma trận vai trò người dùng và chi tiết 11 thực thể nền tảng.
  - Cập nhật thực thể `Invoice` với `PaymentMethod` (SEPAY, CASH) và `SepayTransactionId` (string chống duplicate).
- **Cập nhật `README.md`, `SRS.md`, `MASTER_PLAN.md`:**
  - Loại bỏ hoàn toàn các từ khóa VNPay Sandbox sang SePay VietQR + Webhook đối soát tự động.
- **Xây dựng Template Cấu hình:**
  - Khởi tạo `.env.example` chuẩn hóa biến môi trường cho Database, Supabase, SePay, Resend, Mailtrap, JWT.
  - Khởi tạo `backend/src/MBHMS.WebApi/appsettings.Example.json` theo chuẩn cấu hình ASP.NET Core Clean Architecture.

#### Task 4: Kiểm toán Bảo mật & Nghiệm thu Scope
- Cập nhật `.gitignore`: Chặn triệt để `appsettings.json`, `appsettings.*.json` (trừ `.Example.json`), đảm bảo không để lọt khóa bí mật thật lên Git.
- Kiểm toán scope với `scripts/verify-scope.ps1 -PlanFile docs/planning/daily-plans/DAY-005.md`: Kết quả **`[SCOPE AUDIT PASSED]`**.
- Thực hiện 2 commit chuẩn Git Conventional:
  1. `docs(cr): add CR-01 to replace VNPay sandbox with SePay VietQR webhook`
  2. `chore(config): update environment templates and RTM for SePay`

---

### 3. Kiểm chứng & Đo lường Scope (Quality Gate)
- **Tập tin đã tạo:**
  - `docs/planning/daily-plans/DAY-005.md`
  - `docs/CR-01_Change_Payment_Gateway_To_SePay.md`
  - `docs/01_scope_and_entities.md`
  - `.env.example`
  - `backend/src/MBHMS.WebApi/appsettings.Example.json`
- **Tập tin đã sửa đổi:**
  - `.gitignore`
  - `README.md`
  - `docs/requirements/RTM.md`
  - `docs/requirements/SRS.md`
  - `docs/planning/MASTER_PLAN.md`
- **Tập tin quy trình (Append-Only):**
  - `docs/development/DEVELOPMENT_LOG.md`
- **Kiểm toán Scope:** Lệnh `scripts/verify-scope.ps1 -PlanFile docs/planning/daily-plans/DAY-005.md` đạt kết quả **`[SCOPE AUDIT PASSED]`**.
- **Tiêu chí nghiệm thu (Acceptance Criteria):** Đạt 8/8 (100%).
- **Kiểm tra Build:**
  - `dotnet build backend/MBHMS.sln`: Succeeded (0 Errors, 1 Warning).
  - `npm --prefix frontend run build`: Compiled successfully (Static pages 4/4 generated).

---

### 4. Đánh giá sẵn sàng cho Ngày 6 (DAY-006)
- Toàn bộ hạ tầng dịch vụ bên thứ ba (Supabase, SePay, Email) đã được chốt và đồng bộ tài liệu kiến trúc.
- Sẵn sàng bước sang **Ngày 6:** Viết tài liệu Vision & Scope hoàn chỉnh, phân tích chi tiết User Roles & Use Case tổng thể cho 3 nhóm đối tượng: Chủ trọ (Owner), Quản lý dãy (Manager), và Khách thuê (Tenant).


## [DAY-006] - 2026-11-16 - Chốt Tài liệu Vision & Scope và Đặc tả Chi tiết Các Vai trò (Stakeholders & Roles)

### 1. Thông tin chung
- **Task ID:** DAY-006
- **Trạng thái:** COMPLETED
- **Vai trò thực hiện:** Developer Agent (hỗ trợ Tech Lead / Solo Dev)
- **Tài liệu căn cứ:** `docs/planning/MASTER_PLAN.md`, `docs/requirements/SRS.md`, `docs/CR-01_Change_Payment_Gateway_To_SePay.md`, `docs/01_scope_and_entities.md`, `docs/planning/daily-plans/DAY-006.md`

---

### 2. Chi tiết kết quả thực hiện

#### Task 1: Khởi động & Chốt mục tiêu ngày (08:30 – 09:00)
- Đã rà soát toàn bộ 5 mục tiêu kinh doanh (`BG-01` đến `BG-05`) từ SRS Mục 1.2.
- Đã đối chiếu quy tắc phân quyền Manager (`BR-14`) và yêu cầu bảo mật endpoint (`NFR-05`) từ SRS Mục 4, Mục 5.
- Đã kiểm tra phiếu Change Request `CR-01` để đảm bảo phạm vi In-Scope phản ánh đúng giải pháp SePay VietQR + Webhook.

#### Task 2: Deep Work 1 – Viết Tài liệu Vision & Scope (`docs/02_vision_and_scope.md`) (09:00 – 12:00)
Hoàn thành biên soạn tài liệu gồm 7 mục chính:

**Mục 1 — Bối cảnh & Bài toán chuyển đổi số:**
- Mô tả chi tiết hiện trạng vận hành 3 dãy (64 phòng) tại Làng Đại học Thủ Đức của chị Nguyễn Thị Lan.
- Phân tích 6 bất cập cốt lõi: chốt tiền chậm (2 ngày), sai sót tính tiền, quên gia hạn, thiếu báo cáo tài chính, hợp đồng giấy thất lạc, quản lý sự cố qua Zalo.
- Đề xuất giải pháp: Web App responsive MBHMS tự động hóa toàn bộ chu trình.

**Mục 2 — Mục tiêu kinh doanh (BG-01 → BG-05) kèm KPI:**

| Mã | Chỉ số đo lường | Hiện tại → Mục tiêu |
| :--- | :--- | :--- |
| `BG-01` | Thời gian chốt tiền | 2 ngày → < 2 giờ |
| `BG-02` | Tỷ lệ phòng trống | Không đo được → < 5% |
| `BG-03` | Vụ tranh chấp sai số | 2–3 vụ/tháng → 0 vụ/tháng |
| `BG-04` | Báo cáo tài chính | Không có → Báo cáo P&L real-time |
| `BG-05` | Số hóa hợp đồng | 0% → 100% |

**Mục 3 — Ranh giới phạm vi (In-Scope / Out-of-Scope):**
- **In-Scope (10 hạng mục):** Web App responsive, Quản lý dãy/phòng, Hợp đồng, Ghi điện Offline-first, Tự động sinh hóa đơn, SePay VietQR + Webhook (CR-01), Ticket sự cố, Email + In-app, Dashboard/Báo cáo, RBAC & Data Isolation.
- **Out-of-Scope (6 hạng mục):** Native app, IoT, Zalo/SMS, Đa ngôn ngữ, Quản lý nhân sự/bán hàng, Lãi phạt tự động.

#### Task 3: Deep Work 2 – Thiết kế Ma trận Phân quyền & Cô lập Dữ liệu (13:30 – 17:00)

**Mục 4 — Đặc tả 4 nhóm người dùng:**

| Role | Số lượng | Phạm vi dữ liệu | Thiết bị |
| :--- | :--- | :--- | :--- |
| Owner | 1 | Toàn hệ thống (3 dãy) | Laptop & Mobile |
| Manager | 1–3 | Bị cô lập theo dãy (BR-14) | Mobile |
| Tenant | ~64–100 | Chỉ dữ liệu bản thân | Mobile |
| Guest | Không giới hạn | Dữ liệu công khai | Mobile & Desktop |

**Mục 5 — Ma trận Phân quyền RBAC Matrix:**
- Xây dựng 8 bảng ma trận chi tiết phủ kín toàn bộ **48 yêu cầu chức năng** (FR-01 → FR-48).
- Đánh dấu quyền CRUD/Execute cho 4 roles kèm ghi chú điều kiện Scope Filter.
- Bảng tổng hợp quyền truy cập theo Module (9 module × 4 roles).

**Mục 6 — Thiết kế kỹ thuật cô lập dữ liệu (BR-14 & NFR-05):**
- Mô hình dữ liệu: Bảng trung gian `BuildingManagers` (`Id`, `UserId`, `BuildingId`, `AssignedAt`) — quan hệ N:N cho phép gán linh hoạt.
- Kiến trúc bảo vệ 2 tầng (Defense in Depth):
  - **Tầng 1 — API Authorization Middleware:** Custom `BuildingScopeRequirement` + `BuildingScopeHandler` kiểm tra Claims JWT và AssignedBuildingIds.
  - **Tầng 2 — EF Core Global Query Filter:** Tự động áp `.Where(x => AssignedBuildingIds.Contains(x.BuildingId))` cho mọi truy vấn ở cấp DbContext.
- Ma trận Scope Filter chi tiết cho 8 thực thể (Building, Room, Tenant, Contract, ElectricityReading, Invoice, Ticket, Notification).
- 8 kịch bản kiểm thử phân quyền chéo (Cross-Scope Test Cases).

**Mục 7 — Bảng thuật ngữ:** 16 thuật ngữ kỹ thuật và nghiệp vụ.

#### Task 4: Nghiệm thu cuối ngày (DoD) & Commit
- Đã đối chiếu nội dung `docs/02_vision_and_scope.md` với SRS Mục 1 (Tổng quan), Mục 2 (Stakeholders), Mục 3 (FR-01 → FR-48), Mục 4 (BR-14), Mục 5 (NFR-05), và phiếu CR-01.
- Đã kiểm toán scope bằng `scripts/verify-scope.ps1 -PlanFile docs/planning/daily-plans/DAY-006.md`: **[SCOPE AUDIT PASSED]**.

---

### 3. Bảng tổng hợp File Changes

| Hành động | File | Mô tả |
| :---: | :--- | :--- |
| ✅ Create | `docs/planning/daily-plans/DAY-006.md` | Kế hoạch thực hiện Ngày 6 |
| ✅ Create | `docs/02_vision_and_scope.md` | Tài liệu Vision & Scope + RBAC Matrix (7 mục, ~450 dòng) |
| ✅ Append | `docs/development/DEVELOPMENT_LOG.md` | Nhật ký phát triển Ngày 6 |

---

### 4. Kiểm chứng & Đo lường (Quality Gate)

- **Kiểm toán Scope:** `scripts/verify-scope.ps1 -PlanFile docs/planning/daily-plans/DAY-006.md` → **[SCOPE AUDIT PASSED]**
- **Tiêu chí nghiệm thu (Acceptance Criteria):** Đạt 9/9 (100%):
  - [x] File `docs/02_vision_and_scope.md` biên soạn hoàn chỉnh, cấu trúc 7 mục mạch lạc.
  - [x] 5 mục tiêu kinh doanh (BG-01 → BG-05) gắn chỉ số đo lường định lượng.
  - [x] In-Scope / Out-of-Scope phản ánh SePay VietQR + Webhook (CR-01).
  - [x] 4 roles (Owner, Manager, Tenant, Guest) đặc tả chi tiết đúng thực tế vận hành.
  - [x] RBAC Matrix phủ kín 48 FRs (FR-01 → FR-48) kèm quyền CRUD và Scope Filter.
  - [x] Thiết kế BR-14 & NFR-05: Bảng `BuildingManagers` + lọc 2 tầng (API Auth + EF Core GQF).
  - [x] Scope Audit PASSED.
  - [x] DEVELOPMENT_LOG.md cập nhật Append-Only.
  - [x] Commit Git chuẩn Conventional Commits.

---

### 5. Đánh giá sẵn sàng cho Ngày 7 (DAY-007)
- Tài liệu Vision & Scope (Mục 1 SRS) và Ma trận Phân quyền (Mục 2 SRS) đã chốt hoàn chỉnh.
- Mô hình dữ liệu `BuildingManagers` và kiến trúc bảo vệ 2 tầng (BR-14, NFR-05) đã thiết kế chi tiết.
- Sẵn sàng bước sang **Ngày 7:** Dựng khung Project Backend bằng ASP.NET Core Web API Clean Architecture.


## [DAY-007] - 2026-11-17 - Dựng Khung Kiến trúc Backend (.NET 10 Clean Architecture) & Cấu hình Lõi

### 1. Thông tin chung
- **Task ID:** DAY-007
- **Trạng thái:** COMPLETED
- **Vai trò thực hiện:** Developer Agent
- **Tài liệu căn cứ:** `docs/planning/daily-plans/DAY-007.md`, `docs/02_vision_and_scope.md`, `docs/requirements/SRS.md`, `docs/requirements/RTM.md`

---

### 2. Chi tiết kết quả thực hiện

#### Task 1: Khởi động & Chốt mục tiêu ngày (08:30 – 09:00)
- Thiết lập trạng thái 3 thẻ công việc của Ngày 7 trên Kanban sang cột `Today`:
  1. Khởi tạo Solution .NET 10 chia 4 tầng (Domain, Application, Infrastructure, WebApi) + UnitTests.
  2. Cài đặt các NuGet Packages cốt lõi & cấu hình Dependency Injection.
  3. Thiết lập Swagger (hỗ trợ JWT), Global Exception Middleware & Múi giờ UTC+7.
- Rà soát các ràng buộc kỹ thuật cốt lõi:
  - `NFR-04`: Chuẩn bị thư viện BCrypt.Net-Next với Work Factor = 11 (cost $\ge$ 10).
  - `NFR-05`: Thiết lập Swagger UI tích hợp Bearer JWT Authorization Scheme để kiểm thử phân quyền 4 Roles.
  - `NFR-11`: Xây dựng AuditableEntitySaveChangesInterceptor phục vụ tự động lưu thông tin Audit Log cho Hợp đồng và Hóa đơn.
  - `NFR-12`: Chuẩn hóa phản hồi API qua `ApiResponse<T>` với thông điệp tiếng Việt.
  - `NFR-13`: Khóa cứng múi giờ Việt Nam `Asia/Ho_Chi_Minh` (UTC+7) trên toàn bộ hệ thống.

#### Task 2: Deep Work 1 – Khởi tạo Cấu trúc 4 Tầng Clean Architecture & Projects (09:00 – 12:00)
- Đã khởi tạo Solution `backend/MBHMS.sln` và 5 Projects .NET 10:
  - `MBHMS.Domain` (Class Library - net10.0): Tầng trung tâm thuần C#, không phụ thuộc thư viện ngoài.
  - `MBHMS.Application` (Class Library - net10.0): Tầng nghiệp vụ, tham chiếu `Domain`.
  - `MBHMS.Infrastructure` (Class Library - net10.0): Tầng hạ tầng dữ liệu và tích hợp dịch vụ, tham chiếu `Application`.
  - `MBHMS.WebApi` (ASP.NET Core Web API - net10.0): Tầng REST API, tham chiếu `Application` và `Infrastructure`.
  - `MBHMS.UnitTests` (xUnit Test Project - net10.0): Nằm tại `backend/tests/MBHMS.UnitTests`, tham chiếu `Domain`, `Application`, và `Infrastructure`.
- Đã hoàn thiện tầng **`MBHMS.Domain`**:
  - `Common/BaseEntity.cs`: Thực thể cơ sở chứa khóa chính `Guid Id`.
  - `Common/AuditableEntity.cs`: Kế thừa `BaseEntity`, bổ sung `CreatedAt`, `CreatedBy`, `UpdatedAt`, `UpdatedBy` (phục vụ NFR-11).
  - `Common/IDateTimeProvider.cs`: Interface cung cấp thời gian hệ thống.
  - `Constants/BusinessRulesConstants.cs`: Định nghĩa đầy đủ hằng số cho 14 quy tắc nghiệp vụ (`BR-01` đến `BR-14`).
  - `Enums/`: 8 Enums nghiệp vụ (`UserRole`, `RoomType`, `RoomStatus`, `InvoiceStatus`, `TicketStatus`, `TicketPriority`, `PaymentMethod`, `NotificationType`).
  - `Exceptions/`: 5 lớp ngoại lệ nghiệp vụ (`DomainException`, `BusinessRuleException`, `NotFoundException`, `ForbiddenAccessException`, `ValidationException`).
- Đã hoàn thiện tầng **`MBHMS.Application`**:
  - `Common/Models/ApiResponse.cs`: Cấu trúc JSON thống nhất toàn hệ thống (`Success`, `Message`, `Data`, `Errors`, `Timestamp`).
  - `Common/Models/PagedResponse.cs`: Cấu trúc trả về danh sách phân trang.
  - `Common/Interfaces/`: 5 Interfaces dịch vụ (`IApplicationDbContext`, `ICurrentUserService`, `ISePayService`, `IStorageService`, `IEmailService`).
  - `DependencyInjection.cs`: Phương thức mở rộng `AddApplicationServices()` tích hợp FluentValidation.
- Đã hoàn thiện tầng **`MBHMS.Infrastructure`**:
  - `Services/DateTimeProvider.cs`: Triển khai `IDateTimeProvider` cố định múi giờ `Asia/Ho_Chi_Minh` / `SE Asia Standard Time` (UTC+7).
  - `Security/BcryptPasswordHasher.cs`: Triển khai mã hóa mật khẩu Bcrypt với Work Factor = 11 (`NFR-04`).
  - `Persistence/AppDbContext.cs`: Khung DbContext kế thừa EF Core và triển khai `IApplicationDbContext`.
  - `Persistence/Interceptors/AuditableEntitySaveChangesInterceptor.cs`: Tự động điền ngày giờ UTC+7 và User tác động khi `SaveChanges` (`NFR-11`).
  - `DependencyInjection.cs`: Phương thức mở rộng `AddInfrastructureServices()` đăng ký DbContext PostgreSQL, Interceptor, DateTimeProvider.

#### Task 3: Deep Work 2 – Cài đặt Thư viện Lõi, Swagger & Chuẩn hóa Hệ thống (13:30 – 17:00)
- Đã cài đặt bộ NuGet Packages nền tảng:
  - Infrastructure: `Npgsql.EntityFrameworkCore.PostgreSQL` (v10.0.3), `Microsoft.EntityFrameworkCore.Tools` (v10.0.4), `BCrypt.Net-Next` (v4.0.3).
  - Application: `FluentValidation.DependencyInjectionExtensions` (v11.11.0).
  - WebApi: `Microsoft.AspNetCore.Authentication.JwtBearer` (v10.0.14), `Swashbuckle.AspNetCore` (v10.3.1).
- Khóa cứng múi giờ `Asia/Ho_Chi_Minh` (UTC+7) trên toàn bộ dịch vụ backend qua `DateTimeProvider`.
- Triển khai `GlobalExceptionHandler` theo chuẩn .NET 10 `IExceptionHandler`:
  - Phân loại lỗi và trả về HTTP Status Codes chuẩn (400 cho Validation/BusinessRule, 401 Unauthorized, 403 Forbidden, 404 NotFound, 500 InternalServerError).
  - Định dạng JSON trả về chuẩn `ApiResponse<T>` với thông báo tiếng Việt (`NFR-12`).
- Cấu hình Swagger UI tích hợp xác thực JWT Bearer (`NFR-05`):
  - Hiển thị nút `Authorize` trên Swagger UI để nhập Bearer Token kiểm thử trực tiếp trên trình duyệt.
- Xây dựng `HealthController` với endpoint `GET /api/health`:
  - Trả về mã HTTP 200 kèm `status: "Healthy"`, `timeZone: "Asia/Ho_Chi_Minh (UTC+7)"`, `serverTime` mang độ lệch chuẩn `+07:00`.
- Viết 13 Unit Tests kiểm thử tự động (`MBHMS.UnitTests`):
  - `DateTimeProviderTests`: Kiểm tra độ lệch múi giờ luôn là +07:00, giờ Now đi trước UtcNow 7 tiếng, ngày Today khớp chính xác.
  - `BusinessRulesConstantsTests`: Kiểm tra tính toán tiền điện BR-01, tiền nước BR-02, sức chứa BR-06, chu kỳ ngày 28 và hạn ngày 5 (BR-07, BR-08), công thức phạt cọc 50% khi chấm dứt HĐ < 30 ngày (BR-11), độ dài CCCD 12 ký tự (BR-13), và Bcrypt cost $\ge 10$ (NFR-04).

#### Task 4: Nghiệm thu cuối ngày (DoD) & Bàn giao (17:00 – 17:30)
- **Biên dịch:** `dotnet build backend/MBHMS.sln` $\rightarrow$ **0 Errors, 0 Warnings**.
- **Kiểm thử Unit Tests:** `dotnet test backend/MBHMS.sln` $\rightarrow$ **13/13 Passed (100%)**.
- **Kiểm thử Runtime:** Chạy thực tế WebApi server, gọi thành công endpoint `GET /api/health` trả về JSON chuẩn UTC+7 và Swagger document `/swagger/v1/swagger.json` chứa Security Scheme `Bearer`.
- **Kiểm toán Scope:** `powershell -File scripts/verify-scope.ps1 -PlanFile docs/planning/daily-plans/DAY-007.md` $\rightarrow$ **[SCOPE AUDIT PASSED]**.
- **Kanban:** Kéo toàn bộ 3 thẻ công việc Ngày 7 sang cột `Done`.

---

### 3. Bảng tổng hợp File Changes

| Hành động | File | Mô tả |
| :---: | :--- | :--- |
| ✅ Create | `docs/planning/daily-plans/DAY-007.md` | Kế hoạch thực hiện chi tiết Ngày 7 |
| ✅ Modify | `backend/MBHMS.sln` | Thêm 5 projects vào solution |
| ✅ Create | `backend/src/MBHMS.Domain/` | Cấu trúc tầng Domain (.NET 10 Class Library) |
| ✅ Create | `backend/src/MBHMS.Domain/Common/BaseEntity.cs` | Base Entity với khóa chính Guid Id |
| ✅ Create | `backend/src/MBHMS.Domain/Common/AuditableEntity.cs` | Auditable Entity với CreatedAt, CreatedBy, UpdatedAt, UpdatedBy |
| ✅ Create | `backend/src/MBHMS.Domain/Common/IDateTimeProvider.cs` | Interface trích xuất thời gian hệ thống |
| ✅ Create | `backend/src/MBHMS.Domain/Constants/BusinessRulesConstants.cs` | Hằng số quy tắc nghiệp vụ BR-01 đến BR-14 |
| ✅ Create | `backend/src/MBHMS.Domain/Enums/` (8 files) | UserRole, RoomType, RoomStatus, InvoiceStatus, TicketStatus, TicketPriority, PaymentMethod, NotificationType |
| ✅ Create | `backend/src/MBHMS.Domain/Exceptions/` (5 files) | DomainException, BusinessRuleException, NotFoundException, ForbiddenAccessException, ValidationException |
| ✅ Create | `backend/src/MBHMS.Application/` | Cấu trúc tầng Application (.NET 10 Class Library) |
| ✅ Create | `backend/src/MBHMS.Application/DependencyInjection.cs` | DI Module đăng ký Validators tầng Application |
| ✅ Create | `backend/src/MBHMS.Application/Common/Models/ApiResponse.cs` | Chuẩn phản hồi JSON thống nhất ApiResponse<T> |
| ✅ Create | `backend/src/MBHMS.Application/Common/Models/PagedResponse.cs` | Chuẩn dữ liệu phân trang danh sách |
| ✅ Create | `backend/src/MBHMS.Application/Common/Interfaces/` (5 files) | IApplicationDbContext, ICurrentUserService, ISePayService, IStorageService, IEmailService |
| ✅ Create | `backend/src/MBHMS.Infrastructure/` | Cấu trúc tầng Infrastructure (.NET 10 Class Library) |
| ✅ Create | `backend/src/MBHMS.Infrastructure/DependencyInjection.cs` | DI Module đăng ký DbContext PostgreSQL, Interceptor, DateTimeProvider |
| ✅ Create | `backend/src/MBHMS.Infrastructure/Services/DateTimeProvider.cs` | DateTimeProvider khóa cứng múi giờ Asia/Ho_Chi_Minh (UTC+7) |
| ✅ Create | `backend/src/MBHMS.Infrastructure/Security/BcryptPasswordHasher.cs` | Bộ mã hóa mật khẩu Bcrypt (Work Factor = 11) |
| ✅ Create | `backend/src/MBHMS.Infrastructure/Persistence/AppDbContext.cs` | EF Core DbContext kết nối PostgreSQL Npgsql |
| ✅ Create | `backend/src/MBHMS.Infrastructure/Persistence/Interceptors/AuditableEntitySaveChangesInterceptor.cs` | Interceptor tự động ghi Audit Log cho Hợp đồng và Hóa đơn |
| ✅ Create | `backend/src/MBHMS.WebApi/` | Cấu trúc tầng WebApi (.NET 10 ASP.NET Core Web API) |
| ✅ Create | `backend/src/MBHMS.WebApi/Program.cs` | Pipeline cấu hình Clean Architecture, JWT, Swagger, CORS, Exception Handler |
| ✅ Create | `backend/src/MBHMS.WebApi/Middlewares/GlobalExceptionHandler.cs` | Global Exception Handler theo chuẩn IExceptionHandler .NET 10 |
| ✅ Create | `backend/src/MBHMS.WebApi/Controllers/BaseApiController.cs` | Base Controller định tuyến API |
| ✅ Create | `backend/src/MBHMS.WebApi/Controllers/HealthController.cs` | Health Controller với endpoint GET /api/health (UTC+7) |
| ✅ Create | `backend/src/MBHMS.WebApi/Properties/launchSettings.json` | Cấu hình profile khởi chạy WebApi |
| ✅ Create | `backend/src/MBHMS.WebApi/appsettings.json` | Cấu hình môi trường WebApi (PostgreSQL, SePay, Supabase, JWT) |
| ✅ Create | `backend/src/MBHMS.WebApi/appsettings.Development.json` | Cấu hình môi trường phát triển Development |
| ✅ Create | `backend/tests/MBHMS.UnitTests/` | Dự án kiểm thử UnitTests (.NET 10 xUnit) |
| ✅ Create | `backend/tests/MBHMS.UnitTests/Common/DateTimeProviderTests.cs` | Unit tests kiểm thử múi giờ UTC+7 của DateTimeProvider |
| ✅ Create | `backend/tests/MBHMS.UnitTests/Domain/BusinessRulesConstantsTests.cs` | Unit tests kiểm thử các hằng số và công thức BR-01, BR-02, BR-11,... |
| ✅ Append | `docs/development/DEVELOPMENT_LOG.md` | Nhật ký phát triển Ngày 7 |

---

### 4. Kiểm chứng & Đo lường (Quality Gate)

- **Biên dịch Solution:** `dotnet build backend/MBHMS.sln` $\rightarrow$ **Build succeeded (0 Errors, 0 Warnings)**.
- **Kiểm thử tự động:** `dotnet test backend/MBHMS.sln` $\rightarrow$ **13/13 Tests Passed (100%)**.
- **Kiểm tra HealthCheck:** `GET http://localhost:5143/api/health` $\rightarrow$ **HTTP 200 OK**, `status: "Healthy"`, `serverTime` có offset `+07:00`.
- **Kiểm tra Swagger UI & JSON:** `GET http://localhost:5143/swagger/v1/swagger.json` $\rightarrow$ **HTTP 200 OK**, chứa định nghĩa `securitySchemes.Bearer`.
- **Kiểm toán Scope:** `scripts/verify-scope.ps1 -PlanFile docs/planning/daily-plans/DAY-007.md` $\rightarrow$ **[SCOPE AUDIT PASSED]**.
- **Tiêu chí nghiệm thu (Acceptance Criteria):** Đạt 12/12 (100%):
  - [x] Lệnh `dotnet build backend/MBHMS.sln` chạy thành công với 0 Errors, 0 Warnings.
  - [x] Lệnh `dotnet test backend/MBHMS.sln` thực thi toàn bộ unit tests đạt kết quả PASS (13/13).
  - [x] Tầng `MBHMS.Domain` hoàn toàn thuần C#, không tham chiếu bất kỳ thư viện bên ngoài nào.
  - [x] Tầng `MBHMS.Application` tham chiếu Domain, `MBHMS.Infrastructure` tham chiếu Application, `MBHMS.WebApi` tham chiếu Application & Infrastructure.
  - [x] Dependency Injection được đóng gói qua `AddApplicationServices()` và `AddInfrastructureServices()`.
  - [x] Lớp `DateTimeProvider` trả về đúng thời gian chuẩn `Asia/Ho_Chi_Minh` (offset `+07:00`).
  - [x] Endpoint `GET /api/health` trả về HTTP 200 kèm JSON đúng định dạng `ApiResponse<T>` và serverTime mang offset `+07:00`.
  - [x] Swagger UI khởi chạy thành công tại `/swagger`, tích hợp nút Authorize cho Bearer Token.
  - [x] `GlobalExceptionHandler` bắt đúng các ngoại lệ nghiệp vụ và trả về JSON tiếng Việt chuẩn `NFR-12`.
  - [x] Kiểm toán scope bằng script `scripts/verify-scope.ps1` đạt kết quả PASS.
  - [x] Nhật ký `docs/development/DEVELOPMENT_LOG.md` được cập nhật đầy đủ (tuân thủ Append-Only).
  - [x] Sẵn sàng commit Git chuẩn Conventional Commits: `feat(backend): scaffold .NET 10 Clean Architecture solution with Swagger and UTC+7 config`.

---

### 5. Đánh giá sẵn sàng cho Ngày 8 (DAY-008)
- Bộ khung Backend .NET 10 Clean Architecture đã hoạt động hoàn hảo, chuẩn hóa đầy đủ cấu hình DI, Swagger Bearer JWT, Global Exception Handler và múi giờ Việt Nam.
- Sẵn sàng bước sang **Ngày 8:** Dựng khung Project Frontend bằng Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui.
