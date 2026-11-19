# Mini Boarding House Management System (MBHMS)

[![MBHMS Monorepo CI](https://github.com/vothang4105/Boarding-House-Management/actions/workflows/ci.yml/badge.svg)](https://github.com/vothang4105/Boarding-House-Management/actions/workflows/ci.yml)
![.NET 10](https://img.shields.io/badge/.NET-10.0-512BD4?logo=dotnet)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)
![Milestone](https://img.shields.io/badge/Milestone-v0.1.0--foundation-success)

Hệ thống Quản lý Nhà trọ Mini (MBHMS) được thiết kế và phát triển nhằm tối ưu hóa toàn bộ quy trình vận hành, quản lý doanh thu, nhân sự và tương tác với khách thuê cho mô hình nhà trọ quy mô vừa và nhỏ. Dự án được cấu hình thực tế dựa trên yêu cầu cụ thể của khách hàng (quy mô 3 dãy - 64 phòng tại Làng Đại học Thủ Đức, TP.HCM).

---

## 1. Giới thiệu sơ lược (Project Overview)

MBHMS giải quyết triệt để các hạn chế của phương pháp quản lý nhà trọ thủ công truyền thống (sổ sách, Excel rời rạc) dễ dẫn đến sai sót số liệu điện nước, thất thoát tài chính và tốn thời gian. 

Hệ thống cung cấp giải pháp tập trung trên nền tảng Cloud, đồng thời tối ưu trải nghiệm di động thông qua việc hỗ trợ **ghi số điện ngoại tuyến (Offline Mode với Dexie.js)**, tích hợp **thanh toán trực tuyến SePay VietQR (tự động đối soát Webhook)** và tự động hóa hệ thống **chăm sóc khách hàng (Email Ticket System)**. Quy trình nghiệp vụ được thiết kế chặt chẽ, phân quyền rõ ràng giữa Chủ trọ (Owner) và Người quản lý dãy (Manager) theo quy tắc cô lập dữ liệu BR-14.

---

## 2. Các Tính năng Cốt lõi (System Features)

### 2.1. Phân hệ Quản trị & Cấu hình Hệ thống (Chủ trọ - Owner)
* **Quản lý Cơ sở vật chất:** Khởi tạo, chỉnh sửa và quản lý danh mục Dãy trọ (Building) và Phòng trọ (Room). Cấu hình diện tích, sức chứa tối đa và giá thuê gốc của từng phòng.
* **Quản lý Hợp đồng (Contract Management):** Thiết lập hợp đồng thuê điện tử gắn với Khách đại diện (Tenant), lưu trữ ngày bắt đầu, ngày kết thúc, tiền cọc. Tự động chuyển trạng thái phòng sang "Đang thuê" khi kích hoạt hợp đồng.
* **Dashboard Giám sát Toàn diện:** Giao diện trực quan hiển thị 4 chỉ số kinh doanh cốt lõi:
    1. *Doanh thu tháng hiện tại* (Tổng tiền từ các hóa đơn đã thanh toán).
    2. *Tỷ lệ lấp đầy* (Phòng đang thuê / Tổng số phòng x 100%).
    3. *Số lượng phòng trống* sẵn sàng đón khách.
    4. *Số lượng Ticket sự cố chưa xử lý* (Trạng thái OPEN).
* **Quản lý Nhân sự & Phân vùng Dữ liệu (BR-14):** Tạo tài khoản và phân quyền cho Quản lý (Manager), cô lập phạm vi theo từng dãy trọ phụ trách.

### 2.2. Phân hệ Ghi số điện & Vận hành (Chủ trọ & Quản lý)
* **Nhập chỉ số điện Offline-First (FR-18, NFR-09):** Cho phép Quản lý kiểm tra và nhập chỉ số điện trực tiếp trên điện thoại ngay cả khi **mất mạng WiFi / 4G**.
* **Cơ chế Đồng bộ Tự động (Auto-Sync):** Dữ liệu chỉ số điện được lưu vào IndexedDB của trình duyệt (`Dexie.js`) và tự động đồng bộ lên máy chủ trung tâm khi có mạng trở lại.
* **Tính toán & Phát hành Hóa đơn tự động:** Vào ngày 28 hàng tháng, hệ thống tự động đối chiếu chỉ số cũ, chỉ số mới, áp đơn giá điện/nước và cộng tiền phòng để sinh hóa đơn tự động.

### 2.3. Phân hệ Khách thuê & Thanh toán (Khách thuê - Tenant)
* **Tra cứu hóa đơn định kỳ:** Xem chi tiết bảng phân rã dòng tiền (Tiền phòng, Tiền điện, Nước, Rác, WiFi) và lịch sử thanh toán.
* **Thanh toán trực tuyến SePay VietQR (CR-01):** Khách thuê nhấn "Thanh toán", hệ thống hiển thị mã VietQR động theo chuẩn NAPAS247 (chứa số tài khoản, số tiền và nội dung chuyển khoản tự sinh).
* **Đối soát tự động tức thì (SePay Webhook):** Khi ngân hàng ghi nhận chuyển khoản, SePay gửi tín hiệu Webhook tức thời đến Backend Web API, tự động gạch nợ sang trạng thái "Đã thanh toán" (PAID).

### 2.4. Phân hệ Tương tác & Xử lý Sự cố (Ticket System)
* **Gửi Ticket báo sự cố:** Khách thuê chụp ảnh, mô tả nội dung hư hỏng cơ sở vật chất (điều hòa, bóng đèn, vòi sen) và gửi lên hệ thống.
* **Hệ thống Thông báo Email tự động:** Tự động gửi Email thông báo cho Quản lý phụ trách dãy và cập nhật tiến độ xử lý cho Khách thuê.

---

## 3. Công nghệ Sử dụng & Kiến trúc (Tech Stack)

### 3.1. Backend (Server-side)
* **Nền tảng:** **ASP.NET Core Web API (.NET 10)** kiến trúc **Clean Architecture** (Domain, Application, Infrastructure, WebApi).
* **ORM:** **Entity Framework Core 10** kết hợp **Npgsql PostgreSQL**, hỗ trợ Migration, **Global Query Filters** (cô lập dữ liệu BR-14), và **AuditableEntitySaveChangesInterceptor** (lưu vết Audit và Soft Delete theo NFR-11).
* **Múi giờ:** Khóa cứng chuẩn `Asia/Ho_Chi_Minh` (UTC+7 theo NFR-13) ở cả cấp độ DateTimeProvider và container Linux.
* **Bảo mật:** Mã hóa mật khẩu `BCrypt` (cost $\ge$ 10 theo NFR-04), cấp quyền JWT Bearer Token theo ma trận RBAC.

### 3.2. Frontend (Client-side)
* **Framework:** **Next.js 16 (App Router)** + **React 19** + **TypeScript**.
* **UI & Styling:** **Tailwind CSS 4** + **shadcn/ui**, thiết kế chuẩn **Mobile-First từ 360px** (`NFR-08`), mọi tác vụ vận hành chính $\le 3$ chạm (`NFR-07`).
* **Typography:** Font chữ **`Be Vietnam Pro`** chuẩn tiếng Việt có dấu sắc nét (`NFR-12`).
* **Offline Storage:** **Dexie.js** (IndexedDB) lưu trữ cục bộ dữ liệu chỉ số điện ngoại tuyến (`NFR-09`).
* **State Management:** **TanStack Query** quản lý cache giúp Dashboard tải nhanh $< 3\text{s}$ (`NFR-01`).

### 3.3. Database & DevOps
* **Cơ sở dữ liệu:** **PostgreSQL 16** (Docker Compose cho Local Dev, **Supabase Cloud** cho môi trường Production).
* **Đóng gói:** Dockerfile đa tầng (Multi-stage build) và `docker-compose.yml`.
* **CI/CD:** **GitHub Actions** tự động hóa kiểm tra biên dịch và chạy 17 Unit Tests song song.

---

## 4. Cấu trúc Dự án (Monorepo)

```text
Boarding-House-Management/
├── .agent/                 # Agent rules, skills (impeccable, daily-plan-execution)
├── .github/
│   └── workflows/ci.yml    # GitHub Actions CI pipeline (.NET 10 + Next.js)
├── backend/                # ASP.NET Core .NET 10 Web API (Clean Architecture)
│   ├── src/
│   │   ├── MBHMS.Domain/           # Thực thể lõi, Enums, Rules constants (BR-01 -> BR-14)
│   │   ├── MBHMS.Application/      # DTOs, Interfaces, Validators
│   │   ├── MBHMS.Infrastructure/   # EF Core DbContext, PostgreSQL, Interceptors, Migrations
│   │   └── MBHMS.WebApi/           # REST Controllers, Middlewares, Program.cs
│   ├── tests/
│   │   └── MBHMS.UnitTests/        # Bộ kiểm thử tự động xUnit (17 Tests)
│   ├── Dockerfile                  # Dockerfile đa tầng khóa múi giờ UTC+7
│   └── MBHMS.sln                   # Solution file .NET 10
├── frontend/               # Next.js App Router (TypeScript + Tailwind CSS + shadcn/ui)
│   ├── src/
│   │   ├── app/                    # 4 Route Groups: (public), (auth), (admin), (tenant)
│   │   ├── components/ui/          # Thư viện component shadcn/ui
│   │   ├── components/layout/      # AppShell, BottomNav (360px), Sidebar, Header
│   │   ├── lib/                    # api-client.ts, offline-db.ts, formatters.ts
│   │   └── types/                  # TypeScript Interfaces đồng bộ Backend
│   └── package.json
├── docs/                   # Tài liệu dự án
│   ├── requirements/       # SRS v1.0, RTM Matrix (Traceability)
│   ├── planning/           # Master Plan (80 ngày) & Daily Plans (DAY-001 -> DAY-010)
│   └── development/        # DEVELOPMENT_LOG.md (Nhật ký Append-Only)
├── scripts/                # Scripts kiểm toán phạm vi (verify-scope.ps1)
├── docker-compose.yml      # Khởi chạy Postgres 16 & Backend .NET 10
├── PRODUCT.md              # Bối cảnh sản phẩm định hình bởi Impeccable
├── DESIGN.md               # Hệ thống thiết kế Tokens & Typography
├── AGENTS.md               # Quy tắc phát triển Daily Plan-Driven
└── README.md               # Tài liệu giới thiệu dự án
```

---

## 5. Hướng dẫn Khởi chạy Cục bộ (Local Development Guide)

### 5.1. Yêu cầu Tiên quyết
* **.NET 10 SDK** (phiên bản 10.0.x)
* **Node.js** (phiên bản 20.x hoặc mới hơn) & **npm**
* **Docker Desktop** (nếu khởi chạy qua Docker container)

### 5.2. Khởi chạy Nhanh với Docker Compose
Khởi chạy đồng thời cơ sở dữ liệu PostgreSQL và Backend Web API:

```bash
# 1. Khởi chạy toàn bộ container nền
docker compose up -d

# 2. Kiểm tra trạng thái các service
docker compose ps
```

Container Backend sẽ lắng nghe tại `http://localhost:5143`.

### 5.3. Khởi chạy Thủ công Từng Thành phần

#### Bước 1: Cơ sở Dữ liệu & Backend Web API
```bash
# Di chuyển vào thư mục backend
cd backend

# Áp dụng migration khởi tạo vào PostgreSQL
dotnet ef database update --project src/MBHMS.Infrastructure --startup-project src/MBHMS.WebApi

# Khởi chạy Backend Web API server
dotnet run --project src/MBHMS.WebApi
```

* **Swagger UI:** Truy cập `http://localhost:5143/swagger` để kiểm thử API và nút Authorize Bearer Token.
* **Health Check API:** Truy cập `http://localhost:5143/api/health` kiểm tra trạng thái kết nối Database và giờ UTC+7.

#### Bước 2: Khởi chạy Frontend Next.js
```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt thư viện dependencies
npm install --legacy-peer-deps

# Khởi chạy server phát triển
npm run dev
```

* Truy cập giao diện ứng dụng tại `http://localhost:3000`.

---

## 6. Hướng dẫn Triển khai Cloud (Smoke Deploy Guide)

### 6.1. Backend lên Render / Railway (Free Tier)
1. Kết nối repository GitHub với Render / Railway.
2. Chọn hình thức build bằng `Dockerfile` (đường dẫn: `backend/Dockerfile`).
3. Khai báo các Environment Variables:
   * `ConnectionStrings__DefaultConnection`: Chuỗi kết nối Supabase Cloud PostgreSQL.
   * `ASPNETCORE_ENVIRONMENT`: `Production`
   * `TZ`: `Asia/Ho_Chi_Minh`
4. Kiểm tra endpoint công khai: `https://<backend-app>.onrender.com/api/health`.

### 6.2. Frontend lên Vercel (Free Tier)
1. Import repository GitHub trên Vercel.
2. Thiết lập Root Directory: `frontend`.
3. Khai báo Environment Variable:
   * `NEXT_PUBLIC_API_URL`: `https://<backend-app>.onrender.com/api`
4. Deploy và truy cập URL Vercel kiểm tra thông suốt 3 tầng: `Frontend (Vercel) -> Backend (.NET 10) -> Database (Supabase)`.

---

## 7. Tổng kết Mốc Giai đoạn 1 (Phase 1 Baseline: v0.1.0-foundation)

| Ngày | Nội dung hoàn thành | Trạng thái |
| :---: | :--- | :---: |
| **DAY-001** | Nghiên cứu SRS, phân tích kiến trúc Monorepo và ma trận MoSCoW | ✅ COMPLETED |
| **DAY-002** | Khởi tạo GitHub repo, phân nhánh Git Flow, cấu hình Conventional Commits | ✅ COMPLETED |
| **DAY-003** | Xây dựng khung Ma trận truy vết yêu cầu phần mềm (`RTM.md`) | ✅ COMPLETED |
| **DAY-004** | Thiết lập môi trường .NET 10, Node.js, Docker Compose PostgreSQL 16 | ✅ COMPLETED |
| **DAY-005** | Chốt hạ tầng Cloud Supabase, SePay VietQR, Mailtrap & lập phiếu CR-01 | ✅ COMPLETED |
| **DAY-006** | Biên soạn tài liệu Vision & Scope (`02_vision_and_scope.md`) và ma trận RBAC | ✅ COMPLETED |
| **DAY-007** | Dựng khung Backend .NET 10 Clean Architecture, Swagger JWT, UTC+7 | ✅ COMPLETED |
| **DAY-008** | Dựng khung Frontend Next.js App Router, shadcn/ui, Dexie.js, PRODUCT/DESIGN.md | ✅ COMPLETED |
| **DAY-009** | Cấu hình EF Core, Npgsql, Soft Delete, migration InitialCreate, canConnect | ✅ COMPLETED |
| **DAY-010** | Đóng gói Dockerfile đa tầng, GitHub Actions CI, README.md, Release Tag v0.1.0 | ✅ COMPLETED |

---

*Dự án phát triển theo phương pháp **Daily Plan-Driven Development** với sự hỗ trợ của Antigravity AI Agent.*
