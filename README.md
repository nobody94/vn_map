# Bản đồ Việt Nam

Website bản đồ Việt Nam tương tác theo **34 tỉnh, thành phố sau sắp xếp đơn vị hành chính (hiệu lực từ 01/07/2025)**. Bấm vào một tỉnh để xem số liệu, địa hình, văn hóa, lễ hội, ẩm thực, đặc sản và các đơn vị hành chính trực thuộc. Có thêm các lớp bản đồ địa hình, đỉnh núi và sông ngòi.

## Tính năng

- **Bản đồ 34 tỉnh, thành phố**
  - Rê chuột hiện tên tỉnh và các tỉnh cũ đã hợp nhất. Bấm vào tỉnh để bản đồ zoom tới.
  - Tỉnh được tô màu theo 7 vùng kinh tế. Rê chuột lên chú giải để làm nổi một vùng.
  - Luôn thể hiện quần đảo **Hoàng Sa** (Đà Nẵng) và **Trường Sa** (Khánh Hòa).
- **Panel thông tin tỉnh** gồm 3 tab:
  - **Tổng quan:**
    - Diện tích, dân số, mật độ, điểm cao nhất, địa hình.
    - Đơn vị hành chính: số xã, phường, đặc khu; danh sách phường; các huyện, quận cũ trước 07/2025 để tra cứu.
  - **Văn hóa & Lễ hội:** giới thiệu văn hóa, di sản, lễ hội, có ghi rõ âm lịch hay dương lịch.
  - **Ẩm thực & Đặc sản:** món ăn và đặc sản tiêu biểu, có ảnh minh họa.
- **Tìm kiếm** theo tên tỉnh mới, tên tỉnh cũ trước sáp nhập, hoặc tên phường.
  - Không cần gõ dấu, dùng được phím ↑ ↓ Enter Esc.
  - Chọn một phường sẽ mở đúng tỉnh chứa phường đó.
- **Lớp bản đồ** (bật/tắt ở góc trên bên phải):
  - **Địa hình:** tô màu lãnh thổ theo độ cao (xanh lá vùng thấp → vàng → nâu → trắng trên 3.000 m), kèm bóng đổ núi và chú giải độ cao.
  - **Đỉnh núi:** 20 đỉnh núi tiêu biểu, kèm nhãn các dãy núi và cao nguyên.
  - **Sông ngòi:** 21 con sông chính. Bấm vào sông để xem chiều dài, nơi bắt nguồn, cửa sông và các tỉnh sông chảy qua. Khi đang chọn một tỉnh, bản đồ chỉ hiện phần sông nằm trong tỉnh đó.
- **Giao diện:** tối giản, tiếng Việt, dùng tốt trên điện thoại (panel trượt lên từ phía dưới).

## Công nghệ

- [React 19](https://react.dev) + TypeScript + [Vite](https://vite.dev), có bật React Compiler
- [Leaflet](https://leafletjs.com) + [react-leaflet](https://react-leaflet.js.org)
- CSS Modules

## Chạy dự án

Cần cài Node.js 22.18 trở lên (để chạy trực tiếp các script `.ts`).

```bash
npm install
npm run dev       # mở http://localhost:5173
npm run build     # build ra thư mục dist/
npm run preview   # xem thử bản build
```

### Script dữ liệu

| Lệnh | Việc làm |
| --- | --- |
| `npm run media` | Tìm ảnh minh họa trên Wikimedia Commons và Openverse, ghi vào `src/data/media.generated.json` |
| `npm run media:missing` | Liệt kê các mục chưa có ảnh vào `missing-images.txt` |
| `npm run images:resize` | Thu nhỏ ảnh trong `public/images/` (chỉ chạy được trên Windows) |
| `npm run admin-units` | Tải lại danh sách xã, phường và huyện cũ vào `public/data/admin-units.json` |

## Cấu trúc thư mục

```
src/
  components/map/       # các lớp bản đồ: tỉnh, quần đảo, núi, sông
  components/panel/     # panel thông tin tỉnh, núi, sông
  components/controls/  # ô tìm kiếm, chú giải vùng, nút bật/tắt lớp
  data/                 # dữ liệu tỉnh, vùng, núi, sông, ảnh
  utils/                # tìm kiếm, cắt sông theo tỉnh, định dạng số
public/
  geo/                  # ranh giới tỉnh, đường sông (GeoJSON)
  data/                 # danh sách đơn vị hành chính
  images/               # ảnh tự tìm, chia thư mục theo tỉnh
scripts/                # script tạo và cập nhật dữ liệu
```

## Nguồn dữ liệu

| Dữ liệu | Nguồn |
| --- | --- |
| Danh sách 34 tỉnh, diện tích, dân số | Nghị quyết 202/2025/QH15, Tổng cục Thống kê |
| Ranh giới tỉnh | [vietnamese-provinces-database](https://github.com/ThangLeQuoc/vietnamese-provinces-database) (MIT) |
| Xã, phường, huyện cũ | [provinces.open-api.vn](https://provinces.open-api.vn) |
| Đường sông | © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors (ODbL) |
| Độ cao | [AWS Terrain Tiles](https://registry.opendata.aws/terrain-tiles/) (Mapzen; SRTM, ETOPO1…) |
| Bóng đổ địa hình | Esri World Shaded Relief |
| Ảnh minh họa | Wikimedia Commons, Openverse / Flickr, Pixabay |

Ảnh minh họa chỉ dùng ảnh có giấy phép cho phép dùng lại (Creative Commons, public domain hoặc Pixabay License). Tác giả và giấy phép được ghi dưới mỗi ảnh. Một số ảnh minh họa đúng món ăn hoặc đúng loại cảnh, nhưng không chụp tại chính địa phương được nhắc đến.

Nội dung giới thiệu (văn hóa, lễ hội, ẩm thực) được biên soạn để tham khảo, có thể chưa đầy đủ hoặc chưa chính xác hoàn toàn.
