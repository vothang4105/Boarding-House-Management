# REQUIREMENT TRACEABILITY MATRIX (RTM)
# Ma Trận Truy Vết Yêu Cầu - Hệ Thống Quản Lý Nhà Trọ Mini (MBHMS)

> **Dự án:** Mini Boarding House Management System (MBHMS)  
> **Tài liệu nguồn:** `docs/requirements/SRS.md` v1.0 (Chốt), `docs/planning/MASTER_PLAN.md`  
> **Người lập:** Solo Developer / BA  
> **Phiên bản:** 1.0 (Official Baseline)  
> **Ngày lập:** 15/11/2026  

---

## 1. Mục Đích & Nguyên Tắc Truy Vết (Traceability Goals)

Tài liệu này đóng vai trò là chiếc cầu nối kỹ thuật hai chiều (Bidirectional Traceability) giữa:
1. **Yêu cầu nghiệp vụ của khách hàng** (SRS v1.0).
2. **Kiến trúc hệ thống & Thiết kế Cơ sở dữ liệu** (Entities, Clean Architecture).
3. **Kế hoạch triển khai mã nguồn theo Sprint** (Lộ trình 16 tuần / 80 ngày).
4. **Tiêu chí nghiệm thu & Kiểm thử** (Test Cases, Quality Gate).

---

## 2. Ma Trận Truy Vết Yêu Cầu Chức Năng (FR-01 đến FR-48)

*Quy ước mức ưu tiên MoSCoW:* **[M]** = Must-have (Bắt buộc cho MVP) | **[S]** = Should-have (Làm sau khi xong M)

### 2.1. Module 1: Quản lý Nhà & Phòng (Room & Building Management)
| Mã FR | Tên Yêu Cầu | MoSCoW | Actor | Thực Thể (Entities) | Quy Tắc BR | Triển Khai (Sprint / Ngày) | Phương Pháp Kiểm Chứng |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **FR-01** | Tạo/sửa/xóa Dãy trọ | **[M]** | Owner | `Building`, `BuildingManager` | BR-14 | Sprint 1 / Ngày 38 | API CRUD Test + UI Form Test |
| **FR-02** | Tạo/sửa/xóa Phòng trọ | **[M]** | Owner, Manager | `Room`, `Building` | BR-10, BR-14 | Sprint 1 / Ngày 38 | API CRUD Test + Role Scope Check |
| **FR-03** | Hỗ trợ 3 loại phòng: Đơn (1), Đôi (2), Gia đình (3-4) | **[M]** | Owner | `Room` (RoomType, MaxTenants) | BR-06, BR-10 | Sprint 1 / Ngày 38 | Unit test logic kiểm tra sức chứa phòng |
| **FR-04** | 4 trạng thái phòng: Trống, Đang thuê, Đặt cọc, Bảo trì | **[M]** | Owner, Manager | `Room` (Status) | BR-10 | Sprint 1 / Ngày 38 | State transition validation test |
| **FR-05** | Sơ đồ phòng dạng Grid màu theo trạng thái | **[M]** | Owner, Manager | `Room`, `Building` | BR-14 | Sprint 1 / Ngày 39 | UI component render test trên mobile & desktop |
| **FR-06** | Upload tối đa 5 ảnh/phòng ($\le$ 5MB/ảnh) | **[S]** | Owner, Manager | `RoomImage`, Supabase Storage | - | Sprint 1 / Ngày 39 | Integration test upload file + chặn file > 5MB |

---

### 2.2. Module 2: Khách Thuê & Hợp Đồng (Tenant & Contract Management)
| Mã FR | Tên Yêu Cầu | MoSCoW | Actor | Thực Thể (Entities) | Quy Tắc BR | Triển Khai (Sprint / Ngày) | Phương Pháp Kiểm Chứng |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **FR-07** | Tạo hồ sơ khách thuê (CCCD, SĐT, ảnh CCCD) | **[M]** | Owner, Manager | `Tenant`, `User` | BR-13, NFR-06 | Sprint 1 / Ngày 40 | Check ràng buộc unique CCCD 12 số + Signed URL |
| **FR-08** | Tạo hợp đồng thuê phòng | **[M]** | Owner, Manager | `Contract`, `ContractMember`, `Room` | BR-06, BR-09, BR-10, BR-12 | Sprint 1 / Ngày 41 | Test chặn tạo HĐ vượt sức chứa hoặc phòng không trống |
| **FR-09** | Upload file hợp đồng PDF đã ký ($\le$ 10MB) | **[M]** | Owner, Manager | `Contract` (SignedPdfUrl), Supabase | NFR-06 | Sprint 1 / Ngày 42 | Test upload file PDF lên Supabase Storage qua signed URL |
| **FR-10** | Gia hạn hợp đồng (nối tiếp, giữ lịch sử) | **[M]** | Owner, Manager | `Contract` (PreviousContractId) | - | Sprint 1 / Ngày 43 | Test logic sinh HĐ mới và liên kết chuỗi lịch sử |
| **FR-11** | Chấm dứt HĐ trước hạn & xử lý phạt cọc | **[M]** | Owner, Manager | `Contract` | BR-11 | Sprint 1 / Ngày 43 | Unit test tính toán hoàn cọc 100% vs phạt 50% (< 30 ngày) |
| **FR-12** | Tự động đổi trạng thái phòng sang "Đang thuê" | **[M]** | Hệ thống | `Room` (Status) | BR-10 | Sprint 1 / Ngày 41 | Database transaction test khi kích hoạt HĐ |
| **FR-13** | Tự động nhắc trước 30 ngày khi HĐ sắp hết hạn | **[M]** | Hệ thống | `Contract`, `Notification` | - | Sprint 1 / Ngày 44 | Background Job test quét ngày hết hạn |
| **FR-14** | Khách thuê xem hợp đồng của mình (chỉ đọc) | **[M]** | Tenant | `Contract`, `Tenant` | BR-14, NFR-05 | Sprint 1 / Ngày 42 | Role authorization check: Tenant chỉ xem HĐ của mình |

---

### 2.3. Module 3: Chỉ Số Điện & Nước (Utility Management)
| Mã FR | Tên Yêu Cầu | MoSCoW | Actor | Thực Thể (Entities) | Quy Tắc BR | Triển Khai (Sprint / Ngày) | Phương Pháp Kiểm Chứng |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **FR-15** | Nhập chỉ số điện từng phòng theo tháng | **[M]** | Manager | `ElectricityReading` | BR-01 | Sprint 2 / Ngày 46 | Form validation test: Chỉ số mới $\ge$ Chỉ số cũ |
| **FR-16** | Tự tính số kWh tiêu thụ = số mới - số cũ | **[M]** | Hệ thống | `ElectricityReading` (ConsumptionKWh) | BR-01 | Sprint 2 / Ngày 46 | Unit test tính toán số kWh chính xác |
| **FR-17** | Cảnh báo điện tăng bất thường (> 200% TB 3 tháng) | **[S]** | Hệ thống | `ElectricityReading` | - | Sprint 2 / Ngày 46 | Test thuật toán so sánh với TB cộng 3 kỳ trước |
| **FR-18** | Hỗ trợ nhập số điện Offline & tự động Auto-Sync | **[M]** | Manager | Dexie.js (IndexedDB) -> API Backend | NFR-09 | Sprint 2 / Ngày 47 | E2E Offline simulation: Tắt mạng nhập -> bật mạng sync |
| **FR-19** | Nước tính khoán theo đầu người trong HĐ | **[M]** | Hệ thống | `Invoice`, `ContractMember` | BR-02 | Sprint 2 / Ngày 48 | Unit test tính tiền nước: `Số người * 100.000đ` |
| **FR-20** | Xem lịch sử chỉ số điện 12 tháng gần nhất | **[S]** | Owner, Manager, Tenant | `ElectricityReading` | BR-14 | Sprint 2 / Ngày 48 | Query performance test + biểu đồ Recharts |

---

### 2.4. Module 4: Hóa Đơn & Thanh Toán (Billing & Payments)
| Mã FR | Tên Yêu Cầu | MoSCoW | Actor | Thực Thể (Entities) | Quy Tắc BR | Triển Khai (Sprint / Ngày) | Phương Pháp Kiểm Chứng |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **FR-21** | Cronjob tự động sinh hóa đơn ngày 28 hàng tháng | **[M]** | Hệ thống | `Invoice`, `Contract`, `ElectricityReading` | BR-07, NFR-02 | Sprint 2 / Ngày 49 | Benchmark test: Sinh 64 hóa đơn trong $< 30$ giây |
| **FR-22** | Cấu trúc hóa đơn đầy đủ các khoản mục | **[M]** | Hệ thống | `Invoice` | BR-01 -> BR-05 | Sprint 2 / Ngày 49 | Unit test kiểm tra công thức tổng tiền hóa đơn |
| **FR-23** | Thêm/sửa khoản phụ thu trước khi phát hành | **[S]** | Owner, Manager | `Invoice` (AdditionalCharge) | - | Sprint 2 / Ngày 50 | API & UI test điều chỉnh phụ thu trạng thái DRAFT |
| **FR-24** | Gửi hóa đơn qua Email (Resend) + In-app | **[M]** | Hệ thống | `Notification`, Resend API | - | Sprint 2 / Ngày 51 | Integration test gửi mail mẫu hóa đơn đến hộp thư test |
| **FR-25** | Thanh toán qua QR VNPay Sandbox / Tiền mặt | **[M]** | Tenant, Manager | `Invoice`, VNPay Gateway | - | Sprint 2 / Ngày 52 | E2E Sandbox payment flow (Quét QR thành công) |
| **FR-26** | Đối soát thanh toán VNPay tự động qua IPN Callback | **[M]** | Hệ thống | `Invoice` (Status = PAID) | - | Sprint 2 / Ngày 53 | Webhook verification test: checksum hash + đổi trạng thái |
| **FR-27** | Hóa đơn có 4 trạng thái (Nháp, Đã gửi, Đã trả, Quá hạn) | **[M]** | Hệ thống | `Invoice` (Status Enum) | - | Sprint 2 / Ngày 54 | State machine validation test |
| **FR-28** | Tự động chuyển Quá hạn sau ngày 5 tháng tiếp theo | **[M]** | Hệ thống | `Invoice` | BR-08, BR-09 | Sprint 2 / Ngày 54 | Cronjob test chuyển trạng thái OVERDUE sau 23:59 ngày 5 |
| **FR-29** | In / Xuất hóa đơn ra file PDF chuẩn định dạng VNĐ | **[S]** | Owner, Manager, Tenant | `Invoice`, PDF Renderer | NFR-12 | Sprint 2 / Ngày 55 | Kiểm tra định dạng tiền tệ và layout trang in PDF |

---

### 2.5. Module 5: Sự Cố & Bảo Trì (Ticket & Issue Management)
| Mã FR | Tên Yêu Cầu | MoSCoW | Actor | Thực Thể (Entities) | Quy Tắc BR | Triển Khai (Sprint / Ngày) | Phương Pháp Kiểm Chứng |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **FR-30** | Khách tạo ticket sự cố kèm tối đa 3 ảnh | **[M]** | Tenant | `Ticket`, `TicketImage` | BR-14 | Sprint 3 / Ngày 56 | Form validation test: chặn tải quá 3 ảnh, bắt buộc tiêu đề |
| **FR-31** | 4 trạng thái ticket: Mới, Đang xử lý, Đã xử lý, Đã đóng | **[M]** | Hệ thống | `Ticket` (Status) | - | Sprint 3 / Ngày 57 | State transition test (OPEN -> PROCESSING -> RESOLVED -> CLOSED) |
| **FR-32** | Xem danh sách ticket, lọc theo dãy/trạng thái | **[M]** | Owner, Manager | `Ticket`, `Building` | BR-14 | Sprint 3 / Ngày 57 | Query test kiểm tra Manager chỉ xem ticket dãy mình phụ trách |
| **FR-33** | Bình luận và cập nhật tiến độ xử lý ticket | **[M]** | Owner, Manager | `TicketComment` | - | Sprint 3 / Ngày 57 | Real-time / Polling comment thread test |
| **FR-34** | Đánh giá 1-5 sao sau khi ticket đóng | **[S]** | Tenant | `Ticket` (RatingStars, RatingComment) | - | Sprint 3 / Ngày 57 | UI rating component test + lưu điểm đánh giá |
| **FR-35** | Thông báo tự động khi ticket được cập nhật | **[M]** | Hệ thống | `Notification`, Resend API | - | Sprint 3 / Ngày 58 | Event-driven notification test |

---

### 2.6. Module 6: Thông Báo & Nhắc Nhở (Notifications)
| Mã FR | Tên Yêu Cầu | MoSCoW | Actor | Thực Thể (Entities) | Quy Tắc BR | Triển Khai (Sprint / Ngày) | Phương Pháp Kiểm Chứng |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **FR-36** | Hộp thông báo In-app (chuông + badge chưa đọc) | **[M]** | Tất cả | `Notification` | - | Sprint 3 / Ngày 58 | UI test badge đếm số chưa đọc + đánh dấu đã đọc |
| **FR-37** | Email tự động: Hóa đơn, Quá hạn 3 ngày, HĐ sắp hết, Ticket | **[M]** | Hệ thống | Resend Service | - | Sprint 3 / Ngày 59 | Integration test các mẫu email transactional |
| **FR-38** | Owner gửi thông báo chung đến toàn bộ khách 1 dãy | **[S]** | Owner | `Notification`, `Building` | BR-14 | Sprint 3 / Ngày 59 | Bulk notification test theo danh sách khách trong dãy |

---

### 2.7. Module 7: Báo Cáo & Dashboard (Analytics)
| Mã FR | Tên Yêu Cầu | MoSCoW | Actor | Thực Thể (Entities) | Quy Tắc BR | Triển Khai (Sprint / Ngày) | Phương Pháp Kiểm Chứng |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **FR-39** | Dashboard chính 4 chỉ số (Lấp đầy, Doanh thu, Quá hạn, Ticket) | **[M]** | Owner | `Invoice`, `Room`, `Ticket` | NFR-01 | Sprint 3 / Ngày 60 | Performance test: Tải Dashboard $< 3$ giây với 64 phòng |
| **FR-40** | Báo cáo doanh thu theo tháng (12 tháng gần nhất) | **[M]** | Owner | `Invoice` | - | Sprint 3 / Ngày 61 | Recharts bar chart render test + kiểm tra số liệu lũy kế |
| **FR-41** | Báo cáo công nợ: Liệt kê hóa đơn quá hạn kèm số ngày trễ | **[M]** | Owner, Manager | `Invoice` | BR-14 | Sprint 3 / Ngày 62 | SQL Query test sắp xếp theo số ngày trễ giảm dần |
| **FR-42** | Báo cáo tỷ lệ lấp đầy theo từng dãy & theo tháng | **[S]** | Owner | `Room`, `Contract` | - | Sprint 3 / Ngày 62 | Data aggregation test: Tính % lấp đầy theo tháng |
| **FR-43** | Xuất báo cáo tài chính / công nợ ra Excel (`.xlsx`) | **[S]** | Owner | MiniExcel / ClosedXML | - | Sprint 3 / Ngày 62 | File download test: kiểm tra định dạng và dữ liệu Excel |

---

### 2.8. Module 8: Quản Trị Người Dùng & Bảo Mật (Auth & RBAC)
| Mã FR | Tên Yêu Cầu | MoSCoW | Actor | Thực Thể (Entities) | Quy Tắc BR | Triển Khai (Sprint / Ngày) | Phương Pháp Kiểm Chứng |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **FR-44** | Đăng ký tài khoản Khách thuê, gửi link kích hoạt qua email | **[M]** | Owner, Manager | `User`, `Tenant` | - | Sprint 1 / Ngày 37 | Token activation flow test |
| **FR-45** | Đăng nhập bằng Email + Mật khẩu | **[M]** | Tất cả | `User` | NFR-04 | Sprint 1 / Ngày 36 | Test mã hóa Bcrypt (cost $\ge$ 10) + JWT token generation |
| **FR-46** | Quên mật khẩu & Reset qua Email | **[M]** | Tất cả | `User`, `PasswordResetToken` | - | Sprint 1 / Ngày 36 | Security test: One-time token hết hạn sau 15 phút |
| **FR-47** | Owner tạo tài khoản Manager, phân quyền theo Dãy trọ | **[M]** | Owner | `User`, `BuildingManager` | BR-14 | Sprint 1 / Ngày 37 | Test gán quyền dãy trọ cho Manager |
| **FR-48** | Đổi mật khẩu & Cập nhật thông tin cá nhân | **[M]** | Tất cả | `User` | NFR-04 | Sprint 1 / Ngày 36 | User profile update & password change test |

---

## 3. Ma Trận Truy Vết Quy Tắc Nghiệp Vụ (BR-01 đến BR-14)

| Mã BR | Tên Quy Tắc Nghiệp Vụ | Nội Dung Ràng Buộc Kỹ Thuật | Áp Dụng Cho FR | Cơ Chế Thực Thi Trong Hệ Thống |
| :---: | :--- | :--- | :---: | :--- |
| **BR-01** | Đơn giá điện | Cố định 3.500đ/kWh, không lũy tiến; Số mới $\ge$ Số cũ | FR-15, FR-16, FR-22 | Check constraint trong DB + Domain Validation Entity |
| **BR-02** | Đơn giá nước | 100.000đ/người/tháng, tính theo số người trong HĐ | FR-19, FR-22 | Service tính tiền tự động nhân `Contract.Members.Count` |
| **BR-03** | Đơn giá Internet | Cố định 50.000đ/người/tháng | FR-22 | Cấu hình tham số hệ thống trong `AppSettings` |
| **BR-04** | Đơn giá rác | Cố định 20.000đ/phòng/tháng | FR-22 | Cấu hình tham số hệ thống trong `AppSettings` |
| **BR-05** | Phí giữ xe máy | 100.000đ/xe/tháng, khai báo khi lập hợp đồng | FR-22 | Lưu trường `RegisteredMotorbikes` trong bảng `Contract` |
| **BR-06** | Tiền đặt cọc | Mặc định = 1 tháng tiền phòng cơ bản (`BasePrice`) | FR-08 | Giá trị mặc định khi tạo form HĐ, cho phép sửa tay |
| **BR-07** | Chu kỳ hóa đơn | Tự động sinh lúc 00:00 ngày 28 hàng tháng | FR-21 | Hangfire / Quartz.NET Cronjob: `0 0 28 * *` |
| **BR-08** | Hạn đóng tiền | Hạn 23:59 ngày 5 tháng sau, sau đó chuyển OVERDUE | FR-27, FR-28 | Cronjob quét trạng thái: `if (Now > DueDate) OVERDUE` |
| **BR-09** | Phạt trễ hạn | Không tính lãi phạt trong v1.0, chỉ ghi nhận trạng thái | FR-28, FR-41 | Không cộng dồn lãi suất, phục vụ lọc báo cáo công nợ |
| **BR-10** | Giới hạn sức chứa | Đơn: 1 người \| Đôi: 2 người \| Gia đình: tối đa 4 người | FR-02, FR-03, FR-08 | FluentValidation chặn thêm người vượt quá `Room.MaxTenants` |
| **BR-11** | Chấm dứt trước hạn | Báo $\ge$ 30 ngày: trả đủ 100% cọc; Báo < 30 ngày: phạt 50% cọc | FR-11 | Business Logic trong `ContractService.TerminateContract()` |
| **BR-12** | Người đại diện | Mỗi HĐ có đúng 1 Tenant đứng tên chịu trách nhiệm pháp lý | FR-08, FR-14 | Bảng `Contract` có 1 trường `TenantId` (Primary Tenant) |
| **BR-13** | CCCD duy nhất | Mỗi khách thuê chỉ có 1 hồ sơ duy nhất trên hệ thống | FR-07 | Ràng buộc `UNIQUE` trên cột `CitizenId` trong bảng `Tenants` |
| **BR-14** | Manager Scope | Manager chỉ thấy và thao tác dữ liệu dãy được phân công | FR-01, 02, 05, 32, 41, 47 | **EF Core Global Query Filter** chặn rò rỉ dữ liệu mức Data Layer |

---

## 4. Ma Trận Truy Vết Yêu Cầu Phi Chức Năng (NFR-01 đến NFR-13)

| Mã NFR | Loại Yêu Cầu | Tiêu Chí Đo Lường | Tầng Kiến Trúc Phụ Trách | Giải Pháp Kỹ Thuật | Phương Pháp Kiểm Chứng |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **NFR-01** | Hiệu năng | Dashboard tải xong $< 3$ giây với 64 phòng | Backend API + Frontend | Index tối ưu trong PostgreSQL, DTO tinh gọn | Đo qua Chrome DevTools Network Tab & BenchmarkDotNet |
| **NFR-02** | Hiệu năng | Sinh hóa đơn 64 phòng $< 30$ giây | Backend Background Worker | Xử lý Bulk Insert / Batching qua EF Core | Đo thời gian chạy thực tế của Cronjob ngày 28 |
| **NFR-03** | Khả dụng | Uptime $\ge$ 99% | DevOps & Hosting | Triển khai trên nền tảng Cloud ổn định (Supabase, Vercel/Render) | UptimeRobot giám sát 24/7 |
| **NFR-04** | Bảo mật | Mật khẩu hash Bcrypt cost $\ge$ 10 | Backend Domain | Sử dụng thư viện `BCrypt.Net-Next` với work factor = 11 | Unit test kiểm tra độ dài và định dạng salt/hash |
| **NFR-05** | Bảo mật | Phân quyền theo role, kiểm tra scope mọi API | Web API Controllers | ASP.NET Core `[Authorize(Roles = "...")]` + Policy Check | Automation Integration Test kiểm tra mã HTTP 403 Forbidden |
| **NFR-06** | Bảo mật | Ảnh CCCD/Hợp đồng lưu riêng, truy cập qua Signed URL | Cloud Storage (Supabase) | Bucket `private`, sinh URL tạm có hạn (TTL 15 phút) | Test truy cập trực tiếp bị chặn, chỉ mở được qua Signed URL |
| **NFR-07** | Trải nghiệm (UX) | Tác vụ chính $\le$ 3 lần chạm trên mobile | Frontend UI/UX | Tối ưu luồng người dùng (Bottom navigation, Quick actions) | Đo số lần tap trên màn hình kiểm thử thực tế |
| **NFR-08** | Tương thích | Responsive từ 360px; Chrome/Safari/Edge 2 năm | Frontend Styling | Tailwind CSS responsive classes (`sm:`, `md:`, `lg:`) | Kiểm thử giao diện trên Chrome DevTools Device Mode |
| **NFR-09** | Ngoại tuyến (Offline)| Ghi chỉ số điện offline, tự sync khi có mạng | Frontend Mobile Client | Sử dụng **Dexie.js (IndexedDB)** và Service Worker / Online Listener | Giả lập Network Offline trong DevTools và kiểm tra Auto-Sync |
| **NFR-10** | Sao lưu (Backup) | Tự động backup DB hàng ngày, lưu 30 ngày | Database Infrastructure | Kích hoạt tính năng Point-in-time Recovery & Daily Backup Supabase | Kiểm tra bảng lịch sử backup trên dashboard Supabase |
| **NFR-11** | Nhật ký (Audit) | Lưu log mọi thao tác sửa/xóa hợp đồng & hóa đơn | Backend Infrastructure | Cấu hình **EF Core SaveChangesInterceptor** ghi bảng `AuditLogs` | Thực hiện update HĐ/Hóa đơn và kiểm tra bản ghi trong DB |
| **NFR-12** | Ngôn ngữ & Tiền tệ | UI tiếng Việt; định dạng tiền tệ VNĐ (vd: 2.500.000đ) | Frontend UI | Format chuẩn `Intl.NumberFormat('vi-VN', { currency: 'VND' })` | Kiểm tra hiển thị tiền tệ trên toàn bộ các trang |
| **NFR-13** | Múi giờ | Cố định múi giờ `Asia/Ho_Chi_Minh` (UTC+7) | Toàn hệ thống | Cấu hình timezone PostgreSQL và .NET AppDomain UTC+7 | Kiểm tra timestamp các bản ghi và thời điểm kích hoạt Cronjob |

---

## 5. Thống Kê Bao Phủ Yêu Cầu (Coverage Summary)

- **Tổng số Yêu cầu Chức năng:** 48/48 (100% bao phủ)
  - *Must-have (Bắt buộc cho MVP):* 39 yêu cầu (chiếm 81.25%)
  - *Should-have (Mở rộng sau MVP):* 9 yêu cầu (chiếm 18.75%)
- **Tổng số Quy tắc Nghiệp vụ:** 14/14 (100% bao phủ)
- **Tổng số Yêu cầu Phi chức năng:** 13/13 (100% bao phủ)
- **Tình trạng:** Sẵn sàng làm căn cứ cho việc thiết kế sơ đồ ERD, Use Case và mã nguồn từ Sprint 1.
