# Trang Lịch sử (`#/lich-su`)

Chỉ về **các cuộc kháng chiến**: 10 cuộc (Hai Bà Trưng → chống Mỹ), 21 trận, 19 lãnh đạo. 3 tab: Trận chiến / Người lãnh đạo / Trò chơi. Quy ước chung, ảnh, bẫy kỹ thuật chung: xem `CLAUDE.md`.

## Cấu trúc

```
src/pages/HistoryPage.tsx      # tab Trận chiến / Người lãnh đạo (ô tìm kiếm, utils/historySearch.ts) / Trò chơi
src/data/history.ts            # WARS → battles, LEADERS, HistoryImage
src/components/history/        # Modal (<dialog>), LeaderModal, BattleModal, Portrait; trò chơi: HistoryGames, QuizGame, TimelineGame, MatchGame, GuessGame, GameResult, Game.module.css
src/utils/historyGames.ts      # dùng chung cho trò chơi: Level, shuffle, pickByLevel, battleYear, BATTLES, eraDist / leaderDist, điểm cao nhất; historyQuiz.ts, historyTimeline.ts, historyMatch.ts, historyGuess.ts
public/images/history/{<leader>,battles/<battle>}.jpg
```

Chunk Lịch sử không được kéo dữ liệu tỉnh: bỏ dấu dùng `src/utils/normalize.ts`.

## Dữ liệu (`history.ts`)

- Tóm tắt theo đoạn mở đầu bài wiki (`prop=extracts&exintro`), ngày dương lịch theo bài wiki, không rõ thì bỏ (`place`, `forces`…); `commanders` theo hộp thông tin, chỉ người có trong `LEADERS`. Ghi nguồn "Wikipedia tiếng Việt (CC BY-SA 4.0)" cuối trang.
- **Thêm / bớt** (chỉ sửa `history.ts`; giao diện, tìm kiếm, trò chơi tự cập nhật; thứ tự mảng = thứ tự hiển thị):
  - Lãnh đạo: `LEADERS` (`id` không dấu, `name`, `alias?`, `lifespan`, `role`, `summary`, `bio[]`, `image?`, `wiki`) → thêm `id` vào `leaders` của cuộc kháng chiến và `commanders` của trận. Xóa thì xóa `id` ở mọi chỗ.
  - Trận: `battles` trong cuộc kháng chiến của `WARS` (`id`, `name`, `date` **phải có năm**, `summary`, `wiki`; tùy chọn `place`, `commanders`, `result`, `forces`, `background` / `events` / `outcome`, `image`). Cuộc mới: `WARS` (`id, name, period, enemy, leaders, battles`).
  - Sau đó `npm run lint` + `npm run build`.

## Giao diện

- **Popup**: tên / "Xem chi tiết" → `BattleModal` / `LeaderModal` (trên `Modal` `<dialog>`, mobile là sheet), hai popup mở lẫn nhau; link Wikipedia chỉ trong popup.
- **Ảnh** `HistoryImage { url, credit: "Mô tả · Tác giả · Giấy phép", page, position?, fit? }` ở `public/images/history/<id>.jpg` / `battles/<id>.jpg`: `position` để ảnh tròn thấy mặt, `fit: 'contain'` cho lược đồ / ảnh dọc; không có ảnh → chữ cái đầu. Ảnh còn thiếu + cách tải: `missing-images.txt`.
- **Tìm kiếm** (`historySearch.ts`): không dấu; trận theo tên + năm, **tên cuộc kháng chiến khớp (vd. "mỹ", "chống mỹ") → hiện cả cuộc cùng mọi trận**; lãnh đạo chỉ theo tên; ưu tiên nguyên cụm từ.

## Trò chơi (tab 3)

Chỉ dùng dữ liệu `history.ts`. Luồng `HistoryGames`: chọn trò (`GAMES`) → chọn độ khó Dễ / Trung bình / Khó → chơi → `GameResult` ("Đổi độ khó" / "Chơi lại"). Điểm cao nhất `localStorage` `vn-map:<trò>-best:<level>`. Tab luôn gắn (`hidden`) để giữ lượt khi đổi tab / mở popup.

- Dùng chung (`historyGames.ts`): năm trận tách từ `date` (`battleYear`); độ khó = xếp nhiễu gần → xa theo thời kỳ / năm (`byCloseness`) rồi `pickByLevel` (dễ: nửa xa, trung bình: ngẫu nhiên, khó: nhóm gần nhất).
- Thêm trò: component nhận `level`, `onChangeLevel` (+ `onOpenBattle` / `onOpenLeader`), dùng `Game.module.css` + `GameResult`; khai báo `levels`, `max`, `ready: true` trong `GAMES`.
- Luôn tránh đáp án mơ hồ / lộ đáp án: bỏ mục có năm trong tên hoặc tên người trong tên cuộc kháng chiến (Hai Bà Trưng); hai trận Bạch Đằng thêm năm.

| Trò | File | Nội dung |
|---|---|---|
| Đố vui trắc nghiệm | `QuizGame`, `historyQuiz.ts` | 10 câu (chỉ huy, năm, thuộc kháng chiến, lãnh đạo kháng chiến, khởi nghĩa chống ai), mỗi chủ thể 1 câu; giải thích + popup sau mỗi câu |
| Sắp xếp dòng thời gian | `TimelineGame`, `historyTimeline.ts` | 5 vòng, 4 / 5 / 6 thẻ, mỗi vòng năm khác nhau và không trùng tên; kéo thả Pointer Events nghe trên `window` (React dời `<li>` → mất pointer capture), cảm ứng kéo ở tay cầm ⠿, có nút ↑ ↓ |
| Ghép cặp | `MatchGame`, `historyMatch.ts` | 5 vòng, 4 / 5 / 6 cặp người ↔ kháng chiến / trận; **mỗi vòng một cách ghép duy nhất** (không đưa người cùng chỉ huy / cùng lãnh đạo vào một vòng); đúng ngay lần đầu 1 điểm |
| Đoán nhân vật | `GuessGame`, `historyGuess.ts` | 5 vòng, tối đa 4 điểm, mở gợi ý / đoán sai −1; gợi ý thời kỳ → vai trò → trận → chân dung (thiếu thì tóm tắt), **che tên + tên khác** bằng "…" |
| Nhìn ảnh đoán nhân vật | `PhotoGame`, `historyPhoto.ts` | Chỉ người có `image`; tối đa 10 ảnh, 4 / 4 / 6 lựa chọn; ảnh `contain`, `alt` trống + ghi nguồn chỉ hiện sau khi trả lời (không lộ tên); đúng 1 điểm |

## Trạng thái (23/11/2026)

Phần 8 ✅: trang Lịch sử (popup, tìm kiếm, nội dung), tab Trò chơi 5 trò + độ khó. Ảnh thiếu 3/40 (Trần Thái Tông, Trần Thánh Tông, Trần Quang Khải — xem `missing-images.txt`).
