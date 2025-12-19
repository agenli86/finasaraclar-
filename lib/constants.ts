import { NavItem, BlogCategory, BlogPost } from '@/types';

export const SITE_CONFIG = {
  name: 'HızırMatik',
  description: 'Akıllı Finans ve Yaşam Araçları - Döviz, Altın, AI Mutfak, Metin Araçları ve Finansal Hesaplayıcılar',
  url: 'https://hizirmatik.com.tr',
  ogImage: 'https://hizirmatik.com.tr/og-image.jpg',
  author: 'HızırMatik',
  keywords: [
    'döviz kuru',
    'altın fiyatı',
    'kredi hesaplama',
    'mevduat faiz hesaplama',
    'karakter sayacı',
    'ai mutfak',
    'tarif önerisi',
    'finans araçları',
    'online araçlar',
  ],
};

export const NAV_ITEMS: NavItem[] = [
  {
    title: 'Ana Sayfa',
    href: '/',
    icon: 'Home',
    description: 'HızırMatik ana sayfası',
  },
  {
    title: 'Döviz & Altın',
    href: '/doviz-altin',
    icon: 'TrendingUp',
    description: 'Anlık döviz ve altın kurları',
  },
  {
    title: 'AI Mutfak',
    href: '/ai-mutfak',
    icon: 'ChefHat',
    description: 'Yapay zeka destekli tarif önerileri',
  },
  {
    title: 'Metin Doktoru',
    href: '/metin-doktoru',
    icon: 'FileText',
    description: 'Metin analizi ve formatlama araçları',
  },
  {
    title: 'Finans',
    href: '/finans/kredi-hesaplama',
    icon: 'Calculator',
    description: 'Finansal hesaplama araçları',
    children: [
      {
        title: 'Kredi Hesaplama',
        href: '/finans/kredi-hesaplama',
        icon: 'CreditCard',
        description: 'Kredi taksit ve faiz hesaplama',
      },
      {
        title: 'Mevduat Hesaplama',
        href: '/finans/mevduat-hesaplama',
        icon: 'PiggyBank',
        description: 'Vadeli mevduat faiz hesaplama',
      },
    ],
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: 'BookOpen',
    description: 'Finans ve teknoloji yazıları',
  },
];

export const FOOTER_LINKS = {
  tools: [
    { title: 'Döviz & Altın', href: '/doviz-altin' },
    { title: 'AI Mutfak', href: '/ai-mutfak' },
    { title: 'Metin Doktoru', href: '/metin-doktoru' },
    { title: 'Kredi Hesaplama', href: '/finans/kredi-hesaplama' },
    { title: 'Mevduat Hesaplama', href: '/finans/mevduat-hesaplama' },
  ],
  legal: [
    { title: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
    { title: 'Hakkımızda', href: '/hakkimizda' },
    { title: 'İletişim', href: '/iletisim' },
  ],
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  { name: 'Finans', slug: 'finans', count: 5 },
  { name: 'Teknoloji', slug: 'teknoloji', count: 3 },
  { name: 'Yatırım', slug: 'yatirim', count: 4 },
  { name: 'Tasarruf', slug: 'tasarruf', count: 2 },
  { name: 'Yapay Zeka', slug: 'yapay-zeka', count: 3 },
];

export const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'doviz-yatirimi-rehberi',
    title: 'Döviz Yatırımı Rehberi: Başlangıç İçin Bilmeniz Gerekenler',
    excerpt: 'Döviz yatırımına başlamak isteyenler için kapsamlı bir rehber. Risk yönetimi, strateji ve ipuçları.',
    content: `Döviz yatırımı, finansal piyasalardaki en dinamik ve likit yatırım araçlarından biridir...`,
    author: 'HızırMatik',
    date: '2024-12-15',
    category: 'Yatırım',
    tags: ['döviz', 'yatırım', 'forex', 'finans'],
    readTime: 8,
  },
  {
    slug: 'altin-fiyatlari-neden-yukseliyor',
    title: 'Altın Fiyatları Neden Yükseliyor? Ekonomik Analiz',
    excerpt: 'Son dönemde altın fiyatlarındaki yükselişin arkasındaki ekonomik faktörleri inceliyoruz.',
    content: `Altın, tarih boyunca güvenli liman olarak kabul edilen bir yatırım aracı olmuştur...`,
    author: 'HızırMatik',
    date: '2024-12-10',
    category: 'Finans',
    tags: ['altın', 'ekonomi', 'yatırım', 'analiz'],
    readTime: 6,
  },
  {
    slug: 'yapay-zeka-mutfakta',
    title: 'Yapay Zeka Mutfakta: AI ile Yemek Tarifleri',
    excerpt: 'Yapay zeka teknolojisinin mutfak dünyasını nasıl dönüştürdüğünü keşfedin.',
    content: `Yapay zeka, günlük hayatımızın birçok alanına girdiği gibi mutfağımıza da girmeye başladı...`,
    author: 'HızırMatik',
    date: '2024-12-05',
    category: 'Yapay Zeka',
    tags: ['yapay zeka', 'yemek', 'tarif', 'teknoloji'],
    readTime: 5,
  },
  {
    slug: 'kredi-faiz-oranlari-karsilastirma',
    title: '2024 Kredi Faiz Oranları Karşılaştırması',
    excerpt: 'Bankaların güncel kredi faiz oranlarını karşılaştırarak en uygun seçeneği bulun.',
    content: `Kredi çekmeden önce faiz oranlarını karşılaştırmak, uzun vadede önemli tasarruf sağlayabilir...`,
    author: 'HızırMatik',
    date: '2024-12-01',
    category: 'Finans',
    tags: ['kredi', 'faiz', 'banka', 'karşılaştırma'],
    readTime: 7,
  },
  {
    slug: 'tasarruf-ipuclari',
    title: 'Günlük Hayatta Tasarruf İpuçları',
    excerpt: 'Bütçenizi kontrol altına almak için pratik tasarruf yöntemleri.',
    content: `Tasarruf yapmak, finansal özgürlüğe giden yolda atılacak en önemli adımlardan biridir...`,
    author: 'HızırMatik',
    date: '2024-11-25',
    category: 'Tasarruf',
    tags: ['tasarruf', 'bütçe', 'finans', 'ipuçları'],
    readTime: 4,
  },
];

export const CURRENCIES = [
  { code: 'USD', name: 'Amerikan Doları', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'İngiliz Sterlini', symbol: '£' },
  { code: 'CHF', name: 'İsviçre Frangı', symbol: 'CHF' },
  { code: 'JPY', name: 'Japon Yeni', symbol: '¥' },
  { code: 'SAR', name: 'Suudi Arabistan Riyali', symbol: 'SAR' },
  { code: 'AUD', name: 'Avustralya Doları', symbol: 'A$' },
  { code: 'CAD', name: 'Kanada Doları', symbol: 'C$' },
];

export const GOLD_TYPES = [
  { code: 'XAU', name: 'Gram Altın' },
  { code: 'CEYREK', name: 'Çeyrek Altın' },
  { code: 'YARIM', name: 'Yarım Altın' },
  { code: 'TAM', name: 'Tam Altın' },
  { code: 'CUMHURIYET', name: 'Cumhuriyet Altını' },
  { code: 'ATA', name: 'Ata Altın' },
  { code: 'RESAT', name: 'Reşat Altın' },
  { code: 'HAMIT', name: 'Hamit Altın' },
];
