import type { ProvinceDetail } from '../../types/province'

const NQ202 = 'Nghị quyết 202/2025/QH15'
const KEEP = 'Số liệu tổng hợp khi sắp xếp ĐVHC 2025 · không thay đổi địa giới'

/** Miền Bắc: mã 1 – 15 */
export const BAC: Partial<Record<number, ProvinceDetail>> = {
  // ───────────────────────────── Cao Bằng
  2: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 6700.4,
    population: 555_809,
    statsSource: KEEP,
    terrain:
      'Núi đá vôi xen núi đất, độ cao trung bình trên 200 m, vùng sát biên giới cao 600–1.300 m. Có sông Bằng, sông Gâm và nhiều thác nước đẹp.',
    peaks: [{ name: 'Phia Oắc', heightM: 1931, highest: true }],
    culture: {
      cover: { caption: 'Thác Bản Giốc', wiki: 'Thác Bản Giốc' },
      summary:
        'Cái nôi cách mạng với hang Pác Bó, nơi Bác Hồ về nước năm 1941. Văn hóa Tày – Nùng đậm nét với hát Then, đàn tính và nhà sàn bên những thung lũng đá.',
      ethnicGroups: ['Tày', 'Nùng', "H'Mông", 'Dao', 'Kinh', 'Sán Chay'],
      heritage: [
        { name: 'Thác Bản Giốc', description: 'Thác nước tự nhiên lớn nhất Đông Nam Á nằm trên biên giới.', wiki: 'Thác Bản Giốc' },
        { name: 'Khu di tích Pác Bó', description: 'Hang Cốc Bó, suối Lênin, núi Các Mác gắn với Bác Hồ.', wiki: 'Pác Bó' },
        {
          name: 'Công viên địa chất Non nước Cao Bằng',
          description: 'Công viên địa chất toàn cầu UNESCO (2018).',
          wiki: 'Công viên địa chất Non nước Cao Bằng',
        },
        { name: 'Động Ngườm Ngao', description: 'Hang động đá vôi kỳ ảo gần thác Bản Giốc.', wiki: 'Động Ngườm Ngao' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Lồng tồng (Xuống đồng)',
        time: 'Tháng Giêng âm lịch',
        description: 'Lễ cầu mùa của người Tày, Nùng với tung còn, kéo co, hát lượn.',
      },
      {
        name: 'Lễ hội đền Kỳ Sầm',
        time: 'Mùng 10 tháng Giêng âm lịch',
        description: 'Tưởng nhớ Nùng Trí Cao, người anh hùng dân tộc Nùng thế kỷ XI.',
      },
      {
        name: 'Lễ hội Nàng Hai',
        time: 'Tháng Giêng – tháng Ba âm lịch',
        description: 'Lễ hội thờ Mẹ Trăng của người Tày, cầu mưa thuận gió hòa.',
      },
    ],
    foods: [
      { name: 'Phở chua', description: 'Bánh phở trộn nước sốt chua ngọt, thịt quay, gan, lạc rang.' },
      { name: 'Bánh cuốn canh', description: 'Bánh cuốn chan nước dùng xương nóng, ăn kèm chả.', imageSearch: 'bánh cuốn Cao Bằng' },
      { name: 'Bánh trứng kiến', description: 'Bánh lá ngải nhân trứng kiến, chỉ có vào mùa xuân.' },
      { name: 'Lạp sườn hun khói', description: 'Lạp sườn treo gác bếp, thơm mùi khói củi.', imageSearch: 'lạp sườn Cao Bằng' },
    ],
    specialties: [
      { name: 'Hạt dẻ Trùng Khánh', description: 'Hạt dẻ bùi, thơm, thu hoạch vào mùa thu.' },
      { name: 'Miến dong Nguyên Bình', description: 'Miến làm từ củ dong riềng, sợi dai, trong.', wiki: 'Miến' },
      { name: 'Trà xanh Thạch An', description: 'Chè xanh vùng núi cao, nước xanh, vị đậm.', imageSearch: 'tea plantation Cao Bang' },
    ],
  },

  // ───────────────────────────── Tuyên Quang (Tuyên Quang + Hà Giang)
  3: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 13795.6,
    population: 1_731_600,
    statsSource: NQ202,
    terrain:
      'Phía bắc là cao nguyên đá Đồng Văn và núi cao Tây Côn Lĩnh; phía nam là đồi núi thấp, thung lũng sông Lô, sông Gâm và hồ Na Hang.',
    peaks: [{ name: 'Tây Côn Lĩnh', heightM: 2419 }],
    culture: {
      cover: { caption: 'Cao nguyên đá Đồng Văn', wiki: 'Cao nguyên đá Đồng Văn' },
      summary:
        'Thủ đô kháng chiến với ATK Tân Trào, cùng vùng cao nguyên đá nơi người H\'Mông, Lô Lô, Dao giữ gìn chợ phiên, nhà trình tường và trang phục truyền thống.',
      ethnicGroups: ['Tày', 'Kinh', "H'Mông", 'Dao', 'Sán Chay', 'Lô Lô', 'Nùng'],
      heritage: [
        {
          name: 'Cao nguyên đá Đồng Văn',
          description: 'Công viên địa chất toàn cầu UNESCO đầu tiên của Việt Nam (2010).',
          wiki: 'Cao nguyên đá Đồng Văn',
        },
        { name: 'Đèo Mã Pì Lèng', description: 'Một trong "tứ đại đỉnh đèo", nhìn xuống sông Nho Quế.', wiki: 'Đèo Mã Pì Lèng' },
        { name: 'Khu di tích Tân Trào', description: 'Đình Tân Trào, cây đa Tân Trào gắn với Cách mạng tháng Tám.', wiki: 'Tân Trào' },
        { name: 'Dinh thự họ Vương', description: 'Dinh thự cổ của "vua Mèo" Vương Chính Đức ở Sà Phìn.', wiki: 'Dinh thự họ Vương' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Thành Tuyên',
        time: 'Rằm tháng Tám âm lịch',
        description: 'Lễ hội rước đèn Trung thu khổng lồ, độc đáo nhất cả nước.',
        imageSearch: 'Thành Tuyên lantern festival',
      },
      {
        name: 'Chợ tình Khâu Vai',
        time: '27/3 âm lịch',
        description: 'Phiên chợ mỗi năm một lần, nơi gặp gỡ của những người từng yêu nhau.',
        wiki: 'Khâu Vai',
      },
      {
        name: 'Lễ hội hoa Tam giác mạch',
        time: 'Tháng 10 – 11 dương lịch',
        description: 'Mùa hoa tam giác mạch nở hồng khắp các thung lũng cao nguyên đá.',
        imageSearch: 'buckwheat flower Ha Giang',
      },
    ],
    foods: [
      { name: 'Cháo ấu tẩu', description: 'Cháo nấu với củ ấu tẩu và chân giò, vị đắng nhẹ, ăn vào buổi tối.' },
      { name: 'Bánh tam giác mạch', description: 'Bánh làm từ bột hạt tam giác mạch, nướng than.', imageSearch: 'bánh tam giác mạch' },
      { name: 'Thịt trâu gác bếp', description: 'Thịt trâu tẩm mắc khén, hun khói trên gác bếp.', imageSearch: 'thịt trâu gác bếp' },
    ],
    specialties: [
      { name: 'Cam sành Hàm Yên', description: 'Cam vỏ sần, mọng nước, chín vào cuối năm.', imageSearch: 'cam sành' },
      { name: 'Chè Shan tuyết', description: 'Chè cổ thụ trên núi cao Hà Giang.', wiki: 'Chè Shan tuyết' },
      { name: 'Mật ong bạc hà', description: 'Mật từ hoa bạc hà dại trên cao nguyên đá.' },
    ],
  },

  // ───────────────────────────── Điện Biên
  5: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 9539.9,
    population: 653_422,
    statsSource: KEEP,
    terrain:
      'Núi cao, chia cắt mạnh, giáp Lào và Trung Quốc. Cánh đồng Mường Thanh rộng nhất Tây Bắc. Có điểm cực Tây A Pa Chải.',
    peaks: [],
    culture: {
      cover: { caption: 'Đồi A1 – Di tích Điện Biên Phủ', wiki: 'Chiến dịch Điện Biên Phủ' },
      summary:
        'Gắn với chiến thắng Điện Biên Phủ "lừng lẫy năm châu" (1954). Văn hóa Thái đặc sắc với nghệ thuật Xòe Thái được UNESCO ghi danh (2021).',
      ethnicGroups: ['Thái', "H'Mông", 'Kinh', 'Khơ Mú', 'Dao', 'Hà Nhì'],
      heritage: [
        { name: 'Đồi A1', description: 'Cứ điểm then chốt của trận Điện Biên Phủ.', wiki: 'Chiến dịch Điện Biên Phủ' },
        { name: 'Cánh đồng Mường Thanh', description: 'Cánh đồng lúa lớn nhất vùng Tây Bắc.', wiki: 'Cánh đồng Mường Thanh' },
        { name: 'Đèo Pha Đin', description: 'Một trong "tứ đại đỉnh đèo" miền Bắc.' },
        { name: 'Cột mốc A Pa Chải', description: 'Điểm cực Tây của Tổ quốc.', wiki: 'A Pa Chải' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Hoa Ban',
        time: 'Tháng 3 dương lịch',
        description: 'Khi hoa ban trắng nở rộ khắp núi rừng, với thi người đẹp hoa ban và xòe Thái.',
        imageSearch: 'Bauhinia variegata Vietnam',
      },
      {
        name: 'Lễ hội Thành Bản Phủ',
        time: 'Tháng Giêng âm lịch',
        description: 'Tưởng nhớ Hoàng Công Chất, người lãnh đạo khởi nghĩa nông dân thế kỷ XVIII.',
        wiki: 'Thành Bản Phủ (Điện Biên)',
      },
      {
        name: 'Lễ hội Xên bản, Xên mường',
        time: 'Đầu năm âm lịch',
        description: 'Lễ cúng bản, cúng mường của người Thái, cầu bình an, mùa màng tốt tươi.',
      },
    ],
    foods: [
      { name: 'Pa pỉnh tộp', description: 'Cá suối gập đôi, nhồi gia vị rừng, nướng than.', wiki: 'Pa pỉnh tộp' },
      { name: 'Chẩm chéo', description: 'Nước chấm giã từ ớt, mắc khén, rau thơm của người Thái.', wiki: 'Chẩm chéo' },
      { name: 'Nậm pịa', description: 'Món nấu từ lòng bò, dạ dày non, vị đắng đặc trưng.', wiki: 'Nậm pịa' },
    ],
    specialties: [
      { name: 'Gạo Điện Biên', description: 'Gạo cánh đồng Mường Thanh dẻo, thơm.', imageSearch: 'Muong Thanh rice field' },
      { name: 'Mắc khén', description: 'Gia vị hạt rừng thơm cay của vùng Tây Bắc.', wiki: 'Mắc khén' },
      { name: 'Cà phê Điện Biên', description: 'Cà phê Arabica trồng trên vùng đồi Mường Ảng.', wiki: 'Cà phê chè' },
    ],
  },

  // ───────────────────────────── Lai Châu
  6: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 9068.7,
    population: 494_626,
    statsSource: KEEP,
    terrain:
      'Một trong những tỉnh có địa hình cao và hiểm trở nhất cả nước, nằm giữa dãy Hoàng Liên Sơn và sông Đà. Nhiều đỉnh núi trên 3.000 m.',
    peaks: [
      { name: 'Pu Si Lung', heightM: 3076 },
      { name: 'Pu Ta Leng', heightM: 3049 },
    ],
    culture: {
      cover: { caption: 'Đèo Ô Quy Hồ', wiki: 'Đèo Ô Quy Hồ' },
      summary:
        'Nơi sinh sống của hơn 20 dân tộc, trong đó có những dân tộc rất ít người như Cống, Mảng, La Hủ, Si La, giữ nhiều phong tục và lễ hội độc đáo.',
      ethnicGroups: ['Thái', "H'Mông", 'Dao', 'Hà Nhì', 'Giáy', 'Lự', 'La Hủ', 'Mảng'],
      heritage: [
        { name: 'Đèo Ô Quy Hồ', description: 'Con đèo dài nhất miền Bắc, nối Lai Châu với Sa Pa.', wiki: 'Đèo Ô Quy Hồ' },
        { name: 'Đỉnh Pu Si Lung', description: 'Đỉnh núi cao thứ hai Việt Nam, nằm trên biên giới.', wiki: 'Pu Si Lung' },
        { name: 'Cao nguyên Sìn Hồ', description: 'Cao nguyên quanh năm mây phủ, nhiều bản làng cổ.', wiki: 'Sìn Hồ (huyện)' },
        { name: 'Động Tiên Sơn', description: 'Hang động thạch nhũ gần thành phố Lai Châu.', imageSearch: 'Tiên Sơn cave Lai Châu' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Then Kin Pang',
        time: 'Tháng Giêng – tháng Ba âm lịch',
        description: 'Lễ hội cầu mưa, cầu mùa của người Lự, có múa nón, múa quạt, thi bắn nỏ.',
      },
      {
        name: 'Lễ hội Nàng Han',
        time: 'Mùa xuân',
        description: 'Tưởng nhớ nữ anh hùng Nàng Han của người Thái, cầu bình yên cho bản mường.',
      },
      {
        name: 'Lễ hội Gầu Tào',
        time: 'Dịp Tết, đầu xuân',
        description: "Lễ hội cầu phúc của người H'Mông với múa khèn, ném pao.",
      },
    ],
    foods: [
      { name: 'Mèn mén', description: "Món ngô xay hấp của người H'Mông, ăn thay cơm.", wiki: 'Mèn mén' },
      { name: 'Cá suối nướng', description: 'Cá suối kẹp tre nướng than, chấm chẩm chéo.', imageSearch: 'grilled fish bamboo Vietnam' },
      { name: 'Thịt lợn gác bếp', description: 'Thịt lợn bản ướp mắc khén, hun khói nhiều ngày.', imageSearch: 'thịt lợn gác bếp' },
    ],
    specialties: [
      { name: 'Sâm Lai Châu', description: 'Loài sâm quý mọc ở vùng núi cao Mường Tè, Phong Thổ.', imageSearch: 'Panax vietnamensis' },
      { name: 'Chè Tam Đường', description: 'Chè vùng cao, búp nhỏ, nước vàng sánh.' },
      { name: 'Thảo quả', description: 'Gia vị quý trồng dưới tán rừng già.', imageSearch: 'Amomum tsao-ko' },
    ],
  },

  // ───────────────────────────── Sơn La
  7: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 14109.8,
    population: 1_327_430,
    statsSource: KEEP,
    terrain:
      'Núi cao xen kẽ cao nguyên Mộc Châu, Nà Sản. Sông Đà và sông Mã chảy qua; có công trình thủy điện Sơn La lớn nhất Đông Nam Á.',
    peaks: [],
    culture: {
      cover: { caption: 'Cao nguyên Mộc Châu', wiki: 'Mộc Châu' },
      summary:
        'Trung tâm vùng Tây Bắc, nơi văn hóa Thái đen in đậm trong điệu xòe, khăn piêu, nhà sàn. Mộc Châu nổi tiếng với đồi chè, mùa hoa mận, hoa cải.',
      ethnicGroups: ['Thái', 'Kinh', "H'Mông", 'Mường', 'Dao', 'Xinh Mun', 'Khơ Mú'],
      heritage: [
        { name: 'Cao nguyên Mộc Châu', description: 'Khu du lịch quốc gia với đồi chè, thác Dải Yếm.', wiki: 'Mộc Châu' },
        { name: 'Nhà tù Sơn La', description: 'Di tích quốc gia đặc biệt, nơi giam giữ nhiều chiến sĩ cách mạng.', wiki: 'Nhà tù Sơn La' },
        { name: 'Thủy điện Sơn La', description: 'Nhà máy thủy điện lớn nhất Đông Nam Á.', wiki: 'Nhà máy thủy điện Sơn La' },
        { name: 'Tà Xùa', description: 'Nơi "săn mây" nổi tiếng trên núi cao Bắc Yên.', wiki: 'Tà Xùa' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Hết Chá',
        time: 'Tháng Giêng – tháng Ba âm lịch',
        description: 'Lễ tạ ơn thầy mo của người Thái, có cây hoa chá rực rỡ.',
      },
      {
        name: 'Mùa hoa mận Mộc Châu',
        time: 'Tháng 1 – 2 dương lịch',
        description: 'Những thung lũng mận trắng xóa đón du khách dịp Tết.',
        imageSearch: 'Moc Chau plum blossom',
      },
      {
        name: 'Ngày hội Xòe Thái',
        time: 'Các dịp lễ, Tết',
        description: 'Vòng xòe đoàn kết của người Thái, di sản phi vật thể của nhân loại.',
      },
    ],
    foods: [
      { name: 'Bê chao Mộc Châu', description: 'Thịt bê non hấp rồi chao giòn, chấm tương bần.', imageSearch: 'bê chao Mộc Châu' },
      { name: 'Nộm hoa ban', description: 'Hoa ban luộc trộn với lạc, rau thơm, vị bùi ngọt.' },
      { name: 'Cá suối nướng', description: 'Cá suối nướng than hoa, thơm mùi gia vị rừng.', wiki: 'Pa pỉnh tộp' },
    ],
    specialties: [
      { name: 'Sữa Mộc Châu', description: 'Sữa bò từ các trang trại trên cao nguyên mát mẻ.', imageSearch: 'Moc Chau dairy cows' },
      { name: 'Mận hậu Mộc Châu', description: 'Mận chín đỏ vào tháng 5 – 6.', wiki: 'Mận' },
      { name: 'Xoài Yên Châu', description: 'Xoài hạt nhỏ, thơm đậm, chín vào đầu hè.', imageSearch: 'Yên Châu mango' },
    ],
  },

  // ───────────────────────────── Thái Nguyên (Thái Nguyên + Bắc Kạn)
  8: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 8375.21,
    population: 1_799_489,
    statsSource: NQ202,
    terrain:
      'Phía nam là vùng trung du đồi chè thoai thoải; phía bắc là núi đá vôi và núi đất cao, có hồ Ba Bể nằm giữa vườn quốc gia.',
    peaks: [],
    culture: {
      cover: { caption: 'Hồ Ba Bể', wiki: 'Hồ Ba Bể' },
      summary:
        'Vùng chè "đệ nhất danh trà" Tân Cương và an toàn khu Định Hóa thời kháng chiến. Phía bắc là quê hương của người Tày, Dao với hát then, đàn tính.',
      ethnicGroups: ['Kinh', 'Tày', 'Nùng', 'Dao', 'Sán Dìu', "H'Mông"],
      heritage: [
        { name: 'Hồ Ba Bể', description: 'Hồ nước ngọt tự nhiên lớn nhất Việt Nam, Di sản ASEAN.', wiki: 'Hồ Ba Bể' },
        { name: 'ATK Định Hóa', description: 'Thủ đô gió ngàn – căn cứ kháng chiến chống Pháp.', wiki: 'ATK Định Hóa' },
        { name: 'Hồ Núi Cốc', description: 'Hồ nhân tạo gắn với truyền thuyết nàng Công – chàng Cốc.', imageSearch: 'Núi Cốc lake' },
        {
          name: 'Bảo tàng Văn hóa các dân tộc Việt Nam',
          description: 'Lưu giữ hiện vật của 54 dân tộc anh em.',
          wiki: 'Bảo tàng Văn hóa các Dân tộc Việt Nam',
        },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Lồng tồng Ba Bể',
        time: 'Mùng 10 tháng Giêng âm lịch',
        description: 'Lễ xuống đồng của người Tày bên hồ Ba Bể, có đua thuyền độc mộc.',
        wiki: 'Hồ Ba Bể',
      },
      {
        name: 'Lễ hội đền Đuổm',
        time: 'Rằm tháng Giêng âm lịch',
        description: 'Tưởng nhớ Dương Tự Minh, phò mã thời Lý có công giữ yên biên cương.',
        imageSearch: 'Đền Đuổm',
      },
      {
        name: 'Festival Trà Thái Nguyên',
        time: 'Định kỳ, thường vào cuối năm dương lịch',
        description: 'Tôn vinh văn hóa trà với không gian trà, thi pha trà, hội chợ.',
        imageSearch: 'Tân Cương tea Thái Nguyên',
      },
    ],
    foods: [
      { name: 'Bánh chưng Bờ Đậu', description: 'Bánh chưng nếp nương, gói chặt tay, để được lâu.', wiki: 'Bánh chưng' },
      { name: 'Cá nướng hồ Ba Bể', description: 'Cá tươi hồ Ba Bể nướng than, ăn với rau rừng.' },
      { name: 'Bánh coóc mò', description: 'Bánh nếp hình sừng bò của người Tày.', imageSearch: 'bánh coóc mò' },
    ],
    specialties: [
      { name: 'Chè Tân Cương', description: '"Đệ nhất danh trà" với nước xanh, vị chát dịu, hậu ngọt.', imageSearch: 'Tân Cương tea' },
      { name: 'Miến dong Bắc Kạn', description: 'Miến làm thủ công từ dong riềng.', wiki: 'Miến' },
      { name: 'Quýt Bắc Kạn', description: 'Quýt vỏ vàng, mọng nước, chín dịp Tết.', imageSearch: 'Bắc Kạn mandarin' },
    ],
  },

  // ───────────────────────────── Lạng Sơn
  9: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 8310.2,
    population: 813_978,
    statsSource: KEEP,
    terrain:
      'Núi đất xen núi đá vôi, thung lũng Bắc Sơn và lòng chảo Thất Khê. Sông Kỳ Cùng chảy ngược về phía Trung Quốc. Cửa ngõ biên giới phía Bắc.',
    peaks: [{ name: 'Mẫu Sơn', heightM: 1541 }],
    culture: {
      cover: { caption: 'Ải Chi Lăng', wiki: 'Ải Chi Lăng' },
      summary:
        'Xứ Lạng với văn hóa Tày – Nùng, những làn điệu then, sli, lượn. Vùng đất biên ải gắn với nhiều chiến công chống giặc phương Bắc.',
      ethnicGroups: ['Nùng', 'Tày', 'Kinh', 'Dao', 'Sán Chay', "H'Mông"],
      heritage: [
        { name: 'Ải Chi Lăng', description: 'Cửa ải hiểm yếu gắn với chiến thắng Chi Lăng – Xương Giang 1427.', wiki: 'Ải Chi Lăng' },
        { name: 'Động Tam Thanh', description: 'Hang động có chùa và tượng nàng Tô Thị trên núi Vọng Phu.', wiki: 'Động Tam Thanh' },
        { name: 'Khu du lịch Mẫu Sơn', description: 'Núi cao mát mẻ, đôi khi có băng tuyết vào mùa đông.', wiki: 'Mẫu Sơn' },
        { name: 'Cửa khẩu Hữu Nghị', description: 'Cửa khẩu quốc tế quan trọng trên biên giới Việt – Trung.', wiki: 'Cửa khẩu Hữu Nghị' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Kỳ Cùng – Tả Phủ',
        time: '22 – 27 tháng Giêng âm lịch',
        description: 'Lễ hội lớn nhất xứ Lạng với rước kiệu từ đền Kỳ Cùng sang đền Tả Phủ.',
        wiki: 'Đền Kỳ Cùng',
      },
      {
        name: 'Lễ hội Lồng tồng',
        time: 'Tháng Giêng âm lịch',
        description: 'Ngày hội xuống đồng của người Tày, Nùng với tung còn, đánh yến.',
      },
      {
        name: 'Lễ hội đền Bắc Lệ',
        time: '18/9 âm lịch',
        description: 'Một trong những trung tâm thờ Mẫu lớn ở miền núi phía Bắc.',
        imageSearch: 'Đền Bắc Lệ',
      },
    ],
    foods: [
      { name: 'Vịt quay Lạng Sơn', description: 'Vịt nhồi lá mắc mật, quay giòn da.', imageSearch: 'vịt quay Lạng Sơn' },
      { name: 'Khâu nhục', description: 'Thịt ba chỉ hấp cách thủy với khoai môn, mềm tan.', wiki: 'Khâu nhục' },
      { name: 'Lợn quay lá mắc mật', description: 'Lợn quay da giòn, thơm lá mắc mật.', imageSearch: 'lợn quay Lạng Sơn' },
      { name: 'Bánh áp chao', description: 'Bánh rán nhân thịt, ăn kèm nước dùng xương.', imageSearch: 'bánh áp chao' },
    ],
    specialties: [
      { name: 'Hoa hồi', description: 'Gia vị thơm, Lạng Sơn là vùng trồng hồi lớn nhất cả nước.', wiki: 'Hồi (thực vật)' },
      { name: 'Na Chi Lăng', description: 'Na dai, ngọt, trồng trên núi đá vôi.', wiki: 'Na' },
      { name: 'Đào Mẫu Sơn', description: 'Quả đào chín vào mùa hè trên núi cao.' },
    ],
  },

  // ───────────────────────────── Quảng Ninh
  10: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 6207.9,
    population: 1_429_841,
    statsSource: KEEP,
    terrain:
      'Đồi núi chiếm phần lớn diện tích, bờ biển dài với hơn 2.000 hòn đảo trên vịnh Hạ Long, Bái Tử Long. Vùng than lớn nhất cả nước.',
    peaks: [{ name: 'Yên Tử', heightM: 1068 }],
    culture: {
      cover: { caption: 'Vịnh Hạ Long', wiki: 'Vịnh Hạ Long' },
      summary:
        'Yên Tử là nơi vua Trần Nhân Tông lập Thiền phái Trúc Lâm. Vùng mỏ mang văn hóa công nhân than, cùng văn hóa biển của ngư dân và các dân tộc Dao, Sán Dìu.',
      ethnicGroups: ['Kinh', 'Dao', 'Tày', 'Sán Dìu', 'Sán Chỉ', 'Hoa'],
      heritage: [
        { name: 'Vịnh Hạ Long', description: 'Di sản thiên nhiên thế giới UNESCO với hàng nghìn đảo đá vôi.', wiki: 'Vịnh Hạ Long' },
        {
          name: 'Quần thể Yên Tử',
          description: 'Thuộc Di sản thế giới Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc (2025).',
          wiki: 'Yên Tử',
        },
        { name: 'Bãi cọc Bạch Đằng', description: 'Dấu tích trận thủy chiến Bạch Đằng năm 1288.', wiki: 'Bãi cọc Bạch Đằng' },
        { name: 'Đảo Cô Tô', description: 'Quần đảo với bãi biển hoang sơ, nước trong xanh.' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Xuân Yên Tử',
        time: 'Mùng 10 tháng Giêng – hết tháng Ba âm lịch',
        description: 'Hành hương lên chùa Đồng trên đỉnh Yên Tử, đất tổ Thiền phái Trúc Lâm.',
        wiki: 'Yên Tử',
      },
      {
        name: 'Lễ hội Bạch Đằng',
        time: '8/3 âm lịch',
        description: 'Tưởng nhớ Trần Hưng Đạo và chiến thắng Bạch Đằng năm 1288.',
        wiki: 'Bãi cọc Bạch Đằng',
      },
      {
        name: 'Carnaval Hạ Long',
        time: 'Dịp 30/4 – 1/5 dương lịch',
        description: 'Lễ hội đường phố sôi động mở đầu mùa du lịch biển.',
        imageSearch: 'Carnaval Ha Long',
      },
    ],
    foods: [
      { name: 'Chả mực Hạ Long', description: 'Mực giã tay, rán vàng, dai giòn sần sật.', imageSearch: 'chả mực Hạ Long' },
      { name: 'Sá sùng', description: 'Hải sản quý, dùng nấu nước dùng phở hoặc xào, nướng.', wiki: 'Sá sùng' },
      { name: 'Ngán', description: 'Loài nhuyễn thể đặc trưng vùng biển Quảng Ninh.' },
      { name: 'Bánh gật gù', description: 'Bánh cuốn mỏng của người Tiên Yên, ăn với nước chấm.', imageSearch: 'bánh gật gù' },
    ],
    specialties: [
      { name: 'Trà hoa vàng Ba Chẽ', description: 'Loài trà quý có hoa màu vàng.', wiki: 'Trà hoa vàng' },
      { name: 'Ba kích', description: 'Dược liệu ngâm rượu nổi tiếng của vùng núi Quảng Ninh.', wiki: 'Ba kích' },
      { name: 'Gà Tiên Yên', description: 'Gà đồi thả vườn, thịt chắc, ngọt.', imageSearch: 'Tiên Yên chicken' },
    ],
  },

  // ───────────────────────────── Phú Thọ (Phú Thọ + Vĩnh Phúc + Hòa Bình)
  11: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 9361.38,
    population: 4_022_638,
    statsSource: NQ202,
    terrain:
      'Gồm vùng trung du đồi gò Phú Thọ, đồng bằng Vĩnh Phúc dưới chân dãy Tam Đảo và vùng núi Hòa Bình với hồ thủy điện Hòa Bình trên sông Đà.',
    peaks: [],
    culture: {
      cover: { caption: 'Đền Hùng', wiki: 'Đền Hùng' },
      summary:
        'Đất Tổ Hùng Vương, nơi khởi nguồn của dân tộc. Hát Xoan và tín ngưỡng thờ cúng Hùng Vương được UNESCO ghi danh; vùng Hòa Bình mang đậm văn hóa Mường.',
      ethnicGroups: ['Kinh', 'Mường', 'Dao', 'Tày', 'Thái', 'Sán Dìu'],
      heritage: [
        { name: 'Khu di tích lịch sử Đền Hùng', description: 'Nơi thờ các Vua Hùng trên núi Nghĩa Lĩnh.', wiki: 'Đền Hùng' },
        { name: 'Thủy điện Hòa Bình', description: 'Công trình thế kỷ trên sông Đà, hồ chứa rộng lớn.', wiki: 'Nhà máy thủy điện Hòa Bình' },
        { name: 'Tháp Bình Sơn', description: 'Tháp gạch cổ thời Trần cao nhất Việt Nam.', wiki: 'Tháp Bình Sơn' },
        { name: 'Thung lũng Mai Châu', description: 'Bản Lác, bản Poom Coọng của người Thái giữa cánh đồng.' },
      ],
    },
    festivals: [
      {
        name: 'Giỗ Tổ Hùng Vương',
        time: '10/3 âm lịch',
        description: '"Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mùng mười tháng ba".',
        wiki: 'Giỗ Tổ Hùng Vương',
      },
      {
        name: 'Hát Xoan đầu xuân',
        time: 'Mùa xuân, tháng Giêng âm lịch',
        description: 'Hát thờ cúng tại các miếu, đình làng Xoan; Di sản phi vật thể của nhân loại.',
        wiki: 'Hát Xoan',
      },
      {
        name: 'Lễ hội Khai hạ Mường Bi',
        time: 'Mùng 7 tháng Giêng âm lịch',
        description: 'Lễ hội xuống đồng lớn nhất của người Mường Hòa Bình.',
        imageSearch: 'Muong people Hoa Binh',
      },
    ],
    foods: [
      { name: 'Thịt chua Thanh Sơn', description: 'Thịt lợn lên men gói lá ổi, ăn với lá sung.', imageSearch: 'thịt chua Thanh Sơn' },
      { name: 'Cá thính Lập Thạch', description: 'Cá ủ với thính gạo rang, vị chua thơm.' },
      { name: 'Cơm lam', description: 'Gạo nếp nướng trong ống tre, món quen thuộc của người Mường.', wiki: 'Cơm lam' },
    ],
    specialties: [
      { name: 'Bưởi Đoan Hùng', description: 'Bưởi tiến vua, múi mọng, ngọt thanh.', imageSearch: 'Đoan Hùng pomelo' },
      { name: 'Cam Cao Phong', description: 'Cam ngọt đậm của vùng đồi Hòa Bình.', imageSearch: 'Cao Phong orange' },
      { name: 'Su su Tam Đảo', description: 'Su su trồng trên núi mát, giòn ngọt.', wiki: 'Su su' },
    ],
  },

  // ───────────────────────────── Bắc Ninh (Bắc Ninh + Bắc Giang)
  12: {
    region: 'Đồng bằng sông Hồng',
    areaKm2: 4718.6,
    population: 3_619_433,
    statsSource: NQ202,
    terrain:
      'Đồng bằng và trung du, có sông Đuống, sông Cầu, sông Thương chảy qua. Phía đông bắc là vùng đồi núi Lục Ngạn, Sơn Động.',
    peaks: [],
    culture: {
      cover: { caption: 'Dân ca Quan họ', wiki: 'Dân ca Quan họ' },
      summary:
        'Vùng Kinh Bắc với Dân ca Quan họ (UNESCO, 2009), tranh Đông Hồ và trung tâm Phật giáo cổ Luy Lâu. Phía Bắc Giang có khởi nghĩa Yên Thế và chùa Vĩnh Nghiêm.',
      ethnicGroups: ['Kinh', 'Nùng', 'Tày', 'Sán Chay', 'Sán Dìu', 'Hoa'],
      heritage: [
        { name: 'Chùa Dâu', description: 'Ngôi chùa cổ nhất Việt Nam, trung tâm Phật giáo Luy Lâu.', wiki: 'Chùa Dâu' },
        { name: 'Chùa Bút Tháp', description: 'Nổi tiếng với tượng Phật Bà Quan Âm nghìn mắt nghìn tay.', wiki: 'Chùa Bút Tháp' },
        {
          name: 'Chùa Vĩnh Nghiêm',
          description: 'Thuộc Di sản thế giới Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc; lưu giữ mộc bản kinh Phật.',
          wiki: 'Chùa Vĩnh Nghiêm',
        },
        { name: 'Đền Đô', description: 'Nơi thờ tám vị vua nhà Lý.', wiki: 'Đền Đô' },
      ],
    },
    festivals: [
      {
        name: 'Hội Lim',
        time: '13 tháng Giêng âm lịch',
        description: 'Lễ hội Quan họ lớn nhất, liền anh liền chị hát trên thuyền, trên đồi Lim.',
        wiki: 'Hội Lim',
      },
      {
        name: 'Lễ hội chùa Dâu',
        time: '8/4 âm lịch',
        description: 'Rước Tứ Pháp (Pháp Vân, Pháp Vũ, Pháp Lôi, Pháp Điện) cầu mưa thuận gió hòa.',
        wiki: 'Chùa Dâu',
      },
      {
        name: 'Lễ hội Yên Thế',
        time: '16/3 dương lịch',
        description: 'Tưởng nhớ Hoàng Hoa Thám và nghĩa quân khởi nghĩa Yên Thế.',
        imageSearch: 'Hoàng Hoa Thám',
      },
    ],
    foods: [
      { name: 'Bánh phu thê Đình Bảng', description: 'Bánh xu xê dẻo trong, nhân đậu xanh, gói lá chuối.', wiki: 'Bánh phu thê' },
      { name: 'Nem Bùi', description: 'Nem thính trộn bì lợn, ăn với lá sung, lá đinh lăng.', imageSearch: 'nem thính' },
      { name: 'Bánh đa Kế', description: 'Bánh đa nướng giòn của làng Kế, Bắc Giang.' },
      { name: 'Mỳ Chũ', description: 'Mỳ gạo phơi nắng của Lục Ngạn, sợi dai, thơm.' },
    ],
    specialties: [
      { name: 'Vải thiều Lục Ngạn', description: 'Vải chín mọng vào tháng 6, xuất khẩu nhiều nước.', imageSearch: 'Lục Ngạn lychee' },
      { name: 'Tranh Đông Hồ', description: 'Tranh dân gian in trên giấy dó, màu từ thiên nhiên.', wiki: 'Tranh Đông Hồ' },
      { name: 'Gốm Phù Lãng', description: 'Gốm men da lươn mộc mạc bên sông Cầu.', imageSearch: 'Phù Lãng pottery' },
    ],
  },

  // ───────────────────────────── Hải Phòng (Hải Phòng + Hải Dương)
  13: {
    region: 'Đồng bằng sông Hồng',
    areaKm2: 3194.72,
    population: 4_664_124,
    statsSource: NQ202,
    terrain:
      'Đồng bằng ven biển với nhiều cửa sông, quần đảo Cát Bà và đảo Bạch Long Vĩ. Phía bắc (Chí Linh, Kinh Môn) có đồi núi thấp.',
    peaks: [],
    culture: {
      cover: { caption: 'Quần đảo Cát Bà', wiki: 'Quần đảo Cát Bà' },
      summary:
        'Thành phố Cảng, "thành phố hoa phượng đỏ" với tính cách người dân bộc trực, phóng khoáng. Xứ Đông Hải Dương gắn với Côn Sơn – Kiếp Bạc, Nguyễn Trãi, Trần Hưng Đạo.',
      ethnicGroups: ['Kinh', 'Hoa', 'Sán Dìu', 'Tày'],
      heritage: [
        { name: 'Quần đảo Cát Bà', description: 'Khu dự trữ sinh quyển thế giới, vịnh Lan Hạ.', wiki: 'Quần đảo Cát Bà' },
        {
          name: 'Côn Sơn – Kiếp Bạc',
          description: 'Thuộc Di sản thế giới Yên Tử – Vĩnh Nghiêm – Côn Sơn, Kiếp Bạc (2025).',
          wiki: 'Đền Kiếp Bạc',
        },
        { name: 'Nhà hát lớn Hải Phòng', description: 'Công trình kiến trúc Pháp đầu thế kỷ XX.', wiki: 'Nhà hát lớn Hải Phòng' },
        { name: 'Bán đảo Đồ Sơn', description: 'Khu nghỉ mát biển lâu đời.', wiki: 'Đồ Sơn (quận)' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội chọi trâu Đồ Sơn',
        time: '9/8 âm lịch (vòng chung kết)',
        description: 'Lễ hội cổ truyền thờ Thành hoàng của vùng biển Đồ Sơn.',
        wiki: 'Lễ hội chọi trâu Đồ Sơn',
      },
      {
        name: 'Lễ hội Côn Sơn – Kiếp Bạc',
        time: 'Mùa xuân (tháng Giêng) và mùa thu (tháng Tám âm lịch)',
        description: 'Tưởng nhớ Trần Hưng Đạo, Nguyễn Trãi và Trần Nhân Tông.',
        wiki: 'Đền Kiếp Bạc',
      },
      {
        name: 'Lễ hội Hoa Phượng Đỏ',
        time: 'Tháng 5 dương lịch',
        description: 'Lễ hội văn hóa – du lịch khi phượng đỏ nở khắp thành phố.',
        imageSearch: 'Delonix regia Hai Phong',
      },
    ],
    foods: [
      { name: 'Bánh đa cua', description: 'Bánh đa đỏ, nước riêu cua đồng, chả lá lốt.', wiki: 'Bánh đa cua' },
      { name: 'Nem cua bể', description: 'Nem vuông nhân thịt cua biển, chiên giòn.', imageSearch: 'nem cua bể' },
      { name: 'Bánh đậu xanh Hải Dương', description: 'Bánh đậu xanh mịn, ngọt, thơm.', wiki: 'Bánh đậu xanh' },
      { name: 'Bánh gai Ninh Giang', description: 'Bánh lá gai đen dẻo, nhân đậu xanh, dừa.', wiki: 'Bánh gai' },
    ],
    specialties: [
      { name: 'Vải thiều Thanh Hà', description: 'Vải thiều nổi tiếng nhất, chín vào tháng 5 – 6.', imageSearch: 'Thanh Hà lychee' },
      { name: 'Gốm Chu Đậu', description: 'Gốm hoa lam cổ từng xuất khẩu đi khắp thế giới.', wiki: 'Gốm Chu Đậu' },
      { name: 'Nước mắm Cát Hải', description: 'Nước mắm cá cơm truyền thống của đảo Cát Hải.', wiki: 'Nước mắm' },
    ],
  },

  // ───────────────────────────── Hưng Yên (Hưng Yên + Thái Bình)
  14: {
    region: 'Đồng bằng sông Hồng',
    areaKm2: 2514.81,
    population: 3_567_943,
    statsSource: NQ202,
    terrain:
      'Hoàn toàn là đồng bằng châu thổ sông Hồng, không có đồi núi. Phía đông là bờ biển Thái Bình với các cửa sông Trà Lý, Diêm Điền.',
    peaks: [],
    culture: {
      cover: { caption: 'Phố Hiến', wiki: 'Phố Hiến' },
      summary:
        '"Thứ nhất Kinh Kỳ, thứ nhì Phố Hiến" – thương cảng sầm uất xưa. Thái Bình là "quê lúa", quê hương nhà Trần, chiếu cói và nghệ thuật chèo, múa rối nước.',
      ethnicGroups: ['Kinh'],
      heritage: [
        { name: 'Phố Hiến', description: 'Quần thể di tích thương cảng cổ thế kỷ XVI – XVII.', wiki: 'Phố Hiến' },
        { name: 'Chùa Keo', description: 'Kiệt tác kiến trúc gỗ thời Lê với gác chuông cổ.', wiki: 'Chùa Keo (Thái Bình)' },
        { name: 'Đền Trần Thái Bình', description: 'Nơi thờ các vua Trần tại quê hương nhà Trần.', wiki: 'Đền Trần (Thái Bình)' },
        { name: 'Đền Chử Đồng Tử', description: 'Gắn với truyền thuyết Chử Đồng Tử – Tiên Dung.', wiki: 'Chử Đồng Tử' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Chử Đồng Tử – Tiên Dung',
        time: '10 – 12/2 âm lịch',
        description: 'Tưởng nhớ một trong "tứ bất tử" của tín ngưỡng dân gian Việt.',
        wiki: 'Chử Đồng Tử',
      },
      {
        name: 'Lễ hội chùa Keo',
        time: 'Mùa thu, 13 – 15/9 âm lịch',
        description: 'Có thi bơi chải, rước kiệu, tưởng nhớ Thiền sư Không Lộ.',
        wiki: 'Chùa Keo (Thái Bình)',
      },
      {
        name: 'Lễ hội đền Trần Thái Bình',
        time: 'Tháng Giêng âm lịch',
        description: 'Tưởng nhớ các vua Trần, tái hiện nghi lễ cung đình.',
        wiki: 'Đền Trần (Thái Bình)',
      },
    ],
    foods: [
      { name: 'Canh cá Quỳnh Côi', description: 'Bánh đa nấu với cá rô đồng, rau cần, cải cúc.', imageSearch: 'canh cá Quỳnh Côi' },
      { name: 'Bánh cáy Thái Bình', description: 'Bánh làm từ gạo nếp, gấc, vừng, mỡ phần.', wiki: 'Bánh cáy' },
      { name: 'Gà Đông Tảo', description: 'Giống gà chân to quý hiếm của Khoái Châu.', wiki: 'Gà Đông Tảo' },
    ],
    specialties: [
      { name: 'Nhãn lồng Hưng Yên', description: 'Nhãn tiến vua cùi dày, ngọt sắc.', imageSearch: 'Hưng Yên longan' },
      { name: 'Tương Bần', description: 'Tương nếp truyền thống của Mỹ Hào.', imageSearch: 'tương Bần' },
      { name: 'Chiếu cói Thái Bình', description: 'Chiếu dệt từ cói ven biển.', imageSearch: 'chiếu cói' },
    ],
  },

  // ───────────────────────────── Ninh Bình (Ninh Bình + Hà Nam + Nam Định)
  15: {
    region: 'Đồng bằng sông Hồng',
    areaKm2: 3942.62,
    population: 4_412_264,
    statsSource: NQ202,
    terrain:
      'Đồng bằng ven biển xen núi đá vôi Tràng An, rừng Cúc Phương phía tây. Các cửa sông Đáy, Ba Lạt và bãi bồi Kim Sơn, Giao Thủy lấn ra biển.',
    peaks: [],
    culture: {
      cover: { caption: 'Quần thể danh thắng Tràng An', wiki: 'Quần thể danh thắng Tràng An' },
      summary:
        'Cố đô Hoa Lư của nhà Đinh, Tiền Lê; Nam Định là quê hương nhà Trần và trung tâm thờ Mẫu Phủ Dầy; Hà Nam có trống đồng Ngọc Lũ và làng Vũ Đại.',
      ethnicGroups: ['Kinh', 'Mường'],
      heritage: [
        {
          name: 'Quần thể danh thắng Tràng An',
          description: 'Di sản thế giới hỗn hợp văn hóa và thiên nhiên đầu tiên ở Đông Nam Á (2014).',
          wiki: 'Quần thể danh thắng Tràng An',
        },
        { name: 'Cố đô Hoa Lư', description: 'Kinh đô đầu tiên của nhà nước phong kiến tập quyền.', wiki: 'Cố đô Hoa Lư' },
        { name: 'Vườn quốc gia Cúc Phương', description: 'Vườn quốc gia đầu tiên của Việt Nam (1962).', wiki: 'Vườn quốc gia Cúc Phương' },
        { name: 'Nhà thờ Phát Diệm', description: 'Nhà thờ đá kết hợp kiến trúc đình chùa Việt.', wiki: 'Nhà thờ chính tòa Phát Diệm' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Phủ Dầy',
        time: '1 – 10/3 âm lịch',
        description: 'Trung tâm thờ Mẫu Liễu Hạnh; tín ngưỡng thờ Mẫu Tam phủ là di sản UNESCO.',
        wiki: 'Phủ Dầy',
      },
      {
        name: 'Lễ khai ấn đền Trần',
        time: 'Đêm 14 tháng Giêng âm lịch',
        description: 'Nghi lễ phát ấn đầu năm tại đền Trần Nam Định.',
        wiki: 'Đền Trần (Nam Định)',
      },
      {
        name: 'Lễ hội Hoa Lư',
        time: 'Tháng Ba âm lịch',
        description: 'Tưởng nhớ vua Đinh Tiên Hoàng và vua Lê Đại Hành.',
        wiki: 'Cố đô Hoa Lư',
      },
    ],
    foods: [
      { name: 'Cơm cháy Ninh Bình', description: 'Cơm cháy giòn rụm chan sốt thịt bò, tim cật.', wiki: 'Cơm cháy' },
      { name: 'Thịt dê núi', description: 'Dê thả trên núi đá vôi, làm tái chanh, nướng.', imageSearch: 'dê núi Ninh Bình' },
      { name: 'Phở bò Nam Định', description: 'Một trong những cái nôi của phở Việt.' },
      { name: 'Gỏi cá nhệch Kim Sơn', description: 'Cá nhệch vùng nước lợ cuốn với lá rừng.', imageSearch: 'gỏi cá nhệch' },
    ],
    specialties: [
      { name: 'Cá kho làng Vũ Đại', description: 'Cá trắm kho niêu đất nhiều giờ, xương mềm.' },
      { name: 'Rượu Kim Sơn', description: 'Rượu gạo nếp truyền thống của Kim Sơn.' },
      { name: 'Kẹo Sìu Châu', description: 'Kẹo lạc vừng truyền thống của Nam Định.', imageSearch: 'kẹo Sìu Châu' },
    ],
  },

  // ───────────────────────────── Hà Nội
  1: {
    region: 'Đồng bằng sông Hồng',
    areaKm2: 3359.84,
    population: 8_718_000,
    statsSource: 'Thống kê 2024 (ước tính) · không thay đổi địa giới',
    terrain:
      'Phần lớn là đồng bằng thấp ven sông Hồng, độ cao phổ biến 5–20 m. Vùng đồi núi thấp ở phía tây (Ba Vì) và phía bắc (Sóc Sơn).',
    peaks: [{ name: 'Đỉnh Vua – núi Ba Vì', heightM: 1296, highest: true }],
    culture: {
      cover: { caption: 'Đền Ngọc Sơn bên hồ Hoàn Kiếm', wiki: 'Hồ Hoàn Kiếm' },
      summary:
        'Kinh đô Thăng Long từ năm 1010, trung tâm văn hóa nghìn năm của cả nước. Nổi tiếng với khu phố cổ "36 phố phường", hệ thống làng nghề truyền thống và nếp sống thanh lịch của người Tràng An.',
      ethnicGroups: ['Kinh', 'Mường', 'Dao'],
      heritage: [
        {
          name: 'Hoàng thành Thăng Long',
          description: 'Di sản thế giới UNESCO (2010), trung tâm quyền lực qua nhiều triều đại.',
          wiki: 'Hoàng thành Thăng Long',
        },
        {
          name: 'Văn Miếu – Quốc Tử Giám',
          description: 'Trường đại học đầu tiên của Việt Nam, xây dựng năm 1070.',
          wiki: 'Văn Miếu – Quốc Tử Giám',
        },
        { name: 'Khu phố cổ Hà Nội', description: 'Khu "36 phố phường" buôn bán sầm uất từ xưa.', wiki: 'Khu phố cổ Hà Nội' },
        { name: 'Chùa Một Cột', description: 'Ngôi chùa có kiến trúc độc đáo dựng trên một cột đá.', wiki: 'Chùa Một Cột' },
        { name: 'Làng gốm Bát Tràng', description: 'Làng nghề gốm sứ hơn 500 năm tuổi bên sông Hồng.', wiki: 'Gốm Bát Tràng' },
      ],
    },
    festivals: [
      {
        name: 'Hội Gióng đền Sóc & đền Phù Đổng',
        time: 'Tháng Giêng & tháng Tư âm lịch',
        description: 'Tái hiện chiến công của Thánh Gióng đánh giặc Ân. Được UNESCO ghi danh là Di sản văn hóa phi vật thể.',
        wiki: 'Hội Gióng',
      },
      {
        name: 'Lễ hội chùa Hương',
        time: 'Khai hội mùng 6 tháng Giêng, kéo dài đến tháng 3 âm lịch',
        description: 'Lễ hội hành hương lớn nhất miền Bắc, du khách đi đò dọc suối Yến vào động Hương Tích.',
        wiki: 'Chùa Hương',
      },
      {
        name: 'Hội Gò Đống Đa',
        time: 'Mùng 5 Tết Nguyên đán',
        description: 'Kỷ niệm chiến thắng Ngọc Hồi – Đống Đa của vua Quang Trung năm 1789.',
        wiki: 'Gò Đống Đa',
      },
    ],
    foods: [
      { name: 'Phở Hà Nội', description: 'Nước dùng xương bò trong, thơm quế hồi, bánh phở mềm mỏng.', wiki: 'Phở' },
      { name: 'Bún chả', description: 'Chả viên và chả miếng nướng than hoa, ăn với bún và nước chấm chua ngọt.', wiki: 'Bún chả' },
      { name: 'Bún thang', description: 'Món bún cầu kỳ với gà xé, giò lụa, trứng tráng thái sợi.', wiki: 'Bún thang', imageFile: 'Bún thang.JPG' },
      {
        name: 'Chả cá Lã Vọng',
        description: 'Cá lăng ướp nghệ, rán trên chảo cùng thì là, ăn kèm bún và mắm tôm.',
        wiki: 'Chả cá Lã Vọng',
      },
      { name: 'Bánh cuốn Thanh Trì', description: 'Bánh tráng mỏng như lụa, ăn với chả quế và nước mắm.', wiki: 'Bánh cuốn' },
    ],
    specialties: [
      { name: 'Cốm làng Vòng', description: 'Cốm từ lúa nếp non, đặc sản mùa thu Hà Nội.', wiki: 'Cốm' },
      { name: 'Ô mai Hàng Đường', description: 'Ô mai mơ, sấu, mận… làm theo công thức gia truyền.', wiki: 'Ô mai' },
      { name: 'Gốm Bát Tràng', description: 'Đồ gốm sứ thủ công của làng nghề hơn 500 năm tuổi.', wiki: 'Gốm Bát Tràng' },
      { name: 'Lụa Vạn Phúc', description: 'Lụa tơ tằm dệt thủ công tại Hà Đông.', wiki: 'Làng lụa Vạn Phúc' },
    ],
  },

  // ───────────────────────────── Lào Cai (Lào Cai + Yên Bái)
  4: {
    region: 'Trung du và miền núi phía Bắc',
    areaKm2: 13256.92,
    population: 1_778_785,
    statsSource: NQ202,
    terrain:
      'Địa hình núi cao hiểm trở, bị chia cắt bởi thung lũng sông Hồng và sông Chảy. Dãy Hoàng Liên Sơn chạy dọc phía tây với nhiều đỉnh trên 2.500 m; nổi tiếng với ruộng bậc thang.',
    peaks: [{ name: 'Fansipan – "Nóc nhà Đông Dương"', heightM: 3143, highest: true }],
    culture: {
      cover: { caption: 'Ruộng bậc thang Mù Cang Chải', wiki: 'Ruộng bậc thang Mù Cang Chải' },
      summary:
        'Vùng đất của nhiều dân tộc thiểu số với chợ phiên vùng cao, trang phục thổ cẩm rực rỡ và những thửa ruộng bậc thang kỳ vĩ được tạo nên qua nhiều thế hệ.',
      ethnicGroups: ["H'Mông", 'Dao', 'Tày', 'Thái', 'Giáy', 'Kinh'],
      heritage: [
        { name: 'Sa Pa', description: 'Thị trấn nghỉ mát trong sương mù giữa dãy Hoàng Liên Sơn.', wiki: 'Sa Pa' },
        { name: 'Đỉnh Fansipan', description: 'Đỉnh núi cao nhất Việt Nam và bán đảo Đông Dương (3.143 m).', wiki: 'Fansipan' },
        { name: 'Chợ phiên Bắc Hà', description: 'Chợ phiên Chủ nhật lớn và đông vui bậc nhất vùng cao.', wiki: 'Chợ phiên Bắc Hà' },
        { name: 'Đền Bảo Hà', description: 'Ngôi đền thờ danh tướng Hoàng Bảy bên bờ sông Hồng.', wiki: 'Đền Bảo Hà' },
        { name: 'Hồ Thác Bà', description: 'Một trong những hồ nhân tạo lớn nhất Việt Nam.', wiki: 'Hồ Thác Bà', imageFile: 'Thác Bà Lake.jpg' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Gầu Tào',
        time: 'Dịp Tết, đầu xuân',
        description: "Lễ hội cầu phúc, cầu mùa của người H'Mông với múa khèn, ném pao, đánh tu lu.",
      },
      {
        name: 'Lễ hội Roóng Poọc (Xuống đồng)',
        time: 'Tháng Giêng âm lịch',
        description: 'Lễ hội cầu mùa của người Giáy ở Tả Van (Sa Pa), có nghi thức ném còn qua vòng.',
        imageSearch: 'Ta Van Sapa',
      },
      {
        name: 'Lễ hội đền Bảo Hà',
        time: '17/7 âm lịch',
        description: 'Tưởng nhớ danh tướng Hoàng Bảy, người có công giữ yên vùng biên ải.',
        wiki: 'Đền Bảo Hà',
      },
      {
        name: 'Tuần văn hóa – du lịch Mù Cang Chải',
        time: 'Tháng 9 – 10 dương lịch (mùa lúa chín)',
        description: 'Diễn ra vào mùa ruộng bậc thang vàng óng, kèm bay dù lượn trên đèo Khau Phạ.',
        wiki: 'Đèo Khau Phạ',
        imageFile: 'Paraglider above the top of Khau Pha Pass, Mu Cang Chai.jpg',
      },
    ],
    foods: [
      { name: 'Thắng cố', description: "Món hầm truyền thống của người H'Mông, thường bán ở chợ phiên.", wiki: 'Thắng cố' },
      { name: 'Cá hồi Sa Pa', description: 'Cá hồi nuôi bằng nước suối lạnh vùng cao, làm gỏi hoặc lẩu.', },
      { name: 'Lợn cắp nách', description: 'Lợn bản nhỏ thả rông, thịt săn chắc, thường nướng hoặc quay.', wiki: 'Lợn cắp nách' },
      { name: 'Xôi ngũ sắc', description: 'Xôi nhuộm màu từ lá, củ rừng, xuất hiện trong lễ tết.', wiki: 'Xôi', imageFile: 'Xôi ngũ sắc.JPG' },
    ],
    specialties: [
      { name: 'Cốm Tú Lệ', description: 'Cốm dẻo thơm từ nếp Tú Lệ (Văn Chấn), mùa cốm tháng 9 – 10.', wiki: 'Cốm' },
      { name: 'Mận Bắc Hà', description: 'Mận hậu chín vào khoảng tháng 5 – 6.', wiki: 'Mận' },
      { name: 'Chè Shan tuyết Suối Giàng', description: 'Chè từ những cây chè cổ thụ trên núi cao.', wiki: 'Chè Shan tuyết' },
      { name: 'Quế Văn Yên', description: 'Vỏ quế tinh dầu cao, dùng làm gia vị và dược liệu.', wiki: 'Quế' },
      { name: 'Rượu ngô Bắc Hà', description: 'Rượu nấu từ ngô và men lá truyền thống.', wiki: 'Rượu ngô Bản Phố' },
    ],
  },
}
