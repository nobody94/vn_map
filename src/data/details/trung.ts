import type { ProvinceDetail } from '../../types/province'

const NQ202 = 'Nghị quyết 202/2025/QH15'
const KEEP = 'Số liệu tổng hợp khi sắp xếp ĐVHC 2025 · không thay đổi địa giới'

/** Miền Trung & Tây Nguyên: mã 16 – 26 */
export const TRUNG: Partial<Record<number, ProvinceDetail>> = {
  // ───────────────────────────── Thanh Hóa
  16: {
    region: 'Bắc Trung Bộ',
    areaKm2: 11114.7,
    population: 3_760_650,
    statsSource: KEEP,
    terrain:
      'Có đủ ba vùng: núi và trung du phía tây, đồng bằng sông Mã – sông Chu ở giữa, và dải ven biển dài hơn 100 km với bãi biển Sầm Sơn.',
    peaks: [],
    culture: {
      cover: { caption: 'Thành nhà Hồ', wiki: 'Thành nhà Hồ' },
      summary:
        'Xứ Thanh "địa linh nhân kiệt" – cái nôi văn hóa Đông Sơn, quê hương của Bà Triệu, Lê Lợi và các chúa Trịnh, chúa Nguyễn. Vùng núi có văn hóa Mường, Thái đặc sắc.',
      ethnicGroups: ['Kinh', 'Mường', 'Thái', "H'Mông", 'Dao', 'Thổ', 'Khơ Mú'],
      heritage: [
        { name: 'Thành nhà Hồ', description: 'Di sản thế giới UNESCO (2011), thành đá độc đáo thế kỷ XIV.', wiki: 'Thành nhà Hồ' },
        { name: 'Khu di tích Lam Kinh', description: 'Kinh đô thứ hai thời Hậu Lê, nơi an táng vua Lê Lợi.', wiki: 'Lam Kinh' },
        { name: 'Bãi biển Sầm Sơn', description: 'Khu nghỉ mát biển nổi tiếng từ đầu thế kỷ XX.', imageSearch: 'Sam Son beach' },
        { name: 'Vườn quốc gia Bến En', description: 'Hồ sông Mực và rừng nguyên sinh nhiều loài quý.', wiki: 'Vườn quốc gia Bến En' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Lam Kinh',
        time: '21 – 22/8 âm lịch',
        description: 'Tưởng nhớ vua Lê Thái Tổ và các anh hùng khởi nghĩa Lam Sơn.',
        wiki: 'Lam Kinh',
      },
      {
        name: 'Lễ hội đền Bà Triệu',
        time: '21 – 24/2 âm lịch',
        description: 'Tưởng nhớ nữ anh hùng Triệu Thị Trinh.',
        wiki: 'Đền Bà Triệu',
      },
      {
        name: 'Lễ hội Pôồn Pôông',
        time: 'Tháng Giêng âm lịch',
        description: 'Lễ hội dân gian của người Mường với các trò diễn, hát múa cầu mùa.',
      },
    ],
    foods: [
      { name: 'Nem chua Thanh Hóa', description: 'Nem thịt lợn lên men gói lá chuối, chua cay.', wiki: 'Nem chua' },
      { name: 'Bánh gai Tứ Trụ', description: 'Bánh lá gai nhân đậu xanh, dừa, mỡ phần.', wiki: 'Bánh gai' },
      { name: 'Chè lam Phủ Quảng', description: 'Bánh làm từ bột nếp, mật mía, gừng, lạc.', wiki: 'Chè lam' },
    ],
    specialties: [
      { name: 'Chiếu cói Nga Sơn', description: 'Chiếu dệt từ cói ven biển, bền và mát.' },
      { name: 'Mắm tép Hà Yên', description: 'Mắm tép đồng truyền thống, đậm vị.', imageSearch: 'mắm tép' },
      { name: 'Quế Ngọc Thường Xuân', description: 'Quế quý, tinh dầu cao, xưa dùng tiến vua.', wiki: 'Quế' },
    ],
  },

  // ───────────────────────────── Nghệ An
  17: {
    region: 'Bắc Trung Bộ',
    areaKm2: 16493.7,
    population: 3_470_988,
    statsSource: KEEP,
    terrain:
      'Núi cao Trường Sơn chiếm phần lớn phía tây giáp Lào; đồng bằng nhỏ hẹp và bờ biển ở phía đông. Sông Lam (sông Cả) là con sông lớn nhất.',
    peaks: [{ name: 'Pu Xai Lai Leng', heightM: 2711, highest: true }],
    culture: {
      cover: { caption: 'Khu di tích Kim Liên', wiki: 'Khu di tích Kim Liên' },
      summary:
        'Quê hương của Chủ tịch Hồ Chí Minh và nhiều danh nhân. Dân ca Ví, Giặm Nghệ Tĩnh được UNESCO ghi danh (2014). Người xứ Nghệ nổi tiếng hiếu học, cần cù.',
      ethnicGroups: ['Kinh', 'Thái', 'Khơ Mú', "H'Mông", 'Ơ Đu', 'Thổ'],
      heritage: [
        { name: 'Khu di tích Kim Liên', description: 'Làng Sen, làng Hoàng Trù – quê nội, quê ngoại của Bác Hồ.', wiki: 'Khu di tích Kim Liên' },
        { name: 'Vườn quốc gia Pù Mát', description: 'Thuộc Khu dự trữ sinh quyển miền Tây Nghệ An.', wiki: 'Vườn quốc gia Pù Mát' },
        { name: 'Bãi biển Cửa Lò', description: 'Bãi biển cát trắng, nước trong xanh.', imageSearch: 'Cua Lo beach' },
        { name: 'Đền Cuông', description: 'Thờ An Dương Vương, gắn với truyền thuyết nỏ thần.', wiki: 'Đền Cuông' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Làng Sen',
        time: '19/5 dương lịch',
        description: 'Kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh tại quê hương Nam Đàn.',
        wiki: 'Khu di tích Kim Liên',
      },
      {
        name: 'Lễ hội đền Cuông',
        time: 'Rằm tháng Hai âm lịch',
        description: 'Tưởng nhớ An Dương Vương, có rước kiệu, hát ví giặm.',
        wiki: 'Đền Cuông',
      },
      {
        name: 'Lễ hội đền Ông Hoàng Mười',
        time: '10/10 âm lịch',
        description: 'Lễ hội lớn của tín ngưỡng thờ Mẫu bên bờ sông Lam.',
        imageSearch: 'Đền Ông Hoàng Mười',
      },
    ],
    foods: [
      { name: 'Cháo lươn Vinh', description: 'Cháo nấu với lươn xào nghệ, ăn kèm bánh mướt.' },
      { name: 'Nhút Thanh Chương', description: 'Mít non muối chua, món dân dã xứ Nghệ.' },
      { name: 'Bánh mướt Diễn Châu', description: 'Bánh tráng mỏng mịn, ăn với chả, nước mắm.', imageSearch: 'bánh mướt' },
    ],
    specialties: [
      { name: 'Cam Vinh', description: 'Cam xã Đoài vỏ mỏng, ngọt thơm.', imageSearch: 'Cam Vinh' },
      { name: 'Tương Nam Đàn', description: 'Tương ngô, đậu nành ủ chum truyền thống.' },
      { name: 'Chè xanh xứ Nghệ', description: 'Nước chè xanh đặc, uống trong bát.' },
    ],
  },

  // ───────────────────────────── Hà Tĩnh
  18: {
    region: 'Bắc Trung Bộ',
    areaKm2: 5994.4,
    population: 1_329_365,
    statsSource: 'Số liệu thống kê đến 4/2024 (nguồn tổng hợp, cần đối chiếu) · không thay đổi địa giới',
    terrain:
      'Dải đất hẹp nằm giữa dãy Trường Sơn phía tây và biển Đông phía đông, với bờ biển dài khoảng 137 km. Phía bắc là núi Hồng Lĩnh và sông Lam.',
    peaks: [],
    culture: {
      cover: { caption: 'Ngã ba Đồng Lộc', wiki: 'Ngã ba Đồng Lộc' },
      summary:
        'Quê hương Đại thi hào Nguyễn Du, Hải Thượng Lãn Ông. Chung với Nghệ An làn điệu Ví, Giặm; vùng đất "chảo lửa" với Ngã ba Đồng Lộc trong kháng chiến.',
      ethnicGroups: ['Kinh', 'Chứt', 'Lào', 'Mường'],
      heritage: [
        { name: 'Ngã ba Đồng Lộc', description: 'Nơi hy sinh của 10 cô gái thanh niên xung phong năm 1968.', wiki: 'Ngã ba Đồng Lộc' },
        { name: 'Khu lưu niệm Nguyễn Du', description: 'Quê hương tác giả Truyện Kiều ở Tiên Điền.', wiki: 'Nguyễn Du' },
        { name: 'Chùa Hương Tích', description: '"Hoan Châu đệ nhất danh lam" trên núi Hồng Lĩnh.', wiki: 'Chùa Hương Tích' },
        { name: 'Biển Thiên Cầm', description: 'Bãi biển gắn với truyền thuyết vua Thục chơi đàn.', wiki: 'Thiên Cầm' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội chùa Hương Tích',
        time: 'Mùa xuân, tháng Giêng – tháng Ba âm lịch',
        description: 'Hành hương lên ngôi chùa cổ trên dãy Hồng Lĩnh.',
        wiki: 'Chùa Hương Tích',
      },
      {
        name: 'Lễ giỗ Đại thi hào Nguyễn Du',
        time: '10/8 âm lịch',
        description: 'Tưởng niệm Nguyễn Du tại khu lưu niệm ở Tiên Điền.',
        wiki: 'Nguyễn Du',
      },
      {
        name: 'Lễ hội cầu ngư',
        time: 'Đầu năm âm lịch',
        description: 'Ngư dân ven biển cầu mùa cá bội thu, ra khơi bình an.',
        wiki: 'Tục thờ cá Ông',
      },
    ],
    foods: [
      { name: 'Ram bánh mướt', description: 'Ram chiên giòn cuốn cùng bánh mướt và rau sống.' },
      { name: 'Mực nhảy Vũng Áng', description: 'Mực câu tươi rói, làm hấp, nướng.', imageSearch: 'fresh squid Vietnam' },
      { name: 'Bánh đa vừng', description: 'Bánh đa nướng giòn rắc vừng đen.' },
    ],
    specialties: [
      { name: 'Kẹo cu đơ', description: 'Kẹo lạc mật mía gừng kẹp bánh đa.', wiki: 'Kẹo cu đơ' },
      { name: 'Bưởi Phúc Trạch', description: 'Bưởi múi hồng, ngọt thanh, vỏ thơm.', imageSearch: 'Phúc Trạch pomelo' },
      { name: 'Cam bù Hương Sơn', description: 'Cam vỏ dày, ngọt đậm, chín dịp Tết.', imageSearch: 'cam bù Hương Sơn' },
    ],
  },

  // ───────────────────────────── Quảng Trị (Quảng Trị + Quảng Bình)
  19: {
    region: 'Bắc Trung Bộ',
    areaKm2: 12700,
    population: 1_870_845,
    statsSource: NQ202,
    terrain:
      'Dải đất hẹp ngang, phía tây là núi đá vôi Phong Nha – Kẻ Bàng với hệ thống hang động lớn; phía đông là đồi cát ven biển. Có sông Gianh, sông Bến Hải.',
    peaks: [],
    culture: {
      cover: { caption: 'Động Phong Nha', wiki: 'Động Phong Nha' },
      summary:
        'Vùng đất chia cắt hai miền bên vĩ tuyến 17, chứng tích chiến tranh ác liệt. Quảng Bình là quê hương Đại tướng Võ Nguyên Giáp, có những hang động đẹp nhất thế giới.',
      ethnicGroups: ['Kinh', 'Vân Kiều', 'Pa Kô', 'Chứt'],
      heritage: [
        {
          name: 'Vườn quốc gia Phong Nha – Kẻ Bàng',
          description: 'Di sản thiên nhiên thế giới UNESCO.',
          wiki: 'Vườn quốc gia Phong Nha – Kẻ Bàng',
        },
        { name: 'Hang Sơn Đoòng', description: 'Hang động tự nhiên lớn nhất thế giới.', imageSearch: 'Son Doong cave' },
        { name: 'Thành cổ Quảng Trị', description: 'Chứng tích 81 ngày đêm khốc liệt năm 1972.', wiki: 'Thành cổ Quảng Trị' },
        { name: 'Cầu Hiền Lương', description: 'Cây cầu trên sông Bến Hải, biểu tượng khát vọng thống nhất.', imageSearch: 'Hien Luong bridge' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Thống nhất non sông',
        time: 'Dịp 30/4 dương lịch',
        description: 'Tổ chức tại đôi bờ Hiền Lương – Bến Hải.',
        imageSearch: 'Hien Luong bridge',
      },
      {
        name: 'Lễ hội đua thuyền sông Kiến Giang',
        time: 'Dịp 2/9 dương lịch',
        description: 'Đua thuyền truyền thống sôi nổi của Lệ Thủy, Quảng Bình.',
      },
      {
        name: 'Lễ hội cầu ngư',
        time: 'Đầu năm âm lịch',
        description: 'Ngư dân các làng biển cầu mưa thuận gió hòa.',
        wiki: 'Tục thờ cá Ông',
      },
    ],
    foods: [
      { name: 'Cháo canh Quảng Bình', description: 'Bánh canh sợi bột gạo nấu với cá lóc hoặc thịt.' },
      { name: 'Bánh bột lọc', description: 'Bánh trong suốt nhân tôm thịt, gói lá chuối.', imageSearch: 'bánh bột lọc Huế' },
      { name: 'Bánh ướt thịt nướng', description: 'Bánh ướt cuốn thịt heo nướng, rau sống.', imageSearch: 'bánh ướt thịt nướng' },
    ],
    specialties: [
      { name: 'Khoai deo', description: 'Khoai lang sấy dẻo, ngọt tự nhiên.', imageSearch: 'khoai deo' },
      { name: 'Hồ tiêu Quảng Trị', description: 'Tiêu đất đỏ bazan Cồn Tiên, Vĩnh Linh.', wiki: 'Hồ tiêu' },
      { name: 'Cà phê Khe Sanh', description: 'Cà phê vùng cao nguyên Hướng Hóa.', wiki: 'Cà phê chè' },
    ],
  },

  // ───────────────────────────── Huế
  20: {
    region: 'Bắc Trung Bộ',
    areaKm2: 4947.1,
    population: 1_236_393,
    statsSource: KEEP,
    terrain:
      'Từ núi Trường Sơn phía tây xuống đồng bằng và hệ đầm phá Tam Giang – Cầu Hai lớn nhất Đông Nam Á. Sông Hương chảy qua lòng thành phố.',
    peaks: [{ name: 'Bạch Mã', heightM: 1450 }],
    culture: {
      cover: { caption: 'Kinh thành Huế', wiki: 'Kinh thành Huế' },
      summary:
        'Kinh đô của triều Nguyễn (1802 – 1945). Nhã nhạc cung đình Huế là kiệt tác phi vật thể của nhân loại; nổi tiếng với ẩm thực cung đình, áo dài tím và nón bài thơ.',
      ethnicGroups: ['Kinh', 'Tà Ôi', 'Cơ Tu', 'Bru – Vân Kiều'],
      heritage: [
        {
          name: 'Quần thể di tích Cố đô Huế',
          description: 'Di sản thế giới đầu tiên của Việt Nam (1993).',
          wiki: 'Quần thể di tích Cố đô Huế',
        },
        { name: 'Chùa Thiên Mụ', description: 'Ngôi chùa cổ với tháp Phước Duyên bên sông Hương.', wiki: 'Chùa Thiên Mụ' },
        { name: 'Lăng Khải Định', description: 'Lăng tẩm kết hợp kiến trúc Đông – Tây độc đáo.', wiki: 'Lăng Khải Định' },
        { name: 'Vườn quốc gia Bạch Mã', description: 'Rừng nhiệt đới và khu nghỉ mát từ thời Pháp.', wiki: 'Vườn quốc gia Bạch Mã' },
      ],
    },
    festivals: [
      {
        name: 'Festival Huế',
        time: 'Tổ chức theo mùa trong năm',
        description: 'Lễ hội văn hóa nghệ thuật với tái hiện nghi lễ cung đình.',
        wiki: 'Festival Huế',
      },
      {
        name: 'Lễ hội điện Hòn Chén',
        time: 'Tháng Ba và tháng Bảy âm lịch',
        description: 'Lễ hội thờ Mẫu Thiên Y A Na với rước kiệu trên sông Hương.',
        wiki: 'Điện Hòn Chén',
      },
      {
        name: 'Lễ tế Nam Giao',
        time: 'Tái hiện trong dịp Festival Huế',
        description: 'Nghi lễ tế trời đất quan trọng nhất của triều Nguyễn.',
        wiki: 'Đàn Nam Giao',
      },
    ],
    foods: [
      { name: 'Bún bò Huế', description: 'Nước dùng sả, mắm ruốc, ăn với giò heo, chả cua.', wiki: 'Bún bò Huế' },
      { name: 'Cơm hến', description: 'Cơm nguội trộn hến, tóp mỡ, rau sống, mắm ruốc.', wiki: 'Cơm hến' },
      { name: 'Bánh bèo', description: 'Bánh hấp chén nhỏ, rắc tôm chấy, tóp mỡ.', wiki: 'Bánh bèo' },
      { name: 'Chè Huế', description: 'Hàng chục loại chè, nổi tiếng chè bột lọc heo quay.', imageSearch: 'chè Huế' },
    ],
    specialties: [
      { name: 'Mè xửng', description: 'Kẹo mạch nha dẻo phủ mè.', wiki: 'Mè xửng' },
      { name: 'Nón bài thơ', description: 'Nón lá mỏng kẹp thơ, cảnh xứ Huế.' },
      { name: 'Tôm chua', description: 'Tôm lên men với riềng, tỏi, ớt, măng đu đủ.', imageSearch: 'tôm chua Huế' },
    ],
  },

  // ───────────────────────────── Quảng Ngãi (Quảng Ngãi + Kon Tum)
  22: {
    region: 'Duyên hải Nam Trung Bộ & Tây Nguyên',
    areaKm2: 14832.55,
    population: 2_161_755,
    statsSource: NQ202,
    terrain:
      'Đồng bằng ven biển nhỏ hẹp và đảo Lý Sơn ở phía đông; phía tây là cao nguyên Kon Tum và khối núi Ngọc Linh cao nhất Tây Nguyên.',
    peaks: [{ name: 'Ngọc Linh', heightM: 2598, highest: true }],
    culture: {
      cover: { caption: 'Đảo Lý Sơn', wiki: 'Lý Sơn' },
      summary:
        'Quảng Ngãi là đất văn hóa Sa Huỳnh và quê hương đội hùng binh Hoàng Sa. Kon Tum là vùng nhà rông, cồng chiêng của người Ba Na, Xơ Đăng, Giẻ Triêng.',
      ethnicGroups: ['Kinh', 'Hrê', 'Xơ Đăng', 'Ba Na', 'Cor', 'Giẻ Triêng', 'Gia Rai'],
      heritage: [
        { name: 'Đảo Lý Sơn', description: '"Vương quốc tỏi" với cổng Tò Vò, núi lửa Thới Lới.', wiki: 'Lý Sơn' },
        { name: 'Nhà thờ gỗ Kon Tum', description: 'Nhà thờ bằng gỗ xây từ đầu thế kỷ XX.', wiki: 'Nhà thờ chính tòa Kon Tum' },
        { name: 'Khu chứng tích Sơn Mỹ', description: 'Chứng tích vụ thảm sát Mỹ Lai năm 1968.', wiki: 'Khu chứng tích Sơn Mỹ' },
        { name: 'Măng Đen', description: 'Cao nguyên thông xanh, khí hậu mát quanh năm.', wiki: 'Măng Đen' },
      ],
    },
    festivals: [
      {
        name: 'Lễ Khao lề thế lính Hoàng Sa',
        time: 'Tháng Hai – tháng Ba âm lịch',
        description: 'Tưởng nhớ những người lính Hoàng Sa đi giữ biển đảo thời Nguyễn.',
      },
      {
        name: 'Lễ mừng lúa mới',
        time: 'Sau mùa thu hoạch, cuối năm',
        description: 'Lễ tạ ơn thần lúa của người Ba Na, Xơ Đăng bên nhà rông.',
        wiki: 'Không gian văn hóa Cồng chiêng Tây Nguyên',
      },
      {
        name: 'Đua thuyền Tứ linh Lý Sơn',
        time: 'Tháng Giêng âm lịch',
        description: 'Đua thuyền rồng, lân, quy, phụng truyền thống của ngư dân Lý Sơn.',
        imageSearch: 'Ly Son island boat',
      },
    ],
    foods: [
      { name: 'Cá bống sông Trà', description: 'Cá bống nhỏ kho tiêu, đặc sản Quảng Ngãi.' },
      { name: 'Don Quảng Ngãi', description: 'Món canh từ loài nhuyễn thể nhỏ sống ở sông Trà Khúc.' },
      { name: 'Gỏi lá Kon Tum', description: 'Hàng chục loại lá rừng cuốn với thịt, tôm.', imageSearch: 'gỏi lá Kon Tum' },
    ],
    specialties: [
      { name: 'Tỏi Lý Sơn', description: 'Tỏi trồng trên cát núi lửa, nhỏ, thơm, cay.', imageSearch: 'Lý Sơn garlic' },
      { name: 'Mạch nha Thi Phổ', description: 'Mạch nha làm từ gạo nếp và mầm lúa.' },
      { name: 'Sâm Ngọc Linh', description: 'Sâm quý của núi Ngọc Linh (Kon Tum).', wiki: 'Sâm Ngọc Linh' },
    ],
  },

  // ───────────────────────────── Khánh Hòa (Khánh Hòa + Ninh Thuận)
  23: {
    region: 'Duyên hải Nam Trung Bộ',
    areaKm2: 8555.86,
    population: 2_243_554,
    statsSource: NQ202,
    terrain:
      'Bờ biển khúc khuỷu với các vịnh Vân Phong, Nha Trang, Cam Ranh. Vùng Ninh Thuận khô hạn nhất cả nước. Quản lý đặc khu Trường Sa.',
    peaks: [],
    culture: {
      cover: { caption: 'Vịnh Nha Trang', wiki: 'Vịnh Nha Trang' },
      summary:
        'Nơi đậm đặc văn hóa Chăm với tháp Bà Ponagar, tháp Po Klong Garai và nghề gốm Bàu Trúc. Nha Trang là thành phố biển du lịch nổi tiếng.',
      ethnicGroups: ['Kinh', 'Chăm', 'Raglai', 'Cơ Ho', 'Ê Đê'],
      heritage: [
        { name: 'Tháp Bà Ponagar', description: 'Quần thể tháp Chăm thờ Nữ thần Mẹ xứ sở.', wiki: 'Tháp Po Nagar' },
        { name: 'Tháp Po Klong Garai', description: 'Cụm tháp Chăm cổ trên đồi Trầu, Phan Rang.', wiki: 'Tháp Po Klong Garai' },
        { name: 'Làng gốm Bàu Trúc', description: 'Nghệ thuật làm gốm Chăm, di sản UNESCO cần bảo vệ khẩn cấp.', wiki: 'Làng gốm Bàu Trúc' },
        { name: 'Vườn quốc gia Núi Chúa', description: 'Khu dự trữ sinh quyển với hệ sinh thái bán sa mạc.', imageSearch: 'Nui Chua National Park' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Tháp Bà Ponagar',
        time: '20 – 23/3 âm lịch',
        description: 'Lễ hội của cả người Việt và người Chăm, có múa bóng dâng hoa.',
        wiki: 'Tháp Po Nagar',
      },
      {
        name: 'Lễ hội Katê',
        time: 'Tháng 7 lịch Chăm (khoảng tháng 9 – 10 dương lịch)',
        description: 'Lễ hội lớn nhất năm của người Chăm tại các tháp Ninh Thuận.',
        imageFile: 'Parade from "Kate" festival of Cham people, Central Vietnam.jpg',
      },
      {
        name: 'Festival Biển Nha Trang',
        time: 'Định kỳ, thường vào mùa hè',
        description: 'Lễ hội văn hóa – du lịch biển với nhiều hoạt động nghệ thuật.',
      },
    ],
    foods: [
      { name: 'Bún chả cá Nha Trang', description: 'Chả cá chiên, chả hấp, nước dùng ngọt thanh.', wiki: 'Bún chả cá' },
      { name: 'Nem nướng Ninh Hòa', description: 'Nem nướng cuốn bánh tráng, chấm tương đặc biệt.', wiki: 'Nem nướng' },
      { name: 'Bánh căn Phan Rang', description: 'Bánh đổ khuôn đất, chấm nước mắm cá.', wiki: 'Bánh căn' },
      { name: 'Gỏi cá mai', description: 'Cá mai tái chanh, cuốn bánh tráng và rau.' },
    ],
    specialties: [
      { name: 'Yến sào Khánh Hòa', description: 'Tổ chim yến khai thác ở các đảo ven biển.', wiki: 'Yến sào' },
      { name: 'Nho Ninh Thuận', description: 'Nho trồng trên vùng đất nắng gió.', imageSearch: 'Ninh Thuận grapes' },
      { name: 'Tỏi Phan Rang', description: 'Tỏi tép nhỏ, cay nồng.' },
    ],
  },

  // ───────────────────────────── Gia Lai (Gia Lai + Bình Định)
  24: {
    region: 'Tây Nguyên & Duyên hải Nam Trung Bộ',
    areaKm2: 21576.53,
    population: 3_583_693,
    statsSource: NQ202,
    terrain:
      'Phía tây là cao nguyên Pleiku đất đỏ bazan, núi lửa cổ Chư Đăng Ya; phía đông là đồng bằng và bờ biển Bình Định với đầm Thị Nại, Quy Nhơn.',
    peaks: [{ name: 'Kon Ka Kinh', heightM: 1748 }],
    culture: {
      cover: { caption: 'Tháp Bánh Ít', wiki: 'Tháp Bánh Ít' },
      summary:
        'Bình Định là đất võ, quê hương nhà Tây Sơn, nghệ thuật Bài Chòi (UNESCO) và nhiều tháp Chăm. Gia Lai là vùng cồng chiêng, nhà rông của người Gia Rai, Ba Na.',
      ethnicGroups: ['Kinh', 'Gia Rai', 'Ba Na', 'Chăm', 'Hrê'],
      heritage: [
        { name: 'Bảo tàng Quang Trung', description: 'Quê hương ba anh em nhà Tây Sơn.', imageSearch: 'Quang Trung museum Tay Son' },
        { name: 'Tháp Bánh Ít', description: 'Cụm tháp Chăm trên đồi cao, kiến trúc độc đáo.', wiki: 'Tháp Bánh Ít' },
        { name: 'Biển Hồ Pleiku', description: 'Hồ trên miệng núi lửa cổ, "đôi mắt Pleiku".', imageSearch: 'Biển Hồ Pleiku' },
        { name: 'Eo Gió – Kỳ Co', description: 'Bãi biển và vách đá đẹp ở Quy Nhơn.', imageSearch: 'Eo Gió Quy Nhơn' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Đống Đa – Tây Sơn',
        time: 'Mùng 5 Tết Nguyên đán',
        description: 'Kỷ niệm chiến thắng Ngọc Hồi – Đống Đa tại quê hương Tây Sơn.',
        imageSearch: 'Quang Trung museum Tay Son',
      },
      {
        name: 'Lễ hội Cồng chiêng',
        time: 'Định kỳ, thường vào mùa khô',
        description: 'Ngày hội của các buôn làng Gia Rai, Ba Na với cồng chiêng, xoang.',
        wiki: 'Không gian văn hóa Cồng chiêng Tây Nguyên',
      },
      {
        name: 'Lễ Pơ Thi (bỏ mả)',
        time: 'Mùa khô, sau thu hoạch',
        description: 'Lễ tiễn biệt người đã khuất của người Gia Rai, Ba Na, có tượng nhà mồ.',
        imageSearch: 'Jarai tomb statues',
      },
    ],
    foods: [
      { name: 'Bánh xèo tôm nhảy', description: 'Bánh xèo nhỏ với tôm đất tươi của Quy Nhơn.', wiki: 'Bánh xèo' },
      { name: 'Phở khô Gia Lai', description: '"Phở hai tô": một tô bánh phở trộn, một tô nước dùng.', imageSearch: 'phở khô Gia Lai' },
      { name: 'Bánh hỏi cháo lòng', description: 'Bánh hỏi mỏng, ăn cùng cháo lòng heo.', wiki: 'Bánh hỏi' },
    ],
    specialties: [
      { name: 'Rượu Bàu Đá', description: 'Rượu gạo nấu bằng nước giếng làng Bàu Đá.', imageSearch: 'rượu Bàu Đá' },
      { name: 'Hồ tiêu Chư Sê', description: 'Tiêu đất đỏ bazan, hạt chắc, cay thơm.', wiki: 'Hồ tiêu' },
      { name: 'Bánh ít lá gai', description: 'Bánh nếp lá gai nhân đậu xanh, dừa.', wiki: 'Bánh ít' },
    ],
  },

  // ───────────────────────────── Đắk Lắk (Đắk Lắk + Phú Yên)
  25: {
    region: 'Tây Nguyên & Duyên hải Nam Trung Bộ',
    areaKm2: 18096.4,
    population: 3_346_853,
    statsSource: NQ202,
    terrain:
      'Cao nguyên Buôn Ma Thuột đất đỏ bazan rộng lớn, hồ Lắk và dãy Chư Yang Sin; phía đông là đồng bằng sông Ba và bờ biển Phú Yên.',
    peaks: [{ name: 'Chư Yang Sin', heightM: 2442, highest: true }],
    culture: {
      cover: { caption: 'Gành Đá Đĩa', wiki: 'Gành Đá Đĩa' },
      summary:
        'Thủ phủ cà phê của Việt Nam, quê hương sử thi Đăm San và nhà dài Ê Đê. Phú Yên là "xứ hoa vàng cỏ xanh" với bờ biển hoang sơ, nơi đón bình minh sớm nhất đất liền.',
      ethnicGroups: ['Kinh', 'Ê Đê', "M'Nông", 'Gia Rai', 'Chăm', 'Ba Na'],
      heritage: [
        { name: 'Gành Đá Đĩa', description: 'Những cột đá bazan xếp liền nhau độc đáo bên biển.', wiki: 'Gành Đá Đĩa' },
        { name: 'Hồ Lắk', description: 'Hồ nước ngọt tự nhiên lớn, buôn Jun của người M’Nông.', wiki: 'Hồ Lắk' },
        { name: 'Buôn Đôn', description: 'Vùng đất của những người săn bắt, thuần dưỡng voi.', wiki: 'Buôn Đôn (huyện)' },
        { name: 'Mũi Điện', description: 'Điểm cực Đông trên đất liền Việt Nam.', wiki: 'Mũi Điện' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Cà phê Buôn Ma Thuột',
        time: 'Tháng 3 dương lịch (2 năm một lần)',
        description: 'Tôn vinh hạt cà phê và văn hóa các dân tộc Tây Nguyên.',
      },
      {
        name: 'Hội đua voi Buôn Đôn',
        time: 'Tháng 3 dương lịch',
        description: 'Những chú voi đua tài trên bãi đất ven sông Sêrêpốk.',
      },
      {
        name: 'Hội đua ngựa Gò Thì Thùng',
        time: 'Mùng 9 Tết Nguyên đán',
        description: 'Hội đua ngựa truyền thống trên đồi Gò Thì Thùng, Phú Yên.',
      },
    ],
    foods: [
      { name: 'Bún đỏ Buôn Ma Thuột', description: 'Sợi bún đỏ, nước dùng cua, chả, trứng cút.' },
      { name: 'Cá ngừ đại dương Phú Yên', description: 'Cá ngừ đánh bắt xa bờ, làm gỏi, nướng.', wiki: 'Cá ngừ đại dương' },
      { name: 'Gà nướng – cơm lam', description: 'Gà thả đồi nướng than ăn với cơm lam ống tre.', wiki: 'Cơm lam' },
    ],
    specialties: [
      { name: 'Cà phê Buôn Ma Thuột', description: 'Cà phê Robusta nổi tiếng thế giới.', wiki: 'Cà phê Buôn Ma Thuột' },
      { name: 'Sầu riêng Đắk Lắk', description: 'Sầu riêng cơm vàng, béo ngậy.', wiki: 'Sầu riêng' },
      { name: 'Bánh tráng Hòa Đa', description: 'Bánh tráng nướng mè đen giòn thơm của Phú Yên.' },
    ],
  },

  // ───────────────────────────── Đà Nẵng (Đà Nẵng + Quảng Nam)
  21: {
    region: 'Duyên hải Nam Trung Bộ',
    areaKm2: 11859.59,
    population: 3_065_628,
    statsSource: NQ202,
    terrain:
      'Đồng bằng ven biển hẹp ở phía đông, phía tây là núi cao thuộc dãy Trường Sơn. Bán đảo Sơn Trà, đèo Hải Vân và hệ thống sông Thu Bồn – Vu Gia. Quản lý huyện đảo Hoàng Sa.',
    peaks: [{ name: 'Núi Chúa – Bà Nà', heightM: 1487 }],
    culture: {
      cover: { caption: 'Phố cổ Hội An', wiki: 'Phố cổ Hội An' },
      summary:
        'Giao thoa giữa văn hóa Chăm Pa cổ, thương cảng Hội An xưa và đô thị biển hiện đại. Vùng núi phía tây là địa bàn sinh sống của người Cơ Tu, Xơ Đăng, Giẻ Triêng.',
      ethnicGroups: ['Kinh', 'Cơ Tu', 'Xơ Đăng', 'Giẻ Triêng', 'Co'],
      heritage: [
        {
          name: 'Phố cổ Hội An',
          description: 'Di sản thế giới UNESCO (1999), thương cảng sầm uất thế kỷ XVI – XVII.',
          wiki: 'Phố cổ Hội An',
        },
        {
          name: 'Thánh địa Mỹ Sơn',
          description: 'Di sản thế giới UNESCO (1999), quần thể đền tháp Chăm Pa.',
          wiki: 'Thánh địa Mỹ Sơn',
        },
        { name: 'Cù lao Chàm', description: 'Khu dự trữ sinh quyển thế giới ngoài khơi Hội An.', wiki: 'Cù lao Chàm' },
        { name: 'Ngũ Hành Sơn', description: 'Cụm năm ngọn núi đá vôi với nhiều hang động, chùa chiền.', wiki: 'Ngũ Hành Sơn' },
        { name: 'Cầu Vàng – Bà Nà', description: 'Cây cầu được nâng đỡ bởi đôi bàn tay khổng lồ trên núi Bà Nà.', wiki: 'Cầu Vàng' },
      ],
    },
    festivals: [
      {
        name: 'Lễ hội Pháo hoa Quốc tế Đà Nẵng (DIFF)',
        time: 'Mùa hè, khoảng tháng 6 – 7 dương lịch',
        description: 'Các đội pháo hoa quốc tế trình diễn trên sông Hàn.',
        wiki: 'Lễ hội pháo hoa quốc tế Đà Nẵng',
        imageFile: 'Da Nang International Fireworks Festival.jpg',
      },
      {
        name: 'Lễ hội Quán Thế Âm Ngũ Hành Sơn',
        time: 'Khoảng 19/2 âm lịch',
        description: 'Lễ hội Phật giáo lớn, được công nhận là Di sản văn hóa phi vật thể quốc gia.',
        wiki: 'Ngũ Hành Sơn',
      },
      {
        name: 'Lễ hội Cầu Ngư',
        time: 'Đầu năm âm lịch',
        description: 'Ngư dân ven biển tế cá Ông, cầu mưa thuận gió hòa, ra khơi bình an.',
        wiki: 'Tục thờ cá Ông',
      },
      {
        name: 'Đêm phố cổ Hội An',
        time: 'Ngày 14 âm lịch hằng tháng',
        description: 'Phố cổ tắt đèn điện, thắp đèn lồng và thả hoa đăng trên sông Hoài.',
        wiki: 'Sông Hoài',
        imageSearch: 'Hoi An lanterns night',
      },
    ],
    foods: [
      { name: 'Mì Quảng', description: 'Sợi mì vàng, ít nước dùng, ăn với tôm thịt, đậu phộng và bánh tráng.', wiki: 'Mì Quảng' },
      { name: 'Cao lầu Hội An', description: 'Sợi mì dai đặc trưng, ăn với xá xíu và rau sống Trà Quế.', wiki: 'Cao lầu' },
      {
        name: 'Bánh tráng cuốn thịt heo',
        description: 'Thịt heo luộc cuốn bánh tráng, rau rừng, chấm mắm nêm.',
        imageSearch: 'bánh tráng cuốn thịt heo',
      },
      { name: 'Cơm gà Tam Kỳ', description: 'Cơm nấu nước luộc gà, ăn với gà ta xé phay.', imageFile: 'Cơm gà Tam Kỳ, Quảng Nam.JPG' },
      { name: 'Bê thui Cầu Mống', description: 'Bê thui vàng da, thái mỏng cuốn rau chấm mắm cái.', imageSearch: 'bê thui' },
    ],
    specialties: [
      { name: 'Sâm Ngọc Linh', description: 'Loài sâm quý mọc ở vùng núi Ngọc Linh (Nam Trà My).', wiki: 'Sâm Ngọc Linh' },
      { name: 'Nước mắm Nam Ô', description: 'Nước mắm cá cơm truyền thống của làng chài Nam Ô.', wiki: 'Nước mắm' },
      { name: 'Chả bò Đà Nẵng', description: 'Chả bò giã tay, thơm tiêu và thì là.' },
      { name: 'Đèn lồng Hội An', description: 'Đèn lồng tre bọc vải lụa, biểu tượng của phố cổ.', imageSearch: 'Hoi An lanterns' },
    ],
  },

  // ───────────────────────────── Lâm Đồng (Lâm Đồng + Đắk Nông + Bình Thuận)
  26: {
    region: 'Tây Nguyên & Nam Trung Bộ',
    areaKm2: 24233.07,
    population: 3_872_999,
    statsSource: NQ202,
    terrain:
      'Tỉnh có diện tích lớn nhất cả nước. Trải dài từ cao nguyên Lâm Viên, Di Linh (1.000–1.500 m), cao nguyên M’Nông xuống đồng bằng và đồi cát ven biển Bình Thuận.',
    peaks: [
      { name: 'Bidoup', heightM: 2287, highest: true },
      { name: 'Langbiang', heightM: 2167 },
    ],
    culture: {
      cover: { caption: 'Thành phố Đà Lạt', wiki: 'Đà Lạt' },
      summary:
        'Hội tụ văn hóa cồng chiêng của các dân tộc Tây Nguyên, văn hóa Chăm ven biển Bình Thuận và đô thị Đà Lạt mang dấu ấn kiến trúc Pháp.',
      ethnicGroups: ['Kinh', "K'Ho", 'Mạ', "M'Nông", 'Chu Ru', 'Chăm', 'Raglai'],
      heritage: [
        {
          name: 'Không gian văn hóa Cồng chiêng Tây Nguyên',
          description: 'Kiệt tác truyền khẩu và phi vật thể của nhân loại (UNESCO, 2005).',
          wiki: 'Không gian văn hóa Cồng chiêng Tây Nguyên',
        },
        {
          name: 'Công viên địa chất toàn cầu UNESCO Đắk Nông',
          description: 'Hệ thống hang động núi lửa dài nhất Đông Nam Á.',
          wiki: 'Công viên địa chất Đắk Nông',
        },
        { name: 'Núi Langbiang', description: 'Nằm trong Khu dự trữ sinh quyển thế giới Langbiang.', wiki: 'Núi Langbiang' },
        {
          name: 'Tháp Chăm Pô Sah Inư',
          description: 'Cụm tháp Chăm cổ trên đồi Bà Nài, Phan Thiết.',
          imageSearch: 'Po Sah Inu',
        },
        { name: 'Mũi Né', description: 'Đồi cát bay, làng chài và bãi biển nổi tiếng.', wiki: 'Mũi Né' },
      ],
    },
    festivals: [
      {
        name: 'Festival Hoa Đà Lạt',
        time: 'Tháng 12 dương lịch (2 năm một lần)',
        description: 'Lễ hội hoa lớn nhất cả nước với diễu hành xe hoa, triển lãm và sắp đặt hoa.',
        wiki: 'Festival Hoa Đà Lạt',
      },
      {
        name: 'Lễ hội Katê',
        time: 'Tháng 7 lịch Chăm (khoảng tháng 9 – 10 dương lịch)',
        description: 'Lễ hội lớn nhất trong năm của người Chăm Bà-la-môn, tổ chức tại các tháp Chăm.',
        wiki: 'Lễ hội Katé',
        imageFile: 'Parade from "Kate" festival of Cham people, Central Vietnam.jpg',
      },
      {
        name: 'Lễ hội Nghinh Ông',
        time: 'Mùa hè âm lịch, tùy làng chài',
        description: 'Ngư dân Bình Thuận rước Ông Nam Hải, cầu mùa cá bội thu.',
        wiki: 'Tục thờ cá Ông',
      },
      {
        name: 'Lễ mừng lúa mới',
        time: 'Sau mùa thu hoạch, cuối năm',
        description: "Nghi lễ tạ ơn thần lúa của người M'Nông, K'Ho với cồng chiêng và rượu cần.",
        wiki: 'Không gian văn hóa Cồng chiêng Tây Nguyên',
      },
    ],
    foods: [
      { name: 'Bánh tráng nướng Đà Lạt', description: 'Bánh tráng nướng than với trứng, hành, xúc xích.', wiki: 'Bánh tráng', imageFile: 'Bánh tráng nướng TP. Hồ Chí Minh - street food in Ho Chi Minh City, Vietnam.jpg' },
      { name: 'Lẩu gà lá é', description: 'Lẩu gà ta nấu lá é thơm, đặc trưng của Đà Lạt.', imageFile: 'Newone - lẩu gà, sườn và rượu đinh lăng.jpg' },
      { name: 'Bánh căn', description: 'Bánh đổ khuôn đất nung, chấm nước mắm hoặc xíu mại.', wiki: 'Bánh căn' },
      { name: 'Bánh canh chả cá Phan Thiết', description: 'Bánh canh với chả cá thu, cá mối chiên.', wiki: 'Bánh canh' },
      { name: 'Dông nướng', description: 'Dông cát vùng đồi cát Bình Thuận, nướng hoặc xào lăn.', wiki: 'Nhông cát', imageFile: 'Leiolepis.jpg' },
    ],
    specialties: [
      { name: 'Dâu tây Đà Lạt', description: 'Nông sản đặc trưng của khí hậu mát mẻ vùng cao.', wiki: 'Dâu tây' },
      { name: 'Atiso Đà Lạt', description: 'Dùng làm trà, cao atiso và các món hầm.', wiki: 'Atisô' },
      { name: 'Cà phê Arabica Cầu Đất', description: 'Cà phê trồng ở độ cao trên 1.500 m.', wiki: 'Cà phê chè' },
      { name: 'Thanh long Bình Thuận', description: 'Vùng trồng thanh long lớn nhất cả nước.', wiki: 'Thanh long' },
      { name: 'Nước mắm Phan Thiết', description: 'Nước mắm cá cơm nổi tiếng từ lâu đời.', wiki: 'Nước mắm Phan Thiết', imageFile: 'Nước mắm Gio Hải của chú Trong, tết 2018.jpg' },
    ],
  },
}
