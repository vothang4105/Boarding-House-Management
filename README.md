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

Dự án được định hướng phát triển bền vững, dễ mở rộng và bảo trì nhờ việc tách biệt rõ ràng kiến trúc Backend, Frontend và Database theo chuẩn phân tích mô hình BCE (Boundary - Control - Entity).

### 3.1. Ngôn ngữ Lập trình Chủ đạo
* **TypeScript / JavaScript:** Sử dụng xuyên suốt từ Client đến Server nhằm đồng bộ hóa kiểu dữ liệu, tăng tốc độ phát triển và tối ưu hóa hiệu năng xử lý bất đồng bộ (Asynchronous).
* **SQL (Structured Query Language):** Sử dụng để viết các truy vấn tối ưu, Trigger, và Stored Procedure bảo vệ toàn vẹn dữ liệu tài chính.

### 3.2. Công nghệ Backend (Server-side)
* **Framework:** Node.js phối hợp với **NestJS** (hoặc **Express.js**) cấu trúc mã nguồn theo mô hình OOP, Dependency Injection mạnh mẽ, giúp hệ thống API đạt tính modular cao.
* **Xác thực & Phân quyền:** **JWT (JSON Web Token)** kết hợp với Middleware Role-based Access Control (RBAC) để nhận diện và chặn truy cập trái phép giữa các vai trò User.
* **Gửi Email:** **Nodemailer** tích hợp SMTP Service (SendGrid hoặc Gmail API) đảm bảo luồng mail gửi đi không bị rơi vào hộp thư rác (Spam).

### 3.3. Công nghệ Frontend & Mobile (Client-side)
* **Ứng dụng Di động (Manager/Tenant):** Phát triển bằng **React Native** hoặc **Flutter** giúp đóng gói ứng dụng mượt mà trên cả 2 nền tảng iOS và Android từ một nền tảng mã nguồn duy nhất.
* **Trang Quản trị Web (Owner):** Cấu trúc bằng **React.js** kết hợp với thư viện UI Component hiện đại (Ant Design hoặc Tailwind CSS) đem lại trải nghiệm Dashboard mượt mà, trực quan.
* **Kiến trúc Offline-First:** Sử dụng **SQLite (hoặc Hive / WatermelonDB)** tích hợp tại Client để làm lớp đệm lưu trữ dữ liệu chỉ số điện tạm thời khi thiết bị mất kết nối Internet.

### 3.4. Hệ Quản trị Cơ sở Dữ liệu (Database)
* **RDBMS:** **PostgreSQL** (hoặc **MySQL 8.0**) nhằm đảm bảo tính toàn vẹn dữ liệu thông qua cơ chế khóa ngoại (Foreign Keys), ràng buộc kiểm tra (Check Constraints), và đảm bảo các giao dịch tài chính tuân thủ tuyệt đối chuẩn **ACID**.

### 3.5. Tích hợp bên thứ ba & Triển khai (Integrations & DevOps)
* **Payment Gateway:** **VNPay Sandbox API** (môi trường thử nghiệm tích hợp mã giao dịch `vnp_TxnRef`, kiểm tra chữ ký bảo mật `vnp_SecureHash` và xử lý IPN URL).
* **Quản lý mã nguồn:** **Git & GitHub** tuân thủ quy trình GitFlow tiêu chuẩn (nhánh `main`, `develop`, và các `feature/*`).
