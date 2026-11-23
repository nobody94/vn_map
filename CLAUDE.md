# CLAUDE.md

Bản đồ Việt Nam tương tác (34 tỉnh sau sáp nhập 01/07/2025) + trang Lịch sử các cuộc kháng chiến. Giao diện, nội dung, trao đổi bằng **tiếng Việt**.

**Chi tiết từng phần — chỉ đọc khi người dùng yêu cầu:**
- [geo.md](geo.md): trang Địa lý (bản đồ, tỉnh, núi, sông, đơn vị hành chính, ảnh bản đồ).
- [history.md](history.md): trang Lịch sử (dữ liệu, thêm / bớt trận và lãnh đạo, popup, tìm kiếm, trò chơi).

## Lệnh

```bash
npm run dev | build | lint          # chưa có test: lint + build + xem trình duyệt (cả mobile ≤768px)
npm run media:missing               # ghi missing-images.txt (bản đồ + Lịch sử, kèm lệnh curl tải ảnh đã chọn mà chưa có file)
npm run images:resize               # thu nhỏ ảnh > 300 KB hoặc > 1200px trong public/images (ghi đè, JPEG q82)
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/resize-images.ps1 [-Dir <thư mục>] -Quality 65 [-MaxSide 1000]
```

Lệnh riêng từng phần: xem `geo.md`.

## Công nghệ & cấu trúc

React 19 + TS + Vite 8 (React Compiler), Leaflet 1.9 + react-leaflet 5, **CSS Modules**, tối giản; biến thiết kế ở `src/index.css`, màu nhấn `#0f766e`. Deploy: Cloudflare Pages (push `main` → `npm run build` → `dist`), Node 22 (`.node-version`), cache ở `public/_headers`.

```
src/App.tsx                    # router hash (utils/route.ts): '' trang chủ | #/dia-ly | #/lich-su; mỗi trang lazy chunk, tải trước lúc rảnh
src/pages/HomePage.tsx         # 2 nút Địa lý / Lịch sử; trang Địa lý và Lịch sử có nút 🏠 về trang chủ
src/utils/normalize.ts         # bỏ dấu, dùng chung
scripts/                       # script Node / PowerShell (media, ảnh, sông, đơn vị hành chính)
```

Không sửa tay: `missing-images.txt` (và các file sinh tự động ghi trong `geo.md`).

## Quy ước chung

- Import giữa file dữ liệu dùng đuôi `.ts`.
- Mô tả chỉ theo nguồn đã tra (vi.wikipedia), không viết từ trí nhớ; không rõ thì bỏ trống. `wiki` phải là bài thật, không phải trang định hướng (`prop=pageprops&ppprop=disambiguation&redirects=1`, dùng tên bài đích).

## Ảnh (chung)

- Chỉ CC / public domain; tải về, không hotlink; không ảnh báo, blog. JPG ~1200px, < 300 KB.
- Luôn xem ảnh và mô tả gốc trước khi dùng. Hiện tác giả + giấy phép.
- Nén: `images:resize` trước; còn > 300 KB → `-Quality 65`, rồi `-MaxSide 1000`. Nén từ bản gốc (không nén chồng), xem lại sau nén; ảnh < 300 KB không nén lại.
- Quy tắc riêng: ảnh bản đồ → `geo.md`, ảnh Lịch sử → `history.md`.

## Bẫy kỹ thuật chung

- Wikipedia/Commons hay 429: chờ ≥2–3 s giữa truy vấn (≥5 s khi tải nhiều bài). Lấy URL chính xác từ API (`prop=imageinfo&iiprop=url|size`, dấu phẩy là `%2C`) — upload.wikimedia.org trả 429 cả cho đường dẫn sai. Tải bằng `curl` (Node `fetch` hay bị chặn hơn), thumbnail kích thước chuẩn `/thumb/<a>/<ab>/<tên>/<N>px-<tên>` (N ∈ 250, 330, 500, 960, 1280, 1920); ảnh gốc nhỏ (< 1200px) tải thẳng file gốc thường qua được. **upload.wikimedia.org chặn theo IP (429 cả giờ liền) → tải qua `https://commons.wikimedia.org/w/thumb.php?f=<tên_gạch_dưới>&w=960`** (vẫn chạy được, cả Node `fetch`).
- Windows: tránh `process.exit()` sau ghi file; `.ps1` lưu UTF-8 có BOM; heredoc / `node -e` làm hỏng `\` trong regex và tên tiếng Việt → viết script ra file. Git Bash đổi tham số bắt đầu bằng `/` thành đường dẫn Windows (vd. regex `"/^Kh/"`) → `MSYS_NO_PATHCONV=1`.
- Chụp màn hình mobile: Edge headless `--screenshot` cắt cửa sổ < ~500px → điều khiển Edge qua DevTools Protocol (`--remote-debugging-port`, `Emulation.setDeviceMetricsOverride` 390×844 `mobile: true`, `Runtime.evaluate`, `Page.captureScreenshot`; Node có sẵn `WebSocket`). `Page.navigate` chỉ đổi hash không tải lại → thêm `Page.reload { ignoreCache: true }`.

## Trạng thái (23/11/2026)

- Địa lý: phần 1–7 ✅. Lịch sử: phần 8 ✅ (trang chủ, trang Lịch sử, tab Trò chơi). Chi tiết ở `geo.md`, `history.md`.
- Ảnh còn thiếu + cách tải: `missing-images.txt` (`npm run media:missing`).
