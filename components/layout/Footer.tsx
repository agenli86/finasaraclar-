import Link from 'next/link';
import { TrendingUp, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  araclar: [
    { label: 'Döviz & Altın', href: '/doviz-altin' },
    { label: 'AI Mutfak', href: '/ai-mutfak' },
    { label: 'Metin Doktoru', href: '/metin-doktoru' },
    { label: 'Kredi Hesaplama', href: '/finans/kredi-hesaplama' },
    { label: 'Mevduat Hesaplama', href: '/finans/mevduat-hesaplama' },
  ],
  sirket: [
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Blog', href: '/blog' },
    { label: 'İletişim', href: '/iletisim' },
  ],
  yasal: [
    { label: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
    { label: 'Kullanım Şartları', href: '/kullanim-sartlari' },
    { label: 'Çerez Politikası', href: '/cerez-politikasi' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">HızırMatik</h3>
                <p className="text-xs text-slate-400">Akıllı Araçlar</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm mb-4">
              Günlük hayatınızı kolaylaştıran akıllı finans ve yaşam araçları platformu.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@hizirmatik.com.tr</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Araçlar */}
          <div>
            <h4 className="font-semibold mb-4">Araçlar</h4>
            <ul className="space-y-2">
              {footerLinks.araclar.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h4 className="font-semibold mb-4">Şirket</h4>
            <ul className="space-y-2">
              {footerLinks.sirket.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h4 className="font-semibold mb-4">Yasal</h4>
            <ul className="space-y-2">
              {footerLinks.yasal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} HızırMatik. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/gizlilik-politikasi" className="text-slate-400 hover:text-white text-sm">
              Gizlilik
            </Link>
            <Link href="/kullanim-sartlari" className="text-slate-400 hover:text-white text-sm">
              Şartlar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
