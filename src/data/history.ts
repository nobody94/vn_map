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
  /** Người chỉ huy (id trong LEADERS) — theo hộp thông tin / phần mở đầu bài wiki */
  commanders?: string[]
  /** Kết quả ngắn (hộp thông tin bài wiki) */
  result?: string
  /** Lực lượng từng bên (hộp thông tin); không chắc thì bỏ */
  forces?: { side: string; strength: string }[]
  /** Các đoạn chi tiết cho popup, rút gọn từ các mục Bối cảnh / Diễn biến / Kết quả của bài wiki */
  background?: string
  events?: string
  outcome?: string
  image?: HistoryImage
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
  /** 'contain': lược đồ / bản đồ — hiện nguyên ảnh, không cắt */
  fit?: 'contain'
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
    id: 'le-hoan',
    name: 'Lê Hoàn',
    alias: 'Lê Đại Hành',
    lifespan: '941 – 1005',
    role: 'Hoàng đế sáng lập nhà Tiền Lê',
    summary:
      'Lên ngôi năm 980 khi nhà Tống phát binh xâm lược; tự làm tướng đánh tan quân Tống năm 981, chém tướng Hầu Nhân Bảo, bảo toàn nền độc lập của Đại Cồ Việt.',
    bio: [
      'Lê Đại Hành, tên húy Lê Hoàn, là hoàng đế sáng lập nhà Tiền Lê, trị vì nước Đại Cồ Việt trong 25 năm; là một trong 14 vị anh hùng tiêu biểu của dân tộc Việt Nam.',
      'Thời trẻ ông làm quan nhà Đinh tới chức Thập đạo tướng quân. Năm 979, Đinh Tiên Hoàng và Đinh Liễn bị ám sát, Đinh Toàn nối ngôi lúc 6 tuổi; Lê Hoàn làm Nhiếp chính, xưng Phó vương. Nhà Tống lấy cớ đó phát binh xâm lược; Đại tướng quân Phạm Cự Lạng cùng binh sĩ buộc Thái hậu họ Dương trao long cổn cho ông.',
      'Sau khi lên ngôi, ông tự làm tướng đánh tan quân Tống, chém tướng Hầu Nhân Bảo, bắt sống các tướng Quách Quân Biện, Triệu Phụng Huân. Trong thời trị vì, ông phát triển nông nghiệp, mở trường học, đánh bại Chiêm Thành và dẹp các lực lượng ly khai ở biên giới; sử sách đánh giá ông là một minh quân.',
    ],
    image: {
      url: 'images/history/le-hoan.jpg',
      credit: 'Tranh thờ trưng bày ở Bảo tàng Lịch sử Quốc gia, Hà Nội · Không rõ tác giả · Public domain',
      page: 'https://commons.wikimedia.org/wiki/File:Le_Dai_Hanh.jpg',
      position: '50% 12%',
    },
    wiki: 'Lê Đại Hành',
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
    id: 'tran-thai-tong',
    name: 'Trần Thái Tông',
    alias: 'Trần Cảnh',
    lifespan: '1218 – 1277',
    role: 'Hoàng đế đầu tiên nhà Trần',
    summary:
      'Hoàng đế đầu tiên của nhà Trần; năm 1258 trực tiếp lãnh đạo kháng chiến, phản công ở Đông Bộ Đầu đánh bại quân Mông Cổ của Ngột Lương Hợp Thai.',
    bio: [
      'Trần Thái Tông, tên thật Trần Cảnh, là hoàng đế đầu tiên của nhà Trần, giữ ngôi từ năm 1226 tới năm 1258, sau đó làm Thái thượng hoàng đến khi qua đời năm 1277. Lên bảy tuổi, ông được chú họ Trần Thủ Độ đưa vào cung hầu Lý Chiêu Hoàng; cuối năm 1225 – đầu 1226, Trần Thủ Độ buộc Chiêu Hoàng cưới và nhường ngôi cho ông.',
      'Cùng Thượng hoàng Trần Thừa và Thái sư Trần Thủ Độ, ông cải tổ luật pháp, hành chính, khuyến khích nông, thương nghiệp, phát triển giáo dục, xây dựng quân đội mạnh. Năm 1258, tướng Mông Cổ Ngột Lương Hợp Thai đem quân tấn công Đại Việt; ông trực tiếp lãnh đạo kháng chiến và đánh bại quân Mông Cổ.',
      'Không lâu sau chiến thắng, ông nhường ngôi cho Thái tử Hoảng (Trần Thánh Tông). Ông còn là một thiền sư, tác giả Khóa hư lục, Thiền tông chỉ nam, có ảnh hưởng lớn đến sự hình thành Thiền phái Trúc Lâm.',
    ],
    wiki: 'Trần Thái Tông',
  },
  {
    id: 'tran-thanh-tong',
    name: 'Trần Thánh Tông',
    alias: 'Trần Hoảng',
    lifespan: '1240 – 1290',
    role: 'Hoàng đế thứ hai nhà Trần',
    summary:
      'Góp phần chỉ huy quân đội đẩy lùi quân Mông Cổ năm 1258; khi làm Thái thượng hoàng cùng vua Trần Nhân Tông lãnh đạo đánh bại hai cuộc xâm lược của Nguyên Mông (1285, 1287).',
    bio: [
      'Trần Thánh Tông, tên thật Trần Hoảng, là hoàng đế thứ hai của nhà Trần, trị vì từ năm 1258 đến 1278, sau đó làm Thái thượng hoàng đến khi qua đời năm 1290. Là đích trưởng tử của Trần Thái Tông, ông góp phần chỉ huy quân đội đẩy lùi cuộc xâm lược của người Mông Cổ năm 1258.',
      'Khi cầm quyền, ông hoàn thiện nền hành chính, giáo dục, kinh tế, trọng dụng người tài. Với nhà Nguyên, ông giữ ngoại giao mềm mỏng, cống nạp 3 năm một lần nhưng cự tuyệt mọi yêu sách đòi cống người, cống voi, đích thân sang chầu; đồng thời chỉnh đốn quân đội, tuần tra biên giới.',
      'Năm 1278, ông nhường ngôi cho Thái tử Trần Khâm (Trần Nhân Tông). Cùng vua Nhân Tông và Quốc công Tiết chế Hưng Đạo vương, Thượng hoàng Thánh Tông lãnh đạo quân dân Đại Việt đánh bại hai cuộc xâm lược của Nguyên Mông năm 1285 và 1287.',
    ],
    wiki: 'Trần Thánh Tông',
  },
  {
    id: 'tran-nhan-tong',
    name: 'Trần Nhân Tông',
    alias: 'Trần Khâm, Phật Hoàng',
    lifespan: '1258 – 1308',
    role: 'Hoàng đế thứ ba nhà Trần',
    summary:
      'Cùng Thượng hoàng Trần Thánh Tông và Trần Hưng Đạo lãnh đạo quân dân Đại Việt đánh bại hai cuộc xâm lược của Nguyên Mông (1285, 1287–1288); sáng lập Thiền phái Trúc Lâm.',
    bio: [
      'Trần Nhân Tông, tên khai sinh Trần Khâm, còn gọi Phật Hoàng, là hoàng đế thứ ba của nhà Trần, trị vì từ năm 1278 đến 1293. Năm 2013, ông được đưa vào danh sách 14 vị anh hùng dân tộc Việt Nam.',
      'Trước nguy cơ Nguyên Mông, ông nâng cao sức mạnh kinh tế, ổn định chính trị – xã hội, xây dựng quan hệ tích cực với Chiêm Thành. Năm 1285, Hốt Tất Liệt huy động lực lượng lớn tấn công Đại Việt; quân dân ban đầu gặp nhiều tổn thất, nhưng dưới sự chỉ huy của vua Nhân Tông, Thượng hoàng Thánh Tông và Quốc công Tiết chế Trần Quốc Tuấn đã dần xoay chuyển tình thế, đánh bật quân Nguyên. Năm 1287, hai vua và Trần Quốc Tuấn lại lãnh đạo đánh bại cuộc xâm lược tiếp theo.',
      'Năm 1293, ông truyền ngôi cho Trần Anh Tông, làm Thái thượng hoàng rồi xuất gia, lấy hiệu Trúc Lâm Đại Sĩ, sáng lập Thiền phái Trúc Lâm — dòng thiền mang bản sắc văn hóa Việt Nam và tinh thần nhập thế.',
    ],
    image: {
      url: 'images/history/tran-nhan-tong.jpg',
      credit: 'Tượng đá đời Trần trong tháp Huệ Quang, Yên Tử · Bùi Thụy Đào Nguyên · CC BY-SA 3.0',
      page: 'https://commons.wikimedia.org/wiki/File:Tượng_Giác_Hoàng_Trần_Nhân_Tông.jpg',
      position: '50% 30%',
    },
    wiki: 'Trần Nhân Tông',
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
      'Tuy thường được tôn vinh vì công trạng trong ba lần kháng chiến, vai trò của ông trong cuộc chiến 1257–1258 thực ra rất mờ nhạt. Trong cuộc chiến năm 1285, trên cương vị Quốc công tiết chế, ông gạt bỏ thù cũ, dốc sức phò vua Trần Nhân Tông, đánh đuổi hoàn toàn quân Nguyên năm 1286. Trong cuộc tái chiến 1287–1288, ông đại thắng trên sông Bạch Đằng, lấy cảm hứng từ binh pháp của Ngô Quyền năm 938. Năm 1289, ông được ban danh hiệu Hưng Đạo đại vương.',
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
    id: 'tran-quang-khai',
    name: 'Trần Quang Khải',
    alias: 'Chiêu Minh Đại vương',
    lifespan: '1241 – 1294',
    role: 'Thượng tướng Thái sư thời Trần',
    summary:
      'Thừa tướng ba đời vua Trần; trong kháng chiến chống Nguyên Mông năm 1285 trực tiếp chỉ huy trận đánh tan quân Nguyên ở bến Chương Dương.',
    bio: [
      'Trần Quang Khải, hay Chiêu Minh Đại vương, là nhà chính trị, quân sự, tôn thất nhà Trần; làm đến chức Thừa tướng đời Trần Thánh Tông, Trần Nhân Tông và Trần Anh Tông, coi mọi việc trong nước.',
      'Trong kháng chiến chống Nguyên Mông năm 1285, vua Trần Nhân Tông phong ông chức Thượng tướng Thái sư; ông giữ vai trò nổi bật trong trận phòng thủ Thanh Hóa, Nghệ An và trận đánh tan quân Nguyên tại Chương Dương độ. Phan Huy Chú ghi nhận: “Công lao thu phục được nước, ông đứng thứ nhất”.',
      'Ông là người học rộng, giỏi thơ phú, có Lạc Đạo tập lưu lại; bài thơ Tòng giá hoàn kinh tương truyền ông ứng khẩu ngâm trong tiệc khao quân khi quân Trần trở lại Thăng Long.',
    ],
    wiki: 'Trần Quang Khải',
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
      'Bất chấp sự phản đối của tướng lĩnh và dân chúng, ông cho quân Minh rút lui an toàn, còn cấp thuyền bè, sửa đường sá cho họ; quân Minh về nước cuối năm 1427, ông sai Nguyễn Trãi soạn Bình Ngô đại cáo báo cho thiên hạ biết.',
      'Năm 1428, ông lên ngôi ở thành Đông Quan, đặt quốc hiệu là Đại Việt, lấy Đông Kinh làm thủ đô, mở ra nhà Hậu Lê; xây dựng lại khoa cử, luật lệ, kinh tế, mở mang trường học, dẹp yên các thổ tù chống đối ở biên viễn. Ông được xem là anh hùng dân tộc, một trong hai vị vua trung hưng của dân tộc (sau Ngô Quyền).',
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
      'Khi nhà Minh xâm lược, cha ông bị bắt giải sang Trung Quốc. Nguyễn Trãi khóc đi theo đến ải Nam Quan; Nguyễn Phi Khanh khuyên ông quay về tìm cách rửa nhục cho nước, trả thù cho cha, “như thế mới là đại hiếu”.',
      'Ông tham gia khởi nghĩa Lam Sơn, giúp soạn thảo văn thư ngoại giao với quân Minh, trở thành một trong những nhân vật quan trọng nhất của cuộc kháng chiến và là khai quốc công thần nhà Hậu Lê. Dưới triều Lê Thái Tổ và Lê Thái Tông, ông giữ các chức Nhập nội hành khiển, Thừa chỉ, Lại bộ Thượng thư kiêm hành Khu mật viện sự.',
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
      'Chỉ trong 3 năm, ông đề ra nhiều cải cách về kinh tế, văn hóa, giáo dục, quân sự: xuống chiếu cầu hiền, trọng dụng Ngô Thì Nhậm, Phan Huy Ích, Nguyễn Thiệp; cải cách chế độ đinh điền và ruộng đất, khuyến khích dùng chữ Nôm, mở rộng ngoại thương với phương Tây.',
      'Sau 20 năm chinh chiến và 3 năm trị nước, ông đột ngột qua đời ở tuổi 39. Người kế vị là Quang Toản mới 9 tuổi, nhà Tây Sơn suy yếu nhanh chóng và thất bại trước Nguyễn Ánh. Ông được liệt vào danh sách 14 vị anh hùng dân tộc tiêu biểu của Việt Nam.',
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
      'Hồ Chí Minh, tên khai sinh Nguyễn Sinh Cung, còn gọi là Nguyễn Tất Thành, Nguyễn Ái Quốc, là nhà cách mạng, người sáng lập Đảng Cộng sản Việt Nam, Chủ tịch nước Việt Nam Dân chủ Cộng hòa từ 1945 đến 1969; ông còn là Thủ tướng (1945–1955), Tổng Bí thư (1956–1960) và Chủ tịch Ban Chấp hành Trung ương Đảng Lao động Việt Nam từ năm 1951.',
      'Trước khi lên nắm quyền, ông đi qua nhiều quốc gia và châu lục, được cho là đã dùng từ 50 đến 200 bí danh khác nhau. Về tư tưởng chính trị, ông theo chủ nghĩa Marx–Lenin.',
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
      'Ông cũng là nhà hậu cần chiến lược, được công nhận là kiến trúc sư chính của đường mòn Hồ Chí Minh — tuyến đưa vũ khí và người từ miền Bắc vào Nam qua Lào và Campuchia.',
      'Trong Chiến tranh Việt Nam, các tướng cũ của ông là Văn Tiến Dũng và Hoàng Văn Thái về sau có trách nhiệm quân sự trực tiếp hơn; dù vậy ông đóng vai trò quan trọng trong việc biến Quân đội nhân dân Việt Nam thành một lực lượng chiến đấu hiệp đồng, cơ giới hóa lớn mạnh.',
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
      'Ông là Tổng Bí thư từ 1976 đến 1986 — người đứng đầu Đảng lâu nhất, 25 năm 303 ngày. Trên cương vị này, ông duy trì mô hình kinh tế kế hoạch hóa tập trung, theo đuổi lập trường đối ngoại độc lập, gia nhập Hội đồng Tương trợ Kinh tế năm 1978 và giữ chức đến khi qua đời năm 1986.',
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
      'Văn Tiến Dũng, bí danh Lê Hoài, Đại tướng Quân đội nhân dân Việt Nam, một trong những tướng lĩnh danh tiếng của Việt Nam; nguyên Ủy viên Bộ Chính trị, Tổng Tham mưu trưởng (1953–1978), Bộ trưởng Bộ Quốc phòng (1980–1986), Bí thư Đảng ủy Quân sự Trung ương (1984–1986).',
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
  {
    id: 'hoang-van-thai',
    name: 'Hoàng Văn Thái',
    alias: 'Hoàng Văn Xiêm',
    lifespan: '1915 – 1986',
    role: 'Đại tướng, Tổng Tham mưu trưởng đầu tiên',
    summary:
      'Tổng Tham mưu trưởng đầu tiên của Quân đội nhân dân Việt Nam; góp công trong các chiến dịch Biên giới 1950, Điện Biên Phủ, Tết Mậu Thân 1968 và Chiến dịch Hồ Chí Minh.',
    bio: [
      'Hoàng Văn Thái, tên thật Hoàng Văn Xiêm, là Đại tướng Quân đội nhân dân Việt Nam, một trong những tướng lĩnh có ảnh hưởng quan trọng trong sự hình thành và phát triển của quân đội.',
      'Ông là Tổng Tham mưu trưởng đầu tiên, góp công trong nhiều chiến dịch quan trọng như Biên giới thu đông 1950, Điện Biên Phủ (1954), Tết Mậu Thân (1968), các chiến dịch năm 1972 và Chiến dịch Hồ Chí Minh. Ông từng giữ chức Thứ trưởng Bộ Quốc phòng, Tư lệnh Quân Giải phóng miền Nam, Phó chủ nhiệm Ủy ban Kế hoạch Nhà nước.',
      'Từ khi quân đội thành lập năm 1944 đến giữa năm 1986, ông tham gia xây dựng kế hoạch và trực tiếp chỉ đạo nhiều chiến dịch lớn; ông được xem là tác giả hệ thống ký hiệu tổ chức đơn vị quân đội theo bảng chữ cái.',
    ],
    image: {
      url: 'images/history/hoang-van-thai.jpg',
      credit: 'Ảnh chân dung năm 1986 · Public domain',
      page: 'https://commons.wikimedia.org/wiki/File:Đại_tướng_Hoàng_Văn_Thái.jpg',
      position: '50% 30%',
    },
    wiki: 'Hoàng Văn Thái',
  },
  {
    id: 'nguyen-chi-thanh',
    name: 'Nguyễn Chí Thanh',
    lifespan: '1914 – 1967',
    role: 'Đại tướng, Bí thư Trung ương Cục miền Nam',
    summary:
      'Tướng lĩnh chính trị đầu tiên của Quân đội nhân dân Việt Nam; trực tiếp lãnh đạo chiến trường miền Nam, người phát triển phương châm “Nắm thắt lưng địch mà đánh”.',
    bio: [
      'Nguyễn Chí Thanh là Đại tướng và là tướng lĩnh chính trị đầu tiên của Quân đội nhân dân Việt Nam. Ông công tác ở nhiều lĩnh vực chính trị khác nhau và đều phát triển được lĩnh vực đó, nên còn được gọi là “vị tướng phong trào”.',
      'Trong Chiến tranh Việt Nam, ông giữ chức Bí thư Trung ương Cục miền Nam, Bí thư Quân ủy Miền kiêm Chính ủy Quân Giải phóng miền Nam, trực tiếp lãnh đạo chiến trường miền Nam. Ông là người phát triển phương châm chiến lược “Nắm thắt lưng địch mà đánh” cho toàn miền Nam.',
    ],
    wiki: 'Nguyễn Chí Thanh',
  },
  {
    id: 'le-trong-tan',
    name: 'Lê Trọng Tấn',
    alias: 'Lê Trọng Tố',
    lifespan: '1914 – 1986',
    role: 'Đại tướng, Tổng Tham mưu trưởng',
    summary:
      'Đại tướng Quân đội nhân dân Việt Nam; chỉ huy các chiến dịch Đường 9 – Nam Lào (1971), Huế – Đà Nẵng (1975) và là một trong những người chỉ huy Chiến dịch Hồ Chí Minh.',
    bio: [
      'Lê Trọng Tấn, tên thật Lê Trọng Tố, là Đại tướng Quân đội nhân dân Việt Nam. Ông từng là Viện trưởng Học viện Quân sự Cao cấp, Tổng Tham mưu trưởng, Thứ trưởng Bộ Quốc phòng, Phó Tư lệnh Quân Giải phóng miền Nam.',
      'Theo hộp thông tin các bài wiki, ông là chỉ huy phía Quân Giải phóng trong Chiến dịch Đường 9 – Nam Lào (1971), Tư lệnh Chiến dịch Huế – Đà Nẵng (1975) và là một trong những người chỉ huy Chiến dịch Hồ Chí Minh.',
      'Ông là vị Đại tướng lớn tuổi nhất khi thụ phong (69 tuổi 352 ngày) và giữ quân hàm hiện dịch ngắn nhất (2 năm 343 ngày); được xếp đầu trong câu “nhất Tấn nhì An tam Đan tứ Chơn”.',
    ],
    image: {
      url: 'images/history/le-trong-tan.jpg',
      credit: 'Ảnh thời kháng chiến chống Pháp · Không rõ tác giả · Public domain',
      page: 'https://commons.wikimedia.org/wiki/File:Le_Trong_Tan.jpg',
      position: '50% 25%',
    },
    wiki: 'Lê Trọng Tấn',
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
        result: 'Tĩnh Hải quân chiến thắng',
        background:
          'Năm 931, Dương Đình Nghệ đánh đuổi quân Nam Hán, giành quyền tự chủ cho Tĩnh Hải quân. Cuối năm 937, ông bị nha tướng Kiều Công Tiễn giết để cướp ngôi; con rể ông là Ngô Quyền tập hợp lực lượng đánh Công Tiễn. Công Tiễn cầu cứu Nam Hán, vua Lưu Cung sai con là Lưu Hoằng Tháo thống lĩnh thủy quân sang đánh.',
        events:
          'Cuối đông năm 938, thủy quân Nam Hán tiến vào cửa sông Bạch Đằng. Thấy quân Ngô Quyền chỉ có thuyền nhẹ, quân ít, họ hùng hổ đuổi theo khi quân Ngô giả vờ bỏ chạy lên thượng lưu. Khi thủy triều xuống, thuyền lớn Nam Hán mắc cạn và bị bãi cọc đâm thủng; Ngô Quyền tung quân đánh dữ dội.',
        outcome:
          'Quân Nam Hán thua chạy, Lưu Hoằng Tháo cùng hơn nửa quân sĩ bỏ mạng. Chiến thắng chấm dứt hơn 1000 năm Bắc thuộc, mở ra thời kỳ độc lập tự chủ; năm 939 nhà Ngô được thành lập.',
        image: {
          url: 'images/history/battles/bach-dang-938.jpg',
          credit: 'Tranh Đông Hồ “Ngô Quyền đại phá quân Nam Hán trên sông Bạch Đằng” · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Ngô_Quyền_đại_phá_quân_Nam_Hán_trên_sông_Bạch_Đằng.jpg',
        },
      },
    ],
  },
  {
    id: 'tong-981',
    name: 'Kháng chiến chống Tống lần thứ nhất',
    period: '981',
    enemy: 'Nhà Tống',
    leaders: ['le-hoan'],
    battles: [
      {
        id: 'tong-viet-981',
        name: 'Chiến tranh Tống – Việt năm 981',
        date: 'Tháng 1 – tháng 4/981',
        place: 'Đại Cồ Việt (Bạch Đằng, Lục Đầu, Chi Lăng, Tây Kết…)',
        summary:
          'Quân Đại Cồ Việt do Lê Hoàn chỉ huy đánh bại quân Tống của Hầu Nhân Bảo, Tôn Toàn Hưng; năm 986 nhà Tống phải công nhận nhà Tiền Lê.',
        wiki: 'Chiến tranh Tống–Việt lần thứ nhất',
        commanders: ['le-hoan'],
        result: 'Đại Cồ Việt chiến thắng',
        forces: [
          { side: 'Đại Cồ Việt', strength: '100.000 quân' },
          { side: 'Nhà Tống', strength: '30.000 – 40.000 quân, 60.000 phu phen' },
        ],
        background:
          'Cuối năm 979, Đinh Tiên Hoàng và Thái tử Đinh Liễn bị ám sát, Đại Cồ Việt rối ren. Quan trấn thủ châu Ung là Hầu Nhân Bảo dâng thư xin đánh; nhà Tống lập Giao Chỉ hành doanh, cử Hầu Nhân Bảo làm Tổng tư lệnh, Tôn Toàn Hưng làm phó, chia quân thủy bộ sang đánh.',
        events:
          'Ngày 24/1/981, thủy quân Tống tiến vào cửa Bạch Đằng, quân Đại Cồ Việt thua trận đầu. Quân Tống lập hành doanh nhưng hai đạo thủy, bộ không liên lạc được, bị tập kích quấy rối liên tục. Lê Hoàn đích thân giữ sông Lục Đầu, dựa vào phòng tuyến Bình Lỗ chặn quân Tống. Hầu Nhân Bảo bị giết trên sông Bạch Đằng (sử cũ chép là ở Chi Lăng); Tôn Toàn Hưng bỏ chạy, đạo quân ở Tây Kết bị truy kích tiêu diệt quá nửa.',
        outcome:
          'Khoảng 80.000 quân Tống chết hoặc bị bắt; các tướng Hầu Nhân Bảo, Quách Quân Biện, Triệu Phụng Huân chết hoặc bị bắt. Lưu Trừng, Giả Thực bị nhà Tống xử chém, Tôn Toàn Hưng bị tội chết. Năm 986, nhà Tống chính thức thừa nhận Lê Hoàn là người cai trị hợp pháp Đại Cồ Việt.',
      },
    ],
  },
  {
    id: 'tong',
    name: 'Kháng chiến chống Tống lần thứ hai',
    period: '1075 – 1077',
    enemy: 'Nhà Tống',
    leaders: ['ly-thuong-kiet'],
    battles: [
      {
        id: 'nhu-nguyet',
        name: 'Trận Như Nguyệt',
        date: '18/1 – 28/2/1077',
        place: 'Sông Như Nguyệt (sông Cầu)',
        summary:
          'Trận quyết định của chiến tranh Tống – Việt, kéo dài nhiều tháng; quân Tống thiệt hại lớn, phải từ bỏ ý chí xâm lược và thừa nhận Đại Việt.',
        wiki: 'Trận Như Nguyệt',
        commanders: ['ly-thuong-kiet'],
        result: 'Chiến thắng quyết định cho Đại Việt',
        forces: [
          { side: 'Đại Việt', strength: '60.000 – 100.000 quân' },
          { side: 'Nhà Tống', strength: '45.000 lính chính quy, 55.000 binh trưng tập, 10.000 ngựa, 200.000 dân phu' },
        ],
        background:
          'Nhà Tống muốn xâm lược Đại Việt và trả thù thất bại lần trước. Cuối 1075 – đầu 1076, nhà Lý đánh đòn phủ đầu phá các căn cứ hậu cần của Tống. Vua Tống Thần Tông vẫn cử Quách Quỳ, Triệu Tiết đem cả bộ binh lẫn thủy binh sang đánh; Lý Thường Kiệt chọn chiến lược phòng thủ.',
        events:
          'Quân Tống tiến tới bờ bắc sông Như Nguyệt, đóng trại chờ thủy binh để vượt sông, nhưng thủy quân Tống bị Lý Kế Nguyên chặn đánh ở cửa sông Bạch Đằng, phải lui về cửa biển. Đầu tháng 2/1077, Quách Quỳ vượt sông mà không có thủy quân hỗ trợ; quân nhà Lý chặn đánh rồi phản công.',
        outcome:
          'Lý Thường Kiệt chủ động giảng hòa để sớm kết thúc chiến tranh, còn cấp thuyền và lương cho Quách Quỳ về nước. Quân Tống mất 76.600 quân và 8 vạn phu, từ bỏ hẳn ý chí xâm lược Đại Việt.',
        image: {
          url: 'images/history/battles/nhu-nguyet.jpg',
          credit: 'Lược đồ trận Như Nguyệt · Lưu Ly · CC BY 3.0',
          page: 'https://commons.wikimedia.org/wiki/File:Trận_Như_Nguyệt.png',
          fit: 'contain',
        },
      },
    ],
  },
  {
    id: 'nguyen-mong',
    name: 'Kháng chiến chống Nguyên Mông',
    period: '1258 – 1288',
    enemy: 'Nguyên Mông',
    leaders: ['tran-thai-tong', 'tran-thanh-tong', 'tran-nhan-tong', 'tran-hung-dao', 'tran-quang-khai'],
    battles: [
      {
        id: 'dong-bo-dau',
        name: 'Trận Đông Bộ Đầu',
        date: '28 – 29/1/1258',
        place: 'Bến Đông Bộ Đầu, cửa ngõ thành Thăng Long (nay là chùa Hòe Nhai, Hà Nội)',
        summary:
          'Vua Trần Thái Tông cùng Thái tử Trần Hoảng dẫn quân ngược sông Nhị đánh úp quân Mông Cổ đang chiếm Thăng Long; quân Mông Cổ thua to, rút chạy về Vân Nam.',
        wiki: 'Đông Bộ Đầu',
        commanders: ['tran-thai-tong', 'tran-thanh-tong'],
        result: 'Đại Việt chiến thắng, quân Mông Cổ rút về Vân Nam',
        background:
          'Năm 1257, việc chiếm Đại Việt nằm trong chiến lược của Mông Cổ nhằm đánh vào sườn Nam Tống. Ngột Lương Hợp Thai đem khoảng 3 vạn quân (kỵ binh Mông Cổ và quân Đại Lý) tấn công; thắng các trận Bình Lệ Nguyên, Phù Lỗ nhưng không diệt được quân chủ lực nhà Trần. Ngày 21/1/1258 quân Trần rút khỏi Thăng Long về Thiên Mạc, quân Mông Cổ chiếm được thành.',
        events:
          'Chiếm kinh đô nhưng kho tàng trống rỗng, quân Mông Cổ thiếu lương. Nửa đêm 28/1/1258, từ Thiên Mạc trên Hoàng Giang, Trần Thái Tông cùng Thái tử Trần Hoảng ngự lâu thuyền ngược sông, bất ngờ đánh thẳng vào quân Mông Cổ ở Đông Bộ Đầu. Quân Mông Cổ chủ quan, không kịp trở tay, bị thua to.',
        outcome:
          'Quân Mông Cổ không giữ nổi Thăng Long, tháo chạy thẳng về Vân Nam, trên đường còn bị thủ lĩnh miền núi Hà Bổng tập kích. Cuộc chiến kết thúc với chiến thắng của Đại Việt; cùng năm, Trần Thái Tông truyền ngôi cho Thái tử Hoảng.',
        image: {
          url: 'images/history/battles/dong-bo-dau.jpg',
          credit: 'Chùa Hòe Nhai, Hà Nội — nơi các nhà sử học xác định là bến Đông Bộ Đầu · Viethavvh · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Hoe_Nhai_pagoda.jpg',
        },
      },
      {
        id: 'chuong-duong',
        name: 'Trận Chương Dương',
        date: 'Cuối tháng 6/1285',
        place: 'Bến Chương Dương, nay thuộc xã Chương Dương, Hà Nội',
        summary:
          'Quân Trần do Thượng tướng Thái sư Trần Quang Khải chỉ huy tập kích phá tan căn cứ thủy quân Nguyên, mở thời cơ tái chiếm kinh thành Thăng Long.',
        wiki: 'Trận Chương Dương độ',
        commanders: ['tran-quang-khai', 'tran-hung-dao'],
        result: 'Quân Nguyên thất bại',
        background:
          'Cuối tháng 1/1285, nhà Nguyên huy động lực lượng đông gấp hàng chục lần lần trước tấn công Đại Việt. Dù có vương hầu nhà Trần mang tư tưởng đầu hàng, quân dân Đại Việt dưới sự lãnh đạo của Trần Hưng Đạo, Thượng hoàng Trần Thánh Tông và vua Trần Nhân Tông vẫn kháng chiến (theo bài Chiến tranh Nguyên Mông – Đại Việt lần 2).',
        events:
          'Tại bến Chương Dương, các lực lượng quân Trần tập kích phá tan căn cứ thủy quân Nguyên; hầu hết tàu chiến của quân Nguyên bị đốt cháy và đánh chìm, tướng Nguyên là Sogetu bị giết.',
        outcome:
          'Chiến thắng mở ra thời cơ đánh úp đại bản doanh quân Nguyên, tái chiếm kinh thành Thăng Long. Cùng với chiến thắng ở cửa Hàm Tử, đây là chiến thắng huy hoàng của quân Trần; tương truyền trong tiệc khao quân ở Thăng Long, Trần Quang Khải ứng khẩu ngâm bài thơ Tòng giá hoàn kinh.',
        image: {
          url: 'images/history/battles/chuong-duong.jpg',
          credit: 'Bản đồ kháng chiến chống Nguyên Mông lần 2 (1285) · Lưu Ly · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Chongquannguyenlan2-thử.gif',
          fit: 'contain',
        },
      },
      {
        id: 'bach-dang-1288',
        name: 'Trận Bạch Đằng',
        date: '1288',
        place: 'Sông Bạch Đằng',
        summary:
          'Quân Đại Việt do Trần Hưng Đạo cùng Thượng hoàng Trần Thánh Tông, vua Trần Nhân Tông chỉ huy đại thắng; hơn 4 vạn quân Nguyên bị giết hoặc bắt, tướng Ô Mã Nhi bị bắt sống.',
        wiki: 'Trận Bạch Đằng (1288)',
        commanders: ['tran-thanh-tong', 'tran-nhan-tong', 'tran-hung-dao'],
        result: 'Quân Đại Việt đại thắng, nền độc lập được bảo toàn',
        background:
          'Năm 1287, nhà Nguyên mở cuộc xâm lược Đại Việt lần thứ ba nhưng chỉ chiếm được kinh thành Thăng Long bỏ trống; đoàn thuyền lương của Trương Văn Hổ bị Trần Khánh Dư đánh tan ở Vân Đồn. Rơi vào thế bất lợi, quân Nguyên tổ chức rút về theo nhiều hướng.',
        events:
          'Khi Ô Mã Nhi dẫn đoàn thuyền vào sông Bạch Đằng lúc nước lớn, thủy quân nhà Trần ra giao chiến rồi giả thua, nhử quân Nguyên vào khúc sông đã đóng cọc. Đợi thủy triều xuống, quân Trần quay lại đánh thẳng vào đội hình địch, thủy quân các lộ dàn thuyền chặn đầu trên sông.',
        outcome:
          'Quân Trần đại thắng, bắt hơn 400 chiến thuyền, bắt sống Ô Mã Nhi, Tích Lệ Cơ, Phàn Tiếp; hơn 4 vạn quân Nguyên bị loại khỏi vòng chiến. Đây là trận thủy chiến lớn nhất trong lịch sử kháng chiến của dân tộc, kết thúc thắng lợi cuộc kháng chiến chống Nguyên Mông lần thứ ba.',
        image: {
          url: 'images/history/battles/bach-dang-1288.jpg',
          credit: 'Lược đồ trận Bạch Đằng 1288 · Lưu Ly · CC BY 3.0',
          page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Bạch_Đằng_1288_map_vi.png',
          fit: 'contain',
        },
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
        place: 'Tốt Động và Chúc Động, nay thuộc Hà Nội',
        summary:
          'Nghĩa quân Lam Sơn do Lý Triện, Đinh Lễ, Nguyễn Xí chỉ huy đánh bại quân Minh đông gấp nhiều lần do Vương Thông chỉ huy.',
        wiki: 'Trận Tốt Động – Chúc Động',
        result: 'Nghĩa quân Lam Sơn chiến thắng',
        forces: [
          { side: 'Nghĩa quân Lam Sơn', strength: '5.000 – 10.000 quân' },
          { side: 'Nhà Minh', strength: '54.000 – 100.000 quân tại Đông Quan, khoảng 4/5 tham chiến' },
        ],
        background:
          'Sau khi nhà Hồ mất năm 1407, đất Đại Ngu bị nhà Minh sáp nhập thành Giao Chỉ. Năm 1418, Lê Lợi dấy binh ở Lam Sơn; đến 1426 quân Lam Sơn đã làm chủ từ Thanh Hóa tới Thuận Hóa, nhà Minh sai Vương Thông đem quân sang tiếp viện.',
        events:
          'Sáng 7/11/1426, quân Minh chia hai đạo tiến đánh doanh trại Lam Sơn. Đạo chính binh của Vương Thông lọt vào trận địa mai phục ở Tốt Động; trời mưa, đồng ruộng lầy lội khiến kỵ binh và bộ binh Minh sa lầy. Tại Chúc Động, hậu quân Minh vừa vượt sông Đáy thì bị phục binh tiêu diệt.',
        outcome:
          'Đây là bước ngoặt quyết định của cuộc chiến chống Minh: quân Minh bị đẩy vào thế cố thủ trong các thành, Lê Lợi tiến quân ra Bắc vây Đông Quan. Quân Lam Sơn thu được vô số ngựa, khí giới; Vương Thông phải phá chuông Quy Điền và vạc Phổ Minh để làm vũ khí.',
        image: {
          url: 'images/history/battles/tot-dong.jpg',
          credit: 'Lược đồ trận Tốt Động – Chúc Động · Thanhliencusi · CC BY-SA 4.0',
          page: 'https://commons.wikimedia.org/wiki/File:Trận_Tốt_Động_Chúc_Động_1426.jpg',
          fit: 'contain',
        },
      },
      {
        id: 'chi-lang-xuong-giang',
        name: 'Chiến dịch Chi Lăng – Xương Giang',
        date: '18/9 – cuối 10/1427',
        place: 'Chi Lăng, Xương Giang',
        summary:
          'Nghĩa quân Lam Sơn đánh tan 15 vạn viện binh nhà Minh, giết Liễu Thăng, Mộc Thạnh bỏ chạy; Vương Thông phải giảng hòa với Lê Lợi.',
        wiki: 'Trận Chi Lăng – Xương Giang',
        commanders: ['le-loi', 'nguyen-trai'],
        result: 'Nghĩa quân Lam Sơn chiến thắng',
        forces: [
          { side: 'Nhà Minh', strength: 'Liễu Thăng 10 vạn, Mộc Thạnh 5 vạn quân (theo Đại Việt sử ký toàn thư)' },
        ],
        background:
          'Sau thất bại ở Tốt Động – Chúc Động, Vương Thông phải cố thủ trong thành Đông Quan và xin giảng hòa, nhưng vẫn chờ viện binh. Nhà Minh sai Liễu Thăng đem hơn 10 vạn quân đánh vào cửa Pha Lũy, Mộc Thạnh đem 5 vạn quân đánh vào cửa Lê Hoa.',
        events:
          'Lê Lợi sai Lê Sát, Lưu Nhân Chú cùng 1 vạn quân tinh nhuệ và 5 thớt voi mai phục ở ải Chi Lăng. Trần Lựu vừa đánh vừa lui để nhử, Liễu Thăng kiêu ngạo đuổi theo vào trận địa. Quân Lam Sơn tiếp tục đánh ở Cần Trạm, Phố Cát rồi vây diệt quân Minh ở Xương Giang.',
        outcome:
          'Chưa đầy một tháng, đạo viện binh 10 vạn quân bị tiêu diệt hoàn toàn ở Xương Giang, bộ chỉ huy quân Minh chết hoặc bị bắt gần hết; Mộc Thạnh rút chạy và bị truy kích. Vương Thông phải nghị hòa và tự ý rút quân về nước.',
        image: {
          url: 'images/history/battles/chi-lang-xuong-giang.jpg',
          credit: 'Lược đồ trận Chi Lăng – Xương Giang · Lưu Ly · CC BY 3.0',
          page: 'https://commons.wikimedia.org/wiki/File:Trận_Chi_Lăng_-_Xương_Giang.png',
          fit: 'contain',
        },
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
        result: 'Quân Tây Sơn đại thắng',
        forces: [
          { side: 'Tây Sơn', strength: 'Khoảng 20.000 quân, 55 tàu chiến, 100 thuyền buồm, 300 xuồng nhỏ' },
          { side: 'Liên quân Xiêm – Nguyễn', strength: 'Khoảng 25.000 – 30.000 quân, 300 chiến thuyền Xiêm' },
        ],
        background:
          'Năm 1783, quân Tây Sơn do Nguyễn Huệ, Nguyễn Lữ chỉ huy vào Nam Bộ đánh bại quân chúa Nguyễn. Nguyễn Ánh thua chạy, quyết định thần phục Xiêm La để nước này xuất quân cứu viện.',
        events:
          'Nguyễn Huệ khảo sát địa hình, chọn khúc sông Mỹ Tho dài khoảng 7 km từ Rạch Gầm đến Xoài Mút làm trận địa. Thủy quân Tây Sơn giấu kín trên các sông nhánh, pháo binh và bộ binh phục hai bên bờ và trên cù lao Thới Sơn; khi liên quân Xiêm – Nguyễn lọt vào, quân Tây Sơn đổ ra đánh từ nhiều phía.',
        outcome:
          'Liên quân thiệt hại khoảng 40.000 quân Xiêm và 3.000 quân Nguyễn (theo hộp thông tin bài wiki). Chiêu Tăng, Chiêu Sương cùng vài nghìn tàn quân chạy qua Chân Lạp về Xiêm, Nguyễn Ánh lại phải lưu vong.',
        image: {
          url: 'images/history/battles/rach-gam.jpg',
          credit: 'Khu di tích chiến thắng Rạch Gầm – Xoài Mút · Bùi Thụy Đào Nguyên · CC BY-SA 3.0',
          page: 'https://commons.wikimedia.org/wiki/File:Khu_di_tích_chiến_thắng_Gạch_Gầm_Xoài_Mút.jpg',
          position: '50% 60%',
        },
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
        date: 'Tết Kỷ Dậu, đến 30/1/1789',
        place: 'Thăng Long',
        summary:
          'Vua Quang Trung hành quân thần tốc, đánh tan quân Thanh của Tôn Sĩ Nghị đông gấp 2–3 lần và chiếm lại kinh đô Thăng Long chỉ trong 5 ngày.',
        wiki: 'Trận Ngọc Hồi – Đống Đa',
        commanders: ['quang-trung'],
        result: 'Tây Sơn chiến thắng, quân Thanh rút khỏi Đại Việt',
        forces: [
          { side: 'Tây Sơn', strength: 'Khoảng 100.000 quân chính quy và dân binh, 100 – 300 voi chiến, 350 đại bác' },
          { side: 'Nhà Thanh và nhà Lê', strength: 'Số liệu khác nhau; sử Trung Quốc ghi 29.500 quân chính quy, 6.000 quân địa phương, khoảng 12 vạn dân binh (chưa tính quân Lê Chiêu Thống)' },
        ],
        background:
          'Cuối thế kỷ 18, Đại Việt chia cắt Đàng Trong – Đàng Ngoài. Anh em Tây Sơn khởi nghĩa năm 1771, lật đổ chúa Nguyễn (1783) rồi diệt chúa Trịnh (1786). Vua Lê Chiêu Thống cầu viện nhà Thanh; quân Thanh do Tôn Sĩ Nghị chỉ huy tràn vào Đại Việt.',
        events:
          'Đêm 30 Tết, quân Tây Sơn từ phòng tuyến Tam Điệp xuất phát, hành quân thần tốc diệt các tiền đồn. Mồng 3 Tết, Quang Trung vây và dụ hàng đồn Hà Hồi, tiếp đó diệt đồn Ngọc Hồi, Đống Đa rồi tiến vào Thăng Long.',
        outcome:
          'Quân Thanh thiệt hại rất nặng — sử nhà Thanh ghi 11.780 người tử trận, thực tế có lẽ khoảng một nửa lực lượng bị tiêu diệt hoặc bị bắt — và phải rút khỏi Đại Việt. Nhà Tây Sơn thay thế nhà Hậu Lê, lần đầu thống nhất đất nước.',
        image: {
          url: 'images/history/battles/ngoc-hoi-dong-da.jpg',
          credit: 'Tranh cung đình nhà Thanh về chiến dịch 1788–1789 (trận sông Thọ Xương) · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Battle_at_the_River_Tho-xuong.jpg',
        },
      },
    ],
  },
  {
    id: 'phap',
    name: 'Kháng chiến chống Pháp',
    period: '1945 – 1954',
    enemy: 'Pháp',
    leaders: ['ho-chi-minh', 'vo-nguyen-giap', 'hoang-van-thai'],
    battles: [
      {
        id: 'viet-bac',
        name: 'Chiến dịch Việt Bắc',
        date: '7/10 – 22/12/1947',
        place: 'Việt Bắc',
        summary:
          'Phản công cuộc hành quân Léa của Pháp; Pháp không tiêu diệt được đầu não kháng chiến và quân chủ lực, thất bại về chiến lược.',
        wiki: 'Chiến dịch Việt Bắc',
        commanders: ['vo-nguyen-giap', 'hoang-van-thai'],
        result: 'Pháp chiếm một số khu vực biên giới nhưng thất bại về chiến lược',
        background:
          'Việt Bắc có địa thế hiểm trở; từ cuối năm 1946, các cơ quan Trung ương Đảng, Chính phủ, Bộ Tổng chỉ huy lần lượt rời Hà Nội lên đây để lãnh đạo kháng chiến lâu dài. Pháp mở cuộc hành quân Léa nhằm tiêu diệt đầu não kháng chiến.',
        events:
          'Pháp huy động 12.000 quân cùng hầu hết máy bay ở Đông Dương; ngày 7/10/1947 nhảy dù xuống thị xã Bắc Kạn, lầm tưởng đây là “thủ đô mới” của Việt Minh. Các cơ quan kháng chiến đã chia nhỏ, di chuyển liên tục nên Pháp không bắt được đầu não.',
        outcome:
          'Theo Việt Minh, hơn 6.000 lính Pháp bị loại khỏi vòng chiến, 18 máy bay bị bắn hạ, 16 tàu chiến bị đánh chìm. Pháp không tiêu diệt được đầu não kháng chiến, phải chuyển từ đánh nhanh thắng nhanh sang đánh lâu dài.',
        image: {
          url: 'images/history/battles/viet-bac.jpg',
          credit: 'Lược đồ cuộc tấn công của Pháp mùa thu 1947 · CC BY-SA 3.0',
          page: 'https://commons.wikimedia.org/wiki/File:Map_tonkin_autumn_1947.jpg',
          fit: 'contain',
        },
      },
      {
        id: 'bien-gioi',
        name: 'Chiến dịch Biên giới',
        date: '16/9 – 14/10/1950',
        place: 'Cao Bằng, Lạng Sơn',
        summary:
          'Phá vòng vây Pháp bố trí quanh căn cứ địa Việt Bắc, khai thông biên giới Việt – Trung để tiếp nhận viện trợ, mở rộng căn cứ địa.',
        wiki: 'Chiến dịch Biên giới',
        commanders: ['vo-nguyen-giap', 'hoang-van-thai'],
        result: 'Thắng lợi chiến lược của Quân đội nhân dân Việt Nam',
        forces: [
          { side: 'Quân đội nhân dân Việt Nam', strength: 'Khoảng 29.500 quân, 20 khẩu pháo' },
          { side: 'Pháp và Quốc gia Việt Nam', strength: '12.000 quân, 27 khẩu pháo, máy bay hỗ trợ' },
        ],
        background:
          'Đến năm 1949, Pháp vẫn chưa chiếm được Việt Bắc. Đầu năm 1950, Trung Quốc rồi Liên Xô và các nước Đông Âu công nhận Việt Nam Dân chủ Cộng hòa; Việt Minh mở chiến dịch để phá vòng vây biên giới.',
        events:
          'Ngày 16/9/1950, hai trung đoàn 174 và 209 do Hoàng Văn Thái chỉ huy đánh chiếm cứ điểm Đông Khê, cô lập Cao Bằng. Binh đoàn Le Page lên đón binh đoàn Charton rút khỏi Cao Bằng; cả hai bị phục kích và tiêu diệt trên đường số 4. Đợt cuối (9 – 14/10) truy kích quân Pháp rút chạy.',
        outcome:
          'Vòng vây biên giới bị đập tan, hành lang Đông – Tây bị chọc thủng. Pháp tổn thất hơn 8.000 lính — thất bại chưa từng có trong chiến tranh thuộc địa của Pháp — và mất quyền chủ động quân sự.',
        image: {
          url: 'images/history/battles/bien-gioi.jpg',
          credit: 'Hồ Chí Minh tại mặt trận Đông Khê, 1950 · Không rõ tác giả · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_in_Dong_Khe,_1950.jpg',
          position: '50% 30%',
        },
      },
      {
        id: 'dien-bien-phu',
        name: 'Chiến dịch Điện Biên Phủ',
        date: '13/3 – 7/5/1954',
        place: 'Lòng chảo Mường Thanh, nay thuộc tỉnh Điện Biên',
        summary:
          'Trận lớn nhất Chiến tranh Đông Dương; Quân đội nhân dân Việt Nam do Đại tướng Võ Nguyên Giáp chỉ huy buộc quân Pháp đầu hàng sau 2 tháng cầm cự.',
        wiki: 'Chiến dịch Điện Biên Phủ',
        commanders: ['vo-nguyen-giap', 'ho-chi-minh'],
        result: 'Thắng lợi quyết định của Việt Nam Dân chủ Cộng hòa',
        forces: [
          { side: 'Quân đội nhân dân Việt Nam', strength: '53.800 quân, sau tăng thêm khoảng 8.000; 261.451 dân công' },
          { side: 'Liên hiệp Pháp', strength: 'Tăng quân tới 16.000 người' },
        ],
        background:
          'Lo ngại mất Thượng Lào, tướng Navarre cho lập tập đoàn cứ điểm ở Điện Biên Phủ — thung lũng dài 15 km, rộng 5 km ở Tây Bắc, có sân bay dã chiến, bao quanh là núi đồi.',
        events:
          'Chiến dịch chia ba đợt: đợt 1 diệt các cứ điểm Him Lam, đồi Độc Lập, Bản Kéo; đợt 2 đánh các cao điểm phía đông, đào hào vây siết; đợt 3 (1 – 7/5) đánh dứt điểm A1, C1 và tổng công kích các vị trí còn lại.',
        outcome:
          'Toàn bộ quân Pháp ở Điện Biên Phủ bị tiêu diệt hoặc bị bắt, trong đó 11.721 tù binh. Hiệp định Genève được ký kết, Pháp trao trả độc lập cho ba nước Đông Dương.',
        image: {
          url: 'images/history/battles/dien-bien-phu.jpg',
          credit: 'Cắm cờ trên hầm chỉ huy của Pháp, 1954 · Quân đội nhân dân Việt Nam · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Victory_in_Battle_of_Dien_Bien_Phu.jpg',
        },
      },
    ],
  },
  {
    id: 'my',
    name: 'Kháng chiến chống Mỹ',
    period: '1955 – 1975',
    enemy: 'Hoa Kỳ và Việt Nam Cộng hòa',
    leaders: ['ho-chi-minh', 'le-duan', 'vo-nguyen-giap', 'nguyen-chi-thanh', 'van-tien-dung', 'hoang-van-thai', 'le-trong-tan'],
    battles: [
      {
        id: 'van-tuong',
        name: 'Trận Vạn Tường',
        date: '18/8/1965',
        place: 'Thôn Vạn Tường, nay là xã Vạn Tường, Quảng Ngãi',
        summary:
          'Trận đánh quy mô đầu tiên trên bộ giữa quân đội Mỹ và Quân Giải phóng miền Nam, trận chính của cuộc hành quân Starlite thử nghiệm chiến thuật “tìm diệt”.',
        wiki: 'Trận Vạn Tường',
        result: 'Cả hai bên đều tuyên bố chiến thắng',
        forces: [
          { side: 'Hoa Kỳ', strength: 'Khoảng 9.000 quân, 105 xe tăng – xe bọc thép, 100 trực thăng, 70 máy bay phản lực, 6 tàu chiến' },
          { side: 'Quân Giải phóng', strength: 'Gần 2.000 người: Trung đoàn Ba Gia (khoảng 1.500), bộ đội địa phương và du kích' },
        ],
        background:
          'Cuối tháng 7/1965, sau Chiến dịch Ba Gia, Trung đoàn 1 (Trung đoàn Ba Gia) của Quân khu V về đóng quân ở khu vực Vạn Tường để chấn chỉnh. Phát hiện sự di chuyển này, quân Mỹ ở Vùng I mở cuộc hành quân Starlite đánh vào trung đoàn, cách căn cứ Chu Lai 17 km.',
        events:
          'Sáng 18/8/1965, sau đợt ném bom và pháo kích từ biển, thủy quân lục chiến Mỹ đổ bộ bằng trực thăng và tàu đổ bộ, bao vây Vạn Tường từ phía nam và phía tây. Quân Giải phóng chặn đánh từ trong hầm hố, đánh vào sau lưng cánh quân đổ bộ đường biển, bắn rơi nhiều trực thăng. Đêm 18 rạng 19/8, Trung đoàn Ba Gia rút được phần lớn lực lượng ra khỏi vòng vây.',
        outcome:
          'Mỹ tuyên bố tiêu diệt 599 – 614 quân Giải phóng nhưng chỉ thu được 109 vũ khí, và thừa nhận 45 chết, 203 bị thương; phía Giải phóng cho biết đã loại 919 lính Mỹ, bắn cháy 22 xe tăng – xe bọc thép, hạ 13 máy bay. Quân Mỹ không đánh bại được Trung đoàn Ba Gia.',
        image: {
          url: 'images/history/battles/van-tuong.jpg',
          credit: 'Thủy quân lục chiến Mỹ trong cuộc hành quân Starlite, 18/8/1965 · R. W. Savatt Jr. (USMC) · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Operation_Starlite_1965.jpg',
        },
      },
      {
        id: 'tet-mau-than',
        name: 'Tổng tiến công Tết Mậu Thân',
        date: 'Ba đợt trong năm 1968, mở đầu đêm 30/1',
        place: 'Hầu hết các đô thị miền Nam',
        summary:
          'Tổng tiến công và nổi dậy vào dịp Tết Mậu Thân, đánh vào các khu vực trọng yếu của quân đội Mỹ và Việt Nam Cộng hòa; bước ngoặt của chiến tranh.',
        wiki: 'Sự kiện Tết Mậu Thân',
        commanders: ['le-duan', 'hoang-van-thai', 'van-tien-dung'],
        result: 'Hai bên thiệt hại nặng; bước ngoặt chiến lược của chiến tranh',
        forces: [
          { side: 'Quân Giải phóng', strength: '277.000 (theo tài liệu của quân Giải phóng)' },
          { side: 'Hoa Kỳ, Việt Nam Cộng hòa và đồng minh', strength: 'Khoảng 1,33 triệu quân (cuối năm 1967)' },
        ],
        background:
          'Từ năm 1965, Mỹ đưa quân chiến đấu vào miền Nam và ném bom miền Bắc, đẩy chiến tranh lên quy mô chưa từng có với chiến lược Chiến tranh cục bộ.',
        events:
          'Cuộc tổng tiến công gồm ba đợt (30/1 – 28/3, 5/5 – 15/6, 17/8 – 30/9/1968), đánh vào hầu hết các đô thị miền Nam, trọng điểm là Sài Gòn và Huế; nhiều Bộ Tư lệnh tiền phương được lập để chỉ huy các hướng.',
        outcome:
          'Hoa Kỳ và Việt Nam Cộng hòa thắng về chiến thuật, còn Việt Nam Dân chủ Cộng hòa và Mặt trận Dân tộc Giải phóng thắng về chiến lược, chính trị và ngoại giao: chương trình “bình định” tan vỡ từng mảng, chiến lược Chiến tranh cục bộ phá sản.',
        image: {
          url: 'images/history/battles/tet-mau-than.jpg',
          credit: 'Bản đồ Tổng tiến công Tết Mậu Thân · West Point · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Tet_Offensive_map.png',
          fit: 'contain',
        },
      },
      {
        id: 'duong-9-nam-lao',
        name: 'Chiến dịch Đường 9 – Nam Lào',
        date: '8/2 – 24/3/1971',
        place: 'Đường 9, Nam Lào (Bản Đông, Tchepone)',
        summary:
          'Quân Giải phóng đánh bại cuộc hành quân Lam Sơn 719 của Quân lực Việt Nam Cộng hòa (có Mỹ yểm trợ) nhằm cắt đường mòn Hồ Chí Minh ở Nam Lào.',
        wiki: 'Chiến dịch Lam Sơn 719',
        commanders: ['le-trong-tan'],
        result: 'Chiến dịch của Mỹ và Việt Nam Cộng hòa thất bại; thắng lợi chiến lược của Quân Giải phóng',
        forces: [
          { side: 'Quân Giải phóng', strength: '60.000 quân, 88 xe tăng, 300 pháo phòng không' },
          { side: 'Mỹ, Việt Nam Cộng hòa, Vương quốc Lào', strength: 'Khoảng 50.000 quân, 450 xe tăng – thiết giáp, hơn 800 trực thăng, 300 máy bay cường kích' },
        ],
        background:
          'Đường Trường Sơn là tuyến hậu cần quan trọng của Quân Giải phóng. Năm 1971, Việt Nam Cộng hòa mở cuộc hành quân Lam Sơn 719 vào Nam Lào để phá hệ thống hậu cần và cắt đường mòn ở Tchepone (Xê-pôn) — cũng là phép thử cho chiến lược Việt Nam hóa chiến tranh khi Mỹ rút quân.',
        events:
          'Ngày 8/2/1971, Quân lực Việt Nam Cộng hòa vượt biên giới theo đường 9. Quân Giải phóng đã dự đoán và bày sẵn thế trận: dùng pháo phòng không cô lập các căn cứ hỏa lực, rồi lần đầu phản công kiểu chính quy với bộ binh, xe tăng, pháo hạng nặng. Đầu tháng 3, Quân Giải phóng vây đánh cụm cứ điểm Bản Đông; Việt Nam Cộng hòa đổ quân bằng trực thăng xuống Tchepone rồi rút lui từ 9/3 qua chuỗi ổ phục kích dọc đường 9.',
        outcome:
          'Mục tiêu cắt đường mòn Hồ Chí Minh không đạt được; chiến dịch là thảm họa với Quân lực Việt Nam Cộng hòa, làm tiêu tan những đơn vị thiện chiến nhất, và cho thấy thất bại của chiến lược Việt Nam hóa chiến tranh. Mỹ mất 108 trực thăng bị phá hủy, 618 chiếc khác bị bắn hỏng.',
        image: {
          url: 'images/history/battles/duong-9-nam-lao.jpg',
          credit: 'Lược đồ cuộc hành quân Lam Sơn 719, tháng 2/1971 · Quân đội Hoa Kỳ · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Map_Lam_Son_719.jpg',
          fit: 'contain',
        },
      },
      {
        id: 'thanh-co-quang-tri',
        name: 'Trận Thành cổ Quảng Trị',
        date: '28/6 – 16/9/1972',
        place: 'Thành cổ Quảng Trị',
        summary:
          '81 ngày đêm Quân Giải phóng giữ Thành cổ trước cuộc phản công của Quân lực Việt Nam Cộng hòa có hỏa lực Mỹ yểm trợ — một trong những trận ác liệt nhất của Chiến dịch Xuân – Hè 1972.',
        wiki: 'Trận Thành cổ Quảng Trị',
        commanders: ['van-tien-dung'],
        result: 'Việt Nam Cộng hòa chiếm lại Thành cổ; mỗi bên kiểm soát một nửa tỉnh Quảng Trị',
        forces: [
          { side: 'Quân Giải phóng', strength: 'Khoảng 14.000' },
          { side: 'Việt Nam Cộng hòa và Hoa Kỳ', strength: 'Khoảng 35.000, không quân và hải quân Mỹ yểm trợ (khoảng 120.000 tấn bom)' },
        ],
        background:
          'Năm 1972, Quân Giải phóng tổng tấn công trên ba chiến trường, hướng chủ yếu là tỉnh Quảng Trị. Hội nghị Paris đang có lợi cho phía Việt Nam Dân chủ Cộng hòa; Hoa Kỳ và Việt Nam Cộng hòa muốn chiếm lại Quảng Trị trước khi hội nghị họp lại ngày 13/7.',
        events:
          'Từ 26/6/1972, không quân Mỹ ném bom rải thảm Quảng Trị. Ngày 28/6, tướng Ngô Quang Trưởng mở chiến dịch Lam Sơn 72; quân dù và thủy quân lục chiến tiến tới ngoại vi thị xã nhưng không lọt vào được. Quân Giải phóng đưa thêm các sư đoàn 325, 312 vào giữ Quảng Trị, mỗi đêm bổ sung người qua sông Thạch Hãn vào Thành.',
        outcome:
          'Đêm 15 rạng 16/9/1972, Quân Giải phóng rút khỏi Thành cổ, thủy quân lục chiến Việt Nam Cộng hòa chiếm lại Thành nhưng không giành lại được nửa bắc tỉnh Quảng Trị. Kế hoạch tái chiếm bị kéo dài 3 tháng so với dự kiến 2 tuần, giúp phái đoàn Việt Nam Dân chủ Cộng hòa giữ thế có lợi ở Hội nghị Paris.',
        image: {
          url: 'images/history/battles/thanh-co-quang-tri.jpg',
          credit: 'Cổng chính Thành cổ Quảng Trị · Bùi Thụy Đào Nguyên · CC BY-SA 3.0',
          page: 'https://commons.wikimedia.org/wiki/File:Thành_cổ_Quảng_Trị_4.jpg',
        },
      },
      {
        id: 'dbp-tren-khong',
        name: 'Điện Biên Phủ trên không',
        date: '18 – 30/12/1972',
        place: 'Hà Nội, Hải Phòng và miền Bắc',
        summary:
          'Trận không chiến cuối cùng giữa Hoa Kỳ và Việt Nam Dân chủ Cộng hòa; Mỹ dùng B-52 ném bom rải thảm Hà Nội, Hải Phòng và nhiều nơi trong 12 ngày đêm.',
        wiki: 'Chiến dịch Linebacker II',
        commanders: ['le-duan', 'van-tien-dung'],
        result: 'Cả hai bên tuyên bố chiến thắng',
        forces: [
          { side: 'Việt Nam Dân chủ Cộng hòa', strength: '23 tiểu đoàn tên lửa SA-2, khoảng 50 máy bay MiG' },
          { side: 'Hoa Kỳ', strength: '197 – 207 B-52, 1.077 máy bay chiến thuật' },
        ],
        background:
          'Cuối tháng 11/1972, đàm phán Paris lâm vào bế tắc. Hoa Kỳ mở đợt ném bom cuối cùng nhằm ép Việt Nam Dân chủ Cộng hòa và giảm sự hỗ trợ cho chiến trường miền Nam.',
        events:
          'Tổng cộng 741 lượt B-52 vào ném bom miền Bắc, cùng 3.920 lượt máy bay chiến thuật hỗ trợ; hơn 36.000 tấn bom được thả. B-52 ném bom ban đêm vào Hà Nội, Hải Phòng; ban ngày máy bay chiến thuật đánh sân bay và trận địa tên lửa.',
        outcome:
          'Ngay đêm đầu, ba B-52 bị tên lửa SAM bắn rơi (theo số liệu Mỹ); Nixon phải giảm quy mô, chuyển hướng không kích ra ngoài Hà Nội. Sau chiến dịch, Hiệp định Paris được ký kết.',
        image: {
          url: 'images/history/battles/dbp-tren-khong.jpg',
          credit: 'Mảnh xác B-52 trưng bày ở Hà Nội, 2012 · calflier001 · CC BY-SA 2.0',
          page: 'https://commons.wikimedia.org/wiki/File:B52_WRECKAGE_B52_VICTORY_CENTRE_HUU_TIEP_LAKE_BA_DINH_DISTRICT_HANOI_FEB_2012_(6817999066).jpg',
        },
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
        result: 'Chiến thắng quyết định của Quân Giải phóng miền Nam',
        forces: [
          { side: 'Quân Giải phóng', strength: '65.141 người (43.020 quân chủ lực)' },
          { side: 'Việt Nam Cộng hòa', strength: '78.300 người, 488 xe tăng – thiết giáp, 134 máy bay chiến đấu' },
        ],
        background:
          'Buôn Ma Thuột nằm ở ngã ba hai đường chiến lược 14 và 21, được hơn 8.000 lính bảo vệ, nhưng Quân lực Việt Nam Cộng hòa chỉ lo bố trí lực lượng đối phó ở phía bắc Tây Nguyên.',
        events:
          '2 giờ sáng 10/3/1975, Quân Giải phóng tiến công Buôn Ma Thuột; các trận phản kích tái chiếm ngày 11 và 13/3 đều thất bại. Tổng thống Nguyễn Văn Thiệu quyết định rút khỏi Tây Nguyên theo đường số 7, cuộc rút quân biến thành thảm họa.',
        outcome:
          'Hơn 3/4 quân số Việt Nam Cộng hòa ở Tây Nguyên bị chết, bị bắt hoặc tan rã, hầu hết vũ khí hạng nặng bị phá hủy hoặc thu giữ — mở đầu cho cuộc Tổng tấn công mùa Xuân 1975.',
        image: {
          url: 'images/history/battles/tay-nguyen.jpg',
          credit: 'Tượng đài Chiến thắng Buôn Ma Thuột · Canpark · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:Victory_Central_Highlands.jpg',
          position: '50% 30%',
        },
      },
      {
        id: 'hue-da-nang',
        name: 'Chiến dịch Huế – Đà Nẵng',
        date: '5 – 29/3/1975',
        place: 'Huế, Đà Nẵng và các tỉnh Trung Trung Bộ',
        summary:
          'Một trong các chiến dịch lớn của Tổng tấn công và nổi dậy mùa Xuân 1975; Quân đoàn I Việt Nam Cộng hòa phải bỏ toàn bộ Quân khu I và tan rã.',
        wiki: 'Chiến dịch Huế – Đà Nẵng',
        commanders: ['le-trong-tan'],
        result: 'Chiến thắng quyết định của Quân Giải phóng miền Nam',
        forces: [
          { side: 'Quân Giải phóng', strength: 'Khoảng 60.000 quân, 168 xe tăng – thiết giáp' },
          { side: 'Việt Nam Cộng hòa', strength: '134.000 quân chủ lực và địa phương, 449 xe tăng – xe bọc thép, 373 máy bay' },
        ],
        background:
          'Một ngày sau khi Chiến dịch Tây Nguyên mở màn, Quân Giải phóng mở chiến dịch ở Trị – Thiên, gồm ba chiến dịch gối nhau: Trị Thiên – Huế, Nam – Ngãi và Đà Nẵng. Tổng thống Nguyễn Văn Thiệu liên tục thay đổi lệnh: khi thì giữ Huế, khi lại bỏ Huế để chỉ giữ Đà Nẵng.',
        events:
          'Ngày 5/3/1975, chiến dịch mở màn bằng trận phục kích trên đèo Hải Vân và đánh sập cầu An Lỗ phía bắc Huế. Trưa đến chiều 25/3, các mục tiêu quan trọng ở Huế như căn cứ Mang Cá, Đại Nội bị chiếm. Sáng 29/3, các chốt trên đèo Hải Vân bị tràn ngập; chiều cùng ngày các sư đoàn 2, 304, 324, 325 và lữ đoàn thiết giáp 203 tiến vào Đà Nẵng.',
        outcome:
          'Chỉ trong khoảng 25 ngày, Việt Nam Cộng hòa mất toàn bộ Quân khu I; trên 140.000 quân bị tiêu diệt, bị bắt, đầu hàng hoặc tan rã, hầu hết vũ khí bị phá hủy hoặc thu giữ. Tuyến phòng thủ lùi xuống tận Ninh Thuận, mở thời cơ cho trận quyết chiến cuối cùng.',
        image: {
          url: 'images/history/battles/hue-da-nang.jpg',
          credit: 'Lược đồ các hướng tấn công ở Quân khu I, tháng 3/1975 (góc nhìn phía Mỹ) · U.S. Army Center of Military History · Public domain',
          page: 'https://commons.wikimedia.org/wiki/File:HCMC8.jpg',
          fit: 'contain',
        },
      },
      {
        id: 'ho-chi-minh',
        name: 'Chiến dịch Hồ Chí Minh',
        date: '26 – 30/4/1975',
        place: 'Sài Gòn – Gia Định và đồng bằng sông Cửu Long',
        summary:
          'Chiến dịch cuối cùng của cuộc Tổng tấn công mùa Xuân 1975, kết thúc Chiến tranh Việt Nam, dẫn tới thống nhất đất nước năm 1976.',
        wiki: 'Chiến dịch Hồ Chí Minh',
        commanders: ['vo-nguyen-giap', 'van-tien-dung', 'hoang-van-thai', 'le-trong-tan'],
        result: 'Việt Nam Cộng hòa đầu hàng, đất nước thống nhất',
        forces: [
          { side: 'Quân Giải phóng', strength: '250.000 bộ đội chủ lực, 20.000 bộ đội địa phương' },
          { side: 'Việt Nam Cộng hòa', strength: 'Quân đoàn III: 245.000, Quân đoàn IV: 175.000 binh sĩ' },
        ],
        background:
          'Sau Chiến dịch Phan Rang – Xuân Lộc, đến 25/4/1975 Quân lực Việt Nam Cộng hòa đã mất hầu hết tuyến phòng thủ từ xa; Sài Gòn chỉ còn giao lưu với bên ngoài bằng đường không, các đại sứ quán lần lượt đóng cửa.',
        events:
          'Quân Giải phóng tiến công từ năm hướng Bắc, Tây Bắc, Đông Bắc, Đông Nam, Tây Nam, đánh vào các mục tiêu then chốt như Bộ Tổng Tham mưu, đồng thời giải phóng đồng bằng sông Cửu Long.',
        outcome:
          'Chính phủ Việt Nam Cộng hòa tuyên bố đầu hàng vô điều kiện, lực lượng Mỹ còn lại di tản. Hơn 45 vạn quân Việt Nam Cộng hòa tan rã; đất nước thống nhất sau hơn 100 năm bị xâm lược, chia cắt.',
        image: {
          url: 'images/history/battles/ho-chi-minh.jpg',
          credit: 'Xe tăng số 390 trưng bày tại Dinh Độc Lập · Dennis G. Jarvis · CC BY-SA 2.0',
          page: 'https://commons.wikimedia.org/wiki/File:Vietnam-0339_Gate_Smasher_(3331628983).jpg',
          position: '50% 62%',
        },
      },
    ],
  },
]

/** Các cuộc kháng chiến mà một người lãnh đạo */
export function warsOf(leaderId: string): War[] {
  return WARS.filter((w) => w.leaders.includes(leaderId))
}

/** Trận theo id, kèm cuộc kháng chiến chứa nó */
export const BATTLE_BY_ID = new Map(WARS.flatMap((war) => war.battles.map((battle) => [battle.id, { battle, war }] as const)))

/** Các trận một người chỉ huy (kèm cuộc kháng chiến) */
export function battlesOf(leaderId: string): { battle: Battle; war: War }[] {
  return WARS.flatMap((war) =>
    war.battles.filter((b) => b.commanders?.includes(leaderId)).map((battle) => ({ battle, war })),
  )
}

export function wikiUrl(title: string): string {
  return `https://vi.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_'))}`
}
