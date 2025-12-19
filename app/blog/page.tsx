import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ChevronRight, Tag, TrendingUp, BookOpen } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Finans, ekonomi, yatırım ve teknoloji hakkında güncel yazılar. Döviz, altın, kripto para ve kişisel finans rehberleri.',
  keywords: ['finans blogu', 'ekonomi haberleri', 'yatırım tavsiyeleri', 'döviz analizi', 'altın yorumları'],
  openGraph: {
    title: 'Blog | HızırMatik',
    description: 'Finans ve ekonomi dünyasından güncel yazılar ve analizler.',
    url: 'https://hizirmatik.com.tr/blog',
    type: 'website',
  },
};

const breadcrumbItems = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Blog', href: '/blog' },
];

// Blog yazıları
const blogPosts = [
  {
    id: 1,
    slug: 'dolar-tl-tahminleri-2024',
    title: 'Dolar/TL Tahminleri: 2024 Yılında Neler Bekleniyor?',
    excerpt: 'Ekonomistlerin ve analistlerin 2024 yılı için dolar/TL kuru tahminleri ve beklentileri. Merkez Bankası politikaları ve küresel gelişmelerin etkisi.',
    category: 'Döviz',
    categoryColor: 'emerald',
    author: 'HızırMatik Editör',
    date: '2024-01-15',
    readTime: '8 dk',
    image: '/blog/dolar-tahmin.jpg',
    featured: true,
  },
  {
    id: 2,
    slug: 'altin-yatirim-rehberi',
    title: 'Altın Yatırımı Rehberi: Gram mı, Çeyrek mi, Cumhuriyet Altını mı?',
    excerpt: 'Altın yatırımı yapmak isteyenler için kapsamlı rehber. Hangi altın türü daha avantajlı? Fiziki altın mı, altın hesabı mı?',
    category: 'Altın',
    categoryColor: 'yellow',
    author: 'HızırMatik Editör',
    date: '2024-01-10',
    readTime: '12 dk',
    image: '/blog/altin-yatirim.jpg',
    featured: true,
  },
  {
    id: 3,
    slug: 'mevduat-faizi-karsilastirma',
    title: 'Bankaların Mevduat Faiz Oranları Karşılaştırması (Ocak 2024)',
    excerpt: 'Türkiye\'deki bankaların güncel mevduat faiz oranları. En yüksek faiz veren bankalar hangileri?',
    category: 'Finans',
    categoryColor: 'violet',
    author: 'HızırMatik Editör',
    date: '2024-01-08',
    readTime: '6 dk',
    image: '/blog/mevduat-faiz.jpg',
    featured: false,
  },
  {
    id: 4,
    slug: 'enflasyon-koruma-stratejileri',
    title: 'Enflasyona Karşı Paranızı Korumanın 5 Yolu',
    excerpt: 'Yüksek enflasyon döneminde tasarruflarınızı korumak için uygulayabileceğiniz stratejiler ve yatırım araçları.',
    category: 'Yatırım',
    categoryColor: 'blue',
    author: 'HızırMatik Editör',
    date: '2024-01-05',
    readTime: '10 dk',
    image: '/blog/enflasyon.jpg',
    featured: false,
  },
  {
    id: 5,
    slug: 'kripto-para-2024-beklentileri',
    title: 'Kripto Para Piyasası 2024: Bitcoin ve Altcoinler İçin Beklentiler',
    excerpt: 'Bitcoin halving sonrası piyasa beklentileri. ETF onayları ve kurumsal yatırımların etkisi.',
    category: 'Kripto',
    categoryColor: 'orange',
    author: 'HızırMatik Editör',
    date: '2024-01-03',
    readTime: '15 dk',
    image: '/blog/kripto.jpg',
    featured: false,
  },
  {
    id: 6,
    slug: 'butce-yonetimi-ipuclari',
    title: 'Kişisel Bütçe Yönetimi: Pratik İpuçları ve Yöntemler',
    excerpt: 'Aylık gelir-gider dengesini sağlamak için kullanabileceğiniz bütçe yönetim teknikleri. 50/30/20 kuralı ve daha fazlası.',
    category: 'Kişisel Finans',
    categoryColor: 'pink',
    author: 'HızırMatik Editör',
    date: '2024-01-01',
    readTime: '7 dk',
    image: '/blog/butce.jpg',
    featured: false,
  },
];

const categories = [
  { name: 'Tümü', count: blogPosts.length, active: true },
  { name: 'Döviz', count: 1, active: false },
  { name: 'Altın', count: 1, active: false },
  { name: 'Finans', count: 1, active: false },
  { name: 'Yatırım', count: 1, active: false },
  { name: 'Kripto', count: 1, active: false },
  { name: 'Kişisel Finans', count: 1, active: false },
];

const popularPosts = blogPosts.slice(0, 3);

const getCategoryColorClass = (color: string) => {
  const colors: Record<string, string> = {
    emerald: 'bg-blue-500/10 text-blue-400',
    yellow: 'bg-yellow-500/10 text-yellow-400',
    violet: 'bg-violet-500/10 text-violet-400',
    blue: 'bg-blue-500/10 text-blue-400',
    orange: 'bg-orange-500/10 text-orange-400',
    pink: 'bg-pink-500/10 text-pink-400',
  };
  return colors[color] || 'bg-slate-500/10 text-slate-400';
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="space-y-6">
      <Breadcrumb customItems={breadcrumbItems} />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Blog</h1>
          <p className="text-slate-400">Finans ve ekonomi dünyasından güncel yazılar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Ana İçerik */}
        <div className="lg:col-span-3 space-y-6">
          {/* Öne Çıkan Yazılar */}
          {featuredPosts.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Öne Çıkan Yazılar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="glass-card-hover group overflow-hidden"
                  >
                    <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-slate-600" />
                    </div>
                    <div className="p-5">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getCategoryColorClass(post.categoryColor)}`}>
                        {post.category}
                      </span>
                      <h3 className="text-lg font-semibold text-white mt-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('tr-TR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Tüm Yazılar */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4">Tüm Yazılar</h2>
            <div className="space-y-4">
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="glass-card-hover p-5 flex gap-5 group"
                >
                  <div className="w-32 h-24 flex-shrink-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getCategoryColorClass(post.categoryColor)}`}>
                      {post.category}
                    </span>
                    <h3 className="text-white font-semibold mt-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('tr-TR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0 self-center" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Kategoriler */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-400" />
              Kategoriler
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      cat.active
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popüler Yazılar */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Popüler Yazılar
            </h3>
            <ul className="space-y-4">
              {popularPosts.map((post, index) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="flex gap-3 group">
                    <span className="text-2xl font-bold text-slate-600 group-hover:text-blue-400 transition-colors">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-sm text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="text-xs text-slate-500">{post.readTime}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bülten */}
          <div className="glass-card p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/10">
            <h3 className="font-semibold text-white mb-2">📬 Bültene Abone Ol</h3>
            <p className="text-sm text-slate-400 mb-4">Haftalık finans haberleri ve analizler için abone olun.</p>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="input-field mb-3"
            />
            <button className="btn-primary w-full">Abone Ol</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
