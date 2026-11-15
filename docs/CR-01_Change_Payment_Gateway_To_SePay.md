# CHANGE REQUEST SPECIFICATION
# CR-01: Chuyển đổi Cổng thanh toán từ VNPay Sandbox sang SePay (VietQR + Webhook)

---

## 1. Thông tin chung về Change Request (Metadata)

| Thuộc tính | Chi tiết |
| :--- | :--- |
| **Mã phiếu (CR ID)** | **CR-01** |
| **Tên yêu cầu thay đổi** | Chuyển đổi giải pháp thanh toán trực tuyến từ VNPay Sandbox sang SePay (VietQR + Webhook đối soát tự động) |
| **Dự án** | Mini Boarding House Management System (MBHMS) |
| **Người đề xuất (Proposer)** | Tech Lead / Developer Agent (Đại diện nhu cầu thực tế của Khách hàng - Chị Lan) |
| **Ngày lập phiếu** | 2026-11-15 |
| **Ngày có hiệu lực** | 2026-11-15 (Áp dụng từ Sprint 1 & Sprint 2) |
| **Mức độ ưu tiên** | High / Critical (Cần chốt sớm hạ tầng để đồng bộ SRS, RTM và Architecture) |
| **Trạng thái (Status)** | **APPROVED (Đã phê duyệt)** |

---

## 2. Bối cảnh & Lý do thay đổi (Business & Technical Justification)

Trong tài liệu **Software Requirements Specification (SRS v1.0 - Ngày 08/06/2026)**, giải pháp thanh toán trực tuyến được dự kiến là **VNPay Sandbox**. Tuy nhiên, qua quá trình rà soát vận hành thực tế tại 3 dãy trọ (64 phòng) của chị Lan tại khu Làng Đại học Thủ Đức, nhóm phát triển nhận diện các điểm nghẽn nghiêm trọng sau:

### 2.1. Vấn đề thực tế với cổng thanh toán truyền thống (VNPay Sandbox / Merchant)
1. **Dòng tiền và tài khoản nhận tiền:** Cổng thanh toán doanh nghiệp (như VNPay Merchant) giữ tiền theo chu kỳ đối soát (T+1 hoặc theo tuần/tháng) và yêu cầu pháp nhân doanh nghiệp hoặc hộ kinh doanh cá thể. Trong khi đó, chị Lan là chủ nhà trọ cá nhân, tiền thuê phòng cần đổ trực tiếp 100% vào tài khoản ngân hàng cá nhân chính chủ (MBBank / Vietcombank) ngay tức thì để chi trả các chi phí vận hành (điện lực EVN, nước sạch, bảo trì sự cố).
2. **Chi phí giao dịch:** Các cổng thanh toán trung gian thường thu phí chiết khấu từ 1.1% – 2.2% trên mỗi giao dịch. Đối với tiền phòng trọ (2.000.000đ – 4.500.000đ/tháng), mức phí này là gánh nặng không cần thiết cho cả chủ trọ và sinh viên.
3. **Trải nghiệm khách thuê (Sinh viên):** 100% sinh viên đều sử dụng ứng dụng Mobile Banking của các ngân hàng thương mại tại Việt Nam (Vietcombank, MB, BIDV, Agribank, Techcombank, v.v.). Thói quen phổ biến nhất hiện nay là **quét mã VietQR (NAPAS247)** để chuyển khoản miễn phí thay vì phải nhập thông tin thẻ ATM nội địa hoặc thẻ tín dụng qua cổng trung gian.

### 2.2. Lợi ích khi chuyển sang SePay (VietQR + Webhook)
1. **Tiền về thẳng tài khoản chủ trọ:** Khách thuê quét mã VietQR, tiền chuyển thẳng vào tài khoản ngân hàng của chị Lan mà không qua bất kỳ bên trung gian giữ hộ nào.
2. **Đối soát tự động tức thì (Zero Manual Checking):** SePay cung cấp cơ chế Webhook thông báo giao dịch theo thời gian thực (Real-time). Khi tài khoản ngân hàng nhận tiền, SePay bắn dữ liệu giao dịch về Web API của MBHMS, hệ thống tự động bóc tách mã hóa đơn và chuyển trạng thái hóa đơn sang `PAID` trong vòng 1-3 giây.
3. **Môi trường Test Mode toàn diện:** SePay cung cấp môi trường giả lập (Test Mode) hoàn toàn miễn phí, cho phép kích hoạt giao dịch mẫu để kiểm thử trọn vẹn luồng Webhook mà không phát sinh chi phí hay cần tài khoản ngân hàng thật.
4. **Dễ dàng chuyển đổi:** Khi nghiệm thu thực tế hoặc demo bảo vệ đồ án, có thể cấu hình tài khoản thật hoặc chuyển đổi linh hoạt qua biến môi trường.

---

## 3. Nội dung Thay đổi Kỹ thuật Chi tiết (Detailed Scope of Change)

```text
+-------------------+       +-----------------------+       +----------------------+
| Khách thuê        |       | Hệ thống MBHMS        |       | SePay Gateway        |
| (Mobile Banking)  |       | (Next.js + .NET API)  |       | (VietQR & Webhook)   |
+-------------------+       +-----------------------+       +----------------------+
          |                             |                              |
          |  1. Xem hóa đơn & nhấn TT   |                              |
          |---------------------------->|                              |
          |  2. Hiển thị mã VietQR động |                              |
          |     (Số TK, Số tiền, Mã HĐ) |                              |
          |<----------------------------|                              |
          |                             |                              |
          |  3. Quét QR & Chuyển khoản  |                              |
          |----------------------------------------------------------->| (Tài khoản NH Chị Lan)
          |                             |                              |
          |                             |  4. Webhook báo có tiền      |
          |                             |<-----------------------------|
          |                             |     (Header Auth, InvoiceId) |
          |                             |  5. Khớp hóa đơn -> PAID     |
          |  6. Thông báo thành công    |  6. Bắn Email biên lai tự động
          |<----------------------------|                              |
```

### 3.1. Cơ chế sinh mã QR Động (Dynamic VietQR)
Thay vì chuyển hướng (redirect) sang cổng thanh toán ngoài, giao diện hóa đơn của MBHMS sẽ hiển thị trực tiếp mã VietQR sinh động qua URL chuẩn của SePay:
$$\text{URL} = \text{https://qr.sepay.vn/img?acc=}\{\text{ACC}\}\&\text{bank=}\{\text{BANK}\}\&\text{amount=}\{\text{AMOUNT}\}\&\text{des=}\{\text{INVOICE\_CODE}\}\&\text{template=compact}$$

Trong đó:
- `acc`: Số tài khoản ngân hàng của Chủ trọ (cấu hình qua `SEPAY_ACCOUNT_NUMBER`).
- `bank`: Mã định danh ngân hàng (cấu hình qua `SEPAY_BANK_CODE`, ví dụ: `MBBank`, `ICB`).
- `amount`: Tổng tiền cần thanh toán của hóa đơn (`Invoice.TotalAmount`).
- `des`: Mã hóa đơn duy nhất để đối soát (ví dụ: `HD202611A101`), đảm bảo độ chính xác khi phân tích cú pháp.

### 3.2. Cơ chế Xử lý Webhook Đối soát Tự động
- **Endpoint tiếp nhận:** `POST /api/v1/payments/sepay-webhook`
- **Xác thực an toàn (Security Check):**
  - Kiểm tra Header `Authorization: Apikey <SEPAY_WEBHOOK_SECRET>`. Nếu không hợp lệ, trả về `401 Unauthorized`.
- **Xử lý bất biến (Idempotent Transaction):**
  - Lưu `SepayTransactionId` vào bảng Hóa đơn / Nhật ký thanh toán.
  - Nếu `SepayTransactionId` đã từng được xử lý thành công, trả về ngay HTTP `200 OK` mà không cập nhật lại trạng thái hóa đơn để tránh duplicate event.
- **Khớp dữ liệu (Reconciliation Logic):**
  - Trích xuất mã hóa đơn từ trường nội dung chuyển khoản (`content` / `des`).
  - Kiểm tra số tiền chuyển (`transferAmount`) $\ge$ `Invoice.TotalAmount`.
  - Cập nhật `Invoice.Status = PAID`, `Invoice.PaidAt = DateTime.UtcNow`, `Invoice.PaymentMethod = SEPAY`.
  - Kích hoạt tác vụ ngầm gửi email biên lai thanh toán (`FR-24`) cho khách thuê.

### 3.3. Hỗ trợ Phương thức Thanh toán Tiền mặt (Cash Fallback)
Hệ thống giữ nguyên nghiệp vụ: Quản lý hoặc Chủ trọ có thể xác nhận khách thuê đã đóng tiền mặt trực tiếp tại văn phòng. Khi đó hóa đơn cập nhật `Invoice.Status = PAID` và `Invoice.PaymentMethod = CASH`.

---

## 4. Bảng Phân tích Tác động tới SRS Gốc (Impact Analysis on SRS v1.0)

Dưới đây là chi tiết so sánh và điều chỉnh tại 5 mục trọng yếu của tài liệu `docs/requirements/SRS.md`:

| Mục trong SRS gốc | Nội dung gốc (VNPay Sandbox) | Nội dung điều chỉnh theo CR-01 (SePay VietQR) |
| :--- | :--- | :--- |
| **Mục 1.3: Phạm vi dự án (Scope)** | • Web app responsive...<br>• Tích hợp VNPay sandbox<br>• Thông báo qua email + in-app | • Web app responsive...<br>• **Tích hợp SePay (VietQR + Webhook đối soát tự động)**<br>• Thông báo qua email + in-app |
| **Mục 3.4: FR-25** | Khách thuê đóng tiền qua QR VNPay hoặc đánh dấu "đã đóng tiền mặt" | Khách thuê đóng tiền qua **mã QR VietQR (SePay)** hoặc đánh dấu "đã đóng tiền mặt" |
| **Mục 3.4: FR-26** | Đối soát thanh toán VNPay tự động qua callback | Đối soát thanh toán tự động qua **SePay Webhook (xác thực API Key/HMAC & bóc tách mã hóa đơn)** |
| **Mục 6: Ràng buộc dự án (Constraints)** | **THANH TOÁN:** VNPay Sandbox | **THANH TOÁN:** **SePay (VietQR + Webhook - Hỗ trợ cả Test Mode và Production)** |
| **Mục 7.1: Deliverables của BA** | Sequence Diagram cho 3 luồng: Sinh hóa đơn, **Thanh toán VNPay**, Đăng nhập | Sequence Diagram cho 3 luồng: Sinh hóa đơn, **Thanh toán SePay VietQR & Webhook**, Đăng nhập |
| **Mục 9: Acceptance Criteria (MVP)** | ...sinh hóa đơn → khách thanh toán thành công qua **VNPay sandbox**. | ...sinh hóa đơn → khách thanh toán thành công qua **mã VietQR (SePay) và hệ thống tự động đổi trạng thái PAID qua Webhook**. |

---

## 5. Tác động tới Kiến trúc & Cơ sở Dữ liệu

### 5.1. Mô hình Dữ liệu Thực thể `Invoice`
- Thay thế thuộc tính `VnpayTransactionRef` bằng `SepayTransactionId` (`string?`, nullable, lưu mã giao dịch của SePay để chống lặp).
- Trường `PaymentMethod` hỗ trợ các giá trị:
  - `SEPAY`: Thanh toán chuyển khoản tự động qua VietQR SePay.
  - `CASH`: Thanh toán tiền mặt trực tiếp cho Quản lý.

### 5.2. Cấu hình Môi trường (Environment Variables)
- **Loại bỏ:**
  - `VNPAY_TMN_CODE`
  - `VNPAY_HASH_SECRET`
  - `VNPAY_URL`
  - `VNPAY_CALLBACK_URL`
- **Bổ sung:**
  - `SEPAY_API_KEY`: API Key kết nối dịch vụ SePay.
  - `SEPAY_WEBHOOK_SECRET`: Chuỗi khóa bí mật dùng để xác thực Webhook gửi đến từ SePay.
  - `SEPAY_ACCOUNT_NUMBER`: Số tài khoản ngân hàng nhận tiền của Chủ trọ.
  - `SEPAY_BANK_CODE`: Mã ngân hàng (ví dụ: `MBBank`, `VCB`).
  - `SEPAY_QR_BASE_URL`: URL dịch vụ sinh QR (`https://qr.sepay.vn/img`).

---

## 6. Đánh giá Rủi ro & Biện pháp Giảm thiểu (Risk & Mitigation)

| Rủi ro tiềm ẩn | Mức độ | Biện pháp kỹ thuật kiểm soát |
| :--- | :---: | :--- |
| Khách thuê chuyển khoản sai cú pháp mã hóa đơn trong nội dung chuyển tiền | Medium | 1. Mã VietQR động nhúng sẵn mã hóa đơn vào trường `des`, người dùng chỉ cần quét là app ngân hàng tự điền 100%.<br>2. Cung cấp chức năng "Đối soát thủ công" cho Owner/Manager để khớp tiền đối với các giao dịch chuyển nhầm nội dung. |
| Webhook của SePay gửi nhiều lần cho cùng 1 giao dịch (At-least-once delivery) | Medium | Áp dụng cơ chế **Idempotent Webhook Handler**: Kiểm tra `SepayTransactionId` trong Database trước khi cập nhật. Nếu đã tồn tại, lập tức phản hồi HTTP `200 OK` và bỏ qua logic cập nhật. |
| Giả mạo dữ liệu Webhook từ bên ngoài | High | Xác thực nghiêm ngặt giá trị `Authorization: Apikey <SEPAY_WEBHOOK_SECRET>` trong Request Header trước khi xử lý payload. |

---

## 7. Phê duyệt & Ký nhận (Sign-off)

- **Đại diện Nhóm Phát triển (Tech Lead):** *Đã ký & Chấp thuận*
- **Đại diện Nghiệp vụ (Business Analyst):** *Đã ký & Cập nhật SRS / RTM*
- **Trạng thái tài liệu:** Phiếu CR-01 có hiệu lực chính thức từ ngày **15/11/2026**. Mọi tài liệu thiết kế kiến trúc, DB Schema và kế hoạch Sprint tiếp theo sẽ tuân thủ tuyệt đối định hướng của CR-01.
