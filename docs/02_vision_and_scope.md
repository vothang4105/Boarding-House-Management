# MBHMS — TÀI LIỆU TẦM NHÌN, PHẠM VI & MA TRẬN PHÂN QUYỀN
# (Vision & Scope Document with RBAC Permission Matrix)

> **Dự án:** Mini Boarding House Management System (MBHMS)  
> **Khách hàng:** Chị Nguyễn Thị Lan — Chủ nhà trọ cá nhân tại Làng Đại học Thủ Đức, TP.HCM  
> **Quy mô:** 3 dãy trọ · 64 phòng · Đối tượng chính: Sinh viên  
> **Phiên bản tài liệu:** 1.1 (Cập nhật theo CR-01 — Tích hợp SePay VietQR & Webhook)  
> **Ngày phát hành:** 2026-11-16  
> **Căn cứ gốc:** SRS v1.0 (08/06/2026), CR-01 (15/11/2026)

---

## MỤC LỤC

1. [Bối cảnh & Bài toán chuyển đổi số](#1-bối-cảnh--bài-toán-chuyển-đổi-số)
2. [Mục tiêu kinh doanh & Chỉ số đo lường](#2-mục-tiêu-kinh-doanh--chỉ-số-đo-lường)
3. [Ranh giới phạm vi dự án](#3-ranh-giới-phạm-vi-dự-án)
4. [Stakeholders & Đặc tả 4 nhóm người dùng](#4-stakeholders--đặc-tả-4-nhóm-người-dùng)
5. [Ma trận phân quyền RBAC](#5-ma-trận-phân-quyền-rbac)
6. [Thiết kế kỹ thuật cô lập dữ liệu theo dãy (BR-14 & NFR-05)](#6-thiết-kế-kỹ-thuật-cô-lập-dữ-liệu-theo-dãy-br-14--nfr-05)
7. [Bảng thuật ngữ](#7-bảng-thuật-ngữ)

---

## 1. Bối cảnh & Bài toán chuyển đổi số

### 1.1. Hiện trạng vận hành

Chị Nguyễn Thị Lan hiện đang sở hữu và tự vận hành **3 dãy nhà trọ** (ký hiệu: Dãy A, Dãy B, Dãy C) với tổng cộng **64 phòng** cho thuê sinh viên, tọa lạc tại khu **Làng Đại học Thủ Đức, TP.HCM** — một trong những cụm dân cư sinh viên lớn nhất thành phố với mật độ cho thuê rất cao.

Toàn bộ quy trình quản lý hiện tại được thực hiện **hoàn toàn thủ công** thông qua:

- **Sổ tay ghi chép bằng tay:** Ghi nhận chỉ số điện, tiền phòng, thông tin khách thuê, lịch sử hợp đồng.
- **Bảng tính Microsoft Excel:** Tính tiền hàng tháng, theo dõi công nợ, lưu danh sách phòng trống.
- **Nhắn tin qua Zalo cá nhân:** Thông báo hóa đơn, nhắc nợ, tiếp nhận sự cố hư hỏng từ khách thuê.

### 1.2. Những bất cập & tổn thất nhận diện được

| # | Vấn đề | Hệ quả |
| :---: | :--- | :--- |
| 1 | **Chốt tiền cuối tháng mất 2 ngày** vì phải dò sổ tay, đối chiếu Excel, gõ tin nhắn từng phòng qua Zalo. | Chậm thu tiền, ảnh hưởng dòng tiền chi trả điện lực EVN và bảo trì. |
| 2 | **Sai sót tính tiền điện/nước** do ghi chỉ số nhầm hoặc tính nhầm trong Excel. | Tranh chấp với sinh viên, mất uy tín chủ trọ, phải kiểm tra lại mất thêm thời gian. |
| 3 | **Quên gia hạn hợp đồng** vì không có cơ chế nhắc nhở tự động trước khi hết hạn. | Phòng trống đột ngột, mất doanh thu 1-2 tháng, phải tìm khách mới. |
| 4 | **Không có báo cáo tài chính tổng quan** (doanh thu, lợi nhuận, công nợ). | Không biết dãy nào hoạt động hiệu quả nhất, không có dữ liệu ra quyết định đầu tư/sửa chữa. |
| 5 | **Hợp đồng giấy dễ thất lạc** khi quản lý nhiều năm qua nhiều đời khách thuê. | Rủi ro pháp lý khi xảy ra tranh chấp, không có bản lưu trữ số an toàn. |
| 6 | **Không quản lý tập trung sự cố hư hỏng**: Sinh viên nhắn Zalo báo hỏng xen kẽ tin nhắn cá nhân. | Bỏ sót yêu cầu sửa chữa, phản hồi chậm, giảm sự hài lòng của khách thuê. |

### 1.3. Giải pháp đề xuất

Xây dựng hệ thống **MBHMS (Mini Boarding House Management System)** — một **Web Application responsive** tối ưu hoạt động mượt mà trên cả điện thoại di động và máy tính — nhằm **tin học hóa và tự động hóa toàn bộ chu trình** quản lý nhà trọ: từ quản lý phòng, hợp đồng, ghi chỉ số điện, tự động sinh hóa đơn, thanh toán trực tuyến qua **SePay VietQR**, đối soát tự động qua **Webhook**, đến báo cáo doanh thu và quản lý sự cố.

---

## 2. Mục tiêu kinh doanh & Chỉ số đo lường

| Mã | Mục tiêu kinh doanh | Chỉ số đo lường (KPI) | Giá trị hiện tại | Giá trị mục tiêu |
| :--- | :--- | :--- | :--- | :--- |
| **BG-01** | Tăng tốc độ chốt tiền và phát hành hóa đơn cuối tháng | Thời gian hoàn thành phát hành hóa đơn cho toàn bộ 64 phòng | **2 ngày** (thủ công) | **< 2 giờ** (tự động + rà soát) |
| **BG-02** | Giảm tỷ lệ phòng trống do quên gia hạn hoặc thiếu chuẩn bị | Phần trăm phòng trống tại bất kỳ thời điểm nào | Không đo được chính xác | **< 5%** (tương đương $\le 3$ phòng trong tổng 64) |
| **BG-03** | Loại bỏ tranh chấp do tính sai tiền | Số vụ tranh chấp mỗi tháng do sai số điện, nước hoặc dịch vụ | 2–3 vụ/tháng (ước tính) | **0 vụ/tháng** |
| **BG-04** | Minh bạch tài chính cho chủ trọ | Báo cáo doanh thu (P&L) theo tháng và lũy kế năm | Không có | **Có báo cáo real-time** trên Dashboard |
| **BG-05** | Số hóa toàn bộ hồ sơ hợp đồng & định danh khách thuê | Tỷ lệ hợp đồng và ảnh CCCD được lưu trữ trên hệ thống | 0% (hoàn toàn giấy tờ) | **100%** lưu trữ số trên Cloud |

---

## 3. Ranh giới phạm vi dự án

### 3.1. Trong phạm vi (In-Scope)

| # | Phạm vi | Mô tả chi tiết |
| :---: | :--- | :--- |
| 1 | **Nền tảng Web App Responsive** | Ứng dụng web tối ưu cho cả điện thoại di động (viewport $\ge 360\text{px}$) và laptop/desktop. Mọi tác vụ chính hoàn thành trong $\le 3$ lần chạm trên mobile (`NFR-07`). Hỗ trợ Chrome, Safari, Edge 2 năm gần nhất (`NFR-08`). |
| 2 | **Quản lý Dãy trọ & Phòng** | Quản lý 3 dãy (Dãy A, B, C) với 64 phòng thuộc 3 loại: Đơn (1 người), Đôi (2 người), Gia đình ($\le 4$ người). Sơ đồ phòng dạng grid đổi màu theo 4 trạng thái (Trống, Đang thuê, Đặt cọc giữ chỗ, Bảo trì). Upload tối đa 5 ảnh công khai/phòng. |
| 3 | **Quản lý Hợp đồng & Khách thuê** | Tạo hợp đồng thuê gắn người đại diện (CCCD duy nhất — `BR-13`), khai báo thành viên ở cùng, kiểm soát sức chứa (`BR-10`). Upload scan hợp đồng PDF ($\le 10\text{MB}$) và ảnh CCCD lưu trữ an toàn qua Private Storage Signed URL (`NFR-06`). Hỗ trợ gia hạn và chấm dứt hợp đồng với quy tắc hoàn/phạt cọc 50% (`BR-11`). Tự động nhắc trước 30 ngày khi sắp hết hạn (`FR-13`). |
| 4 | **Ghi chỉ số Điện Ngoại tuyến (Offline-First)** | Quản lý dãy ghi chỉ số điện trực tiếp trên điện thoại, hỗ trợ hoạt động **Offline** lưu tạm trên IndexedDB (Dexie.js) và tự động đồng bộ lên Server khi có mạng trở lại (`FR-18`, `NFR-09`). |
| 5 | **Tự động Sinh hóa đơn & Tính tiền** | Cronjob ngày 28 hàng tháng tự động chốt chỉ số điện, tính tiền điện 3.500đ/kWh (`BR-01`), nước 100.000đ/người (`BR-02`), internet 50.000đ/người (`BR-03`), rác 20.000đ/phòng (`BR-04`), giữ xe 100.000đ/xe (`BR-05`), cộng tiền phòng cố định để phát hành hóa đơn cho toàn bộ phòng đang thuê trong $< 30$ giây (`NFR-02`). |
| 6 | **Thanh toán trực tuyến SePay VietQR & Đối soát Webhook** *(CR-01)* | Hiển thị mã VietQR động chuẩn NAPAS247 cho khách thuê quét thanh toán, tiền chuyển thẳng vào tài khoản ngân hàng cá nhân chủ trọ. SePay Webhook đối soát tự động: bóc tách mã hóa đơn từ nội dung chuyển khoản, xác thực API Key, chuyển trạng thái hóa đơn sang `PAID` tức thì. Hỗ trợ thanh toán tiền mặt (Cash) cho khách nộp trực tiếp. |
| 7 | **Quản lý Sự cố & Ticket Hỗ trợ** | Khách thuê tạo ticket báo sự cố kèm tối đa 3 ảnh, phân loại 4 mức độ (Thấp, Trung bình, Cao, Khẩn cấp). Quản lý/Chủ trọ tiếp nhận, bình luận, cập nhật tiến độ qua 4 trạng thái (Mới, Đang xử lý, Đã xử lý, Đã đóng). Khách đánh giá 1–5 sao sau khi ticket đóng. |
| 8 | **Thông báo đa kênh (Email + In-app)** | Hệ thống thông báo chuông In-app với badge số chưa đọc và gửi email tự động qua **Resend** (production) / **Mailtrap** (test) cho các sự kiện: hóa đơn mới, quá hạn 3 ngày, hợp đồng sắp hết hạn, cập nhật ticket, kích hoạt tài khoản mới. |
| 9 | **Dashboard & Báo cáo tài chính** | Dashboard KPI thời gian thực: tỷ lệ lấp đầy, doanh thu tháng, số hóa đơn quá hạn, số ticket mở — tải xong trong $< 3$ giây (`NFR-01`). Biểu đồ cột doanh thu 12 tháng. Báo cáo công nợ chi tiết. Xuất báo cáo Excel `.xlsx`. |
| 10 | **Phân quyền RBAC & Cô lập dữ liệu** | 4 nhóm vai trò (Owner, Manager, Tenant, Guest). Manager bị cô lập nghiêm ngặt theo dãy được phân công (`BR-14`). Kiểm tra quyền tại tầng API server, không phụ thuộc UI (`NFR-05`). |

### 3.2. Ngoài phạm vi (Out-of-Scope)

| # | Hạng mục loại trừ | Lý do |
| :---: | :--- | :--- |
| 1 | ❌ **Native Mobile App (iOS / Android)** | Tập trung tối ưu Web Responsive + PWA chuẩn mobile ($\ge 360\text{px}$), đủ đáp ứng nhu cầu người dùng mà không cần phát triển song song 2 nền tảng native (`NFR-08`). |
| 2 | ❌ **Camera an ninh / IoT đồng hồ điện thông minh** | Phần cứng IoT vượt quá ngân sách và phạm vi dự án phần mềm. Chỉ số điện được ghi thủ công qua giao diện web (hỗ trợ Offline-first). |
| 3 | ❌ **Tích hợp Zalo OA / SMS Gateway / Push Notification** | Tiết kiệm chi phí vận hành dịch vụ bên thứ 3. Hệ thống thông báo tập trung qua Email (miễn phí tier Resend) và In-app Notifications. |
| 4 | ❌ **Đa ngôn ngữ (i18n)** | Hệ thống phục vụ 100% người dùng Việt Nam. Chỉ hỗ trợ giao diện tiếng Việt, định dạng tiền tệ VNĐ (`NFR-12`). |
| 5 | ❌ **Quản lý nhân sự / Bán hàng tạp hóa / Blacklist liên nhà trọ** | Vượt phạm vi bài toán quản lý cho thuê phòng trọ của dự án MVP. |
| 6 | ❌ **Tính lãi phạt chậm nộp hóa đơn tự động** | Phiên bản 1.0 chỉ ghi nhận trạng thái Quá hạn, không tính lãi tự động (`BR-09`). |

---

## 4. Stakeholders & Đặc tả 4 nhóm người dùng

### 4.1. Tổng quan các bên liên quan

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     HỆ THỐNG MBHMS                                     │
│                                                                         │
│   ┌─────────────┐  ┌───────────────┐  ┌──────────────┐  ┌───────────┐ │
│   │   OWNER     │  │   MANAGER     │  │   TENANT     │  │   GUEST   │ │
│   │  (1 người)  │  │  (1-3 người)  │  │ (~64-100)    │  │ (vô hạn) │ │
│   │             │  │               │  │              │  │           │ │
│   │  Toàn quyền │  │  Vận hành     │  │  Xem & Thanh │  │  Xem     │ │
│   │  hệ thống   │  │  theo dãy     │  │  toán        │  │  phòng   │ │
│   │  + Báo cáo  │  │  được giao    │  │  + Báo sự cố │  │  trống   │ │
│   └─────────────┘  └───────────────┘  └──────────────┘  └───────────┘ │
│       Laptop &         Mobile              Mobile         Mobile &     │
│       Mobile                                              Desktop      │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2. Đặc tả chi tiết từng vai trò

#### 4.2.1. Chủ trọ — `Owner` (1 người)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Đại diện thực tế** | Chị Nguyễn Thị Lan |
| **Số lượng** | Cố định **1 người** duy nhất trong hệ thống |
| **Thiết bị sử dụng** | Laptop (chủ yếu xem báo cáo, cấu hình) + Điện thoại (duyệt nhanh) |
| **Phạm vi dữ liệu** | **Toàn hệ thống** — truy cập đầy đủ dữ liệu tất cả 3 dãy (Dãy A, B, C) |
| **Trách nhiệm chính** | • Quản trị toàn bộ hệ thống: tạo/sửa/xóa dãy trọ, phòng trọ, cấu hình giá dịch vụ.<br>• Tạo tài khoản Manager và phân quyền theo dãy (`FR-47`).<br>• Tạo hồ sơ khách thuê, lập hợp đồng thuê, gia hạn hoặc chấm dứt hợp đồng.<br>• Duyệt, chỉnh sửa phụ thu và phát hành hóa đơn.<br>• Xác nhận thanh toán tiền mặt khi khách nộp trực tiếp.<br>• Xem toàn bộ Dashboard KPI, báo cáo doanh thu lãi/lỗ (P&L), công nợ, xuất Excel.<br>• Gửi thông báo chung đến toàn bộ khách thuê một dãy (`FR-38`).<br>• Xem, xử lý và đóng ticket sự cố trên mọi dãy. |
| **Quyền đặc biệt** | Là vai trò duy nhất được xem **báo cáo doanh thu / lợi nhuận tổng** và **tạo / quản lý tài khoản** cho các Manager. |

#### 4.2.2. Quản lý dãy — `Manager` (1 – 3 người)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Đại diện thực tế** | Người được chị Lan thuê quản lý từng dãy trọ (ví dụ: anh A quản lý Dãy A, chị B quản lý Dãy B) |
| **Số lượng** | Tối thiểu 1, tối đa **3 người** (1 Manager/dãy trọ, có thể gán quản lý nhiều dãy) |
| **Thiết bị sử dụng** | **Điện thoại di động** là chủ yếu (thao tác tại hiện trường khi đi ghi điện, tiếp nhận sự cố) |
| **Phạm vi dữ liệu** | **Bị cô lập nghiêm ngặt theo dãy trọ được phân công** (`BR-14`). Manager dãy A **tuyệt đối không** truy xuất được bất kỳ dữ liệu nào của dãy B hoặc C. |
| **Trách nhiệm chính** | • Quản lý phòng trọ thuộc dãy được giao: cập nhật trạng thái, upload ảnh phòng.<br>• Tạo hồ sơ khách thuê, lập hợp đồng, gia hạn và chấm dứt hợp đồng cho phòng thuộc dãy mình.<br>• Ghi chỉ số điện hàng tháng trên thiết bị di động (hỗ trợ Offline — `FR-18`).<br>• Thêm/sửa phụ thu trên hóa đơn trước khi phát hành.<br>• Xác nhận khách đã nộp tiền mặt (`FR-25`).<br>• Tiếp nhận, bình luận, cập nhật trạng thái ticket sự cố của dãy mình.<br>• Xem báo cáo công nợ **chỉ thuộc phạm vi dãy** được giao. |
| **Hạn chế** | ❌ Không được xem Dashboard doanh thu tổng hoặc báo cáo P&L.<br>❌ Không được tạo/sửa/xóa dãy trọ.<br>❌ Không được tạo tài khoản cho Manager khác.<br>❌ Không truy cập được dữ liệu của dãy không phụ trách. |

#### 4.2.3. Khách thuê — `Tenant` (~64 – 100 người)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Đại diện thực tế** | Sinh viên đại diện đứng tên hợp đồng thuê phòng |
| **Số lượng** | Ước tính **64 đến 100 người** (1 người đại diện/hợp đồng, có thể có thành viên ở cùng) |
| **Thiết bị sử dụng** | **Điện thoại di động** 100% |
| **Phạm vi dữ liệu** | **Chỉ dữ liệu của chính mình**: hợp đồng, phòng, hóa đơn và ticket sự cố do mình tạo. |
| **Trách nhiệm / Quyền** | • Xem hợp đồng thuê (chỉ đọc — `FR-14`).<br>• Xem danh sách hóa đơn hàng tháng và chi tiết từng hóa đơn.<br>• Thanh toán bằng cách quét mã **VietQR SePay** trực tiếp từ ứng dụng ngân hàng (`FR-25`).<br>• Tạo ticket báo sự cố kèm ảnh minh chứng ($\le 3$ ảnh — `FR-30`).<br>• Đánh giá 1–5 sao sau khi ticket được đóng (`FR-34`).<br>• Xem hộp thông báo In-app (`FR-36`).<br>• Đổi mật khẩu, cập nhật thông tin cá nhân (`FR-48`).<br>• Xem lịch sử chỉ số điện của phòng mình (`FR-20`). |
| **Hạn chế** | ❌ Không được tạo/sửa/xóa phòng, hợp đồng, hóa đơn.<br>❌ Không truy cập Dashboard hoặc báo cáo tài chính.<br>❌ Không xem dữ liệu phòng/hóa đơn khách khác. |

#### 4.2.4. Khách vãng lai — `Guest` (Không giới hạn)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Đại diện thực tế** | Sinh viên hoặc người có nhu cầu tìm phòng trọ, chưa có tài khoản |
| **Số lượng** | **Không giới hạn** (truy cập trang công khai) |
| **Thiết bị sử dụng** | Điện thoại di động + Desktop |
| **Phạm vi dữ liệu** | **Chỉ dữ liệu công khai**: danh sách phòng trống, ảnh phòng, giá thuê, thông tin liên hệ. |
| **Quyền** | • Xem danh mục phòng trống công khai, ảnh phòng, giá thuê.<br>• Đăng ký lịch hẹn xem phòng trực tiếp. |
| **Hạn chế** | ❌ Không đăng nhập vào hệ thống.<br>❌ Không xem hợp đồng, hóa đơn, ticket hoặc bất kỳ dữ liệu nội bộ nào. |

---

## 5. Ma trận phân quyền RBAC

### 5.1. Quy ước ký hiệu

| Ký hiệu | Ý nghĩa |
| :---: | :--- |
| **C** | Create (Tạo mới) |
| **R** | Read (Đọc / Xem) |
| **U** | Update (Cập nhật / Sửa) |
| **D** | Delete (Xóa) |
| **X** | Execute (Thực thi hành động hệ thống) |
| **—** | Không có quyền |
| **(scope)** | Dữ liệu bị giới hạn theo phạm vi dãy được phân công (Manager) hoặc phòng của mình (Tenant) |

### 5.2. Module Quản lý Nhà & Phòng (FR-01 → FR-06)

| ID | Yêu cầu chức năng | Owner | Manager | Tenant | Guest |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **FR-01** | Tạo/sửa/xóa Dãy trọ (tên, địa chỉ, số phòng, người quản lý) | **CRUD** | — | — | — |
| **FR-02** | Tạo/sửa/xóa Phòng (số phòng, loại, diện tích, giá, sức chứa, trạng thái) | **CRUD** | **CRU** *(scope: chỉ dãy được giao)* | — | — |
| **FR-03** | Hỗ trợ 3 loại phòng: Đơn, Đôi, Gia đình | **R** | **R** *(scope)* | — | — |
| **FR-04** | 4 trạng thái phòng: Trống, Đang thuê, Đặt cọc, Bảo trì | **RU** | **RU** *(scope)* | — | — |
| **FR-05** | Xem sơ đồ phòng dạng grid theo dãy, đổi màu theo trạng thái | **R** | **R** *(scope)* | — | — |
| **FR-06** | Upload tối đa 5 ảnh/phòng (JPG/PNG, $\le 5\text{MB}$/ảnh) | **CRD** | **CRD** *(scope)* | — | **R** *(chỉ ảnh phòng trống công khai)* |

### 5.3. Module Khách thuê & Hợp đồng (FR-07 → FR-14)

| ID | Yêu cầu chức năng | Owner | Manager | Tenant | Guest |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **FR-07** | Tạo hồ sơ khách thuê: họ tên, CCCD, SĐT, email, ảnh CCCD | **CRU** | **CRU** *(scope)* | — | — |
| **FR-08** | Tạo hợp đồng thuê: phòng, người đại diện, người ở cùng, kỳ hạn, giá, cọc | **CR** | **CR** *(scope)* | — | — |
| **FR-09** | Upload file hợp đồng đã ký (PDF, $\le 10\text{MB}$) | **CRU** | **CRU** *(scope)* | — | — |
| **FR-10** | Gia hạn hợp đồng (tạo hợp đồng nối tiếp, giữ lịch sử) | **CRU** | **CRU** *(scope)* | — | — |
| **FR-11** | Chấm dứt hợp đồng trước hạn: lý do, ngày trả phòng, xử lý cọc | **CRU** | **CRU** *(scope)* | — | — |
| **FR-12** | Khi tạo HĐ → tự động đổi trạng thái phòng → "Đang thuê" | **X** *(auto)* | **X** *(auto, scope)* | — | — |
| **FR-13** | Tự động nhắc trước 30 ngày khi hợp đồng sắp hết hạn | **X** *(hệ thống)* | **X** *(hệ thống, scope)* | **X** *(nhận thông báo)* | — |
| **FR-14** | Khách thuê xem hợp đồng của mình (chỉ đọc) | **R** | **R** *(scope)* | **R** *(chỉ HĐ của mình)* | — |

### 5.4. Module Chỉ số Điện & Nước (FR-15 → FR-20)

| ID | Yêu cầu chức năng | Owner | Manager | Tenant | Guest |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **FR-15** | Nhập chỉ số điện từng phòng theo tháng (kèm ảnh đồng hồ tùy chọn) | **CRU** | **CRU** *(scope)* | — | — |
| **FR-16** | Tự tính số kWh tiêu thụ = chỉ số mới − chỉ số cũ | **X** *(auto)* | **X** *(auto)* | — | — |
| **FR-17** | Cảnh báo nếu kWh tăng > 200% trung bình 3 tháng gần nhất | **R** *(nhận cảnh báo)* | **R** *(nhận cảnh báo, scope)* | — | — |
| **FR-18** | Hỗ trợ nhập chỉ số offline trên điện thoại → tự sync khi có mạng | — | **CRU** *(scope, offline)* | — | — |
| **FR-19** | Nước tính khoán theo đầu người (không có đồng hồ riêng) | **X** *(auto)* | **X** *(auto)* | — | — |
| **FR-20** | Xem lịch sử chỉ số điện 12 tháng theo phòng | **R** | **R** *(scope)* | **R** *(chỉ phòng mình)* | — |

### 5.5. Module Hóa đơn & Thanh toán (FR-21 → FR-29)

| ID | Yêu cầu chức năng | Owner | Manager | Tenant | Guest |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **FR-21** | Ngày 28 hàng tháng, tự sinh hóa đơn cho mọi phòng đang thuê | **X** *(hệ thống / trigger thủ công)* | — | — | — |
| **FR-22** | Hóa đơn gồm: tiền phòng, điện, nước, internet, rác, giữ xe, phụ phí | **R** | **R** *(scope)* | **R** *(chỉ HĐ của mình)* | — |
| **FR-23** | Owner/Manager thêm/sửa khoản phụ thu trước khi gửi | **CRU** | **CRU** *(scope)* | — | — |
| **FR-24** | Gửi hóa đơn qua email + in-app | **X** | **X** *(scope)* | **R** *(nhận thông báo)* | — |
| **FR-25** | Đóng tiền qua mã QR VietQR (SePay) hoặc đánh dấu "đã đóng tiền mặt" | **U** *(xác nhận cash)* | **U** *(xác nhận cash, scope)* | **X** *(quét VietQR SePay)* | — |
| **FR-26** | Đối soát thanh toán tự động qua SePay Webhook | **X** *(hệ thống)* | — | — | — |
| **FR-27** | Hóa đơn có 4 trạng thái: Nháp, Đã gửi, Đã thanh toán, Quá hạn | **RU** | **RU** *(scope)* | **R** *(chỉ HĐ mình)* | — |
| **FR-28** | Tự đánh dấu Quá hạn nếu sau ngày 5 tháng sau chưa đóng | **X** *(hệ thống)* | — | — | — |
| **FR-29** | In/Xuất hóa đơn ra PDF | **R** *(xuất)* | **R** *(xuất, scope)* | **R** *(xuất, chỉ HĐ mình)* | — |

### 5.6. Module Sự cố / Bảo trì (FR-30 → FR-35)

| ID | Yêu cầu chức năng | Owner | Manager | Tenant | Guest |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **FR-30** | Khách tạo ticket sự cố: tiêu đề, mô tả, mức độ, ảnh ($\le 3$ ảnh) | — | — | **CR** *(chỉ phòng mình)* | — |
| **FR-31** | Ticket có 4 trạng thái: Mới, Đang xử lý, Đã xử lý, Đã đóng | **RU** | **RU** *(scope)* | **R** *(chỉ ticket mình)* | — |
| **FR-32** | Xem danh sách ticket, lọc theo dãy/trạng thái/mức độ | **R** | **R** *(scope)* | — | — |
| **FR-33** | Bình luận / cập nhật trạng thái ticket | **CRU** | **CRU** *(scope)* | — | — |
| **FR-34** | Khách đánh giá 1–5 sao sau khi ticket được đóng | — | — | **CU** *(chỉ ticket mình, chỉ khi CLOSED)* | — |
| **FR-35** | Thông báo cho khách khi ticket được cập nhật | **X** *(hệ thống)* | **X** *(hệ thống)* | **R** *(nhận thông báo)* | — |

### 5.7. Module Thông báo & Nhắc nhở (FR-36 → FR-38)

| ID | Yêu cầu chức năng | Owner | Manager | Tenant | Guest |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **FR-36** | Hộp thông báo in-app cho mọi role (chuông + badge số chưa đọc) | **RU** *(đọc, đánh dấu đã đọc)* | **RU** *(scope)* | **RU** | — |
| **FR-37** | Email tự động: hóa đơn mới, quá hạn 3 ngày, HĐ sắp hết hạn, ticket update | **X** *(hệ thống)* | **R** *(nhận email scope)* | **R** *(nhận email)* | — |
| **FR-38** | Owner gửi thông báo chung đến toàn bộ khách thuê 1 dãy | **CX** *(soạn + gửi)* | — | **R** *(nhận thông báo)* | — |

### 5.8. Module Báo cáo & Dashboard (FR-39 → FR-43)

| ID | Yêu cầu chức năng | Owner | Manager | Tenant | Guest |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **FR-39** | Dashboard chính: tỷ lệ lấp đầy, doanh thu tháng, số HĐ quá hạn, số ticket mở | **R** | — | — | — |
| **FR-40** | Báo cáo doanh thu theo tháng (12 tháng), biểu đồ cột | **R** | — | — | — |
| **FR-41** | Báo cáo công nợ: liệt kê hóa đơn Quá hạn kèm số ngày trễ | **R** | **R** *(scope: chỉ dãy được giao)* | — | — |
| **FR-42** | Báo cáo tỷ lệ lấp đầy theo dãy & theo tháng | **R** | — | — | — |
| **FR-43** | Xuất báo cáo ra Excel (.xlsx) | **X** *(xuất)* | — | — | — |

### 5.9. Module Quản trị Người dùng (FR-44 → FR-48)

| ID | Yêu cầu chức năng | Owner | Manager | Tenant | Guest |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **FR-44** | Đăng ký tài khoản Khách thuê do Owner/Manager tạo, gửi link kích hoạt email | **CRU** | **CRU** *(scope)* | — | — |
| **FR-45** | Đăng nhập bằng email + mật khẩu | **X** | **X** | **X** | — |
| **FR-46** | Quên mật khẩu → reset qua email | **X** | **X** | **X** | — |
| **FR-47** | Owner tạo tài khoản Manager, phân quyền theo dãy trọ | **CRU** | — | — | — |
| **FR-48** | Đổi mật khẩu, cập nhật thông tin cá nhân | **RU** *(profile mình)* | **RU** *(profile mình)* | **RU** *(profile mình)* | — |

### 5.3. Bảng tổng hợp quyền truy cập theo Module

| Module chức năng | Owner | Manager | Tenant | Guest |
| :--- | :---: | :---: | :---: | :---: |
| Quản lý Dãy trọ | Full CRUD | — | — | — |
| Quản lý Phòng | Full CRUD | CRU *(scope)* | — | R *(phòng trống)* |
| Khách thuê & Hợp đồng | Full CRU | CRU *(scope)* | R *(chỉ đọc HĐ mình)* | — |
| Ghi chỉ số Điện | Full CRU | CRU *(scope, offline)* | R *(lịch sử phòng mình)* | — |
| Hóa đơn & Thanh toán | Full CRUD + Trigger | CRU *(scope)* | R + Thanh toán VietQR | — |
| Sự cố / Ticket | Full CRUD | CRU *(scope)* | CR *(tạo + đánh giá)* | — |
| Thông báo | Full + Gửi chung | RU *(scope)* | RU *(nhận)* | — |
| Dashboard & Báo cáo | Full R + Xuất Excel | R *(công nợ scope)* | — | — |
| Quản trị Người dùng | Full + Tạo Manager | CRU Tenant *(scope)* | RU *(profile mình)* | — |

---

## 6. Thiết kế kỹ thuật cô lập dữ liệu theo dãy (BR-14 & NFR-05)

### 6.1. Bài toán

> **BR-14:** Manager chỉ thấy dữ liệu của dãy được phân công.  
> **NFR-05:** Phân quyền theo role; mọi API endpoint kiểm tra quyền. Không chỉ dựa trên UI ẩn/hiện.

Yêu cầu này đòi hỏi một cơ chế **Data Isolation (Cô lập dữ liệu)** đảm bảo rằng Manager dãy A **tuyệt đối không thể** truy xuất, sửa đổi hoặc xem bất kỳ dữ liệu nào thuộc dãy B hoặc dãy C — kể cả khi cố tình gửi request trực tiếp tới API (bypass UI).

### 6.2. Mô hình dữ liệu: Bảng trung gian `BuildingManagers`

Thay vì gắn cứng cột `ManagerId` trên bảng `Buildings` (chỉ cho phép 1 Manager/dãy), hệ thống sử dụng **bảng liên kết N:N** (`BuildingManagers`) cho phép:
- Một Manager có thể quản lý **nhiều dãy** (ví dụ: giai đoạn chưa tuyển đủ quản lý).
- Một dãy có thể có **nhiều Manager** cùng phụ trách (ví dụ: ca ngày và ca tối).

```
┌──────────────┐       ┌─────────────────────┐       ┌──────────────┐
│    Users     │       │  BuildingManagers    │       │  Buildings   │
│──────────────│       │─────────────────────│       │──────────────│
│ Id (PK)      │───┐   │ Id (PK)             │   ┌───│ Id (PK)      │
│ Email        │   └──>│ UserId (FK)         │   │   │ Code         │
│ PasswordHash │       │ BuildingId (FK)     │<──┘   │ Name         │
│ FullName     │       │ AssignedAt          │       │ Address      │
│ Role         │       └─────────────────────┘       │ TotalRooms   │
│ IsActive     │                                      └──────────────┘
└──────────────┘
```

**Đặc tả thực thể:**

```csharp
public class BuildingManager
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }        // FK → Users.Id (Role = MANAGER)
    public Guid BuildingId { get; set; }     // FK → Buildings.Id
    public DateTime AssignedAt { get; set; } // Ngày được phân công

    // Navigation Properties
    public virtual User User { get; set; }
    public virtual Building Building { get; set; }
}
```

**Ràng buộc:**
- `UNIQUE(UserId, BuildingId)`: Không gán trùng.
- `Users.Role` phải là `MANAGER` khi tạo bản ghi `BuildingManagers`.

### 6.3. Kiến trúc bảo vệ đa tầng (Defense in Depth)

Hệ thống áp dụng **2 tầng bảo vệ** song song để đảm bảo an toàn ngay cả khi lập trình viên quên viết mệnh đề `Where` trong code nghiệp vụ:

```
┌─────────────────────────────────────────────────────────────┐
│                    REQUEST TỪ CLIENT                        │
│    Authorization: Bearer <JWT Token>                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  TẦNG 1: API Authorization Middleware / Handler             │
│                                                             │
│  1. Giải mã JWT → Lấy UserId, Role                         │
│  2. Nếu Role == OWNER  → Cho phép (Toàn quyền)             │
│  3. Nếu Role == MANAGER:                                    │
│     a. Truy vấn BuildingManagers → Lấy AssignedBuildingIds  │
│     b. Kiểm tra BuildingId trên Route/Query có thuộc        │
│        AssignedBuildingIds không.                            │
│     c. Nếu không thuộc → Trả về 403 Forbidden               │
│  4. Nếu Role == TENANT → Kiểm tra ownership theo TenantId  │
│  5. Nếu Role == GUEST  → Chỉ cho phép endpoint public      │
└──────────────────────────┬──────────────────────────────────┘
                           │ (Đã xác thực + phân quyền)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  TẦNG 2: EF Core Global Query Filter (DbContext)           │
│                                                             │
│  Tự động áp bộ lọc ở cấp DbContext cho MỌI truy vấn:       │
│                                                             │
│  • Owner:   KHÔNG áp filter (xem tất cả)                   │
│  • Manager: .Where(x => AssignedBuildingIds                 │
│                           .Contains(x.BuildingId))          │
│  • Tenant:  .Where(x => x.Contract.TenantId                │
│                           == CurrentTenantId)               │
│                                                             │
│  ► Ngay cả khi developer quên viết .Where() trong code     │
│    nghiệp vụ, DbContext vẫn tự động lọc đúng phạm vi.     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
                    [KẾT QUẢ AN TOÀN]
```

#### Tầng 1: API Authorization Middleware

**Mục đích:** Chặn sớm các request vi phạm trước khi chạm tới tầng nghiệp vụ.

**Thiết kế:**
- Tạo Custom `IAuthorizationRequirement` — ví dụ: `BuildingScopeRequirement`.
- Tạo `BuildingScopeHandler : AuthorizationHandler<BuildingScopeRequirement>`:
  1. Đọc JWT Claims → Lấy `UserId` và `Role`.
  2. Nếu `Role == OWNER` → Luôn trả `Succeed()`.
  3. Nếu `Role == MANAGER`:
     - Truy vấn `BuildingManagers` → Lấy danh sách `AssignedBuildingIds`.
     - So khớp `BuildingId` trong Route Parameter hoặc Request Body.
     - Nếu không thuộc phạm vi → `Fail()` và trả HTTP `403 Forbidden`.
  4. Nếu `Role == TENANT` → Chỉ kiểm tra ownership trực tiếp (phòng/hóa đơn/ticket do mình sở hữu).

**Sử dụng trong Controller:**
```csharp
[Authorize(Policy = "BuildingScope")]
[HttpGet("api/v1/buildings/{buildingId}/rooms")]
public async Task<IActionResult> GetRooms(Guid buildingId) { ... }
```

#### Tầng 2: EF Core Global Query Filter

**Mục đích:** Lưới an toàn thứ hai — tự động lọc dữ liệu ở cấp DbContext cho **mọi** truy vấn LINQ, kể cả truy vấn không đi qua Controller có gắn `[Authorize]`.

**Cấu hình trong `OnModelCreating`:**
```csharp
// Pseudo-code minh họa nguyên tắc
protected override void OnModelCreating(ModelBuilder builder)
{
    var currentUser = _currentUserService.GetCurrentUser();

    if (currentUser.Role == Role.Manager)
    {
        var buildingIds = _buildingManagerRepo
            .GetAssignedBuildingIds(currentUser.Id);

        builder.Entity<Room>()
            .HasQueryFilter(r => buildingIds.Contains(r.BuildingId));

        builder.Entity<Contract>()
            .HasQueryFilter(c => buildingIds.Contains(c.Room.BuildingId));

        builder.Entity<Invoice>()
            .HasQueryFilter(i => buildingIds.Contains(i.Room.BuildingId));

        builder.Entity<Ticket>()
            .HasQueryFilter(t => buildingIds.Contains(t.Room.BuildingId));

        builder.Entity<ElectricityReading>()
            .HasQueryFilter(e => buildingIds.Contains(e.Room.BuildingId));
    }
    else if (currentUser.Role == Role.Tenant)
    {
        builder.Entity<Contract>()
            .HasQueryFilter(c => c.RepresentativeTenantId == currentUser.TenantId);

        builder.Entity<Invoice>()
            .HasQueryFilter(i => i.Contract.RepresentativeTenantId == currentUser.TenantId);

        builder.Entity<Ticket>()
            .HasQueryFilter(t => t.CreatedByTenantId == currentUser.TenantId);
    }
    // Owner: không áp filter → xem toàn bộ dữ liệu
}
```

### 6.4. Ma trận Scope Filter theo Entity

Bảng dưới đây tóm tắt điều kiện lọc dữ liệu áp dụng cho từng thực thể theo vai trò:

| Entity | Owner | Manager | Tenant | Guest |
| :--- | :--- | :--- | :--- | :--- |
| `Building` | Tất cả | `.Where(b => AssignedBuildingIds.Contains(b.Id))` | — | — |
| `Room` | Tất cả | `.Where(r => AssignedBuildingIds.Contains(r.BuildingId))` | — | `.Where(r => r.Status == AVAILABLE)` |
| `Tenant` (hồ sơ) | Tất cả | Qua Room → Building scope | Chỉ hồ sơ bản thân | — |
| `Contract` | Tất cả | `.Where(c => AssignedBuildingIds.Contains(c.Room.BuildingId))` | `.Where(c => c.RepresentativeTenantId == TenantId)` | — |
| `ElectricityReading` | Tất cả | `.Where(e => AssignedBuildingIds.Contains(e.Room.BuildingId))` | `.Where(e => e.RoomId == MyRoomId)` | — |
| `Invoice` | Tất cả | `.Where(i => AssignedBuildingIds.Contains(i.Room.BuildingId))` | `.Where(i => i.Contract.RepresentativeTenantId == TenantId)` | — |
| `Ticket` | Tất cả | `.Where(t => AssignedBuildingIds.Contains(t.Room.BuildingId))` | `.Where(t => t.CreatedByTenantId == TenantId)` | — |
| `Notification` | Tất cả của mình | Tất cả của mình | Tất cả của mình | — |

### 6.5. Kịch bản kiểm thử phân quyền chéo (Cross-Scope Test Cases)

Các kịch bản kiểm thử bắt buộc để xác nhận cơ chế cô lập dữ liệu hoạt động đúng:

| # | Kịch bản | Kết quả kỳ vọng |
| :---: | :--- | :--- |
| 1 | Manager dãy A gọi `GET /api/v1/buildings/{buildingB_id}/rooms` | HTTP `403 Forbidden` |
| 2 | Manager dãy A gọi `GET /api/v1/rooms` (không filter) | Chỉ trả về phòng thuộc dãy A |
| 3 | Manager dãy A gọi `GET /api/v1/invoices/{invoiceId_of_buildingB}` | HTTP `403 Forbidden` hoặc `404 Not Found` |
| 4 | Manager dãy A gọi `POST /api/v1/contracts` với `RoomId` thuộc dãy B | HTTP `403 Forbidden` |
| 5 | Tenant phòng A101 gọi `GET /api/v1/invoices` | Chỉ trả về hóa đơn phòng A101 |
| 6 | Tenant phòng A101 gọi `GET /api/v1/contracts/{contractId_of_A102}` | HTTP `403 Forbidden` hoặc `404 Not Found` |
| 7 | Guest gọi `GET /api/v1/rooms` | Chỉ trả về phòng trạng thái `AVAILABLE` với thông tin công khai |
| 8 | Guest gọi `GET /api/v1/invoices` | HTTP `401 Unauthorized` |

---

## 7. Bảng thuật ngữ

| Thuật ngữ | Viết tắt | Định nghĩa |
| :--- | :---: | :--- |
| Mini Boarding House Management System | MBHMS | Hệ thống quản lý nhà trọ mini — tên chính thức của dự án |
| Role-Based Access Control | RBAC | Cơ chế phân quyền dựa trên vai trò người dùng |
| Global Query Filter | GQF | Bộ lọc tự động của EF Core áp dụng lên mọi truy vấn LINQ tại cấp DbContext |
| Data Isolation | — | Cô lập dữ liệu: ngăn chặn người dùng truy cập dữ liệu ngoài phạm vi được cấp phép |
| SePay VietQR | — | Dịch vụ sinh mã QR chuyển khoản ngân hàng chuẩn NAPAS247 do SePay cung cấp |
| Webhook | — | Cơ chế HTTP callback: SePay gửi thông báo giao dịch real-time về server MBHMS |
| Change Request | CR | Phiếu yêu cầu thay đổi phạm vi so với SRS gốc |
| Conventional Commits | — | Quy tắc viết commit message chuẩn hóa: `type(scope): description` |
| Defense in Depth | — | Chiến lược bảo mật đa tầng: nhiều lớp bảo vệ chồng lên nhau |
| JWT | — | JSON Web Token — chuẩn xác thực stateless dùng trong REST API |
| Claims-based Authorization | — | Phân quyền dựa trên các thuộc tính (claims) nhúng trong JWT Token |
| Dãy trọ | Building | Cụm nhà trọ vật lý tại một địa chỉ, gồm nhiều phòng |
| Hợp đồng | Contract | Thỏa thuận thuê phòng giữa chủ trọ và 1 khách đại diện |
| Khách đại diện | Representative Tenant | Người đứng tên hợp đồng, chịu trách nhiệm thanh toán |
| Tỷ lệ lấp đầy | Occupancy Rate | (Số phòng "Đang thuê" / Tổng phòng) × 100% |
| Chu kỳ hóa đơn | Billing Cycle | Ngày 28 tháng trước → Ngày 27 tháng sau |
| Quá hạn | Overdue | Hóa đơn chưa thanh toán sau ngày 5 tháng tiếp theo |

---

*MBHMS · Vision & Scope Document v1.1 · 2026-11-16 · Căn cứ: SRS v1.0 + CR-01*
