import type { Metadata } from 'next';
import { Shield, Lock, Eye, Database, Cookie, Mail, FileText } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'HızırMatik gizlilik politikası. Kişisel verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz hakkında bilgi edinin.',
  openGraph: {
    title: 'Gizlilik Politikası | HızırMatik',
    description: 'HızırMatik gizlilik politikası ve kişisel verilerin korunması.',
    url: 'https://hizirmatik.com.tr/gizlilik-politikasi',
    type: 'website',
  },
};

const breadcrumbItems = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
];

const sections = [
  {
    icon: Database,
    title: 'Toplanan Veriler',
    content: `HızırMatik olarak, hizmetlerimizi sunabilmek için aşağıdaki verileri toplayabiliriz:

• Kullanım verileri (ziyaret edilen sayfalar, kullanılan araçlar)
• Cihaz bilgileri (tarayıcı türü, işletim sistemi)
• IP adresi ve konum bilgisi (ülke/şehir düzeyinde)
• Çerez verileri

Kişisel olarak sizi tanımlayabilecek bilgiler (ad, e-posta vb.) yalnızca siz paylaştığınızda toplanır.`
  },
  {
    icon: Eye,
    title: 'Verilerin Kullanımı',
    content: `Topladığımız verileri aşağıdaki amaçlarla kullanırız:

• Hizmetlerimizi sunmak ve iyileştirmek
• Kullanıcı deneyimini kişiselleştirmek
• Site performansını analiz etmek
• Reklam göstermek (Google AdSense)
• Yasal yükümlülüklerimizi yerine getirmek

Verilerinizi üçüncü taraflarla satmıyoruz.`
  },
  {
    icon: Cookie,
    title: 'Çerezler',
    content: `Sitemizde aşağıdaki türde çerezler kullanılmaktadır:

• Zorunlu çerezler: Sitenin çalışması için gerekli
• Analitik çerezler: Ziyaretçi istatistikleri için (Google Analytics)
• Reklam çerezleri: Kişiselleştirilmiş reklamlar için (Google AdSense)

Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.`
  },
  {
    icon: Lock,
    title: 'Veri Güvenliği',
    content: `Verilerinizin güvenliğini sağlamak için çeşitli önlemler alıyoruz:

• SSL/TLS şifreleme
• Güvenli sunucu altyapısı
• Düzenli güvenlik güncellemeleri
• Erişim kontrolü ve yetkilendirme

Hiçbir sistem %100 güvenli olmasa da, verilerinizi korumak için elimizden gelenin en iyisini yapıyoruz.`
  },
  {
    icon: FileText,
    title: 'Üçüncü Taraf Hizmetleri',
    content: `Sitemizde aşağıdaki üçüncü taraf hizmetleri kullanılmaktadır:

• Google Analytics: Site trafiği analizi
• Google AdSense: Reklam gösterimi
• Google Gemini API: AI özellikler için

Bu hizmetlerin kendi gizlilik politikaları bulunmaktadır. Detaylı bilgi için ilgili sağlayıcıların gizlilik politikalarını inceleyiniz.`
  },
  {
    icon: Shield,
    title: 'Haklarınız',
    content: `KVKK kapsamında aşağıdaki haklara sahipsiniz:

• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• İşlenmişse bilgi talep etme
• Verilerinizin düzeltilmesini veya silinmesini isteme
• İşlemenin kısıtlanmasını talep etme
• Veri taşınabilirliği hakkı

Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.`
  },
];

export default function GizlilikPolitikasiPage() {
  return (
    <div className="space-y-6">
      <Breadcrumb customItems={breadcrumbItems} />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Gizlilik Politikası</h1>
          <p className="text-slate-400">Son güncelleme: 1 Ocak 2024</p>
        </div>
      </div>

      {/* Giriş */}
      <div className="glass-card p-6">
        <p className="text-slate-300 leading-relaxed">
          HızırMatik olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu gizlilik politikası, 
          web sitemizi kullandığınızda kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve 
          koruduğumuzu açıklamaktadır. Sitemizi kullanarak bu politikayı kabul etmiş sayılırsınız.
        </p>
      </div>

      {/* Bölümler */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 flex-shrink-0">
                <section.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
                <div className="text-slate-400 text-sm whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* İletişim */}
      <div className="glass-card p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-blue-500/10 flex-shrink-0">
            <Mail className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">İletişim</h2>
            <p className="text-slate-400 text-sm">
              Gizlilik politikamız hakkında sorularınız varsa veya haklarınızı kullanmak istiyorsanız, 
              lütfen bizimle iletişime geçin:
            </p>
            <p className="text-blue-400 font-medium mt-2">iletisim@hizirmatik.com.tr</p>
          </div>
        </div>
      </div>
    </div>
  );
}
