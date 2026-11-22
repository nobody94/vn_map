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
src/App.tsx                          # router hash (utils/route.ts): '' trang chủ | #/dia-ly | #/lich-su; mỗi trang lazy chunk riêng
src/pages/HomePage.tsx               # 2 nút Địa lý / Lịch sử
src/pages/GeoPage.tsx                # bản đồ; Selection: province (+ unit) | mountain | river | null; leaflet.css import ở đây
src/pages/HistoryPage.tsx            # kháng chiến → trận đánh, người lãnh đạo (src/data/history.ts)
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
- Chụp màn hình kiểm tra: Edge headless `--screenshot` không thu cửa sổ < ~500px (ảnh mobile bị cắt) → điều khiển Edge qua DevTools Protocol (`--remote-debugging-port`, `Emulation.setDeviceMetricsOverride` 390×844 `mobile: true`, `Runtime.evaluate` để bấm, `Page.captureScreenshot`); Node 24 có sẵn `WebSocket`, không cần cài thư viện.

## Trạng thái (22/11/2026)

- Phần 1–6 ✅ (bản đồ, panel, dữ liệu, tìm kiếm, núi/địa hình, sông, đơn vị hành chính). Phần 7 deploy: Cloudflare Pages nối repo GitHub (push main → tự build; lệnh `npm run build`, thư mục `dist`). Node theo `.node-version` (22); cache trình duyệt ở `public/_headers`.
- Ảnh 628/628. Sông Mỹ Thanh dùng ảnh minh họa chung `River_in_Soc_Trang.JPG` (người dùng đồng ý) vì Commons không có ảnh nào trong 10 km quanh sông (chỉ ảnh ISS); Pixabay, Openverse cũng không có; các sông giao (Cổ Cò, Dù Tho, Thạnh Ninh, Trà Niên, Gòi, rạch Tổng Cáng — lấy từ OSM) cũng không có ảnh (`Cầu_Cổ_Cò.jpg` là sông Cổ Cò ở Đà Nẵng, khác sông). Sông không có ảnh chính nó thì dùng ảnh cửa sông / hợp lưu, ghi rõ trong `imageCredit` (Thương → Lục Đầu Giang, Bắc Vọng → sông Bằng tại Tà Lùng, Nhuệ → ngã ba Nhuệ – Đáy ở Phủ Lý).
- Tìm ảnh sông hiệu quả nhất: Commons `list=geosearch` dọc đường sông trong `rivers.geojson`, rồi đo khoảng cách điểm chụp tới đường sông.

## Phần 8: Trang chủ + trang Lịch sử (làm dần, đánh dấu ✅ khi xong)

Trang chủ chỉ có 2 nút **Địa lý** (bản đồ, như cũ) và **Lịch sử** (trang riêng, không có bản đồ). Trang Địa lý và Lịch sử có `HomeButton` về trang chủ. Trang Lịch sử chỉ về **các cuộc kháng chiến**: trận đánh và người lãnh đạo.

- **8.1 ✅ Trang chủ + điều hướng** hash (`#/dia-ly`, `#/lich-su` — không cần cấu hình chuyển hướng trên Cloudflare Pages), mỗi trang một chunk, tải trước lúc rảnh.
- **8.2 ✅ Trang Lịch sử bản đầu**: 9 cuộc kháng chiến (Hai Bà Trưng → chống Mỹ), 14 trận, 11 người lãnh đạo; tab Trận chiến (dòng thời gian) / Người lãnh đạo; bấm tên lãnh đạo → cuộn tới thẻ.
- **8.3 Popup chi tiết trận chiến**: bấm tên trận hoặc nút "Xem chi tiết" trên thẻ → mở popup (modal; mobile: toàn màn hình hoặc sheet từ dưới lên). Nội dung: ảnh lớn (`MediaImage`, ghi tác giả + giấy phép), thời gian, địa điểm, cuộc kháng chiến, người chỉ huy (bấm → mở popup lãnh đạo), lực lượng hai bên, diễn biến, kết quả và ý nghĩa — đoạn dài hơn lấy từ vi.wikipedia (các mục Bối cảnh / Diễn biến / Kết quả), thiếu thì bỏ mục. Đóng bằng nút ✕, Esc, bấm nền; khóa cuộn trang nền; giữ link Wikipedia.
- **8.4 ✅ Popup người lãnh đạo + ảnh trên thẻ**: thẻ có chân dung tròn (`Portrait` thumb; không có ảnh / lỗi tải → chữ cái đầu). Bấm tên, nút "Xem chi tiết" hoặc tên lãnh đạo ở dòng thời gian → `LeaderModal`: chân dung lớn (desktop 3:4 cột trái, mobile 4:3 tràn viền), năm sinh – mất, tên khác, vai trò, tiểu sử (`bio`), kháng chiến đã lãnh đạo, trận đã chỉ huy (`Battle.commanders`, `battlesOf()`). Bấm trận → tạm thời chuyển tab Trận chiến, cuộn tới và viền nổi thẻ (`battle-<id>`); khi làm 8.3 đổi thành mở popup trận.
  - `components/history/Modal.tsx`: `<dialog>` + `showModal()` (Esc, focus, backdrop của trình duyệt), bấm nền đóng, khóa cuộn `html`; desktop hộp giữa, mobile sheet từ dưới. **Dùng lại cho 8.3.**
  - Ảnh: `public/images/history/<id>.jpg` (Commons, ảnh đại diện bài wiki; Lý Thường Kiệt bài không có ảnh → tượng bán thân ở Bảo tàng Quân đội, CC0). `HistoryImage { url, credit: "Mô tả · Tác giả · Giấy phép", page, position }` — `position` là `object-position` để ảnh cắt tròn thấy mặt (tượng toàn thân như Lê Lợi, Quang Trung cần `50% 10–14%`). Thời cổ toàn là tượng / tranh đời sau, đã ghi trong `credit`. Văn Tiến Dũng chỉ có ảnh gốc 220×292 (mờ khi phóng to) — thay nếu tìm được ảnh tự do lớn hơn.
- **8.5 ✅ Trang Địa lý**: nút 🏠 nằm **bên trái** chữ "Bản đồ Việt Nam". `?mode=history` đã bỏ khỏi code cùng nút gạt chế độ cũ (không còn `ModeSwitch`, `utils/mode.ts`); link cũ có `?mode=` chỉ mở trang chủ, không cần xử lý thêm.
- **8.6 Bổ sung nội dung**: thêm trận (vd. Chi Lăng 981, Đông Bộ Đầu, Hàm Tử – Chương Dương, Vạn Tường, Đường 9 – Nam Lào, Quảng Trị 1972, Huế – Đà Nẵng 1975), thêm lãnh đạo (vd. Lê Hoàn, Trần Nhân Tông, Nguyễn Chí Thanh…), tiểu sử dài hơn.
- **8.7 Bản đồ nhỏ** vị trí trận đánh (có thể dùng lại `provinces.geojson`, nhớ Hoàng Sa – Trường Sa), lọc theo thời kỳ.
- **8.8 Minigame lịch sử** (trang `#/lich-su/tro-choi` hoặc tab thứ 3 "Trò chơi"; chỉ dùng dữ liệu trong `history.ts` để đáp án luôn đúng nguồn). Gợi ý, làm lần lượt từ dễ đến khó:
  1. **Đố vui trắc nghiệm**: 10 câu ngẫu nhiên sinh tự động từ dữ liệu ("Ai chỉ huy trận Bạch Đằng 938?", "Trận Điện Biên Phủ kết thúc năm nào?", "Trận này thuộc cuộc kháng chiến nào?"); 4 đáp án, đáp án nhiễu lấy cùng loại; hiện giải thích + link popup chi tiết sau mỗi câu; điểm cao nhất lưu `localStorage`.
  2. **Sắp xếp dòng thời gian**: kéo thả 5–6 thẻ trận đánh theo đúng thứ tự thời gian (cần trường năm dạng số `year` trong `Battle` để chấm).
  3. **Ghép cặp**: nối người lãnh đạo ↔ trận đánh / cuộc kháng chiến (lật thẻ kiểu trí nhớ hoặc nối hai cột).
  4. **Đoán nhân vật qua gợi ý**: lần lượt mở gợi ý (thời kỳ → vai trò → trận đánh → ảnh chân dung), đoán càng sớm càng nhiều điểm.  

Quy ước cho phần này:
- Dữ liệu ở `src/data/history.ts`. Mô tả tóm tắt theo đoạn mở đầu bài vi.wikipedia (`prop=extracts&exintro`), không viết thêm từ trí nhớ; `wiki` phải là bài thật, không phải trang định hướng (kiểm tra `prop=pageprops&ppprop=disambiguation&redirects=1`, dùng tên bài đích sau redirect).
- Ngày tháng ghi theo bài wiki (dương lịch); địa điểm không rõ thì bỏ `place`.
- Ghi nguồn "Wikipedia tiếng Việt (CC BY-SA 4.0)" ở cuối trang.
