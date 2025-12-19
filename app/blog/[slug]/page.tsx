import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen, Tag, ChevronRight } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

// Blog yazıları veritabanı
const blogPosts: Record<string, BlogPost> = {
  'dolar-tl-tahminleri-2024': {
    id: 1,
    slug: 'dolar-tl-tahminleri-2024',
    title: 'Dolar/TL Tahminleri: 2024 Yılında Neler Bekleniyor?',
    excerpt: 'Ekonomistlerin ve analistlerin 2024 yılı için dolar/TL kuru tahminleri ve beklentileri.',
    content: `
      <p>2024 yılına girerken, Türk Lirası'nın dolar karşısındaki seyri merak konusu olmaya devam ediyor. Ekonomistler ve analistler, yeni yıl için çeşitli tahminlerde bulunuyor.</p>
      
      <h2>Merkez Bankası Politikaları</h2>
      <p>TCMB'nin son dönemde uyguladığı sıkı para politikası, enflasyonla mücadelede önemli bir adım olarak değerlendiriliyor. Politika faizindeki artışlar, TL'nin değer kaybını yavaşlatmada etkili oldu.</p>
      
      <h2>Küresel Gelişmeler</h2>
      <p>Fed'in faiz politikaları, gelişmekte olan ülke para birimlerini doğrudan etkiliyor. 2024'te beklenen faiz indirimleri, TL'ye olumlu yansıyabilir.</p>
      
      <h2>Analist Tahminleri</h2>
      <p>Önde gelen yatırım bankaları, 2024 yıl sonunda dolar/TL kurunun 35-40 TL bandında kalacağını öngörüyor. Ancak bu tahminler, ekonomik verilere göre değişkenlik gösterebilir.</p>
      
      <h2>Yatırımcılara Öneriler</h2>
      <ul>
        <li>Döviz pozisyonlarınızı çeşitlendirin</li>
        <li>Ekonomik verileri yakından takip edin</li>
        <li>Risk yönetimi stratejileri uygulayın</li>
        <li>Uzun vadeli düşünün</li>
      </ul>
      
      <p>Sonuç olarak, 2024 yılı döviz piyasaları için zorlu ama fırsatlarla dolu bir yıl olabilir. Dikkatli ve bilinçli yatırım kararları almak her zamankinden daha önemli.</p>
    `,
    category: 'Döviz',
    categoryColor: 'emerald',
    author: 'HızırMatik Editör',
    date: '2024-01-15',
    readTime: '8 dk',
    tags: ['dolar', 'tl', 'kur', 'merkez bankası', 'tahmin'],
  },
  'altin-yatirim-rehberi': {
    id: 2,
    slug: 'altin-yatirim-rehberi',
    title: 'Altın Yatırımı Rehberi: Gram mı, Çeyrek mi, Cumhuriyet Altını mı?',
    excerpt: 'Altın yatırımı yapmak isteyenler için kapsamlı rehber.',
    content: `
      <p>Altın, yüzyıllardır güvenli liman olarak kabul edilen bir yatırım aracı. Peki hangi altın türü sizin için daha uygun?</p>
      
      <h2>Gram Altın</h2>
      <p>Gram altın, en küçük birimde altın alım satımı yapmanıza olanak tanır. Bankalarda veya kuyumcularda kolayca alınıp satılabilir. Düşük bütçeyle başlamak isteyenler için idealdir.</p>
      
      <h2>Çeyrek Altın</h2>
      <p>Çeyrek altın, yaklaşık 1.75 gram ağırlığındadır. Hediye olarak sıkça tercih edilir. Alım satım farkı (spread) gram altına göre daha yüksek olabilir.</p>
      
      <h2>Yarım ve Tam Altın</h2>
      <p>Daha yüksek bütçeli yatırımcılar için uygun. Uzun vadeli saklama için tercih edilir. Fiziki olarak saklanması gereken yatırım araçlarıdır.</p>
      
      <h2>Cumhuriyet Altını</h2>
      <p>Koleksiyonerlerin de ilgi gösterdiği Cumhuriyet altını, tarihi değeri ile öne çıkar. Ata ve Reşat altınları bu kategoridedir.</p>
      
      <h2>Altın Hesabı vs Fiziki Altın</h2>
      <ul>
        <li><strong>Altın Hesabı:</strong> Saklama derdi yok, anlık alım satım, düşük spread</li>
        <li><strong>Fiziki Altın:</strong> Elinizde tutarsınız, kriz dönemlerinde güvence, işçilik maliyeti</li>
      </ul>
      
      <p>Yatırım kararınızı verirken bütçenizi, yatırım vadenizi ve risk toleransınızı göz önünde bulundurun.</p>
    `,
    category: 'Altın',
    categoryColor: 'yellow',
    author: 'HızırMatik Editör',
    date: '2024-01-10',
    readTime: '12 dk',
    tags: ['altın', 'yatırım', 'gram altın', 'çeyrek altın', 'cumhuriyet altını'],
  },
  'mevduat-faizi-karsilastirma': {
    id: 3,
    slug: 'mevduat-faizi-karsilastirma',
    title: 'Bankaların Mevduat Faiz Oranları Karşılaştırması (Ocak 2024)',
    excerpt: 'Türkiye\'deki bankaların güncel mevduat faiz oranları.',
    content: `
      <p>Vadeli mevduat, güvenli yatırım araçları arasında hâlâ popülerliğini koruyor. İşte bankaların güncel faiz oranları.</p>
      
      <h2>En Yüksek Faiz Veren Bankalar</h2>
      <p>32 günlük vade için bazı bankalar %50'ye varan faiz oranları sunuyor. Ancak bu oranlar sürekli değişebiliyor.</p>
      
      <h2>Vade Seçimi</h2>
      <ul>
        <li><strong>32 Gün:</strong> En yüksek faiz oranları genellikle bu vadede</li>
        <li><strong>90 Gün:</strong> Orta vadeli yatırımcılar için ideal</li>
        <li><strong>180 Gün:</strong> Daha uzun vadeli planlama yapanlar için</li>
        <li><strong>1 Yıl:</strong> Uzun vadeli, sabit getiri isteyenler için</li>
      </ul>
      
      <h2>Dikkat Edilmesi Gerekenler</h2>
      <p>Faiz oranları kampanya dönemlerinde değişebilir. Yeni müşterilere özel oranlar sunulabilir. TMSF güvencesi limitini göz önünde bulundurun.</p>
      
      <p>En güncel oranlar için bankaların web sitelerini veya şubelerini ziyaret etmenizi öneririz.</p>
    `,
    category: 'Finans',
    categoryColor: 'violet',
    author: 'HızırMatik Editör',
    date: '2024-01-08',
    readTime: '6 dk',
    tags: ['mevduat', 'faiz', 'banka', 'vadeli mevduat'],
  },
  'enflasyon-koruma-stratejileri': {
    id: 4,
    slug: 'enflasyon-koruma-stratejileri',
    title: 'Enflasyona Karşı Paranızı Korumanın 5 Yolu',
    excerpt: 'Yüksek enflasyon döneminde tasarruflarınızı korumak için stratejiler.',
    content: `
      <p>Enflasyon, paranızın satın alma gücünü her geçen gün eritiyor. İşte tasarruflarınızı korumanın yolları.</p>
      
      <h2>1. Enflasyona Endeksli Tahviller</h2>
      <p>Hazine tarafından ihraç edilen TÜFE'ye endeksli tahviller, enflasyonun üzerinde getiri sağlayabilir.</p>
      
      <h2>2. Altın Yatırımı</h2>
      <p>Tarih boyunca enflasyona karşı koruma sağlayan altın, portföyünüzün bir parçası olmalı.</p>
      
      <h2>3. Döviz Çeşitlendirmesi</h2>
      <p>Tek para birimine bağlı kalmak yerine, farklı dövizlerde pozisyon almak riskleri azaltır.</p>
      
      <h2>4. Gayrimenkul</h2>
      <p>Uzun vadede enflasyonun üzerinde getiri sağlayabilen gayrimenkul yatırımları değerlendirilebilir.</p>
      
      <h2>5. Hisse Senedi</h2>
      <p>Kaliteli şirketlerin hisse senetleri, uzun vadede enflasyonu yenebilir. Ancak risk toleransınızı göz önünde bulundurun.</p>
      
      <p>Her yatırım aracının kendine özgü riskleri vardır. Profesyonel danışmanlık almayı ihmal etmeyin.</p>
    `,
    category: 'Yatırım',
    categoryColor: 'blue',
    author: 'HızırMatik Editör',
    date: '2024-01-05',
    readTime: '10 dk',
    tags: ['enflasyon', 'yatırım', 'koruma', 'strateji'],
  },
  'kripto-para-2024-beklentileri': {
    id: 5,
    slug: 'kripto-para-2024-beklentileri',
    title: 'Kripto Para Piyasası 2024: Bitcoin ve Altcoinler İçin Beklentiler',
    excerpt: 'Bitcoin halving sonrası piyasa beklentileri.',
    content: `
      <p>2024 yılı, kripto para piyasası için önemli gelişmelere sahne olacak. İşte beklentiler.</p>
      
      <h2>Bitcoin Halving</h2>
      <p>Nisan 2024'te gerçekleşmesi beklenen halving, madencilik ödüllerini yarıya indirecek. Tarihsel olarak halving sonrası dönemler, boğa piyasalarına öncülük etmiştir.</p>
      
      <h2>Spot Bitcoin ETF</h2>
      <p>ABD'de onaylanan spot Bitcoin ETF'leri, kurumsal yatırımcıların piyasaya girişini kolaylaştırıyor.</p>
      
      <h2>Ethereum ve Layer 2 Çözümleri</h2>
      <p>Ethereum'un ölçeklenebilirlik sorunlarına çözüm sunan Layer 2 projeleri öne çıkıyor.</p>
      
      <h2>Riskler</h2>
      <ul>
        <li>Regülasyon belirsizlikleri</li>
        <li>Makroekonomik koşullar</li>
        <li>Güvenlik açıkları</li>
      </ul>
      
      <p>Kripto para yatırımları yüksek risk içerir. Sadece kaybetmeyi göze alabileceğiniz miktarı yatırın.</p>
    `,
    category: 'Kripto',
    categoryColor: 'orange',
    author: 'HızırMatik Editör',
    date: '2024-01-03',
    readTime: '15 dk',
    tags: ['bitcoin', 'kripto', 'halving', 'ethereum', 'altcoin'],
  },
  'butce-yonetimi-ipuclari': {
    id: 6,
    slug: 'butce-yonetimi-ipuclari',
    title: 'Kişisel Bütçe Yönetimi: Pratik İpuçları ve Yöntemler',
    excerpt: 'Aylık gelir-gider dengesini sağlamak için bütçe yönetim teknikleri.',
    content: `
      <p>Etkili bütçe yönetimi, finansal özgürlüğün ilk adımıdır. İşte size yardımcı olacak yöntemler.</p>
      
      <h2>50/30/20 Kuralı</h2>
      <p>Gelirinizi şöyle dağıtın: %50 ihtiyaçlar (kira, faturalar), %30 istekler (eğlence, hobi), %20 tasarruf ve yatırım.</p>
      
      <h2>Harcama Takibi</h2>
      <p>Her harcamanızı kaydedin. Uygulamalar veya basit bir excel tablosu kullanabilirsiniz. Paranızın nereye gittiğini görünce şaşıracaksınız.</p>
      
      <h2>Acil Durum Fonu</h2>
      <p>En az 3-6 aylık giderinizi karşılayacak bir acil durum fonu oluşturun. Bu fon, beklenmedik durumlar için güvence sağlar.</p>
      
      <h2>Gereksiz Abonelikleri İptal Edin</h2>
      <p>Kullanmadığınız dijital abonelikler, üyelikler ve hizmetleri gözden geçirin.</p>
      
      <h2>Alışveriş Listesi</h2>
      <p>Market alışverişine liste ile çıkın. İmpulsif alımlardan kaçının.</p>
      
      <p>Küçük adımlar, büyük değişimlere yol açar. Bugün başlayın!</p>
    `,
    category: 'Kişisel Finans',
    categoryColor: 'pink',
    author: 'HızırMatik Editör',
    date: '2024-01-01',
    readTime: '7 dk',
    tags: ['bütçe', 'tasarruf', 'kişisel finans', '50/30/20'],
  },
};

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryColor: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | HızırMatik Blog`,
      description: post.excerpt,
      url: `https://hizirmatik.com.tr/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    return (
      <div className="glass-card p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Yazı Bulunamadı</h1>
        <p className="text-slate-400 mb-6">Aradığınız blog yazısı mevcut değil.</p>
        <Link href="/blog" className="btn-primary">
          Blog&apos;a Dön
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  // İlgili yazılar
  const relatedPosts = Object.values(blogPosts)
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <Breadcrumb customItems={breadcrumbItems} />

      {/* Geri Butonu */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Blog&apos;a Dön
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Ana İçerik */}
        <article className="lg:col-span-3">
          <div className="glass-card p-6 lg:p-8">
            {/* Başlık Alanı */}
            <header className="mb-8">
              <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getCategoryColorClass(post.categoryColor)}`}>
                {post.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mt-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} okuma
                </span>
              </div>
            </header>

            {/* İçerik */}
            <div 
              className="prose prose-invert prose-emerald max-w-none
                prose-headings:text-white prose-headings:font-semibold
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-li:text-slate-300
                prose-strong:text-white
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Etiketler */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Paylaş */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-slate-400 text-sm">Bu yazıyı faydalı buldunuz mu? Paylaşın!</p>
              <button className="btn-ghost flex items-center gap-2 text-sm">
                <Share2 className="w-4 h-4" />
                Paylaş
              </button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Yazar */}
          <div className="glass-card p-5 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-white">{post.author}</h3>
            <p className="text-sm text-slate-400 mt-1">Finans ve ekonomi alanında uzman içerik üreticisi.</p>
          </div>

          {/* İlgili Yazılar */}
          {relatedPosts.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                İlgili Yazılar
              </h3>
              <ul className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.id}>
                    <Link 
                      href={`/blog/${relatedPost.slug}`} 
                      className="group flex items-start gap-2"
                    >
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="glass-card p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/10">
            <h3 className="font-semibold text-white mb-2">🚀 HızırMatik Araçları</h3>
            <p className="text-sm text-slate-400 mb-4">Döviz hesaplama, AI tarif önerileri ve daha fazlası!</p>
            <Link href="/" className="btn-primary w-full text-center block">
              Araçları Keşfet
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
