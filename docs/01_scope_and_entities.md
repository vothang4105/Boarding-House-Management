# MBHMS - ĐẶC TẢ PHẠM VI DỰ ÁN & MÔ HÌNH THỰC THỂ CỐT LÕI
# (Scope, System Boundaries & Core Domain Entities)

> **Dự án:** Mini Boarding House Management System (MBHMS)  
> **Khách hàng:** Chị Nguyễn Thị Lan (Chủ nhà trọ 3 dãy - 64 phòng tại Làng Đại học Thủ Đức, TP.HCM)  
> **Phiên bản:** 1.1 (Đã cập nhật theo CR-01 - Tích hợp SePay VietQR & Webhook)  
> **Ngày cập nhật:** 2026-11-15  

---

## 1. Bối cảnh & Tuyên ngôn Phạm vi (Project Scope Statement)

Hệ thống Quản lý Nhà trọ Mini (MBHMS) được xây dựng nhằm tin học hóa và tự động hóa toàn bộ chu trình quản lý 3 dãy nhà trọ gồm 64 phòng cho thuê đối tượng chính là sinh viên. Hệ thống hướng tới việc giảm thiểu thời gian chốt tiền cuối tháng từ 2 ngày xuống dưới 2 giờ, ngăn ngừa sai sót tính tiền, nâng cao tính minh bạch và cung cấp báo cáo doanh thu tức thời.

### 1.1. Phạm vi Trong hệ thống (In-Scope)
- **Quản lý Danh mục Vật lý & Phòng trọ:** Quản lý 3 dãy trọ (Dãy A, Dãy B, Dãy C) và 64 phòng trọ theo 3 nhóm diện tích/sức chứa: Phòng Đơn (1 người), Phòng Đôi (2 người), Phòng Gia đình (tối đa 4 người). Lưu trữ tối đa 5 ảnh công khai/phòng qua Supabase Storage (`public-rooms`).
- **Quản lý Hợp đồng Thuê & Khách thuê:** Quản lý hợp đồng gắn với 1 người đại diện hợp pháp, khai báo số lượng thành viên, lưu trữ ảnh CCCD và file hợp đồng số dạng PDF ($\le 10\text{MB}$) qua Private Storage (`private-documents`) sử dụng Signed URL có thời hạn (`NFR-06`). Xử lý quy tắc hoàn/phạt tiền cọc khi chấm dứt hợp đồng (`BR-11`).
- **Ghi chỉ số Điện Ngoại tuyến (Offline-First):** Quản lý dãy có thể ghi chỉ số điện trực tiếp trên thiết bị di động ngay cả khi mất sóng/không có Internet (sử dụng IndexedDB trên trình duyệt). Hệ thống tự động đồng bộ lên Server khi có mạng trở lại (`FR-18`, `NFR-09`).
- **Tính toán & Tự động Phát hành Hóa đơn:** Định kỳ ngày 28 hàng tháng, hệ thống tự động chốt chỉ số điện, tính toán tiền điện theo đơn giá cố định 3.500đ/kWh (`BR-01`), cộng tiền nước khoán 100.000đ/người (`BR-02`), internet 50.000đ/người (`BR-03`), rác 20.000đ/phòng (`BR-04`), giữ xe 100.000đ/xe (`BR-05`) cùng tiền phòng cố định để phát hành hóa đơn.
- **Thanh toán Trực tuyến & Đối soát Tự động qua SePay (CR-01):**
  - Tích hợp **SePay VietQR động**: Khách thuê quét mã VietQR tự động điền số tài khoản, số tiền và mã hóa đơn để chuyển khoản ngân hàng 24/7 trực tiếp vào tài khoản cá nhân chủ trọ.
  - Tích hợp **SePay Webhook**: Tự động nhận biến động số dư, xác thực bảo mật, bóc tách mã hóa đơn và chuyển trạng thái hóa đơn sang `PAID` tức thì.
  - Hỗ trợ thanh toán tiền mặt (Cash) cho khách nộp trực tiếp.
- **Quản lý Sự cố & Ticket Hỗ trợ:** Khách thuê gửi ticket kèm tối đa 3 ảnh mô tả sự cố hư hỏng cơ sở vật chất; Quản lý/Chủ trọ tiếp nhận và cập nhật tiến độ xử lý.
- **Hệ thống Thông báo Đa kênh (In-app + Email):** Bắn thông báo chuông in-app và gửi email tự động qua **Resend / Mailtrap** cho các sự kiện: hóa đơn mới, hóa đơn quá hạn 3 ngày, cập nhật tiến độ ticket, kích hoạt tài khoản.
- **Dashboard & Báo cáo:** Chủ trọ theo dõi thời gian thực 4 chỉ số (Doanh thu tháng, Tỷ lệ lấp đầy, Số phòng trống, Số ticket mở) với tốc độ phản hồi < 3 giây (`NFR-01`), biểu đồ cột doanh thu 12 tháng và xuất báo cáo Excel (`FR-43`).
- **Phân quyền & Cô lập Dữ liệu (RBAC & Data Isolation):** Áp dụng Global Query Filter phân tách dữ liệu nghiêm ngặt giữa Chủ trọ (toàn quyền) và Quản lý dãy (chỉ xem/thao tác dữ liệu trên dãy được phân công - `BR-14`).

### 1.2. Phạm vi Loại trừ (Out-of-Scope)
- ❌ Không phát triển ứng dụng di động thuần túy (Native iOS/Android App) — Tập trung tối ưu Web Responsive & PWA chuẩn di động từ 360px trở lên (`NFR-08`).
- ❌ Không tích hợp phần cứng thông minh IoT (đồng hồ điện tử tự truyền dữ liệu số điện).
- ❌ Không tích hợp tin nhắn SMS hoặc Zalo ZNS (chỉ dùng Email và In-app notifications để tiết kiệm chi phí vận hành).
- ❌ Không hỗ trợ đa ngôn ngữ (chỉ hỗ trợ giao diện Tiếng Việt chuẩn VNĐ).
- ❌ Không tính lãi phạt chậm nộp hóa đơn tự động trong phiên bản 1.0 (`BR-09`).

---

## 2. Ma trận Vai trò Người dùng (User Roles Matrix)

| Vai trò (Role) | Mô tả & Trách nhiệm chính | Phạm vi dữ liệu (Scope) | Thiết bị sử dụng |
| :--- | :--- | :--- | :--- |
| **Chủ trọ (Owner)** | Toàn quyền kiểm soát hệ thống: tạo tài khoản quản lý, xem báo cáo doanh thu tổng, cấu hình giá dịch vụ, quản trị toàn bộ 3 dãy trọ. | Toàn hệ thống (Dãy A, B, C) | Laptop & Mobile |
| **Quản lý (Manager)** | Tiếp nhận vận hành dãy trọ được giao: ghi chỉ số điện, xác nhận thu tiền mặt, xử lý ticket sự cố của dãy. Không xem được doanh thu tổng. | Bị cô lập nghiêm ngặt theo dãy được gán (`BR-14`) | Mobile |
| **Khách thuê (Tenant)** | Khách hàng đại diện đứng tên hợp đồng: tra cứu hóa đơn, quét mã VietQR SePay thanh toán, gửi ticket báo sự cố, cập nhật thông tin cá nhân. | Chỉ phòng trọ và hóa đơn của chính mình | Mobile |
| **Khách vãng lai (Guest)** | Xem danh mục phòng trống, giá thuê và thông tin liên hệ thuê phòng. | Công khai (Public) | Mobile / Desktop |

---

## 3. Danh mục 11 Thực thể Dữ liệu Nền tảng (Core Domain Entities)

### 3.1. `User` (Tài khoản người dùng hệ thống)
- **Mục đích:** Quản lý thông tin xác thực, định danh và phân quyền người dùng (Owner, Manager, Tenant).
- **Thuộc tính chính:** `Id` (Guid), `Email` (unique), `PasswordHash` (Bcrypt cost $\ge$ 10), `FullName`, `PhoneNumber`, `Role` (OWNER, MANAGER, TENANT), `IsActive`, `CreatedAt`, `UpdatedAt`.

### 3.2. `Building` (Dãy nhà trọ)
- **Mục đích:** Đại diện cho khối kiến trúc vật lý (Dãy A, Dãy B, Dãy C).
- **Thuộc tính chính:** `Id` (Guid), `Code` (unique: "BLOCK-A", "BLOCK-B", "BLOCK-C"), `Name`, `Address`, `TotalRooms` (tổng 64 phòng), `CreatedAt`.

### 3.3. `BuildingManager` (Bảng liên kết Quản lý - Dãy trọ)
- **Mục đích:** Định danh phân vùng dữ liệu (Data Isolation - `BR-14`). Một Manager có thể được phân công quản lý một hoặc nhiều dãy trọ.
- **Thuộc tính chính:** `Id` (Guid), `UserId` (FK), `BuildingId` (FK), `AssignedDate`.

### 3.4. `Room` (Phòng trọ)
- **Mục đích:** Quản lý thông tin chi tiết từng phòng trọ thuộc các dãy.
- **Thuộc tính chính:** `Id` (Guid), `BuildingId` (FK), `RoomNumber` (vd: "A101"), `RoomType` (SINGLE, DOUBLE, FAMILY), `MaxOccupants` (1, 2, 4), `BasePrice` (VNĐ), `Status` (AVAILABLE, OCCUPIED, MAINTENANCE), `ImageUrls` (tối đa 5 ảnh lưu trên Supabase Storage `public-rooms`).

### 3.5. `Tenant` (Hồ sơ Khách thuê đại diện)
- **Mục đích:** Lưu trữ thông tin định danh công dân của khách đại diện đứng tên ký hợp đồng.
- **Thuộc tính chính:** `Id` (Guid), `UserId` (FK to User, nullable trước khi kích hoạt tài khoản), `FullName`, `CitizenIdNumber` (CCCD duy nhất - `BR-13`), `CitizenIdIssuedDate`, `CitizenIdFrontUrl` (Private Storage Signed URL - `NFR-06`), `CitizenIdBackUrl` (Private Storage Signed URL), `PhoneNumber`, `Email`, `PermanentAddress`, `CreatedAt`.

### 3.6. `Contract` (Hợp đồng thuê phòng)
- **Mục đích:** Ràng buộc pháp lý giữa Chủ trọ và Khách thuê về thời hạn, tiền cọc và điều khoản thuê phòng.
- **Thuộc tính chính:** `Id` (Guid), `ContractCode` (unique), `RoomId` (FK), `RepresentativeTenantId` (FK), `StartDate`, `EndDate`, `DepositAmount` (mặc định 1 tháng tiền phòng - `BR-06`), `MonthlyRent`, `WaterBillingType` (PER_PERSON), `NumberOfOccupants`, `NumberOfVehicles`, `ContractPdfUrl` (Private Storage Signed URL), `Status` (ACTIVE, EXPIRED, TERMINATED), `CreatedAt`.

### 3.7. `ContractMember` (Thành viên lưu trú cùng phòng)
- **Mục đích:** Khai báo danh sách thành viên ở chung phòng để kiểm soát sức chứa (`BR-10`) và tính định mức nước/internet.
- **Thuộc tính chính:** `Id` (Guid), `ContractId` (FK), `FullName`, `CitizenIdNumber`, `PhoneNumber`, `RelationWithRepresentative`.

### 3.8. `ElectricityReading` (Chỉ số điện định kỳ)
- **Mục đích:** Lưu trữ số liệu công tơ điện hàng tháng phục vụ tính hóa đơn, hỗ trợ nhập ngoại tuyến.
- **Thuộc tính chính:** `Id` (Guid), `RoomId` (FK), `BillingMonth` (YYYY-MM), `OldIndex`, `NewIndex`, `Consumption` ($= \text{NewIndex} - \text{OldIndex}$), `RecordedByUserId` (FK), `RecordedAt`, `SyncStatus` (SYNCED, PENDING_SYNC), `ClientTimestamp`.

### 3.9. `Invoice` (Hóa đơn tiền phòng & Dịch vụ) - *Cập nhật theo CR-01*
- **Mục đích:** Bảng tổng hợp công nợ hàng tháng phát hành ngày 28 và thu tiền trước ngày 5.
- **Thuộc tính chính:** 
  - `Id` (Guid)
  - `InvoiceCode` (unique, ví dụ: "HD202611A101")
  - `ContractId` (FK)
  - `RoomId` (FK)
  - `BillingMonth` (YYYY-MM)
  - `RoomCharge`, `ElectricityCharge`, `WaterCharge`, `InternetCharge`, `WasteCharge`, `ParkingCharge`, `AdditionalCharge`
  - `TotalAmount` (VNĐ)
  - `DueDate` (Ngày 5 tháng tiếp theo)
  - `Status` (DRAFT, SENT, PAID, OVERDUE, CANCELLED)
  - `PaidAt` (DateTime nullable)
  - `PaymentMethod` (SEPAY, CASH) *(Thay đổi theo CR-01)*
  - `SepayTransactionId` (string nullable - lưu mã giao dịch của SePay để chống lặp) *(Thay đổi theo CR-01)*
  - `CreatedAt`, `UpdatedAt`

### 3.10. `Ticket` (Sự cố & Yêu cầu sửa chữa)
- **Mục đích:** Kênh tương tác báo hỏng hóc cơ sở vật chất từ khách thuê tới ban quản lý.
- **Thuộc tính chính:** `Id` (Guid), `RoomId` (FK), `CreatedByTenantId` (FK), `Title`, `Description`, `Severity` (LOW, MEDIUM, HIGH, URGENT), `ImageUrls` (tối đa 3 ảnh), `Status` (OPEN, PROCESSING, RESOLVED, CLOSED), `ResolvedAt`, `Rating` (1–5 sao nullable), `CreatedAt`.

### 3.11. `Notification` (Nhật ký thông báo In-app & Email)
- **Mục đích:** Lưu lịch sử phát thông báo phục vụ hiển thị chuông in-app và đối soát gửi email.
- **Thuộc tính chính:** `Id` (Guid), `UserId` (FK), `Title`, `Content`, `Type` (INVOICE, OVERDUE, TICKET, GENERAL), `IsRead`, `IsEmailSent`, `SentAt`.

---

## 4. Kiến trúc Tích hợp Dịch vụ Đám mây (Third-party Integrations)

| Dịch vụ | Nhà cung cấp & Khu vực | Vai trò trong hệ thống MBHMS | Giao thức / Xác thực |
| :--- | :--- | :--- | :--- |
| **Relational Database** | Supabase (PostgreSQL 16) - Singapore (`ap-southeast-1`) | Lưu trữ toàn bộ dữ liệu quan hệ, thực thi ACID, quản lý Foreign Keys, Global Query Filters. | PostgreSQL TCP Connection Pooling (Port 5432 / 6543) |
| **Object Storage** | Supabase Storage | • `public-rooms`: Ảnh phòng công khai.<br>• `private-documents`: Ảnh CCCD và Hợp đồng PDF truy cập qua Signed URL (TTL 1 giờ). | Supabase REST API & Storage Client (S3 Compatible) |
| **Cổng thanh toán & Đối soát** | SePay (VietQR + Webhook) | • Sinh mã VietQR động theo chuẩn NAPAS247.<br>• Tự động bắn Webhook khi khách chuyển tiền để cập nhật `PAID`. | HTTP GET (Sinh ảnh QR) & Inbound HTTP POST Webhook (API Key Secret) |
| **Transactional Email** | Resend (Production) / Mailtrap (Test Cronjob) | Gửi email thông báo tự động (hóa đơn mới, trễ hạn 3 ngày, tài khoản mới, ticket update). | HTTPS REST API (Resend) / SMTP Port 2525 (Mailtrap) |
