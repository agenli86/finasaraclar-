import type { Metadata } from 'next';
import { FileText, Scale, Shield, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kullanım Şartları',
  description: 'HızırMatik kullanım şartları ve koşulları.',
};

export default function KullanimSartlariPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
          <Scale className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Kullanım Şartları</h1>
        <p className="text-slate-500">Son güncelleme: Aralık 2025</p>
      </div>

      <div className="card p-8 space-y-8">
        {/* Giriş */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Giriş
          </h2>
          <p className="text-slate-600 leading-relaxed">
            HızırMatik web sitesini (&quot;Site&quot;) kullanarak bu kullanım şartlarını kabul etmiş 
            sayılırsınız. Bu şartları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
          </p>
        </section>

        {/* Hizmetler */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Hizmetlerimiz</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            HızırMatik, aşağıdaki ücretsiz online araçları sunmaktadır:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Döviz ve altın kuru hesaplama</li>
            <li>AI destekli yemek tarifi önerileri</li>
            <li>Metin analiz ve düzenleme araçları</li>
            <li>Kredi ve mevduat hesaplama</li>
          </ul>
        </section>

        {/* Sorumluluk Reddi */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Sorumluluk Reddi
          </h2>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p className="text-slate-700 leading-relaxed">
              <strong>Önemli:</strong> Sitemizdeki döviz kurları, altın fiyatları ve finansal 
              hesaplamalar yalnızca bilgilendirme amaçlıdır. Yatırım tavsiyesi niteliği taşımaz. 
              Finansal kararlarınızda profesyonel danışmanlık almanızı öneririz.
            </p>
          </div>
        </section>

        {/* Kullanım Koşulları */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Kullanım Koşulları</h2>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <span>Siteyi yasalara uygun şekilde kullanmayı kabul edersiniz.</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <span>Siteye zarar verecek faaliyetlerde bulunmamayı kabul edersiniz.</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <span>İçerikleri ticari amaçla kopyalamamayı kabul edersiniz.</span>
            </li>
          </ul>
        </section>

        {/* Fikri Mülkiyet */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Fikri Mülkiyet</h2>
          <p className="text-slate-600 leading-relaxed">
            Site içeriği, tasarımı, logosu ve tüm materyalleri HızırMatik&apos;e aittir 
            ve telif hakları ile korunmaktadır. İzinsiz kullanımı yasaktır.
          </p>
        </section>

        {/* Değişiklikler */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Değişiklikler</h2>
          <p className="text-slate-600 leading-relaxed">
            Bu kullanım şartlarını önceden haber vermeksizin değiştirme hakkını saklı tutarız. 
            Değişiklikler sitede yayınlandığı anda yürürlüğe girer.
          </p>
        </section>

        {/* İletişim */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">İletişim</h2>
          <p className="text-slate-600 leading-relaxed">
            Sorularınız için{' '}
            <a href="/iletisim" className="text-blue-600 hover:underline">
              iletişim sayfamızı
            </a>{' '}
            ziyaret edebilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
