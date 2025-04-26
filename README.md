# Hệ Thống Quản Lý Nhà Hàng

Hệ thống quản lý nhà hàng toàn diện với giao diện người dùng hiện đại và đầy đủ tính năng quản lý thực đơn, đơn hàng và thống kê doanh thu.

## Tổng Quan

Dự án được chia thành hai phần chính:
1. **Backend**: API RESTful được xây dựng bằng Java Spring Boot
2. **Frontend**: Ứng dụng React đơn trang (SPA) cho giao diện người dùng

## Các Tính Năng Chính

### Quản Lý Thực Đơn
- Quản lý danh mục món ăn
- Thêm, sửa, xóa món ăn
- Phân loại món ăn theo danh mục
- Cập nhật trạng thái món ăn (có sẵn hoặc không có sẵn)

### Quản Lý Đơn Hàng
- Tạo đơn hàng mới
- Xem và cập nhật trạng thái đơn hàng (đang xử lý, hoàn thành, hủy)
- Lọc đơn hàng theo ngày
- Xem chi tiết đơn hàng

### Thống Kê Doanh Thu
- Xem doanh thu hàng ngày, hàng tuần, hàng tháng
- Biểu đồ thống kê doanh thu theo thời gian
- Thống kê các món ăn bán chạy nhất
- Bảng điều khiển tổng quan các chỉ số chính

## Yêu Cầu Hệ Thống

### Backend
- Java 11 hoặc cao hơn
- Maven
- MySQL 8.0
- Cổng mặc định: 8080

### Frontend
- Node.js 14.x hoặc cao hơn
- npm/yarn
- Cổng mặc định: 3000

## Hướng Dẫn Cài Đặt

### Cài Đặt Cơ Sở Dữ Liệu
1. Cài đặt MySQL 8.0
2. Tạo cơ sở dữ liệu mới:
```sql
CREATE DATABASE restaurant_management;
```
3. Cập nhật thông tin kết nối cơ sở dữ liệu trong file `src/main/resources/application.properties`

### Cài Đặt Backend
1. Clone dự án từ repository
2. Di chuyển vào thư mục gốc của dự án
3. Biên dịch và đóng gói dự án sử dụng Maven:
```bash
mvn clean package
```
4. Chạy ứng dụng:
```bash
java -jar target/restaurant-management-system-1.0-SNAPSHOT.jar
```

Hoặc sử dụng Maven:
```bash
mvn spring-boot:run
```

### Cài Đặt Frontend
1. Di chuyển vào thư mục frontend:
```bash
cd restaurant-frontend
```
2. Cài đặt các dependencies:
```bash
npm install
```
hoặc
```bash
yarn install
```
3. Chạy ứng dụng frontend:
```bash
npm start
```
hoặc
```bash
yarn start
```

## Cấu Trúc Dự Án

### Cấu Trúc Backend

```
src/main/java/com/restaurant/
├── config/             # Cấu hình hệ thống
├── controller/         # Các controller xử lý request API
├── dao/                # Các lớp truy cập dữ liệu (DAO)
├── dto/                # Các đối tượng truyền dữ liệu (DTO)
├── exception/          # Xử lý ngoại lệ
├── filter/             # Bộ lọc 
├── model/              # Các model dữ liệu
├── service/            # Các service xử lý logic nghiệp vụ
├── util/               # Các tiện ích
└── RestaurantApplication.java  # Lớp khởi động ứng dụng Spring Boot
```

### Cấu Trúc Frontend

```
restaurant-frontend/
├── public/             # Các tài nguyên tĩnh
├── src/
│   ├── api/            # Các thư viện gọi API
│   ├── components/     # Các component React
│   │   ├── category/   # Components cho quản lý danh mục
│   │   ├── common/     # Components dùng chung
│   │   ├── menu/       # Components cho giao diện thực đơn
│   │   ├── menuItem/   # Components cho quản lý món ăn
│   │   ├── order/      # Components cho quản lý đơn hàng
│   │   └── statistics/ # Components cho thống kê 
│   ├── pages/          # Các trang trong ứng dụng
│   ├── App.jsx         # Component gốc của ứng dụng
│   ├── index.js        # Điểm khởi chạy của React
│   └── styles.css      # Stylesheet chính
└── package.json        # Cấu hình npm
```

## Mô Tả API

### API Danh Mục

- `GET /api/categories` - Lấy tất cả danh mục
- `GET /api/categories/{id}` - Lấy danh mục theo ID
- `POST /api/categories` - Tạo danh mục mới
- `PUT /api/categories/{id}` - Cập nhật danh mục
- `DELETE /api/categories/{id}` - Xóa danh mục

### API Món Ăn

- `GET /api/menu-items` - Lấy tất cả món ăn
- `GET /api/menu-items/{id}` - Lấy món ăn theo ID
- `GET /api/menu-items/category/{categoryId}` - Lấy món ăn theo danh mục
- `POST /api/menu-items` - Tạo món ăn mới
- `PUT /api/menu-items/{id}` - Cập nhật món ăn
- `DELETE /api/menu-items/{id}` - Xóa món ăn

### API Đơn Hàng

- `GET /api/orders` - Lấy tất cả đơn hàng
- `GET /api/orders/{id}` - Lấy đơn hàng theo ID
- `GET /api/orders/date/{date}` - Lấy đơn hàng theo ngày
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/{id}` - Cập nhật đơn hàng
- `PATCH /api/orders/{id}/status` - Cập nhật trạng thái đơn hàng
- `DELETE /api/orders/{id}` - Xóa đơn hàng

### API Thống Kê

- `GET /api/statistics/dashboard` - Lấy dữ liệu tổng quan cho dashboard
- `GET /api/statistics/daily` - Lấy doanh thu theo ngày
- `GET /api/statistics/weekly` - Lấy doanh thu theo tuần
- `GET /api/statistics/monthly` - Lấy doanh thu theo tháng
- `GET /api/statistics/top-selling` - Lấy danh sách món ăn bán chạy
- `GET /api/statistics/daily-range` - Lấy doanh thu theo khoảng thời gian

## Hướng Dẫn Sử Dụng

1. Sau khi chạy cả backend và frontend, truy cập vào ứng dụng qua địa chỉ: http://localhost:3000
2. Sử dụng menu bên trái để điều hướng giữa các tính năng:
   - **Dashboard**: Xem tổng quan về doanh thu và hoạt động
   - **Quản lý danh mục**: Thêm, sửa, xóa danh mục món ăn
   - **Quản lý thực đơn**: Thêm, sửa, xóa món ăn
   - **Xem thực đơn**: Xem thực đơn hiện tại
   - **Quản lý đơn hàng**: Tạo, xem, cập nhật và xóa đơn hàng
   - **Thống kê**: Xem biểu đồ và báo cáo thống kê

## Lưu Ý Bảo Mật

- Trong môi trường production, hãy thay đổi các thông tin đăng nhập cơ sở dữ liệu mặc định
- Giới hạn CORS phù hợp trong file cấu hình `CorsConfig.java`
- Cấu hình HTTPS cho ứng dụng khi triển khai vào môi trường thực tế

## Xử Lý Sự Cố

- **Backend không khởi động**: Kiểm tra cấu hình cơ sở dữ liệu và đảm bảo MySQL đang chạy
- **Frontend không kết nối được với API**: Kiểm tra cấu hình API_BASE_URL trong các file api/*.js
- **Không thể xem được thống kê**: Đảm bảo có dữ liệu đơn hàng và các bảng liên quan đã được khởi tạo đúng cách

## Phát Triển Thêm

Các tính năng có thể phát triển thêm cho hệ thống:
- Hệ thống xác thực và phân quyền người dùng
- Quản lý bàn và đặt bàn
- Quản lý tồn kho và nguyên liệu
- Tích hợp với máy POS
- Ứng dụng di động cho nhân viên phục vụ

## Người Đóng Góp

- [Tên của bạn] - Người phát triển chính

## Giấy Phép

Dự án này được phân phối dưới [Giấy phép MIT](LICENSE).
