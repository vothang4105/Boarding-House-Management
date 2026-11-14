# Mini Boarding House Management System (MBHMS)

Hệ thống Quản lý Nhà trọ Mini (MBHMS) được thiết kế và phát triển nhằm tối ưu hóa toàn bộ quy trình vận hành, quản lý doanh thu, nhân sự và tương tác với khách thuê cho mô hình nhà trọ quy mô vừa và nhỏ. Dự án được cấu hình thực tế dựa trên yêu cầu cụ thể của khách hàng (quy mô 3 dãy - 64 phòng tại Thủ Đức, TP.HCM).

---

## 1. Giới thiệu sơ lược (Project Overview)

MBHMS giải quyết triệt để các hạn chế của phương pháp quản lý nhà trọ thủ công truyền thống (sử dụng sổ sách hoặc file Excel rời rạc) dễ dẫn đến sai sót dữ liệu, thất thoát tài chính và tốn thời gian. 

Hệ thống cung cấp một giải pháp quản lý tập trung trên nền tảng Cloud, đồng thời tối ưu trải nghiệm di động thông qua việc hỗ trợ **ghi số điện ngoại tuyến (Offline Mode)**, tích hợp **thanh toán trực tuyến (VNPay)** và tự động hóa hệ thống **chăm sóc khách hàng (Email Ticket System)**. Quy trình nghiệp vụ được thiết kế chặt chẽ, phân quyền rõ ràng giữa Chủ trọ (Owner) và Người quản lý dãy (Manager), mang lại sự minh bạch và an tâm tuyệt đối cho cả bên cho thuê và khách thuê (Tenant).

---

## 2. Các Tính năng Cốt lõi (System Features)

Hệ thống được chia thành các phân hệ chức năng tương ứng với các nhóm người dùng:

### 2.1. Phân hệ Quản trị & Cấu hình Hệ thống (Chủ trọ - Owner)
* **Quản lý Cơ sở vật chất:** Khởi tạo, chỉnh sửa và quản lý danh mục vật lý gồm Dãy trọ (Block) và Phòng trọ (Room). Cấu hình diện tích, số lượng thành viên tối đa và giá thuê gốc cố định của từng phòng.
* **Quản lý Hợp đồng (Contract Management):** Thiết lập hợp đồng thuê điện tử gắn với Khách đại diện (Tenant), lưu trữ thông tin ngày bắt đầu, ngày kết thúc, tiền đặt cọc và trạng thái hiệu lực của hợp đồng. Tự động chuyển trạng thái phòng sang "Đang thuê" khi kích hoạt hợp đồng.
* **Dashboard Giám sát Toàn diện:** Giao diện trực quan hiển thị thời gian thực (Real-time) 4 chỉ số kinh doanh cốt lõi phục vụ ra quyết định:
    1.  *Doanh thu tháng hiện tại* (Tổng tiền từ các hóa đơn đã thanh toán).
    2.  *Tỷ lệ lấp đầy* (Phòng đang thuê / Tổng số phòng x 100%).
    3.  *Số lượng phòng trống* sẵn sàng đón khách.
    4.  *Số lượng Ticket sự cố chưa xử lý* (Trạng thái OPEN).
* **Quản lý Nhân sự & Phân vùng Dữ liệu:** Tạo tài khoản và phân quyền cho Người quản lý (Manager). Gán quyền quản lý theo từng dãy trọ cụ thể để bảo mật thông tin.

### 2.2. Phân hệ Ghi số điện & Vận hành (Chủ trọ & Người quản lý)
* **Nhập chỉ số điện Offline/Online:** Tính năng MVP cho phép Manager đi kiểm tra và nhập chỉ số điện trực tiếp trên ứng dụng di động ngay cả khi **không có kết nối Internet (Mất mạng)**.
* **Cơ chế Đồng bộ Tự động (Auto-Sync):** Khi thiết bị mất mạng, dữ liệu chỉ số điện được mã hóa và lưu tạm vào bộ nhớ thiết bị (Local Storage) ở trạng thái *Pending Sync*. Khi hệ thống phát hiện có Internet trở lại, một tác vụ ngầm sẽ tự động đồng bộ dữ liệu lên máy chủ Cloud trung tâm.
* **Tính toán & Phát hành Hóa đơn tự động:** Đến cuối chu kỳ hóa đơn quy định (từ ngày 28 tháng này đến ngày 27 tháng sau), hệ thống tự động đối chiếu chỉ số cũ, chỉ số mới, áp đơn giá và cộng tiền phòng cố định trên hợp đồng để sinh hóa đơn tự động, gửi thông báo đến ứng dụng của Khách thuê.

### 2.3. Phân hệ Khách thuê & Thanh toán (Khách thuê - Tenant)
* **Tra cứu hóa đơn định kỳ:** Xem chi tiết bảng phân rã dòng tiền (Tiền phòng, Tiền điện phát sinh, Tổng tiền phải trả) của tháng hiện tại và lịch sử các tháng trước.
* **Tích hợp Cổng thanh toán trực tuyến VNPay:** Tenant nhấn nút "Thanh toán", hệ thống chuyển hướng sang cổng VNPay Sandbox. Tenant thực hiện quét mã QR hoặc nhập tài khoản ngân hàng thử nghiệm để thanh toán. 
* **Cập nhật Trạng thái Tức thời (IPN Callback):** Sau khi giao dịch thành công, hệ thống tiếp nhận tín hiệu IPN tự động từ VNPay, cập nhật trạng thái hóa đơn thành "Đã thanh toán" (PAID), ghi nhận thời gian và gửi biên lai điện tử cho khách.

### 2.4. Phân hệ Tương tác & Xử lý Sự cố (Ticket System)
* **Gửi Ticket báo sự cố:** Khách thuê chụp ảnh, viết mô tả nội dung hư hỏng cơ sở vật chất (ví dụ: hỏng điều hòa, cháy bóng đèn, tắc nước) và gửi lên hệ thống.
* **Hệ thống Thông báo Email tự động:**
    * Ngay khi Khách tạo ticket, hệ thống tự động bắn Email thông báo cho Owner và Manager phụ trách dãy đó.
    * Khi Manager tiếp nhận sửa chữa (Chuyển trạng thái sang *PROCESSING*) hoặc hoàn thành (Chuyển sang *RESOLVED*), hệ thống tự động gửi Email cập nhật tiến độ cho Khách thuê an tâm.

### 2.5. Ràng buộc Bảo mật & Toàn vẹn Nghiệp vụ (Business Rules)
* **Cô lập dữ liệu (Data Isolation):** Áp dụng quy tắc kiểm tra nghiêm ngặt mức Cơ sở dữ liệu. Manager thuộc Dãy A tuyệt đối không thể xem, sửa hoặc truy cập dữ liệu của Dãy B.
* **Chống gian lận chỉ số:** Hệ thống chặn không cho phép lưu bản ghi nếu `Chỉ số điện mới` nhỏ hơn `Chỉ số điện cũ` của kỳ trước liền kề.

---

## 3. Công nghệ Sử dụng & Ngôn ngữ Lập trình (Tech Stack)

Hệ thống được phát triển theo mô hình **Monorepo** với kiến trúc phân tách rõ ràng giữa Backend, Frontend và Database:

### 3.1. Ngôn ngữ & Nền tảng Chủ đạo
* **C# / .NET 10:** Xây dựng hệ thống RESTful API hiệu năng cao, type-safety tuyệt đối và tuân thủ mô hình **Clean Architecture**.
* **TypeScript / JavaScript:** Sử dụng cho toàn bộ Frontend Next.js nhằm đảm bảo tính đồng bộ dữ liệu và trải nghiệm người dùng tối ưu.
* **SQL (PostgreSQL):** Đảm bảo tính toàn vẹn dữ liệu tài chính theo chuẩn ACID, khóa ngoại và chỉ mục tối ưu.

### 3.2. Công nghệ Backend (Server-side)
* **Framework:** **ASP.NET Core Web API (.NET 10)** tổ chức theo chuẩn Clean Architecture (Domain, Application, Infrastructure, WebAPI).
* **ORM:** **Entity Framework Core 10** hỗ trợ Migration, **Global Query Filters** (tự động cô lập dữ liệu theo Dãy trọ của Manager - BR-14), và **SaveChangesInterceptor** (ghi Audit Log tự động - NFR-11).
* **Xác thực & Phân quyền:** **JWT (JSON Web Token)** kết hợp mã hóa mật khẩu `Bcrypt` (cost $\ge$ 10) và phân quyền RBAC.
* **Email Service:** **Resend API / SMTP** gửi thông báo hóa đơn, nhắc nợ và cập nhật trạng thái ticket.

### 3.3. Công nghệ Frontend (Client-side)
* **Framework:** **Next.js (App Router)** + **React** + **TypeScript**.
* **UI & Styling:** **Tailwind CSS** + **shadcn/ui** đem lại giao diện hiện đại, trực quan, responsive tối ưu từ 360px trở lên (NFR-08).
* **Biểu đồ & Báo cáo:** **Recharts** trực quan hóa doanh thu 12 tháng và tỷ lệ lấp đầy.
* **Kiến trúc Offline-First:** Sử dụng **Dexie.js (IndexedDB)** lưu trữ tạm thời chỉ số điện trên trình duyệt di động khi mất mạng và tự động đồng bộ khi có kết nối trở lại (FR-18, NFR-09).

### 3.4. Hệ Quản trị Cơ sở Dữ liệu & Lưu trữ (Database & Cloud)
* **RDBMS:** **PostgreSQL 16** (Triển khai trên **Supabase** cho cloud và Docker Compose cho local dev).
* **File Storage:** **Supabase Storage** lưu trữ ảnh hợp đồng PDF, ảnh CCCD (bảo mật qua Signed URL có thời hạn - NFR-06).

### 3.5. Tích hợp bên thứ ba & DevOps
* **Payment Gateway:** **VNPay Sandbox API** (tạo URL thanh toán, mã QR chuyển khoản và tiếp nhận IPN Callback tự động).
* **Quy trình Git:** Tuân thủ quy tắc **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`) với 2 nhánh chính: `main` (production) và `develop` (daily integration).
* **Local Dev:** `docker-compose.yml` khởi chạy nhanh PostgreSQL cục bộ.

---

## 4. Cấu trúc Dự án (Monorepo)

```text
Boarding-House-Management/
├── .agent/                 # Agent rules, skills & workflows
├── backend/                # ASP.NET Core .NET 10 Web API (Clean Architecture)
├── frontend/               # Next.js App Router (TypeScript + Tailwind CSS + shadcn/ui)
├── docs/                   # Tài liệu dự án
│   ├── requirements/       # SRS v1.0 (Chốt)
│   ├── planning/           # Master Plan (80 ngày) & Daily Plans
│   └── development/        # Nhật ký phát triển (Append-Only)
├── scripts/                # Scripts kiểm toán phạm vi (verify-scope.ps1)
├── docker-compose.yml      # Cấu hình PostgreSQL 16 local container
├── .gitmessage             # Conventional commits template
├── .gitignore              # Multi-stack gitignore
├── AGENTS.md               # Nguyên tắc phối hợp làm việc
└── README.md               # Tài liệu giới thiệu dự án
```
