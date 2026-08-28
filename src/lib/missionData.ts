import { AreaId, AvatarInfo, Badge, BaseItem, DailyMission, DecisionScenario, KnowledgeCard } from '../types/game';

export const AVATARS: AvatarInfo[] = [
  {
    id: 'avatar-1',
    name: 'Budi',
    description: 'Pemberani & suka menjelajah pantai',
    hairColor: '#3d2314',
    shirtColor: '#22c55e',
    skinTone: '#fcd34d',
    accessory: 'Topi Petualang',
  },
  {
    id: 'avatar-2',
    name: 'Siti',
    description: 'Cerdas & penyayang hewan satwa',
    hairColor: '#1e293b',
    shirtColor: '#38bdf8',
    skinTone: '#fed7aa',
    accessory: 'Kacamata Sains',
  },
  {
    id: 'avatar-3',
    name: 'Alex',
    description: 'Ceria & hobi mendaur ulang barang bekas',
    hairColor: '#b45309',
    shirtColor: '#f97316',
    skinTone: '#fef08a',
    accessory: 'Syal Penjaga',
  },
  {
    id: 'avatar-4',
    name: 'Maya',
    description: 'Teliti & pandai mengenali pohon hutan',
    hairColor: '#172554',
    shirtColor: '#ec4899',
    skinTone: '#fdba74',
    accessory: 'Pita Daun',
  },
  {
    id: 'avatar-5',
    name: 'Wayan',
    description: 'Tanggap & ahli menjaga kebersihan sungai',
    hairColor: '#09090b',
    shirtColor: '#a855f7',
    skinTone: '#fcd34d',
    accessory: 'Ikat Kepala Explorer',
  },
  {
    id: 'avatar-6',
    name: 'Alif',
    description: 'Semangat tinggi & cinta keasrian kota',
    hairColor: '#451a03',
    shirtColor: '#14b8a6',
    skinTone: '#fed7aa',
    accessory: 'Lencana Bintang',
  },
];

export interface AreaDetail {
  id: AreaId;
  name: string;
  subtitle: string;
  tagline: string;
  problem: string;
  icon: string;
  themeColor: string;
  accentColor: string;
  earthHealthBonus: number;
  badgeId: string;
}

export const AREAS: AreaDetail[] = [
  {
    id: 'pantai-penyu',
    name: 'Pantai Penyu',
    subtitle: 'Misi Penyelamatan Pantai',
    tagline: 'Pantai penuh sampah sehingga penyu kesulitan bertelur.',
    problem: 'Sampah plastik, kaleng, dan kemasan menumpuk di pasir pantai.',
    icon: '🐢',
    themeColor: 'from-amber-100 to-sky-100',
    accentColor: '#0ea5e9',
    earthHealthBonus: 15,
    badgeId: 'badge-penyu',
  },
  {
    id: 'laut-biru',
    name: 'Laut Biru',
    subtitle: 'Ekspedisi Robot Pembersih Laut',
    tagline: 'Sampah plastik mengapung di lautan dan membahayakan terumbu karang.',
    problem: 'Plastik mengambang yang bisa tertelan ikan dan hewan laut.',
    icon: '🌊',
    themeColor: 'from-sky-200 to-blue-200',
    accentColor: '#0284c7',
    earthHealthBonus: 15,
    badgeId: 'badge-laut',
  },
  {
    id: 'hutan-hijau',
    name: 'Hutan Hijau',
    subtitle: 'Reboisasi & Rumah Satwa',
    tagline: 'Banyak pohon gundul dan hewan hutan kehilangan rumah.',
    problem: 'Pohon berkurang sehingga burung, lebah, dan tupai bingung mencari tempat tinggal.',
    icon: '🌳',
    themeColor: 'from-emerald-100 to-teal-100',
    accentColor: '#10b981',
    earthHealthBonus: 20,
    badgeId: 'badge-hutan',
  },
  {
    id: 'desa-sungai',
    name: 'Desa Sungai',
    subtitle: 'Detektif Air Jernih',
    tagline: 'Air sungai desa menjadi keruh dan berbusa karena limbah.',
    problem: 'Pencemaran dari sampah liar dan saluran tanpa saringan.',
    icon: '💧',
    themeColor: 'from-cyan-100 to-emerald-100',
    accentColor: '#06b6d4',
    earthHealthBonus: 15,
    badgeId: 'badge-sungai',
  },
  {
    id: 'kota-bersih',
    name: 'Kota Bersih',
    subtitle: 'Pabrik Pemilah Sampah Cerdas',
    tagline: 'Sampah di kota tercampur aduk dan belum dipilah.',
    problem: 'Sampah organik, anorganik, dan kertas tercampur di jalanan kota.',
    icon: '🏙️',
    themeColor: 'from-violet-100 to-amber-100',
    accentColor: '#8b5cf6',
    earthHealthBonus: 15,
    badgeId: 'badge-daurulang',
  },
];

// Items in Mission 1 (Pantai Penyu)
export interface BeachItem {
  id: string;
  name: string;
  isTrash: boolean;
  type: 'plastic' | 'can' | 'wrapper' | 'nature';
  x: number; // percentage on screen 5% to 85%
  y: number; // percentage on screen 35% to 80%
  icon: string;
  svgType: 'bottle' | 'bag' | 'can' | 'straw' | 'snack' | 'shell' | 'leaf' | 'twig' | 'crab';
  dialogWhenClickedWrong?: string;
  size: number;
}

export const BEACH_ITEMS: BeachItem[] = [
  {
    id: 'b-trash-1',
    name: 'Botol Plastik Bekas',
    isTrash: true,
    type: 'plastic',
    x: 18,
    y: 62,
    icon: '🥤',
    svgType: 'bottle',
    size: 50,
  },
  {
    id: 'b-trash-2',
    name: 'Kantong Plastik Kresek',
    isTrash: true,
    type: 'plastic',
    x: 35,
    y: 72,
    icon: '🛍️',
    svgType: 'bag',
    size: 55,
  },
  {
    id: 'b-trash-3',
    name: 'Kaleng Minuman Berkarat',
    isTrash: true,
    type: 'can',
    x: 52,
    y: 58,
    icon: '🥫',
    svgType: 'can',
    size: 44,
  },
  {
    id: 'b-trash-4',
    name: 'Bungkus Makanan Ringan',
    isTrash: true,
    type: 'wrapper',
    x: 74,
    y: 65,
    icon: '🧃',
    svgType: 'snack',
    size: 48,
  },
  {
    id: 'b-trash-5',
    name: 'Sedotan Plastik',
    isTrash: true,
    type: 'plastic',
    x: 28,
    y: 50,
    icon: '🥤',
    svgType: 'straw',
    size: 38,
  },
  {
    id: 'b-trash-6',
    name: 'Gelas Plastik Kotor',
    isTrash: true,
    type: 'plastic',
    x: 64,
    y: 78,
    icon: '🥤',
    svgType: 'bottle',
    size: 46,
  },
  // Natural items (should NOT be collected as trash)
  {
    id: 'b-nat-1',
    name: 'Kulit Kerang Laut',
    isTrash: false,
    type: 'nature',
    x: 12,
    y: 78,
    icon: '🐚',
    svgType: 'shell',
    dialogWhenClickedWrong: 'Kerang adalah bagian alami pantai. Kepiting kecil dan kelomang membutuhkannya sebagai rumah! 🐚',
    size: 42,
  },
  {
    id: 'b-nat-2',
    name: 'Daun Kelapa Kering',
    isTrash: false,
    type: 'nature',
    x: 44,
    y: 44,
    icon: '🍂',
    svgType: 'leaf',
    dialogWhenClickedWrong: 'Daun gugur berasal dari pohon alami pantai. Nanti daun ini akan terurai sendiri menjadi pupuk pasir! 🍂',
    size: 46,
  },
  {
    id: 'b-nat-3',
    name: 'Ranting Kayu Hanyut',
    isTrash: false,
    type: 'nature',
    x: 82,
    y: 52,
    icon: '🪵',
    svgType: 'twig',
    dialogWhenClickedWrong: 'Ranting kayu alami pantai menjadi tempat istirahat burung laut yang lelah terbang. Kita biarkan saja ya! 🪵',
    size: 52,
  },
  {
    id: 'b-nat-4',
    name: 'Kepiting Pasir Kecil',
    isTrash: false,
    type: 'nature',
    x: 58,
    y: 82,
    icon: '🦀',
    svgType: 'crab',
    dialogWhenClickedWrong: 'Wah, itu kepiting pantai yang lucu! Dia sedang asyik menggali pasir, jangan diambil ya! 🦀',
    size: 40,
  },
];

// Mission 3: Habitat Matching "Siapa tinggal di mana?"
export interface HabitatPair {
  animalId: string;
  animalName: string;
  animalIcon: string;
  targetHabitatId: string;
  funFact: string;
}

export const HABITAT_PAIRS: HabitatPair[] = [
  {
    animalId: 'anim-burung',
    animalName: 'Burung Kutilang',
    animalIcon: '🐦',
    targetHabitatId: 'hab-pohon',
    funFact: 'Burung membuat sarang di dahan pohon yang rindang agar telur mereka terlindung dari angin dan pemangsa.',
  },
  {
    animalId: 'anim-ikan',
    animalName: 'Ikan Mas Sungai',
    animalIcon: '🐟',
    targetHabitatId: 'hab-sungai',
    funFact: 'Ikan bernapas menggunakan insang dan membutuhkan air bersih yang kaya oksigen untuk berenang gembira.',
  },
  {
    animalId: 'anim-lebah',
    animalName: 'Lebah Madu',
    animalIcon: '🐝',
    targetHabitatId: 'hab-bunga',
    funFact: 'Lebah hinggap di kelopak bunga untuk mengisap nektar sekaligus membantu penyerbukan tanaman.',
  },
  {
    animalId: 'anim-tupai',
    animalName: 'Tupai Ceria',
    animalIcon: '🐿️',
    targetHabitatId: 'hab-lubang-pohon',
    funFact: 'Tupai menyukai lubang pohon alami untuk menyimpan biji kenari dan tidur hangat saat malam tiba.',
  },
];

// Mission 4: River clues & detective choices
export interface RiverClue {
  id: string;
  name: string;
  isPollutant: boolean;
  x: number;
  y: number;
  icon: string;
  description: string;
  investigated: boolean;
}

export const RIVER_CLUES: RiverClue[] = [
  {
    id: 'clue-pipa',
    name: 'Pipa Pembuangan Kotor',
    isPollutant: true,
    x: 22,
    y: 48,
    icon: '🧪',
    description: 'Air berbusa keluar dari pipa ini langsung ke sungai! Ini membuat air keruh.',
    investigated: false,
  },
  {
    id: 'clue-sampah-liar',
    name: 'Tumpukan Sampah di Pinggir',
    isPollutant: true,
    x: 52,
    y: 65,
    icon: '🗑️',
    description: 'Banyak kantong kresek dan botol dibuang di semak tepi sungai.',
    investigated: false,
  },
  {
    id: 'clue-tanaman-teratai',
    name: 'Bunga Teratai Alami',
    isPollutant: false,
    x: 78,
    y: 42,
    icon: '🪷',
    description: 'Bunga teratai membantu menyerap kelebihan nutrisi dan menaungi ikan kecil.',
    investigated: false,
  },
];

// Mission 5: City sorting categories & items
export type TrashCategory = 'organik' | 'anorganik' | 'kertas';

export interface SorterItem {
  id: string;
  name: string;
  category: TrashCategory;
  icon: string;
  hint: string;
}

export const CITY_TRASH_ITEMS: SorterItem[] = [
  { id: 'ct-1', name: 'Kulit Pisang', category: 'organik', icon: '🍌', hint: 'Berasal dari buah alami, mudah membusuk jadi kompos!' },
  { id: 'ct-2', name: 'Botol Plastik', category: 'anorganik', icon: '🥤', hint: 'Plastik sintetis buatan manusia, bisa didaur ulang!' },
  { id: 'ct-3', name: 'Kardus Bekas', category: 'kertas', icon: '📦', hint: 'Terbuat dari serat pohon, dapat dilebur jadi kertas baru!' },
  { id: 'ct-4', name: 'Sisa Daun Gugur', category: 'organik', icon: '🍂', hint: 'Sisa tanaman yang bagus untuk nutrisi tanah!' },
  { id: 'ct-5', name: 'Kaleng Minuman', category: 'anorganik', icon: '🥫', hint: 'Aluminium kuat yang bisa dilebur kembali!' },
  { id: 'ct-6', name: 'Buku Catatan Sobek', category: 'kertas', icon: '📄', hint: 'Kertas ulangan atau buku lama yang sudah tidak terpakai!' },
  { id: 'ct-7', name: 'Sisa Apel', category: 'organik', icon: '🍎', hint: 'Sisa makanan organik yang disukai cacing tanah!' },
  { id: 'ct-8', name: 'Kantong Kresek', category: 'anorganik', icon: '🛍️', hint: 'Bahan plastik fleksibel yang perlu ditangani khusus!' },
  { id: 'ct-9', name: 'Koran Bekas', category: 'kertas', icon: '📰', hint: 'Kertas koran dapat dicetak ulang menjadi buku cerita!' },
  { id: 'ct-10', name: 'Cangkang Telur', category: 'organik', icon: '🥚', hint: 'Mengandung kalsium tinggi, sangat baik untuk pupuk tanaman!' },
];

export const BADGES: Badge[] = [
  {
    id: 'badge-penyu',
    title: 'Sahabat Penyu',
    description: 'Membersihkan Pantai Penyu sehingga penyu dapat bertelur dengan nyaman.',
    icon: '🐢',
    areaRequired: 'pantai-penyu',
    unlocked: false,
  },
  {
    id: 'badge-laut',
    title: 'Penjaga Laut',
    description: 'Mengoperasikan robot pembersih laut dan menjaga keselamatan terumbu karang.',
    icon: '🐠',
    areaRequired: 'laut-biru',
    unlocked: false,
  },
  {
    id: 'badge-hutan',
    title: 'Pelindung Hutan',
    description: 'Menanam pohon baru dan mengembalikan satwa ke habitat aslinya.',
    icon: '🌳',
    areaRequired: 'hutan-hijau',
    unlocked: false,
  },
  {
    id: 'badge-sungai',
    title: 'Penjaga Sungai',
    description: 'Menemukan sumber polusi sungai dan menyelamatkan ekosistem air tawar.',
    icon: '💧',
    areaRequired: 'desa-sungai',
    unlocked: false,
  },
  {
    id: 'badge-daurulang',
    title: 'Raja Daur Ulang',
    description: 'Menguasai pemilahan sampah organik, anorganik, dan kertas tanpa salah.',
    icon: '♻️',
    areaRequired: 'kota-bersih',
    unlocked: false,
  },
  {
    id: 'badge-earth-guardian',
    title: 'Earth Guardian Sejati',
    description: 'Menyelesaikan seluruh misi dan mengembalikan kesehatan bumi hingga 100%!',
    icon: '🌍',
    unlocked: false,
  },
];

export const KNOWLEDGE_CARDS: KnowledgeCard[] = [
  {
    id: 'kc-penyu',
    title: 'Penyu Hijau Laut',
    subtitle: 'Penjelajah Samudra yang Bertelur di Pasir',
    category: 'Satwa',
    icon: '🐢',
    summary: 'Penyu laut berenang ribuan kilometer dan selalu kembali ke pantai tempat ia menetas untuk bertelur.',
    funFact: 'Kantong plastik di laut sering dikira ubur-ubur oleh penyu! Karena itu kita harus menjaga pantai tetap bersih.',
    unlocked: true,
  },
  {
    id: 'kc-karang',
    title: 'Terumbu Karang',
    subtitle: 'Kota Metropolitan Bawah Laut',
    category: 'Laut',
    icon: '🪸',
    summary: 'Terumbu karang adalah kumpulan hewan kecil yang membentuk istana batu kapur warna-warni.',
    funFact: 'Lebih dari 25% ikan di lautan tinggal di sekitar terumbu karang!',
    unlocked: true,
  },
  {
    id: 'kc-pohon',
    title: 'Pohon Hutan Hujan',
    subtitle: 'Paru-paru Hijau Bumi Kita',
    category: 'Hutan',
    icon: '🌳',
    summary: 'Pohon menyerap gas karbon dioksida dan menghasilkan oksigen segar yang kita hirup setiap hari.',
    funFact: 'Satu pohon rindang bisa menghasilkan oksigen untuk bernapas 4 orang dalam sehari!',
    unlocked: false,
  },
  {
    id: 'kc-sungai',
    title: 'Sungai Bersih & Segar',
    subtitle: 'Urat Nadi Kehidupan di Daratan',
    category: 'Sungai',
    icon: '💧',
    summary: 'Air tawar dari sungai mengalir dari pegunungan menuju laut, menyirami sawah dan menjadi sumber minum satwa.',
    funFact: 'Sungai yang tidak terpolusi biasanya dipenuhi ikan lincah, capung, dan lumut air yang sehat.',
    unlocked: false,
  },
  {
    id: 'kc-sampah-organik',
    title: 'Sampah Organik',
    subtitle: 'Kekayaan Alam yang Bisa Jadi Kompos',
    category: 'Kota',
    icon: '🍌',
    summary: 'Sampah organik berasal dari sisa makanan dan tumbuhan yang dapat membusuk secara alami dalam tanah.',
    funFact: 'Sisa kulit pisang dan sayur bisa diubah menjadi pupuk tanaman yang sangat subur!',
    unlocked: false,
  },
  {
    id: 'kc-sampah-plastik',
    title: 'Plastik Anorganik',
    subtitle: 'Benda Kuat yang Butuh Ratusan Tahun',
    category: 'Kota',
    icon: '🥤',
    summary: 'Plastik tidak mudah hancur di alam. Plastik yang dibuang sembarangan bisa bertahan sampai 400 tahun!',
    funFact: 'Membawa botol minum sendiri (tumbler) menyelamatkan ratusan botol plastik sekali pakai setiap tahun.',
    unlocked: false,
  },
];

export const BASE_ITEMS: BaseItem[] = [
  {
    id: 'base-pohon',
    name: 'Pohon Ketapang Teduh',
    category: 'flora',
    cost: 50,
    icon: '🌳',
    description: 'Pohon rindang yang membuat udara markas menjadi sejuk dan menenangkan.',
    placed: false,
  },
  {
    id: 'base-bunga',
    name: 'Taman Bunga Kupu-kupu',
    category: 'flora',
    cost: 40,
    icon: '🌻',
    description: 'Bunga warna-warni yang mengundang lebah madu dan kupu-kupu riang.',
    placed: false,
  },
  {
    id: 'base-kolam',
    name: 'Kolam Ikan Koi Air Bersih',
    category: 'water',
    cost: 80,
    icon: '🐟',
    description: 'Kolam jernih dengan air mengalir untuk merawat ikan air tawar.',
    placed: false,
  },
  {
    id: 'base-solar',
    name: 'Panel Surya Ramah Lingkungan',
    category: 'energy',
    cost: 100,
    icon: '🌞',
    description: 'Mengubah sinar matahari menjadi listrik bersih tanpa polusi asap!',
    placed: false,
  },
  {
    id: 'base-burung',
    name: 'Rumah Pohon Satwa',
    category: 'fauna',
    cost: 60,
    icon: '🐦',
    description: 'Tempat bertengger burung-burung yang berkicau merdu setiap pagi.',
    placed: false,
  },
  {
    id: 'base-turbin',
    name: 'Kincir Angin Mini',
    category: 'energy',
    cost: 90,
    icon: '💨',
    description: 'Memanfaatkan hembusan angin sepoi-sepoi untuk energi markas guardian.',
    placed: false,
  },
];

export const DAILY_MISSIONS_DEFAULT: DailyMission[] = [
  {
    id: 'dm-1',
    title: 'Kumpulkan 5 sampah plastik di pantai',
    target: 5,
    current: 0,
    rewardPoints: 30,
    rewardXp: 50,
    completed: false,
    claimed: false,
  },
  {
    id: 'dm-2',
    title: 'Bantu mama penyu bertelur dengan aman',
    target: 1,
    current: 0,
    rewardPoints: 50,
    rewardXp: 80,
    completed: false,
    claimed: false,
  },
  {
    id: 'dm-3',
    title: 'Tanya BUMI 1 pertanyaan tentang alam',
    target: 1,
    current: 0,
    rewardPoints: 20,
    rewardXp: 30,
    completed: false,
    claimed: false,
  },
  {
    id: 'dm-4',
    title: 'Selesaikan 1 skenario keputusan ramah lingkungan',
    target: 1,
    current: 0,
    rewardPoints: 40,
    rewardXp: 60,
    completed: false,
    claimed: false,
  },
];

export const DECISION_SCENARIOS: DecisionScenario[] = [
  {
    id: 'dec-1',
    title: 'Piknik di Taman Kota',
    situation: 'Kamu dan teman-teman sedang asyik makan siang di taman. Ketika selesai, kamu melihat sebuah botol plastik kosong di dekat tikar, tetapi tempat sampah terletak agak jauh di dekat pintu gerbang.',
    question: 'Apa tindakan terbaik yang kamu pilih?',
    options: [
      {
        id: 'opt-1',
        text: 'Tinggalkan saja di rumput, nanti juga ada petugas yang membersihkan.',
        isCorrect: false,
        feedback: 'Hmm... kalau tertinggal, botol itu bisa tertiup angin ke selokan dan menyumbat saluran air.',
        ecoImpact: 'Sampah bisa mengotori selokan.',
      },
      {
        id: 'opt-2',
        text: 'Tendang ke semak-semak supaya tidak terlihat.',
        isCorrect: false,
        feedback: 'Semak-semak adalah tempat persembunyian serangga dan burung kecil. Sampah plastik bisa melukai mereka.',
        ecoImpact: 'Mengganggu habitat hewan kecil.',
      },
      {
        id: 'opt-3',
        text: 'Bawa botol itu sambil berjalan dan buang ke tempat sampah di gerbang.',
        isCorrect: true,
        feedback: 'Pilihan yang hebat! 🌟 Dengan membawanya ke tempat sampah, taman tetap asri dan botol bisa didaur ulang dengan aman!',
        ecoImpact: 'Taman tetap bersih dan indah!',
      },
      {
        id: 'opt-4',
        text: 'Gali tanah lalu kubur botol plastik itu di taman.',
        isCorrect: false,
        feedback: 'Plastik tidak bisa membusuk di dalam tanah dan butuh ratusan tahun untuk hancur!',
        ecoImpact: 'Merusak kesuburan tanah.',
      },
    ],
  },
  {
    id: 'dec-2',
    title: 'Kantong Belanja di Pasar Tradisional',
    situation: 'Ibu mengajakmu pergi ke pasar untuk membeli buah dan sayur segar. Penjual menawarkan kantong plastik kecil untuk setiap jenis buah yang dibeli.',
    question: 'Bagaimana cara kita mengurangi penggunaan plastik?',
    options: [
      {
        id: 'opt-2a',
        text: 'Minta kantong plastik sebanyak-banyaknya untuk cadangan di rumah.',
        isCorrect: false,
        feedback: 'Mengumpulkan terlalu banyak kantong plastik sekali pakai justru memperbanyak sampah plastik di rumah.',
        ecoImpact: 'Menambah limbah plastik.',
      },
      {
        id: 'opt-2b',
        text: 'Gunakan tas kain belanja ramah lingkungan yang dibawa dari rumah.',
        isCorrect: true,
        feedback: 'Pilihan luar biasa! 🌟 Tas kain bisa dicuci dan dipakai berulang kali, sehingga kita bisa menghemat puluhan kantong plastik!',
        ecoImpact: 'Mengurangi sampah plastik sekali pakai!',
      },
      {
        id: 'opt-2c',
        text: 'Jangan beli buah sama sekali agar tidak pakai kantong.',
        isCorrect: false,
        feedback: 'Buah sangat sehat untuk tubuh kita! Solusinya cukup dengan membawa kantong kain sendiri.',
        ecoImpact: 'Kurang tepat untuk kesehatan kita.',
      },
    ],
  },
];
