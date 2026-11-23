# Trang Địa lý (`#/dia-ly`)

Bản đồ 34 tỉnh sau sáp nhập 01/07/2025: số liệu, văn hóa, lễ hội, món ăn, đặc sản, đơn vị hành chính; địa hình, núi, sông. Quy ước chung, ảnh, bẫy kỹ thuật chung: xem `CLAUDE.md`.

## Lệnh

```bash
npm run media                       # tra ảnh Wikimedia + Openverse → media.generated.json (`-- --full` tra lại hết)
npm run admin-units                 # tải lại public/data/admin-units.json
node scripts/build-rivers.ts [--only id1,id2 | --clip]
node scripts/river-provinces.ts [--write]   # tỉnh sông chảy qua theo hình học
```

## Cấu trúc

```
src/pages/GeoPage.tsx          # bản đồ; Selection: province (+ unit) | mountain | river | null; import leaflet.css
src/data/provinceMeta.ts       # 34 tỉnh: code, slug, name, kind, mergedFrom
src/data/details/{bac,trung,nam}.ts, rivers.ts + riversMore.ts, mountains.ts, regions.ts, elevation.ts, media.ts, adminUnits.ts
src/components/{map,panel,controls}/
public/geo/{provinces,rivers}.geojson, public/data/admin-units.json
public/images/<slug>/          # ảnh tỉnh; núi → nui/, sông → song/
```

Không sửa tay: `media.generated.json`, `admin-units.json`.

## Quy ước dữ liệu

- `code` 1–34 là khóa chung cho meta, details, GeoJSON.
- Số liệu có `statsSource`; lễ hội ghi âm/dương lịch; `Peak.highest` chỉ khi chắc chắn.
- Không còn cấp huyện: tìm kiếm chỉ tỉnh + **phường**.
- **Luôn thể hiện Hoàng Sa, Trường Sa** (`IslandsLayer`). Không dùng tile OSM/OpenTopoMap (nhãn sai). Giữ ghi nguồn ranh giới (MIT), OSM (ODbL), Esri, AWS Terrain Tiles.

## Ảnh bản đồ

- Thứ tự: `imageUrl` → `imageFile` → ảnh bài `wiki` → `imageSearch` → Openverse. Ảnh bài wiki sai → `BAD_ARTICLE_IMAGE`, Openverse sai → `NO_FALLBACK` (fetch-media.ts).
- Ngoài CC / public domain còn được dùng Pixabay (key trong `.env.local`). Lưu `public/images/<slug>/`, ghi `imageUrl` + `imageCredit` (+ `imagePage`).
- Không có ảnh đúng thì ảnh **liên quan từ khóa** là đủ (lễ hội → dân tộc/vùng, sông → cầu / cửa sông / hợp lưu, ghi rõ trong credit); không thấy chủ thể thì để trống.
- **Không hiển thị link** ở di sản, lễ hội.
- Tìm ảnh sông: Commons `list=geosearch` dọc đường sông trong `rivers.geojson`, đo khoảng cách điểm chụp tới sông.

## Bẫy kỹ thuật

- Sông: pane `rivers` (z 450) trên lớp tỉnh; chọn tỉnh → `clipLinesToArea`. `build-rivers.ts` tìm theo tên trong khung `clip`, `dropSideChannels` bỏ lạch phụ trùng tên. Overpass chỉ overpass-api.de ổn định.
- Địa hình: `ElevationLayer` (canvas, Terrarium, cắt theo ranh giới tỉnh) + Esri relief `multiply`.
- Tải theo nhu cầu (`use()` + `Suspense`): chi tiết tỉnh qua `loadProvinceDetail(code)` (1–15 Bắc, 16–26 Trung, 27–34 Nam), media qua `loadMedia()` (chưa xong thì `resolveImage` chỉ trả `imageUrl`). Không import tĩnh `details/*.ts` hay `media.generated.json` trong `src/`; script Node dùng `details/all.ts`.
- `ProvinceLayer` style imperative qua ref + `styleFor()`; click polygon phải `stopPropagation`.
- iOS tự phóng to khi chạm vào ô nhập có chữ < 16px → ô nhập trên điện thoại luôn `font-size: 16px` (`SearchBox.module.css`); không chặn zoom bằng viewport.
- Điện thoại: `GeoPage` gắn class `lock-scroll` cho `<html>` (`overflow: hidden; overscroll-behavior: none`, `index.css`), rời trang thì gỡ; vùng cuộn bên trong (panel, gợi ý tìm kiếm) có `overscroll-behavior: contain` để không kéo cả trang.

## Trạng thái (23/11/2026)

Phần 1–7 ✅ (bản đồ, panel, dữ liệu, tìm kiếm, núi / địa hình, sông, đơn vị hành chính, deploy). Ảnh 628/628.
