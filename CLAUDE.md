# CLAUDE.md

Website bản đồ Việt Nam tương tác: bấm vào tỉnh để xem dân số, diện tích, độ cao, văn hóa, lễ hội, món ăn, đặc sản; có các chế độ xem sông ngòi và núi. Giao diện và nội dung bằng **tiếng Việt**. Người dùng trao đổi bằng tiếng Việt.

## Lệnh

```bash
npm run dev      # server dev tại http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # eslint
npm run media    # tra ảnh Wikimedia cho provinceDetails.ts → src/data/media.generated.json
```

Chưa có bộ test. Kiểm tra bằng `npm run lint` + `npm run build`, rồi mở trình duyệt xem thực tế.

## Công nghệ

- React 19 + TypeScript + Vite 8, bật **React Compiler** (babel preset trong `vite.config.ts`)
- `leaflet` 1.9 + `react-leaflet` 5
- **CSS Modules** (`*.module.css`), không dùng Tailwind. Phong cách **hiện đại, tối giản**.
- Biến thiết kế (màu, bo góc, đổ bóng, `--panel-width`, `--sheet-height`) khai báo ở `src/index.css`. Màu nhấn: teal `#0f766e`.

## Cấu trúc

```
src/
  App.tsx                       # state selectedCode; ghép VietnamMap + ProvincePanel
  types/province.ts             # ProvinceMeta, ProvinceDetail, Festival, Peak, ...
  data/provinceMeta.ts          # 34 tỉnh: code, slug, name, kind, mergedFrom
  data/provinceDetails.ts       # gộp PROVINCE_DETAILS từ details/*
  data/details/bac.ts           # chi tiết mã 1–15 (miền Bắc)
  data/details/trung.ts         # chi tiết mã 16–26 (miền Trung, Tây Nguyên)
  data/details/nam.ts           # chi tiết mã 27–34 (miền Nam)
  data/regions.ts               # 7 vùng: tên, màu (fill/strong), PROVINCE_REGION theo mã
  data/media.ts                 # resolveImage(): MediaRef → ảnh + ghi nguồn
  utils/search.ts               # tìm tỉnh theo tên mới + tên cũ, bỏ dấu
  components/controls/          # SearchBox (trong khung tiêu đề), RegionLegend (góc dưới trái, công tắc tô màu)
  data/media.generated.json     # SINH TỰ ĐỘNG bởi `npm run media`, không sửa tay
  hooks/useGeoData.ts           # fetch GeoJSON trong public/
  utils/format.ts               # định dạng số kiểu vi-VN
  components/map/               # VietnamMap, ProvinceLayer, IslandsLayer
  components/panel/             # ProvincePanel + OverviewTab/CultureTab/FoodTab (dùng chung Tab.module.css), MediaImage
public/geo/provinces.geojson    # ranh giới 34 tỉnh (~260KB), properties: { code }
scripts/build-provinces-geojson.cjs  # tạo lại provinces.geojson từ dữ liệu gốc
scripts/fetch-media.ts          # tra ảnh (Node ≥22.18 chạy .ts trực tiếp)
```

## Quy ước dữ liệu

- **34 tỉnh sau sáp nhập (Nghị quyết 202/2025/QH15, hiệu lực 01/07/2025).** Mỗi tỉnh ghi danh sách tỉnh cũ trong `mergedFrom` (để rỗng nếu giữ nguyên địa giới).
- `code` (1–34) là khóa chung cho `provinceMeta.ts`, `provinceDetails.ts` và `properties.code` trong GeoJSON.
- Số liệu diện tích/dân số phải có `statsSource`. Ưu tiên nguồn chính thức (NQ 202/2025/QH15, Tổng cục Thống kê). Số ước tính phải ghi rõ là ước tính.
- Thời gian lễ hội ghi rõ **âm lịch / dương lịch**.
- `Peak.highest = true` chỉ gán khi chắc chắn đó là điểm cao nhất của tỉnh. Nếu không chắc thì liệt kê như đỉnh tiêu biểu (ô số liệu sẽ ghi "Đỉnh tiêu biểu").
- Import giữa các file dữ liệu dùng đuôi `.ts` (vd. `./details/bac.ts`), vì `scripts/fetch-media.ts` import chúng trực tiếp bằng Node.
- Tiêu đề `wiki` phải trỏ tới bài thật, không phải trang định hướng "(định hướng)". Kiểm tra trước bằng API trước khi chạy `npm run media`.

## Ảnh

- Ảnh bìa văn hóa, di sản, lễ hội, món ăn, đặc sản đều là `MediaRef`. Thứ tự lấy ảnh: `imageFile` (file Commons chỉ định) → ảnh đầu tiên trong bài `wiki` (vi.wikipedia) → kết quả tìm `imageSearch` trên Commons.
- **Không hiển thị link** (người dùng đã yêu cầu bỏ link ở di sản và lễ hội). `wiki` chỉ dùng để lấy ảnh.
- Ảnh chọn tự động **hay bị sai chủ đề** (vd. Hủ tiếu Nam Vang ra ảnh Hoàng cung Campuchia). Sau khi chạy `npm run media`, phải xem tên file trong log hoặc ảnh thực tế, rồi sửa bằng `imageFile`. Không tìm được ảnh đúng thì để trống: `MediaImage` sẽ hiện khung giữ chỗ.
- Luôn hiện ghi nguồn tác giả + giấy phép (CC BY-SA yêu cầu).
- Wikimedia API giới hạn lượt gọi (HTTP 429). Script đã tự giãn cách và thử lại; tránh gọi API dồn dập bằng tay.

## Lưu ý quan trọng

- **Hoàng Sa (Đà Nẵng) và Trường Sa (Khánh Hòa)** không có trong `provinces.geojson`. Hai quần đảo được vẽ riêng ở `IslandsLayer.tsx` cùng nhãn "Biển Đông". Luôn phải thể hiện hai quần đảo này.
- `properties.matinh` trong dữ liệu gốc **không khớp** với tên tỉnh. Mã tỉnh được lấy theo tiền tố tên thư mục (xem script).
- **Không có bản đồ nền (tile).** CARTO giờ yêu cầu API key nên đã bỏ. Hiện tại bản đồ chỉ gồm polygon trên nền `--sea`. Nếu thêm lớp nền (vd. OpenTopoMap ở Phần 5), phải kèm attribution.
- `ProvinceLayer` cập nhật style theo kiểu imperative (`setStyle`), qua ref (`viewRef`, `onSelectRef`), để tránh dựng lại toàn bộ GeoJSON khi hover hoặc chọn tỉnh. Mọi style đi qua hàm thuần `styleFor(code, view, hovered)`.
- 7 vùng theo cách chia SGK Địa lý. Tỉnh sáp nhập trải hai vùng được xếp theo vùng chiếm phần lớn diện tích (Gia Lai → Tây Nguyên, Lâm Đồng → Tây Nguyên, Tây Ninh → Đông Nam Bộ, Quảng Ninh → Trung du và miền núi Bắc Bộ).
- Khi zoom tới một tỉnh: `focusBounds()` bỏ qua đảo nhỏ ở xa (vd. Côn Đảo); `panelPadding()` chừa chỗ cho panel (bên phải trên desktop, phía dưới trên mobile ≤768px) và cho khung tiêu đề. Nếu đổi `--panel-width` hoặc `--sheet-height` thì sửa cả hai chỗ.
- Bấm vào polygon phải gọi `L.DomEvent.stopPropagation`, vì sự kiện click trên bản đồ (vùng biển) có nghĩa là bỏ chọn.
- Ghi nguồn ranh giới (vietnamese-provinces-database, MIT) qua prop `attribution` của layer GeoJSON. Giữ nguyên ghi nguồn này.

## Lộ trình

Làm **từng phần một**. Xong mỗi phần thì dừng lại để người dùng xem trước khi sang phần tiếp theo.

1. ✅ Khung bản đồ: ranh giới 34 tỉnh, hover hiện tên + tỉnh cũ, hai quần đảo
2. ✅ Panel thông tin với 3 tab, dữ liệu mẫu 5 tỉnh: Hà Nội (1), Lào Cai (4), Đà Nẵng (21), Lâm Đồng (26), TP.HCM (29). Có ảnh (bìa văn hóa, di sản, lễ hội: ảnh ngang; món ăn, đặc sản: ảnh vuông bên trái), không có link.
3. ⏳ Dữ liệu đủ 34 tỉnh (chia file theo miền trong `src/data/details/`). Còn lại: chạy `npm run media` và duyệt ảnh tự chọn cho 29 tỉnh mới.
4. ✅ Tìm kiếm (tên mới + tên cũ, không dấu, phím ↑↓ Enter Esc) và tô màu 7 vùng (bật/tắt, rê chuột chú giải để làm nổi vùng)
5. Lớp núi và địa hình (`MountainLayer`, nền OpenTopoMap, `LayerSwitcher`)
6. Lớp sông ngòi (`RiverLayer`, `public/geo/rivers.geojson`)
7. đưa website lên mạng
