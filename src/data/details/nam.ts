import type { ProvinceDetail } from '../../types/province'

const NQ202 = 'Nghị quyết 202/2025/QH15'

/** Miền Nam: mã 27 – 34 */
export const NAM: Partial<Record<number, ProvinceDetail>> = {
  // ───────────────────────────── Tây Ninh (Tây Ninh + Long An)
  27: {
    region: 'Đông Nam Bộ & Đồng bằng sông Cửu Long',
    areaKm2: 8536.44,
    population: 3_254_170,
    statsSource: NQ202,
    terrain:
      'Vùng chuyển tiếp từ cao nguyên xuống đồng bằng, nổi bật núi Bà Đen giữa đồng bằng. Phía nam (Long An) là vùng trũng Đồng Tháp Mười và sông Vàm Cỏ.',
    peaks: [{ name: 'Núi Bà Đen – "Nóc nhà Nam Bộ"', heightM: 986, highest: true }],
    culture: {
      cover: { caption: 'Núi Bà Đen', imageSearch: 'Ba Den mountain' },
      summary:
        'Thánh địa của đạo Cao Đài với Tòa Thánh Tây Ninh. Long An là cửa ngõ miền Tây, mang văn hóa sông nước Đồng Tháp Mười.',
      ethnicGroups: ['Kinh', 'Khmer', 'Hoa', 'Chăm'],
      heritage: [
        { name: 'Núi Bà Đen', description: 'Ngọn núi cao nhất Nam Bộ với quần thể chùa Bà.', imageSearch: 'Ba Den mountain' },
        { name: 'Tòa Thánh Tây Ninh', description: 'Trung tâm của đạo Cao Đài, kiến trúc độc đáo.', wiki: 'Tòa Thánh Tây Ninh' },
        { name: 'Hồ Dầu Tiếng', description: 'Một trong những hồ thủy lợi lớn nhất Việt Nam.', imageSearch: 'Dau Tieng lake' },
        {
          name: 'Căn cứ Trung ương Cục miền Nam', imageFile: 'Nguyenvanlinh-twcucmiennam.png',
          description: 'Di tích quốc gia đặc biệt giữa rừng Tân Biên.',
        },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Xuân núi Bà Đen',
        time: 'Tháng Giêng âm lịch',
        description: 'Hàng triệu lượt khách hành hương lên điện Bà Linh Sơn Thánh Mẫu.',
        imageSearch: 'Ba Den mountain',
      },
      {
        name: 'Hội Yến Diêu Trì Cung',
        time: 'Rằm tháng Tám âm lịch',
        description: 'Đại lễ lớn của đạo Cao Đài tại Tòa Thánh Tây Ninh.',
        wiki: 'Tòa Thánh Tây Ninh',
      },
    ],
    foods: [
      { name: 'Bánh tráng phơi sương Trảng Bàng', description: 'Bánh tráng dẻo cuốn thịt luộc và hàng chục loại rau.', imageSearch: 'bánh tráng phơi sương' },
      { name: 'Bánh canh Trảng Bàng', description: 'Sợi bánh canh bột gạo, giò heo luộc.', imageSearch: 'bánh canh Trảng Bàng' },
      { name: 'Lạp xưởng Cần Đước', description: 'Lạp xưởng tươi ngọt thịt của Long An.', imageSearch: 'lạp xưởng' },
    ],
    specialties: [
      { name: 'Muối tôm Tây Ninh', description: 'Muối giã cùng tôm khô, ớt, chấm trái cây.', imageSearch: 'muối tôm Tây Ninh' },
      { name: 'Gạo nàng thơm Chợ Đào', imageUrl: 'images/tay-ninh/gao-nang-thom-cho-dao.jpg', imageCredit: 'consolersafari · Pixabay', imagePage: 'https://pixabay.com/photos/rice-grain-plant-food-harvest-7176354/', description: 'Loại gạo thơm nổi tiếng từng dùng tiến vua.' },
      { name: 'Thanh long Long An', description: 'Vùng thanh long lớn ở Châu Thành.', wiki: 'Thanh long' },
    ],
  },

  // ───────────────────────────── Đồng Nai (Đồng Nai + Bình Phước)
  28: {
    region: 'Đông Nam Bộ',
    areaKm2: 12737.18,
    population: 4_491_408,
    statsSource: NQ202,
    terrain:
      'Đồi núi thấp và đồng bằng, đất đỏ bazan ở Bình Phước, Long Khánh. Có hồ Trị An và rừng Cát Tiên; sông Đồng Nai chảy qua.',
    peaks: [
      { name: 'Núi Chứa Chan', heightM: 837, highest: true },
      { name: 'Núi Bà Rá', heightM: 723 },
    ],
    culture: {
      cover: { caption: 'Vườn quốc gia Cát Tiên', imageSearch: 'Cat Tien National Park' },
      summary:
        'Biên Hòa – Đồng Nai hơn 300 năm hình thành với Văn miếu Trấn Biên, văn miếu đầu tiên ở phương Nam. Bình Phước có văn hóa của người S’tiêng, M’Nông.',
      ethnicGroups: ['Kinh', 'Hoa', "S'tiêng", 'Châu Ro', 'Khmer', 'Nùng', 'Tày'],
      heritage: [
        { name: 'Vườn quốc gia Cát Tiên', description: 'Khu dự trữ sinh quyển thế giới, rừng nhiệt đới nguyên sinh.', imageSearch: 'Cat Tien National Park' },
        { name: 'Văn miếu Trấn Biên', description: 'Văn miếu đầu tiên ở xứ Đàng Trong (1715).', wiki: 'Văn miếu Trấn Biên' },
        { name: 'Hồ Trị An', description: 'Hồ thủy điện rộng với nhiều đảo nhỏ.', wiki: 'Hồ Trị An' },
        { name: 'Núi Bà Rá', description: 'Ngọn núi linh thiêng của vùng Phước Long.', imageSearch: 'Bà Rá mountain' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội chùa Ông Biên Hòa', imageUrl: 'images/dong-nai/le-hoi-chua-ong-bien-hoa.jpg', imageCredit: 'Nellynguyen · Pixabay', imagePage: 'https://pixabay.com/photos/incense-thienhau-pagoda-vietnam-2695879/',
        time: 'Rằm tháng Giêng âm lịch',
        description: 'Lễ hội tại Thất Phủ cổ miếu của cộng đồng người Hoa.',
      },
      {
        name: "Lễ mừng lúa mới của người S'tiêng",
        time: 'Sau mùa thu hoạch, cuối năm',
        description: 'Lễ cúng thần lúa với cồng chiêng, rượu cần.',
        wiki: 'Không gian văn hóa Cồng chiêng Tây Nguyên',
      },
    ],
    foods: [
      { name: 'Gỏi bưởi Tân Triều', description: 'Múi bưởi trộn tôm, thịt, rau thơm, chua ngọt.', imageSearch: 'gỏi bưởi' },
      { name: 'Cơm lam Bình Phước', description: 'Gạo nếp nướng ống tre của đồng bào S’tiêng.', wiki: 'Cơm lam' },
    ],
    specialties: [
      { name: 'Bưởi Tân Triều', description: 'Bưởi đường lá cam, ngọt thanh.', imageSearch: 'pomelo Vietnam' },
      { name: 'Hạt điều Bình Phước', description: 'Thủ phủ điều của Việt Nam.', wiki: 'Đào lộn hột' },
      { name: 'Chôm chôm Long Khánh', description: 'Vùng trái cây miệt vườn đất đỏ.', wiki: 'Chôm chôm' },
    ],
  },

  // ───────────────────────────── Vĩnh Long (Vĩnh Long + Bến Tre + Trà Vinh)
  30: {
    region: 'Đồng bằng sông Cửu Long',
    areaKm2: 6296.2,
    population: 4_257_581,
    statsSource: NQ202,
    terrain:
      'Đồng bằng phù sa nằm giữa sông Tiền và sông Hậu, nhiều cù lao, cồn bãi. Bến Tre là xứ dừa với bốn dải cù lao; Trà Vinh có bờ biển dài.',
    peaks: [],
    culture: {
      cover: { caption: 'Xứ dừa Bến Tre', wiki: 'Dừa' },
      summary:
        'Miệt vườn sông nước với đờn ca tài tử Nam Bộ (UNESCO, 2013). Trà Vinh có cộng đồng Khmer đông đảo với hàng trăm ngôi chùa và lễ hội Ok Om Bok.',
      ethnicGroups: ['Kinh', 'Khmer', 'Hoa'],
      heritage: [
        { name: 'Ao Bà Om', description: 'Thắng cảnh ao vuông cổ thụ rễ lồi của Trà Vinh.', wiki: 'Ao Bà Om' },
        { name: 'Chùa Âng', description: 'Ngôi chùa Khmer cổ kính bậc nhất Nam Bộ.', wiki: 'Chùa Âng' },
        { name: 'Văn Thánh miếu Vĩnh Long', description: 'Văn miếu thờ Khổng Tử và các danh nho Nam Bộ.', wiki: 'Văn Thánh miếu Vĩnh Long' },
        { name: 'Cù lao An Bình', imageFile: 'An Bình, tp. Vĩnh Long, Vĩnh Long, Vietnam - panoramio (3).jpg', description: 'Cù lao miệt vườn cây trái giữa sông Tiền.' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Ok Om Bok', imageUrl: 'https://live.staticflickr.com/1841/44536971762_e5c945e0de_z.jpg', imageCredit: 'UN Women Asia & the Pacific · CC BY-NC-ND 2.0 (Flickr)', imagePage: 'https://www.flickr.com/photos/69052650@N02/44536971762',
        time: 'Rằm tháng Mười âm lịch',
        description: 'Lễ cúng Trăng của người Khmer, có đua ghe ngo, thả đèn nước.',
        wiki: 'Ok Om Bok',
      },
      {
        name: 'Tết Chôl Chnăm Thmây',
        time: 'Giữa tháng 4 dương lịch',
        description: 'Tết cổ truyền mừng năm mới của đồng bào Khmer.',
        wiki: 'Chôl Chnăm Thmây',
      },
      {
        name: 'Lễ hội Dừa Bến Tre',
        time: 'Định kỳ',
        description: 'Tôn vinh cây dừa với trưng bày sản phẩm, ẩm thực từ dừa.',
        wiki: 'Dừa',
      },
    ],
    foods: [
      { name: 'Bún nước lèo Trà Vinh', description: 'Bún nấu mắm bò hóc, cá lóc, ăn với rau sống.', wiki: 'Bún nước lèo' },
      { name: 'Cá tai tượng chiên xù', description: 'Cá chiên giòn dựng đứng, cuốn bánh tráng.', imageSearch: 'cá tai tượng chiên xù' },
      { name: 'Bánh tráng Mỹ Lồng', imageUrl: 'images/vinh-long/banh-trang-my-long.jpg', imageCredit: 'trananhtien2107 · Pixabay', imagePage: 'https://pixabay.com/photos/vietnam-handicraft-handiwork-rural-6559446/', description: 'Bánh tráng nước dừa nướng giòn.' },
    ],
    specialties: [
      { name: 'Kẹo dừa Bến Tre', description: 'Kẹo làm từ nước cốt dừa và mạch nha.', imageSearch: 'kẹo dừa Bến Tre' },
      { name: 'Bưởi Năm Roi', description: 'Bưởi múi ráo, ngọt mát của Bình Minh.', wiki: 'Bưởi Năm Roi' },
      { name: 'Gốm đỏ Vĩnh Long', imageFile: 'Brick kiln in Vinh Long, Vietnam.jpg', description: 'Gạch gốm nung đỏ ven sông Cổ Chiên.' },
    ],
  },

  // ───────────────────────────── Đồng Tháp (Đồng Tháp + Tiền Giang)
  31: {
    region: 'Đồng bằng sông Cửu Long',
    areaKm2: 5938.64,
    population: 4_370_046,
    statsSource: NQ202,
    terrain:
      'Vùng trũng Đồng Tháp Mười ở phía bắc, sông Tiền chảy qua giữa; phía đông (Gò Công) giáp biển. Đất phù sa màu mỡ, mùa nước nổi hằng năm.',
    peaks: [],
    culture: {
      cover: { caption: 'Vườn quốc gia Tràm Chim', wiki: 'Vườn quốc gia Tràm Chim' },
      summary:
        'Đất sen hồng với văn hóa Óc Eo cổ ở Gò Tháp. Tiền Giang là miệt vườn trái cây Cái Bè, Cái Mơn với chợ nổi trên sông.',
      ethnicGroups: ['Kinh', 'Hoa', 'Khmer'],
      heritage: [
        { name: 'Vườn quốc gia Tràm Chim', description: 'Nơi cư trú của sếu đầu đỏ, khu Ramsar quốc tế.', wiki: 'Vườn quốc gia Tràm Chim' },
        { name: 'Khu di tích Gò Tháp', description: 'Di chỉ văn hóa Óc Eo và đền thờ Thiên Hộ Dương.', wiki: 'Gò Tháp' },
        { name: 'Làng hoa Sa Đéc', imageFile: 'Làng hoa Tân Quy Đông.jpg', description: 'Làng hoa trăm năm tuổi bên sông Tiền.', wiki: 'Làng hoa Sa Đéc' },
        { name: 'Chùa Vĩnh Tràng', description: 'Ngôi chùa kiến trúc Á – Âu ở Mỹ Tho.', wiki: 'Chùa Vĩnh Tràng' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Nghinh Ông Vàm Láng',
        time: '10/3 âm lịch',
        description: 'Lễ hội của ngư dân Gò Công, rước Ông trên biển.',
        wiki: 'Tục thờ cá Ông',
      },
      {
        name: 'Lễ hội Gò Tháp',
        time: 'Tháng Ba âm lịch',
        description: 'Lễ hội Bà Chúa Xứ và tưởng nhớ Thiên Hộ Dương, Đốc Binh Kiều.',
        wiki: 'Gò Tháp',
      },
      {
        name: 'Mùa hoa Sa Đéc', imageFile: 'Hoa tại Sa Đéc (cropped).jpg',
        time: 'Dịp Tết Nguyên đán',
        description: 'Làng hoa rực rỡ phục vụ thị trường Tết khắp miền Nam.',
        wiki: 'Làng hoa Sa Đéc',
      },
    ],
    foods: [
      { name: 'Hủ tiếu Mỹ Tho', description: 'Sợi hủ tiếu dai, nước dùng xương ngọt thanh.', wiki: 'Hủ tiếu Mỹ Tho' },
      { name: 'Nem Lai Vung', description: 'Nem chua gói lá chuối, vị chua ngọt.', imageSearch: 'nem Lai Vung' },
      { name: 'Cá lóc nướng trui', description: 'Cá lóc đồng nướng rơm, cuốn bánh tráng.', imageSearch: 'cá lóc nướng trui' },
    ],
    specialties: [
      { name: 'Sen Đồng Tháp', description: 'Hạt sen, ngó sen, trà tim sen từ đầm sen.', wiki: 'Sen' },
      { name: 'Xoài Cao Lãnh', description: 'Xoài cát chu, cát Hòa Lộc thơm ngọt.', wiki: 'Xoài' },
      { name: 'Vú sữa Lò Rèn', description: 'Vú sữa Vĩnh Kim nổi tiếng của Tiền Giang.' },
    ],
  },

  // ───────────────────────────── An Giang (An Giang + Kiên Giang)
  32: {
    region: 'Đồng bằng sông Cửu Long',
    areaKm2: 9888.91,
    population: 4_952_238,
    statsSource: NQ202,
    terrain:
      'Đồng bằng phù sa với dãy Thất Sơn (Bảy Núi) giáp Campuchia; phía tây là vịnh Thái Lan với các đảo Phú Quốc, Nam Du, Hòn Sơn.',
    peaks: [{ name: 'Núi Cấm (Thiên Cấm Sơn)', heightM: 705, highest: true }],
    culture: {
      cover: { caption: 'Đảo Phú Quốc', wiki: 'Phú Quốc' },
      summary:
        'Giao thoa văn hóa Kinh, Khmer, Chăm, Hoa với Lễ hội Vía Bà Chúa Xứ núi Sam và đua bò Bảy Núi. Kiên Giang có Phú Quốc "đảo ngọc" và Hà Tiên "thập cảnh".',
      ethnicGroups: ['Kinh', 'Khmer', 'Hoa', 'Chăm'],
      heritage: [
        { name: 'Miếu Bà Chúa Xứ núi Sam', description: 'Trung tâm tín ngưỡng lớn nhất vùng Tây Nam Bộ.', wiki: 'Miếu Bà Chúa Xứ Núi Sam' },
        { name: 'Rừng tràm Trà Sư', description: 'Rừng ngập nước mùa nước nổi, nơi cư trú của chim.', wiki: 'Rừng tràm Trà Sư' },
        { name: 'Đảo Phú Quốc', description: 'Đảo lớn nhất Việt Nam, khu dự trữ sinh quyển thế giới.', wiki: 'Phú Quốc' },
        { name: 'Di chỉ Óc Eo', description: 'Dấu tích thương cảng cổ của vương quốc Phù Nam.', wiki: 'Óc Eo' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Vía Bà Chúa Xứ núi Sam',
        time: '23 – 27/4 âm lịch',
        description: 'Lễ hội tín ngưỡng lớn của Nam Bộ, Di sản phi vật thể của nhân loại.',
        wiki: 'Miếu Bà Chúa Xứ Núi Sam',
      },
      {
        name: 'Hội đua bò Bảy Núi',
        time: 'Dịp lễ Sen Dolta, cuối tháng Tám âm lịch',
        description: 'Đua bò kéo bừa trên ruộng nước của đồng bào Khmer.',
        imageSearch: 'bull race An Giang',
      },
      {
        name: 'Lễ giỗ Nguyễn Trung Trực',
        time: '26 – 28/8 âm lịch',
        description: 'Tưởng nhớ người anh hùng "đốt tàu Pháp" tại Rạch Giá.',
        imageSearch: 'Nguyễn Trung Trực',
      },
    ],
    foods: [
      { name: 'Bún cá Châu Đốc', imageUrl: 'https://live.staticflickr.com/4035/4659181999_b71c58be6b_z.jpg', imageCredit: 'avlxyz · CC BY-SA 2.0 (Flickr)', imagePage: 'https://www.flickr.com/photos/10559879@N00/4659181999', description: 'Bún nước nghệ vàng với cá lóc, bông điên điển.', imageSearch: 'bún cá Châu Đốc' },
      { name: 'Gỏi cá trích Phú Quốc', description: 'Cá trích tươi trộn dừa nạo, cuốn bánh tráng.', imageSearch: 'gỏi cá trích' },
      { name: 'Bánh bò thốt nốt', imageUrl: 'images/an-giang/banh-bo-thot-not.jpg', imageCredit: 'Bùi Thụy Đào Nguyên · CC BY-SA 3.0 (Wikimedia Commons)', imagePage: 'https://commons.wikimedia.org/wiki/File:C%C3%A2y_th%E1%BB%91t_n%E1%BB%91t.jpg', description: 'Bánh bò làm từ đường thốt nốt, vàng thơm.', imageSearch: 'bánh bò thốt nốt' },
    ],
    specialties: [
      { name: 'Nước mắm Phú Quốc', description: 'Nước mắm cá cơm ủ thùng gỗ, có chỉ dẫn địa lý châu Âu.', wiki: 'Nước mắm Phú Quốc' },
      { name: 'Mắm Châu Đốc', description: 'Thủ phủ mắm miền Tây: mắm thái, mắm sặc, mắm linh.', imageSearch: 'mắm Châu Đốc' },
      { name: 'Đường thốt nốt', description: 'Đường nấu từ nhựa hoa thốt nốt vùng Bảy Núi.', imageSearch: 'Borassus flabellifer' },
    ],
  },

  // ───────────────────────────── Cần Thơ (Cần Thơ + Sóc Trăng + Hậu Giang)
  33: {
    region: 'Đồng bằng sông Cửu Long',
    areaKm2: 6360.83,
    population: 4_199_824,
    statsSource: NQ202,
    terrain:
      'Đồng bằng phù sa bằng phẳng ven sông Hậu, mạng lưới kênh rạch chằng chịt. Phía đông (Sóc Trăng) giáp biển với các cửa sông Trần Đề, Định An.',
    peaks: [],
    culture: {
      cover: { caption: 'Chợ nổi Cái Răng', wiki: 'Chợ nổi Cái Răng' },
      summary:
        'Tây Đô – trung tâm vùng Đồng bằng sông Cửu Long với chợ nổi, đờn ca tài tử. Sóc Trăng có cộng đồng Khmer và Hoa đông đảo, nhiều chùa Khmer đặc sắc.',
      ethnicGroups: ['Kinh', 'Khmer', 'Hoa'],
      heritage: [
        { name: 'Chợ nổi Cái Răng', description: 'Chợ trên sông lớn nhất miền Tây, Di sản phi vật thể quốc gia.', wiki: 'Chợ nổi Cái Răng' },
        { name: 'Nhà cổ Bình Thủy', description: 'Ngôi nhà cổ kiến trúc Pháp – Việt hơn trăm năm tuổi.', wiki: 'Nhà cổ Bình Thủy' },
        { name: 'Chùa Dơi', description: 'Chùa Khmer nổi tiếng với đàn dơi quạ hàng nghìn con.', wiki: 'Chùa Dơi' },
        { name: 'Bến Ninh Kiều', description: 'Bến sông biểu tượng của Cần Thơ.', wiki: 'Bến Ninh Kiều' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội đua ghe Ngo', imageFile: 'Đua Ghe Ngo Phước Long 2025 (3).jpg',
        time: 'Rằm tháng Mười âm lịch (lễ Ok Om Bok)',
        description: 'Đua ghe ngo sôi động trên sông Maspero, Sóc Trăng.',
        wiki: 'Ok Om Bok',
      },
      {
        name: 'Tết Chôl Chnăm Thmây',
        time: 'Giữa tháng 4 dương lịch',
        description: 'Năm mới của người Khmer với lễ tắm Phật, đắp núi cát.',
        wiki: 'Chôl Chnăm Thmây',
      },
    ],
    foods: [
      { name: 'Lẩu mắm', imageUrl: 'images/can-tho/lau-mam.jpg', imageCredit: 'grsky · Pixabay', imagePage: 'https://pixabay.com/photos/hot-pot-soup-food-spices-herbs-7003055/', description: 'Lẩu nấu từ mắm cá linh, cá sặc, ăn với rau đồng.' },
      { name: 'Bánh cống Sóc Trăng', description: 'Bánh chiên giòn với đậu xanh, tôm tươi.', imageSearch: 'bánh cống' },
      { name: 'Bánh xèo miền Tây', description: 'Bánh xèo to giòn, nhân giá, tôm, thịt.', wiki: 'Bánh xèo' },
    ],
    specialties: [
      { name: 'Bánh pía Sóc Trăng', description: 'Bánh nhân đậu xanh, sầu riêng, trứng muối.', imageSearch: 'bánh pía Sóc Trăng' },
      { name: 'Gạo ST25', description: 'Từng đạt danh hiệu "Gạo ngon nhất thế giới".', imageSearch: 'ST25 rice' },
      { name: 'Khóm Cầu Đúc', description: 'Khóm (dứa) ngọt thanh của Hậu Giang.', wiki: 'Dứa' },
    ],
  },

  // ───────────────────────────── Cà Mau (Cà Mau + Bạc Liêu)
  34: {
    region: 'Đồng bằng sông Cửu Long',
    areaKm2: 7942.39,
    population: 2_606_672,
    statsSource: NQ202,
    terrain:
      'Vùng đất cực Nam thấp và bằng, ba mặt giáp biển. Rừng ngập mặn, rừng tràm U Minh Hạ; mũi Cà Mau đất bồi lấn ra biển mỗi năm.',
    peaks: [],
    culture: {
      cover: { caption: 'Mũi Cà Mau', wiki: 'Vườn quốc gia Mũi Cà Mau' },
      summary:
        'Vùng đất cực Nam với văn hóa sông nước, rừng đước. Bạc Liêu là nơi ra đời bản "Dạ cổ hoài lang" của Cao Văn Lầu, cái nôi của đờn ca tài tử.',
      ethnicGroups: ['Kinh', 'Khmer', 'Hoa'],
      heritage: [
        { name: 'Vườn quốc gia Mũi Cà Mau', description: 'Điểm cực Nam, khu dự trữ sinh quyển thế giới.', wiki: 'Vườn quốc gia Mũi Cà Mau' },
        { name: 'Rừng U Minh Hạ', imageUrl: 'images/ca-mau/rung-u-minh-ha.jpg', imageCredit: 'pattyjansen · Pixabay', imagePage: 'https://pixabay.com/photos/park-trees-path-centennial-park-338726/', description: 'Rừng tràm ngập nước đặc trưng Nam Bộ.' },
        { name: 'Nhà Công tử Bạc Liêu', description: 'Dinh thự của "công tử" nổi tiếng ăn chơi.', imageSearch: 'Công tử Bạc Liêu' },
        { name: 'Cánh đồng điện gió Bạc Liêu', description: 'Hàng trăm trụ điện gió trên bãi bồi ven biển.', imageSearch: 'Bac Lieu wind farm' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Nghinh Ông',
        time: 'Hằng năm, tùy làng biển',
        description: 'Lễ hội của ngư dân Sông Đốc, Gành Hào cầu biển lặng, cá đầy.',
        wiki: 'Tục thờ cá Ông',
      },
      {
        name: 'Festival Đờn ca tài tử',
        time: 'Định kỳ',
        description: 'Tôn vinh đờn ca tài tử Nam Bộ tại quê hương Cao Văn Lầu.',
        wiki: 'Đờn ca tài tử Nam Bộ',
      },
    ],
    foods: [
      { name: 'Cua Cà Mau', description: 'Cua biển chắc thịt, nhiều gạch, hấp hoặc rang me.', wiki: 'Cua bùn' },
      { name: 'Ba khía muối', description: 'Ba khía muối trộn tỏi ớt, ăn với cơm trắng.', imageSearch: 'ba khía muối' },
      { name: 'Bánh tằm Ngan Dừa', description: 'Sợi bánh tằm dẻo, ăn với bì, nước cốt dừa.', imageSearch: 'bánh tằm bì' },
    ],
    specialties: [
      { name: 'Mật ong U Minh', imageUrl: 'images/ca-mau/mat-ong-u-minh.jpg', imageCredit: 'GabruPawPixels · Pixabay', imagePage: 'https://pixabay.com/photos/honey-honeycomb-bees-tree-forest-10453806/', description: 'Mật ong rừng tràm thơm đặc trưng.', imageSearch: 'honey U Minh' },
      { name: 'Muối Bạc Liêu', imageFile: 'Phu Yen salt field 27-01-2018.jpg', description: 'Hạt muối trắng từ đồng muối ven biển.', imageSearch: 'salt field Bac Lieu' },
      { name: 'Tôm khô Rạch Gốc', description: 'Tôm đất phơi khô, đỏ au, ngọt thịt.', imageSearch: 'dried shrimp Vietnam' },
    ],
  },

  // ───────────────────────────── TP. Hồ Chí Minh (+ Bình Dương + Bà Rịa – Vũng Tàu)
  29: {
    region: 'Đông Nam Bộ',
    areaKm2: 6772.59,
    population: 14_002_598,
    statsSource: NQ202,
    terrain:
      'Địa hình thấp, phần lớn là đồng bằng phù sa và vùng trũng ven sông Sài Gòn – Đồng Nai. Phía bắc có đồi thấp (Bình Dương), phía đông nam là bờ biển Vũng Tàu và quần đảo Côn Đảo.',
    peaks: [],
    culture: {
      cover: { caption: 'Chợ Bến Thành', wiki: 'Chợ Bến Thành' },
      summary:
        'Đô thị đông dân nhất cả nước, nơi giao thoa văn hóa của người Kinh, Hoa, Khmer, Chăm. Năng động, cởi mở và nổi tiếng với văn hóa ẩm thực đường phố.',
      ethnicGroups: ['Kinh', 'Hoa', 'Khmer', 'Chăm'],
      heritage: [
        { name: 'Dinh Độc Lập', description: 'Di tích lịch sử gắn với sự kiện thống nhất đất nước 30/4/1975.', wiki: 'Dinh Độc Lập', imageFile: 'Independence Palace, Ho Chi Minh (LRM 20230823 093633).jpg' },
        {
          name: 'Nhà thờ Đức Bà Sài Gòn',
          description: 'Công trình kiến trúc Pháp cuối thế kỷ XIX, biểu tượng của thành phố.',
          wiki: 'Nhà thờ chính tòa Đức Bà Sài Gòn',
        },
        { name: 'Bưu điện Sài Gòn', description: 'Tòa bưu điện mang phong cách kiến trúc Pháp, đối diện Nhà thờ Đức Bà.', wiki: 'Bưu điện Sài Gòn', imageFile: 'Clock and exterior of Saigon Central Post Office.JPG' },
        { name: 'Địa đạo Củ Chi', description: 'Hệ thống đường hầm dài hơn 200 km thời kháng chiến.', wiki: 'Địa đạo Củ Chi' },
        {
          name: 'Rừng ngập mặn Cần Giờ',
          description: 'Khu dự trữ sinh quyển thế giới đầu tiên của Việt Nam (2000).',
          wiki: 'Khu dự trữ sinh quyển rừng ngập mặn Cần Giờ',
        },
        { name: 'Côn Đảo', description: 'Quần đảo với di tích nhà tù lịch sử và vườn quốc gia biển.', wiki: 'Côn Đảo' },
      ],
    },
    festivals: [
      {
        name: 'Đường hoa Nguyễn Huệ',
        time: 'Tết Nguyên đán',
        description: 'Con đường hoa xuân trên phố đi bộ Nguyễn Huệ, điểm hẹn của người dân dịp Tết.',
        wiki: 'Đường hoa Nguyễn Huệ',
      },
      {
        name: 'Lễ hội Nghinh Ông Cần Giờ',
        time: '14 – 16/8 âm lịch',
        description: 'Lễ hội của ngư dân Cần Giờ, rước Ông Nam Hải trên biển.',
        wiki: 'Tục thờ cá Ông',
      },
      {
        name: 'Lễ hội Nghinh Ông Thắng Tam (Vũng Tàu)',
        time: '16 – 18/8 âm lịch',
        description: 'Lễ hội cá Ông lớn của ngư dân Vũng Tàu, là Di sản văn hóa phi vật thể quốc gia.',
        wiki: 'Đình thần Thắng Tam',
      },
      {
        name: 'Lễ hội chùa Bà Thiên Hậu (Thủ Dầu Một)',
        time: 'Rằm tháng Giêng âm lịch',
        description: 'Lễ rước kiệu Bà của cộng đồng người Hoa, thu hút đông đảo người dân.',
        imageSearch: 'Thiên Hậu Bình Dương',
      },
    ],
    foods: [
      { name: 'Cơm tấm', description: 'Cơm tấm sườn nướng, bì, chả trứng, nước mắm chua ngọt.', wiki: 'Cơm tấm' },
      { name: 'Bánh mì Sài Gòn', description: 'Bánh mì giòn với pa-tê, chả lụa, đồ chua.', wiki: 'Bánh mì Việt Nam' },
      { name: 'Hủ tiếu Nam Vang', description: 'Hủ tiếu với tôm, thịt bằm, gan, nước dùng ngọt thanh.', wiki: 'Hủ tiếu Nam Vang', imageFile: 'Hủ tiếu Nam Vang Sài Gòn.jpg' },
      { name: 'Bánh khọt Vũng Tàu', description: 'Bánh nhỏ giòn rụm với tôm tươi, ăn kèm rau sống.', wiki: 'Bánh khọt' },
    ],
    specialties: [
      { name: 'Măng cụt Lái Thiêu', description: 'Trái cây miệt vườn Lái Thiêu (Bình Dương cũ).', wiki: 'Măng cụt' },
      { name: 'Sơn mài Tương Bình Hiệp', description: 'Tranh và đồ sơn mài của làng nghề truyền thống.', wiki: 'Sơn mài', imageFile: 'Painting Thieu nu va phong canh of Nguyen Gia Tri (front side).jpg' },
      { name: 'Gốm sứ Bình Dương', description: 'Gốm Lái Thiêu nổi tiếng từ thế kỷ XIX.', imageSearch: 'Lái Thiêu ceramics' },
      { name: 'Hải sản khô Vũng Tàu', description: 'Khô mực, khô cá và các loại hải sản một nắng.', wiki: 'Mực khô' },
    ],
  },
}
