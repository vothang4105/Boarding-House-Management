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
