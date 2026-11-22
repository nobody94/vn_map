# CLAUDE.md

Bản đồ Việt Nam tương tác, 34 tỉnh sau sáp nhập 01/07/2025: số liệu, văn hóa, lễ hội, món ăn, đặc sản, đơn vị hành chính; lớp địa hình, núi, sông. Giao diện, nội dung, trao đổi bằng **tiếng Việt**.

## Lệnh

```bash
npm run dev | build | lint          # chưa có test: lint + build + xem trình duyệt (cả mobile ≤768px)
npm run media                       # tra ảnh Wikimedia + Openverse → media.generated.json (`-- --full` tra lại hết)
npm run media:missing               # ghi missing-images.txt
npm run images:resize               # thu nhỏ ảnh public/images (ghi đè)
npm run admin-units                 # tải lại public/data/admin-units.json
node scripts/build-rivers.ts [--only id1,id2 | --clip]
node scripts/river-provinces.ts [--write]   # tỉnh sông chảy qua theo hình học
```

## Công nghệ & cấu trúc

React 19 + TS + Vite 8 (React Compiler), Leaflet 1.9 + react-leaflet 5, **CSS Modules**, tối giản; biến thiết kế ở `src/index.css`, màu nhấn `#0f766e`.

```
src/App.tsx                          # Selection: province (+ unit) | mountain | river | null
src/data/provinceMeta.ts             # 34 tỉnh: code, slug, name, kind, mergedFrom
src/data/details/{bac,trung,nam}.ts
src/data/rivers.ts + riversMore.ts   # RIVERS gộp cả hai
src/data/mountains.ts, regions.ts, elevation.ts, media.ts, adminUnits.ts
src/components/{map,panel,controls}/
public/geo/{provinces,rivers}.geojson, public/data/admin-units.json
```

Không sửa tay: `media.generated.json`, `admin-units.json`, `missing-images.txt`.

## Quy ước

- `code` 1–34 là khóa chung cho meta, details, GeoJSON. Import giữa file dữ liệu dùng đuôi `.ts`.
- Số liệu có `statsSource`; lễ hội ghi âm/dương lịch; `Peak.highest` chỉ khi chắc chắn; `wiki` không trỏ trang định hướng.
- Mô tả chỉ viết theo nguồn đã tra (vi.wikipedia); chiều dài không rõ thì bỏ trống.
- Không còn cấp huyện: tìm kiếm chỉ tỉnh + **phường**; huyện cũ chỉ để tra cứu.
- **Luôn thể hiện Hoàng Sa, Trường Sa** (`IslandsLayer`). Không dùng tile OSM/OpenTopoMap (nhãn sai). Giữ ghi nguồn ranh giới (MIT), OSM (ODbL), Esri, AWS Terrain Tiles.

## Ảnh

- Thứ tự: `imageUrl` → `imageFile` → ảnh bài `wiki` → `imageSearch` → Openverse. Ảnh bài wiki sai → `BAD_ARTICLE_IMAGE`, Openverse sai → `NO_FALLBACK` (fetch-media.ts).
- Ảnh tự tìm: lưu `public/images/<slug>/` (JPG ~1200px, < 300 KB), ghi `imageUrl` + `imageCredit` (+ `imagePage`). Chỉ CC / public domain / Pixabay (key trong `.env.local`, tải về, không hotlink); không ảnh báo, blog.
- Luôn xem ảnh và mô tả gốc trước khi dùng. Không có ảnh đúng thì ảnh **liên quan từ khóa** là đủ (lễ hội → dân tộc/vùng, sông → cầu/hợp lưu); ảnh không thấy chủ thể thì để trống.
- Hiện tác giả + giấy phép; **không hiển thị link** ở di sản, lễ hội.

## Bẫy kỹ thuật

- Sông: pane `rivers` (z 450) trên lớp tỉnh; chọn tỉnh → `clipLinesToArea`. `build-rivers.ts` tìm theo tên trong khung `clip`, `dropSideChannels` bỏ lạch phụ trùng tên. Overpass chỉ overpass-api.de ổn định.
- Địa hình: `ElevationLayer` (canvas, Terrarium, cắt theo ranh giới tỉnh) + Esri relief `multiply`.
- `ProvinceLayer` style imperative qua ref + `styleFor()`; click polygon phải `stopPropagation`.
- Wikipedia/Commons hay chặn (429, "too many requests"): chờ ≥2–3 s giữa truy vấn. Tải ảnh: `Special:FilePath/<tên>?width=1200`.
- Windows: tránh `process.exit()` sau ghi file; `.ps1` lưu UTF-8 có BOM; heredoc/`node -e` làm hỏng `\` trong regex → viết script ra file.

## Trạng thái (22/11/2026)

- Phần 1–6 ✅ (bản đồ, panel, dữ liệu, tìm kiếm, núi/địa hình, sông, đơn vị hành chính). Phần 7 deploy: chỉ khi người dùng yêu cầu.
- Ảnh 621/628. Còn thiếu 7 sông: Nhuệ, Thương, Bắc Vọng, Kỳ Lộ, Ray, Dinh (Bà Rịa), Mỹ Thanh. Đã tìm Commons + Pixabay (cả ảnh cầu, thị trấn ven sông), không có ảnh dùng được; `CauVat.JPG` là cầu qua sông Cầu, không phải sông Thương.
