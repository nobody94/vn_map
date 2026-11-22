# CLAUDE.md

Bản đồ Việt Nam tương tác, 34 tỉnh sau sáp nhập 01/07/2025 (số liệu, văn hóa, lễ hội, món ăn, đặc sản, đơn vị hành chính; địa hình, núi, sông) + trang Lịch sử các cuộc kháng chiến. Giao diện, nội dung, trao đổi bằng **tiếng Việt**.

## Lệnh

```bash
npm run dev | build | lint          # chưa có test: lint + build + xem trình duyệt (cả mobile ≤768px)
npm run media                       # tra ảnh Wikimedia + Openverse → media.generated.json (`-- --full` tra lại hết)
npm run media:missing               # ghi missing-images.txt
npm run images:resize               # thu nhỏ ảnh > 300 KB hoặc > 1200px trong public/images (ghi đè, JPEG q82)
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/resize-images.ps1 [-Dir <thư mục>] -Quality 65 [-MaxSide 1000]
npm run admin-units                 # tải lại public/data/admin-units.json
node scripts/build-rivers.ts [--only id1,id2 | --clip]
node scripts/river-provinces.ts [--write]   # tỉnh sông chảy qua theo hình học
```

## Công nghệ & cấu trúc

React 19 + TS + Vite 8 (React Compiler), Leaflet 1.9 + react-leaflet 5, **CSS Modules**, tối giản; biến thiết kế ở `src/index.css`, màu nhấn `#0f766e`. Deploy: Cloudflare Pages (push `main` → `npm run build` → `dist`), Node 22 (`.node-version`), cache ở `public/_headers`.

```
src/App.tsx                    # router hash (utils/route.ts): '' trang chủ | #/dia-ly | #/lich-su; mỗi trang lazy chunk, tải trước lúc rảnh
src/pages/HomePage.tsx         # 2 nút Địa lý / Lịch sử
src/pages/GeoPage.tsx          # bản đồ; Selection: province (+ unit) | mountain | river | null; import leaflet.css
src/pages/HistoryPage.tsx      # tab Trận chiến / Người lãnh đạo + ô tìm kiếm (utils/historySearch.ts)
src/utils/normalize.ts         # bỏ dấu, dùng chung (không kéo dữ liệu tỉnh vào chunk Lịch sử)
src/data/provinceMeta.ts       # 34 tỉnh: code, slug, name, kind, mergedFrom
src/data/details/{bac,trung,nam}.ts, rivers.ts + riversMore.ts, mountains.ts, regions.ts, elevation.ts, media.ts, adminUnits.ts
src/data/history.ts            # WARS → battles, LEADERS, HistoryImage
src/components/{map,panel,controls}/
src/components/history/        # Modal (<dialog>), LeaderModal, BattleModal, Portrait
public/images/history/{<leader>,battles/<battle>}.jpg
public/geo/{provinces,rivers}.geojson, public/data/admin-units.json
```

Không sửa tay: `media.generated.json`, `admin-units.json`, `missing-images.txt`.

## Quy ước

- `code` 1–34 là khóa chung cho meta, details, GeoJSON. Import giữa file dữ liệu dùng đuôi `.ts`.
- Mô tả chỉ theo nguồn đã tra (vi.wikipedia), không viết từ trí nhớ; không rõ thì bỏ trống. `wiki` phải là bài thật, không phải trang định hướng (`prop=pageprops&ppprop=disambiguation&redirects=1`, dùng tên bài đích).
- Số liệu có `statsSource`; lễ hội ghi âm/dương lịch; `Peak.highest` chỉ khi chắc chắn.
- Không còn cấp huyện: tìm kiếm chỉ tỉnh + **phường**.
- **Luôn thể hiện Hoàng Sa, Trường Sa** (`IslandsLayer`). Không dùng tile OSM/OpenTopoMap (nhãn sai). Giữ ghi nguồn ranh giới (MIT), OSM (ODbL), Esri, AWS Terrain Tiles.

## Ảnh

- Thứ tự: `imageUrl` → `imageFile` → ảnh bài `wiki` → `imageSearch` → Openverse. Ảnh bài wiki sai → `BAD_ARTICLE_IMAGE`, Openverse sai → `NO_FALLBACK` (fetch-media.ts).
- Chỉ CC / public domain / Pixabay (key trong `.env.local`); tải về, không hotlink; không ảnh báo, blog. Lưu `public/images/<slug>/` (JPG ~1200px, < 300 KB), ghi `imageUrl` + `imageCredit` (+ `imagePage`).
- Luôn xem ảnh và mô tả gốc trước khi dùng. Không có ảnh đúng thì ảnh **liên quan từ khóa** là đủ (lễ hội → dân tộc/vùng, sông → cầu / cửa sông / hợp lưu, ghi rõ trong credit); không thấy chủ thể thì để trống.
- Nén: `images:resize` trước; còn > 300 KB → `-Quality 65`, rồi `-MaxSide 1000`. Nén từ bản gốc (không nén chồng), xem lại sau nén; ảnh < 300 KB không nén lại.
- Hiện tác giả + giấy phép; **không hiển thị link** ở di sản, lễ hội.
- Tìm ảnh sông: Commons `list=geosearch` dọc đường sông trong `rivers.geojson`, đo khoảng cách điểm chụp tới sông.

## Bẫy kỹ thuật

- Sông: pane `rivers` (z 450) trên lớp tỉnh; chọn tỉnh → `clipLinesToArea`. `build-rivers.ts` tìm theo tên trong khung `clip`, `dropSideChannels` bỏ lạch phụ trùng tên. Overpass chỉ overpass-api.de ổn định.
- Địa hình: `ElevationLayer` (canvas, Terrarium, cắt theo ranh giới tỉnh) + Esri relief `multiply`.
- Tải theo nhu cầu (`use()` + `Suspense`): chi tiết tỉnh qua `loadProvinceDetail(code)` (1–15 Bắc, 16–26 Trung, 27–34 Nam), media qua `loadMedia()` (chưa xong thì `resolveImage` chỉ trả `imageUrl`). Không import tĩnh `details/*.ts` hay `media.generated.json` trong `src/`; script Node dùng `details/all.ts`.
- `ProvinceLayer` style imperative qua ref + `styleFor()`; click polygon phải `stopPropagation`.
- Wikipedia/Commons hay 429: chờ ≥2–3 s giữa truy vấn (≥5 s khi tải nhiều bài). Lấy URL chính xác từ API (`prop=imageinfo&iiprop=url|size`, dấu phẩy là `%2C`) — upload.wikimedia.org trả 429 cả cho đường dẫn sai. Tải bằng `curl` (Node `fetch` hay bị chặn hơn), thumbnail kích thước chuẩn `/thumb/<a>/<ab>/<tên>/<N>px-<tên>` (N ∈ 250, 330, 500, 960, 1280, 1920); ảnh gốc nhỏ (< 1200px) tải thẳng file gốc thường qua được. Bị chặn theo IP vài chục phút → chạy nền script thử lại mỗi ~90 s.
- Windows: tránh `process.exit()` sau ghi file; `.ps1` lưu UTF-8 có BOM; heredoc / `node -e` làm hỏng `\` trong regex và tên tiếng Việt → viết script ra file.
- Chụp màn hình mobile: Edge headless `--screenshot` cắt cửa sổ < ~500px → điều khiển Edge qua DevTools Protocol (`--remote-debugging-port`, `Emulation.setDeviceMetricsOverride` 390×844 `mobile: true`, `Runtime.evaluate`, `Page.captureScreenshot`; Node có sẵn `WebSocket`). `Page.navigate` chỉ đổi hash không tải lại → thêm `Page.reload { ignoreCache: true }`.

## Trang Lịch sử

Chỉ về **các cuộc kháng chiến**: 10 cuộc (Hai Bà Trưng → chống Mỹ), 21 trận, 19 lãnh đạo. Trang Địa lý và Lịch sử có nút 🏠 về trang chủ (Địa lý: bên trái chữ "Bản đồ Việt Nam").

- Dữ liệu `history.ts`: tóm tắt theo đoạn mở đầu bài wiki (`prop=extracts&exintro`); ngày theo bài wiki (dương lịch); địa điểm không rõ thì bỏ `place`. `Battle`: `result`, `forces`, `background` / `events` / `outcome`, `commanders` (theo hộp thông tin, chỉ người có trong `LEADERS`), `image`. Bỏ trống `forces` khi hộp thông tin không rõ phe / mâu thuẫn / "cần dẫn nguồn". Ghi nguồn "Wikipedia tiếng Việt (CC BY-SA 4.0)" cuối trang.
- Thẻ có tên bấm được + "Xem chi tiết" → popup (`BattleModal` / `LeaderModal` trên `Modal` `<dialog>`; desktop hộp giữa, mobile sheet từ dưới); hai popup mở lẫn nhau (state `popup: { kind, id }`). Link Wikipedia **chỉ trong popup**.
- Ảnh: `HistoryImage { url, credit: "Mô tả · Tác giả · Giấy phép", page, position?, fit? }`. `position` để ảnh tròn thấy mặt; lược đồ / ảnh dọc dùng `fit: 'contain'`. Không có ảnh → chữ cái đầu; file thiếu → popup ẩn ảnh. Ảnh thay thế phải ghi rõ trong `credit`.
- **Thêm / bớt** (chỉ sửa `history.ts`, giao diện + tìm kiếm tự cập nhật; thứ tự trong mảng = thứ tự hiển thị):
  - Người lãnh đạo: mảng `LEADERS` (`id` không dấu duy nhất, `name`, `alias?`, `lifespan`, `role`, `summary`, `bio[]`, `image?`, `wiki`); ảnh `public/images/history/<id>.jpg`.
  - Trận: mảng `battles` trong cuộc kháng chiến tương ứng của `WARS` (`id`, `name`, `date` — phải có năm, `summary`, `wiki`; tùy chọn `place`, `commanders`, `result`, `forces`, `background` / `events` / `outcome`, `image`; thiếu trường nào popup ẩn mục đó); ảnh `public/images/history/battles/<id>.jpg`. Cuộc kháng chiến mới: thêm vào `WARS` (`id, name, period, enemy, leaders, battles`).
  - Thêm lãnh đạo → thêm `id` vào `leaders` của cuộc kháng chiến và `commanders` của trận đã chỉ huy (popup lãnh đạo lấy từ đây). Xóa lãnh đạo → xóa `id` ở mọi `leaders` / `commanders`. Sau đó `npm run lint` + `npm run build`.
- Tìm kiếm (`historySearch.ts`): không phân biệt dấu, giữ từ khóa khi đổi tab. Trận chỉ khớp tên trận + năm (số 3–4 chữ số tách từ `date`, vì `normalize` bỏ `/`); người lãnh đạo chỉ khớp tên. Ưu tiên khớp nguyên cụm từ, không có thì cho từ đứng rời.

## Trạng thái (23/11/2026)

- Phần 1–7 ✅ (bản đồ, panel, dữ liệu, tìm kiếm, núi/địa hình, sông, đơn vị hành chính, deploy). Ảnh bản đồ 628/628.
- Phần 8: 8.1–8.6 ✅ (trang chủ, trang Lịch sử, popup trận / lãnh đạo, nút 🏠, bổ sung nội dung + tìm kiếm).
- Ảnh Lịch sử: lãnh đạo 16/19 (Trần Thái Tông, Trần Thánh Tông, Trần Quang Khải: Commons không có ảnh người; Văn Tiến Dũng, Nguyễn Chí Thanh ảnh gốc nhỏ), trận 19/21 (Tống – Việt 981 để trống; **còn thiếu Biên giới** do 429: đã ghi nguồn trong `history.ts`, tải `…/commons/thumb/f/fd/Ho_Chi_Minh_in_Dong_Khe%2C_1950.jpg/960px-Ho_Chi_Minh_in_Dong_Khe%2C_1950.jpg` → `battles/bien-gioi.jpg`, xem ảnh trước).

## Tiếp theo: 8.7 Minigame lịch sử

Trang `#/lich-su/tro-choi` hoặc tab thứ 3 "Trò chơi"; chỉ dùng dữ liệu `history.ts`. Làm từ dễ đến khó:
1. **Đố vui trắc nghiệm**: 10 câu sinh tự động (chỉ huy, năm, thuộc kháng chiến nào), 4 đáp án, nhiễu cùng loại; giải thích + link popup sau mỗi câu; điểm cao nhất lưu `localStorage`.
2. **Sắp xếp dòng thời gian**: kéo thả 5–6 thẻ trận (cần thêm `year: number` vào `Battle`).
3. **Ghép cặp**: lãnh đạo ↔ trận / kháng chiến.
4. **Đoán nhân vật qua gợi ý**: thời kỳ → vai trò → trận → chân dung; đoán càng sớm càng nhiều điểm.
