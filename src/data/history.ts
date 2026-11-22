/**
 * Trang Lịch sử: các cuộc kháng chiến, trận đánh tiêu biểu và người lãnh đạo.
 * Mô tả tóm tắt theo đoạn mở đầu bài vi.wikipedia (tra 22/11/2026); `wiki` là tên bài đã kiểm tra
 * (không phải trang định hướng). Không chắc thì bỏ trống (vd. `place`).
 */

export interface Battle {
  id: string
  name: string
  /** Thời gian theo bài wiki (dương lịch) */
  date: string
  place?: string
  summary: string
  wiki: string
  /** Người chỉ huy (id trong LEADERS) — chỉ ghi khi bài wiki nêu rõ */
  commanders?: string[]
}

/** Ảnh tự lưu trong public/images/history (tải từ Commons, xem ghi nguồn) */
export interface HistoryImage {
  url: string
  /** "Mô tả · Tác giả · Giấy phép" */
  credit: string
  /** Trang ảnh trên Commons */
  page: string
  /** object-position khi cắt ảnh vuông/tròn (để thấy mặt) */
  position?: string
}

export interface Leader {
  id: string
  name: string
  /** Tên khác hay gặp (tên húy, tên thật) */
  alias?: string
  lifespan: string
  role: string
  summary: string
  /** Tiểu sử (các đoạn), rút gọn từ phần mở đầu bài wiki */
  bio: string[]
  image?: HistoryImage
  wiki: string
}

export interface War {
  id: string
  name: string
  period: string
  /** Đối phương */
  enemy: string
  leaders: string[]
  battles: Battle[]
}

export const LEADERS: Leader[] = [
  {
    id: 'hai-ba-trung',
    name: 'Hai Bà Trưng',
    alias: 'Trưng Trắc, Trưng Nhị',
    lifespan: '? – 43',
    role: 'Thủ lĩnh khởi binh chống Đông Hán',
    summary:
      'Hai chị em Trưng Trắc và Trưng Nhị khởi binh chống chính quyền đô hộ Đông Hán, lập quốc gia đóng đô ở Mê Linh; Trưng Trắc xưng Vương.',
    bio: [
      'Hai Bà Trưng là tên chỉ chung hai chị em Trưng Trắc và Trưng Nhị, được đánh giá là anh hùng dân tộc của người Việt.',
      'Trong sử sách, hai bà là những thủ lĩnh khởi binh chống chính quyền đô hộ Đông Hán, lập một quốc gia đóng đô ở Mê Linh; Trưng Trắc tự xưng Vương. Thời kỳ của hai bà xen giữa Bắc thuộc lần 1 và Bắc thuộc lần 2. Đại Việt sử ký toàn thư coi Trưng Trắc là một vị vua, gọi là Trưng Nữ vương.',
    ],
    image: {
      url: 'images/history/hai-ba-trung.jpg',
      credit: 'Tranh Đông Hồ · Public domain',
      page: 'https://commons.wikimedia.org/wiki/File:Hai_B%C3%A0_Tr%C6%B0ng_(tranh_%C4%90%C3%B4ng_H%E1%BB%93).jpeg',
      position: '72% 30%',
    },
    wiki: 'Hai Bà Trưng',
  },
  {
    id: 'ngo-quyen',
    name: 'Ngô Quyền',
    lifespan: '898 – 944',
    role: 'Vua đầu tiên của nhà Ngô',
    summary:
      'Năm 938 lãnh đạo nhân dân đánh bại quân Nam Hán trong trận Bạch Đằng, kết thúc gần một ngàn năm Bắc thuộc; sau đó lên ngôi, trị vì 939–944.',
    bio: [
      'Ngô Quyền, khi xưng vương gọi là Tiền Ngô Vương, là vị vua đầu tiên của nhà Ngô. Năm 938, ông lãnh đạo nhân dân đánh bại quân Nam Hán trong trận Bạch Đằng, chính thức kết thúc gần một ngàn năm Bắc thuộc, mở ra thời kỳ độc lập lâu dài. Sau chiến thắng, ông lên ngôi, trị vì từ năm 939 đến 944.',
      'Ông nằm trong danh sách mười bốn anh hùng dân tộc Việt Nam; Phan Bội Châu xem ông là vị Tổ Trung hưng của Việt Nam.',
    ],
    image: {
      url: 'images/history/ngo-quyen.jpg',
      credit: 'Tượng thờ ở làng cổ Đường Lâm, Sơn Tây · Bùi Thụy Đào Nguyên · CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:T%C6%B0%E1%BB%A3ng_Ng%C3%B4_Quy%E1%BB%81n.jpg',
      position: '60% 42%',
    },
    wiki: 'Ngô Quyền',
  },
  {
    id: 'ly-thuong-kiet',
    name: 'Lý Thường Kiệt',
    lifespan: '1019 – 1105',
    role: 'Nhà quân sự, chính trị thời Lý',
    summary:
      'Làm quan qua ba triều Lý; đánh phá ba châu Khâm, Ung, Liêm nước Tống (1075–1076) rồi đánh bại cuộc xâm lược của quân Tống do Quách Quỳ, Triệu Tiết chỉ huy.',
    bio: [
      'Nhà quân sự, nhà chính trị thời Lý, làm quan qua ba triều Lý Thái Tông, Lý Thánh Tông, Lý Nhân Tông; cùng Lê Phụng Hiểu là hai danh tướng vĩ đại nhất nhà Lý.',
      'Ông nổi bật với việc chinh phạt Chiêm Thành (1069), đánh phá ba châu Khâm, Ung, Liêm nước Tống (1075–1076) — trận làm tên tuổi ông vang sang đất Tống — rồi đánh bại cuộc xâm lược Đại Việt của quân Tống do Quách Quỳ, Triệu Tiết chỉ huy.',
      'Năm 2013, Bộ Văn hóa, Thể thao và Du lịch liệt ông vào 14 vị anh hùng dân tộc tiêu biểu nhất trong lịch sử Việt Nam.',
    ],
    image: {
      url: 'images/history/ly-thuong-kiet.jpg',
      credit: 'Tượng bán thân ở Bảo tàng Quân đội, Hà Nội · Gary Todd · CC0',
      page: 'https://commons.wikimedia.org/wiki/File:Ly_Thuong_Kiet_(1019-1105)_Defeated_Song_China_Invasion_of_1077_(9732106811).jpg',
      position: '50% 35%',
    },
    wiki: 'Lý Thường Kiệt',
  },
  {
    id: 'tran-hung-dao',
    name: 'Trần Hưng Đạo',
    alias: 'Trần Quốc Tuấn',
    lifespan: '? – 1300',
    role: 'Nhà chiến lược quân sự thời Trần',
    summary: 'Tên tuổi gắn liền với các cuộc kháng chiến chống Nguyên Mông xâm lược Đại Việt ở thế kỷ 13.',
    bio: [
      'Trần Hưng Đạo, tên thật Trần Quốc Tuấn, là con của Trần Liễu — anh ruột vua Trần Thái Tông. Ông trở thành võ quan, được phong tước và cấp thái ấp ở Vạn Kiếp, phụng sự nhiều đời vua Trần.',
      'Trong cuộc chiến năm 1285, trên cương vị Quốc công tiết chế, ông gạt bỏ thù cũ, dốc sức phò vua Trần Nhân Tông, đánh đuổi hoàn toàn quân Nguyên năm 1286. Trong cuộc tái chiến 1287–1288, ông đại thắng trên sông Bạch Đằng, lấy cảm hứng từ binh pháp của Ngô Quyền năm 938. Năm 1289, ông được ban danh hiệu Hưng Đạo đại vương.',
      'Cuối đời ông lui về thái ấp và mất năm 1300. Trong tín ngưỡng dân gian, ông được suy tôn là Đức Thánh Trần, được thờ ở nhiều đền khắp ba miền.',
    ],
    image: {
      url: 'images/history/tran-hung-dao.jpg',
      credit: 'Tượng đồng ở đền Kiếp Bạc · Khangoii · CC BY-SA 4.0',
      page: 'https://commons.wikimedia.org/wiki/File:T%C6%B0%E1%BB%A3ng_%C4%91%E1%BB%93ng_Tr%E1%BA%A7n_H%C6%B0ng_%C4%90%E1%BA%A1o_t%E1%BA%A1i_%C4%91%E1%BB%81n_Ki%E1%BA%BFp_B%E1%BA%A1c.jpg',
      position: '50% 38%',
    },
    wiki: 'Trần Hưng Đạo',
  },
  {
    id: 'le-loi',
    name: 'Lê Lợi',
    alias: 'Lê Thái Tổ',
    lifespan: '1385 – 1433',
    role: 'Lãnh đạo nghĩa quân Lam Sơn',
    summary:
      'Lập nghĩa quân Lam Sơn, lãnh đạo kháng chiến chống nhà Minh từ năm 1418; đến 1428 đánh đuổi hoàn toàn quân Minh, rồi xây dựng và tái thiết đất nước.',
    bio: [
      'Lê Thái Tổ, húy Lê Lợi, sinh trong một gia đình hào trưởng ở Thanh Hóa thời nhà Minh đô hộ. Năm 1418, ông dựng cuộc khởi nghĩa Lam Sơn với lực lượng ban đầu chỉ vài nghìn người; nhờ chiến thuật phục kích và hòa hoãn, nghĩa quân dần lớn mạnh.',
      'Từ năm 1424, ông đánh vào Nghệ An, Thuận Hóa; đến 1426, quân Lam Sơn làm chủ từ Thanh Hóa tới Thuận Hóa. Sau trận Tốt Động – Chúc Động, ông vây Vương Thông ở Đông Quan, rồi đánh bại hai đạo viện binh của Liễu Thăng, Mộc Thạnh; Vương Thông phải xin hòa.',
      'Đến năm 1428, ông đánh đuổi hoàn toàn quân Minh, lên ngôi, xây dựng và tái thiết đất nước. Ông được xem là anh hùng dân tộc, vị hoàng đế huyền thoại của Đại Việt.',
    ],
    image: {
      url: 'images/history/le-loi.jpg',
      credit: 'Tượng đài ở Thanh Hóa · Nguyễn Thanh Quang · CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Le_Loi_statue.JPG',
      position: '50% 14%',
    },
    wiki: 'Lê Thái Tổ',
  },
  {
    id: 'nguyen-trai',
    name: 'Nguyễn Trãi',
    alias: 'Ức Trai',
    lifespan: '1380 – 1442',
    role: 'Nhà chính trị, nhà văn',
    summary:
      'Tham gia tích cực khởi nghĩa Lam Sơn chống nhà Minh; khi khởi nghĩa thành công năm 1428 trở thành một trong những khai quốc công thần nhà Hậu Lê.',
    bio: [
      'Nguyễn Trãi, hiệu Ức Trai, là con của Nguyễn Phi Khanh và cháu ngoại Tư đồ Trần Nguyên Đán. Ông đỗ Thái học sinh năm 1400 và làm quan nhà Hồ.',
      'Khi nhà Minh xâm lược, cha ông bị bắt giải sang Trung Quốc. Nguyễn Trãi tham gia khởi nghĩa Lam Sơn, giúp soạn thảo văn thư ngoại giao với quân Minh, trở thành một trong những nhân vật quan trọng nhất của cuộc kháng chiến và là khai quốc công thần nhà Hậu Lê.',
      'Năm 1442, cả gia đình ông bị kết án tru di tam tộc trong vụ án Lệ Chi Viên; năm 1464, vua Lê Thánh Tông xuống chiếu ân xá. Ông là nhà văn hóa lớn, có đóng góp to lớn cho văn học và tư tưởng Việt Nam.',
    ],
    image: {
      url: 'images/history/nguyen-trai.jpg',
      credit: 'Tranh chân dung · Không rõ tác giả · Public domain',
      page: 'https://commons.wikimedia.org/wiki/File:Nguyen_Trai.jpg',
      position: '50% 18%',
    },
    wiki: 'Nguyễn Trãi',
  },
  {
    id: 'quang-trung',
    name: 'Quang Trung',
    alias: 'Nguyễn Huệ',
    lifespan: '1753 – 1792',
    role: 'Hoàng đế thứ hai nhà Tây Sơn',
    summary:
      'Cùng hai anh lãnh đạo khởi nghĩa Tây Sơn, chấm dứt Trịnh – Nguyễn phân tranh; đánh tan quân Xiêm (1785) và quân Thanh (1789).',
    bio: [
      'Quang Trung, tên khai sinh Hồ Thơm, sau đổi là Nguyễn Huệ, tước hiệu trước khi lên ngôi là Bắc Bình Vương; là hoàng đế thứ hai nhà Tây Sơn sau khi anh là Nguyễn Nhạc nhường ngôi.',
      'Cùng hai anh (Tây Sơn tam kiệt), ông lãnh đạo khởi nghĩa Tây Sơn, chấm dứt Trịnh – Nguyễn phân tranh và tình trạng chia cắt Đàng Trong – Đàng Ngoài kéo dài hai thế kỷ. Ông đánh bại quân Xiêm La từ phía nam và quân Thanh từ phía bắc; cầm quân từ năm 18 tuổi, trong 20 năm trải qua hàng chục trận lớn mà chưa thua trận nào.',
      'Chỉ trong 3 năm, ông đề ra nhiều cải cách về kinh tế, văn hóa, giáo dục, quân sự: xuống chiếu cầu hiền, khuyến khích dùng chữ Nôm, mở rộng ngoại thương với phương Tây.',
    ],
    image: {
      url: 'images/history/quang-trung.jpg',
      credit: 'Tượng ở Bảo tàng Quang Trung, Quy Nhơn · Liftold, Phó Nháy · CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Quang_Trung_statue_02.jpg',
      position: '50% 10%',
    },
    wiki: 'Quang Trung',
  },
  {
    id: 'ho-chi-minh',
    name: 'Hồ Chí Minh',
    alias: 'Nguyễn Ái Quốc',
    lifespan: '1890 – 1969',
    role: 'Chủ tịch nước Việt Nam Dân chủ Cộng hòa',
    summary:
      'Nhà cách mạng, người sáng lập Đảng Cộng sản Việt Nam; Chủ tịch nước Việt Nam Dân chủ Cộng hòa từ 1945 đến khi qua đời năm 1969.',
    bio: [
      'Hồ Chí Minh, tên khai sinh Nguyễn Sinh Cung, còn gọi là Nguyễn Tất Thành, Nguyễn Ái Quốc, là nhà cách mạng, người sáng lập Đảng Cộng sản Việt Nam, Chủ tịch nước Việt Nam Dân chủ Cộng hòa từ 1945 đến 1969.',
      'Ông lãnh đạo Việt Minh tiến hành Cách mạng Tháng Tám năm 1945, soạn thảo và đọc bản Tuyên ngôn độc lập. Trong chiến tranh Đông Dương và chiến tranh Việt Nam, ông là nhân vật chủ chốt trong hàng ngũ lãnh đạo; từ năm 1965 giảm dần hoạt động vì sức khỏe và qua đời năm 1969.',
      'Năm 1976, thành phố Sài Gòn – Gia Định được đổi tên thành Thành phố Hồ Chí Minh để tôn vinh ông. Ông cũng là nhà văn, nhà thơ và nhà báo.',
    ],
    image: {
      url: 'images/history/ho-chi-minh.jpg',
      credit: 'Ảnh chân dung khoảng năm 1946 · Không rõ tác giả · Public domain',
      page: 'https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_-_1946_Portrait.jpg',
      position: '50% 30%',
    },
    wiki: 'Hồ Chí Minh',
  },
  {
    id: 'vo-nguyen-giap',
    name: 'Võ Nguyên Giáp',
    lifespan: '1911 – 2013',
    role: 'Đại tướng đầu tiên của Quân đội nhân dân Việt Nam',
    summary:
      'Tổng Tư lệnh, chỉ huy trưởng các chiến dịch trong Chiến tranh Đông Dương (1946–1954) và Chiến tranh Việt Nam (1955–1975); chỉ huy chiến thắng Điện Biên Phủ.',
    bio: [
      'Võ Nguyên Giáp, tên khai sinh Võ Giáp, còn gọi là Anh Văn, xuất thân là giáo viên dạy lịch sử. Ông là Đại tướng đầu tiên, Tổng Tư lệnh Quân đội nhân dân Việt Nam, nguyên Bộ trưởng Bộ Quốc phòng, Phó Thủ tướng.',
      'Ông là chỉ huy trưởng các chiến dịch trong Chiến tranh Đông Dương (1946–1954), Chiến tranh Việt Nam (1955–1975) và Chiến tranh biên giới Việt – Trung (1979). Chiến thắng Điện Biên Phủ năm 1954 khiến báo chí phương Tây gọi ông là “Napoleon đỏ”.',
      'Ông cũng là nhà hậu cần chiến lược, được công nhận là kiến trúc sư chính của đường mòn Hồ Chí Minh.',
    ],
    image: {
      url: 'images/history/vo-nguyen-giap.jpg',
      credit: 'Ảnh năm 2008 · Ricardo Stuckert (PR/ABr) · CC BY 3.0 BR',
      page: 'https://commons.wikimedia.org/wiki/File:Vo_Nguyen_Giap_2008.jpg',
      position: '62% 22%',
    },
    wiki: 'Võ Nguyên Giáp',
  },
  {
    id: 'le-duan',
    name: 'Lê Duẩn',
    lifespan: '1907 – 1986',
    role: 'Bí thư Thứ nhất, Tổng Bí thư',
    summary:
      'Bí thư Thứ nhất Đảng Lao động Việt Nam (1960–1976) và Tổng Bí thư Đảng Cộng sản Việt Nam (1976–1986), người đứng đầu Đảng lâu nhất.',
    bio: [
      'Lê Duẩn, tên thật Lê Văn Nhuận, sinh ở Triệu Phong, Quảng Trị; tham gia cách mạng từ những năm 1920 và là một trong những đảng viên đầu tiên của Đảng Cộng sản Đông Dương. Ông hai lần bị bắt giam ở Côn Đảo, được tự do sau Cách mạng tháng Tám.',
      'Trong Chiến tranh Đông Dương, ông là Bí thư Trung ương Cục miền Nam (1951–1954). Ông soạn Đề cương cách mạng miền Nam năm 1956, kiên quyết thống nhất đất nước bằng đấu tranh vũ trang. Năm 1960, ông được bầu làm Bí thư Thứ nhất; sau khi Hồ Chí Minh mất, ông giữ vai trò điều hành tối cao, đỉnh điểm là Chiến dịch Hồ Chí Minh năm 1975.',
      'Ông là Tổng Bí thư từ 1976 đến 1986 — người đứng đầu Đảng lâu nhất, 25 năm 303 ngày.',
    ],
    image: {
      url: 'images/history/le-duan.jpg',
      credit: 'Ảnh chân dung · Không rõ tác giả · Public domain',
      page: 'https://commons.wikimedia.org/wiki/File:Le_duan.png',
      position: '50% 25%',
    },
    wiki: 'Lê Duẩn',
  },
  {
    id: 'van-tien-dung',
    name: 'Văn Tiến Dũng',
    lifespan: '1917 – 2002',
    role: 'Đại tướng, Tổng Tham mưu trưởng',
    summary:
      'Tổng Tham mưu trưởng Quân đội nhân dân Việt Nam (1953–1978); trực tiếp chỉ đạo các chiến dịch Đường 9 – Nam Lào, Trị – Thiên và Tây Nguyên.',
    bio: [
      'Văn Tiến Dũng, bí danh Lê Hoài, Đại tướng Quân đội nhân dân Việt Nam; Tổng Tham mưu trưởng (1953–1978), Bộ trưởng Bộ Quốc phòng (1980–1986).',
      'Trong Chiến tranh Việt Nam, ông trực tiếp chỉ đạo các chiến dịch Đường 9 – Nam Lào (1971), Trị – Thiên (1972), Tây Nguyên (1975). Tháng 4 năm 1975, ông là Tư lệnh Chiến dịch giải phóng Sài Gòn – Gia Định (sau đổi tên là Chiến dịch Hồ Chí Minh).',
    ],
    image: {
      url: 'images/history/van-tien-dung.jpg',
      credit: 'Ảnh năm 1954 tại Hội nghị Trung Giã · LIFE · Public domain',
      page: 'https://commons.wikimedia.org/wiki/File:Van_Tien_Dung_1954.jpg',
      position: '50% 25%',
    },
    wiki: 'Văn Tiến Dũng',
  },
]

export const LEADER_BY_ID = new Map(LEADERS.map((l) => [l.id, l]))

export const WARS: War[] = [
  {
    id: 'hai-ba-trung',
    name: 'Khởi nghĩa Hai Bà Trưng',
    period: '40 – 43',
    enemy: 'Đông Hán',
    leaders: ['hai-ba-trung'],
    battles: [],
  },
  {
    id: 'nam-han',
    name: 'Kháng chiến chống Nam Hán',
    period: '938',
    enemy: 'Nam Hán',
    leaders: ['ngo-quyen'],
    battles: [
      {
        id: 'bach-dang-938',
        name: 'Trận Bạch Đằng',
        date: '938',
        place: 'Sông Bạch Đằng',
        summary:
          'Quân dân Tĩnh Hải quân do Ngô Quyền lãnh đạo thắng lớn nhờ kế cắm cọc nhọn dưới lòng sông; quá nửa quân Nam Hán chết đuối, hoàng tử Lưu Hoằng Tháo tử trận.',
        wiki: 'Trận Bạch Đằng (938)',
        commanders: ['ngo-quyen'],
      },
    ],
  },
  {
    id: 'tong',
    name: 'Kháng chiến chống Tống',
    period: '1075 – 1077',
    enemy: 'Nhà Tống',
    leaders: ['ly-thuong-kiet'],
    battles: [
      {
        id: 'nhu-nguyet',
        name: 'Trận Như Nguyệt',
        date: '1077',
        place: 'Sông Như Nguyệt (sông Cầu)',
        summary:
          'Trận quyết định của chiến tranh Tống – Việt, kéo dài nhiều tháng; quân Tống thiệt hại lớn, phải từ bỏ ý chí xâm lược và thừa nhận Đại Việt.',
        wiki: 'Trận Như Nguyệt',
        commanders: ['ly-thuong-kiet'],
      },
    ],
  },
  {
    id: 'nguyen-mong',
    name: 'Kháng chiến chống Nguyên Mông',
    period: 'Thế kỷ 13',
    enemy: 'Nguyên Mông',
    leaders: ['tran-hung-dao'],
    battles: [
      {
        id: 'bach-dang-1288',
        name: 'Trận Bạch Đằng',
        date: '1288',
        place: 'Sông Bạch Đằng',
        summary:
          'Quân Đại Việt do Trần Hưng Đạo cùng Thượng hoàng Trần Thánh Tông, vua Trần Nhân Tông chỉ huy đại thắng; hơn 4 vạn quân Nguyên bị giết hoặc bắt, tướng Ô Mã Nhi bị bắt sống.',
        wiki: 'Trận Bạch Đằng (1288)',
        commanders: ['tran-hung-dao'],
      },
    ],
  },
  {
    id: 'lam-son',
    name: 'Khởi nghĩa Lam Sơn',
    period: '1418 – 1428',
    enemy: 'Nhà Minh',
    leaders: ['le-loi', 'nguyen-trai'],
    battles: [
      {
        id: 'tot-dong',
        name: 'Trận Tốt Động – Chúc Động',
        date: '5 – 7/11/1426',
        summary:
          'Nghĩa quân Lam Sơn do Lý Triện, Đinh Lễ, Nguyễn Xí chỉ huy đánh bại quân Minh đông gấp nhiều lần do Vương Thông chỉ huy.',
        wiki: 'Trận Tốt Động – Chúc Động',
      },
      {
        id: 'chi-lang-xuong-giang',
        name: 'Chiến dịch Chi Lăng – Xương Giang',
        date: '18/9 – cuối 10/1427',
        summary:
          'Nghĩa quân Lam Sơn đánh tan 15 vạn viện binh nhà Minh, giết Liễu Thăng, Mộc Thạnh bỏ chạy; Vương Thông phải giảng hòa với Lê Lợi.',
        wiki: 'Trận Chi Lăng – Xương Giang',
        commanders: ['le-loi'],
      },
    ],
  },
  {
    id: 'xiem',
    name: 'Kháng chiến chống Xiêm',
    period: '1785',
    enemy: 'Xiêm La',
    leaders: ['quang-trung'],
    battles: [
      {
        id: 'rach-gam',
        name: 'Trận Rạch Gầm – Xoài Mút',
        date: 'Đêm 19 rạng sáng 20/1/1785',
        place: 'Khúc sông Rạch Gầm – Xoài Mút, nay thuộc Đồng Tháp',
        summary:
          'Quân Tây Sơn do Nguyễn Huệ chỉ huy phục kích, trong nửa ngày đánh tan liên quân Xiêm – Nguyễn đông gấp đôi, bảo vệ chủ quyền vùng Nam Bộ.',
        wiki: 'Trận Rạch Gầm – Xoài Mút',
        commanders: ['quang-trung'],
      },
    ],
  },
  {
    id: 'thanh',
    name: 'Kháng chiến chống Thanh',
    period: '1788 – 1789',
    enemy: 'Nhà Thanh',
    leaders: ['quang-trung'],
    battles: [
      {
        id: 'ngoc-hoi-dong-da',
        name: 'Trận Ngọc Hồi – Đống Đa',
        date: 'Đầu năm Kỷ Dậu 1789',
        place: 'Thăng Long',
        summary:
          'Vua Quang Trung hành quân thần tốc, đánh tan quân Thanh của Tôn Sĩ Nghị đông gấp 2–3 lần và chiếm lại kinh đô Thăng Long chỉ trong 5 ngày.',
        wiki: 'Trận Ngọc Hồi – Đống Đa',
        commanders: ['quang-trung'],
      },
    ],
  },
  {
    id: 'phap',
    name: 'Kháng chiến chống Pháp',
    period: '1945 – 1954',
    enemy: 'Pháp',
    leaders: ['ho-chi-minh', 'vo-nguyen-giap'],
    battles: [
      {
        id: 'viet-bac',
        name: 'Chiến dịch Việt Bắc',
        date: 'Thu – Đông 1947',
        place: 'Việt Bắc',
        summary:
          'Phản công cuộc hành quân Léa của Pháp; Pháp không tiêu diệt được đầu não kháng chiến và quân chủ lực, thất bại về chiến lược.',
        wiki: 'Chiến dịch Việt Bắc',
      },
      {
        id: 'bien-gioi',
        name: 'Chiến dịch Biên giới',
        date: '16/9 – 14/10/1950',
        place: 'Biên giới Việt – Trung',
        summary:
          'Phá vòng vây Pháp bố trí quanh căn cứ địa Việt Bắc, khai thông biên giới Việt – Trung để tiếp nhận viện trợ, mở rộng căn cứ địa.',
        wiki: 'Chiến dịch Biên giới',
      },
      {
        id: 'dien-bien-phu',
        name: 'Chiến dịch Điện Biên Phủ',
        date: 'Kết thúc 7/5/1954',
        place: 'Lòng chảo Mường Thanh, nay thuộc tỉnh Điện Biên',
        summary:
          'Trận lớn nhất Chiến tranh Đông Dương; Quân đội nhân dân Việt Nam do Đại tướng Võ Nguyên Giáp chỉ huy buộc quân Pháp đầu hàng sau 2 tháng cầm cự.',
        wiki: 'Chiến dịch Điện Biên Phủ',
        commanders: ['vo-nguyen-giap'],
      },
    ],
  },
  {
    id: 'my',
    name: 'Kháng chiến chống Mỹ',
    period: '1955 – 1975',
    enemy: 'Hoa Kỳ và Việt Nam Cộng hòa',
    leaders: ['ho-chi-minh', 'le-duan', 'vo-nguyen-giap', 'van-tien-dung'],
    battles: [
      {
        id: 'tet-mau-than',
        name: 'Tổng tiến công Tết Mậu Thân',
        date: 'Tết 1968',
        place: 'Hầu hết các đô thị miền Nam',
        summary:
          'Tổng tiến công và nổi dậy vào dịp Tết Mậu Thân, đánh vào các khu vực trọng yếu của quân đội Mỹ và Việt Nam Cộng hòa; bước ngoặt của chiến tranh.',
        wiki: 'Sự kiện Tết Mậu Thân',
      },
      {
        id: 'dbp-tren-khong',
        name: 'Điện Biên Phủ trên không',
        date: '18 – 30/12/1972',
        place: 'Hà Nội, Hải Phòng và miền Bắc',
        summary:
          'Trận không chiến cuối cùng giữa Hoa Kỳ và Việt Nam Dân chủ Cộng hòa; Mỹ dùng B-52 ném bom rải thảm Hà Nội, Hải Phòng và nhiều nơi trong 12 ngày đêm.',
        wiki: 'Chiến dịch Linebacker II',
      },
      {
        id: 'tay-nguyen',
        name: 'Chiến dịch Tây Nguyên',
        date: '4 – 24/3/1975',
        place: 'Tây Nguyên, mở màn ở Buôn Ma Thuột',
        summary:
          'Chiến dịch mở đầu Tổng tấn công và nổi dậy mùa Xuân 1975; sau trận Buôn Ma Thuột ngày 10/3, cánh Nam Quân đoàn II Việt Nam Cộng hòa sụp đổ.',
        wiki: 'Chiến dịch Tây Nguyên',
        commanders: ['van-tien-dung'],
      },
      {
        id: 'ho-chi-minh',
        name: 'Chiến dịch Hồ Chí Minh',
        date: '26 – 30/4/1975',
        place: 'Sài Gòn',
        summary:
          'Chiến dịch cuối cùng của cuộc Tổng tấn công mùa Xuân 1975, kết thúc Chiến tranh Việt Nam, dẫn tới thống nhất đất nước năm 1976.',
        wiki: 'Chiến dịch Hồ Chí Minh',
        commanders: ['van-tien-dung'],
      },
    ],
  },
]

/** Các cuộc kháng chiến mà một người lãnh đạo */
export function warsOf(leaderId: string): War[] {
  return WARS.filter((w) => w.leaders.includes(leaderId))
}

/** Các trận một người chỉ huy (kèm cuộc kháng chiến) */
export function battlesOf(leaderId: string): { battle: Battle; war: War }[] {
  return WARS.flatMap((war) =>
    war.battles.filter((b) => b.commanders?.includes(leaderId)).map((battle) => ({ battle, war })),
  )
}

export function wikiUrl(title: string): string {
  return `https://vi.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`
}
