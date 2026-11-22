# CLAUDE.md

Bản đồ Việt Nam tương tác (34 tỉnh sau sáp nhập 01/07/2025): bấm tỉnh xem số liệu, văn hóa, lễ hội, món ăn, đặc sản, đơn vị hành chính; lớp núi, địa hình, sông. Giao diện, nội dung và trao đổi với người dùng bằng **tiếng Việt**.

## Lệnh

```bash
npm run dev            # http://localhost:5173
npm run build          # tsc -b && vite build
npm run lint
npm run media          # tra ảnh Wikimedia + Openverse → src/data/media.generated.json (mục mới; `-- --full` tra lại hết)
npm run media:missing  # ghi missing-images.txt (mục chưa có ảnh + đường dẫn gợi ý)
npm run images:resize  # thu nhỏ ảnh public/images (≤1200px, JPEG q82, file >300KB), ghi đè file gốc
npm run admin-units    # tải lại public/data/admin-units.json từ provinces.open-api.vn
```

Chưa có test. Kiểm tra bằng `lint` + `build`, rồi xem trên trình duyệt (cả mobile ≤768px).

## Công nghệ

React 19 + TypeScript + Vite 8 (bật React Compiler), Leaflet 1.9 + react-leaflet 5, **CSS Modules** (không Tailwind), phong cách hiện đại tối giản. Biến thiết kế ở `src/index.css`, màu nhấn teal `#0f766e`. Node ≥22.18 chạy script `.ts` trực tiếp.

## Cấu trúc

```
src/App.tsx                 # Selection duy nhất: province (+ unit) | mountain | river | null
src/data/provinceMeta.ts    # 34 tỉnh: code, slug, name, kind, mergedFrom
src/data/details/{bac,trung,nam}.ts  # chi tiết tỉnh mã 1–15 / 16–26 / 27–34
src/data/regions.ts         # 7 vùng + màu
src/data/mountains.ts, rivers.ts     # 20 đỉnh núi, 21 sông
src/data/media.ts           # resolveImage(): MediaRef → ảnh + ghi nguồn
src/data/adminUnits.ts      # useAdminUnits(): tải admin-units.json một lần
src/utils/search.ts         # tìm tỉnh (tên mới + cũ) và phường, bỏ dấu
src/components/map/         # VietnamMap, ProvinceLayer, IslandsLayer, MountainLayer, RiverLayer
src/components/panel/       # ProvincePanel (3 tab), AdminUnits, MountainPanel, RiverPanel, MediaImage
src/components/controls/    # SearchBox, RegionLegend, LayerSwitcher
public/geo/                 # provinces.geojson, rivers.geojson (OSM)
public/data/admin-units.json  # SINH TỰ ĐỘNG: { [code]: { wards, oldDistricts: [tên, tỉnh cũ][] } }
public/images/<slug-tỉnh>/  # ảnh tự tìm (núi: nui/, sông: song/)
scripts/                    # fetch-media, list-missing-images, resize-images.ps1, build-rivers, build-admin-units, build-provinces-geojson
```

`media.generated.json`, `admin-units.json`, `missing-images.txt` sinh tự động, không sửa tay.

## Quy ước dữ liệu

- 34 tỉnh theo NQ 202/2025/QH15. `mergedFrom` ghi tỉnh cũ (rỗng nếu giữ nguyên). `code` 1–34 là khóa chung cho meta, details và GeoJSON.
- Diện tích/dân số phải có `statsSource`, ưu tiên nguồn chính thức; số ước tính ghi rõ.
- Lễ hội ghi rõ âm lịch / dương lịch. `Peak.highest` chỉ gán khi chắc chắn.
- Import giữa file dữ liệu dùng đuôi `.ts` (script Node import trực tiếp).
- `wiki` phải trỏ bài thật, không phải trang định hướng.
- **Đơn vị hành chính:** không còn cấp huyện từ 01/07/2025; tỉnh có xã/phường/đặc khu (3.321). Panel hiện số lượng, danh sách phường + đặc khu, huyện cũ (chỉ tra cứu). Ô tìm kiếm chỉ tìm tỉnh và **phường**; chọn phường → chọn tỉnh, mở tab Tổng quan, tô đậm phường. Không vẽ ranh giới xã.

## Ảnh

- Thứ tự: `imageUrl` (ảnh tự tìm) → `imageFile` (Commons) → ảnh bài `wiki` → `imageSearch` → dự phòng Openverse (theo tên mục; sai thì thêm vào `NO_FALLBACK` trong `fetch-media.ts`).
- Ảnh tự động hay sai chủ đề: luôn xem ảnh thực tế rồi sửa bằng `imageFile`. Không có ảnh đúng thì để trống (hiện khung giữ chỗ).
- **Ảnh tự tìm:** lưu `public/images/<slug>/<tên>.jpg`, chạy `images:resize`, khai báo `imageUrl: 'images/…'` (không `/` đầu) + `imageCredit` (+ `imagePage` với Flickr/Pixabay). Chỉ ảnh CC / public domain / tự chụp, không lấy ảnh báo, blog.
- **Pixabay:** key `PIXABAY_API_KEY` trong `.env.local` (không đưa vào code). Không được hotlink → tải `largeImageURL` về máy. Ghi `'<user> · Pixabay'`. Xem kỹ tag (dễ nhầm địa phương / dân tộc).
- **Tiêu chí:** món ăn chỉ cần đúng món, không bắt buộc đúng địa phương; lễ hội cần đúng lễ hội hoặc đúng dân tộc; địa danh có tên riêng không dùng ảnh nơi khác; không dùng ảnh động vật cho núi.
- Coi chừng trùng tên: giữa các tỉnh (vd. "Cá suối nướng") và giữa `peaks` (không có ảnh) với `mountains.ts`.
- Luôn hiện tác giả + giấy phép. **Không hiển thị link** ở di sản, lễ hội. Wikimedia giới hạn lượt gọi (429), Openverse hay 504: giãn cách, script chạy tiếp được.

## Lưu ý quan trọng

- **Luôn thể hiện Hoàng Sa (Đà Nẵng) và Trường Sa (Khánh Hòa)**, vẽ riêng ở `IslandsLayer.tsx` (không có trong GeoJSON).
- Không có tile nền mặc định. Lớp Địa hình dùng Esri `World_Shaded_Relief` (không nhãn chữ). Không dùng OSM/OpenTopoMap vì nhãn có thể ghi sai tên Hoàng Sa, Trường Sa. Kiểm tra điều khoản Esri trước khi deploy.
- Lớp địa hình ghi đè `mix-blend-mode: normal` để tránh viền trắng giữa các ô ảnh.
- `ProvinceLayer` cập nhật style kiểu imperative qua ref và hàm thuần `styleFor()`; tỉnh luôn tô màu theo vùng. Click polygon phải `stopPropagation` (click biển = bỏ chọn).
- Bật/tắt lớp dùng `setLayers((l) => …)`. Thêm loại đối tượng chọn mới → thêm nhánh vào `Selection`.
- Sông: hai lớp (lớp nhìn thấy + lớp trong suốt 14px để bấm), nằm trong pane `rivers` (z 450, trên lớp tỉnh vì tỉnh chọn được `bringToFront`). Đang chọn tỉnh thì chỉ vẽ phần sông trong tỉnh đó (`clipLinesToArea` trong `utils/clipLines.ts`, dựng lại GeoJSON theo `key`). `build-rivers.ts` tra theo tên nên dễ lẫn sông trùng tên → thêm khung `CLIP`.
- `panelPadding()` / `focusBounds()` chừa chỗ cho panel; đổi `--panel-width` / `--sheet-height` thì sửa cả hai.
- Giữ ghi nguồn ranh giới (vietnamese-provinces-database, MIT) và OSM (ODbL).
- Script Node trên Windows: tránh `process.exit()` sau khi ghi file. File `.ps1` lưu UTF-8 có BOM.

## Lộ trình

Làm từng phần, xong thì dừng cho người dùng xem.

1–6. ✅ Bản đồ, panel 3 tab, dữ liệu + ảnh 34 tỉnh (514/545 mục có ảnh, 22/11/2026), tìm kiếm + 7 vùng, lớp núi/địa hình, lớp sông, đơn vị hành chính
7. Đưa website lên mạng (chỉ khi người dùng yêu cầu)
