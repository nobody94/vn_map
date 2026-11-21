# CLAUDE.md

Website bản đồ Việt Nam tương tác: bấm vào tỉnh để xem dân số, diện tích, độ cao, văn hóa, lễ hội, món ăn, đặc sản; có các chế độ xem sông ngòi và núi. Giao diện và nội dung bằng **tiếng Việt**. Người dùng trao đổi bằng tiếng Việt.

## Lệnh

```bash
npm run dev      # server dev tại http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # eslint
npm run media    # tra ảnh Wikimedia + dự phòng Openverse (tỉnh, núi, sông) → src/data/media.generated.json; chỉ tra mục mới. Thêm `-- --full` để tra lại hết
npm run media:missing  # ghi danh sách mục chưa có ảnh ra missing-images.txt (kèm đường dẫn gợi ý)
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
  data/mountains.ts             # 20 đỉnh núi (id, tọa độ gần đúng, độ cao, mã tỉnh, vị trí, giới thiệu, ảnh MediaRef) + nhãn dãy núi / cao nguyên
  data/rivers.ts                # 21 sông chính (id, osmName để tra OSM, hệ thống, chiều dài, nguồn, cửa sông, mã tỉnh chảy qua, ảnh MediaRef) + RIVER_SYSTEMS
  data/mediaKey.ts              # fallbackKey(): khóa tra ảnh Openverse theo tên mục
  data/media.ts                 # resolveImage(): MediaRef → ảnh + ghi nguồn
  utils/search.ts               # tìm tỉnh theo tên mới + tên cũ, bỏ dấu
  components/controls/          # SearchBox (trong khung tiêu đề), RegionLegend (góc dưới trái, công tắc tô màu),
                                # LayerSwitcher (góc trên phải: Địa hình, Đỉnh núi, Sông ngòi; dời trái khi panel mở)
  data/media.generated.json     # SINH TỰ ĐỘNG bởi `npm run media`, không sửa tay
  hooks/useGeoData.ts           # fetch GeoJSON trong public/
  utils/format.ts               # định dạng số kiểu vi-VN
  components/map/               # VietnamMap, ProvinceLayer, IslandsLayer, MountainLayer, RiverLayer
  components/panel/             # ProvincePanel + OverviewTab/CultureTab/FoodTab (dùng chung Tab.module.css), MediaImage,
                                # MountainPanel (ảnh lớn, độ cao, vị trí, giới thiệu, nút mở tỉnh)
                                # RiverPanel (ảnh lớn, chiều dài, nguồn → cửa sông, giới thiệu, chip tỉnh chảy qua)
  utils/mapPadding.ts           # panelPadding(): khoảng chừa panel khi zoom tới tỉnh / núi
public/geo/provinces.geojson    # ranh giới 34 tỉnh (~260KB), properties: { code }
public/geo/rivers.geojson       # đường 21 sông (~84KB, MultiLineString), properties: { id } — từ OSM
scripts/build-rivers.ts         # tạo lại rivers.geojson từ Overpass (chậm, máy chủ hay quá tải); `--clip` chỉ áp lại CLIP lên file có sẵn
scripts/build-provinces-geojson.cjs  # tạo lại provinces.geojson từ dữ liệu gốc
scripts/fetch-media.ts          # tra ảnh (Node ≥22.18 chạy .ts trực tiếp)
scripts/list-missing-images.ts  # xuất missing-images.txt: mục chưa có ảnh, nhóm theo tỉnh / núi / sông
public/images/<slug-tỉnh>/      # ảnh tự tìm (imageUrl), vd. public/images/cao-bang/banh-cuon-canh.jpg
missing-images.txt              # SINH TỰ ĐỘNG bởi `npm run media:missing` — danh sách để đi tìm ảnh
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

- Ảnh bìa văn hóa, di sản, lễ hội, món ăn, đặc sản đều là `MediaRef`. Thứ tự lấy ảnh: `imageUrl` (ảnh tự tìm) → `imageFile` (file Commons chỉ định) → ảnh đầu tiên trong bài `wiki` (vi.wikipedia) → kết quả tìm `imageSearch` trên Commons → **dự phòng Openverse** (api.openverse.org, ảnh CC từ Flickr/Commons…, không cần key), tìm theo tên mục (`fallbackKey()` trong `src/data/mediaKey.ts`: `name` hoặc `caption`).
- Openverse: chỉ nhận ảnh có tiêu đề chứa ≥75% từ khóa (bỏ dấu). Ảnh Flickr dùng link cỡ `_z`; ảnh nguồn Commons lấy thumbnail qua API Commons (thumbnail của Openverse hay lỗi, Commons chặn URL thumb tự dựng ở cỡ lẻ). Ảnh Openverse chọn sai → thêm tên mục vào `NO_FALLBACK` trong `scripts/fetch-media.ts`. Giới hạn ẩn danh: script giãn 3,5s/lần, bị chặn thì lưu phần đã có, chạy lại để tra tiếp.
- **Ảnh tự tìm** (cho mục mà Wikimedia/Openverse không có, xem `missing-images.txt`):
  1. Lưu file vào `public/images/<slug-tỉnh>/<slug-tên>.jpg` (đường dẫn gợi ý có sẵn trong missing-images.txt; núi: `images/nui/`, sông: `images/song/`). JPG ngang ~1200px, < 300 KB.
  2. Khai báo ở mục tương ứng trong `src/data/details/*.ts` / `mountains.ts` / `rivers.ts`: `imageUrl: 'images/cao-bang/banh-cuon-canh.jpg', imageCredit: 'Tác giả · CC BY 4.0'`. Không có dấu `/` đầu (code tự nối `BASE_URL` để chạy đúng khi deploy dưới thư mục con). `imageUrl` cũng nhận URL `https://…` đầy đủ.
  3. `imageUrl` được ưu tiên cao nhất, đè mọi ảnh tự động. Ghi nguồn hiện dạng chữ (không link) từ `imageCredit`.
  4. Chỉ dùng ảnh tự chụp hoặc ảnh có giấy phép cho phép dùng lại (CC, public domain). Không lấy ảnh báo / blog.
  5. Chạy `npm run media:missing` để cập nhật danh sách.
- **Không hiển thị link** (người dùng đã yêu cầu bỏ link ở di sản và lễ hội). `wiki` chỉ dùng để lấy ảnh.
- Ảnh chọn tự động **hay bị sai chủ đề** (vd. Hủ tiếu Nam Vang ra ảnh Hoàng cung Campuchia). Sau khi chạy `npm run media`, phải xem tên file trong log hoặc ảnh thực tế, rồi sửa bằng `imageFile`. Không tìm được ảnh đúng thì để trống: `MediaImage` sẽ hiện khung giữ chỗ.
- Luôn hiện ghi nguồn tác giả + giấy phép (CC BY-SA yêu cầu).
- Wikimedia API giới hạn lượt gọi (HTTP 429). Script đã tự giãn cách và thử lại; tránh gọi API dồn dập bằng tay.

## Lưu ý quan trọng

- **Hoàng Sa (Đà Nẵng) và Trường Sa (Khánh Hòa)** không có trong `provinces.geojson`. Hai quần đảo được vẽ riêng ở `IslandsLayer.tsx` cùng nhãn "Biển Đông". Luôn phải thể hiện hai quần đảo này.
- `properties.matinh` trong dữ liệu gốc **không khớp** với tên tỉnh. Mã tỉnh được lấy theo tiền tố tên thư mục (xem script).
- **Mặc định không có bản đồ nền (tile).** CARTO giờ yêu cầu API key nên đã bỏ.
- **Lớp Địa hình** dùng Esri `World_Shaded_Relief` (ảnh đổ bóng, **không có nhãn chữ**, max zoom 13). Không dùng OpenTopoMap/OSM vì nhãn có thể ghi tên nước ngoài cho Hoàng Sa, Trường Sa. Khi bật địa hình, `styleFor` làm nền tỉnh gần trong suốt. Trước khi đưa lên mạng (Phần 7) cần kiểm tra điều khoản sử dụng tile Esri.
- Leaflet 1.9 đặt `mix-blend-mode: plus-lighter` cho ô ảnh nền, gây đường viền trắng ở mép ô khi zoom lẻ. Lớp địa hình ghi đè bằng `mix-blend-mode: normal` (`.relief` trong `VietnamMap.module.css`). Đừng dùng mẹo phóng ô 256.5px: ở zoom lẻ ô không phải 256px nên sẽ hở khắp nơi.
- Nhãn đỉnh núi bật/tắt theo zoom bằng class trên `map.getContainer()` (không render lại marker): đỉnh `featured` luôn hiện nhãn, đỉnh khác hiện từ zoom 7, nhãn cao nguyên từ zoom 6.5, ẩn nhãn dãy núi từ zoom 10.
- App giữ **một** lựa chọn duy nhất: `Selection = { kind: 'province', code } | { kind: 'mountain', id } | { kind: 'river', id } | null` trong `App.tsx`. Đổi qua `selectProvince` / `selectMountain` / `selectRiver`; `selectProvince(null)` hoặc `close()` (bấm ra biển, nút đóng) bỏ chọn. Thêm loại đối tượng mới thì thêm nhánh vào union này.
- **Sông**: `RiverLayer` vẽ hai lớp GeoJSON: lớp nhìn thấy (`interactive: false`) và lớp trong suốt dày 14px để dễ bấm, có tooltip. Chọn sông thì tô đậm + bay tới. Dữ liệu sông © OpenStreetMap (ODbL), ghi nguồn qua `attribution`, giữ nguyên.
- `build-rivers.ts` tra theo tên (`osmName` + `osmAltNames`), nên dễ lẫn sông **trùng tên** ở nơi khác (đã gặp: sông Lô, sông Cầu, sông Hương). Sau khi tạo lại, kiểm tra khung tọa độ từng sông và thêm khung vào `CLIP`. Sông Đà, Hồng, Hậu kéo sang Trung Quốc / Campuchia là đúng.
- Sông Tiền, Hậu, Hàn chưa có chiều dài (các nguồn ghi khác nhau); `RiverPanel` chỉ hiện ô số liệu có giá trị.
- Trong script Node trên Windows, tránh `process.exit()` sau khi ghi file (lỗi libuv `UV_HANDLE_CLOSING`); dùng if/else.
- `resolveImage` thử cả tên file có dấu cách và gạch dưới (Commons trả về lẫn lộn hai kiểu).
- Bật/tắt lớp dùng cập nhật dạng hàm `setLayers((l) => …)`, vì bấm nhanh liên tiếp với giá trị cũ sẽ ghi đè nhau.
- `ProvinceLayer` cập nhật style theo kiểu imperative (`setStyle`), qua ref (`viewRef`, `onSelectRef`), để tránh dựng lại toàn bộ GeoJSON khi hover hoặc chọn tỉnh. Mọi style đi qua hàm thuần `styleFor(code, view, hovered)`.
- 7 vùng theo cách chia SGK Địa lý. Tỉnh sáp nhập trải hai vùng được xếp theo vùng chiếm phần lớn diện tích (Gia Lai → Tây Nguyên, Lâm Đồng → Tây Nguyên, Tây Ninh → Đông Nam Bộ, Quảng Ninh → Trung du và miền núi Bắc Bộ).
- Khi zoom tới một tỉnh: `focusBounds()` bỏ qua đảo nhỏ ở xa (vd. Côn Đảo); `panelPadding()` chừa chỗ cho panel (bên phải trên desktop, phía dưới trên mobile ≤768px) và cho khung tiêu đề. Nếu đổi `--panel-width` hoặc `--sheet-height` thì sửa cả hai chỗ.
- Bấm vào polygon phải gọi `L.DomEvent.stopPropagation`, vì sự kiện click trên bản đồ (vùng biển) có nghĩa là bỏ chọn.
- Ghi nguồn ranh giới (vietnamese-provinces-database, MIT) qua prop `attribution` của layer GeoJSON. Giữ nguyên ghi nguồn này.

## Lộ trình

Làm **từng phần một**. Xong mỗi phần thì dừng lại để người dùng xem trước khi sang phần tiếp theo.

1. ✅ Khung bản đồ: ranh giới 34 tỉnh, hover hiện tên + tỉnh cũ, hai quần đảo
2. ✅ Panel thông tin với 3 tab, dữ liệu mẫu 5 tỉnh: Hà Nội (1), Lào Cai (4), Đà Nẵng (21), Lâm Đồng (26), TP.HCM (29). Có ảnh (bìa văn hóa, di sản, lễ hội: ảnh ngang; món ăn, đặc sản: ảnh vuông bên trái), không có link.
3. ✅ Dữ liệu + ảnh đủ 34 tỉnh (chia file theo miền trong `src/data/details/`). Ảnh đã duyệt theo tên file; ~400/524 mục có ảnh, mục không tìm được ảnh đúng để trống (khung giữ chỗ).Chạy npm run media:missing để cập nhật lại danh sách.
4. ✅ Tìm kiếm (tên mới + tên cũ, không dấu, phím ↑↓ Enter Esc) và tô màu 7 vùng (bật/tắt, rê chuột chú giải để làm nổi vùng)
5. ✅ Lớp núi và địa hình: nền đổ bóng Esri, 20 đỉnh núi (bấm vào mở MountainPanel có ảnh + giới thiệu), nhãn dãy núi + cao nguyên, `LayerSwitcher`
6. ✅ Lớp sông ngòi: 21 sông từ OSM, bấm vào mở `RiverPanel` có ảnh + thông tin, chip tỉnh chảy qua mở panel tỉnh
7. đưa website lên mạng
