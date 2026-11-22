# CLAUDE.md

Bản đồ Việt Nam tương tác, 34 tỉnh sau sáp nhập 01/07/2025: số liệu, văn hóa, lễ hội, món ăn, đặc sản, đơn vị hành chính; lớp địa hình, núi, sông. Giao diện, nội dung, trao đổi bằng **tiếng Việt**.

## Lệnh

```bash
npm run dev | build | lint          # chưa có test: lint + build + xem trình duyệt (cả mobile ≤768px)
npm run media                       # tra ảnh Wikimedia + Openverse → media.generated.json (`-- --full` tra lại hết)
npm run media:missing               # ghi missing-images.txt
npm run images:resize               # thu nhỏ ảnh > 300 KB hoặc > 1200px trong public/images (ghi đè, JPEG q82)
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/resize-images.ps1 [-Dir <thư mục>] -Quality 65 [-MaxSide 1000]   # ảnh nhiều chi tiết vẫn > 300 KB
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
- Giảm dung lượng: `images:resize` (q82) trước; ảnh nhiều chi tiết (cỏ, lá, phên đan) vẫn > 300 KB thì chạy script với `-Quality 65`, còn quá thì thêm `-MaxSide 1000`. Sao lưu và nén từ bản gốc (không nén chồng nhiều lần), xem lại ảnh sau khi nén. Ảnh đã dưới 300 KB thì không nén lại.
- Ảnh tự tìm: lưu `public/images/<slug>/` (JPG ~1200px, < 300 KB), ghi `imageUrl` + `imageCredit` (+ `imagePage`). Chỉ CC / public domain / Pixabay (key trong `.env.local`, tải về, không hotlink); không ảnh báo, blog.
- Luôn xem ảnh và mô tả gốc trước khi dùng. Không có ảnh đúng thì ảnh **liên quan từ khóa** là đủ (lễ hội → dân tộc/vùng, sông → cầu/hợp lưu); ảnh không thấy chủ thể thì để trống.
- Hiện tác giả + giấy phép; **không hiển thị link** ở di sản, lễ hội.

## Bẫy kỹ thuật

- Sông: pane `rivers` (z 450) trên lớp tỉnh; chọn tỉnh → `clipLinesToArea`. `build-rivers.ts` tìm theo tên trong khung `clip`, `dropSideChannels` bỏ lạch phụ trùng tên. Overpass chỉ overpass-api.de ổn định.
- Địa hình: `ElevationLayer` (canvas, Terrarium, cắt theo ranh giới tỉnh) + Esri relief `multiply`.
- Tải theo nhu cầu (chunk riêng, `use()` + `Suspense` trong App, tải trước lúc rảnh): chi tiết tỉnh theo miền qua `loadProvinceDetail(code)` (provinceDetails.ts; mã 1–15 Bắc, 16–26 Trung, 27–34 Nam) và `media.generated.json` qua `loadMedia()` (media.ts; chưa tải xong thì `resolveImage` chỉ trả `imageUrl`). Panel núi/sông fallback là chính panel chưa có ảnh. Không import tĩnh `details/*.ts` hay `media.generated.json` trong `src/`; script Node dùng `details/all.ts`.
- `ProvinceLayer` style imperative qua ref + `styleFor()`; click polygon phải `stopPropagation`.
- Wikipedia/Commons hay chặn (429, "too many requests"): chờ ≥2–3 s giữa truy vấn. Tải ảnh: `Special:FilePath/<tên>?width=1200`.
- Windows: tránh `process.exit()` sau ghi file; `.ps1` lưu UTF-8 có BOM; heredoc/`node -e` làm hỏng `\` trong regex → viết script ra file.

## Trạng thái (22/11/2026)

- Phần 1–6 ✅ (bản đồ, panel, dữ liệu, tìm kiếm, núi/địa hình, sông, đơn vị hành chính). Phần 7 deploy: Cloudflare Pages nối repo GitHub (push main → tự build; lệnh `npm run build`, thư mục `dist`). Node theo `.node-version` (22); cache trình duyệt ở `public/_headers`.
- Ảnh 628/628. Sông Mỹ Thanh dùng ảnh minh họa chung `River_in_Soc_Trang.JPG` (người dùng đồng ý) vì Commons không có ảnh nào trong 10 km quanh sông (chỉ ảnh ISS); Pixabay, Openverse cũng không có; các sông giao (Cổ Cò, Dù Tho, Thạnh Ninh, Trà Niên, Gòi, rạch Tổng Cáng — lấy từ OSM) cũng không có ảnh (`Cầu_Cổ_Cò.jpg` là sông Cổ Cò ở Đà Nẵng, khác sông). Sông không có ảnh chính nó thì dùng ảnh cửa sông / hợp lưu, ghi rõ trong `imageCredit` (Thương → Lục Đầu Giang, Bắc Vọng → sông Bằng tại Tà Lùng, Nhuệ → ngã ba Nhuệ – Đáy ở Phủ Lý).
- Tìm ảnh sông hiệu quả nhất: Commons `list=geosearch` dọc đường sông trong `rivers.geojson`, rồi đo khoảng cách điểm chụp tới đường sông.
