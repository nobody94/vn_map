import type { MediaRef } from '../types/province'

/**
 * Đỉnh núi tiêu biểu và nhãn dãy núi / cao nguyên cho lớp "Núi & địa hình".
 * Tọa độ là gần đúng (đủ cho mức zoom toàn quốc / vùng). Độ cao khớp với
 * `peaks` trong src/data/details/*.ts.
 *
 * Ảnh: các trường MediaRef (`wiki`, `imageFile`, `imageSearch`) — chạy `npm run media`.
 */
export interface Mountain extends MediaRef {
  /** Khóa duy nhất (dùng làm state lựa chọn) */
  id: string
  name: string
  heightM: number
  lat: number
  lng: number
  /** Mã tỉnh chứa đỉnh núi (nút "Xem tỉnh") */
  provinceCode: number
  /** Vị trí mô tả ngắn: huyện / vùng cũ */
  location: string
  range?: string
  note?: string
  description: string
  /** Luôn hiện nhãn, kể cả ở mức zoom toàn quốc */
  featured?: boolean
}

export const MOUNTAINS: Mountain[] = [
  {
    id: 'fansipan', name: 'Fansipan', heightM: 3143, lat: 22.303, lng: 103.775, provinceCode: 4,
    location: 'Sa Pa (Lào Cai), giáp Lai Châu', range: 'Hoàng Liên Sơn', note: 'Nóc nhà Đông Dương', featured: true,
    description:
      'Đỉnh núi cao nhất Việt Nam và bán đảo Đông Dương, nằm trên dãy Hoàng Liên Sơn. Có thể chinh phục bằng các cung đường trekking hoặc hệ thống cáp treo từ Sa Pa lên gần đỉnh.',
    wiki: 'Fansipan',
  },
  {
    id: 'pu-si-lung', name: 'Pu Si Lung', heightM: 3076, lat: 22.625, lng: 102.611, provinceCode: 6,
    location: 'Mường Tè (Lai Châu), biên giới Việt – Trung', note: 'Cao thứ hai Việt Nam',
    description:
      'Ngọn núi cao thứ hai Việt Nam, nằm trên đường biên giới Việt – Trung. Hành trình chinh phục đi qua rừng nguyên sinh hoang sơ và các bản làng của người Hà Nhì.',
    wiki: 'Pu Si Lung',
  },
  {
    id: 'pu-ta-leng', name: 'Pu Ta Leng', heightM: 3049, lat: 22.42, lng: 103.61, provinceCode: 6,
    location: 'Tam Đường (Lai Châu)', range: 'Hoàng Liên Sơn',
    description:
      'Một trong những đỉnh núi trên 3.000 m của dãy Hoàng Liên Sơn, nổi tiếng với rừng đỗ quyên cổ thụ nở rộ vào mùa xuân và biển mây trên đỉnh.',
    wiki: 'Pu Ta Leng',
  },
  {
    id: 'tay-con-linh', name: 'Tây Côn Lĩnh', heightM: 2419, lat: 22.8, lng: 104.81, provinceCode: 3,
    location: 'Vị Xuyên – Hoàng Su Phì (Hà Giang cũ)',
    description:
      'Đỉnh núi cao nhất vùng Đông Bắc, quanh năm mây phủ. Sườn núi là rừng nguyên sinh và những đồi chè Shan tuyết cổ thụ của người Dao.',
    wiki: 'Tây Côn Lĩnh',
  },
  {
    id: 'phia-oac', name: 'Phia Oắc', heightM: 1931, lat: 22.6, lng: 105.88, provinceCode: 2,
    location: 'Nguyên Bình (Cao Bằng)',
    description:
      'Thuộc Vườn quốc gia Phia Oắc – Phia Đén, khí hậu mát lạnh quanh năm, đôi khi có băng tuyết vào mùa đông. Từng là khu nghỉ dưỡng thời Pháp.',
    wiki: 'Phia Oắc',
  },
  {
    id: 'mau-son', name: 'Mẫu Sơn', heightM: 1541, lat: 21.866, lng: 106.95, provinceCode: 9,
    location: 'Lộc Bình (Lạng Sơn)',
    description:
      'Khu du lịch núi nổi tiếng xứ Lạng, mùa đông có thể xuất hiện băng giá. Trên núi còn dấu tích các biệt thự cổ thời Pháp và nhiều đặc sản như đào, rượu Mẫu Sơn.',
    wiki: 'Mẫu Sơn',
  },
  {
    id: 'ba-vi', name: 'Ba Vì', heightM: 1296, lat: 21.06, lng: 105.37, provinceCode: 1,
    location: 'Ba Vì (Hà Nội)', note: 'Đỉnh Vua',
    description:
      'Ngọn núi thiêng của xứ Đoài, gắn với truyền thuyết Sơn Tinh – Thủy Tinh. Đỉnh Vua có đền thờ Tản Viên Sơn Thánh; vùng núi thuộc Vườn quốc gia Ba Vì.',
    wiki: 'Vườn quốc gia Ba Vì',
  },
  {
    id: 'yen-tu', name: 'Yên Tử', heightM: 1068, lat: 21.157, lng: 106.718, provinceCode: 10,
    location: 'Uông Bí (Quảng Ninh)',
    description:
      'Nơi vua Trần Nhân Tông tu hành và lập Thiền phái Trúc Lâm. Trên đỉnh có chùa Đồng; quần thể di tích thuộc Di sản thế giới Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc.',
    wiki: 'Yên Tử',
  },
  {
    id: 'pu-xai-lai-leng', name: 'Pu Xai Lai Leng', heightM: 2711, lat: 19.2, lng: 104.18, provinceCode: 17,
    location: 'Kỳ Sơn (Nghệ An), biên giới Việt – Lào', range: 'Trường Sơn Bắc', featured: true,
    description:
      'Đỉnh núi cao nhất Nghệ An và dãy Trường Sơn Bắc, nằm trên biên giới Việt – Lào. Khu vực có rừng rêu nguyên sinh và là địa bàn sinh sống của người H\'Mông.',
    imageSearch: 'Pu Xai Lai Leng',
  },
  {
    id: 'bach-ma', name: 'Bạch Mã', heightM: 1450, lat: 16.19, lng: 107.86, provinceCode: 20,
    location: 'Phú Lộc (Huế)',
    description:
      'Trung tâm của Vườn quốc gia Bạch Mã, quanh năm mây mù. Người Pháp từng xây khu nghỉ mát với hàng trăm biệt thự trên núi vào những năm 1930.',
    wiki: 'Vườn quốc gia Bạch Mã',
  },
  {
    id: 'ba-na', name: 'Bà Nà', heightM: 1487, lat: 15.995, lng: 107.99, provinceCode: 21,
    location: 'Hòa Vang (Đà Nẵng)', note: 'Núi Chúa',
    description:
      'Khu nghỉ mát trên núi có từ thời Pháp, nay là khu du lịch với Cầu Vàng nổi tiếng và hệ thống cáp treo. Khí hậu mát mẻ, một ngày có thể trải qua đủ bốn mùa.',
    imageFile: 'Golden Bridge Da-Nang (48951166538).jpg',
  },
  {
    id: 'ngoc-linh', name: 'Ngọc Linh', heightM: 2598, lat: 15.07, lng: 107.98, provinceCode: 22,
    location: 'Đắk Glei (Kon Tum cũ), giáp Đà Nẵng', range: 'Trường Sơn Nam', note: 'Cao nhất Tây Nguyên', featured: true,
    description:
      'Đỉnh núi cao nhất dãy Trường Sơn Nam và Tây Nguyên. Vùng núi là nơi duy nhất có loài sâm Ngọc Linh quý hiếm, gắn với đời sống của người Xơ Đăng.',
    imageSearch: 'Ngoc Linh mountain',
  },
  {
    id: 'kon-ka-kinh', name: 'Kon Ka Kinh', heightM: 1748, lat: 14.2, lng: 108.3, provinceCode: 24,
    location: 'Kbang (Gia Lai)',
    description:
      'Thuộc Vườn quốc gia Kon Ka Kinh – Vườn di sản ASEAN, với rừng nhiệt đới nguyên sinh và nhiều loài động vật quý hiếm như voọc chà vá chân xám.',
  },
  {
    id: 'chu-yang-sin', name: 'Chư Yang Sin', heightM: 2442, lat: 12.4, lng: 108.43, provinceCode: 25,
    location: 'Lắk – Krông Bông (Đắk Lắk)', featured: true,
    description:
      'Đỉnh núi cao nhất Đắk Lắk, nằm trong Vườn quốc gia Chư Yang Sin. Theo tiếng Ê Đê, "Chư" nghĩa là núi; khu vực có hệ sinh thái rừng đa dạng bậc nhất Tây Nguyên.',
    wiki: 'Vườn quốc gia Chư Yang Sin',
  },
  {
    id: 'bidoup', name: 'Bidoup', heightM: 2287, lat: 12.1, lng: 108.68, provinceCode: 26,
    location: 'Lạc Dương (Lâm Đồng)',
    description:
      'Đỉnh núi cao nhất cao nguyên Lâm Viên, thuộc Vườn quốc gia Bidoup – Núi Bà, vùng lõi của Khu dự trữ sinh quyển thế giới Langbiang, nổi tiếng với rừng thông và pơ mu.',
    wiki: 'Vườn quốc gia Bidoup – Núi Bà',
  },
  {
    id: 'langbiang', name: 'Langbiang', heightM: 2167, lat: 12.05, lng: 108.44, provinceCode: 26,
    location: 'Lạc Dương (Lâm Đồng), gần Đà Lạt',
    description:
      'Gắn với truyền thuyết tình yêu chàng K\'Lang và nàng H\'Biang của người K\'Ho. Từ đỉnh có thể ngắm toàn cảnh Đà Lạt và thung lũng Vàng.',
    wiki: 'Núi Langbiang',
  },
  {
    id: 'ba-den', name: 'Bà Đen', heightM: 986, lat: 11.38, lng: 106.17, provinceCode: 27,
    location: 'Thành phố Tây Ninh cũ', note: 'Nóc nhà Nam Bộ', featured: true,
    description:
      'Ngọn núi cao nhất Nam Bộ, nổi bật giữa đồng bằng. Quần thể chùa Bà trên núi là trung tâm hành hương lớn; hệ thống cáp treo đưa du khách lên tận đỉnh.',
    imageSearch: 'Ba Den mountain',
  },
  {
    id: 'chua-chan', name: 'Chứa Chan', heightM: 837, lat: 10.97, lng: 107.37, provinceCode: 28,
    location: 'Xuân Lộc (Đồng Nai)',
    description:
      'Còn gọi là núi Gia Lào, ngọn núi cao nhất Đồng Nai cũ. Trên núi có nhiều chùa chiền và là điểm leo núi, cắm trại quen thuộc của người miền Đông.',
    imageSearch: 'Chứa Chan mountain',
  },
  {
    id: 'ba-ra', name: 'Bà Rá', heightM: 723, lat: 11.83, lng: 106.97, provinceCode: 28,
    location: 'Phước Long (Bình Phước cũ)',
    description:
      'Ngọn núi linh thiêng của vùng Phước Long, từng là căn cứ trong kháng chiến. Từ đỉnh có thể ngắm hồ thủy điện Thác Mơ.',
    imageSearch: 'Bà Rá mountain',
  },
  {
    id: 'nui-cam', name: 'Núi Cấm', heightM: 705, lat: 10.51, lng: 104.99, provinceCode: 32,
    location: 'Tịnh Biên (An Giang)', note: 'Thiên Cấm Sơn',
    description:
      'Ngọn núi cao nhất dãy Thất Sơn (Bảy Núi), được ví như "Đà Lạt của miền Tây". Trên núi có tượng Phật Di Lặc lớn và nhiều chùa cổ.',
    wiki: 'Núi Cấm',
  },
]

export const MOUNTAIN_BY_ID = new Map(MOUNTAINS.map((m) => [m.id, m]))

export interface TerrainLabel {
  name: string
  lat: number
  lng: number
  /** Góc xoay nhãn (độ) để chạy dọc theo dãy núi */
  rotate: number
  kind: 'range' | 'plateau'
}

export const TERRAIN_LABELS: TerrainLabel[] = [
  { name: 'Dãy Hoàng Liên Sơn', lat: 21.75, lng: 104.3, rotate: -48, kind: 'range' },
  { name: 'Dãy Trường Sơn Bắc', lat: 18.1, lng: 105.55, rotate: -42, kind: 'range' },
  { name: 'Dãy Trường Sơn Nam', lat: 15.75, lng: 107.25, rotate: -62, kind: 'range' },
  { name: 'Cao nguyên Đồng Văn', lat: 23.15, lng: 105.3, rotate: 0, kind: 'plateau' },
  { name: 'Cao nguyên Mộc Châu', lat: 20.82, lng: 104.65, rotate: 0, kind: 'plateau' },
  { name: 'Cao nguyên Pleiku', lat: 13.95, lng: 108.05, rotate: 0, kind: 'plateau' },
  { name: 'Cao nguyên Đắk Lắk', lat: 12.75, lng: 108.05, rotate: 0, kind: 'plateau' },
  { name: 'Cao nguyên Lâm Viên', lat: 11.85, lng: 108.4, rotate: 0, kind: 'plateau' },
]
