# PRODUCT.md - MBHMS Product Context & Design Directives

> **Product:** Mini Boarding House Management System (MBHMS)  
> **Repository:** `D:\TaDuss\Boarding-House-Management`  
> **Audience:** Chủ trọ, Quản lý dãy trọ, Sinh viên & Người lao động thuê trọ, Khách tìm phòng  
> **Generated via:** Impeccable Design Skill v4.9.2

---

## 1. Product Purpose & Problem Space

MBHMS chuyển đổi số toàn diện hoạt động quản lý vận hành 3 dãy trọ (64 phòng) tại Làng Đại học Thủ Đức, TP.HCM của chị Nguyễn Thị Lan:
* Thay thế phương thức ghi chép sổ tay, Excel và tin nhắn Zalo phân tán.
* Tự động hóa tính toán tiền điện (kWh), nước, rác, wifi, giữ xe theo đúng 14 quy tắc nghiệp vụ (`BR-01` đến `BR-14`).
* Tự động phát hành hóa đơn vào ngày 28 hàng tháng (`BR-07`) và cảnh báo quá hạn sau ngày 05 (`BR-08`).
* Tích hợp thanh toán quét mã VietQR tự động qua cổng SePay kèm Webhook đối soát số dư tức thì (`CR-01`, `FR-25`, `FR-26`).
* Hỗ trợ ghi chỉ số điện ngoại tuyến (Offline-First) khi mất kết nối mạng tại khu vực hành lang (`FR-18`, `NFR-09`).

---

## 2. Target Users & Operating Scene

| Role | Người dùng đại diện | Thiết bị chính | Bối cảnh sử dụng & Kỳ vọng cốt lõi |
| :--- | :--- | :--- | :--- |
| **Chủ trọ (`Owner`)** | Chị Nguyễn Thị Lan (1 người) | Desktop & Mobile | Theo dõi doanh thu tổng, báo cáo lãi/lỗ (P&L), quản lý hợp đồng, cấu hình giá dịch vụ, phân quyền Manager theo dãy. |
| **Quản lý (`Manager`)** | 1 – 3 người được phân công | Mobile ($360\text{px}$) | Thao tác bằng một tay khi đi từng phòng ghi số điện, kiểm tra hóa đơn, xử lý sự cố. **Bị cô lập dữ liệu theo dãy phụ trách (`BR-14`)**. |
| **Khách thuê (`Tenant`)** | ~64 – 100 sinh viên, công nhân | Mobile ($360\text{px}$) | Xem hóa đơn hàng tháng, quét mã VietQR SePay thanh toán trong 1 chạm, gửi ticket báo hỏng kèm ảnh, đánh giá 1–5 sao. |
| **Khách vãng lai (`Guest`)** | Không giới hạn | Mobile ($360\text{px}$) & Desktop | Xem danh mục phòng trống công khai, giá thuê, diện tích, đăng ký lịch hẹn xem phòng thuận tiện. |

---

## 3. Core Design Directives & Quality Floor

### 3.1. Chuẩn Hiển thị & Khả năng Thao tác (NFR-07, NFR-08)
* **Mobile-First từ $360\text{px}$:** Mọi thành phần giao diện, bảng dữ liệu, biểu mẫu phải co giãn mượt mà trên viewport tối thiểu $360\text{px}$, tuyệt đối không xuất hiện thanh cuộn ngang (horizontal scroll overflow).
* **Quy tắc $\le 3$ lần chạm:** Mọi tác vụ cốt lõi (Xem hóa đơn, Quét mã QR thanh toán, Ghi số điện, Báo sự cố) phải hoàn thành trong tối đa 3 lần tương tác.
* **Khu vực bấm cảm ứng (Touch Target):** Các nút bấm chính trên mobile, đặc biệt là thanh **Bottom Navigation Bar**, phải có kích thước tiếp xúc tối thiểu $44\times 44\text{px}$.

### 3.2. Ngôn ngữ, Đơn vị & Múi giờ (NFR-12, NFR-13)
* **Ngôn ngữ:** 100% tiếng Việt có dấu chuẩn mực, rõ ràng, không dùng thuật ngữ kỹ thuật khó hiểu với người lớn tuổi.
* **Tiền tệ:** Luôn định dạng tiền `VNĐ` có phân cách hàng nghìn và ký hiệu `₫` ở cuối (ví dụ: `2.500.000₫`, `350.000₫`).
* **Thời gian:** Khóa cứng múi giờ Việt Nam `Asia/Ho_Chi_Minh` (UTC+7) trên toàn bộ hiển thị ngày giờ (`dd/MM/yyyy` hoặc `HH:mm dd/MM/yyyy`).

### 3.3. Typography chuẩn mực (Anti-AI Slop)
* Không dùng font *Inter* mặc định để tránh tính rập khuôn và lỗi chân dấu tiếng Việt.
* Sử dụng font **`Be Vietnam Pro`** (Google Fonts) được tinh chỉnh riêng cho ngôn ngữ tiếng Việt:
  - Hiển thị rõ ràng các dấu thanh điệu phức tạp (hỏi, ngã, nặng, sắc, huyền).
  - Tỷ lệ x-height cân đối, độ đọc (readability) xuất sắc trên màn hình nhỏ.

---

## 4. Semantic Color System & Status Mapping

### 4.1. Trạng thái Phòng trọ (Room Status - FR-04, BR-10)
* **Trống (`AVAILABLE`):** Xanh lá Emerald (`bg-emerald-50 text-emerald-700 border-emerald-200`) — Thể hiện phòng sẵn sàng cho thuê.
* **Đang thuê (`RENTED`):** Xanh dương Sapphire (`bg-blue-50 text-blue-700 border-blue-200`) — Thể hiện phòng đã có khách ở ổn định.
* **Đã đặt cọc (`RESERVED`):** Cam hổ phách Amber (`bg-amber-50 text-amber-700 border-amber-200`) — Cảnh báo phòng đang giữ chỗ chờ ký HĐ.
* **Đang sửa chữa (`MAINTENANCE`):** Đỏ gạch Rose / Xám đá (`bg-rose-50 text-rose-700 border-rose-200`) — Thể hiện phòng tạm ngưng hoạt động.

### 4.2. Trạng thái Hóa đơn (Invoice Status - FR-27, BR-08)
* **Chờ thanh toán (`PENDING`):** Vàng cam Amber (`bg-amber-50 text-amber-700 border-amber-200`) — Hóa đơn mới phát hành chờ nộp tiền.
* **Đã thanh toán (`PAID`):** Xanh ngọc Emerald (`bg-emerald-50 text-emerald-700 border-emerald-200`) — Đã nhận tiền thành công qua VietQR/tiền mặt.
* **Quá hạn (`OVERDUE`):** Đỏ đậm Red (`bg-red-50 text-red-700 border-red-200`) — Quá ngày 05 chưa thanh toán, cần nhắc nợ tự động.
* **Đã hủy (`CANCELLED`):** Xám Slate (`bg-slate-100 text-slate-600 border-slate-200`) — Hóa đơn bị hủy do sai sót hoặc tạo lại.

### 4.3. Trạng thái Sự cố (Ticket Status - FR-31)
* **Mở (`OPEN`):** Đỏ cam Orange (`bg-orange-50 text-orange-700 border-orange-200`)
* **Đang xử lý (`PROCESSING`):** Xanh dương Blue (`bg-blue-50 text-blue-700 border-blue-200`)
* **Đã sửa (`RESOLVED`):** Xanh lá Green (`bg-green-50 text-green-700 border-green-200`)
* **Đã đóng (`CLOSED`):** Xám Muted (`bg-gray-100 text-gray-600 border-gray-200`)
