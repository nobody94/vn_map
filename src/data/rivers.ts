import type { MediaRef } from '../types/province'
import { MORE_RIVERS } from './riversMore.ts'

/**
 * Các sông chính cho lớp "Sông ngòi". Đường sông: public/geo/rivers.geojson
 * (tạo bằng `node scripts/build-rivers.ts` từ OpenStreetMap, `properties.id` khớp `id`).
 * Chiều dài: số liệu phổ biến (khoảng), chỉ ghi khi chắc chắn; không rõ thì bỏ trống.
 * Ảnh: trường MediaRef — chạy `npm run media`.
 */
export type RiverSystem = 'hong' | 'thaibinh' | 'bactrung' | 'nam-trung' | 'dongnai' | 'mekong'

export interface River extends MediaRef {
  id: string
  name: string
  /** Tên trên OpenStreetMap (thẻ `name`) */
  osmName: string
  osmAltNames?: string[]
  system: RiverSystem
  /** Tổng chiều dài (km) */
  lengthKm?: number
  /** Chiều dài đoạn chảy trên lãnh thổ Việt Nam (km) */
  lengthVnKm?: number
  /** Nơi bắt nguồn / nơi đổ ra (bỏ trống nếu nguồn tham khảo không nêu) */
  source?: string
  mouth?: string
  /** Mã tỉnh (34 tỉnh mới) sông chảy qua — bấm để mở tỉnh */
  provinces: number[]
  description: string
  /** Tên gọi khác */
  aka?: string
  /** Sông nhỏ (vd. sông nội thành): vẽ nét mảnh hơn */
  minor?: boolean
  /** Khung [nam, tây, bắc, đông] giữ lại khi tải từ OSM (tránh sông trùng tên nơi khác) */
  clip?: [number, number, number, number]
}

export const RIVER_SYSTEMS: Record<RiverSystem, { name: string; color: string }> = {
  hong: { name: 'Hệ thống sông Hồng', color: '#2b7bb9' },
  thaibinh: { name: 'Hệ thống sông Thái Bình & Đông Bắc', color: '#3a8fc7' },
  bactrung: { name: 'Sông miền Bắc Trung Bộ', color: '#2f86b5' },
  'nam-trung': { name: 'Sông Nam Trung Bộ & Tây Nguyên', color: '#2a7fae' },
  dongnai: { name: 'Hệ thống sông Đồng Nai', color: '#2878b0' },
  mekong: { name: 'Hệ thống sông Mê Kông (Cửu Long)', color: '#1f6fa8' },
}

const BASE_RIVERS: River[] = [
  // ───── Hệ thống sông Hồng
  {
    id: 'hong', name: 'Sông Hồng', osmName: 'Sông Hồng', system: 'hong', aka: 'Sông Cái, sông Thao (thượng nguồn)',
    lengthKm: 1149, lengthVnKm: 510,
    source: 'Vân Nam (Trung Quốc)', mouth: 'Vịnh Bắc Bộ (cửa Ba Lạt)',
    provinces: [4, 11, 1, 14, 15],
    description:
      'Con sông lớn nhất miền Bắc, nước mang nhiều phù sa đỏ nên có tên sông Hồng. Sông bồi đắp nên đồng bằng Bắc Bộ, cái nôi của nền văn minh lúa nước và kinh đô Thăng Long – Hà Nội.',
    wiki: 'Sông Hồng',
  },
  {
    id: 'da', name: 'Sông Đà', osmName: 'Sông Đà', system: 'hong',
    lengthKm: 910,
    source: 'Vân Nam (Trung Quốc)', mouth: 'Hợp lưu với sông Hồng (Trung Hà)',
    provinces: [6, 5, 7, 11, 1],
    description:
      'Phụ lưu lớn nhất của sông Hồng, chảy giữa núi rừng Tây Bắc với nhiều thác ghềnh. Trên sông có các nhà máy thủy điện lớn: Lai Châu, Sơn La, Hòa Bình.',
    wiki: 'Sông Đà',
  },
  {
    id: 'lo', name: 'Sông Lô', osmName: 'Sông Lô', system: 'hong',
    lengthKm: 470, lengthVnKm: 275,
    source: 'Vân Nam (Trung Quốc)', mouth: 'Hợp lưu với sông Hồng (ngã ba Bạch Hạc, Việt Trì)',
    provinces: [3, 11],
    description:
      'Phụ lưu tả ngạn của sông Hồng, chảy qua Hà Giang, Tuyên Quang. Gắn với chiến thắng sông Lô năm 1947 và bài hát "Sông Lô" của Văn Cao.',
    wiki: 'Sông Lô',
  },
  {
    id: 'chay', name: 'Sông Chảy', osmName: 'Sông Chảy', system: 'hong',
    lengthKm: 319,
    source: 'Tây Côn Lĩnh (Hà Giang cũ)', mouth: 'Hợp lưu với sông Lô (Phú Thọ)',
    provinces: [3, 4, 11],
    description: 'Phụ lưu của sông Lô, chảy qua Bắc Hà, Lục Yên. Trên sông có hồ thủy điện Thác Bà, một trong những hồ nhân tạo lớn nhất Việt Nam.',
    wiki: 'Sông Chảy',
    imageFile: 'Thác Bà Lake.jpg', // hồ Thác Bà trên sông Chảy
  },
  {
    id: 'duong', name: 'Sông Đuống', osmName: 'Sông Đuống', system: 'hong',
    lengthKm: 68,
    source: 'Tách từ sông Hồng (Hà Nội)', mouth: 'Đổ vào sông Thái Bình (Phả Lại)',
    provinces: [1, 12, 13],
    description:
      'Con sông nối sông Hồng với sông Thái Bình, chảy qua vùng Kinh Bắc. Hai bên bờ là các làng tranh Đông Hồ, làng gốm Phù Lãng; đi vào thơ "Bên kia sông Đuống" của Hoàng Cầm.',
    wiki: 'Sông Đuống',
  },
  // Sông nhỏ vùng Hà Nội (thông tin theo vi.wikipedia)
  {
    id: 'day', name: 'Sông Đáy', osmName: 'Sông Đáy', system: 'hong',
    lengthKm: 250,
    source: 'Tách từ sông Hồng (Hà Nội)', mouth: 'Biển Đông (cửa Đáy)',
    provinces: [1, 15],
    description:
      'Chảy song song bên hữu ngạn hạ lưu sông Hồng qua Hà Nội và Ninh Bình, là cửa sông lớn nhất của lưu vực sông Hồng. Lưu vực sông Đáy gồm nhiều sông như sông Tích, sông Nhuệ, sông Hoàng Long; đoạn từ ngã ba Vân Đình tới cửa Đáy là tuyến đường thủy quốc gia.',
    wiki: 'Sông Đáy', imageFile: 'Ninh Phuc Port.jpg',
  },
  {
    id: 'nhue', name: 'Sông Nhuệ', osmName: 'Sông Nhuệ', system: 'hong', aka: 'Nhuệ Giang', minor: true,
    lengthKm: 76,
    source: 'Lấy nước sông Hồng qua cống Liên Mạc (Hà Nội)', mouth: 'Đổ vào sông Đáy (Phủ Lý)',
    provinces: [1, 15],
    description:
      'Phụ lưu của sông Đáy, chảy ngoằn ngoèo theo hướng tây bắc – đông nam qua Từ Liêm, Hà Đông, Thường Tín, Ứng Hòa rồi về Phủ Lý. Sông nhận nước thải từ nội thành qua sông Tô Lịch nên đang bị ô nhiễm nặng.',
    wiki: 'Sông Nhuệ',
  },
  {
    id: 'tich', name: 'Sông Tích', osmName: 'Sông Tích', system: 'hong', aka: 'Tích Lịch Giang, sông Con', minor: true,
    lengthKm: 91,
    source: 'Dãy núi Ba Vì (hồ Suối Hai, Đồng Mô)', mouth: 'Đổ vào sông Đáy',
    provinces: [1],
    description:
      'Phụ lưu cấp I của sông Đáy, chảy qua Ba Vì, Sơn Tây, Phúc Thọ, Thạch Thất, Quốc Oai, Chương Mỹ. Dọc sông có làng cổ Đường Lâm, đền Và, thành cổ Sơn Tây và các hồ Suối Hai, Đồng Mô.',
    wiki: 'Sông Tích',
  },
  {
    id: 'to-lich', name: 'Sông Tô Lịch', osmName: 'Sông Tô Lịch', system: 'hong', aka: 'Kim Giang (đoạn hạ lưu)', minor: true,
    source: 'Nghĩa Đô, Cầu Giấy (Hà Nội)', mouth: 'Hợp lưu với sông Nhuệ (Thường Tín)',
    provinces: [1],
    description:
      'Sông cổ chảy qua nội thành Hà Nội, từng là một cạnh của "tứ giác nước" bao quanh kinh thành Thăng Long. Xưa là phân lưu của sông Hồng, nay đoạn đầu đã bị lấp; sông chảy về phía nam qua Cầu Giấy, Đống Đa, Thanh Xuân, Hoàng Mai rồi nhập vào sông Nhuệ.',
    wiki: 'Sông Tô Lịch',
  },
  {
    id: 'kim-nguu', name: 'Sông Kim Ngưu', imageUrl: 'images/song/song-kim-nguu.jpg', imageCredit: 'Vuong Tri Binh · CC BY-SA 4.0 (Wikimedia Commons)', imagePage: 'https://commons.wikimedia.org/wiki/File:Kim_Nguu_artificial_river_1.jpg', osmName: 'Sông Kim Ngưu', system: 'hong', minor: true,
    source: 'Nội thành Hà Nội', mouth: 'Hợp lưu với sông Tô Lịch (Thanh Trì)',
    provinces: [1],
    description:
      'Sông nhỏ phía nam nội thành Hà Nội. "Kim Ngưu" nghĩa là trâu vàng: tương truyền trâu vàng chạy tìm mẹ, đường chạy lún xuống thành sông. Dân gian có câu: "Nhị Hà quanh Bắc sang Đông, Kim Ngưu, Tô Lịch là sông bên này".',
    wiki: 'Sông Kim Ngưu',
  },
  // ───── Đông Bắc
  {
    id: 'cau', name: 'Sông Cầu', osmName: 'Sông Cầu', system: 'thaibinh',
    lengthKm: 288,
    source: 'Bắc Kạn cũ', mouth: 'Hợp với sông Thương thành sông Thái Bình (Phả Lại)',
    provinces: [8, 12, 1, 13],
    description: 'Dòng sông của dân ca Quan họ, chảy qua Thái Nguyên, Bắc Ninh. "Sông Cầu nước chảy lơ thơ…" là hình ảnh quen thuộc của vùng Kinh Bắc.',
    wiki: 'Sông Cầu',
    imageFile: 'Sông Cầu, đoạn qua Bắc Giang.JPG',
  },  {
    id: 'ca-lo', name: 'Sông Cà Lồ', osmName: 'Sông Cà Lồ', system: 'thaibinh', aka: 'Sông Nguyệt Đức, sông Phù Lỗ', minor: true,
    lengthKm: 89,
    source: 'Suối từ dãy Tam Đảo; đầu nguồn ở Yên Lãng (Hà Nội)', mouth: 'Hợp lưu với sông Cầu (ngã ba Xà, Bắc Ninh)',
    provinces: [11, 1, 12],
    description:
      'Phụ lưu của sông Cầu, từng là phân lưu của sông Hồng nhưng đoạn đầu nguồn đã bị bịt đầu thế kỷ 20. Sông là ranh giới tự nhiên giữa nhiều xã của Sóc Sơn, Mê Linh; hạ lưu quanh co nên nước thoát chậm, mùa lũ kéo dài 30–40 ngày.',
    wiki: 'Sông Cà Lồ',
  },

  {
    id: 'ky-cung', name: 'Sông Kỳ Cùng', osmName: 'Sông Kỳ Cùng', system: 'thaibinh',
    lengthKm: 243,
    source: 'Đình Lập (Lạng Sơn)', mouth: 'Chảy sang Trung Quốc (hệ thống Tây Giang)',
    provinces: [9],
    description: 'Con sông hiếm hoi ở Việt Nam chảy ngược theo hướng đông nam – tây bắc rồi sang Trung Quốc. Gắn với đền Kỳ Cùng và lễ hội Kỳ Cùng – Tả Phủ của xứ Lạng.',
    wiki: 'Sông Kỳ Cùng',
  },
  // ───── Bắc Trung Bộ
  {
    id: 'ma', name: 'Sông Mã', osmName: 'Sông Mã', system: 'bactrung',
    lengthKm: 512, lengthVnKm: 410,
    source: 'Điện Biên', mouth: 'Biển Đông (cửa Hới, Thanh Hóa)',
    provinces: [5, 7, 16],
    description:
      'Bắt nguồn từ Điện Biên, chảy qua Lào rồi trở lại Việt Nam qua Sơn La, Thanh Hóa. Gắn với văn hóa Đông Sơn và hình ảnh "Sông Mã xa rồi Tây Tiến ơi" trong thơ Quang Dũng.',
    wiki: 'Sông Mã',
  },
  {
    id: 'ca', name: 'Sông Cả (sông Lam)', osmName: 'Sông Cả', osmAltNames: ['Sông Lam'], system: 'bactrung',
    lengthKm: 531, lengthVnKm: 361,
    source: 'Xiêng Khoảng (Lào)', mouth: 'Biển Đông (cửa Hội)',
    provinces: [17, 18],
    description: 'Con sông lớn nhất xứ Nghệ, đoạn hạ lưu gọi là sông Lam. Cùng núi Hồng Lĩnh làm nên biểu tượng "núi Hồng sông Lam" của Nghệ Tĩnh.',
    wiki: 'Sông Lam',
    imageFile: 'Sông Lam, đoạn qua Nghi Xuân, Hà Tĩnh.JPG',
  },
  {
    id: 'gianh', name: 'Sông Gianh', osmName: 'Sông Gianh', system: 'bactrung',
    lengthKm: 160,
    source: 'Dãy Trường Sơn (Quảng Bình cũ)', mouth: 'Biển Đông (cửa Gianh)',
    provinces: [19],
    description: 'Ranh giới Đàng Ngoài – Đàng Trong thời Trịnh – Nguyễn phân tranh (thế kỷ XVII – XVIII).',
    wiki: 'Sông Gianh',
  },
  {
    id: 'ben-hai', name: 'Sông Bến Hải', osmName: 'Sông Bến Hải', system: 'bactrung',
    lengthKm: 100,
    source: 'Dãy Trường Sơn (Quảng Trị)', mouth: 'Biển Đông (cửa Tùng)',
    provinces: [19],
    description:
      'Chạy dọc vĩ tuyến 17, ranh giới tạm thời chia cắt hai miền Nam – Bắc (1954 – 1975). Cầu Hiền Lương bắc qua sông là biểu tượng của khát vọng thống nhất.',
    wiki: 'Sông Bến Hải',
  },
  {
    id: 'huong', name: 'Sông Hương', osmName: 'Sông Hương', system: 'bactrung',
    lengthKm: 80,
    source: 'Dãy Trường Sơn (hợp lưu Tả Trạch – Hữu Trạch)', mouth: 'Phá Tam Giang, ra biển ở cửa Thuận An',
    provinces: [20],
    description:
      'Biểu tượng của xứ Huế, chảy êm đềm qua Kinh thành, chùa Thiên Mụ, các lăng tẩm triều Nguyễn. Nổi tiếng với ca Huế trên thuyền rồng và cầu Trường Tiền.',
    wiki: 'Sông Hương',
  },
  // ───── Nam Trung Bộ & Tây Nguyên
  {
    id: 'han', name: 'Sông Hàn', osmName: 'Sông Hàn', system: 'nam-trung',
    source: 'Hạ lưu hệ thống Vu Gia – Thu Bồn', mouth: 'Vịnh Đà Nẵng',
    provinces: [21],
    description:
      'Dòng sông chảy giữa lòng thành phố Đà Nẵng với nhiều cây cầu nổi tiếng: cầu Rồng, cầu sông Hàn (cầu quay), cầu Trần Thị Lý. Nơi diễn ra Lễ hội pháo hoa quốc tế.',
    wiki: 'Sông Hàn',
  },
  {
    id: 'thu-bon', name: 'Sông Thu Bồn', osmName: 'Sông Thu Bồn', system: 'nam-trung',
    lengthKm: 205,
    source: 'Núi Ngọc Linh', mouth: 'Biển Đông (cửa Đại, Hội An)',
    provinces: [22, 21],
    description: 'Dòng sông mẹ của xứ Quảng, chảy qua thánh địa Mỹ Sơn và phố cổ Hội An – hai Di sản thế giới.',
    wiki: 'Sông Thu Bồn',
  },
  {
    id: 'tra-khuc', name: 'Sông Trà Khúc', osmName: 'Sông Trà Khúc', system: 'nam-trung',
    lengthKm: 135,
    source: 'Dãy Trường Sơn (Kon Tum cũ)', mouth: 'Biển Đông (cửa Đại, Quảng Ngãi)',
    provinces: [22],
    description: 'Con sông lớn nhất Quảng Ngãi, gắn với thắng cảnh "Thiên Ấn niêm hà" và những guồng xe nước cổ.',
    wiki: 'Sông Trà Khúc',
  },
  {
    id: 'ba', name: 'Sông Ba (Đà Rằng)', osmName: 'Sông Ba', osmAltNames: ['Sông Đà Rằng'], system: 'nam-trung',
    lengthKm: 388,
    source: 'Núi Ngọc Rô (Kon Tum cũ)', mouth: 'Biển Đông (cửa Đà Rằng, Tuy Hòa)',
    provinces: [22, 24, 25],
    description: 'Một trong những sông lớn nhất miền Trung, chảy qua Gia Lai rồi xuống đồng bằng Tuy Hòa (Phú Yên cũ), đoạn hạ lưu gọi là sông Đà Rằng.',
    wiki: 'Sông Ba',
  },
  {
    id: 'srepok', name: 'Sông Srêpốk', osmName: 'Sông Srêpốk', osmAltNames: ['Sông Sêrêpốk'], system: 'mekong',
    lengthKm: 406,
    source: 'Hợp lưu Krông Ana – Krông Nô (Đắk Lắk)', mouth: 'Chảy sang Campuchia, đổ vào sông Mê Kông',
    provinces: [25, 26],
    description: 'Dòng sông của Tây Nguyên với các thác Dray Nur, Dray Sáp, Gia Long; chảy qua Buôn Đôn – vùng đất săn bắt, thuần dưỡng voi.',
    wiki: 'Sông Srêpốk',
  },
  // ───── Đông Nam Bộ
  {
    id: 'dong-nai', name: 'Sông Đồng Nai', osmName: 'Sông Đồng Nai', system: 'dongnai',
    lengthKm: 586,
    source: 'Cao nguyên Lâm Viên (Lâm Đồng)', mouth: 'Biển Đông (vịnh Gành Rái, cửa Soài Rạp)',
    provinces: [26, 28, 29],
    description:
      'Con sông nội địa dài nhất Việt Nam. Trên sông có hồ thủy điện Trị An; vùng hạ lưu là trung tâm kinh tế Đông Nam Bộ với Biên Hòa, TP. Hồ Chí Minh.',
    wiki: 'Sông Đồng Nai',
  },
  {
    id: 'sai-gon', name: 'Sông Sài Gòn', osmName: 'Sông Sài Gòn', system: 'dongnai',
    lengthKm: 256,
    source: 'Lộc Ninh (Bình Phước cũ)', mouth: 'Hợp lưu với sông Đồng Nai (Nhà Bè)',
    provinces: [28, 27, 29],
    description: 'Dòng sông gắn với lịch sử TP. Hồ Chí Minh, bến Nhà Rồng. Thượng nguồn có hồ Dầu Tiếng – một trong những hồ thủy lợi lớn nhất Việt Nam.',
    wiki: 'Sông Sài Gòn',
  },
  // ───── Mê Kông
  {
    id: 'tien', name: 'Sông Tiền', osmName: 'Sông Tiền', system: 'mekong',
    source: 'Nhánh sông Mê Kông, chảy vào Việt Nam tại Tân Châu', mouth: 'Biển Đông qua các cửa Tiểu, Đại, Ba Lai, Hàm Luông, Cổ Chiên, Cung Hầu',
    provinces: [32, 31, 30],
    description:
      'Một trong hai nhánh chính của sông Mê Kông (dài khoảng 4.350 km) khi chảy vào Việt Nam. Sông bồi đắp miệt vườn trái cây Cái Bè, Cái Mơn và xứ dừa Bến Tre.',
    wiki: 'Sông Tiền',
  },
  {
    id: 'hau', name: 'Sông Hậu', osmName: 'Sông Hậu', system: 'mekong', aka: 'Sông Bassac',
    source: 'Nhánh sông Mê Kông, chảy vào Việt Nam tại Khánh An (An Giang)', mouth: 'Biển Đông qua các cửa Định An, Trần Đề',
    provinces: [32, 31, 33, 30],
    description:
      'Nhánh còn lại của sông Mê Kông ở Việt Nam, chảy qua Châu Đốc, Long Xuyên, Cần Thơ. Bên sông là chợ nổi Cái Răng và cầu Cần Thơ.',
    wiki: 'Sông Hậu',
  },
]

/** Sông chính + sông bổ sung theo vùng (riversMore.ts) */
export const RIVERS: River[] = [...BASE_RIVERS, ...MORE_RIVERS]

export const RIVER_BY_ID = new Map(RIVERS.map((r) => [r.id, r]))
