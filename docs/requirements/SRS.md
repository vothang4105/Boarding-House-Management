# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
# Hệ Thống Quản Lý Nhà Trọ Mini (MBHMS)

> **Dự án:** Mini Boarding House Management System (MBHMS)  
> **Khách hàng:** Chị Nguyễn Thị Lan  
> **Lĩnh vực:** Cho thuê nhà trọ sinh viên  
> **Quy mô:** 3 dãy · 64 phòng · Khu Làng Đại học Thủ Đức, TP.HCM  
> **Phiên bản:** 1.0 — Chốt (Official)  
> **Ngày phát hành:** 08/06/2026  

---

> 📌 **Lưu ý cho nhóm thực hiện:**  
> Đây là bản yêu cầu **đã chốt**. Mọi thay đổi sau ngày kick-off cần đi qua quy trình Change Request và được nhóm thống nhất. Hãy bám theo tài liệu này trong suốt các giai đoạn phân tích, thiết kế và phát triển.

---

## MỤC LỤC
1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Stakeholders & User Roles](#2-stakeholders--user-roles)
3. [Yêu cầu chức năng (Functional Requirements)](#3-yêu-cầu-chức-năng-functional-requirements)
4. [Quy tắc nghiệp vụ (Business Rules)](#4-quy-tắc-nghiệp-vụ-business-rules)
5. [Yêu cầu phi chức năng (Non-functional Requirements)](#5-yêu-cầu-phi-chức-năng-non-functional-requirements)
6. [Ràng buộc dự án](#6-ràng-buộc-dự-án)
7. [Deliverables (Sản phẩm bàn giao)](#7-deliverables-sản-phẩm-bàn-giao)
8. [Timeline gợi ý 16 tuần](#8-timeline-gợi-ý-16-tuần)
9. [Acceptance Criteria (Nghiệm thu)](#9-acceptance-criteria-nghiệm-thu)
10. [Glossary (Thuật ngữ)](#10-glossary-thuật-ngữ)

---

## 1. Tổng quan dự án

### 1.1. Bối cảnh
Khách hàng đang quản lý 3 dãy nhà trọ với tổng 64 phòng cho thuê sinh viên tại khu Làng Đại học Thủ Đức, TP.HCM. Hiện tại mọi nghiệp vụ được làm thủ công bằng sổ tay, Excel và Zalo, dẫn đến: thất thoát doanh thu, sai sót tính tiền, mất uy tín với khách thuê, và không có cái nhìn tổng quan về hoạt động kinh doanh.

### 1.2. Mục tiêu kinh doanh
| ID | Mục tiêu | Đo lường |
| :--- | :--- | :--- |
| **BG-01** | Giảm thời gian chốt tiền cuối tháng | Từ 2 ngày → dưới 2 giờ |
| **BG-02** | Giảm tỷ lệ phòng trống do quên gia hạn / không chuẩn bị | < 5% phòng trống tại bất kỳ thời điểm |
| **BG-03** | Tăng độ chính xác tính tiền | 0 vụ tranh chấp/tháng do sai số |
| **BG-04** | Có báo cáo tài chính minh bạch | Báo cáo P&L theo tháng/năm |
| **BG-05** | Số hóa lưu trữ hợp đồng | 100% hợp đồng được lưu file số |

### 1.3. Phạm vi dự án
| ✓ TRONG phạm vi | ✗ NGOÀI phạm vi |
| :--- | :--- |
| • Web app responsive (điện thoại + máy tính)<br>• 3 nhóm người dùng: Chủ trọ, Quản lý, Khách thuê<br>• Quản lý phòng, hợp đồng, hóa đơn, sự cố, báo cáo<br>• Tích hợp VNPay sandbox<br>• Thông báo qua email + in-app | • Native mobile app (iOS/Android)<br>• Camera an ninh, IoT đồng hồ thông minh<br>• Tích hợp Zalo OA, SMS, push notification<br>• Đa ngôn ngữ (chỉ tiếng Việt)<br>• Blacklist liên nhà trọ, bán hàng, nhân sự |

---

## 2. Stakeholders & User Roles

| Role | Mô tả | Số lượng | Thiết bị chính |
| :--- | :--- | :---: | :--- |
| **Chủ trọ (Owner)** | Toàn quyền hệ thống, xem báo cáo tài chính, quản trị tài khoản | 1 | Điện thoại + Laptop |
| **Quản lý (Manager)** | Vận hành 1 dãy được phân công, không xem được lợi nhuận tổng | 1–3 | Điện thoại |
| **Khách thuê (Tenant)** | Xem hóa đơn, đóng tiền, báo sự cố, xem hợp đồng | ~64–100 | Điện thoại |
| **Khách (Guest)** | Xem danh sách phòng trống, đăng ký xem phòng | Không giới hạn | Điện thoại |

> ⚠️ **Ghi chú phân quyền:**  
> Manager **chỉ thấy dữ liệu của dãy được phân công** (theo BR-14). Mọi API endpoint phải kiểm tra scope theo role, không chỉ dựa trên UI ẩn/hiện.

---

## 3. Yêu cầu chức năng (Functional Requirements)

*Ký hiệu mức ưu tiên (MoSCoW):*
- **M (Must have):** Bắt buộc
- **S (Should have):** Nên có
- **C (Could have):** Có thì tốt

### 3.1. Module Quản lý Nhà & Phòng
| ID | Yêu cầu | Actor | Ưu tiên |
| :--- | :--- | :--- | :---: |
| **FR-01** | Tạo/sửa/xóa **Dãy trọ** (tên, địa chỉ, số phòng, người quản lý phụ trách) | Owner | **M** |
| **FR-02** | Tạo/sửa/xóa **Phòng** (số phòng, loại, diện tích, giá, sức chứa, trạng thái) | Owner, Manager | **M** |
| **FR-03** | Hỗ trợ 3 loại phòng: Đơn (1 người), Đôi (2 người), Gia đình (3–4 người) | Owner | **M** |
| **FR-04** | Mỗi phòng có 4 trạng thái: Trống, Đang thuê, Đặt cọc giữ chỗ, Bảo trì | Owner, Manager | **M** |
| **FR-05** | Xem **sơ đồ phòng** dạng grid theo từng dãy, mỗi ô màu theo trạng thái | Owner, Manager | **M** |
| **FR-06** | Upload tối đa 5 ảnh/phòng (JPG/PNG, $\le$ 5MB/ảnh) | Owner, Manager | **S** |

### 3.2. Module Khách thuê & Hợp đồng
| ID | Yêu cầu | Actor | Ưu tiên |
| :--- | :--- | :--- | :---: |
| **FR-07** | Tạo hồ sơ khách thuê: họ tên, CCCD, SĐT, email, ngày sinh, ảnh CCCD | Owner, Manager | **M** |
| **FR-08** | Tạo **hợp đồng thuê**: phòng, người đại diện, người ở cùng, ngày bắt đầu, kỳ hạn, giá, cọc | Owner, Manager | **M** |
| **FR-09** | Upload file hợp đồng đã ký (PDF, $\le$ 10MB) | Owner, Manager | **M** |
| **FR-10** | Gia hạn hợp đồng (tạo hợp đồng mới nối tiếp, giữ lịch sử) | Owner, Manager | **M** |
| **FR-11** | Chấm dứt hợp đồng trước hạn: lý do, ngày trả phòng, xử lý cọc | Owner, Manager | **M** |
| **FR-12** | Khi tạo hợp đồng → tự động đổi trạng thái phòng thành Đang thuê | Hệ thống | **M** |
| **FR-13** | Tự động nhắc trước 30 ngày khi hợp đồng sắp hết hạn | Hệ thống | **M** |
| **FR-14** | Khách thuê xem được hợp đồng của mình (chỉ đọc) | Tenant | **M** |

### 3.3. Module Chỉ số Điện & Nước
| ID | Yêu cầu | Actor | Ưu tiên |
| :--- | :--- | :--- | :---: |
| **FR-15** | Nhập **chỉ số điện** từng phòng theo tháng (kèm ảnh đồng hồ tùy chọn) | Manager | **M** |
| **FR-16** | Tự tính **số kWh tiêu thụ** = chỉ số mới − chỉ số cũ | Hệ thống | **M** |
| **FR-17** | Cảnh báo nếu số kWh tăng bất thường (> 200% trung bình 3 tháng gần nhất) | Hệ thống | **S** |
| **FR-18** | Hỗ trợ nhập chỉ số **offline** trên điện thoại → tự sync khi có mạng | Manager | **M** |
| **FR-19** | Nước tính khoán theo đầu người (không có đồng hồ riêng) | Hệ thống | **M** |
| **FR-20** | Xem lịch sử chỉ số điện 12 tháng gần nhất theo phòng | Owner, Manager, Tenant | **S** |

### 3.4. Module Hóa đơn & Thanh toán
| ID | Yêu cầu | Actor | Ưu tiên |
| :--- | :--- | :--- | :---: |
| **FR-21** | Ngày 28 hàng tháng, **tự sinh hóa đơn** cho mọi phòng đang thuê | Hệ thống | **M** |
| **FR-22** | Hóa đơn gồm: tiền phòng, điện, nước, internet, rác, giữ xe, phụ phí | Hệ thống | **M** |
| **FR-23** | Owner/Manager có thể thêm/sửa khoản phụ thu trước khi gửi | Owner, Manager | **M** |
| **FR-24** | Gửi hóa đơn qua email + in-app | Hệ thống | **M** |
| **FR-25** | Khách thuê đóng tiền qua QR VNPay hoặc đánh dấu "đã đóng tiền mặt" | Tenant, Manager | **M** |
| **FR-26** | Đối soát thanh toán VNPay tự động qua callback | Hệ thống | **M** |
| **FR-27** | Hóa đơn có 4 trạng thái: Nháp, Đã gửi, Đã thanh toán, Quá hạn | Hệ thống | **M** |
| **FR-28** | Tự đánh dấu Quá hạn nếu sau ngày 5 tháng sau chưa đóng | Hệ thống | **M** |
| **FR-29** | In/Xuất hóa đơn ra PDF | Owner, Manager, Tenant | **S** |

### 3.5. Module Sự cố / Bảo trì
| ID | Yêu cầu | Actor | Ưu tiên |
| :--- | :--- | :--- | :---: |
| **FR-30** | Khách tạo **ticket sự cố**: tiêu đề, mô tả, mức độ, ảnh ($\le$ 3 ảnh) | Tenant | **M** |
| **FR-31** | Ticket có 4 trạng thái: Mới, Đang xử lý, Đã xử lý, Đã đóng | Hệ thống | **M** |
| **FR-32** | Xem danh sách ticket, lọc theo dãy/trạng thái/mức độ | Owner, Manager | **M** |
| **FR-33** | Bình luận / cập nhật trạng thái ticket | Owner, Manager | **M** |
| **FR-34** | Khách đánh giá 1–5 sao sau khi ticket được đóng | Tenant | **S** |
| **FR-35** | Thông báo cho khách khi ticket được cập nhật | Hệ thống | **M** |

### 3.6. Module Thông báo & Nhắc nhở
| ID | Yêu cầu | Actor | Ưu tiên |
| :--- | :--- | :--- | :---: |
| **FR-36** | Hộp thông báo in-app cho mọi role (chuông + badge số chưa đọc) | Tất cả | **M** |
| **FR-37** | Email tự động: hóa đơn mới, quá hạn 3 ngày, hợp đồng sắp hết hạn, ticket update | Hệ thống | **M** |
| **FR-38** | Owner gửi **thông báo chung** đến toàn bộ khách thuê 1 dãy | Owner | **S** |

### 3.7. Module Báo cáo & Dashboard
| ID | Yêu cầu | Actor | Ưu tiên |
| :--- | :--- | :--- | :---: |
| **FR-39** | **Dashboard chính**: tỷ lệ lấp đầy, doanh thu tháng, số HĐ quá hạn, số ticket mở | Owner | **M** |
| **FR-40** | Báo cáo **doanh thu theo tháng** (12 tháng), biểu đồ cột | Owner | **M** |
| **FR-41** | Báo cáo **công nợ**: liệt kê hóa đơn Quá hạn kèm số ngày trễ | Owner, Manager | **M** |
| **FR-42** | Báo cáo tỷ lệ lấp đầy theo dãy & theo tháng | Owner | **S** |
| **FR-43** | Xuất báo cáo ra Excel (.xlsx) | Owner | **S** |

### 3.8. Module Quản trị Người dùng
| ID | Yêu cầu | Actor | Ưu tiên |
| :--- | :--- | :--- | :---: |
| **FR-44** | Đăng ký tài khoản Khách thuê do Owner/Manager tạo, gửi link kích hoạt qua email | Owner, Manager | **M** |
| **FR-45** | Đăng nhập bằng email + mật khẩu | Tất cả | **M** |
| **FR-46** | Quên mật khẩu → reset qua email | Tất cả | **M** |
| **FR-47** | Owner tạo tài khoản Manager, phân quyền theo dãy trọ | Owner | **M** |
| **FR-48** | Đổi mật khẩu, cập nhật thông tin cá nhân | Tất cả | **M** |

---

## 4. Quy tắc nghiệp vụ (Business Rules)

*Các quy tắc này áp dụng cố định trong toàn hệ thống. Mọi luồng nghiệp vụ phải tuân thủ.*

| ID | Quy tắc |
| :--- | :--- |
| **BR-01** | **Giá điện:** 3.500đ/kWh, áp dụng đồng nhất mọi phòng (không bậc thang) |
| **BR-02** | **Giá nước:** 100.000đ/người/tháng, khoán theo số người trong hợp đồng |
| **BR-03** | **Internet:** 50.000đ/người/tháng |
| **BR-04** | **Rác:** 20.000đ/phòng/tháng |
| **BR-05** | **Giữ xe:** 100.000đ/xe máy/tháng, khai báo trong hợp đồng |
| **BR-06** | **Tiền cọc:** Mặc định = 1 tháng tiền phòng, có thể chỉnh tay khi tạo HĐ |
| **BR-07** | **Chu kỳ hóa đơn:** Sinh ngày 28 hàng tháng, cho tháng vừa kết thúc |
| **BR-08** | **Hạn đóng tiền:** Ngày 5 tháng tiếp theo, sau đó tự chuyển trạng thái Quá hạn |
| **BR-09** | **Phạt trễ hạn:** Không tính lãi tự động trong v1.0 (chỉ ghi nhận trạng thái) |
| **BR-10** | **Sức chứa:** Đơn 1 / Đôi 2 / Gia đình tối đa 4. Hệ thống chặn nếu vượt |
| **BR-11** | **Chấm dứt trước hạn:** Báo $\ge$ 30 ngày → trả đủ cọc. Báo < 30 ngày → trừ 50% cọc |
| **BR-12** | **Người đại diện:** Mỗi HĐ có đúng 1 người đứng tên, chịu trách nhiệm thanh toán |
| **BR-13** | **CCCD duy nhất:** Mỗi khách thuê chỉ có 1 hồ sơ trong hệ thống (theo CCCD) |
| **BR-14** | **Manager scope:** Manager chỉ thấy dữ liệu của dãy được phân công |

---

## 5. Yêu cầu phi chức năng (Non-functional Requirements)

| ID | Loại | Yêu cầu |
| :--- | :--- | :--- |
| **NFR-01** | Hiệu năng | Dashboard tải xong trong < 3 giây với 64 phòng |
| **NFR-02** | Hiệu năng | Sinh hóa đơn hàng loạt cho 64 phòng trong < 30 giây |
| **NFR-03** | Khả dụng | Uptime $\ge$ 99% (không tính bảo trì có kế hoạch) |
| **NFR-04** | Bảo mật | Mật khẩu lưu hash bcrypt (cost $\ge$ 10), không lưu plain text |
| **NFR-05** | Bảo mật | Phân quyền theo role; mọi API endpoint kiểm tra quyền |
| **NFR-06** | Bảo mật | Ảnh CCCD, hợp đồng lưu storage riêng, chỉ truy cập qua URL có ký |
| **NFR-07** | UX | Mọi tác vụ chính $\le$ 3 lần chạm trên mobile |
| **NFR-08** | Tương thích | Chrome/Safari/Edge 2 năm gần nhất; responsive từ 360px |
| **NFR-09** | Offline | Màn hình nhập chỉ số điện hoạt động offline, đồng bộ khi có mạng |
| **NFR-10** | Backup | Database backup tự động hằng ngày, giữ 30 ngày |
| **NFR-11** | Audit | Lưu log mọi thao tác sửa/xóa hợp đồng và hóa đơn |
| **NFR-12** | Ngôn ngữ | UI tiếng Việt, định dạng tiền VNĐ (vd: 2.500.000đ) |
| **NFR-13** | Thời gian | Múi giờ Asia/Ho_Chi_Minh (UTC+7) cố định |

---

## 6. Ràng buộc dự án

| Hạng mục | Ràng buộc |
| :--- | :--- |
| **THỜI GIAN** | 16 tuần từ kick-off |
| **NHÂN SỰ** | 3 người (1 BA + 2 Dev) *(Đối với Solo Dev: 1 người kiêm nhiệm theo lộ trình 80 ngày)* |
| **HOSTING** | Free tier (Vercel / Railway / Render) |
| **THANH TOÁN** | VNPay Sandbox |
| **EMAIL** | Resend / Mailtrap / Gmail SMTP |
| **TECH STACK** | Tự do, ưu tiên phổ biến *(Chốt theo Master Plan: .NET 10 + Next.js + PostgreSQL)* |

> 📦 **Yêu cầu mã nguồn:**  
> Mã nguồn public trên GitHub, README chỉn chu, có commit history rõ ràng (conventional commits ưu tiên). Đây là yếu tố quan trọng cho CV của cả nhóm.

---

## 7. Deliverables (Sản phẩm bàn giao)

### 7.1. Từ Business Analyst
- [x] Tài liệu SRS (Software Requirements Specification) hoàn chỉnh
- [ ] Use Case Diagram + đặc tả $\ge$ 10 use case chính
- [ ] BPMN cho 5 quy trình: Nhận khách mới, Chốt tiền cuối tháng, Xử lý sự cố, Gia hạn hợp đồng, Chấm dứt hợp đồng
- [ ] ERD + Data Dictionary
- [ ] Wireframe (low-fi) Figma cho 3 role
- [ ] Mockup (hi-fi) cho ít nhất 10 màn hình chính
- [ ] Sequence Diagram cho 3 luồng: Sinh hóa đơn, Thanh toán VNPay, Đăng nhập
- [ ] Ma trận truy vết yêu cầu (Requirement Traceability Matrix)

### 7.2. Từ Developer
- [ ] Mã nguồn trên GitHub (frontend + backend)
- [ ] Hệ thống chạy được trên môi trường public (URL demo)
- [ ] Tài liệu API (Swagger / Postman collection)
- [ ] Hướng dẫn cài đặt local (README)
- [ ] Dữ liệu seed: 1 owner, 2 manager, 10 tenant, 64 phòng, 3 dãy

### 7.3. Chung
- [ ] Slide thuyết trình
- [ ] Video demo $\le$ 5 phút
- [ ] Test plan + biên bản UAT

---

## 8. Timeline gợi ý 16 tuần

| Tuần | Giai đoạn | Hoạt động chính |
| :---: | :--- | :--- |
| **1–2** | **Khởi động** | Đọc requirement, lập kế hoạch, chia task, setup repo & tools |
| **3–5** | **Phân tích** | BA hoàn thiện SRS, Use Case, BPMN, ERD |
| **6–7** | **Thiết kế** | BA: Wireframe → Mockup. Dev: Kiến trúc hệ thống, chọn stack |
| **8–13** | **Phát triển** | Code theo 3 sprint × 2 tuần. BA viết test case, theo dõi tiến độ |
| **14** | **Tích hợp & test** | Integration test, sửa bug, hoàn thiện luồng |
| **15** | **UAT** | Demo cho "chị Lan" (mentor đóng vai), thu phản hồi |
| **16** | **Bàn giao** | Hoàn thiện tài liệu, deploy, quay video demo |

---

## 9. Acceptance Criteria (Nghiệm thu MVP)

Hệ thống được coi là **đạt MVP** khi đáp ứng tất cả các tiêu chí dưới đây:
- [ ] Tất cả yêu cầu mức **M** được triển khai và pass test.
- [ ] Luồng nghiệp vụ hoàn chỉnh: Owner đăng nhập → tạo 1 dãy → 1 phòng → 1 hợp đồng → nhập chỉ số điện → sinh hóa đơn → khách thanh toán thành công qua VNPay sandbox.
- [ ] Manager scope dãy A không xem được dữ liệu dãy B.
- [ ] Khách thuê tạo được ticket và nhận email khi ticket cập nhật.
- [ ] Dashboard hiển thị đủ 4 chỉ số ở FR-39 với dữ liệu thật.
- [ ] Chức năng nhập chỉ số điện hoạt động khi tắt mạng, đồng bộ khi bật lại.
- [ ] Không còn lỗi blocker hoặc critical nào.
- [ ] Đầy đủ tài liệu ở Mục 7 (Deliverables).

---

## 10. Glossary (Thuật ngữ)

| Thuật ngữ | Định nghĩa |
| :--- | :--- |
| **Dãy trọ** | Một cụm nhà trọ vật lý tại 1 địa chỉ, gồm nhiều phòng |
| **Hợp đồng** | Thỏa thuận thuê giữa chủ trọ và 1 khách đại diện |
| **Khách đại diện** | Người đứng tên hợp đồng, chịu trách nhiệm thanh toán |
| **Tỷ lệ lấp đầy** | `(Số phòng "Đang thuê" / Tổng số phòng) × 100%` |
| **Chu kỳ hóa đơn** | Ngày 28 → ngày 27 tháng sau |
| **Quá hạn** | Hóa đơn chưa thanh toán sau ngày 5 tháng tiếp theo |
| **MBHMS** | Mini Boarding House Management System — tên hệ thống |
| **MVP** | Minimum Viable Product — sản phẩm tối thiểu khả dụng |
| **MoSCoW** | Phương pháp ưu tiên: Must / Should / Could / Won't |

---
*MBHMS · Phiên bản 1.0 (Chốt) · 08/06/2026*
