# MBHMS Design System & UI Specifications (DESIGN.md)

> **Dự án:** Mini Boarding House Management System (MBHMS)  
> **Phiên bản:** 1.0 (Khởi tạo Ngày 8 qua Skill `impeccable`)  
> **Nguyên tắc cốt lõi:** Mobile-First ($360\text{px}$), Tác vụ nhanh $\le 3$ chạm, 100% Tiếng Việt có dấu chuẩn mực, Ngoại tuyến linh hoạt (Dexie.js).

---

## 1. Triết lý Thiết kế (Design Principles - Impeccable Standard)

1. **Mobile-First & One-Hand Reachability ($360\text{px}$):**
   - Thiết kế ưu tiên tuyệt đối cho màn hình điện thoại từ chiều rộng nhỏ nhất $360\text{px}$ (`NFR-08`).
   - Mọi nút bấm, link điều hướng và vùng chạm phải đạt kích thước tối thiểu **$44 \times 44\text{px}$** (`NFR-07`).
   - Các tác vụ thường nhật của Quản lý (ghi số điện nước) và Khách thuê (quét QR trả tiền, báo sự cố) hoàn tất tối đa trong **3 lần chạm**.
2. **Loại bỏ AI Slop & Generic Aesthetics:**
   - Không sử dụng font *Inter* mặc định để tránh cảm giác sản phẩm rập khuôn.
   - Không dùng nền xám nhạt thiếu tương phản hoặc chữ xám mờ khó đọc dưới ánh sáng ngoài trời.
   - Phân cấp thị giác rõ ràng: Tiêu đề đậm sắc nét, nhãn dữ liệu phụ phân tầng rõ, badge trạng thái nổi bật.
3. **Bản địa hóa 100% Tiếng Việt Chuẩn mực (`NFR-12`):**
   - Không pha tạp tiếng Anh nửa vời ở các nút bấm hoặc thông báo lỗi.
   - Định dạng tiền tệ bắt buộc có dấu chấm phân cách và ký hiệu `₫` (ví dụ: `2.500.000₫`).
   - Thời gian hiển thị định dạng `dd/MM/yyyy` hoặc `HH:mm dd/MM/yyyy` khóa cứng múi giờ Việt Nam `Asia/Ho_Chi_Minh` (`NFR-13`).

---

## 2. Hệ Thống Typography (Typography System)

- **Font chữ chính:** **`Be Vietnam Pro`** (Google Fonts)
  - Lý do lựa chọn: Được thiết kế riêng tối ưu cho các dấu thanh tiếng Việt (sắc, huyền, hỏi, ngã, nặng, mũ, móc), không gây lỗi thụt lề hay vỡ khoảng cách dòng khi hiển thị tiếng Việt trên thiết bị di động.
- **Thang kích thước chữ (Type Scale):**

| Cấp độ | Class Tailwind | Kích thước / Line Height | Trọng số (Weight) | Ứng dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Display / H1** | `text-2xl sm:text-3xl` | $24\text{px} - 30\text{px} / 1.25$ | Bold (`font-bold`) | Tiêu đề chính trang web, chỉ số lớn |
| **Section / H2** | `text-xl sm:text-2xl` | $20\text{px} - 24\text{px} / 1.3$ | SemiBold (`font-semibold`) | Tiêu đề khối / Section Header |
| **Card / H3** | `text-base sm:text-lg` | $16\text{px} - 18\text{px} / 1.4$ | SemiBold (`font-semibold`) | Tiêu đề thẻ phòng, tên khối dữ liệu |
| **Body (Base)** | `text-sm` | $14\text{px} / 1.5$ | Regular (`font-normal`) | Văn bản nội dung, mô tả, trường nhập liệu |
| **Subtext / Meta** | `text-xs` | $12\text{px} / 1.4$ | Regular / Medium | Nhãn thời gian, diện tích phòng, đơn vị đo |
| **Micro / Caption** | `text-[10px] - text-[11px]` | $10\text{px} - 11\text{px} / 1.3$ | Medium / SemiBold | Nhãn BottomNav, badge đếm nhỏ, disclaimer |

---

## 3. Bảng Mã Màu & Tokens (Color Tokens)

### 3.1. Màu Thương Hiệu & Nền Tảng (Base Tokens)
- **Primary (Chủ đạo):** `#2563EB` / `hsl(221.2 83.2% 53.3%)` – Xanh dương hiện đại, tạo cảm giác tin cậy, chuyên nghiệp cho ứng dụng quản lý tài sản.
- **Background (Nền sáng):** `#FFFFFF` / `hsl(0 0% 100%)`.
- **Foreground (Chữ chính sáng):** `#0F172A` / `hsl(224 71.4% 4.1%)` – Slate đậm đảm bảo độ tương phản WCAG AAA (&gt; 7:1).
- **Muted / Card Background:** `#F8FAFC` / `hsl(220 14.3% 95.9%)`.
- **Border / Divider:** `#E2E8F0` / `hsl(220 13% 91%)`.

### 3.2. Màu Trạng Thái Phòng Trọ (`FR-04`)
Phân định trực quan 4 trạng thái phòng trọ giúp chủ trọ và quản lý nhận diện nhanh trong 1 giây:

| Trạng thái | Badge Variant | Màu nền (Light) | Màu chữ / Viền | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :--- | :--- |
| **Trống** | `success` | `#ECFDF5` (`emerald-50`) | `#047857` (`emerald-700`) | Phòng sẵn sàng cho khách mới thuê |
| **Đang thuê** | `info` | `#EFF6FF` (`blue-50`) | `#1D4ED8` (`blue-700`) | Phòng có khách đang cư trú hợp lệ |
| **Đặt cọc** | `warning` | `#FFFBEB` (`amber-50`) | `#B45309` (`amber-700`) | Khách đã đặt cọc giữ chỗ (`BR-01`) |
| **Đang sửa** | `destructive` | `#FEF2F2` (`rose-50`) | `#B91C1C` (`rose-700`) | Đang bảo trì / sửa chữa sự cố (`FR-33`) |

### 3.3. Màu Trạng Thái Hóa Đơn (`FR-27`)

| Trạng thái | Badge Variant | Màu sắc | Quy tắc nghiệp vụ |
| :--- | :--- | :--- | :--- |
| **Chờ thanh toán** | `warning` | Amber (`#F59E0B`) | Hóa đơn đã xuất ngày 28 hàng tháng (`BR-07`) |
| **Đã thanh toán** | `success` | Emerald (`#10B981`) | Đã thanh toán hoặc webhook SePay khớp mã (`FR-28`) |
| **Quá hạn** | `destructive` | Rose/Red (`#EF4444`) | Quá ngày 05 tháng sau chưa thanh toán (`BR-08`) |
| **Đã hủy** | `outline` | Slate Muted | Hóa đơn bị hủy do sai số điện nước |

---

## 4. Khung Bố Cục Thích Ứng (Responsive Shell Standard)

### 4.1. Màn hình Di động (Mobile View: $360\text{px} - 767\text{px}$)
- **Header:** Chiều cao cố định $56\text{px} - 64\text{px}$ (`h-14` / `h-16`), hiển thị logo mini, huy hiệu kết nối mạng (Trực tuyến / Offline) và chuông thông báo.
- **Content Area:** Cuộn dọc trơn tru, `padding: 16px` (`p-4`), `padding-bottom: 96px` (`pb-24`) để chống bị che bởi thanh điều hướng dưới.
- **BottomNav:** Cố định đáy màn hình (`fixed bottom-0`), chiều cao $64\text{px}$ (`h-16`), nền mờ thủy tinh (`backdrop-blur-md`), chia đều 4 mục điều hướng chính:
  1. *Tổng quan* (`/`)
  2. *Phòng trọ* (`/rooms`)
  3. *Hóa đơn* (`/admin/dashboard`)
  4. *Cư dân* (`/portal`)
  - Mỗi mục có diện tích tối thiểu **$44 \times 44\text{px}$** cho ngón cái bấm nhanh.

### 4.2. Màn hình Máy tính & Tablet (Desktop View: $\ge 768\text{px}$)
- **Sidebar:** Cố định bên trái (`fixed inset-y-0 w-64`), phân chia khu vực Brand, Menu quản trị nghiệp vụ và Card thông tin tài khoản người dùng kèm nút Đăng xuất.
- **Main Area:** Đẩy lề trái `pl-64`, chiều rộng tối đa giới hạn `max-w-7xl`, lề nội dung `p-6 md:p-8`.

---

## 5. Quy Chuẩn Thành Phần Giao Diện (Component Guidelines)

1. **Buttons (`Button`):**
   - Nút hành động chính (`variant="default"`): Nền Primary `#2563EB`, bo góc tròn `rounded-md` ($6\text{px}$) hoặc `rounded-lg` ($8\text{px}$). Chiều cao tối thiểu $44\text{px}$ trên di động (`min-h-[44px]`).
   - Nút hủy/phụ (`variant="outline"` hoặc `variant="ghost"`): Viền mảnh, phản hồi hover nhẹ nhàng.
2. **Cards (`Card`):**
   - Bo góc mềm mại `rounded-xl` ($12\text{px}$), viền mảnh `border-border`, đổ bóng nhẹ `shadow-sm`.
   - Padding nội dung $16\text{px} - 20\text{px}$ tránh lãng phí diện tích hiển thị trên màn hình nhỏ.
3. **Form Inputs (`Input`):**
   - Chiều cao $44\text{px}$ (`h-11`) trên mobile để ngón tay chạm chính xác, $40\text{px}$ (`md:h-10`) trên desktop.
   - Viền `border-input`, trạng thái `focus-visible` có vòng sáng `ring-2 ring-primary`.
4. **Offline Database Indicator (Dexie.js):**
   - Khi mất kết nối mạng, hiển thị ngay Badge màu cam hổ phách có hiệu ứng nhấp nháy (`animate-pulse`) để người dùng an tâm nhập số điện không sợ mất dữ liệu.
   - Khi có lại mạng, hiển thị số bản ghi chờ đồng bộ và nút bấm đồng bộ hóa tức thì.

---

## 6. Tiêu Chí Nghiệm Thu Giao Diện (DoD Visual Quality)

- [x] Không phát sinh thanh cuộn ngang khi xem ở chiều rộng $360\text{px}$.
- [x] Mọi vùng bấm tương tác $\ge 44 \times 44\text{px}$.
- [x] Màu sắc chữ đạt chuẩn tương phản WCAG AA (&gt; 4.5:1).
- [x] Font chữ tiếng Việt hiển thị rõ nét, không lỗi khoảng cách dấu.
- [x] Định dạng tiền tệ thống nhất `formatVND` xuất ra `2.500.000₫`.
- [x] Tương thích mượt mà cả chế độ Trực tuyến lẫn Ngoại tuyến (IndexedDB).
